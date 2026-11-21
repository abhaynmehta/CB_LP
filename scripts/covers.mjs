// Makes a 1200x630 cover for every blog post (public/blog/<slug>.jpg): used on the page, as the
// social preview and as the BlogPosting image. Runs before each build; skips covers that are newer than their post.
import { readdirSync, readFileSync, statSync, mkdirSync, existsSync } from 'node:fs';
import { load } from 'js-yaml';
import sharp from 'sharp';

const SRC = 'src/content/blog', OUT = 'public/blog';
const C = { bg: '#0b0a08', ink: '#f2eadb', mute: '#8d8374', gold: '#cfae74', line: '#2a251d' };
const topics = { 'real-estate': 'Real estate marketing', hospitality: 'Hotels and resorts', travel: 'Travel marketing', d2c: 'D2C and e-commerce', 'seo-ai-search': 'SEO and AI search', automation: 'Marketing automation', career: 'Career notes' };
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

function wrap(text, max) {
  const lines = [''];
  for (const w of text.split(' ')) {
    const cur = lines[lines.length - 1];
    if ((cur + ' ' + w).trim().length > max) lines.push(w); else lines[lines.length - 1] = (cur + ' ' + w).trim();
  }
  return lines;
}

mkdirSync(OUT, { recursive: true });
for (const f of readdirSync(SRC).filter((f) => f.endsWith('.md'))) {
  const slug = f.replace(/\.md$/, ''), src = `${SRC}/${f}`, out = `${OUT}/${slug}.jpg`;
  if (existsSync(out) && statSync(out).mtimeMs > statSync(src).mtimeMs) continue;
  const d = load(readFileSync(src, 'utf8').split('---')[1]);
  let size = 58, lines = wrap(d.title, 34);
  if (lines.length > 4) { size = 48; lines = wrap(d.title, 42); }
  const title = lines.slice(0, 5).map((l, i) => `<text x="80" y="${200 + i * size * 1.18}" font-family="Didot, Georgia, serif" font-size="${size}" fill="${C.ink}">${esc(l)}</text>`).join('');
  const stat = d.stat ? `<text x="80" y="545" font-family="Didot, Georgia, serif" font-size="76" fill="${C.gold}">${esc(d.stat)}</text>
    <text x="80" y="582" font-family="Helvetica, Arial, sans-serif" font-size="22" fill="${C.mute}" letter-spacing="1">${esc(d.statLabel ?? '')}</text>` : '';
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630">
    <rect width="1200" height="630" fill="${C.bg}"/><rect x="40" y="40" width="1120" height="550" fill="none" stroke="${C.line}"/>
    <text x="80" y="118" font-family="Helvetica, Arial, sans-serif" font-size="20" fill="${C.gold}" letter-spacing="4">${esc((topics[d.topic] ?? '').toUpperCase())}</text>
    ${title}${stat}
    <text x="1120" y="575" text-anchor="end" font-family="Helvetica, Arial, sans-serif" font-size="20" fill="${C.mute}">Abhay Mehta · Digital marketing lead</text>
  </svg>`;
  await sharp(Buffer.from(svg)).jpeg({ quality: 82, mozjpeg: true }).toFile(out);
  console.log('cover', out);
}
