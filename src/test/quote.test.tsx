import { render, screen, cleanup } from '@testing-library/react'
import { describe, expect, it, vi, beforeEach, afterEach } from 'vitest'
import { MemoryRouter } from 'react-router-dom'
import { HomePage } from '@/pages/HomePage'
import { AboutPage } from '@/pages/AboutPage'
import { QuoteDialogProvider } from '@/features/quote/QuoteDialogContext'
import { buildWhatsAppLink } from '@/lib/whatsapp'
import { quoteSchema } from '@/features/quote/schema'
import { submitQuote } from '@/features/quote/api'

beforeEach(() => {
  window.scrollTo = vi.fn()
})

afterEach(() => {
  cleanup()
})

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

describe('page smoke tests', () => {
  it('renders the home page hero title', () => {
    render(
      <QuoteDialogProvider>
        <MemoryRouter>
          <HomePage />
        </MemoryRouter>
      </QuoteDialogProvider>
    )
    expect(
      screen.getByRole('heading', {
        level: 1,
        name: /cargo moving through kenya starts with the right paperwork/i,
      })
    ).toBeInTheDocument()
  })

  it('renders the about page heading', () => {
    render(
      <QuoteDialogProvider>
        <MemoryRouter>
          <AboutPage />
        </MemoryRouter>
      </QuoteDialogProvider>
    )
    expect(
      screen.getByText(/a dedicated clearing and forwarding team/i)
    ).toBeInTheDocument()
  })
})
