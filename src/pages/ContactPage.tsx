import { Clock3, Mail, MapPin, Phone } from 'lucide-react'
import { Seo } from '@/components/common/Seo'
import { SectionHeading } from '@/components/common/SectionHeading'
import { QuoteForm } from '@/features/quote/QuoteForm'
import { siteConfig } from '@/config/site'

export function ContactPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-16">
      <Seo
        title="Contact | Tested & Trusted"
        description="Speak with our team about your cargo or clearance needs."
        path="/contact"
      />
      <SectionHeading
        eyebrow="Contact"
        title="Speak with our team about your cargo or clearance needs."
      />
      <div className="mt-8 grid gap-8 md:grid-cols-[0.9fr_1.1fr]">
        <div className="space-y-5">
          <div className="flex items-start gap-3">
            <Phone className="text-primary mt-1 h-5 w-5" /> {siteConfig.phone}
          </div>
          <div className="flex items-start gap-3">
            <Mail className="text-primary mt-1 h-5 w-5" /> {siteConfig.email}
          </div>
          <div className="flex items-start gap-3">
            <MapPin className="text-primary mt-1 h-5 w-5" />{' '}
            {siteConfig.address}
          </div>
          <div className="flex items-start gap-3">
            <Clock3 className="text-primary mt-1 h-5 w-5" /> {siteConfig.hours}
          </div>
        </div>
        <div className="border-border bg-secondary rounded-2xl border p-5">
          <QuoteForm />
        </div>
      </div>
      <div className="border-border mt-10 overflow-hidden rounded-2xl border">
        <iframe
          title="Contact map"
          src={siteConfig.mapUrl}
          loading="lazy"
          className="h-[320px] w-full"
        />
      </div>
    </div>
  )
}

export default ContactPage
