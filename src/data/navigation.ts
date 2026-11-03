export type NavItem = { label: string; href: string }

export type ServiceGroup = {
  title: string
  items: { label: string; href: string }[]
}

export const navItems: NavItem[] = [
  { label: 'Home', href: '/' },
  { label: 'About Us', href: '/about' },
  { label: 'Services', href: '/services' },
  { label: 'Duty Calculator', href: '/duty-calculator' },
  { label: 'Partnerships', href: '/partnerships' },
  { label: 'Blogs', href: '/blogs' },
  { label: 'Contact Us', href: '/contact' },
]

export const serviceGroups: ServiceGroup[] = [
  {
    title: 'Clearing and Forwarding',
    items: [
      { label: 'General Cargo', href: '/services/general-cargo' },
      { label: 'Air Freight', href: '/services/air-freight' },
      { label: 'Sea Freight', href: '/services/ocean-freight' },
      { label: 'Road Freight', href: '/services/road-freight' },
      {
        label: 'Pharmaceuticals Logistics',
        href: '/services/pharmaceuticals-logistics',
      },
      {
        label: 'Perishables Logistics',
        href: '/services/perishables-logistics',
      },
    ],
  },
  {
    title: 'General',
    items: [
      { label: 'Car Importation & Clearing', href: '/services/car-importation' },
      { label: 'Warehousing Solutions', href: '/services/warehousing' },
      {
        label: 'Imports & Exports Consultancy',
        href: '/services/imports-exports-consultancy',
      },
      { label: 'Horticulture Exports', href: '/services/horticulture-exports' },
    ],
  },
  {
    title: 'Cargo Transportation',
    items: [
      {
        label: 'Road Cargo Transportation',
        href: '/services/road-cargo-transportation',
      },
      {
        label: 'Rail Cargo Transportation',
        href: '/services/rail-cargo-transportation',
      },
    ],
  },
]
