"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu,
  X,
  Phone,
  Mail,
  MapPin,
  ChevronDown,
  MessageCircle,
} from "lucide-react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {
  PHONE_HREF,
  PHONE_DISPLAY,
  EMAIL,
  LOCATION,
  WA,
  whatsappLink,
} from "@/lib/site-config";

type NavChild = { name: string; href: string; note?: string };
type NavItem =
  | { name: string; href: string; children?: undefined }
  | { name: string; id: string; children: NavChild[] };

/**
 * Site navigation, per the brief's section 3.
 *
 * Steel-Frame Construction belongs under Services but has no page yet, so it
 * is left out rather than linked to a 404. Insights is the blog, relabelled.
 */
export const navItems: NavItem[] = [
  { name: "Home", href: "/" },
  {
    name: "Services",
    id: "services",
    children: [
      { name: "LGS Roofing", href: "/services/lgs-roofing" },
      {
        name: "Modular Construction",
        href: "/services/modular-construction",
        note: "Coming soon",
      },
    ],
  },
  { name: "Projects", href: "/projects" },
  {
    name: "Developments",
    id: "developments",
    children: [
      {
        name: "Opulence Heights",
        href: "/projects/opulence-heights",
        note: "Dawaki Hillside, Abuja",
      },
      {
        name: "Breeze Point Estate",
        href: "/projects/breeze-point-estate",
        note: "Kubwa, Abuja",
      },
    ],
  },
  { name: "About", href: "/about" },
  { name: "Insights", href: "/blog" },
  { name: "Contact", href: "/contact" },
];

const isActive = (pathname: string, href: string) =>
  href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);

export default function Navigation() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  // Which dropdown is open, by id. One at a time, desktop and mobile alike.
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const pathname = usePathname();
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const mobilePanelRef = useRef<HTMLDivElement>(null);
  const desktopNavRef = useRef<HTMLDivElement>(null);

  const closeAll = useCallback(() => {
    setIsMobileMenuOpen(false);
    setOpenDropdown(null);
  }, []);

  // Escape closes whatever is open and returns focus to the control that
  // opened the mobile menu, so keyboard users are not dropped at the top.
  useEffect(() => {
    if (!isMobileMenuOpen && !openDropdown) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      const wasMobile = isMobileMenuOpen;
      closeAll();
      if (wasMobile) menuButtonRef.current?.focus();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isMobileMenuOpen, openDropdown, closeAll]);

  // Desktop dropdowns close on a click anywhere outside the nav.
  useEffect(() => {
    if (!openDropdown || isMobileMenuOpen) return;
    const onPointerDown = (event: PointerEvent) => {
      if (!desktopNavRef.current?.contains(event.target as Node)) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, [openDropdown, isMobileMenuOpen]);

  // Move focus into the mobile panel when it opens.
  useEffect(() => {
    if (!isMobileMenuOpen) return;
    const first = mobilePanelRef.current?.querySelector<HTMLElement>("a, button");
    first?.focus();
  }, [isMobileMenuOpen]);

  const toggleDropdown = (id: string) =>
    setOpenDropdown((current) => (current === id ? null : id));

  const waHref = whatsappLink(WA.general);

  return (
    <>
      {/* Top Bar */}
      <div className="hidden lg:block fixed top-0 left-0 right-0 z-50 bg-deep-steel text-white py-2">
        <div className="container-custom flex justify-between items-center text-sm">
          <div className="flex items-center gap-6">
            <a
              href={PHONE_HREF}
              className="flex items-center gap-2 hover:text-primary-300 transition-colors"
            >
              <Phone size={14} aria-hidden="true" />
              <span>{PHONE_DISPLAY}</span>
            </a>
            <a
              href={`mailto:${EMAIL}`}
              className="flex items-center gap-2 hover:text-primary-300 transition-colors"
            >
              <Mail size={14} aria-hidden="true" />
              <span>{EMAIL}</span>
            </a>
          </div>
          <div className="flex items-center gap-2 text-silver">
            <MapPin size={14} aria-hidden="true" />
            <span>{LOCATION}</span>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="fixed top-0 lg:top-8 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-b border-steel-200"
      >
        <div className="container-custom">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link href="/" aria-label="PristiqBuild home" className="relative z-10">
              <div className="relative h-12 w-40">
                <Image
                  src="/logo-dark.png"
                  alt="PristiqBuild"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav
              ref={desktopNavRef}
              aria-label="Main"
              className="hidden lg:flex items-center gap-1"
            >
              {navItems.map((item) => {
                if (item.children) {
                  const open = openDropdown === item.id;
                  const active = item.children.some((c) => isActive(pathname, c.href));
                  return (
                    <div
                      key={item.id}
                      className="relative"
                      onMouseEnter={() => setOpenDropdown(item.id)}
                      onMouseLeave={() => setOpenDropdown(null)}
                    >
                      <button
                        type="button"
                        onClick={() => toggleDropdown(item.id)}
                        aria-expanded={open}
                        aria-controls={`nav-${item.id}`}
                        className={`relative px-3 xl:px-4 py-2 font-medium text-sm transition-colors flex items-center gap-1 ${
                          active ? "text-primary-700" : "text-steel-700 hover:text-primary-700"
                        }`}
                      >
                        {item.name}
                        <ChevronDown
                          size={16}
                          aria-hidden="true"
                          className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`}
                        />
                      </button>

                      <AnimatePresence>
                        {open && (
                          <motion.div
                            id={`nav-${item.id}`}
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 8 }}
                            transition={{ duration: 0.18 }}
                            className="absolute top-full left-0 pt-2 w-72 z-50"
                          >
                            <ul className="bg-white border border-steel-200 rounded-lg p-2 shadow-sm">
                              {item.children.map((child) => (
                                <li key={child.href}>
                                  <Link
                                    href={child.href}
                                    onClick={closeAll}
                                    aria-current={isActive(pathname, child.href) ? "page" : undefined}
                                    className="block px-4 py-3 rounded-md hover:bg-primary-50 transition-colors group"
                                  >
                                    <span className="block font-medium text-steel-900 group-hover:text-primary-700 transition-colors">
                                      {child.name}
                                    </span>
                                    {child.note && (
                                      <span
                                        className={`block text-xs mt-0.5 ${
                                          child.note === "Coming soon" ? "text-oxide" : "text-steel-500"
                                        }`}
                                      >
                                        {child.note}
                                      </span>
                                    )}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                }

                const active = isActive(pathname, item.href);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={closeAll}
                    aria-current={active ? "page" : undefined}
                    className={`relative px-3 xl:px-4 py-2 font-medium text-sm transition-colors ${
                      active ? "text-primary-700" : "text-steel-700 hover:text-primary-700"
                    }`}
                  >
                    {item.name}
                    {active && (
                      <span
                        aria-hidden="true"
                        className="absolute bottom-0 left-3 right-3 xl:left-4 xl:right-4 h-0.5 bg-primary-600"
                      />
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* WhatsApp CTA */}
            <div className="hidden lg:block">
              <a
                href={waHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-lg font-semibold text-sm transition-colors bg-primary-700 text-white hover:bg-primary-800"
              >
                <MessageCircle size={18} aria-hidden="true" />
                Chat on WhatsApp
              </a>
            </div>

            {/* Mobile Menu Button */}
            <button
              ref={menuButtonRef}
              type="button"
              onClick={() => setIsMobileMenuOpen((open) => !open)}
              className="lg:hidden relative z-50 p-2 text-primary-900"
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-menu"
            >
              {isMobileMenuOpen ? <X size={28} aria-hidden="true" /> : <Menu size={28} aria-hidden="true" />}
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 lg:hidden"
          >
            <div
              className="absolute inset-0 bg-black/50"
              onClick={closeAll}
              aria-hidden="true"
            />
            <motion.div
              ref={mobilePanelRef}
              id="mobile-menu"
              role="dialog"
              aria-modal="true"
              aria-label="Menu"
              className="absolute right-0 top-0 bottom-0 w-[85%] max-w-sm bg-white border-l border-steel-200"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 240 }}
            >
              <div className="flex flex-col h-full pt-24 pb-8 px-6">
                <nav aria-label="Mobile" className="flex-1 overflow-y-auto">
                  <ul className="space-y-1">
                    {navItems.map((item) => {
                      if (item.children) {
                        const open = openDropdown === item.id;
                        return (
                          <li key={item.id}>
                            <button
                              type="button"
                              onClick={() => toggleDropdown(item.id)}
                              aria-expanded={open}
                              aria-controls={`mobile-nav-${item.id}`}
                              className="w-full flex items-center justify-between py-3 px-4 rounded-lg text-lg font-medium text-steel-700 hover:bg-steel-50 transition-colors"
                            >
                              {item.name}
                              <ChevronDown
                                size={20}
                                aria-hidden="true"
                                className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`}
                              />
                            </button>
                            {open && (
                              <ul id={`mobile-nav-${item.id}`} className="pl-4 pt-1 pb-2 space-y-1">
                                {item.children.map((child) => (
                                  <li key={child.href}>
                                    <Link
                                      href={child.href}
                                      onClick={closeAll}
                                      aria-current={isActive(pathname, child.href) ? "page" : undefined}
                                      className="block py-2 px-4 rounded-lg hover:bg-primary-50 transition-colors"
                                    >
                                      <span className="block font-medium text-steel-900">{child.name}</span>
                                      {child.note && (
                                        <span
                                          className={`block text-xs mt-0.5 ${
                                            child.note === "Coming soon" ? "text-oxide" : "text-steel-500"
                                          }`}
                                        >
                                          {child.note}
                                        </span>
                                      )}
                                    </Link>
                                  </li>
                                ))}
                              </ul>
                            )}
                          </li>
                        );
                      }

                      const active = isActive(pathname, item.href);
                      return (
                        <li key={item.href}>
                          <Link
                            href={item.href}
                            onClick={closeAll}
                            aria-current={active ? "page" : undefined}
                            className={`block py-3 px-4 rounded-lg text-lg font-medium transition-colors ${
                              active
                                ? "bg-primary-50 text-primary-700"
                                : "text-steel-700 hover:bg-steel-50"
                            }`}
                          >
                            {item.name}
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </nav>

                {/* Mobile Contact Info */}
                <div className="border-t border-steel-200 pt-6 space-y-4">
                  <a
                    href={PHONE_HREF}
                    className="flex items-center gap-3 text-steel-600 hover:text-primary-700"
                  >
                    <Phone size={18} aria-hidden="true" />
                    <span>{PHONE_DISPLAY}</span>
                  </a>
                  <a
                    href={`mailto:${EMAIL}`}
                    className="flex items-center gap-3 text-steel-600 hover:text-primary-700"
                  >
                    <Mail size={18} aria-hidden="true" />
                    <span>{EMAIL}</span>
                  </a>
                  <a
                    href={waHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={closeAll}
                    className="flex items-center justify-center gap-2 w-full py-4 bg-primary-700 text-white rounded-lg font-semibold hover:bg-primary-800 transition-colors"
                  >
                    <MessageCircle size={18} aria-hidden="true" />
                    Chat on WhatsApp
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
