import { createContext, useContext, useEffect, useState } from 'react'
import { BrowserRouter, Link, NavLink, Route, Routes, useLocation, useParams } from 'react-router-dom'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import {
  ArrowRight,
  ArrowUp,
  Check,
  ChevronRight,
  Clock3,
  Globe,
  Mail,
  MapPin,
  Menu,
  MessageCircle,
  Phone,
  ShieldCheck,
  Star,
  Truck,
  Warehouse,
} from 'lucide-react'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { Textarea } from '@/components/ui/textarea'
import { siteConfig } from '@/config/site'
import { countries } from '@/data/countries'
import { blogPosts } from '@/data/posts'
import { partnerGroups } from '@/data/partners'
import { serviceGroups } from '@/data/navigation'
import { services, xToKenyaServices } from '@/data/services'
import { testimonials } from '@/data/testimonials'
import { useCountUp } from '@/hooks/useCountUp'
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
import tntLogoImage from '@/assets/tnt8 2.jpg'

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

const heroSlides = [
  {
    title: 'Fast, Reliable Clearing and Forwarding Company in Kenya',
    subtitle: 'Trusted customs support for imports, exports and regional freight.',
    badge: 'Trusted logistics partner',
    image: heroGeneralImage,
  },
  {
    title: 'Air Freight That Keeps Business Moving',
    subtitle: 'Urgent cargo, deadline-sensitive deliveries and fast customs coordination.',
    badge: 'Air cargo',
    image: heroAirImage,
  },
  {
    title: 'Ocean Freight Solutions for High-Volume Cargo',
    subtitle: 'Responsive port handling, customs release and smooth inland logistics.',
    badge: 'Sea cargo',
    image: heroSeaImage,
  },
  {
    title: 'Road Freight for Regional Distribution',
    subtitle: 'Flexible haulage and dependable last-mile transport across East Africa.',
    badge: 'Road freight',
    image: heroRoadImage,
  },
]

const stats = [
  { label: 'Years of Experience', value: '15+' },
  { label: 'Transportation Trucks', value: '50+' },
  { label: 'Delivered Packages', value: '10,000+' },
  { label: 'Satisfied Clients', value: '1,279+' },
]

const whyChooseUs = [
  'Worldwide Logistics Network',
  'Personalized Logistics Solutions',
  'Specialized Cargo Handling',
  '24/7 Shipment Support',
  'On-Time Delivery Commitment',
  'Trusted Clearing Agent',
]

const homeServiceCards = [
  { title: 'General Cargo', description: 'Efficient movement of everyday imports and exports with end-to-end coordination.', slug: 'general-cargo', image: serviceGeneralCargoImage },
  { title: 'Pharmaceuticals', description: 'Temperature-sensitive handling built for compliance and reliability.', slug: 'pharmaceuticals-logistics', image: servicePharmaceuticalsImage },
  { title: 'Horticulture Exports', description: 'Fresh produce export support designed around fast turnaround and quality control.', slug: 'horticulture-exports', image: serviceHorticultureImage },
]

const moreServices = [
  { title: 'Perishables & Horticulture', subtitle: 'Cold chain support from dispatch to destination', slug: 'perishables-logistics' },
  { title: 'Medical Equipment Importation', subtitle: 'Regulated movement for health-critical inventory', slug: 'pharmaceuticals-logistics' },
  { title: 'Cargo Transportation', subtitle: 'Regional and cross-border road hauled freight', slug: 'road-cargo-transportation' },
  { title: 'Car Importation & Clearing', subtitle: 'Complete vehicle import processing and customs release', slug: 'car-importation' },
  { title: 'Warehousing', subtitle: 'Secure storage for goods awaiting dispatch or consolidation', slug: 'warehousing' },
  { title: 'Imports & Exports Consultancy', subtitle: 'Practical planning for customs and global trade operations', slug: 'imports-exports-consultancy' },
]

const processSteps = ['Request a Quote', 'Submit Shipping Documents', 'We Clear Your Cargo', 'We Deliver']

const quoteOptions = [
  'General Cargo Clearing & Forwarding',
  'Sea Freight',
  'Road Freight',
  'Pharmaceuticals Logistics',
  'Perishables Logistics',
  'Road Cargo Transportation',
  'Rail Cargo Transportation',
  'Car Importation & Clearing',
  'Warehousing',
  'Imports and Exports Consultancy',
  'Horticulture Exports',
  'Curio Exports and Logistics',
]

const CURRENT_YEAR = new Date().getFullYear()

const QuoteDialogContext = createContext<{ open: boolean; setOpen: (open: boolean) => void } | null>(null)

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
    <QuoteDialogContext.Provider value={{ open: quoteOpen, setOpen: setQuoteOpen }}>
      <BrowserRouter basename="/cargo-site">
        <SiteShell />
      </BrowserRouter>
    </QuoteDialogContext.Provider>
  )
}

function SiteShell() {
  const [showBackToTop, setShowBackToTop] = useState(false)
  const [showNavigation, setShowNavigation] = useState(false)
  const { setOpen } = useQuoteDialog()
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => {
      const scrollPosition = window.scrollY
      setShowBackToTop(scrollPosition > 300)
      setShowNavigation(scrollPosition > 80)
    }
    window.addEventListener('scroll', onScroll)
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [location.pathname])

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Topbar />
      <Header setQuoteOpen={setOpen} visible={showNavigation} />
      <main>
        <Routes>
          <Route path="/" element={<HomePage setQuoteOpen={setOpen} />} />
          <Route path="/about" element={<AboutPage setQuoteOpen={setOpen} />} />
          <Route path="/services" element={<ServicesPage setQuoteOpen={setOpen} />} />
          <Route path="/services/:slug" element={<ServiceDetailPage setQuoteOpen={setOpen} />} />
          <Route path="/partnerships" element={<PartnershipsPage setQuoteOpen={setOpen} />} />
          <Route path="/blogs" element={<BlogPage />} />
          <Route path="/blogs/:slug" element={<BlogDetailPage />} />
          <Route path="/contact" element={<ContactPage setQuoteOpen={setOpen} />} />
          <Route path="/terms" element={<TermsPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
      <Footer setQuoteOpen={setOpen} />
      <FloatingActions showBackToTop={showBackToTop} setQuoteOpen={setOpen} />
      <QuoteDialog />
    </div>
  )
}

function Topbar() {
  return (
    <div className="hidden border-b border-teal-700/30 bg-[#0f2b2c] text-sm text-slate-200 md:block">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-2">
        <div className="flex items-center gap-4">
          {siteConfig.socials.map((social) => (
            <a key={social.label} href={social.href} target="_blank" rel="noreferrer" className="transition hover:text-white" aria-label={social.label}>
              <SocialIcon type={social.platform} />
            </a>
          ))}
        </div>
        <div className="flex items-center gap-6">
          <a href={`tel:${siteConfig.phoneHref}`} className="inline-flex items-center gap-2 hover:text-white">
            <Phone className="h-4 w-4" />
            {siteConfig.phone}
          </a>
          <a href={`mailto:${siteConfig.email}`} className="inline-flex items-center gap-2 hover:text-white">
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
        <svg viewBox="0 0 24 24" className={common} fill="currentColor" aria-hidden="true">
          <path d="M13.5 22v-8h2.7l.4-3h-3.1V7.5c0-.9.3-1.5 1.6-1.5H17V3.1c-.3 0-1.3-.1-2.5-.1-2.5 0-4.2 1.5-4.2 4.3V11H8v3h2.3v8h3.2Z" />
        </svg>
      )
    case 'x':
      return (
        <svg viewBox="0 0 24 24" className={common} fill="currentColor" aria-hidden="true">
          <path d="M18.9 3h3.2l-7 8 8.3 10h-6.5l-5.1-6.2L3.5 21H.3l7.1-8.1L0 3h6.7l4.6 5.8L18.9 3Zm-1.1 16.1h1.8L6.9 4.8H5.1l12.7 14.3Z" />
        </svg>
      )
    case 'instagram':
      return (
        <svg viewBox="0 0 24 24" className={common} fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
          <rect x="3.5" y="3.5" width="17" height="17" rx="4.5" />
          <circle cx="12" cy="12" r="4.2" />
          <circle cx="17.3" cy="6.8" r="1.1" fill="currentColor" stroke="none" />
        </svg>
      )
    case 'tiktok':
      return (
        <svg viewBox="0 0 24 24" className={common} fill="currentColor" aria-hidden="true">
          <path d="M15.6 3c.4 1.5 1.4 2.7 3 3.5v2.6c-1.4 0-2.7-.4-3.8-1.1v6.6c0 3-2.4 5.4-5.4 5.4S4.9 16.6 4.9 13.6 7.3 8.2 10.3 8.2c.5 0 1 .1 1.5.2V11c-.5-.1-1-.2-1.5-.2-1.7 0-3 1.4-3 3.1s1.3 3.1 3 3.1 3-1.4 3-3.1V3h-3.7Z" />
        </svg>
      )
    case 'linkedin':
      return (
        <svg viewBox="0 0 24 24" className={common} fill="currentColor" aria-hidden="true">
          <path d="M6.9 8.2A1.7 1.7 0 1 1 6.8 4.8a1.7 1.7 0 0 1 .1 3.4ZM5.2 9.5h3.5v9.5H5.2zm5.5 0h3.4v1.3h.1c.5-.9 1.7-1.9 3.5-1.9 3.7 0 4.4 2.4 4.4 5.6v5.5h-3.5v-5.1c0-1.2 0-2.7-1.6-2.7s-1.9 1.3-1.9 2.6v5.2H10.7V9.5Z" />
        </svg>
      )
    case 'whatsapp':
      return (
        <svg viewBox="0 0 448 512" className={common} fill="currentColor" aria-hidden="true">
          <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32 101.5 32 1.9 131.5 1.9 254c0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.4 0 222-99.6 222-222 0-59.3-23.1-115.1-65-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3 18.6-68.1-4.4-7C49.5 323.3 40 289.4 40 254 40 152.8 122.8 70 224 70c49.1 0 95.2 19.2 129.9 53.9s53.9 80.9 53.9 130.1c-.1 101.2-82.9 184.7-184 184.7zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8s-14.3 18-17.6 21.8c-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.4 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2s-9.7 1.4-14.8 6.9c-5.1 5.5-19.4 19-19.4 46.3s19.9 53.7 22.6 57.4c2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.4-5.1-3.8-10.6-6.6z" />
        </svg>
      )
    default:
      return <MessageCircle className={common} />
  }
}

function Header({ setQuoteOpen, visible }: { setQuoteOpen: (open: boolean) => void; visible: boolean }) {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <header className={cn('fixed inset-x-0 top-0 z-40 border-b border-slate-200 bg-white/95 shadow-sm backdrop-blur transition duration-300 ease-out', visible ? 'translate-y-0 opacity-100' : 'pointer-events-none -translate-y-full opacity-0')}>
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4">
        <Link to="/" className="order-2 flex min-w-0 items-center lg:order-1">
          <img src={tntLogoImage} alt="Tested & Trusted Logistics" className="h-12 w-40 rounded-lg object-cover object-[50%_75%] sm:h-14 sm:w-48" />
        </Link>

        <nav className="order-2 hidden items-center gap-6 lg:flex">
          <NavLink to="/" className={({ isActive }) => cn('text-sm font-medium transition', isActive ? 'text-primary' : 'text-slate-700 hover:text-primary')}>Home</NavLink>
          <NavLink to="/about" className={({ isActive }) => cn('text-sm font-medium transition', isActive ? 'text-primary' : 'text-slate-700 hover:text-primary')}>About Us</NavLink>
          <div className="group relative">
            <button type="button" className="inline-flex items-center gap-1 text-sm font-medium text-slate-700 transition hover:text-primary">
              Services
              <ChevronRight className="h-4 w-4 rotate-90" />
            </button>
            <div className="invisible absolute left-1/2 top-full mt-4 w-[820px] -translate-x-1/2 rounded-2xl border border-slate-200 bg-white p-4 opacity-0 shadow-xl transition-all group-hover:visible group-hover:opacity-100">
              <div className="grid grid-cols-4 gap-4">
                {serviceGroups.map((group) => (
                  <div key={group.title}>
                    <p className="mb-3 text-sm font-semibold text-slate-800">{group.title}</p>
                    <ul className="space-y-2 text-sm text-slate-600">
                      {group.items.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
              <div className="mt-4 grid grid-cols-3 gap-3 border-t border-slate-200 pt-4">
                {[1, 2, 3].map((index) => (
                  <div key={index} className="overflow-hidden rounded-xl border border-slate-200 bg-slate-50">
                    <div className="h-20 bg-gradient-to-br from-teal-100 to-slate-100" />
                  </div>
                ))}
              </div>
              <div className="mt-4 flex justify-end">
                <Link to="/services" className="font-medium text-primary">View Services</Link>
              </div>
            </div>
          </div>
          <NavLink to="/partnerships" className={({ isActive }) => cn('text-sm font-medium transition', isActive ? 'text-primary' : 'text-slate-700 hover:text-primary')}>Partnerships</NavLink>
          <NavLink to="/blogs" className={({ isActive }) => cn('text-sm font-medium transition', isActive ? 'text-primary' : 'text-slate-700 hover:text-primary')}>Blogs</NavLink>
          <NavLink to="/contact" className={({ isActive }) => cn('text-sm font-medium transition', isActive ? 'text-primary' : 'text-slate-700 hover:text-primary')}>Contact Us</NavLink>
        </nav>

        <div className="order-3 hidden items-center gap-3 lg:flex">
          <Button variant="outline" onClick={() => setQuoteOpen(true)}>Inquire</Button>
        </div>

        <div className="order-1 lg:hidden">
          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger asChild>
              <button type="button" aria-label="Open menu" className="rounded-xl border border-slate-200 bg-white p-2.5 text-slate-700 shadow-sm transition hover:border-primary hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">
                <Menu className="h-5 w-5" />
              </button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[min(88vw,360px)] overflow-y-auto p-0">
              <div className="space-y-4 p-5">
                <div className="flex items-center justify-between">
                  <img src={tntLogoImage} alt="Tested & Trusted" className="h-12 w-40 rounded-lg object-cover object-[50%_75%]" />
                </div>
                <div className="space-y-2">
                  {['/', '/about', '/services', '/partnerships', '/blogs', '/contact'].map((href) => (
                    <NavLink key={href} to={href} onClick={() => setMobileOpen(false)} className={({ isActive }) => cn('block rounded-lg px-3 py-2 text-sm font-medium', isActive ? 'bg-teal-50 text-primary' : 'text-slate-700 hover:bg-slate-50')}>
                      {href === '/' ? 'Home' : href === '/about' ? 'About Us' : href === '/services' ? 'Services' : href === '/partnerships' ? 'Partnerships' : href === '/blogs' ? 'Blogs' : 'Contact Us'}
                    </NavLink>
                  ))}
                </div>
                <Accordion type="single" collapsible className="border-t border-slate-200 pt-4">
                  {serviceGroups.map((group) => (
                    <AccordionItem key={group.title} value={group.title}>
                      <AccordionTrigger className="text-left text-sm font-medium text-slate-800">{group.title}</AccordionTrigger>
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
                <Button className="w-full" onClick={() => { setQuoteOpen(true); setMobileOpen(false) }}>Request a quote</Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}

function Footer({ setQuoteOpen }: { setQuoteOpen: (open: boolean) => void }) {
  return <FooterInner setQuoteOpen={setQuoteOpen} />
}

function FooterInner({ setQuoteOpen }: { setQuoteOpen: (open: boolean) => void }) {
  const currentYear = CURRENT_YEAR

  return (
    <footer className="bg-[#0f2b2c] text-slate-200">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 md:grid-cols-2 xl:grid-cols-4">
        <div>
          <div className="mb-4 flex items-center gap-3">
            <img src={tntLogoImage} alt="Tested & Trusted Logistics" className="h-14 w-44 rounded-lg object-cover object-[50%_75%]" />
          </div>
          <p className="mb-4 text-sm text-slate-300">{siteConfig.tagline}</p>
          <Button onClick={() => setQuoteOpen(true)} className="mb-4">Request Quote</Button>
          <div className="flex items-center gap-3">
            {siteConfig.socials.map((social) => (
              <a key={social.label} href={social.href} target="_blank" rel="noreferrer" className="rounded-full border border-slate-600 p-2 hover:border-white hover:text-white" aria-label={social.label}>
                <SocialIcon type={social.platform} />
              </a>
            ))}
          </div>
        </div>

        <div>
          <h3 className="mb-4 text-lg font-semibold text-white">Quick Links</h3>
          <ul className="space-y-3 text-sm text-slate-300">
            {['Services', 'About Us', 'Partnership', 'Blogs', 'Terms & Conditions'].map((label, index) => (
              <li key={label}><Link to={['/services', '/about', '/partnerships', '/blogs', '/terms'][index]} className="hover:text-white">{label}</Link></li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="mb-4 text-lg font-semibold text-white">Services</h3>
          <ul className="space-y-3 text-sm text-slate-300">
            {['Clearing and Forwarding', 'Cargo Transportation', 'Warehousing', 'Imports & Exports Consultancy', 'Car Importation'].map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="mb-4 text-lg font-semibold text-white">Contact</h3>
          <ul className="space-y-3 text-sm text-slate-300">
            <li className="inline-flex items-start gap-2"><Phone className="mt-0.5 h-4 w-4" /> {siteConfig.phone}</li>
            <li className="inline-flex items-start gap-2"><Mail className="mt-0.5 h-4 w-4" /> {siteConfig.email}</li>
            <li className="inline-flex items-start gap-2"><MapPin className="mt-0.5 h-4 w-4" /> {siteConfig.address}</li>
            <li className="inline-flex items-start gap-2"><Clock3 className="mt-0.5 h-4 w-4" /> {siteConfig.hours}</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-slate-700">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-4 py-4 text-sm text-slate-300 md:flex-row">
          <p>© {currentYear} Tested &amp; Trusted. All rights reserved.</p>
          <p>{siteConfig.disclaimer}</p>
          <button type="button" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="inline-flex items-center gap-2 text-white">
            <ArrowUp className="h-4 w-4" /> Go to top
          </button>
        </div>
      </div>
    </footer>
  )
}

function FloatingActions({ showBackToTop, setQuoteOpen }: { showBackToTop: boolean; setQuoteOpen: (open: boolean) => void }) {
  return (
    <>
      <div className="fixed bottom-5 right-4 z-50 flex flex-col items-end gap-3 sm:right-6">
        <div className="group relative">
          <a href={buildWhatsAppLink()} target="_blank" rel="noreferrer" aria-label="Chat with us on WhatsApp" className="flex h-14 w-14 items-center justify-center rounded-full bg-[#25d366] text-white shadow-lg shadow-green-900/20 ring-4 ring-white transition duration-200 hover:scale-105 hover:bg-[#1db954] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-green-200">
            <SocialIcon type="whatsapp" />
          </a>
          <span className="pointer-events-none absolute right-[calc(100%+0.75rem)] top-1/2 -translate-y-1/2 whitespace-nowrap rounded-lg bg-slate-900 px-3 py-2 text-xs font-semibold text-white opacity-0 shadow-lg transition group-hover:opacity-100 group-focus-within:opacity-100">Chat on WhatsApp</span>
        </div>
        <div className="group relative">
          <button type="button" onClick={() => setQuoteOpen(true)} aria-label="Request a quote" className="flex h-14 w-14 items-center justify-center rounded-full bg-[#0f2b2c] text-white shadow-lg shadow-slate-900/20 ring-4 ring-white transition duration-200 hover:scale-105 hover:bg-[#174342] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-cyan-200">
            <ArrowRight className="h-6 w-6 text-cyan-300" />
          </button>
          <span className="pointer-events-none absolute right-[calc(100%+0.75rem)] top-1/2 -translate-y-1/2 whitespace-nowrap rounded-lg bg-slate-900 px-3 py-2 text-xs font-semibold text-white opacity-0 shadow-lg transition group-hover:opacity-100 group-focus-within:opacity-100">Request a quote</span>
        </div>
      </div>

      {showBackToTop && (
        <button type="button" aria-label="Back to top" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="fixed bottom-6 left-1/2 z-40 flex h-12 w-12 -translate-x-1/2 items-center justify-center rounded-full bg-primary text-slate-950 shadow-lg shadow-cyan-900/20 ring-4 ring-white/90 transition hover:scale-110 animate-back-to-top">
          <ArrowUp className="h-5 w-5" />
        </button>
      )}
    </>
  )
}

function QuoteDialog() {
  const { open, setOpen } = useQuoteDialog()
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

  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = form

  const onSubmit = async (values: QuoteFormValues) => {
    if (values.companyHidden) {
      return
    }

    try {
      await submitQuote(values)
      toast.success('Your quote request has been sent successfully.')
      reset()
      setOpen(false)
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Unable to send your request.')
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Request a Quote</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="fullName">Full name *</Label>
              <Input id="fullName" {...register('fullName')} aria-invalid={Boolean(errors.fullName)} />
              {errors.fullName && <p className="text-sm text-red-600">{errors.fullName.message}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email *</Label>
              <Input id="email" type="email" {...register('email')} aria-invalid={Boolean(errors.email)} />
              {errors.email && <p className="text-sm text-red-600">{errors.email.message}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone *</Label>
              <Input id="phone" type="tel" {...register('phone')} aria-invalid={Boolean(errors.phone)} />
              {errors.phone && <p className="text-sm text-red-600">{errors.phone.message}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="country">Country *</Label>
              <select id="country" {...register('country')} className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
                {countries.map((country) => (
                  <option key={country} value={country}>{country}</option>
                ))}
              </select>
              {errors.country && <p className="text-sm text-red-600">{errors.country.message}</p>}
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="service">Service *</Label>
            <select id="service" {...register('service')} className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
              {quoteOptions.map((option) => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
            {errors.service && <p className="text-sm text-red-600">{errors.service.message}</p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="message">Message</Label>
            <Textarea id="message" {...register('message')} placeholder="Tell us about your cargo needs" />
          </div>
          <div className="hidden">
            <Input {...register('companyHidden')} />
          </div>
          <div className="flex justify-end gap-3">
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
            <Button type="submit" disabled={isSubmitting}>{isSubmitting ? 'Sending...' : 'Submit Request'}</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}

function HomePage({ setQuoteOpen }: { setQuoteOpen: (open: boolean) => void }) {
  const [activeSlide, setActiveSlide] = useState(0)

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveSlide((current) => (current + 1) % heroSlides.length)
    }, 6500)
    return () => window.clearInterval(timer)
  }, [])

  return (
    <>
      <section className="relative overflow-hidden bg-slate-100">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(20,184,166,0.2),_transparent_40%)]" />
        <div className="relative mx-auto grid max-w-7xl gap-10 px-4 py-12 md:grid-cols-2 md:items-center md:py-20">
          <div key={heroSlides[activeSlide].title} className="animate-carousel-content">
            <Badge className="mb-4 bg-teal-100 text-teal-800">{heroSlides[activeSlide].badge}</Badge>
            <h1 className="max-w-xl text-4xl font-black leading-tight text-slate-900 md:text-6xl">{heroSlides[activeSlide].title}</h1>
            <p className="mt-4 max-w-lg text-lg text-slate-600">{heroSlides[activeSlide].subtitle}</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button onClick={() => setQuoteOpen(true)} size="lg">Request Quote</Button>
              <a href={buildWhatsAppLink()} target="_blank" rel="noreferrer" className="inline-flex h-11 items-center justify-center rounded-md border border-primary bg-white px-6 text-sm font-medium text-primary transition hover:bg-teal-50">
                WhatsApp Us
              </a>
            </div>
            <div className="mt-8 flex flex-wrap gap-4 text-sm text-slate-700">
              {['Licensed Customs Agent', 'KIFWA Certified', 'Global Logistics Network'].map((item) => (
                <span key={item} className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-2"><Check className="h-4 w-4 text-primary" /> {item}</span>
              ))}
            </div>
          </div>
          <div className="relative">
            <div className="overflow-hidden rounded-[32px] border border-slate-200 bg-white p-3 shadow-xl">
              <div className="relative h-[260px] overflow-hidden rounded-[22px] bg-slate-100 sm:h-[340px] md:h-[420px]">
                {heroSlides.map((slide, index) => (
                  <img
                    key={slide.title}
                    src={slide.image}
                    alt={index === activeSlide ? slide.title : ''}
                    aria-hidden={index !== activeSlide}
                    className={cn('absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ease-in-out', index === activeSlide ? 'opacity-100' : 'opacity-0')}
                  />
                ))}
              </div>
            </div>
            <div className="absolute -bottom-5 left-6 rounded-2xl bg-primary px-4 py-3 text-white shadow-lg">
              <div className="text-2xl font-bold">24/7</div>
              <div className="text-xs uppercase tracking-[0.25em] text-teal-100">Shipment support</div>
            </div>
          </div>
        </div>
        <div className="mx-auto flex max-w-7xl justify-center gap-3 pb-6">
          {heroSlides.map((slide, index) => (
            <button key={slide.title} type="button" onClick={() => setActiveSlide(index)} className={cn('h-2.5 rounded-full transition-all', activeSlide === index ? 'w-10 bg-primary' : 'w-2.5 bg-slate-300')} aria-label={`View slide ${index + 1}`} />
          ))}
        </div>
      </section>

      <section className="border-y border-slate-200 bg-white py-8">
        <div className="mx-auto max-w-7xl px-4">
          <div className="grid gap-4 md:grid-cols-4">
            {services.slice(0, 4).map((service) => (
              <Card key={service.slug} className="overflow-hidden border-slate-200 p-0">
                <div className="h-36 bg-gradient-to-br from-teal-50 via-white to-slate-100 p-3">
                  <img src={serviceImageBySlug[service.slug] ?? heroGeneralImage} alt={service.title} className="h-full w-full rounded-lg object-cover" />
                </div>
                <div className="p-5">
                  <h3 className="mb-2 text-lg font-semibold text-slate-900">{service.title}</h3>
                  <p className="mb-4 text-sm text-slate-600">{service.summary}</p>
                  <Link to={`/services/${service.slug}`} className="text-sm font-medium text-primary">View Service</Link>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16">
        <SectionHeading eyebrow="Top services" title="Freight solutions built around cargo movement, compliance and time." />
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {homeServiceCards.map((service) => (
            <Card key={service.title} className="overflow-hidden border-slate-200 bg-slate-50">
              <img src={service.image} alt={service.title} className="h-52 w-full object-cover" />
              <div className="p-5">
                <h3 className="mb-2 text-xl font-semibold text-slate-900">{service.title}</h3>
                <p className="mb-4 text-sm text-slate-600">{service.description}</p>
                <button type="button" onClick={() => setQuoteOpen(true)} className="text-sm font-medium text-primary">{service.title === 'General Cargo' ? 'Get a Quote' : service.title === 'Pharmaceuticals' ? 'Speak to Expert' : 'Start Export Process'}</button>
              </div>
            </Card>
          ))}
        </div>
      </section>

      <section className="bg-slate-50 py-16">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 md:grid-cols-2 md:items-center">
          <div>
            <SectionHeading eyebrow="Who we are" title="Supporting businesses with efficient customs and road-to-door logistics." />
            <p className="mt-4 text-slate-600">We bring together documentation, customs clearance and transport coordination to help goods move with fewer delays and less uncertainty.</p>
            <ul className="mt-6 space-y-3 text-slate-700">
              {['Clear goods efficiently', 'Move cargo across air, sea and road', 'Handle documentation and KRA compliance'].map((item) => (
                <li key={item} className="inline-flex items-center gap-3"><Check className="h-5 w-5 text-primary" /> {item}</li>
              ))}
            </ul>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {['Last-mile delivery', 'Car importation', 'Warehousing', 'Consultancy'].map((item) => (
                <div key={item} className="rounded-lg border border-slate-200 bg-white p-3 text-sm font-medium text-slate-700">{item}</div>
              ))}
            </div>
            <Button className="mt-8" onClick={() => setQuoteOpen(true)}>About Us</Button>
          </div>
          <div>
            <img src={heroGeneralImage} alt="Cargo logistics team" className="w-full rounded-[28px] border border-slate-200 shadow-lg" />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16">
        <SectionHeading eyebrow="Clearing and forwarding" title="Core services for imports, exports and secure cargo movement." />
        <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {services.slice(0, 6).map((service) => (
            <Card key={service.slug} className="overflow-hidden border-slate-200 p-0">
              <img src={serviceImageBySlug[service.slug] ?? heroGeneralImage} alt={service.title} className="h-48 w-full object-cover" />
              <div className="p-5">
                <h3 className="mb-2 text-xl font-semibold text-slate-900">{service.title}</h3>
                <p className="mb-4 text-sm text-slate-600">{service.summary}</p>
                <Link to={`/services/${service.slug}`} className="text-sm font-medium text-primary">Learn more</Link>
              </div>
            </Card>
          ))}
        </div>
      </section>

      <section className="bg-[#0f2b2c] py-16 text-white">
        <div className="mx-auto max-w-7xl px-4">
          <div className="grid gap-6 md:grid-cols-4">
            {stats.map((stat) => (
              <StatCounter key={stat.label} label={stat.label} value={stat.value} />
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16">
        <SectionHeading eyebrow="More logistics services" title="A wider partner network for trade and distribution." />
        <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {moreServices.map((service) => (
            <div key={service.title} className="rounded-2xl border border-slate-200 bg-slate-50 p-5 shadow-sm">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-teal-100 text-primary"><Truck className="h-5 w-5" /></div>
              <h3 className="text-xl font-semibold text-slate-900">{service.title}</h3>
              <p className="mt-2 text-sm text-slate-600">{service.subtitle}</p>
              <Link to={`/services/${service.slug}`} className="mt-4 inline-flex items-center text-sm font-medium text-primary">View More</Link>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-slate-50 py-16">
        <div className="mx-auto max-w-7xl px-4">
          <SectionHeading eyebrow="Why choose us" title="Clear guidance, careful handling and dependable delivery." />
          <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {whyChooseUs.map((item, index) => (
              <div key={item} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-teal-50 text-primary">
                  {index === 0 ? <Globe className="h-5 w-5" /> : index === 1 ? <ShieldCheck className="h-5 w-5" /> : index === 2 ? <Warehouse className="h-5 w-5" /> : index === 3 ? <Truck className="h-5 w-5" /> : index === 4 ? <Check className="h-5 w-5" /> : <Star className="h-5 w-5" />}
                </div>
                <h3 className="text-lg font-semibold text-slate-900">{item}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16">
        <SectionHeading eyebrow="Trusted partners & global network" title="Connected with key shipping and freight partners." />
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {partnerGroups.map((group) => (
            <div key={group.label} className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
              <h3 className="mb-4 text-lg font-semibold text-slate-900">{group.label}</h3>
              <div className="grid grid-cols-2 gap-3">
                {group.items.map((item) => (
                  <div key={item} className="flex h-14 items-center justify-center rounded-lg border border-slate-200 bg-white text-sm font-medium text-slate-600">{item}</div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="mx-auto max-w-7xl px-4">
          <SectionHeading eyebrow="Licensed & certified" title="Operationally compliant for import and export work across Kenya." />
          <p className="mt-4 max-w-2xl text-slate-600">Our team supports customs preparation, KRA process alignment and port coordination so your cargo moves with clarity and confidence.</p>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {['KNCCI Membership', 'KIFWA Membership Certificate', 'Customs Clearing License'].map((label) => (
              <button key={label} type="button" className="overflow-hidden rounded-2xl border border-slate-200 bg-slate-50 text-left shadow-sm">
                <div className="h-52 bg-gradient-to-br from-slate-200 to-teal-100 p-6">
                  <div className="flex h-full items-center justify-center rounded-xl border border-dashed border-slate-400 bg-white/80 text-center text-sm font-medium text-slate-700">{label}</div>
                </div>
                <div className="p-4 text-sm text-slate-700">{label}</div>
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16">
        <div className="grid gap-8 rounded-[32px] border border-slate-200 bg-slate-50 p-6 md:grid-cols-2 md:p-10">
          <div>
            <SectionHeading eyebrow="We’re here to help" title="Move cargo with less friction and clearer communication." />
            <p className="mt-4 text-slate-600">We assist with essential logistics steps, cargo readiness, documentation and customs coordination to keep your shipment aligned with KRA expectations.</p>
            <ul className="mt-6 space-y-3 text-slate-700">
              {['Logistics essentials planning', 'KRA-certified guidance'].map((item) => (
                <li key={item} className="inline-flex items-center gap-3"><Check className="h-5 w-5 text-primary" /> {item}</li>
              ))}
            </ul>
            <div className="mt-6 flex h-20 items-center justify-center rounded-2xl border border-slate-200 bg-white text-slate-500">Brand logo placeholder</div>
          </div>
          <div className="rounded-[24px] bg-white p-5 shadow-sm ring-1 ring-slate-200">
            <QuoteForm setQuoteOpen={setQuoteOpen} />
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-16">
        <div className="mx-auto max-w-7xl px-4">
          <SectionHeading eyebrow="How it works" title="A straightforward process from inquiry to final delivery." />
          <div className="mt-8 grid gap-6 md:grid-cols-4">
            {processSteps.map((step, index) => (
              <div key={step} className="relative rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary text-lg font-bold text-white">{index + 1}</div>
                <h3 className="text-lg font-semibold text-slate-900">{step}</h3>
                {index < processSteps.length - 1 && <div className="hidden md:block absolute -right-3 top-1/2 h-px w-6 bg-slate-300" />}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16">
        <SectionHeading eyebrow="Blogs" title="Recent logistics insights and industry updates." />
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {blogPosts.slice(0, 3).map((post) => (
            <Card key={post.slug} className="overflow-hidden border-slate-200 bg-white p-0">
              <div className="h-44 bg-gradient-to-br from-teal-50 to-slate-100" />
              <div className="p-5">
                <p className="text-xs font-medium uppercase tracking-[0.2em] text-primary">{post.category}</p>
                <h3 className="mt-3 text-xl font-semibold text-slate-900">{post.title}</h3>
                <p className="mt-2 text-sm text-slate-600">{post.excerpt}</p>
                <div className="mt-4 text-xs text-slate-500">{post.readTime} min read</div>
                <Link to={`/blogs/${post.slug}`} className="mt-4 inline-flex items-center text-sm font-medium text-primary">Read more</Link>
              </div>
            </Card>
          ))}
        </div>
      </section>

      <section className="bg-slate-100 py-16">
        <div className="mx-auto max-w-7xl px-4">
          <SectionHeading eyebrow="Testimonials" title="Clients trust us to manage critical cargo and customs steps." />
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {testimonials.slice(0, 3).map((item) => (
              <Card key={item.name} className="border-slate-200 bg-white p-5">
                <div className="mb-4 flex text-amber-400">
                  {Array.from({ length: 5 }).map((_, index) => <Star key={index} className="h-4 w-4 fill-current" />)}
                </div>
                <p className="text-slate-700">“{item.quote}”</p>
                <div className="mt-4 border-t border-slate-200 pt-4">
                  <div className="font-semibold text-slate-900">{item.name}</div>
                  <div className="text-sm text-slate-500">{item.role}</div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-primary py-14 text-white">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 md:flex-row">
          <div>
            <div className="text-sm uppercase tracking-[0.2em] text-teal-100">Need a quote?</div>
            <h2 className="mt-2 text-3xl font-bold">Get a Free Quote</h2>
          </div>
          <div className="flex gap-3">
            <Button variant="secondary" onClick={() => setQuoteOpen(true)}>Request Quote</Button>
            <a href={buildWhatsAppLink()} target="_blank" rel="noreferrer" className="inline-flex h-10 items-center justify-center rounded-md border border-white/30 bg-white/10 px-4 text-sm font-medium text-white transition hover:bg-white/20">WhatsApp Us</a>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16">
        <div className="rounded-[32px] border border-slate-200 bg-slate-50 p-6 md:p-10">
          <SectionHeading eyebrow="Location" title="Visit or talk to our logistics team." />
          <div className="mt-8 grid gap-6 md:grid-cols-[1.1fr_1.4fr]">
            <div className="space-y-4 text-slate-700">
              <div className="flex items-start gap-3"><MapPin className="mt-1 h-5 w-5 text-primary" /> {siteConfig.address}</div>
              <div className="flex items-start gap-3"><Clock3 className="mt-1 h-5 w-5 text-primary" /> {siteConfig.hours}</div>
              <div className="flex items-start gap-3"><Phone className="mt-1 h-5 w-5 text-primary" /> {siteConfig.phone}</div>
              <div className="flex items-start gap-3"><Mail className="mt-1 h-5 w-5 text-primary" /> {siteConfig.email}</div>
            </div>
            <iframe title="Map" src={siteConfig.mapUrl} loading="lazy" className="h-[320px] w-full rounded-2xl border border-slate-200" />
          </div>
        </div>
      </section>
    </>
  )
}

function AboutPage({ setQuoteOpen }: { setQuoteOpen: (open: boolean) => void }) {
  return (
    <div className="mx-auto max-w-7xl px-4 py-16">
      <SectionHeading eyebrow="About us" title="A dedicated clearing and forwarding team for Kenya-bound cargo." />
      <div className="mt-8 grid gap-8 md:grid-cols-2">
        <div>
          <p className="text-lg text-slate-600">We support importers, exporters and commercial clients with practical cargo coordination, customs readiness and a strong regional network.</p>
          <p className="mt-4 text-slate-600">From airport clearance to final delivery, our team works to reduce delays, simplify documentation and keep cargo moving with confidence.</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Button onClick={() => setQuoteOpen(true)}>Request Quote</Button>
            <Link to="/services" className="inline-flex h-10 items-center justify-center rounded-md border border-slate-200 px-4 text-sm font-medium text-slate-800 hover:bg-slate-100">View Services</Link>
          </div>
        </div>
        <img src={heroGeneralImage} alt="Freight company team" className="w-full rounded-[28px]" />
      </div>
      <div className="mt-12 grid gap-6 md:grid-cols-3">
        {['Strong customs coordination', 'Responsive communication', 'Regional logistics network'].map((item) => (
          <div key={item} className="rounded-2xl border border-slate-200 bg-slate-50 p-6">{item}</div>
        ))}
      </div>
      <div className="mt-12 grid gap-6 md:grid-cols-4">
        {stats.map((stat) => (
          <StatCounter key={stat.label} label={stat.label} value={stat.value} />
        ))}
      </div>
    </div>
  )
}

function ServicesPage({ setQuoteOpen }: { setQuoteOpen: (open: boolean) => void }) {
  return (
    <div className="mx-auto max-w-7xl px-4 py-16">
      <SectionHeading eyebrow="Services" title="Cargo and customs solutions across the full logistics chain." />
      <div className="mt-8 space-y-10">
        {['Global to Kenya', 'Clearing & Forwarding', 'General', 'Cargo Transportation'].map((category) => (
          <div key={category}>
            <h2 className="mb-4 text-2xl font-bold text-slate-900">{category}</h2>
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {services.filter((service) => service.category === category || (category === 'Global to Kenya' && xToKenyaServices.includes(service.title))).map((service) => (
                <Card key={service.slug} className="overflow-hidden border-slate-200 p-0">
                  <img src={serviceImageBySlug[service.slug] ?? heroGeneralImage} alt={service.title} className="h-48 w-full object-cover" />
                  <div className="p-5">
                    <h3 className="text-xl font-semibold text-slate-900">{service.title}</h3>
                    <p className="mt-2 text-sm text-slate-600">{service.summary}</p>
                    <div className="mt-4 flex items-center gap-3">
                      <Link to={`/services/${service.slug}`} className="text-sm font-medium text-primary">Learn more</Link>
                      <button type="button" onClick={() => setQuoteOpen(true)} className="text-sm font-medium text-primary">Request quote</button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function ServiceDetailPage({ setQuoteOpen }: { setQuoteOpen: (open: boolean) => void }) {
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
            <Badge className="bg-primary/10 text-primary">{service.category}</Badge>
            <h1 className="mt-4 text-4xl font-black text-slate-900">{service.title}</h1>
            <p className="mt-4 text-lg text-slate-600">{service.summary}</p>
            <div className="mt-6 flex gap-3">
              <Button onClick={() => setQuoteOpen(true)}>Request Quote</Button>
              <Link to="/services" className="inline-flex h-10 items-center justify-center rounded-md border border-slate-200 px-4 text-sm font-medium text-slate-800">Back to services</Link>
            </div>
          </div>
          <img src={serviceImageBySlug[service.slug] ?? heroGeneralImage} alt={service.title} className="h-[280px] w-full rounded-[28px] object-cover" />
        </div>
      </div>

      <div className="mt-10 grid gap-8 md:grid-cols-2">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Overview</h2>
          <p className="mt-4 text-slate-600">{service.overview}</p>
          <h3 className="mt-8 text-xl font-semibold text-slate-900">Benefits</h3>
          <ul className="mt-4 space-y-3">
            {service.benefits.map((benefit) => (
              <li key={benefit} className="inline-flex items-start gap-3 text-slate-700"><Check className="mt-0.5 h-5 w-5 text-primary" /> {benefit}</li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="text-xl font-semibold text-slate-900">Process</h3>
          <ol className="mt-4 space-y-3">
            {service.process.map((step, index) => (
              <li key={step} className="flex items-start gap-3 text-slate-700"><span className="flex h-7 w-7 items-center justify-center rounded-full bg-primary text-sm font-semibold text-white">{index + 1}</span> {step}</li>
            ))}
          </ol>
        </div>
      </div>

      <div className="mt-10">
        <h3 className="text-2xl font-bold text-slate-900">Frequently asked questions</h3>
        <div className="mt-6 space-y-3">
          {service.faqs.map((faq) => (
            <div key={faq.question} className="rounded-xl border border-slate-200 bg-slate-50 p-4">
              <div className="font-semibold text-slate-900">{faq.question}</div>
              <div className="mt-2 text-sm text-slate-600">{faq.answer}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-10">
        <h3 className="text-2xl font-bold text-slate-900">Related services</h3>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {services.filter((entry) => entry.slug !== service.slug).slice(0, 3).map((entry) => (
            <Link key={entry.slug} to={`/services/${entry.slug}`} className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
              <div className="font-semibold text-slate-900">{entry.title}</div>
              <div className="mt-2 text-sm text-slate-600">{entry.summary}</div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

function PartnershipsPage({ setQuoteOpen }: { setQuoteOpen: (open: boolean) => void }) {
  return (
    <div className="mx-auto max-w-7xl px-4 py-16">
      <SectionHeading eyebrow="Partnerships" title="We collaborate with freight, warehousing and trade partners." />
      <div className="mt-8 grid gap-6 md:grid-cols-3">
        {partnerGroups.map((group) => (
          <div key={group.label} className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
            <h3 className="text-xl font-semibold text-slate-900">{group.label}</h3>
            <div className="mt-5 space-y-3">
              {group.items.map((item) => (
                <div key={item} className="rounded-lg border border-slate-200 bg-white p-3 text-sm text-slate-700">{item}</div>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="mt-12 rounded-[32px] bg-primary px-6 py-10 text-white md:px-10">
        <h3 className="text-3xl font-bold">Become a partner</h3>
        <p className="mt-3 max-w-xl text-teal-50">We welcome shipping lines, carriers, warehousing operators and trade organisations who value reliable coordination.</p>
        <Button className="mt-6 bg-white text-primary hover:bg-slate-100" onClick={() => setQuoteOpen(true)}>Start a Partnership</Button>
      </div>
    </div>
  )
}

function BlogPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-16">
      <SectionHeading eyebrow="Blogs" title="Practical cargo, shipping and customs insights." />
      <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {blogPosts.map((post) => (
          <Card key={post.slug} className="overflow-hidden border-slate-200 p-0">
            <div className="h-44 bg-gradient-to-br from-teal-50 to-slate-100" />
            <div className="p-5">
              <div className="text-xs font-medium uppercase tracking-[0.2em] text-primary">{post.category}</div>
              <h3 className="mt-3 text-xl font-semibold text-slate-900">{post.title}</h3>
              <p className="mt-2 text-sm text-slate-600">{post.excerpt}</p>
              <div className="mt-4 flex items-center justify-between text-xs text-slate-500">
                <span>{post.date}</span>
                <span>{post.readTime} min read</span>
              </div>
              <Link to={`/blogs/${post.slug}`} className="mt-4 inline-flex text-sm font-medium text-primary">Read More</Link>
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
        <div className="text-xs font-medium uppercase tracking-[0.2em] text-primary">{post.category}</div>
        <h1 className="mt-3 text-4xl font-black text-slate-900">{post.title}</h1>
        <div className="mt-3 text-sm text-slate-500">{post.date} · {post.readTime} min read</div>
        <div className="mt-8 h-60 rounded-2xl bg-gradient-to-br from-teal-50 via-white to-slate-100" />
        <p className="mt-8 text-lg text-slate-600">{post.excerpt}</p>
        <div className="mt-8 space-y-4 text-slate-700">
          <p>Efficient logistics planning begins with accurate cargo information and clear communication between stakeholders. Importers, exporters and freight partners all need consistent visibility to keep goods moving on schedule.</p>
          <p>That is why coordinating document readiness, customs planning and final-mile transport is critical. A good logistics partner reduces friction at the port, at the terminal and on the final route.</p>
          <p>When businesses align their import or export workflow with the right team, they can reduce delays, improve compliance and move cargo with more confidence.</p>
        </div>
      </div>
      <div className="mt-10">
        <h2 className="text-2xl font-bold text-slate-900">Related posts</h2>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {blogPosts.filter((entry) => entry.slug !== slug).slice(0, 3).map((entry) => (
            <Link key={entry.slug} to={`/blogs/${entry.slug}`} className="rounded-xl border border-slate-200 bg-white p-4">
              <div className="font-semibold text-slate-900">{entry.title}</div>
              <div className="mt-2 text-sm text-slate-600">{entry.excerpt}</div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

function ContactPage({ setQuoteOpen }: { setQuoteOpen: (open: boolean) => void }) {
  return (
    <div className="mx-auto max-w-6xl px-4 py-16">
      <SectionHeading eyebrow="Contact" title="Speak with our team about your cargo or clearance needs." />
      <div className="mt-8 grid gap-8 md:grid-cols-[0.9fr_1.1fr]">
        <div className="space-y-5">
          <div className="flex items-start gap-3"><Phone className="mt-1 h-5 w-5 text-primary" /> {siteConfig.phone}</div>
          <div className="flex items-start gap-3"><Mail className="mt-1 h-5 w-5 text-primary" /> {siteConfig.email}</div>
          <div className="flex items-start gap-3"><MapPin className="mt-1 h-5 w-5 text-primary" /> {siteConfig.address}</div>
          <div className="flex items-start gap-3"><Clock3 className="mt-1 h-5 w-5 text-primary" /> {siteConfig.hours}</div>
        </div>
        <div className="rounded-[28px] border border-slate-200 bg-slate-50 p-5">
          <QuoteForm setQuoteOpen={setQuoteOpen} />
        </div>
      </div>
      <div className="mt-10 overflow-hidden rounded-[28px] border border-slate-200">
        <iframe title="Contact map" src={siteConfig.mapUrl} loading="lazy" className="h-[320px] w-full" />
      </div>
    </div>
  )
}

function TermsPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-16">
      <h1 className="text-4xl font-black text-slate-900">Terms & Conditions</h1>
      <div className="mt-6 space-y-4 text-slate-600">
        <p>This page is placeholder content for a legal terms document and should be reviewed by counsel before going live.</p>
        <p>Sample terms may include service definitions, liability limitations, customer responsibilities, payment terms, and dispute resolution policies.</p>
        <p>All legal language, regional compliance and business terms should be tailored to the actual operations, jurisdiction and service model before launch.</p>
      </div>
    </div>
  )
}

function NotFoundPage() {
  return (
    <div className="mx-auto max-w-xl px-4 py-24 text-center">
      <h1 className="text-5xl font-black text-slate-900">404</h1>
      <p className="mt-4 text-xl text-slate-600">The page you are looking for does not exist.</p>
      <Link to="/" className="mt-6 inline-flex items-center justify-center rounded-md bg-primary px-5 py-3 text-white">Back home</Link>
    </div>
  )
}

function QuoteForm({ setQuoteOpen }: { setQuoteOpen: (open: boolean) => void }) {
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

  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = form

  const onSubmit = async (values: QuoteFormValues) => {
    if (values.companyHidden) {
      return
    }

    try {
      await submitQuote(values)
      toast.success('Your quote request has been received.')
      reset()
      setQuoteOpen(false)
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'There was a problem sending your quote.')
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <Label htmlFor="quote-name">Full name *</Label>
          <Input id="quote-name" className="mt-2" {...register('fullName')} />
          {errors.fullName && <p className="mt-1 text-sm text-red-600">{errors.fullName.message}</p>}
        </div>
        <div>
          <Label htmlFor="quote-email">Email *</Label>
          <Input id="quote-email" type="email" className="mt-2" {...register('email')} />
          {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>}
        </div>
        <div>
          <Label htmlFor="quote-phone">Phone *</Label>
          <Input id="quote-phone" type="tel" className="mt-2" {...register('phone')} />
          {errors.phone && <p className="mt-1 text-sm text-red-600">{errors.phone.message}</p>}
        </div>
        <div>
          <Label htmlFor="quote-country">Country *</Label>
          <select id="quote-country" className="mt-2 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" {...register('country')}>
            {countries.map((country) => (
              <option key={country} value={country}>{country}</option>
            ))}
          </select>
          {errors.country && <p className="mt-1 text-sm text-red-600">{errors.country.message}</p>}
        </div>
      </div>
      <div>
        <Label htmlFor="quote-service">Service *</Label>
        <select id="quote-service" className="mt-2 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" {...register('service')}>
          {quoteOptions.map((option) => (
            <option key={option} value={option}>{option}</option>
          ))}
        </select>
        {errors.service && <p className="mt-1 text-sm text-red-600">{errors.service.message}</p>}
      </div>
      <div>
        <Label htmlFor="quote-message">Message</Label>
        <Textarea id="quote-message" className="mt-2" {...register('message')} />
      </div>
      <div className="hidden">
        <Input {...register('companyHidden')} />
      </div>
      <Button type="submit" disabled={isSubmitting} className="w-full">{isSubmitting ? 'Sending...' : 'Submit Request'}</Button>
    </form>
  )
}

function SectionHeading({ eyebrow, title }: { eyebrow: string; title: string }) {
  return (
    <div>
      <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">{eyebrow}</p>
      <h2 className="mt-2 max-w-2xl text-3xl font-black text-slate-900 md:text-4xl">{title}</h2>
    </div>
  )
}

function StatCounter({ label, value }: { label: string; value: string }) {
  const [visible] = useState(true)

  const { value: currentValue } = useCountUp(Number.parseInt(value, 10) || 0, 1200, visible)

  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-5 text-center">
      <div className="text-4xl font-black text-white">{value.includes('+') ? `${currentValue}+` : currentValue}</div>
      <div className="mt-2 text-sm uppercase tracking-[0.18em] text-slate-200">{label}</div>
    </div>
  )
}

export default App
