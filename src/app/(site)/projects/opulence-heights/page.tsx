import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Check, Clock, MessageCircle } from "lucide-react";
import { ProjectGallery } from "@/components/project-ui";
import { WA, whatsappLink } from "@/lib/site-config";

/*
 * Every image on this page is a render of the planned estate, not a photo of
 * built work. Captions and alt text say so. Phase 1 is at foundation stage.
 */

const confirmed = [
  "Location: Dawaki Hillside, Abuja",
  "Joint venture: PristiqBuild + EFAB Properties",
  "18 villas, 5 ensuite bedrooms plus BQ each",
];

const underConstruction = [
  "Phase 1 at foundation stage",
  "Construction method is conventional reinforced concrete (updated from the original LGS plan)",
  "Targeted for delivery within 12 months of groundbreaking",
];

const planned = [
  "Solar power and battery storage",
  "Smart-home app controls",
  "EV charging point",
  "Remaining villas across later phases",
];

const renders = [
  { src: "/dawaki estate/1.png", alt: "Render of an Opulence Heights villa exterior" },
  { src: "/dawaki estate/2.png", alt: "Render of a villa exterior, alternate view" },
  { src: "/dawaki estate/7.png", alt: "Render of the estate landscape" },
  { src: "/dawaki estate/PRISTIQ ESTATE_1 - Photo.png", alt: "Render of a villa front elevation" },
  { src: "/dawaki estate/PRISTIQ ESTATE_4 - Photo.png", alt: "Render of an interior concept" },
  { src: "/dawaki estate/PRISTIQ ESTATE_7 - Photo.png", alt: "Render of a living space concept" },
  { src: "/dawaki estate/PRISTIQ ESTATE_11 - Photo (1).png", alt: "Render of a kitchen concept" },
  { src: "/dawaki estate/PRISTIQ ESTATE_12 - Photo.png", alt: "Render of a bedroom concept" },
].map((r) => ({ ...r, caption: "Artist's impression, not built work" }));

function StatusList({
  heading,
  items,
  tone,
}: {
  heading: string;
  items: string[];
  tone: "steel" | "oxide";
}) {
  const oxide = tone === "oxide";
  return (
    <div className={`p-6 sm:p-8 border-t-2 ${oxide ? "border-oxide" : "border-primary-700"}`}>
      <h3 className={`font-display font-bold text-xl mb-5 ${oxide ? "text-oxide" : "text-steel-900"}`}>
        {heading}
      </h3>
      <ul className="space-y-3">
        {items.map((item) => (
          <li key={item} className="flex items-start gap-3 text-steel-700 leading-relaxed">
            {oxide ? (
              <Clock className="w-4 h-4 mt-1 shrink-0 text-oxide" aria-hidden="true" />
            ) : (
              <Check className="w-4 h-4 mt-1 shrink-0 text-primary-700" aria-hidden="true" />
            )}
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function OpulenceHeightsProject() {
  const pricingHref = whatsappLink(WA.opulencePricing);

  return (
    <div className="bg-white">
      {/* Hero */}
      <section className="bg-deep-steel text-white">
        <div className="container-custom pt-36 pb-16 md:pt-44 md:pb-20 grid lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-6">
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 text-sm text-silver hover:text-white transition-colors mb-8"
            >
              <ArrowLeft className="w-4 h-4" aria-hidden="true" />
              All projects
            </Link>
            <p className="text-sm font-semibold uppercase tracking-wider text-silver/80 mb-4">
              Development
            </p>
            <h1 className="heading-xl mb-6">Opulence Heights, Dawaki Hillside, Abuja</h1>
            <p className="body-lg text-white/85 max-w-xl mb-8">
              18 villas, 5 ensuite bedrooms plus BQ each, developed in joint venture with
              EFAB Properties.
            </p>
            <p className="inline-flex items-center gap-2 px-3 py-1.5 bg-oxide text-white text-sm font-semibold rounded">
              <Clock className="w-4 h-4" aria-hidden="true" />
              Foundation stage · 12-month delivery target
            </p>
          </div>
          <figure className="lg:col-span-6">
            <div className="relative aspect-[4/3] overflow-hidden border border-white/15">
              <Image
                src="/dawaki estate/1.png"
                alt="Render of an Opulence Heights villa, as planned"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
              <span className="absolute top-3 left-3 px-2 py-0.5 bg-black/70 text-white text-xs font-semibold uppercase tracking-wider rounded">
                Render
              </span>
            </div>
            <figcaption className="text-sm text-silver/80 mt-3">
              Artist&apos;s impression of the planned estate. Phase 1 is at foundation stage.
            </figcaption>
          </figure>
        </div>
      </section>

      {/* Status */}
      <section className="section-padding border-b border-steel-200" aria-labelledby="status-heading">
        <div className="container-custom">
          <h2 id="status-heading" className="heading-lg text-steel-900 mb-4 max-w-2xl">
            Where the project stands
          </h2>
          <p className="text-steel-600 max-w-2xl mb-10">
            What is confirmed, what is being built now, and what is planned but not built yet.
          </p>
          <div className="grid md:grid-cols-3 border border-steel-200 md:divide-x divide-y md:divide-y-0 divide-steel-200">
            <StatusList heading="Confirmed" items={confirmed} tone="steel" />
            <StatusList heading="Under construction now" items={underConstruction} tone="steel" />
            <StatusList heading="Planned, not yet built" items={planned} tone="oxide" />
          </div>
          <p className="mt-8 max-w-3xl text-steel-700 leading-relaxed border-l-2 border-oxide pl-4">
            The construction method changed from LGS to conventional; the planned smart-home,
            solar and EV features were not dropped as part of that change.
          </p>
        </div>
      </section>

      {/* Renders */}
      <ProjectGallery images={renders} title="Renders of the planned estate" />

      {/* Pricing */}
      <section className="bg-deep-steel text-white" aria-labelledby="pricing-heading">
        <div className="container-custom py-16 md:py-20 grid lg:grid-cols-12 gap-10 items-start">
          <div className="lg:col-span-7">
            <h2 id="pricing-heading" className="heading-lg mb-6">
              Pricing
            </h2>
            <p className="body-lg text-white/85 mb-6">
              Pricing is handled directly with our sales team. Payment plans and unit
              availability vary by phase, so we walk every enquirer through current options
              rather than publishing a fixed number online.
            </p>
            <p className="text-sm text-silver/80">
              Pre-construction pricing applies for now. Unit prices are expected to rise as
              each phase completes.
            </p>
          </div>
          <div className="lg:col-span-5 lg:justify-self-end">
            <a
              href={pricingHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-7 py-4 bg-white text-primary-800 rounded-lg font-semibold hover:bg-silver transition-colors"
            >
              <MessageCircle size={20} aria-hidden="true" />
              Enquire for Pricing &amp; Availability
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
