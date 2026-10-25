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

// HERO (WebGL): the liquid-gold sculpture with real work orbiting it. Falls back to the DOM tiles.
const canvas = $('[data-field]');
if (canvas && !reduce) {
  import('./hero3d.js').then(({ default: hero3d }) => {
    const h = hero3d(canvas, { cards: [
      { src: '/work/hosp/stays.webp', value: '₹1.4 Cr+', label: 'Direct bookings · Machan' },
      { src: '/work/ads/static-01.webp', value: '$1', label: 'Per Maldives lead' },
      { src: '/work/show/dohful/01.webp', value: '28.9x', label: 'ROAS · Dohful' },
      { src: '/work/ads/static-05.webp', value: '10,500+', label: 'Trip enquiries' },
      { src: '/work/show/omkarix-global-exim/01.webp', value: '94–99', label: 'Mobile Lighthouse' },
    ] });
    if (!h) return canvas.remove();
    canvas.closest('.hero').classList.add('gl');
    ScrollTrigger.create({ trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true, onUpdate: (st) => h.setProgress(st.progress) });
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

  // Hero tiles drift up at their own depth as you leave the hero.
  $$('[data-depth]').forEach((t) => gsap.to(t, { yPercent: -60 * Number(t.dataset.depth), ease: 'none', scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true } }));

  // IMPACT: desktop pins the section and travels along a curve that draws itself; phones fill a line.
  const growth = $('[data-growth]');
  if (growth) {
    const pts = $$('[data-gpt]', growth);
    const year = $('[data-gyear]', growth);
    if (desk) {
      growth.classList.add('pinned');
      const wrap = $('[data-gwrap]', growth), plot = $('.g-plot', growth), svg = $('[data-gsvg]', growth);
      const path = $('[data-gpath]', growth), area = $('[data-garea]', growth), clip = $('[data-gclip]', growth), tip = $('[data-gtip]', growth);
      let len = 1, W = 1, H = 1, prog = 0;
      // Smooth curve through the points (Catmull-Rom as cubic Béziers), in the plot's own pixels.
      const build = () => {
        W = plot.offsetWidth; H = plot.offsetHeight;
        svg.setAttribute('viewBox', `0 0 ${W} ${H}`);
        const P = pts.map((el) => [(Number(el.dataset.x) / 100) * W, (Number(el.dataset.y) / 100) * H]);
        let d = `M${P[0][0]},${P[0][1]}`;
        for (let i = 0; i < P.length - 1; i++) {
          const p0 = P[i - 1] || P[i], p1 = P[i], p2 = P[i + 1], p3 = P[i + 2] || P[i + 1];
          d += ` C${p1[0] + (p2[0] - p0[0]) / 6},${p1[1] + (p2[1] - p0[1]) / 6} ${p2[0] - (p3[0] - p1[0]) / 6},${p2[1] - (p3[1] - p1[1]) / 6} ${p2[0]},${p2[1]}`;
        }
        path.setAttribute('d', d);
        area.setAttribute('d', `${d} L${P[P.length - 1][0]},${H} L${P[0][0]},${H} Z`);
        len = path.getTotalLength();
        path.style.strokeDasharray = `${len} ${len}`;
        set(prog);
      };
      const set = (p) => {
        prog = p;
        if (!path.getAttribute('d')) return;
        const q = Math.min(1, p * 1.06);
        const pt = path.getPointAtLength(len * q);
        path.style.strokeDashoffset = len * (1 - q);
        clip.setAttribute('width', pt.x);
        tip.style.left = `${pt.x}px`; tip.style.top = `${pt.y}px`;
        const max = wrap.offsetWidth - innerWidth;
        wrap.style.transform = `translate3d(${-Math.max(0, Math.min(max, plot.offsetLeft + pt.x - innerWidth * 0.45))}px,0,0)`;
        let cur = pts[0];
        pts.forEach((el) => {
          const on = (pt.x / W) * 100 >= Number(el.dataset.x) - 0.5;
          if (on && !el.dataset.counted) { el.dataset.counted = '1'; countUp(el.querySelector('.g-big')); }
          el.classList.toggle('on', on); if (on) cur = el;
        });
        if (year.textContent !== cur.dataset.yr) year.textContent = cur.dataset.yr;
      };
      build();
      const o = { p: 0 };
      gsap.to(o, { p: 1, ease: 'none', onUpdate: () => set(o.p), scrollTrigger: { trigger: growth, start: 'top top', end: () => `+=${wrap.offsetWidth * 1.15}`, pin: true, scrub: 0.8, invalidateOnRefresh: true, onRefresh: build } });
    } else {
      gsap.fromTo('[data-gline]', { scaleY: 0 }, { scaleY: 1, ease: 'none', scrollTrigger: { trigger: $('.g-pts', growth), start: 'top 70%', end: 'bottom 70%', scrub: true } });
      pts.forEach((el) => ScrollTrigger.create({ trigger: el, start: 'top 72%', end: 'top -9999', toggleClass: 'on' }));
    }
  }

  // WORK: each card sinks back and darkens as the next one slides over it; media drifts inside.
  const cards = $$('[data-case]');
  cards.forEach((card, i) => {
    const next = cards[i + 1];
    if (next) gsap.to(card, { scale: 0.9, '--dim': 0.6, ease: 'none', scrollTrigger: { trigger: next.parentElement, start: 'top bottom', end: 'top 15%', scrub: true } });
    const m = card.querySelector('.case-media > img');
    if (m) gsap.fromTo(m, { yPercent: -6, scale: 1.14 }, { yPercent: 6, scale: 1.14, ease: 'none', scrollTrigger: { trigger: card, start: 'top bottom', end: 'bottom top', scrub: true } });
  });

  // IVORY ROOM: the wall's columns travel in opposite directions and each page scrolls in its window.
  const wall = $('[data-wall]');
  if (wall) {
    $$('[data-wcol]', wall).forEach((c) => {
      const d = Number(c.dataset.wcol);
      gsap.fromTo(c, { yPercent: d > 0 ? 8 : -30 }, { yPercent: d > 0 ? -30 : 8, ease: 'none', scrollTrigger: { trigger: wall, start: 'top bottom', end: 'bottom top', scrub: 0.6 } });
    });
    $$('[data-wimg]', wall).forEach((img, i) => gsap.fromTo(img, { yPercent: 0 }, { yPercent: -Number(img.dataset.wimg) * (0.55 + (i % 3) * 0.15), ease: 'none', scrollTrigger: { trigger: wall, start: 'top bottom', end: 'bottom top', scrub: 1 } }));
  }

  // LAB: the code reveals line by line, the current line marked in gold.
  const cl = $$('[data-cl]');
  if (cl.length) ScrollTrigger.create({
    trigger: '[data-code]', start: 'top 80%', end: 'bottom 35%', scrub: true,
    onUpdate: (st) => { const k = Math.round(st.progress * cl.length); cl.forEach((l, i) => { l.classList.toggle('on', i < k); l.classList.toggle('cur', i === k - 1); }); },
  });

  // ROOMS: the ivory and green rooms open like a curtain rising from the bottom edge.
  ['[data-wall]', '#lab'].forEach((sel) => {
    const el = $(sel);
    if (el) gsap.fromTo(el, { clipPath: 'circle(18% at 50% 100%)' }, { clipPath: 'circle(150% at 50% 100%)', ease: 'none', scrollTrigger: { trigger: el, start: 'top bottom', end: 'top 20%', scrub: true } });
  });

  // LIQUID: work images ripple like heated metal when you hover them.
  const liquid = $('[data-liquid]');
  if (liquid && desk) {
    const o = { s: 0 };
    const go = (to, d) => gsap.to(o, { s: to, duration: d, ease: 'power3.out', overwrite: true, onUpdate: () => liquid.setAttribute('scale', o.s.toFixed(1)) });
    const ripple = (m) => { m.style.filter = 'url(#liquid)'; gsap.timeline().add(go(46, 0.35)).add(go(0, 1.1)).call(() => (m.style.filter = '')); };
    $$('[data-case]').forEach((c) => c.addEventListener('pointerenter', () => ripple(c.querySelector('.case-media'))));
    const peek = $('[data-peekbox]');
    if (peek) $$('[data-peek]').forEach((r) => r.addEventListener('pointerenter', () => ripple(peek)));
  }

  // CONTACT: "Say hello." gathers out of gold dust as the section arrives.
  const contactSec = $('#contact'), hello = $('#contact .display');
  if (contactSec && hello) import('./contact.js').then(({ default: contact }) => {
    const c = contact(contactSec, hello);
    if (c) ScrollTrigger.create({ trigger: contactSec, start: 'top 85%', end: 'top 15%', scrub: 0.8, onUpdate: (st) => c.setIn(st.progress), onLeave: () => c.setIn(1) });
  });

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

  // FILMS: a 3D coverflow. The section pins; scrolling turns the wheel and the film in front plays.
  const films = $('[data-films]'), reels = $('[data-reels]');
  if (films && reels) {
    films.classList.add('cf');
    const items = $$('.reel', reels);
    const vids = items.map((r) => r.querySelector('video'));
    let cur = -1;
    const set = (a) => {
      items.forEach((el, i) => {
        const d = i - a, ad = Math.abs(d);
        el.style.transform = `translateX(${d * (desk ? 64 : 56)}%) translateZ(${-ad * 200}px) rotateY(${Math.max(-62, Math.min(62, -d * 44))}deg) scale(${1 - Math.min(ad, 3) * 0.05})`;
        el.style.zIndex = 100 - Math.round(ad * 10);
        el.style.opacity = ad > 3.4 ? 0 : 1 - ad * 0.14;
      });
      const k = Math.max(0, Math.min(items.length - 1, Math.round(a)));
      if (k === cur) return;
      cur = k;
      items.forEach((el, i) => el.classList.toggle('on', i === k));
      vids.forEach((v, i) => {
        if (i !== k) return v.pause();
        if (!v.src) v.src = v.dataset.src;
        v.play().catch(() => {});
      });
    };
    set(0);
    const o = { a: 0 };
    gsap.to(o, { a: items.length - 1, ease: 'none', onUpdate: () => set(o.a), scrollTrigger: { trigger: films, start: 'top top', end: () => `+=${items.length * innerHeight * 0.42}`, pin: true, scrub: 0.7, invalidateOnRefresh: true } });
  }
}

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
