// CTRL the Funnel facts for the combined home page. Copied from the agency repo
// (abhaynmehta/CtrlTheFunnel: src/data/site.ts and src/data/work.ts), where every number has a
// screenshot, report or public count on file. Change them there first, then here.

export const agency = {
  name: 'CTRL the Funnel',
  url: 'https://ctrlthefunnel.pages.dev', // the agency's share preview; change when the domain is final
  email: 'ctrlthefunnel@gmail.com',
  phone: '+91 92890 86239',
  wa: '919289086239',
  city: 'New Delhi, India',
  tagline: 'We own every step between a scroll and a sale.',
  kind: 'One-stop business solutions',
  years: '6 years',
  description:
    'CTRL the Funnel is a one-stop business solutions team from New Delhi, six years in the market. Strategy, content and production, ads, websites, SEO, AEO and GEO, and WhatsApp automation, run as one system for real estate, hospitality, D2C, B2B SaaS, travel, education and creators.',
};

// The close of the funnel: what every business gets, whatever it sells.
export const close = {
  label: 'One team · every stage',
  head: 'Whatever you sell, we take CTRL.',
  line: 'Strategy, content, production, ads, websites, search and automation, run as one system for your business, from day one or from wherever you are today.',
};

// Clients for the keycap strip. img = a logo in /work/logos, otherwise the name is set in type.
export const clients: { name: string; img?: string }[] = [
  { name: 'Snapchat India' }, { name: 'Masters’ Union' }, { name: 'Dohful', img: 'dohful' }, { name: 'The Better Beings', img: 'tbb' },
  { name: 'Earavat Resort', img: 'earavat' }, { name: 'IONA.AI' }, { name: 'Corbett Machaan', img: 'machaan' }, { name: 'Omkarix Global Exim', img: 'omkarix' },
  { name: 'TestPrepKart' }, { name: 'Avinash Kumar' }, { name: 'Nachiket Bhatia' }, { name: 'The Good Parent' },
  { name: 'The Print Culture', img: 'printculture' }, { name: 'WanderLynk', img: 'wanderlynk' }, { name: 'Canopy & Sky', img: 'canopy' }, { name: 'Pushpak Tours', img: 'pushpak' },
  { name: 'The Digital Futur', img: 'digitalfutur' }, { name: 'Soho Shades' }, { name: 'Nyoma' }, { name: 'Robbin Motors' },
];

// Industries: one proof each, from the agency's case pages.
export const industries: { name: string; short: string; num: string; what: string; who: string; img: string }[] = [
  { name: 'Real estate', short: 'Real estate', num: '₹22.4Cr', what: 'qualified pipeline in 90 days, ₹2Cr+ homes', who: 'NCR developers and channel partners', img: 'show/real-estate/02' },
  { name: 'Hospitality & events', short: 'Hospitality', num: '1,784', what: 'WhatsApp enquiries at ₹13.42 each', who: 'Earavat Resort · Corbett Machaan · 73 Dotts', img: 'show/earavat-resort/01' },
  { name: 'D2C & e-commerce', short: 'D2C', num: '₹13.2L', what: 'sales in 28 days from ₹45K of ads', who: 'Dohful · The Better Beings · Soho Shades', img: 'show/dohful/01' },
  { name: 'Travel', short: 'Travel', num: '₹4.62', what: 'per WhatsApp chat, 10,694 chats in one campaign', who: 'WanderLynk · Canopy & Sky · Pushpak Tours', img: 'show/travel-operators/03' },
  { name: 'Creators & personal brands', short: 'Creators', num: '50M+', what: 'Instagram views for one creator', who: 'Nachiket Bhatia · Avinash Kumar · The Good Parent', img: 'show/nachiket-bhatia/01' },
  { name: 'Education', short: 'Education', num: '₹1,530', what: 'per booked call, down from ₹3,150', who: 'TestPrepKart · Masters’ Union · Explorer Academy', img: 'show/testprepkart/01' },
  { name: 'B2B, SaaS & AI', short: 'B2B & AI', num: '2 weeks', what: 'to a new website and brand for an AI hiring platform', who: 'IONA.AI · Omkarix Global Exim · The Digital Futur', img: 'show/iona-ai/01' },
  { name: 'Local businesses', short: 'Local', num: '2', what: 'salons found on Google with clean Business Profiles', who: 'Deeluxe Nails & Lashes · Robbin Motors · Devi Store', img: 'show/robbin-motors/01' },
];

// The team, by discipline. Each one is a keycap.
export const disciplines: [string, string][] = [
  ['Strategy', 'Business model, margins and the plan, before any channel'],
  ['Pre-production', 'Scripts, hooks, shot lists and casting'],
  ['Production', 'Shoots, podcasts and product films'],
  ['Post-production', 'Edits, reels, motion and sound'],
  ['Design', 'Brand, statics, thumbnails and ad creatives'],
  ['Performance', 'Meta, Google, Amazon and LinkedIn ads'],
  ['Web & engineering', 'Astro, Shopify, three.js and speed'],
  ['Search', 'SEO, AEO, GEO and Google Business'],
  ['Automation', 'Wati, WhatFlow, CRM and lead routing'],
];
export const teamStats: [string, string][] = [['6', 'years in the market'], ['34', 'clients'], ['8', 'industries'], ['1.09B', 'views on Snapchat']];

export const heroStats: [string, string][] = [
  ['1.09B', 'views on Snapchat'],
  ['50M+', 'Instagram views for one creator'],
  ['₹4.62', 'per WhatsApp chat, travel'],
  ['65 → 99', 'site speed, Omkarix'],
];

// The funnel, top to bottom. Each stage is a keyboard shortcut and a proof point.
export const stages = [
  { key: '1', name: 'Scroll', verb: 'Stop the scroll.', line: 'Reels, podcasts, YouTube and ad creatives that people actually finish.',
    proof: [['1.09B', 'views on Snapchat'], ['50M+', 'Instagram views, one creator'], ['3.9 crore', 'YouTube views in 28 days']] },
  { key: '2', name: 'Click', verb: 'Earn the click.', line: 'Fast websites and landing pages, found on Google and in AI answers.',
    proof: [['49 → 99', 'PageSpeed, NCR developer'], ['7 days', 'Omkarix, brief to launch'], ['2 weeks', 'IONA.AI rebuild']] },
  { key: '3', name: 'Lead', verb: 'Capture the lead.', line: 'Meta and Google campaigns judged on qualified leads, not cheap ones.',
    proof: [['₹4.62', 'per WhatsApp chat'], ['₹75', 'qualified lead, ₹2Cr+ homes'], ['₹96', 'per Maldives lead']] },
  { key: '4', name: 'Sale', verb: 'Turn interest into revenue.', line: 'WhatsApp flows, CRM and follow-up, so every enquiry gets an answer and every customer comes back.',
    proof: [['₹13.2L', 'Dohful sales in 28 days'], ['₹22.4Cr', 'real estate pipeline, 90 days'], ['₹1,530', 'per booked call, from ₹3,150']] },
] as const;

// Every service as a keycap: [label, proof, case slug]. Rows follow the funnel, then consultancy.
export const keyRows: { name: string; line: string; keys: [string, string, string][] }[] = [
  { name: 'Scroll', line: 'Content that stops the thumb', keys: [['Reels', 'Nachiket Bhatia', 'nachiket-bhatia'], ['Podcasts', 'Masters’ Union', 'masters-union'], ['YouTube', 'Avinash Kumar', 'avinash-kumar'], ['Shorts', 'Dr. Aakaar Kapoor', 'dr-aakaar-kapoor'], ['Thumbnails', 'Dr. Achin Mehra', 'dr-achin-mehra'], ['Product shoots', 'Soho Shades', 'soho-shades'], ['Social media', 'Nyoma', 'nyoma'], ['Personal brand', 'Adit Srivastava', 'adit-srivastava']] },
  { name: 'Click', line: 'Pages Google and ChatGPT cite', keys: [['Websites', 'Omkarix', 'omkarix-global-exim'], ['Shopify', 'The Better Beings', 'the-better-beings'], ['SEO', 'NCR real estate', 'real-estate'], ['AEO', 'Omkarix', 'omkarix-global-exim'], ['GEO', 'Earavat Resort', 'earavat-resort'], ['Google Business', 'Deeluxe Nails', 'deeluxe-nails'], ['Speed', 'NCR real estate', 'real-estate']] },
  { name: 'Lead', line: 'Ads judged on qualified leads', keys: [['Meta Ads', 'Travel operators', 'travel-operators'], ['Google Ads', 'TestPrepKart', 'testprepkart'], ['Amazon Ads', 'For D2C brands', ''], ['LinkedIn B2B', 'IONA.AI', 'iona-ai'], ['Ad creatives', 'Travel statics', 'travel-operators'], ['CAPI & pixel', 'NCR real estate', 'real-estate'], ['Lead forms', 'NCR real estate', 'real-estate']] },
  { name: 'Sale', line: 'Follow-up that closes', keys: [['Wati', 'Dohful', 'dohful'], ['WhatFlow', 'The Better Beings', 'the-better-beings'], ['Lead routing', 'NCR real estate', 'real-estate'], ['Weddings', 'Earavat Resort', 'earavat-resort'], ['Retreats', 'Corbett Machaan', 'corbett-machaan-resort'], ['Events & MICE', '73 Dotts', '73-dotts']] },
  { name: 'Strategy', line: 'Before any channel', keys: [['Business consultancy', 'From model and margins to the first campaign', 'the-better-beings']] },
];

// Featured work: real headlines and KPIs from the agency's case pages.
export type Work = { slug: string; client: string; sector: string; head: string; kpi: [string, string][]; img: string; tags: string[] };
export const work: Work[] = [
  { slug: 'real-estate', client: 'NCR real estate', sector: 'Developers & channel partners', head: '₹22.4Cr pipeline in 90 days for ₹2Cr+ homes.', kpi: [['₹22.4Cr', 'pipeline in 90 days'], ['₹75', 'qualified cost per lead']], img: 'show/real-estate/01', tags: ['Meta', 'CAPI', 'WhatsApp'] },
  { slug: 'dohful', client: 'Dohful', sector: 'Eggless cookies & coffee', head: '₹45K in ads became ₹13.2L in sales over one Diwali.', kpi: [['₹13.2L', 'sales in 28 days'], ['₹45K', 'ad spend']], img: 'show/dohful/01', tags: ['Instagram', 'Wati'] },
  { slug: 'travel-operators', client: 'Travel operators', sector: 'Travel · 15+ destinations', head: '10,694 WhatsApp conversations at ₹4.62 each.', kpi: [['10,694', 'chats, one campaign'], ['₹96', 'per Maldives lead']], img: 'show/travel-operators/01', tags: ['Meta', 'Creatives'] },
  { slug: 'nachiket-bhatia', client: 'Nachiket Bhatia', sector: 'Healthcare creator · Podcast', head: 'A podcast-to-reels engine that crossed 50M Instagram views.', kpi: [['50M+', 'Instagram views'], ['251K', 'followers']], img: 'show/nachiket-bhatia/01', tags: ['Reels', 'Podcast'] },
  { slug: 'the-better-beings', client: 'The Better Beings', sector: 'Electrolyte D2C · Shopify', head: 'Same sales on 12% less ad spend, then a new store and WhatsApp flows.', kpi: [['1.21x', 'ROAS, up from 1.11x'], ['+14%', 'average order value']], img: 'show/the-better-beings/01', tags: ['Shopify', 'Meta'] },
  { slug: 'omkarix-global-exim', client: 'Omkarix Global Exim', sector: 'Export house · New Delhi', head: 'A trusted website for a new exporter, built in seven days.', kpi: [['65 → 99', 'mobile speed'], ['7 days', 'to launch']], img: 'show/omkarix-global-exim/01', tags: ['Astro', 'SEO'] },
  { slug: 'avinash-kumar', client: 'Avinash Kumar', sector: 'YouTube · 4.68M subscribers', head: 'Channel management for a 4.68M-subscriber creator.', kpi: [['3.9 crore', 'views in 28 days'], ['900+', 'videos managed']], img: 'show/avinash-kumar/01', tags: ['YouTube'] },
  { slug: 'earavat-resort', client: 'Earavat Resort', sector: 'Resort · Jim Corbett', head: 'A resort website built to win weddings, retreats and direct stays.', kpi: [['1,784', 'WhatsApp enquiries'], ['95', 'mobile Lighthouse']], img: 'show/earavat-resort/01', tags: ['Web', 'Meta', 'Events'] },
  { slug: 'iona-ai', client: 'IONA.AI', sector: 'B2B SaaS · London', head: 'A new website and brand for an AI hiring platform, live in two weeks.', kpi: [['2 weeks', 'to a live website']], img: 'show/iona-ai/01', tags: ['Web', 'LinkedIn'] },
  { slug: 'the-good-parent', client: 'The Good Parent', sector: 'Parenting podcast', head: '1.63M Instagram views in 30 days for a parenting podcast.', kpi: [['1.63M', 'views in 30 days'], ['+4,079', 'followers']], img: 'show/the-good-parent/01', tags: ['Reels', 'Podcast'] },
];

// Agency case slugs that also have a page on this site (under /work/).
export const localCase: Record<string, string> = {
  'real-estate': 'lucentia-digital', dohful: 'dohful', 'travel-operators': 'travel', 'the-better-beings': 'the-better-beings',
  'omkarix-global-exim': 'web-and-motion', 'earavat-resort': 'machan-earavat', 'corbett-machaan-resort': 'machan-earavat', 'iona-ai': 'iona-ai',
};
export const caseHref = (slug: string) => (!slug ? '#contact' : localCase[slug] ? `/work/${localCase[slug]}/` : `${agency.url}/work/${slug}/`);
