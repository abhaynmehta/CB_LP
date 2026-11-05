// Entry for the home page. Colours are authored as plain sRGB hex and shaded without conversion,
// so colour management is off for both WebGL scenes.
import * as THREE from 'three';
import { initUI } from './ui.js';
import { initFunnel } from './funnel.js';
import { initKeys } from './keys.js';

THREE.ColorManagement.enabled = false;
initUI();
initFunnel();
initKeys();
