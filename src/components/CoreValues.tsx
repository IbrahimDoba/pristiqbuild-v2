"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap/config";
import { EASINGS } from "@/lib/gsap/easings";
import Image from "next/image";
import {
  Lightbulb,
  Award,
  Leaf,
  Shield,
  TrendingUp,
} from "lucide-react";

const values = [
  {
    icon: Lightbulb,
    title: "Innovation",
    description:
      "Pioneering new construction methods and technologies to revolutionize the Nigerian building industry.",
    gradient: "from-secondary-500 to-secondary-600",
    image: "/LGS/lgs3.jpeg",
  },
  {
    icon: Award,
    title: "Quality",
    description:
      "Uncompromising standards in every project, ensuring durability and excellence in every module we build.",
    gradient: "from-primary-600 to-primary-700",
    image: "/LGS/lgs4.jpeg",
  },
  {
    icon: Leaf,
    title: "Sustainability",
    description:
      "Committed to eco-friendly practices, reducing waste and energy consumption in all our constructions.",
    gradient: "from-green-500 to-green-600",
    image: "/LGS/lgs5.jpeg",
  },
  {
    icon: Shield,
    title: "Trust & Reliability",
    description:
      "Building lasting relationships through transparent communication and consistent delivery.",
    gradient: "from-blue-500 to-blue-600",
    image: "/LGS/lgs2.jpeg",
  },
  {
    icon: TrendingUp,
    title: "Growth Focused",
    description:
      "Dedicated to expanding capabilities and market reach while developing our team and partners.",
    gradient: "from-purple-500 to-purple-600",
    image: "/LGS/construction.jpg",
  },
];

export default function CoreValues() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // Set initial states
      gsap.set(".section-header", { opacity: 0, y: 50 });
      gsap.set(".value-card", { opacity: 0, y: 80, scale: 0.8 });
      gsap.set(".floating-shape", { opacity: 0, scale: 0 });

      // Create ScrollTrigger timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
          end: "top 30%",
          toggleActions: "play none none none",
        },
      });

      // Animate header
      tl.to(".section-header", {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: EASINGS.expo,
      });

      // Animate cards with stagger
      tl.to(".value-card", {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.8,
        stagger: 0.15,
        ease: EASINGS.back,
      }, "-=0.5");

      // Animate floating shapes
      tl.to(".floating-shape", {
        opacity: 0.6,
        scale: 1,
        duration: 1,
        stagger: 0.2,
        ease: EASINGS.back,
      }, "-=1");

      // Floating animation for shapes
      gsap.to(".floating-shape-1", {
        y: -30,
        x: 20,
        rotation: 10,
        duration: 4,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut",
      });

      gsap.to(".floating-shape-2", {
        y: 30,
        x: -20,
        rotation: -10,
        duration: 5,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut",
      });
    },
    { scope: containerRef }
  );

  return (
    <section
      id="why-pristiqbuild"
      ref={containerRef}
      className="section-padding relative bg-gradient-to-b from-white via-gray-50 to-white overflow-hidden"
    >
      {/* Animated Background Shapes */}
      <div className="floating-shape floating-shape-1 absolute top-20 right-10 w-72 h-72 bg-gradient-to-br from-secondary-400/30 to-primary-400/30 rounded-full blur-3xl" />
      <div className="floating-shape floating-shape-2 absolute bottom-40 left-10 w-96 h-96 bg-gradient-to-br from-primary-400/30 to-secondary-400/30 rounded-full blur-3xl" />

      {/* Grid Pattern Overlay */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(0,0,0,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,0,0,0.1) 1px, transparent 1px)
          `,
          backgroundSize: "50px 50px",
        }}
      />

      <div className="container-custom relative z-10">
        {/* Section Header */}
        <div className="section-header text-center max-w-4xl mx-auto mb-20">
          <span className="eyebrow inline-block mb-4 text-black font-semibold tracking-wider uppercase text-sm">
            Why Choose Us
          </span>
          <h2 className="heading-xl text-steel-900 mb-6">
            What Sets{" "}
            <span className="text-gradient-gold">PristiqBuild</span> Apart
          </h2>
          <p className="text-xl text-steel-600 leading-relaxed">
            We&apos;re not just building structures, we&apos;re building
            Nigeria&apos;s future through innovation, quality, and unwavering
            commitment to excellence.
          </p>
        </div>

        {/* Bento-style Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {values.map((value, index) => (
            <div
              key={value.title}
              className={`value-card group relative ${
                index === 0 ? "md:col-span-2 lg:col-span-1" : ""
              } ${index === 3 ? "lg:col-span-2" : ""}`}
            >
              {/* Card Container */}
              <div className="relative h-full min-h-[320px] rounded-3xl overflow-hidden bg-white shadow-xl shadow-steel-200/50 border border-steel-100 transition-all duration-700 hover:shadow-2xl hover:shadow-primary-300/40 hover:-translate-y-2">
                {/* Background Image */}
                <div className="absolute inset-0 z-0">
                  <Image
                    src={value.image}
                    alt={value.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  {/* Gradient Overlay */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${value.gradient} opacity-90 group-hover:opacity-95 transition-opacity duration-700`} />
                  {/* Pattern Overlay */}
                  <div
                    className="absolute inset-0 opacity-10"
                    style={{
                      backgroundImage: `
                        linear-gradient(rgba(255,255,255,0.2) 1px, transparent 1px),
                        linear-gradient(90deg, rgba(255,255,255,0.2) 1px, transparent 1px)
                      `,
                      backgroundSize: "30px 30px",
                    }}
                  />
                </div>

                {/* Content */}
                <div className="relative z-10 h-full p-8 flex flex-col justify-between">
                  {/* Icon */}
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm mb-6 transform transition-all duration-500 group-hover:scale-110 group-hover:rotate-6 border border-white/30">
                    <value.icon className="w-8 h-8 text-white" strokeWidth={2.5} />
                  </div>

                  {/* Text Content */}
                  <div>
                    <h3 className="text-3xl font-display font-bold text-white mb-4 leading-tight">
                      {value.title}
                    </h3>
                    <p className="text-white/90 text-lg leading-relaxed">
                      {value.description}
                    </p>
                  </div>

                  {/* Decorative Bottom Line */}
                  <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-white/40 transform scale-x-0 transition-transform duration-500 group-hover:scale-x-100 origin-left" />
                </div>

                {/* Shine Effect on Hover */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000" />
                </div>
              </div>

              {/* Glow Effect */}
              <div className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${value.gradient} opacity-0 blur-2xl transition-opacity duration-700 group-hover:opacity-20 -z-10`} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
