"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap/config";
import { EASINGS } from "@/lib/gsap/easings";
import Image from "next/image";
import {
  PenTool,
  FileCheck,
  Factory,
  MapPin,
  Hammer,
  ClipboardCheck,
  Key,
} from "lucide-react";

const steps = [
  {
    icon: PenTool,
    number: "01",
    title: "Planning & Design",
    description:
      "Collaborative design sessions using VR/AR technology. We create detailed 3D models and BIM documentation tailored to your vision and requirements.",
    duration: "2-4 weeks",
    highlights: ["VR walkthroughs", "Custom design", "Cost estimation"],
    image: "/LGS/lgs3.jpeg",
  },
  {
    icon: FileCheck,
    number: "02",
    title: "Permits & Approvals",
    description:
      "We handle all regulatory requirements, building permits, and necessary approvals while you focus on your vision.",
    duration: "3-6 weeks",
    highlights: ["Documentation", "Regulatory compliance", "Local permits"],
    image: "/LGS/shaking-hands.jpg",
  },
  {
    icon: Factory,
    number: "03",
    title: "Prefabrication",
    description:
      "Precision manufacturing in our controlled factory environment. Each module is built to exact specifications with rigorous quality checks.",
    duration: "4-8 weeks",
    highlights: ["Factory precision", "Quality control", "Parallel production"],
    image: "/LGS/construction.jpg",
  },
  {
    icon: MapPin,
    number: "04",
    title: "Site Development",
    description:
      "Foundation work and site preparation happen simultaneously with factory production, significantly reducing overall timeline.",
    duration: "2-4 weeks",
    highlights: ["Foundation work", "Utility connections", "Site preparation"],
    image: "/LGS/lgs5.jpeg",
  },
  {
    icon: Hammer,
    number: "05",
    title: "On-Site Assembly",
    description:
      "Rapid assembly of prefabricated modules on-site. Our experienced teams ensure precise alignment and secure connections.",
    duration: "1-3 weeks",
    highlights: ["Rapid assembly", "Minimal disruption", "Expert installation"],
    image: "/LGS/lgs2.jpeg",
  },
  {
    icon: ClipboardCheck,
    number: "06",
    title: "Quality Control",
    description:
      "Comprehensive inspection and testing of all systems. We ensure everything meets our exacting standards before handover.",
    duration: "1-2 weeks",
    highlights: ["Final inspections", "System testing", "Finishing touches"],
    image: "/LGS/lgs1.jpeg",
  },
  {
    icon: Key,
    number: "07",
    title: "Handover",
    description:
      "Complete documentation, warranties, and training provided. Your project is delivered on time, on budget, and beyond expectations.",
    duration: "1 week",
    highlights: ["Documentation", "Warranty", "Client training"],
    image: "/LGS/handover6.jpg",
  },
];

export default function Process() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // Set initial states
      gsap.set(".process-header", { opacity: 0, y: 50 });
      gsap.set(".process-step", { opacity: 0, y: 100 });
      gsap.set(".timeline-line", { scaleY: 0 });
      gsap.set(".process-stats", { opacity: 0, y: 60 });

      // Header animation
      gsap.to(".process-header", {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: EASINGS.expo,
        scrollTrigger: {
          trigger: ".process-header",
          start: "top 80%",
          toggleActions: "play none none none",
        },
      });

      // Timeline line grows as you scroll
      gsap.to(".timeline-line", {
        scaleY: 1,
        ease: "none",
        scrollTrigger: {
          trigger: ".timeline-container",
          start: "top 60%",
          end: "bottom 80%",
          scrub: 1,
        },
      });

      // Animate steps with stagger
      gsap.to(".process-step", {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: EASINGS.expo,
        scrollTrigger: {
          trigger: ".timeline-container",
          start: "top 70%",
          toggleActions: "play none none none",
        },
      });

      // Stats animation
      gsap.to(".process-stats", {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: EASINGS.expo,
        scrollTrigger: {
          trigger: ".process-stats",
          start: "top 80%",
          toggleActions: "play none none none",
        },
      });
    },
    { scope: containerRef }
  );

  return (
    <section
      id="process"
      ref={containerRef}
      className="section-padding relative bg-gradient-to-b from-white via-gray-50 to-white overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute top-20 right-0 w-96 h-96 bg-gradient-to-br from-primary-400/20 to-secondary-400/20 rounded-full blur-3xl" />
      <div className="absolute bottom-40 left-0 w-96 h-96 bg-gradient-to-br from-secondary-400/20 to-primary-400/20 rounded-full blur-3xl" />

      {/* Grid Pattern */}
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
        <div className="process-header text-center max-w-3xl mx-auto mb-20">
          <span className="eyebrow inline-block mb-4 text-secondary-600 font-semibold tracking-wider uppercase text-sm">
            Our Process
          </span>
          <h2 className="heading-xl text-steel-900 mb-6">
            How We <span className="text-gradient-gold">Build</span>
          </h2>
          <p className="text-xl text-steel-600 leading-relaxed">
            Our streamlined process delivers projects 30-50% faster than
            traditional construction while maintaining the highest quality
            standards.
          </p>
        </div>

        {/* Timeline Container */}
        <div className="timeline-container relative max-w-6xl mx-auto">
          {/* Vertical Timeline Line */}
          <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-steel-200 via-steel-200 to-steel-200 -translate-x-1/2 rounded-full">
            <div className="timeline-line absolute top-0 left-0 w-full h-full bg-gradient-to-b from-primary-600 via-secondary-500 to-primary-600 origin-top rounded-full" />
          </div>

          {/* Process Steps */}
          <div className="space-y-16">
            {steps.map((step, index) => {
              const isEven = index % 2 === 0;
              return (
                <div
                  key={step.number}
                  className={`process-step relative lg:grid lg:grid-cols-2 lg:gap-12 items-center`}
                >
                  {/* Image Side */}
                  <div
                    className={`relative ${
                      isEven ? "lg:order-1" : "lg:order-2"
                    } mb-6 lg:mb-0`}
                  >
                    <div className="group relative">
                      {/* Main Image Container */}
                      <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl border-4 border-white">
                        <Image
                          src={step.image}
                          alt={step.title}
                          fill
                          className="object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                        {/* Gradient Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-tr from-primary-900/40 via-transparent to-transparent" />

                        {/* Step Number Overlay */}
                        <div className="absolute top-6 left-6 w-20 h-20 rounded-2xl bg-white/95 backdrop-blur-sm flex items-center justify-center shadow-xl">
                          <span className="text-4xl font-display font-bold text-primary-600">
                            {step.number}
                          </span>
                        </div>

                        {/* Duration Badge */}
                        <div className="absolute bottom-6 right-6 bg-white/95 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg">
                          <span className="text-sm font-semibold text-primary-600">
                            {step.duration}
                          </span>
                        </div>
                      </div>

                      {/* Decorative Glow */}
                      <div className="absolute inset-0 bg-gradient-to-br from-primary-400/30 to-secondary-400/30 rounded-2xl blur-2xl opacity-0 group-hover:opacity-50 transition-opacity duration-700 -z-10" />
                    </div>
                  </div>

                  {/* Content Side */}
                  <div
                    className={`${
                      isEven ? "lg:order-2" : "lg:order-1"
                    } ${
                      isEven ? "lg:pl-8" : "lg:pr-8"
                    }`}
                  >
                    <div className="space-y-4">
                      {/* Icon */}
                      <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-primary-600 to-secondary-600 shadow-lg">
                        <step.icon className="w-8 h-8 text-white" strokeWidth={2.5} />
                      </div>

                      {/* Title */}
                      <h3 className="text-3xl md:text-4xl font-display font-bold text-steel-900">
                        {step.title}
                      </h3>

                      {/* Description */}
                      <p className="text-lg text-steel-600 leading-relaxed">
                        {step.description}
                      </p>

                      {/* Highlights */}
                      <div className="flex flex-wrap gap-2 pt-2">
                        {step.highlights.map((highlight, i) => (
                          <span
                            key={i}
                            className="inline-flex items-center gap-1.5 text-sm font-medium text-primary-700 bg-primary-50 px-4 py-2 rounded-full border border-primary-100"
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-primary-600" />
                            {highlight}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Timeline Node (Desktop) */}
                  <div className="hidden lg:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
                    <div className="relative">
                      <div className="w-6 h-6 rounded-full bg-white border-4 border-primary-600 shadow-lg" />
                      <div className="absolute inset-0 rounded-full bg-primary-400 animate-ping opacity-30" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Benefits Stats */}
        <div className="process-stats mt-24 grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              value: "30-50%",
              label: "Faster Than Traditional",
              sublabel: "Construction timeline",
              gradient: "from-orange-500 to-orange-600",
            },
            {
              value: "20-30%",
              label: "Cost Savings",
              sublabel: "Compared to conventional",
              gradient: "from-green-500 to-green-600",
            },
            {
              value: "90%",
              label: "Factory Built",
              sublabel: "Weather-independent",
              gradient: "from-blue-500 to-blue-600",
            },
          ].map((stat, i) => (
            <div
              key={i}
              className="group relative bg-white rounded-2xl p-8 text-center overflow-hidden shadow-xl border border-steel-100 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
            >
              {/* Background Pattern */}
              <div
                className="absolute inset-0 opacity-5"
                style={{
                  backgroundImage: `radial-gradient(circle at 2px 2px, rgba(0,0,0,0.2) 1px, transparent 0)`,
                  backgroundSize: "24px 24px",
                }}
              />

              {/* Gradient Bar */}
              <div className={`absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r ${stat.gradient}`} />

              <div className="relative z-10">
                <div className={`text-5xl md:text-6xl font-display font-bold bg-gradient-to-r ${stat.gradient} bg-clip-text text-transparent mb-3`}>
                  {stat.value}
                </div>
                <div className="text-lg font-semibold text-steel-900 mb-1">
                  {stat.label}
                </div>
                <div className="text-sm text-steel-500">{stat.sublabel}</div>
              </div>

              {/* Hover Glow */}
              <div className={`absolute inset-0 bg-gradient-to-br ${stat.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500 -z-10`} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
