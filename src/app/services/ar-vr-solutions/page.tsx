import type { Metadata } from "next";
import Link from "next/link";
import SafeImage from "@/components/SafeImage";
import {
  Eye,
  Smartphone,
  Glasses,
  Monitor,
  ArrowRight,
  CheckCircle,
  Sparkles,
  Users,
  Lightbulb,
  Target,
  MousePointer2,
  Layers
} from "lucide-react";

export const metadata: Metadata = {
  title: "AR/VR Solutions for Construction | PristiqBuild Nigeria",
  description:
    "Experience your project before it's built. Immersive AR/VR visualization technology for construction planning, design reviews, and client presentations in Nigeria.",
};

const features = [
  {
    icon: Eye,
    title: "Immersive Walkthroughs",
    description: "Walk through your building in virtual reality before construction begins, experiencing every room and space at full scale."
  },
  {
    icon: MousePointer2,
    title: "Interactive Design Changes",
    description: "Make real-time design modifications and see changes instantly, reducing costly on-site alterations."
  },
  {
    icon: Smartphone,
    title: "On-Site AR Visualization",
    description: "Use tablets or phones to overlay your design onto the actual construction site for perfect alignment."
  },
  {
    icon: Users,
    title: "Collaborative Reviews",
    description: "Enable remote stakeholders to experience and approve designs without being physically present."
  },
  {
    icon: Layers,
    title: "Material Visualization",
    description: "See exactly how different materials, colors, and finishes will look before making final selections."
  },
  {
    icon: Target,
    title: "Clash Detection",
    description: "Identify and resolve conflicts between building systems before construction begins."
  }
];

const benefits = [
  {
    stat: "85%",
    label: "Fewer Design Changes",
    description: "Catch issues early when they're easy and cheap to fix"
  },
  {
    stat: "60%",
    label: "Faster Approvals",
    description: "Clients understand and approve designs quickly"
  },
  {
    stat: "40%",
    label: "Reduced Errors",
    description: "Visualize problems before they happen on site"
  },
  {
    stat: "95%",
    label: "Client Satisfaction",
    description: "Clients get exactly what they envisioned"
  }
];

const useCases = [
  {
    title: "Pre-Construction Visualization",
    description: "Experience your building before a single brick is laid",
    image: "https://images.unsplash.com/photo-1622979135225-d2ba269cf1ac?w=800&q=80",
    features: [
      "Virtual reality walkthroughs",
      "360-degree space exploration",
      "Lighting and shadow simulation",
      "Furniture and fixture placement"
    ]
  },
  {
    title: "Client Presentations",
    description: "Wow your clients with immersive presentations",
    image: "https://images.unsplash.com/photo-1593508512255-86ab42a8e620?w=800&q=80",
    features: [
      "Interactive design demonstrations",
      "Real-time customization",
      "Multiple design options comparison",
      "Instant stakeholder feedback"
    ]
  },
  {
    title: "On-Site Construction Aid",
    description: "Augmented reality guidance for construction teams",
    image: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?w=800&q=80",
    features: [
      "AR overlay on actual site",
      "Precise placement guidance",
      "Quality control verification",
      "Progress tracking"
    ]
  },
  {
    title: "Marketing & Sales",
    description: "Sell off-plan properties with immersive experiences",
    image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&q=80",
    features: [
      "Virtual property tours",
      "Customization demonstrations",
      "Remote viewing for investors",
      "Social media content"
    ]
  }
];

const process = [
  {
    step: "01",
    title: "3D Model Creation",
    description: "We convert your architectural drawings into detailed 3D models with accurate dimensions and specifications."
  },
  {
    step: "02",
    title: "Material & Texture Mapping",
    description: "Apply realistic materials, colors, and finishes to create photorealistic visualization."
  },
  {
    step: "03",
    title: "VR Environment Setup",
    description: "Configure the virtual environment with proper lighting, surroundings, and interactive elements."
  },
  {
    step: "04",
    title: "Testing & Refinement",
    description: "Test the experience, gather feedback, and make adjustments for optimal presentation."
  },
  {
    step: "05",
    title: "Delivery & Training",
    description: "Deliver the VR/AR experience with equipment and training for your team."
  }
];

export default function ARVRSolutionsPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative h-[70vh] min-h-[500px] bg-steel-900 overflow-hidden">
        <SafeImage
          src="https://images.unsplash.com/photo-1617802690992-15d93263d3a9?w=2000&q=80"
          alt="Person using VR headset for architectural visualization"
          fill
          className="object-cover opacity-20"
          priority
        />
        <div className="absolute inset-0 bg-linear-to-r from-primary-900/90 to-steel-900/80" />

        {/* Animated grid background */}
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `linear-gradient(to right, rgba(255,255,255,0.1) 1px, transparent 1px),
                                linear-gradient(to bottom, rgba(255,255,255,0.1) 1px, transparent 1px)`,
              backgroundSize: "50px 50px",
            }}
          />
        </div>

        <div className="relative h-full flex items-center">
          <div className="container-custom">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary-600/20 backdrop-blur-sm border border-primary-400/30 rounded-full text-primary-300 mb-6">
                <Sparkles className="w-4 h-4" />
                <span className="text-sm font-semibold">Cutting-Edge Visualization Technology</span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
                AR/VR Solutions for Construction
              </h1>
              <p className="text-xl md:text-2xl text-steel-200 mb-8 leading-relaxed">
                Experience your project before construction begins. Make informed decisions,
                impress clients, and eliminate costly mistakes with immersive visualization.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/contact"
                  className="btn-primary inline-flex items-center justify-center gap-2"
                >
                  Schedule a Demo
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <Link
                  href="/case-studies"
                  className="btn-secondary inline-flex items-center justify-center"
                >
                  View Examples
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Introduction */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-steel-900 mb-6">
                See Your Building Before It Exists
              </h2>
              <div className="space-y-4 text-lg text-steel-700 leading-relaxed">
                <p>
                  <strong>Virtual Reality (VR)</strong> and <strong>Augmented Reality (AR)</strong> are
                  transforming how we plan, present, and construct buildings in Nigeria. No more
                  trying to imagine spaces from 2D drawings, now you can walk through them.
                </p>
                <p>
                  Our AR/VR solutions give you and your clients the power to experience buildings
                  in full scale before breaking ground. Make design decisions with confidence,
                  spot issues early, and ensure everyone&apos;s vision aligns perfectly.
                </p>
                <p>
                  Whether you&apos;re a developer selling off-plan properties, an architect presenting
                  to clients, or a contractor coordinating complex builds, our visualization
                  technology gives you a competitive edge.
                </p>
              </div>

              <div className="mt-8 flex flex-wrap gap-4">
                <div className="flex items-center gap-3 px-6 py-3 bg-primary-50 rounded-lg">
                  <Glasses className="w-6 h-6 text-primary-600" />
                  <span className="font-semibold text-steel-900">VR Headsets</span>
                </div>
                <div className="flex items-center gap-3 px-6 py-3 bg-primary-50 rounded-lg">
                  <Smartphone className="w-6 h-6 text-primary-600" />
                  <span className="font-semibold text-steel-900">Mobile AR</span>
                </div>
                <div className="flex items-center gap-3 px-6 py-3 bg-primary-50 rounded-lg">
                  <Monitor className="w-6 h-6 text-primary-600" />
                  <span className="font-semibold text-steel-900">Desktop 3D</span>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="relative h-[500px] rounded-2xl overflow-hidden shadow-2xl">
                <SafeImage
                  src="https://images.unsplash.com/photo-1622979135225-d2ba269cf1ac?w=800&q=80"
                  alt="Architectural VR visualization"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-linear-to-br from-primary-600 to-primary-700 text-white p-8 rounded-2xl shadow-2xl max-w-xs">
                <Lightbulb className="w-12 h-12 mb-4" />
                <div className="text-2xl font-bold mb-2">Catch Errors Early</div>
                <div className="text-sm text-primary-100">
                  Identify design issues when they cost thousands, not millions
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="section-padding bg-linear-to-b from-gray-50 to-white">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-steel-900 mb-4">
              Powerful Visualization Features
            </h2>
            <p className="text-xl text-steel-600">
              Everything you need to visualize, present, and perfect your construction projects
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-[box-shadow,transform] hover:-translate-y-1 border border-gray-100"
              >
                <div className="w-14 h-14 bg-linear-to-br from-primary-600 to-primary-700 rounded-lg flex items-center justify-center mb-6">
                  <feature.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-bold text-steel-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-steel-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Stats */}
      <section className="section-padding bg-linear-to-r from-primary-600 to-primary-700">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Proven Results
            </h2>
            <p className="text-xl text-primary-100">
              Measurable impact on project success and client satisfaction
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className="text-center p-8 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20"
              >
                <div className="text-5xl md:text-6xl font-bold text-white mb-3">
                  {benefit.stat}
                </div>
                <div className="text-xl font-semibold text-white mb-2">
                  {benefit.label}
                </div>
                <div className="text-primary-100">
                  {benefit.description}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-steel-900 mb-4">
              AR/VR Applications
            </h2>
            <p className="text-xl text-steel-600">
              From design to sales, visualization technology adds value at every stage
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {useCases.map((useCase, index) => (
              <div
                key={index}
                className="bg-linear-to-br from-gray-50 to-white rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-shadow"
              >
                <div className="relative h-64">
                  <SafeImage
                    src={useCase.image}
                    alt={useCase.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/70 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h3 className="text-2xl font-bold text-white mb-2">
                      {useCase.title}
                    </h3>
                    <p className="text-white/90">
                      {useCase.description}
                    </p>
                  </div>
                </div>
                <div className="p-6">
                  <ul className="space-y-3">
                    {useCase.features.map((feature, fIndex) => (
                      <li key={fIndex} className="flex items-center gap-3">
                        <CheckCircle className="w-5 h-5 text-primary-600 shrink-0" />
                        <span className="text-steel-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="section-padding bg-linear-to-b from-gray-50 to-white">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-steel-900 mb-4">
              Our Visualization Process
            </h2>
            <p className="text-xl text-steel-600">
              From architectural plans to immersive experience in 5 steps
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            {process.map((item, index) => (
              <div key={index} className="relative mb-12 last:mb-0">
                {index < process.length - 1 && (
                  <div className="absolute left-8 top-20 w-0.5 h-full bg-linear-to-b from-primary-300 to-transparent hidden md:block" />
                )}

                <div className="flex flex-col md:flex-row gap-6 items-start">
                  <div className="shrink-0 w-16 h-16 bg-linear-to-br from-primary-600 to-primary-700 text-white rounded-lg flex items-center justify-center text-2xl font-bold shadow-lg">
                    {item.step}
                  </div>

                  <div className="flex-1 bg-white p-8 rounded-2xl border-2 border-gray-200">
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

      {/* CTA Section */}
      <section className="section-padding bg-linear-to-r from-primary-600 to-primary-700 text-white">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
              Ready to Experience the Future of Construction?
            </h2>
            <p className="text-xl md:text-2xl text-primary-100 mb-10 leading-relaxed">
              Schedule a demonstration and see how AR/VR technology can transform
              your next project. Visualize it, perfect it, then build it.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link
                href="/contact"
                className="px-10 py-5 bg-white text-primary-600 font-bold rounded-lg hover:bg-gray-50 transition-[color,background-color,border-color,transform] hover:scale-105 shadow-xl inline-flex items-center justify-center gap-3 text-lg"
              >
                <Glasses className="w-6 h-6" />
                Book a Demo
              </Link>
              <Link
                href="/case-studies"
                className="px-10 py-5 bg-primary-800 text-white font-bold rounded-lg hover:bg-primary-900 transition-[color,background-color,border-color,transform] hover:scale-105 border-2 border-primary-400 inline-flex items-center justify-center gap-3 text-lg"
              >
                See Examples
                <ArrowRight className="w-6 h-6" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
