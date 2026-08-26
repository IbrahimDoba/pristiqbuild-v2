"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap/config";
import { EASINGS } from "@/lib/gsap/easings";
import Image from "next/image";

interface ContentSection {
  title: string;
  content: string;
  image?: string;
  imageAlt?: string;
  imagePosition?: "left" | "right";
  highlights?: string[];
}

interface ProjectContentProps {
  sections: ContentSection[];
}

export default function ProjectContent({ sections }: ProjectContentProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.set(".content-section", { opacity: 0, y: 60 });

      gsap.to(".content-section", {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.2,
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
    <section ref={containerRef} className="section-padding bg-white">
      <div className="container-custom space-y-16 sm:space-y-24">
        {sections.map((section, index) => (
          <div
            key={index}
            className={`content-section grid lg:grid-cols-2 gap-8 lg:gap-12 items-start ${
              section.imagePosition === "left" ? "" : "lg:grid-flow-dense"
            }`}
          >
            {/* Text Content */}
            <div
              className={`${
                section.imagePosition === "left" ? "lg:order-2" : ""
              }`}
            >
              <h2 className="heading-md text-steel-900 mb-4 sm:mb-6">{section.title}</h2>
              <div className="prose prose-steel max-w-none">
                <p className="text-steel-600 leading-relaxed text-base sm:text-lg">
                  {section.content}
                </p>
              </div>
              {section.highlights && section.highlights.length > 0 && (
                <ul className="mt-6 sm:mt-8 space-y-3">
                  {section.highlights.map((highlight, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="shrink-0 w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-primary-100 flex items-center justify-center mt-0.5">
                        <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-primary-600" />
                      </span>
                      <span className="text-steel-700 leading-relaxed text-sm sm:text-base">
                        {highlight}
                      </span>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Image */}
            {section.image && (
              <div
                className={`relative ${
                  section.imagePosition === "left" ? "lg:order-1" : ""
                }`}
              >
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-xl sm:shadow-2xl">
                  <Image
                    src={section.image}
                    alt={section.imageAlt || section.title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover"
                  />
                </div>
                {/* Decorative element - hidden on mobile to prevent overflow */}
                <div className="hidden lg:block absolute -bottom-4 -right-4 w-full h-full bg-linear-to-br from-primary-200 to-secondary-200 rounded-2xl -z-10" />
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
