import { Wrench } from 'lucide-react'
import CategoryPageLayout from '@/components/listings/CategoryPageLayout'
import { getServicesListings } from '@/data/listings'

export const metadata = {
  title: 'Services in Akure | Visit Akure',
  description: 'Find photographers, caterers, drivers and more local services in Akure, Ondo State.',
}

export default function ServicesPage() {
  const listings = getServicesListings()
  return (
    <CategoryPageLayout
      title="Services in Akure"
      subtitle="Photographers, caterers, drivers and professional services"
      emoji="🛎️"
      category="services"
      listings={listings}
      icon={Wrench}
      showSidebar={false}
    />
  )
}
