// Shared state between the page widgets and the two WebGL scenes.
export const S = {
  reduce: matchMedia('(prefers-reduced-motion: reduce)').matches,
  pick: { floor: 14, tower: 'B' }, // the home selected in the picker (lights up in 3D)
  sun: { mins: 450 },              // the sunlight slider, minutes after midnight
  zone: 0,                          // the floor zone the "Floors" story is on
};
export const $ = (id) => document.getElementById(id);
export const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));
export const css = (n) => getComputedStyle(document.documentElement).getPropertyValue(n).trim();
const inrFmt = new Intl.NumberFormat('en-IN', { maximumFractionDigits: 0 });
export const inr = (v) => inrFmt.format(Math.round(v));
export const rupee = (v) => '₹' + inr(v);
export const short = (v) => (v >= 1e7 ? `₹${(v / 1e7).toFixed(2)} Cr` : `₹${(v / 1e5).toFixed(1)} L`);
export const smooth = (el) => el.scrollIntoView({ behavior: S.reduce ? 'auto' : 'smooth' });
// Accepts 10-digit Indian mobiles, with or without +91 / 0.
export const mobile = (raw) => raw.replace(/\D/g, '').replace(/^(91|0)(?=\d{10}$)/, '');
export const validMobile = (m) => /^[6-9]\d{9}$/.test(m);
export const mask = (m) => `${m.slice(0, 2)}XXXXXX${m.slice(-2)}`;
