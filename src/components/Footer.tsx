"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import {
  Phone,
  Mail,
  MapPin,
  Facebook,
  Instagram,
  Linkedin,
  ArrowUp,
} from "lucide-react";
import NewsletterForm from "@/components/forms/NewsletterForm";

const footerLinks = {
  company: [
    { name: "About Us", href: "/about" },
    { name: "Our Team", href: "/team" },
    { name: "Careers", href: "/careers" },
    { name: "News & Blog", href: "/blog" },
  ],
  services: [
    { name: "Modular Construction", href: "/services/modular-construction" },
    { name: "Light Steel Gauge", href: "/services/light-steel-gauge" },
    { name: "AR/VR Solutions", href: "/services/ar-vr-solutions" },
    { name: "Smart Building", href: "/services/smart-building" },
  ],
  resources: [
    { name: "Case Studies", href: "/case-studies" },
    { name: "FAQs", href: "/faq" },
    { name: "Cost Calculator", href: "/cost-calculator" },
    { name: "Contact Us", href: "/contact" },
  ],
};

const socialLinks = [
  { icon: Facebook, href: "https://www.facebook.com/profile.php?id=61565826015488#", label: "Facebook" },
  { icon: Instagram, href: "https://www.instagram.com/pristiqbuild/", label: "Instagram" },
  { icon: Linkedin, href: "https://ng.linkedin.com/company/pristiqbuild", label: "LinkedIn" },
];

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative bg-steel-900 text-white overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, rgba(255,255,255,0.3) 1px, transparent 0)`,
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      {/* Main Footer Content */}
      <div className="relative z-10 container-custom pt-20 pb-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <div className="mb-6">
              <div className="relative h-12 w-48">
                <Image
                  src="/optimized/Pristiq Build whiteText.webp"
                  alt="PristiqBuild Logo"
                  fill
                  className="object-contain object-left"
                />
              </div>
            </div>

            <p className="text-steel-400 mb-6 max-w-sm">
              Building Nigeria&apos;s future, one module at a time. Leading the
              way in high-tech modular construction with precision,
              sustainability, and cutting-edge technology.
            </p>

            {/* Contact Info */}
            <div className="space-y-3">
              <a
                href="tel:+2348130272706"
                className="flex items-center gap-3 text-steel-400 hover:text-white transition-colors"
              >
                <Phone className="w-4 h-4" />
                <span>+234 813 027 2706</span>
              </a>
              <a
                href="mailto:info@pristiqbuild.com"
                className="flex items-center gap-3 text-steel-400 hover:text-white transition-colors"
              >
                <Mail className="w-4 h-4" />
                <span>info@pristiqbuild.com</span>
              </a>
              <div className="flex items-start gap-3 text-steel-400">
                <MapPin className="w-4 h-4 shrink-0 mt-1" />
                <span>
                  Murjanatu House, 1 Zambezi Crescent,
                  <br />
                  Wuse Abuja, Nigeria
                </span>
              </div>
            </div>
          </div>

          {/* Links Columns */}
          <div>
            <h2 className="font-display font-semibold text-lg mb-6">Company</h2>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-steel-400 hover:text-white transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="font-display font-semibold text-lg mb-6">Services</h2>
            <ul className="space-y-3">
              {footerLinks.services.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-steel-400 hover:text-white transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="font-display font-semibold text-lg mb-6">
              Resources
            </h2>
            <ul className="space-y-3">
              {footerLinks.resources.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-steel-400 hover:text-white transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Newsletter */}
        <div className="bg-steel-800/50 rounded-2xl p-6 sm:p-8 mb-12">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
            <div className="text-center lg:text-left w-full lg:w-auto">
              <h2 className="font-display font-semibold text-lg mb-2">
                Stay Updated
              </h2>
              <p className="text-steel-400 text-sm sm:text-base">
                Subscribe to our newsletter for construction insights and
                updates.
              </p>
            </div>
            <NewsletterForm />
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pt-8 border-t border-steel-800">
          {/* Copyright */}
          <p className="text-steel-400 text-sm text-center md:text-left">
            &copy; {new Date().getFullYear()} PristiqBuild. All rights reserved.
          </p>

          {/* Social Links */}
          <div className="flex items-center gap-4">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                aria-label={social.label}
                className="w-10 h-10 rounded-lg bg-steel-800 flex items-center justify-center text-steel-400 hover:bg-primary-600 hover:text-white transition-colors"
              >
                <social.icon className="w-5 h-5" />
              </a>
            ))}
          </div>

          {/* Legal Links */}
          <div className="flex items-center gap-6 text-sm">
            <a
              href="/privacy-policy"
              className="text-steel-400 hover:text-white transition-colors"
            >
              Privacy Policy
            </a>
            <a
              href="/terms-of-service"
              className="text-steel-400 hover:text-white transition-colors"
            >
              Terms of Service
            </a>
          </div>
        </div>
      </div>

      {/* Back to Top Button */}
      <motion.button
        onClick={scrollToTop}
        className="fixed bottom-8 right-8 w-12 h-12 bg-primary-600 hover:bg-primary-700 text-white rounded-full shadow-lg flex items-center justify-center z-50 transition-colors"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        aria-label="Back to top"
      >
        <ArrowUp className="w-5 h-5" />
      </motion.button>
    </footer>
  );
}
