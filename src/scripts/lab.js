// The lab: a raymarched gold shader (five metaballs plus one that follows the pointer, melted together
// with a smooth minimum) and a draggable globe of words. Both stop when off screen.
const still = matchMedia('(prefers-reduced-motion: reduce)').matches;
const FRAG = `precision highp float;
uniform vec2 uRes; uniform float uTime; uniform vec2 uMouse;
float smin(float a, float b, float k) { float h = clamp(0.5 + 0.5 * (b - a) / k, 0.0, 1.0); return mix(b, a, h) - k * h * (1.0 - h); }
float map(vec3 p) {
  float d = 1e9;
  for (int i = 0; i < 5; i++) {
    float f = float(i);
    vec3 c = vec3(sin(uTime * 0.45 + f * 1.7) * 1.15, cos(uTime * 0.37 + f * 2.3) * 0.85, sin(uTime * 0.29 + f) * 0.6);
    d = smin(d, length(p - c) - (0.3 + 0.07 * sin(f * 3.1)), 0.7);
  }
  return smin(d, length(p - vec3(uMouse * vec2(1.5, 1.05), 0.4)) - 0.33, 0.75);
}
vec3 nor(vec3 p) { vec2 e = vec2(0.0015, 0.0); return normalize(vec3(map(p + e.xyy) - map(p - e.xyy), map(p + e.yxy) - map(p - e.yxy), map(p + e.yyx) - map(p - e.yyx))); }
vec3 env(vec3 r) {
  vec3 c = mix(vec3(0.22, 0.16, 0.09), vec3(1.0, 0.88, 0.62), smoothstep(-0.6, 0.9, r.y));
  c += vec3(1.0, 0.92, 0.75) * pow(max(dot(r, normalize(vec3(0.6, 0.7, 0.5))), 0.0), 48.0) * 2.5;
  c += vec3(0.5, 0.78, 0.64) * pow(max(dot(r, normalize(vec3(-0.8, -0.1, 0.4))), 0.0), 5.0) * 0.5;
  return c;
}
void main() {
  vec2 uv = (gl_FragCoord.xy - 0.5 * uRes) / uRes.y;
  vec3 ro = vec3(0.0, 0.0, 4.4), rd = normalize(vec3(uv, -1.55));
  float t = 0.0; float hit = 0.0;
  for (int i = 0; i < 72; i++) { float d = map(ro + rd * t); if (d < 0.0015) { hit = 1.0; break; } t += d; if (t > 9.0) break; }
  vec3 col = mix(vec3(0.035, 0.07, 0.055), vec3(0.02, 0.035, 0.03), length(uv));
  if (hit > 0.5) {
    vec3 p = ro + rd * t, n = nor(p), r = reflect(rd, n);
    float fr = pow(1.0 - max(dot(-rd, n), 0.0), 3.0);
    col = env(r) * vec3(0.98, 0.74, 0.42) * (0.7 + 0.3 * fr) + fr * vec3(0.25, 0.2, 0.12);
  }
  gl_FragColor = vec4(col, 1.0);
}`;

function shader(canvas) {
  const gl = canvas.getContext('webgl', { antialias: false, alpha: false });
  if (!gl) return;
  const sh = (type, src) => { const s = gl.createShader(type); gl.shaderSource(s, src); gl.compileShader(s); return s; };
  const pr = gl.createProgram();
  gl.attachShader(pr, sh(gl.VERTEX_SHADER, 'attribute vec2 p; void main(){ gl_Position = vec4(p, 0.0, 1.0); }'));
  gl.attachShader(pr, sh(gl.FRAGMENT_SHADER, FRAG));
  gl.linkProgram(pr); gl.useProgram(pr);
  gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
  const loc = gl.getAttribLocation(pr, 'p'); gl.enableVertexAttribArray(loc); gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);
  const uRes = gl.getUniformLocation(pr, 'uRes'), uTime = gl.getUniformLocation(pr, 'uTime'), uMouse = gl.getUniformLocation(pr, 'uMouse');
  const dpr = Math.min(devicePixelRatio, innerWidth < 900 ? 1 : 1.25);
  const size = () => { canvas.width = canvas.clientWidth * dpr; canvas.height = canvas.clientHeight * dpr; gl.viewport(0, 0, canvas.width, canvas.height); };
  size(); addEventListener('resize', size);
  let tx = 0.6, ty = 0.2, mx = tx, my = ty, on = false, raf = 0, t0 = performance.now();
  const move = (e) => { const r = canvas.getBoundingClientRect(); tx = ((e.clientX - r.left) / r.width) * 2 - 1; ty = -(((e.clientY - r.top) / r.height) * 2 - 1); };
  canvas.parentElement.addEventListener('pointermove', move);
  canvas.parentElement.addEventListener('pointerdown', move);
  const loop = (now) => {
    mx += (tx - mx) * 0.08; my += (ty - my) * 0.08;
    gl.uniform2f(uRes, canvas.width, canvas.height); gl.uniform1f(uTime, (now - t0) / 1000); gl.uniform2f(uMouse, mx, my);
    gl.drawArrays(gl.TRIANGLES, 0, 3);
    raf = on && !still ? requestAnimationFrame(loop) : 0;
  };
  new IntersectionObserver(([e]) => { on = e.isIntersecting; if (on && !raf) raf = requestAnimationFrame(loop); }).observe(canvas);
}

function globe(box) {
  const words = [...box.querySelectorAll(':scope > span:not(.globe-hint)')];
  const n = words.length;
  // Fibonacci sphere: even spacing for any count.
  const pts = words.map((_, i) => { const y = 1 - (i / (n - 1)) * 2, r = Math.sqrt(1 - y * y), a = i * Math.PI * (3 - Math.sqrt(5)); return [Math.cos(a) * r, y, Math.sin(a) * r]; });
  let ax = 0.3, ay = 0, vx = 0, vy = 0.004, drag = false, px = 0, py = 0, on = false, raf = 0;
  box.addEventListener('pointerdown', (e) => { drag = true; px = e.clientX; py = e.clientY; box.setPointerCapture(e.pointerId); });
  box.addEventListener('pointermove', (e) => { if (!drag) return; vy = (e.clientX - px) * 0.0009; vx = (e.clientY - py) * 0.0009; px = e.clientX; py = e.clientY; });
  box.addEventListener('pointerup', () => (drag = false));
  const loop = () => {
    const R = Math.min(box.clientWidth, box.clientHeight) * 0.38;
    ay += vy; ax += vx;
    if (!drag) { vy += (0.004 - vy) * 0.02; vx *= 0.95; }
    const cy = Math.cos(ay), sy = Math.sin(ay), cx = Math.cos(ax), sx = Math.sin(ax);
    words.forEach((w, i) => {
      let [x, y, z] = pts[i];
      [x, z] = [x * cy - z * sy, x * sy + z * cy];
      [y, z] = [y * cx - z * sx, y * sx + z * cx];
      const s = 0.6 + (z + 1) * 0.35;
      w.style.transform = `translate(-50%, -50%) translate3d(${x * R}px, ${y * R}px, 0) scale(${s})`;
      w.style.opacity = 0.18 + (z + 1) * 0.41;
      w.style.zIndex = Math.round((z + 1) * 50);
    });
    raf = on && !still ? requestAnimationFrame(loop) : 0;
  };
  new IntersectionObserver(([e]) => { on = e.isIntersecting; if (on && !raf) raf = requestAnimationFrame(loop); }).observe(box);
}

export default function lab() {
  const c = document.querySelector('[data-lab]');
  if (c) shader(c);
  const g = document.querySelector('[data-globe]');
  if (g) globe(g);
}
