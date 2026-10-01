import { getDb } from "@/lib/db";
import type { PortfolioEntry } from "@/lib/portfolio-constants";

const SELECT = {
  id: true,
  slug: true,
  name: true,
  location: true,
  tag: true,
  featured: true,
  desc: true,
  body: true,
  sqm: true,
  steel: true,
  waste: true,
  image: true,
  published: true,
  sortOrder: true,
} as const;

const ORDER = [{ sortOrder: "asc" as const }, { createdAt: "asc" as const }];

/**
 * Public pages call these, and they must still render when the database is
 * unreachable (a build without DATABASE_URL, or an outage). They return
 * empty instead of throwing, and each page decides what empty looks like.
 */
async function safely<T>(label: string, fallback: T, run: () => Promise<T>): Promise<T> {
  try {
    return await run();
  } catch (error) {
    console.error(`[portfolio] ${label} failed`, error);
    return fallback;
  }
}

/** Published entries, in display order. */
export function getPublishedPortfolio(): Promise<PortfolioEntry[]> {
  return safely("list", [], () =>
    getDb().portfolioItem.findMany({ where: { published: true }, orderBy: ORDER, select: SELECT })
  );
}

/** Published and featured: the homepage strip. */
export function getFeaturedPortfolio(): Promise<PortfolioEntry[]> {
  return safely("featured", [], () =>
    getDb().portfolioItem.findMany({
      where: { published: true, featured: true },
      orderBy: ORDER,
      select: SELECT,
    })
  );
}

/** One published entry, for its own page. */
export function getPortfolioBySlug(slug: string): Promise<PortfolioEntry | null> {
  return safely("by slug", null, () =>
    getDb().portfolioItem.findFirst({ where: { slug, published: true }, select: SELECT })
  );
}

/** Every entry, drafts included. Admin only; errors are not swallowed. */
export function getAllPortfolio(): Promise<PortfolioEntry[]> {
  return getDb().portfolioItem.findMany({ orderBy: ORDER, select: SELECT });
}
