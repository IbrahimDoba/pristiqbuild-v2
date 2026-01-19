"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap/config";
import { EASINGS } from "@/lib/gsap/easings";
import Image from "next/image";
import Link from "next/link";
import { MapPin, Calendar, Maximize2, Clock, ArrowLeft } from "lucide-react";

interface ProjectHeroProps {
  title: string;
  subtitle: string;
  location: string;
  duration: string;
  area?: string;
  status: string;
  heroImage: string;
  category: string;
}

export default function ProjectHero({
  title,
  subtitle,
  location,
  duration,
  area,
  status,
  heroImage,
  category,
}: ProjectHeroProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.set(".hero-content", { opacity: 0, y: 60 });
      gsap.set(".hero-image", { opacity: 0, scale: 1.1 });
      gsap.set(".hero-badge", { opacity: 0, y: 20 });

      gsap.to(".hero-image", {
        opacity: 1,
        scale: 1,
        duration: 1.5,
        ease: EASINGS.expo,
      });

      gsap.to(".hero-content", {
        opacity: 1,
        y: 0,
        duration: 1,
        delay: 0.3,
        ease: EASINGS.expo,
      });

      gsap.to(".hero-badge", {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.1,
        delay: 0.5,
        ease: EASINGS.back,
      });
    },
    { scope: containerRef }
  );

  return (
    <section ref={containerRef} className="relative min-h-[85vh] flex items-end">
      {/* Hero Image */}
      <div className="hero-image absolute inset-0">
        <Image
          src={heroImage}
          alt={title}
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-steel-950 via-steel-900/70 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-steel-950/50 to-transparent" />
      </div>

      {/* Back Button */}
      <Link
        href="/#projects"
        className="absolute top-24 left-6 md:left-12 z-20 flex items-center gap-2 text-white/80 hover:text-white transition-colors group"
      >
        <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center group-hover:bg-white/20 transition-colors">
          <ArrowLeft className="w-5 h-5" />
        </div>
        <span className="hidden md:inline font-medium">Back to Projects</span>
      </Link>

      {/* Content */}
      <div className="hero-content relative z-10 container-custom pb-16 md:pb-24">
        {/* Category Badge */}
        <div className="hero-badge mb-6">
          <span className="inline-block px-4 py-2 bg-gradient-to-r from-secondary-500 to-secondary-600 rounded-full text-sm font-bold text-white shadow-lg">
            {category}
          </span>
        </div>

        {/* Title */}
        <h1 className="heading-xl text-white mb-4 max-w-4xl">{title}</h1>
        <p className="text-xl md:text-2xl text-white/80 mb-8 max-w-2xl leading-relaxed">
          {subtitle}
        </p>

        {/* Project Details */}
        <div className="flex flex-wrap gap-4 md:gap-6">
          <div className="hero-badge flex items-center gap-2 px-5 py-3 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20">
            <MapPin className="w-5 h-5 text-secondary-400" />
            <span className="text-white font-medium">{location}</span>
          </div>
          <div className="hero-badge flex items-center gap-2 px-5 py-3 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20">
            <Clock className="w-5 h-5 text-secondary-400" />
            <span className="text-white font-medium">{duration}</span>
          </div>
          {area && (
            <div className="hero-badge flex items-center gap-2 px-5 py-3 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20">
              <Maximize2 className="w-5 h-5 text-secondary-400" />
              <span className="text-white font-medium">{area}</span>
            </div>
          )}
          <div className="hero-badge flex items-center gap-2 px-5 py-3 bg-primary-600/80 backdrop-blur-sm rounded-xl border border-primary-500/50">
            <Calendar className="w-5 h-5 text-white" />
            <span className="text-white font-bold">{status}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
