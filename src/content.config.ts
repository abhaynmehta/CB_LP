// Blog posts live in src/content/blog as Markdown. The frontmatter below is checked at build time,
// so a post with a missing summary or an over-long description fails the build instead of shipping.
import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';
import { topicIds } from './data/topics';

const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    seoTitle: z.string().max(62).optional(), // shorter title for search results when the headline is long
    description: z.string().max(160), // the search result snippet
    summary: z.string(), // "In short": the answer-first paragraph AI engines quote
    pubDate: z.coerce.date(),
    updated: z.coerce.date().optional(),
    topic: z.enum(topicIds),
    stat: z.string().optional(), // the headline number on the cover image
    statLabel: z.string().optional(),
    keyphrase: z.string(), // the main search phrase this post is written for
    related: z.string().optional(), // slug of the matching case study under /work/
    faq: z.array(z.object({ q: z.string(), a: z.string() })).default([]),
    draft: z.boolean().default(false),
  }),
});

export const collections = { blog };
