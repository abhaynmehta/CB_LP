// Hero field: thousands of points start as noise and settle into a rising growth curve
// (signal out of noise). The pointer tilts it; scrolling turns and lifts it away.
// One render loop, paused when the hero is off screen, pixel ratio capped for phones.
import * as THREE from 'three';

export default function field(canvas) {
  let gl;
  try { gl = new THREE.WebGLRenderer({ canvas, antialias: false, alpha: true, powerPreference: 'high-performance' }); } catch { canvas.remove(); return null; }
  const phone = innerWidth < 860;
  gl.setPixelRatio(Math.min(devicePixelRatio, phone ? 1.25 : 1.5));
  const scene = new THREE.Scene();
  const cam = new THREE.PerspectiveCamera(42, 1, 0.1, 50);
  cam.position.set(0, 0.15, phone ? 6.4 : 4.6);

  const N = phone ? 2600 : 6500;
  const from = new Float32Array(N * 3), to = new Float32Array(N * 3), seed = new Float32Array(N);
  for (let i = 0; i < N; i++) {
    // Noise: a loose shell of random points.
    const u = Math.random() * Math.PI * 2, v = Math.acos(2 * Math.random() - 1), r = 1.6 + Math.random() * 1.6;
    from.set([r * Math.sin(v) * Math.cos(u), r * Math.cos(v) * 0.8, r * Math.sin(v) * Math.sin(u)], i * 3);
    // Signal: a ribbon that rises left to right, plus a faint baseline grid.
    const t = Math.random();
    const x = -2 + t * 4;
    const onBase = i % 7 === 0;
    const y = onBase ? -1.05 : -1 + Math.pow(t, 2.2) * 2.1 + (Math.random() - 0.5) * 0.05;
    const z = (Math.random() - 0.5) * (onBase ? 1.6 : 0.45);
    to.set([x, y, z], i * 3);
    seed[i] = Math.random();
  }
  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.BufferAttribute(from, 3));
  geo.setAttribute('aTo', new THREE.BufferAttribute(to, 3));
  geo.setAttribute('aSeed', new THREE.BufferAttribute(seed, 1));

  const mat = new THREE.ShaderMaterial({
    transparent: true, depthWrite: false, blending: THREE.AdditiveBlending,
    uniforms: { uMix: { value: 0 }, uTime: { value: 0 }, uSize: { value: (phone ? 2.2 : 2.6) * gl.getPixelRatio() }, uMouse: { value: new THREE.Vector2(9, 9) }, uPush: { value: 0 }, uAspect: { value: 1 }, uRip: { value: 1 }, uRipAt: { value: new THREE.Vector2(9, 9) } },
    vertexShader: `
      attribute vec3 aTo; attribute float aSeed;
      uniform float uMix, uTime, uSize, uPush, uAspect, uRip;
      uniform vec2 uMouse, uRipAt;
      varying float vSig; varying float vSeed; varying float vHot;
      void main() {
        float k = smoothstep(aSeed * 0.45, aSeed * 0.45 + 0.55, uMix);
        vec3 p = mix(position, aTo, k);
        p += 0.035 * vec3(sin(uTime * 0.7 + aSeed * 40.0), cos(uTime * 0.6 + aSeed * 30.0), sin(uTime * 0.5 + aSeed * 20.0)) * (1.0 - k * 0.7);
        vec4 mv = modelViewMatrix * vec4(p, 1.0);
        gl_Position = projectionMatrix * mv;
        // Scatter away from the pointer, and ride a shock ring out from the last click or tap (screen space).
        vec2 ndc = gl_Position.xy / gl_Position.w;
        vec2 d = ndc - uMouse; d.x *= uAspect;
        float r = length(d);
        float push = uPush * exp(-r * r / 0.035);
        vec2 dr = ndc - uRipAt; dr.x *= uAspect;
        float rr = length(dr);
        float ring = exp(-pow(rr - uRip * 1.8, 2.0) / 0.006) * (1.0 - uRip);
        vec2 off = normalize(d + 1e-5) * push * 0.16 + normalize(dr + 1e-5) * ring * 0.09;
        off.x /= uAspect;
        gl_Position.xy += off * gl_Position.w;
        gl_PointSize = uSize * (0.6 + aSeed) * (3.2 / -mv.z) * (1.0 + push * 1.2 + ring * 1.5);
        vHot = clamp(push * 1.4 + ring * 2.0, 0.0, 1.0);
        vSig = k * step(0.82, aSeed); vSeed = aSeed;
      }`,
    fragmentShader: `
      varying float vSig; varying float vSeed; varying float vHot;
      void main() {
        float d = length(gl_PointCoord - 0.5);
        if (d > 0.5) discard;
        float a = smoothstep(0.5, 0.0, d);
        vec3 bone = vec3(0.95, 0.94, 0.91); vec3 sig = vec3(0.83, 1.0, 0.25);
        gl_FragColor = vec4(mix(bone, sig, max(vSig, vHot)), a * (0.35 + 0.45 * vSeed + 0.4 * vHot));
      }`,
  });
  const pts = new THREE.Points(geo, mat);
  const group = new THREE.Group();
  group.add(pts);
  scene.add(group);

  const size = () => { const w = canvas.clientWidth, h = canvas.clientHeight; gl.setSize(w, h, false); cam.aspect = w / h; cam.updateProjectionMatrix(); mat.uniforms.uAspect.value = w / h; };
  size();
  addEventListener('resize', size);

  let mx = 0, my = 0, prog = 0, visible = true, raf = 0, last = performance.now(), inside = false;
  const ndc = (e, v) => { const r = canvas.getBoundingClientRect(); v.set(((e.clientX - r.left) / r.width) * 2 - 1, -(((e.clientY - r.top) / r.height) * 2 - 1)); return r; };
  const target = new THREE.Vector2(9, 9);
  addEventListener('pointermove', (e) => {
    mx = e.clientX / innerWidth - 0.5; my = e.clientY / innerHeight - 0.5;
    const r = ndc(e, target);
    inside = e.pointerType === 'mouse' && e.clientY > r.top && e.clientY < r.bottom;
  }, { passive: true });
  // Click or tap anywhere on the hero sends a shock ring through the field.
  canvas.parentElement.addEventListener('pointerdown', (e) => { ndc(e, mat.uniforms.uRipAt.value); mat.uniforms.uRip.value = 0; });
  const start = performance.now();
  const loop = (now) => {
    const dt = Math.min(0.05, (now - last) / 1000); last = now;
    mat.uniforms.uTime.value += dt;
    // Intro: noise resolves into the curve over ~3 seconds.
    mat.uniforms.uMix.value = Math.min(1, (now - start) / 3200);
    group.rotation.y += ((mx * 0.5 - 0.25 + prog * 0.9) - group.rotation.y) * 0.05;
    group.rotation.x += ((my * 0.25 + 0.08 - prog * 0.2) - group.rotation.x) * 0.05;
    group.position.y = prog * 1.1;
    const u = mat.uniforms;
    u.uMouse.value.lerp(target, 0.12);
    u.uPush.value += ((inside ? 1 : 0) - u.uPush.value) * 0.06;
    u.uRip.value = Math.min(1, u.uRip.value + dt * 0.7);
    gl.render(scene, cam);
    raf = visible ? requestAnimationFrame(loop) : 0;
  };
  raf = requestAnimationFrame(loop);
  new IntersectionObserver(([e]) => { visible = e.isIntersecting; if (visible && !raf) { last = performance.now(); raf = requestAnimationFrame(loop); } }).observe(canvas);

  return { setProgress: (p) => { prog = p; } };
}
