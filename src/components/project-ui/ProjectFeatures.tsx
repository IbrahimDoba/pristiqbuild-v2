"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap/config";
import { EASINGS } from "@/lib/gsap/easings";
import { LucideIcon, CheckCircle2 } from "lucide-react";

interface Feature {
  icon?: LucideIcon;
  title: string;
  description: string;
}

interface ProjectFeaturesProps {
  title?: string;
  subtitle?: string;
  features: Feature[];
  layout?: "grid" | "list";
}

export default function ProjectFeatures({
  title = "Key Features",
  subtitle,
  features,
  layout = "grid",
}: ProjectFeaturesProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.set(".features-header", { opacity: 0, y: 40 });
      gsap.set(".feature-item", { opacity: 0, x: -30 });

      gsap.to(".features-header", {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: EASINGS.expo,
        scrollTrigger: {
          trigger: ".features-header",
          start: "top 85%",
        },
      });

      gsap.to(".feature-item", {
        opacity: 1,
        x: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: EASINGS.expo,
        scrollTrigger: {
          trigger: ".features-list",
          start: "top 80%",
        },
      });
    },
    { scope: containerRef }
  );

  return (
    <section ref={containerRef} className="section-padding bg-white">
      <div className="container-custom">
        {(title || subtitle) && (
          <div className="features-header text-center mb-12">
            {subtitle && (
              <span className="eyebrow inline-block mb-4 text-secondary-600 font-semibold tracking-wider uppercase text-sm">
                {subtitle}
              </span>
            )}
            {title && <h2 className="heading-lg text-steel-900">{title}</h2>}
          </div>
        )}

        <div
          className={`features-list ${
            layout === "grid"
              ? "grid md:grid-cols-2 lg:grid-cols-3 gap-6"
              : "max-w-3xl mx-auto space-y-4"
          }`}
        >
          {features.map((feature, index) => (
            <div
              key={index}
              className={`feature-item group ${
                layout === "grid"
                  ? "p-6 bg-steel-50 rounded-2xl border border-steel-100 hover:border-primary-200 hover:bg-white hover:shadow-lg transition-all duration-300"
                  : "flex items-start gap-4 p-5 bg-steel-50 rounded-xl border border-steel-100"
              }`}
            >
              {feature.icon ? (
                <div
                  className={`${
                    layout === "grid" ? "mb-4" : "flex-shrink-0"
                  }`}
                >
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary-600 to-primary-700 flex items-center justify-center shadow-md group-hover:scale-105 transition-transform">
                    <feature.icon className="w-6 h-6 text-white" />
                  </div>
                </div>
              ) : (
                <div className="flex-shrink-0">
                  <CheckCircle2 className="w-6 h-6 text-primary-600" />
                </div>
              )}
              <div>
                <h3
                  className={`font-display font-bold text-steel-900 ${
                    layout === "grid" ? "text-xl mb-2" : "text-lg"
                  }`}
                >
                  {feature.title}
                </h3>
                <p className="text-steel-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
