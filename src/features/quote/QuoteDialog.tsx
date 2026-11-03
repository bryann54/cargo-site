import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { QuoteForm } from '@/features/quote/QuoteForm'
import { useQuoteDialog } from '@/features/quote/QuoteDialogContext'

export function QuoteDialog() {
  const { open, setOpen } = useQuoteDialog()
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Request a Quote</DialogTitle>
          <DialogDescription>
            Share a few shipment details so we can review what is needed.
          </DialogDescription>
        </DialogHeader>
        <QuoteForm onSuccess={() => setOpen(false)} />
      </DialogContent>
    </Dialog>
  )
}
