"use client";

import { useCallback, useEffect, useRef, useState } from "react";

type SubmitState = "idle" | "submitting" | "success" | "error";

type LeadResponse = {
  ok?: boolean;
  id?: string;
  error?: string;
  fields?: Record<string, string>;
};

/**
 * Submit handling shared by every lead form on the site.
 *
 * Deliberately does not own any markup, so each form keeps its own layout and
 * success state while the network behaviour stays identical across all four.
 */
export function useLeadForm() {
  // Feeds the route's timing check. Stamped in an effect rather than during
  // render, because reading the clock while rendering is impure and React 19
  // may re-run a render at any time.
  const mountedAt = useRef<number | null>(null);

  useEffect(() => {
    mountedAt.current = Date.now();
  }, []);

  const [state, setState] = useState<SubmitState>("idle");
  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  const submit = useCallback(
    async (payload: Record<string, unknown>): Promise<boolean> => {
      setState("submitting");
      setError(null);
      setFieldErrors({});

      try {
        const response = await fetch("/api/lead", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ...payload,
            // Omitted when the effect has not run yet. The route skips the
            // timing check rather than rejecting on a missing value.
            ...(mountedAt.current !== null
              ? { elapsedMs: Date.now() - mountedAt.current }
              : {}),
          }),
        });

        const data: LeadResponse = await response
          .json()
          .catch(() => ({}) as LeadResponse);

        if (!response.ok || !data.ok) {
          setFieldErrors(data.fields ?? {});

          // Move focus to the first field the server rejected. Without this a
          // keyboard or screen-reader user has to hunt back up the form to
          // find out what went wrong.
          const firstField = Object.keys(data.fields ?? {})[0];
          if (firstField) {
            requestAnimationFrame(() => {
              const el = document.getElementById(firstField);
              if (el instanceof HTMLElement) el.focus();
            });
          }
          setError(
            data.error ??
              "Something went wrong. Please try again, or call +234 813 027 2706."
          );
          setState("error");
          return false;
        }

        setState("success");
        return true;
      } catch {
        setError(
          "We could not reach our server. Check your connection, or call +234 813 027 2706."
        );
        setState("error");
        return false;
      }
    },
    []
  );

  const reset = useCallback(() => {
    setState("idle");
    setError(null);
    setFieldErrors({});
    mountedAt.current = Date.now();
  }, []);

  return {
    state,
    error,
    fieldErrors,
    submit,
    reset,
    isSubmitting: state === "submitting",
    isSubmitted: state === "success",
  };
}
