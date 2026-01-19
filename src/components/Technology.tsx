"use client";

import { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { Glasses, Users, Layers3, Zap, Monitor, Cloud } from "lucide-react";

const technologies = [
  {
    icon: Glasses,
    title: "Virtual Reality",
    subtitle: "Immersive Experiences",
    description:
      "Step inside your future home or office before construction begins. Our VR technology provides full-scale walkthroughs with realistic lighting, materials, and spatial awareness.",
    features: ["360° virtual tours", "Real-time design changes", "Remote collaboration"],
  },
  {
    icon: Monitor,
    title: "Augmented Reality",
    subtitle: "On-Site Visualization",
    description:
      "Overlay digital models onto physical spaces. See exactly how your building will look on your land, make instant modifications, and validate designs in real-world context.",
    features: ["Site visualization", "Progress tracking", "Issue detection"],
  },
  {
    icon: Layers3,
    title: "BIM Technology",
    subtitle: "Building Information Modeling",
    description:
      "Comprehensive 3D modeling with embedded data for every component. Our BIM workflows ensure accuracy, reduce conflicts, and enable seamless collaboration across teams.",
    features: ["Clash detection", "Cost estimation", "Lifecycle management"],
  },
  {
    icon: Cloud,
    title: "Digital Platforms",
    subtitle: "Connected Construction",
    description:
      "Cloud-based project management and real-time monitoring. Track progress, manage resources, and communicate with stakeholders through our integrated digital ecosystem.",
    features: ["Real-time updates", "Document management", "Team collaboration"],
  },
];

export default function Technology() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

  return (
    <section
      id="technology"
      ref={containerRef}
      className="section-padding relative overflow-hidden bg-primary-900"
    >
      {/* Animated Background */}
      <motion.div className="absolute inset-0" style={{ y: bgY }}>
        <div className="absolute inset-0 bg-gradient-to-br from-primary-900 via-primary-800 to-steel-900" />
        {/* Grid Pattern */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)
            `,
            backgroundSize: "80px 80px",
          }}
        />
      </motion.div>

      {/* Floating Tech Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-20 left-10 w-32 h-32 border border-primary-500/20 rounded-full"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-40 right-20 w-48 h-48 border border-secondary-400/20 rounded-lg"
          animate={{
            rotate: [0, 45, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{ duration: 12, repeat: Infinity }}
        />
        <motion.div
          className="absolute top-1/2 left-1/4 w-24 h-24 bg-primary-500/5 rounded-full blur-xl"
          animate={{
            y: [-30, 30, -30],
          }}
          transition={{ duration: 10, repeat: Infinity }}
        />
      </div>

      <div className="container-custom relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-5 py-2 mb-6"
          >
            <Zap className="w-4 h-4 text-secondary-400" />
            <span className="text-sm font-medium text-white/90">
              Cutting-Edge Innovation
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="heading-lg text-white mb-6"
          >
            Experience the{" "}
            <span className="text-gradient-gold">Future of Design</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="body-lg text-white/70"
          >
            We leverage the most advanced technologies in the construction
            industry to deliver unparalleled precision, visualization, and
            client satisfaction.
          </motion.p>
        </div>

        {/* Technology Cards */}
        <div className="grid md:grid-cols-2 gap-8">
          {technologies.map((tech, index) => (
            <motion.div
              key={tech.title}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.5,
                delay: 0.3 + index * 0.15,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="group"
            >
              <div className="relative h-full bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 transition-all duration-500 hover:bg-white/10 hover:border-white/20">
                {/* Accent Line */}
                <div className="absolute top-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-primary-400/50 to-transparent" />

                {/* Icon */}
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-xl bg-gradient-to-br from-secondary-500 to-secondary-600 mb-6 transform transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3">
                  <tech.icon className="w-8 h-8 text-white" />
                </div>

                {/* Content */}
                <div className="mb-6">
                  <span className="text-sm font-medium text-primary-400 mb-1 block">
                    {tech.subtitle}
                  </span>
                  <h3 className="heading-sm text-white mb-3">{tech.title}</h3>
                  <p className="body-md text-white/60">{tech.description}</p>
                </div>

                {/* Features */}
                <div className="flex flex-wrap gap-2">
                  {tech.features.map((feature, i) => (
                    <span
                      key={i}
                      className="inline-flex items-center gap-1 text-sm text-white/70 bg-white/5 px-3 py-1 rounded-full"
                    >
                      <span className="w-1 h-1 rounded-full bg-secondary-400" />
                      {feature}
                    </span>
                  ))}
                </div>

                {/* Hover Glow */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary-500/10 to-secondary-500/10 opacity-0 transition-opacity duration-500 group-hover:opacity-100 -z-10 blur-xl" />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Client-Centric Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.9 }}
          className="mt-20"
        >
          <div className="relative bg-gradient-to-r from-secondary-500/20 to-secondary-600/20 rounded-2xl p-8 md:p-12 border border-secondary-500/30 overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
              <div
                className="absolute inset-0"
                style={{
                  backgroundImage: `radial-gradient(circle at 2px 2px, rgba(255,255,255,0.3) 1px, transparent 0)`,
                  backgroundSize: "32px 32px",
                }}
              />
            </div>

            <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
              <div className="flex-shrink-0">
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-secondary-500 to-secondary-600 flex items-center justify-center">
                  <Users className="w-10 h-10 text-white" />
                </div>
              </div>

              <div className="flex-1 text-center md:text-left">
                <h3 className="heading-sm text-white mb-3">
                  Client-Centric Design Process
                </h3>
                <p className="body-md text-white/70">
                  Our technology isn&apos;t just about innovation — it&apos;s
                  about putting you at the center of every decision. Experience
                  transparent collaboration, real-time updates, and complete
                  control over your project from concept to completion.
                </p>
              </div>

              <div className="flex-shrink-0">
                <motion.a
                  href="#contact"
                  className="inline-flex items-center gap-2 bg-secondary-500 hover:bg-secondary-600 text-white px-8 py-4 rounded-lg font-semibold transition-colors"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Book a VR Tour
                  <span>→</span>
                </motion.a>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
