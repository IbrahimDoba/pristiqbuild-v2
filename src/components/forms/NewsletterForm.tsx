"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import { useLeadForm } from "@/lib/leads/use-lead-form";
import HoneypotField from "@/components/forms/HoneypotField";

/**
 * Footer newsletter signup.
 *
 * Previously a `<form>` with no handler, so submitting it did a native GET and
 * reloaded the page with the subscriber's address in the URL.
 */
export default function NewsletterForm() {
  const [email, setEmail] = useState("");
  const { submit, isSubmitting, isSubmitted, error, fieldErrors } =
    useLeadForm();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const website = new FormData(e.currentTarget).get("website");

    const sent = await submit({
      source: "NEWSLETTER",
      email,
      website: typeof website === "string" ? website : "",
    });

    if (sent) setEmail("");
  };

  if (isSubmitted) {
    return (
      <motion.p
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center gap-2 text-primary-300 font-medium"
        role="status"
      >
        <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
        You are on the list. Look out for our next update.
      </motion.p>
    );
  }

  const fieldError = fieldErrors.email ?? (error ? null : null);

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full lg:w-auto"
      noValidate
      aria-label="Newsletter signup"
    >
      <HoneypotField />

      <div className="flex flex-col sm:flex-row w-full lg:w-auto gap-3">
        <div className="flex-1 sm:flex-initial lg:w-72">
          <label htmlFor="newsletter-email" className="sr-only">
            Email address
          </label>
          <input
            id="newsletter-email"
            name="email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            autoComplete="email"
            aria-invalid={Boolean(fieldError)}
            aria-describedby={fieldError || error ? "newsletter-error" : undefined}
            className={`w-full px-4 sm:px-5 py-3 rounded-lg bg-steel-700 border text-white placeholder-steel-400 focus:outline-none focus:ring-2 transition-colors text-sm sm:text-base ${
              fieldError
                ? "border-red-400 focus:border-red-400 focus:ring-red-400/30"
                : "border-steel-600 focus:border-primary-500 focus:ring-primary-500/30"
            }`}
          />
        </div>

        <motion.button
          type="submit"
          disabled={isSubmitting}
          className="w-full sm:w-auto px-6 py-3 bg-primary-600 hover:bg-primary-700 disabled:opacity-70 disabled:cursor-not-allowed rounded-lg font-semibold transition-colors whitespace-nowrap text-sm sm:text-base"
          whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
          whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
        >
          {isSubmitting ? "Subscribing..." : "Subscribe"}
        </motion.button>
      </div>

      {(fieldError || error) && (
        <p
          id="newsletter-error"
          role="alert"
          className="mt-2 text-sm text-red-300"
        >
          {fieldError ?? error}
        </p>
      )}
    </form>
  );
}
