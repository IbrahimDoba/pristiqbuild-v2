"use client";

import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap/config";
import { EASINGS } from "@/lib/gsap/easings";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

interface ProjectGalleryProps {
  images: {
    src: string;
    alt: string;
    caption?: string;
  }[];
  title?: string;
}

export default function ProjectGallery({ images, title = "Project Gallery" }: ProjectGalleryProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  useGSAP(
    () => {
      gsap.set(".gallery-header", { opacity: 0, y: 40 });
      gsap.set(".gallery-item", { opacity: 0, y: 60, scale: 0.95 });

      gsap.to(".gallery-header", {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: EASINGS.expo,
        scrollTrigger: {
          trigger: ".gallery-header",
          start: "top 85%",
        },
      });

      gsap.to(".gallery-item", {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.6,
        stagger: 0.1,
        ease: EASINGS.expo,
        scrollTrigger: {
          trigger: ".gallery-grid",
          start: "top 80%",
        },
      });
    },
    { scope: containerRef }
  );

  const openLightbox = (index: number) => {
    setCurrentIndex(index);
    setLightboxOpen(true);
    document.body.style.overflow = "hidden";
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
    document.body.style.overflow = "auto";
  };

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <section ref={containerRef} className="section-padding bg-steel-50">
      <div className="container-custom">
        <div className="gallery-header text-center mb-12">
          <span className="eyebrow inline-block mb-4 text-secondary-600 font-semibold tracking-wider uppercase text-sm">
            Visual Journey
          </span>
          <h2 className="heading-lg text-steel-900">{title}</h2>
        </div>

        <div className="gallery-grid grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {images.map((image, index) => (
            <div
              key={index}
              className={`gallery-item group relative cursor-pointer overflow-hidden rounded-2xl ${
                index === 0 ? "col-span-2 row-span-2" : ""
              }`}
              onClick={() => openLightbox(index)}
            >
              <div className={`relative ${index === 0 ? "aspect-square" : "aspect-[4/3]"}`}>
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="w-14 h-14 rounded-full bg-white/90 flex items-center justify-center shadow-xl">
                    <svg className="w-6 h-6 text-steel-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                    </svg>
                  </div>
                </div>
                {image.caption && (
                  <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <p className="text-white text-sm font-medium">{image.caption}</p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {lightboxOpen && (
        <div className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center">
          <button
            onClick={closeLightbox}
            className="absolute top-6 right-6 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
          >
            <X className="w-6 h-6 text-white" />
          </button>

          <button
            onClick={prevImage}
            className="absolute left-6 w-14 h-14 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
          >
            <ChevronLeft className="w-8 h-8 text-white" />
          </button>

          <button
            onClick={nextImage}
            className="absolute right-6 w-14 h-14 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
          >
            <ChevronRight className="w-8 h-8 text-white" />
          </button>

          <div className="relative w-full max-w-5xl h-[80vh] mx-4">
            <Image
              src={images[currentIndex].src}
              alt={images[currentIndex].alt}
              fill
              className="object-contain"
            />
          </div>

          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2.5 h-2.5 rounded-full transition-colors ${
                  index === currentIndex ? "bg-white" : "bg-white/40"
                }`}
              />
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
