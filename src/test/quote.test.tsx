import { render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import App from '@/App'
import { buildWhatsAppLink } from '@/lib/whatsapp'
import { quoteSchema } from '@/features/quote/schema'
import { submitQuote } from '@/features/quote/api'

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

  it('rejects phone numbers with non-phone characters', () => {
    const result = quoteSchema.safeParse({
      fullName: 'Jane Doe',
      email: 'jane@example.com',
      phone: '1234567abc',
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

describe('quote fallback', () => {
  it('navigates to WhatsApp in the current tab when no endpoint is configured', async () => {
    const navigate = vi.fn()
    const result = await submitQuote(
      {
        fullName: 'Jane Doe',
        email: 'jane@example.com',
        phone: '+254 114 628 283',
        country: 'Kenya',
        service: 'Sea Freight',
        message: 'Need a quote',
        companyHidden: '',
      },
      navigate,
    )

    expect(result.whatsappFallback).toBe(true)
    expect(navigate).toHaveBeenCalledOnce()
    expect(navigate.mock.calls[0][0]).toContain('https://wa.me/254114628283')
  })
})

describe('app smoke', () => {
  it('renders the home page title', () => {
    window.history.pushState({}, '', '/cargo-site/')
    render(<App />)
    expect(
      screen.getByRole('heading', {
        level: 1,
        name: /Cargo moving through Kenya starts with the right paperwork/i,
      }),
    ).toBeInTheDocument()
  })
})
