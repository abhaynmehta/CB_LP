
/**
 * Theme utility functions and class configurations
 * Provides consistent styling patterns across components
 */

// Common gradient classes
export const gradients = {
  primary: 'bg-gradient-to-r from-brand-mountain-meadow to-brand-gossamer',
  background: 'bg-gradient-to-br from-brand-black via-brand-cod-gray to-brand-black',
  overlay: 'bg-gradient-to-t from-brand-black/90 via-transparent to-transparent',
  card: 'bg-gradient-to-br from-brand-mountain-meadow/10 via-transparent to-brand-gossamer/10',
} as const;

// Common shadow configurations
export const shadows = {
  glow: '0 25px 50px rgba(21, 206, 160, 0.3)',
  soft: '0 4px 20px rgba(0, 0, 0, 0.1)',
  medium: '0 8px 30px rgba(0, 0, 0, 0.2)',
  strong: '0 15px 40px rgba(0, 0, 0, 0.3)',
} as const;

// Typography classes
export const typography = {
  heading: {
    primary: 'font-playfair text-4xl md:text-6xl font-bold text-white',
    secondary: 'font-playfair text-2xl md:text-3xl font-semibold text-white',
    tertiary: 'font-playfair text-xl font-semibold text-white',
  },
  body: {
    large: 'font-inter text-xl text-gray-300',
    normal: 'font-inter text-base text-gray-300',
    small: 'font-inter text-sm text-gray-400',
  },
  accent: 'text-brand-mountain-meadow font-inter uppercase tracking-wider text-sm',
} as const;

// Button variants
export const buttons = {
  primary: 'bg-brand-mountain-meadow text-brand-black hover:bg-brand-gossamer font-inter font-semibold transition-all duration-300',
  secondary: 'border border-brand-mountain-meadow text-brand-mountain-meadow hover:bg-brand-mountain-meadow hover:text-brand-black font-inter font-semibold transition-all duration-300',
  ghost: 'text-white hover:text-brand-mountain-meadow font-inter transition-colors duration-300',
} as const;

// Container classes
export const containers = {
  section: 'py-20',
  content: 'container mx-auto px-6',
  grid: {
    auto: 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8',
    services: 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8',
    team: 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8',
  },
} as const;

/**
 * Utility function to combine theme classes with custom classes
 */
export const combineClasses = (...classes: (string | undefined | null | false)[]): string => {
  return classes.filter(Boolean).join(' ');
};

/**
 * Get responsive text size based on hierarchy
 */
export const getResponsiveText = (level: 'h1' | 'h2' | 'h3' | 'h4' | 'body' | 'small') => {
  const sizes = {
    h1: 'text-5xl md:text-7xl lg:text-8xl',
    h2: 'text-4xl md:text-6xl',
    h3: 'text-2xl md:text-3xl',
    h4: 'text-xl md:text-2xl',
    body: 'text-base md:text-lg',
    small: 'text-sm md:text-base',
  };
  
  return sizes[level];
};
