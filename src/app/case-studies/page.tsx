import type { Metadata } from "next";
import Link from "next/link";
import SafeImage from "@/components/SafeImage";
import {
  Clock,
  MapPin,
  Users,
  TrendingUp,
  CheckCircle,
  ArrowRight,
  Building2,
  Home,
  Briefcase
} from "lucide-react";

export const metadata: Metadata = {
  title: "Case Studies - Success Stories | PristiqBuild Nigeria",
  description:
    "Explore detailed case studies of PristiqBuild's modular construction projects across Nigeria. Real results, real challenges, real solutions.",
};

const caseStudies = [
  {
    id: "breeze-point-estate",
    slug: "breeze-point-estate",
    title: "Breeze Point Estate",
    subtitle: "5-Unit Luxury Terrace Development",
    category: "Residential",
    location: "Kubwa F01, Abuja",
    duration: "9 months",
    size: "5 units - 280 sqm each",
    image: "/breezepoint/breeze1.jpg",
    challenge: "Deliver luxury 4-bedroom terrace homes with modern smart home features and LGS roofing in Kubwa's prestigious F01 district.",
    solution: "Combined traditional blockwork with innovative Light Gauge Steel roofing system, installing 13 precision-fabricated LGS trusses in under 4 days using automated machinery.",
    results: [
      "LGS roofing installed in under 4 days",
      "Anti-rust, termite-resistant technology",
      "Smart home ready infrastructure",
      "Premium finishes with custom cabinetry"
    ],
    stats: [
      { label: "Timeline", value: "9 months", icon: Clock },
      { label: "Units", value: "5", icon: Home },
      { label: "Size", value: "280 sqm", icon: Building2 }
    ],
    description: "Breeze Point Estate showcases smart luxury living in Kubwa's F01 district. With LGS roofing technology, energy-efficient design, and smart home readiness, this project demonstrates PristiqBuild's commitment to innovation and quality.",
    testimonial: {
      quote: "The combination of classic construction with modern LGS roofing technology gives us the best of both worlds, durability and innovation.",
      author: "Estate Developer",
      title: "Breeze Point Developments"
    }
  },
  {
    id: "opulence-heights",
    slug: "opulence-heights",
    title: "Opulence Heights",
    subtitle: "Smart Living Luxury Villa Estate",
    category: "Residential",
    location: "Dawaki, Abuja",
    duration: "18 months",
    size: "18 smart villas",
    image: "/dawaki estate/1.png",
    challenge: "Create a luxury villa estate with full smart home integration, solar power, and sustainable construction on hillside terrain.",
    solution: "Light Gauge Steel frame construction with 48kWh battery storage solar systems, smart home controls, EV charging infrastructure, and premium amenities including clubhouse and pool.",
    results: [
      "50+ year structural steel frame guarantee",
      "48kWh solar battery storage per villa",
      "App-controlled smart home systems",
      "EV charging ready infrastructure"
    ],
    stats: [
      { label: "Timeline", value: "18 months", icon: Clock },
      { label: "Villas", value: "18", icon: Home },
      { label: "Battery", value: "48kWh", icon: TrendingUp }
    ],
    description: "Opulence Heights represents the pinnacle of modern luxury living, combining Light Gauge Steel construction with cutting-edge smart technology, renewable energy, and premium amenities on stunning hillside terrain.",
    testimonial: {
      quote: "Living in Opulence Heights feels like living in the future. The solar system, smart controls, and build quality exceeded all expectations.",
      author: "Villa Owner",
      title: "Opulence Heights Resident"
    }
  },
  {
    id: "maitama-luxury-mansion",
    slug: "maitama-luxury-mansion",
    title: "Maitama Luxury Mansion",
    subtitle: "Premium LGS Roof Replacement",
    category: "Residential",
    location: "Maitama, Abuja",
    duration: "4 days",
    size: "288 sqm roof area",
    image: "/maitama/dji_fly_20250305_140920_676_1741180573389_photo.jpg",
    challenge: "Replace existing roof with precision LGS system in upscale Maitama neighborhood with minimal disruption.",
    solution: "Custom-designed and factory-fabricated 13 LGS trusses with zinc-coated galvanized steel, assembled using precision screw and bolt connections, no welding required.",
    results: [
      "Completed in just 4 days",
      "60% faster than traditional timber",
      "10% cost savings overall",
      "50+ year expected lifespan"
    ],
    stats: [
      { label: "Timeline", value: "4 days", icon: Clock },
      { label: "Roof Area", value: "288 sqm", icon: Building2 },
      { label: "Team Size", value: "6", icon: Users }
    ],
    description: "This Maitama mansion roof replacement showcased the precision and speed of our LGS prefabrication approach. Clean assembly, no welding, and rapid installation made it perfect for the upscale neighborhood.",
    testimonial: {
      quote: "The installation was incredibly fast and clean. No noise, no mess, and the quality is outstanding. Worth every naira.",
      author: "Homeowner",
      title: "Maitama Resident"
    }
  },
  {
    id: "akure-lgs-roofing",
    slug: "akure-lgs-roofing",
    title: "Akure Castle Residence",
    subtitle: "Large-Scale LGS Roofing Project",
    category: "Residential",
    location: "Akure, Ondo State",
    duration: "6 weeks",
    size: "1,080 sqm roof area",
    image: "/osun/osun1.jpg",
    challenge: "Deliver large-scale roofing solution with rapid installation timeline in Ondo State climate.",
    solution: "Deployed comprehensive LGS roofing system with insulated metal roofing, providing excellent thermal performance and weather resistance.",
    results: [
      "Completed in 6 weeks",
      "Superior thermal performance",
      "Weather-resistant construction",
      "Long-term durability guaranteed"
    ],
    stats: [
      { label: "Timeline", value: "6 weeks", icon: Clock },
      { label: "Type", value: "Large-scale", icon: Building2 },
      { label: "Climate", value: "Optimized", icon: TrendingUp }
    ],
    description: "Akure Castle Residence demonstrates LGS technology's advantages for large-scale residential roofing, rapid installation, excellent thermal performance, and long-term durability in varying climate conditions.",
    testimonial: {
      quote: "The LGS roofing system performs exceptionally well in our climate. No maintenance issues, stays cooler, and looks great.",
      author: "Property Owner",
      title: "Akure Resident"
    }
  },
  {
    id: "aso-grove-roofing",
    slug: "aso-grove-roofing",
    title: "Aso Grove Roof Replacement",
    subtitle: "Complete Roof Transformation",
    category: "Residential",
    location: "Abuja FCT",
    duration: "72 hours",
    size: "280 sqm roof area",
    image: "/aso/aso1.JPG",
    challenge: "Complete roof replacement with minimal disruption, remove old timber trusses and install modern LGS system in just 3 days.",
    solution: "Full removal of existing timber system and replacement with G550 galvanized steel trusses, plus advanced polyurethane waterproofing membrane.",
    results: [
      "Completed in just 72 hours",
      "G550 premium galvanized steel",
      "100% waterproofed with polyurethane",
      "Improved thermal performance"
    ],
    stats: [
      { label: "Timeline", value: "72 hours", icon: Clock },
      { label: "Roof Area", value: "280 sqm", icon: Building2 },
      { label: "Steel Grade", value: "G550", icon: TrendingUp }
    ],
    description: "Aso Grove showcases our rapid roof transformation capability, complete removal and replacement with premium G550 steel trusses and advanced waterproofing in just three days.",
    testimonial: {
      quote: "I couldn't believe they completed the entire roof replacement in 3 days. The house is cooler now and I have zero worries about leaks.",
      author: "Homeowner",
      title: "Aso Grove Resident"
    }
  }
];

const categories = ["All", "Residential"];

export default function CaseStudiesPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-primary-600 to-primary-700 text-white py-20">
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `radial-gradient(circle at 2px 2px, rgba(255,255,255,0.3) 1px, transparent 0)`,
              backgroundSize: "40px 40px",
            }}
          />
        </div>

        <div className="relative container-custom">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Case Studies
            </h1>
            <p className="text-xl md:text-2xl text-primary-100 leading-relaxed">
              Real projects. Real results. See how we&apos;ve transformed construction
              timelines and delivered exceptional buildings across Nigeria.
            </p>
          </div>
        </div>
      </section>

      {/* Stats Overview */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-primary-600 mb-2">150+</div>
              <div className="text-steel-600">Projects Completed</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-primary-600 mb-2">12</div>
              <div className="text-steel-600">States Covered</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-primary-600 mb-2">40%</div>
              <div className="text-steel-600">Average Time Savings</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-primary-600 mb-2">98%</div>
              <div className="text-steel-600">Client Satisfaction</div>
            </div>
          </div>
        </div>
      </section>

      {/* Case Studies Grid */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          {caseStudies.map((study, index) => (
            <div
              key={study.id}
              className={`mb-24 last:mb-0 ${
                index % 2 === 0 ? "" : ""
              }`}
            >
              {/* Case Study Card */}
              <div className="bg-white rounded-2xl overflow-hidden shadow-2xl hover:shadow-3xl transition-[color,background-color,border-color,box-shadow]">
                {/* Image */}
                <div className="relative h-96 md:h-[500px] overflow-hidden">
                  <SafeImage
                    src={study.image}
                    alt={study.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

                  {/* Overlay Content */}
                  <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12">
                    <div className="inline-block px-4 py-2 bg-primary-600 text-white rounded-full text-sm font-semibold mb-4">
                      {study.category}
                    </div>
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-3">
                      {study.title}
                    </h2>
                    <p className="text-xl md:text-2xl text-white/90 mb-6">
                      {study.subtitle}
                    </p>
                    <div className="flex flex-wrap gap-6 text-white/80">
                      <div className="flex items-center gap-2">
                        <MapPin className="w-5 h-5" />
                        <span>{study.location}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-5 h-5" />
                        <span>{study.duration}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Building2 className="w-5 h-5" />
                        <span>{study.size}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-8 md:p-12">
                  {/* Stats */}
                  <div className="grid md:grid-cols-3 gap-6 mb-10 pb-10 border-b border-gray-200">
                    {study.stats.map((stat, sIndex) => (
                      <div key={sIndex} className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center flex-shrink-0">
                          <stat.icon className="w-6 h-6 text-primary-600" />
                        </div>
                        <div>
                          <div className="text-2xl font-bold text-steel-900">{stat.value}</div>
                          <div className="text-sm text-steel-600">{stat.label}</div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Challenge & Solution */}
                  <div className="grid md:grid-cols-2 gap-8 mb-10">
                    <div>
                      <h3 className="text-xl font-bold text-steel-900 mb-4">The Challenge</h3>
                      <p className="text-steel-700 leading-relaxed">{study.challenge}</p>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-steel-900 mb-4">Our Solution</h3>
                      <p className="text-steel-700 leading-relaxed">{study.solution}</p>
                    </div>
                  </div>

                  {/* Description */}
                  <div className="mb-10">
                    <p className="text-lg text-steel-700 leading-relaxed">
                      {study.description}
                    </p>
                  </div>

                  {/* Results */}
                  <div className="mb-10">
                    <h3 className="text-xl font-bold text-steel-900 mb-6">Key Results</h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      {study.results.map((result, rIndex) => (
                        <div key={rIndex} className="flex items-start gap-3">
                          <CheckCircle className="w-6 h-6 text-primary-600 flex-shrink-0 mt-1" />
                          <span className="text-steel-700 leading-relaxed">{result}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Testimonial */}
                  <div className="bg-gradient-to-r from-primary-50 to-blue-50 p-8 rounded-xl border-l-4 border-primary-600 mb-8">
                    <p className="text-lg text-steel-800 italic mb-6 leading-relaxed">
                      &quot;{study.testimonial.quote}&quot;
                    </p>
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-primary-600 rounded-full flex items-center justify-center">
                        <Users className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <div className="font-bold text-steel-900">{study.testimonial.author}</div>
                        <div className="text-sm text-steel-600">{study.testimonial.title}</div>
                      </div>
                    </div>
                  </div>

                  {/* View Full Project Button */}
                  <Link
                    href={`/projects/${study.slug}`}
                    className="flex items-center justify-center gap-3 w-full py-4 bg-gradient-to-r from-primary-600 to-primary-700 text-white font-bold rounded-xl hover:from-primary-700 hover:to-primary-800 transition-[color,background-color,border-color,box-shadow]"
                  >
                    View Full Project Details
                    <ArrowRight className="w-5 h-5" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-gradient-to-r from-primary-600 to-primary-700 text-white">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
              Ready to Write Your Success Story?
            </h2>
            <p className="text-xl md:text-2xl text-primary-100 mb-10 leading-relaxed">
              Let&apos;s discuss how we can deliver the same exceptional results for your project.
              Get in touch for a consultation and quote.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link
                href="/contact"
                className="px-10 py-5 bg-white text-primary-600 font-bold rounded-xl hover:bg-gray-50 transition-[color,background-color,border-color,transform] hover:scale-105 shadow-xl inline-flex items-center justify-center gap-3 text-lg"
              >
                <Briefcase className="w-6 h-6" />
                Start Your Project
              </Link>
              <Link
                href="/cost-calculator"
                className="px-10 py-5 bg-primary-800 text-white font-bold rounded-xl hover:bg-primary-900 transition-[color,background-color,border-color,transform] hover:scale-105 border-2 border-primary-400 inline-flex items-center justify-center gap-3 text-lg"
              >
                Get a Quote
                <ArrowRight className="w-6 h-6" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
