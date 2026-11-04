// Act 3: the developer behind the launch. Live numbers with sparklines, the project arc you can drag,
// and the header that changes tone and tracks the section you are in. Figures are examples.
import { S, $, inr } from './state.js';

const PROJECTS = [
  { name: 'Veyra Skyline', loc: 'Northbank', cfg: '2 & 3 BHK', status: 'open', label: 'Booking open', facts: [['Possession', 'Dec 2028'], ['Towers', '2 × G+24'], ['From', '₹78 L']], go: '#homes', cta: 'Pick a home', art: { sky: ['#9CC3E6', '#E8EEF2'], mass: '#2E3F4F', win: '#F6D77A', sun: '#FFF3C4', heights: [0.55, 0.92, 0.98, 0.6], kind: 'tower' } },
  { name: 'Veyra Courtyard', loc: 'Eastgate', cfg: '2 BHK', status: 'build', label: 'Slab 14 of 18', facts: [['Possession', 'Jun 2027'], ['Homes', '312'], ['From', '₹54 L']], art: { sky: ['#F2C79A', '#F6E9D9'], mass: '#5A4636', win: '#FFE2A8', sun: '#FFD27A', heights: [0.5, 0.62, 0.58, 0.66, 0.52], kind: 'mid' } },
  { name: 'Veyra Orchard', loc: 'Hillside Road', cfg: '3 & 4 BHK villas', status: 'ready', label: 'Ready to move', facts: [['Handover', 'Done'], ['Villas', '64'], ['From', '₹1.6 Cr']], art: { sky: ['#A9D3B7', '#EDF4EA'], mass: '#2F4A3A', win: '#FCE7A0', sun: '#FFF6D0', heights: [0.28, 0.3, 0.26, 0.3, 0.28, 0.27], kind: 'villa' } },
  { name: 'Veyra Harbour', loc: 'Dockside', cfg: '1 & 2 BHK', status: 'sold', label: 'Sold out', facts: [['Handed over', '2024'], ['Homes', '440'], ['On time', 'Yes']], art: { sky: ['#8FA6C9', '#D8E0EC'], mass: '#2A3346', win: '#E9D59A', sun: '#F3F0E0', heights: [0.8, 0.72, 0.76], kind: 'tower' } },
  { name: 'Veyra Terraces', loc: 'Old Mill Lane', cfg: '3 BHK', status: 'soon', label: 'Launching Mar 2027', facts: [['RERA', 'Applied'], ['Homes', '180'], ['Pre-register', 'Open']], art: { sky: ['#D6B8E0', '#F1E8F3'], mass: '#45364F', win: '#F7DFA2', sun: '#FFEFD6', heights: [0.42, 0.5, 0.58, 0.66, 0.74], kind: 'terrace' } },
  { name: 'Veyra Commons', loc: 'Ring Road', cfg: 'Shops & offices', status: 'build', label: 'Slab 6 of 12', facts: [['Possession', 'Mar 2028'], ['Units', '96'], ['From', '₹42 L']], art: { sky: ['#B9C7CF', '#EEF2F3'], mass: '#36424A', win: '#F3E6B8', sun: '#FFFDF0', heights: [0.6, 0.6, 0.44], kind: 'mid' } },
];
const STATS = [
  { label: 'Homes handed over', value: 1284, foot: '<b>+38</b> this month', series: [980, 1010, 1032, 1060, 1095, 1120, 1150, 1171, 1199, 1226, 1246, 1284] },
  { label: 'Families moved in this year', value: 312, foot: '<b>+24</b> in October', series: [12, 31, 58, 80, 104, 131, 160, 188, 221, 250, 288, 312] },
  { label: 'Site visits this month', value: 486, foot: '<b>62%</b> booked a second visit', series: [310, 352, 330, 401, 388, 420, 398, 445, 430, 470, 455, 486] },
  { label: 'Handovers on time', value: 97, suffix: '%', foot: 'Last 5 years, all projects', series: [92, 93, 93, 94, 95, 95, 96, 96, 96, 97, 97, 97] },
];

function spark(data) {
  const W = 200, H = 46, pad = 4, min = Math.min(...data), max = Math.max(...data);
  const x = (i) => pad + ((W - pad * 2) * i) / (data.length - 1), y = (v) => H - pad - ((H - pad * 2) * (v - min)) / (max - min || 1);
  const pts = data.map((v, i) => [x(i), y(v)]), line = 'M' + pts.map((p) => p[0].toFixed(1) + ' ' + p[1].toFixed(1)).join(' L');
  const [ex, ey] = pts[pts.length - 1];
  return `<svg class="spark" viewBox="0 0 ${W} ${H}" preserveAspectRatio="none" aria-hidden="true">
    <line class="grid" x1="0" x2="${W}" y1="${H - 0.5}" y2="${H - 0.5}"/><line class="grid" x1="0" x2="${W}" y1="${H / 2}" y2="${H / 2}" stroke-dasharray="2 4"/>
    <path class="area" d="${line} L${x(data.length - 1).toFixed(1)} ${H} L${x(0).toFixed(1)} ${H} Z"/><path class="line" d="${line}" vector-effect="non-scaling-stroke"/>
    <circle class="halo" cx="${ex}" cy="${ey}" r="6"/><circle class="dot" cx="${ex}" cy="${ey}" r="3"/></svg>`;
}
function art(a, seed) {
  const W = 320, H = 200; let s = seed * 9301 + 49297; const rnd = () => (s = (s * 9301 + 49297) % 233280) / 233280;
  const n = a.heights.length, gap = 10, bw = (W - 60 - gap * (n - 1)) / n; let out = '';
  a.heights.forEach((h, i) => {
    const bx = 30 + i * (bw + gap), bh = (H - 40) * h, by = H - 28 - bh;
    out += `<rect x="${bx.toFixed(1)}" y="${by.toFixed(1)}" width="${bw.toFixed(1)}" height="${bh.toFixed(1)}" fill="${a.mass}"/>`;
    if (a.kind === 'villa') out += `<polygon points="${bx - 3},${by} ${bx + bw / 2},${by - 16} ${bx + bw + 3},${by}" fill="${a.mass}"/>`;
    const cols = Math.max(2, Math.floor(bw / 11)), rows = Math.floor(bh / 12);
    for (let r = 0; r < rows; r++) for (let c = 0; c < cols; c++) { if (rnd() < 0.42) continue; out += `<rect x="${(bx + 5 + c * ((bw - 10) / cols)).toFixed(1)}" y="${(by + 6 + r * 12).toFixed(1)}" width="${((bw - 10) / cols - 3).toFixed(1)}" height="6" fill="${a.win}" opacity="${(0.55 + rnd() * 0.45).toFixed(2)}"/>`; }
  });
  return `<svg viewBox="0 0 ${W} ${H}" preserveAspectRatio="xMidYMax slice" role="img" aria-label="Illustration of ${a.kind} buildings">
    <defs><linearGradient id="pg${seed}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${a.sky[0]}"/><stop offset="1" stop-color="${a.sky[1]}"/></linearGradient></defs>
    <rect width="${W}" height="${H}" fill="url(#pg${seed})"/><circle cx="${W - 62}" cy="52" r="22" fill="${a.sun}"/>
    ${out}<rect y="${H - 28}" width="${W}" height="28" fill="${a.mass}" opacity=".92"/><rect y="${H - 16}" width="${W}" height="2" fill="${a.win}" opacity=".5"/></svg>`;
}

export function initCompany({ setVisitInterest }) {
  /* live numbers */
  const statsEl = $('stats');
  statsEl.innerHTML = STATS.map((s) => `<article class="stat"><p class="mono">${s.label}</p><p class="stat-value"><span data-to="${s.value}">${inr(s.value)}</span>${s.suffix ? `<small>${s.suffix}</small>` : ''}</p>${spark(s.series)}<p class="stat-foot">${s.foot}</p></article>`).join('');
  if (!S.reduce) {
    const els = [...statsEl.querySelectorAll('[data-to]')];
    new IntersectionObserver(([e], io) => {
      if (!e.isIntersecting) return; io.disconnect(); const t0 = performance.now();
      const step = (now) => { const k = Math.min(1, (now - t0) / 1400), ez = 1 - Math.pow(1 - k, 3); els.forEach((el) => (el.textContent = inr(+el.dataset.to * (0.6 + 0.4 * ez)))); if (k < 1) requestAnimationFrame(step); };
      requestAnimationFrame(step);
    }, { threshold: 0.4 }).observe(statsEl);
  }

  /* project arc */
  const arc = $('arc'), countEl = $('count'), N = PROJECTS.length;
  arc.innerHTML = PROJECTS.map((p, i) => `
    <article class="pcard" data-i="${i}" aria-label="${p.name}">
      <div class="pcard-art">${art(p.art, i + 1)}</div>
      <div class="pcard-body">
        <div class="pcard-top"><h3>${p.name}</h3><span class="pchip ${p.status}">${p.label}</span></div>
        <p class="pcard-loc">${p.loc} · ${p.cfg}</p>
        <dl class="facts">${p.facts.map((f) => `<div><dt>${f[0]}</dt><dd>${f[1]}</dd></div>`).join('')}</dl>
        ${p.status === 'sold' ? '' : `<a class="btn sm green pcard-cta" href="${p.go || '#visit'}" data-project="${i}">${p.cta || `Ask about ${p.name.replace('Veyra ', '')}`}</a>`}
      </div>
    </article>`).join('');
  const cards = [...arc.querySelectorAll('.pcard')];
  let pos = 0, target = 0, vel = 0, dragging = false, startX = 0, startPos = 0, lastX = 0, lastT = 0, moved = 0, raf = 0;
  const spacing = () => (innerWidth < 560 ? 200 : 262);
  const wrapD = (d) => { d = ((d % N) + N) % N; return d > N / 2 ? d - N : d; };
  function layout() {
    const sp = spacing();
    cards.forEach((c, i) => {
      const d = wrapD(i - pos), ad = Math.abs(d);
      c.style.transform = `translateX(calc(-50% + ${(d * sp).toFixed(1)}px)) translateY(${(d * d * 26).toFixed(1)}px) rotate(${(d * 7).toFixed(2)}deg) scale(${(1 - Math.min(ad, 3) * 0.07).toFixed(3)})`;
      c.style.opacity = ad > 2.6 ? Math.max(0, 1 - (ad - 2.6) * 2).toFixed(2) : '1';
      c.style.zIndex = String(100 - Math.round(ad * 10));
      c.classList.toggle('is-center', ad < 0.5); c.setAttribute('aria-hidden', ad < 0.5 ? 'false' : 'true');
      c.querySelectorAll('a').forEach((a) => (a.tabIndex = ad < 0.5 ? 0 : -1));
    });
    countEl.textContent = `${Math.round(((pos % N) + N) % N) % N + 1} / ${N}`;
  }
  function tick() {
    if (!dragging) { pos += (target - pos) * (S.reduce ? 1 : 0.14); if (Math.abs(target - pos) < 0.001) pos = target; }
    layout(); raf = dragging || pos !== target ? requestAnimationFrame(tick) : 0;
  }
  const kick = () => { if (!raf) raf = requestAnimationFrame(tick); };
  const go = (n) => { target = Math.round(n); kick(); };
  arc.addEventListener('pointerdown', (e) => { if (e.button !== 0 || e.target.closest('a,button')) return; dragging = true; moved = 0; startX = lastX = e.clientX; startPos = pos; lastT = performance.now(); vel = 0; arc.setPointerCapture(e.pointerId); arc.classList.add('dragging'); kick(); });
  arc.addEventListener('pointermove', (e) => { if (!dragging) return; const now = performance.now(), dx = e.clientX - startX; moved = Math.max(moved, Math.abs(dx)); pos = startPos - dx / spacing(); vel = (e.clientX - lastX) / Math.max(1, now - lastT); lastX = e.clientX; lastT = now; });
  const end = (e) => {
    if (!dragging) return; dragging = false; arc.classList.remove('dragging');
    if (moved < 6) { const card = e.target.closest?.('.pcard'); target = card ? Math.round(pos + wrapD(+card.dataset.i - pos)) : Math.round(pos); }
    else target = Math.round(pos - (vel * 264) / spacing());
    kick();
  };
  arc.addEventListener('pointerup', end); arc.addEventListener('pointercancel', end);
  arc.addEventListener('click', (e) => { const a = e.target.closest('.pcard-cta'); if (a && !PROJECTS[+a.dataset.project].go) setVisitInterest(PROJECTS[+a.dataset.project].name); });
  arc.addEventListener('keydown', (e) => { if (e.key === 'ArrowRight') { go(target + 1); e.preventDefault(); } if (e.key === 'ArrowLeft') { go(target - 1); e.preventDefault(); } });
  $('prev').onclick = () => go(target - 1); $('next').onclick = () => go(target + 1);
  addEventListener('resize', layout); layout();

  /* header: night tone over the journey, and the current section in the nav */
  const top = $('top'), journey = $('journey'), links = [...document.querySelectorAll('#nav a')];
  const targets = links.map((a) => document.querySelector(a.getAttribute('href'))), navEl = $('nav');
  let lastK = -1;
  function onScroll() {
    top.classList.toggle('night', journey.getBoundingClientRect().bottom > top.offsetHeight * 0.6);
    const line = innerHeight * 0.4; let k = 0;
    targets.forEach((t, i) => { if (t && t.getBoundingClientRect().top <= line) k = i; });
    if (k === lastK) return; lastK = k;
    links.forEach((a, i) => a.classList.toggle('on', i === k));
    // On phones the nav scrolls sideways: keep the current link in view without touching page scroll.
    if (navEl.scrollWidth > navEl.clientWidth) navEl.scrollTo({ left: Math.max(0, links[k].offsetLeft - 24), behavior: S.reduce ? 'auto' : 'smooth' });
  }
  addEventListener('scroll', onScroll, { passive: true }); onScroll();
}
