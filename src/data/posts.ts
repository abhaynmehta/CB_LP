// Shared helpers for the blog: published posts newest first, reading time and display dates.
import { getCollection, type CollectionEntry } from 'astro:content';

export type Post = CollectionEntry<'blog'>;

export async function getPosts(): Promise<Post[]> {
  const all = await getCollection('blog', ({ data }) => !data.draft);
  return all.sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());
}

export const minutes = (p: Post) => Math.max(1, Math.round((p.body ?? '').split(/\s+/).length / 220));
export const fmt = (d: Date) => d.toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' });
export const iso = (d: Date) => d.toISOString().slice(0, 10);
