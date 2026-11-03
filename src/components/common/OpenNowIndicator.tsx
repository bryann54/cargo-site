import { useEffect, useState } from 'react'
import { siteConfig } from '@/config/site'

const NAIROBI_OFFSET_MS = 3 * 60 * 60 * 1000 // UTC+3, no daylight saving

const toMinutes = (time: string) => {
  const [hours, minutes] = time.split(':').map(Number)
  return hours * 60 + minutes
}

export function isOpenAt(now: Date): boolean {
  const nairobi = new Date(now.getTime() + NAIROBI_OFFSET_MS)
  const day = nairobi.getUTCDay()
  const minutes = nairobi.getUTCHours() * 60 + nairobi.getUTCMinutes()

  return siteConfig.openingHours.some(
    (slot) =>
      slot.days.includes(day) &&
      minutes >= toMinutes(slot.opensAt) &&
      minutes < toMinutes(slot.closesAt),
  )
}

export function OpenNowIndicator({ className = '' }: { className?: string }) {
  const [isOpen, setIsOpen] = useState(() => isOpenAt(new Date()))

  useEffect(() => {
    const update = () => setIsOpen(isOpenAt(new Date()))
    const id = window.setInterval(update, 60_000)
    return () => window.clearInterval(id)
  }, [])

  return (
    <span className={`inline-flex items-center gap-2 text-sm ${className}`}>
      <span
        className={`h-2 w-2 rounded-full ${isOpen ? 'bg-emerald-500' : 'bg-slate-400'}`}
        aria-hidden="true"
      />
      <span>{isOpen ? 'Open now' : 'Closed'} · Nairobi time</span>
    </span>
  )
}