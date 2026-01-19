"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import {
  Clock,
  Wallet,
  Leaf,
  Shield,
  LayoutGrid,
  TrendingDown,
  Factory,
  Recycle,
} from "lucide-react";

const benefits = [
  {
    icon: Clock,
    title: "Faster Delivery",
    value: "30-50%",
    unit: "faster",
    description: "Reduced construction timeline compared to traditional methods",
  },
  {
    icon: Wallet,
    title: "Cost Effective",
    value: "20-30%",
    unit: "savings",
    description: "Lower overall project costs through efficient manufacturing",
  },
  {
    icon: Leaf,
    title: "Sustainable",
    value: "70%",
    unit: "less waste",
    description: "Minimal construction waste with factory precision",
  },
  {
    icon: Shield,
    title: "Superior Quality",
    value: "100%",
    unit: "inspected",
    description: "Every module undergoes rigorous quality control",
  },
];

const comparison = [
  {
    aspect: "Construction Time",
    traditional: "12-18 months",
    modular: "6-9 months",
    improvement: "50% faster",
  },
  {
    aspect: "Cost Overruns",
    traditional: "15-20% common",
    modular: "Under 5%",
    improvement: "Predictable",
  },
  {
    aspect: "Weather Delays",
    traditional: "Frequent",
    modular: "Minimal",
    improvement: "90% indoor",
  },
  {
    aspect: "Waste Generated",
    traditional: "25-30%",
    modular: "5-10%",
    improvement: "70% reduction",
  },
  {
    aspect: "Quality Control",
    traditional: "Variable",
    modular: "Consistent",
    improvement: "Factory QC",
  },
];

function Counter({
  target,
  suffix = "",
  duration = 2,
}: {
  target: number;
  suffix?: string;
  duration?: number;
}) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;

    let startTime: number;
    let animationFrame: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
      setCount(Math.floor(progress * target));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [isInView, target, duration]);

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
}

export default function WhyModular() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  return (
    <section
      ref={containerRef}
      className="section-padding relative bg-steel-50 overflow-hidden"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0">
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(26, 95, 122, 0.1) 1px, transparent 0)`,
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      <div className="container-custom relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="eyebrow inline-block mb-4"
          >
            The Modular Advantage
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="heading-lg text-steel-900 mb-6"
          >
            Why <span className="text-gradient">Modular Construction</span>?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="body-lg text-steel-600"
          >
            Nigeria faces a housing deficit of over ₦59 trillion. Modular
            construction is the solution — faster, more affordable, and
            sustainable.
          </motion.p>
        </div>

        {/* Statistics Hero */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="bg-gradient-to-r from-primary-700 via-primary-800 to-primary-900 rounded-3xl p-8 md:p-12 mb-16 relative overflow-hidden"
        >
          {/* Background Elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-secondary-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary-500/20 rounded-full blur-3xl" />

          <div className="relative z-10">
            <div className="text-center mb-10">
              <span className="text-secondary-400 font-medium">
                Nigeria&apos;s Construction Industry
              </span>
              <h3 className="heading-md text-white mt-2">
                The Need for Innovation
              </h3>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="text-5xl md:text-6xl font-display font-bold text-white mb-2">
                  ₦<Counter target={59} />T
                </div>
                <div className="text-white/80">Housing Deficit</div>
              </div>
              <div className="text-center">
                <div className="text-5xl md:text-6xl font-display font-bold text-white mb-2">
                  ₦<Counter target={135} />B
                </div>
                <div className="text-white/80">Industry Valuation</div>
              </div>
              <div className="text-center">
                <div className="text-5xl md:text-6xl font-display font-bold text-secondary-400 mb-2">
                  <Counter target={5} suffix="." />
                  <Counter target={58} suffix="%" />
                </div>
                <div className="text-white/80">Annual Growth</div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Benefits Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {benefits.map((benefit, index) => (
            <motion.div
              key={benefit.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.5,
                delay: 0.4 + index * 0.1,
              }}
              className="group"
            >
              <div className="bg-white rounded-2xl p-6 h-full shadow-lg shadow-steel-200/50 border border-steel-100 transition-all duration-500 hover:shadow-xl hover:border-primary-200 hover:-translate-y-2">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary-600 to-primary-700 flex items-center justify-center mb-4 transform transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3">
                  <benefit.icon className="w-7 h-7 text-white" />
                </div>
                <div className="text-3xl font-display font-bold text-primary-700 mb-1">
                  {benefit.value}
                  <span className="text-lg font-normal text-steel-500 ml-1">
                    {benefit.unit}
                  </span>
                </div>
                <h4 className="font-display font-semibold text-steel-900 mb-2">
                  {benefit.title}
                </h4>
                <p className="text-sm text-steel-600">{benefit.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Comparison Table */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="bg-white rounded-2xl shadow-xl overflow-hidden"
        >
          <div className="p-6 md:p-8 border-b border-steel-100">
            <h3 className="heading-sm text-steel-900 text-center">
              Traditional vs Modular Construction
            </h3>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-steel-50">
                  <th className="text-left p-4 font-display font-semibold text-steel-700">
                    Aspect
                  </th>
                  <th className="text-center p-4 font-display font-semibold text-steel-500">
                    Traditional
                  </th>
                  <th className="text-center p-4 font-display font-semibold text-primary-700">
                    Modular
                  </th>
                  <th className="text-center p-4 font-display font-semibold text-secondary-600">
                    Advantage
                  </th>
                </tr>
              </thead>
              <tbody>
                {comparison.map((row, index) => (
                  <tr
                    key={row.aspect}
                    className={`border-b border-steel-100 ${
                      index % 2 === 0 ? "bg-white" : "bg-steel-50/50"
                    }`}
                  >
                    <td className="p-4 font-medium text-steel-900">
                      {row.aspect}
                    </td>
                    <td className="p-4 text-center text-steel-500">
                      {row.traditional}
                    </td>
                    <td className="p-4 text-center text-primary-700 font-medium">
                      {row.modular}
                    </td>
                    <td className="p-4 text-center">
                      <span className="inline-flex items-center gap-1 bg-secondary-100 text-secondary-700 px-3 py-1 rounded-full text-sm font-medium">
                        <TrendingDown className="w-3 h-3" />
                        {row.improvement}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Environmental Impact */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 1 }}
          className="mt-16 grid md:grid-cols-2 gap-8"
        >
          <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-8 border border-green-200">
            <div className="flex items-start gap-4">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center flex-shrink-0">
                <Recycle className="w-7 h-7 text-white" />
              </div>
              <div>
                <h4 className="heading-sm text-green-800 mb-2">
                  Environmental Impact
                </h4>
                <p className="text-green-700 mb-4">
                  Our modular approach significantly reduces environmental impact
                  through:
                </p>
                <ul className="space-y-2">
                  {[
                    "70% reduction in construction waste",
                    "Lower carbon footprint",
                    "Energy-efficient manufacturing",
                    "Recyclable materials",
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-2 text-green-700">
                      <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-primary-50 to-primary-100 rounded-2xl p-8 border border-primary-200">
            <div className="flex items-start gap-4">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary-600 to-primary-700 flex items-center justify-center flex-shrink-0">
                <Factory className="w-7 h-7 text-white" />
              </div>
              <div>
                <h4 className="heading-sm text-primary-800 mb-2">
                  Factory Precision
                </h4>
                <p className="text-primary-700 mb-4">
                  Controlled manufacturing environment ensures:
                </p>
                <ul className="space-y-2">
                  {[
                    "Consistent quality standards",
                    "No weather-related delays",
                    "Precise engineering tolerances",
                    "Efficient material usage",
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-2 text-primary-700">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary-500" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
