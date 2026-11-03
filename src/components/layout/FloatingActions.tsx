import { ArrowUp } from 'lucide-react'
import { buildWhatsAppLink } from '@/lib/whatsapp'
import { SocialIcon } from '@/components/common/SocialIcon'

export function FloatingActions({ showBackToTop }: { showBackToTop: boolean }) {
  return (
    <div className="fixed right-[calc(env(safe-area-inset-right)+1rem)] bottom-[calc(env(safe-area-inset-bottom)+1rem)] z-50 flex flex-col items-end gap-3">
      <div className="group relative">
        <a
          href={buildWhatsAppLink()}
          target="_blank"
          rel="noreferrer"
          aria-label="Chat with us on WhatsApp"
          className="bg-whatsapp hover:bg-whatsapp-hover flex h-14 w-14 items-center justify-center rounded-full text-white shadow-lg ring-4 shadow-green-900/20 ring-white transition duration-200 hover:scale-105 focus-visible:ring-4 focus-visible:ring-green-200 focus-visible:outline-none"
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
          className="bg-primary focus-visible:ring-paper flex h-14 w-14 items-center justify-center rounded-full text-white shadow-lg ring-4 ring-white transition hover:scale-105 focus-visible:ring-2 focus-visible:outline-none"
        >
          <ArrowUp className="h-5 w-5" />
        </button>
      )}
    </div>
  )
}
