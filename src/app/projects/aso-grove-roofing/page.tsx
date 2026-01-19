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
  Ruler,
  Shield,
  Droplets,
  Thermometer,
  Wrench,
  CheckCircle,
  RefreshCw,
} from "lucide-react";

const stats = [
  {
    icon: Clock,
    value: "72 Hours",
    label: "Completion Time",
    sublabel: "Full replacement",
  },
  {
    icon: Ruler,
    value: "280 sqm",
    label: "Roof Area",
    sublabel: "Total coverage",
  },
  {
    icon: Shield,
    value: "G550",
    label: "Steel Grade",
    sublabel: "Premium galvanized",
  },
  {
    icon: Droplets,
    value: "100%",
    label: "Waterproofed",
    sublabel: "Polyurethane membrane",
  },
];

const features = [
  {
    icon: RefreshCw,
    title: "Complete Roof Transformation",
    description:
      "Full removal of the existing timber truss system and replacement with modern Light Gauge Steel framework, delivering a complete structural upgrade.",
  },
  {
    icon: Shield,
    title: "G550 Galvanized Steel",
    description:
      "Custom designed trusses fabricated from premium G550 grade galvanized steel, offering superior strength and corrosion resistance for decades of performance.",
  },
  {
    icon: Droplets,
    title: "Polyurethane Waterproofing",
    description:
      "Advanced polyurethane membrane applied for superior moisture protection, sealing the structure from water ingress and extending the roof's lifespan significantly.",
  },
  {
    icon: Thermometer,
    title: "Thermal Performance",
    description:
      "Improved insulation properties reduce heat transfer, creating more comfortable interior temperatures while lowering cooling costs year round.",
  },
  {
    icon: Clock,
    title: "Rapid 72 Hour Installation",
    description:
      "Our specialized team completed the entire replacement process in just three days, minimizing disruption to the homeowner and neighborhood.",
  },
  {
    icon: Wrench,
    title: "Precision Engineering",
    description:
      "All connections, alignments, and bracings meet international engineering standards, ensuring long term structural integrity and safety.",
  },
];

const contentSections = [
  {
    title: "A Testament to Innovation Meeting Traditional Needs",
    content:
      "Located in the prestigious Aso Grove Estate in Abuja, this project was a complete roof transformation, replacing an aging wooden truss system with a modern, precision built Light Gauge Steel framework. The client, keen on achieving the best possible roofing solution for long term performance, requested a system that combined beauty, efficiency, and longevity, and that is exactly what Pristiq Build delivered.",
    image: "/maitama/aso1.JPG",
    imageAlt: "Aso Grove Estate residence with new LGS roofing",
    imagePosition: "right" as const,
  },
  {
    title: "Comprehensive Scope of Work",
    content:
      "Our team handled the full roofing solution from removal of the existing timber structure to installation of new steel trusses, waterproofing layers, and roof sheets. The design was engineered to accommodate both durability and aesthetic appeal, ensuring the structure complemented the luxury of Aso Grove's environment.",
    image: "/maitama/aso2.JPG",
    imageAlt: "LGS installation in progress",
    imagePosition: "left" as const,
    highlights: [
      "280 square meters total roof area",
      "Custom designed steel trusses from G550 grade galvanized steel",
      "Polyurethane waterproofing layer for superior moisture protection",
      "High corrosion resistance through zinc and aluminium coatings",
      "Full installation completed in 72 hours",
    ],
  },
  {
    title: "Expert Execution",
    content:
      "The replacement process required precision dismantling of the old roof while maintaining the building's structural integrity. Within three days, our specialized roofing team installed the new Light Gauge Steel truss system, ensuring all connections, alignments, and bracings met international engineering standards. To complete the system, we applied a polyurethane membrane, sealing the structure from water ingress and heat transfer, effectively improving the home's thermal performance and longevity.",
    image: "/maitama/aso3.JPG",
    imageAlt: "Completed roof structure",
    imagePosition: "right" as const,
  },
];

const galleryImages = [
  {
    src: "/maitama/aso1.JPG",
    alt: "Aso Grove Estate exterior with new roofing",
    caption: "Complete roof transformation at Aso Grove Estate",
  },
  {
    src: "/maitama/aso2.JPG",
    alt: "LGS installation process",
    caption: "Precision installation of steel framework",
  },
  {
    src: "/maitama/aso3.JPG",
    alt: "Completed structure detail",
    caption: "Finished roofing structure",
  },
  {
    src: "/maitama/aso4.JPG",
    alt: "Final result",
    caption: "Final result with improved aesthetics",
  },
];

const benefits = [
  {
    title: "Maintenance Free System",
    description:
      "A roofing system that requires minimal upkeep and provides long term reliability",
  },
  {
    title: "Better Thermal Comfort",
    description:
      "Improved insulation and thermal performance for enhanced living comfort",
  },
  {
    title: "Lifetime Durability",
    description:
      "Assurance of long term structural integrity and property value protection",
  },
];

const highlights = [
  { label: "Location", value: "Aso Grove Estate, Abuja" },
  { label: "Project Type", value: "Roof Replacement (Timber to LGS)" },
  { label: "Roof Area", value: "280 sqm" },
  { label: "Duration", value: "72 hours" },
  { label: "Material", value: "G550 Light Gauge Steel" },
  { label: "Special Feature", value: "Polyurethane waterproofing layer" },
  { label: "Client", value: "Private Residence Owner" },
  { label: "Status", value: "Completed" },
];

export default function AsoGroveProject() {
  return (
    <>
      <Navigation />
      <main id="main-content">
        <ProjectHero
          title="Aso Grove Estate Roof Transformation"
          subtitle="A complete roof transformation replacing aging timber with modern Light Gauge Steel, completed in just 72 hours with advanced waterproofing."
          location="Aso Grove Estate, Abuja"
          duration="72 Hours"
          area="280 sqm"
          status="Completed"
          heroImage="/maitama/aso1.JPG"
          category="Roof Replacement"
        />

        <ProjectStats stats={stats} />

        <ProjectContent sections={contentSections} />

        <ProjectFeatures
          title="Project Highlights"
          subtitle="Technical Innovation"
          features={features}
        />

        {/* Key Highlights Grid */}
        <section className="py-20 bg-steel-900 text-white">
          <div className="container-custom">
            <div className="text-center mb-12">
              <span className="inline-block mb-4 text-secondary-400 font-semibold tracking-wider uppercase text-sm">
                Project Details
              </span>
              <h2 className="heading-lg text-white">Key Highlights</h2>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto">
              {highlights.map((item, index) => (
                <div
                  key={index}
                  className="p-5 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10"
                >
                  <div className="text-sm text-white/60 mb-1">{item.label}</div>
                  <div className="text-lg font-display font-bold text-white">
                    {item.value}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <ProjectGallery images={galleryImages} title="Project Gallery" />

        {/* Results Section */}
        <section className="section-padding bg-white">
          <div className="container-custom">
            <div className="text-center mb-12">
              <span className="eyebrow inline-block mb-4 text-secondary-600 font-semibold tracking-wider uppercase text-sm">
                Client Benefits
              </span>
              <h2 className="heading-lg text-steel-900">
                Remarkable Transformation
              </h2>
              <p className="text-xl text-steel-600 max-w-2xl mx-auto mt-4">
                The transformation was remarkable. The residence gained a
                lighter, stronger, and more durable roof with minimal
                environmental waste.
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              {benefits.map((benefit, index) => (
                <div
                  key={index}
                  className="text-center p-8 bg-gradient-to-br from-steel-50 to-white rounded-2xl border border-steel-100 shadow-lg"
                >
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary-600 to-primary-700 flex items-center justify-center mx-auto mb-6 shadow-lg">
                    <CheckCircle className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="font-display font-bold text-xl text-steel-900 mb-3">
                    {benefit.title}
                  </h3>
                  <p className="text-steel-600">{benefit.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Philosophy Section */}
        <section className="py-20 bg-gradient-to-br from-primary-900 via-primary-800 to-primary-900 text-white relative overflow-hidden">
          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: `radial-gradient(circle at 2px 2px, rgba(255,255,255,0.3) 1px, transparent 0)`,
              backgroundSize: "30px 30px",
            }}
          />
          <div className="container-custom relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="heading-lg text-white mb-6">
                Build Smarter. Build Stronger. Build for the Future.
              </h2>
              <p className="text-xl text-white/80 leading-relaxed mb-8">
                At Aso Grove, we showcased how Light Gauge Steel roofing can
                revolutionize renovations, reducing maintenance, improving
                safety, and increasing property value. This project embodies our
                philosophy: Build smarter. Build stronger. Build for the future.
              </p>
              <div className="flex flex-wrap justify-center gap-6">
                <div className="px-6 py-3 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20">
                  <span className="text-secondary-400 font-semibold">
                    Reduced Maintenance
                  </span>
                </div>
                <div className="px-6 py-3 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20">
                  <span className="text-secondary-400 font-semibold">
                    Improved Safety
                  </span>
                </div>
                <div className="px-6 py-3 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20">
                  <span className="text-secondary-400 font-semibold">
                    Increased Property Value
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <ProjectCTA
          title="Ready to Transform Your Roof?"
          description="Whether you are looking to replace an aging timber roof or upgrade to modern Light Gauge Steel construction, Pristiq Build delivers exceptional results with minimal disruption. Contact us today to discuss your roofing needs."
        />
      </main>
      <Footer />
    </>
  );
}
