import { HeroSection } from '@/features/home/HeroSection'
import { ServicesBento } from '@/features/home/ServicesBento'
import { CompanyIntro } from '@/features/home/CompanyIntro'
import { ClearanceList } from '@/features/home/ClearanceList'
import { ProcessSection } from '@/features/home/ProcessSection'
import { BlogPreview } from '@/features/home/BlogPreview'
import { ContactCtaSection } from '@/features/home/ContactCtaSection'
import { MapSection } from '@/features/home/MapSection'
import { Seo } from '@/components/common/Seo'
import { useReveal } from '@/hooks/useReveal'

export function HomePage() {
  const ref = useReveal<HTMLDivElement>()

  return (
    <div ref={ref}>
      <Seo
        title="Tested & Trusted | Clearing & Forwarding"
        description="Clearing and forwarding support for cargo moving through JKIA, Mombasa Port and regional routes. Contact Tested & Trusted in Nairobi."
        path="/"
      />
      <HeroSection />
      <div className="reveal"><ServicesBento /></div>
      <div className="reveal"><CompanyIntro /></div>
      <div className="reveal"><ClearanceList /></div>
      <div className="reveal"><ProcessSection /></div>
      <div className="reveal"><BlogPreview /></div>
      <div className="reveal"><ContactCtaSection /></div>
      <div className="reveal"><MapSection /></div>
    </div>
  )
}
