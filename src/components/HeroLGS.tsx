"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap/config";
import { EASINGS } from "@/lib/gsap/easings";
import Image from "next/image";
import { Sparkles } from "lucide-react";

export default function HeroLGS() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // Set initial states
      gsap.set(".hero-bg-image", { scale: 1.2, opacity: 0 });
      gsap.set(".hero-overlay", { opacity: 0 });
      gsap.set(".hero-eyebrow", { opacity: 0, y: -30 });
      gsap.set(".hero-title", { opacity: 0, y: 50 });
      gsap.set(".hero-description", { opacity: 0, y: 50 });

      // Main entry timeline
      const tl = gsap.timeline({ delay: 0.3 });

      // 1. Background image zooms in and fades in
      tl.to(".hero-bg-image", {
        scale: 1,
        opacity: 1,
        duration: 1.5,
        ease: EASINGS.expo,
      });

      // 2. Overlay fades in
      tl.to(".hero-overlay", {
        opacity: 1,
        duration: 1,
      }, "-=1");

      // 3. Eyebrow badge flies in
      tl.to(".hero-eyebrow", {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: EASINGS.back,
      }, "-=0.5");

      // 4. Title slides up and fades in
      tl.to(".hero-title", {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: EASINGS.expo,
      }, "-=0.4");

      // 5. Description fades in
      tl.to(".hero-description", {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: EASINGS.smoothOut,
      }, "-=0.5");

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
      <div className="hero-overlay absolute inset-0 bg-gradient-to-r from-primary-900/95 via-primary-900/85 to-primary-900/70 z-10" />

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
        <div className="max-w-3xl ml-auto">
          {/* Eyebrow Badge */}
          <div className="hero-eyebrow inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-5 py-2.5 mb-6 border border-white/20">
            <Sparkles className="w-4 h-4 text-secondary-400" />
            <span className="text-sm font-medium text-white/90">
              Nigeria&apos;s Leading Modular Construction Innovator
            </span>
          </div>

          {/* Main Title */}
          <h1 className="hero-title text-5xl md:text-6xl lg:text-7xl font-display font-bold text-white mb-6 leading-tight">
            Building Nigeria's Future,{" "}
            <span className="text-gradient-gold">One Module</span> at a Time
          </h1>

          {/* Description */}
          <p className="hero-description text-xl md:text-2xl text-white/90 leading-relaxed mb-8">
            Leading the way in high-tech modular construction. We deliver
            precision, sustainability, and cutting-edge technology using light
            gauge steel framing. Transforming the construction industry with
            innovative solutions that are faster, stronger, and smarter.
          </p>

          {/* Decorative line */}
          <div className="w-32 h-1 bg-gradient-to-r from-secondary-400 to-transparent rounded-full" />
        </div>
      </div>

      {/* Bottom fade to white */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent z-30" />
    </section>
  );
}
