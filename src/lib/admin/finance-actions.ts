"use server";

import { revalidatePath } from "next/cache";
import { auth } from "@/lib/auth";
import { getDb } from "@/lib/db";
import { ExpenseCategory, ProjectStatus, Prisma } from "@/generated/prisma/client";
import { can } from "@/lib/admin/permissions";
import { projectScopeFilter, CATEGORIES } from "@/lib/admin/finance";
import { parseExpense, type ExpenseDraft } from "@/lib/admin/expense-ai";

async function require(capability: "finance:read" | "finance:write" | "projects:write") {
  const session = await auth();
  if (!session?.user?.id) throw new Error("Not authenticated");
  if (!can(session.user.role, capability)) throw new Error(`Not permitted: ${capability}`);
  return session.user;
}

/** Money in from a form: strips separators and rejects anything not a number. */
function parseAmount(raw: unknown): Prisma.Decimal | null {
  const cleaned = String(raw ?? "").replace(/[₦,\s]/g, "");
  if (!cleaned || !/^\d+(\.\d{1,2})?$/.test(cleaned)) return null;
  const value = new Prisma.Decimal(cleaned);
  return value.greaterThan(0) ? value : null;
}

export type ExpenseResult = { ok: true } | { ok: false; error: string };

export async function addExpense(
  _prev: ExpenseResult | null,
  formData: FormData
): Promise<ExpenseResult> {
  const user = await require("finance:write");

  const projectId = String(formData.get("projectId") ?? "");
  const amount = parseAmount(formData.get("amount"));
  const category = String(formData.get("category") ?? "");
  const description = String(formData.get("description") ?? "").trim();
  const vendor = String(formData.get("vendor") ?? "").trim() || null;
  const spentAt = String(formData.get("spentAt") ?? "");
  const sourceText = String(formData.get("sourceText") ?? "").trim() || null;

  if (!projectId) return { ok: false, error: "Choose a project." };
  if (!amount) return { ok: false, error: "Enter a valid amount." };
  if (!CATEGORIES.includes(category as ExpenseCategory)) {
    return { ok: false, error: "Choose a category." };
  }
  if (!description) return { ok: false, error: "Say what the money was for." };
  const spentDate = spentAt ? new Date(spentAt) : new Date();
  if (Number.isNaN(spentDate.getTime())) return { ok: false, error: "Enter a valid date." };

  // A manager may only file against a project they are on. Checked here, not
  // just hidden in the dropdown, because this action is its own endpoint.
  const allowed = await getDb().project.findFirst({
    where: { AND: [{ id: projectId }, projectScopeFilter(user.role, user.id)] },
    select: { id: true },
  });
  if (!allowed) return { ok: false, error: "That project is not available to you." };

  await getDb().expense.create({
    data: {
      projectId, amount, category: category as ExpenseCategory,
      description, vendor, spentAt: spentDate,
      recordedById: user.id,
      entryMethod: sourceText ? "AI_ASSISTED" : "MANUAL",
      sourceText,
    },
  });

  revalidatePath("/admin/finance");
  revalidatePath(`/admin/projects/${projectId}`);
  return { ok: true };
}

export type DraftResult =
  | { ok: true; draft: ExpenseDraft; matchedProjectId: string | null }
  | { ok: false; error: string };

/** Parses a sentence into form values. Writes nothing. */
export async function draftExpense(
  _prev: DraftResult | null,
  formData: FormData
): Promise<DraftResult> {
  const user = await require("finance:write");

  const projects = await getDb().project.findMany({
    where: projectScopeFilter(user.role, user.id),
    select: { id: true, name: true },
  });

  return parseExpense(String(formData.get("sentence") ?? ""), projects);
}

export type ProjectResult = { ok: true; id: string } | { ok: false; error: string };

export async function createProject(
  _prev: ProjectResult | null,
  formData: FormData
): Promise<ProjectResult> {
  await require("projects:write");

  const name = String(formData.get("name") ?? "").trim();
  if (!name) return { ok: false, error: "Give the project a name." };

  const budget = parseAmount(formData.get("budget"));
  const status = String(formData.get("status") ?? "ACTIVE");

  const project = await getDb().project.create({
    data: {
      name,
      client: String(formData.get("client") ?? "").trim() || null,
      location: String(formData.get("location") ?? "").trim() || null,
      status: (Object.values(ProjectStatus) as string[]).includes(status)
        ? (status as ProjectStatus)
        : ProjectStatus.ACTIVE,
      budget,
    },
  });

  revalidatePath("/admin/projects");
  revalidatePath("/admin/finance");
  return { ok: true, id: project.id };
}

export async function setProjectMember(projectId: string, userId: string, add: boolean) {
  await require("projects:write");

  if (add) {
    await getDb().projectMember.upsert({
      where: { projectId_userId: { projectId, userId } },
      create: { projectId, userId },
      update: {},
    });
  } else {
    await getDb().projectMember.deleteMany({ where: { projectId, userId } });
  }

  revalidatePath(`/admin/projects/${projectId}`);
}
