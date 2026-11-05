// 2. The services keyboard. Every service is a keycap in the agency's style (ink body, paper face,
// offset shadow plate). Scrolling in: the keys fall into place. Scrolling on: the board comes apart
// row by row and the active funnel row lifts, lights amber and types. Hover a key for its proof,
// click it to open the work.
import * as THREE from 'three';
import { RoundedBoxGeometry } from 'three/examples/jsm/geometries/RoundedBoxGeometry.js';

const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));
const ss = (a, b, x) => { const t = clamp((x - a) / (b - a)); return t * t * (3 - 2 * t); };
const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;

export async function initKeys() {
  const section = document.getElementById('services'), stage = section.querySelector('.k-stage'), canvas = document.getElementById('keysgl');
  const rowsEl = [...document.querySelectorAll('#rows li')], tip = document.getElementById('ktip');
  const data = JSON.parse(document.getElementById('keydata').textContent);
  const progress = () => { const r = section.getBoundingClientRect(); return clamp(-r.top / Math.max(1, section.offsetHeight - innerHeight)); };
  const rowFor = (p) => (p < 0.16 ? -1 : p > 0.93 ? -1 : Math.min(4, Math.floor(((p - 0.16) / 0.77) * 5)));
  const updateRows = (r) => rowsEl.forEach((li, i) => li.classList.toggle('on', i === r));

  let renderer = null;
  try { renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true }); } catch { renderer = null; }
  if (!renderer) { canvas.remove(); addEventListener('scroll', () => updateRows(rowFor(progress())), { passive: true }); return; }
  renderer.outputColorSpace = THREE.LinearSRGBColorSpace;
  renderer.setPixelRatio(Math.min(devicePixelRatio, 1.75)); renderer.setClearColor(0x000000, 0);
  renderer.shadowMap.enabled = true; renderer.shadowMap.type = THREE.PCFShadowMap;
  const scene = new THREE.Scene(), camera = new THREE.PerspectiveCamera(32, 1, 0.1, 100);
  scene.add(new THREE.HemisphereLight(0xffffff, 0xb9b3a7, 0.62 * Math.PI));
  const sun = new THREE.DirectionalLight(0xffffff, 0.95 * Math.PI); sun.position.set(-7, 14, 9); sun.castShadow = true; sun.shadow.mapSize.set(1024, 1024);
  Object.assign(sun.shadow.camera, { left: -12, right: 12, top: 10, bottom: -10, near: 1, far: 50 }); sun.shadow.camera.updateProjectionMatrix(); sun.shadow.bias = -0.0006; scene.add(sun);
  const board = new THREE.Group(); scene.add(board);

  // fonts must be ready before labels are drawn onto the key faces
  try { await Promise.all([document.fonts.load('500 64px "Jost Variable"'), document.fonts.load('400 28px "Michroma"')]); } catch { /* draw with fallbacks */ }

  const D = 1.3, GAP = 0.22, KH = 0.55, PX = 220;
  const width = (label) => clamp(1.05 + 0.072 * label.length, 1.4, 2.6);
  const rows = data.map((r, ri) => ({ ...r, keys: r.keys.map((k) => ({ ...k, w: width(k.k) })) }));
  const rowW = rows.map((r) => r.keys.reduce((s, k) => s + k.w, 0) + GAP * (r.keys.length - 1));
  const maxW = Math.max(...rowW.slice(0, 4));
  // last row: a CTRL key, then the consultancy bar filling the rest
  const bottom = rows[rows.length - 1]; const ctrlW = 2.4;
  bottom.keys[0].w = maxW - ctrlW - GAP; bottom.keys.unshift({ k: 'CTRL', p: 'the Funnel', href: '#contact', w: ctrlW, ctrl: true });
  const depth = rows.length * D + (rows.length - 1) * GAP;

  function face(k) {
    const w = Math.round((k.w - 0.16) * PX), h = Math.round((D - 0.16) * PX), c = document.createElement('canvas'); c.width = w; c.height = h;
    const g = c.getContext('2d');
    if (k.ctrl) {
      g.fillStyle = '#17171a'; g.fillRect(0, 0, w, h); g.fillStyle = '#f2f0eb'; g.textAlign = 'center';
      g.font = `400 ${Math.round(h * 0.26)}px Michroma, sans-serif`; g.fillText('CTRL', w / 2, h * 0.46);
      g.fillRect(w * 0.2, h * 0.56, w * 0.6, Math.max(2, h * 0.02));
      g.font = `400 ${Math.round(h * 0.13)}px "Jost Variable", Jost, sans-serif`; g.fillText('the Funnel', w / 2, h * 0.78);
    } else {
      g.fillStyle = '#faf9f6'; g.fillRect(0, 0, w, h);
      g.fillStyle = '#17171a'; g.textAlign = 'left';
      let fs = Math.round(h * 0.25); g.font = `500 ${fs}px "Jost Variable", Jost, sans-serif`;
      while (g.measureText(k.k).width > w * 0.86 && fs > 12) { fs -= 2; g.font = `500 ${fs}px "Jost Variable", Jost, sans-serif`; }
      g.fillText(k.k, w * 0.08, h * 0.42);
      g.fillStyle = '#5d5b56'; let ps = Math.round(h * 0.085); g.font = `400 ${ps}px Michroma, sans-serif`;
      const p = k.p.toUpperCase(); while (g.measureText(p).width > w * 0.86 && ps > 9) { ps -= 1; g.font = `400 ${ps}px Michroma, sans-serif`; }
      g.fillText(p, w * 0.08, h * 0.8);
    }
    const t = new THREE.CanvasTexture(c); t.anisotropy = 4; t.colorSpace = THREE.NoColorSpace; return t;
  }

  const bodyMat = new THREE.MeshStandardMaterial({ color: 0x17171a, roughness: 0.55 });
  const keys = [];
  rows.forEach((r, ri) => {
    let x = -maxW / 2 + (ri === rows.length - 1 ? 0 : (maxW - rowW[ri]) / 2);
    const z = -depth / 2 + D / 2 + ri * (D + GAP);
    r.keys.forEach((k, ki) => {
      const grp = new THREE.Group();
      const body = new THREE.Mesh(new RoundedBoxGeometry(k.w, KH, D, 3, 0.13), bodyMat); body.castShadow = true; body.receiveShadow = true; grp.add(body);
      const mat = new THREE.MeshBasicMaterial({ map: face(k), color: 0xffffff });
      const top = new THREE.Mesh(new THREE.PlaneGeometry(k.w - 0.16, D - 0.16), mat); top.rotation.x = -Math.PI / 2; top.position.y = KH / 2 + 0.004; grp.add(top);
      const home = new THREE.Vector3(x + k.w / 2, KH / 2 + 0.25, z);
      const n = keys.length;
      const from = new THREE.Vector3(home.x + (Math.random() - 0.5) * 6, home.y + 5 + Math.random() * 5, home.z + (Math.random() - 0.5) * 5);
      const spin = new THREE.Euler((Math.random() - 0.5) * 1.6, (Math.random() - 0.5) * 1.6, (Math.random() - 0.5) * 1.6);
      grp.position.copy(home); board.add(grp);
      keys.push({ ...k, row: ri, idx: ki, grp, top, mat, home, from, spin, delay: (n % 9) * 0.05 + ri * 0.06, lift: 0 });
      x += k.w + GAP;
    });
  });
  // base plate with the logo's offset shadow
  const plateW = maxW + 1.1, plateD = depth + 1.1;
  const plate = new THREE.Mesh(new RoundedBoxGeometry(plateW, 0.5, plateD, 4, 0.22), new THREE.MeshStandardMaterial({ color: 0xe8e5dd, roughness: 0.8 }));
  plate.receiveShadow = true; plate.castShadow = true; board.add(plate);
  const shadow = new THREE.Mesh(new RoundedBoxGeometry(plateW, 0.5, plateD, 4, 0.22), new THREE.MeshStandardMaterial({ color: 0x17171a, roughness: 0.9 }));
  shadow.position.set(-0.32, -0.34, 0.32); board.add(shadow);

  const WHITE = new THREE.Color(0xffffff), AMB = new THREE.Color(0xe8b45c), DIM = new THREE.Color(0xd8d3c8);
  let W = 1, H = 1, fit = 1;
  function resize() {
    W = stage.clientWidth; H = stage.clientHeight; renderer.setSize(W, H, false); camera.aspect = W / H; camera.updateProjectionMatrix();
    const narrow = W < 900, dist = 17, visH = 2 * dist * Math.tan((camera.fov * Math.PI) / 360), visW = visH * camera.aspect;
    fit = Math.min((visW * (narrow ? 0.8 : 0.5)) / plateW, (visH * (narrow ? 0.42 : 0.8)) / (plateD * 1.6));
    camera.position.set(0, dist * 0.78, dist * 0.62); camera.lookAt(0, 0, 0);
    board.scale.setScalar(fit);
    board.position.set(narrow ? 0 : visW * 0.19, 0, narrow ? visH * 0.34 : 0);
  }
  new ResizeObserver(resize).observe(stage); resize();

  // hover and click
  const ray = new THREE.Raycaster(), ndc = new THREE.Vector2(), tops = keys.map((k) => k.top);
  let hover = null;
  canvas.addEventListener('pointermove', (e) => {
    const r = canvas.getBoundingClientRect(); ndc.set(((e.clientX - r.left) / r.width) * 2 - 1, -((e.clientY - r.top) / r.height) * 2 + 1);
    ray.setFromCamera(ndc, camera); const hit = ray.intersectObjects(tops, false)[0];
    hover = hit ? keys.find((k) => k.top === hit.object) : null;
    canvas.style.cursor = hover ? 'pointer' : '';
    if (hover) { tip.innerHTML = `<b>${hover.ctrl ? 'Start a project' : hover.k}</b>${hover.ctrl ? 'Press to talk to us' : hover.p}`; tip.style.opacity = '1'; tip.style.transform = `translate(${e.clientX - r.left + 16}px,${e.clientY - r.top + 12}px)`; }
    else tip.style.opacity = '0';
  });
  canvas.addEventListener('pointerleave', () => { hover = null; tip.style.opacity = '0'; });
  canvas.addEventListener('click', () => {
    if (!hover) return; const a = document.createElement('a'); a.href = hover.href;
    if (/^https?:/.test(hover.href)) { a.target = '_blank'; a.rel = 'noopener'; }
    document.body.appendChild(a); a.click(); a.remove();
  });
  let mx = 0, smx = 0; stage.addEventListener('pointermove', (e) => { mx = (e.clientX / innerWidth) * 2 - 1; });

  const tmpE = new THREE.Euler(), P = new THREE.Vector3();
  let cur = progress(), running = false, last = performance.now(), t = 0, lastRow = -2;
  function frame(now) {
    if (!running) return;
    const dt = Math.min(0.05, (now - last) / 1000); last = now; t += dt;
    cur += (progress() - cur) * (reduce ? 1 : 1 - Math.exp(-dt * 6));
    const row = rowFor(cur); if (row !== lastRow) { updateRows(row); lastRow = row; }
    const land = reduce ? 1 : ss(0, 0.15, cur);
    const ex = ss(0.15, 0.26, cur) * (1 - ss(0.86, 0.95, cur));
    const done = ss(0.93, 1, cur);
    smx += (mx - smx) * 0.05;
    board.rotation.set(-0.06 + ex * 0.2, (W < 900 ? -0.04 : -0.18) + smx * 0.12 + (reduce ? 0 : Math.sin(t * 0.3) * 0.02), 0);
    keys.forEach((k) => {
      const a = clamp((land - k.delay) / 0.45), e = 1 - Math.pow(1 - a, 3);
      const active = row === k.row ? 1 : 0;
      const rowLift = ex * (active ? 0.9 : -0.05);
      const spread = ex * (k.row - (rows.length - 1) / 2) * 0.75;
      const type = active && !reduce ? Math.pow(Math.max(0, Math.sin(t * 4 - k.idx * 0.8)), 10) * 0.2 : 0;
      k.lift += ((hover === k ? 0.18 : 0) - k.lift) * 0.2;
      const ctrlPress = k.ctrl ? done * 0.16 : 0;
      P.set(k.home.x, k.home.y + rowLift + k.lift - type - ctrlPress, k.home.z + spread);
      k.grp.position.lerpVectors(k.from, P, e);
      tmpE.set(k.spin.x * (1 - e), k.spin.y * (1 - e), k.spin.z * (1 - e)); k.grp.rotation.copy(tmpE);
      const tint = k.ctrl ? 0 : active * ex;
      k.mat.color.copy(WHITE).lerp(DIM, ex * (1 - active) * 0.6).lerp(AMB, tint * 0.85);
    });
    renderer.render(scene, camera);
    requestAnimationFrame(frame);
  }
  const start = () => { if (!running) { running = true; last = performance.now(); requestAnimationFrame(frame); } };
  new IntersectionObserver(([e]) => { if (e.isIntersecting && !document.hidden) start(); else running = false; }, { rootMargin: '200px 0px' }).observe(section);
  document.addEventListener('visibilitychange', () => { if (document.hidden) running = false; });
  // first frame so the board is there before it scrolls in
  start();
}
