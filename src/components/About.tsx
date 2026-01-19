"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  Users,
  Target,
  Award,
  Linkedin,
  Twitter,
  Mail,
  Building2,
  Briefcase,
  GraduationCap,
} from "lucide-react";

const team = [
  {
    name: "Yusuf",
    role: "Chief Executive Officer",
    image: "/founders/ceo.jpg",
    bio: "Visionary leader with extensive experience in construction and business development. Driving PristiqBuild's mission to transform Nigeria's construction industry.",
    expertise: ["Strategic Leadership", "Business Development", "Innovation"],
    social: {
      linkedin: "#",
      twitter: "#",
      email: "yusuf@pristiqbuild.com",
    },
  },
  {
    name: "Najib",
    role: "Chief Technology Officer",
    image: "/founders/cto.png",
    bio: "Technology expert specializing in construction innovation, VR/AR integration, and digital transformation in the building sector.",
    expertise: ["Technology Strategy", "VR/AR Development", "Digital Systems"],
    social: {
      linkedin: "#",
      twitter: "#",
      email: "najib@pristiqbuild.com",
    },
  },
  {
    name: "Abdulaziz",
    role: "Chief Operating Officer",
    image: "/founders/coo.jpg",
    bio: "Operations specialist ensuring seamless project delivery and maintaining PristiqBuild's commitment to quality and efficiency.",
    expertise: ["Operations Management", "Quality Control", "Project Delivery"],
    social: {
      linkedin: "#",
      twitter: "#",
      email: "abdulaziz@pristiqbuild.com",
    },
  },
];

const stats = [
  { value: "100+", label: "Projects Completed" },
  { value: "50+", label: "Happy Clients" },
  { value: "15+", label: "Team Members" },
  { value: "5+", label: "Years Experience" },
];

const values = [
  {
    icon: Target,
    title: "Our Mission",
    description:
      "To revolutionize Nigeria's construction industry through innovative modular solutions that deliver faster, more affordable, and sustainable buildings.",
  },
  {
    icon: Award,
    title: "Our Vision",
    description:
      "To become Africa's leading modular construction company, setting the standard for quality, innovation, and customer satisfaction.",
  },
];

export default function About() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  return (
    <section
      id="about"
      ref={containerRef}
      className="section-padding relative bg-steel-50 overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-full h-96 bg-linear-to-b from-white to-transparent" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary-100 rounded-full blur-3xl opacity-30" />

      <div className="container-custom relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="eyebrow inline-block mb-4"
          >
            About Us
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="heading-lg text-steel-900 mb-6"
          >
            Building <span className="text-gradient">Outside the Box</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="body-lg text-steel-600"
          >
            PristiqBuild is Nigeria&apos;s leading modular construction
            innovator, combining cutting-edge technology with sustainable
            practices to transform how buildings are made.
          </motion.p>
        </div>

        {/* Mission & Vision */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="grid md:grid-cols-2 gap-8 mb-20"
        >
          {values.map((value, index) => (
            <div
              key={value.title}
              className="bg-white rounded-2xl p-8 shadow-lg shadow-steel-200/50 border border-steel-100"
            >
              <div className="flex items-start gap-5">
                <div className="w-14 h-14 rounded-xl bg-linear-to-br from-primary-600 to-primary-700 flex items-center justify-center shrink-0">
                  <value.icon className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h3 className="heading-sm text-steel-900 mb-3">
                    {value.title}
                  </h3>
                  <p className="body-md text-steel-600">{value.description}</p>
                </div>
              </div>
            </div>
          ))}
        </motion.div>

        {/* Company Story */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="bg-linear-to-br from-primary-700 via-primary-800 to-primary-900 rounded-3xl p-8 md:p-12 mb-20 relative overflow-hidden"
        >
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

          <div className="relative z-10 grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="heading-md text-white mb-6">Our Story</h3>
              <div className="space-y-4 text-white/80 body-md">
                <p>
                  Founded with a vision to transform Nigeria&apos;s construction
                  landscape, PristiqBuild emerged from a recognition of the
                  immense housing deficit facing our nation — a challenge
                  requiring innovative solutions.
                </p>
                <p>
                  Our founders, each bringing unique expertise in technology,
                  operations, and business development, united with a shared
                  passion: to build outside the box and deliver construction
                  solutions that are faster, more affordable, and sustainable.
                </p>
                <p>
                  Today, PristiqBuild stands at the forefront of modular
                  construction innovation in Nigeria, utilizing light steel
                  gauge framing, VR/AR technology, and advanced digital
                  platforms to redefine what&apos;s possible in construction.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.4, delay: 0.6 + index * 0.1 }}
                  className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center border border-white/10"
                >
                  <div className="text-3xl md:text-4xl font-display font-bold text-white mb-1">
                    {stat.value}
                  </div>
                  <div className="text-sm text-white/70">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Team Section */}
        <div className="mb-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-2 bg-primary-50 rounded-full px-5 py-2 mb-4">
              <Users className="w-4 h-4 text-primary-600" />
              <span className="text-sm font-medium text-primary-700">
                Leadership Team
              </span>
            </div>
            <h3 className="heading-md text-steel-900">Meet Our Founders</h3>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 40 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  duration: 0.5,
                  delay: 0.6 + index * 0.15,
                }}
                className="group"
              >
                <div className="bg-white rounded-2xl overflow-hidden shadow-lg shadow-steel-200/50 border border-steel-100 transition-all duration-500 hover:shadow-xl hover:border-primary-200">
                  {/* Avatar Image */}
                  <div className="relative h-96 bg-steel-100 overflow-hidden">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-110"
                    />

                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-linear-to-t from-steel-900/80 via-transparent to-transparent" />

                    {/* Role Badge */}
                    <div className="absolute bottom-4 left-4 right-4">
                      <span className="text-sm font-medium text-white/90">
                        {member.role}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <h4 className="font-display font-bold text-xl text-steel-900 mb-2">
                      {member.name}
                    </h4>
                    <p className="text-steel-600 text-sm mb-4">{member.bio}</p>

                    {/* Expertise */}
                    <div className="flex flex-wrap gap-2 mb-6">
                      {member.expertise.map((skill, i) => (
                        <span
                          key={i}
                          className="text-xs bg-primary-50 text-primary-700 px-3 py-1 rounded-full"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>

                    {/* Social Links */}
                    <div className="flex items-center gap-3 pt-4 border-t border-steel-100">
                      <a
                        href={member.social.linkedin}
                        className="w-9 h-9 rounded-lg bg-steel-100 flex items-center justify-center text-steel-500 hover:bg-primary-600 hover:text-white transition-colors"
                        aria-label={`${member.name}'s LinkedIn`}
                      >
                        <Linkedin className="w-4 h-4" />
                      </a>
                      <a
                        href={member.social.twitter}
                        className="w-9 h-9 rounded-lg bg-steel-100 flex items-center justify-center text-steel-500 hover:bg-primary-600 hover:text-white transition-colors"
                        aria-label={`${member.name}'s Twitter`}
                      >
                        <Twitter className="w-4 h-4" />
                      </a>
                      <a
                        href={`mailto:${member.social.email}`}
                        className="w-9 h-9 rounded-lg bg-steel-100 flex items-center justify-center text-steel-500 hover:bg-primary-600 hover:text-white transition-colors"
                        aria-label={`Email ${member.name}`}
                      >
                        <Mail className="w-4 h-4" />
                      </a>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Awards & Recognition Placeholder */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 1 }}
          className="text-center"
        >
          <div className="bg-white rounded-2xl p-8 shadow-lg shadow-steel-200/50 border border-steel-100">
            <h4 className="heading-sm text-steel-900 mb-4">
              Awards & Certifications
            </h4>
            <p className="text-steel-600 mb-6">
              Recognized for excellence in modular construction and sustainable
              building practices.
            </p>
            <div className="flex flex-wrap justify-center gap-8 items-center">
              {[
                "ISO 9001 Certified",
                "Green Building Council",
                "Construction Excellence Award",
              ].map((award, i) => (
                <div key={i} className="flex items-center gap-2 text-steel-500">
                  <Award className="w-5 h-5 text-secondary-500" />
                  <span className="font-medium">{award}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
