"use client";

import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import {
  ProjectHero,
  ProjectGallery,
  ProjectStats,
  ProjectFeatures,
  ProjectContent,
  ProjectCTA,
} from "@/components/project-ui";
import {
  Clock,
  Home,
  Users,
  Zap,
  Shield,
  Sun,
  Droplets,
  Car,
  Lightbulb,
  Building2,
} from "lucide-react";

const stats = [
  {
    icon: Home,
    value: "5 Units",
    label: "Luxury Terraces",
    sublabel: "4 bedrooms each",
  },
  {
    icon: Building2,
    value: "280 sqm",
    label: "Per Unit",
    sublabel: "Living space",
  },
  {
    icon: Clock,
    value: "9 Months",
    label: "Build Timeline",
    sublabel: "From commencement",
  },
  {
    icon: Users,
    value: "12 Person",
    label: "Core Build Team",
    sublabel: "Plus LGS specialists",
  },
];

const features = [
  {
    icon: Sun,
    title: "Impressive Natural Lighting",
    description:
      "Large windows throughout maximize natural light, reducing energy costs while creating bright, welcoming living spaces that connect indoor and outdoor environments.",
  },
  {
    icon: Lightbulb,
    title: "Smart Home Ready",
    description:
      "Pre wired infrastructure for smart home systems including automated lighting, climate control, and security integration, ready for modern connected living.",
  },
  {
    icon: Shield,
    title: "LGS Roofing System",
    description:
      "Among the first luxury builds in F01 to implement full Light Gauge Steel roofing, offering 60% faster installation, zero rot risk, and lifetime structural integrity.",
  },
  {
    icon: Zap,
    title: "Energy Efficient Design",
    description:
      "LED efficient lighting throughout, smart HVAC readiness, and thoughtful orientation reduce energy consumption while maintaining optimal comfort.",
  },
  {
    icon: Droplets,
    title: "Integrated Systems",
    description:
      "Professional drainage, plumbing, and power backup systems built in from foundation, ensuring reliable operation and easy maintenance for years to come.",
  },
  {
    icon: Car,
    title: "Dedicated Parking",
    description:
      "Each unit includes private 2 car covered parking plus landscaped driveways and estate frontage, providing convenience and curb appeal.",
  },
];

const contentSections = [
  {
    title: "Smart Living. Elegant Design. Thoughtful Craftsmanship.",
    content:
      "In the rising heart of Kubwa's prestigious F01 district, Breeze Point Estate emerges as a striking symbol of smart luxury living. Developed by Pristiq Build, this exclusive enclave features five exquisitely built 4 bedroom terrace homes, combining timeless architectural elegance with forward thinking construction technology. With construction led entirely by our team, the project embodies everything Pristiq Build stands for: durability, energy efficiency, structural precision, and modern aesthetics.",
    image: "/breezepoint/breeze1.jpg",
    imageAlt: "Breeze Point Estate construction progress",
    imagePosition: "right" as const,
  },
  {
    title: "Construction System Excellence",
    content:
      "While traditional blockwork forms the main structural shell, we integrated a Light Gauge Steel roofing system to align with our commitment to innovative, efficient construction. The combination brings the best of both worlds: classic masonry robustness and future proof roofing technology. All 13 precision fabricated LGS trusses were installed in under 4 days by our specialized team using automated cutting, drilling, and bolting machinery.",
    image: "/breezepoint/breeze2.jpg",
    imageAlt: "LGS roofing installation at Breeze Point",
    imagePosition: "left" as const,
    highlights: [
      "Foundation to finish construction executed fully in house",
      "13 precision fabricated LGS trusses installed in under 4 days",
      "Anti rust, termite resistant, precision cut steel technology",
      "Smart HVAC readiness and LED efficient lighting throughout",
    ],
  },
  {
    title: "Unit Layout and Design",
    content:
      "Each terrace home offers a generous 280 square meters of living space, thoughtfully distributed across multiple levels. The ground floor features open plan living and dining, a premium kitchen with custom cabinetry and stone countertops, guest powder room, and guest bedroom. The first floor houses the master suite with walk in closet and en suite, plus two additional family bedrooms. Private garden space and dedicated parking complete each residence.",
    image: "/breezepoint/breeze3.jpg",
    imageAlt: "Interior design concept",
    imagePosition: "right" as const,
  },
];

const galleryImages = [
  {
    src: "/breezepoint/breeze1.jpg",
    alt: "Breeze Point Estate construction progress",
    caption: "Active construction showing structural progress",
  },
  {
    src: "/breezepoint/breeze2.jpg",
    alt: "LGS roofing system installation",
    caption: "Precision steel roofing framework",
  },
  {
    src: "/breezepoint/breeze3.jpg",
    alt: "Building exterior progress",
    caption: "Exterior development progress",
  },
];

const premiumFeatures = [
  {
    title: "Custom Kitchen Cabinetry",
    description: "Stone countertops with modern fixtures and premium finishes",
  },
  {
    title: "Solid Core Interior Doors",
    description: "Sleek contemporary hardware throughout all living spaces",
  },
  {
    title: "LED Lighting Throughout",
    description: "Energy efficient lighting system with smart control readiness",
  },
  {
    title: "Professional Landscaping",
    description: "Beautifully designed driveways and estate frontage",
  },
];

export default function BreezePointProject() {
  return (
    <>
      <Navigation />
      <main id="main-content">
        <ProjectHero
          title="Breeze Point Estate"
          subtitle="Exclusive luxury living in F01 Kubwa featuring five 4 bedroom terrace homes with Light Gauge Steel roofing and smart home infrastructure."
          location="F01 District, Kubwa, Abuja"
          duration="9 Months"
          area="280 sqm per unit"
          status="Under Construction"
          heroImage="/LGS/construction.jpg"
          category="Residential Development"
        />

        <ProjectStats stats={stats} />

        <ProjectContent sections={contentSections} />

        <ProjectFeatures
          title="Premium Features"
          subtitle="Lifestyle Excellence"
          features={features}
        />

        {/* Premium Finishes Section */}
        <section className="py-20 bg-gradient-to-b from-white to-steel-50">
          <div className="container-custom">
            <div className="text-center mb-12">
              <span className="eyebrow inline-block mb-4 text-secondary-600 font-semibold tracking-wider uppercase text-sm">
                Quality Details
              </span>
              <h2 className="heading-lg text-steel-900">Premium Finishes</h2>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {premiumFeatures.map((feature, index) => (
                <div
                  key={index}
                  className="p-6 bg-white rounded-2xl border border-steel-100 shadow-lg hover:shadow-xl hover:border-primary-200 transition-all duration-300"
                >
                  <h3 className="font-display font-bold text-steel-900 text-lg mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-steel-600">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Why LGS Section */}
        <section className="section-padding bg-primary-900 text-white">
          <div className="container-custom">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <span className="inline-block mb-4 text-secondary-400 font-semibold tracking-wider uppercase text-sm">
                  Innovation First
                </span>
                <h2 className="heading-lg text-white mb-6">
                  Why LGS for Roofing?
                </h2>
                <p className="text-xl text-white/80 leading-relaxed mb-8">
                  Breeze Point Estate is among the first luxury builds in F01 to
                  implement a full Light Gauge Steel roofing system, setting a
                  new standard for residential construction in the area.
                </p>
                <ul className="space-y-4">
                  {[
                    "Over 60% faster installation than traditional timber",
                    "10% cost savings on roofing materials and labor",
                    "Zero risk of rot, sagging, or termites",
                    "Clean finish and long term structural integrity",
                  ].map((item, index) => (
                    <li key={index} className="flex items-center gap-3">
                      <span className="w-6 h-6 rounded-full bg-secondary-500 flex items-center justify-center flex-shrink-0">
                        <svg
                          className="w-4 h-4 text-white"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      </span>
                      <span className="text-white/90">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="relative">
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
                  <h3 className="text-2xl font-display font-bold mb-6">
                    Technical Specifications
                  </h3>
                  <div className="space-y-4">
                    <div className="flex justify-between border-b border-white/20 pb-3">
                      <span className="text-white/70">Truss Profile</span>
                      <span className="font-semibold">
                        Zinc coated 10cm profiles
                      </span>
                    </div>
                    <div className="flex justify-between border-b border-white/20 pb-3">
                      <span className="text-white/70">Installation Team</span>
                      <span className="font-semibold">5 person crew</span>
                    </div>
                    <div className="flex justify-between border-b border-white/20 pb-3">
                      <span className="text-white/70">Installation Time</span>
                      <span className="font-semibold">4 days</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/70">Equipment Used</span>
                      <span className="font-semibold">
                        Automated tools
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <ProjectGallery images={galleryImages} title="Construction Progress" />

        {/* Investment Info */}
        <section className="py-20 bg-white">
          <div className="container-custom">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <span className="eyebrow inline-block mb-4 text-secondary-600 font-semibold tracking-wider uppercase text-sm">
                  Investment Opportunity
                </span>
                <h2 className="heading-lg text-steel-900">Project Status</h2>
              </div>
              <div className="grid md:grid-cols-3 gap-6 mb-12">
                <div className="text-center p-6 bg-steel-50 rounded-2xl">
                  <div className="text-3xl font-display font-bold text-primary-700 mb-2">
                    Under Construction
                  </div>
                  <div className="text-steel-600">Current Status</div>
                </div>
                <div className="text-center p-6 bg-steel-50 rounded-2xl">
                  <div className="text-3xl font-display font-bold text-primary-700 mb-2">
                    3 Units
                  </div>
                  <div className="text-steel-600">Remaining Available</div>
                </div>
                <div className="text-center p-6 bg-gradient-to-br from-secondary-500 to-secondary-600 rounded-2xl text-white">
                  <div className="text-3xl font-display font-bold mb-2">
                    Flexible
                  </div>
                  <div className="text-white/90">Payment Options</div>
                </div>
              </div>
              <div className="text-center">
                <p className="text-lg text-steel-600 leading-relaxed">
                  Payment options include full payment, installments, and
                  mortgage support. Contact us for detailed pricing and
                  availability information.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CEO Quote */}
        <section className="py-20 bg-gradient-to-b from-steel-50 to-white">
          <div className="container-custom">
            <div className="max-w-4xl mx-auto text-center">
              <div className="w-20 h-1 bg-gradient-to-r from-secondary-500 to-secondary-600 mx-auto mb-8" />
              <blockquote className="text-2xl md:text-3xl font-display text-steel-800 leading-relaxed mb-8">
                &ldquo;We are excited to bring Breeze Point Estate to life in
                Kubwa's most sought after district. Every detail from foundation
                to final finish reflects our dedication to building homes that
                last, function smartly, and stand out in value and
                beauty.&rdquo;
              </blockquote>
              <cite className="text-lg text-steel-600 not-italic">
                <span className="font-semibold text-steel-900">Yusuf Doba</span>
                <span className="mx-2">|</span>
                CEO, Pristiq Build
              </cite>
            </div>
          </div>
        </section>

        <ProjectCTA
          title="Interested in Breeze Point Estate?"
          description="Secure your unit in this exclusive development. Contact us today to schedule a site visit, receive detailed pricing, or learn more about payment options."
        />
      </main>
      <Footer />
    </>
  );
}
