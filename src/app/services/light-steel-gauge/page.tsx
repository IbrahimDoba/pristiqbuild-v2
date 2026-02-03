import type { Metadata } from "next";
import Link from "next/link";
import SafeImage from "@/components/SafeImage";
import {
  Zap,
  Shield,
  Ruler,
  Recycle,
  TrendingUp,
  ArrowRight,
  CheckCircle,
  Flame,
  Wind,
  Droplets,
  Building2,
  Home
} from "lucide-react";

export const metadata: Metadata = {
  title: "Light Gauge Steel Construction | PristiqBuild Nigeria",
  description:
    "Expert Light Gauge Steel (LGS) construction services in Nigeria. Strong, durable, and cost-effective steel framing solutions for modern buildings.",
};

const specifications = [
  {
    icon: Ruler,
    title: "Precision Engineering",
    description: "Steel sections manufactured to tolerances of ±0.5mm for perfect fit and structural integrity.",
    specs: "Thickness: 0.55mm - 2.0mm"
  },
  {
    icon: Shield,
    title: "Superior Strength",
    description: "High-grade steel (S350/S450) with yield strengths up to 450 MPa for exceptional load-bearing capacity.",
    specs: "Grades: S350, S450"
  },
  {
    icon: Recycle,
    title: "Galvanized Protection",
    description: "Hot-dip galvanization (G90/Z275) provides decades of corrosion resistance in harsh climates.",
    specs: "Coating: G90, Z275"
  },
  {
    icon: Zap,
    title: "Lightweight Design",
    description: "Up to 60% lighter than traditional materials while maintaining superior structural performance.",
    specs: "Weight: 60% lighter"
  }
];

const advantages = [
  {
    icon: TrendingUp,
    title: "40-50% Faster Construction",
    description: "Pre-fabricated components and simple assembly drastically reduce build times."
  },
  {
    icon: Droplets,
    title: "Weather Resistant",
    description: "Doesn't warp, rot, or deteriorate in Nigeria's humid coastal environments."
  },
  {
    icon: Flame,
    title: "Fire Resistant",
    description: "Non-combustible material with excellent fire resistance ratings for safety compliance."
  },
  {
    icon: Wind,
    title: "Seismic Performance",
    description: "Flexible yet strong structure absorbs seismic forces better than rigid materials."
  },
  {
    icon: Building2,
    title: "Design Flexibility",
    description: "Create complex architectural designs with wide spans and unique shapes."
  },
  {
    icon: Recycle,
    title: "100% Recyclable",
    description: "Steel can be recycled indefinitely without losing structural properties."
  }
];

const applications = [
  {
    title: "Residential Buildings",
    description: "Single-family homes, duplexes, and multi-story apartment complexes",
    image: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800&q=80"
  },
  {
    title: "Commercial Projects",
    description: "Office buildings, retail spaces, showrooms, and business centers",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80"
  },
  {
    title: "Industrial Facilities",
    description: "Warehouses, factories, distribution centers, and storage buildings",
    image: "https://images.unsplash.com/photo-1587293852726-70cdb56c2866?w=800&q=80"
  },
  {
    title: "Institutional Buildings",
    description: "Schools, hospitals, government facilities, and community centers",
    image: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=800&q=80"
  }
];

const comparisonData = [
  {
    feature: "Construction Speed",
    lgs: "6-8 weeks",
    traditional: "4-6 months",
    advantage: "75% faster"
  },
  {
    feature: "Material Waste",
    lgs: "Less than 5%",
    traditional: "15-20%",
    advantage: "90% less waste"
  },
  {
    feature: "Lifespan",
    lgs: "50+ years",
    traditional: "30-40 years",
    advantage: "Longer durability"
  },
  {
    feature: "Weight",
    lgs: "60kg/m²",
    traditional: "180kg/m²",
    advantage: "60% lighter"
  }
];

export default function LightSteelGaugePage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative h-[70vh] min-h-[500px] bg-steel-900">
        <SafeImage
          src="https://images.unsplash.com/photo-1565008576549-57569a49371d?w=2000&q=80"
          alt="Light gauge steel frame construction"
          fill
          className="object-cover opacity-30"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-steel-900/95 to-steel-900/40" />

        <div className="relative h-full flex items-center">
          <div className="container-custom">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary-600/20 backdrop-blur-sm border border-primary-400/30 rounded-full text-primary-300 mb-6">
                <Shield className="w-4 h-4" />
                <span className="text-sm font-semibold">Advanced Steel Technology</span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
                Light Gauge Steel Construction
              </h1>
              <p className="text-xl md:text-2xl text-steel-200 mb-8 leading-relaxed">
                The future of construction in Nigeria. Stronger, faster, and more sustainable
                than traditional building methods.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/blog"
                  className="btn-primary inline-flex items-center justify-center gap-2"
                >
                  Learn More
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <Link
                  href="/cost-calculator"
                  className="btn-secondary inline-flex items-center justify-center"
                >
                  Get a Quote
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What is LGS */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-steel-900 mb-6">
                What is Light Gauge Steel?
              </h2>
              <div className="space-y-4 text-lg text-steel-700 leading-relaxed">
                <p>
                  <strong>Light Gauge Steel (LGS)</strong> is thin, cold-formed steel that's shaped
                  into precise structural profiles for building construction. Unlike heavy structural
                  steel, LGS is lightweight, easy to work with, and optimized for modern building needs.
                </p>
                <p>
                  At PristiqBuild, we use premium galvanized steel with thicknesses ranging from
                  <strong> 0.55mm to 2.0mm</strong>, formed into C-sections, U-tracks, and custom
                  profiles. Each component is manufactured in controlled factory conditions,
                  ensuring consistent quality and precision.
                </p>
                <p>
                  This technology is ideal for Nigeria's construction industry—it resists termites,
                  won't rot in humid conditions, withstands coastal corrosion, and assembles rapidly
                  even in challenging weather.
                </p>
              </div>

              <div className="mt-8 grid grid-cols-2 gap-6">
                <div className="p-6 bg-gradient-to-br from-primary-50 to-white rounded-xl border border-primary-100">
                  <div className="text-3xl font-bold text-primary-600 mb-2">50+</div>
                  <div className="text-sm text-steel-600">Years Lifespan</div>
                </div>
                <div className="p-6 bg-gradient-to-br from-primary-50 to-white rounded-xl border border-primary-100">
                  <div className="text-3xl font-bold text-primary-600 mb-2">100%</div>
                  <div className="text-sm text-steel-600">Recyclable</div>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="relative h-[350px] rounded-2xl overflow-hidden shadow-2xl">
                <SafeImage
                  src="https://images.unsplash.com/photo-1590856029826-c7a73142bbf1?w=800&q=80"
                  alt="Light gauge steel C-sections and profiles"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="relative h-[250px] rounded-2xl overflow-hidden shadow-xl">
                <SafeImage
                  src="https://images.unsplash.com/photo-1513467535987-fd81bc7d62f8?w=800&q=80"
                  alt="Steel frame assembly on construction site"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Technical Specifications */}
      <section className="section-padding bg-gradient-to-b from-gray-50 to-white">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-steel-900 mb-4">
              Technical Specifications
            </h2>
            <p className="text-xl text-steel-600">
              Engineered for strength, precision, and long-term performance
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {specifications.map((spec, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-xl border-2 border-gray-200 hover:border-primary-500 transition-all"
              >
                <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-4">
                  <spec.icon className="w-6 h-6 text-primary-600" />
                </div>
                <h3 className="text-lg font-bold text-steel-900 mb-2">{spec.title}</h3>
                <p className="text-steel-600 text-sm mb-3">{spec.description}</p>
                <div className="text-xs font-semibold text-primary-600 bg-primary-50 px-3 py-1 rounded-full inline-block">
                  {spec.specs}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Advantages */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-steel-900 mb-4">
              Why Light Gauge Steel?
            </h2>
            <p className="text-xl text-steel-600">
              Proven advantages that make LGS the smart choice for Nigerian construction
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {advantages.map((advantage, index) => (
              <div
                key={index}
                className="flex gap-4 items-start p-6 bg-gradient-to-br from-gray-50 to-white rounded-xl hover:shadow-lg transition-all"
              >
                <div className="w-12 h-12 bg-primary-600 rounded-xl flex items-center justify-center flex-shrink-0">
                  <advantage.icon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-steel-900 mb-2">
                    {advantage.title}
                  </h3>
                  <p className="text-steel-600 leading-relaxed">
                    {advantage.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="section-padding bg-gradient-to-b from-gray-50 to-white">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-steel-900 mb-4">
              LGS vs Traditional Construction
            </h2>
            <p className="text-xl text-steel-600">
              See how light gauge steel compares to conventional building methods
            </p>
          </div>

          <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gradient-to-r from-primary-600 to-primary-700 text-white">
                  <tr>
                    <th className="px-6 py-4 text-left font-semibold">Feature</th>
                    <th className="px-6 py-4 text-left font-semibold">Light Gauge Steel</th>
                    <th className="px-6 py-4 text-left font-semibold">Traditional</th>
                    <th className="px-6 py-4 text-left font-semibold">Advantage</th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonData.map((row, index) => (
                    <tr
                      key={index}
                      className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}
                    >
                      <td className="px-6 py-4 font-semibold text-steel-900">
                        {row.feature}
                      </td>
                      <td className="px-6 py-4 text-primary-600 font-semibold">
                        {row.lgs}
                      </td>
                      <td className="px-6 py-4 text-steel-600">{row.traditional}</td>
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center gap-1 text-sm font-semibold text-green-600">
                          <CheckCircle className="w-4 h-4" />
                          {row.advantage}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* Applications */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-steel-900 mb-4">
              Applications Across Nigeria
            </h2>
            <p className="text-xl text-steel-600">
              From Lagos to Abuja, LGS is transforming construction projects
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {applications.map((app, index) => (
              <div
                key={index}
                className="group relative overflow-hidden rounded-2xl shadow-xl hover:shadow-2xl transition-all"
              >
                <div className="relative h-80">
                  <SafeImage
                    src={app.image}
                    alt={app.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-8">
                    <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">
                      {app.title}
                    </h3>
                    <p className="text-white/90 text-lg">
                      {app.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-gradient-to-r from-primary-600 to-primary-700 text-white">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
              Start Your LGS Project Today
            </h2>
            <p className="text-xl md:text-2xl text-primary-100 mb-10 leading-relaxed">
              Join hundreds of successful projects across Nigeria. Get expert consultation
              and accurate cost estimates for your light gauge steel construction.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link
                href="/cost-calculator"
                className="px-10 py-5 bg-white text-primary-600 font-bold rounded-xl hover:bg-gray-50 transition-all hover:scale-105 shadow-xl inline-flex items-center justify-center gap-3 text-lg"
              >
                <Ruler className="w-6 h-6" />
                Calculate Your Project
              </Link>
              <Link
                href="/blog"
                className="px-10 py-5 bg-primary-800 text-white font-bold rounded-xl hover:bg-primary-900 transition-all hover:scale-105 border-2 border-primary-400 inline-flex items-center justify-center gap-3 text-lg"
              >
                Read Our Blog
                <ArrowRight className="w-6 h-6" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
