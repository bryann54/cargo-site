import { Link } from 'react-router-dom'
import { Seo } from '@/components/common/Seo'

export function NotFoundPage() {
  return (
    <div className="mx-auto max-w-xl px-4 py-24 text-center">
      <Seo
        title="Not found | Tested & Trusted"
        description="That page is not on this route."
        path="/"
      />
      <p className="text-primary text-xs font-bold tracking-[0.2em] uppercase">
        Wrong turn
      </p>
      <h1 className="font-display text-deep-teal mt-3 text-5xl font-semibold">
        404
      </h1>
      <p className="text-muted-foreground mt-4 text-lg">
        That page is not on this route. Your shipment is easier to find than
        this link.
      </p>
      <Link
        to="/"
        className="bg-primary mt-6 inline-flex items-center justify-center rounded-md px-5 py-3 font-semibold text-white"
      >
        Back to the home page
      </Link>
    </div>
  )
}

export default NotFoundPage
