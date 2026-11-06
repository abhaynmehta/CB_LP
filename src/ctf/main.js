// Entry for the home page. Colours are authored as plain sRGB hex and shaded without conversion,
// so colour management is off for both WebGL scenes. Lenis smooths wheel scrolling on desktop;
// touch screens keep native scrolling.
import * as THREE from 'three';
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';
import { initUI } from './ui.js';
import { initFunnel } from './funnel.js';
import { initKeys } from './keys.js';

THREE.ColorManagement.enabled = false;
const fine = matchMedia('(pointer: fine)').matches, still = matchMedia('(prefers-reduced-motion: reduce)').matches;
if (fine && !still) {
  const lenis = new Lenis({ autoRaf: true, anchors: { offset: -76 }, lerp: 0.1 });
  window.ctfScrollTo = (y) => lenis.scrollTo(y, { duration: 1.4 });
}
initUI();
initFunnel();
initKeys();
