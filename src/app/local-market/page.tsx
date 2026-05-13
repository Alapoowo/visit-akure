import { Store } from 'lucide-react'
import CategoryGroupedPage from '@/components/listings/CategoryGroupedPage'
import { getCategorySection } from '@/data/listings'

export const metadata = {
  title: 'Local Markets in Akure | Visit Akure',
  description: 'Explore fresh produce, traditional crafts, and the best of local markets in Akure, Ondo State.',
}

export default function LocalMarketPage() {
  return (
    <CategoryGroupedPage
      title="Local Markets in Akure"
      subtitle="Fresh produce, traditional crafts, and the best of Ondo's local markets"
      emoji="🧺"
      icon={Store}
      iconColor="text-white"
      accentHex="#15803d"
      mostPopular={getCategorySection('local-market', 'popular')}
      nearMe={getCategorySection('local-market', 'popular', 8)}
      newListings={getCategorySection('local-market', 'new')}
      budgetFriendly={getCategorySection('local-market', 'budget')}
      luxury={getCategorySection('local-market', 'luxury')}
    />
  )
}
