export type SocialPlatform =
  'facebook' | 'x' | 'instagram' | 'tiktok' | 'linkedin' | 'whatsapp'

export type SocialLink = {
  label: string
  href: string
  platform: SocialPlatform
}
export type OpeningSlot = {
  days: readonly number[] // 0 = Sun … 6 = Sat
  opensAt: string // 24h "HH:mm", Africa/Nairobi time
  closesAt: string
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
    'Repen Complex First Floor - Suite B - Syokimau - Mombasa Road, Nairobi, P.O. Box 59355-00200 Nairobi.',
  hours: 'Mon - Fri: 8:00 AM - 6:00 PM · Sat: 9:00 AM - 1:00 PM',
  openingHours: [
    { days: [1, 2, 3, 4, 5], opensAt: '08:00', closesAt: '18:00' },
    { days: [6], opensAt: '09:00', closesAt: '13:00' },
  ] as readonly OpeningSlot[],
  mapUrl:
    'https://www.google.com/maps?q=-1.3785998,36.9282035&z=17&output=embed',
  mapLink:
    'https://www.google.com/maps/search/?api=1&query=-1.3785998,36.9282035',
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
    { label: 'TikTok', href: 'https://www.tiktok.com/@tested.trustedtt?_r=1&_t=ZS-9B5ex99VAJw', platform: 'tiktok' },
    { label: 'LinkedIn', href: 'https://linkedin.com', platform: 'linkedin' },
    {
      label: 'WhatsApp',
      href: 'https://wa.me/254114628283',
      platform: 'whatsapp',
    },
  ] as SocialLink[],
} as const
