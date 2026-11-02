import { useEffect, useState } from 'react'
import { siteConfig } from '@/config/site'

function getOfficeStatus(now = new Date()) {
  const parts = new Intl.DateTimeFormat('en-GB', {
    timeZone: 'Africa/Nairobi',
    weekday: 'short',
    hour: '2-digit',
    minute: '2-digit',
    hourCycle: 'h23',
  }).formatToParts(now)
  const weekday = parts.find((part) => part.type === 'weekday')?.value ?? ''
  const hour = Number(parts.find((part) => part.type === 'hour')?.value ?? 0)
  const minute = Number(parts.find((part) => part.type === 'minute')?.value ?? 0)
  const weekdayIndex = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].indexOf(weekday)
  const currentMinute = hour * 60 + minute
  const [openHour, openMinute] = siteConfig.openingHours.opensAt.split(':').map(Number)
  const [closeHour, closeMinute] = siteConfig.openingHours.closesAt.split(':').map(Number)
  const opensAt = openHour * 60 + openMinute
  const closesAt = closeHour * 60 + closeMinute

  const isWorkday = weekdayIndex >= 0 && siteConfig.openingHours.weekdays.includes(weekdayIndex as (typeof siteConfig.openingHours.weekdays)[number])
  return isWorkday && currentMinute >= opensAt && currentMinute < closesAt
}

export function OpenNowIndicator({ className = '' }: { className?: string }) {
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    const updateStatus = () => setIsOpen(getOfficeStatus())
    updateStatus()
    const intervalId = window.setInterval(updateStatus, 60_000)
    return () => window.clearInterval(intervalId)
  }, [])

  return (
    <span className={`inline-flex items-center gap-2 text-sm ${className}`}>
      <span className={`h-2 w-2 rounded-full ${isOpen ? 'bg-emerald-500' : 'bg-slate-400'}`} aria-hidden="true" />
      <span>{isOpen ? 'Open now' : 'Closed'} · Nairobi time</span>
    </span>
  )
}
