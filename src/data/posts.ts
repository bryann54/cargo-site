export type BlogPost = {
  slug: string
  title: string
  excerpt: string
  date: string
  readTime: number
  category: string
  body: string[]
}

export const blogPosts: BlogPost[] = [
  {
    slug: 'import-clearing-kenya',
    title: 'Import clearing in Kenya: what to prepare before arrival',
    excerpt:
      'A practical guide to customs paperwork, duties, and delivery timing for new importers.',
    date: '18 Jul 2026',
    readTime: 6,
    category: 'Clearing',
    body: [
      'Before cargo arrives in Kenya, gather the commercial invoice, packing list, transport document and arrival notice. The exact document set depends on the goods and the current requirements for that shipment.',
      'Ask your supplier for clear item descriptions, quantities and values. Compare those details across the invoice and packing list. If the Bill of Lading or airway bill has already been issued, check that the consignee and cargo details match your records.',
      'An Import Declaration Form (IDF), Certificate of Conformity (COC), permits or other approvals may apply depending on the cargo. Confirm requirements with the relevant authorities or a licensed clearing agent before the goods ship.',
      'Share the origin, expected arrival date, cargo description and available documents with your clearing contact. This gives the team time to identify questions before the port or airport handoff.',
    ],
  },
  {
    slug: 'air-freight-vs-sea-freight',
    title: 'Air freight vs sea freight for fast-moving cargo',
    excerpt:
      'Compare transit time, cost, and documentation needs to choose the best mode for your shipment.',
    date: '03 Aug 2026',
    readTime: 5,
    category: 'Logistics',
    body: [
      'Air freight is often considered when shipment timing, cargo size or product handling makes a faster route important. Sea freight is commonly used for larger consignments where the sailing schedule and port handling fit the delivery plan.',
      'Compare the full route, not only the quoted freight charge. Include collection, origin handling, terminal charges, customs clearance and delivery to the final address. Ask whether the rate covers a full container or consolidated cargo.',
      'For either mode, share the cargo dimensions, weight, description, origin, destination and required arrival window when requesting options. Restricted or regulated goods may need additional permits and handling arrangements.',
      'Confirm transit estimates and charges with the carrier or forwarding team for the specific sailing or flight. Schedules, availability and customs processing can change.',
    ],
  },
  {
    slug: 'cold-chain-logistics',
    title: 'Maintaining a reliable cold chain for perishables',
    excerpt:
      'Learn how temperature control, monitoring, and route planning reduce product loss for exporters.',
    date: '11 Sep 2026',
    readTime: 7,
    category: 'Perishables',
    body: [
      'Fresh produce, flowers and other temperature-sensitive cargo need a plan that starts before collection. Confirm the product temperature range, packaging, expected handling time and the destination requirements with the buyer and carrier.',
      'Select packaging and refrigeration arrangements for the commodity and journey. Record the temperature setting and identify who checks the cargo at each handoff, including airport or port handling.',
      'Prepare export documents and any plant-health or destination-market certificates required for the specific goods. Requirements differ by commodity and destination, so verify them with the relevant authority before dispatch.',
      'Leave time for inspection and customs procedures. A realistic route plan should account for collection, terminal cut-offs, flight or vessel schedules and delivery at the other end.',
    ],
  },
  {
    slug: 'car-importation-regulations',
    title: 'Car importation: key Kenyan compliance checkpoints',
    excerpt:
      'A concise breakdown of duty, permit, and documentation checks before your vehicle arrives.',
    date: '22 Sep 2026',
    readTime: 4,
    category: 'Imports',
    body: [
      'Before buying a vehicle for import to Kenya, confirm the applicable age, inspection and registration requirements for that vehicle and the current rules in force. Requirements can change, so check with the relevant authorities or a licensed professional before purchase.',
      'Keep the purchase invoice, export certificate, original registration records and shipping document available. Confirm that the chassis and vehicle details are consistent across the records.',
      'Ask for a landed-cost estimate that separates freight, insurance, duties, taxes, inspection, port and agent charges. Do not rely on an estimate that omits its assumptions or the date it was prepared.',
      'Send the vehicle details, origin, expected arrival date and documents to your clearing contact early enough to identify missing information before the vessel arrives.',
    ],
  },
  {
    slug: 'warehouse-partnering',
    title: 'Why bonded warehousing improves cross-border planning',
    excerpt:
      'Flexible storage can reduce cost, improve inventory visibility, and simplify customs workflows.',
    date: '07 Oct 2026',
    readTime: 6,
    category: 'Warehousing',
    body: [
      'A warehouse can provide time to receive, sort or stage cargo before delivery. Before booking space, check the storage period, access arrangements, receiving hours and charges for handling or onward dispatch.',
      'Ask whether the facility is bonded or general storage and confirm what that means for your goods and customs status. Bonded storage is subject to specific customs rules; confirm eligibility and release steps with the relevant authority or licensed agent.',
      'Share the cargo dimensions, weight, packaging, storage duration and any temperature or security requirements. Agree how stock will be identified and who can authorise release.',
      'Include collection from the port or airport, warehouse receiving cut-offs and final delivery in the route plan. The right option depends on cargo, customs status and intended delivery date.',
    ],
  },
]
