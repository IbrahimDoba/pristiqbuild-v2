import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { blogHref, type BlogQuery } from "@/lib/blog-query";

/**
 * Real links, not buttons, so each page is crawlable and can be opened in a
 * new tab. Window of pages around the current one, with the first and last
 * always reachable.
 */
function pageWindow(current: number, total: number): (number | "gap")[] {
  if (total <= 7) {
    return Array.from({ length: total }, (_, i) => i + 1);
  }

  const pages = new Set<number>([1, total, current]);
  if (current - 1 > 1) pages.add(current - 1);
  if (current + 1 < total) pages.add(current + 1);
  if (current <= 3) pages.add(2).add(3).add(4);
  if (current >= total - 2) pages.add(total - 1).add(total - 2).add(total - 3);

  const ordered = [...pages].filter((p) => p >= 1 && p <= total).sort((a, b) => a - b);

  const out: (number | "gap")[] = [];
  let previous = 0;
  for (const page of ordered) {
    if (previous && page - previous > 1) out.push("gap");
    out.push(page);
    previous = page;
  }
  return out;
}

export default function BlogPagination({
  query,
  page,
  totalPages,
}: {
  query: BlogQuery;
  page: number;
  totalPages: number;
}) {
  if (totalPages <= 1) return null;

  const link = (n: number) => blogHref({ ...query, page: n });

  const base =
    "inline-flex items-center justify-center min-w-10 h-10 px-3 rounded-lg text-sm font-medium transition-colors tabular";
  const idle =
    "bg-white text-steel-700 border border-steel-200 hover:border-primary-400 hover:text-primary-700";
  const disabled =
    "bg-steel-50 text-steel-300 border border-steel-100 cursor-not-allowed";

  return (
    <nav
      className="flex flex-wrap items-center justify-center gap-2 mt-14"
      aria-label="Article pages"
    >
      {page > 1 ? (
        <Link href={link(page - 1)} scroll={false} rel="prev" className={`${base} ${idle}`}>
          <ChevronLeft className="w-4 h-4" aria-hidden="true" />
          <span className="sr-only">Previous page</span>
        </Link>
      ) : (
        <span className={`${base} ${disabled}`} aria-hidden="true">
          <ChevronLeft className="w-4 h-4" />
        </span>
      )}

      {pageWindow(page, totalPages).map((entry, i) =>
        entry === "gap" ? (
          <span key={`gap-${i}`} className="px-1 text-steel-400" aria-hidden="true">
            &hellip;
          </span>
        ) : (
          <Link
            key={entry}
            href={link(entry)}
            scroll={false}
            aria-current={entry === page ? "page" : undefined}
            aria-label={`Page ${entry}`}
            className={`${base} ${
              entry === page ? "bg-primary-700 text-white border border-primary-700" : idle
            }`}
          >
            {entry}
          </Link>
        )
      )}

      {page < totalPages ? (
        <Link href={link(page + 1)} scroll={false} rel="next" className={`${base} ${idle}`}>
          <ChevronRight className="w-4 h-4" aria-hidden="true" />
          <span className="sr-only">Next page</span>
        </Link>
      ) : (
        <span className={`${base} ${disabled}`} aria-hidden="true">
          <ChevronRight className="w-4 h-4" />
        </span>
      )}
    </nav>
  );
}
