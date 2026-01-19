import { gsap } from './config';
import { EASINGS } from './easings';

/**
 * Fade in animation from below
 * @param element - Target element
 * @param delay - Optional delay in seconds
 * @returns GSAP Tween
 */
export const fadeIn = (element: HTMLElement, delay = 0) => {
  return gsap.fromTo(
    element,
    { autoAlpha: 0, y: 40 },
    {
      autoAlpha: 1,
      y: 0,
      duration: 1.2,
      delay,
      ease: EASINGS.smoothOut
    }
  );
};

/**
 * Staggered fade in animation for multiple elements
 * @param elements - Array of elements
 * @param config - Optional GSAP configuration overrides
 * @returns GSAP Tween
 */
export const staggerFadeIn = (elements: HTMLElement[], config = {}) => {
  return gsap.fromTo(
    elements,
    { autoAlpha: 0, y: 30 },
    {
      autoAlpha: 1,
      y: 0,
      duration: 0.8,
      stagger: 0.1,
      ease: EASINGS.smoothOut,
      ...config,
    }
  );
};

/**
 * Scale in animation with back easing
 * @param element - Target element
 * @param config - Optional GSAP configuration
 * @returns GSAP Tween
 */
export const scaleIn = (element: HTMLElement, config = {}) => {
  return gsap.fromTo(
    element,
    { autoAlpha: 0, scale: 0.8 },
    {
      autoAlpha: 1,
      scale: 1,
      duration: 0.6,
      ease: EASINGS.back,
      ...config,
    }
  );
};

/**
 * Slide in from direction
 * @param element - Target element
 * @param direction - 'left', 'right', 'up', 'down'
 * @param config - Optional GSAP configuration
 * @returns GSAP Tween
 */
export const slideIn = (
  element: HTMLElement,
  direction: 'left' | 'right' | 'up' | 'down' = 'up',
  config = {}
) => {
  const directionMap = {
    left: { x: -60, y: 0 },
    right: { x: 60, y: 0 },
    up: { x: 0, y: 40 },
    down: { x: 0, y: -40 },
  };

  const from = directionMap[direction];

  return gsap.fromTo(
    element,
    { autoAlpha: 0, ...from },
    {
      autoAlpha: 1,
      x: 0,
      y: 0,
      duration: 0.8,
      ease: EASINGS.smoothOut,
      ...config,
    }
  );
};

/**
 * Parallax scroll animation
 * @param element - Target element
 * @param yPercent - Percentage to move (default: 20)
 * @param scrub - Scrub value for smoothness (default: 1.2)
 * @returns GSAP Tween
 */
export const parallaxScroll = (
  element: HTMLElement,
  yPercent = 20,
  scrub = 1.2
) => {
  return gsap.to(element, {
    yPercent,
    ease: EASINGS.scrollCoupled,
    scrollTrigger: {
      trigger: element,
      start: 'top bottom',
      end: 'bottom top',
      scrub,
    },
  });
};
