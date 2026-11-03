import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { moreServices } from '@/data/home'
import { SectionHeading } from '@/components/common/SectionHeading'

export function ClearanceList() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16">
      <SectionHeading
        eyebrow="More logistics services"
        title="Other cargo needs we can discuss."
      />
      <div className="divide-border border-border mt-8 divide-y border-y">
        {moreServices.map((service) => (
          <Link
            key={service.slug}
            to={`/services/${service.slug}`}
            className="group hover:bg-secondary/60 grid gap-2 py-5 transition-colors sm:grid-cols-[1fr_auto] sm:items-center sm:gap-6"
          >
            <span>
              <span className="font-display text-deep-teal block text-xl font-semibold">
                {service.title}
              </span>
              <span className="text-muted-foreground mt-1 block text-sm">
                {service.subtitle}
              </span>
            </span>
            <ArrowRight className="text-primary hidden h-5 w-5 transition-transform group-hover:translate-x-1 sm:block" />
          </Link>
        ))}
      </div>
    </section>
  )
}
