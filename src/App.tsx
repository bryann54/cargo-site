import { createContext, useContext, useEffect, useState } from 'react'
import {
  BrowserRouter,
  Link,
  NavLink,
  Route,
  Routes,
  useLocation,
  useParams,
} from 'react-router-dom'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Toaster, toast } from 'sonner'
import {
  ArrowRight,
  ArrowUp,
  Check,
  ChevronLeft,
  ChevronRight,
  Clock3,
  Mail,
  MapPin,
  Menu,
  MessageCircle,
  Phone,
} from 'lucide-react'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { Textarea } from '@/components/ui/textarea'
import { siteConfig } from '@/config/site'
import { countries } from '@/data/countries'
import { blogPosts } from '@/data/posts'
import { partnerGroups } from '@/data/partners'
import { navItems, serviceGroups } from '@/data/navigation'
import { services } from '@/data/services'
import { cn } from '@/lib/utils'
import { buildWhatsAppLink } from '@/lib/whatsapp'
import { type QuoteFormValues, quoteSchema } from '@/features/quote/schema'
import { submitQuote } from '@/features/quote/api'
import heroAirImage from '@/assets/hero-air.jpg'
import heroGeneralImage from '@/assets/hero-general.jpg'
import heroRoadImage from '@/assets/hero-road.jpg'
import heroSeaImage from '@/assets/hero-sea.jpg'
import serviceCarImportImage from '@/assets/service-car-import.jpg'
import serviceGeneralCargoImage from '@/assets/service-general-cargo.jpg'
import serviceHorticultureImage from '@/assets/service-horticulture.jpg'
import serviceMedicalImage from '@/assets/service-medical.jpg'
import servicePerishablesImage from '@/assets/service-perishables.jpg'
import servicePharmaceuticalsImage from '@/assets/service-pharmaceuticals.jpg'
import serviceRailImage from '@/assets/service-rail.jpg'
import serviceWarehousingImage from '@/assets/service-warehousing.jpg'
import { Logo } from '@/components/common/Logo'
import { OpenNowIndicator } from '@/components/common/OpenNowIndicator'
import {
  heroSlides,
  homeServiceCards,
  moreServices,
  quoteOptions,
  shippingSteps,
  whyChooseUs,
} from '@/data/home'

const serviceImageBySlug: Record<string, string> = {
  'air-freight': heroAirImage,
  'ocean-freight': heroSeaImage,
  'general-cargo': serviceGeneralCargoImage,
  'pharmaceuticals-logistics': servicePharmaceuticalsImage,
  'perishables-logistics': servicePerishablesImage,
  'road-freight': heroRoadImage,
  'car-importation': serviceCarImportImage,
  warehousing: serviceWarehousingImage,
  'imports-exports-consultancy': serviceMedicalImage,
  'horticulture-exports': serviceHorticultureImage,
  'road-cargo-transportation': heroRoadImage,
  'rail-cargo-transportation': serviceRailImage,
}

const CURRENT_YEAR = new Date().getFullYear()

const QuoteDialogContext = createContext<{
  open: boolean
  setOpen: (open: boolean) => void
} | null>(null)

function useQuoteDialog() {
  const context = useContext(QuoteDialogContext)
  if (!context) {
    throw new Error('QuoteDialogContext is missing')
  }
  return context
}

function App() {
  const [quoteOpen, setQuoteOpen] = useState(false)

  return (
    <QuoteDialogContext.Provider
      value={{ open: quoteOpen, setOpen: setQuoteOpen }}
    >
      <BrowserRouter basename="/cargo-site">
        <SiteShell />
      </BrowserRouter>
    </QuoteDialogContext.Provider>
  )
}

function SiteShell() {
  const [showBackToTop, setShowBackToTop] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => {
      const scrollPosition = window.scrollY
      setShowBackToTop(scrollPosition > 600)
    }
    window.addEventListener('scroll', onScroll)
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [location.pathname])

  return (
    <div className="bg-background text-foreground min-h-screen">
      <Topbar />
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route
            path="/services"
            element={<ServicesPage />}
          />
          <Route
            path="/services/:slug"
            element={<ServiceDetailPage />}
          />
          <Route
            path="/partnerships"
            element={<PartnershipsPage />}
          />
          <Route path="/blogs" element={<BlogPage />} />
          <Route path="/blogs/:slug" element={<BlogDetailPage />} />
          <Route
            path="/contact"
            element={<ContactPage />}
          />
          <Route path="/terms" element={<TermsPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
      <Footer />
      <FloatingActions showBackToTop={showBackToTop} />
      <QuoteDialog />
      <Toaster position="top-center" richColors closeButton />
    </div>
  )
}

function Topbar() {
  return (
    <div className="dark-surface bg-deep-teal hidden border-b border-white/10 text-sm text-slate-200 md:block">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-2">
        <div className="flex items-center gap-4">
          {siteConfig.socials.map((social) => (
            <a
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noreferrer"
              className="transition hover:text-white"
              aria-label={social.label}
            >
              <SocialIcon type={social.platform} />
            </a>
          ))}
        </div>
        <div className="flex items-center gap-6">
          <a
            href={`tel:${siteConfig.phoneHref}`}
            className="inline-flex items-center gap-2 hover:text-white"
          >
            <Phone className="h-4 w-4" />
            {siteConfig.phone}
          </a>
          <a
            href={`mailto:${siteConfig.email}`}
            className="inline-flex items-center gap-2 hover:text-white"
          >
            <Mail className="h-4 w-4" />
            {siteConfig.email}
          </a>
        </div>
      </div>
    </div>
  )
}

function SocialIcon({ type }: { type: string }) {
  const common = 'h-4 w-4'
  switch (type) {
    case 'facebook':
      return (
        <svg
          viewBox="0 0 24 24"
          className={common}
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M13.5 22v-8h2.7l.4-3h-3.1V7.5c0-.9.3-1.5 1.6-1.5H17V3.1c-.3 0-1.3-.1-2.5-.1-2.5 0-4.2 1.5-4.2 4.3V11H8v3h2.3v8h3.2Z" />
        </svg>
      )
    case 'x':
      return (
        <svg
          viewBox="0 0 24 24"
          className={common}
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M18.9 3h3.2l-7 8 8.3 10h-6.5l-5.1-6.2L3.5 21H.3l7.1-8.1L0 3h6.7l4.6 5.8L18.9 3Zm-1.1 16.1h1.8L6.9 4.8H5.1l12.7 14.3Z" />
        </svg>
      )
    case 'instagram':
      return (
        <svg
          viewBox="0 0 24 24"
          className={common}
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          aria-hidden="true"
        >
          <rect x="3.5" y="3.5" width="17" height="17" rx="4.5" />
          <circle cx="12" cy="12" r="4.2" />
          <circle
            cx="17.3"
            cy="6.8"
            r="1.1"
            fill="currentColor"
            stroke="none"
          />
        </svg>
      )
    case 'tiktok':
      return (
        <svg
          viewBox="0 0 24 24"
          className={common}
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M15.6 3c.4 1.5 1.4 2.7 3 3.5v2.6c-1.4 0-2.7-.4-3.8-1.1v6.6c0 3-2.4 5.4-5.4 5.4S4.9 16.6 4.9 13.6 7.3 8.2 10.3 8.2c.5 0 1 .1 1.5.2V11c-.5-.1-1-.2-1.5-.2-1.7 0-3 1.4-3 3.1s1.3 3.1 3 3.1 3-1.4 3-3.1V3h-3.7Z" />
        </svg>
      )
    case 'linkedin':
      return (
        <svg
          viewBox="0 0 24 24"
          className={common}
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M6.9 8.2A1.7 1.7 0 1 1 6.8 4.8a1.7 1.7 0 0 1 .1 3.4ZM5.2 9.5h3.5v9.5H5.2zm5.5 0h3.4v1.3h.1c.5-.9 1.7-1.9 3.5-1.9 3.7 0 4.4 2.4 4.4 5.6v5.5h-3.5v-5.1c0-1.2 0-2.7-1.6-2.7s-1.9 1.3-1.9 2.6v5.2H10.7V9.5Z" />
        </svg>
      )
    case 'whatsapp':
      return (
        <svg
          viewBox="0 0 448 512"
          className={common}
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32 101.5 32 1.9 131.5 1.9 254c0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.4 0 222-99.6 222-222 0-59.3-23.1-115.1-65-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3 18.6-68.1-4.4-7C49.5 323.3 40 289.4 40 254 40 152.8 122.8 70 224 70c49.1 0 95.2 19.2 129.9 53.9s53.9 80.9 53.9 130.1c-.1 101.2-82.9 184.7-184 184.7zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8s-14.3 18-17.6 21.8c-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.4 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2s-9.7 1.4-14.8 6.9c-5.1 5.5-19.4 19-19.4 46.3s19.9 53.7 22.6 57.4c2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.4-5.1-3.8-10.6-6.6z" />
        </svg>
      )
    default:
      return <MessageCircle className={common} />
  }
}

function Header() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const { setOpen: setQuoteOpen } = useQuoteDialog()

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 shadow-sm backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4">
        <Link to="/" className="order-2 flex min-w-0 items-center lg:order-1">
          <Logo className="h-12 w-56 sm:h-14 sm:w-64" />
        </Link>

        <nav className="order-2 hidden items-center gap-6 lg:flex">
          {navItems.map((item) =>
            item.href === '/services' ? (
              <div key={item.href} className="group relative">
                <NavLink
                  to={item.href}
                  className={({ isActive }) =>
                    cn(
                      'inline-flex items-center gap-1 text-sm font-medium transition',
                      isActive
                        ? 'text-primary'
                        : 'text-slate-700 hover:text-primary',
                    )
                  }
                >
                  {item.label}
                  <ChevronRight className="h-4 w-4 rotate-90" />
                </NavLink>
                <div className="invisible absolute top-full left-1/2 mt-4 w-[820px] -translate-x-1/2 rounded-2xl border border-slate-200 bg-white p-4 opacity-0 shadow-xl transition-all group-hover:visible group-hover:opacity-100">
                  <div className="grid grid-cols-4 gap-4">
                    {serviceGroups.map((group) => (
                      <div key={group.title}>
                        <p className="mb-3 text-sm font-semibold text-slate-800">
                          {group.title}
                        </p>
                        <ul className="space-y-2 text-sm text-slate-600">
                          {group.items.map((service) => (
                            <li key={service}>{service}</li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 flex justify-end">
                    <Link to="/services" className="text-primary font-medium">
                      View Services
                    </Link>
                  </div>
                </div>
              </div>
            ) : (
              <NavLink
                key={item.href}
                to={item.href}
                className={({ isActive }) =>
                  cn(
                    'text-sm font-medium transition',
                    isActive
                      ? 'text-primary'
                      : 'text-slate-700 hover:text-primary',
                  )
                }
              >
                {item.label}
              </NavLink>
            ),
          )}
        </nav>

        <div className="order-3 hidden items-center gap-3 lg:flex">
          <Button variant="outline" onClick={() => setQuoteOpen(true)}>
            Inquire
          </Button>
        </div>

        <div className="order-1 lg:hidden">
          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger asChild>
              <button
                type="button"
                aria-label="Open menu"
                className="hover:border-primary hover:text-primary focus-visible:ring-primary rounded-xl border border-slate-200 bg-white p-2.5 text-slate-700 shadow-sm transition focus-visible:ring-2 focus-visible:outline-none"
              >
                <Menu className="h-5 w-5" />
              </button>
            </SheetTrigger>
            <SheetContent
              side="left"
              className="w-[min(88vw,360px)] overflow-y-auto p-0"
            >
              <div className="space-y-4 p-5">
                <div className="flex items-center justify-between">
                  <Logo className="h-12 w-56" />
                </div>
                <SheetTitle className="sr-only">Site navigation</SheetTitle>
                <SheetDescription className="sr-only">
                  Navigate the Tested &amp; Trusted website.
                </SheetDescription>
                <div className="space-y-2">
                  {navItems.map((item) => (
                    <NavLink
                      key={item.href}
                      to={item.href}
                      onClick={() => setMobileOpen(false)}
                      className={({ isActive }) =>
                        cn(
                          'block rounded-lg px-3 py-2 text-sm font-medium',
                          isActive
                            ? 'text-primary bg-teal-50'
                            : 'text-slate-700 hover:bg-slate-50',
                        )
                      }
                    >
                      {item.label}
                    </NavLink>
                  ))}
                </div>
                <Accordion
                  type="single"
                  collapsible
                  className="border-t border-slate-200 pt-4"
                >
                  {serviceGroups.map((group) => (
                    <AccordionItem key={group.title} value={group.title}>
                      <AccordionTrigger className="text-left text-sm font-medium text-slate-800">
                        {group.title}
                      </AccordionTrigger>
                      <AccordionContent>
                        <ul className="space-y-2 text-sm text-slate-600">
                          {group.items.map((item) => (
                            <li key={item}>{item}</li>
                          ))}
                        </ul>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
                <Button
                  className="w-full"
                  onClick={() => {
                    setQuoteOpen(true)
                    setMobileOpen(false)
                  }}
                >
                  Request a quote
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}

function Footer() {
  const { setOpen: setQuoteOpen } = useQuoteDialog()
  const currentYear = CURRENT_YEAR

  return (
    <footer className="dark-surface bg-deep-teal text-slate-200">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 md:grid-cols-2 xl:grid-cols-4">
        <div>
          <div className="mb-4 flex items-center gap-3">
            <Logo className="mb-4 h-14 w-64" tone="light" />
          </div>
          <p className="mb-4 text-sm text-slate-300">{siteConfig.tagline}</p>
          <Button onClick={() => setQuoteOpen(true)} className="mb-4">
            Request Quote
          </Button>
          <div className="flex items-center gap-3">
            {siteConfig.socials.map((social) => (
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
            {[
              'Services',
              'About Us',
              'Partnership',
              'Blogs',
              'Terms & Conditions',
            ].map((label, index) => (
              <li key={label}>
                <Link
                  to={
                    [
                      '/services',
                      '/about',
                      '/partnerships',
                      '/blogs',
                      '/terms',
                    ][index]
                  }
                  className="hover:text-white"
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="mb-4 text-lg font-semibold text-white">Services</h3>
          <ul className="space-y-3 text-sm text-slate-300">
            {[
              'Clearing and Forwarding',
              'Cargo Transportation',
              'Warehousing',
              'Imports & Exports Consultancy',
              'Car Importation',
            ].map((item) => (
              <li key={item}>{item}</li>
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
          <p>© {currentYear} Tested &amp; Trusted. All rights reserved.</p>
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

function FloatingActions({
  showBackToTop,
}: {
  showBackToTop: boolean
}) {
  return (
    <div className="fixed right-[calc(env(safe-area-inset-right)+1rem)] bottom-[calc(env(safe-area-inset-bottom)+1rem)] z-50 flex flex-col items-end gap-3">
        <div className="group relative">
          <a
            href={buildWhatsAppLink()}
            target="_blank"
            rel="noreferrer"
            aria-label="Chat with us on WhatsApp"
            className="flex h-14 w-14 items-center justify-center rounded-full bg-whatsapp text-white shadow-lg ring-4 shadow-green-900/20 ring-white transition duration-200 hover:scale-105 hover:bg-whatsapp-hover focus-visible:ring-4 focus-visible:ring-green-200 focus-visible:outline-none"
          >
            <SocialIcon type="whatsapp" />
          </a>
          <span className="pointer-events-none absolute top-1/2 right-[calc(100%+0.75rem)] -translate-y-1/2 rounded-lg bg-slate-900 px-3 py-2 text-xs font-semibold whitespace-nowrap text-white opacity-0 shadow-lg transition group-focus-within:opacity-100 group-hover:opacity-100">
            Chat on WhatsApp
          </span>
        </div>
      {showBackToTop && (
        <button
          type="button"
          aria-label="Back to top"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="flex h-14 w-14 items-center justify-center rounded-full bg-primary text-white shadow-lg ring-4 ring-white transition hover:scale-105"
        >
          <ArrowUp className="h-5 w-5" />
        </button>
      )}
    </div>
  )
}

function QuoteDialog() {
  const { open, setOpen } = useQuoteDialog()
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Request a Quote</DialogTitle>
          <DialogDescription>
            Share a few shipment details so we can review what is needed.
          </DialogDescription>
        </DialogHeader>
        <QuoteForm onSuccess={() => setOpen(false)} />
      </DialogContent>
    </Dialog>
  )
}

function HomePage() {
  const { setOpen: setQuoteOpen } = useQuoteDialog()
  const [activeSlide, setActiveSlide] = useState(0)
  const [carouselPaused, setCarouselPaused] = useState(false)
  const [reducedMotion, setReducedMotion] = useState(false)

  useEffect(() => {
    const motionPreference = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    )
    const updateMotionPreference = () =>
      setReducedMotion(motionPreference.matches)
    updateMotionPreference()
    motionPreference.addEventListener('change', updateMotionPreference)
    return () =>
      motionPreference.removeEventListener('change', updateMotionPreference)
  }, [])

  useEffect(() => {
    if (carouselPaused || reducedMotion) return
    const timer = window.setInterval(() => {
      setActiveSlide((current) => (current + 1) % heroSlides.length)
    }, 6500)
    return () => window.clearInterval(timer)
  }, [carouselPaused, reducedMotion])

  const changeSlide = (direction: -1 | 1) => {
    setActiveSlide(
      (current) =>
        (current + direction + heroSlides.length) % heroSlides.length,
    )
  }

  return (
    <>
      <section className="dark-surface bg-deep-teal text-paper relative isolate overflow-hidden">
        <div className="manifest-grid absolute inset-0 -z-10 opacity-20" />
        <div className="mx-auto grid max-w-7xl gap-8 px-4 pt-8 pb-14 md:grid-cols-[0.9fr_1.1fr] md:items-center md:gap-12 md:pt-12 md:pb-20">
          <div
            key={heroSlides[activeSlide].title}
            className="animate-carousel-content"
            onMouseEnter={() => setCarouselPaused(true)}
            onMouseLeave={() => setCarouselPaused(false)}
            onFocusCapture={() => setCarouselPaused(true)}
            onBlurCapture={(event) => {
              if (
                !event.currentTarget.contains(
                  event.relatedTarget as Node | null,
                )
              )
                setCarouselPaused(false)
            }}
            aria-live="polite"
            aria-atomic="true"
          >
            <p className="mb-5 text-xs font-bold tracking-[0.2em] text-teal-200 uppercase">
              {heroSlides[activeSlide].badge}
            </p>
            <h1 className="max-w-xl text-4xl leading-[1.08] font-semibold text-white sm:text-5xl md:text-6xl">
              {heroSlides[activeSlide].title}
            </h1>
            <p className="mt-5 max-w-lg text-base leading-7 text-slate-200 sm:text-lg">
              {heroSlides[activeSlide].subtitle}
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Button
                onClick={() => setQuoteOpen(true)}
                size="lg"
                className="bg-amber-strong text-white hover:brightness-90"
              >
                Get a quote
              </Button>
              <a
                href={buildWhatsAppLink()}
                target="_blank"
                rel="noreferrer"
                className="inline-flex h-11 items-center justify-center rounded-md border border-white/40 px-5 text-sm font-semibold text-white transition-colors hover:bg-white/10 focus-visible:outline-white"
              >
                <SocialIcon type="whatsapp" />
                <span className="ml-2">WhatsApp our team</span>
              </a>
            </div>
            <div className="border-accent mt-8 border-l-2 pl-4 text-sm leading-6 text-slate-200">
              <p className="font-semibold text-white">
                Documents often requested for imports
              </p>
              <p className="mt-1">
                IDF · Bill of Lading · Commercial Invoice · COC
              </p>
              <p className="mt-1 text-xs text-slate-300">
                Requirements depend on cargo and current KRA guidance.
              </p>
            </div>
          </div>
          <div
            className="relative"
            onMouseEnter={() => setCarouselPaused(true)}
            onMouseLeave={() => setCarouselPaused(false)}
            onFocusCapture={() => setCarouselPaused(true)}
            onBlurCapture={(event) => {
              if (
                !event.currentTarget.contains(
                  event.relatedTarget as Node | null,
                )
              )
                setCarouselPaused(false)
            }}
          >
            <div className="relative overflow-hidden border border-white/20 bg-white/5 p-2 shadow-2xl shadow-black/20">
              <div className="bg-deep-teal relative aspect-[4/3] overflow-hidden">
                {heroSlides.map((slide, index) => (
                  <img
                    key={slide.title}
                    src={slide.image}
                    alt={index === activeSlide ? slide.title : ''}
                    aria-hidden={index !== activeSlide}
                    width="1200"
                    height="900"
                    fetchPriority={index === 0 ? 'high' : undefined}
                    loading={index === 0 ? 'eager' : 'lazy'}
                    className={cn(
                      'absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ease-in-out',
                      index === activeSlide ? 'opacity-100' : 'opacity-0',
                    )}
                  />
                ))}
                <div className="bg-surface-overlay pointer-events-none absolute inset-0" />
              </div>
            </div>
            <div className="mt-5 flex items-center justify-between gap-4">
              <p className="text-xs font-semibold tracking-[0.16em] text-teal-100 uppercase">
                {String(activeSlide + 1).padStart(2, '0')} /{' '}
                {String(heroSlides.length).padStart(2, '0')}
              </p>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => changeSlide(-1)}
                  aria-label="Previous slide"
                  className="rounded-full border border-white/30 p-2 text-white transition hover:bg-white/10"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                {heroSlides.map((slide, index) => (
                  <button
                    key={slide.title}
                    type="button"
                    onClick={() => setActiveSlide(index)}
                    className={cn(
                      'h-2.5 rounded-full transition-all',
                      activeSlide === index
                        ? 'bg-accent w-8'
                        : 'w-2.5 bg-white/50',
                    )}
                    aria-label={`View slide ${index + 1}`}
                    aria-pressed={activeSlide === index}
                  />
                ))}
                <button
                  type="button"
                  onClick={() => changeSlide(1)}
                  aria-label="Next slide"
                  className="rounded-full border border-white/30 p-2 text-white transition hover:bg-white/10"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-border bg-paper border-b py-5">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-primary text-xs font-bold tracking-[0.16em] uppercase">
            Cargo modes
          </p>
          <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-slate-700">
            {services.slice(0, 6).map((service, index) => (
              <Link
                key={service.slug}
                to={`/services/${service.slug}`}
                className="group hover:text-primary inline-flex items-center gap-2"
              >
                <span className="text-amber-strong font-mono text-xs">
                  {String(index + 1).padStart(2, '0')}
                </span>
                {service.title}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-14 md:py-20">
        <div className="grid gap-8 md:grid-cols-[0.65fr_1.35fr] md:items-end">
          <SectionHeading
            eyebrow="Services · choose a route"
            title="Start with the cargo you need to move."
          />
          <p className="text-muted-foreground max-w-xl text-base leading-7">
            From an airway bill at JKIA to a container at Mombasa Port, we can
            review what is needed and explain the next steps.
          </p>
        </div>
        <div className="mt-9 grid gap-4 md:grid-cols-6 md:grid-rows-2">
          {homeServiceCards.map((service, index) => (
            <Link
              key={service.title}
              to={`/services/${service.slug}`}
              className={cn(
                'group bg-deep-teal relative min-h-64 overflow-hidden text-white md:col-span-2',
                index === 0 && 'md:col-span-4 md:row-span-2 md:min-h-[33rem]',
              )}
            >
              <img
                src={service.image}
                alt={service.title}
                width="1200"
                height="800"
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
              />
              <div className="from-deep-teal/90 via-deep-teal/20 absolute inset-0 bg-gradient-to-t to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-5 md:p-7">
                <p className="text-xs font-bold tracking-[0.18em] text-white uppercase">
                  {String(index + 1).padStart(2, '0')} ·{' '}
                  {service.slug.replaceAll('-', ' ')}
                </p>
                <h3 className="font-display mt-2 max-w-lg text-2xl font-semibold text-white md:text-3xl">
                  {service.title}
                </h3>
                <p className="mt-2 max-w-lg text-sm leading-6 text-slate-100">
                  {service.description}
                </p>
                <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-white">
                  Service details{' '}
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="bg-secondary py-12 md:py-16">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 md:grid-cols-[0.8fr_1.2fr] md:items-center">
          <div className="relative md:z-10 md:-mr-16">
            <p className="text-primary text-xs font-bold tracking-[0.18em] uppercase">
              A local contact for cargo in transit
            </p>
            <h2 className="font-display text-deep-teal mt-3 max-w-xl text-3xl leading-tight font-semibold md:text-5xl">
              A clear next step matters when a shipment is waiting.
            </h2>
            <p className="mt-4 max-w-lg text-base leading-7 text-slate-700">
              Tested &amp; Trusted coordinates clearing and freight forwarding
              for importers and exporters in Kenya. Share the shipment details;
              we will help you identify the documents and handoffs to check.
            </p>
            <Link
              to="/about"
              className="text-primary mt-6 inline-flex items-center gap-2 font-semibold"
            >
              How we work <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="relative md:pl-10">
            <img
              src={heroGeneralImage}
              alt="Cargo being handled at a shipping terminal"
              width="1200"
              height="900"
              loading="lazy"
              className="aspect-[4/3] w-full object-cover"
            />
            <div className="bg-paper text-deep-teal absolute right-3 -bottom-4 max-w-xs p-4 text-sm leading-6 shadow-md md:right-0">
              Based in Syokimau, near Mombasa Road, Nairobi.
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16">
        <div className="grid gap-8 md:grid-cols-[0.6fr_1.4fr]">
          <div className="md:sticky md:top-28 md:self-start">
            <SectionHeading
              eyebrow="Clearance and freight"
              title="Documents first. Then the right handoff."
            />
            <p className="text-muted-foreground mt-4 max-w-sm leading-7">
              For each shipment, the cargo type and route determine which
              documents to check and who needs to receive them.
            </p>
          </div>
          <div className="divide-border border-border divide-y border-y">
            {services.slice(0, 6).map((service, index) => (
              <Link
                key={service.slug}
                to={`/services/${service.slug}`}
                className="group grid gap-4 py-5 sm:grid-cols-[3.5rem_9rem_1fr_auto] sm:items-center"
              >
                <span className="text-amber-strong font-mono text-sm">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <img
                  src={serviceImageBySlug[service.slug] ?? heroGeneralImage}
                  alt=""
                  width="320"
                  height="220"
                  loading="lazy"
                  className="aspect-[4/3] w-full object-cover"
                />
                <span>
                  <span className="font-display text-deep-teal block text-xl font-semibold">
                    {service.title}
                  </span>
                  <span className="text-muted-foreground mt-1 block max-w-lg text-sm leading-6">
                    {service.summary}
                  </span>
                </span>
                <ArrowRight className="text-primary hidden h-5 w-5 transition-transform group-hover:translate-x-1 sm:block" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16">
        <SectionHeading
          eyebrow="More logistics services"
          title="Other cargo needs we can discuss."
        />
        <div className="divide-border border-border mt-8 divide-y border-y">
          {moreServices.map((service, index) => (
            <Link
              key={service.title}
              to={`/services/${service.slug}`}
              className="group hover:bg-secondary/60 grid gap-2 py-5 transition-colors sm:grid-cols-[4rem_1fr_auto] sm:items-center sm:gap-6"
            >
              <span className="text-amber-strong font-mono text-sm">
                {String(index + 1).padStart(2, '0')}
              </span>
              <span>
                <span className="font-display text-deep-teal block text-xl font-semibold">
                  {service.title}
                </span>
                <span className="text-muted-foreground mt-1 block text-sm">
                  {service.subtitle}
                </span>
              </span>
              <ArrowRight className="text-primary hidden h-5 w-5 transition-transform group-hover:translate-x-1 sm:block" />
            </Link>
          ))}
        </div>
      </section>

      <section className="bg-secondary py-16">
        <div className="mx-auto max-w-7xl px-4">
          <SectionHeading
            eyebrow="How we help"
            title="Clear steps for the shipment in front of us."
          />
          <div className="mt-8 grid gap-4 md:grid-cols-[0.7fr_1.3fr]">
            <div className="bg-primary p-6 text-white">
              <p className="text-xs font-bold tracking-[0.18em] text-teal-100 uppercase">
                Before the cargo moves
              </p>
              <p className="font-display mt-3 text-2xl font-semibold">
                We start by checking the shipment details and the paperwork you
                already have.
              </p>
            </div>
            <ol className="divide-border border-border divide-y border-y">
              {whyChooseUs.map((item, index) => (
                <li key={item} className="flex items-start gap-5 py-4">
                  <span className="text-amber-strong font-mono text-sm">
                    0{index + 1}
                  </span>
                  <span className="text-deep-teal text-base">{item}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16">
        <div className="grid gap-8 md:grid-cols-[1fr_1.2fr] md:items-center">
          <div>
            <SectionHeading
              eyebrow="Moving cargo across borders"
              title="Where the handoff happens matters."
            />
            <p className="text-muted-foreground mt-4 max-w-md leading-7">
              From Mombasa Port and JKIA to inland delivery, we coordinate the
              route and the people handling each stage.
            </p>
          </div>
          <div className="border-border relative border-y py-5 pl-10">
            <svg
              aria-hidden="true"
              viewBox="0 0 360 150"
              className="text-primary absolute inset-0 h-full w-full"
            >
              <path
                d="M38 116C102 116 102 36 178 36s79 80 144 80"
                fill="none"
                stroke="currentColor"
                strokeDasharray="5 5"
                strokeWidth="2"
              />
              <circle cx="38" cy="116" r="6" fill="currentColor" />
              <circle cx="178" cy="36" r="6" fill="currentColor" />
              <circle cx="322" cy="116" r="6" fill="currentColor" />
            </svg>
            <div className="text-deep-teal relative grid grid-cols-3 gap-3 text-center text-sm font-semibold">
              <div className="pt-20">Mombasa Port</div>
              <div>JKIA</div>
              <div className="pt-20">Nairobi</div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-paper py-16">
        <div className="mx-auto max-w-7xl px-4">
          <div className="grid gap-8 md:grid-cols-[0.8fr_1.2fr] md:items-start">
            <SectionHeading
              eyebrow="Before you engage us"
              title="Ask to see current credentials."
            />
            <p className="text-muted-foreground max-w-2xl text-base leading-7">
              Memberships and licences should be checked against current
              documents. We do not display unverified certificate copies or
              claim endorsements on this page.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16">
        <div className="grid gap-8 rounded-[32px] border border-slate-200 bg-slate-50 p-6 md:grid-cols-2 md:p-10">
          <div>
            <SectionHeading
              eyebrow="We’re here to help"
              title="Tell us what is moving."
            />
            <p className="mt-4 text-slate-600">
              Send the origin, destination, cargo type and any documents already
              available. We will reply with the next details to confirm.
            </p>
            <ul className="mt-6 space-y-3 text-slate-700">
              {[
                'Bill of Lading or airway bill, if available',
                'Commercial invoice and packing list',
                'Cargo arrival date and destination',
              ].map((item) => (
                <li key={item} className="inline-flex items-center gap-3">
                  <Check className="text-primary h-5 w-5" /> {item}
                </li>
              ))}
            </ul>
            <p className="text-muted-foreground mt-5 text-sm">
              {siteConfig.expectedReply}
            </p>
          </div>
          <div className="rounded-[24px] bg-white p-5 shadow-sm ring-1 ring-slate-200">
            <QuoteForm />
          </div>
        </div>
      </section>

      <section className="bg-secondary py-12 md:py-16">
        <div className="mx-auto max-w-7xl px-4">
          <div className="grid gap-8 md:grid-cols-[0.7fr_1.3fr]">
            <SectionHeading
              eyebrow="How it works"
              title="A short manifest for your shipment."
            />
            <ol className="border-border border-t">
              {shippingSteps.map(({ title, detail }, index) => (
                <li
                  key={title}
                  className="border-border grid gap-2 border-b py-5 sm:grid-cols-[4rem_1fr] sm:gap-4"
                >
                  <span className="text-amber-strong font-mono text-sm">
                    0{index + 1}
                  </span>
                  <span>
                    <span className="text-deep-teal block font-semibold">
                      {title}
                    </span>
                    <span className="text-muted-foreground mt-1 block max-w-2xl text-sm leading-6">
                      {detail}
                    </span>
                  </span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16">
        <div className="grid gap-8 md:grid-cols-[0.7fr_1.3fr] md:items-end">
          <SectionHeading
            eyebrow="Field notes"
            title="Practical notes for the next shipment."
          />
          <p className="text-muted-foreground max-w-lg leading-7">
            Short guides on documents, cargo modes and local clearance steps.
          </p>
        </div>
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {blogPosts.slice(0, 3).map((post) => (
            <article key={post.slug} className="border-primary border-t-2 py-5">
              <p className="text-primary text-xs font-bold tracking-[0.16em] uppercase">
                {post.category} · {post.readTime} min
              </p>
              <h3 className="font-display text-deep-teal mt-3 text-2xl leading-snug font-semibold">
                {post.title}
              </h3>
              <p className="text-muted-foreground mt-3 text-sm leading-6">
                {post.excerpt}
              </p>
              <Link
                to={`/blogs/${post.slug}`}
                className="text-primary mt-5 inline-flex items-center gap-2 text-sm font-semibold"
              >
                Read the note <ArrowRight className="h-4 w-4" />
              </Link>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-paper py-10 md:py-14">
        <div className="mx-auto grid max-w-7xl gap-6 px-4 md:grid-cols-[0.7fr_1.3fr] md:items-center">
          <div>
            <p className="text-primary text-xs font-bold tracking-[0.18em] uppercase">
              For importers and exporters
            </p>
            <h2 className="font-display text-deep-teal mt-3 text-3xl leading-tight font-semibold">
              A document question? Start here.
            </h2>
          </div>
          <div className="flex flex-wrap gap-3 md:justify-end">
            <Button
              onClick={() => setQuoteOpen(true)}
              className="bg-amber-strong text-white hover:brightness-90"
            >
              Ask about your shipment
            </Button>
            <a
              href={buildWhatsAppLink()}
              target="_blank"
              rel="noreferrer"
              className="border-primary text-primary inline-flex h-10 items-center gap-2 border px-4 text-sm font-semibold"
            >
              <SocialIcon type="whatsapp" /> WhatsApp us
            </a>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16">
        <div className="border-primary bg-secondary border-t-2 p-5 md:p-9">
          <div className="grid gap-8 md:grid-cols-[0.75fr_1.25fr]">
            <div>
              <SectionHeading
                eyebrow="Syokimau · Mombasa Road"
                title="Find our Nairobi office."
              />
              <div className="mt-6 space-y-4 text-sm leading-6 text-slate-700">
                <OpenNowIndicator />
                <div className="flex items-start gap-3">
                  <MapPin className="text-primary mt-1 h-5 w-5" />{' '}
                  {siteConfig.address}
                </div>
                <p className="text-muted-foreground text-xs">
                  {siteConfig.hours}
                </p>
              </div>
            </div>
            <div>
              <iframe
                title="Map to Tested & Trusted office"
                src={siteConfig.mapUrl}
                loading="lazy"
                className="border-border h-[320px] w-full border"
              />
              <div className="mt-4 flex flex-wrap gap-4 text-sm font-semibold">
                <a
                  href={`tel:${siteConfig.phoneHref}`}
                  className="text-primary"
                >
                  Call {siteConfig.phone}
                </a>
                <a href={`mailto:${siteConfig.email}`} className="text-primary">
                  Email {siteConfig.email}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

function AboutPage() {
  const { setOpen: setQuoteOpen } = useQuoteDialog()
  return (
    <div className="mx-auto max-w-7xl px-4 py-16">
      <SectionHeading
        eyebrow="About us"
        title="A dedicated clearing and forwarding team for Kenya-bound cargo."
      />
      <div className="mt-8 grid gap-8 md:grid-cols-2">
        <div>
          <p className="text-lg leading-7 text-slate-700">
            Tested &amp; Trusted provides clearing and freight forwarding
            support from Nairobi. We work with people importing goods, exporting
            produce, and arranging cargo transport.
          </p>
          <p className="mt-4 leading-7 text-slate-600">
            Share the cargo type, route, arrival date and paperwork you have. We
            will help identify the next documents or handoffs to check.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Button onClick={() => setQuoteOpen(true)}>
              Ask about a shipment
            </Button>
            <Link
              to="/services"
              className="inline-flex h-10 items-center justify-center rounded-md border border-slate-200 px-4 text-sm font-medium text-slate-800 hover:bg-slate-100"
            >
              View Services
            </Link>
          </div>
        </div>
        <img
          src={heroGeneralImage}
          alt="Cargo containers at a shipping terminal"
          width="1200"
          height="900"
          loading="lazy"
          className="aspect-[4/3] w-full object-cover"
        />
      </div>
      <div className="border-border mt-12 grid gap-8 border-y py-8 md:grid-cols-[0.7fr_1.3fr]">
        <h2 className="font-display text-deep-teal text-2xl font-semibold">
          What we ask for first
        </h2>
        <ul className="grid gap-3 text-sm text-slate-700 sm:grid-cols-2">
          <li>IDF and commercial invoice, where applicable</li>
          <li>Bill of Lading or airway bill</li>
          <li>Origin, destination and cargo description</li>
          <li>Expected arrival date and contact details</li>
        </ul>
      </div>
    </div>
  )
}

function ServicesPage() {
  const { setOpen: setQuoteOpen } = useQuoteDialog()
  return (
    <div className="mx-auto max-w-7xl px-4 py-16">
      <div className="grid gap-8 md:grid-cols-[0.65fr_1.35fr]">
        <div className="md:sticky md:top-28 md:self-start">
          <SectionHeading eyebrow="Services" title="What are you moving?" />
          <p className="text-muted-foreground mt-4 leading-7">
            Choose a cargo mode or service. We can review your route and the
            documents you have.
          </p>
          <Button className="mt-5" onClick={() => setQuoteOpen(true)}>
            Ask about your cargo
          </Button>
        </div>
        <div className="divide-border border-border divide-y border-y">
          {['Clearing & Forwarding', 'General', 'Cargo Transportation'].map(
            (category) => {
              const categoryServices = services.filter(
                (service) => service.category === category,
              )
              return (
                <section key={category} className="py-5">
                  <h2 className="font-display text-deep-teal text-xl font-semibold">
                    {category}
                  </h2>
                  <ul className="mt-3 grid gap-x-6 sm:grid-cols-2">
                    {categoryServices.map((service) => (
                      <li key={service.slug}>
                        <Link
                          to={`/services/${service.slug}`}
                          className="group border-border/70 flex items-start justify-between gap-3 border-t py-3"
                        >
                          <span>
                            <span className="text-deep-teal block font-semibold">
                              {service.title}
                            </span>
                            <span className="text-muted-foreground mt-1 block text-sm leading-5">
                              {service.summary}
                            </span>
                          </span>
                          <ArrowRight className="text-primary mt-1 h-4 w-4 shrink-0 transition-transform group-hover:translate-x-1" />
                        </Link>
                      </li>
                    ))}
                  </ul>
                </section>
              )
            },
          )}
        </div>
      </div>
    </div>
  )
}

function ServiceDetailPage() {
  const { setOpen: setQuoteOpen } = useQuoteDialog()
  const { slug } = useParams()
  const service = services.find((entry) => entry.slug === slug)

  if (!service) {
    return <NotFoundPage />
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-16">
      <div className="overflow-hidden rounded-[32px] border border-slate-200 bg-slate-50">
        <div className="grid gap-8 p-6 md:grid-cols-2 md:p-10">
          <div>
            <Badge className="bg-primary/10 text-primary">
              {service.category}
            </Badge>
            <h1 className="mt-4 text-4xl font-black text-slate-900">
              {service.title}
            </h1>
            <p className="mt-4 text-lg text-slate-600">{service.summary}</p>
            <div className="mt-6 flex gap-3">
              <Button onClick={() => setQuoteOpen(true)}>Request Quote</Button>
              <Link
                to="/services"
                className="inline-flex h-10 items-center justify-center rounded-md border border-slate-200 px-4 text-sm font-medium text-slate-800"
              >
                Back to services
              </Link>
            </div>
          </div>
          <img
            src={serviceImageBySlug[service.slug] ?? heroGeneralImage}
            alt={service.title}
            className="h-[280px] w-full rounded-[28px] object-cover"
          />
        </div>
      </div>

      <div className="mt-10 grid gap-8 md:grid-cols-2">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Overview</h2>
          <p className="mt-4 text-slate-600">{service.overview}</p>
          <h3 className="mt-8 text-xl font-semibold text-slate-900">
            Benefits
          </h3>
          <ul className="mt-4 space-y-3">
            {service.benefits.map((benefit) => (
              <li
                key={benefit}
                className="inline-flex items-start gap-3 text-slate-700"
              >
                <Check className="text-primary mt-0.5 h-5 w-5" /> {benefit}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="text-xl font-semibold text-slate-900">Process</h3>
          <ol className="mt-4 space-y-3">
            {service.process.map((step, index) => (
              <li key={step} className="flex items-start gap-3 text-slate-700">
                <span className="bg-primary flex h-7 w-7 items-center justify-center rounded-full text-sm font-semibold text-white">
                  {index + 1}
                </span>{' '}
                {step}
              </li>
            ))}
          </ol>
        </div>
      </div>

      <div className="mt-10">
        <h3 className="text-2xl font-bold text-slate-900">
          Frequently asked questions
        </h3>
        <div className="mt-6 space-y-3">
          {service.faqs.map((faq) => (
            <div
              key={faq.question}
              className="rounded-xl border border-slate-200 bg-slate-50 p-4"
            >
              <div className="font-semibold text-slate-900">{faq.question}</div>
              <div className="mt-2 text-sm text-slate-600">{faq.answer}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-10">
        <h3 className="text-2xl font-bold text-slate-900">Related services</h3>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {services
            .filter((entry) => entry.slug !== service.slug)
            .slice(0, 3)
            .map((entry) => (
              <Link
                key={entry.slug}
                to={`/services/${entry.slug}`}
                className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm"
              >
                <div className="font-semibold text-slate-900">
                  {entry.title}
                </div>
                <div className="mt-2 text-sm text-slate-600">
                  {entry.summary}
                </div>
              </Link>
            ))}
        </div>
      </div>
    </div>
  )
}

function PartnershipsPage() {
  const { setOpen: setQuoteOpen } = useQuoteDialog()
  return (
    <div className="mx-auto max-w-7xl px-4 py-16">
      <SectionHeading
        eyebrow="Cargo handoffs"
        title="A shipment passes through several teams."
      />
      <p className="text-muted-foreground mt-4 max-w-2xl leading-7">
        For each route, we coordinate with the relevant carrier, terminal,
        warehouse and delivery contacts. This list describes the kinds of teams
        involved; it is not a list of endorsements or named commercial
        agreements.
      </p>
      <div className="mt-8 grid gap-6 md:grid-cols-3">
        {partnerGroups.map((group) => (
          <div
            key={group.label}
            className="border-primary bg-secondary/60 border-t-2 p-6"
          >
            <h3 className="font-display text-deep-teal text-xl font-semibold">
              {group.label}
            </h3>
            <ul className="divide-border mt-5 divide-y">
              {group.items.map((item) => (
                <li key={item} className="py-3 text-sm text-slate-700">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-border mt-12 grid gap-6 border-y py-8 md:grid-cols-[1fr_auto] md:items-center">
        <div>
          <h3 className="font-display text-deep-teal text-2xl font-semibold">
            Work with us on a cargo movement
          </h3>
          <p className="text-muted-foreground mt-2 max-w-xl text-sm leading-6">
            Share your service area and contact details so we can discuss
            whether the route needs your support.
          </p>
        </div>
        <Button
          className="bg-amber-strong text-white hover:brightness-90"
          onClick={() => setQuoteOpen(true)}
        >
          Contact our team
        </Button>
      </div>
    </div>
  )
}

function BlogPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-16">
      <SectionHeading
        eyebrow="Blogs"
        title="Practical cargo, shipping and customs insights."
      />
      <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {blogPosts.map((post) => (
          <Card
            key={post.slug}
            className="overflow-hidden border-slate-200 p-0"
          >
            <div className="h-44 bg-gradient-to-br from-teal-50 to-slate-100" />
            <div className="p-5">
              <div className="text-primary text-xs font-medium tracking-[0.2em] uppercase">
                {post.category}
              </div>
              <h3 className="mt-3 text-xl font-semibold text-slate-900">
                {post.title}
              </h3>
              <p className="mt-2 text-sm text-slate-600">{post.excerpt}</p>
              <div className="mt-4 flex items-center justify-between text-xs text-slate-500">
                <span>{post.date}</span>
                <span>{post.readTime} min read</span>
              </div>
              <Link
                to={`/blogs/${post.slug}`}
                className="text-primary mt-4 inline-flex text-sm font-medium"
              >
                Read More
              </Link>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}

function BlogDetailPage() {
  const { slug } = useParams()
  const post = blogPosts.find((entry) => entry.slug === slug)

  if (!post) {
    return <NotFoundPage />
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-16">
      <div className="rounded-[32px] border border-slate-200 bg-slate-50 p-6 md:p-10">
        <div className="text-primary text-xs font-medium tracking-[0.2em] uppercase">
          {post.category}
        </div>
        <h1 className="mt-3 text-4xl font-black text-slate-900">
          {post.title}
        </h1>
        <div className="mt-3 text-sm text-slate-500">
          {post.date} · {post.readTime} min read
        </div>
        <img
          src={heroGeneralImage}
          alt="Shipping containers at a freight terminal"
          width="1200"
          height="900"
          loading="lazy"
          className="mt-8 aspect-[16/8] w-full object-cover"
        />
        <p className="mt-8 text-lg text-slate-600">{post.excerpt}</p>
        <div className="mt-8 space-y-4 text-slate-700">
          {post.body.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </div>
      <div className="mt-10">
        <h2 className="text-2xl font-bold text-slate-900">Related posts</h2>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {blogPosts
            .filter((entry) => entry.slug !== slug)
            .slice(0, 3)
            .map((entry) => (
              <Link
                key={entry.slug}
                to={`/blogs/${entry.slug}`}
                className="rounded-xl border border-slate-200 bg-white p-4"
              >
                <div className="font-semibold text-slate-900">
                  {entry.title}
                </div>
                <div className="mt-2 text-sm text-slate-600">
                  {entry.excerpt}
                </div>
              </Link>
            ))}
        </div>
      </div>
    </div>
  )
}

function ContactPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-16">
      <SectionHeading
        eyebrow="Contact"
        title="Speak with our team about your cargo or clearance needs."
      />
      <div className="mt-8 grid gap-8 md:grid-cols-[0.9fr_1.1fr]">
        <div className="space-y-5">
          <div className="flex items-start gap-3">
            <Phone className="text-primary mt-1 h-5 w-5" /> {siteConfig.phone}
          </div>
          <div className="flex items-start gap-3">
            <Mail className="text-primary mt-1 h-5 w-5" /> {siteConfig.email}
          </div>
          <div className="flex items-start gap-3">
            <MapPin className="text-primary mt-1 h-5 w-5" />{' '}
            {siteConfig.address}
          </div>
          <div className="flex items-start gap-3">
            <Clock3 className="text-primary mt-1 h-5 w-5" /> {siteConfig.hours}
          </div>
        </div>
        <div className="rounded-[28px] border border-slate-200 bg-slate-50 p-5">
          <QuoteForm />
        </div>
      </div>
      <div className="mt-10 overflow-hidden rounded-[28px] border border-slate-200">
        <iframe
          title="Contact map"
          src={siteConfig.mapUrl}
          loading="lazy"
          className="h-[320px] w-full"
        />
      </div>
    </div>
  )
}

function TermsPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-16">
      <h1 className="text-4xl font-black text-slate-900">Terms & Conditions</h1>
      <div className="mt-6 space-y-4 text-slate-600">
        <p>
          This page is placeholder content for a legal terms document and should
          be reviewed by counsel before going live.
        </p>
        <p>
          Sample terms may include service definitions, liability limitations,
          customer responsibilities, payment terms, and dispute resolution
          policies.
        </p>
        <p>
          All legal language, regional compliance and business terms should be
          tailored to the actual operations, jurisdiction and service model
          before launch.
        </p>
      </div>
    </div>
  )
}

function NotFoundPage() {
  return (
    <div className="mx-auto max-w-xl px-4 py-24 text-center">
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

function QuoteForm({ onSuccess }: { onSuccess?: () => void }) {
  const form = useForm<QuoteFormValues>({
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

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = form

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
            <p className="mt-1 text-sm text-red-600">
              {errors.country.message}
            </p>
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

function SectionHeading({
  eyebrow,
  title,
}: {
  eyebrow: string
  title: string
}) {
  return (
    <div>
      <p className="text-primary text-xs font-bold tracking-[0.18em] uppercase">
        {eyebrow}
      </p>
      <h2 className="font-display text-deep-teal mt-2 max-w-2xl text-3xl font-semibold md:text-4xl">
        {title}
      </h2>
    </div>
  )
}

export default App
