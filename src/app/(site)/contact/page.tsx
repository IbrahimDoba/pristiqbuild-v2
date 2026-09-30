"use client";

import { useState } from "react";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Send,
  MessageCircle,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import { useLeadForm } from "@/lib/leads/use-lead-form";
import HoneypotField from "@/components/forms/HoneypotField";
import FieldError from "@/components/forms/FieldError";
import {
  EMAIL,
  LOCATION,
  PHONE_DISPLAY,
  PHONE_HREF,
  RESPONSE_TIME,
  WA,
  whatsappLink,
} from "@/lib/site-config";

const PROJECT_TYPES = [
  "LGS Roofing",
  "Steel-Frame Construction",
  "Modular Construction",
  "Property Development",
  "Not sure yet",
];

const STAGES = [
  "Just exploring",
  "Have drawings",
  "Ready to start",
  "Site in progress",
];

const BUDGETS = [
  { value: "under-10m", label: "Under ₦10M" },
  { value: "10m-25m", label: "₦10M - ₦25M" },
  { value: "25m-50m", label: "₦25M - ₦50M" },
  { value: "50m-100m", label: "₦50M - ₦100M" },
  { value: "over-100m", label: "Over ₦100M" },
];

const EMPTY = {
  name: "",
  email: "",
  phone: "",
  location: "",
  projectType: "",
  stage: "",
  scope: "",
  budget: "",
  message: "",
};

const inputClass =
  "w-full px-4 py-3 rounded-lg border border-steel-300 bg-white focus:border-primary-600 focus:ring-2 focus:ring-primary-100 outline-none transition-colors";
const labelClass = "block text-sm font-medium text-steel-700 mb-2";

export default function ContactPage() {
  const [formData, setFormData] = useState(EMPTY);
  const { submit, reset, isSubmitting, isSubmitted, error, fieldErrors } =
    useLeadForm();

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const form = e.currentTarget as HTMLFormElement;
    const website = new FormData(form).get("website");

    const sent = await submit({
      source: "QUOTE_FORM",
      ...formData,
      website: typeof website === "string" ? website : "",
    });

    // Clear the fields but leave the confirmation on screen until the
    // visitor chooses to send another.
    if (sent) setFormData(EMPTY);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Intro */}
      <section className="bg-deep-steel text-white">
        <div className="container-custom pt-36 pb-16 md:pt-44 md:pb-20">
          <p className="text-sm font-semibold uppercase tracking-wider text-silver/80 mb-4">
            Contact
          </p>
          <h1 className="heading-xl max-w-3xl mb-6">
            Tell us the scope and the site.
          </h1>
          <p className="body-lg text-white/85 max-w-2xl mb-10">
            WhatsApp is usually the fastest way to reach us. We typically reply
            within a few hours. Prefer email or a form? Use the one below
            instead.
          </p>
          <a
            href={whatsappLink(WA.general)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-7 py-4 bg-white text-primary-800 rounded-lg font-semibold hover:bg-silver transition-colors"
          >
            <MessageCircle size={20} aria-hidden="true" />
            Chat on WhatsApp
          </a>
        </div>
      </section>

      <section className="section-padding bg-steel-50">
        <div className="container-custom grid lg:grid-cols-[1fr_22rem] gap-10">
          {/* Form */}
          <div className="bg-white rounded-2xl border border-steel-200 p-6 md:p-10">
            <h2 className="heading-md text-steel-900 mb-1">Project details</h2>
            <p className="text-steel-600 text-sm mb-8">
              Fields marked * are required.
            </p>

            {isSubmitted ? (
              <div className="py-16 text-center" role="status">
                <div className="w-20 h-20 rounded-full bg-green-50 flex items-center justify-center mx-auto mb-6">
                  <CheckCircle className="text-green-600" size={40} aria-hidden="true" />
                </div>
                <h3 className="heading-sm text-steel-900 mb-2">
                  Thank you, we have your details.
                </h3>
                <p className="text-steel-600 mb-6">
                  Someone from the team will get back to you, {RESPONSE_TIME}.
                </p>
                <button
                  onClick={reset}
                  className="text-primary-700 font-medium hover:text-primary-800"
                >
                  Send another enquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6" noValidate>
                <HoneypotField />

                {error && (
                  <div
                    role="alert"
                    className="flex items-start gap-3 rounded-2xl border border-red-200 bg-red-50 p-4 text-red-800"
                  >
                    <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" aria-hidden="true" />
                    <p className="text-sm">{error}</p>
                  </div>
                )}

                <div>
                  <label htmlFor="name" className={labelClass}>
                    Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className={inputClass}
                    placeholder="Adaeze Okonkwo…"
                    autoComplete="name"
                  />
                  <FieldError name="name" errors={fieldErrors} />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="phone" className={labelClass}>
                      Phone *
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      className={inputClass}
                      placeholder="+234 800 000 0000…"
                      autoComplete="tel"
                      inputMode="tel"
                    />
                    <FieldError name="phone" errors={fieldErrors} />
                  </div>
                  <div>
                    <label htmlFor="email" className={labelClass}>
                      Email *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className={inputClass}
                      placeholder="adaeze@example.com…"
                      autoComplete="email"
                      spellCheck={false}
                      inputMode="email"
                    />
                    <FieldError name="email" errors={fieldErrors} />
                  </div>
                </div>

                <div>
                  <label htmlFor="location" className={labelClass}>
                    Location
                  </label>
                  <input
                    type="text"
                    id="location"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    className={inputClass}
                    placeholder="e.g. Maitama, Abuja…"
                    autoComplete="address-level2"
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="projectType" className={labelClass}>
                      Project type
                    </label>
                    <select
                      id="projectType"
                      name="projectType"
                      value={formData.projectType}
                      onChange={handleChange}
                      className={inputClass}
                    >
                      <option value="">Select one</option>
                      {PROJECT_TYPES.map((t) => (
                        <option key={t} value={t}>
                          {t}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label htmlFor="stage" className={labelClass}>
                      Current stage
                    </label>
                    <select
                      id="stage"
                      name="stage"
                      value={formData.stage}
                      onChange={handleChange}
                      className={inputClass}
                    >
                      <option value="">Select one</option>
                      {STAGES.map((s) => (
                        <option key={s} value={s}>
                          {s}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="scope" className={labelClass}>
                      Approximate size / scope
                    </label>
                    <input
                      type="text"
                      id="scope"
                      name="scope"
                      value={formData.scope}
                      onChange={handleChange}
                      className={inputClass}
                      placeholder="e.g. 450 sqm roof, 4-bed duplex…"
                    />
                    <FieldError name="scope" errors={fieldErrors} />
                  </div>
                  <div>
                    <label htmlFor="budget" className={labelClass}>
                      Budget range
                    </label>
                    <select
                      id="budget"
                      name="budget"
                      value={formData.budget}
                      onChange={handleChange}
                      className={inputClass}
                    >
                      <option value="">Select one</option>
                      {BUDGETS.map((b) => (
                        <option key={b.value} value={b.value}>
                          {b.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="message" className={labelClass}>
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={5}
                    className={`${inputClass} resize-none`}
                    placeholder="Anything else we should know: timeline, drawings, site access…"
                  />
                  <FieldError name="message" errors={fieldErrors} />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full px-8 py-4 bg-primary-700 text-white rounded-lg font-semibold hover:bg-primary-800 transition-colors disabled:bg-steel-400 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <span
                        className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"
                        aria-hidden="true"
                      />
                      Sending…
                    </>
                  ) : (
                    <>
                      <Send size={20} aria-hidden="true" />
                      Send enquiry
                    </>
                  )}
                </button>
              </form>
            )}
          </div>

          {/* Info panel */}
          <aside className="space-y-6">
            <div className="bg-white rounded-2xl border border-steel-200 p-6">
              <h2 className="heading-sm text-steel-900 mb-5">Reach us directly</h2>
              <ul className="space-y-5 list-none p-0 m-0">
                <InfoRow icon={Phone} label="Phone / WhatsApp">
                  <a href={PHONE_HREF} className="text-primary-700 font-medium hover:text-primary-800">
                    {PHONE_DISPLAY}
                  </a>
                </InfoRow>
                <InfoRow icon={Mail} label="Email">
                  <a href={`mailto:${EMAIL}`} className="text-primary-700 font-medium hover:text-primary-800">
                    {EMAIL}
                  </a>
                </InfoRow>
                <InfoRow icon={MapPin} label="Location">
                  <span className="text-steel-900 font-medium">{LOCATION}</span>
                </InfoRow>
                <InfoRow icon={Clock} label="Response time">
                  <span className="text-steel-900 font-medium">
                    {RESPONSE_TIME.charAt(0).toUpperCase() + RESPONSE_TIME.slice(1)}
                  </span>
                </InfoRow>
              </ul>
            </div>
            <a
              href={whatsappLink(WA.general)}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full px-6 py-4 bg-primary-700 text-white rounded-lg font-semibold hover:bg-primary-800 transition-colors"
            >
              <MessageCircle size={20} aria-hidden="true" />
              Chat on WhatsApp
            </a>
          </aside>
        </div>
      </section>
    </div>
  );
}

function InfoRow({
  icon: Icon,
  label,
  children,
}: {
  icon: React.ComponentType<{ size?: number; className?: string }>;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <li className="flex items-start gap-3">
      <Icon size={20} className="text-primary-700 shrink-0 mt-0.5" />
      <div>
        <p className="text-xs uppercase tracking-wider text-steel-500 mb-0.5">{label}</p>
        {children}
      </div>
    </li>
  );
}
