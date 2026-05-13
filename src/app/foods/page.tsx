import { Utensils } from 'lucide-react'
import CategoryGroupedPage from '@/components/listings/CategoryGroupedPage'
import { getCategorySection } from '@/data/listings'

export const metadata = {
  title: 'Food in Akure | Visit Akure',
  description: 'Discover the best restaurants, cafés, and chop houses in Akure. Authentic Ondo flavours and more.',
}

export default function FoodsPage() {
  return (
    <CategoryGroupedPage
      title="Food in Akure"
      subtitle="Restaurants, cafés, and chop houses serving authentic Ondo flavours"
      emoji="🍽️"
      icon={Utensils}
      iconColor="text-white"
      accentHex="#c2410c"
      mostPopular={getCategorySection('foods', 'popular')}
      nearMe={getCategorySection('foods', 'popular', 8)}
      newListings={getCategorySection('foods', 'new')}
      budgetFriendly={getCategorySection('foods', 'budget')}
      luxury={getCategorySection('foods', 'luxury')}
    />
  )
}
