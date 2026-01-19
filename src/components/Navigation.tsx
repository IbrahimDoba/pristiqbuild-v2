"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Phone, Mail, ChevronDown } from "lucide-react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

const navLinks = [
  { name: "Home", href: "#home" },
  { name: "Why PristiqBuild", href: "#why-pristiqbuild" },
  { name: "Process", href: "#process" },
  { name: "Projects", href: "#projects", hasDropdown: true },
  { name: "About", href: "#about" },
];

const projectsList = [
  {
    name: "Opulence Heights",
    slug: "opulence-heights",
    category: "Smart Living Estate",
  },
  {
    name: "Maitama Luxury Mansion",
    slug: "maitama-luxury-mansion",
    category: "Residential Roofing",
  },
  {
    name: "Akure Castle Residence",
    slug: "akure-lgs-roofing",
    category: "Large Scale Roofing",
  },
  {
    name: "Breeze Point Estate",
    slug: "breeze-point-estate",
    category: "Residential Development",
  },
  {
    name: "Aso Grove Roof",
    slug: "aso-grove-roofing",
    category: "Roof Replacement",
  },
];

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [isProjectsDropdownOpen, setIsProjectsDropdownOpen] = useState(false);
  const pathname = usePathname();
  const isOnProjectPage = pathname?.startsWith("/projects/");

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
    // If we're on a project page, navigate to homepage first
    if (isOnProjectPage) {
      // Let the link navigate naturally to /{href}
      setIsMobileMenuOpen(false);
      setIsProjectsDropdownOpen(false);
      return;
    }

    // Otherwise, smooth scroll on same page
    e.preventDefault();
    const targetId = href.slice(1);
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsMobileMenuOpen(false);
      setIsProjectsDropdownOpen(false);
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
              href={isOnProjectPage ? "/" : "#home"}
              onClick={(e) => handleNavClick(e, "#home")}
              className="relative z-10"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="relative h-12 w-40">
                {/* White text logo for transparent navbar */}
                <Image
                  src="/optimized/Pristiq Build whiteText.webp"
                  alt="PristiqBuild Logo"
                  fill
                  className={`object-contain transition-opacity duration-300 ${
                    isScrolled ? "opacity-0" : "opacity-100"
                  }`}
                  priority
                />
                {/* Black text logo for scrolled navbar */}
                <Image
                  src="/optimized/Pristiq Build blacktext.webp"
                  alt="PristiqBuild Logo"
                  fill
                  className={`object-contain transition-opacity duration-300 ${
                    isScrolled ? "opacity-100" : "opacity-0"
                  }`}
                  priority
                />
              </div>
            </motion.a>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => {
                // For Projects link with dropdown
                if (link.hasDropdown) {
                  return (
                    <div
                      key={link.name}
                      className="relative"
                      onMouseEnter={() => setIsProjectsDropdownOpen(true)}
                      onMouseLeave={() => setIsProjectsDropdownOpen(false)}
                    >
                      <a
                        href={isOnProjectPage ? `/${link.href}` : link.href}
                        onClick={(e) => handleNavClick(e, link.href)}
                        className={`relative px-4 py-2 font-medium text-sm transition-colors flex items-center gap-1 ${
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
                        <ChevronDown
                          size={16}
                          className={`transition-transform ${
                            isProjectsDropdownOpen ? "rotate-180" : ""
                          }`}
                        />
                        {activeSection === link.href.slice(1) && (
                          <motion.div
                            layoutId="activeSection"
                            className={`absolute bottom-0 left-4 right-4 h-0.5 ${
                              isScrolled ? "bg-primary-600" : "bg-secondary-400"
                            }`}
                            transition={{
                              type: "spring",
                              stiffness: 380,
                              damping: 30,
                            }}
                          />
                        )}
                      </a>

                      {/* Dropdown Menu */}
                      <AnimatePresence>
                        {isProjectsDropdownOpen && (
                          <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 10 }}
                            transition={{ duration: 0.2 }}
                            className="absolute top-full left-0 mt-2 w-72 bg-white rounded-lg shadow-2xl overflow-hidden z-50"
                          >
                            <div className="p-2">
                              {projectsList.map((project, index) => (
                                <Link
                                  key={project.slug}
                                  href={`/projects/${project.slug}`}
                                  onClick={() => {
                                    setIsProjectsDropdownOpen(false);
                                    setIsMobileMenuOpen(false);
                                  }}
                                  className="block px-4 py-3 rounded-md hover:bg-primary-50 transition-colors group"
                                >
                                  <div className="font-medium text-steel-900 group-hover:text-primary-700 transition-colors">
                                    {project.name}
                                  </div>
                                  <div className="text-xs text-steel-500 mt-0.5">
                                    {project.category}
                                  </div>
                                </Link>
                              ))}
                            </div>
                            <div className="bg-steel-50 px-4 py-3 border-t border-steel-100">
                              <Link
                                href="/#projects"
                                onClick={() => setIsProjectsDropdownOpen(false)}
                                className="text-sm font-medium text-primary-700 hover:text-primary-800 transition-colors"
                              >
                                View All Projects →
                              </Link>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                }

                // Regular links
                return (
                  <a
                    key={link.name}
                    href={isOnProjectPage ? `/${link.href}` : link.href}
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
                        transition={{
                          type: "spring",
                          stiffness: 380,
                          damping: 30,
                        }}
                      />
                    )}
                  </a>
                );
              })}
            </div>

            {/* CTA Button */}
            <div className="hidden lg:block">
              <motion.a
                href={isOnProjectPage ? "/#contact" : "#contact"}
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
                <nav className="flex-1 overflow-y-auto">
                  <ul className="space-y-1">
                    {navLinks.map((link, index) => {
                      // Projects with dropdown
                      if (link.hasDropdown) {
                        return (
                          <motion.li
                            key={link.name}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.05 }}
                          >
                            <button
                              onClick={() =>
                                setIsProjectsDropdownOpen(!isProjectsDropdownOpen)
                              }
                              className={`w-full flex items-center justify-between py-3 px-4 rounded-lg text-lg font-medium transition-colors ${
                                activeSection === link.href.slice(1)
                                  ? "bg-primary-50 text-primary-700"
                                  : "text-steel-700 hover:bg-steel-50"
                              }`}
                            >
                              {link.name}
                              <ChevronDown
                                size={20}
                                className={`transition-transform ${
                                  isProjectsDropdownOpen ? "rotate-180" : ""
                                }`}
                              />
                            </button>

                            {/* Mobile Dropdown */}
                            <AnimatePresence>
                              {isProjectsDropdownOpen && (
                                <motion.div
                                  initial={{ opacity: 0, height: 0 }}
                                  animate={{ opacity: 1, height: "auto" }}
                                  exit={{ opacity: 0, height: 0 }}
                                  transition={{ duration: 0.2 }}
                                  className="overflow-hidden"
                                >
                                  <div className="pl-4 pt-2 space-y-1">
                                    {projectsList.map((project) => (
                                      <Link
                                        key={project.slug}
                                        href={`/projects/${project.slug}`}
                                        onClick={() => {
                                          setIsMobileMenuOpen(false);
                                          setIsProjectsDropdownOpen(false);
                                        }}
                                        className="block py-2 px-4 rounded-lg text-sm hover:bg-primary-50 transition-colors"
                                      >
                                        <div className="font-medium text-steel-900">
                                          {project.name}
                                        </div>
                                        <div className="text-xs text-steel-500 mt-0.5">
                                          {project.category}
                                        </div>
                                      </Link>
                                    ))}
                                    <Link
                                      href="/#projects"
                                      onClick={() => {
                                        setIsMobileMenuOpen(false);
                                        setIsProjectsDropdownOpen(false);
                                      }}
                                      className="block py-2 px-4 text-sm font-medium text-primary-700 hover:text-primary-800"
                                    >
                                      View All Projects →
                                    </Link>
                                  </div>
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </motion.li>
                        );
                      }

                      // Regular links
                      return (
                        <motion.li
                          key={link.name}
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.05 }}
                        >
                          <a
                            href={isOnProjectPage ? `/${link.href}` : link.href}
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
                      );
                    })}
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
                    href={isOnProjectPage ? "/#contact" : "#contact"}
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
