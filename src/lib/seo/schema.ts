import type { BlogPost } from "@/types/blog";
import { allFaqs } from "@/content/faq";

/**
 * Structured data builders.
 *
 * The site already publishes Organization, LocalBusiness and WebSite from
 * StructuredData.tsx. These cover the page types that were emitting nothing:
 * 100 articles, the FAQ, every nested route, and the four service pages.
 *
 * Everything is derived from what the page actually renders. Schema that
 * asserts more than the page shows is the same failure as the invented review
 * rating removed earlier, just harder to spot.
 */

export const SITE = "https://www.pristiqbuild.com";
const ORG = { "@type": "Organization", name: "PristiqBuild", url: SITE } as const;

/** Absolute URL, since structured data cannot use relative paths. */
export function absolute(pathOrUrl: string): string {
  if (/^https?:\/\//.test(pathOrUrl)) return pathOrUrl;
  return `${SITE}${pathOrUrl.startsWith("/") ? "" : "/"}${encodeURI(pathOrUrl)}`;
}

/** "12 min read" -> ISO 8601 duration. Omitted when unparseable. */
function readingTime(readTime?: string): string | undefined {
  const minutes = readTime?.match(/(\d+)/)?.[1];
  return minutes ? `PT${minutes}M` : undefined;
}

export function blogPostingSchema(post: BlogPost) {
  const url = `${SITE}/blog/${post.slug}`;

  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": url,
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    headline: post.title.slice(0, 110), // Google truncates beyond ~110.
    description: post.description,
    image: post.coverImage ? [absolute(post.coverImage)] : undefined,
    datePublished: post.publishDate,
    // No modified date is tracked, so it is not claimed.
    author: { "@type": "Organization", name: post.author, url: SITE },
    publisher: {
      ...ORG,
      logo: {
        "@type": "ImageObject",
        url: absolute("/optimized/Pristiq Build blacktext.webp"),
      },
    },
    articleSection: post.category,
    keywords: post.tags?.join(", "),
    timeRequired: readingTime(post.readTime),
    inLanguage: "en-NG",
    isAccessibleForFree: true,
  };
}

/** Built from the same content the accordion renders, so the two cannot drift. */
export function faqPageSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": `${SITE}/faq`,
    mainEntity: allFaqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };
}

export type Crumb = { name: string; path: string };

export function breadcrumbSchema(crumbs: Crumb[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [{ name: "Home", path: "/" }, ...crumbs].map(
      (crumb, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: crumb.name,
        item: absolute(crumb.path),
      })
    ),
  };
}

export function serviceSchema(service: {
  name: string;
  description: string;
  path: string;
  serviceType: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": absolute(service.path),
    name: service.name,
    description: service.description,
    serviceType: service.serviceType,
    provider: { ...ORG, "@id": `${SITE}/#business` },
    areaServed: { "@type": "Country", name: "Nigeria" },
    // No offers block: no prices are published, and inventing one would be the
    // same mistake as the review rating that was removed.
  };
}
