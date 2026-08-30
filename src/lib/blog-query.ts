import type { BlogPost } from "@/types/blog";

/** Everything the listing needs. Deliberately excludes the article body. */
export type PostSummary = Omit<BlogPost, "content">;

export const POSTS_PER_PAGE = 12;

export type BlogQuery = {
  q: string;
  category: string;
  page: number;
};

/** Read the query off the URL, tolerating anything a visitor might type. */
export function parseBlogQuery(
  params: Record<string, string | string[] | undefined>
): BlogQuery {
  const first = (value: string | string[] | undefined) =>
    (Array.isArray(value) ? value[0] : value) ?? "";

  const page = Number.parseInt(first(params.page), 10);

  return {
    q: first(params.q).trim().slice(0, 80),
    category: first(params.category).trim().slice(0, 80),
    page: Number.isFinite(page) && page > 1 ? page : 1,
  };
}

/**
 * Match against title, description and tags.
 *
 * Not the article body: the bodies share a large amount of templated text, so
 * a full-text match would return most of the archive for almost any term and
 * be worse than useless.
 */
function matches(post: PostSummary, needle: string): boolean {
  const haystack = [post.title, post.description, ...(post.tags ?? [])]
    .join(" ")
    .toLowerCase();

  // Every word must appear somewhere, so extra words narrow rather than widen.
  return needle
    .toLowerCase()
    .split(/\s+/)
    .filter(Boolean)
    .every((word) => haystack.includes(word));
}

export type BlogResult = {
  posts: PostSummary[];
  total: number;
  page: number;
  totalPages: number;
  isFiltered: boolean;
};

export function queryPosts(
  all: PostSummary[],
  { q, category, page }: BlogQuery
): BlogResult {
  const filtered = all.filter((post) => {
    if (category && post.category !== category) return false;
    if (q && !matches(post, q)) return false;
    return true;
  });

  const totalPages = Math.max(1, Math.ceil(filtered.length / POSTS_PER_PAGE));
  const safePage = Math.min(page, totalPages);
  const start = (safePage - 1) * POSTS_PER_PAGE;

  return {
    posts: filtered.slice(start, start + POSTS_PER_PAGE),
    total: filtered.length,
    page: safePage,
    totalPages,
    isFiltered: Boolean(q || category),
  };
}

/** Build a /blog URL, dropping empty values and the redundant page=1. */
export function blogHref(
  query: Partial<BlogQuery> & { page?: number }
): string {
  const params = new URLSearchParams();
  if (query.q) params.set("q", query.q);
  if (query.category) params.set("category", query.category);
  if (query.page && query.page > 1) params.set("page", String(query.page));

  const search = params.toString();
  return search ? `/blog?${search}` : "/blog";
}

/**
 * Posts related to the given one, best match first.
 *
 * Scored on shared tags, with a smaller bonus for the same category, so a post
 * that shares three tags outranks one that merely sits in the same bucket.
 */
export function relatedPosts(
  all: PostSummary[],
  current: { slug: string; category: string; tags?: string[] },
  limit = 3
): PostSummary[] {
  const tags = new Set((current.tags ?? []).map((t) => t.toLowerCase()));

  return all
    .filter((post) => post.slug !== current.slug)
    .map((post) => {
      const shared = (post.tags ?? []).filter((t) =>
        tags.has(t.toLowerCase())
      ).length;
      const score = shared * 2 + (post.category === current.category ? 1 : 0);
      return { post, score };
    })
    .filter((entry) => entry.score > 0)
    .sort(
      (a, b) =>
        b.score - a.score ||
        b.post.publishDate.localeCompare(a.post.publishDate)
    )
    .slice(0, limit)
    .map((entry) => entry.post);
}
