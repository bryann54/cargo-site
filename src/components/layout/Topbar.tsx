import { Mail, Phone } from 'lucide-react'
import { siteConfig } from '@/config/site'
import { SocialIcon } from '@/components/common/SocialIcon'

export function Topbar() {
  return (
    <div className="dark-surface bg-deep-teal hidden border-b border-white/10 text-sm text-slate-200 md:block">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-2">
        {/* Social Links */}
        <div className="flex items-center gap-4">
          {siteConfig.socials
            .filter((s) => ['instagram', 'linkedin', 'facebook', 'x'].includes(s.platform))
            .map((social) => (
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
        
        {/* Contact Info */}
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
