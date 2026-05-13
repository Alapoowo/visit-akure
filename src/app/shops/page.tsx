import { ShoppingBag } from 'lucide-react'
import CategoryGroupedPage from '@/components/listings/CategoryGroupedPage'
import { getCategorySection } from '@/data/listings'

export const metadata = {
  title: 'Shops in Akure | Visit Akure',
  description: 'Discover boutiques, electronics, fashion stores and everyday essentials in Akure, Ondo State.',
}

export default function ShopsPage() {
  return (
    <CategoryGroupedPage
      title="Shops in Akure"
      subtitle="Boutiques, electronics, fashion, and everyday essentials"
      emoji="🛍️"
      icon={ShoppingBag}
      iconColor="text-white"
      accentHex="#b45309"
      mostPopular={getCategorySection('shops', 'popular')}
      nearMe={getCategorySection('shops', 'popular', 8)}
      newListings={getCategorySection('shops', 'new')}
      budgetFriendly={getCategorySection('shops', 'budget')}
      luxury={getCategorySection('shops', 'luxury')}
    />
  )
}
