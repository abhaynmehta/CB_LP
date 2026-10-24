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
