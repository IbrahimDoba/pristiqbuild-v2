import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, MapPin, MessageCircle } from "lucide-react";
import { getPortfolioBySlug, getPublishedPortfolio } from "@/lib/portfolio";
import { isRemoteImage } from "@/lib/portfolio-constants";
import { PhotoPlaceholder, TagChip } from "@/components/PortfolioGrid";
import { whatsappLink } from "@/lib/site-config";

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

  const stats = [
    { label: "Area", value: item.sqm },
    { label: "Steel", value: item.steel },
    { label: "Waste", value: item.waste },
  ].filter((s) => s.value);

  const paragraphs = (item.body ?? "")
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter(Boolean);

  return (
    <article className="bg-white">
      <header className="bg-deep-steel text-white">
        <div className="container-custom pt-36 pb-14 md:pt-44 md:pb-16">
          <Link
            href="/projects"
            className="inline-flex items-center gap-1.5 text-sm text-silver/80 hover:text-white transition-colors mb-6"
          >
            <ArrowLeft className="w-4 h-4" aria-hidden="true" />
            All projects
          </Link>
          <div className="mb-4">
            <span className="inline-block bg-white/95 rounded">
              <TagChip tag={item.tag} />
            </span>
          </div>
          <h1 className="heading-xl max-w-3xl mb-4">{item.name}</h1>
          <p className="flex items-center gap-1.5 text-white/80">
            <MapPin className="w-4 h-4" aria-hidden="true" />
            {item.location}
          </p>
        </div>
      </header>

      <div className="container-custom section-padding grid lg:grid-cols-12 gap-10">
        <div className="lg:col-span-7">
          <div className="relative aspect-[16/10] overflow-hidden border border-steel-200 mb-8">
            {item.image ? (
              <Image
                src={item.image}
                alt={item.name}
                fill
                priority
                unoptimized={isRemoteImage(item.image)}
                sizes="(max-width: 1024px) 100vw, 58vw"
                className="object-cover"
              />
            ) : (
              <PhotoPlaceholder label={item.name} />
            )}
          </div>

          <p className="body-lg text-steel-800 mb-6">{item.desc}</p>
          {paragraphs.map((p, i) => (
            <p key={i} className="text-steel-700 leading-relaxed mb-4">
              {p}
            </p>
          ))}
        </div>

        <aside className="lg:col-span-5 space-y-6">
          {stats.length > 0 && (
            <dl className="border border-steel-200 divide-y divide-steel-200">
              {stats.map((s) => (
                <div key={s.label} className="flex items-baseline justify-between gap-4 p-5">
                  <dt className="text-xs uppercase tracking-wider text-steel-500">{s.label}</dt>
                  <dd className="font-display font-bold text-xl text-steel-900 tabular">{s.value}</dd>
                </div>
              ))}
            </dl>
          )}

          <div className="border border-steel-200 p-6">
            <p className="font-display font-semibold text-lg text-steel-900 mb-2">
              Planning something similar?
            </p>
            <p className="text-steel-600 text-sm mb-5">
              Tell us the scope and the site. We&apos;ll come back with a technical
              assessment, not a sales pitch.
            </p>
            <a
              href={whatsappLink(
                `Hello PristiqBuild, I saw the ${item.name} project and have something similar in mind. Scope and site: `
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary-700 text-white rounded-lg font-semibold hover:bg-primary-800 transition-colors"
            >
              <MessageCircle size={18} aria-hidden="true" />
              Chat on WhatsApp
            </a>
          </div>
        </aside>
      </div>
    </article>
  );
}
