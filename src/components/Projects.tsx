"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap/config";
import { EASINGS } from "@/lib/gsap/easings";
import Image from "next/image";
import Link from "next/link";
import { MapPin, Calendar, Maximize2 } from "lucide-react";

const projects = [
  {
    id: 1,
    slug: "opulence-heights",
    title: "Opulence Heights",
    category: "Smart Living Estate",
    location: "Dawaki Hillside, Abuja",
    year: "2024",
    size: "18 Villas",
    description:
      "Nigeria's first smart steel residential estate featuring solar power, home automation, and precision engineered steel frame construction.",
    images: [
      "/dawaki estate/1.png",
      "/dawaki estate/2.png",
      "/dawaki estate/7.png",
    ],
    featured: true,
  },
  {
    id: 2,
    slug: "maitama-luxury-mansion",
    title: "Maitama Luxury Mansion",
    category: "Residential Roofing",
    location: "Colorado Street, Maitama",
    year: "2024",
    size: "288 sqm",
    description:
      "Precision engineered LGS roofing for a luxury mansion, completed in just 4 days with 60% faster installation than timber.",
    images: [
      "/maitama/dji_fly_20250305_140920_676_1741180573389_photo.jpg",
      "/maitama/WhatsApp Image 2025-09-14 at 16.28.03_af538643.jpg",
      "/maitama/WhatsApp Image 2025-09-14 at 16.28.32_5ae83e7e.jpg",
    ],
    featured: true,
  },
  {
    id: 3,
    slug: "akure-lgs-roofing",
    title: "Akure Castle Residence",
    category: "Large Scale Roofing",
    location: "Akure, Ondo State",
    year: "2024",
    size: "1,080 sqm",
    description:
      "One of our largest roofing projects featuring over 1,080 sqm of precision steel framework with 75% waste reduction.",
    images: [
      "/osun/osun1.jpg",
      "/osun/osun2.jpg",
      "/osun/osun3.jpg",
    ],
    featured: true,
  },
  {
    id: 4,
    slug: "breeze-point-estate",
    title: "Breeze Point Estate",
    category: "Residential Development",
    location: "F01 Kubwa, Abuja",
    year: "2024",
    size: "5 Units",
    description:
      "Exclusive luxury terrace homes with LGS roofing, smart home infrastructure, and premium finishes in Kubwa's F01 district.",
    images: [
      "/LGS/construction.jpg",
      "/LGS/lgs4.jpeg",
      "/LGS/lgs5.jpeg",
    ],
    featured: false,
  },
  {
    id: 5,
    slug: "aso-grove-roofing",
    title: "Aso Grove Roof Transformation",
    category: "Roof Replacement",
    location: "Aso Grove Estate, Abuja",
    year: "2024",
    size: "280 sqm",
    description:
      "Complete timber to LGS roof conversion in just 72 hours with advanced polyurethane waterproofing.",
    images: [
      "/maitama/aso1.JPG",
      "/maitama/aso2.JPG",
      "/maitama/aso3.JPG",
    ],
    featured: false,
  },
  {
    id: 6,
    slug: "opulence-heights",
    title: "Opulence Heights Interiors",
    category: "Smart Living",
    location: "Dawaki Hillside, Abuja",
    year: "2024",
    size: "Premium",
    description:
      "Designer interiors featuring smart home controls, double glazed windows, and thermal insulation for modern living.",
    images: [
      "/dawaki estate/PRISTIQ ESTATE_4 - Photo.png",
      "/dawaki estate/PRISTIQ ESTATE_7 - Photo.png",
      "/dawaki estate/PRISTIQ ESTATE_11 - Photo (1).png",
    ],
    featured: false,
  },
];

export default function Projects() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // Set initial states
      gsap.set(".projects-header", { opacity: 0, y: 50 });
      gsap.set(".project-card", { opacity: 0, y: 80, scale: 0.9 });

      // Header animation
      gsap.to(".projects-header", {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: EASINGS.expo,
        scrollTrigger: {
          trigger: ".projects-header",
          start: "top 80%",
          toggleActions: "play none none none",
        },
      });

      // Project cards stagger animation
      gsap.to(".project-card", {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.8,
        stagger: 0.15,
        ease: EASINGS.back,
        scrollTrigger: {
          trigger: ".projects-grid",
          start: "top 75%",
          toggleActions: "play none none none",
        },
      });
    },
    { scope: containerRef }
  );

  return (
    <section
      id="projects"
      ref={containerRef}
      className="section-padding relative bg-white overflow-hidden"
    >
      <div className="container-custom relative z-10">
        {/* Section Header */}
        <div className="projects-header text-center max-w-3xl mx-auto mb-16">
          <span className="eyebrow inline-block mb-4 text-secondary-600 font-semibold tracking-wider uppercase text-sm">
            Our Portfolio
          </span>
          <h2 className="heading-xl text-steel-900 mb-6">
            Featured <span className="text-gradient-gold">Projects</span>
          </h2>
          <p className="text-xl text-steel-600 leading-relaxed">
            Explore our portfolio of completed projects showcasing the
            versatility and quality of modular construction across Nigeria.
          </p>
        </div>

        {/* Projects Grid */}
        <div className="projects-grid grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <div
              key={project.id}
              className="project-card group"
            >
              <div className="relative h-full bg-white rounded-3xl overflow-hidden shadow-xl border border-steel-100 transition-all duration-700 hover:shadow-2xl hover:border-primary-300 hover:-translate-y-2">
                {/* Image Container */}
                <div className="relative overflow-hidden h-72">
                  <Image
                    src={project.images[0]}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

                  {/* Category Badge */}
                  <div className="absolute top-6 left-6">
                    <span className="px-4 py-2 bg-white/95 backdrop-blur-sm rounded-full text-xs font-bold text-primary-700 capitalize shadow-lg">
                      {project.category}
                    </span>
                  </div>

                  {/* Featured Badge */}
                  {project.featured && (
                    <div className="absolute top-6 right-6">
                      <span className="px-4 py-2 bg-gradient-to-r from-secondary-500 to-secondary-600 rounded-full text-xs font-bold text-white shadow-lg">
                        ⭐ Featured
                      </span>
                    </div>
                  )}

                  {/* Bottom Info Overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h3 className="text-2xl md:text-3xl font-display font-bold text-white mb-2">
                      {project.title}
                    </h3>
                    <div className="flex flex-wrap gap-4 text-sm text-white/90">
                      <div className="flex items-center gap-1.5">
                        <MapPin className="w-4 h-4" />
                        <span>{project.location}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Calendar className="w-4 h-4" />
                        <span>{project.year}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Maximize2 className="w-4 h-4" />
                        <span>{project.size}</span>
                      </div>
                    </div>
                  </div>

                  {/* Hover Overlay with Button */}
                  <div className="absolute inset-0 bg-primary-900/90 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                    <Link
                      href={`/projects/${project.slug}`}
                      className="px-8 py-4 bg-white text-primary-700 rounded-xl font-bold text-lg shadow-2xl transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 hover:bg-secondary-500 hover:text-white"
                    >
                      View Details
                    </Link>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <p className="text-steel-600 leading-relaxed mb-4">
                    {project.description}
                  </p>

                  {/* Image Gallery Preview */}
                  <div className="grid grid-cols-3 gap-2">
                    {project.images.slice(1, 3).map((img, i) => (
                      <div
                        key={i}
                        className="relative aspect-video rounded-lg overflow-hidden border-2 border-steel-100 group/thumb"
                      >
                        <Image
                          src={img}
                          alt={`${project.title} view ${i + 2}`}
                          fill
                          className="object-cover transition-transform duration-500 group-hover/thumb:scale-110"
                        />
                      </div>
                    ))}
                    <Link
                      href={`/projects/${project.slug}`}
                      className="relative aspect-video rounded-lg overflow-hidden border-2 border-primary-200 bg-gradient-to-br from-primary-600 to-secondary-600 flex items-center justify-center text-white font-bold text-sm hover:from-primary-700 hover:to-secondary-700 transition-all"
                    >
                      +More
                    </Link>
                  </div>
                </div>

                {/* Glow Effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary-400/30 to-secondary-400/30 rounded-3xl opacity-0 blur-2xl transition-opacity duration-700 group-hover:opacity-40 -z-10" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
