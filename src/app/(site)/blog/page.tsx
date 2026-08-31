import type { Metadata } from "next";
import Link from "next/link";
import { Calendar, Clock, ArrowRight, SearchX } from "lucide-react";
import { getAllPostSummaries } from "@/lib/mdx";
import {
  parseBlogQuery,
  queryPosts,
  blogHref,
  POSTS_PER_PAGE,
} from "@/lib/blog-query";
import SafeImage from "@/components/SafeImage";
import BlogFilters from "@/components/blog/BlogFilters";
import BlogPagination from "@/components/blog/BlogPagination";
import JsonLd from "@/components/seo/JsonLd";
import { breadcrumbSchema } from "@/lib/seo/schema";

export const metadata: Metadata = {
  title: "Blog - Light Gauge Steel Construction Insights | PristiqBuild",
  description:
    "Expert insights, guides, and articles on light gauge steel construction in Nigeria. Learn about LGS technology, costs, applications, and best practices.",
};

type SearchParams = Promise<Record<string, string | string[] | undefined>>;

/**
 * The listing renders one page of results, not the whole archive.
 *
 * It previously rendered all 100 posts at once: 402KB of HTML and 106 images
 * on a single page, none of them lazy, which never finished loading on a
 * Nigerian mobile connection. Filtering happens here on the server so each
 * result set stays crawlable and shareable.
 */
export default async function BlogPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const all = getAllPostSummaries();
  const query = parseBlogQuery(await searchParams);
  const { posts, total, page, totalPages, isFiltered } = queryPosts(all, query);

  const categories = Object.entries(
    all.reduce<Record<string, number>>((acc, post) => {
      acc[post.category] = (acc[post.category] ?? 0) + 1;
      return acc;
    }, {})
  )
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count || a.name.localeCompare(b.name));

  return (
    <div className="min-h-screen bg-white">
      <JsonLd
        id="blog-breadcrumb"
        data={breadcrumbSchema([{ name: "Blog", path: "/blog" }])}
      />
      <section className="relative bg-linear-to-r from-primary-700 to-primary-800 text-white py-16 md:py-20">
        <div className="container-custom">
          <div className="max-w-3xl">
            <h1 className="heading-lg mb-5">
              Light Gauge Steel Construction Insights
            </h1>
            <p className="body-lg text-primary-100">
              Practical guidance on light gauge steel technology, costs and
              applications for Nigerian construction projects.
            </p>
          </div>
        </div>
      </section>

      <section className="border-b border-steel-100 bg-steel-50 py-6">
        <div className="container-custom">
          <BlogFilters
            categories={categories}
            activeCategory={query.category}
            activeQuery={query.q}
            resultCount={total}
            totalCount={all.length}
          />
        </div>
      </section>

      <section className="container-custom py-12 md:py-16">
        {posts.length === 0 ? (
          <EmptyState query={query.q} category={query.category} />
        ) : (
          <>
            <ul className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 list-none p-0 m-0">
              {posts.map((post, index) => (
                <li key={post.slug}>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="group flex h-full flex-col bg-white rounded-2xl overflow-hidden border border-steel-100 shadow-sm transition-[box-shadow,transform] duration-300 hover:shadow-xl hover:-translate-y-1"
                  >
                    <div className="relative h-48 bg-steel-100 overflow-hidden">
                      <SafeImage
                        src={post.coverImage}
                        alt={post.coverImageAlt}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 400px"
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        // Only the first row is above the fold on a laptop.
                        priority={index < 3}
                      />
                      <span className="absolute top-3 left-3 px-2.5 py-1 rounded-lg bg-white/95 text-primary-800 text-xs font-semibold">
                        {post.category}
                      </span>
                    </div>

                    <div className="flex flex-1 flex-col p-6">
                      <h2 className="font-display font-semibold text-lg text-steel-900 leading-snug mb-2 group-hover:text-primary-700 transition-colors">
                        {post.title}
                      </h2>
                      <p className="text-sm text-steel-600 leading-relaxed line-clamp-3 mb-5">
                        {post.description}
                      </p>

                      <div className="mt-auto flex items-center gap-4 text-xs text-steel-500">
                        <span className="inline-flex items-center gap-1.5">
                          <Calendar className="w-3.5 h-3.5" aria-hidden="true" />
                          <time dateTime={post.publishDate}>
                            {new Date(post.publishDate).toLocaleDateString(
                              "en-NG",
                              { year: "numeric", month: "short", day: "numeric" }
                            )}
                          </time>
                        </span>
                        <span className="inline-flex items-center gap-1.5">
                          <Clock className="w-3.5 h-3.5" aria-hidden="true" />
                          {post.readTime}
                        </span>
                        <ArrowRight
                          className="w-4 h-4 ml-auto text-primary-600 transition-transform group-hover:translate-x-1"
                          aria-hidden="true"
                        />
                      </div>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>

            <BlogPagination query={query} page={page} totalPages={totalPages} />

            {totalPages > 1 && (
              <p className="mt-6 text-center text-sm text-steel-500 tabular">
                Showing {(page - 1) * POSTS_PER_PAGE + 1} to{" "}
                {Math.min(page * POSTS_PER_PAGE, total)} of {total}
                {isFiltered ? " matching" : ""} articles
              </p>
            )}
          </>
        )}
      </section>
    </div>
  );
}

function EmptyState({ query, category }: { query: string; category: string }) {
  return (
    <div className="max-w-md mx-auto text-center py-16">
      <div className="w-14 h-14 rounded-lg bg-steel-100 flex items-center justify-center mx-auto mb-5">
        <SearchX className="w-7 h-7 text-steel-500" aria-hidden="true" />
      </div>
      <h2 className="font-display font-semibold text-xl text-steel-900 mb-2">
        No articles match that
      </h2>
      <p className="text-steel-600 mb-6">
        {query && category ? (
          <>
            Nothing for &ldquo;{query}&rdquo; in {category}. Try a different
            term, or search across every category.
          </>
        ) : query ? (
          <>Nothing for &ldquo;{query}&rdquo;. Try a shorter or more general term.</>
        ) : (
          <>There are no articles in {category} yet.</>
        )}
      </p>
      <div className="flex flex-wrap justify-center gap-3">
        {query && category && (
          <Link
            href={blogHref({ q: query })}
            scroll={false}
            className="px-5 py-2.5 rounded-lg border border-steel-200 text-steel-700 font-medium hover:border-primary-400 hover:text-primary-700 transition-colors"
          >
            Search all categories
          </Link>
        )}
        <Link
          href="/blog"
          className="px-5 py-2.5 rounded-lg bg-primary-700 text-white font-semibold hover:bg-primary-800 active:translate-y-px transition-[background-color,transform]"
        >
          Browse all articles
        </Link>
      </div>
    </div>
  );
}
