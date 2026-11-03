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
    // Reduced to 3000ms
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % heroSlides.length)
    }, 2500)
    return () => clearInterval(timer)
  }, [isPaused, reducedMotion])

  const changeSlide = (direction: -1 | 1) => {
    setActiveSlide(
      (current) => (current + direction + heroSlides.length) % heroSlides.length,
    )
  }

  return (
    <section 
      className="dark-surface relative isolate overflow-hidden bg-deep-teal"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocusCapture={() => setIsPaused(true)}
      onBlurCapture={() => setIsPaused(false)}
    >
      {/* Background Images */}
      <div className="absolute inset-0 -z-20 overflow-hidden">
        {heroSlides.map((s, index) => (
          <div
            key={s.title}
            className={cn(
              'absolute inset-y-0 right-0 w-full transition-all duration-1000 ease-in-out md:w-[65%] lg:w-[60%]',
              index === activeSlide ? 'opacity-100' : 'opacity-0'
            )}
          >
            <img
              src={s.image}
              alt={s.title}
              className="h-full w-full object-cover object-center md:object-right"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-deep-teal via-deep-teal/80 to-transparent md:via-deep-teal/40" />
            <div className="absolute inset-0 bg-gradient-to-t from-deep-teal/80 via-transparent to-deep-teal/20" />
          </div>
        ))}
      </div>

      {/* Striped Overlay */}
      <div className="pointer-events-none absolute inset-y-0 left-0 -z-10 w-full bg-[linear-gradient(90deg,transparent_49%,rgba(255,255,255,0.04)_50%,transparent_51%)] bg-[length:28px_28px] opacity-40 md:w-1/2" />
      
      {/* Main Content Container - Reduced Height */}
      <div className="mx-auto flex min-h-[500px] max-w-7xl flex-col justify-between px-4 py-16 md:min-h-[600px] md:py-24 lg:min-h-[650px]">
        
        {/* Text Content */}
        <div key={activeSlide} className="stagger max-w-2xl">
          <p className="mb-5 text-xs font-bold tracking-[0.2em] text-teal-200 uppercase">
            {slide.badge}
          </p>
          
          <h1 className="text-4xl leading-[1.08] font-semibold text-white sm:text-5xl md:text-6xl">
            {slide.title}
          </h1>
          
          <p className="mt-6 max-w-lg text-base leading-7 text-slate-200 sm:text-lg">
            {slide.subtitle}
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <Button
              onClick={() => setQuoteOpen(true)}
              size="lg"
              className="bg-amber-strong hover:bg-amber-strong/90 h-12 px-8 text-base text-white"
            >
              Get a quote
            </Button>
            <a
              href={buildWhatsAppLink()}
              target="_blank"
              rel="noreferrer"
              className="inline-flex h-12 items-center justify-center rounded-md border border-white/30 px-6 text-base font-semibold text-white transition-colors hover:bg-white/10 focus-visible:outline-white"
            >
              <SocialIcon type="whatsapp" />
              <span className="ml-2">WhatsApp our team</span>
            </a>
          </div>

          <div className="border-accent mt-10 max-w-md border-l-2 pl-4 text-sm leading-6 text-slate-200">
            <p className="font-semibold text-white">
              Documents often requested for imports
            </p>
            <p className="mt-1 text-slate-300">
              IDF · Bill of Lading · Commercial Invoice · COC
            </p>
            <p className="mt-1 text-xs text-slate-400">
              Requirements depend on cargo and current KRA guidance.
            </p>
          </div>
        </div>

        {/* Centered Carousel Controls (Progress text removed) */}
        <div className="mt-12 flex items-center justify-center gap-4">
          <button
            type="button"
            onClick={() => changeSlide(-1)}
            aria-label="Previous slide"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/20 text-white transition hover:border-white/40 hover:bg-white/10"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          
          <div className="flex items-center gap-2">
            {heroSlides.map((s, index) => (
              <button
                key={s.title}
                type="button"
                onClick={() => setActiveSlide(index)}
                className={cn(
                  'h-2 rounded-full transition-all duration-300',
                  activeSlide === index
                    ? 'bg-accent w-8'
                    : 'w-2 bg-white/30 hover:bg-white/50',
                )}
                aria-label={`View slide ${index + 1}`}
                aria-pressed={activeSlide === index}
              />
            ))}
          </div>

          <button
            type="button"
            onClick={() => changeSlide(1)}
            aria-label="Next slide"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/20 text-white transition hover:border-white/40 hover:bg-white/10"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>
    </section>
  )
}
