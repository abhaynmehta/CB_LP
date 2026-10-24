// Scroll-driven motion. Loaded at idle; content is visible even if this never runs.
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

gsap.registerPlugin(ScrollTrigger);
const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const desk = matchMedia('(min-width: 860px) and (hover: hover)').matches;
const spring = (wT) => (p) => (p >= 1 ? 1 : 1 - (1 + p * wT) * Math.exp(-p * wT));
const HEAVY = spring(9);

// HERO FIELD (WebGL): only when the browser can do it, and never for reduced motion.
const canvas = $('[data-field]');
if (canvas && !reduce) {
  import('./field.js').then(({ default: field }) => {
    const f = field(canvas);
    if (f) ScrollTrigger.create({ trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true, onUpdate: (st) => f.setProgress(st.progress) });
  }).catch(() => canvas.remove());
}

if (!reduce) {
  const lenis = new Lenis({ smoothWheel: true, syncTouch: false, lerp: 0.09 });
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((t) => lenis.raf(t * 1000));
  gsap.ticker.lagSmoothing(0);
  document.addEventListener('click', (e) => {
    const a = e.target.closest('a[href^="/#"], a[href^="#"]');
    if (!a || location.pathname !== '/') return;
    const el = document.querySelector(a.hash);
    if (el) { e.preventDefault(); lenis.scrollTo(el, { offset: -80 }); }
  });

  // Hero name drifts apart as you scroll away.
  gsap.to('[data-hero-name] .ln:first-child', { xPercent: -8, ease: 'none', scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true } });
  gsap.to('[data-hero-name] .ln:last-child', { xPercent: 10, ease: 'none', scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true } });

  // Statement lights word by word with the scroll.
  const words = $$('[data-statement] .w');
  if (words.length) ScrollTrigger.create({
    trigger: '[data-statement]', start: 'top 80%', end: 'bottom 45%', scrub: true,
    onUpdate: (st) => { const n = Math.round(st.progress * words.length); words.forEach((w, i) => w.classList.toggle('on', i < n)); },
  });

  // Work cards: media wipes open; cards bend with scroll speed on desktop.
  $$('[data-reveal]').forEach((m) => {
    gsap.fromTo(m, { clipPath: 'inset(14% 10% 14% 10% round 20px)' }, { clipPath: 'inset(0% 0% 0% 0% round 20px)', ease: 'none', scrollTrigger: { trigger: m, start: 'top 95%', end: 'top 45%', scrub: 0.6 } });
    const inner = m.querySelector('img, video');
    if (inner) gsap.fromTo(inner, { scale: 1.22 }, { scale: 1, ease: 'none', scrollTrigger: { trigger: m, start: 'top 95%', end: 'bottom 20%', scrub: 0.6 } });
  });
  const bendEls = $$('[data-bend]');
  if (bendEls.length && desk) {
    let target = 0, cur = 0;
    lenis.on('scroll', (e) => { target = Math.max(-1, Math.min(1, e.velocity / 40)); });
    gsap.ticker.add(() => {
      target *= 0.9; cur += (target - cur) * 0.14;
      if (Math.abs(cur) < 0.002) { if (cur) { cur = 0; bendEls.forEach((el) => (el.style.transform = '')); } return; }
      const t = `perspective(1400px) rotateX(${(-cur * 9).toFixed(2)}deg) skewY(${(cur * 1.6).toFixed(2)}deg)`;
      bendEls.forEach((el) => (el.style.transform = t));
    });
  }

  // Terminal types itself out line by line.
  const tl = $$('[data-tl]');
  if (tl.length) {
    gsap.set(tl, { opacity: 0 });
    ScrollTrigger.create({ trigger: '[data-term]', start: 'top 75%', once: true, onEnter: () => gsap.to(tl, { opacity: 1, duration: 0.05, stagger: 0.22 }) });
  }

  // Footer name slides in from the right and fills with lime as the page ends.
  gsap.fromTo('.ft-big', { xPercent: 12, '--f': '0%' }, { xPercent: -4, '--f': '100%', ease: 'none', scrollTrigger: { trigger: '.ft', start: 'top bottom', end: 'bottom bottom', scrub: true } });

  // Hero content sinks and fades as you leave it.
  gsap.to('.hero-in', { yPercent: 12, opacity: 0.15, ease: 'none', scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true } });

  // Marquee: always moving; scroll speed pushes it faster and scroll direction flips it.
  const rows = $$('[data-mq]').map((el) => ({ el, x: 0, dir: Number(el.dataset.dir || 1), w: el.firstElementChild.offsetWidth }));
  if (rows.length) {
    let lastY = scrollY, boost = 0, sign = 1;
    addEventListener('resize', () => rows.forEach((r) => (r.w = r.el.firstElementChild.offsetWidth)));
    gsap.ticker.add((t, dt) => {
      const dy = scrollY - lastY; lastY = scrollY;
      if (dy) sign = dy > 0 ? 1 : -1;
      boost += (Math.min(40, Math.abs(dy)) - boost) * 0.1;
      rows.forEach((r) => {
        r.x -= (0.6 + boost * 0.5) * r.dir * sign * (dt / 16.7);
        if (r.x <= -r.w) r.x += r.w; else if (r.x > 0) r.x -= r.w;
        r.el.style.transform = `translate3d(${r.x}px,0,0)`;
      });
    });
  }

  // Statement badge spins with the scroll.
  gsap.to('[data-badge]', { rotate: 540, ease: 'none', scrollTrigger: { trigger: '#about', start: 'top bottom', end: 'bottom top', scrub: 0.5 } });

  // Snapchat panel: the lime panel opens out of a rounded card, then the odometer rolls to the real number.
  const big = $('[data-big]');
  if (big) {
    gsap.fromTo(big, { clipPath: 'inset(8% 5% 8% 5% round 48px)' }, { clipPath: 'inset(0% 0% 0% 0% round 0px)', ease: 'none', scrollTrigger: { trigger: big, start: 'top bottom', end: 'top top', scrub: true } });
    const ds = $$('.odo-d', big).map((el, i, a) => ({ s: el.firstElementChild, t: Number(el.dataset.d), turns: a.length - i, i }));
    const set = (p) => ds.forEach((d) => {
      const local = Math.max(0, Math.min(1, (p - d.i * 0.035) / 0.6));
      const e = 1 - Math.pow(1 - local, 3);
      const v = (d.t + 10 * d.turns) * e;
      d.s.style.transform = `translateY(${-(v % 10)}em)`;
    });
    set(0);
    ScrollTrigger.create({ trigger: big, start: desk ? 'top top' : 'top 70%', end: desk ? '+=120%' : 'bottom 60%', pin: desk, scrub: true, onUpdate: (st) => set(st.progress), onLeave: () => set(1) });
    gsap.from($$('.snap-cap, .snap .eyebrow', big), { y: 30, opacity: 0, duration: 1, ease: HEAVY, stagger: 0.1, scrollTrigger: { trigger: big, start: 'top 40%' } });
  }

  // Films: on desktop the reel row is pinned and slides sideways as you scroll down.
  const films = $('[data-films]'), reels = $('[data-reels]');
  if (films && reels && desk) {
    films.classList.add('pinx');
    const dist = () => Math.max(0, reels.scrollWidth - innerWidth + 40);
    gsap.to(reels, { x: () => -dist(), ease: 'none', scrollTrigger: { trigger: films, start: 'top top', end: () => `+=${dist()}`, pin: true, scrub: 0.6, invalidateOnRefresh: true } });
    $$('.reel', reels).forEach((r, i) => gsap.fromTo(r, { y: i % 2 ? 60 : -20, rotate: i % 2 ? 2 : -2 }, { y: i % 2 ? -20 : 40, rotate: 0, ease: 'none', scrollTrigger: { trigger: films, start: 'top top', end: () => `+=${dist()}`, scrub: true, invalidateOnRefresh: true } }));
  }
}

// THE RECORD: the role in view lights up; the pinned side shows its date and company; a line fills with progress.
const rolesEls = $$('[data-role]');
const dateEl = $('[data-rec-date]');
const orgEl = $('[data-rec-org]');
const idxEl = $('[data-rec-idx]');
const bar = $('[data-rec-bar]');
rolesEls.forEach((el, i) => ScrollTrigger.create({
  trigger: el, start: 'top 55%', end: 'bottom 45%',
  onToggle: (st) => {
    el.classList.toggle('on', st.isActive);
    if (!st.isActive || !dateEl) return;
    if (dateEl.textContent !== el.dataset.date) {
      if (!reduce) gsap.fromTo([dateEl, orgEl], { yPercent: 40, opacity: 0 }, { yPercent: 0, opacity: 1, duration: 0.5, ease: HEAVY });
      dateEl.textContent = el.dataset.date;
      orgEl.textContent = el.dataset.org;
      if (idxEl) idxEl.textContent = el.dataset.idx;
    }
  },
}));
if (bar && rolesEls.length) gsap.to(bar, { scaleX: 1, ease: 'none', scrollTrigger: { trigger: rolesEls[0], start: 'top 55%', endTrigger: rolesEls[rolesEls.length - 1], end: 'bottom 45%', scrub: true } });

// Numbers count up from zero, keeping prefix and suffix.
function countUp(el) {
  const raw = el.textContent;
  const m = raw.match(/[\d,.]+/);
  if (!m || reduce || /[→–]/.test(raw)) return;
  const target = parseFloat(m[0].replace(/,/g, ''));
  const dec = (m[0].split('.')[1] || '').length;
  const o = { v: 0 };
  gsap.to(o, { v: target, duration: 1.6, ease: HEAVY, onUpdate: () => (el.textContent = raw.replace(m[0], dec ? o.v.toFixed(dec) : Math.round(o.v).toLocaleString('en-IN'))), onComplete: () => (el.textContent = raw) });
}
$$('[data-count], .metrics b').forEach((el) => ScrollTrigger.create({ trigger: el, start: 'top 92%', once: true, onEnter: () => countUp(el) }));

ScrollTrigger.sort();
addEventListener('load', () => ScrollTrigger.refresh());
