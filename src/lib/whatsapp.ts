import { siteConfig } from '@/config/site'

export function buildWhatsAppLink(message?: string, phone = siteConfig.whatsappNumber) {
  const finalMessage = encodeURIComponent(message ?? siteConfig.whatsappMessage)
  return `https://wa.me/${phone}?text=${finalMessage}`
}
