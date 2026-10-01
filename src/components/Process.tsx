"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap/config";
import { EASINGS } from "@/lib/gsap/easings";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

/**
 * The nine stages of an LGS roof, one line each.
 *
 * Copy is condensed from the LGS Roofing service page, which carries the full
 * descriptions. The old modular-process version of this section quoted
 * timeline and cost savings that nothing on record supports, so it carries no
 * figures at all now.
 */
const steps = [
  {
    title: "Engineering",
    description:
      "Span and load calculation matched to your roof geometry before anything is fabricated.",
  },
  {
    title: "Design",
    description: "Truss and purlin layout drawn to fit the actual structure.",
  },
  {
    title: "Specification",
    description:
      "Gauge, grade and coating chosen for the span and site conditions.",
  },
  {
    title: "Fabrication",
    description:
      "C-channels and purlins formed off-site under controlled conditions.",
  },
  {
    title: "Ground assembly",
    description:
      "Trusses pre-assembled at ground level where the project allows, reducing at-height work.",
  },
  {
    title: "Transport",
    description:
      "Components moved to site in the order the install schedule needs.",
  },
  {
    title: "Installation",
    description: "On-site fastening and erection by a dedicated crew.",
  },
  {
    title: "Site supervision",
    description: "A supervisor stays on site through the install.",
  },
  {
    title: "Quality control",
    description:
      "The finished roof is inspected against the original design before handover.",
  },
];

export default function Process() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // Entrance only. Reduced motion is handled globally in lib/gsap/config.
      gsap.set(".process-step", { opacity: 0, y: 20 });
      gsap.to(".process-step", {
        opacity: 1,
        y: 0,
        duration: 0.5,
        stagger: 0.05,
        ease: EASINGS.expo,
        scrollTrigger: { trigger: ".process-list", start: "top 85%" },
      });
    },
    { scope: containerRef }
  );

  return (
    <section
      id="process"
      ref={containerRef}
      className="section-padding bg-steel-50 border-y border-steel-200"
    >
      <div className="container-custom">
        <div className="flex flex-wrap items-end justify-between gap-6 mb-14">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.14em] text-primary-700 mb-4">
              Our process
            </p>
            <h2 className="heading-lg text-steel-900 mb-4">
              How an LGS roof gets built
            </h2>
            <p className="body-lg text-steel-600">
              We don&apos;t just supply steel. We engineer, fabricate,
              transport, install and inspect the finished roof.
            </p>
          </div>
          <Link
            href="/services/lgs-roofing"
            className="inline-flex items-center gap-2 text-primary-700 font-semibold hover:text-primary-900 transition-colors shrink-0"
          >
            LGS roofing in detail
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </Link>
        </div>

        <ol className="process-list grid sm:grid-cols-2 lg:grid-cols-3 border-t border-l border-steel-200 bg-white list-none p-0 m-0">
          {steps.map((step, i) => (
            <li
              key={step.title}
              className="process-step border-r border-b border-steel-200 p-6 lg:p-8"
            >
              <span className="block font-display font-bold text-sm text-primary-700 tabular mb-4">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="font-display font-semibold text-lg text-steel-900 mb-2">
                {step.title}
              </h3>
              <p className="text-steel-600 leading-relaxed">{step.description}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
