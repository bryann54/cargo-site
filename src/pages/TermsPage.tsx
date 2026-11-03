import { Seo } from '@/components/common/Seo'

export function TermsPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-16">
      <Seo
        title="Terms & Conditions | Tested & Trusted"
        description="Terms placeholder — approved legal copy pending."
        path="/terms"
      />
      <h1 className="font-display text-deep-teal text-4xl font-semibold">
        Terms &amp; Conditions
      </h1>
      <div className="text-muted-foreground mt-6 space-y-4">
        <p>This page is under preparation and will be updated soon.</p>
      </div>
    </div>
  )
}

export default TermsPage
