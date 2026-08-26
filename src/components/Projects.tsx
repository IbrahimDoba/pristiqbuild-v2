"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap/config";
import { EASINGS } from "@/lib/gsap/easings";
import Image from "next/image";
import Link from "next/link";
import { MapPin, ArrowUpRight } from "lucide-react";

/**
 * One project carries the section, four support it.
 *
 * Previously six equal cards in a 3x2 grid, which gave a flagship estate the
 * same weight as a roof replacement and said nothing about which work matters
 * most. Two of those six also pointed at the same URL: "Opulence Heights" and
 * "Opulence Heights Interiors" were one project split across two cards. The
 * interiors photography now sits inside the featured project where it belongs,
 * so every card leads somewhere different.
 */
const featured = {
  slug: "opulence-heights",
  title: "Opulence Heights",
  category: "Smart Living Estate",
  location: "Dawaki Hillside, Abuja",
  description:
    "Nigeria's first smart steel residential estate. Solar power with battery storage, app-controlled home automation, and a precision-engineered steel frame guaranteed for over fifty years.",
  stats: [
    { value: "18", label: "Villas" },
    { value: "48kWh", label: "Battery per villa" },
    { value: "50+", label: "Year frame guarantee" },
  ],
  cover: "/dawaki estate/1.png",
  gallery: [
    "/dawaki estate/PRISTIQ ESTATE_4 - Photo.png",
    "/dawaki estate/PRISTIQ ESTATE_7 - Photo.png",
    "/dawaki estate/2.png",
  ],
};

const projects = [
  {
    slug: "maitama-luxury-mansion",
    title: "Maitama Luxury Mansion",
    category: "Residential Roofing",
    location: "Colorado Street, Maitama",
    year: "2025",
    image: "/maitama/dji_fly_20250305_140920_676_1741180573389_photo.jpg",
  },
  {
    slug: "akure-lgs-roofing",
    title: "Akure Castle Residence",
    category: "Large Scale Roofing",
    location: "Akure, Ondo State",
    year: "2024",
    image: "/LGS/1752987831787.jpeg",
  },
  {
    slug: "breeze-point-estate",
    title: "Breeze Point Estate",
    category: "Residential Development",
    location: "F01 Kubwa, Abuja",
    year: "2024",
    image: "/breezepoint/breeze1.jpg",
  },
  {
    slug: "aso-grove-roofing",
    title: "Aso Grove Roof",
    category: "Roof Replacement",
    location: "Aso Grove Estate, Abuja",
    year: "2025",
    image: "/aso/aso1.JPG",
  },
];

export default function Projects() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // Entrance only. Reduced motion is handled globally in lib/gsap/config.
      gsap.set(".proj-feature", { opacity: 0, y: 40 });
      gsap.set(".proj-card", { opacity: 0, y: 30 });

      gsap.to(".proj-feature", {
        opacity: 1,
        y: 0,
        duration: 0.7,
        ease: EASINGS.expo,
        scrollTrigger: { trigger: ".proj-feature", start: "top 85%" },
      });

      gsap.to(".proj-card", {
        opacity: 1,
        y: 0,
        duration: 0.5,
        stagger: 0.08,
        ease: EASINGS.expo,
        scrollTrigger: { trigger: ".proj-grid", start: "top 88%" },
      });
    },
    { scope: containerRef }
  );

  return (
    <section id="projects" ref={containerRef} className="section-padding bg-white">
      <div className="container-custom">
        {/* Left-aligned, with the secondary link on the heading's baseline. */}
        <div className="flex flex-wrap items-end justify-between gap-6 mb-12">
          <div className="max-w-2xl">
            <h2 className="heading-lg text-steel-900 mb-4">
              Work we have <span className="text-gradient">delivered</span>
            </h2>
            <p className="body-lg text-steel-600">
              Estates, mansions and roof replacements across Abuja, Ondo and
              beyond. Every one of them steel framed.
            </p>
          </div>
          <Link
            href="/case-studies"
            className="inline-flex items-center gap-2 text-primary-700 font-semibold hover:text-primary-800 transition-colors shrink-0"
          >
            All case studies
            <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
          </Link>
        </div>

        {/* Featured: asymmetric split, deliberately not the card shape below. */}
        <Link
          href={`/projects/${featured.slug}`}
          className="proj-feature group grid lg:grid-cols-12 rounded-2xl overflow-hidden border border-steel-100 bg-steel-950 text-white mb-6"
        >
          <div className="relative lg:col-span-7 aspect-[16/10] lg:aspect-auto lg:min-h-[420px] overflow-hidden">
            <Image
              src={featured.cover}
              alt={featured.title}
              fill
              sizes="(max-width: 1024px) 100vw, 58vw"
              className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
            />
          </div>

          <div className="lg:col-span-5 p-8 lg:p-10 flex flex-col justify-center">
            <span className="text-xs uppercase tracking-wider text-secondary-400 font-semibold mb-3">
              {featured.category}
            </span>
            <h3 className="font-display font-bold text-3xl lg:text-4xl mb-4 leading-tight">
              {featured.title}
            </h3>
            <p className="text-white/70 leading-relaxed mb-7">
              {featured.description}
            </p>

            <dl className="grid grid-cols-3 gap-4 mb-8 m-0">
              {featured.stats.map((s) => (
                <div key={s.label}>
                  <dt className="font-display font-bold text-2xl tabular leading-none mb-1">
                    {s.value}
                  </dt>
                  <dd className="text-xs text-white/50 m-0 leading-snug">
                    {s.label}
                  </dd>
                </div>
              ))}
            </dl>

            <div className="flex items-center gap-3">
              {featured.gallery.map((src) => (
                <div
                  key={src}
                  className="relative w-16 h-12 rounded-lg overflow-hidden border border-white/15 shrink-0"
                >
                  <Image src={src} alt="" fill sizes="64px" className="object-cover" />
                </div>
              ))}
              <span className="inline-flex items-center gap-1.5 text-sm font-semibold ml-auto group-hover:text-secondary-400 transition-colors">
                View project
                <ArrowUpRight
                  className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  aria-hidden="true"
                />
              </span>
            </div>
          </div>
        </Link>

        {/* Supporting row: smaller and denser, a different shape from the feature. */}
        <ul className="proj-grid grid sm:grid-cols-2 lg:grid-cols-4 gap-6 list-none p-0 m-0">
          {projects.map((project) => (
            <li key={project.slug} className="proj-card">
              <Link
                href={`/projects/${project.slug}`}
                className="group flex h-full flex-col rounded-2xl overflow-hidden border border-steel-100 bg-white transition-[box-shadow,transform] duration-300 hover:shadow-xl hover:-translate-y-1"
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-steel-100">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>

                <div className="flex flex-1 flex-col p-5">
                  <span className="text-xs uppercase tracking-wider text-primary-700 font-semibold mb-2">
                    {project.category}
                  </span>
                  <h3 className="font-display font-semibold text-steel-900 leading-snug mb-3 group-hover:text-primary-700 transition-colors">
                    {project.title}
                  </h3>
                  <p className="mt-auto inline-flex items-center gap-1.5 text-xs text-steel-500">
                    <MapPin className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                    {project.location}
                    <span className="ml-auto tabular">{project.year}</span>
                  </p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
