"use client";

import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap/config";
import Image from "next/image";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Send,
  MessageSquare,
  Calendar,
  Building2,
  CheckCircle,
} from "lucide-react";

const contactMethods = [
  {
    icon: Phone,
    title: "Call Us",
    details: "+234 813 027 2706",
    description: "Mon-Fri from 8am to 6pm",
    action: "tel:+2348130272706",
    actionText: "Call Now",
  },
  {
    icon: Mail,
    title: "Email Us",
    details: "info@pristiqbuild.com",
    description: "We'll respond within 24 hours",
    action: "mailto:info@pristiqbuild.com",
    actionText: "Send Email",
  },
  {
    icon: MapPin,
    title: "Visit Our Office",
    details: "Murjanatu House, 1 Zambezi Crescent",
    description: "Wuse, Abuja, Nigeria",
    action: "https://maps.google.com/?q=Zambezi+Crescent+Wuse+Abuja",
    actionText: "Get Directions",
  },
  {
    icon: Calendar,
    title: "Schedule a Meeting",
    details: "Book a consultation",
    description: "Meet with our experts",
    action: "#schedule",
    actionText: "Book Now",
  },
];

const officeHours = [
  { day: "Monday - Friday", hours: "8:00 AM - 6:00 PM" },
  { day: "Saturday", hours: "9:00 AM - 2:00 PM" },
  { day: "Sunday", hours: "Closed" },
];

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    projectType: "",
    location: "",
    budget: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const sections = gsap.utils.toArray<HTMLElement>(".fade-in-section");
      sections.forEach((section) => {
        gsap.from(section, {
          opacity: 0,
          y: 60,
          duration: 1,
          scrollTrigger: {
            trigger: section,
            start: "top 85%",
            end: "top 50%",
            scrub: 1,
          },
        });
      });
    },
    { scope: containerRef }
  );

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 2000));

    setIsSubmitting(false);
    setIsSubmitted(true);

    // Reset form after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({
        name: "",
        email: "",
        phone: "",
        projectType: "",
        location: "",
        budget: "",
        message: "",
      });
    }, 3000);
  };

  return (
    <div ref={containerRef} className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-primary-900 via-primary-800 to-primary-700">
        <div className="absolute inset-0 opacity-10">
          <div className="grid-pattern absolute inset-0" />
        </div>

        <div className="container-custom relative z-10 py-32 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="heading-xl text-white mb-6">
              Let&apos;s Build Your
              <br />
              <span className="text-secondary-400">Dream Project Together</span>
            </h1>
            <p className="body-lg text-white/90 max-w-3xl mx-auto">
              Ready to experience the future of construction? Get in touch with
              our team and let&apos;s discuss how we can bring your vision to
              life.
            </p>
          </motion.div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent" />
      </section>

      {/* Contact Methods */}
      <section className="section-padding bg-white fade-in-section">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {contactMethods.map((method, index) => (
              <motion.div
                key={method.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white border-2 border-steel-100 rounded-xl p-6 hover:border-primary-300 hover:shadow-lg transition-all group"
              >
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-lg bg-primary-50 text-primary-700 mb-4 group-hover:bg-primary-700 group-hover:text-white transition-colors">
                  <method.icon size={28} />
                </div>
                <h3 className="font-display font-semibold text-lg text-steel-900 mb-2">
                  {method.title}
                </h3>
                <p className="text-primary-700 font-medium mb-1">
                  {method.details}
                </p>
                <p className="text-steel-500 text-sm mb-4">
                  {method.description}
                </p>
                <a
                  href={method.action}
                  className="text-primary-700 font-semibold text-sm hover:text-primary-800 transition-colors inline-flex items-center gap-2"
                >
                  {method.actionText}
                  <span className="group-hover:translate-x-1 transition-transform">
                    →
                  </span>
                </a>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content - Form & Info */}
      <section className="section-padding bg-steel-50 fade-in-section">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="bg-white rounded-2xl p-8 md:p-10 shadow-xl">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-lg bg-primary-700 flex items-center justify-center">
                  <MessageSquare className="text-white" size={24} />
                </div>
                <div>
                  <h2 className="heading-md text-steel-900">Get a Quote</h2>
                  <p className="text-steel-600 text-sm">
                    Fill out the form below
                  </p>
                </div>
              </div>

              {isSubmitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="py-16 text-center"
                >
                  <div className="w-20 h-20 rounded-full bg-green-50 flex items-center justify-center mx-auto mb-6">
                    <CheckCircle className="text-green-600" size={40} />
                  </div>
                  <h3 className="heading-sm text-steel-900 mb-2">
                    Thank You!
                  </h3>
                  <p className="text-steel-600">
                    We&apos;ve received your message and will get back to you
                    within 24 hours.
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Name */}
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
                      className="w-full px-4 py-3 rounded-lg border border-steel-300 focus:border-primary-600 focus:ring-2 focus:ring-primary-100 outline-none transition-colors"
                      placeholder="John Doe"
                    />
                  </div>

                  {/* Email & Phone */}
                  <div className="grid md:grid-cols-2 gap-4">
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
                        className="w-full px-4 py-3 rounded-lg border border-steel-300 focus:border-primary-600 focus:ring-2 focus:ring-primary-100 outline-none transition-colors"
                        placeholder="john@example.com"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="phone"
                        className="block text-sm font-medium text-steel-700 mb-2"
                      >
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 rounded-lg border border-steel-300 focus:border-primary-600 focus:ring-2 focus:ring-primary-100 outline-none transition-colors"
                        placeholder="+234 XXX XXX XXXX"
                      />
                    </div>
                  </div>

                  {/* Project Type */}
                  <div>
                    <label
                      htmlFor="projectType"
                      className="block text-sm font-medium text-steel-700 mb-2"
                    >
                      Project Type *
                    </label>
                    <select
                      id="projectType"
                      name="projectType"
                      value={formData.projectType}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-lg border border-steel-300 focus:border-primary-600 focus:ring-2 focus:ring-primary-100 outline-none transition-colors"
                    >
                      <option value="">Select project type</option>
                      <option value="residential">Residential Building</option>
                      <option value="commercial">Commercial Building</option>
                      <option value="industrial">Industrial Facility</option>
                      <option value="roofing">Roofing Project</option>
                      <option value="estate">Estate Development</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  {/* Location */}
                  <div>
                    <label
                      htmlFor="location"
                      className="block text-sm font-medium text-steel-700 mb-2"
                    >
                      Project Location *
                    </label>
                    <input
                      type="text"
                      id="location"
                      name="location"
                      value={formData.location}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-lg border border-steel-300 focus:border-primary-600 focus:ring-2 focus:ring-primary-100 outline-none transition-colors"
                      placeholder="e.g., Abuja, Lagos, Port Harcourt"
                    />
                  </div>

                  {/* Budget */}
                  <div>
                    <label
                      htmlFor="budget"
                      className="block text-sm font-medium text-steel-700 mb-2"
                    >
                      Estimated Budget
                    </label>
                    <select
                      id="budget"
                      name="budget"
                      value={formData.budget}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg border border-steel-300 focus:border-primary-600 focus:ring-2 focus:ring-primary-100 outline-none transition-colors"
                    >
                      <option value="">Select budget range</option>
                      <option value="under-10m">Under ₦10M</option>
                      <option value="10m-25m">₦10M - ₦25M</option>
                      <option value="25m-50m">₦25M - ₦50M</option>
                      <option value="50m-100m">₦50M - ₦100M</option>
                      <option value="over-100m">Over ₦100M</option>
                    </select>
                  </div>

                  {/* Message */}
                  <div>
                    <label
                      htmlFor="message"
                      className="block text-sm font-medium text-steel-700 mb-2"
                    >
                      Project Details *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={5}
                      className="w-full px-4 py-3 rounded-lg border border-steel-300 focus:border-primary-600 focus:ring-2 focus:ring-primary-100 outline-none transition-colors resize-none"
                      placeholder="Tell us about your project, timeline, and any specific requirements..."
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full px-8 py-4 bg-primary-700 text-white rounded-lg font-semibold hover:bg-primary-800 transition-colors disabled:bg-steel-400 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send size={20} />
                        Send Message
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>

            {/* Additional Information */}
            <div className="space-y-8">
              {/* Office Hours */}
              <div className="bg-white rounded-2xl p-8 shadow-lg">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-lg bg-secondary-50 flex items-center justify-center">
                    <Clock className="text-secondary-600" size={24} />
                  </div>
                  <h3 className="heading-sm text-steel-900">Office Hours</h3>
                </div>
                <div className="space-y-3">
                  {officeHours.map((schedule) => (
                    <div
                      key={schedule.day}
                      className="flex items-center justify-between py-2 border-b border-steel-100 last:border-0"
                    >
                      <span className="text-steel-700">{schedule.day}</span>
                      <span className="font-semibold text-primary-700">
                        {schedule.hours}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Location Info */}
              <div className="bg-gradient-to-br from-primary-700 to-primary-900 rounded-2xl p-8 text-white">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-lg bg-white/20 flex items-center justify-center">
                    <Building2 className="text-white" size={24} />
                  </div>
                  <h3 className="heading-sm">Visit Our Office</h3>
                </div>
                <p className="text-white/90 mb-6">
                  Come see our showroom featuring sample modules, material
                  selections, and AR/VR demonstrations of completed projects.
                </p>
                <div className="space-y-3 mb-6">
                  <div className="flex items-start gap-3">
                    <MapPin className="flex-shrink-0 mt-1" size={20} />
                    <div>
                      <p className="font-medium">Murjanatu House</p>
                      <p className="text-white/80 text-sm">
                        1 Zambezi Crescent, Wuse
                        <br />
                        Abuja, Nigeria
                      </p>
                    </div>
                  </div>
                </div>
                <a
                  href="https://maps.google.com/?q=Zambezi+Crescent+Wuse+Abuja"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-white text-primary-700 rounded-lg font-semibold hover:bg-steel-50 transition-colors"
                >
                  <MapPin size={20} />
                  Get Directions
                </a>
              </div>

              {/* Quick Contact */}
              <div className="bg-white rounded-2xl p-8 shadow-lg">
                <h3 className="heading-sm text-steel-900 mb-4">
                  Prefer to Talk?
                </h3>
                <p className="text-steel-600 mb-6">
                  Speak directly with our team for immediate assistance.
                </p>
                <div className="space-y-3">
                  <a
                    href="tel:+2348130272706"
                    className="flex items-center gap-3 p-4 bg-primary-50 rounded-lg hover:bg-primary-100 transition-colors group"
                  >
                    <Phone className="text-primary-700" size={20} />
                    <div className="flex-1">
                      <p className="font-medium text-steel-900">Call Us</p>
                      <p className="text-primary-700 text-sm">
                        +234 813 027 2706
                      </p>
                    </div>
                    <span className="text-primary-700 group-hover:translate-x-1 transition-transform">
                      →
                    </span>
                  </a>
                  <a
                    href="mailto:info@pristiqbuild.com"
                    className="flex items-center gap-3 p-4 bg-primary-50 rounded-lg hover:bg-primary-100 transition-colors group"
                  >
                    <Mail className="text-primary-700" size={20} />
                    <div className="flex-1">
                      <p className="font-medium text-steel-900">Email Us</p>
                      <p className="text-primary-700 text-sm">
                        info@pristiqbuild.com
                      </p>
                    </div>
                    <span className="text-primary-700 group-hover:translate-x-1 transition-transform">
                      →
                    </span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="fade-in-section">
        <div className="h-[500px] relative">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3939.9764826595364!2d7.487282!3d9.071948!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zOcKwMDQnMTkuMCJOIDfCsDI5JzE0LjIiRQ!5e0!3m2!1sen!2sng!4v1234567890"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="PristiqBuild Office Location"
          />
        </div>
      </section>
    </div>
  );
}
