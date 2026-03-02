
/**
 * Application constants and configuration
 * Centralizes commonly used values to maintain consistency
 */

// Brand colors (matching Tailwind config)
export const BRAND_COLORS = {
  primary: '#15cea0', // brand-mountain-meadow
  secondary: '#0c9a77', // brand-gossamer
  black: '#000000', // brand-black
  gray: '#1a1a1a', // brand-cod-gray
} as const;

// Animation durations (in seconds)
export const ANIMATION_DURATIONS = {
  fast: 0.3,
  normal: 0.6,
  slow: 0.8,
  verySlow: 1.2,
} as const;

// Breakpoints (matching Tailwind defaults)
export const BREAKPOINTS = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
} as const;

// Common transition configurations
export const TRANSITIONS = {
  spring: {
    type: "spring" as const,
    stiffness: 300,
    damping: 20,
  },
  smooth: {
    duration: ANIMATION_DURATIONS.normal,
    ease: "easeOut" as const,
  },
  bounce: {
    type: "spring" as const,
    stiffness: 100,
    damping: 12,
  },
} as const;

// SEO-related constants
export const SEO_CONFIG = {
  siteName: 'Abhay Mehta',
  siteDescription: 'Digital Marketer & Brand Manager | IT & Frontend Developer',
  siteUrl: 'https://abhaymehta.dev',
  twitterHandle: '@abhaymehta',
  defaultImage: 'https://lovable.dev/opengraph-image-p98pqg.png',
} as const;

// Contact information
export const CONTACT_INFO = {
  email: 'hello@abhaymehta.dev',
  phone: '+1 (555) 123-4567',
  address: 'San Francisco, CA',
} as const;
