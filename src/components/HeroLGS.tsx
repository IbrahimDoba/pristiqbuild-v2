"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap/config";
import { EASINGS } from "@/lib/gsap/easings";
import Image from "next/image";
import { Sparkles, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function HeroLGS() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // Only the decorative layers are animated from JS.
      //
      // The copy entrance lives in CSS (globals.css, "Hero entrance"). Driving
      // it from here meant setting opacity to 0 at hydration, which on a
      // throttled connection blanked the headline about four seconds after it
      // had already painted. The headline itself now has no entrance at all:
      // it is the LCP element and carries the value proposition.
      gsap.set(".hero-bg-image", { scale: 1.12, opacity: 0 });
      gsap.set(".hero-overlay", { opacity: 0 });

      const tl = gsap.timeline({ delay: 0.05 });

      tl.to(
        ".hero-bg-image",
        { scale: 1, opacity: 1, duration: 1.6, ease: EASINGS.expo },
        0
      ).to(".hero-overlay", { opacity: 1, duration: 0.6 }, 0);

      // Parallax effect on scroll - background moves slower
      gsap.to(".hero-bg-image", {
        yPercent: 30,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1.5,
        },
      });

      // Content fades out as you scroll
      gsap.to(".hero-text-content", {
        opacity: 0,
        y: -50,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "center top",
          scrub: 1,
        },
      });
    },
    { scope: containerRef }
  );

  return (
    <section
      id="home"
      ref={containerRef}
      className="relative min-h-screen flex items-center overflow-hidden"
    >
      {/* Full Background Image with Parallax */}
      <div className="hero-bg-image absolute inset-0 z-0">
        <Image
          src="/LGS/lgs1.jpeg"
          alt="Light Gauge Steel Construction"
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* Dark Overlay for text readability */}
      <div className="hero-overlay absolute inset-0 bg-linear-to-r from-primary-900/95 via-primary-900/85 to-primary-900/70 z-10" />

      {/* Grid Pattern Overlay */}
      <div
        className="absolute inset-0 opacity-10 z-10"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
        }}
      />

      {/* Text Content - Positioned Right */}
      <div className="hero-text-content relative z-20 container-custom px-4 py-20">
        <div className="max-w-4xl ml-auto">
          {/* Eyebrow Badge */}
          <div className="hero-eyebrow inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-5 py-2.5 mb-6 border border-white/20">
            <Sparkles className="w-4 h-4 text-secondary-400" />
            <span className="text-sm font-medium text-white/90">
              Nigeria&apos;s Leading Modular Construction Innovator
            </span>
          </div>

          {/* Main Title */}
          <h1 className="hero-title text-[2.5rem] leading-[1.06] sm:text-5xl md:text-[3.25rem] lg:text-[3.6rem] font-display font-bold text-white mb-6 text-balance">
            Building Nigeria&apos;s Future,{" "}
            <span className="text-gradient-gold">One Module</span> at a Time
          </h1>

          {/* Description */}
          <p className="hero-description text-xl md:text-2xl text-white/90 leading-relaxed mb-8">
            Precision modular construction in light gauge steel. Faster to
            build, engineered to last, and made for Nigerian conditions.
          </p>

          {/* Primary conversion path.
              The hero previously contained no link or button at all, so the
              most-visited section of the site asked for nothing. "Get a Quote"
              matches the nav label deliberately: one label per intent. */}
          <div className="hero-actions flex flex-col sm:flex-row gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-lg bg-primary-600 text-white font-semibold shadow-lg shadow-primary-900/30 hover:bg-primary-500 active:translate-y-px transition-[background-color,transform] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              Get a Quote
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              href="/cost-calculator"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-lg border border-white/40 bg-white/10 text-white font-semibold backdrop-blur-sm hover:bg-white/20 active:translate-y-px transition-[background-color,transform] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              Estimate Your Cost
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom fade to white */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-linear-to-t from-white to-transparent z-30" />
    </section>
  );
}
