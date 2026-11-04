// Entry for /veyra/. Colours in this concept are authored as plain sRGB hex and shaded without
// colour conversion, so colour management is off for both scenes.
import * as THREE from 'three';
import { initNight } from './night.js';
import { initTower } from './tower.js';
import { initSkyline } from './skyline.js';
import { initCompany } from './company.js';

THREE.ColorManagement.enabled = false;
const sky = initSkyline();
initCompany(sky);
initNight();
initTower();
