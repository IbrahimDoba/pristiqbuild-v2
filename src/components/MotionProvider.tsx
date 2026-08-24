"use client";

import { MotionConfig } from "framer-motion";

/**
 * Applies the visitor's reduced-motion preference to every Framer Motion
 * animation on the site.
 *
 * `reducedMotion="user"` keeps opacity and colour transitions but drops
 * transform and layout animation, which is the behaviour the preference
 * actually asks for. Without this the CSS block in globals.css is bypassed,
 * because Framer animates through inline styles rather than CSS transitions.
 *
 * GSAP is handled separately in lib/gsap/config.ts.
 */
export default function MotionProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
