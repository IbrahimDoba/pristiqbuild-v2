"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap/config";
import { EASINGS } from "@/lib/gsap/easings";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

/**
 * Leadership teaser for the homepage.
 *
 * Initials stand in for headshots until real photos arrive. The old version
 * of this section carried project, client and headcount figures with no
 * source, so it now carries none.
 */
const founders = [
  {
    name: "Yusuf Muhammed Doba",
    initials: "YD",
    role: "CEO & Co-Founder",
    bio: "Leads project delivery and client relationships.",
    credential: "NIOB member",
  },
  {
    name: "Najibu Auwalu Namadina",
    initials: "NN",
    role: "CTO & Co-Founder",
    bio: "Oversees engineering and technical delivery across every LGS and structural project.",
    credential: "COREN registered",
  },
  {
    name: "Abdulaziz Yakubu",
    initials: "AY",
    role: "COO & Co-Founder",
    bio: "Runs day-to-day operations and site execution.",
    credential: "NIOB member",
  },
];

export default function About() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // Entrance only. Reduced motion is handled globally in lib/gsap/config.
      gsap.set(".founder-card", { opacity: 0, y: 24 });
      gsap.to(".founder-card", {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.08,
        ease: EASINGS.expo,
        scrollTrigger: { trigger: ".founder-grid", start: "top 85%" },
      });
    },
    { scope: containerRef }
  );

  return (
    <section id="about" ref={containerRef} className="section-padding bg-white">
      <div className="container-custom">
        <div className="flex flex-wrap items-end justify-between gap-6 mb-12">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.14em] text-primary-700 mb-4">
              Leadership
            </p>
            <h2 className="heading-lg text-steel-900 mb-4">
              Founded in 2023 by three engineers and builders.
            </h2>
          </div>
          <Link
            href="/about#leadership"
            className="inline-flex items-center gap-2 text-primary-700 font-semibold hover:text-primary-900 transition-colors shrink-0"
          >
            Meet the team
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </Link>
        </div>

        <ul className="founder-grid grid md:grid-cols-3 border-t border-l border-steel-200 list-none p-0 m-0">
          {founders.map((f) => (
            <li
              key={f.name}
              className="founder-card flex flex-col border-r border-b border-steel-200 p-7 lg:p-8"
            >
              <div
                className="w-16 h-16 rounded-full bg-primary-700 text-white flex items-center justify-center font-display font-bold text-xl mb-6"
                aria-hidden="true"
              >
                {f.initials}
              </div>
              <h3 className="font-display font-semibold text-xl text-steel-900 leading-snug">
                {f.name}
              </h3>
              <p className="text-sm font-semibold text-primary-700 mt-1 mb-4">
                {f.role}
              </p>
              <p className="text-steel-600 leading-relaxed mb-6">{f.bio}</p>
              <p className="mt-auto pt-4 border-t border-steel-200 text-xs font-semibold uppercase tracking-wider text-steel-500">
                {f.credential}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
