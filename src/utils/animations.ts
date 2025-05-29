
/**
 * Common animation configurations used across components
 * Centralizes animation settings to maintain consistency and reduce duplication
 */

import { Variants } from 'framer-motion';

// Standard fade in animation from bottom
export const fadeInFromBottom: Variants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0 }
};

// Fade in with scale effect
export const fadeInWithScale: Variants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1 }
};

// Slide in from left animation
export const slideInFromLeft: Variants = {
  hidden: { opacity: 0, x: -50 },
  visible: { opacity: 1, x: 0 }
};

// Slide in from right animation
export const slideInFromRight: Variants = {
  hidden: { opacity: 0, x: 50 },
  visible: { opacity: 1, x: 0 }
};

// Standard transition settings
export const standardTransition = {
  duration: 0.8,
  ease: "easeOut"
};

// Staggered children animation
export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1
    }
  }
};

// Hover scale effect
export const hoverScale = {
  scale: 1.05,
  transition: { type: "spring", stiffness: 300, damping: 20 }
};

// Loading animation for interactive elements
export const loadingDots: Variants = {
  animate: {
    y: [0, -10, 0],
    transition: {
      duration: 0.6,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
};
