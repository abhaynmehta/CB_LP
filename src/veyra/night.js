// Act 1: a night city generated in code. The section is tall and its stage sticks, so ordinary
// scrolling (wheel, touch, keys, scrollbar) moves the camera along one path through five chapters.
import * as THREE from 'three';
import { S, $, clamp } from './state.js';

export function initNight() {
  const section = $('journey'), stage = section.querySelector('.j-stage'), canvas = $('night');
  const chapters = [...section.querySelectorAll('.chapter')];
  const stops = chapters.map((c) => +c.dataset.at);
  const NAMES = ['Night', 'Land', 'Street', 'Tower', 'Morning'];
  // Chapter stops sit on these points of the camera path (7 keypoints → params 0..1).
  const PATH_AT = [0, 2 / 6, 3.5 / 6, 5 / 6, 1];
  const toPath = (p) => { for (let i = 1; i < stops.length; i++) if (p <= stops[i]) { const k = (p - stops[i - 1]) / (stops[i] - stops[i - 1]); return PATH_AT[i - 1] + (PATH_AT[i] - PATH_AT[i - 1]) * k; } return 1; };
  const progress = () => { const r = section.getBoundingClientRect(); return clamp(-r.top / Math.max(1, section.offsetHeight - innerHeight)); };
  const scrollFor = (p) => section.getBoundingClientRect().top + scrollY + p * (section.offsetHeight - innerHeight);

  /* chapter nav */
  const nav = $('chapNav');
  nav.innerHTML = stops.map((s, i) => `<button type="button" data-p="${s}" aria-label="Go to ${NAMES[i]}"><i></i><span>${String(i).padStart(2, '0')} ${NAMES[i]}</span></button>`).join('');
  const navBtns = [...nav.children];
  nav.addEventListener('click', (e) => { const b = e.target.closest('[data-p]'); if (b) scrollTo({ top: scrollFor(+b.dataset.p) + 2, behavior: S.reduce ? 'auto' : 'smooth' }); });

  /* generated ambient sound */
  let actx = null, master = null, soundOn = false;
  function buildSound() {
    actx = new (window.AudioContext || window.webkitAudioContext)(); master = actx.createGain(); master.gain.value = 0; master.connect(actx.destination);
    const lp = actx.createBiquadFilter(); lp.type = 'lowpass'; lp.frequency.value = 480; lp.Q.value = 0.7; lp.connect(master);
    [[55, 'sawtooth', 0.07, -5], [82.41, 'sawtooth', 0.06, 5], [164.8, 'sine', 0.04, 0]].forEach(([f, t, g, dt]) => { const o = actx.createOscillator(); o.type = t; o.frequency.value = f; o.detune.value = dt; const gn = actx.createGain(); gn.gain.value = g; o.connect(gn); gn.connect(lp); o.start(); });
    const buf = actx.createBuffer(1, actx.sampleRate * 2, actx.sampleRate), ch = buf.getChannelData(0); for (let i = 0; i < ch.length; i++) ch[i] = Math.random() * 2 - 1;
    const n = actx.createBufferSource(); n.buffer = buf; n.loop = true; const bp = actx.createBiquadFilter(); bp.type = 'bandpass'; bp.frequency.value = 650; bp.Q.value = 0.5; const ng = actx.createGain(); ng.gain.value = 0.035; n.connect(bp); bp.connect(ng); ng.connect(master); n.start();
    const lfo = actx.createOscillator(); lfo.frequency.value = 0.06; const lg = actx.createGain(); lg.gain.value = 160; lfo.connect(lg); lg.connect(lp.frequency); lfo.start();
  }
  const soundBtn = $('soundBtn');
  soundBtn.addEventListener('click', () => {
    try { if (!actx) buildSound(); if (actx.state === 'suspended') actx.resume(); } catch { return; }
    soundOn = !soundOn; master.gain.setTargetAtTime(soundOn ? 0.55 : 0, actx.currentTime, 0.35);
    soundBtn.classList.toggle('sound-on', soundOn); soundBtn.setAttribute('aria-pressed', String(soundOn)); $('soundLbl').textContent = soundOn ? 'Sound on' : 'Sound off';
  });
  // Fade the drone out once the journey is behind us.
  const fadeSound = (inView) => { if (actx && soundOn) master.gain.setTargetAtTime(inView ? 0.55 : 0, actx.currentTime, 0.5); };

  /* overlay UI */
  const hint = $('hint'), altEl = $('alt'), tag = $('tag3d');
  function updateUI(p, camY) {
    chapters.forEach((c, i) => {
      const d = (p - stops[i]) / 0.1, o = i === stops.length - 1 ? clamp(1 - Math.max(0, -d)) : clamp(1 - Math.abs(d));
      c.style.opacity = o.toFixed(3); c.style.transform = `translateY(${(Math.min(d, i === stops.length - 1 ? 0 : d) * -28).toFixed(1)}px)`;
      c.style.visibility = o < 0.01 ? 'hidden' : 'visible';
      c.querySelectorAll('a,button').forEach((b) => (b.tabIndex = o > 0.5 ? 0 : -1));
    });
    let k = 0; stops.forEach((s, i) => { if (p >= s - 0.05) k = i; });
    navBtns.forEach((b, i) => { b.classList.toggle('on', i === k); const a = stops[i], z = stops[i + 1] ?? 1.0001; b.querySelector('i').style.setProperty('--fill', i < k ? 1 : i === k ? clamp((p - a) / Math.max(0.0001, z - a)).toFixed(3) : 0); });
    hint.style.opacity = clamp(1 - p * 14).toFixed(2);
    altEl.textContent = Math.round(camY * 6.5);
  }

  /* WebGL */
  let renderer = null;
  try { renderer = new THREE.WebGLRenderer({ canvas, antialias: true, powerPreference: 'high-performance' }); } catch { renderer = null; }
  if (!renderer) {
    section.classList.add('no-gl'); canvas.remove();
    const ui = () => { updateUI(progress(), 40); requestAnimationFrame(ui); }; ui(); return;
  }
  renderer.outputColorSpace = THREE.LinearSRGBColorSpace;
  renderer.setPixelRatio(Math.min(devicePixelRatio, 1.75));
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(52, 1, 0.1, 1600);
  const C = (h) => new THREE.Color(h);
  const COL = { zenith: C('#03050B'), mid: C('#0A1122'), horizon: C('#2E2333'), glow: C('#FF9A4A'), facade: C('#0D121C'), facadeTop: C('#18203A'), warm: C('#FFC06A'), cool: C('#A9C4FF'), lot: C('#07090E'), road: C('#11141C'), accent: C('#FFB45E') };
  COL.fog = COL.horizon.clone().add(COL.glow.clone().multiplyScalar(0.12));
  const ORIGIN = -86.8, PITCH = 12.4, LOT = 2.6, BLOCKS = 14, FOG_N = 40, FOG_F = 230;
  const hash = (a, b) => { const s = Math.sin(a * 127.1 + b * 311.7) * 43758.5453; return s - Math.floor(s); };

  // sky
  const sky = new THREE.Mesh(new THREE.SphereGeometry(500, 32, 16), new THREE.ShaderMaterial({
    side: THREE.BackSide, depthWrite: false,
    uniforms: { uZ: { value: COL.zenith }, uM: { value: COL.mid }, uH: { value: COL.horizon }, uG: { value: COL.glow }, uF: { value: COL.fog } },
    vertexShader: `varying vec3 vP; void main(){ vP=normalize(position); gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0); }`,
    // At and below the horizon the sky is exactly the fog colour, so the far edge of the ground disappears.
    fragmentShader: `uniform vec3 uZ,uM,uH,uG,uF; varying vec3 vP; void main(){ float h=vP.y; vec3 c=mix(uH,uM,smoothstep(0.0,0.18,h)); c=mix(c,uZ,smoothstep(0.18,0.7,h)); c+=uG*exp(-max(h,0.0)*16.0)*0.12; c=mix(uF,c,smoothstep(0.0,0.05,h)); gl_FragColor=vec4(c,1.0); }`,
  }));
  sky.renderOrder = -1; scene.add(sky);
  {
    const n = 700, pos = new Float32Array(n * 3);
    for (let i = 0; i < n; i++) { const u = Math.random() * Math.PI * 2, v = 0.12 + Math.random() * 0.85, r = 480; pos[i * 3] = Math.cos(u) * Math.sqrt(1 - v * v) * r; pos[i * 3 + 1] = v * r; pos[i * 3 + 2] = Math.sin(u) * Math.sqrt(1 - v * v) * r; }
    const g = new THREE.BufferGeometry(); g.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    sky.add(new THREE.Points(g, new THREE.PointsMaterial({ color: 0xc9d4ff, size: 1.3, sizeAttenuation: false, transparent: true, opacity: 0.7, depthWrite: false })));
  }

  // buildings: one instanced box per lot; windows are drawn by the shader
  const TA = { x: 1.3, z: -8.5, h: 30 }, TB = { x: 6.5, z: -3.3, h: 34 }, PLAZA = { x: 3.9, z: -5.9, r: 6.4 };
  const B = [];
  for (let bx = 0; bx < BLOCKS; bx++) for (let bz = 0; bz < BLOCKS; bz++) for (let lx = 0; lx < 4; lx++) for (let lz = 0; lz < 4; lz++) {
    const x = ORIGIN + bx * PITCH + 1.3 + lx * LOT, z = ORIGIN + bz * PITCH + 1.3 + lz * LOT;
    const r1 = hash(x, z), r2 = hash(z, x), r3 = hash(x + 3.1, z - 7.7), r4 = hash(x * 1.7, z * 0.3);
    if (Math.hypot(x - PLAZA.x, z - PLAZA.z) < PLAZA.r || r1 < 0.07) continue;
    const core = Math.exp(-(x * x + z * z) / (2 * 32 * 32));
    const h = 1.0 + r2 * 2.4 + core * 21 * Math.pow(r3, 1.35) + (r4 > 0.988 ? 10 : 0);
    B.push({ x, z, w: 1.45 + hash(x + 1, z) * 0.75, d: 1.45 + hash(x, z + 1) * 0.75, h, r: hash(x - 5, z + 9) });
  }
  B.push({ x: TA.x, z: TA.z, w: 2.2, d: 2.2, h: TA.h, r: 0.985 }, { x: TB.x, z: TB.z, w: 2.2, d: 2.2, h: TB.h, r: 0.995 });
  const bGeo = new THREE.BoxGeometry(1, 1, 1); bGeo.translate(0, 0.5, 0);
  const aSize = new Float32Array(B.length * 3), aRand = new Float32Array(B.length);
  B.forEach((b, i) => { aSize.set([b.w, b.h, b.d], i * 3); aRand[i] = b.r; });
  bGeo.setAttribute('aSize', new THREE.InstancedBufferAttribute(aSize, 3)); bGeo.setAttribute('aRand', new THREE.InstancedBufferAttribute(aRand, 1));
  const fogU = { uFog: { value: COL.fog }, uNear: { value: FOG_N }, uFar: { value: FOG_F } };
  const timeU = { value: 0 };
  const bMat = new THREE.ShaderMaterial({
    uniforms: Object.assign({ uFacade: { value: COL.facade }, uTop: { value: COL.facadeTop }, uWarm: { value: COL.warm }, uCool: { value: COL.cool }, uTime: timeU }, fogU),
    vertexShader: `attribute vec3 aSize; attribute float aRand; varying vec3 vL; varying vec3 vN; varying float vR; varying float vD; varying float vH;
      void main(){ vL=position*aSize; vN=normal; vR=aRand; vH=aSize.y; vec4 mv=modelViewMatrix*instanceMatrix*vec4(position,1.0); vD=-mv.z; gl_Position=projectionMatrix*mv; }`,
    fragmentShader: `uniform vec3 uFacade,uTop,uWarm,uCool,uFog; uniform float uNear,uFar,uTime; varying vec3 vL; varying vec3 vN; varying float vR; varying float vD; varying float vH;
      float h21(vec2 p){ vec3 p3=fract(vec3(p.xyx)*0.1031); p3+=dot(p3,p3.yzx+33.33); return fract((p3.x+p3.y)*p3.z); }
      void main(){
        float rq=floor(vR*512.0+0.5)/512.0;
        float grad=clamp(vL.y/max(vH,1.0),0.0,1.0);
        vec3 facade=mix(uFacade,uTop,grad*0.8);
        vec3 col;
        if(vN.y>0.5){ col=uTop*0.9; }
        else{
          float side=abs(vN.x)>0.5?1.0:0.0;
          float u=mix(vL.x,vL.z,side); float face=side*3.0+sign(vN.x+vN.z)*7.0;
          vec2 g=vec2(u/0.5,vL.y/0.58); vec2 cell=floor(g); vec2 f=fract(g);
          float win=step(0.2,f.x)*step(f.x,0.8)*step(0.24,f.y)*step(f.y,0.76);
          float r=h21(cell+vec2(face*13.0,rq*97.0));
          float dens=mix(0.14,0.62,rq);
          float lit=step(1.0-dens,r);
          float flick=step(0.992,h21(cell+vec2(floor(uTime*0.2+r*11.0),face)));
          lit=abs(lit-flick);
          vec3 wc=mix(uWarm,uCool,step(0.82,h21(cell*1.7+rq*31.0)));
          col=facade+win*(lit*wc*(0.62+0.38*r)+(1.0-lit)*facade*0.35);
          vec2 fw=fwidth(g); float aa=clamp(max(fw.x,fw.y)*2.2-0.6,0.0,1.0);
          vec3 avg=facade+0.31*(dens*0.8*mix(uWarm,uCool,0.18)+(1.0-dens)*facade*0.35);
          col=mix(col,avg,aa);
          col+=uWarm*0.22*step(vL.y,0.55)*step(0.3,h21(vec2(face*5.0,rq*53.0)));
          col+=uWarm*0.06*exp(-vL.y*0.9);
        }
        gl_FragColor=vec4(mix(col,uFog,smoothstep(uNear,uFar,vD)),1.0);
      }`,
  });
  const city = new THREE.InstancedMesh(bGeo, bMat, B.length);
  const m4 = new THREE.Matrix4(), q = new THREE.Quaternion(), v3 = new THREE.Vector3(), s3 = new THREE.Vector3();
  B.forEach((b, i) => { v3.set(b.x, 0, b.z); s3.set(b.w, b.h, b.d); m4.compose(v3, q, s3); city.setMatrixAt(i, m4); });
  city.frustumCulled = false; scene.add(city);

  // ground: roads, lane dashes and streetlight pools
  const ground = new THREE.Mesh(new THREE.PlaneGeometry(3000, 3000), new THREE.ShaderMaterial({
    uniforms: Object.assign({ uLot: { value: COL.lot }, uRoad: { value: COL.road }, uWarm: { value: COL.warm } }, fogU),
    vertexShader: `varying vec3 vW; varying float vD; void main(){ vec4 w=modelMatrix*vec4(position,1.0); vW=w.xyz; vec4 mv=viewMatrix*w; vD=-mv.z; gl_Position=projectionMatrix*mv; }`,
    fragmentShader: `uniform vec3 uLot,uRoad,uWarm,uFog; uniform float uNear,uFar; varying vec3 vW; varying float vD;
      void main(){
        float px=mod(vW.x+86.8,12.4), pz=mod(vW.z+86.8,12.4);
        float rx=step(10.4,px), rz=step(10.4,pz); float inCity=step(abs(vW.x),87.0)*step(abs(vW.z),87.0); float road=max(rx,rz)*inCity;
        vec3 col=mix(uLot,uRoad,road);
        float cx=abs(px-11.4), cz=abs(pz-11.4);
        float dz=rx*(1.0-rz)*step(cx,0.035)*step(0.5,fract(vW.z*0.45));
        float dx=rz*(1.0-rx)*step(cz,0.035)*step(0.5,fract(vW.x*0.45));
        col+=(dz+dx)*inCity*vec3(0.55,0.5,0.4)*0.3;
        float ex=(cx-0.82)*3.2, ez=(cz-0.82)*3.2;
        float pool=rx*exp(-ex*ex)*pow(0.5+0.5*cos(vW.z*2.0944),8.0)+rz*exp(-ez*ez)*pow(0.5+0.5*cos(vW.x*2.0944),8.0);
        col+=uWarm*pool*inCity*0.26;
        col+=uWarm*exp(-dot(vW.xz,vW.xz)/4050.0)*0.03;
        gl_FragColor=vec4(mix(col,uFog,smoothstep(uNear,uFar,vD)),1.0);
      }`,
  }));
  ground.rotation.x = -Math.PI / 2; scene.add(ground);

  // traffic: head and tail lights moved along the roads by the vertex shader
  {
    const n = 900, pos = new Float32Array(n * 3), car = new Float32Array(n * 4), col = new Float32Array(n * 3);
    const head = C('#FFF1D2'), tail = C('#FF4632');
    for (let i = 0; i < n; i++) {
      const road = Math.floor(Math.random() * BLOCKS), axis = Math.random() < 0.5 ? 0 : 1, lane = Math.random() < 0.5 ? 1 : -1;
      car.set([axis, ORIGIN + road * PITCH + 11.4 + lane * 0.42, (2.6 + Math.random() * 4.5) * lane, Math.random() * 174], i * 4);
      const c = lane > 0 ? head : tail; col.set([c.r, c.g, c.b], i * 3);
    }
    const g = new THREE.BufferGeometry(); g.setAttribute('position', new THREE.BufferAttribute(pos, 3)); g.setAttribute('aCar', new THREE.BufferAttribute(car, 4)); g.setAttribute('aColor', new THREE.BufferAttribute(col, 3));
    const pts = new THREE.Points(g, new THREE.ShaderMaterial({
      transparent: true, depthWrite: false, blending: THREE.AdditiveBlending,
      uniforms: Object.assign({ uTime: timeU, uPR: { value: renderer.getPixelRatio() } }, fogU),
      vertexShader: `attribute vec4 aCar; attribute vec3 aColor; uniform float uTime,uPR; varying vec3 vC; varying float vD;
        void main(){ float a=mod(aCar.w+uTime*aCar.z,174.0)-87.0; vec3 p=aCar.x<0.5?vec3(a,0.22,aCar.y):vec3(aCar.y,0.22,a);
          vec4 mv=modelViewMatrix*vec4(p,1.0); vD=-mv.z; vC=aColor; gl_PointSize=clamp(uPR*70.0/vD,1.0,16.0); gl_Position=projectionMatrix*mv; }`,
      fragmentShader: `uniform vec3 uFog; uniform float uNear,uFar; varying vec3 vC; varying float vD;
        void main(){ float d=length(gl_PointCoord-0.5); float a=smoothstep(0.5,0.0,d); a*=1.0-smoothstep(uNear,uFar*1.1,vD); gl_FragColor=vec4(vC*a,a); }`,
    }));
    pts.frustumCulled = false; scene.add(pts);
  }
  // aviation lights on tall buildings
  {
    const tall = B.filter((b) => b.h > 17), pos = new Float32Array(tall.length * 3), ph = new Float32Array(tall.length);
    tall.forEach((b, i) => { pos.set([b.x, b.h + 0.25, b.z], i * 3); ph[i] = Math.random() * 6.28; });
    const g = new THREE.BufferGeometry(); g.setAttribute('position', new THREE.BufferAttribute(pos, 3)); g.setAttribute('aPh', new THREE.BufferAttribute(ph, 1));
    scene.add(new THREE.Points(g, new THREE.ShaderMaterial({
      transparent: true, depthWrite: false, blending: THREE.AdditiveBlending, uniforms: { uTime: timeU, uPR: { value: renderer.getPixelRatio() } },
      vertexShader: `attribute float aPh; uniform float uTime,uPR; varying float vB; void main(){ vec4 mv=modelViewMatrix*vec4(position,1.0); vB=step(0.55,fract(uTime*0.5+aPh)); gl_PointSize=clamp(uPR*120.0/-mv.z,2.0,14.0); gl_Position=projectionMatrix*mv; }`,
      fragmentShader: `varying float vB; void main(){ float d=length(gl_PointCoord-0.5); float a=smoothstep(0.5,0.0,d)*vB; gl_FragColor=vec4(vec3(1.0,0.18,0.12)*a,a); }`,
    })));
  }
  // Veyra Skyline: outlines and a light beam on Tower B
  const edgeMat = new THREE.LineBasicMaterial({ color: COL.accent, transparent: true, opacity: 0.3 });
  [TA, TB].forEach((t) => { const e = new THREE.LineSegments(new THREE.EdgesGeometry(new THREE.BoxGeometry(2.22, t.h, 2.22)), edgeMat); e.position.set(t.x, t.h / 2, t.z); scene.add(e); });
  const beamMat = new THREE.ShaderMaterial({
    transparent: true, depthWrite: false, blending: THREE.AdditiveBlending, side: THREE.DoubleSide, uniforms: { uI: { value: 0 }, uC: { value: COL.accent } },
    vertexShader: `varying vec2 vUv; void main(){ vUv=uv; gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0); }`,
    fragmentShader: `uniform float uI; uniform vec3 uC; varying vec2 vUv; void main(){ float a=pow(1.0-vUv.y,2.2)*uI*0.32; gl_FragColor=vec4(uC*a,a); }`,
  });
  const beam = new THREE.Mesh(new THREE.CylinderGeometry(1.8, 0.35, 90, 24, 1, true), beamMat); beam.position.set(TB.x, TB.h + 45, TB.z); scene.add(beam);

  // The camera stays above the road at x = -1 after the opening shot, so it never clips a building.
  const V = (x, y, z) => new THREE.Vector3(x, y, z);
  const camPath = new THREE.CatmullRomCurve3([V(84, 72, 124), V(-1, 42, 96), V(-1, 15, 54), V(-1, 2.5, 32), V(-1, 2.9, 7), V(-1, 27, 19), V(-1, 52, 74)]);
  const lookPath = new THREE.CatmullRomCurve3([V(0, 6, 0), V(-1, 6, 0), V(-1, 4, -2), V(-1, 3.6, -14), V(-1, 5.5, -32), V(3.9, 21, -5.9), V(3.9, 14, -5.9)]);
  const camP = new THREE.Vector3(), lookP = new THREE.Vector3(), tagP = new THREE.Vector3(TB.x, TB.h + 0.6, TB.z);
  let mx = 0, my = 0, smx = 0, smy = 0;
  stage.addEventListener('pointermove', (e) => { mx = (e.clientX / innerWidth) * 2 - 1; my = (e.clientY / innerHeight) * 2 - 1; });

  let W = 1, H = 1;
  function resize() { W = stage.clientWidth; H = stage.clientHeight; renderer.setSize(W, H, false); camera.aspect = W / H; camera.fov = W < 700 ? 62 : 52; camera.updateProjectionMatrix(); }
  new ResizeObserver(resize).observe(stage); resize();

  let running = false, cur = progress(), last = performance.now(), t = 0;
  function frame(now) {
    if (!running) return;
    const dt = Math.min(0.05, (now - last) / 1000); last = now; t += dt;
    const p = progress();
    cur += (p - cur) * (S.reduce ? 1 : 1 - Math.exp(-dt * 5));
    smx += (mx - smx) * 0.05; smy += (my - smy) * 0.05;
    const u = toPath(cur);
    camPath.getPoint(u, camP); lookPath.getPoint(u, lookP);
    const low = clamp(1 - (camP.y - 3) / 30);
    camP.x += smx * (0.55 * low + 2.2 * (1 - low)); camP.y += -smy * (0.35 * low + 1.6 * (1 - low));
    if (!S.reduce) camP.y += Math.sin(t * 0.6) * 0.06;
    camera.position.copy(camP); camera.lookAt(lookP); sky.position.copy(camP);
    timeU.value = S.reduce ? 0 : t;
    const tower = clamp(1 - Math.abs(cur - stops[3]) / 0.14);
    edgeMat.opacity = 0.22 + 0.78 * tower; beamMat.uniforms.uI.value = 0.25 + 0.75 * tower;
    renderer.render(scene, camera);
    v3.copy(tagP).project(camera);
    const vis = tower > 0.15 && v3.z < 1;
    tag.style.opacity = vis ? clamp((tower - 0.15) * 2).toFixed(2) : '0';
    if (vis) { const x = (v3.x * 0.5 + 0.5) * W + 18, y = (-v3.y * 0.5 + 0.5) * H - 10; tag.style.transform = `translate(${Math.min(x, W - 210).toFixed(0)}px,${Math.max(120, y).toFixed(0)}px)`; }
    updateUI(cur, camP.y);
    requestAnimationFrame(frame);
  }
  const start = () => { if (!running) { running = true; last = performance.now(); requestAnimationFrame(frame); } };
  new IntersectionObserver(([e]) => { if (e.isIntersecting && !document.hidden) start(); else running = false; fadeSound(e.isIntersecting); }).observe(section);
  document.addEventListener('visibilitychange', () => { if (document.hidden) running = false; else if (section.getBoundingClientRect().bottom > 0) start(); });
}
