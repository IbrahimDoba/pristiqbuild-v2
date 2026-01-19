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
  Users,
  Shield,
  Zap,
  CheckCircle,
  Factory,
  Wrench,
} from "lucide-react";

const stats = [
  {
    icon: Clock,
    value: "4 Days",
    label: "Completion Time",
    sublabel: "60% faster than timber",
  },
  {
    icon: Ruler,
    value: "288 sqm",
    label: "Roof Area",
    sublabel: "18m x 16m span",
  },
  {
    icon: Users,
    value: "6 Person",
    label: "Installation Crew",
    sublabel: "Specialized team",
  },
  {
    icon: Shield,
    value: "50+ Years",
    label: "Expected Lifespan",
    sublabel: "With proper maintenance",
  },
];

const features = [
  {
    icon: Factory,
    title: "Precision Prefabrication",
    description:
      "All 13 trusses were custom designed and fabricated in our controlled factory environment, ensuring millimeter level accuracy and consistent quality throughout.",
  },
  {
    icon: Shield,
    title: "Rust and Termite Protection",
    description:
      "Zinc coated galvanized steel provides complete protection against rust, corrosion, and termite damage, eliminating common issues found in traditional timber systems.",
  },
  {
    icon: Zap,
    title: "Rapid Installation",
    description:
      "Our modular prefabricated approach enabled installation in just 4 days, compared to 10 to 12 days typically required for timber truss systems.",
  },
  {
    icon: Wrench,
    title: "Clean Assembly Process",
    description:
      "Using precision screw and bolt connections with no welding required, the installation was smooth, clean, and quiet, perfect for the upscale Maitama neighborhood.",
  },
  {
    icon: CheckCircle,
    title: "Cost Effective Solution",
    description:
      "The LGS system delivered over 10% in cost savings when factoring in reduced installation time, minimal material waste, and eliminated maintenance concerns.",
  },
  {
    icon: Ruler,
    title: "Superior Structural Performance",
    description:
      "100mm member sections with precision engineering provide longer spans without sagging, ensuring the roofline remains sleek and structurally sound for decades.",
  },
];

const contentSections = [
  {
    title: "A Statement Home Deserved a Smarter Roof",
    content:
      "Tucked within the serene, tree lined lanes of Colorado Street in Maitama, this high end residential development commissioned by EMBEE Grand Realty was designed to be both elegant and enduring. The mansion features sweeping open plan interiors, large glass panels, and refined detailing. However, the roof spanning 18 meters by 16 meters needed to match the same standard of long term reliability and precision. That is where Pristiq Build came in.",
    image: "/maitama/dji_fly_20250305_140920_676_1741180573389_photo.jpg",
    imageAlt: "Maitama luxury mansion aerial view with LGS roofing",
    imagePosition: "right" as const,
  },
  {
    title: "Why Light Gauge Steel Was the Clear Choice",
    content:
      "Originally planned as a traditional timber truss system, the project team quickly pivoted after encountering concerns around durability, termite resistance, and roof sagging, all too common in Nigeria's climate. Our Light Gauge Steel trusses offered the perfect solution with structural superiority over wood, longer spans without warping, and a fully dry prefabricated system installed in record time.",
    image: "/maitama/WhatsApp Image 2025-09-14 at 16.28.03_af538643.jpg",
    imageAlt: "LGS truss system installation",
    imagePosition: "left" as const,
    highlights: [
      "Structurally superior to wood with longer spans and no warping",
      "Zinc coated steel for rust and termite protection",
      "Fully dry prefabricated system installed in record time",
      "Beautiful, durable roof delivered in just four days",
    ],
  },
  {
    title: "The Technical Edge",
    content:
      "The structure required 13 precision engineered trusses, custom designed and fabricated in house at our LGS facility. Each truss was built using galvanized cold formed steel with 100mm member sections and 1 inch thickness. Our 4 to 6 person crew used automated tools including cutting, drilling, screwing, and bolting machines to install the trusses with millimeter level accuracy. The entire process was smooth, clean, and quiet, perfect for a high end neighborhood like Maitama.",
    image: "/maitama/WhatsApp Image 2025-09-14 at 16.28.32_5ae83e7e.jpg",
    imageAlt: "Close up of steel truss connections",
    imagePosition: "right" as const,
  },
];

const galleryImages = [
  {
    src: "/maitama/dji_fly_20250305_140920_676_1741180573389_photo.jpg",
    alt: "Aerial view of Maitama mansion with LGS roof",
    caption: "Drone view showing the completed roofline",
  },
  {
    src: "/maitama/WhatsApp Image 2025-09-14 at 16.28.03_af538643.jpg",
    alt: "Steel truss installation in progress",
    caption: "Installation process using modular components",
  },
  {
    src: "/maitama/WhatsApp Image 2025-09-14 at 16.28.32_5ae83e7e.jpg",
    alt: "Exterior view of the mansion",
    caption: "Exterior view showing the elegant roofline",
  },
  {
    src: "/maitama/WhatsApp Image 2025-09-14 at 16.28.33_4502dc0c.jpg",
    alt: "Construction detail view",
    caption: "Precision engineered steel framework",
  },
  {
    src: "/maitama/WhatsApp Image 2025-03-05 at 21.30.50_9e47f704.jpg",
    alt: "Project progress view",
    caption: "Construction progress documentation",
  },
  {
    src: "/maitama/WhatsApp Image 2025-03-05 at 21.30.51_6649c305.jpg",
    alt: "Roofing detail",
    caption: "Steel roofing system detail",
  },
];

export default function MaitamaProject() {
  return (
    <>
      <Navigation />
      <main id="main-content">
        <ProjectHero
          title="Maitama Luxury Mansion"
          subtitle="A landmark steel roofing project showcasing precision engineering and rapid installation for one of Abuja's most prestigious residential developments."
          location="Colorado Street, Maitama, Abuja"
          duration="4 Days"
          area="288 sqm"
          status="Completed"
          heroImage="/maitama/dji_fly_20250305_140920_676_1741180573389_photo.jpg"
          category="Residential Roofing"
        />

        <ProjectStats stats={stats} />

        <ProjectContent sections={contentSections} />

        <ProjectFeatures
          title="Project Highlights"
          subtitle="Technical Excellence"
          features={features}
        />

        {/* Client Testimonial */}
        <section className="py-20 bg-gradient-to-b from-steel-50 to-white">
          <div className="container-custom">
            <div className="max-w-4xl mx-auto text-center">
              <div className="w-20 h-1 bg-gradient-to-r from-secondary-500 to-secondary-600 mx-auto mb-8" />
              <blockquote className="text-2xl md:text-3xl font-display text-steel-800 leading-relaxed mb-8">
                &ldquo;The speed and quality of execution exceeded expectations.
                We are glad we made the switch to LGS.&rdquo;
              </blockquote>
              <cite className="text-lg text-steel-600 not-italic">
                <span className="font-semibold text-steel-900">
                  EMBEE Grand Realty
                </span>
                <span className="mx-2">|</span>
                Project Client
              </cite>
            </div>
          </div>
        </section>

        <ProjectGallery images={galleryImages} title="Project Gallery" />

        {/* Before & After Section */}
        <section className="section-padding bg-white">
          <div className="container-custom">
            <div className="text-center mb-12">
              <span className="eyebrow inline-block mb-4 text-secondary-600 font-semibold tracking-wider uppercase text-sm">
                The Transformation
              </span>
              <h2 className="heading-lg text-steel-900">
                Before and After Results
              </h2>
            </div>
            <div className="max-w-3xl mx-auto">
              <p className="text-lg text-steel-600 leading-relaxed text-center">
                The transformation speaks for itself. The original timber
                proposal posed limitations in design and longevity. With Light
                Gauge Steel, the final roofline is sleek, structurally sound,
                and future proof, matching the modern, elevated aesthetics of
                the home it protects. This project demonstrates how LGS
                technology delivers superior results in less time with lasting
                value.
              </p>
            </div>
          </div>
        </section>

        <ProjectCTA
          title="Ready for Your Luxury Roofing Project?"
          description="Whether you are building a premium residence or renovating an existing property, Pristiq Build delivers world class Light Gauge Steel roofing solutions that combine durability, speed, and aesthetic excellence."
        />
      </main>
      <Footer />
    </>
  );
}
