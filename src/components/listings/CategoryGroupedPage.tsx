import { LucideIcon, TrendingUp, Sparkles, Tag, Gem } from 'lucide-react'
import ListingCard from './ListingCard'
import NearMeSection from '@/components/home/NearMeSection'
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
          {listings.map(l => <ListingCard key={l.id} listing={l} className="snap-start flex-shrink-0 w-[260px] sm:w-[280px]" />)}
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
  mostPopular, nearMe, newListings, budgetFriendly, luxury,
}: Props) {
  const totalCount = mostPopular.length + newListings.length

  return (
    <div>
      {/* Hero */}
      <div className="relative overflow-hidden" style={{ backgroundColor: accentHex }}>
        <div className="absolute right-8 top-1/2 -translate-y-1/2 text-[120px] opacity-[0.07] select-none pointer-events-none">
          {emoji}
        </div>
        <div className="absolute top-0 left-0 w-64 h-64 bg-black/10 rounded-full -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
        <div className="max-w-[1280px] mx-auto px-6 py-12 relative z-10">
          <div className="flex items-center gap-2 text-white/60 text-sm mb-3">
            <Icon size={16} className={iconColor} />
            <span>{totalCount}+ listings in Akure</span>
          </div>
          <h1 className="text-4xl font-extrabold text-white tracking-tight mb-2">{title}</h1>
          <p className="text-white/60 text-base">{subtitle}</p>
        </div>
      </div>

      <ScrollRow
        title="Most Popular"
        subtitle="Highest-rated, most-loved"
        icon={<TrendingUp size={20} className="text-[#D62839]" />}
        listings={mostPopular}
      />

      <div className="bg-gray-50">
        <NearMeSection listings={nearMe} />
      </div>

      <ScrollRow
        title="New Listings"
        subtitle="Freshly added — be the first"
        icon={<Sparkles size={20} className="text-[#F4C300]" />}
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
        title="Luxury"
        subtitle="Premium experiences worth every naira"
        icon={<Gem size={20} className="text-[#D62839]" />}
        listings={luxury}
      />
    </div>
  )
}
