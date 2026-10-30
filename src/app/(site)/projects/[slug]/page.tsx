import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPortfolioBySlug, getPublishedPortfolio } from "@/lib/portfolio";
import ProjectDetail from "@/components/portfolio/ProjectDetail";

/**
 * The page for any project added in /admin/portfolio.
 *
 * The five projects with hand-built pages (akure-lgs-roofing and so on) have
 * their own folders next to this one, and Next serves a static segment ahead
 * of a dynamic one, so this only renders for the rest.
 */

// Cached, rebuilt at most hourly and immediately when the admin saves.
// Slugs added after the build render on first request.
export const revalidate = 3600;

export async function generateStaticParams() {
  const items = await getPublishedPortfolio();
  return items.map((item) => ({ slug: item.slug }));
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const item = await getPortfolioBySlug(slug);
  if (!item) return { title: "Project not found" };
  return {
    title: `${item.name}, ${item.location}`,
    description: item.desc,
    alternates: { canonical: `/projects/${item.slug}` },
  };
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const item = await getPortfolioBySlug(slug);
  if (!item) notFound();

  return <ProjectDetail item={item} />;
}
