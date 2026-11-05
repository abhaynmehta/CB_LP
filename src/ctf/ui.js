// Page behaviour that works without WebGL: header tone and current section, reveals, the work arc,
// the brief form (opens WhatsApp with the brief written out; nothing is stored), and the C shortcut.
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;

export function initUI() {
  /* reveals */
  const io = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }), { rootMargin: '0px 0px -8% 0px' });
  $$('.rv').forEach((el) => io.observe(el));

  /* header: paper or ink under it, and the section you are in */
  const hd = $('#hd'), tones = $$('[data-tone]'), links = $$('#nav a'), targets = links.map((a) => $(a.getAttribute('href')));
  let lastK = -1;
  function onScroll() {
    const y = hd.offsetHeight / 2; let tone = 'ink';
    for (const s of tones) { const r = s.getBoundingClientRect(); if (r.top <= y && r.bottom > y) { tone = s.dataset.tone; break; } }
    hd.classList.toggle('on-paper', tone === 'paper');
    const line = innerHeight * 0.4; let k = -1;
    targets.forEach((t, i) => { if (t && t.getBoundingClientRect().top <= line) k = i; });
    if ($('#contact').getBoundingClientRect().top <= line) k = -1;
    if (k !== lastK) { lastK = k; links.forEach((a, i) => a.classList.toggle('on', i === k)); }
  }
  addEventListener('scroll', onScroll, { passive: true }); onScroll();

  /* C opens the brief */
  addEventListener('keydown', (e) => {
    if (e.metaKey || e.ctrlKey || e.altKey || e.target.closest?.('input,textarea,select,[contenteditable]')) return;
    if (e.key === 'c' || e.key === 'C') { $('#contact').scrollIntoView({ behavior: reduce ? 'auto' : 'smooth' }); setTimeout(() => $('#bName')?.focus({ preventScroll: true }), reduce ? 0 : 700); }
  });

  /* work arc: drag, arrows, keys; the centre card opens its case */
  const arc = $('#arc'), cards = $$('.wcard', arc), N = cards.length, countEl = $('#count');
  if (arc && N) {
    let pos = 0, target = 0, vel = 0, dragging = false, startX = 0, startPos = 0, lastX = 0, lastT = 0, moved = 0, raf = 0;
    const spacing = () => (innerWidth < 560 ? 214 : 290);
    const wrapD = (d) => { d = ((d % N) + N) % N; return d > N / 2 ? d - N : d; };
    const pad = (n) => String(n).padStart(2, '0');
    function layout() {
      const sp = spacing();
      cards.forEach((c, i) => {
        const d = wrapD(i - pos), ad = Math.abs(d);
        c.style.transform = `translateX(calc(-50% + ${(d * sp).toFixed(1)}px)) translateY(${(d * d * 24).toFixed(1)}px) rotate(${(d * 6).toFixed(2)}deg) scale(${(1 - Math.min(ad, 3) * 0.07).toFixed(3)})`;
        c.style.opacity = ad > 2.6 ? Math.max(0, 1 - (ad - 2.6) * 2).toFixed(2) : '1';
        c.style.zIndex = String(100 - Math.round(ad * 10));
        c.classList.toggle('is-center', ad < 0.5); c.setAttribute('aria-hidden', ad < 0.5 ? 'false' : 'true');
        $$('a', c).forEach((a) => (a.tabIndex = ad < 0.5 ? 0 : -1));
      });
      countEl.textContent = `${pad((Math.round(((pos % N) + N) % N) % N) + 1)} / ${pad(N)}`;
    }
    function tick() {
      if (!dragging) { pos += (target - pos) * (reduce ? 1 : 0.14); if (Math.abs(target - pos) < 0.001) pos = target; }
      layout(); raf = dragging || pos !== target ? requestAnimationFrame(tick) : 0;
    }
    const kick = () => { if (!raf) raf = requestAnimationFrame(tick); };
    const go = (n) => { target = Math.round(n); kick(); };
    arc.addEventListener('pointerdown', (e) => { if (e.button !== 0 || e.target.closest('a,button')) return; dragging = true; moved = 0; startX = lastX = e.clientX; startPos = pos; lastT = performance.now(); vel = 0; arc.setPointerCapture(e.pointerId); arc.classList.add('dragging'); kick(); });
    arc.addEventListener('pointermove', (e) => { if (!dragging) return; const now = performance.now(), dx = e.clientX - startX; moved = Math.max(moved, Math.abs(dx)); pos = startPos - dx / spacing(); vel = (e.clientX - lastX) / Math.max(1, now - lastT); lastX = e.clientX; lastT = now; });
    const end = (e) => {
      if (!dragging) return; dragging = false; arc.classList.remove('dragging');
      if (moved < 6) { const card = e.target.closest?.('.wcard'); target = card ? Math.round(pos + wrapD(+card.dataset.i - pos)) : Math.round(pos); }
      else target = Math.round(pos - (vel * 280) / spacing());
      kick();
    };
    arc.addEventListener('pointerup', end); arc.addEventListener('pointercancel', end);
    arc.addEventListener('keydown', (e) => { if (e.key === 'ArrowRight') { go(target + 1); e.preventDefault(); } if (e.key === 'ArrowLeft') { go(target - 1); e.preventDefault(); } });
    $('#prev').onclick = () => go(target - 1); $('#next').onclick = () => go(target + 1);
    addEventListener('resize', layout); layout();
  }

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
