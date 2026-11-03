import { Link, useParams } from 'react-router-dom'
import { Check } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { Seo } from '@/components/common/Seo'
import { services } from '@/data/services'
import { serviceImageBySlug } from '@/data/serviceImages'
import heroGeneralImage from '@/assets/hero-general.jpg'
import { useQuoteDialog } from '@/features/quote/QuoteDialogContext'
import { NotFoundPage } from '@/pages/NotFoundPage'

export function ServiceDetailPage() {
  const { setOpen: setQuoteOpen } = useQuoteDialog()
  const { slug } = useParams()
  const service = services.find((s) => s.slug === slug)
  if (!service) return <NotFoundPage />

  const image = serviceImageBySlug[service.slug] ?? heroGeneralImage

  return (
    <div className="mx-auto max-w-6xl px-4 py-16">
      <Seo
        title={`${service.title} | Tested & Trusted`}
        description={service.summary}
        path={`/services/${service.slug}`}
      />
      <div className="border-border bg-secondary overflow-hidden rounded-2xl border">
        <div className="grid gap-8 p-6 md:grid-cols-2 md:p-10">
          <div>
            <Badge className="bg-primary/10 text-primary">
              {service.category}
            </Badge>
            <h1 className="font-display text-deep-teal mt-4 text-4xl font-semibold">
              {service.title}
            </h1>
            <p className="text-muted-foreground mt-4 text-lg">
              {service.summary}
            </p>
            <div className="mt-6 flex gap-3">
              <Button onClick={() => setQuoteOpen(true)} className="text-white">
                Request Quote
              </Button>
              <Link
                to="/services"
                className="border-border text-foreground inline-flex h-10 items-center justify-center rounded-md border px-4 text-sm font-medium"
              >
                Back to services
              </Link>
            </div>
          </div>
          <img
            src={image}
            alt={service.title}
            width="1200"
            height="800"
            loading="lazy"
            className="h-[280px] w-full rounded-2xl object-cover"
          />
        </div>
      </div>

      <div className="mt-10 grid gap-8 md:grid-cols-2">
        <div>
          <h2 className="font-display text-deep-teal text-2xl font-semibold">
            Overview
          </h2>
          <p className="text-muted-foreground mt-4">{service.overview}</p>
          <h3 className="font-display text-deep-teal mt-8 text-xl font-semibold">
            Benefits
          </h3>
          <ul className="mt-4 space-y-3">
            {service.benefits.map((benefit) => (
              <li
                key={benefit}
                className="inline-flex items-start gap-3 text-slate-700"
              >
                <Check className="text-primary mt-0.5 h-5 w-5" /> {benefit}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="font-display text-deep-teal text-xl font-semibold">
            Process
          </h3>
          <ol className="mt-4 space-y-3">
            {service.process.map((step, index) => (
              <li key={step} className="flex items-start gap-3 text-slate-700">
                <span className="bg-primary flex h-7 w-7 items-center justify-center rounded-full text-sm font-semibold text-white">
                  {index + 1}
                </span>
                {step}
              </li>
            ))}
          </ol>
        </div>
      </div>

      <div className="mt-10">
        <h3 className="font-display text-deep-teal text-2xl font-semibold">
          Frequently asked questions
        </h3>
        <Accordion
          type="single"
          collapsible
          className="border-border mt-6 border-t"
        >
          {service.faqs.map((faq, i) => (
            <AccordionItem key={faq.question} value={`faq-${i}`}>
              <AccordionTrigger className="text-deep-teal text-left">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>

      <div className="mt-10">
        <h3 className="font-display text-deep-teal text-2xl font-semibold">
          Related services
        </h3>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {services
            .filter((s) => s.slug !== service.slug)
            .slice(0, 3)
            .map((entry) => (
              <Link
                key={entry.slug}
                to={`/services/${entry.slug}`}
                className="border-border bg-card rounded-xl border p-4 shadow-sm"
              >
                <div className="text-deep-teal font-semibold">
                  {entry.title}
                </div>
                <div className="text-muted-foreground mt-2 text-sm">
                  {entry.summary}
                </div>
              </Link>
            ))}
        </div>
      </div>
    </div>
  )
}

export default ServiceDetailPage
