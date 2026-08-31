"use client";

import { useState, useRef } from "react";
import { faqCategories } from "@/content/faq";
import { motion, AnimatePresence } from "framer-motion";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap/config";
import { ChevronDown, Search, MessageCircle, Phone, Mail } from "lucide-react";
import Link from "next/link";


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
      <section className="relative min-h-[50vh] flex items-center justify-center overflow-hidden bg-linear-to-br from-primary-900 via-primary-800 to-primary-700">
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
                  placeholder="Search for answers…"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 rounded-lg bg-white text-steel-900 placeholder-steel-400 focus:outline-none focus:ring-2 focus:ring-secondary-400"
                />
              </div>
            </div>
          </motion.div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-32 bg-linear-to-t from-white to-transparent" />
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
                          className="bg-white border border-steel-200 rounded-2xl overflow-hidden hover:border-primary-300 transition-colors"
                        >
                          <button
                            onClick={() => toggleQuestion(catIndex, qIndex)}
                            className="w-full px-6 py-5 text-left flex items-start justify-between gap-4 hover:bg-steel-50 transition-colors"
                          >
                            <span className="font-semibold text-steel-900 flex-1">
                              {faq.question}
                            </span>
                            <ChevronDown
                              className={`shrink-0 text-primary-600 transition-transform mt-1 ${
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
          <div className="bg-linear-to-r from-primary-700 to-primary-900 rounded-2xl p-12 md:p-16 text-center text-white">
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
