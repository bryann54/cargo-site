import { Button } from '@/components/ui/button'
import { Seo } from '@/components/common/Seo'
import { SectionHeading } from '@/components/common/SectionHeading'
import { partnerGroups } from '@/data/partners'
import { useQuoteDialog } from '@/features/quote/QuoteDialogContext'

export function PartnershipsPage() {
  const { setOpen: setQuoteOpen } = useQuoteDialog()
  return (
    <div className="mx-auto max-w-7xl px-4 py-16">
      <Seo
        title="Partnerships | Tested & Trusted"
        description="Cargo handoffs and the teams involved in moving shipments through Kenya."
        path="/partnerships"
      />
      <SectionHeading
        eyebrow="Cargo handoffs"
        title="A shipment passes through several teams."
      />
      <p className="text-muted-foreground mt-4 max-w-2xl leading-7">
        For each route, we coordinate with the relevant carrier, terminal,
        warehouse and delivery contacts. This list describes the kinds of teams
        involved; it is not a list of endorsements or named commercial
        agreements.
      </p>
      <div className="mt-8 grid gap-6 md:grid-cols-3">
        {partnerGroups.map((group) => (
          <div
            key={group.label}
            className="border-primary bg-secondary/60 border-t-2 p-6"
          >
            <h3 className="font-display text-deep-teal text-xl font-semibold">
              {group.label}
            </h3>
            <ul className="divide-border mt-5 divide-y">
              {group.items.map((item) => (
                <li key={item} className="py-3 text-sm text-slate-700">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-border mt-12 grid gap-6 border-y py-8 md:grid-cols-[1fr_auto] md:items-center">
        <div>
          <h3 className="font-display text-deep-teal text-2xl font-semibold">
            Work with us on a cargo movement
          </h3>
          <p className="text-muted-foreground mt-2 max-w-xl text-sm leading-6">
            Share your service area and contact details so we can discuss
            whether the route needs your support.
          </p>
        </div>
        <Button
          className="text-white"
          onClick={() => setQuoteOpen(true)}
        >
          Contact our team
        </Button>
      </div>
    </div>
  )
}

export default PartnershipsPage
