// 1. The funnel. A ring of feed cards turns around the mouth of a funnel; attention (particles)
// leaves the cards, spirals down and thins out at every stage, and what survives lands as coins.
// The section is tall and its stage sticks, so ordinary scrolling flies the camera from the feed to
// the sale. Keys 1–4 jump to a stage. The thinning shows the idea of a funnel, not client data.
import * as THREE from 'three';

const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));
const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;

export function initFunnel() {
  const section = document.getElementById('funnel'), stage = section.querySelector('.j-stage'), canvas = document.getElementById('funnelgl');
  const chapters = [...section.querySelectorAll('.chapter')], stops = chapters.map((c) => +c.dataset.at);
  const NAMES = ['Top', 'Scroll', 'Click', 'Lead', 'Sale'];
  const progress = () => { const r = section.getBoundingClientRect(); return clamp(-r.top / Math.max(1, section.offsetHeight - innerHeight)); };
  const scrollFor = (p) => section.getBoundingClientRect().top + scrollY + p * (section.offsetHeight - innerHeight) + 2;
  const go = (p) => scrollTo({ top: scrollFor(p), behavior: reduce ? 'auto' : 'smooth' });

  const nav = document.getElementById('stNav'), navBtns = [...nav.children];
  nav.addEventListener('click', (e) => { const b = e.target.closest('[data-p]'); if (b) go(+b.dataset.p); });
  addEventListener('keydown', (e) => {
    if (e.metaKey || e.ctrlKey || e.altKey || e.target.closest?.('input,textarea,select,[contenteditable]')) return;
    if (/^[0-4]$/.test(e.key)) { go(stops[+e.key]); e.preventDefault(); }
  });

  const hint = document.getElementById('hint'), readout = document.getElementById('readout'), tags = [...section.querySelectorAll('[data-ring]')];
  let lastK = -1;
  function updateUI(p) {
    chapters.forEach((c, i) => {
      const last = i === stops.length - 1, d = (p - stops[i]) / 0.1;
      const o = last ? clamp(1 - Math.max(0, -d)) : clamp(1 - Math.abs(d));
      c.style.opacity = o.toFixed(3); c.style.transform = `translateY(${((last ? Math.min(d, 0) : d) * -26).toFixed(1)}px)`;
      c.style.visibility = o < 0.01 ? 'hidden' : 'visible';
      c.querySelectorAll('a,button').forEach((b) => (b.tabIndex = o > 0.5 ? 0 : -1));
    });
    let k = 0; stops.forEach((s, i) => { if (p >= s - 0.06) k = i; });
    navBtns.forEach((b, i) => { b.classList.toggle('on', i === k); const a = stops[i], z = stops[i + 1] ?? 1.0001; b.querySelector('i').style.setProperty('--fill', i < k ? 1 : i === k ? clamp((p - a) / Math.max(0.0001, z - a)).toFixed(3) : 0); });
    hint.style.opacity = clamp(1 - p * 14).toFixed(2);
    if (k !== lastK) { lastK = k; readout.innerHTML = k ? `Stage <b>${k}</b> / 4 · ${NAMES[k]}<br>Press 1 to 4` : 'The whole funnel<br>Press 1 to 4'; }
  }

  let renderer = null;
  try { renderer = new THREE.WebGLRenderer({ canvas, antialias: true, powerPreference: 'high-performance' }); } catch { renderer = null; }
  if (!renderer) { section.classList.add('no-gl'); canvas.remove(); tags.forEach((t) => t.remove()); const ui = () => { updateUI(progress()); requestAnimationFrame(ui); }; ui(); return; }
  renderer.outputColorSpace = THREE.LinearSRGBColorSpace;
  renderer.setPixelRatio(Math.min(devicePixelRatio, 1.75));
  renderer.setClearColor(0x111113, 1);
  const scene = new THREE.Scene(), camera = new THREE.PerspectiveCamera(45, 1, 0.1, 400);
  const C = (h) => new THREE.Color(h);
  const INK = C('#111113'), AMBER = C('#E8B45C'), IVORY = C('#ECEBE6');
  const YT = 10, YB = -14, RINGS = [10, 3, -5, -12];
  const R = (y) => 1.3 + 14.7 * Math.pow(clamp((y - YB) / (YT - YB)), 1.7);
  const narrowScreen = innerWidth < 700;

  // the funnel's outline
  {
    const v = [], M = 30, S = 48;
    for (let m = 0; m < M; m++) { const a = (m / M) * Math.PI * 2; for (let s = 0; s < S; s++) { const y0 = YB + ((YT - YB) * s) / S, y1 = YB + ((YT - YB) * (s + 1)) / S; v.push(Math.cos(a) * R(y0), y0, Math.sin(a) * R(y0), Math.cos(a) * R(y1), y1, Math.sin(a) * R(y1)); } }
    for (let h = 0; h <= 12; h++) { const y = YB + ((YT - YB) * h) / 12, r = R(y); for (let s = 0; s < 96; s++) { const a0 = (s / 96) * Math.PI * 2, a1 = ((s + 1) / 96) * Math.PI * 2; v.push(Math.cos(a0) * r, y, Math.sin(a0) * r, Math.cos(a1) * r, y, Math.sin(a1) * r); } }
    const g = new THREE.BufferGeometry(); g.setAttribute('position', new THREE.Float32BufferAttribute(v, 3));
    scene.add(new THREE.LineSegments(g, new THREE.LineBasicMaterial({ color: IVORY, transparent: true, opacity: 0.07, depthWrite: false })));
  }
  // stage rings
  const ringMats = RINGS.map(() => new THREE.MeshBasicMaterial({ color: AMBER, transparent: true, opacity: 0.4 }));
  RINGS.forEach((y, i) => { const m = new THREE.Mesh(new THREE.TorusGeometry(R(y), i === 0 ? 0.07 : 0.05, 8, 220), ringMats[i]); m.rotation.x = Math.PI / 2; m.position.y = y; scene.add(m); });

  // the feed: cards on rings around the mouth, turning slowly
  const FEED_Y = 11.6, feed = new THREE.Group(); scene.add(feed);
  {
    const cards = [];
    [19, 22.6, 26.2, 29.8, 33.4].forEach((r, ri) => { const n = Math.floor((2 * Math.PI * r) / 3.3); for (let i = 0; i < n; i++) cards.push({ a: (i / n) * Math.PI * 2 + ri * 0.37, r, hi: Math.random() < 0.09 ? 1 : 0, seed: Math.random() }); });
    const geo = new THREE.BoxGeometry(2.3, 0.05, 2.9);
    const aHi = new Float32Array(cards.length), aSeed = new Float32Array(cards.length);
    cards.forEach((c, i) => { aHi[i] = c.hi; aSeed[i] = c.seed; });
    geo.setAttribute('aHi', new THREE.InstancedBufferAttribute(aHi, 1)); geo.setAttribute('aSeed', new THREE.InstancedBufferAttribute(aSeed, 1));
    const mat = new THREE.ShaderMaterial({
      uniforms: { uTime: { value: 0 }, uInk: { value: INK }, uAmber: { value: AMBER } },
      vertexShader: `attribute float aHi; attribute float aSeed; varying vec2 vUv; varying float vTop; varying float vHi; varying float vSeed; varying float vD; varying float vR;
        void main(){ vUv=uv; vTop=step(0.5,normal.y); vHi=aHi; vSeed=aSeed; vec4 w=modelMatrix*instanceMatrix*vec4(position,1.0); vR=length(w.xz); vec4 mv=viewMatrix*w; vD=-mv.z; gl_Position=projectionMatrix*mv; }`,
      fragmentShader: `uniform float uTime; uniform vec3 uInk,uAmber; varying vec2 vUv; varying float vTop; varying float vHi; varying float vSeed; varying float vD; varying float vR;
        void main(){
          vec3 base=vec3(0.106,0.106,0.122); vec3 col=base*0.8;
          if(vTop>0.5){
            col=base;
            float media=step(0.08,vUv.x)*step(vUv.x,0.92)*step(0.34,vUv.y)*step(vUv.y,0.92);
            float l1=step(0.08,vUv.x)*step(vUv.x,0.7)*step(0.2,vUv.y)*step(vUv.y,0.25);
            float l2=step(0.08,vUv.x)*step(vUv.x,0.48)*step(0.1,vUv.y)*step(vUv.y,0.14);
            vec3 m=mix(vec3(0.17,0.17,0.19), uAmber*(0.55+0.25*sin(uTime*2.0+vSeed*20.0)), vHi);
            m+=vec3(0.03)*sin(vUv.y*18.0+vSeed*30.0);
            col=mix(col,m,media); col=mix(col,vec3(0.35),l1*0.6); col=mix(col,vec3(0.28),l2*0.6);
          }
          float fade=1.0-smoothstep(28.0,35.0,vR);
          col=mix(uInk,col,fade*(1.0-smoothstep(60.0,110.0,vD)));
          gl_FragColor=vec4(col,1.0);
        }`,
    });
    const mesh = new THREE.InstancedMesh(geo, mat, cards.length), m4 = new THREE.Matrix4(), q = new THREE.Quaternion(), up = new THREE.Vector3(0, 1, 0);
    cards.forEach((c, i) => { q.setFromAxisAngle(up, -c.a + Math.PI / 2); m4.compose(new THREE.Vector3(Math.cos(c.a) * c.r, FEED_Y, Math.sin(c.a) * c.r), q, new THREE.Vector3(1, 1, 1)); mesh.setMatrixAt(i, m4); });
    feed.add(mesh); feed.userData.mat = mat;
  }

  // attention: particles from the feed into the funnel, thinning at each ring
  const N = narrowScreen ? 7000 : 14000;
  const timeU = { value: 0 }, rotU = { value: 0 };
  {
    const pos = new Float32Array(N * 3), seed = new Float32Array(N * 4), lvl = new Float32Array(N), fd = new Float32Array(N * 2);
    for (let i = 0; i < N; i++) {
      seed.set([Math.random(), Math.random(), Math.random(), 0.035 + Math.random() * 0.05], i * 4);
      const u = Math.random(); lvl[i] = u < 0.6 ? 1 : u < 0.85 ? 2 : u < 0.95 ? 3 : 4; // share that survives each stage (illustration)
      const a = Math.random() * Math.PI * 2, r = 19 + Math.random() * 14; fd.set([a, r], i * 2);
    }
    const g = new THREE.BufferGeometry(); g.setAttribute('position', new THREE.BufferAttribute(pos, 3)); g.setAttribute('aSeed', new THREE.BufferAttribute(seed, 4)); g.setAttribute('aLvl', new THREE.BufferAttribute(lvl, 1)); g.setAttribute('aFeed', new THREE.BufferAttribute(fd, 2));
    const pts = new THREE.Points(g, new THREE.ShaderMaterial({
      transparent: true, depthWrite: false, blending: THREE.AdditiveBlending,
      uniforms: { uTime: timeU, uRot: rotU, uPR: { value: renderer.getPixelRatio() }, uAmber: { value: AMBER }, uIvory: { value: IVORY } },
      vertexShader: `uniform float uTime,uRot,uPR; attribute vec4 aSeed; attribute float aLvl; attribute vec2 aFeed; varying float vA; varying float vDepth; varying float vHot;
        float R(float y){ float k=clamp((y+14.0)/24.0,0.0,1.0); return 1.3+14.7*pow(k,1.7); }
        void main(){
          float s=fract(aSeed.z+uTime*aSeed.w);
          float fa=aFeed.x+uRot; vec3 p; float alive=1.0; vHot=0.0;
          float ang=fa+aSeed.y*0.6;
          if(s<0.3){ p=vec3(cos(fa)*aFeed.y, 11.75, sin(fa)*aFeed.y); alive=0.35+0.4*smoothstep(0.2,0.3,s); }
          else if(s<0.44){
            float k=(s-0.3)/0.14; k=k*k*(3.0-2.0*k);
            vec3 a=vec3(cos(fa)*aFeed.y, 11.75, sin(fa)*aFeed.y);
            float rm=R(10.0)*(0.86+0.12*aSeed.x);
            vec3 b=vec3(cos(ang)*rm, 10.0, sin(ang)*rm);
            p=mix(a,b,k); p.y+=sin(k*3.14159)*2.2; vHot=0.4;
          } else {
            float k=(s-0.44)/0.56;
            float y=10.0-23.6*k, th=ang+k*7.5;
            float r=R(y)*(0.8+0.18*aSeed.x)*(1.0-smoothstep(0.92,1.0,k));
            p=vec3(cos(th)*r,y,sin(th)*r);
            float dieY = aLvl<1.5 ? 3.0 : (aLvl<2.5 ? -5.0 : (aLvl<3.5 ? -12.0 : -99.0));
            alive=smoothstep(dieY-1.4, dieY+0.2, y);
            vHot=0.4+0.6*clamp((10.0-y)/22.0,0.0,1.0);
          }
          vA=alive; vec4 mv=modelViewMatrix*vec4(p,1.0); vDepth=-mv.z;
          float sz=(aLvl>3.5 && vHot>0.8) ? 2.0 : 1.0;
          gl_PointSize=clamp(uPR*sz*64.0/vDepth,1.2,11.0);
          gl_Position=projectionMatrix*mv;
        }`,
      fragmentShader: `uniform vec3 uAmber,uIvory; varying float vA; varying float vDepth; varying float vHot;
        void main(){ float d=length(gl_PointCoord-0.5); float a=smoothstep(0.5,0.05,d)*vA; a*=1.0-smoothstep(70.0,130.0,vDepth);
          vec3 c=mix(uIvory*0.75,uAmber,vHot); gl_FragColor=vec4(c*a*1.15,a); }`,
    }));
    pts.frustumCulled = false; scene.add(pts);
  }

  // the sale: coins stacking under the funnel
  scene.add(new THREE.HemisphereLight(0xfff1d6, 0x111113, 0.7 * Math.PI));
  const lamp = new THREE.PointLight(0xffd28a, 140, 34, 2); lamp.position.set(5, -10, 8); scene.add(lamp);
  const key = new THREE.DirectionalLight(0xfff3dc, 1.4 * Math.PI); key.position.set(6, 4, 10); scene.add(key);
  const STACKS = [5, 9, 14], COINS = STACKS.reduce((a, b) => a + b, 0), coinGeo = new THREE.CylinderGeometry(1.05, 1.05, 0.16, 56);
  const coins = new THREE.InstancedMesh(coinGeo, new THREE.MeshStandardMaterial({ color: 0xe8b45c, metalness: 0.25, roughness: 0.38, emissive: 0x3a2508 }), COINS);
  const coinAt = []; STACKS.forEach((n, st) => { for (let h = 0; h < n; h++) coinAt.push({ x: [-2.5, 0, 2.5][st] + (Math.random() - 0.5) * 0.08, z: [0.5, -0.2, 0.4][st], y: -15.9 + h * 0.17, rot: Math.random() * 6, order: h * 3 + st }); });
  coinAt.sort((a, b) => a.order - b.order);
  scene.add(coins);
  const glow = new THREE.Mesh(new THREE.CircleGeometry(6, 48), new THREE.ShaderMaterial({ transparent: true, depthWrite: false, blending: THREE.AdditiveBlending, uniforms: { uI: { value: 0 }, uC: { value: AMBER } },
    vertexShader: `varying vec2 vUv; void main(){ vUv=uv; gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0); }`,
    fragmentShader: `uniform float uI; uniform vec3 uC; varying vec2 vUv; void main(){ float d=length(vUv-0.5)*2.0; float a=pow(1.0-clamp(d,0.0,1.0),2.5)*uI*0.5; gl_FragColor=vec4(uC*a,a); }` }));
  glow.rotation.x = -Math.PI / 2; glow.position.y = -16.0; scene.add(glow);
  const cm = new THREE.Matrix4(), cq = new THREE.Quaternion(), cs = new THREE.Vector3(), cp = new THREE.Vector3(), yAxis = new THREE.Vector3(0, 1, 0);
  function placeCoins(f) {
    const shown = f * COINS;
    coinAt.forEach((c, i) => { const k = clamp(shown - i); cq.setFromAxisAngle(yAxis, c.rot); cs.setScalar(k < 0.01 ? 0.0001 : 1); cp.set(c.x, c.y + (1 - k) * 2.5, c.z); cm.compose(cp, cq, cs); coins.setMatrixAt(i, cm); });
    coins.instanceMatrix.needsUpdate = true;
  }

  // camera path: one keypoint per chapter (hero, scroll, click, lead, sale)
  const V = (x, y, z) => new THREE.Vector3(x, y, z);
  const camPath = new THREE.CatmullRomCurve3([V(36, 15, 46), V(12, 18.5, 30), V(0.6, 25, 4), V(1.4, 1, 1.4), V(9, -12.6, 12.5)]);
  const lookPath = new THREE.CatmullRomCurve3([V(-9, 1, 0), V(0, 11.5, 14), V(0, 3, 0), V(0, -12, 0), V(0, -14.6, 0)]);
  if (narrowScreen) { camPath.points[0].set(30, 20, 52); lookPath.points[0].set(-1, -2, 0); }
  const camP = new THREE.Vector3(), lookP = new THREE.Vector3(), right = new THREE.Vector3(), tagV = new THREE.Vector3();
  let mx = 0, my = 0, smx = 0, smy = 0;
  stage.addEventListener('pointermove', (e) => { mx = (e.clientX / innerWidth) * 2 - 1; my = (e.clientY / innerHeight) * 2 - 1; });
  let W = 1, H = 1;
  const resize = () => { W = stage.clientWidth; H = stage.clientHeight; renderer.setSize(W, H, false); camera.aspect = W / H; camera.fov = W < 700 ? 58 : 45; camera.updateProjectionMatrix(); };
  new ResizeObserver(resize).observe(stage); resize();

  let running = false, cur = progress(), last = performance.now(), t = 0;
  function frame(now) {
    if (!running) return;
    const dt = Math.min(0.05, (now - last) / 1000); last = now; t += dt;
    cur += (progress() - cur) * (reduce ? 1 : 1 - Math.exp(-dt * 5));
    smx += (mx - smx) * 0.05; smy += (my - smy) * 0.05;
    const u = clamp(cur);
    camPath.getPoint(u, camP); lookPath.getPoint(u, lookP);
    camP.x += smx * 1.2; camP.y -= smy * 0.8;
    camera.position.copy(camP); camera.lookAt(lookP);
    const tt = reduce ? 4 : t;
    // a negative turn of the feed group moves its cards to angle a + tt·0.03, which the particles follow
    timeU.value = tt; rotU.value = tt * 0.03; feed.rotation.y = -tt * 0.03; feed.userData.mat.uniforms.uTime.value = tt;
    ringMats.forEach((m, i) => { const near = 1 - clamp(Math.abs(cur * 4 - (i + 1)) / 0.9); m.opacity = 0.3 + 0.7 * near; });
    const sale = clamp((cur - 0.8) / 0.2);
    placeCoins(sale); glow.material.uniforms.uI.value = 0.25 + 0.75 * sale;
    renderer.render(scene, camera);
    // stage labels sit on each ring, on the side facing the camera's right
    right.set(1, 0, 0).applyQuaternion(camera.quaternion); right.y = 0; right.normalize();
    tags.forEach((tag, i) => {
      const r = R(RINGS[i]); tagV.set(right.x * r, RINGS[i], right.z * r).project(camera);
      const on = tagV.z < 1 && Math.abs(tagV.x) < 1.05 && Math.abs(tagV.y) < 1.05 && cur < 0.9 && !(W < 700 && cur < 0.14);
      const near = 1 - clamp(Math.abs(cur * 4 - (i + 1)) / 1.2);
      tag.style.opacity = on ? (0.45 + 0.55 * near).toFixed(2) : '0';
      if (on) tag.style.transform = `translate(${Math.min((tagV.x * 0.5 + 0.5) * W + 12, W - 96).toFixed(0)}px,${((-tagV.y * 0.5 + 0.5) * H - 12).toFixed(0)}px)`;
    });
    updateUI(cur);
    requestAnimationFrame(frame);
  }
  const start = () => { if (!running) { running = true; last = performance.now(); requestAnimationFrame(frame); } };
  new IntersectionObserver(([e]) => { if (e.isIntersecting && !document.hidden) start(); else running = false; }).observe(section);
  document.addEventListener('visibilitychange', () => { if (document.hidden) running = false; else if (section.getBoundingClientRect().bottom > 0) start(); });
}
