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
  Ruler,
  Scale,
  Users,
  Recycle,
  Shield,
  Factory,
  Wrench,
  Clock,
} from "lucide-react";

const stats = [
  {
    icon: Ruler,
    value: "1,080 sqm",
    label: "Total Roof Area",
    sublabel: "Main building + BQ",
  },
  {
    icon: Scale,
    value: "6.8 tons",
    label: "Steel Weight",
    sublabel: "Precision engineered",
  },
  {
    icon: Users,
    value: "5 Person",
    label: "Installation Team",
    sublabel: "Specialized crew",
  },
  {
    icon: Recycle,
    value: "75%",
    label: "Waste Reduction",
    sublabel: "Environmental efficiency",
  },
];

const features = [
  {
    icon: Factory,
    title: "Precision Manufacturing",
    description:
      "960 C channels and 980 purlins precision cut and fabricated in our controlled facility, ensuring exact specifications and consistent quality across all components.",
  },
  {
    icon: Shield,
    title: "Superior Corrosion Protection",
    description:
      "High grade zinc and aluminium coatings provide comprehensive protection against rust and corrosion, essential for long term performance in Nigeria's varied climate.",
  },
  {
    icon: Wrench,
    title: "Complex Structural Design",
    description:
      "The main building features a 7 meter span at the king post, requiring intricate structural calculations to ensure strength without excess weight.",
  },
  {
    icon: Scale,
    title: "G550 Steel Grade",
    description:
      "Using 0.9mm G550 cold formed galvanized steel for C channels and 0.75mm for purlins delivers optimal strength to weight ratio for large span applications.",
  },
  {
    icon: Recycle,
    title: "Environmental Efficiency",
    description:
      "Our in house cutting and assembly techniques achieved 75% waste reduction compared to traditional methods, delivering both environmental and cost benefits.",
  },
  {
    icon: Clock,
    title: "Record Timeline",
    description:
      "Despite the project's complexity and scale, the structure was completed safely and within schedule through meticulous planning and execution.",
  },
];

const contentSections = [
  {
    title: "A Showcase of Large Scale LGS Excellence",
    content:
      "The Akure project stands as one of Pristiq Build's largest and most technically challenging roofing works, located in the serene heart of Ondo State. Commissioned by a Nigerian client living abroad, the project involved delivering a massive castle style residence and its adjoining boys' quarters with a combined roof area exceeding 1,080 square meters. This ambitious project required precision engineering, innovative construction techniques, and meticulous attention to detail to deliver a roofing system that would stand the test of time.",
    image: "/osun/osun1.jpg",
    imageAlt: "Akure castle style residence with LGS roofing",
    imagePosition: "right" as const,
  },
  {
    title: "Scope of Work",
    content:
      "Our mission was to replace traditional roofing materials with a fully engineered Light Gauge Steel roof frame, offering unmatched durability, precision, and speed of installation. The main building, with a span of 7 meters at its king post, required intricate structural design to ensure strength without excess weight. The boys' quarters, with a 3 meter span, were constructed simultaneously to maintain design continuity and project efficiency.",
    image: "/osun/osun2.jpg",
    imageAlt: "LGS framework installation progress",
    imagePosition: "left" as const,
    highlights: [
      "960 C channels (0.9mm, G550 steel)",
      "980 purlins (0.75mm)",
      "High grade zinc and aluminium coatings for corrosion resistance",
      "Total material weight approximately 6.8 tons of precision engineered steel",
    ],
  },
  {
    title: "Precision Execution",
    content:
      "Our skilled 5 person team completed the project efficiently, with meticulous attention to alignment, spacing, and load distribution. Through our in house cutting and assembly techniques, we reduced waste by 75%, achieving both environmental and cost efficiency. Despite the project's complexity, the structure was completed safely and within schedule, a reflection of our commitment to innovation, precision, and sustainability.",
    image: "/osun/osun3.jpg",
    imageAlt: "Steel framework installation detail",
    imagePosition: "right" as const,
  },
];

const galleryImages = [
  {
    src: "/osun/osun1.jpg",
    alt: "Castle style residence overview",
    caption: "Massive castle style residence with LGS roofing system",
  },
  {
    src: "/osun/osun2.jpg",
    alt: "Main building structure",
    caption: "Main building with 7 meter span at king post",
  },
  {
    src: "/osun/osun3.jpg",
    alt: "LGS installation in progress",
    caption: "Precision installation of steel framework",
  },
  {
    src: "/osun/osun4.jpg",
    alt: "Steel framework detail",
    caption: "Close up view of truss connections",
  },
  {
    src: "/osun/osun6.jpg",
    alt: "Boys quarters roofing",
    caption: "Boys quarters with 3 meter span design",
  },
  {
    src: "/osun/osun7.jpg",
    alt: "Completed structure",
    caption: "Completed roofing structure",
  },
];

const highlights = [
  { label: "Location", value: "Akure, Ondo State" },
  { label: "Roof Type", value: "Light Gauge Steel Truss System" },
  { label: "Area", value: "1,080 sqm (Main + BQ)" },
  { label: "Duration", value: "Completed in record time" },
  { label: "Waste Reduction", value: "75%" },
  { label: "Client Type", value: "Nigerian in Diaspora" },
  { label: "Material Weight", value: "6.8 tons of steel" },
  { label: "Status", value: "Completed" },
];

export default function AkureProject() {
  return (
    <>
      <Navigation />
      <main id="main-content">
        <ProjectHero
          title="Akure Castle Style Residence"
          subtitle="One of Pristiq Build's largest and most technically challenging roofing projects, delivering over 1,080 square meters of precision engineered Light Gauge Steel roofing."
          location="Akure, Ondo State"
          duration="Record Time"
          area="1,080 sqm"
          status="Completed"
          heroImage="/osun/osun1.jpg"
          category="Large Scale Roofing"
        />

        <ProjectStats stats={stats} />

        <ProjectContent sections={contentSections} />

        <ProjectFeatures
          title="Technical Excellence"
          subtitle="Engineering Precision"
          features={features}
        />

        {/* Key Highlights Grid */}
        <section className="py-20 bg-steel-900 text-white">
          <div className="container-custom">
            <div className="text-center mb-12">
              <span className="inline-block mb-4 text-secondary-400 font-semibold tracking-wider uppercase text-sm">
                Project Specifications
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
                Project Outcome
              </span>
              <h2 className="heading-lg text-steel-900">
                Exceptional Results
              </h2>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
              <div className="p-6 bg-gradient-to-br from-primary-50 to-primary-100 rounded-2xl border border-primary-200 text-center">
                <div className="text-3xl font-display font-bold text-primary-700 mb-2">
                  Architecturally Striking
                </div>
                <p className="text-steel-600">
                  A final structure that sets a new standard for modern steel
                  roofing in Nigeria
                </p>
              </div>
              <div className="p-6 bg-gradient-to-br from-secondary-50 to-secondary-100 rounded-2xl border border-secondary-200 text-center">
                <div className="text-3xl font-display font-bold text-secondary-700 mb-2">
                  Lifetime Durability
                </div>
                <p className="text-steel-600">
                  Long term strength, beauty, and value through advanced LGS
                  technology
                </p>
              </div>
              <div className="p-6 bg-gradient-to-br from-green-50 to-green-100 rounded-2xl border border-green-200 text-center">
                <div className="text-3xl font-display font-bold text-green-700 mb-2">
                  75% Waste Reduction
                </div>
                <p className="text-steel-600">
                  Environmental and cost efficiency through innovative
                  construction techniques
                </p>
              </div>
              <div className="p-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl border border-blue-200 text-center">
                <div className="text-3xl font-display font-bold text-blue-700 mb-2">
                  On Schedule
                </div>
                <p className="text-steel-600">
                  Completed efficiently within schedule despite project
                  complexity
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Client Story */}
        <section className="py-20 bg-gradient-to-b from-steel-50 to-white">
          <div className="container-custom">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <span className="eyebrow inline-block mb-4 text-secondary-600 font-semibold tracking-wider uppercase text-sm">
                  Client Story
                </span>
                <h2 className="heading-lg text-steel-900">
                  Building Dreams from Abroad
                </h2>
              </div>
              <div className="p-8 bg-white rounded-2xl shadow-xl border border-steel-100">
                <p className="text-lg text-steel-600 leading-relaxed mb-6">
                  This project was commissioned by a Nigerian client living in
                  the diaspora who envisioned a lifetime roof for their castle
                  style dream home. Despite the distance, our transparent
                  communication, regular updates, and professional execution
                  ensured their vision was realized exactly as planned.
                </p>
                <p className="text-lg text-steel-600 leading-relaxed">
                  The client's vision of a lifetime roof was realized through
                  Pristiq Build's advanced LGS technology, ensuring long term
                  strength, beauty, and value. This project showcases our
                  ability to handle large scale roofing systems with unmatched
                  technical precision, blending innovation, sustainability, and
                  craftsmanship to deliver results that last a lifetime.
                </p>
              </div>
            </div>
          </div>
        </section>

        <ProjectCTA
          title="Ready for Your Large Scale Roofing Project?"
          description="Whether you are building a castle style residence or need a robust roofing solution for any large project, Pristiq Build has the expertise to bring your vision to life with precision and efficiency."
        />
      </main>
      <Footer />
    </>
  );
}
