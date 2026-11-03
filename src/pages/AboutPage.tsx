import { Button } from '@/components/ui/button'
import { Link } from 'react-router-dom'
import heroGeneralImage from '@/assets/hero-general.jpg'
import founderImage from '@/assets/service-medical.jpg' // Placeholder - replace with actual founder
import directorImage from '@/assets/service-car-import.jpg' // Placeholder - replace with actual director
import { Seo } from '@/components/common/Seo'
import { SectionHeading } from '@/components/common/SectionHeading'
import { useQuoteDialog } from '@/features/quote/QuoteDialogContext'

const leadership = [
  {
    name: 'Founder & CEO',
    role: 'Managing Director',
    image: founderImage,
    bio: 'With over a decade of experience in customs clearance and freight forwarding, our CEO leads the company with a focus on compliance, reliability, and client-first service.',
  },
  {
    name: 'Head of Operations',
    role: 'Operations Director',
    image: directorImage,
    bio: 'Overseeing day-to-day logistics and terminal handoffs, our Operations Director ensures that cargo moves smoothly from port to final destination.',
  },
]

export function AboutPage() {
  const { setOpen: setQuoteOpen } = useQuoteDialog()
  return (
    <div className="mx-auto max-w-7xl px-4 py-16">
      <Seo
        title="About | Tested & Trusted"
        description="A dedicated clearing and forwarding team for Kenya-bound cargo."
        path="/about"
      />
      <SectionHeading
        eyebrow="About us"
        title="A dedicated clearing and forwarding team for Kenya-bound cargo."
      />
      <div className="mt-8 grid gap-8 md:grid-cols-2">
        <div>
          <p className="text-lg leading-7 text-slate-700">
            Tested &amp; Trusted provides clearing and freight forwarding
            support from Nairobi. We work with people importing goods, exporting
            produce, and arranging cargo transport.
          </p>
          <p className="mt-4 leading-7 text-slate-600">
            Share the cargo type, route, arrival date and paperwork you have. We
            will help identify the next documents or handoffs to check.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Button onClick={() => setQuoteOpen(true)} className="text-white">
              Ask about a shipment
            </Button>
            <Link
              to="/services"
              className="border-border text-foreground inline-flex h-10 items-center justify-center rounded-md border px-4 text-sm font-medium hover:bg-slate-100"
            >
              View Services
            </Link>
          </div>
        </div>
        <img
          src={heroGeneralImage}
          alt="Cargo containers at a shipping terminal"
          width="1200"
          height="900"
          loading="lazy"
          className="aspect-[4/3] w-full object-cover"
        />
      </div>

      {/* Leadership Section */}
      <div className="mt-16 md:mt-24">
        <SectionHeading
          eyebrow="Leadership"
          title="The people behind the operations."
        />
        <div className="mt-10 grid gap-12 md:grid-cols-2">
          {leadership.map((person) => (
            <div key={person.name} className="flex flex-col gap-6">
              <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-slate-100">
                <img
                  src={person.image}
                  alt={person.name}
                  width="800"
                  height="1000"
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                />
              </div>
              <div>
                <h3 className="font-display text-deep-teal text-2xl font-semibold">
                  {person.name}
                </h3>
                <p className="text-primary mt-1 text-sm font-medium uppercase tracking-wider">
                  {person.role}
                </p>
                <p className="text-muted-foreground mt-4 leading-7 text-slate-600">
                  {person.bio}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="border-border mt-16 grid gap-8 border-y py-8 md:grid-cols-[0.7fr_1.3fr]">
        <h2 className="font-display text-deep-teal text-2xl font-semibold">
          What we ask for first
        </h2>
        <ul className="grid gap-3 text-sm text-slate-700 sm:grid-cols-2">
          <li>IDF and commercial invoice, where applicable</li>
          <li>Bill of Lading or airway bill</li>
          <li>Origin, destination and cargo description</li>
          <li>Expected arrival date and contact details</li>
        </ul>
      </div>
    </div>
  )
}

export default AboutPage
