import Link from "next/link";
import { auth } from "@/lib/auth";
import { getDb } from "@/lib/db";
import { financeSummary, projectScopeFilter, naira, CATEGORY_LABEL } from "@/lib/admin/finance";
import { financeScope } from "@/lib/admin/permissions";
import ExpenseEntry from "@/components/admin/ExpenseEntry";
import { Sparkles } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function FinancePage() {
  const session = await auth();
  const user = session!.user;

  const [summary, projects] = await Promise.all([
    financeSummary(user.role, user.id),
    getDb().project.findMany({
      where: projectScopeFilter(user.role, user.id),
      select: { id: true, name: true },
      orderBy: { name: "asc" },
    }),
  ]);

  const scoped = financeScope(user.role) === "assigned";
  const aiAvailable = Boolean(process.env.ANTHROPIC_API_KEY);
  const remaining = summary.totalBudget - summary.totalSpend;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display font-bold text-2xl text-steel-900">Finance</h1>
        <p className="text-steel-600 mt-1">
          {scoped
            ? "Costs for the projects you are assigned to."
            : "Spend across every project."}
        </p>
      </div>

      {!aiAvailable && (
        <p className="flex items-start gap-3 rounded-2xl border border-steel-200 bg-white p-4 text-sm text-steel-600">
          <Sparkles className="w-4 h-4 text-steel-400 shrink-0 mt-0.5" aria-hidden="true" />
          <span>
            The assistant is off because <code className="text-steel-800">ANTHROPIC_API_KEY</code> is
            not set. Expenses can still be entered by hand.
          </span>
        </p>
      )}

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Stat label="Total spend" value={naira.format(summary.totalSpend)} />
        <Stat label="This month" value={naira.format(summary.monthSpend)} />
        <Stat label="Budgeted" value={naira.format(summary.totalBudget)} />
        <Stat
          label={remaining >= 0 ? "Remaining" : "Over budget"}
          value={naira.format(Math.abs(remaining))}
          tone={remaining < 0 ? "warn" : undefined}
        />
      </div>

      {projects.length === 0 ? (
        <div className="bg-white rounded-2xl border border-steel-200 py-12 text-center">
          <p className="font-medium text-steel-900">No projects yet</p>
          <p className="text-sm text-steel-500 mt-1 mb-4">
            Expenses are recorded against a project, so add one first.
          </p>
          <Link href="/admin/projects" className="inline-block px-4 py-2 rounded-lg bg-primary-700 text-white text-sm font-semibold hover:bg-primary-800 transition-colors">
            Add a project
          </Link>
        </div>
      ) : (
        <ExpenseEntry projects={projects} aiAvailable={aiAvailable} />
      )}

      {summary.byCategory.length > 0 && (
        <section className="bg-white rounded-2xl border border-steel-200 p-6">
          <h2 className="font-display font-semibold text-steel-900 mb-4">Where it went</h2>
          <ul className="space-y-3 list-none p-0 m-0">
            {summary.byCategory.map((row) => {
              const share = summary.totalSpend ? (row.amount / summary.totalSpend) * 100 : 0;
              return (
                <li key={row.category}>
                  <div className="flex items-baseline justify-between text-sm mb-1">
                    <span className="text-steel-700">{CATEGORY_LABEL[row.category]}</span>
                    <span className="text-steel-900 font-medium tabular">
                      {naira.format(row.amount)}
                      <span className="ml-2 text-steel-400 font-normal">{share.toFixed(0)}%</span>
                    </span>
                  </div>
                  <div className="h-1.5 rounded-full bg-steel-100 overflow-hidden">
                    <div className="h-full bg-primary-600 rounded-full" style={{ width: `${share}%` }} />
                  </div>
                </li>
              );
            })}
          </ul>
        </section>
      )}

      <section className="bg-white rounded-2xl border border-steel-200 p-6">
        <h2 className="font-display font-semibold text-steel-900 mb-4">Recent expenses</h2>
        {summary.recent.length === 0 ? (
          <p className="text-sm text-steel-500">Nothing recorded yet.</p>
        ) : (
          <ul className="divide-y divide-steel-100 list-none p-0 m-0">
            {summary.recent.map((e) => (
              <li key={e.id} className="flex items-center gap-4 py-3">
                <div className="min-w-0 flex-1">
                  <p className="font-medium text-steel-900 truncate">{e.description}</p>
                  <p className="text-xs text-steel-500">
                    <Link href={`/admin/projects/${e.project.id}`} className="hover:text-primary-700 transition-colors">
                      {e.project.name}
                    </Link>
                    {" · "}{CATEGORY_LABEL[e.category]}
                    {e.vendor && ` · ${e.vendor}`}
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
                  {e.spentAt.toLocaleDateString("en-NG", { day: "numeric", month: "short" })}
                </time>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}

function Stat({ label, value, tone }: { label: string; value: string; tone?: "warn" }) {
  return (
    <div className={`rounded-2xl border p-5 ${tone === "warn" ? "border-amber-300 bg-amber-50" : "border-steel-200 bg-white"}`}>
      <div className={`font-display font-bold text-xl tabular ${tone === "warn" ? "text-amber-900" : "text-steel-900"}`}>
        {value}
      </div>
      <div className={`text-sm mt-1 ${tone === "warn" ? "text-amber-800" : "text-steel-600"}`}>{label}</div>
    </div>
  );
}
