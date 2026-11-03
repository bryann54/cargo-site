import heroAirImage from '@/assets/hero-air.jpg'
import heroGeneralImage from '@/assets/hero-general.jpg'
import heroRoadImage from '@/assets/hero-road.jpg'
import heroSeaImage from '@/assets/hero-sea.jpg'
import serviceCarImportImage from '@/assets/service-car-import.jpg'
import serviceGeneralCargoImage from '@/assets/service-general-cargo.jpg'
import serviceHorticultureImage from '@/assets/service-horticulture.jpg'
import servicePerishablesImage from '@/assets/service-perishables.jpg'
import servicePharmaceuticalsImage from '@/assets/service-pharmaceuticals.jpg'
import serviceRailImage from '@/assets/service-rail.jpg'
import serviceWarehousingImage from '@/assets/service-warehousing.jpg'

export const serviceImageBySlug: Record<string, string> = {
  'air-freight': heroAirImage,
  'ocean-freight': heroSeaImage,
  'general-cargo': serviceGeneralCargoImage,
  'pharmaceuticals-logistics': servicePharmaceuticalsImage,
  'perishables-logistics': servicePerishablesImage,
  'road-freight': heroRoadImage,
  'car-importation': serviceCarImportImage,
  warehousing: serviceWarehousingImage,
  'imports-exports-consultancy': serviceGeneralCargoImage,
  'horticulture-exports': serviceHorticultureImage,
  'road-cargo-transportation': heroRoadImage,
  'rail-cargo-transportation': serviceRailImage,
}
