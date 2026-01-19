"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap/config";
import { EASINGS } from "@/lib/gsap/easings";
import { ArrowDown, Play, Sparkles } from "lucide-react";

export default function HeroGSAP() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // Set initial states (critical for visibility)
      gsap.set(".hero-word", { opacity: 0, y: 100 });
      gsap.set(".hero-eyebrow", { opacity: 0, y: -30 });
      gsap.set(".hero-subheadline", { opacity: 0, y: 50 });
      gsap.set(".hero-cta", { opacity: 0, y: 60 });
      gsap.set(".hero-stat", { opacity: 0, scale: 0.5 });
      gsap.set(".hero-scroll-indicator", { opacity: 0 });
      gsap.set([".shape-1", ".shape-2", ".shape-3", ".shape-4"], { opacity: 0, scale: 0 });

      // Main entry timeline (very visible, dramatic)
      const tl = gsap.timeline({ delay: 0.3 });

      // 1. Eyebrow badge flies in from top
      tl.to(".hero-eyebrow", {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: EASINGS.back,
      });

      // 2. Words explode in one by one (VERY dramatic)
      tl.to(".hero-word", {
        opacity: 1,
        y: 0,
        stagger: 0.15, // Slower for visibility
        duration: 1,
        ease: EASINGS.expo,
      }, "-=0.4");

      // 3. Subheadline fades up
      tl.to(".hero-subheadline", {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: EASINGS.smoothOut,
      }, "-=0.5");

      // 4. CTA buttons pop in
      tl.to(".hero-cta", {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: EASINGS.back,
      }, "-=0.3");

      // 5. Stats bounce in one by one
      tl.to(".hero-stat", {
        opacity: 1,
        scale: 1,
        stagger: 0.15,
        duration: 0.7,
        ease: EASINGS.back,
      }, "-=0.2");

      // 6. Scroll indicator fades in
      tl.to(".hero-scroll-indicator", {
        opacity: 1,
        duration: 0.6,
      }, "-=0.2");

      // Floating shapes appear with stagger
      tl.to([".shape-1", ".shape-2", ".shape-3", ".shape-4"], {
        opacity: 0.3,
        scale: 1,
        stagger: 0.2,
        duration: 1.5,
        ease: EASINGS.back,
      }, 0.5);

      // Infinite animations (always running)

      // Scroll indicator bounce
      gsap.to(".hero-scroll-indicator", {
        y: 10,
        duration: 1.5,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut",
      });

      // Shape 1 - Slow rotation
      gsap.to(".shape-1", {
        rotate: 360,
        duration: 20,
        repeat: -1,
        ease: "none",
      });

      // Shape 2 - Pulse scale
      gsap.to(".shape-2", {
        scale: 1.3,
        opacity: 0.5,
        duration: 4,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut",
      });

      // Shape 3 - Float up and down
      gsap.to(".shape-3", {
        y: -30,
        rotate: 45,
        duration: 5,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut",
      });

      // Shape 4 - Rotate and scale
      gsap.to(".shape-4", {
        rotate: -180,
        scale: 1.2,
        duration: 8,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut",
      });

      // SCROLL-DRIVEN PARALLAX (kicks in on scroll)
      gsap.to(".hero-background", {
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
      gsap.to(".hero-content", {
        opacity: 0,
        y: -100,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "center top",
          scrub: 1,
        },
      });

      // Shapes move at different parallax speeds
      gsap.to(".shape-1", {
        y: -150,
        x: 50,
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 2,
        },
      });

      gsap.to(".shape-2", {
        y: -200,
        x: -100,
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1.5,
        },
      });

      gsap.to(".shape-3", {
        y: -100,
        x: -50,
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 2.5,
        },
      });

      gsap.to(".shape-4", {
        y: -180,
        x: 80,
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1.8,
        },
      });
    },
    { scope: containerRef }
  );

  const words = ["Building", "Nigeria's", "Future,"];
  const subWords = ["One", "Module", "at", "a", "Time"];

  return (
    <section
      id="home"
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background with parallax */}
      <div className="hero-background absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-900 via-primary-800 to-steel-900" />
        {/* Grid Pattern */}
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
        {/* Diagonal Lines */}
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

      {/* Floating Shapes (very visible now) */}
      <div className="absolute inset-0 z-10 pointer-events-none overflow-hidden">
        <div className="shape-1 absolute top-1/4 left-10 w-24 h-24">
          <div className="border-2 border-secondary-400/60 rounded-lg w-full h-full" />
        </div>
        <div className="shape-2 absolute top-1/3 right-20 w-40 h-40">
          <div className="border-2 border-primary-400/60 rounded-full w-full h-full" />
        </div>
        <div className="shape-3 absolute bottom-1/4 left-1/4 w-20 h-20">
          <div className="bg-secondary-500/30 rounded-lg w-full h-full" />
        </div>
        <div className="shape-4 absolute bottom-1/3 right-1/4 w-32 h-32">
          <div
            className="border-3 border-secondary-400/60 w-full h-full"
            style={{ transform: "rotate(45deg)" }}
          />
        </div>
      </div>

      {/* Main Content */}
      <div className="hero-content relative z-20 container-custom text-center px-4">
        {/* Eyebrow Badge */}
        <div className="hero-eyebrow inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-6 py-3 mb-8 border border-white/20">
          <Sparkles className="w-5 h-5 text-secondary-400" />
          <span className="text-sm font-medium text-white/90">
            Nigeria&apos;s Leading Modular Construction Innovator
          </span>
        </div>

        {/* Main Headline with word animation */}
        <h1 className="heading-xl text-white mb-6">
          {words.map((word, i) => (
            <span key={i} className="hero-word inline-block mr-4">
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
        <div className="hero-cta flex flex-col sm:flex-row items-center justify-center gap-4 mb-20">
          <a
            href="#contact"
            className="group relative inline-flex items-center gap-2 bg-secondary-500 hover:bg-secondary-600 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all shadow-xl shadow-secondary-500/50 hover:shadow-2xl hover:shadow-secondary-500/60 hover:-translate-y-1"
          >
            Schedule Consultation
            <span className="inline-block group-hover:translate-x-1 transition-transform">
              →
            </span>
          </a>

          <button className="group inline-flex items-center gap-3 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all border border-white/20 hover:-translate-y-1">
            <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center group-hover:bg-white/30 transition-colors">
              <Play className="w-4 h-4 fill-current ml-0.5" />
            </div>
            Watch Our Story
          </button>
        </div>

        {/* Stats Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
          {[
            { value: "30-50%", label: "Faster Delivery" },
            { value: "20-30%", label: "Cost Reduction" },
            { value: "100+", label: "Projects Completed" },
            { value: "15+", label: "Years Experience" },
          ].map((stat, i) => (
            <div key={i} className="hero-stat text-center">
              <div className="text-4xl md:text-5xl font-display font-bold text-white mb-2">
                {stat.value}
              </div>
              <div className="text-sm text-white/70 font-medium">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="hero-scroll-indicator absolute bottom-10 left-1/2 -translate-x-1/2 z-20">
        <a
          href="#why-pristiqbuild"
          className="flex flex-col items-center gap-3 text-white/70 hover:text-white transition-colors"
        >
          <span className="text-xs font-medium tracking-widest uppercase">
            Scroll to explore
          </span>
          <div className="w-8 h-12 border-2 border-white/30 rounded-full flex items-start justify-center p-2">
            <ArrowDown className="w-4 h-4" />
          </div>
        </a>
      </div>

      {/* Bottom Gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent z-10" />
    </section>
  );
}
