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
  slug: string;
  name: string;
  location: string;
  tag: PortfolioTag;
  featured: boolean;
  desc: string;
  body: string | null;
  sqm: string | null;
  steel: string | null;
  waste: string | null;
  image: string | null;
  published: boolean;
  sortOrder: number;
};

/** Every entry's public page. Hand-built pages share the same URL shape. */
export function projectHref(slug: string) {
  return `/projects/${slug}`;
}

/** Remote photos skip the optimiser, which only allows listed hosts. */
export function isRemoteImage(src: string) {
  return /^https?:\/\//.test(src);
}

/** "Akure Residence, Ondo" -> "akure-residence-ondo". */
export function slugify(text: string) {
  return text
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}
