// Hero scene: a liquid-gold sculpture (a sphere displaced by layered simplex noise, normals rebuilt
// per vertex so the reflections stay true), real work orbiting it on curved cards, and gold dust.
// The cursor pulls a bulge out of the metal; a click sends a splash through it; scrolling melts it.
// Renders only while the hero is on screen.
import * as THREE from 'three';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';

const NOISE = /* glsl */ `
vec3 mod289(vec3 x){return x-floor(x*(1.0/289.0))*289.0;}
vec4 mod289(vec4 x){return x-floor(x*(1.0/289.0))*289.0;}
vec4 permute(vec4 x){return mod289(((x*34.0)+1.0)*x);}
vec4 taylorInvSqrt(vec4 r){return 1.79284291400159-0.85373472095314*r;}
float snoise(vec3 v){
  const vec2 C=vec2(1.0/6.0,1.0/3.0); const vec4 D=vec4(0.0,0.5,1.0,2.0);
  vec3 i=floor(v+dot(v,C.yyy)); vec3 x0=v-i+dot(i,C.xxx);
  vec3 g=step(x0.yzx,x0.xyz); vec3 l=1.0-g; vec3 i1=min(g.xyz,l.zxy); vec3 i2=max(g.xyz,l.zxy);
  vec3 x1=x0-i1+C.xxx; vec3 x2=x0-i2+C.yyy; vec3 x3=x0-D.yyy;
  i=mod289(i);
  vec4 p=permute(permute(permute(i.z+vec4(0.0,i1.z,i2.z,1.0))+i.y+vec4(0.0,i1.y,i2.y,1.0))+i.x+vec4(0.0,i1.x,i2.x,1.0));
  float n_=0.142857142857; vec3 ns=n_*D.wyz-D.xzx;
  vec4 j=p-49.0*floor(p*ns.z*ns.z); vec4 x_=floor(j*ns.z); vec4 y_=floor(j-7.0*x_);
  vec4 x=x_*ns.x+ns.yyyy; vec4 y=y_*ns.x+ns.yyyy; vec4 h=1.0-abs(x)-abs(y);
  vec4 b0=vec4(x.xy,y.xy); vec4 b1=vec4(x.zw,y.zw);
  vec4 s0=floor(b0)*2.0+1.0; vec4 s1=floor(b1)*2.0+1.0; vec4 sh=-step(h,vec4(0.0));
  vec4 a0=b0.xzyw+s0.xzyw*sh.xxyy; vec4 a1=b1.xzyw+s1.xzyw*sh.zzww;
  vec3 p0=vec3(a0.xy,h.x); vec3 p1=vec3(a0.zw,h.y); vec3 p2=vec3(a1.xy,h.z); vec3 p3=vec3(a1.zw,h.w);
  vec4 norm=taylorInvSqrt(vec4(dot(p0,p0),dot(p1,p1),dot(p2,p2),dot(p3,p3)));
  p0*=norm.x; p1*=norm.y; p2*=norm.z; p3*=norm.w;
  vec4 m=max(0.6-vec4(dot(x0,x0),dot(x1,x1),dot(x2,x2),dot(x3,x3)),0.0); m=m*m;
  return 42.0*dot(m*m,vec4(dot(p0,x0),dot(p1,x1),dot(p2,x2),dot(p3,x3)));
}
uniform float uTime, uAmp, uFreq, uPull, uSplash, uSplashT;
uniform vec3 uMouse, uSplashDir;
float disp(vec3 p){
  vec3 q = p * uFreq;
  float n = snoise(q + vec3(uTime * 0.16, uTime * 0.12, -uTime * 0.1));
  n += 0.18 * snoise(q * 2.1 - vec3(uTime * 0.22));
  vec3 dir = normalize(p);
  float pull = pow(max(dot(dir, uMouse), 0.0), 6.0) * uPull;
  float ring = sin(acos(clamp(dot(dir, uSplashDir), -1.0, 1.0)) * 9.0 - uSplashT * 14.0) * exp(-uSplashT * 1.6) * uSplash;
  return n * uAmp + pull * 0.42 + ring * 0.07;
}
vec3 displaced(vec3 p){ return p + normalize(p) * disp(p); }
`;

export default function hero3d(canvas, opts = {}) {
  let gl;
  try { gl = new THREE.WebGLRenderer({ canvas, antialias: true, powerPreference: 'high-performance' }); } catch { return null; }
  const phone = innerWidth < 900;
  gl.setPixelRatio(Math.min(devicePixelRatio, phone ? 1.5 : 1.75));
  gl.setClearColor(0x0b0a08, 1);
  gl.toneMapping = THREE.NeutralToneMapping;
  gl.toneMappingExposure = 0.95;
  gl.outputColorSpace = THREE.SRGBColorSpace;

  const scene = new THREE.Scene();
  const pm = new THREE.PMREMGenerator(gl);
  scene.environment = pm.fromScene(new RoomEnvironment(), 0.03).texture;
  const cam = new THREE.PerspectiveCamera(32, 1, 0.1, 60);
  cam.position.set(0, 0, phone ? 11 : 7.6);

  // Warm key and an oxblood rim so the metal picks up the brand colours.
  const key = new THREE.DirectionalLight(0xffe2b0, 2.2); key.position.set(3, 4, 5); scene.add(key);
  const rim = new THREE.PointLight(0x7a1f26, 40, 12); rim.position.set(-3, -1.5, -2); scene.add(rim);
  const fill = new THREE.PointLight(0xcfae74, 18, 10); fill.position.set(2.5, -2.5, 3); scene.add(fill);

  // The sculpture.
  const U = {
    uTime: { value: 0 }, uAmp: { value: 0.16 }, uFreq: { value: 0.62 }, uPull: { value: 0 },
    uMouse: { value: new THREE.Vector3(0, 0, 1) }, uSplash: { value: 0 }, uSplashT: { value: 9 }, uSplashDir: { value: new THREE.Vector3(0, 0, 1) },
  };
  const mat = new THREE.MeshPhysicalMaterial({
    color: 0xd4a65c, metalness: 1, roughness: 0.13, clearcoat: 0.8, clearcoatRoughness: 0.08,
    iridescence: 0.18, iridescenceIOR: 1.5, envMapIntensity: 0.85,
  });
  mat.onBeforeCompile = (sh) => {
    Object.assign(sh.uniforms, U);
    sh.vertexShader = sh.vertexShader
      .replace('#include <common>', `#include <common>\n${NOISE}`)
      .replace('#include <beginnormal_vertex>', `
        vec3 nrm0 = normalize(position);
        vec3 tng = normalize(cross(nrm0, abs(nrm0.y) < 0.99 ? vec3(0.0, 1.0, 0.0) : vec3(1.0, 0.0, 0.0)));
        vec3 btn = normalize(cross(nrm0, tng));
        vec3 dP0 = displaced(position);
        vec3 dP1 = displaced(position + tng * 0.012);
        vec3 dP2 = displaced(position + btn * 0.012);
        vec3 objectNormal = normalize(cross(dP1 - dP0, dP2 - dP0));
        #ifdef USE_TANGENT
          vec3 objectTangent = vec3(tangent.xyz);
        #endif`)
      .replace('#include <begin_vertex>', 'vec3 transformed = dP0;');
  };
  const seg = phone ? 110 : 220;
  const blob = new THREE.Mesh(new THREE.SphereGeometry(phone ? 0.64 : 1.05, seg, seg), mat);
  const rig = new THREE.Group();
  rig.add(blob);
  scene.add(rig);

  // Work cards on a tilted orbit: each one a curved plane with its image and result baked in.
  const ring = new THREE.Group();
  ring.rotation.set(0.32, 0, -0.18);
  rig.add(ring);
  const cards = [];
  const makeCard = (img, label, value, i, n) => {
    const W = 1024, ar = img.naturalHeight / img.naturalWidth, H = Math.round(W * Math.min(Math.max(ar, 0.62), 1.5));
    const c = document.createElement('canvas'); c.width = W; c.height = H;
    const x = c.getContext('2d');
    const r = 46;
    x.beginPath(); x.roundRect(0, 0, W, H, r); x.clip();
    const s = Math.max(W / img.naturalWidth, H / img.naturalHeight);
    x.drawImage(img, (W - img.naturalWidth * s) / 2, (H - img.naturalHeight * s) / 2, img.naturalWidth * s, img.naturalHeight * s);
    const g = x.createLinearGradient(0, H * 0.55, 0, H); g.addColorStop(0, 'rgba(11,10,8,0)'); g.addColorStop(1, 'rgba(11,10,8,0.85)');
    x.fillStyle = g; x.fillRect(0, 0, W, H);
    x.fillStyle = '#ecd5a6'; x.font = `italic 400 ${Math.round(W * 0.12)}px "Bodoni Moda Variable", Didot, serif`;
    x.fillText(value, 56, H - 100);
    x.fillStyle = 'rgba(242,234,219,0.9)'; x.font = `600 ${Math.round(W * 0.034)}px "Hanken Grotesk Variable", sans-serif`;
    x.fillText(label.toUpperCase().split('').join(String.fromCharCode(8202)), 60, H - 48);
    x.strokeStyle = 'rgba(207,174,116,0.55)'; x.lineWidth = 4; x.beginPath(); x.roundRect(2, 2, W - 4, H - 4, r); x.stroke();
    const tex = new THREE.CanvasTexture(c); tex.colorSpace = THREE.SRGBColorSpace; tex.anisotropy = 4;
    const w = phone ? 0.66 : 0.9, h = w * (H / W);
    const geo = new THREE.PlaneGeometry(w, h, 24, 1);
    const pos = geo.attributes.position;
    for (let k = 0; k < pos.count; k++) pos.setZ(k, -Math.pow(pos.getX(k) / w, 2) * 0.35);
    geo.computeVertexNormals();
    const m = new THREE.Mesh(geo, new THREE.MeshBasicMaterial({ map: tex, transparent: true, side: THREE.DoubleSide, toneMapped: false }));
    m.userData.a = (i / n) * Math.PI * 2;
    ring.add(m); cards.push(m);
  };
  const work = opts.cards || [];
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
    uniforms: { uTime: U.uTime, uPx: { value: gl.getPixelRatio() } },
    vertexShader: `attribute float aS; uniform float uTime, uPx; varying float vA;
      void main(){ vec3 p = position; p.y += mod(uTime * (0.05 + aS * 0.12) + aS * 7.0, 7.0) - 3.5 - position.y;
        p.x += sin(uTime * 0.3 + aS * 30.0) * 0.15;
        vec4 mv = modelViewMatrix * vec4(p, 1.0); gl_Position = projectionMatrix * mv;
        gl_PointSize = uPx * (1.2 + aS * 2.6) * (6.0 / -mv.z); vA = 0.25 + 0.6 * aS; }`,
    fragmentShader: `varying float vA; void main(){ float d = length(gl_PointCoord - 0.5); if (d > 0.5) discard;
      gl_FragColor = vec4(0.93, 0.8, 0.55, vA * smoothstep(0.5, 0.0, d)); }`,
  }));
  scene.add(dust);

  // A soft gold halo behind the metal (cheaper and cleaner than bloom, and it leaves the work cards untouched).
  const hc = document.createElement('canvas'); hc.width = hc.height = 256;
  const hx = hc.getContext('2d'); const hg = hx.createRadialGradient(128, 128, 0, 128, 128, 128);
  hg.addColorStop(0, 'rgba(236,200,130,0.55)'); hg.addColorStop(0.35, 'rgba(207,160,90,0.18)'); hg.addColorStop(1, 'rgba(207,160,90,0)');
  hx.fillStyle = hg; hx.fillRect(0, 0, 256, 256);
  const halo = new THREE.Sprite(new THREE.SpriteMaterial({ map: new THREE.CanvasTexture(hc), transparent: true, depthWrite: false, blending: THREE.AdditiveBlending, toneMapped: false }));
  halo.scale.setScalar(phone ? 5 : 6.5); halo.position.z = -1.5;
  rig.add(halo);

  const home = phone ? new THREE.Vector3(0.15, 1.9, 0) : new THREE.Vector3(2.2, 0.2, 0);
  const size = () => {
    const w = canvas.clientWidth, h = canvas.clientHeight;
    gl.setSize(w, h, false);
    cam.aspect = w / h; cam.updateProjectionMatrix();
  };
  size(); addEventListener('resize', size);

  // Input: pointer pulls the metal toward it; a click or tap splashes it.
  let mx = 0, my = 0, inHero = false, prog = 0, visible = true, raf = 0, last = performance.now();
  const ray = new THREE.Raycaster(), ndc = new THREE.Vector2();
  addEventListener('pointermove', (e) => {
    const r = canvas.getBoundingClientRect();
    mx = ((e.clientX - r.left) / r.width) * 2 - 1; my = -(((e.clientY - r.top) / r.height) * 2 - 1);
    inHero = e.clientY < r.bottom && e.clientY > r.top;
  }, { passive: true });
  canvas.parentElement.addEventListener('pointerdown', (e) => {
    const r = canvas.getBoundingClientRect();
    ndc.set(((e.clientX - r.left) / r.width) * 2 - 1, -(((e.clientY - r.top) / r.height) * 2 - 1));
    ray.setFromCamera(ndc, cam);
    const hit = ray.intersectObject(blob)[0];
    const dir = hit ? blob.worldToLocal(hit.point.clone()).normalize() : new THREE.Vector3(ndc.x, ndc.y, 1).normalize();
    U.uSplashDir.value.copy(dir); U.uSplashT.value = 0; U.uSplash.value = 1;
  });
  const mouseDir = new THREE.Vector3();

  const loop = (now) => {
    const dt = Math.min(0.05, (now - last) / 1000); last = now;
    U.uTime.value += dt;
    U.uSplashT.value += dt;
    // Pointer: project to a direction on the sphere in its local space.
    mouseDir.set(mx * 1.6, my * 1.2, 1.4).normalize();
    U.uMouse.value.lerp(blob.worldToLocal(mouseDir.clone().add(blob.getWorldPosition(new THREE.Vector3()))).normalize(), 0.08);
    U.uPull.value += ((inHero ? 1 : 0) - U.uPull.value) * 0.05;
    U.uAmp.value = 0.16 + prog * 0.42;
    // Rig: home position, drifts up and grows as you scroll away; slow turn plus pointer parallax.
    rig.position.lerp(new THREE.Vector3(home.x - prog * (phone ? 0 : 1.2), home.y + prog * 1.4, -prog * 1.5), 0.08);
    blob.rotation.y += dt * 0.12; blob.rotation.x = Math.sin(U.uTime.value * 0.2) * 0.25;
    ring.rotation.y = U.uTime.value * 0.16 + prog * 2.2;
    const rad = (phone ? 1.25 : 2.05) + prog * 1.6;
    cards.forEach((c) => {
      const a = c.userData.a;
      c.position.set(Math.cos(a) * rad, Math.sin(a * 2.0 + U.uTime.value * 0.4) * 0.18, Math.sin(a) * rad);
      c.lookAt(cam.position.x, c.getWorldPosition(new THREE.Vector3()).y, cam.position.z);
    });
    cam.position.x += (mx * 0.35 - cam.position.x) * 0.04;
    cam.position.y += (my * 0.25 - cam.position.y) * 0.04;
    cam.lookAt(0, 0, 0);
    dust.rotation.y = U.uTime.value * 0.02 + mx * 0.08;
    gl.render(scene, cam);
    raf = visible ? requestAnimationFrame(loop) : 0;
  };
  raf = requestAnimationFrame(loop);
  // Runs only while on screen and while the showreel dialog is closed (ui.js sends the 'reel' event).
  let onScreen = true, held = false;
  const wake = () => { visible = onScreen && !held; if (visible && !raf) { last = performance.now(); raf = requestAnimationFrame(loop); } };
  new IntersectionObserver(([e]) => { onScreen = e.isIntersecting; wake(); }).observe(canvas);
  addEventListener('reel', (e) => { held = e.detail; wake(); });
  return { setProgress: (p) => (prog = p) };
}
