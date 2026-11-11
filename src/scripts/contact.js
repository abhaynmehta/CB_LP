// The ending: "Say hello." rebuilt from gold particles. Each letter span is redrawn into an offscreen
// canvas at its exact place and font, sampled into points, and the points fly in from a scatter as the
// section arrives. The cursor (or a finger) pushes them aside. The real link stays on top, invisible.
// Plain WebGL (one point list, one draw call), so the page carries no 3D library.
const VERT = `attribute vec2 aTo; attribute vec2 aFrom; attribute float aS;
uniform float uTime, uIn, uPx; uniform vec2 uSize, uMouse; varying float vA; varying float vX;
void main(){
  float k = smoothstep(aS * 0.5, aS * 0.5 + 0.5, uIn);
  vec2 p = mix(aFrom, aTo, k);
  p += vec2(sin(uTime * 1.3 + aS * 40.0), cos(uTime * 1.1 + aS * 33.0)) * (1.2 + (1.0 - k) * 6.0);
  vec2 d = p - uMouse; float r = length(d);
  p += normalize(d + 0.001) * 70.0 * exp(-r * r / 6000.0);
  gl_Position = vec4(p.x / uSize.x * 2.0 - 1.0, 1.0 - p.y / uSize.y * 2.0, 0.0, 1.0);
  gl_PointSize = uPx * (1.6 + aS * 2.0);
  vA = (0.55 + 0.45 * aS) * (0.2 + 0.8 * k); vX = p.x / uSize.x;
}`;
const FRAG = `precision mediump float; varying float vA; varying float vX; uniform highp float uTime;
void main(){ float d = length(gl_PointCoord - 0.5); if (d > 0.5) discard;
  vec3 c = mix(vec3(0.55, 0.42, 0.22), vec3(1.0, 0.88, 0.62), 0.5 + 0.5 * sin(vX * 6.0 - uTime * 0.8));
  float a = vA * smoothstep(0.5, 0.1, d); gl_FragColor = vec4(c * a, a); }`;

export default function contact(section, word) {
  const canvas = document.createElement('canvas');
  canvas.className = 'hello-gl';
  canvas.setAttribute('aria-hidden', 'true');
  section.prepend(canvas);
  const gl = canvas.getContext('webgl', { alpha: true, antialias: false, premultipliedAlpha: true });
  if (!gl) { canvas.remove(); return null; }
  const sh = (type, src) => { const s = gl.createShader(type); gl.shaderSource(s, src); gl.compileShader(s); return s; };
  const pr = gl.createProgram();
  gl.attachShader(pr, sh(gl.VERTEX_SHADER, VERT));
  gl.attachShader(pr, sh(gl.FRAGMENT_SHADER, FRAG));
  gl.linkProgram(pr);
  if (!gl.getProgramParameter(pr, gl.LINK_STATUS)) { canvas.remove(); return null; }
  gl.useProgram(pr);
  gl.enable(gl.BLEND);
  gl.blendFunc(gl.ONE, gl.ONE); // additive: overlapping gold brightens
  const u = (n) => gl.getUniformLocation(pr, n);
  const uTime = u('uTime'), uIn = u('uIn'), uPx = u('uPx'), uSize = u('uSize'), uMouse = u('uMouse');
  const attr = (name, size) => { const b = gl.createBuffer(), l = gl.getAttribLocation(pr, name); gl.enableVertexAttribArray(l); return (data) => { gl.bindBuffer(gl.ARRAY_BUFFER, b); gl.bufferData(gl.ARRAY_BUFFER, data, gl.STATIC_DRAW); gl.vertexAttribPointer(l, size, gl.FLOAT, false, 0, 0); }; };
  const setTo = attr('aTo', 2), setFrom = attr('aFrom', 2), setS = attr('aS', 1);
  const dpr = Math.min(devicePixelRatio, 2);
  let count = 0, W = 0, H = 0, inV = 0;

  const build = () => {
    const sr = section.getBoundingClientRect();
    W = Math.round(sr.width); H = Math.round(sr.height);
    canvas.width = W * dpr; canvas.height = H * dpr;
    gl.viewport(0, 0, canvas.width, canvas.height);
    // Redraw every letter where it really sits, in its own font.
    const off = document.createElement('canvas'); off.width = W; off.height = H;
    const x = off.getContext('2d', { willReadFrequently: true });
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
      to.push(xx + (Math.random() - 0.5) * step, yy + (Math.random() - 0.5) * step);
      const a = Math.random() * Math.PI * 2, rr = 200 + Math.random() * Math.max(W, H) * 0.7;
      from.push(W / 2 + Math.cos(a) * rr, H / 2 + Math.sin(a) * rr);
      seed.push(Math.random());
    }
    setTo(new Float32Array(to)); setFrom(new Float32Array(from)); setS(new Float32Array(seed));
    count = seed.length;
    word.classList.add('ghost');
  };

  let on = false, raf = 0, last = performance.now(), t = 0, mx = -9999, my = -9999, cx = mx, cy = my;
  addEventListener('pointermove', (e) => { const r = section.getBoundingClientRect(); mx = e.clientX - r.left; my = e.clientY - r.top; }, { passive: true });
  section.addEventListener('pointerleave', () => { mx = my = -9999; });
  const loop = (now) => {
    t += Math.min(0.05, (now - last) / 1000); last = now;
    cx += (mx - cx) * 0.2; cy += (my - cy) * 0.2;
    gl.clearColor(0, 0, 0, 0); gl.clear(gl.COLOR_BUFFER_BIT);
    gl.uniform1f(uTime, t); gl.uniform1f(uIn, inV); gl.uniform1f(uPx, dpr);
    gl.uniform2f(uSize, W, H); gl.uniform2f(uMouse, cx, cy);
    gl.drawArrays(gl.POINTS, 0, count);
    raf = on ? requestAnimationFrame(loop) : 0;
  };
  new IntersectionObserver(([e]) => { on = e.isIntersecting; if (on && !raf) { last = performance.now(); raf = requestAnimationFrame(loop); } }).observe(section);
  document.fonts.ready.then(build);
  // Rebuild only when the width changes (phones fire resize while the address bar slides).
  let rt = 0, lastW = innerWidth;
  addEventListener('resize', () => { if (innerWidth === lastW) return; lastW = innerWidth; clearTimeout(rt); rt = setTimeout(build, 250); });
  return { setIn: (v) => (inV = v) };
}
