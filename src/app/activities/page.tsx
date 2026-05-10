import { Zap } from 'lucide-react'
import ListingCard from '@/components/listings/ListingCard'
import FilterChips from '@/components/ui/FilterChips'
import { getActivitiesListings } from '@/data/listings'

export const metadata = { title: 'Activities in Akure | Visit Akure' }

export default function ActivitiesPage() {
  const listings = getActivitiesListings()
  return (
    <div>
      <div className="bg-[#005F56] relative overflow-hidden">
        <div className="absolute right-8 top-1/2 -translate-y-1/2 text-[120px] opacity-[0.07] select-none">🎭</div>
        <div className="max-w-[1280px] mx-auto px-6 py-12">
          <div className="flex items-center gap-2 text-white/60 text-sm mb-2">
            <Zap size={16} className="text-[#F4C300]" />
            <span>{listings.length} activities available</span>
          </div>
          <h1 className="text-4xl font-extrabold text-white tracking-tight">Activities in Akure</h1>
          <p className="text-white/60 mt-2">Explore fun things to do in and around Akure</p>
        </div>
      </div>
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-[1280px] mx-auto px-6 py-3">
          <FilterChips />
        </div>
      </div>
      <div className="max-w-[1280px] mx-auto px-6 py-8">
        <p className="text-sm text-gray-500 mb-5"><span className="font-bold text-gray-800">{listings.length}</span> activities found</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {listings.map(l => <ListingCard key={l.id} listing={l} />)}
        </div>
      </div>
    </div>
  )
}
