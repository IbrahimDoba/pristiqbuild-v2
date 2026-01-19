"use client";

import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import {
  Building2,
  Layers,
  Glasses,
  LayoutGrid,
  Leaf,
  Cpu,
  Home,
  Building,
  Users,
  Wrench,
  ArrowRight,
  ChevronRight,
} from "lucide-react";

const services = [
  {
    icon: Building2,
    title: "Modular Construction",
    shortDesc: "Factory-built precision modules",
    description:
      "Our flagship service delivers factory-built precision modules that reduce construction time by 30-50% while maintaining superior quality. Each module is crafted with meticulous attention to detail in our controlled environment.",
    features: [
      "30-50% faster delivery",
      "Factory quality control",
      "Weather-independent production",
      "Reduced on-site waste",
    ],
    image: "/services/modular.jpg",
    color: "primary",
  },
  {
    icon: Layers,
    title: "Light Steel Gauge Construction",
    shortDesc: "Strong, sustainable steel framing",
    description:
      "Utilizing advanced light steel gauge technology for durable, eco-friendly structures. Our steel framing systems offer superior strength-to-weight ratios and complete design flexibility.",
    features: [
      "Corrosion resistant",
      "100% recyclable materials",
      "Termite & pest proof",
      "Precise engineering",
    ],
    image: "/services/steel.jpg",
    color: "steel",
  },
  {
    icon: Glasses,
    title: "AR/VR for Construction",
    shortDesc: "Immersive design visualization",
    description:
      "Experience your project before it's built with our cutting-edge AR/VR technology. Walk through virtual models, make real-time modifications, and visualize every detail.",
    features: [
      "Virtual walkthroughs",
      "Real-time modifications",
      "Client collaboration",
      "Design validation",
    ],
    image: "/services/vr.jpg",
    color: "secondary",
  },
  {
    icon: LayoutGrid,
    title: "2D Panelization",
    shortDesc: "Optimized panel manufacturing",
    description:
      "Advanced 2D panelization technology for efficient wall and floor systems. Our precision-engineered panels ensure perfect fit and rapid assembly on-site.",
    features: [
      "CNC precision cutting",
      "Optimal material usage",
      "Quick installation",
      "Consistent quality",
    ],
    image: "/services/panel.jpg",
    color: "primary",
  },
  {
    icon: Leaf,
    title: "Sustainable Design",
    shortDesc: "Eco-friendly building solutions",
    description:
      "Comprehensive sustainable design consulting to minimize environmental impact while maximizing energy efficiency. Green building certification support included.",
    features: [
      "Energy modeling",
      "Green certifications",
      "Material optimization",
      "Carbon footprint reduction",
    ],
    image: "/services/sustainable.jpg",
    color: "green",
  },
  {
    icon: Cpu,
    title: "Smart Building Integration",
    shortDesc: "IoT-enabled intelligent buildings",
    description:
      "Transform your building into an intelligent space with integrated IoT systems, automation, and smart controls for optimal performance and comfort.",
    features: [
      "Building automation",
      "Energy management",
      "Security systems",
      "Remote monitoring",
    ],
    image: "/services/smart.jpg",
    color: "secondary",
  },
  {
    icon: Home,
    title: "Custom Home Building",
    shortDesc: "Personalized residential solutions",
    description:
      "Create your dream home with our custom modular solutions. From design to delivery, we bring your vision to life with precision craftsmanship.",
    features: [
      "Custom designs",
      "Premium finishes",
      "Turnkey delivery",
      "Post-completion support",
    ],
    image: "/services/home.jpg",
    color: "primary",
  },
  {
    icon: Building,
    title: "Commercial Construction",
    shortDesc: "Scalable business structures",
    description:
      "Efficient commercial building solutions for offices, retail spaces, and industrial facilities. Scalable designs that grow with your business.",
    features: [
      "Office complexes",
      "Retail spaces",
      "Industrial facilities",
      "Mixed-use developments",
    ],
    image: "/services/commercial.jpg",
    color: "steel",
  },
  {
    icon: Users,
    title: "Affordable Mass Housing",
    shortDesc: "Quality housing at scale",
    description:
      "Addressing Nigeria's housing deficit with quality affordable housing solutions. Mass production capabilities without compromising on standards.",
    features: [
      "Economies of scale",
      "Rapid deployment",
      "Community planning",
      "Infrastructure integration",
    ],
    image: "/services/housing.jpg",
    color: "secondary",
  },
  {
    icon: Wrench,
    title: "Renovation & Retrofitting",
    shortDesc: "Modernize existing structures",
    description:
      "Breathe new life into existing buildings with our renovation and retrofitting services. Upgrade performance while preserving architectural character.",
    features: [
      "Structural upgrades",
      "Energy retrofits",
      "Space optimization",
      "Code compliance",
    ],
    image: "/services/renovation.jpg",
    color: "primary",
  },
];

const colorClasses = {
  primary: {
    bg: "bg-primary-50",
    text: "text-primary-700",
    border: "border-primary-200",
    gradient: "from-primary-600 to-primary-700",
    hover: "group-hover:bg-primary-100",
  },
  secondary: {
    bg: "bg-secondary-50",
    text: "text-secondary-700",
    border: "border-secondary-200",
    gradient: "from-secondary-500 to-secondary-600",
    hover: "group-hover:bg-secondary-100",
  },
  steel: {
    bg: "bg-steel-100",
    text: "text-steel-700",
    border: "border-steel-200",
    gradient: "from-steel-600 to-steel-700",
    hover: "group-hover:bg-steel-200",
  },
  green: {
    bg: "bg-green-50",
    text: "text-green-700",
    border: "border-green-200",
    gradient: "from-green-500 to-green-600",
    hover: "group-hover:bg-green-100",
  },
};

export default function Services() {
  const [activeService, setActiveService] = useState(0);
  const [hoveredService, setHoveredService] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  const currentService = services[activeService];
  const colors = colorClasses[currentService.color as keyof typeof colorClasses];

  return (
    <section
      id="services"
      ref={containerRef}
      className="section-padding relative bg-steel-50 overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-primary-50 to-transparent opacity-50" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary-100 rounded-full blur-3xl opacity-30" />

      <div className="container-custom relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="eyebrow inline-block mb-4"
          >
            Our Services
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="heading-lg text-steel-900 mb-6"
          >
            Comprehensive{" "}
            <span className="text-gradient">Modular Solutions</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="body-lg text-steel-600"
          >
            From concept to completion, we offer end-to-end construction
            services powered by innovation and technology.
          </motion.p>
        </div>

        {/* Services Grid - Mobile */}
        <div className="lg:hidden grid sm:grid-cols-2 gap-4">
          {services.map((service, index) => {
            const sColors =
              colorClasses[service.color as keyof typeof colorClasses];
            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.1 * index }}
                className="group"
              >
                <div
                  className={`p-6 bg-white rounded-xl border ${sColors.border} hover:shadow-lg transition-all duration-300 h-full`}
                >
                  <div
                    className={`inline-flex items-center justify-center w-12 h-12 rounded-lg bg-gradient-to-br ${sColors.gradient} mb-4`}
                  >
                    <service.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-display font-semibold text-lg text-steel-900 mb-2">
                    {service.title}
                  </h3>
                  <p className="text-sm text-steel-600">{service.shortDesc}</p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Services Interactive - Desktop */}
        <div className="hidden lg:grid lg:grid-cols-12 gap-8">
          {/* Service List */}
          <div className="lg:col-span-5">
            <div className="space-y-2">
              {services.map((service, index) => {
                const sColors =
                  colorClasses[service.color as keyof typeof colorClasses];
                const isActive = activeService === index;
                const isHovered = hoveredService === index;

                return (
                  <motion.button
                    key={service.title}
                    initial={{ opacity: 0, x: -30 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.4, delay: 0.1 * index }}
                    onClick={() => setActiveService(index)}
                    onMouseEnter={() => setHoveredService(index)}
                    onMouseLeave={() => setHoveredService(null)}
                    className={`group w-full text-left p-4 rounded-xl transition-all duration-300 flex items-center gap-4 ${
                      isActive
                        ? `${sColors.bg} ${sColors.border} border-2`
                        : "bg-white border border-transparent hover:border-steel-200"
                    }`}
                  >
                    <div
                      className={`flex-shrink-0 w-12 h-12 rounded-lg flex items-center justify-center transition-all duration-300 ${
                        isActive || isHovered
                          ? `bg-gradient-to-br ${sColors.gradient}`
                          : "bg-steel-100"
                      }`}
                    >
                      <service.icon
                        className={`w-6 h-6 transition-colors duration-300 ${
                          isActive || isHovered
                            ? "text-white"
                            : "text-steel-500"
                        }`}
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3
                        className={`font-display font-semibold transition-colors duration-300 ${
                          isActive ? sColors.text : "text-steel-800"
                        }`}
                      >
                        {service.title}
                      </h3>
                      <p className="text-sm text-steel-500 truncate">
                        {service.shortDesc}
                      </p>
                    </div>
                    <ChevronRight
                      className={`w-5 h-5 flex-shrink-0 transition-all duration-300 ${
                        isActive
                          ? `${sColors.text} translate-x-1`
                          : "text-steel-400"
                      }`}
                    />
                  </motion.button>
                );
              })}
            </div>
          </div>

          {/* Service Detail */}
          <div className="lg:col-span-7">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeService}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="sticky top-32"
              >
                <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                  {/* Image Placeholder */}
                  <div
                    className={`h-64 bg-gradient-to-br ${colors.gradient} relative overflow-hidden`}
                  >
                    <div className="absolute inset-0 flex items-center justify-center">
                      <currentService.icon className="w-32 h-32 text-white/20" />
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent" />
                  </div>

                  {/* Content */}
                  <div className="p-8 -mt-16 relative z-10">
                    <div
                      className={`inline-flex items-center justify-center w-16 h-16 rounded-xl bg-gradient-to-br ${colors.gradient} shadow-lg mb-6`}
                    >
                      <currentService.icon className="w-8 h-8 text-white" />
                    </div>

                    <h3 className="heading-md text-steel-900 mb-4">
                      {currentService.title}
                    </h3>
                    <p className="body-md text-steel-600 mb-6">
                      {currentService.description}
                    </p>

                    {/* Features */}
                    <div className="grid grid-cols-2 gap-3 mb-8">
                      {currentService.features.map((feature, i) => (
                        <div
                          key={i}
                          className={`flex items-center gap-2 text-sm ${colors.text}`}
                        >
                          <div
                            className={`w-1.5 h-1.5 rounded-full bg-gradient-to-br ${colors.gradient}`}
                          />
                          {feature}
                        </div>
                      ))}
                    </div>

                    {/* CTA */}
                    <motion.a
                      href="#contact"
                      className={`inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-gradient-to-r ${colors.gradient} text-white font-semibold transition-all hover:shadow-lg`}
                      whileHover={{ scale: 1.02, x: 4 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Learn More
                      <ArrowRight className="w-4 h-4" />
                    </motion.a>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
