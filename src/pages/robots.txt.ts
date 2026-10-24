import type { APIRoute } from 'astro';
export const GET: APIRoute = ({ site }) => new Response(process.env.NOINDEX === '1' ? 'User-agent: *\nDisallow: /\n' : `User-agent: *\nAllow: /\n\nSitemap: ${new URL('/sitemap-index.xml', site)}\n`);
