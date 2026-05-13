import Link from 'next/link'
import { ArrowRight, TrendingUp, Sparkles, Gem, Tag, MapPin } from 'lucide-react'
import SearchBar from '@/components/ui/SearchBar'
import ListingCard from '@/components/listings/ListingCard'
import NearMeSection from '@/components/home/NearMeSection'
import { getHomepageSection, activeListings } from '@/data/listings'
import { CATEGORIES } from '@/config/categories'

export default function HomePage() {
  const mostPopular = getHomepageSection('popular')
  const newListings = getHomepageSection('new')
  const budgetFriendly = getHomepageSection('budget')
  const luxury = getHomepageSection('luxury')
  const nearMe = activeListings.filter(l => l.isFeatured).slice(0, 8)

  return (
    <div>
      {/* Hero */}
      <section className="relative bg-[#005F56] overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#F4C300]/10 rounded-full -translate-y-1/2 translate-x-1/3 pointer-events-none" />
        <div className="absolute bottom-0 left-20 w-56 h-56 bg-[#D62839]/10 rounded-full translate-y-1/2 pointer-events-none" />

        <div className="relative max-w-[1280px] mx-auto px-4 sm:px-6 py-16 sm:py-24 flex flex-col items-center text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 text-white/90 text-xs font-bold px-4 py-2 rounded-full mb-6 uppercase tracking-wider">
            <MapPin size={12} />
            Discover Akure, Ondo State
          </div>

          {/* Headline */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white leading-tight tracking-tight mb-4">
            Your Gateway to<br />
            <span className="text-[#F4C300]">Akure&apos;s Best</span>
          </h1>
          <p className="text-white/65 text-base sm:text-lg mb-8 max-w-md leading-relaxed">
            Hotels, food, shortlets, services and more — all connected through WhatsApp.
          </p>

          {/* Search bar */}
          <div className="w-full max-w-2xl mb-10">
            <SearchBar />
          </div>

          {/* Category slider */}
          <div className="w-full max-w-2xl">
            <div className="flex gap-2.5 overflow-x-auto pb-2 -mx-4 px-4 scroll-smooth snap-x">
              {CATEGORIES.map(cat => {
                const Icon = cat.icon
                return (
                  <Link
                    key={cat.slug}
                    href={`/${cat.slug}`}
                    className="flex-shrink-0 snap-start flex flex-col items-center gap-1.5 bg-white/10 hover:bg-white/20 border border-white/20 rounded-2xl px-4 py-3 min-w-[80px] transition-all group"
                  >
                    <div className="w-9 h-9 bg-white/20 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Icon size={18} className="text-white" />
                    </div>
                    <span className="text-white/90 text-[11px] font-bold whitespace-nowrap">{cat.label}</span>
                  </Link>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Most Popular */}
      <section className="max-w-[1280px] mx-auto px-4 sm:px-6 py-8">
        <div className="flex items-center justify-between mb-5">
          <div>
            <h2 className="text-2xl font-extrabold text-gray-900 flex items-center gap-2">
              <TrendingUp size={20} className="text-[#D62839]" />
              Most Popular
            </h2>
            <p className="text-sm text-gray-500 mt-1">Highest-rated listings across Akure</p>
          </div>
          <Link href="/categories" className="flex items-center gap-1 text-sm font-bold text-[#D62839] hover:underline">
            See all <ArrowRight size={14} />
          </Link>
        </div>
        <div className="flex gap-4 overflow-x-auto pb-3 -mx-4 px-4 sm:-mx-6 sm:px-6 scroll-smooth snap-x">
          {mostPopular.map(l => <ListingCard key={l.id} listing={l} className="snap-start flex-shrink-0 w-[260px] sm:w-[280px]" />)}
        </div>
      </section>

      {/* Near Me */}
      <div className="bg-gray-50">
        <NearMeSection listings={nearMe} />
      </div>

      {/* New Listings */}
      <section className="max-w-[1280px] mx-auto px-4 sm:px-6 py-8">
        <div className="flex items-center justify-between mb-5">
          <div>
            <h2 className="text-2xl font-extrabold text-gray-900 flex items-center gap-2">
              <Sparkles size={20} className="text-[#F4C300]" />
              New Listings
            </h2>
            <p className="text-sm text-gray-500 mt-1">Freshly added — be the first to connect</p>
          </div>
          <Link href="/categories" className="flex items-center gap-1 text-sm font-bold text-[#D62839] hover:underline">
            See all <ArrowRight size={14} />
          </Link>
        </div>
        <div className="flex gap-4 overflow-x-auto pb-3 -mx-4 px-4 sm:-mx-6 sm:px-6 scroll-smooth snap-x">
          {newListings.map(l => <ListingCard key={l.id} listing={l} className="snap-start flex-shrink-0 w-[260px] sm:w-[280px]" />)}
        </div>
      </section>

      {/* Budget-Friendly */}
      <section className="bg-white py-8">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h2 className="text-2xl font-extrabold text-gray-900 flex items-center gap-2">
                <Tag size={20} className="text-[#005F56]" />
                Budget-Friendly
              </h2>
              <p className="text-sm text-gray-500 mt-1">Great value for every pocket</p>
            </div>
            <Link href="/categories" className="flex items-center gap-1 text-sm font-bold text-[#D62839] hover:underline">
              See all <ArrowRight size={14} />
            </Link>
          </div>
          <div className="flex gap-4 overflow-x-auto pb-3 -mx-4 px-4 sm:-mx-6 sm:px-6 scroll-smooth snap-x">
            {budgetFriendly.map(l => <ListingCard key={l.id} listing={l} className="snap-start flex-shrink-0 w-[260px] sm:w-[280px]" />)}
          </div>
        </div>
      </section>

      {/* Luxury */}
      <section className="max-w-[1280px] mx-auto px-4 sm:px-6 py-8">
        <div className="flex items-center justify-between mb-5">
          <div>
            <h2 className="text-2xl font-extrabold text-gray-900 flex items-center gap-2">
              <Gem size={20} className="text-[#D62839]" />
              Luxury Picks
            </h2>
            <p className="text-sm text-gray-500 mt-1">Premium experiences worth every naira</p>
          </div>
          <Link href="/categories" className="flex items-center gap-1 text-sm font-bold text-[#D62839] hover:underline">
            See all <ArrowRight size={14} />
          </Link>
        </div>
        <div className="flex gap-4 overflow-x-auto pb-3 -mx-4 px-4 sm:-mx-6 sm:px-6 scroll-smooth snap-x">
          {luxury.map(l => <ListingCard key={l.id} listing={l} className="snap-start flex-shrink-0 w-[260px] sm:w-[280px]" />)}
        </div>
      </section>

      {/* CTA */}
      <section className="relative bg-[#005F56] overflow-hidden">
        <div className="relative max-w-[1280px] mx-auto px-6 py-20 text-center">
          <h2 className="text-4xl font-extrabold text-white mb-4">List Your Business on Visit Akure</h2>
          <p className="text-white/65 text-lg mb-10 max-w-lg mx-auto">
            Reach thousands of visitors. Get direct WhatsApp leads every day. No booking fees.
          </p>
          <Link href="/onboard"
            className="inline-flex items-center gap-2 bg-[#F4C300] text-gray-900 font-extrabold px-10 py-4 rounded-2xl hover:bg-yellow-400 transition-all text-lg">
            Get Started Free <ArrowRight size={20} />
          </Link>
        </div>
      </section>
    </div>
  )
}
