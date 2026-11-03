import heroAirImage from '@/assets/hero-air.jpg'
import heroGeneralImage from '@/assets/hero-general.jpg'
import heroRoadImage from '@/assets/hero-road.jpg'
import heroSeaImage from '@/assets/hero-sea.jpg'
import serviceGeneralCargoImage from '@/assets/service-general-cargo.jpg'
import serviceHorticultureImage from '@/assets/service-horticulture.jpg'
import servicePharmaceuticalsImage from '@/assets/service-pharmaceuticals.jpg'

export const heroSlides = [
  {
    title: 'Cargo moving through Kenya starts with the right paperwork.',
    subtitle:
      'We help importers prepare documents, coordinate customs clearance and plan transport through JKIA and Mombasa Port.',
    badge: 'JKIA · Mombasa Port · Nairobi',
    image: heroGeneralImage,
  },
  {
    title: 'Air cargo, with the arrival details checked first.',
    subtitle:
      'Share your airway bill and invoice so the clearance steps can be reviewed before collection.',
    badge: 'Air freight · JKIA',
    image: heroAirImage,
  },
  {
    title: 'Sea freight from port release to the next leg.',
    subtitle:
      'We coordinate clearance documents and onward movement for shipments arriving through Mombasa Port.',
    badge: 'Sea freight · Mombasa',
    image: heroSeaImage,
  },
  {
    title: 'Road freight planned around the route and the load.',
    subtitle:
      'Tell us where the cargo starts, where it is going and what needs to travel with it.',
    badge: 'Road freight · East Africa',
    image: heroRoadImage,
  },
]

export const whyChooseUs = [
  'Check documents before cargo arrives',
  'Coordinate with the relevant port or airport team',
  'Share the next step when a document is missing',
  'Arrange onward transport when clearance is complete',
]

export const homeServiceCards = [
  {
    title: 'General Cargo',
    description:
      'For goods moving by air, sea or road. Start with the route and cargo details.',
    slug: 'general-cargo',
    image: serviceGeneralCargoImage,
  },
  {
    title: 'Pharmaceuticals',
    description:
      'Temperature-sensitive handling built for compliance and reliability.',
    slug: 'pharmaceuticals-logistics',
    image: servicePharmaceuticalsImage,
  },
  {
    title: 'Horticulture Exports',
    description:
      'Fresh produce export support designed around fast turnaround and quality control.',
    slug: 'horticulture-exports',
    image: serviceHorticultureImage,
  },
]

export const moreServices = [
  {
    title: 'Perishables & Horticulture',
    subtitle: 'Cold chain support from dispatch to destination',
    slug: 'perishables-logistics',
  },
  {
    title: 'Medical Equipment Importation',
    subtitle: 'Regulated movement for health-critical inventory',
    slug: 'pharmaceuticals-logistics',
  },
  {
    title: 'Cargo Transportation',
    subtitle: 'Regional and cross-border road hauled freight',
    slug: 'road-cargo-transportation',
  },
  {
    title: 'Car Importation & Clearing',
    subtitle: 'Complete vehicle import processing and customs release',
    slug: 'car-importation',
  },
  {
    title: 'Warehousing',
    subtitle: 'Secure storage for goods awaiting dispatch or consolidation',
    slug: 'warehousing',
  },
  {
    title: 'Imports & Exports Consultancy',
    subtitle: 'Practical planning for customs and global trade operations',
    slug: 'imports-exports-consultancy',
  },
]

export const quoteOptions = [
  'General Cargo Clearing & Forwarding',
  'Sea Freight',
  'Road Freight',
  'Pharmaceuticals Logistics',
  'Perishables Logistics',
  'Road Cargo Transportation',
  'Rail Cargo Transportation',
  'Car Importation & Clearing',
  'Warehousing',
  'Imports and Exports Consultancy',
  'Horticulture Exports',
  'Curio Exports and Logistics',
]

export const shippingSteps = [
  {
    title: 'Send the details',
    detail: 'You provide cargo type, route, arrival date and the documents you have.',
  },
  {
    title: 'Review the documents',
    detail: 'We identify missing information and the checks to confirm for the cargo.',
  },
  {
    title: 'Coordinate the handoff',
    detail: 'We agree on the clearance and transport steps with you.',
  },
  {
    title: 'Confirm delivery',
    detail: 'We keep the contact route clear through the final delivery handoff.',
  },
]
