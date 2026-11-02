import { buildWhatsAppLink } from '@/lib/whatsapp'
import type { QuoteFormValues } from './schema'

export async function submitQuote(payload: QuoteFormValues) {
  const endpoint = import.meta.env.VITE_QUOTE_ENDPOINT

  if (endpoint) {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })

    if (!response.ok) {
      throw new Error('Unable to send your quote request right now.')
    }

    return { success: true }
  }

  window.open(
    buildWhatsAppLink(
      `Hello, I would like a quote. Name: ${payload.fullName}. Email: ${payload.email}. Phone: ${payload.phone}. Country: ${payload.country}. Service: ${payload.service}. Message: ${payload.message ?? 'No additional message.'}`,
    ),
    '_blank',
    'noopener,noreferrer',
  )

  return { success: true, whatsappFallback: true }
}
