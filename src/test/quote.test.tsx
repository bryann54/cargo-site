import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import App from '@/App'
import { buildWhatsAppLink } from '@/lib/whatsapp'
import { quoteSchema } from '@/features/quote/schema'

describe('quote form schema', () => {
  it('accepts valid data', () => {
    const result = quoteSchema.safeParse({
      fullName: 'Jane Doe',
      email: 'jane@example.com',
      phone: '+254114628283',
      country: 'Kenya',
      service: 'Sea Freight',
      message: 'Need a quote',
    })

    expect(result.success).toBe(true)
  })

  it('rejects invalid email', () => {
    const result = quoteSchema.safeParse({
      fullName: 'Jane Doe',
      email: 'invalid',
      phone: '+254114628283',
      country: 'Kenya',
      service: 'Sea Freight',
    })

    expect(result.success).toBe(false)
  })
})

describe('whatsapp link builder', () => {
  it('builds a valid wa.me link', () => {
    const link = buildWhatsAppLink('hello there', '254114628283')
    expect(link).toContain('https://wa.me/254114628283')
    expect(link).toContain('hello%20there')
  })
})

describe('app smoke', () => {
  it('renders the home page title', () => {
    window.history.pushState({}, '', '/')
    render(<App />)
    expect(screen.getByText(/Fast, Reliable Clearing and Forwarding Company in Kenya/i)).toBeInTheDocument()
  })
})
