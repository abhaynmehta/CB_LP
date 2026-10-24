// Picks the lightest existing copy of an image (phone-sized variants made for the agency site).
import fs from 'node:fs';
import path from 'node:path';
const pub = (p: string) => path.join(process.cwd(), 'public', 'work', p);
export function small(p: string) {
  const base = p.replace(/\.(webp|jpg|png)$/, '');
  for (const v of [`${base}.w700.webp`, `${base}.w960.webp`, `${base}.w480.webp`]) if (fs.existsSync(pub(v))) return `/work/${v}`;
  return `/work/${p}`;
}
