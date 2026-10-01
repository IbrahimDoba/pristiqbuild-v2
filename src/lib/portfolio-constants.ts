import type { PortfolioTag } from "@/generated/prisma/client";

/**
 * Labels for the portfolio tags. Kept apart from lib/portfolio.ts so client
 * components can import them without pulling in the database client.
 */
export const TAGS: PortfolioTag[] = [
  "LGS_ROOFING",
  "STRUCTURAL",
  "CONVENTIONAL",
  "MODULAR_STYLE",
  "IN_DEVELOPMENT",
];

export const TAG_LABEL: Record<PortfolioTag, string> = {
  LGS_ROOFING: "LGS Roofing",
  STRUCTURAL: "Structural",
  CONVENTIONAL: "Conventional",
  MODULAR_STYLE: "Modular-style",
  IN_DEVELOPMENT: "In Development",
};

/** Plain shape handed from server to client components. */
export type PortfolioEntry = {
  id: string;
  name: string;
  location: string;
  tag: PortfolioTag;
  featured: boolean;
  desc: string;
  sqm: string | null;
  steel: string | null;
  waste: string | null;
  href: string | null;
  image: string | null;
  published: boolean;
  sortOrder: number;
};
