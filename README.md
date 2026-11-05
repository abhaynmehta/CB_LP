# Abhay Mehta: personal portfolio

**Branch `ctf-preview` (v6):** the home page is CTRL the Funnel and Abhay together, in the agency's
brand (ink, paper, amber, keycaps, Michroma and Jost) with the Veyra concept's motion: a WebGL funnel
that scroll falls through (`src/ctf/funnel.js`), a 3D services keyboard (`src/ctf/keys.js`), a work
arc and a WhatsApp brief (`src/ctf/ui.js`). Page: `src/pages/index.astro`; styles: `src/ctf/ctf.css`;
agency facts: `src/data/agency.ts` (copied from the CtrlTheFunnel repo, every number sourced there).
Case pages take the same tokens from the v6 block at the end of `src/styles/global.css`. The v5 home
components are still in `src/components/home/`.

Astro 5 static site with GSAP, Lenis and a three.js hero (points that settle from noise into a growth curve).
Rebuilt in Oct 2026 from the old Vite/React "Content Brewer" site (kept at tag `old-content-brewer`).

- Preview (noindex): https://abhay-mehta.abhaynmehta.workers.dev, deployed with `npm run deploy:preview`
- Content: `src/data/me.ts`, which mirrors the CV (`~/Desktop/CV 2026/Abhay_Mehta_CV_PM.tex`). Keep both in sync.
- CV download: `public/Abhay_Mehta_CV.pdf` (replace it when the CV changes).
- Media comes from the CTRL the Funnel site (`public/work/`).

## Veyra concept (`/veyra/`)
A real estate launch concept for a fictional developer, on one page in three acts: a night journey
through a WebGL city (native scroll drives the camera), the Veyra Skyline launch over fixed 3D towers
(floors, home picker with cost sheet, sunlight, EMI, sample answers, site-visit booking), and the
developer (live numbers, project arc, partners).
- Page: `src/pages/veyra/index.astro`; styles and scripts: `src/veyra/` (uses the `three` dependency).
- Portfolio section: `src/components/home/Veyra.astro` (the night room, after the websites wall).
- Card images: `public/work/veyra/` are screenshots of the page. Retake them if the page changes.
- Always `noindex` and kept out of the sitemap, because Veyra is not a real company.

## Run
```
npm install
npm run dev            # http://localhost:4333 (launch config "abhay-portfolio")
npm run deploy:preview # noindex build to Cloudflare
```

## Before launch
- Production is Vercel (project linked to this repo; `main` deploys to https://abhaymehta.vercel.app; it was cb-lp.vercel.app until 26 Oct 2026). When the domain is bought, add it in Vercel and update `site` in `astro.config.mjs`.
- The old Vite site is kept at tag `old-content-brewer`.
