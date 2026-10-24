// Behaviour that works without the motion library: reveals, header, cursor, videos, copy, scramble.
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;

// Reveals (hidden state only exists under .motion, set in <head>).
const io = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }), { rootMargin: '0px 0px -8% 0px' });
$$('.rv').forEach((el) => io.observe(el));

// Header hides on the way down, returns on the way up.
const hd = $('[data-hd]');
let lastY = 0;
addEventListener('scroll', () => { const y = scrollY; hd.classList.toggle('hide', y > 300 && y > lastY); lastY = y; }, { passive: true });

// Videos load and play only while visible.
const vio = new IntersectionObserver((es) => es.forEach(({ target: v, isIntersecting: on }) => {
  if (on && !v.src) v.src = v.dataset.src;
  if (on && !reduce) v.play().catch(() => {}); else v.pause();
}), { threshold: 0.2 });
$$('video[data-src]').forEach((v) => vio.observe(v));

// Cursor: a small lime dot that grows into a label over links that ask for one.
const cur = $('[data-cursor]');
if (cur && matchMedia('(hover: hover)').matches && !reduce) {
  const label = cur.querySelector('span');
  let x = innerWidth / 2, y = innerHeight / 2, cx = x, cy = y;
  addEventListener('pointermove', (e) => { x = e.clientX; y = e.clientY; cur.classList.add('live'); }, { passive: true });
  const loop = () => { cx += (x - cx) * 0.22; cy += (y - cy) * 0.22; cur.style.translate = `${cx}px ${cy}px`; requestAnimationFrame(loop); };
  loop();
  $$('[data-cursor-text]').forEach((el) => {
    el.addEventListener('pointerenter', () => { label.textContent = el.dataset.cursorText; cur.classList.add('big'); });
    el.addEventListener('pointerleave', () => cur.classList.remove('big'));
  });
} else if (cur) cur.remove();

// Copy email.
$$('[data-copy]').forEach((b) => b.addEventListener('click', async () => {
  try { await navigator.clipboard.writeText(b.dataset.copy); b.textContent = 'Copied ✓'; } catch { location.href = `mailto:${b.dataset.copy}`; }
  setTimeout(() => (b.textContent = 'Copy email'), 1800);
}));

// Labels decode like a terminal when they come into view or are hovered.
const glyphs = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#%&*+=/<>';
function scramble(el) {
  if (reduce || el.dataset.busy) return;
  const final = el.dataset.text || (el.dataset.text = el.textContent);
  el.dataset.busy = '1';
  let f = 0;
  const steps = 18;
  const tick = () => {
    const done = Math.floor((f / steps) * final.length);
    el.textContent = final.split('').map((c, i) => (i < done || c === ' ' ? c : glyphs[(Math.random() * glyphs.length) | 0])).join('');
    if (++f <= steps) requestAnimationFrame(tick); else { el.textContent = final; delete el.dataset.busy; }
  };
  tick();
}
const sio = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) { scramble(e.target); sio.unobserve(e.target); } }), { threshold: 1 });
$$('[data-scramble]').forEach((el) => { sio.observe(el); el.closest('a')?.addEventListener('pointerenter', () => scramble(el)); });

const hover = matchMedia('(hover: hover)').matches && !reduce;
const motionOn = document.documentElement.classList.contains('motion');

// Headings split into words that rise out of a mask when they come into view.
function split(el) {
  let w = 0;
  const walk = (node) => [...node.childNodes].forEach((n) => {
    if (n.nodeType === 1) return walk(n);
    if (n.nodeType !== 3) return;
    const frag = document.createDocumentFragment();
    n.textContent.split(/(\s+)/).forEach((part) => {
      if (!part) return;
      if (!part.trim()) return frag.append(part);
      const o = document.createElement('span'), i = document.createElement('span');
      o.className = 'wd'; o.style.setProperty('--w', w++); i.textContent = part;
      o.append(i); frag.append(o);
    });
    n.replaceWith(frag);
  });
  walk(el);
  el.classList.add('split');
}
if (motionOn) $$('.h2.rv').forEach(split);

// Local time in Delhi.
const clock = $('[data-clock]');
if (clock) {
  const fmt = new Intl.DateTimeFormat('en-GB', { hour: '2-digit', minute: '2-digit', timeZone: 'Asia/Kolkata' });
  const tick = () => (clock.textContent = fmt.format(new Date()));
  tick(); setInterval(tick, 20000);
}

if (hover) {
  // Ring that trails the cursor and lights up over anything clickable.
  const ring = $('[data-ring]');
  if (ring) {
    let x = -100, y = -100, rx = x, ry = y;
    addEventListener('pointermove', (e) => { x = e.clientX; y = e.clientY; ring.classList.add('live'); }, { passive: true });
    document.addEventListener('pointerover', (e) => {
      const t = e.target.closest('a, button, [data-magnet]');
      ring.classList.toggle('hot', !!t);
      ring.classList.toggle('gone', !!e.target.closest('[data-cursor-text]'));
    });
    const loop = () => { rx += (x - rx) * 0.13; ry += (y - ry) * 0.13; ring.style.translate = `${rx}px ${ry}px`; requestAnimationFrame(loop); };
    loop();
  }

  // Magnetic buttons pull toward the pointer.
  $$('[data-magnet]').forEach((el) => {
    el.addEventListener('pointermove', (e) => {
      const r = el.getBoundingClientRect();
      el.style.transform = `translate(${(e.clientX - r.left - r.width / 2) * 0.3}px, ${(e.clientY - r.top - r.height / 2) * 0.4}px)`;
    });
    el.addEventListener('pointerleave', () => (el.style.transform = ''));
  });

  // Work cards tilt in 3D with a moving glare.
  $$('[data-tilt]').forEach((el) => {
    el.addEventListener('pointermove', (e) => {
      const r = el.getBoundingClientRect(), px = (e.clientX - r.left) / r.width, py = (e.clientY - r.top) / r.height;
      el.classList.add('tilting');
      el.style.setProperty('--rx', `${(0.5 - py) * 9}deg`);
      el.style.setProperty('--ry', `${(px - 0.5) * 12}deg`);
      el.style.setProperty('--gx', `${px * 100}%`);
      el.style.setProperty('--gy', `${py * 100}%`);
    });
    el.addEventListener('pointerleave', () => { el.classList.remove('tilting'); el.style.setProperty('--rx', '0deg'); el.style.setProperty('--ry', '0deg'); });
  });

  // Big letters lift and swell as the pointer passes over them.
  $$('[data-lean]').forEach((box) => {
    const chs = $$('.ch', box).map((el) => ({ el, f: 0 }));
    let px = -9999, py = -9999, raf = 0;
    const run = () => {
      let moving = false;
      chs.forEach((c) => {
        const r = c.el.getBoundingClientRect();
        const d = Math.hypot(px - (r.left + r.width / 2), py - (r.top + r.height / 2));
        const target = Math.max(0, 1 - d / Math.max(180, r.height * 1.4));
        c.f += (target - c.f) * 0.16;
        if (Math.abs(target - c.f) > 0.002) moving = true;
        c.el.style.transform = c.f > 0.001 ? `translateY(${-c.f * 0.12}em) scale(${1 + c.f * 0.1}) rotate(${(px < r.left ? -1 : 1) * c.f * 4}deg)` : '';
      });
      raf = moving ? requestAnimationFrame(run) : 0;
    };
    const kick = () => { if (!raf) raf = requestAnimationFrame(run); };
    box.addEventListener('pointermove', (e) => { px = e.clientX; py = e.clientY; kick(); });
    box.addEventListener('pointerleave', () => { px = py = -9999; kick(); });
  });

  // Drag the case-page strip with the mouse.
  $$('[data-drag]').forEach((el) => {
    let down = false, sx = 0, sl = 0, moved = false;
    el.addEventListener('pointerdown', (e) => { if (e.pointerType !== 'mouse') return; down = true; moved = false; sx = e.clientX; sl = el.scrollLeft; el.style.scrollSnapType = 'none'; });
    addEventListener('pointermove', (e) => { if (!down) return; const dx = e.clientX - sx; if (Math.abs(dx) > 4) moved = true; el.scrollLeft = sl - dx; });
    addEventListener('pointerup', () => { if (!down) return; down = false; el.style.scrollSnapType = ''; });
    el.addEventListener('click', (e) => { if (moved) e.preventDefault(); }, true);
    el.addEventListener('dragstart', (e) => e.preventDefault());
  });
}
