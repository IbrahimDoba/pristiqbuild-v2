import type { PortfolioEntry } from "@/lib/portfolio-constants";

/**
 * The postMessage protocol between the portfolio editor and the preview frame
 * at /preview/portfolio. Both sides are same-origin and check it.
 */

export const PREVIEW_UPDATE = "pristiq:portfolio-preview";
export const PREVIEW_READY = "pristiq:portfolio-preview-ready";

/** Which public surface the frame shows. */
export type PreviewView = "page" | "list" | "home";

export type PreviewUpdate = {
  type: typeof PREVIEW_UPDATE;
  view: PreviewView;
  /** The entry being edited, as it stands in the form. */
  item: PortfolioEntry;
  /** Every other published entry, in display order. */
  others: PortfolioEntry[];
};

/**
 * The published list as it will be once the draft is saved: the draft in
 * its sort position among the others, or absent if it is hidden.
 */
export function withDraft(item: PortfolioEntry, others: PortfolioEntry[]) {
  const rest = others.filter((o) => o.id !== item.id);
  if (!item.published) return rest;
  const at = rest.findIndex((o) => o.sortOrder > item.sortOrder);
  return at === -1 ? [...rest, item] : [...rest.slice(0, at), item, ...rest.slice(at)];
}
