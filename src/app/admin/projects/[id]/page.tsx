import Link from "next/link";
import { notFound } from "next/navigation";
import { auth } from "@/lib/auth";
import { getDb } from "@/lib/db";
import { getProject, naira, CATEGORY_LABEL, STATUS_LABEL } from "@/lib/admin/finance";
import { can } from "@/lib/admin/permissions";
import { setProjectMember } from "@/lib/admin/finance-actions";
import { ArrowLeft, Sparkles } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function ProjectDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const session = await auth();
  const user = session!.user;

  const project = await getProject(id, user.role, user.id);
  if (!project) notFound();

  const canAssign = can(user.role, "projects:write");
  const assignable = canAssign
    ? await getDb().user.findMany({
        where: { isActive: true, role: { in: ["MANAGER", "ADMIN", "CO_FOUNDER"] } },
        select: { id: true, name: true, email: true },
        orderBy: { createdAt: "asc" },
      })
    : [];
  const memberIds = new Set(project.members.map((m) => m.userId));
  const over = project.budgetNumber > 0 && project.spent > project.budgetNumber;

  return (
    <div className="space-y-6">
      <Link href="/admin/projects" className="inline-flex items-center gap-2 text-sm text-steel-600 hover:text-primary-700 transition-colors">
        <ArrowLeft className="w-4 h-4" aria-hidden="true" /> All projects
      </Link>

      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="font-display font-bold text-2xl text-steel-900">{project.name}</h1>
          <p className="text-steel-600 mt-1">
            {[project.client, project.location, STATUS_LABEL[project.status]].filter(Boolean).join(" · ")}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
        <Stat label="Spent" value={naira.format(project.spent)} />
        <Stat label="Budget" value={project.budgetNumber ? naira.format(project.budgetNumber) : "Not set"} />
        <Stat
          label={over ? "Over budget" : "Remaining"}
          value={project.budgetNumber ? naira.format(Math.abs(project.budgetNumber - project.spent)) : "—"}
          tone={over ? "warn" : undefined}
        />
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <section className="lg:col-span-2 bg-white rounded-2xl border border-steel-200 p-6">
          <h2 className="font-display font-semibold text-steel-900 mb-4">Expenses</h2>
          {project.expenses.length === 0 ? (
            <p className="text-sm text-steel-500">Nothing recorded yet.</p>
          ) : (
            <ul className="divide-y divide-steel-100 list-none p-0 m-0">
              {project.expenses.map((e) => (
                <li key={e.id} className="flex items-center gap-4 py-3">
                  <div className="min-w-0 flex-1">
                    <p className="font-medium text-steel-900 truncate">{e.description}</p>
                    <p className="text-xs text-steel-500">
                      {CATEGORY_LABEL[e.category]}
                      {e.vendor && ` · ${e.vendor}`}
                      {e.recordedBy && ` · ${e.recordedBy.name ?? e.recordedBy.email}`}
                      {e.entryMethod === "AI_ASSISTED" && (
                        <span className="ml-2 inline-flex items-center gap-1 text-primary-700">
                          <Sparkles className="w-3 h-3" aria-hidden="true" />assisted
                        </span>
                      )}
                    </p>
                  </div>
                  <span className="font-medium text-steel-900 tabular whitespace-nowrap">
                    {naira.format(Number(e.amount.toString()))}
                  </span>
                  <time dateTime={e.spentAt.toISOString()} className="text-xs text-steel-400 tabular whitespace-nowrap">
                    {e.spentAt.toLocaleDateString("en-NG", { day: "numeric", month: "short", year: "numeric" })}
                  </time>
                </li>
              ))}
            </ul>
          )}
        </section>

        <aside className="space-y-6">
          {project.byCategory.size > 0 && (
            <section className="bg-white rounded-2xl border border-steel-200 p-6">
              <h2 className="text-xs uppercase tracking-wider text-steel-500 mb-3">By category</h2>
              <dl className="space-y-2 m-0">
                {[...project.byCategory.entries()]
                  .sort((a, b) => b[1] - a[1])
                  .map(([cat, amount]) => (
                    <div key={cat} className="flex justify-between text-sm">
                      <dt className="text-steel-600">{CATEGORY_LABEL[cat]}</dt>
                      <dd className="text-steel-900 tabular m-0">{naira.format(amount)}</dd>
                    </div>
                  ))}
              </dl>
            </section>
          )}

          <section className="bg-white rounded-2xl border border-steel-200 p-6">
            <h2 className="text-xs uppercase tracking-wider text-steel-500 mb-3">
              Assigned
            </h2>
            <p className="text-xs text-steel-500 mb-3">
              Managers see a project&apos;s costs only when assigned to it.
            </p>
            {canAssign ? (
              <ul className="space-y-2 list-none p-0 m-0">
                {assignable.map((m) => (
                  <li key={m.id}>
                    <form action={setProjectMember.bind(null, project.id, m.id, !memberIds.has(m.id))}>
                      <button type="submit" className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                        memberIds.has(m.id)
                          ? "bg-primary-50 border border-primary-200 text-primary-900 font-medium"
                          : "border border-steel-200 text-steel-700 hover:border-primary-400"
                      }`}>
                        {m.name ?? m.email}
                        <span className="float-right text-xs text-steel-400">
                          {memberIds.has(m.id) ? "remove" : "add"}
                        </span>
                      </button>
                    </form>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-steel-700">
                {project.members.map((m) => m.user.name ?? m.user.email).join(", ") || "Nobody yet"}
              </p>
            )}
          </section>
        </aside>
      </div>
    </div>
  );
}

function Stat({ label, value, tone }: { label: string; value: string; tone?: "warn" }) {
  return (
    <div className={`rounded-2xl border p-5 ${tone === "warn" ? "border-amber-300 bg-amber-50" : "border-steel-200 bg-white"}`}>
      <div className={`font-display font-bold text-xl tabular ${tone === "warn" ? "text-amber-900" : "text-steel-900"}`}>{value}</div>
      <div className={`text-sm mt-1 ${tone === "warn" ? "text-amber-800" : "text-steel-600"}`}>{label}</div>
    </div>
  );
}
