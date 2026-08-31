import { getDb } from "@/lib/db";
import { LeadStage, LeadSource, Prisma } from "@/generated/prisma/client";

export const LEADS_PER_PAGE = 25;

/** Pipeline order. Drives both the board columns and the stage control. */
export const STAGES: LeadStage[] = [
  LeadStage.NEW,
  LeadStage.CONTACTED,
  LeadStage.QUOTED,
  LeadStage.WON,
  LeadStage.LOST,
];

export const STAGE_LABEL: Record<LeadStage, string> = {
  NEW: "New",
  CONTACTED: "Contacted",
  QUOTED: "Quoted",
  WON: "Won",
  LOST: "Lost",
};

export const SOURCE_LABEL: Record<LeadSource, string> = {
  CONTACT_FORM: "Contact form",
  QUOTE_FORM: "Quote request",
  CALCULATOR: "Cost calculator",
  NEWSLETTER: "Newsletter",
  WHATSAPP: "WhatsApp",
};

export const BUDGET_LABEL: Record<string, string> = {
  "under-10m": "Under ₦10M",
  "10m-25m": "₦10M to ₦25M",
  "25m-50m": "₦25M to ₦50M",
  "50m-100m": "₦50M to ₦100M",
  "over-100m": "Over ₦100M",
};

export type LeadQuery = {
  q: string;
  stage: LeadStage | "";
  source: LeadSource | "";
  page: number;
};

const isStage = (v: string): v is LeadStage => STAGES.includes(v as LeadStage);
const isSource = (v: string): v is LeadSource =>
  Object.keys(SOURCE_LABEL).includes(v);

/** Read the filter off the URL, tolerating anything a person might type. */
export function parseLeadQuery(
  params: Record<string, string | string[] | undefined>
): LeadQuery {
  const first = (v: string | string[] | undefined) =>
    (Array.isArray(v) ? v[0] : v) ?? "";

  const stage = first(params.stage);
  const source = first(params.source);
  const page = Number.parseInt(first(params.page), 10);

  return {
    q: first(params.q).trim().slice(0, 80),
    stage: isStage(stage) ? stage : "",
    source: isSource(source) ? source : "",
    page: Number.isFinite(page) && page > 1 ? page : 1,
  };
}

function whereFor({ q, stage, source }: LeadQuery): Prisma.LeadWhereInput {
  return {
    ...(stage ? { stage } : {}),
    ...(source ? { source } : {}),
    ...(q
      ? {
          OR: [
            { name: { contains: q, mode: "insensitive" as const } },
            { email: { contains: q, mode: "insensitive" as const } },
            { phone: { contains: q } },
            { location: { contains: q, mode: "insensitive" as const } },
            { message: { contains: q, mode: "insensitive" as const } },
          ],
        }
      : {}),
  };
}

export async function listLeads(query: LeadQuery) {
  const db = getDb();
  const where = whereFor(query);

  const [total, leads] = await Promise.all([
    db.lead.count({ where }),
    db.lead.findMany({
      where,
      orderBy: { createdAt: "desc" },
      skip: (query.page - 1) * LEADS_PER_PAGE,
      take: LEADS_PER_PAGE,
      include: {
        owner: { select: { id: true, name: true, email: true } },
        _count: { select: { notes: true } },
      },
    }),
  ]);

  return {
    leads,
    total,
    page: query.page,
    totalPages: Math.max(1, Math.ceil(total / LEADS_PER_PAGE)),
  };
}

export function getLead(id: string) {
  return getDb().lead.findUnique({
    where: { id },
    include: {
      owner: { select: { id: true, name: true, email: true } },
      notes: {
        orderBy: { createdAt: "desc" },
        include: { author: { select: { name: true, email: true } } },
      },
    },
  });
}

/** Counts for the overview. One round trip per grouping, not per stage. */
export async function leadStats() {
  const db = getDb();
  const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);

  const [byStage, bySource, total, thisWeek, unnotified] = await Promise.all([
    db.lead.groupBy({ by: ["stage"], _count: true }),
    db.lead.groupBy({ by: ["source"], _count: true }),
    db.lead.count(),
    db.lead.count({ where: { createdAt: { gte: weekAgo } } }),
    // A lead nobody was told about. Worth surfacing: it means the notification
    // failed, or no mail provider is configured yet.
    db.lead.count({
      where: { notifiedAt: null, source: { not: LeadSource.CALCULATOR } },
    }),
  ]);

  const stageCounts = Object.fromEntries(STAGES.map((s) => [s, 0])) as Record<
    LeadStage,
    number
  >;
  for (const row of byStage) stageCounts[row.stage] = row._count;

  return { stageCounts, bySource, total, thisWeek, unnotified };
}

export function leadHref(query: Partial<LeadQuery>): string {
  const p = new URLSearchParams();
  if (query.q) p.set("q", query.q);
  if (query.stage) p.set("stage", query.stage);
  if (query.source) p.set("source", query.source);
  if (query.page && query.page > 1) p.set("page", String(query.page));
  const s = p.toString();
  return s ? `/admin/leads?${s}` : "/admin/leads";
}
