"use client";

import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import {
  ProjectHero,
  ProjectGallery,
  ProjectStats,
  ProjectFeatures,
  ProjectCTA,
} from "@/components/project-ui";
import Image from "next/image";
import {
  Home,
  Zap,
  Sun,
  Battery,
  Wifi,
  Shield,
  Car,
  Waves,
  Building2,
  Clock,
  MapPin,
} from "lucide-react";

const stats = [
  {
    icon: Home,
    value: "18",
    label: "Smart Villas",
    sublabel: "5 ensuite bedrooms + BQ",
  },
  {
    icon: Battery,
    value: "48kWh",
    label: "Battery Storage",
    sublabel: "Solar + inverter backup",
  },
  {
    icon: Clock,
    value: "18 Months",
    label: "Timeline",
    sublabel: "Total construction",
  },
  {
    icon: Building2,
    value: "50+ Years",
    label: "Structural Life",
    sublabel: "Steel frame guarantee",
  },
];

const features = [
  {
    icon: Shield,
    title: "Light Gauge Steel Frame",
    description:
      "Precision built 50 plus year structural steel frame provides superior strength, earthquake resistance, and eliminates concerns about termites, rot, or structural degradation.",
  },
  {
    icon: Sun,
    title: "Solar Power System",
    description:
      "Integrated solar panels with 48kWh battery storage and inverter backup ensure reliable, sustainable power with significantly reduced electricity costs.",
  },
  {
    icon: Wifi,
    title: "Smart Home Controls",
    description:
      "App controlled lighting, climate control, and security systems put your home at your fingertips, whether you are inside or anywhere in the world.",
  },
  {
    icon: Car,
    title: "EV Charging Ready",
    description:
      "Future proof infrastructure includes Cybertruck capable electric vehicle charging stations, supporting the transition to sustainable transportation.",
  },
  {
    icon: Zap,
    title: "Thermal Insulation",
    description:
      "Double glazed windows and comprehensive thermal insulation maintain comfortable interior temperatures while dramatically reducing cooling costs.",
  },
  {
    icon: Waves,
    title: "Premium Amenities",
    description:
      "Estate features include clubhouse, swimming pool, tennis court, RFID access control, and integrated CCTV security throughout the community.",
  },
];

const galleryImages = [
  {
    src: "/dawaki estate/1.png",
    alt: "Opulence Heights villa exterior render",
    caption: "Stunning architectural design on hillside terrain",
  },
  {
    src: "/dawaki estate/2.png",
    alt: "Villa exterior view",
    caption: "Modern elevation with premium finishes",
  },
  {
    src: "/dawaki estate/7.png",
    alt: "Estate landscape view",
    caption: "Beautifully landscaped community spaces",
  },
  {
    src: "/dawaki estate/PRISTIQ ESTATE_1 - Photo.png",
    alt: "Villa front elevation",
    caption: "Contemporary architectural styling",
  },
  {
    src: "/dawaki estate/PRISTIQ ESTATE_4 - Photo.png",
    alt: "Interior design concept",
    caption: "Luxury interior finishes",
  },
  {
    src: "/dawaki estate/PRISTIQ ESTATE_7 - Photo.png",
    alt: "Living space design",
    caption: "Open plan living areas",
  },
  {
    src: "/dawaki estate/PRISTIQ ESTATE_11 - Photo (1).png",
    alt: "Kitchen design",
    caption: "Designer kitchen with stone worktops",
  },
  {
    src: "/dawaki estate/PRISTIQ ESTATE_12 - Photo.png",
    alt: "Bedroom design",
    caption: "Spacious bedroom suites",
  },
];

const quickFacts = [
  { label: "Location", value: "Dawaki Hillside, Abuja" },
  { label: "Units", value: "18 Smart Villas" },
  { label: "Construction", value: "Light Gauge Steel (LGS)" },
  { label: "Smart Living", value: "App controlled lighting & AC" },
  { label: "Power", value: "Solar + 48kWh Battery + Inverter" },
  { label: "EV Ready", value: "Cybertruck capable Charger" },
  { label: "Layout", value: "5 Ensuite Bedrooms + 1 BQ" },
  { label: "Payment Plan", value: "12 Months Flexible" },
];

const lifestyleFeatures = [
  "Light Gauge Steel (50+ Year Structural Frame)",
  "Solar + Battery Energy with Inverter Backup",
  "Smart Home Controls (Lighting, AC, Security)",
  "Double Glazed Windows & Thermal Insulation",
  "EV Charging Ready",
  "Designer Kitchen with Stone Worktops",
  "Rooftop Lounges (Prestige Units)",
  "Clubhouse, Pool, Tennis Court",
  "RFID Access Control + CCTV Integration",
];

export default function OpulenceHeightsProject() {
  return (
    <>
      <Navigation />
      <main id="main-content">
        <ProjectHero
          title="Opulence Heights"
          subtitle="Nigeria's first smart steel residential estate featuring 18 luxury villas with solar power, home automation, and precision engineered steel frame construction."
          location="Dawaki Hillside, Abuja"
          duration="18 Months"
          status="Phase 1 In Progress"
          heroImage="/dawaki estate/1.png"
          category="Smart Living Estate"
        />

        <ProjectStats stats={stats} />

        {/* About Section */}
        <section className="section-padding bg-white">
          <div className="container-custom">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div>
                <div className="flex items-center gap-4 mb-6">
                  <div className="px-4 py-2 bg-steel-100 rounded-lg">
                    <span className="font-display font-bold text-steel-700">
                      EFAB Properties
                    </span>
                  </div>
                  <span className="text-steel-400">+</span>
                  <div className="px-4 py-2 bg-primary-100 rounded-lg">
                    <span className="font-display font-bold text-primary-700">
                      PristiqBuild
                    </span>
                  </div>
                  <span className="text-sm text-steel-500 font-medium">
                    Joint Venture
                  </span>
                </div>
                <h2 className="heading-lg text-steel-900 mb-6">
                  About the Project
                </h2>
                <p className="text-lg text-steel-600 leading-relaxed mb-6">
                  Opulence Heights is a revolutionary smart living estate
                  located in the elevated terrain of Dawaki Hillside, Abuja.
                  Developed through a joint venture between EFAB Properties and
                  PristiqBuild, this project introduces Nigeria's first
                  precision built steel frame homes with global standards in
                  energy efficiency, automation, and infrastructure.
                </p>
                <p className="text-lg text-steel-600 leading-relaxed mb-8">
                  From solar powered systems to smart home controls and
                  integrated security, each of the 18 villas represents a new
                  benchmark for residential excellence in West Africa.
                </p>
                <div className="p-6 bg-gradient-to-r from-primary-50 to-secondary-50 rounded-2xl border border-primary-100">
                  <p className="text-xl font-display font-semibold text-steel-800 italic">
                    &ldquo;It's not just smart. It's engineered living.&rdquo;
                  </p>
                </div>
              </div>
              <div className="relative">
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
                  <Image
                    src="/dawaki estate/2.png"
                    alt="Opulence Heights villa exterior"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="absolute -bottom-6 -left-6 w-full h-full bg-gradient-to-br from-primary-200 to-secondary-200 rounded-2xl -z-10" />
              </div>
            </div>
          </div>
        </section>

        {/* Quick Facts */}
        <section className="py-16 bg-steel-900">
          <div className="container-custom">
            <h2 className="heading-md text-white text-center mb-12">
              Quick Facts
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {quickFacts.map((fact, index) => (
                <div
                  key={index}
                  className="p-5 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 text-center"
                >
                  <div className="text-sm text-white/60 mb-1">{fact.label}</div>
                  <div className="text-lg font-display font-bold text-white">
                    {fact.value}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <ProjectFeatures
          title="Why Opulence Heights?"
          subtitle="Features & Lifestyle"
          features={features}
        />

        {/* Lifestyle Features List */}
        <section className="py-20 bg-gradient-to-b from-steel-50 to-white">
          <div className="container-custom">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <span className="eyebrow inline-block mb-4 text-secondary-600 font-semibold tracking-wider uppercase text-sm">
                  Complete Package
                </span>
                <h2 className="heading-lg text-steel-900">
                  Everything Included
                </h2>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                {lifestyleFeatures.map((feature, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-3 p-4 bg-white rounded-xl border border-steel-100 shadow-sm"
                  >
                    <span className="w-8 h-8 rounded-full bg-gradient-to-br from-primary-600 to-primary-700 flex items-center justify-center flex-shrink-0">
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
                    <span className="text-steel-700 font-medium">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <ProjectGallery images={galleryImages} title="Estate Gallery" />

        {/* Location Section */}
        <section className="section-padding bg-white">
          <div className="container-custom">
            <div className="text-center mb-12">
              <span className="eyebrow inline-block mb-4 text-secondary-600 font-semibold tracking-wider uppercase text-sm">
                Strategic Access
              </span>
              <h2 className="heading-lg text-steel-900">
                Perfectly Positioned
              </h2>
            </div>
            <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <div className="text-center p-8 bg-steel-50 rounded-2xl">
                <MapPin className="w-12 h-12 text-primary-600 mx-auto mb-4" />
                <h3 className="font-display font-bold text-xl text-steel-900 mb-2">
                  Prime Location
                </h3>
                <p className="text-steel-600">
                  Dawaki Hillside, 10 mins from Abuja CBD
                </p>
              </div>
              <div className="text-center p-8 bg-steel-50 rounded-2xl">
                <Building2 className="w-12 h-12 text-primary-600 mx-auto mb-4" />
                <h3 className="font-display font-bold text-xl text-steel-900 mb-2">
                  Easy Access
                </h3>
                <p className="text-steel-600">
                  Connected to Katampe, Gwarinpa, Jahi
                </p>
              </div>
              <div className="text-center p-8 bg-steel-50 rounded-2xl">
                <Car className="w-12 h-12 text-primary-600 mx-auto mb-4" />
                <h3 className="font-display font-bold text-xl text-steel-900 mb-2">
                  Major Highways
                </h3>
                <p className="text-steel-600">
                  Minutes from major business districts
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Investment Section */}
        <section className="section-padding bg-gradient-to-br from-primary-900 via-primary-800 to-primary-900 text-white relative overflow-hidden">
          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: `radial-gradient(circle at 2px 2px, rgba(255,255,255,0.3) 1px, transparent 0)`,
              backgroundSize: "30px 30px",
            }}
          />
          <div className="container-custom relative z-10">
            <div className="text-center mb-12">
              <span className="inline-block mb-4 text-secondary-400 font-semibold tracking-wider uppercase text-sm">
                Secure Your Future
              </span>
              <h2 className="heading-lg text-white">Investment Opportunity</h2>
            </div>
            <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto mb-12">
              <div className="text-center p-8 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20">
                <div className="text-sm text-white/60 mb-2">Starting Price</div>
                <div className="text-4xl font-display font-bold text-secondary-400 mb-1">
                  N400M
                </div>
                <div className="text-white/70">per villa</div>
              </div>
              <div className="text-center p-8 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20">
                <div className="text-sm text-white/60 mb-2">Payment Plan</div>
                <div className="text-4xl font-display font-bold text-white mb-1">
                  12 Months
                </div>
                <div className="text-white/70">Flexible terms available</div>
              </div>
              <div className="text-center p-8 bg-gradient-to-br from-secondary-500 to-secondary-600 rounded-2xl">
                <div className="text-sm text-white/80 mb-2">Early Bird Offer</div>
                <div className="text-4xl font-display font-bold text-white mb-1">
                  Save N40M
                </div>
                <div className="text-white/90">on full off plan payment</div>
              </div>
            </div>
            <div className="max-w-2xl mx-auto">
              <h3 className="text-xl font-display font-bold text-center mb-6">
                Why Invest Now?
              </h3>
              <div className="grid sm:grid-cols-2 gap-4">
                {[
                  "Pre construction pricing advantage",
                  "Choose your preferred unit location",
                  "Customization options available",
                  "Guaranteed appreciation in premium location",
                ].map((reason, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-3 text-white/90"
                  >
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
                    <span>{reason}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Timeline Section */}
        <section className="py-20 bg-white">
          <div className="container-custom">
            <div className="text-center mb-12">
              <span className="eyebrow inline-block mb-4 text-secondary-600 font-semibold tracking-wider uppercase text-sm">
                Development Schedule
              </span>
              <h2 className="heading-lg text-steel-900">
                Project Timeline and Phases
              </h2>
            </div>
            <div className="flex flex-wrap justify-center gap-8 mb-12">
              <div className="text-center">
                <div className="text-4xl font-display font-bold text-primary-700">
                  18 Months
                </div>
                <div className="text-steel-600">Total Timeline</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-display font-bold text-secondary-600">
                  Phase 1
                </div>
                <div className="text-steel-600">Now Underway</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-display font-bold text-steel-700">
                  Q4 2025
                </div>
                <div className="text-steel-600">Final Completion</div>
              </div>
            </div>
            <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              <div className="p-6 bg-primary-50 rounded-2xl border-2 border-primary-200">
                <div className="inline-block px-3 py-1 bg-primary-600 text-white text-sm font-bold rounded-full mb-4">
                  In Progress
                </div>
                <h3 className="font-display font-bold text-xl text-steel-900 mb-2">
                  Phase 1
                </h3>
                <p className="text-steel-600">
                  Show Unit and 4 Villas currently under construction with
                  expected completion soon
                </p>
              </div>
              <div className="p-6 bg-steel-50 rounded-2xl border border-steel-200">
                <div className="inline-block px-3 py-1 bg-steel-400 text-white text-sm font-bold rounded-full mb-4">
                  Planned
                </div>
                <h3 className="font-display font-bold text-xl text-steel-900 mb-2">
                  Phase 2
                </h3>
                <p className="text-steel-600">
                  Infrastructure and sales phase with site development and
                  utility installation
                </p>
              </div>
              <div className="p-6 bg-steel-50 rounded-2xl border border-steel-200">
                <div className="inline-block px-3 py-1 bg-steel-400 text-white text-sm font-bold rounded-full mb-4">
                  Planned
                </div>
                <h3 className="font-display font-bold text-xl text-steel-900 mb-2">
                  Phase 3
                </h3>
                <p className="text-steel-600">
                  Final units completion with remaining 14 villas construction
                  and handover
                </p>
              </div>
            </div>
          </div>
        </section>

        <ProjectCTA
          title="Experience Engineered Living"
          description="Request the brochure and payment plan, or schedule a private viewing to discover Nigeria's most advanced residential development."
        />
      </main>
      <Footer />
    </>
  );
}
