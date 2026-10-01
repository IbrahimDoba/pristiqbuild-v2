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
  MessageCircle,
} from "lucide-react";
import Link from "next/link";
import NewsletterForm from "@/components/forms/NewsletterForm";
import {
  PHONE_HREF,
  PHONE_DISPLAY,
  EMAIL,
  LOCATION,
  WA,
  whatsappLink,
} from "@/lib/site-config";

/** Same destinations as the header, per the brief's section 3. */
const footerLinks = {
  company: [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Projects", href: "/projects" },
    { name: "Insights", href: "/blog" },
    { name: "Careers", href: "/careers" },
  ],
  services: [
    { name: "LGS Roofing", href: "/services/lgs-roofing" },
    { name: "Modular Construction", href: "/services/modular-construction" },
  ],
  developments: [
    { name: "Opulence Heights", href: "/projects/opulence-heights" },
    { name: "Breeze Point Estate", href: "/projects/breeze-point-estate" },
  ],
  resources: [
    { name: "FAQs", href: "/faq" },
    { name: "Cost Calculator", href: "/cost-calculator" },
    { name: "Contact", href: "/contact" },
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
    <footer className="relative bg-deep-steel text-white overflow-hidden">
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
        <div className="grid sm:grid-cols-2 lg:grid-cols-6 gap-12 mb-16">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <div className="mb-6">
              <div className="relative h-12 w-48">
                <Image
                  src="/logo-light.png"
                  alt="PristiqBuild Logo"
                  fill
                  className="object-contain object-left"
                />
              </div>
            </div>

            <p className="text-silver mb-6 max-w-sm">
              Precision steel construction, engineered for Nigeria.
            </p>

            {/* Contact Info */}
            <div className="space-y-3">
              <a
                href={PHONE_HREF}
                className="flex items-center gap-3 text-steel-400 hover:text-white transition-colors"
              >
                <Phone className="w-4 h-4" aria-hidden="true" />
                <span>{PHONE_DISPLAY}</span>
              </a>
              <a
                href={`mailto:${EMAIL}`}
                className="flex items-center gap-3 text-steel-400 hover:text-white transition-colors"
              >
                <Mail className="w-4 h-4" aria-hidden="true" />
                <span>{EMAIL}</span>
              </a>
              <a
                href={whatsappLink(WA.general)}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-steel-400 hover:text-white transition-colors"
              >
                <MessageCircle className="w-4 h-4" aria-hidden="true" />
                <span>Chat on WhatsApp</span>
              </a>
              <div className="flex items-start gap-3 text-steel-400">
                <MapPin className="w-4 h-4 shrink-0 mt-1" aria-hidden="true" />
                <span>{LOCATION}</span>
              </div>
            </div>
          </div>

          {/* Links Columns */}
          {(
            [
              ["Company", footerLinks.company],
              ["Services", footerLinks.services],
              ["Developments", footerLinks.developments],
              ["Resources", footerLinks.resources],
            ] as const
          ).map(([heading, links]) => (
            <nav key={heading} aria-label={`Footer ${heading.toLowerCase()}`}>
              <h2 className="font-display font-semibold text-lg mb-6">{heading}</h2>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-steel-400 hover:text-white transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        {/* Newsletter */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 sm:p-8 mb-12">
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
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pt-8 border-t border-white/10">
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
                className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center text-steel-400 hover:bg-primary-600 hover:text-white transition-colors"
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
