"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap/config";
import { ChevronDown, Search, MessageCircle, Phone, Mail } from "lucide-react";
import Link from "next/link";

const faqCategories = [
  {
    category: "General Information",
    questions: [
      {
        question: "What is modular construction?",
        answer:
          "Modular construction is an innovative building method where structures are built using prefabricated modules manufactured in a controlled factory environment. These modules are then transported to the construction site and assembled. This approach offers significant advantages in speed, quality control, and cost efficiency compared to traditional construction methods.",
      },
      {
        question: "Why choose PristiqBuild over traditional construction companies?",
        answer:
          "PristiqBuild offers several key advantages: 50-60% faster construction time, superior quality control through factory manufacturing, reduced material waste by up to 75%, precise engineering with Light Steel Gauge technology, integration of AR/VR for project visualization, and smart building capabilities. Our modular approach also means fewer weather delays and more predictable timelines.",
      },
      {
        question: "What types of projects does PristiqBuild handle?",
        answer:
          "We handle a wide range of projects including residential homes (single-family and multi-family), commercial buildings, industrial facilities, educational institutions, healthcare facilities, and mixed-use developments. From small roofing projects to large-scale estates, we have the expertise and capacity to deliver.",
      },
    ],
  },
  {
    category: "Light Steel Gauge (LGS)",
    questions: [
      {
        question: "What is Light Steel Gauge framing?",
        answer:
          "Light Steel Gauge (LGS) framing uses precision-engineered cold-formed steel sections as the structural framework for buildings. Unlike traditional timber or heavy steel, LGS offers superior strength-to-weight ratio, dimensional stability, termite resistance, and fire resistance. All components are manufactured to exact specifications in our facility.",
      },
      {
        question: "Is LGS construction safe and durable?",
        answer:
          "Absolutely! LGS structures meet and exceed all Nigerian building codes and international standards. Steel doesn't warp, twist, or shrink like wood, ensuring long-term structural integrity. LGS buildings are highly resistant to earthquakes, termites, rot, and fire. When properly designed and installed, they can last 100+ years with minimal maintenance.",
      },
      {
        question: "How does LGS compare to traditional timber framing?",
        answer:
          "LGS offers numerous advantages over timber: superior strength and durability, resistance to termites and rot, non-combustible (fire-resistant), dimensionally stable (no warping or twisting), faster installation (60% quicker), reduced waste, consistent quality, and better suited for Nigeria's climate. While initial material cost may be slightly higher, the long-term benefits far outweigh this.",
      },
    ],
  },
  {
    category: "Project Timeline & Process",
    questions: [
      {
        question: "How long does a typical project take?",
        answer:
          "Timeline varies by project scope, but modular construction is significantly faster than traditional methods. A typical residential home can be completed in 3-6 months (vs 12-18 months traditionally). Commercial projects of 5,000 sqm can be completed in 6-12 months. Roofing projects typically take 1-4 weeks. We provide detailed timelines during initial consultation.",
      },
      {
        question: "What is the construction process like?",
        answer:
          "Our process includes: 1) Initial Consultation & Site Assessment, 2) Design & Engineering (with AR/VR visualization), 3) Permit Acquisition, 4) Factory Manufacturing of modules, 5) Foundation preparation (concurrent with manufacturing), 6) Module transport and assembly on-site, 7) Final connections and finishing, 8) Quality inspection and handover. We keep clients informed at every stage.",
      },
      {
        question: "Can I make changes during construction?",
        answer:
          "Changes are easiest during the design phase before manufacturing begins. Once modules are in production, modifications become more complex and may affect timeline and cost. However, we build flexibility into our process where possible. We encourage thorough design review using our AR/VR visualization tools to finalize all details upfront.",
      },
    ],
  },
  {
    category: "Cost & Financing",
    questions: [
      {
        question: "Is modular construction more expensive?",
        answer:
          "Modular construction is typically more cost-effective overall. While per-square-meter costs may be comparable to high-quality traditional construction, you save significantly on: reduced construction time (lower financing costs), minimal waste, predictable pricing (fewer surprises), reduced labor costs, and earlier occupancy (start generating returns sooner). We provide transparent, detailed quotes for every project.",
      },
      {
        question: "Do you offer financing options?",
        answer:
          "We work with several financial institutions that understand modular construction and can offer favorable financing terms. We can connect you with our banking partners and help prepare documentation to support your financing application. Payment is typically structured in milestones aligned with project phases.",
      },
      {
        question: "What's included in your pricing?",
        answer:
          "Our comprehensive quotes include: architectural and engineering design, manufacturing of all structural components, transportation to site, assembly and installation, structural connections, specified finishes, project management, and quality assurance. We provide itemized breakdowns so you understand exactly what you're paying for. Additional items like land preparation, utilities connection, and certain premium finishes are quoted separately.",
      },
    ],
  },
  {
    category: "Technology & Innovation",
    questions: [
      {
        question: "What is AR/VR visualization and how does it help?",
        answer:
          "Our Augmented Reality (AR) and Virtual Reality (VR) solutions let you experience your building before construction begins. Walk through rooms, see finishes, test layouts, and make informed decisions. This technology eliminates surprises, reduces change orders, and ensures you're completely satisfied with the design before we start building. It's like a test drive for your building!",
      },
      {
        question: "What are smart building features?",
        answer:
          "Our smart building integration includes: automated climate control, intelligent lighting systems, security and access control, energy monitoring and management, water leak detection, integrated home automation, and IoT-ready infrastructure. These features can be customized based on your needs and budget, making your building more efficient, secure, and comfortable.",
      },
      {
        question: "How do you ensure quality in factory manufacturing?",
        answer:
          "Our controlled factory environment enables rigorous quality control impossible on traditional construction sites. Every component undergoes: precision cutting with CNC machinery, quality inspection at multiple stages, testing for structural integrity, protection from weather during manufacturing, and detailed documentation. This results in superior quality and consistency across all projects.",
      },
    ],
  },
  {
    category: "Sustainability & Environment",
    questions: [
      {
        question: "How sustainable is modular construction?",
        answer:
          "Modular construction is significantly more sustainable: 75% less material waste, reduced energy consumption during construction, steel is 100% recyclable, minimal site disturbance, opportunity for incorporating solar power and rainwater harvesting, better insulation = lower operational energy use, and precision manufacturing reduces errors and waste. We're committed to building Nigeria's future responsibly.",
      },
      {
        question: "Can you incorporate renewable energy?",
        answer:
          "Yes! We regularly integrate solar power systems, rainwater harvesting, energy-efficient HVAC systems, LED lighting, and other sustainable features. Our design team can help you maximize energy efficiency and reduce environmental impact while staying within budget. Many clients achieve significant long-term savings through these investments.",
      },
    ],
  },
  {
    category: "Maintenance & Support",
    questions: [
      {
        question: "What warranty do you provide?",
        answer:
          "We provide comprehensive warranties covering: structural framework (10 years), waterproofing (5 years), workmanship (2 years), and manufacturer warranties on specific components (varies by product). We also offer extended warranty packages and maintenance agreements for added peace of mind.",
      },
      {
        question: "Do you provide post-construction support?",
        answer:
          "Absolutely! We provide: detailed maintenance guidelines, technical support, inspection services, warranty service, expansion/modification consulting, and priority service for existing clients. We view our relationship with clients as long-term partnerships, not just transactions.",
      },
    ],
  },
];

export default function FAQPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [openQuestions, setOpenQuestions] = useState<Set<string>>(new Set());
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const sections = gsap.utils.toArray<HTMLElement>(".fade-in-section");
      sections.forEach((section) => {
        gsap.from(section, {
          opacity: 0,
          y: 60,
          duration: 1,
          scrollTrigger: {
            trigger: section,
            start: "top 85%",
            end: "top 50%",
            scrub: 1,
          },
        });
      });
    },
    { scope: containerRef }
  );

  const toggleQuestion = (categoryIndex: number, questionIndex: number) => {
    const key = `${categoryIndex}-${questionIndex}`;
    const newOpenQuestions = new Set(openQuestions);
    if (newOpenQuestions.has(key)) {
      newOpenQuestions.delete(key);
    } else {
      newOpenQuestions.add(key);
    }
    setOpenQuestions(newOpenQuestions);
  };

  const filteredCategories = faqCategories
    .map((cat) => ({
      ...cat,
      questions: cat.questions.filter(
        (q) =>
          q.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
          q.answer.toLowerCase().includes(searchQuery.toLowerCase())
      ),
    }))
    .filter((cat) => cat.questions.length > 0);

  return (
    <div ref={containerRef} className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative min-h-[50vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-primary-900 via-primary-800 to-primary-700">
        <div className="absolute inset-0 opacity-10">
          <div className="grid-pattern absolute inset-0" />
        </div>

        <div className="container-custom relative z-10 py-32 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="heading-xl text-white mb-6">
              Frequently Asked
              <br />
              <span className="text-secondary-400">Questions</span>
            </h1>
            <p className="body-lg text-white/90 max-w-2xl mx-auto mb-8">
              Find answers to common questions about modular construction, our
              process, and how PristiqBuild can bring your project to life.
            </p>

            {/* Search Bar */}
            <div className="max-w-2xl mx-auto">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-steel-400" size={20} />
                <input
                  type="text"
                  placeholder="Search for answers..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 rounded-lg bg-white text-steel-900 placeholder-steel-400 focus:outline-none focus:ring-2 focus:ring-secondary-400"
                />
              </div>
            </div>
          </motion.div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent" />
      </section>

      {/* FAQ Content */}
      <section className="section-padding bg-white">
        <div className="container-custom max-w-5xl">
          {filteredCategories.map((category, catIndex) => (
            <div key={category.category} className="mb-12 fade-in-section">
              <button
                onClick={() =>
                  setActiveCategory(
                    activeCategory === category.category
                      ? null
                      : category.category
                  )
                }
                className="w-full text-left mb-6 group"
              >
                <h2 className="heading-md text-primary-900 flex items-center justify-between">
                  {category.category}
                  <ChevronDown
                    className={`transition-transform text-primary-600 ${
                      activeCategory === category.category ? "rotate-180" : ""
                    }`}
                    size={28}
                  />
                </h2>
                <div className="h-1 bg-primary-100 mt-4 rounded-full overflow-hidden">
                  <div className="h-full bg-primary-600 w-24 rounded-full" />
                </div>
              </button>

              <AnimatePresence>
                {(activeCategory === category.category ||
                  activeCategory === null) && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="space-y-4"
                  >
                    {category.questions.map((faq, qIndex) => {
                      const key = `${catIndex}-${qIndex}`;
                      const isOpen = openQuestions.has(key);

                      return (
                        <div
                          key={qIndex}
                          className="bg-white border border-steel-200 rounded-xl overflow-hidden hover:border-primary-300 transition-colors"
                        >
                          <button
                            onClick={() => toggleQuestion(catIndex, qIndex)}
                            className="w-full px-6 py-5 text-left flex items-start justify-between gap-4 hover:bg-steel-50 transition-colors"
                          >
                            <span className="font-semibold text-steel-900 flex-1">
                              {faq.question}
                            </span>
                            <ChevronDown
                              className={`flex-shrink-0 text-primary-600 transition-transform mt-1 ${
                                isOpen ? "rotate-180" : ""
                              }`}
                              size={20}
                            />
                          </button>

                          <AnimatePresence>
                            {isOpen && (
                              <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: "auto" }}
                                exit={{ opacity: 0, height: 0 }}
                                transition={{ duration: 0.2 }}
                              >
                                <div className="px-6 pb-5 text-steel-700 leading-relaxed">
                                  {faq.answer}
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      );
                    })}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}

          {filteredCategories.length === 0 && (
            <div className="text-center py-16">
              <MessageCircle className="w-16 h-16 text-steel-300 mx-auto mb-4" />
              <p className="text-steel-600 text-lg">
                No questions found matching &quot;{searchQuery}&quot;
              </p>
              <p className="text-steel-500 mt-2">
                Try a different search term or contact us directly.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Still Have Questions CTA */}
      <section className="section-padding bg-steel-50 fade-in-section">
        <div className="container-custom">
          <div className="bg-gradient-to-r from-primary-700 to-primary-900 rounded-3xl p-12 md:p-16 text-center text-white">
            <h2 className="heading-lg mb-6">Still Have Questions?</h2>
            <p className="body-lg text-white/90 mb-8 max-w-2xl mx-auto">
              Our team is here to help! Reach out and we&apos;ll provide
              personalized answers to your specific questions.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="tel:+2348130272706"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-primary-700 rounded-lg font-semibold hover:bg-steel-50 transition-colors"
              >
                <Phone size={20} />
                Call Us Now
              </Link>
              <Link
                href="mailto:info@pristiqbuild.com"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/10 backdrop-blur-sm text-white rounded-lg font-semibold hover:bg-white/20 transition-colors"
              >
                <Mail size={20} />
                Email Us
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
