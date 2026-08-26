"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Phone, Mail, ChevronDown } from "lucide-react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

/**
 * Hrefs are absolute (`/#section`), not bare fragments.
 *
 * A bare `#process` only resolves against whatever page you are already on, so
 * on /blog, /faq, /contact, /careers, /team, /about, /case-studies,
 * /cost-calculator and the four /services routes these links did nothing at
 * all: the click handler cancelled the default and then failed to find an
 * element that only exists on the homepage. Twelve routes had a dead navbar.
 */
const navLinks = [
  { name: "Home", href: "/#home" },
  { name: "Why PristiqBuild", href: "/#why-pristiqbuild" },
  { name: "Process", href: "/#process" },
  { name: "Projects", href: "/#projects", hasDropdown: true },
  { name: "About", href: "/#about" },
];

/** Section id a nav href points at, e.g. "/#process" -> "process". */
const sectionId = (href: string) => href.split("#")[1] ?? "";

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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [observedSection, setActiveSection] = useState("home");
  const [isProjectsDropdownOpen, setIsProjectsDropdownOpen] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === "/";

  // Derived, not stored. Writing "" into state from the effect when leaving
  // the homepage would be a synchronous setState inside an effect, which
  // React 19 flags as a cascading render.
  const activeSection = isHome ? observedSection : "";

  // Active-section highlight.
  //
  // Replaces a scroll listener that ran getBoundingClientRect over every
  // section on every scroll frame. IntersectionObserver does the same work off
  // the main thread and only wakes when a boundary is actually crossed.
  useEffect(() => {
    if (!isHome) return;

    const ids = navLinks.map((link) => sectionId(link.href)).filter(Boolean);
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    if (elements.length === 0) return;

    // The callback only reports sections whose state changed, so track the
    // full visible set here rather than recomputing from each batch.
    const visible = new Set<string>();

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) visible.add(entry.target.id);
          else visible.delete(entry.target.id);
        }
        // First in document order wins, so the highlight moves down the page
        // rather than jumping to whichever section reported last.
        const current = ids.find((id) => visible.has(id));
        if (current) setActiveSection(current);
      },
      // Discount the fixed header at the top and the lower half of the
      // viewport, so a section counts as active once it reaches reading height.
      { rootMargin: "-140px 0px -55% 0px" }
    );

    for (const element of elements) observer.observe(element);
    return () => observer.disconnect();
  }, [isHome]);

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    setIsMobileMenuOpen(false);
    setIsProjectsDropdownOpen(false);

    // Off the homepage, let the browser navigate to /#section normally.
    // `scroll-padding-top` in globals.css keeps the target clear of the header.
    if (!isHome) return;

    const element = document.getElementById(sectionId(href));
    if (!element) return;

    e.preventDefault();
    element.scrollIntoView({ behavior: "smooth" });
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
        className="fixed top-0 lg:top-8 left-0 right-0 z-40 transition-colors duration-500 bg-white/95 backdrop-blur-md shadow-lg"
      >
        <div className="container-custom">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link href="/">
              <motion.div
                className="relative z-10 cursor-pointer"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="relative h-12 w-40">
                  <Image
                    src="/optimized/Pristiq Build blacktext.webp"
                    alt="PristiqBuild Logo"
                    fill
                    className="object-contain"
                    priority
                  />
                </div>
              </motion.div>
            </Link>

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
                        href={link.href}
                        onClick={(e) => handleNavClick(e, link.href)}
                        className={`relative px-4 py-2 font-medium text-sm transition-colors flex items-center gap-1 ${
                          activeSection === sectionId(link.href)
                            ? "text-primary-700"
                            : "text-steel-700 hover:text-primary-700"
                        }`}
                      >
                        {link.name}
                        <ChevronDown
                          size={16}
                          className={`transition-transform ${
                            isProjectsDropdownOpen ? "rotate-180" : ""
                          }`}
                        />
                        {activeSection === sectionId(link.href) && (
                          <motion.div
                            layoutId="activeSection"
                            className="absolute bottom-0 left-4 right-4 h-0.5 bg-primary-600"
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
                            className="absolute top-full left-0 mt-2 w-72 bg-white rounded-2xl shadow-2xl overflow-hidden z-50"
                          >
                            <div className="p-2">
                              {projectsList.map((project) => (
                                <Link
                                  key={project.slug}
                                  href={`/projects/${project.slug}`}
                                  onClick={() => {
                                    setIsProjectsDropdownOpen(false);
                                    setIsMobileMenuOpen(false);
                                  }}
                                  className="block px-4 py-3 rounded-lg hover:bg-primary-50 transition-colors group"
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
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className={`relative px-4 py-2 font-medium text-sm transition-colors ${
                      activeSection === sectionId(link.href)
                        ? "text-primary-700"
                        : "text-steel-700 hover:text-primary-700"
                    }`}
                  >
                    {link.name}
                    {activeSection === sectionId(link.href) && (
                      <motion.div
                        layoutId="activeSection"
                        className="absolute bottom-0 left-4 right-4 h-0.5 bg-primary-600"
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
              <Link href="/contact">
                <motion.div
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-semibold text-sm transition-colors bg-primary-700 text-white hover:bg-primary-800 cursor-pointer"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Get a Quote
                </motion.div>
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden relative z-10 p-2 text-primary-900"
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
                                activeSection === sectionId(link.href)
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
                            href={link.href}
                            onClick={(e) => handleNavClick(e, link.href)}
                            className={`block py-3 px-4 rounded-lg text-lg font-medium transition-colors ${
                              activeSection === sectionId(link.href)
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
                  <Link href="/contact" onClick={() => setIsMobileMenuOpen(false)}>
                    <motion.div
                      className="block w-full py-4 bg-primary-700 text-white text-center rounded-lg font-semibold hover:bg-primary-800 transition-colors cursor-pointer"
                      whileTap={{ scale: 0.98 }}
                    >
                      Get a Quote
                    </motion.div>
                  </Link>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
