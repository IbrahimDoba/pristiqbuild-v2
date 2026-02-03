"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap/config";
import { EASINGS } from "@/lib/gsap/easings";
import Link from "next/link";
import { Clock, Bell, ArrowLeft, Mail } from "lucide-react";
import Navigation from "./Navigation";
import Footer from "./Footer";

interface ComingSoonProps {
  title: string;
  description?: string;
  eta?: string;
}

export default function ComingSoon({
  title,
  description = "We are working hard to bring you something amazing. Stay tuned for updates!",
  eta = "Coming Soon",
}: ComingSoonProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.set(".cs-icon", { opacity: 0, scale: 0, rotate: -180 });
      gsap.set(".cs-title", { opacity: 0, y: 30 });
      gsap.set(".cs-description", { opacity: 0, y: 20 });
      gsap.set(".cs-eta", { opacity: 0, y: 20 });
      gsap.set(".cs-form", { opacity: 0, y: 30 });
      gsap.set(".cs-actions", { opacity: 0, y: 20 });

      const tl = gsap.timeline({ delay: 0.2 });

      tl.to(".cs-icon", {
        opacity: 1,
        scale: 1,
        rotate: 0,
        duration: 0.8,
        ease: EASINGS.back,
      })
        .to(
          ".cs-title",
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: EASINGS.expo,
          },
          "-=0.4",
        )
        .to(
          ".cs-description",
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: EASINGS.expo,
          },
          "-=0.3",
        )
        .to(
          ".cs-eta",
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            ease: EASINGS.expo,
          },
          "-=0.3",
        )
        .to(
          ".cs-form",
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: EASINGS.expo,
          },
          "-=0.2",
        )
        .to(
          ".cs-actions",
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            ease: EASINGS.expo,
          },
          "-=0.3",
        );

      // Pulsing animation for clock
      gsap.to(".pulse-clock", {
        scale: 1.1,
        duration: 1,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut",
      });
    },
    { scope: containerRef },
  );

  return (
    <>
      <Navigation />
      <main ref={containerRef} className="min-h-screen bg-secondary-50">
        {/* Hero Section */}
        <section className="relative pt-32 pb-20 overflow-hidden">
          {/* Background Pattern */}
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: `
                linear-gradient(rgba(26, 95, 122, 0.1) 1px, transparent 1px),
                linear-gradient(90deg, rgba(26, 95, 122, 0.1) 1px, transparent 1px)
              `,
              backgroundSize: "60px 60px",
            }}
          />

          {/* Decorative Gradient Orbs */}
          <div className="absolute top-20 left-0 w-[400px] h-[400px] bg-secondary-400/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-0 w-[300px] h-[300px] bg-primary-400/10 rounded-full blur-3xl" />

          <div className="container-custom relative z-10">
            <div className="max-w-3xl mx-auto text-center">
              {/* Icon */}
              <div className="cs-icon mb-8">
                <div className="inline-block relative">
                  <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-3xl bg-gradient-to-br from-secondary-100 to-secondary-200 flex items-center justify-center shadow-xl">
                    <Clock className="pulse-clock w-12 h-12 sm:w-16 sm:h-16 text-secondary-600" />
                  </div>
                  {/* Decorative elements */}
                  <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-primary-400 shadow-lg" />
                  <div className="absolute -bottom-3 -left-3 w-6 h-6 rounded-full bg-secondary-500 shadow-lg" />
                </div>
              </div>

              {/* Title */}
              <h1 className="cs-title heading-xl text-steel-900 mb-6">
                {title}
              </h1>

              {/* Description */}
              <p className="cs-description text-lg sm:text-xl text-steel-600 max-w-xl mx-auto mb-8 leading-relaxed">
                {description}
              </p>

              {/* ETA Badge */}
              <div className="cs-eta mb-12">
                <span className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-primary-100 to-primary-200 text-primary-800 rounded-full font-semibold text-lg">
                  <Bell className="w-5 h-5" />
                  {eta}
                </span>
              </div>

              {/* Notification Form */}
              <div className="cs-form max-w-md mx-auto mb-10">
                <p className="text-steel-600 mb-4">
                  Get notified when we launch
                </p>
                <form
                  className="flex flex-col sm:flex-row gap-3"
                  onSubmit={(e) => e.preventDefault()}
                >
                  <div className="relative flex-1">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-steel-400" />
                    <input
                      type="email"
                      placeholder="Enter your email"
                      className="w-full pl-12 pr-4 py-4 bg-steel-50 border border-steel-200 rounded-xl focus:border-primary-500 focus:ring-2 focus:ring-primary-200 outline-none transition-all"
                    />
                  </div>
                  <button
                    type="submit"
                    className="px-6 py-4 bg-gradient-to-r from-primary-700 to-primary-600 text-white font-bold rounded-xl shadow-lg hover:shadow-xl hover:from-primary-600 hover:to-primary-500 transition-all duration-300 whitespace-nowrap"
                  >
                    Notify Me
                  </button>
                </form>
              </div>

              {/* Back Button */}
              <div className="cs-actions">
                <Link
                  href="/"
                  className="inline-flex items-center gap-2 text-steel-600 hover:text-primary-700 font-medium transition-colors group"
                >
                  <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                  Back to Homepage
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Features Preview Section */}
        <section className="py-16 bg-gradient-to-b from-steel-50 to-white">
          <div className="container-custom">
            <div className="text-center mb-12">
              <span className="eyebrow inline-block mb-4 text-secondary-600">
                What to Expect
              </span>
              <h2 className="heading-md text-steel-900">
                Exciting Things Are Coming
              </h2>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
              {[
                {
                  title: "Regular Updates",
                  description:
                    "Stay informed with our progress and new feature announcements",
                  icon: "📢",
                },
                {
                  title: "Exclusive Content",
                  description:
                    "Access to detailed case studies, insights, and behind-the-scenes content",
                  icon: "🎯",
                },
                {
                  title: "Early Access",
                  description:
                    "Be the first to explore new features and services when they launch",
                  icon: "🚀",
                },
              ].map((feature, index) => (
                <div
                  key={index}
                  className="p-6 bg-white rounded-2xl border border-steel-100 shadow-lg hover:shadow-xl hover:border-primary-200 transition-all duration-300 text-center"
                >
                  <div className="text-4xl mb-4">{feature.icon}</div>
                  <h3 className="font-display font-bold text-lg text-steel-900 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-steel-600 text-sm">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
