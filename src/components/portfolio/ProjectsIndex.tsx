import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { isRemoteImage, projectHref, type PortfolioEntry } from "@/lib/portfolio-constants";
import PortfolioGrid, { PhotoPlaceholder, TagChip } from "@/components/PortfolioGrid";

/**
 * The body of /projects: the featured case study, then every other entry.
 *
 * Shared with the live preview in /admin/portfolio. `items` are published
 * entries in display order; the first featured one leads.
 */
export default function ProjectsIndex({ items }: { items: PortfolioEntry[] }) {
  const featured = items.find((i) => i.featured);
  const rest = items.filter((i) => i !== featured);

  return (
    <>
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
                  unoptimized={isRemoteImage(featured.image)}
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

              <Link
                href={projectHref(featured.slug)}
                className="inline-flex items-center gap-2 font-semibold text-primary-700 hover:text-primary-800 transition-colors"
              >
                Read the case study
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </Link>
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
    </>
  );
}
