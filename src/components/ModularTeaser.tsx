"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap/config";
import { EASINGS } from "@/lib/gsap/easings";
import Link from "next/link";
import { ArrowRight, MessageCircle } from "lucide-react";
import { whatsappLink, WA } from "@/lib/site-config";

/**
 * Modular is the company's direction, not its current offer. This teaser says
 * so plainly and shows the three-stage roadmap from the Modular page. Oxide is
 * used here, and only here on the homepage, because this is the one "coming
 * soon" state.
 */
const stages = [
  {
    label: "Today",
    title: "LGS roofing & structural work",
    description: "25+ projects delivered.",
  },
  {
    label: "Proof of concept",
    title: "Small modular-style builds",
    description:
      "Site offices and laundry blocks in LGS with fibre-cement cladding and roofing.",
  },
  {
    label: "Next",
    title: "Our own fabrication facility",
    description:
      "Enabling full modular residential and commercial buildings.",
  },
];

export default function ModularTeaser() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // Entrance only. Reduced motion is handled globally in lib/gsap/config.
      gsap.set(".modular-stage", { opacity: 0, y: 20 });
      gsap.to(".modular-stage", {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: EASINGS.expo,
        scrollTrigger: { trigger: ".modular-stages", start: "top 85%" },
      });
    },
    { scope: containerRef }
  );

  return (
    <section
      id="modular"
      ref={containerRef}
      className="section-padding bg-steel-50 border-y border-steel-200"
    >
      <div className="container-custom grid lg:grid-cols-12 gap-12 lg:gap-16">
        <div className="lg:col-span-5">
          <span className="inline-block border border-oxide text-oxide text-xs font-semibold uppercase tracking-wider px-3 py-1 mb-6">
            Coming soon
          </span>
          <h2 className="heading-lg text-steel-900 mb-5">
            Build Smart. Build Modular.
          </h2>
          <p className="body-lg text-steel-600 mb-8">
            Full modular construction, factory-built components assembled on
            site, isn&apos;t something we&apos;ve delivered yet. Here&apos;s
            exactly where we are, and what&apos;s coming.
          </p>
          <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6">
            <a
              href={whatsappLink(WA.modular)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg bg-primary-700 text-white font-semibold hover:bg-primary-800 active:translate-y-px transition-[background-color,transform] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-700"
            >
              <MessageCircle className="w-5 h-5" aria-hidden="true" />
              Ask About Our Modular Roadmap
            </a>
            <Link
              href="/services/modular-construction"
              className="inline-flex items-center gap-2 text-primary-700 font-semibold hover:text-primary-900 transition-colors"
            >
              See the roadmap
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Link>
          </div>
        </div>

        <ol className="modular-stages lg:col-span-7 border-t border-steel-200 list-none p-0 m-0">
          {stages.map((s, i) => (
            <li
              key={s.label}
              className="modular-stage grid sm:grid-cols-[10rem_1fr] gap-2 sm:gap-6 border-b border-steel-200 py-6"
            >
              <p
                className={`text-xs font-semibold uppercase tracking-wider pt-1 ${
                  i === 0 ? "text-primary-700" : "text-oxide"
                }`}
              >
                {s.label}
              </p>
              <div>
                <h3 className="font-display font-semibold text-lg text-steel-900 mb-1">
                  {s.title}
                </h3>
                <p className="text-steel-600 leading-relaxed">{s.description}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
