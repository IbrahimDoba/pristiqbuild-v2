import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, MessageCircle } from "lucide-react";
import JsonLd from "@/components/seo/JsonLd";
import { serviceSchema, breadcrumbSchema } from "@/lib/seo/schema";
import { WA, whatsappLink } from "@/lib/site-config";

const DESCRIPTION =
  "Engineered LGS roofing in Nigeria, start to handover. PristiqBuild engineers, fabricates, transports, installs and inspects G550 light gauge steel roofs.";

export const metadata: Metadata = {
  title: "LGS Roofing",
  description: DESCRIPTION,
  alternates: { canonical: "/services/lgs-roofing" },
};

const stages = [
  {
    title: "Engineering",
    body: "Span and load calculation matched to your specific roof geometry before anything is fabricated.",
  },
  {
    title: "Design",
    body: "Truss and purlin layout drawn to fit the actual structure.",
  },
  {
    title: "Specification",
    body: "Gauge, grade and coating chosen for span and site conditions.",
  },
  {
    title: "Fabrication",
    body: "C-channels and purlins formed off-site under controlled conditions.",
  },
  {
    title: "Ground assembly",
    body: "Trusses pre-assembled at ground level where the project allows, reducing at-height work.",
  },
  {
    title: "Transport",
    body: "Components moved to site in the order the install schedule needs.",
  },
  {
    title: "Installation",
    body: "On-site fastening and erection by a dedicated crew.",
  },
  {
    title: "Site supervision",
    body: "A supervisor stays on site through install.",
  },
  {
    title: "Quality control",
    body: "The finished roof is inspected against the original design before handover.",
  },
];

const caseStats = [
  { value: "1,080 sqm", label: "Roof area" },
  { value: "6.8t", label: "G550 steel" },
  { value: "960", label: "C-channels" },
  { value: "75% less", label: "Waste vs. timber" },
];

const applications = [
  {
    title: "Residential",
    body: "Private homes and estate housing, from single residences to multi-unit roofing contracts.",
  },
  {
    title: "Commercial",
    body: "Roof structures for commercial buildings where span and programme matter.",
  },
  {
    title: "Industrial",
    body: "Long-span roofing for industrial and storage buildings.",
  },
  {
    title: "Institutional",
    body: "Example: the NITP Secretariat, Wuse Zone 5, a hybrid roof of hot-rolled I-beam primaries and LGS secondary trusses.",
  },
];

export default function LgsRoofingPage() {
  return (
    <div className="bg-white">
      <JsonLd
        id="service-schema"
        data={serviceSchema({
          name: "LGS Roofing",
          description: DESCRIPTION,
          path: "/services/lgs-roofing",
          serviceType: "Light gauge steel roofing",
        })}
      />
      <JsonLd
        id="service-breadcrumb"
        data={breadcrumbSchema([{ name: "LGS Roofing", path: "/services/lgs-roofing" }])}
      />

      <section className="bg-deep-steel text-white">
        <div className="container-custom pt-36 pb-16 md:pt-44 md:pb-20">
          <p className="text-sm font-semibold uppercase tracking-wider text-silver/80 mb-4">
            Services · LGS Roofing
          </p>
          <h1 className="heading-xl max-w-4xl mb-6">
            Engineered LGS roofing, start to handover.
          </h1>
          <p className="body-lg text-white/85 max-w-2xl mb-10">
            We don&apos;t just supply steel. We engineer, fabricate, transport,
            install and inspect the finished roof.
          </p>
          <a
            href={whatsappLink(WA.roofAssessment)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-7 py-4 bg-white text-primary-800 rounded-lg font-semibold hover:bg-silver transition-colors"
          >
            <MessageCircle size={20} aria-hidden="true" />
            Request a Roof Assessment
          </a>
        </div>
      </section>

      <section className="section-padding border-b border-steel-200" aria-labelledby="process-heading">
        <div className="container-custom grid lg:grid-cols-12 gap-10">
          <div className="lg:col-span-4">
            <p className="text-xs font-semibold uppercase tracking-wider text-steel-500 mb-3">
              The process
            </p>
            <h2 id="process-heading" className="heading-md text-steel-900">
              Nine stages, one team accountable for all of them.
            </h2>
          </div>
          <ol className="lg:col-span-8 border-t border-steel-200">
            {stages.map((stage, i) => (
              <li
                key={stage.title}
                className="grid grid-cols-[3rem_1fr] sm:grid-cols-[4rem_12rem_1fr] gap-x-4 gap-y-1 py-6 border-b border-steel-200"
              >
                <span className="font-display font-bold text-primary-700 tabular" aria-hidden="true">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="font-display font-semibold text-lg text-steel-900">
                  {stage.title}
                </h3>
                <p className="text-steel-600 col-start-2 sm:col-start-3 sm:row-start-1">
                  {stage.body}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section-padding border-b border-steel-200" aria-labelledby="case-heading">
        <div className="container-custom grid lg:grid-cols-12 gap-10 items-center">
          <div className="relative lg:col-span-7 aspect-[16/10] overflow-hidden border border-steel-200">
            <Image
              src="/LGS/1752987831787.jpeg"
              alt="LGS roof structure at the Akure Residence, Ondo State"
              fill
              sizes="(max-width: 1024px) 100vw, 58vw"
              className="object-cover"
            />
          </div>
          <div className="lg:col-span-5">
            <p className="text-xs font-semibold uppercase tracking-wider text-steel-500 mb-3">
              Case study
            </p>
            <h2 id="case-heading" className="heading-lg text-steel-900 mb-8">
              Akure Residence, Ondo State
            </h2>
            <dl className="grid grid-cols-2 border-t border-l border-steel-200 mb-8">
              {caseStats.map((s) => (
                <div key={s.label} className="p-4 border-r border-b border-steel-200">
                  <dt className="text-xs uppercase tracking-wider text-steel-500">{s.label}</dt>
                  <dd className="font-display font-bold text-xl text-steel-900 tabular mt-1">
                    {s.value}
                  </dd>
                </div>
              ))}
            </dl>
            <Link
              href="/projects/akure-lgs-roofing"
              className="inline-flex items-center gap-2 font-semibold text-primary-700 hover:text-primary-800 transition-colors"
            >
              Read the case study
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      <section className="section-padding border-b border-steel-200" aria-labelledby="material-heading">
        <div className="container-custom grid lg:grid-cols-12 gap-10">
          <div className="lg:col-span-4">
            <p className="text-xs font-semibold uppercase tracking-wider text-steel-500 mb-3">
              Material
            </p>
            <h2 id="material-heading" className="heading-md text-steel-900">
              G550 high-tensile steel
            </h2>
          </div>
          <div className="lg:col-span-8 max-w-3xl">
            <p className="body-lg text-steel-700 mb-6">
              We specify G550 high-tensile galvanized steel, among the strongest
              cold-formed steel grades available, for our LGS structures and
              roofing, and we&apos;re working to establish it as the standard for
              LGS construction in Nigeria.
            </p>
            <p className="italic text-steel-500">
              We&apos;re finalizing supplier mill certification for this
              specification. Happy to share documentation on request.
            </p>
          </div>
        </div>
      </section>

      <section className="section-padding" aria-labelledby="applications-heading">
        <div className="container-custom">
          <h2 id="applications-heading" className="heading-md text-steel-900 mb-10">
            Applications
          </h2>
          <ul className="grid sm:grid-cols-2 lg:grid-cols-4 border-t border-l border-steel-200">
            {applications.map((a) => (
              <li key={a.title} className="p-6 border-r border-b border-steel-200">
                <h3 className="heading-sm text-steel-900 mb-3">{a.title}</h3>
                <p className="text-steel-600 leading-relaxed">{a.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-deep-steel text-white">
        <div className="container-custom py-16 flex flex-wrap items-center justify-between gap-6">
          <p className="heading-sm max-w-xl">
            Tell us the site and the roof. We&apos;ll come back with a technical
            assessment.
          </p>
          <a
            href={whatsappLink(WA.roofAssessment)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-7 py-4 bg-white text-primary-800 rounded-lg font-semibold hover:bg-silver transition-colors"
          >
            <MessageCircle size={20} aria-hidden="true" />
            Request a Roof Assessment
          </a>
        </div>
      </section>
    </div>
  );
}
