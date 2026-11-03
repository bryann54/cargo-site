import { Button } from '@/components/ui/button'
import { Link } from 'react-router-dom'
import heroGeneralImage from '@/assets/hero-general.jpg'
import { Seo } from '@/components/common/Seo'
import { SectionHeading } from '@/components/common/SectionHeading'
import { useQuoteDialog } from '@/features/quote/QuoteDialogContext'

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
          className="aspect-[4/3] w-full object-cover rounded-2xl"
        />
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
