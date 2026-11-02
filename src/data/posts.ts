export type BlogPost = {
  slug: string
  title: string
  excerpt: string
  date: string
  readTime: number
  category: string
}

export const blogPosts: BlogPost[] = [
  {
    slug: 'import-clearing-kenya',
    title: 'Import clearing in Kenya: what to prepare before arrival',
    excerpt: 'A practical guide to customs paperwork, duties, and delivery timing for new importers.',
    date: '18 Jul 2026',
    readTime: 6,
    category: 'Clearing',
  },
  {
    slug: 'air-freight-vs-sea-freight',
    title: 'Air freight vs sea freight for fast-moving cargo',
    excerpt: 'Compare transit time, cost, and documentation needs to choose the best mode for your shipment.',
    date: '03 Aug 2026',
    readTime: 5,
    category: 'Logistics',
  },
  {
    slug: 'cold-chain-logistics',
    title: 'Maintaining a reliable cold chain for perishables',
    excerpt: 'Learn how temperature control, monitoring, and route planning reduce product loss for exporters.',
    date: '11 Sep 2026',
    readTime: 7,
    category: 'Perishables',
  },
  {
    slug: 'car-importation-regulations',
    title: 'Car importation: key Kenyan compliance checkpoints',
    excerpt: 'A concise breakdown of duty, permit, and documentation checks before your vehicle arrives.',
    date: '22 Sep 2026',
    readTime: 4,
    category: 'Imports',
  },
  {
    slug: 'warehouse-partnering',
    title: 'Why bonded warehousing improves cross-border planning',
    excerpt: 'Flexible storage can reduce cost, improve inventory visibility, and simplify customs workflows.',
    date: '07 Oct 2026',
    readTime: 6,
    category: 'Warehousing',
  },
]
