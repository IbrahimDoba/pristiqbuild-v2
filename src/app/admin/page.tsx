import Link from "next/link";
import { getDb } from "@/lib/db";
import {
  leadStats,
  STAGES,
  STAGE_LABEL,
  SOURCE_LABEL,
  leadHref,
} from "@/lib/admin/leads";
import { AlertTriangle, ArrowRight } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function AdminOverview() {
  const [stats, recent] = await Promise.all([
    leadStats(),
    getDb().lead.findMany({
      orderBy: { createdAt: "desc" },
      take: 6,
      select: {
        id: true,
        name: true,
        email: true,
        source: true,
        stage: true,
        createdAt: true,
      },
    }),
  ]);

  const open = stats.stageCounts.NEW + stats.stageCounts.CONTACTED + stats.stageCounts.QUOTED;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display font-bold text-2xl text-steel-900">Overview</h1>
        <p className="text-steel-600 mt-1">Everything the website has captured.</p>
      </div>

      {stats.unnotified > 0 && (
        <div
          role="alert"
          className="flex items-start gap-3 rounded-2xl border border-amber-300 bg-amber-50 p-4"
        >
          <AlertTriangle className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" aria-hidden="true" />
          <div>
            <p className="font-semibold text-amber-900">
              {stats.unnotified} lead{stats.unnotified === 1 ? "" : "s"} saved but not emailed
            </p>
            <p className="text-sm text-amber-800 mt-0.5">
              They are safe in the database. This means no mail provider is
              configured, or sending failed. Set RESEND_API_KEY, or switch the
              transport in lib/leads/notify.ts.
            </p>
          </div>
        </div>
      )}

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Stat label="Total leads" value={stats.total} />
        <Stat label="Last 7 days" value={stats.thisWeek} />
        <Stat label="Open" value={open} hint="New, contacted or quoted" />
        <Stat label="Won" value={stats.stageCounts.WON} />
      </div>

      <section className="bg-white rounded-2xl border border-steel-200 p-6">
        <h2 className="font-display font-semibold text-steel-900 mb-4">Pipeline</h2>
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
          {STAGES.map((stage) => (
            <Link
              key={stage}
              href={leadHref({ stage })}
              className="rounded-lg border border-steel-200 p-4 hover:border-primary-400 transition-colors"
            >
              <div className="font-display font-bold text-2xl text-steel-900 tabular">
                {stats.stageCounts[stage]}
              </div>
              <div className="text-sm text-steel-600 mt-0.5">{STAGE_LABEL[stage]}</div>
            </Link>
          ))}
        </div>
      </section>

      <section className="bg-white rounded-2xl border border-steel-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-display font-semibold text-steel-900">Latest</h2>
          <Link
            href="/admin/leads"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary-700 hover:text-primary-800 transition-colors"
          >
            All leads
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </Link>
        </div>

        {recent.length === 0 ? (
          <p className="text-steel-500 py-8 text-center">
            Nothing captured yet. Submissions from the website appear here.
          </p>
        ) : (
          <ul className="divide-y divide-steel-100 list-none p-0 m-0">
            {recent.map((lead) => (
              <li key={lead.id}>
                <Link
                  href={`/admin/leads/${lead.id}`}
                  className="flex items-center gap-4 py-3 hover:bg-steel-50 -mx-2 px-2 rounded-lg transition-colors"
                >
                  <div className="min-w-0 flex-1">
                    <p className="font-medium text-steel-900 truncate">{lead.name}</p>
                    <p className="text-sm text-steel-500 truncate">{lead.email || "no email"}</p>
                  </div>
                  <span className="hidden sm:block text-xs text-steel-500 whitespace-nowrap">
                    {SOURCE_LABEL[lead.source]}
                  </span>
                  <StageChip stage={lead.stage} />
                  <time
                    dateTime={lead.createdAt.toISOString()}
                    className="text-xs text-steel-400 tabular whitespace-nowrap"
                  >
                    {lead.createdAt.toLocaleDateString("en-NG", {
                      day: "numeric",
                      month: "short",
                    })}
                  </time>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}

function Stat({ label, value, hint }: { label: string; value: number; hint?: string }) {
  return (
    <div className="bg-white rounded-2xl border border-steel-200 p-5">
      <div className="font-display font-bold text-3xl text-steel-900 tabular">{value}</div>
      <div className="text-sm text-steel-600 mt-1">{label}</div>
      {hint && <div className="text-xs text-steel-400 mt-0.5">{hint}</div>}
    </div>
  );
}

export function StageChip({ stage }: { stage: keyof typeof STAGE_LABEL }) {
  const tone: Record<string, string> = {
    NEW: "bg-primary-50 text-primary-800 border-primary-200",
    CONTACTED: "bg-steel-100 text-steel-700 border-steel-200",
    QUOTED: "bg-amber-50 text-amber-800 border-amber-200",
    WON: "bg-green-50 text-green-800 border-green-200",
    LOST: "bg-steel-50 text-steel-500 border-steel-200",
  };
  return (
    <span
      className={`px-2 py-0.5 rounded-lg border text-xs font-medium whitespace-nowrap ${tone[stage]}`}
    >
      {STAGE_LABEL[stage]}
    </span>
  );
}
