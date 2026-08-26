import type { Metadata } from "next";
import Link from "next/link";
import SafeImage from "@/components/SafeImage";
import {
  Smartphone,
  Zap,
  Shield,
  Thermometer,
  Lock,
  Camera,
  Wifi,
  ArrowRight,
  CheckCircle,
  Sun,
  Droplets,
  Wind,
  Battery,
  Bell,
  Home,
  Settings,
  TrendingDown
} from "lucide-react";

export const metadata: Metadata = {
  title: "Smart Building Solutions | PristiqBuild Nigeria",
  description:
    "Intelligent building solutions in Nigeria. Integrate smart home technology, energy efficiency, IoT automation, and security into your construction project.",
};

const smartSystems = [
  {
    icon: Thermometer,
    title: "Climate Control",
    description: "Automated HVAC systems that learn your preferences and optimize for comfort while reducing energy costs by up to 40%.",
    features: ["Smart thermostats", "Zone control", "Energy analytics", "Remote access"]
  },
  {
    icon: Zap,
    title: "Energy Management",
    description: "Monitor and control every aspect of your building's energy consumption with real-time insights and automated optimization.",
    features: ["Solar integration", "Load balancing", "Peak shaving", "Cost tracking"]
  },
  {
    icon: Lock,
    title: "Access Control",
    description: "Keyless entry systems with biometric authentication, remote access management, and complete entry/exit logs.",
    features: ["Biometric locks", "Mobile access", "Visitor management", "Activity logs"]
  },
  {
    icon: Camera,
    title: "Security & Surveillance",
    description: "AI-powered cameras with facial recognition, motion detection, and 24/7 monitoring accessible from anywhere.",
    features: ["AI detection", "Cloud storage", "Mobile alerts", "Night vision"]
  },
  {
    icon: Sun,
    title: "Lighting Automation",
    description: "Intelligent lighting that adjusts to natural light, occupancy, and time of day for maximum efficiency and comfort.",
    features: ["Motion sensors", "Daylight harvesting", "Scene presets", "Voice control"]
  },
  {
    icon: Wifi,
    title: "Integrated Network",
    description: "Robust, secure WiFi infrastructure with seamless connectivity throughout your entire building.",
    features: ["Mesh networking", "Bandwidth management", "Guest networks", "IoT segmentation"]
  }
];

const benefits = [
  {
    icon: TrendingDown,
    title: "40% Lower Energy Bills",
    description: "Smart systems optimize energy usage automatically, dramatically reducing monthly costs."
  },
  {
    icon: Shield,
    title: "Enhanced Security",
    description: "24/7 monitoring, instant alerts, and complete control over who enters your property."
  },
  {
    icon: Smartphone,
    title: "Total Control",
    description: "Manage every aspect of your building from your smartphone, anywhere in the world."
  },
  {
    icon: Battery,
    title: "Sustainability",
    description: "Reduce your carbon footprint with intelligent resource management and renewable integration."
  },
  {
    icon: TrendingDown,
    title: "Increased Property Value",
    description: "Smart buildings command 10-20% higher resale and rental values in Nigeria's market."
  },
  {
    icon: Settings,
    title: "Future-Proof",
    description: "Scalable systems that grow with technology advancements and your needs."
  }
];

const applications = [
  {
    title: "Smart Homes",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80",
    description: "Transform your residence into an intelligent living space with automated comfort, security, and efficiency.",
    systems: ["Climate control", "Lighting automation", "Security systems", "Entertainment integration"]
  },
  {
    title: "Office Buildings",
    image: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=800&q=80",
    description: "Create productive, energy-efficient workspaces with smart scheduling, occupancy tracking, and resource optimization.",
    systems: ["Space utilization", "Energy management", "Access control", "Conference automation"]
  },
  {
    title: "Hotels & Hospitality",
    image: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800&q=80",
    description: "Deliver exceptional guest experiences with in-room automation, mobile check-in, and personalized comfort settings.",
    systems: ["Guest controls", "Keyless entry", "Energy saving", "Service requests"]
  },
  {
    title: "Industrial Facilities",
    image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=800&q=80",
    description: "Monitor operations, optimize energy usage, and ensure safety with industrial-grade IoT solutions.",
    systems: ["Equipment monitoring", "Safety systems", "Energy optimization", "Predictive maintenance"]
  }
];

const integration = [
  {
    category: "Voice Control",
    items: ["Amazon Alexa", "Google Assistant", "Apple Siri"],
    icon: Bell
  },
  {
    category: "Energy Systems",
    items: ["Solar panels", "Battery storage", "Grid integration"],
    icon: Battery
  },
  {
    category: "Security",
    items: ["CCTV cameras", "Alarm systems", "Access controls"],
    icon: Shield
  },
  {
    category: "Climate",
    items: ["HVAC systems", "Ventilation", "Water heating"],
    icon: Wind
  }
];

export default function SmartBuildingPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative h-[70vh] min-h-[500px] bg-steel-900 overflow-hidden">
        <SafeImage
          src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=2000&q=80"
          alt="Modern smart home interior with automation"
          fill
          className="object-cover opacity-25"
          priority
        />
        <div className="absolute inset-0 bg-linear-to-r from-steel-900/95 to-primary-900/70" />

        {/* Animated circuit pattern */}
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `radial-gradient(circle at 20% 50%, rgba(21,152,149,0.3) 1px, transparent 1px),
                                radial-gradient(circle at 80% 80%, rgba(21,152,149,0.3) 1px, transparent 1px)`,
              backgroundSize: "100px 100px",
            }}
          />
        </div>

        <div className="relative h-full flex items-center">
          <div className="container-custom">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary-600/20 backdrop-blur-sm border border-primary-400/30 rounded-full text-primary-300 mb-6">
                <Wifi className="w-4 h-4" />
                <span className="text-sm font-semibold">IoT-Powered Intelligence</span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
                Smart Building Solutions
              </h1>
              <p className="text-xl md:text-2xl text-steel-200 mb-8 leading-relaxed">
                Build intelligence into every brick. Control, monitor, and optimize your
                building from anywhere with integrated IoT and automation systems.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/contact"
                  className="btn-primary inline-flex items-center justify-center gap-2"
                >
                  Get Smart Quote
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <Link
                  href="/cost-calculator"
                  className="btn-secondary inline-flex items-center justify-center"
                >
                  Explore Solutions
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What is Smart Building */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-steel-900 mb-6">
                What Makes a Building &quot;Smart&quot;?
              </h2>
              <div className="space-y-4 text-lg text-steel-700 leading-relaxed">
                <p>
                  A <strong>smart building</strong> uses Internet of Things (IoT) sensors,
                  automation systems, and artificial intelligence to create a responsive,
                  efficient, and secure environment that adapts to your needs.
                </p>
                <p>
                  At PristiqBuild, we integrate smart technology directly into the construction
                  process, not as an afterthought. From intelligent climate control to advanced
                  security systems, we build connectivity and automation into the foundation
                  of your project.
                </p>
                <p>
                  In Nigeria&apos;s challenging climate and energy landscape, smart buildings offer
                  tangible benefits: lower energy bills, enhanced security, remote monitoring,
                  and increased property value. It&apos;s not luxury, it&apos;s practical innovation for
                  modern living and working.
                </p>
              </div>

              <div className="mt-8 p-6 bg-linear-to-r from-primary-50 to-primary-50 border-l-4 border-primary-600 rounded-r-lg">
                <div className="flex items-start gap-4">
                  <Zap className="w-8 h-8 text-primary-600 shrink-0" />
                  <div>
                    <p className="text-steel-800 font-semibold mb-2">
                      Save up to 40% on energy costs
                    </p>
                    <p className="text-steel-700">
                      Smart systems automatically optimize energy usage based on occupancy,
                      weather, and utility rates, delivering substantial monthly savings.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="relative h-[500px] rounded-2xl overflow-hidden shadow-2xl">
                <SafeImage
                  src="https://images.unsplash.com/photo-1558002038-1055907df827?w=800&q=80"
                  alt="Smart home control panel and automation"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 bg-primary-600 text-white p-6 rounded-2xl shadow-xl max-w-xs">
                <Smartphone className="w-10 h-10 mb-3" />
                <div className="text-2xl font-bold mb-2">Total Control</div>
                <div className="text-sm text-primary-100">
                  Manage your entire building from your smartphone, anywhere, anytime
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Smart Systems */}
      <section className="section-padding bg-linear-to-b from-gray-50 to-white">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-steel-900 mb-4">
              Integrated Smart Systems
            </h2>
            <p className="text-xl text-steel-600">
              Comprehensive automation solutions for every aspect of your building
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {smartSystems.map((system, index) => (
              <div
                key={index}
                className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-[box-shadow,transform] hover:-translate-y-1 border border-gray-100"
              >
                <div className="w-14 h-14 bg-linear-to-br from-primary-600 to-primary-700 rounded-lg flex items-center justify-center mb-6">
                  <system.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-bold text-steel-900 mb-3">
                  {system.title}
                </h3>
                <p className="text-steel-600 mb-6 leading-relaxed">
                  {system.description}
                </p>
                <ul className="space-y-2">
                  {system.features.map((feature, fIndex) => (
                    <li key={fIndex} className="flex items-center gap-2 text-sm text-steel-700">
                      <CheckCircle className="w-4 h-4 text-primary-600 shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-steel-900 mb-4">
              Why Go Smart?
            </h2>
            <p className="text-xl text-steel-600">
              Real benefits that impact your bottom line and quality of life
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className="flex gap-4 items-start p-6 bg-linear-to-br from-gray-50 to-white rounded-2xl hover:shadow-lg transition-[box-shadow,transform] border border-gray-200"
              >
                <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center shrink-0">
                  <benefit.icon className="w-6 h-6 text-primary-600" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-steel-900 mb-2">
                    {benefit.title}
                  </h3>
                  <p className="text-steel-600 leading-relaxed">
                    {benefit.description}
                  </p>
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
              Smart Solutions for Every Building Type
            </h2>
            <p className="text-xl text-steel-600">
              Tailored intelligence for residential, commercial, and industrial properties
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {applications.map((app, index) => (
              <div
                key={index}
                className="group bg-white rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-[box-shadow,transform]"
              >
                <div className="relative h-72 overflow-hidden">
                  <SafeImage
                    src={app.image}
                    alt={app.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/40 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-8">
                    <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">
                      {app.title}
                    </h3>
                    <p className="text-white/90 text-lg">
                      {app.description}
                    </p>
                  </div>
                </div>
                <div className="p-6">
                  <div className="grid grid-cols-2 gap-3">
                    {app.systems.map((system, sIndex) => (
                      <div
                        key={sIndex}
                        className="flex items-center gap-2 text-sm text-steel-700 bg-gray-50 px-3 py-2 rounded-lg"
                      >
                        <CheckCircle className="w-4 h-4 text-primary-600 shrink-0" />
                        {system}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Integration */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-steel-900 mb-4">
              Seamless Integration
            </h2>
            <p className="text-xl text-steel-600">
              Works with your existing systems and favorite platforms
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-5xl mx-auto">
            {integration.map((item, index) => (
              <div
                key={index}
                className="bg-linear-to-br from-primary-50 to-white p-6 rounded-2xl border border-primary-100"
              >
                <div className="w-12 h-12 bg-primary-600 rounded-lg flex items-center justify-center mb-4">
                  <item.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-bold text-steel-900 mb-4">
                  {item.category}
                </h3>
                <ul className="space-y-2">
                  {item.items.map((subItem, subIndex) => (
                    <li key={subIndex} className="text-steel-600 text-sm flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-primary-600 rounded-full" />
                      {subItem}
                    </li>
                  ))}
                </ul>
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
              Build Smart from the Start
            </h2>
            <p className="text-xl md:text-2xl text-primary-100 mb-10 leading-relaxed">
              Don&apos;t retrofit intelligence, integrate it. Let&apos;s design a smart building
              solution tailored to your needs and budget.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link
                href="/contact"
                className="px-10 py-5 bg-white text-primary-600 font-bold rounded-lg hover:bg-gray-50 transition-[color,background-color,border-color,transform] hover:scale-105 shadow-xl inline-flex items-center justify-center gap-3 text-lg"
              >
                <Smartphone className="w-6 h-6" />
                Schedule Consultation
              </Link>
              <Link
                href="/cost-calculator"
                className="px-10 py-5 bg-primary-800 text-white font-bold rounded-lg hover:bg-primary-900 transition-[color,background-color,border-color,transform] hover:scale-105 border-2 border-primary-400 inline-flex items-center justify-center gap-3 text-lg"
              >
                Estimate Smart Costs
                <ArrowRight className="w-6 h-6" />
              </Link>
            </div>

            <div className="mt-12 pt-12 border-t border-primary-400/30 grid md:grid-cols-3 gap-8">
              <div>
                <div className="text-4xl font-bold mb-2">40%</div>
                <div className="text-primary-100">Energy Savings</div>
              </div>
              <div>
                <div className="text-4xl font-bold mb-2">24/7</div>
                <div className="text-primary-100">Remote Monitoring</div>
              </div>
              <div>
                <div className="text-4xl font-bold mb-2">20%+</div>
                <div className="text-primary-100">Higher Property Value</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
