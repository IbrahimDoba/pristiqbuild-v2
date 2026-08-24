import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';

/**
 * True when the visitor has asked for reduced motion.
 * Safe to call during render: returns false on the server.
 */
export function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

  gsap.defaults({
    ease: 'power2.out',
    duration: 1,
  });

  // Honour the reduced-motion preference.
  //
  // GSAP animates inline styles, so the @media block in globals.css never
  // reaches it. Two separate problems have to be solved:
  //
  //  1. Time-driven tweens. Running the global timeline very fast lets them
  //     settle on their final state immediately.
  //  2. ScrollTrigger-driven tweens. These are gated on scroll position, not
  //     time, so the time scale never touches them. Components in this project
  //     set opacity to 0 up front and animate it back on scroll, so without
  //     this sweep that content stays permanently invisible.
  if (prefersReducedMotion()) {
    gsap.globalTimeline.timeScale(500);

    const completeScrollAnimations = () => {
      for (const trigger of ScrollTrigger.getAll()) {
        // Scrubbed animations are meant to track scroll. Leave them alone;
        // there are none in this project, and jumping them to the end would
        // be wrong if one is added later.
        if (trigger.vars.scrub) continue;
        trigger.animation?.progress(1);
      }
    };

    // Triggers are created as components mount and as below-fold sections
    // hydrate, so a fixed set of timers is not enough. Drive the sweep from
    // ScrollTrigger's own lifecycle instead: `refresh` covers creation, and
    // `scrollEnd` covers anything that appeared after the last refresh.
    ScrollTrigger.addEventListener("refresh", completeScrollAnimations);
    ScrollTrigger.addEventListener("scrollEnd", completeScrollAnimations);

    // Plus a short opening burst, because the first paint happens before the
    // first scroll and before any refresh the mounts trigger.
    for (const delay of [0, 150, 500, 1200]) {
      setTimeout(completeScrollAnimations, delay);
    }
  }

  ScrollTrigger.defaults({
    toggleActions: 'play none none none',
    markers: false,
  });

  ScrollTrigger.config({
    autoRefreshEvents: 'visibilitychange,DOMContentLoaded,load',
  });
}

export { gsap, ScrollTrigger, ScrollToPlugin };
