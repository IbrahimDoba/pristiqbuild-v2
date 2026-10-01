"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap/config";
import { EASINGS } from "@/lib/gsap/easings";
import { Ruler, Factory, Layers, BadgeCheck } from "lucide-react";

/**
 * "Why clients work with us": four reasons, each one traceable to something
 * the brief states as fact. No stats here on purpose; the hard numbers live in
 * the hero strip and the Akure case study.
 */
const reasons = [
  {
    icon: Ruler,
    title: "Engineered, not eyeballed",
    description:
      "Every roof starts with span and load calculations matched to its actual geometry, before any steel is fabricated.",
  },
  {
    icon: Factory,
    title: "Factory-cut, site-assembled",
    description:
      "C-channels and purlins are formed off-site under controlled conditions, then erected on site by a dedicated crew.",
  },
  {
    icon: Layers,
    title: "G550 steel",
    description:
      "We specify G550 high-tensile galvanized steel, among the strongest cold-formed steel grades available, for our LGS roofing and structures.",
  },
  {
    icon: BadgeCheck,
    title: "Led by registered engineers",
    description:
      "A COREN-registered engineer and NIOB-member site leadership specify, review and sign off every LGS and structural job.",
  },
];

export default function CoreValues() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // Entrance only. Reduced motion is handled globally in lib/gsap/config.
      gsap.set(".why-tile", { opacity: 0, y: 24 });
      gsap.to(".why-tile", {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.08,
        ease: EASINGS.expo,
        scrollTrigger: { trigger: ".why-grid", start: "top 85%" },
      });
    },
    { scope: containerRef }
  );

  return (
    <section
      id="why-pristiqbuild"
      ref={containerRef}
      className="section-padding bg-white"
    >
      <div className="container-custom">
        <div className="max-w-3xl mb-14">
          <p className="text-sm font-semibold uppercase tracking-[0.14em] text-primary-700 mb-4">
            Why PristiqBuild
          </p>
          <h2 className="heading-lg text-steel-900">Why clients work with us</h2>
        </div>

        <ul className="why-grid grid sm:grid-cols-2 lg:grid-cols-4 border-t border-l border-steel-200 list-none p-0 m-0">
          {reasons.map((r, i) => {
            const Icon = r.icon;
            return (
              <li
                key={r.title}
                className="why-tile flex flex-col border-r border-b border-steel-200 p-7 lg:p-8"
              >
                <div className="flex items-center justify-between mb-10">
                  <Icon className="w-6 h-6 text-primary-700" aria-hidden="true" />
                  <span className="text-xs font-semibold text-steel-400 tabular">
                    0{i + 1}
                  </span>
                </div>
                <h3 className="font-display font-semibold text-xl text-steel-900 leading-snug mb-3">
                  {r.title}
                </h3>
                <p className="text-steel-600 leading-relaxed">{r.description}</p>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
