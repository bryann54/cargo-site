export type Service = {
  slug: string
  title: string
  category: 'Global to Kenya' | 'Clearing & Forwarding' | 'General' | 'Cargo Transportation'
  summary: string
  overview: string
  benefits: string[]
  process: string[]
  faqs: { question: string; answer: string }[]
}

export const services: Service[] = [
  {
    slug: 'air-freight',
    title: 'Air Freight',
    category: 'Clearing & Forwarding',
    summary: 'Fast, dependable cargo movement for urgent shipments and time-sensitive goods.',
    overview: 'Air freight helps businesses reduce delivery lead times and maintain tight schedules across regional and international corridors. Our team coordinates export and import documentation, airport handling, and delivery coordination from origin to final destination.',
    benefits: ['Priority transit planning', 'Door-to-door coordination', 'Customs documentation support'],
    process: ['Confirm shipment schedule and cargo profile', 'Prepare export/import documents and permits', 'Coordinate air handling and customs clearances', 'Deliver to final consignee'],
    faqs: [
      { question: 'When is air freight best?', answer: 'It is ideal for high-value, urgent, or temperature-sensitive cargo where speed matters more than cost.' },
      { question: 'Do you handle documentation?', answer: 'Yes. We manage air waybills, customs declarations, and compliance checks for import and export shipments.' },
    ],
  },
  {
    slug: 'ocean-freight',
    title: 'Ocean Freight',
    category: 'Clearing & Forwarding',
    summary: 'Budget-friendly sea cargo solutions for full and consolidated shipments.',
    overview: 'Sea freight remains the most cost-effective option for large volumes and non-urgent supply chains. We plan freight bookings, manage customs release, and ensure cargo moves smoothly through ports and inland routes.',
    benefits: ['Cost-efficient large-volume shipping', 'Port-to-door coordination', 'Consolidation and scheduling support'],
    process: ['Assess cargo size, destination and timeline', 'Book space with preferred partners', 'Clear customs and port handling', 'Coordinate inland delivery'],
    faqs: [
      { question: 'Can you handle FCL and LCL?', answer: 'Yes. We support both full container loads and consolidated cargo shipments with documentation and tracking support.' },
    ],
  },
  {
    slug: 'general-cargo',
    title: 'General Cargo',
    category: 'Clearing & Forwarding',
    summary: 'Flexible logistics support for mixed cargo, general imports and exports.',
    overview: 'We support diverse cargo movements across air, sea and road channels with a focus on safe handling, accurate documentation and efficient delivery. Our team manages coordination from origin through customs release.',
    benefits: ['Single point of contact', 'Reliable pickup and delivery', 'Cross-modal coordination'],
    process: ['Collect cargo requirements', 'Arrange transport and documentation', 'Clear customs and release goods', 'Track and finalise delivery'],
    faqs: [
      { question: 'Do you handle mixed cargo?', answer: 'Yes. We coordinate multiple cargo types, including industrial goods, retail merchandise and project loads.' },
    ],
  },
  {
    slug: 'pharmaceuticals-logistics',
    title: 'Pharmaceuticals Logistics',
    category: 'Clearing & Forwarding',
    summary: 'Regulated handling for medical and health-related shipments.',
    overview: 'Our pharmaceutical logistics service prioritises temperature control, traceability and compliance for time-sensitive healthcare products. We help clients move materials through regulatory checks and final mile delivery without delays.',
    benefits: ['Cold chain visibility', 'Regulatory compliance support', 'Secure handling and monitoring'],
    process: ['Review regulatory requirements and product profile', 'Plan temperature-controlled movement', 'Handle clearance and handoff', 'Track delivery until receipt'],
    faqs: [
      { question: 'Do you support temperature-controlled medicine shipments?', answer: 'Yes. We arrange compliance-friendly handling and monitoring for cold chain and sensitive healthcare cargo.' },
    ],
  },
  {
    slug: 'perishables-logistics',
    title: 'Perishables Logistics',
    category: 'Clearing & Forwarding',
    summary: 'Reliable movement for fresh produce, flowers, and other time-sensitive goods.',
    overview: 'Perishable goods need careful coordination, rapid customs timing and strict handling standards. We support exporters and importers with cold-chain planning, timely release and delivery sequencing.',
    benefits: ['Cold-chain coordination', 'Rapid turnaround support', 'Inventory-safe movement'],
    process: ['Check product handling needs', 'Schedule transport and temperature monitoring', 'Navigate customs and release', 'Deliver quickly to destination'],
    faqs: [
      { question: 'Can you handle fresh produce export?', answer: 'Yes. We support exporters moving horticulture and fresh produce with temperature-safe coordination.' },
    ],
  },
  {
    slug: 'road-freight',
    title: 'Road Freight',
    category: 'Clearing & Forwarding',
    summary: 'Flexible distribution and regional haulage across East Africa and beyond.',
    overview: 'Road freight is essential for regional distribution, last-mile delivery and bonded cargo movements. We coordinate route planning, transit documents and dependable delivery across key commercial corridors.',
    benefits: ['Regional coverage', 'Flexible scheduling', 'Door-to-door service'],
    process: ['Confirm route and cargo details', 'Arrange vehicle and documentation', 'Track transit and customs checkpoints', 'Complete final delivery'],
    faqs: [
      { question: 'Do you support cross-border trucking?', answer: 'Yes. We coordinate regional road cargo movements and customs constraints for efficient cross-border transit.' },
    ],
  },
  {
    slug: 'car-importation',
    title: 'Car Importation & Clearing',
    category: 'General',
    summary: 'Full support for vehicle clearing, compliance checks, and delivery.',
    overview: 'Importing a vehicle to Kenya involves detailed paperwork, permits and customs coordination. We simplify the process with end-to-end support from documentation to final handover.',
    benefits: ['Customs compliance guidance', 'Vehicle release support', 'Final delivery coordination'],
    process: ['Review import details and requirements', 'Confirm documentation and duty planning', 'Clear customs and release vehicle', 'Arrange delivery to the owner'],
    faqs: [
      { question: 'Do you help with vehicle duty planning?', answer: 'Yes. We help map out the documentation flow and customs requirements before arrival.' },
    ],
  },
  {
    slug: 'warehousing',
    title: 'Warehousing Solutions',
    category: 'General',
    summary: 'Secure storage and inventory planning for B2B supply chains.',
    overview: 'Our warehousing support helps importers and exporters manage stock, staging, and timely dispatch. From bonded to general storage, we plan for efficient handling and replenishment.',
    benefits: ['Flexible storage options', 'Inventory visibility', 'Fast dispatch coordination'],
    process: ['Assess site and handling needs', 'Assign stock or bonded area', 'Coordinate intake and dispatch', 'Support onward movement'],
    faqs: [
      { question: 'Can you support short-term storage?', answer: 'Yes. We provide short and medium-term solutions depending on your operational needs.' },
    ],
  },
  {
    slug: 'imports-exports-consultancy',
    title: 'Imports & Exports Consultancy',
    category: 'General',
    summary: 'Expert guidance for compliant and efficient global trade planning.',
    overview: 'Trade policy, market requirements and cargo documentation can be complex. Our consultants help businesses structure their import and export process for smoother customs and commercial outcomes.',
    benefits: ['Strategic trade guidance', 'Process optimisation', 'Risk-aware planning'],
    process: ['Review cargo and market requirements', 'Map out documentation and compliance steps', 'Coordinate execution with freight teams', 'Monitor ongoing shipment support'],
    faqs: [
      { question: 'Who do you advise?', answer: 'We work with importers, exporters, manufacturers and traders seeking practical cargo and compliance support.' },
    ],
  },
  {
    slug: 'horticulture-exports',
    title: 'Horticulture Exports',
    category: 'General',
    summary: 'Specialist support for fresh produce export planning and handling.',
    overview: 'Fresh produce demands careful handling, documentation and timing. We support horticulture exporters with route planning, cold-chain coordination, and customs processes that keep loads moving.',
    benefits: ['Cold chain planning', 'Market-ready coordination', 'Reduced delays for fresh cargo'],
    process: ['Assess crop and destination requirements', 'Prepare handling and documentation', 'Coordinate export logistics and clearance', 'Deliver into market distribution'],
    faqs: [
      { question: 'Do you support export compliance?', answer: 'Yes. We help manage export paperwork and required logistics coordination for horticultural cargo.' },
    ],
  },
  {
    slug: 'road-cargo-transportation',
    title: 'Road Cargo Transportation',
    category: 'Cargo Transportation',
    summary: 'Regional road haulage for commercial and industrial cargo.',
    overview: 'Our road cargo team handles dependable transit for retailers, manufacturers and wholesalers that need flexible distribution and secure movements across the region.',
    benefits: ['Scheduled regional transport', 'Load secure handling', 'Last-mile efficiency'],
    process: ['Confirm cargo and route requirements', 'Assign vehicle and manifests', 'Monitor transit and handoff', 'Finalize destination delivery'],
    faqs: [
      { question: 'Do you do regional freight?', answer: 'Yes. We support regional cargo runs across East Africa and important commercial routes.' },
    ],
  },
  {
    slug: 'rail-cargo-transportation',
    title: 'Rail Cargo Transportation',
    category: 'Cargo Transportation',
    summary: 'Cost-conscious transport for bulk cargo and intermodal planning.',
    overview: 'Rail freight is well suited for heavier or bulk cargo flows when combined with final road delivery. We help coordinate booking, handoff and consolidation with the wider logistics chain.',
    benefits: ['Bulk cargo efficiency', 'Intermodal coordination', 'Stable transit planning'],
    process: ['Assess cargo volume and route', 'Coordinate rail booking and handoff', 'Support transfer planning', 'Complete final delivery'],
    faqs: [
      { question: 'Is rail suitable for all cargo?', answer: 'It works best for larger or bulk shipments where cost efficiency and predictable schedules are priorities.' },
    ],
  },
]

export const featureServices = [
  { slug: 'general-cargo', title: 'General Cargo', badge: 'Get a Quote' },
  { slug: 'pharmaceuticals-logistics', title: 'Pharmaceuticals', badge: 'Speak to Expert' },
  { slug: 'horticulture-exports', title: 'Horticulture Exports', badge: 'Start Export Process' },
]

export const xToKenyaServices = [
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
]
