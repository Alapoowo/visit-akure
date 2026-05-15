import { LucideIcon, TrendingUp, Tag, Gem } from 'lucide-react'
import ListingCard from './ListingCard'
import { Listing } from '@/types'

function ScrollRow({ title, subtitle, icon, listings, bg = '' }: {
  title: string
  subtitle: string
  icon: React.ReactNode
  listings: Listing[]
  bg?: string
}) {
  if (listings.length === 0) return null
  return (
    <section className={bg}>
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 py-8">
        <div className="flex items-center justify-between mb-5">
          <div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-gray-900 flex items-center gap-2">
              {icon}
              {title}
            </h2>
            <p className="text-sm text-gray-500 mt-1">{subtitle}</p>
          </div>
        </div>
        <div className="flex gap-4 overflow-x-auto pb-3 -mx-4 px-4 sm:-mx-6 sm:px-6 scroll-smooth snap-x">
          {listings.map(l => <ListingCard key={l.id} listing={l} className="snap-start flex-shrink-0 w-[45vw] sm:w-[260px] lg:w-[280px]" />)}
        </div>
      </div>
    </section>
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
  nearMe: Listing[]
  newListings: Listing[]
  budgetFriendly: Listing[]
  luxury: Listing[]
}

export default function CategoryGroupedPage({
  title, subtitle, emoji, icon: Icon, iconColor = 'text-[#F4C300]', accentHex = '#005F56',
  mostPopular, newListings, budgetFriendly, luxury,
}: Props) {
  return (
    <div>
      {/* Hero — no listing count */}
      <div className="relative overflow-hidden" style={{ backgroundColor: accentHex }}>
        <div className="absolute right-8 top-1/2 -translate-y-1/2 text-[120px] opacity-[0.07] select-none pointer-events-none">
          {emoji}
        </div>
        <div className="absolute top-0 left-0 w-64 h-64 bg-black/10 rounded-full -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
        <div className="max-w-[1280px] mx-auto px-6 py-10 relative z-10 flex items-center gap-3">
          <div className={`w-10 h-10 bg-white/15 rounded-xl flex items-center justify-center flex-shrink-0`}>
            <Icon size={20} className={iconColor} />
          </div>
          <div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">{title}</h1>
            <p className="text-white/60 text-sm mt-0.5">{subtitle}</p>
          </div>
        </div>
      </div>

      <ScrollRow
        title="Most Popular"
        subtitle="Highest-rated, most-loved"
        icon={<TrendingUp size={20} className="text-[#D62839]" />}
        listings={mostPopular}
      />

      <ScrollRow
        title="New Listings"
        subtitle="Freshly added — be the first"
        icon={<span className="text-lg">✨</span>}
        listings={newListings}
      />

      <ScrollRow
        title="Budget-Friendly"
        subtitle="Great value for every pocket"
        icon={<Tag size={20} className="text-[#005F56]" />}
        listings={budgetFriendly}
        bg="bg-white"
      />

      <ScrollRow
        title="Top Picks"
        subtitle="Premium experiences worth every naira"
        icon={<Gem size={20} className="text-[#D62839]" />}
        listings={luxury}
      />
    </div>
  )
}
