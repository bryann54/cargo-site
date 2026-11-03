import { MessageCircle } from 'lucide-react'

export function SocialIcon({ type }: { type: string }) {
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
