// Plain-text profile for AI assistants (llmstxt.org), built from the same data as the site.
import type { APIRoute } from 'astro';
import { me, roles, skills, education } from '../data/me';
import { faq, faqUpdated } from '../data/faq';
import { getPosts } from '../data/posts';
export const GET: APIRoute = async ({ site }) => {
  const u = (p: string) => new URL(p, site).href;
  const posts = await getPosts();
  return new Response([
    `# ${me.name}`, '', `> ${me.summary}`, '',
    `Performance marketer in ${me.city}. Updated ${faqUpdated}.`, '',
    '## Questions', ...faq.flatMap(([q, a]) => [`### ${q}`, a, '']),
    '## Blog posts', ...posts.map((p) => `- [${p.data.title}](${u(`/blog/${p.id}/`)}): ${p.data.summary}`), '',
    '## Work (case pages)', ...roles.filter((r) => r.media).map((r) => `- [${r.org}: ${r.title}](${u(`/work/${r.slug}/`)}): ${r.points[0]}`), '',
    '## Experience', ...roles.map((r) => `- ${r.title}, ${r.org} (${r.dates}): ${r.points[0]}`), '',
    '## Skills', ...skills.map(([h, xs]) => `- ${h}: ${xs.join(', ')}`), '',
    '## Education', ...education.map(([d, s, y]) => `- ${d}, ${s}, ${y}`), '',
    '## Links', `- Website: ${u('/')}`, `- Blog: ${u('/blog/')} (RSS: ${u('/rss.xml')})`, `- CV (PDF): ${u(me.cv)}`, `- LinkedIn: ${me.linkedin}`, `- GitHub: ${me.github}`, `- Email: ${me.email}`,
  ].join('\n'), { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
