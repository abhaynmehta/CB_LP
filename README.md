# Abhay Mehta: personal portfolio

Astro 5 static site with GSAP, Lenis and a three.js hero (points that settle from noise into a growth curve).
Rebuilt in Oct 2026 from the old Vite/React site (kept at a git tag; run `git tag`).

- Live: https://anm.abhaynmehta.workers.dev (Cloudflare Worker `anm`), deployed with `npm run deploy`
- Preview (noindex): https://abhay-luxury.abhaynmehta.workers.dev, deployed with `npm run deploy:preview`
- Content: `src/data/me.ts`, which mirrors the CV (`~/Desktop/CV 2026/Abhay_Mehta_CV_PM.tex`). Keep both in sync.
- CV download: `public/Abhay_Mehta_CV.pdf` (replace it when the CV changes).
- Media comes from the CTRL the Funnel site (`public/work/`).

## Run
```
npm install
npm run dev            # http://localhost:4333 (launch config "abhay-portfolio")
npm run deploy         # live site to Cloudflare (anm)
npm run deploy:preview # noindex build to the Cloudflare preview
```

## Before launch
- Production is Cloudflare (Worker `anm`, deployed by hand with `npm run deploy`; Vercel was used until Nov 2026; cb-lp.vercel.app now only redirects here, see vercel.json). For a custom domain, add it to the `anm` Worker in Cloudflare and update `site` in `astro.config.mjs`.
- The old Vite site is kept at a git tag (run `git tag`).
