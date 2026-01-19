"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap/config";
import { EASINGS } from "@/lib/gsap/easings";
import { ArrowDown, Play, Sparkles } from "lucide-react";

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const backgroundRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const words = ["Building", "Nigeria's", "Future,"];
  const subWords = ["One", "Module", "at", "a", "Time"];

  useGSAP(
    () => {
      if (!containerRef.current) return;

      // Create pinned timeline (Uptown style: 12-15s scroll duration)
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=400%", // Pin for 4 viewports (12-15s scroll time)
          pin: true,
          scrub: 1.2, // Uptown uses 1.1-1.2 for smooth scrubbing
          anticipatePin: 1,
        },
      });

      // Background parallax (Uptown pattern)
      if (backgroundRef.current) {
        tl.fromTo(
          backgroundRef.current,
          { yPercent: 0 },
          { yPercent: 20, ease: EASINGS.scrollCoupled },
          0
        );
      }

      // Floating shapes with layered parallax
      tl.to(
        ".hero-shape-1",
        {
          yPercent: -30,
          rotate: 360,
          scale: 1.2,
          ease: EASINGS.scrollCoupled,
        },
        0
      );

      tl.to(
        ".hero-shape-2",
        {
          yPercent: -50,
          scale: 0.8,
          ease: EASINGS.scrollCoupled,
        },
        0
      );

      tl.to(
        ".hero-shape-3",
        {
          yPercent: -40,
          rotate: 180,
          ease: EASINGS.scrollCoupled,
        },
        0
      );

      tl.to(
        ".hero-shape-4",
        {
          yPercent: -35,
          scale: 1.1,
          ease: EASINGS.scrollCoupled,
        },
        0
      );

      // Fade out content as you scroll
      if (contentRef.current) {
        tl.to(
          contentRef.current,
          {
            autoAlpha: 0,
            ease: EASINGS.smoothOut,
          },
          0.5
        );
      }

      // Entry animations (not tied to scroll)
      const entryTl = gsap.timeline();

      // Eyebrow badge
      entryTl.fromTo(
        ".hero-eyebrow",
        { autoAlpha: 0, y: 20 },
        { autoAlpha: 1, y: 0, duration: 0.6, ease: EASINGS.smoothOut }
      );

      // Word-by-word reveal for main headline
      const allWords = gsap.utils.toArray(".hero-word");
      entryTl.fromTo(
        allWords,
        { autoAlpha: 0, y: 50 },
        {
          autoAlpha: 1,
          y: 0,
          stagger: 0.08, // Uptown uses 0.08s stagger
          duration: 0.6,
          ease: EASINGS.heroEntry,
        },
        0.2
      );

      // Subheadline
      entryTl.fromTo(
        ".hero-subheadline",
        { autoAlpha: 0, y: 30 },
        { autoAlpha: 1, y: 0, duration: 0.6, ease: EASINGS.smoothOut },
        "-=0.3"
      );

      // CTA Buttons
      entryTl.fromTo(
        ".hero-cta",
        { autoAlpha: 0, y: 30 },
        { autoAlpha: 1, y: 0, duration: 0.6, ease: EASINGS.smoothOut },
        "-=0.2"
      );

      // Stats bar with stagger
      entryTl.fromTo(
        ".hero-stat",
        { autoAlpha: 0, scale: 0.9 },
        {
          autoAlpha: 1,
          scale: 1,
          stagger: 0.1,
          duration: 0.4,
          ease: EASINGS.back,
        },
        "-=0.2"
      );

      // Scroll indicator
      entryTl.fromTo(
        ".hero-scroll-indicator",
        { autoAlpha: 0 },
        { autoAlpha: 1, duration: 0.4 },
        "-=0.1"
      );

      // Scroll indicator bounce animation (infinite)
      gsap.to(".hero-scroll-indicator", {
        y: 8,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut",
      });

      // Infinite animations for shapes (not scroll-driven)
      gsap.to(".hero-shape-1-inner", {
        rotate: 360,
        duration: 20,
        repeat: -1,
        ease: "none",
      });

      gsap.to(".hero-shape-2-inner", {
        scale: 1.2,
        duration: 8,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut",
      });

      gsap.to(".hero-shape-3-inner", {
        y: 20,
        rotate: 45,
        duration: 10,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut",
      });

      gsap.to(".hero-shape-4-inner", {
        scale: 1.15,
        duration: 6,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut",
      });

      // Apply willChange for performance (Uptown pattern)
      gsap.set(
        [
          backgroundRef.current,
          ".hero-shape-1",
          ".hero-shape-2",
          ".hero-shape-3",
          ".hero-shape-4",
        ],
        { willChange: "transform" }
      );
    },
    { scope: containerRef }
  );

  return (
    <section
      id="home"
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Video/Image Background */}
      <div ref={backgroundRef} className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-900 via-primary-800 to-steel-900" />
        {/* Grid Pattern Overlay */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
            `,
            backgroundSize: "60px 60px",
          }}
        />
        {/* Diagonal Lines Overlay */}
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `repeating-linear-gradient(
              -45deg,
              transparent,
              transparent 40px,
              rgba(255,255,255,0.1) 40px,
              rgba(255,255,255,0.1) 80px
            )`,
          }}
        />
      </div>

      {/* Floating Elements */}
      <div className="absolute inset-0 z-10 pointer-events-none overflow-hidden">
        {/* Geometric shapes */}
        <div className="hero-shape-1 absolute top-1/4 left-10 w-20 h-20">
          <div className="hero-shape-1-inner border border-white/10 rounded-lg w-full h-full" />
        </div>
        <div className="hero-shape-2 absolute top-1/3 right-20 w-32 h-32">
          <div className="hero-shape-2-inner border border-primary-400/20 rounded-full w-full h-full opacity-30" />
        </div>
        <div className="hero-shape-3 absolute bottom-1/4 left-1/4 w-16 h-16">
          <div className="hero-shape-3-inner bg-secondary-500/10 rounded-lg w-full h-full" />
        </div>
        <div className="hero-shape-4 absolute bottom-1/3 right-1/4 w-24 h-24">
          <div className="hero-shape-4-inner border-2 border-secondary-400/20 w-full h-full opacity-30" style={{ transform: "rotate(45deg)" }} />
        </div>
      </div>

      {/* Content */}
      <div ref={contentRef} className="relative z-20 container-custom text-center px-4">
        {/* Eyebrow */}
        <div className="hero-eyebrow inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-5 py-2 mb-8">
          <Sparkles className="w-4 h-4 text-secondary-400" />
          <span className="text-sm font-medium text-white/90">
            Nigeria&apos;s Leading Modular Construction Innovator
          </span>
        </div>

        {/* Main Headline */}
        <h1 className="heading-xl text-white mb-4">
          {words.map((word, i) => (
            <span
              key={i}
              className="hero-word inline-block mr-4"
            >
              {word}
            </span>
          ))}
          <br />
          {subWords.map((word, i) => (
            <span
              key={i}
              className={`hero-word inline-block mr-4 ${
                word === "Module" ? "text-gradient-gold" : ""
              }`}
            >
              {word}
            </span>
          ))}
        </h1>

        {/* Subheadline */}
        <p className="hero-subheadline body-lg text-white/80 max-w-2xl mx-auto mb-12">
          Leading the way in high-tech modular construction. We deliver
          precision, sustainability, and cutting-edge technology using light
          steel gauge framing.
        </p>

        {/* CTA Buttons */}
        <div className="hero-cta flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="#contact"
            className="group relative inline-flex items-center gap-2 bg-secondary-500 hover:bg-secondary-600 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all shadow-lg shadow-secondary-500/30 hover:shadow-xl hover:shadow-secondary-500/40"
          >
            Schedule Consultation
            <span className="inline-block">→</span>
          </a>

          <button className="group inline-flex items-center gap-3 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all border border-white/20">
            <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center group-hover:bg-white/30 transition-colors">
              <Play className="w-4 h-4 fill-current ml-0.5" />
            </div>
            Watch Our Story
          </button>
        </div>

        {/* Stats Bar */}
        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
          {[
            { value: "30-50%", label: "Faster Delivery" },
            { value: "20-30%", label: "Cost Reduction" },
            { value: "100+", label: "Projects Completed" },
            { value: "15+", label: "Years Experience" },
          ].map((stat, i) => (
            <div
              key={i}
              className="hero-stat text-center"
            >
              <div className="text-3xl md:text-4xl font-display font-bold text-white mb-1">
                {stat.value}
              </div>
              <div className="text-sm text-white/60">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="hero-scroll-indicator absolute bottom-8 left-1/2 -translate-x-1/2 z-20">
        <a
          href="#why-pristiqbuild"
          className="flex flex-col items-center gap-2 text-white/60 hover:text-white/80 transition-colors"
        >
          <span className="text-xs font-medium tracking-wider uppercase">
            Scroll to explore
          </span>
          <ArrowDown className="w-5 h-5" />
        </a>
      </div>

      {/* Bottom Gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent z-10" />
    </section>
  );
}
