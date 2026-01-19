"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap/config";
import { EASINGS } from "@/lib/gsap/easings";
import { LucideIcon } from "lucide-react";

interface Stat {
  icon: LucideIcon;
  value: string;
  label: string;
  sublabel?: string;
}

interface ProjectStatsProps {
  stats: Stat[];
}

export default function ProjectStats({ stats }: ProjectStatsProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.set(".stat-card", { opacity: 0, y: 40, scale: 0.95 });

      gsap.to(".stat-card", {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.7,
        stagger: 0.1,
        ease: EASINGS.expo,
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
        },
      });
    },
    { scope: containerRef }
  );

  return (
    <section ref={containerRef} className="py-16 bg-gradient-to-b from-white to-steel-50">
      <div className="container-custom">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="stat-card group relative bg-white rounded-2xl p-6 text-center shadow-lg border border-steel-100 hover:shadow-xl hover:border-primary-200 transition-all duration-500"
            >
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-br from-primary-600 to-primary-700 mb-4 shadow-md group-hover:scale-110 transition-transform duration-300">
                <stat.icon className="w-7 h-7 text-white" />
              </div>
              <div className="text-3xl md:text-4xl font-display font-bold text-steel-900 mb-1">
                {stat.value}
              </div>
              <div className="text-base font-semibold text-steel-700 mb-0.5">
                {stat.label}
              </div>
              {stat.sublabel && (
                <div className="text-sm text-steel-500">{stat.sublabel}</div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
