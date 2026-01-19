"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap/config";
import { EASINGS } from "@/lib/gsap/easings";
import Link from "next/link";
import { Phone, Mail, ArrowRight } from "lucide-react";

interface ProjectCTAProps {
  title?: string;
  description?: string;
  showContact?: boolean;
}

export default function ProjectCTA({
  title = "Ready to Start Your Project?",
  description = "Contact Pristiq Build today to discuss your construction needs and discover how our Light Gauge Steel solutions can transform your vision into reality.",
  showContact = true,
}: ProjectCTAProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.set(".cta-content", { opacity: 0, y: 40 });

      gsap.to(".cta-content", {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: EASINGS.expo,
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 85%",
        },
      });
    },
    { scope: containerRef }
  );

  return (
    <section
      ref={containerRef}
      className="section-padding bg-gradient-to-br from-primary-900 via-primary-800 to-primary-900 relative overflow-hidden"
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

      {/* Glowing Orbs */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-secondary-500/20 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary-400/20 rounded-full blur-3xl" />

      <div className="container-custom relative z-10">
        <div className="cta-content text-center max-w-3xl mx-auto">
          <h2 className="heading-lg text-white mb-6">{title}</h2>
          <p className="text-xl text-white/80 leading-relaxed mb-10">
            {description}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-secondary-500 to-secondary-600 text-white font-bold rounded-xl shadow-lg hover:shadow-xl hover:from-secondary-600 hover:to-secondary-700 transition-all duration-300"
            >
              Schedule a Consultation
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              href="/#projects"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/10 backdrop-blur-sm text-white font-bold rounded-xl border border-white/20 hover:bg-white/20 transition-all duration-300"
            >
              View More Projects
            </Link>
          </div>

          {showContact && (
            <div className="flex flex-col sm:flex-row gap-6 justify-center text-white/80">
              <a
                href="tel:+2348000000000"
                className="inline-flex items-center gap-2 hover:text-white transition-colors"
              >
                <Phone className="w-5 h-5 text-secondary-400" />
                <span>+234 800 000 0000</span>
              </a>
              <a
                href="mailto:info@pristiqbuild.com"
                className="inline-flex items-center gap-2 hover:text-white transition-colors"
              >
                <Mail className="w-5 h-5 text-secondary-400" />
                <span>info@pristiqbuild.com</span>
              </a>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
