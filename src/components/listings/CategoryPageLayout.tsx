import { LucideIcon } from 'lucide-react'
import ListingCard from '@/components/listings/ListingCard'
import SidebarFilters from '@/components/listings/SidebarFilters'
import FilterChips from '@/components/ui/FilterChips'
import EmptyState from '@/components/ui/EmptyState'
import { Listing } from '@/types'

interface CategoryPageLayoutProps {
  title: string
  subtitle: string
  emoji: string
  category: string
  listings: Listing[]
  icon: LucideIcon
  iconColor?: string
  showSidebar?: boolean
}

export default function CategoryPageLayout({
  title,
  subtitle,
  emoji,
  category,
  listings,
  icon: Icon,
  iconColor = 'text-[#F4C300]',
  showSidebar = true,
}: CategoryPageLayoutProps) {
  return (
    <div>
      {/* Hero */}
      <div className="bg-[#005F56] relative overflow-hidden">
        <div className="absolute right-8 top-1/2 -translate-y-1/2 text-[120px] opacity-[0.07] select-none pointer-events-none">
          {emoji}
        </div>
        {/* Decorative accent */}
        <div className="absolute top-0 left-0 w-64 h-64 bg-[#D62839]/10 rounded-full -translate-x-1/2 -translate-y-1/2 pointer-events-none" />

        <div className="max-w-[1280px] mx-auto px-6 py-10 relative z-10 flex items-center gap-3">
          <div className="w-10 h-10 bg-white/15 rounded-xl flex items-center justify-center flex-shrink-0">
            <Icon size={20} className={iconColor} />
          </div>
          <div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">{title}</h1>
            <p className="text-white/60 text-sm mt-0.5">{subtitle}</p>
          </div>
        </div>
      </div>

      {/* Filter chips */}
      <div className="bg-white border-b border-gray-100 shadow-sm">
        <div className="max-w-[1280px] mx-auto px-6 py-3">
          <FilterChips />
        </div>
      </div>

      {/* Content */}
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {listings.length === 0 ? (
          <EmptyState type="listings" />
        ) : showSidebar ? (
          <div className="grid grid-cols-1 lg:grid-cols-[220px_1fr] gap-6 lg:gap-8">
            <div className="hidden lg:block">
              <SidebarFilters category={category} />
            </div>
            <div>
              <div className="flex items-center justify-between mb-5">
                <p className="text-sm text-gray-500">
                  <span className="font-bold text-gray-800">{listings.length}</span> {category} found
                </p>
                <select className="text-sm border border-gray-200 rounded-xl px-3 py-2 text-gray-700 bg-white outline-none focus:border-[#005F56] transition-colors cursor-pointer">
                  <option>Most Popular</option>
                  <option>Price: Low to High</option>
                  <option>Price: High to Low</option>
                  <option>Top Rated</option>
                  <option>Newest First</option>
                </select>
              </div>
              <div className="grid grid-cols-2 xl:grid-cols-4 gap-3 sm:gap-5">
                {listings.map(l => <ListingCard key={l.id} listing={l} />)}
              </div>
            </div>
          </div>
        ) : (
          <div>
            <p className="text-sm text-gray-500 mb-5">
              <span className="font-bold text-gray-800">{listings.length}</span> {category} found
            </p>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5">
              {listings.map(l => <ListingCard key={l.id} listing={l} />)}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
