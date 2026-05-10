import { Hotel } from 'lucide-react'
import ListingCard from '@/components/listings/ListingCard'
import SidebarFilters from '@/components/listings/SidebarFilters'
import FilterChips from '@/components/ui/FilterChips'
import { getStaysListings } from '@/data/listings'

export const metadata = { title: 'Stays in Akure | Visit Akure' }

export default function StaysPage() {
  const listings = getStaysListings()
  return (
    <div>
      <div className="bg-[#005F56] relative overflow-hidden">
        <div className="absolute right-8 top-1/2 -translate-y-1/2 text-[120px] opacity-[0.07] select-none">🏨</div>
        <div className="max-w-[1280px] mx-auto px-6 py-12">
          <div className="flex items-center gap-2 text-white/60 text-sm mb-2">
            <Hotel size={16} className="text-[#F4C300]" />
            <span>{listings.length} stays available</span>
          </div>
          <h1 className="text-4xl font-extrabold text-white tracking-tight">Stays in Akure</h1>
          <p className="text-white/60 mt-2">Find the perfect place to rest your head</p>
        </div>
      </div>
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-[1280px] mx-auto px-6 py-3">
          <FilterChips />
        </div>
      </div>
      <div className="max-w-[1280px] mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-[220px_1fr] gap-8">
          <SidebarFilters category="stays" />
          <div>
            <p className="text-sm text-gray-500 mb-5"><span className="font-bold text-gray-800">{listings.length}</span> stays found</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
              {listings.map(l => <ListingCard key={l.id} listing={l} />)}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
