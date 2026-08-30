"use client";

import { useEffect } from "react";
import Link from "next/link";
import { AlertTriangle, RotateCcw, Phone } from "lucide-react";

/**
 * Route-level error boundary.
 *
 * The site previously had none, so any runtime error showed the default Next.js
 * screen with no way back and no way to reach anyone. Since most visitors here
 * are trying to start a construction project, the recovery path includes the
 * phone number rather than only a retry button.
 */
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Replace with your error reporting service when one is in place.
    console.error("[route error]", error);
  }, [error]);

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-6 py-24">
      <div className="max-w-lg text-center">
        <div className="w-16 h-16 rounded-full bg-red-50 flex items-center justify-center mx-auto mb-6">
          <AlertTriangle className="w-8 h-8 text-red-600" />
        </div>

        <h1 className="heading-md text-steel-900 mb-4">
          Something went wrong on this page
        </h1>

        <p className="text-steel-600 mb-8">
          The problem has been logged. You can try again, or reach us directly
          and we will help straight away.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={reset}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-primary-700 text-white font-semibold hover:bg-primary-800 active:translate-y-px transition-[background-color,transform]"
          >
            <RotateCcw className="w-4 h-4" />
            Try again
          </button>
          <a
            href="tel:+2348130272706"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg border-2 border-primary-700 text-primary-700 font-semibold hover:bg-primary-700 hover:text-white active:translate-y-px transition-[color,background-color,transform]"
          >
            <Phone className="w-4 h-4" />
            Call +234 813 027 2706
          </a>
        </div>

        <p className="mt-8 text-sm text-steel-500">
          Or go back to the{" "}
          <Link href="/" className="text-primary-700 underline">
            homepage
          </Link>
          .
        </p>

        {error.digest && (
          <p className="mt-6 text-xs text-steel-400 font-mono">
            Reference: {error.digest}
          </p>
        )}
      </div>
    </div>
  );
}
