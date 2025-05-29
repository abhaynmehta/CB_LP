
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

// Gradient configurations for consistent use across components
export const GRADIENTS = {
  primary: 'bg-gradient-to-r from-brand-mountain-meadow to-brand-gossamer',
  primaryVertical: 'bg-gradient-to-b from-brand-mountain-meadow to-brand-gossamer',
  background: 'bg-gradient-to-br from-brand-black via-brand-cod-gray to-brand-black',
  backgroundAlt: 'bg-gradient-to-br from-brand-cod-gray via-brand-black to-brand-cod-gray',
  overlay: 'bg-gradient-to-t from-brand-black/80 via-transparent to-transparent',
  text: 'bg-gradient-to-r from-white via-brand-mountain-meadow to-white bg-clip-text text-transparent',
  subtle: 'bg-gradient-to-r from-brand-mountain-meadow/5 via-transparent to-brand-gossamer/5',
  hover: 'hover:bg-gradient-to-r hover:from-brand-mountain-meadow/10 hover:to-brand-gossamer/10',
} as const;

// Animation durations (in seconds)
export const ANIMATION_DURATIONS = {
  fast: 0.3,
  normal: 0.6,
  slow: 0.8,
  verySlow: 1.2,
} as const;

// Breakpoints (matching Tailwind defaults) with mobile-first approach
export const BREAKPOINTS = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
} as const;

// Mobile optimization constants
export const MOBILE_CONFIG = {
  maxCardWidth: '90vw',
  touchTargetSize: '44px', // Minimum touch target size for mobile
  scrollThreshold: 0.1, // Intersection observer threshold for mobile
  gestureThreshold: 50, // Swipe gesture threshold
} as const;

// Common transition configurations optimized for mobile
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
  mobileOptimized: {
    duration: ANIMATION_DURATIONS.fast,
    ease: "easeInOut" as const,
  },
} as const;

// Particle system configuration
export const PARTICLES_CONFIG = {
  baseSpeed: 1,
  interactionSpeedReduction: 0.3, // 30% speed reduction on interaction
  mobileParticleCount: 0.5, // 50% particles on mobile for performance
} as const;

// SEO-related constants
export const SEO_CONFIG = {
  siteName: 'Content Brewer',
  siteDescription: 'Premium content creation and brand strategy agency specializing in luxury branding, web development, and digital marketing solutions',
  siteUrl: 'https://contentbrewer.com',
  twitterHandle: '@contentbrewer',
  defaultImage: 'https://lovable.dev/opengraph-image-p98pqg.png',
  keywords: [
    'brand strategy',
    'web development', 
    'content marketing',
    'luxury branding',
    'digital agency',
    'social media campaigns',
    'app development',
    'content creation'
  ],
} as const;

// Contact information
export const CONTACT_INFO = {
  email: 'hello@contentbrewer.com',
  phone: '+1 (555) 123-4567',
  address: 'San Francisco, CA',
  social: {
    twitter: 'https://twitter.com/contentbrewer',
    linkedin: 'https://linkedin.com/company/contentbrewer',
    instagram: 'https://instagram.com/contentbrewer',
  }
} as const;
