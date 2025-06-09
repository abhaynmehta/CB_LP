/**
 * Vite configuration file
 * Configures build settings, development server, and plugins
 */
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    // Security headers
    headers: {
      'X-Content-Type-Options': 'nosniff',
      'X-Frame-Options': 'DENY',
      'X-XSS-Protection': '1; mode=block',
    },
  },
  build: {
    // Production optimizations
    minify: 'terser',
    sourcemap: mode === 'development',
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom'],
          // Group Radix UI components individually
          'radix-accordion': ['@radix-ui/react-accordion'],
          'radix-alert-dialog': ['@radix-ui/react-alert-dialog'],
          'radix-aspect-ratio': ['@radix-ui/react-aspect-ratio'],
          'radix-avatar': ['@radix-ui/react-avatar'],
          'radix-checkbox': ['@radix-ui/react-checkbox'],
          'radix-collapsible': ['@radix-ui/react-collapsible'],
          'radix-context-menu': ['@radix-ui/react-context-menu'],
          'radix-dialog': ['@radix-ui/react-dialog'],
          'radix-dropdown-menu': ['@radix-ui/react-dropdown-menu'],
          'radix-hover-card': ['@radix-ui/react-hover-card'],
          'radix-label': ['@radix-ui/react-label'],
          'radix-menubar': ['@radix-ui/react-menubar'],
          'radix-navigation-menu': ['@radix-ui/react-navigation-menu'],
          'radix-popover': ['@radix-ui/react-popover'],
          'radix-progress': ['@radix-ui/react-progress'],
          'radix-radio-group': ['@radix-ui/react-radio-group'],
          'radix-scroll-area': ['@radix-ui/react-scroll-area'],
          'radix-select': ['@radix-ui/react-select'],
          'radix-separator': ['@radix-ui/react-separator'],
          'radix-slider': ['@radix-ui/react-slider'],
          'radix-slot': ['@radix-ui/react-slot'],
          'radix-switch': ['@radix-ui/react-switch'],
          'radix-tabs': ['@radix-ui/react-tabs'],
          'radix-toast': ['@radix-ui/react-toast'],
          'radix-toggle': ['@radix-ui/react-toggle'],
          'radix-toggle-group': ['@radix-ui/react-toggle-group'],
          'radix-tooltip': ['@radix-ui/react-tooltip'],
        },
      },
    },
  },
  plugins: [
    react(),
    mode === 'development' &&
    componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
