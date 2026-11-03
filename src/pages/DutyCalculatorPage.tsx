import { DutyCalculator } from '@/features/home/DutyCalculator'
import { Seo } from '@/components/common/Seo'

export function DutyCalculatorPage() {
  return (
    <div className="bg-paper min-h-screen">
      <Seo
        title="Import Duty Calculator | Tested & Trusted"
        description="Estimate your Kenya import duties, VAT, and statutory charges for general cargo and vehicles."
        path="/duty-calculator"
      />
      <DutyCalculator />
    </div>
  )
}

export default DutyCalculatorPage
