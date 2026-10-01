import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, MessageCircle } from "lucide-react";
import JsonLd from "@/components/seo/JsonLd";
import { breadcrumbSchema } from "@/lib/seo/schema";
import { WA, whatsappLink } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Modular Construction (Coming Soon)",
  description:
    "Full modular construction isn't something PristiqBuild has delivered yet. Here is where we are today, the modular-style builds we've completed, and what's coming next.",
  alternates: { canonical: "/services/modular-construction" },
};

const roadmap = [
  {
    stage: "Today",
    title: "LGS roofing & structural work",
    body: "25+ projects delivered.",
  },
  {
    stage: "Proof of concept",
    title: "Small modular-style builds",
    body: "Site offices and laundry blocks in LGS with fibre-cement cladding and roofing.",
  },
  {
    stage: "Next",
    title: "Our own fabrication facility",
    body: "Enabling full modular residential and commercial buildings.",
    upcoming: true,
  },
];

export default function ModularConstructionPage() {
  return (
    <div className="bg-white">
      <JsonLd
        id="service-breadcrumb"
        data={breadcrumbSchema([
          { name: "Modular Construction", path: "/services/modular-construction" },
        ])}
      />

      <section className="bg-deep-steel text-white">
        <div className="container-custom pt-36 pb-16 md:pt-44 md:pb-20">
          <p className="mb-6">
            <span className="inline-block px-3 py-1 text-xs font-semibold uppercase tracking-wider bg-oxide text-white rounded-full">
              Coming soon
            </span>
          </p>
          <h1 className="heading-xl max-w-4xl mb-6">
            Modular construction: this is where we&apos;re headed.
          </h1>
          <p className="body-lg text-white/85 max-w-2xl mb-8">
            Full modular construction, factory-built components assembled on
            site, isn&apos;t something we&apos;ve delivered yet. We don&apos;t want
            to tell you otherwise. Here&apos;s exactly where we are, and what&apos;s
            coming.
          </p>
          <p className="font-display font-semibold text-xl text-silver">
            Build Smart. Build Modular.
          </p>
        </div>
      </section>

      <section className="section-padding border-b border-steel-200" aria-labelledby="roadmap-heading">
        <div className="container-custom">
          <h2 id="roadmap-heading" className="heading-md text-steel-900 mb-10">
            Where we are
          </h2>
          <ol className="grid md:grid-cols-3 border-t border-l border-steel-200">
            {roadmap.map((step, i) => (
              <li
                key={step.stage}
                className={`p-8 border-r border-b border-steel-200 ${
                  step.upcoming ? "border-t-2 border-t-oxide" : ""
                }`}
              >
                <p
                  className={`text-xs font-semibold uppercase tracking-wider mb-4 ${
                    step.upcoming ? "text-oxide" : "text-primary-700"
                  }`}
                >
                  <span className="tabular">{String(i + 1).padStart(2, "0")}</span> · {step.stage}
                </p>
                <h3 className="heading-sm text-steel-900 mb-3">{step.title}</h3>
                <p className="text-steel-600 leading-relaxed">{step.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section-padding border-b border-steel-200" aria-labelledby="proof-heading">
        <div className="container-custom grid lg:grid-cols-12 gap-10">
          <div className="lg:col-span-4">
            <p className="text-xs font-semibold uppercase tracking-wider text-steel-500 mb-3">
              Proof point · Completed
            </p>
            <h2 id="proof-heading" className="heading-md text-steel-900">
              An 18 sqm site office, completed.
            </h2>
          </div>
          <div className="lg:col-span-8 max-w-3xl">
            <p className="body-lg text-steel-700 mb-6">
              This is a real, completed build, not a render: an 18 sqm site
              office framed in LGS, with fibre-cement cladding and roofing. It
              is small, and it is the kind of modular-style work we are
              delivering today while we build toward full modular construction.
            </p>
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 font-semibold text-primary-700 hover:text-primary-800 transition-colors"
            >
              See it with our other projects
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-deep-steel text-white">
        <div className="container-custom py-16 flex flex-wrap items-center justify-between gap-6">
          <p className="heading-sm max-w-xl">
            Want to be first to know when modular launches?
          </p>
          <a
            href={whatsappLink(WA.modular)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-7 py-4 bg-white text-primary-800 rounded-lg font-semibold hover:bg-silver transition-colors"
          >
            <MessageCircle size={20} aria-hidden="true" />
            Message us on WhatsApp
          </a>
        </div>
      </section>
    </div>
  );
}
