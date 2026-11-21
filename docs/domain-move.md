# Moving to a custom domain without losing rankings

Today the site lives at `https://anm.abhaynmehta.workers.dev`. Everything is set up so the move is a few
switches, not a rebuild. Based on Google's "Site moves with URL changes" guide:
permanent 301 redirects from every old URL to the same path on the new domain, kept for at least a year.

## What is already in place
- The address lives in one place: `SITE_URL` (falls back to the workers.dev address in `astro.config.mjs`).
  Canonicals, sitemap, RSS, llms.txt, schema `@id`s and Open Graph all follow it.
- `worker/index.js` serves the site and, once `CANONICAL_HOST` is set, 301s every request on any other host
  to the same path on the new domain (one hop, path and query kept).
- Search Console (URL-prefix property for the workers.dev address) and GA4 (G-4CJEM1BT74) are linked.

## Move day (about 30 minutes)
1. Buy the domain, add it to Cloudflare, then in Workers → `anm` → Settings → Domains add `example.com`
   (and `www.example.com`).
2. In `wrangler.jsonc` set `"CANONICAL_HOST": "example.com"`.
3. Deploy with the new address: `SITE_URL=https://example.com npm run deploy`.
   For the hidden preview, keep redirects off: `wrangler deploy --name abhay-luxury --var CANONICAL_HOST:`.
4. Check: `curl -I https://anm.abhaynmehta.workers.dev/blog/` → `301` to `https://example.com/blog/`.
5. Search Console:
   - add a **Domain** property for `example.com` (DNS TXT record in Cloudflare);
   - submit `https://example.com/sitemap-index.xml`;
   - try **Settings → Change of address** from the workers.dev property. Google's tool needs both
     properties verified; if it refuses for a platform subdomain, the 301s alone still carry the signals.
6. GA4: Admin → Data streams → edit the stream URL to the new domain (same Measurement ID, history kept).
   Re-link Search Console to the new Domain property.
7. Bing Webmaster Tools: add the domain (import from Search Console) and use its Site Move tool.
8. IndexNow: resubmit all URLs on the new domain (the key file moves with the site).
9. Update the address on LinkedIn, the CV PDF, GitHub and every profile, so AI tools see one consistent address.
10. Keep the workers.dev redirects for at least a year. Never delete the `anm` worker.
