import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Seo } from '@/components/common/Seo'
import { SectionHeading } from '@/components/common/SectionHeading'
import { services } from '@/data/services'
import { useQuoteDialog } from '@/features/quote/QuoteDialogContext'

const categories = [
  'Clearing & Forwarding',
  'General',
  'Cargo Transportation',
] as const

export function ServicesPage() {
  const { setOpen: setQuoteOpen } = useQuoteDialog()
  return (
    <div className="mx-auto max-w-7xl px-4 py-16">
      <Seo
        title="Services | Tested & Trusted"
        description="Clearing, forwarding and cargo transportation services for importers and exporters in Kenya."
        path="/services"
      />
      <div className="grid gap-8 md:grid-cols-[0.65fr_1.35fr]">
        <div className="md:sticky md:top-28 md:self-start">
          <SectionHeading eyebrow="Services" title="What are you moving?" />
          <p className="text-muted-foreground mt-4 leading-7">
            Choose a cargo mode or service. We can review your route and the
            documents you have.
          </p>
          <Button className="mt-5 text-white" onClick={() => setQuoteOpen(true)}>
            Ask about your cargo
          </Button>
        </div>
        <div className="divide-border border-border divide-y border-y">
          {categories.map((category) => {
            const categoryServices = services.filter(
              (s) => s.category === category,
            )
            return (
              <section key={category} className="py-5">
                <h2 className="font-display text-deep-teal text-xl font-semibold">
                  {category}
                </h2>
                <ul className="mt-3 grid gap-x-6 sm:grid-cols-2">
                  {categoryServices.map((service) => (
                    <li key={service.slug}>
                      <Link
                        to={`/services/${service.slug}`}
                        className="group border-border/70 flex items-start justify-between gap-3 border-t py-3"
                      >
                        <span>
                          <span className="text-deep-teal block font-semibold">
                            {service.title}
                          </span>
                          <span className="text-muted-foreground mt-1 block text-sm leading-5">
                            {service.summary}
                          </span>
                        </span>
                        <ArrowRight className="text-primary mt-1 h-4 w-4 shrink-0 transition-transform group-hover:translate-x-1" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </section>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default ServicesPage
