export type SocialPlatform = 'facebook' | 'x' | 'instagram' | 'tiktok' | 'linkedin' | 'whatsapp'

export type SocialLink = {
  label: string
  href: string
  platform: SocialPlatform
}

export const siteConfig = {
  name: 'Tested & Trusted',
  shortName: 'T&T',
  tagline: 'Clearing and forwarding, Air/Sea/Land Freight, Dangerous Goods Transport and Distribution, Consolidation & Packaging; Consultancy.',
  phone: '+254 114 628 283',
  phoneHref: '+254114628283',
  email: 'Clearcrest24@gmail.com',
  address: 'Regen Complex First Floor - Suite B - Syokimau - Mombasa Road, Nairobi, P.O. Box 59355-00200 Nairobi.',
  hours: 'Mon - Sat: 8:00 AM - 6:00 PM',
  mapUrl:
    'https://www.google.com/maps?q=Syokimau+Mombasa+Road+Nairobi&output=embed',
  whatsappNumber: '254114628283',
  whatsappMessage: 'Hello, I would like a quote for my shipment.',
  disclaimer: 'Fast, reliable, and compliant freight support for businesses and individuals.',
  socials: [
    { label: 'Facebook', href: 'https://facebook.com', platform: 'facebook' },
    { label: 'X', href: 'https://x.com', platform: 'x' },
    { label: 'Instagram', href: 'https://instagram.com', platform: 'instagram' },
    { label: 'TikTok', href: 'https://tiktok.com', platform: 'tiktok' },
    { label: 'LinkedIn', href: 'https://linkedin.com', platform: 'linkedin' },
    { label: 'WhatsApp', href: 'https://wa.me/254114628283', platform: 'whatsapp' },
  ] as SocialLink[],
} as const
