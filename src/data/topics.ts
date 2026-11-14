// Blog topics: each one is a hub page (/blog/topic/<id>/) that gathers its posts, so search engines
// see a cluster of related pages instead of scattered articles.
export const topics = {
  'real-estate': { name: 'Real estate marketing', blurb: 'Lead generation, qualification and tracking for real estate developers and agencies in India.' },
  hospitality: { name: 'Hotels and resorts', blurb: 'Direct bookings, WhatsApp concierges and campaigns for weddings, retreats and stays.' },
  travel: { name: 'Travel marketing', blurb: 'Meta Ads, WhatsApp and landing pages for tour operators selling international trips.' },
  d2c: { name: 'D2C and e-commerce', blurb: 'Festive campaigns, Shopify, repeat purchase and creative for direct-to-consumer brands.' },
  'seo-ai-search': { name: 'SEO and AI search', blurb: 'Ranking on Google and getting cited by ChatGPT, Perplexity and AI Overviews (SEO, AEO, GEO).' },
  automation: { name: 'Marketing automation', blurb: 'Python, AI and WhatsApp tools that take the manual work out of marketing.' },
  career: { name: 'Career notes', blurb: 'What I learned along the way, from Snapchat lenses to managing ₹50L+ a month.' },
} as const;

export type TopicId = keyof typeof topics;
export const topicIds = Object.keys(topics) as [TopicId, ...TopicId[]];
