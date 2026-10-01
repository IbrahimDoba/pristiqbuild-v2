"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap/config";
import { EASINGS } from "@/lib/gsap/easings";
import Link from "next/link";
import { ArrowRight, MessageCircle, Phone } from "lucide-react";
import {
  PHONE_HREF,
  PHONE_DISPLAY,
  whatsappLink,
  WA,
} from "@/lib/site-config";

export default function HomeCTA() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // Entrance only. Reduced motion is handled globally in lib/gsap/config.
      gsap.set(".cta-reveal", { opacity: 0, y: 24 });
      gsap.to(".cta-reveal", {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: EASINGS.expo,
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 75%",
        },
      });
    },
    { scope: containerRef }
  );

  return (
    <section
      id="start-a-project"
      ref={containerRef}
      className="section-padding bg-deep-steel text-white"
    >
      <div className="container-custom">
        <div className="max-w-3xl">
          <h2 className="cta-reveal heading-lg text-white mb-6">
            Have a roofing, structural or development project in mind?
          </h2>
          <p className="cta-reveal body-lg text-white/75 mb-10">
            Tell us the scope and site. We&apos;ll come back with a technical
            assessment, not a sales pitch.
          </p>

          <div className="cta-reveal flex flex-col sm:flex-row gap-4 mb-10">
            <a
              href={whatsappLink(WA.projectScope)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-lg bg-white text-primary-900 font-semibold hover:bg-silver active:translate-y-px transition-[background-color,transform] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              <MessageCircle className="w-5 h-5" aria-hidden="true" />
              Send Us Your Project on WhatsApp
            </a>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-lg border border-white/40 text-white font-semibold hover:bg-white/10 active:translate-y-px transition-[background-color,transform] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              Fill in project details
              <ArrowRight className="w-5 h-5" aria-hidden="true" />
            </Link>
          </div>

          <a
            href={PHONE_HREF}
            className="cta-reveal inline-flex items-center gap-2 pt-6 border-t border-white/15 text-white/70 hover:text-white transition-colors"
          >
            <Phone className="w-4 h-4 text-silver" aria-hidden="true" />
            <span className="tabular">{PHONE_DISPLAY}</span>
          </a>
        </div>
      </div>
    </section>
  );
}
