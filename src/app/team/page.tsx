"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap/config";
import Image from "next/image";
import Link from "next/link";
import {
  Linkedin,
  Mail,
  Award,
  Users,
  Target,
  TrendingUp,
} from "lucide-react";

const leadership = [
  {
    name: "Engr. Ibrahim Abdullahi",
    role: "Chief Executive Officer",
    image: "/founders/ceo.jpg",
    bio: "With over 15 years of experience in construction and engineering, Ibrahim leads PristiqBuild's vision of transforming Nigeria's construction landscape through modular technology and innovation.",
    expertise: [
      "Strategic Leadership",
      "Modular Construction",
      "Business Development",
    ],
    linkedin: "#",
    email: "ibrahim@pristiqbuild.com",
  },
  {
    name: "Arc. Fatima Yusuf",
    role: "Chief Operating Officer",
    image: "/founders/coo.jpg",
    bio: "Fatima brings exceptional operational excellence and architectural expertise, ensuring every project meets the highest standards of quality and precision.",
    expertise: [
      "Operations Management",
      "Architecture & Design",
      "Quality Assurance",
    ],
    linkedin: "#",
    email: "fatima@pristiqbuild.com",
  },
  {
    name: "Engr. Michael Okonkwo",
    role: "Chief Technology Officer",
    image: "/founders/cto.png",
    bio: "Michael spearheads our technological innovation, integrating AR/VR solutions, smart building systems, and cutting-edge construction technology into every project.",
    expertise: [
      "Technology Innovation",
      "AR/VR Solutions",
      "Smart Building Systems",
    ],
    linkedin: "#",
    email: "michael@pristiqbuild.com",
  },
];

const departments = [
  {
    icon: Target,
    name: "Project Management",
    description:
      "Expert team ensuring projects are delivered on time, within budget, and to specification.",
    teamSize: "12+ Professionals",
  },
  {
    icon: Users,
    name: "Engineering & Design",
    description:
      "Skilled engineers and architects creating innovative, precision-engineered solutions.",
    teamSize: "18+ Specialists",
  },
  {
    icon: Award,
    name: "Quality Assurance",
    description:
      "Dedicated team maintaining our rigorous quality standards across all projects.",
    teamSize: "8+ Inspectors",
  },
  {
    icon: TrendingUp,
    name: "Innovation & R&D",
    description:
      "Forward-thinking team developing next-generation construction technologies.",
    teamSize: "6+ Researchers",
  },
];

const values = [
  {
    title: "Collaborative Culture",
    description:
      "We believe in the power of teamwork, bringing diverse perspectives together to solve complex challenges.",
  },
  {
    title: "Continuous Learning",
    description:
      "Our team is committed to staying at the forefront of construction technology and industry best practices.",
  },
  {
    title: "Excellence Driven",
    description:
      "We set high standards and empower our team to exceed them, delivering exceptional results for every client.",
  },
  {
    title: "Customer First",
    description:
      "Every decision we make is guided by our commitment to delivering value and satisfaction to our clients.",
  },
];

export default function TeamPage() {
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
      <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-primary-900 via-primary-800 to-primary-700">
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
              Meet the Team Behind
              <br />
              <span className="text-secondary-400">
                Nigeria&apos;s Construction Revolution
              </span>
            </h1>
            <p className="body-lg text-white/90 max-w-3xl mx-auto">
              Our diverse team of engineers, architects, and construction
              professionals share one vision: to transform how Nigeria builds.
            </p>
          </motion.div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent" />
      </section>

      {/* Leadership Team */}
      <section className="section-padding bg-white fade-in-section">
        <div className="container-custom">
          <div className="text-center mb-16">
            <span className="eyebrow mb-4 block">Leadership</span>
            <h2 className="heading-lg text-steel-900 mb-6">
              Visionary Leaders Driving Innovation
            </h2>
            <p className="body-lg text-steel-600 max-w-2xl mx-auto">
              Meet the executive team guiding PristiqBuild&apos;s mission to
              revolutionize Nigeria&apos;s construction industry.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {leadership.map((leader, index) => (
              <motion.div
                key={leader.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group"
              >
                <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300">
                  {/* Image */}
                  <div className="relative h-80 overflow-hidden">
                    <Image
                      src={leader.image}
                      alt={leader.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-steel-900/80 via-steel-900/20 to-transparent" />

                    {/* Social Links */}
                    <div className="absolute bottom-4 left-4 right-4 flex gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                      <a
                        href={leader.linkedin}
                        className="w-10 h-10 rounded-lg bg-white/20 backdrop-blur-sm flex items-center justify-center text-white hover:bg-primary-600 transition-colors"
                        aria-label="LinkedIn"
                      >
                        <Linkedin size={20} />
                      </a>
                      <a
                        href={`mailto:${leader.email}`}
                        className="w-10 h-10 rounded-lg bg-white/20 backdrop-blur-sm flex items-center justify-center text-white hover:bg-primary-600 transition-colors"
                        aria-label="Email"
                      >
                        <Mail size={20} />
                      </a>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <h3 className="heading-sm text-steel-900 mb-1">
                      {leader.name}
                    </h3>
                    <p className="text-primary-700 font-medium mb-4">
                      {leader.role}
                    </p>
                    <p className="text-steel-600 mb-4 text-sm leading-relaxed">
                      {leader.bio}
                    </p>

                    {/* Expertise Tags */}
                    <div className="flex flex-wrap gap-2">
                      {leader.expertise.map((skill) => (
                        <span
                          key={skill}
                          className="px-3 py-1 bg-primary-50 text-primary-700 text-xs font-medium rounded-full"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Departments */}
      <section className="section-padding bg-steel-50 fade-in-section">
        <div className="container-custom">
          <div className="text-center mb-16">
            <span className="eyebrow mb-4 block">Our Departments</span>
            <h2 className="heading-lg text-steel-900 mb-6">
              Excellence Across Every Function
            </h2>
            <p className="body-lg text-steel-600 max-w-2xl mx-auto">
              Specialized teams working in harmony to deliver exceptional
              construction solutions.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {departments.map((dept, index) => (
              <motion.div
                key={dept.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-xl p-8 shadow-md hover:shadow-xl transition-shadow"
              >
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-lg bg-primary-50 text-primary-700 mb-4">
                  <dept.icon size={28} />
                </div>
                <h3 className="heading-sm text-steel-900 mb-2">{dept.name}</h3>
                <p className="text-steel-600 mb-4 text-sm">{dept.description}</p>
                <div className="text-primary-700 font-semibold text-sm">
                  {dept.teamSize}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Values */}
      <section className="section-padding bg-white fade-in-section">
        <div className="container-custom">
          <div className="text-center mb-16">
            <span className="eyebrow mb-4 block">Team Culture</span>
            <h2 className="heading-lg text-steel-900 mb-6">
              What Unites Us
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-gradient-to-br from-primary-50 to-white rounded-xl p-8 border border-primary-100"
              >
                <h3 className="heading-sm text-steel-900 mb-3">{value.title}</h3>
                <p className="text-steel-600">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-primary-900 text-white fade-in-section">
        <div className="container-custom text-center">
          <h2 className="heading-lg mb-6">
            Ready to Join Our Team?
          </h2>
          <p className="body-lg text-white/90 mb-8 max-w-2xl mx-auto">
            We&apos;re always looking for talented individuals who share our
            passion for innovation and excellence in construction.
          </p>
          <Link
            href="/careers"
            className="inline-flex items-center gap-2 px-8 py-4 bg-white text-primary-700 rounded-lg font-semibold hover:bg-steel-50 transition-colors"
          >
            View Open Positions
          </Link>
        </div>
      </section>
    </div>
  );
}
