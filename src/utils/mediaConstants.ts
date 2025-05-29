
/**
 * Centralized media URLs for easy management and replacement
 * Replace these URLs with your actual content when ready
 */

// Video URLs - Replace with your actual video IDs/URLs
export const VIDEO_URLS = {
  testimonials: {
    client1: "dQw4w9WgXcQ", // Replace with actual YouTube ID
    client2: "dQw4w9WgXcQ", // Replace with actual YouTube ID
  },
  casestudies: {
    luxuryFashion: "dQw4w9WgXcQ", // Replace with actual YouTube ID
    techStartup: "dQw4w9WgXcQ", // Replace with actual YouTube ID
    wellnessBrand: "dQw4w9WgXcQ", // Replace with actual YouTube ID
    architectureFirm: "dQw4w9WgXcQ", // Replace with actual YouTube ID
  }
} as const;

// Image URLs - Replace with your actual image URLs
export const IMAGE_URLS = {
  testimonials: {
    client1: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    client2: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
  },
  casestudies: {
    luxuryFashion: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    techStartup: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    wellnessBrand: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    architectureFirm: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
  },
  gallery: {
    // Add your gallery image URLs here when ready
    placeholder: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  },
  backgrounds: {
    webDevelopment: "https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
  }
} as const;

// SEO and branding assets
export const BRAND_ASSETS = {
  logo: "https://lovable.dev/logo.png", // Replace with your actual logo
  ogImage: "https://lovable.dev/opengraph-image-p98pqg.png", // Replace with your OG image
  favicon: "/favicon.ico", // Update when you add your favicon
} as const;
