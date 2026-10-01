import { getDb } from "@/lib/db";
import type { PortfolioEntry } from "@/lib/portfolio-constants";

const SELECT = {
  id: true,
  name: true,
  location: true,
  tag: true,
  featured: true,
  desc: true,
  sqm: true,
  steel: true,
  waste: true,
  href: true,
  image: true,
  published: true,
  sortOrder: true,
} as const;

/**
 * Published portfolio entries, in display order.
 *
 * Public pages call this, and they must still render when the database is
 * unreachable (a build without DATABASE_URL, or an outage). An empty list
 * shows the "being updated" state instead of taking the page down.
 */
export async function getPublishedPortfolio(): Promise<PortfolioEntry[]> {
  try {
    return await getDb().portfolioItem.findMany({
      where: { published: true },
      orderBy: [{ sortOrder: "asc" }, { createdAt: "asc" }],
      select: SELECT,
    });
  } catch (error) {
    console.error("[portfolio] could not load entries", error);
    return [];
  }
}

/** Every entry, drafts included. Admin only; errors are not swallowed. */
export async function getAllPortfolio(): Promise<PortfolioEntry[]> {
  return getDb().portfolioItem.findMany({
    orderBy: [{ sortOrder: "asc" }, { createdAt: "asc" }],
    select: SELECT,
  });
}

/** The featured entry: the flagged one with the lowest sort order. */
export function pickFeatured(items: PortfolioEntry[]): PortfolioEntry | undefined {
  return items.find((i) => i.featured);
}
