import { Hotel } from 'lucide-react'
import CategoryGroupedPage from '@/components/listings/CategoryGroupedPage'
import { getCategorySection } from '@/data/listings'

export const metadata = {
  title: 'Hotels in Akure | Visit Akure',
  description: 'Find the best hotels, guesthouses and suites in Akure, Ondo State. From budget stays to luxury resorts.',
}

export default function HotelsPage() {
  return (
    <CategoryGroupedPage
      title="Hotels in Akure"
      subtitle="From cozy guesthouses to premium suites — find your perfect stay"
      emoji="🏨"
      icon={Hotel}
      iconColor="text-white"
      accentHex="#005F56"
      mostPopular={getCategorySection('hotels', 'popular')}
      nearMe={getCategorySection('hotels', 'popular', 8)}
      newListings={getCategorySection('hotels', 'new')}
      budgetFriendly={getCategorySection('hotels', 'budget')}
      luxury={getCategorySection('hotels', 'luxury')}
    />
  )
}
