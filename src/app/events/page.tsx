import { Calendar } from 'lucide-react'
import CategoryGroupedPage from '@/components/listings/CategoryGroupedPage'
import { getCategorySection } from '@/data/listings'

export const metadata = {
  title: 'Events in Akure | Visit Akure',
  description: 'Discover upcoming events, festivals, concerts and cultural celebrations in Akure, Ondo State.',
}

export default function EventsPage() {
  return (
    <CategoryGroupedPage
      title="Events in Akure"
      subtitle="Festivals, concerts, tech summits and cultural celebrations"
      emoji="🎉"
      icon={Calendar}
      iconColor="text-white"
      accentHex="#be185d"
      mostPopular={getCategorySection('events', 'popular')}
      nearMe={getCategorySection('events', 'popular', 8)}
      newListings={getCategorySection('events', 'new')}
      budgetFriendly={getCategorySection('events', 'budget')}
      luxury={getCategorySection('events', 'luxury')}
    />
  )
}
