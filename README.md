# Abhay Mehta: personal portfolio

Astro 5 static site with GSAP, Lenis and a three.js hero (points that settle from noise into a growth curve).
Rebuilt in Oct 2026 from the old Vite/React "Content Brewer" site (still on `main`, live at cb-lp.vercel.app).

- Preview (noindex): https://abhay-mehta.abhaynmehta.workers.dev, deployed with `npm run deploy:preview`
- Content: `src/data/me.ts`, which mirrors the CV (`~/Desktop/CV 2026/Abhay_Mehta_CV_PM.tex`). Keep both in sync.
- CV download: `public/Abhay_Mehta_CV.pdf` (replace it when the CV changes).
- Media comes from the CTRL the Funnel site (`public/work/`).

## Run
```
npm install
npm run dev            # http://localhost:4333 (launch config "abhay-portfolio")
npm run deploy:preview # noindex build to Cloudflare
```

## Before launch
- Production is Vercel (project linked to this repo; `main` deploys to https://cb-lp.vercel.app). When the domain is bought, add it in Vercel and update `site` in `astro.config.mjs`.
- The old Vite site is kept at tag `old-content-brewer`.
