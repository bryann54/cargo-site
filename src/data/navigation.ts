export type NavItem = {
  label: string
  href: string
}

export const navItems: NavItem[] = [
  { label: 'Home', href: '/' },
  { label: 'About Us', href: '/about' },
  { label: 'Services', href: '/services' },
  { label: 'Partnerships', href: '/partnerships' },
  { label: 'Blogs', href: '/blogs' },
  { label: 'Contact Us', href: '/contact' },
]

export const serviceGroups = [
  {
    title: 'Global to Kenya Clearing',
    items: [
      'Clearing agents JKIA Nairobi',
      'Diplomatic Cargo Clearance',
      'X to Kenya Clearing',
      'Israel',
      'Netherlands',
      'China',
      'Egypt',
      'Europe',
      'Germany',
      'India',
      'Japan',
      'Korea',
      'Turkey',
      'UAE',
      'UK',
      'Russia',
    ],
  },
  {
    title: 'Clearing and Forwarding',
    items: [
      'General Cargo',
      'Air Freight',
      'Sea Freight',
      'Road Freight',
      'Pharmaceuticals Logistics',
      'Perishables Logistics',
    ],
  },
  {
    title: 'General',
    items: [
      'Car Importation & Clearing',
      'Warehousing Solutions',
      'Imports & Exports Consultancy',
      'Horticulture Exports',
      'Curio Exports & Logistics',
      'Medical Devices Importation',
    ],
  },
  {
    title: 'Cargo Transportation',
    items: ['Road Cargo Transportation', 'Rail Cargo Transportation'],
  },
]
