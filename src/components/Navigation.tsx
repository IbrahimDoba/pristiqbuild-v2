"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Phone, Mail } from "lucide-react";

const navLinks = [
  { name: "Home", href: "#home" },
  { name: "Why PristiqBuild", href: "#why-pristiqbuild" },
  { name: "Process", href: "#process" },
  { name: "Projects", href: "#projects" },
  { name: "About", href: "#about" },
];

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      // Update active section based on scroll position
      const sections = navLinks.map((link) => link.href.slice(1));
      const currentSection = sections.find((section) => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 150 && rect.bottom >= 150;
        }
        return false;
      });
      if (currentSection) {
        setActiveSection(currentSection);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    e.preventDefault();
    const targetId = href.slice(1);
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <>
      {/* Top Bar */}
      <div className="hidden lg:block fixed top-0 left-0 right-0 z-50 bg-primary-900 text-white py-2">
        <div className="container-custom flex justify-between items-center text-sm">
          <div className="flex items-center gap-6">
            <a
              href="tel:+2348130272706"
              className="flex items-center gap-2 hover:text-primary-300 transition-colors"
            >
              <Phone size={14} />
              <span>+234 813 027 2706</span>
            </a>
            <a
              href="mailto:info@pristiqbuild.com"
              className="flex items-center gap-2 hover:text-primary-300 transition-colors"
            >
              <Mail size={14} />
              <span>info@pristiqbuild.com</span>
            </a>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-steel-300">
              Murjanatu House, 1 Zambezi Crescent, Wuse Abuja
            </span>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 lg:top-8 left-0 right-0 z-40 transition-all duration-500 ${
          isScrolled
            ? "bg-white/95 backdrop-blur-md shadow-lg"
            : "bg-transparent"
        }`}
      >
        <div className="container-custom">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <motion.a
              href="#home"
              onClick={(e) => handleNavClick(e, "#home")}
              className="relative z-10"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="flex items-center gap-2">
                <div
                  className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                    isScrolled ? "bg-primary-700" : "bg-white"
                  }`}
                >
                  <span
                    className={`font-display font-bold text-xl ${
                      isScrolled ? "text-white" : "text-primary-700"
                    }`}
                  >
                    P
                  </span>
                </div>
                <div>
                  <span
                    className={`font-display font-bold text-xl ${
                      isScrolled ? "text-primary-900" : "text-white"
                    }`}
                  >
                    Pristiq
                  </span>
                  <span
                    className={`font-display font-bold text-xl ${
                      isScrolled ? "text-primary-600" : "text-secondary-400"
                    }`}
                  >
                    Build
                  </span>
                </div>
              </div>
            </motion.a>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className={`relative px-4 py-2 font-medium text-sm transition-colors ${
                    isScrolled
                      ? activeSection === link.href.slice(1)
                        ? "text-primary-700"
                        : "text-steel-700 hover:text-primary-700"
                      : activeSection === link.href.slice(1)
                        ? "text-white"
                        : "text-white/80 hover:text-white"
                  }`}
                >
                  {link.name}
                  {activeSection === link.href.slice(1) && (
                    <motion.div
                      layoutId="activeSection"
                      className={`absolute bottom-0 left-4 right-4 h-0.5 ${
                        isScrolled ? "bg-primary-600" : "bg-secondary-400"
                      }`}
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </a>
              ))}
            </div>

            {/* CTA Button */}
            <div className="hidden lg:block">
              <motion.a
                href="#contact"
                onClick={(e) => handleNavClick(e, "#contact")}
                className={`inline-flex items-center gap-2 px-6 py-3 rounded-lg font-semibold text-sm transition-all ${
                  isScrolled
                    ? "bg-primary-700 text-white hover:bg-primary-800"
                    : "bg-white text-primary-700 hover:bg-primary-50"
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Get a Quote
              </motion.a>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`lg:hidden relative z-10 p-2 ${
                isScrolled || isMobileMenuOpen
                  ? "text-primary-900"
                  : "text-white"
              }`}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-40 lg:hidden"
          >
            <div
              className="absolute inset-0 bg-black/50"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            <motion.div
              className="absolute right-0 top-0 bottom-0 w-[80%] max-w-sm bg-white shadow-2xl"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
            >
              <div className="flex flex-col h-full pt-24 pb-8 px-6">
                <nav className="flex-1">
                  <ul className="space-y-1">
                    {navLinks.map((link, index) => (
                      <motion.li
                        key={link.name}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                      >
                        <a
                          href={link.href}
                          onClick={(e) => handleNavClick(e, link.href)}
                          className={`block py-3 px-4 rounded-lg text-lg font-medium transition-colors ${
                            activeSection === link.href.slice(1)
                              ? "bg-primary-50 text-primary-700"
                              : "text-steel-700 hover:bg-steel-50"
                          }`}
                        >
                          {link.name}
                        </a>
                      </motion.li>
                    ))}
                  </ul>
                </nav>

                {/* Mobile Contact Info */}
                <div className="border-t border-steel-200 pt-6 space-y-4">
                  <a
                    href="tel:+2348130272706"
                    className="flex items-center gap-3 text-steel-600 hover:text-primary-700"
                  >
                    <Phone size={18} />
                    <span>+234 813 027 2706</span>
                  </a>
                  <a
                    href="mailto:info@pristiqbuild.com"
                    className="flex items-center gap-3 text-steel-600 hover:text-primary-700"
                  >
                    <Mail size={18} />
                    <span>info@pristiqbuild.com</span>
                  </a>
                  <motion.a
                    href="#contact"
                    onClick={(e) => handleNavClick(e, "#contact")}
                    className="block w-full py-4 bg-primary-700 text-white text-center rounded-lg font-semibold hover:bg-primary-800 transition-colors"
                    whileTap={{ scale: 0.98 }}
                  >
                    Get a Quote
                  </motion.a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
