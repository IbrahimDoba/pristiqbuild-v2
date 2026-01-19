"use client";
import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from '@/lib/gsap/config';
import { EASINGS } from '@/lib/gsap/easings';

/**
 * Custom hook for scroll-triggered animations
 * @param selector - CSS selector for elements to animate within the container
 * @returns containerRef - Ref to attach to the container element
 */
export const useScrollAnimation = (selector: string) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!containerRef.current) return;

    const elements = gsap.utils.toArray(selector, containerRef.current);

    if (elements.length === 0) return;

    gsap.fromTo(
      elements,
      { autoAlpha: 0, y: 40 },
      {
        autoAlpha: 1,
        y: 0,
        stagger: 0.15,
        duration: 1,
        ease: EASINGS.smoothOut,
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 70%',
        },
      }
    );
  }, { scope: containerRef });

  return containerRef;
};
