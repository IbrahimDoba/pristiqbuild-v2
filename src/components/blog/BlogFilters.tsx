"use client";

import { useEffect, useRef, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Search, X, Loader2 } from "lucide-react";
import { blogHref } from "@/lib/blog-query";

/**
 * Search box and category filter.
 *
 * The filtering itself happens on the server; this only writes the query into
 * the URL. That keeps every result set crawlable and shareable, and means the
 * page never has to ship all 100 posts to the browser to filter them.
 */
export default function BlogFilters({
  categories,
  activeCategory,
  activeQuery,
  resultCount,
  totalCount,
}: {
  categories: { name: string; count: number }[];
  activeCategory: string;
  activeQuery: string;
  resultCount: number;
  totalCount: number;
}) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [term, setTerm] = useState(activeQuery);
  const isFirstRender = useRef(true);

  // Keep the field in step when the visitor uses the back button.
  useEffect(() => {
    setTerm(activeQuery);
  }, [activeQuery]);

  // Debounce so typing does not fire a navigation per keystroke.
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    if (term === activeQuery) return;

    const timer = setTimeout(() => {
      startTransition(() => {
        router.replace(blogHref({ q: term, category: activeCategory }), {
          scroll: false,
        });
      });
    }, 300);

    return () => clearTimeout(timer);
  }, [term, activeQuery, activeCategory, router]);

  const isFiltered = Boolean(activeQuery || activeCategory);

  return (
    <div className="space-y-5">
      <div className="flex flex-col lg:flex-row lg:items-center gap-4">
        <div className="relative flex-1 max-w-md">
          <label htmlFor="blog-search" className="sr-only">
            Search articles
          </label>
          <Search
            className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-steel-400"
            aria-hidden="true"
          />
          <input
            id="blog-search"
            type="search"
            value={term}
            onChange={(e) => setTerm(e.target.value)}
            placeholder="Search articles"
            className="w-full pl-12 pr-11 py-3 rounded-lg border border-steel-200 bg-white text-steel-900 placeholder-steel-400 outline-none transition-colors focus:border-primary-600 focus:ring-2 focus:ring-primary-600/20"
          />
          {isPending && (
            <Loader2
              className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-steel-400 animate-spin"
              aria-hidden="true"
            />
          )}
        </div>

        <p
          className="text-sm text-steel-600 lg:ml-auto tabular"
          aria-live="polite"
        >
          {isFiltered ? (
            <>
              <strong className="text-steel-900">{resultCount}</strong> of{" "}
              {totalCount} articles
            </>
          ) : (
            <>
              <strong className="text-steel-900">{totalCount}</strong> articles
            </>
          )}
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <Link
          href={blogHref({ q: activeQuery })}
          scroll={false}
          aria-current={!activeCategory ? "true" : undefined}
          className={`px-3.5 py-1.5 rounded-lg text-sm font-medium transition-colors ${
            !activeCategory
              ? "bg-primary-700 text-white"
              : "bg-white text-steel-700 border border-steel-200 hover:border-primary-400 hover:text-primary-700"
          }`}
        >
          All
        </Link>

        {categories.map((category) => {
          const isActive = category.name === activeCategory;
          return (
            <Link
              key={category.name}
              href={blogHref({
                q: activeQuery,
                category: isActive ? "" : category.name,
              })}
              scroll={false}
              aria-current={isActive ? "true" : undefined}
              className={`px-3.5 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                isActive
                  ? "bg-primary-700 text-white"
                  : "bg-white text-steel-700 border border-steel-200 hover:border-primary-400 hover:text-primary-700"
              }`}
            >
              {category.name}
              <span
                className={`ml-1.5 tabular ${isActive ? "text-white/70" : "text-steel-400"}`}
              >
                {category.count}
              </span>
            </Link>
          );
        })}

        {isFiltered && (
          <Link
            href="/blog"
            scroll={false}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-sm font-medium text-steel-600 hover:text-primary-700 transition-colors"
          >
            <X className="w-3.5 h-3.5" />
            Clear
          </Link>
        )}
      </div>
    </div>
  );
}
