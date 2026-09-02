import { getDb } from "@/lib/db";
// Re-exported so server modules can keep importing everything from here.
export {
  CATEGORY_LABEL, CATEGORIES, STATUS_LABEL, STATUSES, naira, matchProject,
} from "@/lib/admin/finance-constants";
import { financeScope } from "@/lib/admin/permissions";
import { ExpenseCategory, Prisma } from "@/generated/prisma/client";
import type { UserRole } from "@/generated/prisma/client";

/** Prisma Decimal to a plain number, for display only. */
export const toNumber = (d: Prisma.Decimal | null | undefined) =>
  d ? Number(d.toString()) : 0;

/**
 * The projects a user may see costs for.
 *
 * Returns a Prisma filter rather than a list of ids so the restriction is
 * applied inside the query. Scoping in the page would mean the database still
 * handed over rows the user may not see, and one forgotten filter would leak
 * them.
 */
export function projectScopeFilter(
  role: UserRole,
  userId: string
): Prisma.ProjectWhereInput {
  const scope = financeScope(role);
  if (scope === "all") return {};
  if (scope === "assigned") return { members: { some: { userId } } };
  // Matches nothing. A content specialist reaching this is already a bug, but
  // it should return no money rather than all of it.
  return { id: "__none__" };
}

export function expenseScopeFilter(
  role: UserRole,
  userId: string
): Prisma.ExpenseWhereInput {
  const scope = financeScope(role);
  if (scope === "all") return {};
  if (scope === "assigned") return { project: { members: { some: { userId } } } };
  return { id: "__none__" };
}

export async function listProjects(role: UserRole, userId: string) {
  const db = getDb();
  const where = projectScopeFilter(role, userId);

  const projects = await db.project.findMany({
    where,
    orderBy: [{ status: "asc" }, { createdAt: "desc" }],
    include: {
      members: { include: { user: { select: { id: true, name: true, email: true } } } },
      _count: { select: { expenses: true } },
    },
  });

  // One grouped query rather than a spend query per project.
  const spend = await db.expense.groupBy({
    by: ["projectId"],
    where: { projectId: { in: projects.map((p) => p.id) } },
    _sum: { amount: true },
  });
  const spentBy = new Map(spend.map((s) => [s.projectId, toNumber(s._sum.amount)]));

  return projects.map((p) => ({
    ...p,
    budgetNumber: toNumber(p.budget),
    spent: spentBy.get(p.id) ?? 0,
  }));
}

export async function getProject(id: string, role: UserRole, userId: string) {
  const db = getDb();

  const project = await db.project.findFirst({
    // The scope filter is combined with the id, so requesting a project you
    // may not see returns nothing rather than someone else's costs.
    where: { AND: [{ id }, projectScopeFilter(role, userId)] },
    include: {
      members: { include: { user: { select: { id: true, name: true, email: true } } } },
      budgets: true,
      expenses: {
        orderBy: { spentAt: "desc" },
        include: { recordedBy: { select: { name: true, email: true } } },
      },
    },
  });
  if (!project) return null;

  const byCategory = new Map<ExpenseCategory, number>();
  for (const e of project.expenses) {
    byCategory.set(e.category, (byCategory.get(e.category) ?? 0) + toNumber(e.amount));
  }

  return {
    ...project,
    budgetNumber: toNumber(project.budget),
    spent: project.expenses.reduce((sum, e) => sum + toNumber(e.amount), 0),
    byCategory,
    budgetByCategory: new Map(project.budgets.map((b) => [b.category, toNumber(b.amount)])),
  };
}

/** Headline numbers for the finance tab, already scoped to what the user sees. */
export async function financeSummary(role: UserRole, userId: string) {
  const db = getDb();
  const where = expenseScopeFilter(role, userId);
  const monthStart = new Date();
  monthStart.setDate(1);
  monthStart.setHours(0, 0, 0, 0);

  const [totalAgg, monthAgg, byCategory, projects, recent] = await Promise.all([
    db.expense.aggregate({ where, _sum: { amount: true }, _count: true }),
    db.expense.aggregate({
      where: { ...where, spentAt: { gte: monthStart } },
      _sum: { amount: true },
    }),
    db.expense.groupBy({ by: ["category"], where, _sum: { amount: true } }),
    db.project.findMany({
      where: projectScopeFilter(role, userId),
      select: { id: true, name: true, budget: true, status: true },
    }),
    db.expense.findMany({
      where,
      orderBy: { createdAt: "desc" },
      take: 8,
      include: {
        project: { select: { id: true, name: true } },
        recordedBy: { select: { name: true, email: true } },
      },
    }),
  ]);

  return {
    totalSpend: toNumber(totalAgg._sum.amount),
    expenseCount: totalAgg._count,
    monthSpend: toNumber(monthAgg._sum.amount),
    byCategory: byCategory
      .map((c) => ({ category: c.category, amount: toNumber(c._sum.amount) }))
      .sort((a, b) => b.amount - a.amount),
    totalBudget: projects.reduce((sum, p) => sum + toNumber(p.budget), 0),
    projectCount: projects.length,
    recent,
  };
}

