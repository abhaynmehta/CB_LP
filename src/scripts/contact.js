// The ending: "Say hello." rebuilt from gold particles. Each letter span is redrawn into an offscreen
// canvas at its exact place and font, sampled into points, and the points fly in from a scatter as the
// section arrives. The cursor (or a finger) pushes them aside. The real link stays on top, invisible.
import * as THREE from 'three';

export default function contact(section, word) {
  const canvas = document.createElement('canvas');
  canvas.className = 'hello-gl';
  canvas.setAttribute('aria-hidden', 'true');
  section.prepend(canvas);
  let gl;
  try { gl = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: false }); } catch { canvas.remove(); return null; }
  const dpr = Math.min(devicePixelRatio, 2);
  gl.setPixelRatio(dpr);
  const scene = new THREE.Scene();
  const cam = new THREE.OrthographicCamera(0, 1, 0, -1, -10, 10);
  const U = { uTime: { value: 0 }, uIn: { value: 0 }, uMouse: { value: new THREE.Vector2(-9999, -9999) }, uPx: { value: dpr }, uW: { value: 1 } };
  const mat = new THREE.ShaderMaterial({
    transparent: true, depthWrite: false, blending: THREE.AdditiveBlending, uniforms: U,
    vertexShader: `attribute vec3 aFrom; attribute float aS; uniform float uTime, uIn, uPx, uW; uniform vec2 uMouse; varying float vA; varying float vX;
      void main(){
        float k = smoothstep(aS * 0.5, aS * 0.5 + 0.5, uIn);
        vec3 p = mix(aFrom, position, k);
        p.xy += vec2(sin(uTime * 1.3 + aS * 40.0), cos(uTime * 1.1 + aS * 33.0)) * (1.2 + (1.0 - k) * 6.0);
        vec2 d = p.xy - uMouse; float r = length(d);
        p.xy += normalize(d + 0.001) * 70.0 * exp(-r * r / 6000.0);
        gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);
        gl_PointSize = uPx * (1.6 + aS * 2.0);
        vA = (0.55 + 0.45 * aS) * (0.2 + 0.8 * k); vX = p.x / uW; }`,
    fragmentShader: `varying float vA; varying float vX; uniform float uTime;
      void main(){ float d = length(gl_PointCoord - 0.5); if (d > 0.5) discard;
        vec3 a = vec3(0.55, 0.42, 0.22), b = vec3(1.0, 0.88, 0.62);
        vec3 c = mix(a, b, 0.5 + 0.5 * sin(vX * 6.0 - uTime * 0.8));
        gl_FragColor = vec4(c, vA * smoothstep(0.5, 0.1, d)); }`,
  });
  let pts = null;

  const build = () => {
    const sr = section.getBoundingClientRect();
    const W = Math.round(sr.width), H = Math.round(sr.height);
    gl.setSize(W, H, false);
    cam.right = W; cam.bottom = -H; cam.updateProjectionMatrix();
    U.uW.value = W;
    // Redraw every letter where it really sits, in its own font.
    const off = document.createElement('canvas'); off.width = W; off.height = H;
    const x = off.getContext('2d');
    x.fillStyle = '#fff'; x.textBaseline = 'alphabetic';
    word.querySelectorAll('.ch').forEach((ch) => {
      const r = ch.getBoundingClientRect(), cs = getComputedStyle(ch);
      x.font = `${cs.fontStyle} ${cs.fontWeight} ${cs.fontSize} ${cs.fontFamily}`;
      const m = x.measureText(ch.textContent);
      x.fillText(ch.textContent, r.left - sr.left + (r.width - m.width) / 2, r.top - sr.top + (r.height + m.actualBoundingBoxAscent - m.actualBoundingBoxDescent) / 2);
    });
    const data = x.getImageData(0, 0, W, H).data;
    const step = W < 700 ? 2 : 3;
    const to = [], from = [], seed = [];
    for (let yy = 0; yy < H; yy += step) for (let xx = 0; xx < W; xx += step) {
      if (data[(yy * W + xx) * 4 + 3] < 140) continue;
      to.push(xx + (Math.random() - 0.5) * step, -yy + (Math.random() - 0.5) * step, 0);
      const a = Math.random() * Math.PI * 2, rr = 200 + Math.random() * Math.max(W, H) * 0.7;
      from.push(W / 2 + Math.cos(a) * rr, -H / 2 + Math.sin(a) * rr, 0);
      seed.push(Math.random());
    }
    if (pts) { scene.remove(pts); pts.geometry.dispose(); }
    const g = new THREE.BufferGeometry();
    g.setAttribute('position', new THREE.Float32BufferAttribute(to, 3));
    g.setAttribute('aFrom', new THREE.Float32BufferAttribute(from, 3));
    g.setAttribute('aS', new THREE.Float32BufferAttribute(seed, 1));
    pts = new THREE.Points(g, mat);
    pts.frustumCulled = false;
    scene.add(pts);
    word.classList.add('ghost');
  };

  let on = false, raf = 0, last = performance.now(), mx = -9999, my = -9999;
  addEventListener('pointermove', (e) => { const r = section.getBoundingClientRect(); mx = e.clientX - r.left; my = -(e.clientY - r.top); }, { passive: true });
  section.addEventListener('pointerleave', () => { mx = my = -9999; });
  const loop = (now) => {
    U.uTime.value += Math.min(0.05, (now - last) / 1000); last = now;
    U.uMouse.value.x += (mx - U.uMouse.value.x) * 0.2; U.uMouse.value.y += (my - U.uMouse.value.y) * 0.2;
    gl.render(scene, cam);
    raf = on ? requestAnimationFrame(loop) : 0;
  };
  new IntersectionObserver(([e]) => { on = e.isIntersecting; if (on && !raf) { last = performance.now(); raf = requestAnimationFrame(loop); } }).observe(section);
  document.fonts.ready.then(build);
  let t = 0;
  addEventListener('resize', () => { clearTimeout(t); t = setTimeout(build, 250); });
  return { setIn: (v) => (U.uIn.value = v) };
}
