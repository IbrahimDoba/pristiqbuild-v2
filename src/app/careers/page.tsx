import type { Metadata } from "next";
import Link from "next/link";
import SafeImage from "@/components/SafeImage";
import {
  Users,
  Zap,
  TrendingUp,
  Heart,
  Award,
  Globe,
  Mail,
  Briefcase,
  GraduationCap,
  Target
} from "lucide-react";

export const metadata: Metadata = {
  title: "Careers - Join Our Team | PristiqBuild Nigeria",
  description:
    "Join Nigeria's leading modular construction company. Explore career opportunities at PristiqBuild and help us build the future of construction.",
};

const values = [
  {
    icon: Zap,
    title: "Innovation First",
    description: "We embrace new technologies and methods to revolutionize Nigerian construction."
  },
  {
    icon: Users,
    title: "Team Excellence",
    description: "We believe in collaborative success and investing in our people's growth."
  },
  {
    icon: Target,
    title: "Quality Obsessed",
    description: "We never compromise on quality, every project reflects our commitment to excellence."
  },
  {
    icon: Heart,
    title: "Customer-Centric",
    description: "Our clients' success is our success. We go above and beyond to deliver value."
  },
  {
    icon: Globe,
    title: "Sustainability",
    description: "We're committed to building Nigeria's future responsibly and sustainably."
  },
  {
    icon: Award,
    title: "Continuous Learning",
    description: "We invest in training and development to keep our team at the cutting edge."
  }
];

const benefits = [
  "Competitive salary packages",
  "Health insurance coverage",
  "Professional development & training",
  "Career advancement opportunities",
  "Work on innovative projects",
  "Collaborative team environment",
  "Performance bonuses",
  "Flexible work arrangements"
];

const departments = [
  {
    name: "Engineering & Design",
    description: "Structural engineers, architects, and design specialists creating innovative modular solutions.",
    icon: TrendingUp
  },
  {
    name: "Manufacturing & Production",
    description: "Skilled technicians and production managers ensuring quality fabrication.",
    icon: Briefcase
  },
  {
    name: "Project Management",
    description: "Leaders who coordinate projects from concept to completion.",
    icon: Target
  },
  {
    name: "Sales & Business Development",
    description: "Professionals who connect clients with our innovative construction solutions.",
    icon: Users
  },
  {
    name: "Technology & Innovation",
    description: "AR/VR specialists, IoT engineers, and smart building experts.",
    icon: Zap
  },
  {
    name: "Support Services",
    description: "Finance, HR, logistics, and administrative professionals keeping us running smoothly.",
    icon: Globe
  }
];

export default function CareersPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative h-[60vh] min-h-[500px] bg-steel-900">
        <SafeImage
          src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=2000&q=80"
          alt="Team collaboration and innovation"
          fill
          className="object-cover opacity-30"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-steel-900/95 to-primary-900/70" />

        <div className="relative h-full flex items-center">
          <div className="container-custom">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary-600/20 backdrop-blur-sm border border-primary-400/30 rounded-full text-primary-300 mb-6">
                <Users className="w-4 h-4" />
                <span className="text-sm font-semibold">Build Your Career With Us</span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
                Careers at PristiqBuild
              </h1>
              <p className="text-xl md:text-2xl text-steel-200 leading-relaxed">
                Join a team that&apos;s transforming Nigeria&apos;s construction industry with
                innovation, excellence, and cutting-edge technology.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Current Status */}
      <section className="section-padding bg-gradient-to-b from-primary-50 to-white">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 border-2 border-primary-200">
              <div className="flex items-start gap-6">
                <div className="w-16 h-16 bg-primary-100 rounded-2xl flex items-center justify-center flex-shrink-0">
                  <Briefcase className="w-8 h-8 text-primary-600" />
                </div>
                <div>
                  <h2 className="text-2xl md:text-3xl font-bold text-steel-900 mb-4">
                    Current Hiring Status
                  </h2>
                  <p className="text-lg text-steel-700 leading-relaxed mb-6">
                    We&apos;re currently not hiring for specific positions, but we&apos;re always
                    interested in connecting with talented individuals who share our passion
                    for innovation in construction. We regularly review applications and
                    reach out when opportunities arise.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <a
                      href="mailto:careers@pristiqbuild.com?subject=Career Interest at PristiqBuild"
                      className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-primary-600 text-white font-bold rounded-xl hover:bg-primary-700 transition-colors"
                    >
                      <Mail className="w-5 h-5" />
                      Express Interest
                    </a>
                    <Link
                      href="/contact"
                      className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gray-100 text-steel-900 font-bold rounded-xl hover:bg-gray-200 transition-colors"
                    >
                      Contact Us
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Join Us */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-steel-900 mb-4">
              Why Work With Us?
            </h2>
            <p className="text-xl text-steel-600">
              Be part of a team that&apos;s building the future of construction in Nigeria
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {values.map((value, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-gray-50 to-white p-8 rounded-xl border border-gray-200 hover:border-primary-300 hover:shadow-lg transition-[color,background-color,border-color,box-shadow]"
              >
                <div className="w-14 h-14 bg-primary-600 rounded-xl flex items-center justify-center mb-6">
                  <value.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-bold text-steel-900 mb-3">
                  {value.title}
                </h3>
                <p className="text-steel-600 leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="section-padding bg-gradient-to-b from-gray-50 to-white">
        <div className="container-custom">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-steel-900 mb-4">
                Benefits & Perks
              </h2>
              <p className="text-xl text-steel-600">
                We invest in our team members&apos; success and well-being
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {benefits.map((benefit, index) => (
                <div
                  key={index}
                  className="flex items-center gap-4 p-6 bg-white rounded-xl border border-gray-200"
                >
                  <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Award className="w-5 h-5 text-primary-600" />
                  </div>
                  <span className="text-lg text-steel-700">{benefit}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Departments */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-steel-900 mb-4">
              Departments & Teams
            </h2>
            <p className="text-xl text-steel-600">
              Explore the different areas where you could make an impact
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {departments.map((dept, index) => (
              <div
                key={index}
                className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow border border-gray-100"
              >
                <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center mb-6">
                  <dept.icon className="w-6 h-6 text-primary-600" />
                </div>
                <h3 className="text-xl font-bold text-steel-900 mb-3">
                  {dept.name}
                </h3>
                <p className="text-steel-600 leading-relaxed">
                  {dept.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Life at PristiqBuild */}
      <section className="section-padding bg-gradient-to-b from-gray-50 to-white">
        <div className="container-custom">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-steel-900 mb-6">
                  Life at PristiqBuild
                </h2>
                <div className="space-y-6 text-lg text-steel-700 leading-relaxed">
                  <p>
                    At PristiqBuild, you&apos;ll work with Nigeria&apos;s brightest minds in construction
                    technology. We&apos;re not just building structures, we&apos;re pioneering new ways
                    to deliver quality, speed, and sustainability.
                  </p>
                  <p>
                    Our culture values innovation, collaboration, and continuous improvement.
                    Whether you&apos;re fresh from university or an experienced professional, you&apos;ll
                    find opportunities to grow, learn, and make a real impact.
                  </p>
                  <p>
                    From our state-of-the-art manufacturing facility to cutting-edge AR/VR labs,
                    you&apos;ll have access to tools and resources that empower you to do your best work.
                  </p>
                </div>

                <div className="mt-8 flex flex-wrap gap-4">
                  <div className="px-6 py-3 bg-primary-50 rounded-xl border border-primary-100">
                    <div className="text-2xl font-bold text-primary-600">150+</div>
                    <div className="text-sm text-steel-600">Projects Completed</div>
                  </div>
                  <div className="px-6 py-3 bg-primary-50 rounded-xl border border-primary-100">
                    <div className="text-2xl font-bold text-primary-600">12</div>
                    <div className="text-sm text-steel-600">States Covered</div>
                  </div>
                  <div className="px-6 py-3 bg-primary-50 rounded-xl border border-primary-100">
                    <div className="text-2xl font-bold text-primary-600">98%</div>
                    <div className="text-sm text-steel-600">Client Satisfaction</div>
                  </div>
                </div>
              </div>

              <div className="relative">
                <div className="relative h-[500px] rounded-2xl overflow-hidden shadow-2xl">
                  <SafeImage
                    src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80"
                    alt="Team collaboration at PristiqBuild"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="absolute -bottom-6 -left-6 bg-primary-600 text-white p-6 rounded-xl shadow-xl max-w-xs">
                  <GraduationCap className="w-10 h-10 mb-3" />
                  <div className="text-2xl font-bold mb-2">Continuous Learning</div>
                  <div className="text-sm text-primary-100">
                    Regular training programs and skill development opportunities
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-gradient-to-r from-primary-600 to-primary-700 text-white">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
              Ready to Build Your Future With Us?
            </h2>
            <p className="text-xl md:text-2xl text-primary-100 mb-10 leading-relaxed">
              Even if we&apos;re not actively hiring right now, we&apos;d love to hear from you.
              Send us your CV and let&apos;s stay connected for future opportunities.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <a
                href="mailto:careers@pristiqbuild.com?subject=Career Opportunity at PristiqBuild"
                className="px-10 py-5 bg-white text-primary-600 font-bold rounded-xl hover:bg-gray-50 transition-[color,background-color,border-color,transform] hover:scale-105 shadow-xl inline-flex items-center justify-center gap-3 text-lg"
              >
                <Mail className="w-6 h-6" />
                Send Your CV
              </a>
              <Link
                href="/contact"
                className="px-10 py-5 bg-primary-800 text-white font-bold rounded-xl hover:bg-primary-900 transition-[color,background-color,border-color,transform] hover:scale-105 border-2 border-primary-400 inline-flex items-center justify-center gap-3 text-lg"
              >
                Learn More About Us
              </Link>
            </div>

            <div className="mt-12 pt-12 border-t border-primary-400/30">
              <p className="text-primary-100 text-lg">
                <strong>Email us at:</strong>{" "}
                <a
                  href="mailto:careers@pristiqbuild.com"
                  className="underline hover:text-white transition-colors"
                >
                  careers@pristiqbuild.com
                </a>
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
