// RSS feed of the blog, so readers, aggregators and search engines can pick up new posts on their own.
import rss from '@astrojs/rss';
import type { APIRoute } from 'astro';
import { getPosts } from '../data/posts';

export const GET: APIRoute = async ({ site }) => {
  const posts = await getPosts();
  return rss({
    title: 'Abhay Mehta: notes from the work',
    description: 'Real numbers from performance marketing: real estate, travel, resorts, D2C, SEO and AI search.',
    site: site!,
    items: posts.map((p) => ({ title: p.data.title, description: p.data.description, pubDate: p.data.pubDate, link: `/blog/${p.id}/` })),
    customData: '<language>en-in</language>',
  });
};
