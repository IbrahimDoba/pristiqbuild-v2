import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, MessageCircle } from "lucide-react";
import { getPublishedPortfolio, pickFeatured } from "@/lib/portfolio";
import PortfolioGrid, { PhotoPlaceholder, TagChip } from "@/components/PortfolioGrid";
import { WA, whatsappLink } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "LGS roofing, structural steel and development work PristiqBuild has delivered or is delivering, across Abuja and beyond.",
  alternates: { canonical: "/projects" },
};

// Rebuilt at most hourly, and immediately whenever /admin/portfolio saves
// (the actions call revalidatePath). Visitors never wait on the database.
export const revalidate = 3600;

export default async function ProjectsPage() {
  const items = await getPublishedPortfolio();
  const featured = pickFeatured(items);
  const rest = items.filter((i) => i !== featured);

  return (
    <div className="bg-white">
      <section className="bg-deep-steel text-white">
        <div className="container-custom pt-36 pb-16 md:pt-44 md:pb-20">
          <p className="text-sm font-semibold uppercase tracking-wider text-silver/80 mb-4">
            Projects
          </p>
          <h1 className="heading-xl max-w-3xl mb-6">Work we have delivered.</h1>
          <p className="body-lg text-white/85 max-w-2xl">
            Every project here is real work we&apos;ve delivered or are currently
            delivering. This list updates directly, no rebuild needed each time a
            job wraps up.
          </p>
        </div>
      </section>

      {featured && (
        <section className="section-padding border-b border-steel-200" aria-labelledby="featured-heading">
          <div className="container-custom grid lg:grid-cols-12 gap-10 items-center">
            <div className="relative lg:col-span-7 aspect-[16/10] overflow-hidden border border-steel-200">
              {featured.image ? (
                <Image
                  src={featured.image}
                  alt={featured.name}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 58vw"
                  className="object-cover"
                />
              ) : (
                <PhotoPlaceholder label={featured.name} />
              )}
            </div>
            <div className="lg:col-span-5">
              <p className="text-xs font-semibold uppercase tracking-wider text-steel-500 mb-3">
                Featured case study
              </p>
              <TagChip tag={featured.tag} />
              <h2 id="featured-heading" className="heading-lg text-steel-900 mt-3 mb-2">
                {featured.name}
              </h2>
              <p className="text-steel-500 mb-5">{featured.location}</p>
              <p className="text-steel-700 leading-relaxed mb-8">{featured.desc}</p>

              {(featured.sqm || featured.steel || featured.waste) && (
                <dl className="grid grid-cols-3 border-y border-steel-200 divide-x divide-steel-200 mb-8">
                  {[
                    { label: "Roof area", value: featured.sqm },
                    { label: "Steel", value: featured.steel },
                    { label: "Waste", value: featured.waste },
                  ]
                    .filter((s) => s.value)
                    .map((s) => (
                      <div key={s.label} className="py-4 px-3 first:pl-0">
                        <dt className="text-xs uppercase tracking-wider text-steel-500">{s.label}</dt>
                        <dd className="font-display font-bold text-lg text-steel-900 tabular mt-1">
                          {s.value}
                        </dd>
                      </div>
                    ))}
                </dl>
              )}

              {featured.href && (
                <Link
                  href={featured.href}
                  className="inline-flex items-center gap-2 font-semibold text-primary-700 hover:text-primary-800 transition-colors"
                >
                  Read the case study
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </Link>
              )}
            </div>
          </div>
        </section>
      )}

      <section className="section-padding" aria-labelledby="all-projects">
        <div className="container-custom">
          <h2 id="all-projects" className="heading-md text-steel-900 mb-6">
            All projects
          </h2>
          {rest.length > 0 ? (
            <PortfolioGrid items={rest} />
          ) : (
            <p className="text-steel-600 py-12 border border-steel-200 text-center">
              The project list is being updated. Ask us on WhatsApp for recent work.
            </p>
          )}
        </div>
      </section>

      <section className="bg-deep-steel text-white">
        <div className="container-custom py-16 flex flex-wrap items-center justify-between gap-6">
          <p className="heading-sm max-w-xl">
            Have a roofing, structural or development project in mind?
          </p>
          <a
            href={whatsappLink(WA.projectScope)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-7 py-4 bg-white text-primary-800 rounded-lg font-semibold hover:bg-silver transition-colors"
          >
            <MessageCircle size={20} aria-hidden="true" />
            Tell us the scope
          </a>
        </div>
      </section>
    </div>
  );
}
