import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// `site` drives canonical URLs and the sitemap. Change it when the personal domain is bought.
export default defineConfig({
  site: 'https://abhaymehta.vercel.app', // the Vercel project is named abhaymehta; change to the personal domain once it is bought
  integrations: [sitemap({ filter: (p) => !p.includes('/404') })],
  prefetch: { prefetchAll: true, defaultStrategy: 'hover' },
  build: { inlineStylesheets: 'always' },
  compressHTML: true,
  devToolbar: { enabled: false },
});
