import { Clock3, Mail, MapPin, Phone } from 'lucide-react'
import { siteConfig } from '@/config/site'
import { OpenNowIndicator } from '@/components/common/OpenNowIndicator'
import { SectionHeading } from '@/components/common/SectionHeading'

export function MapSection() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16">
      <div className="border-primary bg-secondary border-t-2 p-5 md:p-9">
        <div className="grid gap-8 md:grid-cols-[0.75fr_1.25fr]">
          <div>
            <SectionHeading
              eyebrow="Syokimau · Mombasa Road"
              title="Find our Nairobi office."
            />
            <div className="mt-6 space-y-4 text-sm leading-6 text-slate-700">
              <OpenNowIndicator />
              <div className="flex items-start gap-3">
                <MapPin className="text-primary mt-1 h-5 w-5" />{' '}
                {siteConfig.address}
              </div>
              <p className="text-muted-foreground text-xs">{siteConfig.hours}</p>
            </div>
          </div>
          <div>
            <iframe
              title="Map to Tested & Trusted office"
              src={siteConfig.mapUrl}
              loading="lazy"
              className="border-border h-[320px] w-full border"
            />
            <div className="mt-4 flex flex-wrap gap-4 text-sm font-semibold">
              <a
                href={`tel:${siteConfig.phoneHref}`}
                className="text-primary inline-flex items-center gap-2"
              >
                <Phone className="h-4 w-4" /> Call {siteConfig.phone}
              </a>
              <a
                href={`mailto:${siteConfig.email}`}
                className="text-primary inline-flex items-center gap-2"
              >
                <Mail className="h-4 w-4" /> Email {siteConfig.email}
              </a>
              <span className="text-muted-foreground inline-flex items-center gap-2">
                <Clock3 className="h-4 w-4" /> {siteConfig.hours}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
