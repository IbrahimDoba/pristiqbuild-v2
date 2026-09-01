import Link from "next/link";
import { auth } from "@/lib/auth";
import { listProjects, naira, STATUS_LABEL } from "@/lib/admin/finance";
import { can } from "@/lib/admin/permissions";
import NewProjectForm from "@/components/admin/NewProjectForm";

export const dynamic = "force-dynamic";

export default async function ProjectsPage() {
  const session = await auth();
  const user = session!.user;
  const projects = await listProjects(user.role, user.id);
  const showMoney = can(user.role, "finance:read");

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display font-bold text-2xl text-steel-900">Projects</h1>
        <p className="text-steel-600 mt-1">
          Internal jobs we track costs against. Separate from the public project pages.
        </p>
      </div>

      {can(user.role, "projects:write") && <NewProjectForm />}

      {projects.length === 0 ? (
        <div className="bg-white rounded-2xl border border-steel-200 py-12 text-center">
          <p className="font-medium text-steel-900">No projects yet</p>
          <p className="text-sm text-steel-500 mt-1">Add one above to start recording expenses.</p>
        </div>
      ) : (
        <ul className="grid md:grid-cols-2 gap-4 list-none p-0 m-0">
          {projects.map((p) => {
            const over = showMoney && p.budgetNumber > 0 && p.spent > p.budgetNumber;
            const used = p.budgetNumber > 0 ? (p.spent / p.budgetNumber) * 100 : 0;
            return (
              <li key={p.id}>
                <Link href={`/admin/projects/${p.id}`} className="block h-full bg-white rounded-2xl border border-steel-200 p-5 hover:border-primary-400 transition-colors">
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <div className="min-w-0">
                      <h2 className="font-display font-semibold text-steel-900 truncate">{p.name}</h2>
                      {p.client && <p className="text-sm text-steel-500 truncate">{p.client}</p>}
                    </div>
                    <span className="px-2 py-0.5 rounded-lg border border-steel-200 bg-steel-50 text-xs font-medium text-steel-600 whitespace-nowrap">
                      {STATUS_LABEL[p.status]}
                    </span>
                  </div>

                  {showMoney && (
                    <>
                      <div className="flex items-baseline justify-between text-sm mt-4 mb-1.5">
                        <span className="text-steel-600 tabular">{naira.format(p.spent)} spent</span>
                        {p.budgetNumber > 0 && (
                          <span className={`tabular ${over ? "text-amber-700 font-medium" : "text-steel-400"}`}>
                            of {naira.format(p.budgetNumber)}
                          </span>
                        )}
                      </div>
                      {p.budgetNumber > 0 && (
                        <div className="h-1.5 rounded-full bg-steel-100 overflow-hidden">
                          <div
                            className={`h-full rounded-full ${over ? "bg-amber-500" : "bg-primary-600"}`}
                            style={{ width: `${Math.min(100, used)}%` }}
                          />
                        </div>
                      )}
                    </>
                  )}

                  <p className="text-xs text-steel-400 mt-3 tabular">
                    {p._count.expenses} expense{p._count.expenses === 1 ? "" : "s"}
                    {p.members.length > 0 && ` · ${p.members.length} assigned`}
                  </p>
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
