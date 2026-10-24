// Plain-text profile for AI assistants, built from the same data as the site.
import type { APIRoute } from 'astro';
import { me, roles, skills, education } from '../data/me';
export const GET: APIRoute = () => new Response([
  `# ${me.name}`, '', `> ${me.summary}`, '', `Contact: ${me.email} · ${me.city}`, '',
  '## Experience', ...roles.map((r) => `- ${r.title}, ${r.org} (${r.dates}): ${r.points[0]}`), '',
  '## Skills', ...skills.map(([h, xs]) => `- ${h}: ${xs.join(', ')}`), '',
  '## Education', ...education.map(([d, s, y]) => `- ${d}, ${s}, ${y}`),
].join('\n'), { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
