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
      <div className="container-custom space-y-24">
        {sections.map((section, index) => (
          <div
            key={index}
            className={`content-section grid lg:grid-cols-2 gap-12 items-center ${
              section.imagePosition === "left" ? "" : "lg:grid-flow-dense"
            }`}
          >
            {/* Text Content */}
            <div
              className={`${
                section.imagePosition === "left" ? "lg:order-2" : ""
              }`}
            >
              <h2 className="heading-md text-steel-900 mb-6">{section.title}</h2>
              <div className="prose prose-lg prose-steel max-w-none">
                <p className="text-steel-600 leading-relaxed text-lg">
                  {section.content}
                </p>
              </div>
              {section.highlights && section.highlights.length > 0 && (
                <ul className="mt-8 space-y-3">
                  {section.highlights.map((highlight, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary-100 flex items-center justify-center mt-0.5">
                        <span className="w-2 h-2 rounded-full bg-primary-600" />
                      </span>
                      <span className="text-steel-700 leading-relaxed">
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
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
                  <Image
                    src={section.image}
                    alt={section.imageAlt || section.title}
                    fill
                    className="object-cover"
                  />
                </div>
                {/* Decorative element */}
                <div className="absolute -bottom-4 -right-4 w-full h-full bg-gradient-to-br from-primary-200 to-secondary-200 rounded-2xl -z-10" />
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
