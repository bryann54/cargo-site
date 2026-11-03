import { shippingSteps, whyChooseUs } from '@/data/home'
import { SectionHeading } from '@/components/common/SectionHeading'

export function ProcessSection() {
  return (
    <section className="bg-secondary py-16">
      <div className="mx-auto max-w-7xl px-4">
        <SectionHeading
          eyebrow="How we help"
          title="Clear steps for the shipment in front of us."
        />
        <div className="mt-8 grid gap-4 md:grid-cols-[0.7fr_1.3fr]">
          <div className="bg-primary p-6 text-white">
            <p className="text-xs font-bold tracking-[0.18em] text-teal-100 uppercase">
              Before the cargo moves
            </p>
            <p className="font-display mt-3 text-2xl font-semibold">
              We start by checking the shipment details and the paperwork you
              already have.
            </p>
            <ul className="mt-5 space-y-2 text-sm text-teal-50">
              {whyChooseUs.map((item) => (
                <li key={item}>· {item}</li>
              ))}
            </ul>
          </div>
          <ol className="border-border border-t">
            {shippingSteps.map(({ title, detail }) => (
              <li
                key={title}
                className="border-border border-b py-5 sm:grid sm:grid-cols-[1fr] sm:gap-1"
              >
                <span className="text-deep-teal block font-semibold">
                  {title}
                </span>
                <span className="text-muted-foreground mt-1 block max-w-2xl text-sm leading-6">
                  {detail}
                </span>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
