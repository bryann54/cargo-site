import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { siteConfig } from '@/config/site'
import { countries } from '@/data/countries'
import { quoteOptions } from '@/data/home'
import { type QuoteFormValues, quoteSchema } from '@/features/quote/schema'
import { submitQuote } from '@/features/quote/api'

export function QuoteForm({ onSuccess }: { onSuccess?: () => void }) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<QuoteFormValues>({
    resolver: zodResolver(quoteSchema),
    defaultValues: {
      fullName: '',
      email: '',
      phone: '',
      country: 'Kenya',
      service: 'General Cargo Clearing & Forwarding',
      message: '',
      companyHidden: '',
    },
  })

  const onSubmit = async (values: QuoteFormValues) => {
    if (values.companyHidden) return
    try {
      const result = await submitQuote(values)
      toast.success(
        result.whatsappFallback
          ? 'Opening WhatsApp. Press send to deliver your request.'
          : 'Got it. We will reply by WhatsApp or email shortly.',
      )
      reset()
      onSuccess?.()
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : 'There was a problem sending your quote.',
      )
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
      <div className="mb-5">
        <h2 className="font-display text-deep-teal text-2xl font-semibold">
          Tell us about the cargo
        </h2>
        <p className="text-muted-foreground mt-1 text-sm">
          {siteConfig.expectedReply}
        </p>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <Label htmlFor="quote-name">Full name *</Label>
          <Input
            id="quote-name"
            className="mt-2"
            placeholder="Your name"
            aria-invalid={Boolean(errors.fullName)}
            aria-describedby={errors.fullName ? 'quote-name-error' : undefined}
            {...register('fullName')}
          />
          {errors.fullName && (
            <p id="quote-name-error" className="mt-1 text-sm text-red-600">
              {errors.fullName.message}
            </p>
          )}
        </div>
        <div>
          <Label htmlFor="quote-email">Email *</Label>
          <Input
            id="quote-email"
            type="email"
            className="mt-2"
            placeholder="you@example.com"
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? 'quote-email-error' : undefined}
            {...register('email')}
          />
          {errors.email && (
            <p id="quote-email-error" className="mt-1 text-sm text-red-600">
              {errors.email.message}
            </p>
          )}
        </div>
        <div>
          <Label htmlFor="quote-phone">Phone *</Label>
          <Input
            id="quote-phone"
            type="tel"
            className="mt-2"
            placeholder="+254…"
            aria-invalid={Boolean(errors.phone)}
            aria-describedby={errors.phone ? 'quote-phone-error' : undefined}
            {...register('phone')}
          />
          {errors.phone && (
            <p id="quote-phone-error" className="mt-1 text-sm text-red-600">
              {errors.phone.message}
            </p>
          )}
        </div>
        <div>
          <Label htmlFor="quote-country">Country *</Label>
          <select
            id="quote-country"
            className="border-input bg-background mt-2 flex h-10 w-full rounded-md border px-3 py-2 text-sm"
            {...register('country')}
          >
            {countries.map((country) => (
              <option key={country} value={country}>
                {country}
              </option>
            ))}
          </select>
          {errors.country && (
            <p className="mt-1 text-sm text-red-600">{errors.country.message}</p>
          )}
        </div>
      </div>
      <div>
        <Label htmlFor="quote-service">Service *</Label>
        <select
          id="quote-service"
          className="border-input bg-background mt-2 flex h-10 w-full rounded-md border px-3 py-2 text-sm"
          {...register('service')}
        >
          {quoteOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        {errors.service && (
          <p className="mt-1 text-sm text-red-600">{errors.service.message}</p>
        )}
      </div>
      <div>
        <Label htmlFor="quote-message">Shipment details</Label>
        <Textarea
          id="quote-message"
          className="mt-2"
          placeholder="Origin, destination, cargo type, arrival date, or documents available"
          {...register('message')}
        />
      </div>
      <div className="hidden">
        <Input
          {...register('companyHidden')}
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
        />
      </div>
      <Button type="submit" disabled={isSubmitting} className="w-full">
        {isSubmitting ? 'Sending…' : 'Send shipment details'}
      </Button>
    </form>
  )
}
