import { Briefcase } from 'lucide-react'
import CategoryGroupedPage from '@/components/listings/CategoryGroupedPage'
import { getCategorySection } from '@/data/listings'

export const metadata = {
  title: 'Services in Akure | Visit Akure',
  description: 'Find photographers, caterers, transport services and skilled professionals in Akure, Ondo State.',
}

export default function ServicesPage() {
  return (
    <CategoryGroupedPage
      title="Services in Akure"
      subtitle="Photographers, caterers, and skilled hands ready to serve you"
      emoji="🛠️"
      icon={Briefcase}
      iconColor="text-white"
      accentHex="#7c3aed"
      mostPopular={getCategorySection('services', 'popular')}
      nearMe={getCategorySection('services', 'popular', 8)}
      newListings={getCategorySection('services', 'new')}
      budgetFriendly={getCategorySection('services', 'budget')}
      luxury={getCategorySection('services', 'luxury')}
    />
  )
}
