import { Calendar } from 'lucide-react'
import CategoryPageLayout from '@/components/listings/CategoryPageLayout'
import { getEventsListings } from '@/data/listings'

export const metadata = {
  title: 'Events in Akure | Visit Akure',
  description: 'Discover upcoming events, festivals, concerts and cultural celebrations in Akure, Ondo State.',
}

export default function EventsPage() {
  const listings = getEventsListings()
  return (
    <CategoryPageLayout
      title="Events in Akure"
      subtitle="Discover festivals, concerts and cultural celebrations"
      emoji="🎉"
      category="events"
      listings={listings}
      icon={Calendar}
      showSidebar={false}
    />
  )
}
