// Everything on the site comes from here. Source of truth: Abhay's CV (~/Desktop/CV 2026/Abhay_Mehta_CV_PM.tex, draft 3).
// Keep numbers identical to the CV so a recruiter who reads both sees the same story.

export const me = {
  name: 'Abhay Mehta',
  role: 'Performance Marketing · SEO & AI Search · AdTech · Automation',
  short: 'Performance marketer who codes.',
  email: 'abhaynmehta03@gmail.com',
  phone: '+91 95996 49609',
  wa: '919599649609',
  linkedin: 'https://www.linkedin.com/in/abhay-mehta-4b93a2206/',
  github: 'https://github.com/abhaynmehta',
  // Search result description (under 160 characters): who, where, proof.
  seo: 'Abhay Mehta, performance marketer in Delhi NCR: ₹1.4 Cr+ bookings on ₹1.2L of ads, 28.9x ROAS, ₹22.4 Cr+ pipeline. Meta, Google, DV360, SEO and AI search.',
  city: 'Delhi NCR, India',
  cv: '/Abhay_Mehta_CV.pdf',
  summary:
    'Performance marketing specialist and AdTech professional with 5+ years of experience and 40+ clients across real estate, D2C, hospitality, travel, EdTech, Fintech and B2B SaaS. I have managed ₹5 Crore+ in ad spend across Meta, Google, DV360 and Snapchat, have run monthly budgets of ₹50 Lakh to ₹1 Crore, and today oversee a ₹50 Lakh+ monthly digital budget for a luxury NCR developer. With a B.Tech in Computer Science, I build my own tracking, automation and AI tools.',
};

export const stats: [string, string][] = [
  ['₹5 Cr+', 'ad spend managed'],
  ['₹1 Cr', 'monthly budget, the most I have run'],
  ['40+', 'clients across 8 industries'],
  ['5+', 'years in performance marketing'],
];

export type Role = {
  slug: string;
  title: string;
  org: string;
  sector: string;
  dates: string;
  current?: boolean;
  points: string[];
  metrics?: [string, string][];
  media?: string[];   // paths under /work (images) or 'video:<path>' (mp4 + jpg poster)
  tags: string[];
};

// Order and wording follow the CV: every role and client is its own entry.
export const roles: Role[] = [
  {
    slug: 'county-group', title: 'Digital Marketing Associate, SEO and Performance', org: 'County Group', sector: 'Luxury real estate developer · Delhi NCR', dates: '08/2026 – Present', current: true,
    points: [
      'Oversee a ₹50 Lakh+ monthly budget (Meta, Google, DV360, MagicBricks, Uber) for 6 luxury projects with an 8 member team.',
      'Led digital for the Cocoa County pre-launch (₹4,500 Crore GDV): evaluated 16 platforms and onboarded Google DV360, Uber and MagicBricks; Cocoa delivered 108 of 168 qualified leads in its first month.',
      'Lifted Cocoa Meta lead qualification to 17.9% (account average 5.9%) and cut Meta CPL by 15.7% in one month.',
      'Own SEO, AEO and GEO across 16 websites: organic leads up 19.3%, branded clicks up 33.4% and ChatGPT referrals up 18% in one month; organic leads qualify at up to 45%.',
      'Built Python and AI tools (blog audit checker, weekly site and lead form health check) that save about 20 hours of QC a month.',
    ],
    metrics: [['₹50L+', 'monthly budget'], ['17.9%', 'Meta lead qualification'], ['16', 'websites on SEO, AEO, GEO'], ['~20 h', 'QC saved a month']],
    tags: ['Meta', 'Google', 'DV360', 'SEO', 'AEO', 'GEO', 'Python'],
  },
  {
    slug: 'the-better-beings', title: 'Performance Marketing and Web Consultant', org: 'The Better Beings', sector: 'D2C wellness brand · Shopify', dates: 'Project',
    points: [
      'Rebuilt Meta Ads into three focused campaigns: same sales on 12% less spend, AOV up 14%, store visitors up 56%.',
      'Rebuilt the Shopify storefront mobile first for a 90% mobile audience: premium product pages, sticky add to cart, and benefit and trust blocks in the buy box.',
      'Launched WhatsApp automation for abandoned checkout, orders, shipping, back in stock, reorders and reviews.',
    ],
    metrics: [['−12%', 'spend, same sales'], ['+14%', 'average order value'], ['+56%', 'store visitors']],
    media: ['show/the-better-beings/01.webp', 'show/the-better-beings/02.webp', 'show/the-better-beings/03.webp'],
    tags: ['Shopify', 'Meta Ads', 'WhatsApp', 'Creatives'],
  },
  {
    slug: 'lucentia-digital', title: 'Senior Performance Marketer', org: 'Lucentia Digital', sector: 'Real estate performance marketing agency · NCR', dates: '03/2026 – 06/2026',
    points: [
      'Managed 12+ active client accounts simultaneously across premium NCR real estate, with a combined ad spend of ₹30 Lakh+ across 50+ campaigns in three months.',
      'Contributed to a total qualified sales pipeline of ₹22.4 Crore+ across active real estate accounts in a 90 day period, with 44% lead to site visit against an 8% industry average.',
      'Built and deployed Wati WhatsApp chatbot flows for 6+ projects covering lead qualification, hot, warm and cold tagging, automated brochure delivery, and 1 day and 3 day inactivity nurture sequences.',
      'Configured Meta Conversion API, offline conversion tracking and lookalikes from verified buyer lists; produced 60 day strategy documents, campaign audits and proposals for ultra luxury inventory above ₹8 Crore.',
    ],
    metrics: [['₹22.4 Cr+', 'qualified pipeline, 90 days'], ['44%', 'lead to site visit'], ['12+', 'accounts at once'], ['₹30L+', 'spend in three months']],
    media: ['show/real-estate/01.webp', 'show/real-estate/02.webp', 'show/robbin-motors/01.webp'],
    tags: ['Meta CAPI', 'Wati', 'Real estate'],
  },
  {
    slug: 'machan-earavat', title: 'Paid Media and Automation Consultant', org: 'Machan Corbett Resort & Earavat Resort', sector: 'Hospitality · Jim Corbett', dates: '08/2025 – 02/2026',
    points: [
      'Generated ₹1.4 Crore+ in confirmed direct bookings on ₹1,20,000 total ad spend, a 116x return on ad spend.',
      'Grew direct booking share from 18% to 41% by routing campaign traffic to WhatsApp instead of OTA platforms.',
      'Built a WhatsApp concierge automation with instant brochure delivery and lead pre-qualification, reaching a 22% WhatsApp to booking conversion rate against a 4 to 8% hospitality benchmark.',
      'Ran separate campaign structures per revenue stream: leisure stays, destination weddings (₹18 Lakh average ticket), corporate retreats (₹6 Lakh average group booking) and wildlife packages that sold out the quarterly allocation.',
      'Built a new 14 page Earavat website, one page per search intent, with structured data, llms.txt and FAQs for Google and AI answers; 95 mobile Lighthouse.',
    ],
    metrics: [['₹1.4 Cr+', 'direct bookings'], ['116x', 'return on ad spend'], ['18% → 41%', 'direct booking share'], ['22%', 'WhatsApp to booking']],
    media: ['hosp/weddings.webp', 'show/earavat-resort/01.webp', 'hosp/retreats.webp'],
    tags: ['Meta Ads', 'WhatsApp', 'Weddings', 'Retreats', 'SEO'],
  },
  {
    slug: 'iona-ai', title: 'Website, brand and LinkedIn', org: 'IONA.AI', sector: 'B2B SaaS · London', dates: '05/2025 – 08/2025',
    points: [
      'Led a full scale website and branding revamp to align with enterprise buyers.',
      'Built and optimised LinkedIn profiles for the founders with thought-leadership content.',
      'Delivered SEO friendly, conversion focused copy and UI/UX within 2 weeks.',
    ],
    media: ['show/iona-ai/01.webp', 'show/iona-ai/03.webp', 'show/iona-ai/05.webp'],
    tags: ['Website', 'Brand', 'LinkedIn'],
  },
  {
    slug: 'dohful', title: 'Social and paid growth', org: 'Dohful', sector: 'F&B brand · handcrafted cookies', dates: '07/2024 – 01/2025',
    points: [
      'Designed and executed a high engagement Instagram strategy for a premium handcrafted cookie brand: followers 22K to 27K and 2.24M views in a month.',
      'Ran the Diwali paid campaign: ₹45,000 ad spend to ₹13.2 Lakh revenue in 28 days, 28.9x ROAS.',
      'Developed a cohesive brand identity and storytelling formats; 28% of Diwali buyers reordered within 45 days.',
    ],
    metrics: [['₹13.2L', 'revenue in 28 days'], ['28.9x', 'ROAS'], ['28%', 'reordered in 45 days']],
    media: ['show/dohful/01.webp', 'video:drive/dohful/11', 'show/dohful/03.webp'],
    tags: ['Instagram', 'Meta Ads', 'Brand'],
  },
  {
    slug: 'travel', title: 'Meta Ads Consultant, Travel and Tourism', org: '12+ tour operators', sector: 'WanderLynk, WanderMesh, Canopy & Sky, The Travel Masters', dates: '2024 – 2026',
    points: [
      'Generated 10,500+ international trip enquiries on Meta for Bali, Maldives, Mauritius, Thailand, Vietnam and Dubai.',
      'Best results: 1,471 Bali leads at ₹50, 183 Maldives leads at ₹96 (about $1 a lead) and group trips at ₹37 CPL.',
      'Ran Meta lead engines and landing websites: 10,694 WhatsApp chats at ₹4.62 in one campaign, 3,853 leads at ₹36.67 and 1,025 Vietnam leads at ₹44.87.',
      'Built statics, video ads and landing websites in house, in feed and reel formats.',
    ],
    metrics: [['10,500+', 'trip enquiries'], ['₹50', 'per Bali lead'], ['$1', 'per Maldives lead'], ['₹4.62', 'per WhatsApp chat']],
    media: ['video:ads/reel-mauritius', 'ads/static-01.webp', 'show/travel-operators/03.webp', 'video:ads/reel-maldives'],
    tags: ['Meta Ads', 'Lead gen', 'Video ads'],
  },
  {
    slug: 'web-and-motion', title: 'Web development and motion design', org: 'Omkarix Global Exim, The Good Parent', sector: 'Websites and brand films', dates: 'Projects',
    points: ['Built SEO ready websites with motion design and a brand film (Astro, GSAP, Cloudflare); Omkarix mobile speed went from 65 to 99, with answer-first copy and structured data for GEO and an SEO score of 100.'],
    metrics: [['65 → 99', 'Omkarix mobile speed'], ['100', 'SEO score']],
    media: ['show/omkarix-global-exim/01.webp', 'video:motion/omkarix-brand-film', 'show/omkarix-global-exim/03.webp'],
    tags: ['Astro', 'GSAP', 'Cloudflare', 'Motion'],
  },
  {
    slug: 'testprepkart', title: 'Paid search and email', org: 'TestPrepKart', sector: 'EdTech · global', dates: 'Project',
    points: ['Search, Performance Max, Meta and email nurture: cost per call ₹3,150 to ₹1,530, and 3.1x call volume in 90 days.'],
    metrics: [['₹3,150 → ₹1,530', 'cost per call'], ['3.1x', 'call volume, 90 days']],
    tags: ['Google Ads', 'Performance Max', 'Email'],
  },
  {
    slug: 'the-print-culture', title: 'Brand and paid growth', org: 'The Print Culture', sector: 'D2C · Canada', dates: 'Project',
    points: ['Brand, Meta Ads and LinkedIn: blended CAC cut from ₹2,000 to ₹700, 4.8x peak ROAS, and 22% of orders by referral.'],
    metrics: [['₹2,000 → ₹700', 'blended CAC'], ['4.8x', 'peak ROAS']],
    tags: ['Meta Ads', 'LinkedIn', 'Brand'],
  },
  {
    slug: 'avinash-kumar', title: 'YouTube channel management', org: 'Avinash Kumar', sector: 'YouTube · 4.68M subscribers', dates: 'Retainer',
    points: ['Channel management: 3.9 Crore views in 28 days and 27.3 Lakh in 48 hours, with a creative team across 900+ videos.'],
    metrics: [['3.9 Cr', 'views in 28 days']],
    tags: ['YouTube', 'Content'],
  },
  {
    slug: 'deeluxe', title: 'Local SEO and Meta Ads', org: 'Deeluxe Nails & Lashes', sector: 'Local business · two salons', dates: 'Project',
    points: ['Google Business Profile and Meta Ads for two salons, rated 4.8 and 4.5 stars on Google.'],
    tags: ['Google Business Profile', 'Local SEO', 'Meta Ads'],
  },
  {
    slug: 'snapchat', title: 'Product Operations & Content Analyst Intern', org: 'Snapchat India', sector: 'Lenses and Communities', dates: '05/2023 – 02/2024',
    points: [
      'Created viral Snapchat lenses that crossed 1.09 billion views and 92 crore plays.', // updated from the Snapchat dashboard, Oct 2026
      'Performed feature testing, flow validation and issue reporting for the Communities beta, used by millions daily.',
      'Received a Letter of Recommendation for performance and reliability.',
    ],
    metrics: [['1.09B', 'lens views'], ['92 Cr', 'plays'], ['LoR', 'from Snapchat']],
    tags: ['Lenses', 'QA', 'Product ops'],
  },
  {
    slug: 'gems-vault', title: 'Social Media & Content Manager', org: 'Gems Vault', sector: 'Political analyst and celebrity astrologer', dates: '08/2023 – 10/2023',
    points: ['Took two personal brands from sporadic posts to 3 to 4 a week, adding 2K followers; edited videos and reels.'],
    tags: ['Social', 'Video'],
  },
  {
    slug: 'lets-confront', title: 'Podcast Manager', org: 'Let’s Confront Podcast', sector: 'Podcast', dates: '03/2021 – Present',
    points: ['Run 50+ episodes end to end (editing, reels, visual identity, YouTube and Instagram) with 10+ expert guests.'],
    tags: ['Podcast', 'YouTube'],
  },
];

// Smaller engagements, kept as their own entries as on the CV.
export const more: [string, string][] = [
  ['Chinese creator in India', '400+ cross-cultural content videos in 90 days across 8 accounts, including 5 TikTok handles.'],
  ['Adit Srivastava, actor-model', 'Six month personal brand build: Instagram visual identity, vlog edits, reel covers and thumbnails.'],
  ['INKLORE Tattoo', 'Three scripted reels and a hyperlocal performance campaign for a new studio launch in Noida.'],
  ['Dubai-based marketer', 'LinkedIn personal branding at 4 to 5 posts a week, with the profile rewritten for recruiter search.'],
  ['Albelee Skincare', '90 day brand sprint: an identity blending tradition and modern appeal, plus a storytelling launch campaign.'],
];

export const skills: [string, string[]][] = [
  ['Meta Ads', ['ABO / CBO', 'Advantage+', 'CAPI', 'Pixel', 'Offline conversions']],
  ['Google Ads', ['Search', 'Performance Max', 'Demand Gen', 'RLSA', 'YouTube']],
  ['Programmatic & partners', ['DV360', 'Taboola', 'MagicBricks', 'Uber Ads', 'LinkedIn Ads', 'Snapchat Ads']],
  ['SEO & AI search', ['Technical SEO', 'Schema', 'Core Web Vitals', 'AEO', 'GEO', 'AI Overviews']],
  ['WhatsApp & CRM', ['Wati', 'Chatbot flows', 'Lead tagging', 'Nurture sequences', 'LeadsBridge', 'Farvision']],
  ['Analytics', ['GA4', 'Search Console', 'GTM', 'UTM attribution', 'CPL benchmarking']],
  ['Build', ['Python', 'React', 'Astro', 'Shopify', 'Claude Code', 'Local LLMs']],
];

export const education = [
  ['B.Tech, Computer Science and Engineering', 'Guru Gobind Singh Indraprastha University', '2020 – 2024', 'CGPA 8.3'],
  ['Class XII', 'Manav Rachna International School', '2020', ''],
];

export const films = [
  { src: 'motion/minimalist-spf50-spec', title: 'Minimalist SPF 50' },
  { src: 'motion/mokobara-zero-digging-spec', title: 'Mokobara' },
  { src: 'motion/sol-de-janeiro-spec', title: 'Sol de Janeiro' },
  { src: 'motion/perfora-purple-cancels-yellow-spec', title: 'Perfora' },
  { src: 'motion/youthiapa-raised-right-spec', title: 'Youthiapa' },
  { src: 'motion/sult-season-your-water', title: 'Sult' },
  { src: 'motion/olaplex-no7-spec', title: 'Olaplex No.7' },
  { src: 'motion/sleepy-owl-five-more-minutes-spec', title: 'Sleepy Owl' },
  { src: 'motion/summer-fridays-spec', title: 'Summer Fridays' },
];
