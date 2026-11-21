import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// `site` drives canonical URLs and the sitemap. Change it when the personal domain is bought.
export default defineConfig({
  site: process.env.SITE_URL || 'https://anm.abhaynmehta.workers.dev', // the one place the address lives; see docs/domain-move.md
  integrations: [sitemap({ filter: (p) => !p.includes('/404'), lastmod: new Date() })],
  prefetch: { prefetchAll: true, defaultStrategy: 'hover' },
  build: { inlineStylesheets: 'always' },
  compressHTML: true,
  devToolbar: { enabled: false },
});
