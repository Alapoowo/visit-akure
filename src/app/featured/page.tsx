import Link from 'next/link'
import { ArrowLeft, TrendingUp } from 'lucide-react'
import ListingCard from '@/components/listings/ListingCard'
import { getHomepageSection } from '@/data/listings'

export const metadata = {
  title: 'Featured Businesses | Visit Akure',
  description: 'Explore the top-rated, most popular businesses across all categories in Akure, Ondo State.',
}

export default function FeaturedPage() {
  const listings = getHomepageSection('popular', 40)

  return (
    <div>
      <div className="bg-[#005F56] relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#F4C300]/10 rounded-full -translate-y-1/3 translate-x-1/3 pointer-events-none" />
        <div className="max-w-[1280px] mx-auto px-6 py-12 relative z-10">
          <Link href="/" className="flex items-center gap-1.5 text-white/70 text-sm font-semibold mb-4 hover:text-white transition-colors">
            <ArrowLeft size={14} /> Back to Home
          </Link>
          <div className="flex items-center gap-2 text-white/60 text-sm mb-3">
            <TrendingUp size={16} className="text-[#F4C300]" />
            <span>Highest-rated listings across Akure</span>
          </div>
          <h1 className="text-4xl font-extrabold text-white tracking-tight mb-2">Featured Businesses</h1>
          <p className="text-white/60 text-base">The best businesses and services Akure has to offer</p>
        </div>
      </div>

      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 py-10">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-5">
          {listings.map(l => <ListingCard key={l.id} listing={l} />)}
        </div>
      </div>
    </div>
  )
}
