"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap/config";
import { EASINGS } from "@/lib/gsap/easings";
import Link from "next/link";
import { ArrowRight, Phone, Mail } from "lucide-react";

export default function HomeCTA() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.set(".cta-title", { opacity: 0, y: 40 });
      gsap.set(".cta-description", { opacity: 0, y: 30 });
      gsap.set(".cta-buttons", { opacity: 0, y: 30 });
      gsap.set(".cta-contact", { opacity: 0, y: 20 });

      const tl = gsap.timeline({
        
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 75%",
          toggleActions: "play none none none",
        },
      });

      tl.to(
          ".cta-title",
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: EASINGS.expo,
          },
          "-=0.4"
        )
        .to(
          ".cta-description",
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: EASINGS.expo,
          },
          "-=0.4"
        )
        .to(
          ".cta-buttons",
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: EASINGS.back,
          },
          "-=0.3"
        )
        .to(
          ".cta-contact",
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            ease: EASINGS.expo,
          },
          "-=0.3"
        );
    },
    { scope: containerRef }
  );

  return (
    <section
      ref={containerRef}
      className="section-padding bg-linear-to-br from-primary-900 via-primary-800 to-primary-900 relative overflow-hidden"
    >
      {/* Background Pattern */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
          `,
          backgroundSize: "50px 50px",
        }}
      />

      {/* Decorative Gradient Orbs */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-secondary-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-primary-400/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

      <div className="container-custom relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Title */}
          <h2 className="cta-title heading-lg text-white mb-6">
            Ready to Build Your{" "}
            <span className="text-gradient-gold">Dream Home</span>?
          </h2>

          {/* Description */}
          <p className="cta-description text-xl text-white/80 leading-relaxed mb-10 max-w-2xl mx-auto">
            Whether it is a luxury residence, commercial development, or roofing
            project, PristiqBuild delivers precision engineered solutions that
            are faster, stronger, and smarter.
          </p>

          {/* CTA Buttons */}
          <div className="cta-buttons flex flex-col sm:flex-row gap-4 justify-center mb-10">
            <Link
              href="/contact"
              className="group inline-flex items-center justify-center gap-2 px-8 py-4 bg-linear-to-r from-secondary-500 to-secondary-600 text-white font-bold rounded-lg shadow-lg shadow-secondary-500/25 hover:shadow-xl hover:from-secondary-600 hover:to-secondary-700 transition-[color,background-color,border-color,box-shadow,transform] duration-300 hover:-translate-y-0.5"
            >
              Get a Free Quote
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/projects"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/10 backdrop-blur-sm text-white font-bold rounded-lg border border-white/20 hover:bg-white/20 transition-colors duration-300"
            >
              View Our Projects
            </Link>
          </div>

          {/* Contact Info */}
          <div className="cta-contact flex flex-col sm:flex-row gap-6 justify-center items-center text-white/70">
            <a
              href="tel:+2348130272706"
              className="flex items-center gap-2 hover:text-white transition-colors"
            >
              <Phone className="w-5 h-5 text-secondary-400" />
              <span>+234 813 027 2706</span>
            </a>
            <span className="hidden sm:block text-white/30">|</span>
            <a
              href="mailto:info@pristiqbuild.com"
              className="flex items-center gap-2 hover:text-white transition-colors"
            >
              <Mail className="w-5 h-5 text-secondary-400" />
              <span>info@pristiqbuild.com</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
