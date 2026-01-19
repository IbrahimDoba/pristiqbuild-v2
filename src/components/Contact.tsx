"use client";

import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Send,
  MessageSquare,
  Calendar,
  Glasses,
  CheckCircle2,
} from "lucide-react";

const contactInfo = [
  {
    icon: Phone,
    title: "Phone",
    value: "+234 813 027 2706",
    href: "tel:+2348130272706",
  },
  {
    icon: Mail,
    title: "Email",
    value: "info@pristiqbuild.com",
    href: "mailto:info@pristiqbuild.com",
  },
  {
    icon: MapPin,
    title: "Address",
    value: "Murjanatu House, 1 Zambezi Crescent, Wuse Abuja, Nigeria",
    href: "#",
  },
  {
    icon: Clock,
    title: "Business Hours",
    value: "Mon - Fri: 9:00 AM - 6:00 PM",
    href: null,
  },
];

const serviceTypes = [
  "Modular Construction",
  "Light Steel Gauge",
  "VR/AR Consultation",
  "Commercial Project",
  "Residential Project",
  "Renovation",
  "Other",
];

export default function Contact() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <section
      id="contact"
      ref={containerRef}
      className="section-padding relative bg-white overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-full h-96 bg-gradient-to-b from-steel-50 to-transparent" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary-50 rounded-full blur-3xl opacity-50" />

      <div className="container-custom relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="eyebrow inline-block mb-4"
          >
            Get In Touch
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="heading-lg text-steel-900 mb-6"
          >
            Let&apos;s Build <span className="text-gradient">Together</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="body-lg text-steel-600"
          >
            Ready to start your project? Get in touch with our team for a
            consultation and discover how modular construction can transform
            your vision into reality.
          </motion.p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <div className="bg-white rounded-2xl p-8 shadow-xl shadow-steel-200/50 border border-steel-100">
              {isSubmitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-12"
                >
                  <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
                    <CheckCircle2 className="w-10 h-10 text-green-600" />
                  </div>
                  <h3 className="heading-sm text-steel-900 mb-3">
                    Message Sent!
                  </h3>
                  <p className="text-steel-600 mb-6">
                    Thank you for reaching out. Our team will get back to you
                    within 24 hours.
                  </p>
                  <button
                    onClick={() => {
                      setIsSubmitted(false);
                      setFormData({
                        name: "",
                        email: "",
                        phone: "",
                        service: "",
                        message: "",
                      });
                    }}
                    className="text-primary-600 font-medium hover:text-primary-700"
                  >
                    Send another message
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label
                        htmlFor="name"
                        className="block text-sm font-medium text-steel-700 mb-2"
                      >
                        Full Name *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 rounded-lg border border-steel-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none transition-all"
                        placeholder="John Doe"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium text-steel-700 mb-2"
                      >
                        Email Address *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 rounded-lg border border-steel-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none transition-all"
                        placeholder="john@example.com"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label
                        htmlFor="phone"
                        className="block text-sm font-medium text-steel-700 mb-2"
                      >
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-lg border border-steel-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none transition-all"
                        placeholder="+234 xxx xxx xxxx"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="service"
                        className="block text-sm font-medium text-steel-700 mb-2"
                      >
                        Service Interest
                      </label>
                      <select
                        id="service"
                        name="service"
                        value={formData.service}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-lg border border-steel-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none transition-all bg-white"
                      >
                        <option value="">Select a service</option>
                        {serviceTypes.map((service) => (
                          <option key={service} value={service}>
                            {service}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="message"
                      className="block text-sm font-medium text-steel-700 mb-2"
                    >
                      Your Message *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={5}
                      className="w-full px-4 py-3 rounded-lg border border-steel-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none transition-all resize-none"
                      placeholder="Tell us about your project..."
                    />
                  </div>

                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-primary-700 to-primary-600 text-white py-4 rounded-lg font-semibold flex items-center justify-center gap-2 hover:from-primary-800 hover:to-primary-700 transition-all disabled:opacity-70"
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5" />
                        Send Message
                      </>
                    )}
                  </motion.button>
                </form>
              )}
            </div>
          </motion.div>

          {/* Contact Info & Map */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="space-y-8"
          >
            {/* Contact Cards */}
            <div className="grid sm:grid-cols-2 gap-4">
              {contactInfo.map((info, index) => (
                <motion.div
                  key={info.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
                >
                  {info.href ? (
                    <a
                      href={info.href}
                      className="block bg-steel-50 rounded-xl p-5 hover:bg-primary-50 transition-colors group"
                    >
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-lg bg-white shadow-sm flex items-center justify-center group-hover:bg-primary-600 transition-colors">
                          <info.icon className="w-5 h-5 text-primary-600 group-hover:text-white transition-colors" />
                        </div>
                        <div>
                          <span className="text-sm text-steel-500">
                            {info.title}
                          </span>
                          <p className="font-medium text-steel-900 group-hover:text-primary-700 transition-colors">
                            {info.value}
                          </p>
                        </div>
                      </div>
                    </a>
                  ) : (
                    <div className="bg-steel-50 rounded-xl p-5">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-lg bg-white shadow-sm flex items-center justify-center">
                          <info.icon className="w-5 h-5 text-primary-600" />
                        </div>
                        <div>
                          <span className="text-sm text-steel-500">
                            {info.title}
                          </span>
                          <p className="font-medium text-steel-900">
                            {info.value}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>

            {/* Map Placeholder */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.9 }}
              className="bg-gradient-to-br from-primary-100 to-primary-200 rounded-2xl h-64 flex items-center justify-center relative overflow-hidden"
            >
              <div className="absolute inset-0 opacity-30">
                <div
                  className="absolute inset-0"
                  style={{
                    backgroundImage: `radial-gradient(circle at 2px 2px, rgba(26, 95, 122, 0.3) 1px, transparent 0)`,
                    backgroundSize: "20px 20px",
                  }}
                />
              </div>
              <div className="text-center relative z-10">
                <MapPin className="w-12 h-12 text-primary-600 mx-auto mb-3" />
                <p className="text-primary-800 font-medium">
                  Wuse, Abuja, Nigeria
                </p>
                <a
                  href="https://maps.google.com/?q=Murjanatu+House,+1+Zambezi+Crescent,+Wuse+Abuja,+Nigeria"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-primary-600 hover:text-primary-700 underline mt-2 inline-block"
                >
                  Open in Google Maps
                </a>
              </div>
            </motion.div>

            {/* Quick Actions */}
            <div className="grid sm:grid-cols-2 gap-4">
              <motion.a
                href="#"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: 1 }}
                className="flex items-center gap-4 bg-gradient-to-r from-secondary-500 to-secondary-600 rounded-xl p-5 text-white hover:from-secondary-600 hover:to-secondary-700 transition-all"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="w-12 h-12 rounded-lg bg-white/20 flex items-center justify-center">
                  <Calendar className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-sm text-white/80">Quick Action</span>
                  <p className="font-semibold">Schedule Consultation</p>
                </div>
              </motion.a>

              <motion.a
                href="#"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: 1.1 }}
                className="flex items-center gap-4 bg-gradient-to-r from-primary-700 to-primary-800 rounded-xl p-5 text-white hover:from-primary-800 hover:to-primary-900 transition-all"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="w-12 h-12 rounded-lg bg-white/20 flex items-center justify-center">
                  <Glasses className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-sm text-white/80">Experience</span>
                  <p className="font-semibold">Book a VR Tour</p>
                </div>
              </motion.a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
