import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import heroGeneralImage from '@/assets/hero-general.jpg'

export function CompanyIntro() {
  return (
    <section className="bg-secondary py-12 md:py-16">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 md:grid-cols-[0.8fr_1.2fr] md:items-center">
        <div className="relative md:z-10 md:-mr-16">
          <p className="text-primary text-xs font-bold tracking-[0.18em] uppercase">
            A local contact for cargo in transit
          </p>
          <h2 className="font-display text-deep-teal mt-3 max-w-xl text-3xl leading-tight font-semibold md:text-5xl">
            A clear next step matters when a shipment is waiting.
          </h2>
          <p className="mt-4 max-w-lg text-base leading-7 text-slate-700">
            Tested &amp; Trusted coordinates clearing and freight forwarding for
            importers and exporters in Kenya. Share the shipment details; we
            will help you identify the documents and handoffs to check.
          </p>
          <Link
            to="/about"
            className="text-primary mt-6 inline-flex items-center gap-2 font-semibold"
          >
            How we work <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="relative md:pl-10">
          <img
            src={heroGeneralImage}
            alt="Cargo being handled at a shipping terminal"
            width="1200"
            height="900"
            loading="lazy"
            className="aspect-[4/3] w-full object-cover"
          />
          <div className="bg-paper text-deep-teal absolute right-3 -bottom-4 max-w-xs p-4 text-sm leading-6 shadow-md md:right-0">
            Based in Syokimau, near Mombasa Road, Nairobi.
          </div>
        </div>
      </div>
    </section>
  )
}
