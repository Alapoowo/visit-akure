import { Building2 } from 'lucide-react'
import CategoryGroupedPage from '@/components/listings/CategoryGroupedPage'
import { getCategorySection } from '@/data/listings'

export const metadata = {
  title: 'Shortlets in Akure | Visit Akure',
  description: 'Find fully furnished apartments and serviced flats for short stays in Akure, Ondo State.',
}

export default function ShortletsPage() {
  return (
    <CategoryGroupedPage
      title="Shortlets in Akure"
      subtitle="Fully furnished apartments and serviced flats for short-term stays"
      emoji="🏠"
      icon={Building2}
      iconColor="text-white"
      accentHex="#1d4ed8"
      mostPopular={getCategorySection('shortlets', 'popular')}
      nearMe={getCategorySection('shortlets', 'popular', 8)}
      newListings={getCategorySection('shortlets', 'new')}
      budgetFriendly={getCategorySection('shortlets', 'budget')}
      luxury={getCategorySection('shortlets', 'luxury')}
    />
  )
}
