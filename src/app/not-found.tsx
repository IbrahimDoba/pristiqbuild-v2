"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap/config";
import { EASINGS } from "@/lib/gsap/easings";
import Link from "next/link";
import { Home, ArrowLeft, Search, HardHat, Mail } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

export default function NotFound() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // Initial states
      gsap.set(".error-code", { opacity: 0, scale: 0.8, y: 50 });
      gsap.set(".error-title", { opacity: 0, y: 30 });
      gsap.set(".error-message", { opacity: 0, y: 20 });
      gsap.set(".error-actions", { opacity: 0, y: 30 });
      gsap.set(".error-illustration", { opacity: 0, scale: 0.9 });
      gsap.set(".suggestions", { opacity: 0, y: 40 });

      // Main timeline
      const tl = gsap.timeline({ delay: 0.2 });

      // 404 animation with bounce
      tl.to(".error-code", {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 1,
        ease: EASINGS.back,
      })
        .to(
          ".error-illustration",
          {
            opacity: 1,
            scale: 1,
            duration: 0.8,
            ease: EASINGS.expo,
          },
          "-=0.5"
        )
        .to(
          ".error-title",
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: EASINGS.expo,
          },
          "-=0.4"
        )
        .to(
          ".error-message",
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: EASINGS.expo,
          },
          "-=0.3"
        )
        .to(
          ".error-actions",
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: EASINGS.back,
          },
          "-=0.3"
        )
        .to(
          ".suggestions",
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: EASINGS.expo,
          },
          "-=0.2"
        );

      // Floating animation for illustration
      gsap.to(".floating-element", {
        y: -15,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut",
      });

      // Rotating gear animation
      gsap.to(".rotating-gear", {
        rotate: 360,
        duration: 20,
        repeat: -1,
        ease: "none",
      });
    },
    { scope: containerRef }
  );

  const suggestedLinks = [
    { name: "Home", href: "/", icon: Home },
    { name: "Our Projects", href: "/#projects", icon: Search },
    { name: "About Us", href: "/about", icon: HardHat },
    { name: "Contact", href: "/contact", icon: Mail },
  ];

  return (
    <>
      <Navigation />
      <main ref={containerRef} className="min-h-screen bg-white">
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
          <div className="absolute top-20 right-0 w-[400px] h-[400px] bg-primary-400/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-secondary-400/10 rounded-full blur-3xl" />

          <div className="container-custom relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              {/* 404 Code */}
              <div className="error-code mb-8">
                <div className="relative inline-block">
                  <span className="text-[120px] sm:text-[180px] md:text-[220px] font-display font-bold leading-none text-gradient select-none">
                    404
                  </span>
                  {/* Decorative elements */}
                  <div className="rotating-gear absolute -top-4 -right-4 sm:-top-6 sm:-right-6 w-12 h-12 sm:w-16 sm:h-16 text-primary-300 opacity-50">
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 15.5A3.5 3.5 0 0 1 8.5 12 3.5 3.5 0 0 1 12 8.5a3.5 3.5 0 0 1 3.5 3.5 3.5 3.5 0 0 1-3.5 3.5m7.43-2.53c.04-.32.07-.64.07-.97 0-.33-.03-.66-.07-1l2.11-1.63c.19-.15.24-.42.12-.64l-2-3.46c-.12-.22-.39-.3-.61-.22l-2.49 1c-.52-.4-1.08-.73-1.69-.98l-.38-2.65C14.46 2.18 14.25 2 14 2h-4c-.25 0-.46.18-.5.42l-.38 2.65c-.61.25-1.17.59-1.69.98l-2.49-1c-.23-.09-.49 0-.61.22l-2 3.46c-.13.22-.07.49.12.64l2.11 1.63c-.04.34-.07.67-.07 1 0 .33.03.66.07.97l-2.11 1.63c-.19.15-.24.42-.12.64l2 3.46c.12.22.39.3.61.22l2.49-1c.52.4 1.08.73 1.69.98l.38 2.65c.04.24.25.42.5.42h4c.25 0 .46-.18.5-.42l.38-2.65c.61-.25 1.17-.59 1.69-.98l2.49 1c.23.09.49 0 .61-.22l2-3.46c.12-.22.07-.49-.12-.64l-2.11-1.63z" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Illustration */}
              <div className="error-illustration mb-10">
                <div className="floating-element inline-block relative">
                  <div className="w-32 h-32 sm:w-40 sm:h-40 rounded-2xl bg-gradient-to-br from-primary-100 to-primary-200 flex items-center justify-center shadow-xl">
                    <HardHat className="w-16 h-16 sm:w-20 sm:h-20 text-primary-700" />
                  </div>
                  {/* Floating particles */}
                  <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-secondary-400 shadow-lg" />
                  <div className="absolute -bottom-3 -left-3 w-4 h-4 rounded-full bg-primary-500 shadow-lg" />
                </div>
              </div>

              {/* Title */}
              <h1 className="error-title heading-lg text-steel-900 mb-4">
                Page Not Found
              </h1>

              {/* Message */}
              <p className="error-message text-lg sm:text-xl text-steel-600 max-w-xl mx-auto mb-10 leading-relaxed">
                Sorry, we could not find the page you are looking for. It might
                have been moved, deleted, or perhaps you mistyped the URL.
              </p>

              {/* Action Buttons */}
              <div className="error-actions flex flex-col sm:flex-row gap-4 justify-center mb-16">
                <Link
                  href="/"
                  className="group inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-primary-700 to-primary-600 text-white font-bold rounded-xl shadow-lg shadow-primary-700/25 hover:shadow-xl hover:from-primary-600 hover:to-primary-500 transition-[color,background-color,border-color,box-shadow,transform] duration-300 hover:-translate-y-0.5"
                >
                  <Home className="w-5 h-5" />
                  Back to Home
                </Link>
                <button
                  onClick={() => window.history.back()}
                  className="group inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-steel-700 font-bold rounded-xl border-2 border-steel-200 hover:border-primary-300 hover:bg-primary-50 transition-colors duration-300"
                >
                  <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                  Go Back
                </button>
              </div>

              {/* Suggestions */}
              <div className="suggestions">
                <p className="text-steel-500 mb-6 font-medium">
                  Or check out these popular pages:
                </p>
                <div className="flex flex-wrap justify-center gap-3 sm:gap-4">
                  {suggestedLinks.map((link) => (
                    <Link
                      key={link.name}
                      href={link.href}
                      className="group inline-flex items-center gap-2 px-5 py-3 bg-steel-50 hover:bg-primary-50 text-steel-700 hover:text-primary-700 rounded-xl border border-steel-200 hover:border-primary-200 transition-colors duration-300"
                    >
                      <link.icon className="w-4 h-4" />
                      <span className="font-medium">{link.name}</span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Help Section */}
        <section className="py-16 bg-gradient-to-b from-steel-50 to-white">
          <div className="container-custom">
            <div className="max-w-3xl mx-auto">
              <div className="bg-white rounded-3xl p-8 sm:p-12 shadow-xl border border-steel-100">
                <div className="text-center mb-8">
                  <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-primary-100 mb-4">
                    <Mail className="w-6 h-6 text-primary-700" />
                  </div>
                  <h2 className="heading-md text-steel-900 mb-2">
                    Need Help Finding Something?
                  </h2>
                  <p className="text-steel-600">
                    Our team is ready to assist you with any questions about our
                    services and projects.
                  </p>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <a
                    href="tel:+2348130272706"
                    className="flex items-center gap-4 p-5 bg-steel-50 rounded-xl hover:bg-primary-50 transition-colors group"
                  >
                    <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center shadow-sm group-hover:shadow-md transition-shadow">
                      <svg
                        className="w-5 h-5 text-primary-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                        />
                      </svg>
                    </div>
                    <div>
                      <div className="text-sm text-steel-500">Call Us</div>
                      <div className="font-semibold text-steel-900">
                        +234 813 027 2706
                      </div>
                    </div>
                  </a>

                  <a
                    href="mailto:info@pristiqbuild.com"
                    className="flex items-center gap-4 p-5 bg-steel-50 rounded-xl hover:bg-primary-50 transition-colors group"
                  >
                    <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center shadow-sm group-hover:shadow-md transition-shadow">
                      <svg
                        className="w-5 h-5 text-primary-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                        />
                      </svg>
                    </div>
                    <div>
                      <div className="text-sm text-steel-500">Email Us</div>
                      <div className="font-semibold text-steel-900">
                        info@pristiqbuild.com
                      </div>
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
