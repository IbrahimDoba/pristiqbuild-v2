"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap/config";
import Image from "next/image";
import Link from "next/link";
import {
  Target,
  Eye,
  Award,
  Users,
  TrendingUp,
  CheckCircle,
  ArrowRight,
  Building2,
  Zap,
  Shield,
} from "lucide-react";

const stats = [
  { value: "100+", label: "Projects Completed", icon: Building2 },
  { value: "50M+", label: "Square Meters Built", icon: TrendingUp },
  { value: "98%", label: "Client Satisfaction", icon: Award },
  { value: "15+", label: "Years Experience", icon: Users },
];

const values = [
  {
    icon: Target,
    title: "Precision Engineering",
    description:
      "Every component is precision-manufactured in our facility, ensuring perfect fit and structural integrity on-site.",
  },
  {
    icon: Zap,
    title: "Speed & Efficiency",
    description:
      "Our modular approach reduces construction time by 50-60%, getting you into your building faster.",
  },
  {
    icon: Shield,
    title: "Quality Assurance",
    description:
      "Rigorous quality control at every stage, from factory to final installation, guarantees excellence.",
  },
  {
    icon: Eye,
    title: "Innovation First",
    description:
      "Leveraging AR/VR technology and smart building systems to deliver cutting-edge construction solutions.",
  },
];

const timeline = [
  {
    year: "2010",
    title: "Foundation",
    description:
      "PristiqBuild was founded with a vision to revolutionize Nigeria's construction industry through modular technology.",
  },
  {
    year: "2015",
    title: "First Major Project",
    description:
      "Completed our first large-scale residential development, showcasing the speed and quality of LGS construction.",
  },
  {
    year: "2018",
    title: "Technology Integration",
    description:
      "Introduced AR/VR solutions for client visualization and became pioneers in smart building integration.",
  },
  {
    year: "2020",
    title: "Expansion",
    description:
      "Expanded operations across Nigeria, establishing ourselves as leaders in modular construction.",
  },
  {
    year: "2024",
    title: "Industry Leader",
    description:
      "Now recognized as Nigeria's premier modular construction company, setting new standards for quality and innovation.",
  },
];

const certifications = [
  "ISO 9001:2015 Quality Management",
  "ISO 14001:2015 Environmental Management",
  "OHSAS 18001 Health & Safety",
  "Nigerian Institute of Building (NIOB)",
  "Council for the Regulation of Engineering (COREN)",
];

export default function AboutPage() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const sections = gsap.utils.toArray<HTMLElement>(".fade-in-section");
      sections.forEach((section) => {
        gsap.from(section, {
          opacity: 0,
          y: 60,
          duration: 1,
          scrollTrigger: {
            trigger: section,
            start: "top 85%",
            end: "top 50%",
            scrub: 1,
          },
        });
      });
    },
    { scope: containerRef }
  );

  return (
    <div ref={containerRef} className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-primary-900 via-primary-800 to-primary-700">
        <div className="absolute inset-0 opacity-10">
          <div className="grid-pattern absolute inset-0" />
        </div>

        <div className="container-custom relative z-10 py-32 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="heading-xl text-white mb-6">
              Building Nigeria&apos;s Future,
              <br />
              <span className="text-secondary-400">One Module at a Time</span>
            </h1>
            <p className="body-lg text-white/90 max-w-3xl mx-auto mb-8">
              We&apos;re not just constructing buildings—we&apos;re transforming
              Nigeria&apos;s construction industry with precision engineering,
              cutting-edge technology, and unwavering commitment to quality.
            </p>
          </motion.div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent" />
      </section>

      {/* Stats Section */}
      <section className="section-padding bg-white fade-in-section">
        <div className="container-custom">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary-50 text-primary-700 mb-4">
                  <stat.icon size={32} />
                </div>
                <div className="heading-lg text-primary-700 mb-2">
                  {stat.value}
                </div>
                <div className="text-steel-600">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="section-padding bg-steel-50 fade-in-section">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="eyebrow mb-4 block">Our Story</span>
              <h2 className="heading-lg text-steel-900 mb-6">
                Pioneering Modular Construction in Nigeria
              </h2>
              <div className="space-y-4 text-steel-700">
                <p>
                  PristiqBuild was born from a simple but powerful vision: to
                  transform how Nigeria builds. We saw an industry stuck in
                  traditional methods, plagued by delays, cost overruns, and
                  quality issues. We knew there had to be a better way.
                </p>
                <p>
                  By embracing Light Steel Gauge (LGS) technology and modular
                  construction methods, we&apos;ve revolutionized the building
                  process. Our precision-engineered components are manufactured
                  in controlled factory conditions, ensuring consistent quality
                  and eliminating on-site waste.
                </p>
                <p>
                  Today, we&apos;re proud to be Nigeria&apos;s leading modular
                  construction company, having delivered over 100 projects that
                  stand as testaments to the power of innovation, precision, and
                  unwavering commitment to excellence.
                </p>
              </div>
            </div>

            <div className="relative">
              <div className="relative h-[500px] rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src="/LGS/construction.jpg"
                  alt="PristiqBuild Construction Site"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 w-48 h-48 bg-secondary-500 rounded-2xl -z-10" />
              <div className="absolute -top-6 -right-6 w-48 h-48 bg-primary-600 rounded-2xl -z-10" />
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="section-padding bg-white fade-in-section">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Mission */}
            <div className="bg-gradient-to-br from-primary-700 to-primary-900 rounded-2xl p-12 text-white">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/20 mb-6">
                <Target size={32} />
              </div>
              <h3 className="heading-md mb-6">Our Mission</h3>
              <p className="body-lg text-white/90">
                To deliver world-class modular construction solutions that
                combine precision engineering, sustainability, and cutting-edge
                technology, transforming how Nigeria builds for generations to
                come.
              </p>
            </div>

            {/* Vision */}
            <div className="bg-gradient-to-br from-secondary-600 to-secondary-700 rounded-2xl p-12 text-white">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/20 mb-6">
                <Eye size={32} />
              </div>
              <h3 className="heading-md mb-6">Our Vision</h3>
              <p className="body-lg text-white/90">
                To be Africa&apos;s most trusted and innovative construction
                company, setting new standards for quality, speed, and
                sustainability while making modern, affordable housing accessible
                to all Nigerians.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="section-padding bg-steel-50 fade-in-section">
        <div className="container-custom">
          <div className="text-center mb-16">
            <span className="eyebrow mb-4 block">Core Values</span>
            <h2 className="heading-lg text-steel-900 mb-6">
              The Principles That Drive Us
            </h2>
            <p className="body-lg text-steel-600 max-w-2xl mx-auto">
              Our values aren&apos;t just words on a wall—they&apos;re the
              foundation of everything we do.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-lg bg-primary-50 text-primary-700 mb-4">
                  <value.icon size={28} />
                </div>
                <h3 className="heading-sm text-steel-900 mb-3">{value.title}</h3>
                <p className="text-steel-600">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="section-padding bg-white fade-in-section">
        <div className="container-custom">
          <div className="text-center mb-16">
            <span className="eyebrow mb-4 block">Our Journey</span>
            <h2 className="heading-lg text-steel-900 mb-6">
              Milestones of Excellence
            </h2>
          </div>

          <div className="max-w-4xl mx-auto">
            {timeline.map((item, index) => (
              <motion.div
                key={item.year}
                initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="relative pl-8 pb-12 border-l-4 border-primary-200 last:pb-0"
              >
                <div className="absolute -left-3 top-0 w-6 h-6 rounded-full bg-primary-600 border-4 border-white shadow-lg" />
                <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow">
                  <div className="text-2xl font-bold text-primary-700 mb-2">
                    {item.year}
                  </div>
                  <h3 className="heading-sm text-steel-900 mb-2">
                    {item.title}
                  </h3>
                  <p className="text-steel-600">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="section-padding bg-primary-900 text-white fade-in-section">
        <div className="container-custom">
          <div className="text-center mb-12">
            <span className="eyebrow mb-4 block text-secondary-400">
              Certifications & Accreditations
            </span>
            <h2 className="heading-lg mb-6">
              Recognized for Excellence
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {certifications.map((cert, index) => (
              <motion.div
                key={cert}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-lg p-4"
              >
                <CheckCircle className="text-secondary-400 flex-shrink-0" size={24} />
                <span className="text-white/90">{cert}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-white fade-in-section">
        <div className="container-custom">
          <div className="bg-gradient-to-r from-primary-700 to-primary-900 rounded-3xl p-12 md:p-16 text-center text-white">
            <h2 className="heading-lg mb-6">
              Ready to Build Your Future with Us?
            </h2>
            <p className="body-lg text-white/90 mb-8 max-w-2xl mx-auto">
              Join the growing number of satisfied clients who&apos;ve
              experienced the PristiqBuild difference. Let&apos;s turn your
              vision into reality.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/#contact"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-primary-700 rounded-lg font-semibold hover:bg-steel-50 transition-colors"
              >
                Get Started
                <ArrowRight size={20} />
              </Link>
              <Link
                href="/projects"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/10 backdrop-blur-sm text-white rounded-lg font-semibold hover:bg-white/20 transition-colors"
              >
                View Our Projects
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
