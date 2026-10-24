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
    uniforms: { uMix: { value: 0 }, uTime: { value: 0 }, uSize: { value: (phone ? 2.2 : 2.6) * gl.getPixelRatio() } },
    vertexShader: `
      attribute vec3 aTo; attribute float aSeed;
      uniform float uMix, uTime, uSize;
      varying float vSig; varying float vSeed;
      void main() {
        float k = smoothstep(aSeed * 0.45, aSeed * 0.45 + 0.55, uMix);
        vec3 p = mix(position, aTo, k);
        p += 0.035 * vec3(sin(uTime * 0.7 + aSeed * 40.0), cos(uTime * 0.6 + aSeed * 30.0), sin(uTime * 0.5 + aSeed * 20.0)) * (1.0 - k * 0.7);
        vec4 mv = modelViewMatrix * vec4(p, 1.0);
        gl_Position = projectionMatrix * mv;
        gl_PointSize = uSize * (0.6 + aSeed) * (3.2 / -mv.z);
        vSig = k * step(0.82, aSeed); vSeed = aSeed;
      }`,
    fragmentShader: `
      varying float vSig; varying float vSeed;
      void main() {
        float d = length(gl_PointCoord - 0.5);
        if (d > 0.5) discard;
        float a = smoothstep(0.5, 0.0, d);
        vec3 bone = vec3(0.95, 0.94, 0.91); vec3 sig = vec3(0.83, 1.0, 0.25);
        gl_FragColor = vec4(mix(bone, sig, vSig), a * (0.35 + 0.45 * vSeed));
      }`,
  });
  const pts = new THREE.Points(geo, mat);
  const group = new THREE.Group();
  group.add(pts);
  scene.add(group);

  const size = () => { const w = canvas.clientWidth, h = canvas.clientHeight; gl.setSize(w, h, false); cam.aspect = w / h; cam.updateProjectionMatrix(); };
  size();
  addEventListener('resize', size);

  let mx = 0, my = 0, prog = 0, visible = true, raf = 0, last = performance.now();
  addEventListener('pointermove', (e) => { mx = e.clientX / innerWidth - 0.5; my = e.clientY / innerHeight - 0.5; }, { passive: true });
  const start = performance.now();
  const loop = (now) => {
    const dt = Math.min(0.05, (now - last) / 1000); last = now;
    mat.uniforms.uTime.value += dt;
    // Intro: noise resolves into the curve over ~3 seconds.
    mat.uniforms.uMix.value = Math.min(1, (now - start) / 3200);
    group.rotation.y += ((mx * 0.5 - 0.25 + prog * 0.9) - group.rotation.y) * 0.05;
    group.rotation.x += ((my * 0.25 + 0.08 - prog * 0.2) - group.rotation.x) * 0.05;
    group.position.y = prog * 1.1;
    gl.render(scene, cam);
    raf = visible ? requestAnimationFrame(loop) : 0;
  };
  raf = requestAnimationFrame(loop);
  new IntersectionObserver(([e]) => { visible = e.isIntersecting; if (visible && !raf) { last = performance.now(); raf = requestAnimationFrame(loop); } }).observe(canvas);

  return { setProgress: (p) => { prog = p; } };
}
