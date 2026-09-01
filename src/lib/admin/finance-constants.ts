// Type-only imports are erased at build, so this module stays free of the
// Prisma runtime and is safe to import from a client component. Everything
// here is a label, a list or a pure function.
import type { ExpenseCategory, ProjectStatus } from "@/generated/prisma/client";

export const CATEGORY_LABEL: Record<ExpenseCategory, string> = {
  MATERIALS: "Materials",
  LABOUR: "Labour",
  EQUIPMENT: "Equipment",
  TRANSPORT: "Transport",
  PERMITS: "Permits & fees",
  SUBCONTRACTOR: "Subcontractor",
  PROFESSIONAL_FEES: "Professional fees",
  UTILITIES: "Utilities",
  OTHER: "Other",
};

export const CATEGORIES = Object.keys(CATEGORY_LABEL) as ExpenseCategory[];

export const STATUS_LABEL: Record<ProjectStatus, string> = {
  PLANNING: "Planning",
  ACTIVE: "Active",
  ON_HOLD: "On hold",
  COMPLETED: "Completed",
  CANCELLED: "Cancelled",
};

export const STATUSES = Object.keys(STATUS_LABEL) as ProjectStatus[];

export const naira = new Intl.NumberFormat("en-NG", {
  style: "currency",
  currency: "NGN",
  maximumFractionDigits: 0,
});

/**
 * Matches a spoken project name to a real one.
 *
 * Deliberately done in code rather than by the model. A fuzzy match that bills
 * the wrong job is the expensive failure, so the rule is conservative: exact
 * match, then containment, and nothing else. An unmatched or ambiguous name
 * leaves the field empty for a person to choose.
 */
export function matchProject(
  spoken: string | null,
  projects: { id: string; name: string }[]
): string | null {
  if (!spoken) return null;
  const needle = spoken.trim().toLowerCase();
  if (!needle) return null;

  const exact = projects.find((p) => p.name.toLowerCase() === needle);
  if (exact) return exact.id;

  const contains = projects.filter(
    (p) => p.name.toLowerCase().includes(needle) || needle.includes(p.name.toLowerCase())
  );
  // Ambiguity is not resolved by picking the first one.
  return contains.length === 1 ? contains[0].id : null;
}
