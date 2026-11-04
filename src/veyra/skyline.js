// Act 2 widgets: home picker with a cost sheet, sunlight readout, EMI, sample answers, site visit.
// Inventory, prices and answers are examples for the concept.
import { S, $, clamp, css, inr, rupee, short, smooth, mobile, validMobile, mask } from './state.js';

export const RATE = 9600, RISE = 40, PARK = 300000;
const FLOORS = [...Array(17)].map((_, i) => 21 - i);
export const UNITS = [
  { u: '01', bhk: 3, area: 1140, face: 'East' }, { u: '02', bhk: 2, area: 780, face: 'East' },
  { u: '03', bhk: 2, area: 780, face: 'West' }, { u: '04', bhk: 3, area: 1140, face: 'West' },
];
const h3 = (a, b, c) => { const s = Math.sin(a * 91.7 + b * 13.3 + c * 7.1) * 43758.5453; return s - Math.floor(s); };
const status = (t, f, u) => { if (t === 'B' && f === 14 && u === 0) return 'available'; const r = h3(t === 'A' ? 1 : 2, f, u); return r < 0.55 ? 'booked' : r < 0.63 ? 'hold' : 'available'; };
export const price = (f, unit) => { const base = unit.area * RATE, rise = unit.area * RISE * (f - 5); return { base, rise, park: PARK, total: base + rise + PARK }; };

/* sun model: equinox path at about 21°N */
const LAT = (21 * Math.PI) / 180;
export function sunAt(mins) { const H = ((mins / 60 - 12) * 15 * Math.PI) / 180; return { alt: Math.asin(Math.cos(LAT) * Math.cos(H)), az: Math.atan2(Math.sin(H), Math.cos(H) * Math.sin(LAT)) + Math.PI }; }
const compass = (az) => ['North', 'North-east', 'East', 'South-east', 'South', 'South-west', 'West', 'North-west'][Math.round((((az * 180) / Math.PI + 360) % 360) / 45) % 8];
const clockStr = (m) => { const h = Math.floor(m / 60), mm = m % 60; return `${((h + 11) % 12) + 1}:${String(mm).padStart(2, '0')} ${h >= 12 ? 'pm' : 'am'}`; };

export function initSkyline() {
  /* ---------- picker ---------- */
  const sel = { tower: 'B', floor: 14, unit: 0, type: 'all' };
  const inv = $('inv'), unitEl = $('unit');
  function drawInv() {
    let h = '<span class="h"></span>' + UNITS.map((u) => `<span class="h">${u.u}<br>${u.bhk}B</span>`).join('');
    FLOORS.forEach((f) => {
      h += `<span class="fl">L${f}</span>`;
      UNITS.forEach((u, i) => {
        const st = status(sel.tower, f, i), dim = sel.type !== 'all' && String(u.bhk) !== sel.type, on = sel.floor === f && sel.unit === i;
        h += `<button type="button" class="${st}${dim ? ' dim' : ''}${on ? ' sel' : ''}" data-f="${f}" data-u="${i}" aria-label="${sel.tower}-${f}${u.u}, ${u.bhk} BHK, ${st === 'hold' ? 'on hold' : st}" ${st === 'booked' || dim ? 'aria-disabled="true"' : ''}></button>`;
      });
    });
    inv.innerHTML = h; drawUnit();
  }
  function drawUnit() {
    const u = UNITS[sel.unit], f = sel.floor, p = price(f, u), st = status(sel.tower, f, sel.unit), id = `${sel.tower}-${f}${u.u}`;
    unitEl.innerHTML = `<h3>${id}</h3>
      <p class="meta">${u.bhk} BHK · ${inr(u.area)} sq ft carpet · ${u.face} facing · Floor ${f}</p>
      <span class="chip ${st}">${st === 'hold' ? 'On hold' : st === 'booked' ? 'Booked' : 'Available'}</span>
      <table class="sheet"><tbody>
        <tr><td>Base (₹${inr(RATE)} × ${inr(u.area)})</td><td>${rupee(p.base)}</td></tr>
        <tr><td>Floor rise (₹${RISE} × ${f - 5} floors)</td><td>${rupee(p.rise)}</td></tr>
        <tr><td>Covered parking</td><td>${rupee(p.park)}</td></tr>
        <tr class="total"><td>Total before GST</td><td>${short(p.total)}</td></tr>
      </tbody></table>
      <div class="row"><button type="button" class="btn sm" id="toEmi">Work out EMI</button><button type="button" class="btn sm alt" id="toVisit">Visit for this home</button></div>`;
    $('toEmi').onclick = () => { $('eP').value = String(Math.round(p.total / 1e5) * 1e5); calcEmi(); smooth($('emi')); };
    $('toVisit').onclick = () => { $('vUnit').value = `Skyline ${id} · ${u.bhk} BHK`; smooth($('visit')); };
    S.pick.floor = f; S.pick.tower = sel.tower;
  }
  inv.addEventListener('click', (e) => { const b = e.target.closest('button'); if (!b || b.getAttribute('aria-disabled') === 'true') return; sel.floor = +b.dataset.f; sel.unit = +b.dataset.u; drawInv(); });
  const okType = (i) => sel.type === 'all' || String(UNITS[i].bhk) === sel.type;
  function ensureAvail() {
    if (status(sel.tower, sel.floor, sel.unit) !== 'booked' && okType(sel.unit)) return;
    for (const f of FLOORS.slice().reverse()) for (let i = 0; i < 4; i++) if (okType(i) && status(sel.tower, f, i) === 'available') { sel.floor = f; sel.unit = i; return; }
  }
  function setType(t) { sel.type = t; document.querySelectorAll('[data-type]').forEach((x) => x.setAttribute('aria-pressed', String(x.dataset.type === t))); ensureAvail(); drawInv(); }
  document.querySelectorAll('[data-tower]').forEach((b) => (b.onclick = () => { sel.tower = b.dataset.tower; document.querySelectorAll('[data-tower]').forEach((x) => x.setAttribute('aria-pressed', String(x === b))); ensureAvail(); drawInv(); }));
  document.querySelectorAll('[data-type]').forEach((b) => (b.onclick = () => setType(b.dataset.type)));
  document.querySelectorAll('[data-pick]').forEach((b) => (b.onclick = () => { setType(b.dataset.pick); smooth($('homes')); }));

  /* ---------- sunlight ---------- */
  function updateSun() {
    const m = +$('sunRange').value; S.sun.mins = m;
    const s = sunAt(m), altD = (s.alt * 180) / Math.PI, dir = compass(s.az);
    $('clockT').textContent = clockStr(m);
    let say, on, dirTxt = dir;
    if (altD < -2) { $('clockS').textContent = 'After sunset'; say = 'Lights are on across both towers. The sky lounge on L24 is open until 11 pm.'; on = 'None'; dirTxt = 'Below horizon'; }
    else if (altD < 4) { $('clockS').textContent = m < 720 ? 'Sunrise' : 'Sunset'; say = m < 720 ? 'First light reaches the east balconies of units 01 and 02.' : 'The last sun lights the west balconies of units 03 and 04.'; on = m < 720 ? 'Units 01, 02' : 'Units 03, 04'; }
    else {
      $('clockS').textContent = `Sun in the ${dir.toLowerCase()}`;
      const east = Math.sin(s.az) > 0.15, west = Math.sin(s.az) < -0.15;
      on = east ? 'Units 01, 02' : west ? 'Units 03, 04' : 'South faces';
      say = east ? 'Morning sun on the east side. West homes stay cool and bright.' : west ? 'Afternoon sun on the west side. East homes are in shade, which keeps bedrooms cooler.' : 'Midday sun is high in the south, so balconies shade the rooms below.';
    }
    $('sunSay').textContent = say; $('sunAlt').textContent = `${Math.max(0, Math.round(altD))}°`; $('sunDir').textContent = dirTxt; $('sunOn').textContent = on;
  }
  $('sunRange').addEventListener('input', updateSun);

  /* ---------- EMI ---------- */
  function calcEmi() {
    const P = +$('eP').value, d = +$('eD').value, r = +$('eR').value, y = +$('eT').value;
    const loan = P * (1 - d / 100), i = r / 1200, n = y * 12, emi = i ? (loan * i * Math.pow(1 + i, n)) / (Math.pow(1 + i, n) - 1) : loan / n, total = emi * n, interest = total - loan;
    $('oP').textContent = short(P); $('oD').textContent = `${d}% · ${short((P * d) / 100)}`; $('oR').textContent = `${r.toFixed(2)}%`; $('oT').textContent = `${y} years`;
    $('emiOut').textContent = rupee(emi); $('kL').textContent = short(loan); $('kI').textContent = short(interest); $('kT').textContent = short(total); $('kD').textContent = short((P * d) / 100);
    donut(loan, interest);
  }
  function donut(a, b) {
    const c = $('donut'), dpr = Math.min(2, devicePixelRatio || 1), S0 = 150; c.width = S0 * dpr; c.height = S0 * dpr;
    const g = c.getContext('2d'); g.setTransform(dpr, 0, 0, dpr, 0, 0); g.clearRect(0, 0, S0, S0);
    const tot = a + b, start = -Math.PI / 2, mid = start + (Math.PI * 2 * a) / tot; g.lineWidth = 20;
    g.strokeStyle = css('--accent'); g.beginPath(); g.arc(S0 / 2, S0 / 2, 58, start, mid); g.stroke();
    g.strokeStyle = css('--sun'); g.beginPath(); g.arc(S0 / 2, S0 / 2, 58, mid, start + Math.PI * 2); g.stroke();
    g.fillStyle = css('--ink'); g.font = `700 22px ${css('--font-display')}`; g.textAlign = 'center'; g.textBaseline = 'middle'; g.fillText(`${Math.round((100 * b) / tot)}%`, S0 / 2, S0 / 2 - 6);
    g.fillStyle = css('--muted'); g.font = `500 11px ${css('--font-body')}`; g.fillText('interest', S0 / 2, S0 / 2 + 14);
  }
  ['eP', 'eD', 'eR', 'eT'].forEach((id) => $(id).addEventListener('input', calcEmi));
  document.fonts?.ready.then(calcEmi);

  /* ---------- sample answers ---------- */
  const FAQ = [
    [/possession|handover|ready|when/i, 'Tower B possession is planned for December 2028 and Tower A for June 2029. The dates follow the RERA registration and are updated here every quarter.', 'When is possession?'],
    [/rera|registered|approv/i, 'Yes. Both towers are RERA-registered. A live site shows the registration number and approved plans in the footer.', 'Is it RERA-registered?'],
    [/price|cost|include|gst|charge/i, 'The cost sheet covers base price, floor rise and one covered parking slot. GST and registration are extra. Pick a home above to see a full example breakdown.', 'What does the price include?'],
    [/park|car|ev|charg/i, 'Every home gets one covered slot on podium levels P1–P3. 3 BHK buyers can add a second slot. EV charging is on every parking level.', 'How does parking work?'],
    [/maint|society|monthly/i, 'Maintenance is estimated at ₹4.50 per sq ft per month, with two years collected at possession. The society sets the final figure.', 'What is the maintenance?'],
    [/metro|station|transport|bus|school|hospital|commute/i, 'Northbank metro station is a 6-minute walk. The free site-visit pickup leaves from the station.', 'How far is the metro?'],
    [/loan|bank|emi|financ/i, 'Partner banks offer home loans for Skyline. Use the EMI calculator above for a monthly estimate, and an advisor can introduce you to a bank.', 'Can I get a home loan?'],
    [/vastu|facing|east|west|direction/i, 'Units 01 and 02 face east and units 03 and 04 face west. The advisor can share floor plans so you can check entrances and kitchens.', 'Which way do homes face?'],
    [/amenit|pool|gym|club|lounge|kids|play/i, 'The L4 deck has a 25 m lap pool, gym, crèche and covered play area. L24 has the sky lounge and terrace garden.', 'What amenities are there?'],
  ];
  const log = $('log'), chips = $('chips');
  chips.innerHTML = FAQ.slice(0, 6).map((f, i) => `<button type="button" data-q="${i}">${f[2]}</button>`).join('');
  function ask(q) {
    if (!q.trim()) return;
    const qm = document.createElement('p'); qm.className = 'msg q'; qm.textContent = q; log.appendChild(qm);
    const hit = FAQ.find((f) => f[0].test(q)), am = document.createElement('p'); am.className = 'msg a';
    am.textContent = hit ? hit[1] : "I don't have that answer on this page. Book a visit or a call, and an advisor will answer it.";
    setTimeout(() => { log.appendChild(am); log.scrollTop = log.scrollHeight; }, S.reduce ? 0 : 350); log.scrollTop = log.scrollHeight;
  }
  chips.addEventListener('click', (e) => { const b = e.target.closest('[data-q]'); if (b) ask(FAQ[+b.dataset.q][2]); });
  $('askForm').addEventListener('submit', (e) => { e.preventDefault(); ask($('askIn').value); $('askIn').value = ''; });

  /* ---------- site visit ---------- */
  const days = $('days'), slots = $('slots'), SLOTS = ['11:00 am', '12:30 pm', '3:00 pm', '4:30 pm', '6:00 pm'], vsel = { day: null, slot: null };
  const today = new Date(), dd = [...Array(7)].map((_, i) => { const d = new Date(today); d.setDate(today.getDate() + i + 1); return d; });
  days.innerHTML = dd.map((d, i) => `<button type="button" aria-pressed="false" data-d="${i}"><small>${d.toLocaleDateString('en-IN', { weekday: 'short' })}</small>${d.getDate()} ${d.toLocaleDateString('en-IN', { month: 'short' })}</button>`).join('');
  slots.innerHTML = SLOTS.map((s, i) => `<button type="button" aria-pressed="false" data-s="${i}">${s}</button>`).join('');
  days.addEventListener('click', (e) => { const b = e.target.closest('button'); if (!b) return; vsel.day = +b.dataset.d; [...days.children].forEach((x) => x.setAttribute('aria-pressed', String(x === b))); });
  slots.addEventListener('click', (e) => { const b = e.target.closest('button'); if (!b) return; vsel.slot = +b.dataset.s; [...slots.children].forEach((x) => x.setAttribute('aria-pressed', String(x === b))); });
  $('vUnit').value = 'Skyline B-1401 · 3 BHK';
  $('vForm').addEventListener('submit', (e) => {
    e.preventDefault(); const err = $('vErr'), name = $('vName').value.trim(), ph = mobile($('vPhone').value);
    if (vsel.day === null) { err.textContent = 'Choose a day for your visit.'; return; }
    if (vsel.slot === null) { err.textContent = 'Choose a time slot.'; return; }
    if (name.length < 2) { err.textContent = 'Add your name so the advisor knows who to ask for.'; $('vName').focus(); return; }
    if (!validMobile(ph)) { err.textContent = 'Enter a 10-digit Indian mobile number, for example 98765 43210.'; $('vPhone').focus(); return; }
    err.textContent = ''; const d = dd[vsel.day];
    $('vDoneT').textContent = `${d.toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long' })}, ${SLOTS[vsel.slot]}`;
    $('vDoneP').textContent = `Thanks, ${name.split(' ')[0]}. We'll confirm on ${mask(ph)}. Interested in: ${$('vUnit').value || 'any home'}.${$('vPick').checked ? ' Pickup from Northbank metro is booked.' : ''}`;
    $('visitForm').hidden = true; $('vDone').hidden = false;
  });
  $('vAgain').onclick = () => { $('visitForm').hidden = false; $('vDone').hidden = true; };

  /* ---------- copy link ---------- */
  $('copyBtn').addEventListener('click', () => {
    const url = location.href, b = $('copyBtn'), fb = $('copyFallback');
    const fallback = () => { fb.hidden = false; fb.value = url; fb.focus(); fb.select(); b.textContent = 'Select and copy'; };
    try { navigator.clipboard.writeText(url).then(() => { b.textContent = 'Link copied'; setTimeout(() => (b.textContent = 'Copy link'), 1800); }).catch(fallback); } catch { fallback(); }
  });

  /* ---------- floors story: which zone is lit ---------- */
  const floors = $('floors'), zonesEl = [...document.querySelectorAll('#zones li')];
  function onScroll() {
    const r = floors.getBoundingClientRect(), prog = clamp(-r.top / Math.max(1, r.height - innerHeight));
    S.zone = Math.min(4, Math.floor(prog * 5));
    zonesEl.forEach((li) => li.classList.toggle('on', +li.dataset.z === S.zone));
  }
  addEventListener('scroll', onScroll, { passive: true }); addEventListener('resize', onScroll);

  drawInv(); updateSun();
  $('eP').value = String(Math.round(price(sel.floor, UNITS[sel.unit]).total / 1e5) * 1e5);
  calcEmi(); onScroll();
  return { setVisitInterest: (txt) => { $('vUnit').value = txt; } };
}
