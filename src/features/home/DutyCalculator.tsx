import { useState } from 'react'
import { Calculator, Car, Box } from 'lucide-react'
import { SectionHeading } from '@/components/common/SectionHeading'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { QuoteForm } from '@/features/quote/QuoteForm'

export function DutyCalculator() {
  const [tab, setTab] = useState<'cargo' | 'vehicle'>('cargo')
  
  // Cargo State
  const [cifValue, setCifValue] = useState('')
  const [cargoType, setCargoType] = useState('25')
  const [cargoResult, setCargoResult] = useState<null | { duty: number, vat: number, idf: number, rdl: number, total: number }>(null)

  // Vehicle State
  const [crspValue, setCrspValue] = useState('')
  const [engineSize, setEngineSize] = useState('')
  const [vehicleResult, setVehicleResult] = useState<null | { duty: number, excise: number, vat: number, idf: number, rdl: number, total: number }>(null)

  const calculateCargo = (e: React.FormEvent) => {
    e.preventDefault()
    const value = parseFloat(cifValue)
    if (!value || value <= 0) return

    const dutyRate = parseFloat(cargoType) / 100
    const duty = value * dutyRate
    const vat = (value + duty) * 0.16
    const idf = value * 0.035
    const rdl = value * 0.02
    
    setCargoResult({ duty, vat, idf, rdl, total: duty + vat + idf + rdl })
  }

  const calculateVehicle = (e: React.FormEvent) => {
    e.preventDefault()
    const value = parseFloat(crspValue)
    const cc = parseFloat(engineSize)
    if (!value || !cc) return

    const duty = value * 0.35
    const excise = cc > 3000 ? value * 0.35 : cc > 1500 ? value * 0.30 : value * 0.25
    const vat = (value + duty + excise) * 0.16
    const idf = value * 0.035
    const rdl = value * 0.02

    setVehicleResult({ duty, excise, vat, idf, rdl, total: duty + excise + vat + idf + rdl })
  }

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('en-KE', { style: 'currency', currency: 'KES', maximumFractionDigits: 0 }).format(val)
  }

  return (
    <section className="py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4">
        
        {/* Header Info */}
        <div className="mb-12 max-w-3xl">
          <SectionHeading
            eyebrow="Estimate your costs"
            title="Import duty calculator."
          />
          <p className="text-muted-foreground mt-4 leading-7 text-lg">
            Get an indicative estimate for customs duty, VAT, and other statutory charges based on current KRA guidelines. 
            Use this for planning, then share your documents with us for a binding quote.
          </p>
        </div>

        <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-start">
          
          {/* Left: Calculator Tool */}
          <div className="flex flex-col gap-6">
            
            {/* Tabs */}
            <div className="flex gap-2 border-b border-border">
              <button
                onClick={() => setTab('cargo')}
                className={`flex items-center gap-2 px-6 py-3 text-sm font-semibold transition-colors ${
                  tab === 'cargo' 
                    ? 'text-primary border-b-2 border-primary bg-primary/5' 
                    : 'text-slate-500 hover:text-slate-800 hover:bg-slate-50'
                }`}
              >
                <Box className="h-4 w-4" /> General Cargo
              </button>
              <button
                onClick={() => setTab('vehicle')}
                className={`flex items-center gap-2 px-6 py-3 text-sm font-semibold transition-colors ${
                  tab === 'vehicle' 
                    ? 'text-primary border-b-2 border-primary bg-primary/5' 
                    : 'text-slate-500 hover:text-slate-800 hover:bg-slate-50'
                }`}
              >
                <Car className="h-4 w-4" /> Vehicles
              </button>
            </div>

            {/* Form Container */}
            <div className="bg-secondary/40 border border-border p-6 md:p-8 rounded-xl">
              {tab === 'cargo' ? (
                <form onSubmit={calculateCargo} className="space-y-6">
                  <div className="grid gap-6 sm:grid-cols-2">
                    <div>
                      <Label htmlFor="cif" className="text-deep-teal">CIF Value (KES) *</Label>
                      <Input
                        id="cif"
                        type="number"
                        required
                        min="1"
                        placeholder="e.g. 500000"
                        value={cifValue}
                        onChange={(e) => setCifValue(e.target.value)}
                        className="mt-2 bg-white"
                      />
                    </div>
                    <div>
                      <Label htmlFor="category" className="text-deep-teal">Duty Category *</Label>
                      <select
                        id="category"
                        className="border-input bg-white mt-2 flex h-10 w-full rounded-md border px-3 py-2 text-sm"
                        value={cargoType}
                        onChange={(e) => setCargoType(e.target.value)}
                      >
                        <option value="0">0% (Exempt)</option>
                        <option value="10">10% (Raw Materials)</option>
                        <option value="25">25% (Finished Goods)</option>
                        <option value="35">35% (Specialised Items)</option>
                      </select>
                    </div>
                  </div>
                  <Button type="submit" className="w-full sm:w-auto text-white">
                    Calculate Cargo Duty <Calculator className="ml-2 h-4 w-4" />
                  </Button>
                </form>
              ) : (
                <form onSubmit={calculateVehicle} className="space-y-6">
                  <div className="grid gap-6 sm:grid-cols-2">
                    <div>
                      <Label htmlFor="crsp" className="text-deep-teal">CRSP Value (KES) *</Label>
                      <Input
                        id="crsp"
                        type="number"
                        required
                        min="1"
                        placeholder="e.g. 2500000"
                        value={crspValue}
                        onChange={(e) => setCrspValue(e.target.value)}
                        className="mt-2 bg-white"
                      />
                    </div>
                    <div>
                      <Label htmlFor="engine" className="text-deep-teal">Engine Capacity (CC) *</Label>
                      <Input
                        id="engine"
                        type="number"
                        required
                        min="1"
                        placeholder="e.g. 1800"
                        value={engineSize}
                        onChange={(e) => setEngineSize(e.target.value)}
                        className="mt-2 bg-white"
                      />
                    </div>
                  </div>
                  <Button type="submit" className="w-full sm:w-auto text-white">
                    Calculate Vehicle Duty <Calculator className="ml-2 h-4 w-4" />
                  </Button>
                </form>
              )}

              {/* Results */}
              {(cargoResult || vehicleResult) && (
                <div className="mt-8 border-t border-border/80 pt-6">
                  <h4 className="font-display text-deep-teal text-xl font-semibold mb-6">Estimated Breakdown</h4>
                  
                  <div className="space-y-4 text-base">
                    {cargoResult && (
                      <>
                        <div className="flex justify-between border-b border-border/50 pb-2">
                          <span className="text-slate-600">Customs Duty</span>
                          <span className="font-medium text-slate-800">{formatCurrency(cargoResult.duty)}</span>
                        </div>
                        <div className="flex justify-between border-b border-border/50 pb-2">
                          <span className="text-slate-600">VAT (16%)</span>
                          <span className="font-medium text-slate-800">{formatCurrency(cargoResult.vat)}</span>
                        </div>
                        <div className="flex justify-between border-b border-border/50 pb-2">
                          <span className="text-slate-600">IDF (3.5%)</span>
                          <span className="font-medium text-slate-800">{formatCurrency(cargoResult.idf)}</span>
                        </div>
                        <div className="flex justify-between border-b border-border/50 pb-2">
                          <span className="text-slate-600">RDL (2%)</span>
                          <span className="font-medium text-slate-800">{formatCurrency(cargoResult.rdl)}</span>
                        </div>
                      </>
                    )}
                    {vehicleResult && (
                      <>
                        <div className="flex justify-between border-b border-border/50 pb-2">
                          <span className="text-slate-600">Customs Duty (35%)</span>
                          <span className="font-medium text-slate-800">{formatCurrency(vehicleResult.duty)}</span>
                        </div>
                        <div className="flex justify-between border-b border-border/50 pb-2">
                          <span className="text-slate-600">Excise Duty</span>
                          <span className="font-medium text-slate-800">{formatCurrency(vehicleResult.excise)}</span>
                        </div>
                        <div className="flex justify-between border-b border-border/50 pb-2">
                          <span className="text-slate-600">VAT (16%)</span>
                          <span className="font-medium text-slate-800">{formatCurrency(vehicleResult.vat)}</span>
                        </div>
                        <div className="flex justify-between border-b border-border/50 pb-2">
                          <span className="text-slate-600">IDF (3.5%)</span>
                          <span className="font-medium text-slate-800">{formatCurrency(vehicleResult.idf)}</span>
                        </div>
                        <div className="flex justify-between border-b border-border/50 pb-2">
                          <span className="text-slate-600">RDL (2%)</span>
                          <span className="font-medium text-slate-800">{formatCurrency(vehicleResult.rdl)}</span>
                        </div>
                      </>
                    )}
                    
                    <div className="flex justify-between pt-4 text-xl font-bold text-deep-teal">
                      <span>Total Estimated Taxes</span>
                      <span>
                        {formatCurrency(cargoResult ? cargoResult.total : vehicleResult ? vehicleResult.total : 0)}
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right: Quote Form directly inline instead of floating card */}
          <div className="bg-white border border-border p-6 md:p-8 rounded-xl shadow-sm">
            <div className="mb-6">
              <h3 className="font-display text-deep-teal text-2xl font-semibold">Get a Binding Quote</h3>
              <p className="text-slate-500 mt-1 text-sm">
                Share your cargo details for an accurate duty assessment and logistics plan.
              </p>
            </div>
            <QuoteForm />
          </div>

        </div>
      </div>
    </section>
  )
}
