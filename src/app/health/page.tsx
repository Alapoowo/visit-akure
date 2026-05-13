import { HeartPulse } from 'lucide-react'
import CategoryGroupedPage from '@/components/listings/CategoryGroupedPage'
import { getCategorySection } from '@/data/listings'

export const metadata = {
  title: 'Health in Akure | Visit Akure',
  description: 'Find hospitals, clinics, pharmacies, and wellness centres in Akure, Ondo State.',
}

export default function HealthPage() {
  return (
    <CategoryGroupedPage
      title="Health in Akure"
      subtitle="Hospitals, clinics, pharmacies, and wellness centres near you"
      emoji="⚕️"
      icon={HeartPulse}
      iconColor="text-white"
      accentHex="#dc2626"
      mostPopular={getCategorySection('health', 'popular')}
      nearMe={getCategorySection('health', 'popular', 8)}
      newListings={getCategorySection('health', 'new')}
      budgetFriendly={getCategorySection('health', 'budget')}
      luxury={getCategorySection('health', 'luxury')}
    />
  )
}
