import Link from "next/link";
import {
  listLeads,
  parseLeadQuery,
  leadHref,
  STAGES,
  STAGE_LABEL,
  SOURCE_LABEL,
  BUDGET_LABEL,
  LEADS_PER_PAGE,
} from "@/lib/admin/leads";
import { StageChip } from "@/app/admin/page";
import { Search, Inbox, ChevronLeft, ChevronRight, MessageSquare } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function LeadsPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const query = parseLeadQuery(await searchParams);
  const { leads, total, page, totalPages } = await listLeads(query);
  const filtered = Boolean(query.q || query.stage || query.source);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-display font-bold text-2xl text-steel-900">Leads</h1>
          <p className="text-steel-600 mt-1 tabular">
            {filtered ? `${total} matching` : `${total} total`}
          </p>
        </div>
      </div>

      {/* Filtering happens on the server and lives in the URL, so a filtered
          view can be bookmarked or sent to a colleague. */}
      <form method="get" className="flex flex-wrap gap-3 items-center">
        <div className="relative flex-1 min-w-56">
          <label htmlFor="q" className="sr-only">Search leads</label>
          <Search className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-steel-400" aria-hidden="true" />
          <input
            id="q"
            name="q"
            type="search"
            defaultValue={query.q}
            placeholder="Name, email, phone, location…"
            className="w-full pl-9 pr-3 py-2 rounded-lg border border-steel-200 bg-white text-sm outline-none transition-colors focus:border-primary-600 focus:ring-2 focus:ring-primary-600/20"
          />
        </div>

        <select name="stage" defaultValue={query.stage} className="px-3 py-2 rounded-lg border border-steel-200 bg-white text-sm">
          <option value="">All stages</option>
          {STAGES.map((s) => <option key={s} value={s}>{STAGE_LABEL[s]}</option>)}
        </select>

        <select name="source" defaultValue={query.source} className="px-3 py-2 rounded-lg border border-steel-200 bg-white text-sm">
          <option value="">All sources</option>
          {Object.entries(SOURCE_LABEL).map(([v, l]) => <option key={v} value={v}>{l}</option>)}
        </select>

        <button type="submit" className="px-4 py-2 rounded-lg bg-primary-700 text-white text-sm font-semibold hover:bg-primary-800 transition-colors">
          Filter
        </button>
        {filtered && (
          <Link href="/admin/leads" className="px-3 py-2 text-sm text-steel-600 hover:text-primary-700 transition-colors">
            Clear
          </Link>
        )}
      </form>

      {leads.length === 0 ? (
        <div className="bg-white rounded-2xl border border-steel-200 py-16 text-center">
          <Inbox className="w-8 h-8 text-steel-300 mx-auto mb-3" aria-hidden="true" />
          <p className="font-medium text-steel-900">
            {filtered ? "No leads match that filter" : "No leads yet"}
          </p>
          <p className="text-sm text-steel-500 mt-1">
            {filtered ? "Try widening it." : "Website submissions appear here."}
          </p>
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-steel-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-steel-50 border-b border-steel-200 text-left">
                  <Th>Name</Th><Th>Source</Th><Th>Project</Th><Th>Budget</Th>
                  <Th>Stage</Th><Th>Owner</Th><Th>Received</Th>
                </tr>
              </thead>
              <tbody className="divide-y divide-steel-100">
                {leads.map((lead) => (
                  <tr key={lead.id} className="hover:bg-steel-50 transition-colors">
                    <td className="px-4 py-3">
                      <Link href={`/admin/leads/${lead.id}`} className="block">
                        <span className="font-medium text-steel-900 hover:text-primary-700 transition-colors">
                          {lead.name}
                        </span>
                        <span className="block text-xs text-steel-500">{lead.email || "no email"}</span>
                      </Link>
                    </td>
                    <td className="px-4 py-3 text-steel-600 whitespace-nowrap">{SOURCE_LABEL[lead.source]}</td>
                    <td className="px-4 py-3 text-steel-600">{lead.projectType ?? "—"}</td>
                    <td className="px-4 py-3 text-steel-600 whitespace-nowrap">
                      {lead.budgetBand ? (BUDGET_LABEL[lead.budgetBand] ?? lead.budgetBand) : "—"}
                    </td>
                    <td className="px-4 py-3"><StageChip stage={lead.stage} /></td>
                    <td className="px-4 py-3 text-steel-600 whitespace-nowrap">
                      {lead.owner?.name ?? lead.owner?.email ?? <span className="text-steel-400">Unassigned</span>}
                    </td>
                    <td className="px-4 py-3 text-steel-500 tabular whitespace-nowrap">
                      {lead.createdAt.toLocaleDateString("en-NG", { day: "numeric", month: "short", year: "numeric" })}
                      {lead._count.notes > 0 && (
                        <span className="ml-2 inline-flex items-center gap-1 text-steel-400">
                          <MessageSquare className="w-3 h-3" aria-hidden="true" />
                          {lead._count.notes}
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {totalPages > 1 && (
        <nav className="flex items-center justify-between" aria-label="Lead pages">
          <p className="text-sm text-steel-500 tabular">
            {(page - 1) * LEADS_PER_PAGE + 1} to {Math.min(page * LEADS_PER_PAGE, total)} of {total}
          </p>
          <div className="flex gap-2">
            <PageLink href={leadHref({ ...query, page: page - 1 })} disabled={page <= 1} label="Previous">
              <ChevronLeft className="w-4 h-4" />
            </PageLink>
            <PageLink href={leadHref({ ...query, page: page + 1 })} disabled={page >= totalPages} label="Next">
              <ChevronRight className="w-4 h-4" />
            </PageLink>
          </div>
        </nav>
      )}
    </div>
  );
}

function Th({ children }: { children: React.ReactNode }) {
  return <th className="px-4 py-2.5 font-medium text-xs uppercase tracking-wider text-steel-500">{children}</th>;
}

function PageLink({ href, disabled, label, children }: { href: string; disabled: boolean; label: string; children: React.ReactNode }) {
  if (disabled) {
    return <span aria-hidden="true" className="inline-flex items-center justify-center w-9 h-9 rounded-lg border border-steel-100 bg-steel-50 text-steel-300">{children}</span>;
  }
  return <Link href={href} aria-label={label} className="inline-flex items-center justify-center w-9 h-9 rounded-lg border border-steel-200 bg-white text-steel-700 hover:border-primary-400 hover:text-primary-700 transition-colors">{children}</Link>;
}
