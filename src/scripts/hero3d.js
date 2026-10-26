// Hero scene: three ribbons (polished gold, oxblood lacquer, a thin ivory line) braided along a rising
// growth curve, like silk caught in a breeze. Each ribbon is a flat strip bent on the GPU: a centreline,
// a twist and a taper, with normals rebuilt per vertex so reflections slide along the folds.
// The cursor lifts the ribbons toward it, a click sends a wave down them, and scrolling unwinds them.
// Real work floats along the curve. Renders only while the hero is on screen.
import * as THREE from 'three';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';

// Shared by the shader and the card placement, so cards sit exactly on the curve.
const LEN = (phone) => (phone ? 4.6 : 6.6);
const centre = (s, t, len) => [
  s * len * 0.5,
  -1.0 + 2.2 * Math.pow((s + 1) * 0.5, 1.8) + 0.22 * Math.sin(s * 3.1 + t * 0.55),
  0.55 * Math.sin(s * 2.3 - t * 0.45) - 0.2,
];

const RIBBON = /* glsl */ `
uniform float uTime, uLen, uWidth, uTwist, uPhase, uLift, uPull, uMouseX, uWaveS, uWaveT, uProg;
vec3 centre(float s, float t) {
  return vec3(
    s * uLen * 0.5,
    -1.0 + 2.2 * pow((s + 1.0) * 0.5, 1.8) + 0.22 * sin(s * 3.1 + t * 0.55) + uLift,
    0.55 * sin(s * 2.3 - t * 0.45) - 0.2);
}
vec3 ribbon(float u, float v) {
  float s = u * 2.0 - 1.0, t = uTime + uPhase;
  vec3 c = centre(s, t);
  // the cursor lifts the curve toward the viewer; a click sends a travelling wave
  float near = exp(-pow(c.x - uMouseX, 2.0) / 0.9) * uPull;
  c.z += near * 0.7; c.y += near * 0.18;
  c.y += sin((s - uWaveS) * 9.0 - uWaveT * 11.0) * exp(-uWaveT * 1.4) * exp(-pow(s - uWaveS, 2.0) * 2.0) * 0.35;
  vec3 T = normalize(centre(s + 0.01, t) - centre(s - 0.01, t));
  vec3 N = normalize(cross(T, vec3(0.0, 0.0, 1.0)));
  vec3 B = cross(T, N);
  float a = s * uTwist + t * 0.35 + uPhase * 2.0 + near * 1.4 + uProg * 4.0;
  float taper = 0.25 + 0.75 * sin(3.14159 * u);
  return c + (cos(a) * N + sin(a) * B) * (v - 0.5) * uWidth * taper;
}
`;

function ribbonMesh(segU, segV, U, mat) {
  mat.onBeforeCompile = (sh) => {
    Object.assign(sh.uniforms, U);
    sh.vertexShader = sh.vertexShader
      .replace('#include <common>', `#include <common>\n${RIBBON}`)
      .replace('#include <beginnormal_vertex>', `
        vec3 rP0 = ribbon(uv.x, uv.y);
        vec3 objectNormal = normalize(cross(ribbon(uv.x + 0.002, uv.y) - rP0, ribbon(uv.x, uv.y + 0.02) - rP0));
        #ifdef USE_TANGENT
          vec3 objectTangent = vec3(tangent.xyz);
        #endif`)
      .replace('#include <begin_vertex>', 'vec3 transformed = rP0;');
  };
  const m = new THREE.Mesh(new THREE.PlaneGeometry(1, 1, segU, segV), mat);
  m.frustumCulled = false;
  return m;
}

export default function hero3d(canvas, opts = {}) {
  let gl;
  try { gl = new THREE.WebGLRenderer({ canvas, antialias: true, powerPreference: 'high-performance' }); } catch { return null; }
  const phone = innerWidth < 900;
  gl.setPixelRatio(Math.min(devicePixelRatio, phone ? 1.6 : 1.75));
  gl.setClearColor(0x0b0a08, 1);
  gl.toneMapping = THREE.NeutralToneMapping;
  gl.toneMappingExposure = 1.0;
  gl.outputColorSpace = THREE.SRGBColorSpace;

  const scene = new THREE.Scene();
  const pm = new THREE.PMREMGenerator(gl);
  scene.environment = pm.fromScene(new RoomEnvironment(), 0.04).texture;
  const cam = new THREE.PerspectiveCamera(32, 1, 0.1, 60);
  cam.position.set(0, 0, phone ? 11 : 8.2);

  const key = new THREE.DirectionalLight(0xffe2b0, 2.4); key.position.set(3, 4, 5); scene.add(key);
  const rim = new THREE.PointLight(0x9a2a33, 30, 14); rim.position.set(-3, -2, -1); scene.add(rim);

  const len = LEN(phone);
  const T = { value: 0 }, pull = { value: 0 }, mouseX = { value: 0 }, waveS = { value: 0 }, waveT = { value: 9 }, prog = { value: 0 };
  const uni = (width, twist, phase, lift) => ({
    uTime: T, uLen: { value: len }, uWidth: { value: width }, uTwist: { value: twist }, uPhase: { value: phase }, uLift: { value: lift },
    uPull: pull, uMouseX: mouseX, uWaveS: waveS, uWaveT: waveT, uProg: prog,
  });
  const rig = new THREE.Group();
  const segU = phone ? 220 : 420;
  rig.add(
    ribbonMesh(segU, 18, uni(phone ? 0.75 : 1.0, 2.6, 0, 0), new THREE.MeshPhysicalMaterial({
      color: 0xd6a85e, metalness: 1, roughness: 0.16, clearcoat: 0.6, clearcoatRoughness: 0.1, side: THREE.DoubleSide, envMapIntensity: 1.0,
    })),
    ribbonMesh(segU, 10, uni(phone ? 0.42 : 0.55, 3.4, 1.9, -0.14), new THREE.MeshPhysicalMaterial({
      color: 0x3e0a10, metalness: 0.45, roughness: 0.24, clearcoat: 1, clearcoatRoughness: 0.06, side: THREE.DoubleSide, sheen: 0.25, sheenColor: new THREE.Color(0x8a2a2a),
    })),
    ribbonMesh(segU, 2, uni(0.05, 5.0, 3.7, 0.18), new THREE.MeshPhysicalMaterial({
      color: 0xf2e6cf, metalness: 0.9, roughness: 0.2, side: THREE.DoubleSide,
    })),
  );
  rig.rotation.z = phone ? 0.32 : 0.06;
  rig.scale.setScalar(phone ? 0.75 : 0.92);
  scene.add(rig);

  // Work cards riding along the curve: each a curved plane with its image and result baked in.
  const cards = [];
  const makeCard = (img, label, value, i, n) => {
    const W = 1024, ar = img.naturalHeight / img.naturalWidth, H = Math.round(W * Math.min(Math.max(ar, 0.62), 1.5));
    const c = document.createElement('canvas'); c.width = W; c.height = H;
    const x = c.getContext('2d');
    const r = 46;
    x.beginPath(); x.roundRect(0, 0, W, H, r); x.clip();
    const s = Math.max(W / img.naturalWidth, H / img.naturalHeight);
    x.drawImage(img, (W - img.naturalWidth * s) / 2, (H - img.naturalHeight * s) / 2, img.naturalWidth * s, img.naturalHeight * s);
    const g = x.createLinearGradient(0, H * 0.5, 0, H); g.addColorStop(0, 'rgba(11,10,8,0)'); g.addColorStop(1, 'rgba(11,10,8,0.88)');
    x.fillStyle = g; x.fillRect(0, 0, W, H);
    x.fillStyle = '#ecd5a6'; x.font = `italic 400 ${Math.round(W * 0.12)}px "Bodoni Moda Variable", Didot, serif`;
    x.fillText(value, 56, H - 100);
    x.fillStyle = 'rgba(242,234,219,0.9)'; x.font = `600 ${Math.round(W * 0.034)}px "Hanken Grotesk Variable", sans-serif`;
    x.fillText(label.toUpperCase().split('').join(String.fromCharCode(8202)), 60, H - 48);
    x.strokeStyle = 'rgba(207,174,116,0.55)'; x.lineWidth = 4; x.beginPath(); x.roundRect(2, 2, W - 4, H - 4, r); x.stroke();
    const tex = new THREE.CanvasTexture(c); tex.colorSpace = THREE.SRGBColorSpace; tex.anisotropy = 4;
    const w = phone ? 0.6 : 0.74, h = w * (H / W);
    const geo = new THREE.PlaneGeometry(w, h, 24, 1);
    const pos = geo.attributes.position;
    for (let k = 0; k < pos.count; k++) pos.setZ(k, -Math.pow(pos.getX(k) / w, 2) * 0.3);
    const m = new THREE.Mesh(geo, new THREE.MeshBasicMaterial({ map: tex, transparent: true, side: THREE.DoubleSide, toneMapped: false }));
    // Spread along the rising part of the curve, alternating above and below it.
    m.userData.s = (phone ? -0.42 : -0.18) + (i / Math.max(1, n - 1)) * (phone ? 0.95 : 0.86);
    m.userData.side = i % 2 ? -1 : 1;
    rig.add(m); cards.push(m);
  };
  const work = (opts.cards || []).slice(0, phone ? 4 : 99);
  document.fonts.ready.then(() => work.forEach((w, i) => {
    const img = new Image(); img.decoding = 'async'; img.src = w.src;
    img.onload = () => makeCard(img, w.label, w.value, i, work.length);
  }));

  // Gold dust.
  const N = phone ? 700 : 1800;
  const dp = new Float32Array(N * 3), ds = new Float32Array(N);
  for (let i = 0; i < N; i++) {
    const rr = 2 + Math.random() * 6, a = Math.random() * Math.PI * 2;
    dp.set([Math.cos(a) * rr, (Math.random() - 0.5) * 7, Math.sin(a) * rr - 2], i * 3); ds[i] = Math.random();
  }
  const dg = new THREE.BufferGeometry();
  dg.setAttribute('position', new THREE.BufferAttribute(dp, 3));
  dg.setAttribute('aS', new THREE.BufferAttribute(ds, 1));
  const dust = new THREE.Points(dg, new THREE.ShaderMaterial({
    transparent: true, depthWrite: false, blending: THREE.AdditiveBlending, toneMapped: false,
    uniforms: { uTime: T, uPx: { value: gl.getPixelRatio() } },
    vertexShader: `attribute float aS; uniform float uTime, uPx; varying float vA;
      void main(){ vec3 p = position; p.y += mod(uTime * (0.05 + aS * 0.12) + aS * 7.0, 7.0) - 3.5 - position.y;
        p.x += sin(uTime * 0.3 + aS * 30.0) * 0.15;
        vec4 mv = modelViewMatrix * vec4(p, 1.0); gl_Position = projectionMatrix * mv;
        gl_PointSize = uPx * (1.2 + aS * 2.6) * (6.0 / -mv.z); vA = 0.25 + 0.6 * aS; }`,
    fragmentShader: `varying float vA; void main(){ float d = length(gl_PointCoord - 0.5); if (d > 0.5) discard;
      gl_FragColor = vec4(0.93, 0.8, 0.55, vA * smoothstep(0.5, 0.0, d)); }`,
  }));
  scene.add(dust);

  const home = phone ? new THREE.Vector3(0.05, 1.95, 0) : new THREE.Vector3(2.05, 0.25, 0);
  const size = () => {
    const w = canvas.clientWidth, h = canvas.clientHeight;
    gl.setSize(w, h, false);
    cam.aspect = w / h; cam.updateProjectionMatrix();
  };
  size(); addEventListener('resize', size);

  // Input: the pointer's x lifts the ribbons there; a click or tap sends a wave from that point.
  let mx = 0, my = 0, inHero = false, p = 0, visible = true, raf = 0, last = performance.now();
  const toLocalX = (nx) => {
    const v = new THREE.Vector3(nx, 0, 0.5).unproject(cam).sub(cam.position).normalize();
    const d = -cam.position.z / v.z;
    return rig.worldToLocal(cam.position.clone().add(v.multiplyScalar(d))).x;
  };
  addEventListener('pointermove', (e) => {
    const r = canvas.getBoundingClientRect();
    mx = ((e.clientX - r.left) / r.width) * 2 - 1; my = -(((e.clientY - r.top) / r.height) * 2 - 1);
    inHero = e.clientY < r.bottom && e.clientY > r.top;
  }, { passive: true });
  canvas.parentElement.addEventListener('pointerdown', (e) => {
    const r = canvas.getBoundingClientRect();
    waveS.value = Math.max(-1, Math.min(1, toLocalX(((e.clientX - r.left) / r.width) * 2 - 1) / (len * 0.5)));
    waveT.value = 0;
  });

  const tmp = new THREE.Vector3();
  const loop = (now) => {
    const dt = Math.min(0.05, (now - last) / 1000); last = now;
    T.value += dt; waveT.value += dt;
    pull.value += ((inHero ? 1 : 0) - pull.value) * 0.05;
    mouseX.value += (toLocalX(mx) - mouseX.value) * 0.08;
    prog.value = p;
    rig.position.lerp(tmp.set(home.x - p * (phone ? 0 : 0.8), home.y + p * 1.6, -p * 2), 0.08);
    rig.rotation.y = Math.sin(T.value * 0.15) * 0.12 + mx * 0.12;
    rig.rotation.x = -0.12 + my * 0.06 + p * 0.4;
    cards.forEach((c, i) => {
      const [x, y, z] = centre(c.userData.s, T.value, len);
      c.position.set(x, y + c.userData.side * (phone ? 0.58 : 0.66) + Math.sin(T.value * 0.8 + i) * 0.06, z + 0.55 + p * i * 0.4);
      c.rotation.set(0, -rig.rotation.y, -rig.rotation.z + Math.sin(T.value * 0.5 + i) * 0.04);
    });
    cam.position.x += (mx * 0.3 - cam.position.x) * 0.04;
    cam.position.y += (my * 0.2 - cam.position.y) * 0.04;
    cam.lookAt(0, 0, 0);
    dust.rotation.y = T.value * 0.02 + mx * 0.08;
    gl.render(scene, cam);
    raf = visible ? requestAnimationFrame(loop) : 0;
  };
  raf = requestAnimationFrame(loop);
  // Runs only while on screen and while the showreel dialog is closed (ui.js sends the 'reel' event).
  let onScreen = true, held = false;
  const wake = () => { visible = onScreen && !held; if (visible && !raf) { last = performance.now(); raf = requestAnimationFrame(loop); } };
  new IntersectionObserver(([e]) => { onScreen = e.isIntersecting; wake(); }).observe(canvas);
  addEventListener('reel', (e) => { held = e.detail; wake(); });
  return { setProgress: (v) => (p = v) };
}
