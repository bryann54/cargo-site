import { z } from 'zod'

export const quoteSchema = z.object({
  fullName: z.string().min(2, 'Please enter your full name.'),
  email: z.email('Please provide a valid email address.'),
  phone: z.string().min(7, 'Please provide a valid phone number.'),
  country: z.string().min(2, 'Please select your country.'),
  service: z.string().min(2, 'Please choose a service.'),
  message: z.string().max(500).optional().or(z.literal('')),
  companyHidden: z.string().optional(),
})

export type QuoteFormValues = z.infer<typeof quoteSchema>
