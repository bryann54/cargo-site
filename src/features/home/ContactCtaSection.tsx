import { Button } from '@/components/ui/button'
import { buildWhatsAppLink } from '@/lib/whatsapp'
import { SocialIcon } from '@/components/common/SocialIcon'
import { useQuoteDialog } from '@/features/quote/QuoteDialogContext'

export function ContactCtaSection() {
  const { setOpen: setQuoteOpen } = useQuoteDialog()
  return (
    <section className="bg-paper py-10 md:py-14">
      <div className="mx-auto grid max-w-7xl gap-6 px-4 md:grid-cols-[0.7fr_1.3fr] md:items-center">
        <div>
          <p className="text-primary text-xs font-bold tracking-[0.18em] uppercase">
            For importers and exporters
          </p>
          <h2 className="font-display text-deep-teal mt-3 text-3xl leading-tight font-semibold">
            A document question? Start here.
          </h2>
        </div>
        <div className="flex flex-wrap gap-3 md:justify-end">
          <Button onClick={() => setQuoteOpen(true)} className="text-white">
            Ask about your shipment
          </Button>
          <a
            href={buildWhatsAppLink()}
            target="_blank"
            rel="noreferrer"
            className="border-primary text-primary inline-flex h-10 items-center gap-2 border px-4 text-sm font-semibold"
          >
            <SocialIcon type="whatsapp" /> WhatsApp us
          </a>
        </div>
      </div>
    </section>
  )
}
