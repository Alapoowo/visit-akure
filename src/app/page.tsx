import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import SearchBar from '@/components/ui/SearchBar'
import ListingCard from '@/components/listings/ListingCard'
import { getHomepageSection } from '@/data/listings'
import { CATEGORIES } from '@/config/categories'

export default function HomePage() {
  const featured = getHomepageSection('popular')
  const luxury = getHomepageSection('luxury')

  return (
    <div>
      {/* Hero */}
      <section className="relative bg-[#005F56] overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#F4C300]/10 rounded-full -translate-y-1/2 translate-x-1/3 pointer-events-none" />
        <div className="absolute bottom-0 left-20 w-56 h-56 bg-[#D62839]/10 rounded-full translate-y-1/2 pointer-events-none" />

        <div className="relative max-w-[1280px] mx-auto px-4 sm:px-6 py-7 sm:py-12 flex flex-col items-center text-center">
          {/* Headline */}
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold text-white leading-tight tracking-tight mb-3">
            Ondo State #1<br />
            <span className="text-[#F4C300]">Discovery Platform</span>
          </h1>
          <p className="text-white/65 text-base sm:text-lg mb-7 max-w-md leading-relaxed">
            Find businesses, attractions, events, and more.
          </p>

          {/* Search bar */}
          <div className="w-full max-w-2xl mb-8">
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

      {/* Featured Businesses */}
      <section className="max-w-[1280px] mx-auto px-4 sm:px-6 py-8">
        <div className="flex items-center justify-between mb-5">
          <div>
            <h2 className="text-base sm:text-xl font-extrabold text-gray-900">Featured Businesses</h2>
            <p className="text-sm text-gray-500 mt-1">Highest-rated listings across Akure</p>
          </div>
          <Link href="/featured" className="flex items-center gap-1 text-sm font-bold text-[#D62839] hover:underline">
            See all <ArrowRight size={14} />
          </Link>
        </div>
        <div className="flex gap-4 overflow-x-auto pb-3 -mx-4 px-4 sm:-mx-6 sm:px-6 scroll-smooth snap-x">
          {featured.map(l => <ListingCard key={l.id} listing={l} className="snap-start flex-shrink-0 w-[45vw] sm:w-[260px] lg:w-[280px]" />)}
        </div>
      </section>

      {/* Top Experiences */}
      <section className="max-w-[1280px] mx-auto px-4 sm:px-6 py-8">
        <div className="flex items-center justify-between mb-5">
          <div>
            <h2 className="text-base sm:text-xl font-extrabold text-gray-900">Top Experiences</h2>
            <p className="text-sm text-gray-500 mt-1">Premium experiences worth every naira</p>
          </div>
          <Link href="/top-experiences" className="flex items-center gap-1 text-sm font-bold text-[#D62839] hover:underline">
            See all <ArrowRight size={14} />
          </Link>
        </div>
        <div className="flex gap-4 overflow-x-auto pb-3 -mx-4 px-4 sm:-mx-6 sm:px-6 scroll-smooth snap-x">
          {luxury.map(l => <ListingCard key={l.id} listing={l} className="snap-start flex-shrink-0 w-[45vw] sm:w-[260px] lg:w-[280px]" />)}
        </div>
      </section>

      {/* CTA */}
      <section className="relative bg-[#005F56] overflow-hidden">
        <div className="relative max-w-[1280px] mx-auto px-6 py-16 text-center">
          <h2 className="text-4xl font-extrabold text-white mb-4">List Your Business</h2>
          <p className="text-white/65 text-lg mb-10 max-w-lg mx-auto">
            Make it easier for customers to find and contact you.
          </p>
          <Link href="/onboard"
            className="inline-flex items-center gap-2 bg-[#F4C300] text-gray-900 font-extrabold px-10 py-4 rounded-2xl hover:bg-yellow-400 transition-all text-lg">
            Get Started Now <ArrowRight size={20} />
          </Link>
        </div>
      </section>
    </div>
  )
}
