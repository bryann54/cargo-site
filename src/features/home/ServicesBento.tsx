import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { homeServiceCards } from '@/data/home'
import { SectionHeading } from '@/components/common/SectionHeading'
import { cn } from '@/lib/utils'

export function ServicesBento() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-14 md:py-20">
      <div className="grid gap-8 md:grid-cols-[0.65fr_1.35fr] md:items-end">
        <SectionHeading
          eyebrow="Services · choose a route"
          title="Start with the cargo you need to move."
        />
        <p className="text-muted-foreground max-w-xl text-base leading-7">
          From an airway bill at JKIA to a container at Mombasa Port, we can
          review what is needed and explain the next steps.
        </p>
      </div>
      <div className="mt-9 grid gap-4 md:grid-cols-6 md:grid-rows-2">
        {homeServiceCards.map((service, index) => (
          <Link
            key={service.title}
            to={`/services/${service.slug}`}
            className={cn(
              'group bg-deep-teal relative min-h-64 overflow-hidden text-white md:col-span-2',
              index === 0 && 'md:col-span-4 md:row-span-2 md:min-h-[33rem]',
            )}
          >
            <img
              src={service.image}
              alt={service.title}
              width="1200"
              height="800"
              loading="lazy"
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
            />
            <div className="from-deep-teal/90 via-deep-teal/20 absolute inset-0 bg-gradient-to-t to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-5 md:p-7">
              <p className="text-xs font-bold tracking-[0.18em] text-white uppercase">
                {String(index + 1).padStart(2, '0')} ·{' '}
                {service.slug.replaceAll('-', ' ')}
              </p>
              <h3 className="font-display mt-2 max-w-lg text-2xl font-semibold text-white md:text-3xl">
                {service.title}
              </h3>
              <p className="mt-2 max-w-lg text-sm leading-6 text-slate-100">
                {service.description}
              </p>
              <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-white">
                Service details{' '}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}
