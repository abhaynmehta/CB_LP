// Act 2 stage: the two Skyline towers, fixed behind the daylight page. Each section of #dayside names
// a scene key; the towers blend between keys as the reader scrolls, so they turn, come apart floor by
// floor, light the picked home, follow the sun slider, and step aside for the wide tools.
import * as THREE from 'three';
import { S, $, clamp, css } from './state.js';
import { sunAt } from './skyline.js';

export function initTower() {
  const canvas = $('tower'), day = $('dayside'), skyEl = $('sky');
  let renderer = null;
  try { renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true }); } catch { renderer = null; }
  if (!renderer) { canvas.remove(); return; }
  renderer.outputColorSpace = THREE.LinearSRGBColorSpace;
  renderer.setPixelRatio(Math.min(devicePixelRatio, 1.75)); renderer.setClearColor(0x000000, 0);
  renderer.shadowMap.enabled = true; renderer.shadowMap.type = THREE.PCFShadowMap;
  const PI = Math.PI; // physical light units: scale the old intensities by π
  const scene = new THREE.Scene(), camera = new THREE.PerspectiveCamera(30, 1, 0.1, 200);
  const hemi = new THREE.HemisphereLight(0xe4eef6, 0x8c9087, 0.75 * PI); scene.add(hemi);
  const root = new THREE.Group(); scene.add(root);
  const sun = new THREE.DirectionalLight(0xffffff, PI); sun.castShadow = true; sun.shadow.mapSize.set(1024, 1024);
  Object.assign(sun.shadow.camera, { left: -14, right: 14, top: 14, bottom: -14, near: 1, far: 80 }); sun.shadow.camera.updateProjectionMatrix(); sun.shadow.bias = -0.0008;
  root.add(sun); root.add(sun.target); sun.target.position.set(0, 4, 0);
  const M = (c, o = {}) => new THREE.MeshStandardMaterial(Object.assign({ color: c, roughness: 0.85, metalness: 0 }, o));
  const mesh = (g, m, x = 0, y = 0, z = 0) => { const o = new THREE.Mesh(g, m); o.position.set(x, y, z); o.castShadow = true; o.receiveShadow = true; root.add(o); return o; };
  const ACC = new THREE.Color('#38C29F'), ACC_D = new THREE.Color('#1E7A67');

  // site, lawn and trees
  mesh(new THREE.CylinderGeometry(11, 11.4, 0.35, 72), M('#D5D8D1'), 0, 0.175, 0);
  mesh(new THREE.CylinderGeometry(10.2, 10.2, 0.06, 72), M('#A7BC92'), 0, 0.38, 0).castShadow = false;
  mesh(new THREE.BoxGeometry(13.4, 0.07, 8.4), M('#CFD2CB'), 0, 0.4, 0).castShadow = false;
  {
    const n = 46, trees = new THREE.InstancedMesh(new THREE.IcosahedronGeometry(0.55, 0), M('#6F8F5C', { flatShading: true }), n), mm = new THREE.Matrix4();
    trees.castShadow = true; let k = 0, s = 7;
    while (k < n) { s = (s * 9301 + 49297) % 233280; const a = (s / 233280) * PI * 2; s = (s * 9301 + 49297) % 233280; const r = 7.6 + (s / 233280) * 2.2, x = Math.cos(a) * r, z = Math.sin(a) * r; if (Math.abs(x) < 7 && Math.abs(z) < 4.4) continue; const sc = 0.7 + ((k * 37) % 10) / 14; mm.makeScale(sc, sc * 1.3, sc); mm.setPosition(x, 0.75 * sc + 0.3, z); trees.setMatrixAt(k++, mm); }
    root.add(trees);
  }
  // zones: G lobby, P1–P3 parking, L4 deck, L5–L23 homes, L24 lounge
  const Y0 = 0.42, GH = 0.6, PH = 1.8, DECK = Y0 + GH + PH, FH = 0.36, NF = 19;
  const zoneMats = [M('#86A9BC', { roughness: 0.2, metalness: 0.2 }), M('#BFC4BE'), M('#E1E3DE')], zoneBase = zoneMats.map((m) => m.color.clone());
  const gLobby = mesh(new THREE.BoxGeometry(12, GH, 7), zoneMats[0], 0, Y0 + GH / 2, 0);
  const gPark = mesh(new THREE.BoxGeometry(12.2, PH, 7.2), zoneMats[1], 0, Y0 + GH + PH / 2, 0);
  const parkLines = [1, 2].map((i) => mesh(new THREE.BoxGeometry(12.3, 0.05, 7.3), M('#9CA29C'), 0, Y0 + GH + (i * PH) / 3, 0));
  const deck = mesh(new THREE.BoxGeometry(12.6, 0.14, 7.6), zoneMats[2], 0, DECK + 0.07, 0);
  const pool = mesh(new THREE.BoxGeometry(1.2, 0.05, 5.2), M('#5FB3D6', { roughness: 0.1, metalness: 0.1 }), 0, DECK + 0.16, 0); pool.castShadow = false;
  const gym = mesh(new THREE.BoxGeometry(1.4, 0.42, 1.8), M('#9CBBCB', { roughness: 0.2 }), -5.2, DECK + 0.35, 1.9);
  const TX = [-2.9, 2.9];
  const glassMat = M('#FFFFFF', { roughness: 0.18, metalness: 0.25, transparent: true, opacity: 0.9, emissive: new THREE.Color('#FFB860'), emissiveIntensity: 0 });
  const slabs = new THREE.InstancedMesh(new THREE.BoxGeometry(3.5, 0.05, 3.1), M('#FFFFFF'), 2 * NF);
  const glass = new THREE.InstancedMesh(new THREE.BoxGeometry(3.2, 0.31, 2.8), glassMat, 2 * NF);
  const balc = new THREE.InstancedMesh(new THREE.BoxGeometry(0.5, 0.035, 1.1), M('#F2F3EF'), 2 * NF * 4);
  [slabs, glass, balc].forEach((m) => { m.castShadow = true; m.receiveShadow = true; root.add(m); });
  const SLAB = new THREE.Color('#E6E8E3'), GLASS = new THREE.Color('#8FB2C6');
  for (let i = 0; i < 2 * NF; i++) { slabs.setColorAt(i, SLAB); glass.setColorAt(i, GLASS); }
  const lounge = TX.map((x) => mesh(new THREE.BoxGeometry(3.0, 0.46, 2.6), M('#A4C2D2', { roughness: 0.15, metalness: 0.2, emissive: new THREE.Color('#FFB860'), emissiveIntensity: 0 }), x));
  const roofs = TX.map((x) => mesh(new THREE.BoxGeometry(3.6, 0.08, 3.2), M('#E6E8E3'), x));
  const crowns = TX.map((x) => { const l = new THREE.LineSegments(new THREE.EdgesGeometry(new THREE.BoxGeometry(3.6, 0.7, 3.2)), new THREE.LineBasicMaterial({ color: '#4F5A60' })); l.position.x = x; root.add(l); return l; });
  const m4 = new THREE.Matrix4(), tmpC = new THREE.Color(), LOUNGE = new THREE.Color('#A4C2D2');

  /* scene keys: rot, x, y, s (scale), ex (explode), fade, pick, sun, zone, hero */
  const KEYS = {
    hero:   { rot: -0.55, x: 5.3, y: -0.2, s: 1.0,  ex: 0, fade: 1,    pick: 0, sun: 0, zone: 0, hero: 1 },
    floors: { rot: 0.42,  x: 4.6, y: -1.6, s: 0.86, ex: 1, fade: 1,    pick: 0, sun: 0, zone: 1, hero: 0 },
    homes:  { rot: -0.2,  x: 5.4, y: 0,    s: 1.08, ex: 0, fade: 1,    pick: 1, sun: 0, zone: 0, hero: 0 },
    sun:    { rot: 0.1,   x: 4.6, y: -0.2, s: 0.98, ex: 0, fade: 1,    pick: 0, sun: 1, zone: 0, hero: 0 },
    side:   { rot: 0.9,   x: 7.5, y: -0.6, s: 0.9,  ex: 0, fade: 0.22, pick: 0, sun: 0, zone: 0, hero: 0 },
    away:   { rot: 1.4,   x: 8.5, y: -0.6, s: 0.85, ex: 0, fade: 0,    pick: 0, sun: 0, zone: 0, hero: 0 },
    visit:  { rot: -0.9,  x: 4.8, y: -0.2, s: 0.95, ex: 0, fade: 1,    pick: 0, sun: 0, zone: 0, hero: 0 },
  };
  const FIELDS = Object.keys(KEYS.hero);
  const secs = [...day.querySelectorAll(':scope > [data-scene]')];
  const narrow = () => innerWidth < 860;
  const ease = (t) => t * t * (3 - 2 * t);
  function sample() {
    const vh = innerHeight, c = vh * 0.5, B = vh * 0.38, rs = secs.map((s) => s.getBoundingClientRect());
    let i = rs.findIndex((r) => r.top <= c && r.bottom > c); if (i < 0) i = c < rs[0].top ? 0 : rs.length - 1;
    let a = i, b = i, t = 0; const r = rs[i];
    if (i > 0 && c - r.top < B) { a = i - 1; b = i; t = 0.5 + (c - r.top) / (2 * B); } else if (i < rs.length - 1 && r.bottom - c < B) { a = i; b = i + 1; t = 0.5 - (r.bottom - c) / (2 * B); }
    const ka = KEYS[secs[a].dataset.scene], kb = KEYS[secs[b].dataset.scene], e = ease(clamp(t)), out = {};
    FIELDS.forEach((f) => (out[f] = ka[f] + (kb[f] - ka[f]) * e));
    if (narrow()) { const h = out.hero; out.x = 0; out.y = -2.4 + (6.3 + 2.4) * h; out.s *= 0.62 * h + 0.82 * (1 - h); out.fade = Math.min(out.fade, 0.55 + 0.45 * h); }
    return out;
  }
  const cur = sample(), zoneW = [0, 0, 0, 0, 0]; let pickW = 0, mx = 0, smx = 0;
  addEventListener('pointermove', (e) => { mx = (e.clientX / innerWidth) * 2 - 1; });

  function place() {
    const ex = cur.ex, off = (k) => ex * k * 1.05;
    gLobby.position.y = Y0 + GH / 2 + off(0);
    gPark.position.y = Y0 + GH + PH / 2 + off(1); parkLines.forEach((p, i) => (p.position.y = Y0 + GH + ((i + 1) * PH) / 3 + off(1)));
    deck.position.y = DECK + 0.07 + off(2); pool.position.y = DECK + 0.16 + off(2); gym.position.y = DECK + 0.35 + off(2);
    for (let t = 0; t < 2; t++) for (let f = 0; f < NF; f++) {
      const i = t * NF + f, y = DECK + 0.14 + f * FH + off(3) + ex * f * 0.07;
      m4.makeTranslation(TX[t], y + 0.025, 0); slabs.setMatrixAt(i, m4);
      m4.makeTranslation(TX[t], y + 0.205, 0); glass.setMatrixAt(i, m4);
      for (let b = 0; b < 4; b++) { m4.makeTranslation(TX[t] + (b < 2 ? 1.98 : -1.98), y + 0.02, b % 2 ? 0.72 : -0.72); balc.setMatrixAt(i * 4 + b, m4); }
      const isPick = S.pick.tower === (t ? 'B' : 'A') && S.pick.floor === f + 5;
      tmpC.copy(GLASS).lerp(ACC, Math.max(zoneW[3] * 0.75, isPick ? pickW : 0)); glass.setColorAt(i, tmpC);
      tmpC.copy(SLAB).lerp(ACC, isPick ? pickW * 0.6 : zoneW[3] * 0.25); slabs.setColorAt(i, tmpC);
    }
    [slabs, glass, balc].forEach((m) => (m.instanceMatrix.needsUpdate = true)); glass.instanceColor.needsUpdate = true; slabs.instanceColor.needsUpdate = true;
    const top = DECK + 0.14 + NF * FH + ex * NF * 0.07 + off(4);
    for (let t = 0; t < 2; t++) { lounge[t].position.y = top + 0.23; roofs[t].position.y = top + 0.5; crowns[t].position.y = top + 0.89; lounge[t].material.color.copy(LOUNGE).lerp(ACC, zoneW[4] * 0.8); }
    zoneMats.forEach((m, k) => m.color.copy(zoneBase[k]).lerp(k === 0 ? ACC : ACC_D, zoneW[k] * (k === 0 ? 0.7 : 0.55)));
  }
  const DAY = [new THREE.Color('#BCD4E5'), new THREE.Color('#E2E8E8')], DUSK = [new THREE.Color('#E7B79E'), new THREE.Color('#F0DCCB')], NIGHT = [new THREE.Color('#1D2738'), new THREE.Color('#465063')];
  const WARM = new THREE.Color('#FFB27A'), WHITE = new THREE.Color('#FFF6EA'), HEMI = new THREE.Color('#E4EEF6'), HEMI_N = new THREE.Color('#6B7EA8');
  let lastSky = '';
  function light() {
    // 10:30 am everywhere except the sunlight section, which follows the slider
    const s = sunAt(630 + (S.sun.mins - 630) * cur.sun), alt = s.alt, cA = Math.cos(Math.max(alt, 0.02));
    sun.position.set(Math.sin(s.az) * cA * 30, Math.max(Math.sin(alt), 0.03) * 30 + 4, -Math.cos(s.az) * cA * 30);
    const k = clamp(Math.sin(alt) * 3.2); sun.intensity = alt < 0 ? 0 : (0.15 + 0.95 * k) * PI; sun.color.copy(WARM).lerp(WHITE, k);
    const night = clamp(-alt / 0.1); hemi.intensity = (0.28 + 0.5 * clamp(Math.sin(alt) * 2.4)) * PI; hemi.color.copy(HEMI).lerp(HEMI_N, night);
    glassMat.emissiveIntensity = night * 0.75; lounge.forEach((l) => (l.material.emissiveIntensity = night * 0.9));
    const kk = clamp(alt / 0.35), n = clamp(-alt / 0.12);
    const top = DUSK[0].clone().lerp(DAY[0], kk).lerp(NIGHT[0], n), mid = DUSK[1].clone().lerp(DAY[1], kk).lerp(NIGHT[1], n);
    const sky = `linear-gradient(180deg,#${top.getHexString()} 0%,#${mid.getHexString()} 58%,${css('--bg')} 100%)`;
    if (sky !== lastSky) { skyEl.style.background = sky; lastSky = sky; }
  }
  function resize() { const w = innerWidth, h = innerHeight; renderer.setSize(w, h, false); camera.aspect = w / h; camera.position.set(0, 7.2, narrow() ? 40 : 33); camera.lookAt(0, 5.6, 0); camera.updateProjectionMatrix(); }
  addEventListener('resize', resize); resize();

  let running = false, last = performance.now(), t = 0;
  function frame(now) {
    if (!running) return;
    const dt = Math.min(0.05, (now - last) / 1000); last = now; t += dt;
    const target = sample(), k = S.reduce ? 1 : 1 - Math.exp(-dt * 4);
    FIELDS.forEach((f) => (cur[f] += (target[f] - cur[f]) * k));
    for (let z = 0; z < 5; z++) zoneW[z] += ((z === S.zone ? 1 : 0) * cur.zone - zoneW[z]) * k;
    pickW += (cur.pick - pickW) * k; smx += (mx - smx) * 0.04;
    root.rotation.y = cur.rot + (S.reduce ? 0 : Math.sin(t * 0.12) * 0.12) + smx * 0.18;
    root.position.set(cur.x, cur.y, 0); root.scale.setScalar(cur.s);
    canvas.style.opacity = cur.fade.toFixed(3);
    if (cur.fade > 0.01) { place(); light(); renderer.render(scene, camera); }
    requestAnimationFrame(frame);
  }
  const start = () => { if (!running) { running = true; last = performance.now(); requestAnimationFrame(frame); } };
  new IntersectionObserver(([e]) => { if (e.isIntersecting && !document.hidden) start(); else running = false; }).observe(day);
  document.addEventListener('visibilitychange', () => { if (document.hidden) running = false; else if (day.getBoundingClientRect().top < innerHeight) start(); });
  // Draw one frame up front so the towers are ready when the dawn band arrives.
  place(); light(); renderer.render(scene, camera);
}
