import type { Metadata } from "next";
import JsonLd from "@/components/seo/JsonLd";
import { serviceSchema, breadcrumbSchema } from "@/lib/seo/schema";
import Link from "next/link";
import SafeImage from "@/components/SafeImage";
import {
  Clock,
  Leaf,
  Shield,
  DollarSign,
  CheckCircle,
  ArrowRight,
  Zap,
  Users,
  TrendingUp
} from "lucide-react";

export const metadata: Metadata = {
  title: "Modular Construction Services | PristiqBuild",
  description:
    "Discover PristiqBuild's modular construction services. Faster, more efficient, and sustainable building solutions using Light Gauge Steel technology in Nigeria.",
};

const benefits = [
  {
    icon: Clock,
    title: "50% Faster Construction",
    description: "Build in weeks, not months. Our modular approach drastically reduces project timelines."
  },
  {
    icon: DollarSign,
    title: "Cost-Effective",
    description: "Save 20-30% on overall construction costs with reduced labor and minimal waste."
  },
  {
    icon: Shield,
    title: "Superior Quality",
    description: "Factory-controlled precision ensures consistent quality and fewer defects."
  },
  {
    icon: Leaf,
    title: "Eco-Friendly",
    description: "Up to 90% less waste and recyclable materials make modular the sustainable choice."
  },
  {
    icon: Zap,
    title: "Energy Efficient",
    description: "Advanced insulation and airtight construction reduce energy consumption by up to 40%."
  },
  {
    icon: Users,
    title: "Minimal Disruption",
    description: "Less on-site activity means quieter, cleaner construction for your community."
  }
];

const process = [
  {
    step: "01",
    title: "Design & Planning",
    description: "Work with our expert team to create custom designs tailored to your needs and site requirements."
  },
  {
    step: "02",
    title: "Factory Manufacturing",
    description: "Precision-built modules are manufactured in our controlled factory environment with rigorous quality checks."
  },
  {
    step: "03",
    title: "Site Preparation",
    description: "While modules are being built, we prepare your foundation and utilities simultaneously."
  },
  {
    step: "04",
    title: "Transportation & Assembly",
    description: "Modules are transported to site and assembled by our expert installation team in days."
  },
  {
    step: "05",
    title: "Finishing & Handover",
    description: "Final connections, interior finishing, and quality inspection before we hand over your completed building."
  }
];

const applications = [
  {
    title: "Residential Buildings",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80",
    description: "Modern homes, apartments, and housing estates delivered faster and more affordably."
  },
  {
    title: "Commercial Spaces",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80",
    description: "Offices, retail outlets, and showrooms built with speed and precision."
  },
  {
    title: "Educational Facilities",
    image: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=800&q=80",
    description: "Schools, training centers, and classrooms ready for students in record time."
  },
  {
    title: "Healthcare Buildings",
    image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=800&q=80",
    description: "Clinics, medical centers, and healthcare facilities with clean, controlled construction."
  },
  {
    title: "Industrial Warehouses",
    image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&q=80",
    description: "Storage facilities, distribution centers, and industrial buildings at scale."
  },
  {
    title: "Hospitality Projects",
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80",
    description: "Hotels, resorts, and guest houses with consistent quality across all units."
  }
];

export default function ModularConstructionPage() {
  return (
    <main className="min-h-screen bg-white">
      <JsonLd
        id="service-schema"
        data={serviceSchema({
          name: "Modular Construction",
          description: "Discover PristiqBuild's modular construction services. Faster, more efficient, and sustainable building solutions using Light Gauge Steel technology in Nigeria.",
          path: "/services/modular-construction",
          serviceType: "Modular building construction",
        })}
      />
      <JsonLd
        id="service-breadcrumb"
        data={breadcrumbSchema([
          { name: "Modular Construction", path: "/services/modular-construction" },
        ])}
      />
      {/* Hero Section */}
      <section className="relative h-[70vh] min-h-[500px] bg-steel-900">
        <SafeImage
          src="https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=2000&q=80"
          alt="Modular construction site with prefabricated building modules"
          fill
          className="object-cover opacity-40"
          priority
        />
        <div className="absolute inset-0 bg-linear-to-r from-steel-900/90 to-steel-900/50" />

        <div className="relative h-full flex items-center">
          <div className="container-custom">
            <div className="max-w-3xl">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
                Modular Construction Services
              </h1>
              <p className="text-xl md:text-2xl text-steel-200 mb-8 leading-relaxed">
                Building Nigeria&apos;s future with precision-engineered modular solutions.
                Faster timelines, superior quality, and sustainable construction.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/cost-calculator"
                  className="btn-primary inline-flex items-center justify-center gap-2"
                >
                  Get a Quote
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <Link
                  href="/contact"
                  className="btn-secondary inline-flex items-center justify-center"
                >
                  Speak with an Expert
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What is Modular Construction */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-steel-900 mb-6">
                What is Modular Construction?
              </h2>
              <div className="space-y-4 text-lg text-steel-700 leading-relaxed">
                <p>
                  Modular construction is an innovative building method where structures are
                  constructed in controlled factory environments before being transported and
                  assembled on-site. This revolutionary approach transforms traditional
                  construction timelines and quality standards.
                </p>
                <p>
                  At PristiqBuild, we specialize in <strong>Light Gauge Steel (LGS)</strong> modular
                  construction, combining the speed of modular building with the strength and
                  durability of steel framing systems. Our modules are precision-engineered
                  to exact specifications, ensuring perfect fit and superior structural integrity.
                </p>
                <p>
                  This method is particularly well-suited for Nigeria&apos;s construction challenges, 
                  reducing weather-related delays, minimizing on-site labor issues, and
                  delivering consistent quality regardless of location.
                </p>
              </div>

              <div className="mt-8 p-6 bg-primary-50 border-l-4 border-primary-600 rounded-r-lg">
                <p className="text-steel-800 font-semibold mb-2">
                  Did you know?
                </p>
                <p className="text-steel-700">
                  Modular buildings can be completed <strong>50% faster</strong> than traditional
                  construction, with some projects finished in as little as 6-8 weeks from
                  start to handover.
                </p>
              </div>
            </div>

            <div className="relative">
              <div className="relative h-[500px] rounded-2xl overflow-hidden shadow-2xl">
                <SafeImage
                  src="https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=800&q=80"
                  alt="Factory manufacturing of modular building components"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 bg-primary-600 text-white p-6 rounded-2xl shadow-xl max-w-xs">
                <div className="flex items-center gap-3 mb-2">
                  <TrendingUp className="w-8 h-8" />
                  <div>
                    <div className="text-3xl font-bold">50%</div>
                    <div className="text-sm text-primary-100">Faster Build Time</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Grid */}
      <section className="section-padding bg-linear-to-b from-gray-50 to-white">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-steel-900 mb-4">
              Why Choose Modular Construction?
            </h2>
            <p className="text-xl text-steel-600">
              Experience the advantages of modern building technology with proven benefits
              for your project timeline, budget, and quality.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-[box-shadow,transform] hover:-translate-y-1 border border-gray-100"
              >
                <div className="w-14 h-14 bg-primary-100 rounded-lg flex items-center justify-center mb-6">
                  <benefit.icon className="w-7 h-7 text-primary-600" />
                </div>
                <h3 className="text-xl font-bold text-steel-900 mb-3">
                  {benefit.title}
                </h3>
                <p className="text-steel-600 leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Process */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-steel-900 mb-4">
              Our Modular Construction Process
            </h2>
            <p className="text-xl text-steel-600">
              A streamlined, proven process from concept to completion
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            {process.map((item, index) => (
              <div key={index} className="relative mb-12 last:mb-0">
                {/* Connection Line */}
                {index < process.length - 1 && (
                  <div className="absolute left-8 top-20 w-0.5 h-full bg-linear-to-b from-primary-300 to-transparent hidden md:block" />
                )}

                <div className="flex flex-col md:flex-row gap-6 items-start">
                  {/* Step Number */}
                  <div className="shrink-0 w-16 h-16 bg-linear-to-br from-primary-600 to-primary-700 text-white rounded-lg flex items-center justify-center text-2xl font-bold shadow-lg">
                    {item.step}
                  </div>

                  {/* Content */}
                  <div className="flex-1 bg-linear-to-br from-gray-50 to-white p-8 rounded-2xl border border-gray-200">
                    <h3 className="text-2xl font-bold text-steel-900 mb-3">
                      {item.title}
                    </h3>
                    <p className="text-lg text-steel-600 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Applications */}
      <section className="section-padding bg-linear-to-b from-gray-50 to-white">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-steel-900 mb-4">
              Modular Solutions for Every Need
            </h2>
            <p className="text-xl text-steel-600">
              From residential homes to industrial complexes, our modular construction
              adapts to your project requirements
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {applications.map((app, index) => (
              <div
                key={index}
                className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-[box-shadow,transform] hover:-translate-y-2"
              >
                <div className="relative h-64 overflow-hidden">
                  <SafeImage
                    src={app.image}
                    alt={app.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/70 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h3 className="text-2xl font-bold text-white mb-2">
                      {app.title}
                    </h3>
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-steel-600 leading-relaxed">
                    {app.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-linear-to-r from-primary-600 to-primary-700 text-white">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
              Ready to Build Faster and Smarter?
            </h2>
            <p className="text-xl md:text-2xl text-primary-100 mb-10 leading-relaxed">
              Let&apos;s discuss how modular construction can transform your next project.
              Get expert consultation and a detailed quote today.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link
                href="/cost-calculator"
                className="px-10 py-5 bg-white text-primary-600 font-bold rounded-lg hover:bg-gray-50 transition-[color,background-color,border-color,transform] hover:scale-105 shadow-xl inline-flex items-center justify-center gap-3 text-lg"
              >
                <DollarSign className="w-6 h-6" />
                Calculate Project Cost
              </Link>
              <Link
                href="/contact"
                className="px-10 py-5 bg-primary-800 text-white font-bold rounded-lg hover:bg-primary-900 transition-[color,background-color,border-color,transform] hover:scale-105 border-2 border-primary-400 inline-flex items-center justify-center gap-3 text-lg"
              >
                <Users className="w-6 h-6" />
                Schedule Consultation
              </Link>
            </div>

            <div className="mt-12 pt-12 border-t border-primary-400/30 grid md:grid-cols-3 gap-8">
              <div>
                <div className="text-4xl font-bold mb-2">50%</div>
                <div className="text-primary-100">Faster Construction</div>
              </div>
              <div>
                <div className="text-4xl font-bold mb-2">30%</div>
                <div className="text-primary-100">Cost Savings</div>
              </div>
              <div>
                <div className="text-4xl font-bold mb-2">90%</div>
                <div className="text-primary-100">Less Waste</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
