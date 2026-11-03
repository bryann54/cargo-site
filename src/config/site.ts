export type SocialPlatform =
  'facebook' | 'x' | 'instagram' | 'tiktok' | 'linkedin' | 'whatsapp'

export type SocialLink = {
  label: string
  href: string
  platform: SocialPlatform
}

export const siteConfig = {
  name: 'Tested & Trusted',
  shortName: 'T&T',
  tagline:
    'Clearing and forwarding, Air/Sea/Land Freight, Dangerous Goods Transport and Distribution, Consolidation & Packaging; Consultancy.',
  phone: '+254 114 628 283',
  phoneHref: '+254114628283',
  email: 'Clearcrest24@gmail.com',
  expectedReply:
    'We will reply by email or WhatsApp after reviewing the shipment details.',
  address:
    'Regen Complex First Floor - Suite B - Syokimau - Mombasa Road, Nairobi, P.O. Box 59355-00200 Nairobi.',
  hours: 'Mon - Sat: 8:00 AM - 6:00 PM',
  openingHours: {
    weekdays: [1, 2, 3, 4, 5, 6],
    opensAt: '08:00',
    closesAt: '18:00',
  },
  mapUrl:
    'https://www.google.com/maps?q=Syokimau+Mombasa+Road+Nairobi&output=embed',
  whatsappNumber: '254114628283',
  whatsappMessage: 'Hello, I would like a quote for my shipment.',
  disclaimer:
    'Service and document requirements depend on the shipment and current regulations.',
  socials: [
    { label: 'Facebook', href: 'https://facebook.com', platform: 'facebook' },
    { label: 'X', href: 'https://x.com', platform: 'x' },
    {
      label: 'Instagram',
      href: 'https://instagram.com',
      platform: 'instagram',
    },
    { label: 'TikTok', href: 'https://tiktok.com', platform: 'tiktok' },
    { label: 'LinkedIn', href: 'https://linkedin.com', platform: 'linkedin' },
    {
      label: 'WhatsApp',
      href: 'https://wa.me/254114628283',
      platform: 'whatsapp',
    },
  ] as SocialLink[],
} as const
