import { ArrowUp, Clock3, Mail, MapPin, Phone } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Logo } from '@/components/common/Logo'
import { SocialIcon } from '@/components/common/SocialIcon'
import { siteConfig } from '@/config/site'
import { navItems } from '@/data/navigation'
import { services } from '@/data/services'
import { useQuoteDialog } from '@/features/quote/QuoteDialogContext'

const CURRENT_YEAR = new Date().getFullYear()
const footerServices = services.slice(0, 5)
const realProfile =
  /^https:\/\/(www\.)?(facebook|x|instagram|tiktok|linkedin)\.com\/.+/i

export function Footer() {
  const { setOpen: setQuoteOpen } = useQuoteDialog()

  return (
    <footer className="dark-surface bg-deep-teal text-slate-200">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 md:grid-cols-2 xl:grid-cols-4">
        <div>
          <Logo className="mb-6 h-14 w-auto" tone="light" />
          <p className="mb-4 text-sm text-slate-300">{siteConfig.tagline}</p>
          <Button onClick={() => setQuoteOpen(true)} className="mb-4 text-white">
            Request Quote
          </Button>
          <div className="flex items-center gap-3">
            {siteConfig.socials
              .filter((s) => s.platform === 'whatsapp' || realProfile.test(s.href))
              .map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-full border border-slate-600 p-2 hover:border-white hover:text-white"
                  aria-label={social.label}
                >
                  <SocialIcon type={social.platform} />
                </a>
              ))}
          </div>
        </div>
        <div>
          <h3 className="mb-4 text-lg font-semibold text-white">Quick Links</h3>
          <ul className="space-y-3 text-sm text-slate-300">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link to={item.href} className="hover:text-white">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="mb-4 text-lg font-semibold text-white">Services</h3>
          <ul className="space-y-3 text-sm text-slate-300">
            {footerServices.map((service) => (
              <li key={service.slug}>
                <Link
                  to={`/services/${service.slug}`}
                  className="hover:text-white"
                >
                  {service.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="mb-4 text-lg font-semibold text-white">Contact</h3>
          <ul className="space-y-3 text-sm text-slate-300">
            <li className="inline-flex items-start gap-2">
              <Phone className="mt-0.5 h-4 w-4" /> {siteConfig.phone}
            </li>
            <li className="inline-flex items-start gap-2">
              <Mail className="mt-0.5 h-4 w-4" /> {siteConfig.email}
            </li>
            <li className="inline-flex items-start gap-2">
              <MapPin className="mt-0.5 h-4 w-4" /> {siteConfig.address}
            </li>
            <li className="inline-flex items-start gap-2">
              <Clock3 className="mt-0.5 h-4 w-4" /> {siteConfig.hours}
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-slate-700">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-4 py-4 text-sm text-slate-300 md:flex-row">
          <p>
            © {CURRENT_YEAR} {siteConfig.name}. All rights reserved.
          </p>
          <p>{siteConfig.disclaimer}</p>
          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="inline-flex items-center gap-2 text-white"
          >
            <ArrowUp className="h-4 w-4" /> Go to top
          </button>
        </div>
      </div>
    </footer>
  )
}
