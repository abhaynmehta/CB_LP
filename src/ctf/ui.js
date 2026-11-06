// Page behaviour that works without WebGL: header tone and current section, reveals, the work arc
// (turned by scroll), the industries reel, the team keycaps, the brief form (opens WhatsApp with the
// brief written out; nothing is stored), the C shortcut and a light tap of haptics on phones.
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));
const pad = (n) => String(n).padStart(2, '0');
const tap = () => { try { navigator.vibrate?.(8); } catch { /* no haptics */ } };
// progress of a tall pinned section: 0 when its top meets the viewport top, 1 when its bottom meets the viewport bottom
const pinned = (el) => { const r = el.getBoundingClientRect(); return clamp(-r.top / Math.max(1, el.offsetHeight - innerHeight)); };
// smooth scroll goes through Lenis when it runs (desktop), otherwise the browser
const glide = (y) => (window.ctfScrollTo ? window.ctfScrollTo(y) : scrollTo({ top: y, behavior: reduce ? 'auto' : 'smooth' }));
const scrollToProgress = (el, p) => glide(el.getBoundingClientRect().top + scrollY + p * (el.offsetHeight - innerHeight) + 2);

export function initUI() {
  /* reveals */
  const io = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }), { rootMargin: '0px 0px -8% 0px' });
  $$('.rv, .tkey').forEach((el) => io.observe(el));

  /* header: paper or ink under it, and the section you are in */
  const hd = $('#hd'), tones = $$('[data-tone]'), links = $$('#nav a'), targets = links.map((a) => $(a.getAttribute('href')));
  let lastK = -2;
  function header() {
    const y = hd.offsetHeight / 2; let tone = 'ink';
    for (const s of tones) { const r = s.getBoundingClientRect(); if (r.top <= y && r.bottom > y) { tone = s.dataset.tone; break; } }
    hd.classList.toggle('on-paper', tone === 'paper');
    const line = innerHeight * 0.4; let k = -1;
    targets.forEach((t, i) => { if (t && t.getBoundingClientRect().top <= line) k = i; });
    if ($('#contact').getBoundingClientRect().top <= line) k = -1;
    if (k !== lastK) { lastK = k; links.forEach((a, i) => a.classList.toggle('on', i === k)); }
  }

  /* C opens the brief */
  addEventListener('keydown', (e) => {
    if (e.metaKey || e.ctrlKey || e.altKey || e.target.closest?.('input,textarea,select,[contenteditable]')) return;
    if (e.key === 'c' || e.key === 'C') { glide($('#contact').getBoundingClientRect().top + scrollY - hd.offsetHeight); setTimeout(() => $('#bName')?.focus({ preventScroll: true }), reduce ? 0 : 700); }
  });
  document.addEventListener('pointerdown', (e) => { if (e.target.closest('.key, .round, .tkey, .picks button')) tap(); }, { passive: true });

  /* industries: scroll rolls the reel */
  const ind = $('#industries'), track = $('#indTrack'), proofs = $$('.ind-p', ind), bgs = $$('.ind-bg img', ind), bar = $('#indBar'), indCount = $('#indCount');
  const nInd = proofs.length; let lastInd = -1;
  function industries() {
    if (!ind) return;
    const r = ind.getBoundingClientRect(); if (r.bottom < 0 || r.top > innerHeight) return;
    const p = pinned(ind), f = p * (nInd - 1);
    // hold on each word, then roll to the next
    const base = Math.floor(f), t = f - base, roll = base + (t < 0.55 ? 0 : (t - 0.55) / 0.45) ** 2 * (3 - 2 * ((t - 0.55) / 0.45));
    const i = Math.min(nInd - 1, Math.floor(f) + (f - Math.floor(f) >= 0.78 ? 1 : 0));
    track.style.transform = `translateY(${(-Math.min(roll, nInd - 1) * 1.04).toFixed(4)}em)`;
    bar.style.transform = `scaleX(${p.toFixed(4)})`;
    if (i !== lastInd) { lastInd = i; proofs.forEach((el, k) => el.classList.toggle('on', k === i)); bgs.forEach((el, k) => el.classList.toggle('on', k === i)); indCount.textContent = `${pad(i + 1)} / ${pad(nInd)}`; }
  }

  /* work arc: the page scroll turns it; arrows and clicks scroll the page to a case */
  const work = $('#work'), arc = $('#arc'), cards = $$('.wcard', arc), N = cards.length, countEl = $('#count');
  let pos = 0;
  const spacing = () => (innerWidth < 560 ? 222 : 300);
  function layoutArc() {
    const sp = spacing();
    cards.forEach((c, i) => {
      const d = i - pos, ad = Math.abs(d);
      c.style.transform = `translateX(calc(-50% + ${(d * sp).toFixed(1)}px)) translateY(${(d * d * 22).toFixed(1)}px) rotate(${(d * 5.5).toFixed(2)}deg) scale(${(1 - Math.min(ad, 3) * 0.07).toFixed(3)})`;
      c.style.opacity = ad > 2.6 ? Math.max(0, 1 - (ad - 2.6) * 2).toFixed(2) : '1';
      c.style.zIndex = String(100 - Math.round(ad * 10));
      c.classList.toggle('is-center', ad < 0.5); c.setAttribute('aria-hidden', ad < 0.5 ? 'false' : 'true');
      $$('a', c).forEach((a) => (a.tabIndex = ad < 0.5 ? 0 : -1));
    });
    countEl.textContent = `${pad(Math.round(pos) + 1)} / ${pad(N)}`;
  }
  let target = 0;
  const goCase = (n) => scrollToProgress(work, clamp(n, 0, N - 1) / (N - 1));
  if (arc && N) {
    $('#prev').onclick = () => goCase(Math.round(target) - 1);
    $('#next').onclick = () => goCase(Math.round(target) + 1);
    arc.addEventListener('click', (e) => { if (e.target.closest('a')) return; const c = e.target.closest('.wcard'); if (c) goCase(+c.dataset.i); });
    arc.addEventListener('keydown', (e) => { if (e.key === 'ArrowRight') { goCase(Math.round(target) + 1); e.preventDefault(); } if (e.key === 'ArrowLeft') { goCase(Math.round(target) - 1); e.preventDefault(); } });
    // a swipe sideways on the arc moves one case
    let sx = null; arc.addEventListener('touchstart', (e) => { sx = e.touches[0].clientX; }, { passive: true });
    arc.addEventListener('touchend', (e) => { if (sx === null) return; const dx = e.changedTouches[0].clientX - sx; sx = null; if (Math.abs(dx) > 50) goCase(Math.round(target) + (dx < 0 ? 1 : -1)); }, { passive: true });
    layoutArc();
  }

  /* team: keys press in a wave once the grid is in view, and each press lights a key */
  const tkeys = $$('.tkey');
  tkeys.forEach((k) => k.addEventListener('click', () => { tkeys.forEach((o) => o.classList.toggle('lit', o === k && !k.classList.contains('lit'))); }));
  const grid = $('#tkeys');
  if (grid && !reduce) new IntersectionObserver(([e], o) => {
    if (!e.isIntersecting) return; o.disconnect();
    tkeys.forEach((k, i) => setTimeout(() => { k.classList.add('down'); setTimeout(() => k.classList.remove('down'), 140); }, 700 + i * 110));
  }, { threshold: 0.4 }).observe(grid);

  /* one loop for everything scroll-linked */
  let raf = 0;
  function frame() {
    raf = 0; header(); industries();
    if (work) { const t = pinned(work) * (N - 1); target = t; const d = t - pos; pos = Math.abs(d) < 0.001 || reduce ? t : pos + d * 0.18; layoutArc(); if (Math.abs(t - pos) > 0.001) raf = requestAnimationFrame(frame); }
  }
  const kick = () => { if (!raf) raf = requestAnimationFrame(frame); };
  addEventListener('scroll', kick, { passive: true }); addEventListener('resize', kick); kick();

  /* brief → WhatsApp */
  const brief = $('#brief');
  if (brief) {
    const picks = $$('#picks button');
    picks.forEach((b) => (b.onclick = () => b.setAttribute('aria-pressed', String(b.getAttribute('aria-pressed') !== 'true'))));
    brief.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = $('#bName').value.trim(), biz = $('#bBiz').value.trim(), err = $('#bErr');
      if (name.length < 2) { err.textContent = 'Add your name so we know who to reply to.'; $('#bName').focus(); return; }
      if (biz.length < 2) { err.textContent = 'Add your business, website or Instagram handle.'; $('#bBiz').focus(); return; }
      err.textContent = '';
      const stagesTxt = picks.filter((b) => b.getAttribute('aria-pressed') === 'true').map((b) => b.dataset.stage).join(', ') || 'Not sure yet';
      const note = $('#bNote').value.trim();
      const text = [`Hi CTRL the Funnel, I'm ${name} from ${biz}.`, `Where it leaks: ${stagesTxt}.`, `Monthly budget: ${$('#bBudget').value}.`, note && `More: ${note}`].filter(Boolean).join('\n');
      const url = `https://wa.me/${brief.dataset.wa || '919289086239'}?text=${encodeURIComponent(text)}`;
      const w = window.open(url, '_blank', 'noopener'); if (!w) location.href = url;
    });
  }
}
