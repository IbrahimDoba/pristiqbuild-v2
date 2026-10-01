import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, MessageCircle } from "lucide-react";
import { ProjectGallery } from "@/components/project-ui";
import { WA, whatsappLink } from "@/lib/site-config";

/*
 * The three images in /breezepoint are architectural renders, not site
 * photos. The previous version of this page captioned them as "active
 * construction" and "LGS roofing installation", which they are not. They are
 * labelled as renders here until real progress photos arrive.
 */

const facts = [
  { label: "Location", value: "Kubwa, Abuja" },
  { label: "Units", value: "5 terrace duplexes" },
  { label: "Structure", value: "Joint venture with the landowner" },
  { label: "Construction", value: "Conventional" },
  { label: "Status", value: "Nearing completion" },
];

const renders = [
  { src: "/breezepoint/breeze3.jpg", alt: "Render of the Breeze Point Estate terrace frontage" },
  { src: "/breezepoint/breeze2.jpg", alt: "Render of the terrace duplexes, end unit view" },
  { src: "/breezepoint/breeze1.jpg", alt: "Render of the terrace from above, showing the roof" },
].map((r) => ({ ...r, caption: "Design render" }));

export default function BreezePointProject() {
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
            <p className="mb-4">
              <span className="inline-block px-2 py-0.5 text-xs font-semibold uppercase tracking-wider border border-silver/40 text-silver rounded">
                Conventional
              </span>
            </p>
            <h1 className="heading-xl mb-6">Breeze Point Estate, Kubwa</h1>
            <p className="body-lg text-white/85 max-w-xl">
              Five terrace duplexes in Kubwa, Abuja, developed in joint venture with the
              landowner using conventional construction. The project is nearing completion.
            </p>
          </div>
          <figure className="lg:col-span-6">
            <div className="relative aspect-[4/3] overflow-hidden border border-white/15">
              <Image
                src="/breezepoint/breeze3.jpg"
                alt="Render of the Breeze Point Estate terrace frontage"
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
              Design render. Site photos will be added as the project completes.
            </figcaption>
          </figure>
        </div>
      </section>

      {/* Facts */}
      <section className="section-padding border-b border-steel-200" aria-labelledby="facts-heading">
        <div className="container-custom">
          <h2 id="facts-heading" className="heading-lg text-steel-900 mb-8">
            Project at a glance
          </h2>
          <dl className="grid sm:grid-cols-2 lg:grid-cols-5 gap-px bg-steel-200 border border-steel-200">
            {facts.map((fact) => (
              <div key={fact.label} className="p-5 bg-white">
                <dt className="text-xs uppercase tracking-wider text-steel-500">{fact.label}</dt>
                <dd className="font-display font-bold text-lg text-steel-900 mt-1">{fact.value}</dd>
              </div>
            ))}
          </dl>
          <p className="mt-8 max-w-3xl text-steel-700 leading-relaxed">
            Breeze Point is one of the conventional construction projects we take on alongside
            our LGS roofing and structural steel work. We are co-developing it in joint venture
            with the owner of the land.
          </p>
        </div>
      </section>

      <ProjectGallery images={renders} title="Design renders" />

      {/* CTA */}
      <section className="bg-deep-steel text-white">
        <div className="container-custom py-16 flex flex-wrap items-center justify-between gap-6">
          <p className="heading-sm max-w-xl">
            Interested in Breeze Point Estate, or have a development of your own in mind?
          </p>
          <a
            href={whatsappLink(WA.general)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-7 py-4 bg-white text-primary-800 rounded-lg font-semibold hover:bg-silver transition-colors"
          >
            <MessageCircle size={20} aria-hidden="true" />
            Talk to us on WhatsApp
          </a>
        </div>
      </section>
    </div>
  );
}
