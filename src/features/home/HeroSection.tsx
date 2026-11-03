import { useEffect, useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { heroSlides } from '@/data/home'
import { buildWhatsAppLink } from '@/lib/whatsapp'
import { SocialIcon } from '@/components/common/SocialIcon'
import { useQuoteDialog } from '@/features/quote/QuoteDialogContext'
import { cn } from '@/lib/utils'

export function HeroSection() {
  const { setOpen: setQuoteOpen } = useQuoteDialog()
  const [activeSlide, setActiveSlide] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  
  // Initialize via function to avoid set-state-in-effect warning
  const [reducedMotion, setReducedMotion] = useState(() => 
    typeof window !== 'undefined' ? window.matchMedia('(prefers-reduced-motion: reduce)').matches : false
  )
  
  const slide = heroSlides[activeSlide]

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])

  useEffect(() => {
    if (isPaused || reducedMotion) return
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % heroSlides.length)
    }, 6000)
    return () => clearInterval(timer)
  }, [isPaused, reducedMotion])

  const changeSlide = (direction: -1 | 1) => {
    setActiveSlide(
      (current) => (current + direction + heroSlides.length) % heroSlides.length,
    )
  }

  return (
    <section 
      className="dark-surface bg-deep-teal text-paper relative isolate overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocusCapture={() => setIsPaused(true)}
      onBlurCapture={() => setIsPaused(false)}
    >
      <div className="manifest-grid animate-fade-in absolute inset-0 -z-10 opacity-20" />
      <div className="mx-auto grid max-w-7xl gap-8 px-4 pt-8 pb-14 md:grid-cols-[0.9fr_1.1fr] md:items-center md:gap-12 md:pt-12 md:pb-20">
        <div key={activeSlide} className="stagger">
          <p className="mb-5 text-xs font-bold tracking-[0.2em] text-teal-200 uppercase">
            {slide.badge}
          </p>
          <h1 className="max-w-xl text-4xl leading-[1.08] font-semibold text-white sm:text-5xl md:text-6xl">
            Cargo moving through Kenya starts with the right paperwork.
          </h1>
          <p className="mt-5 max-w-lg text-base leading-7 text-slate-200 sm:text-lg">
            {slide.subtitle}
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Button
              onClick={() => setQuoteOpen(true)}
              size="lg"
              className="text-white"
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
        <div className="animate-fade-in relative">
          <div className="relative overflow-hidden border border-white/20 bg-white/5 p-2 shadow-2xl shadow-black/20">
            <div className="bg-deep-teal relative aspect-[4/3] overflow-hidden">
              {heroSlides.map((s, index) => (
                <img
                  key={s.title}
                  src={s.image}
                  alt={index === activeSlide ? s.title : ''}
                  aria-hidden={index !== activeSlide}
                  width="1200"
                  height="900"
                  fetchPriority={index === 0 ? 'high' : undefined}
                  loading={index === 0 ? 'eager' : 'lazy'}
                  className={cn(
                    'absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ease-in-out',
                    index === activeSlide
                      ? 'opacity-100'
                      : 'opacity-0',
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
                className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/30 text-white transition hover:bg-white/10"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              {heroSlides.map((s, index) => (
                <button
                  key={s.title}
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
                className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/30 text-white transition hover:bg-white/10"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
