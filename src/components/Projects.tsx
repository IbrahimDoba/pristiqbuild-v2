"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap/config";
import { EASINGS } from "@/lib/gsap/easings";
import Image from "next/image";
import Link from "next/link";
import { MapPin, ArrowUpRight } from "lucide-react";

/**
 * One project carries the section, two support it.
 *
 * Akure is the featured job because it is the one with verified numbers. The
 * supporting cards are exactly what the brief names for the homepage; the full
 * list lives on /projects.
 */
const featured = {
  slug: "akure-lgs-roofing",
  title: "Akure Residence",
  tag: "LGS Roofing",
  location: "Akure, Ondo State",
  description:
    "A large residential roof, engineered, fabricated and installed in G550 light gauge steel.",
  stats: [
    { value: "1,080 sqm", label: "Roof area" },
    { value: "6.8t", label: "G550 steel" },
    { value: "960", label: "C-channels" },
    { value: "75%", label: "Less waste vs timber" },
  ],
  image: "/LGS/1752987831787.jpeg",
};

const projects = [
  {
    slug: "maitama-luxury-mansion",
    title: "Private Residence, Maitama",
    tag: "LGS Roofing",
    location: "Maitama, Abuja",
    description: "Full project details coming soon.",
    image: "/maitama/dji_fly_20250305_140920_676_1741180573389_photo.jpg",
  },
  {
    slug: "breeze-point-estate",
    title: "Breeze Point Estate",
    tag: "Conventional",
    location: "Kubwa, Abuja",
    description:
      "Five terrace duplexes in a joint venture with the landowner, nearing completion.",
    image: "/breezepoint/breeze1.jpg",
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
        <div className="flex flex-wrap items-end justify-between gap-6 mb-12">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.14em] text-primary-700 mb-4">
              Projects
            </p>
            <h2 className="heading-lg text-steel-900 mb-4">Work we have delivered</h2>
            <p className="body-lg text-steel-600">
              Real jobs, delivered or in progress, across Abuja and beyond.
            </p>
          </div>
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-primary-700 font-semibold hover:text-primary-900 transition-colors shrink-0"
          >
            View all projects
            <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
          </Link>
        </div>

        {/* Featured: asymmetric split, deliberately not the card shape below. */}
        <Link
          href={`/projects/${featured.slug}`}
          className="proj-feature group grid lg:grid-cols-12 overflow-hidden border border-steel-200 bg-deep-steel text-white mb-6"
        >
          <div className="relative lg:col-span-7 aspect-[16/10] lg:aspect-auto lg:min-h-[440px] overflow-hidden">
            <Image
              src={featured.image}
              alt={`${featured.title}, LGS roof`}
              fill
              sizes="(max-width: 1024px) 100vw, 58vw"
              className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
            />
          </div>

          <div className="lg:col-span-5 p-8 lg:p-10 flex flex-col justify-center">
            <p className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs uppercase tracking-wider font-semibold text-silver mb-3">
              <span>Featured · {featured.tag}</span>
              <span className="inline-flex items-center gap-1 normal-case tracking-normal font-normal text-white/60">
                <MapPin className="w-3.5 h-3.5" aria-hidden="true" />
                {featured.location}
              </span>
            </p>
            <h3 className="font-display font-bold text-3xl lg:text-4xl mb-4 leading-tight">
              {featured.title}
            </h3>
            <p className="text-white/70 leading-relaxed mb-8">{featured.description}</p>

            <dl className="grid grid-cols-2 border-t border-l border-white/15 mb-8 m-0">
              {featured.stats.map((s) => (
                <div
                  key={s.label}
                  className="flex flex-col-reverse justify-end border-r border-b border-white/15 p-4"
                >
                  <dt className="text-xs text-white/60 leading-snug">{s.label}</dt>
                  <dd className="m-0 mb-1 font-display font-bold text-2xl tabular leading-none">
                    {s.value}
                  </dd>
                </div>
              ))}
            </dl>

            <span className="inline-flex items-center gap-1.5 text-sm font-semibold group-hover:text-silver transition-colors">
              Read the case study
              <ArrowUpRight
                className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                aria-hidden="true"
              />
            </span>
          </div>
        </Link>

        <ul className="proj-grid grid md:grid-cols-2 gap-6 list-none p-0 m-0">
          {projects.map((project) => (
            <li key={project.slug} className="proj-card">
              <Link
                href={`/projects/${project.slug}`}
                className="group grid sm:grid-cols-5 h-full overflow-hidden border border-steel-200 bg-white hover:border-primary-300 transition-colors"
              >
                <div className="relative sm:col-span-2 aspect-[4/3] sm:aspect-auto sm:min-h-[220px] overflow-hidden bg-steel-100">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 768px) 40vw, 20vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>

                <div className="sm:col-span-3 flex flex-col p-6">
                  <span className="self-start text-xs uppercase tracking-wider text-primary-700 font-semibold border border-primary-200 px-2 py-1 mb-4">
                    {project.tag}
                  </span>
                  <h3 className="font-display font-semibold text-lg text-steel-900 leading-snug mb-2 group-hover:text-primary-700 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-sm text-steel-600 leading-relaxed mb-4">
                    {project.description}
                  </p>
                  <p className="mt-auto inline-flex items-center gap-1.5 text-xs text-steel-500">
                    <MapPin className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                    {project.location}
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
