import { Car, MapPin, Calendar, ChevronDown } from 'lucide-react'
import ListingCard from '@/components/listings/ListingCard'
import SidebarFilters from '@/components/listings/SidebarFilters'
import FilterChips from '@/components/ui/FilterChips'
import { getCarsListings } from '@/data/listings'

export const metadata = {
  title: 'Cars in Akure | Visit Akure',
  description: 'Find and rent the best cars in Akure, Ondo State. Sedans, SUVs, luxury vehicles and more.',
}

export default function CarsPage() {
  const listings = getCarsListings()

  return (
    <div>
      {/* Hero */}
      <div className="bg-[#005F56] relative overflow-hidden">
        <div className="absolute right-8 top-1/2 -translate-y-1/2 text-[120px] opacity-[0.07] select-none">🚗</div>
        <div className="max-w-[1280px] mx-auto px-6 py-12">
          <div className="flex items-center gap-2 text-white/60 text-sm mb-2">
            <Car size={16} className="text-[#F4C300]" />
            <span>{listings.length} cars available</span>
          </div>
          <h1 className="text-4xl font-extrabold text-white tracking-tight">Cars in Akure</h1>
          <p className="text-white/60 mt-2">Find and book the best cars for your trip</p>
        </div>
      </div>

      {/* Search bar */}
      <div className="bg-white border-b border-gray-100 shadow-sm">
        <div className="max-w-[1280px] mx-auto px-6 py-4">
          <div className="flex gap-3 items-center flex-wrap">
            <div className="flex items-center gap-2 border border-gray-200 rounded-xl px-4 py-2.5 flex-1 min-w-[160px] cursor-pointer hover:border-[#005F56] transition-colors">
              <MapPin size={15} className="text-[#005F56]" />
              <div>
                <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Location</div>
                <div className="text-sm font-semibold text-gray-800">Akure, Ondo State</div>
              </div>
            </div>
            <div className="flex items-center gap-2 border border-gray-200 rounded-xl px-4 py-2.5 flex-1 min-w-[140px] cursor-pointer hover:border-[#005F56] transition-colors">
              <Calendar size={15} className="text-[#005F56]" />
              <div>
                <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Pick-up date</div>
                <div className="text-sm font-semibold text-gray-500">Add date</div>
              </div>
            </div>
            <div className="flex items-center gap-2 border border-gray-200 rounded-xl px-4 py-2.5 flex-1 min-w-[140px] cursor-pointer hover:border-[#005F56] transition-colors">
              <Calendar size={15} className="text-[#005F56]" />
              <div>
                <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Drop-off date</div>
                <div className="text-sm font-semibold text-gray-500">Add date</div>
              </div>
            </div>
            <div className="flex items-center gap-2 border border-gray-200 rounded-xl px-4 py-2.5 cursor-pointer hover:border-[#005F56] transition-colors">
              <Car size={15} className="text-[#005F56]" />
              <div>
                <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Car type</div>
                <div className="text-sm font-semibold text-gray-800">All types</div>
              </div>
              <ChevronDown size={14} className="text-gray-400" />
            </div>
            <button className="px-6 py-2.5 bg-[#005F56] text-white font-bold rounded-xl hover:bg-[#004840] transition-all text-sm">
              Search
            </button>
          </div>
        </div>
      </div>

      {/* Filter chips */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-[1280px] mx-auto px-6 py-3">
          <FilterChips />
        </div>
      </div>

      {/* Main layout */}
      <div className="max-w-[1280px] mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-[220px_1fr] gap-8">
          <SidebarFilters category="cars" />
          <div>
            <div className="flex items-center justify-between mb-5">
              <p className="text-sm text-gray-500"><span className="font-bold text-gray-800">{listings.length}</span> cars found</p>
              <select className="text-sm border border-gray-200 rounded-xl px-3 py-2 text-gray-700 bg-white outline-none focus:border-[#005F56]">
                <option>Most Popular</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
                <option>Top Rated</option>
              </select>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
              {listings.map(listing => <ListingCard key={listing.id} listing={listing} />)}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
