import { LucideIcon } from 'lucide-react'
import ListingCard from './ListingCard'
import AllListingsGrid from './AllListingsGrid'
import { Listing } from '@/types'

function ScrollRow({ listings }: { listings: Listing[] }) {
  if (listings.length === 0) return null
  return (
    <div className="flex gap-4 overflow-x-auto pb-3 -mx-4 px-4 sm:-mx-6 sm:px-6 scroll-smooth snap-x">
      {listings.map(l => <ListingCard key={l.id} listing={l} className="snap-start flex-shrink-0 w-[45vw] sm:w-[260px] lg:w-[280px]" />)}
    </div>
  )
}

interface Props {
  title: string
  subtitle: string
  emoji: string
  icon: LucideIcon
  iconColor?: string
  accentHex?: string
  mostPopular: Listing[]
  nearMe?: Listing[]
  newListings?: Listing[]
  budgetFriendly?: Listing[]
  luxury?: Listing[]
}

export default function CategoryGroupedPage({
  title, subtitle, emoji, icon: Icon,
  mostPopular, newListings = [], budgetFriendly = [], luxury = [],
}: Props) {
  const allListings = Array.from(
    new Map([...mostPopular, ...newListings, ...budgetFriendly, ...luxury].map(l => [l.id, l])).values()
  )

  return (
    <div>
      {/* Hero */}
      <div className="relative overflow-hidden bg-[#005F56]">
        <div className="absolute right-8 top-1/2 -translate-y-1/2 text-[120px] opacity-[0.07] select-none pointer-events-none">
          {emoji}
        </div>
        <div className="absolute top-0 left-0 w-64 h-64 bg-black/10 rounded-full -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
        <div className="max-w-[1280px] mx-auto px-6 py-10 relative z-10 flex items-center gap-3">
          <div className="w-10 h-10 bg-white/15 rounded-xl flex items-center justify-center flex-shrink-0">
            <Icon size={20} className="text-[#F4C300]" />
          </div>
          <div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">{title}</h1>
            <p className="text-white/60 text-sm mt-0.5">{subtitle}</p>
          </div>
        </div>
      </div>

      {/* Most Popular — horizontal scroll */}
      {mostPopular.length > 0 && (
        <section className="max-w-[1280px] mx-auto px-4 sm:px-6 py-8">
          <div className="mb-5">
            <h2 className="text-base sm:text-xl font-extrabold text-gray-900">Most Popular</h2>
            <p className="text-sm text-gray-500 mt-1">Highest-rated, most-loved</p>
          </div>
          <ScrollRow listings={mostPopular} />
        </section>
      )}

      {/* All Listings — grid with pagination */}
      <div className="bg-gray-50 border-t border-gray-100">
        <AllListingsGrid listings={allListings} />
      </div>
    </div>
  )
}
