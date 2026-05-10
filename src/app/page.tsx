import Link from 'next/link'
import { Hotel, Car, Zap, Calendar, Wrench, ShoppingBag, ArrowRight, Star, MapPin, TrendingUp, Users, BadgeCheck } from 'lucide-react'
import SearchBar from '@/components/ui/SearchBar'
import ListingCard from '@/components/listings/ListingCard'
import { getCarsListings, getStaysListings, getActivitiesListings } from '@/data/listings'

const categories = [
  { label: 'Stays', desc: 'Find places to stay', href: '/stays', icon: Hotel, color: 'bg-[#D62839]' },
  { label: 'Cars', desc: 'Rent cars with ease', href: '/cars', icon: Car, color: 'bg-[#005F56]' },
  { label: 'Activities', desc: 'Explore fun activities', href: '/activities', icon: Zap, color: 'bg-[#F4C300]' },
  { label: 'Events', desc: 'Discover local events', href: '/events', icon: Calendar, color: 'bg-[#005F56]' },
  { label: 'Services', desc: 'Book local services', href: '/services', icon: Wrench, color: 'bg-[#D62839]' },
  { label: 'Products', desc: 'Shop local products', href: '/products', icon: ShoppingBag, color: 'bg-[#F4C300]' },
]

export default function HomePage() {
  const cars = getCarsListings().slice(0, 4)
  const stays = getStaysListings().slice(0, 4)
  const activities = getActivitiesListings().slice(0, 4)

  return (
    <div>
      <section className="relative bg-[#005F56] overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#F4C300]/10 rounded-full -translate-y-1/2 translate-x-1/3 pointer-events-none" />
        <div className="absolute bottom-0 left-20 w-56 h-56 bg-[#D62839]/10 rounded-full translate-y-1/2 pointer-events-none" />
        <div className="relative max-w-[1280px] mx-auto px-6 py-20">
          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 text-white/90 text-xs font-bold px-4 py-2 rounded-full mb-6 uppercase tracking-wider">
            <MapPin size={12} />
            Discover Akure, Ondo State
          </div>
          <h1 className="text-5xl md:text-6xl font-extrabold text-white leading-tight tracking-tight mb-4">
            Your Gateway to<br />
            <span className="text-[#F4C300]">Akure&apos;s Best</span>
          </h1>
          <p className="text-white/65 text-lg mb-10 max-w-lg leading-relaxed">
            Stays, cars, activities and events — all connected through WhatsApp.
          </p>
          <SearchBar />
        </div>
      </section>

      <section className="max-w-[1280px] mx-auto px-6 py-12">
        <h2 className="text-2xl font-extrabold text-gray-900 mb-6">What are you looking for?</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map(({ label, desc, href, icon: Icon, color }) => (
            <Link key={label} href={href}
              className="group flex flex-col items-center gap-3 p-5 bg-white rounded-2xl border border-gray-100 hover:border-[#005F56]/30 hover:shadow-md transition-all text-center">
              <div className={`w-12 h-12 ${color} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform`}>
                <Icon size={22} className="text-white" />
              </div>
              <div>
                <div className="font-bold text-sm text-gray-800">{label}</div>
                <div className="text-[11px] text-gray-400 mt-0.5 leading-snug">{desc}</div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="max-w-[1280px] mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-extrabold text-gray-900">Popular Stays</h2>
            <p className="text-sm text-gray-500 mt-1">Top-rated hotels and apartments</p>
          </div>
          <Link href="/stays" className="flex items-center gap-1 text-sm font-bold text-[#D62839] hover:underline">
            See all <ArrowRight size={14} />
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {stays.map(l => <ListingCard key={l.id} listing={l} />)}
        </div>
      </section>

      <section className="bg-white py-12">
        <div className="max-w-[1280px] mx-auto px-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-extrabold text-gray-900">Featured Cars</h2>
              <p className="text-sm text-gray-500 mt-1">Verified car rentals for every budget</p>
            </div>
            <Link href="/cars" className="flex items-center gap-1 text-sm font-bold text-[#D62839] hover:underline">
              See all <ArrowRight size={14} />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {cars.map(l => <ListingCard key={l.id} listing={l} />)}
          </div>
        </div>
      </section>

      <section className="max-w-[1280px] mx-auto px-6 py-12">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-extrabold text-gray-900">Top Activities</h2>
            <p className="text-sm text-gray-500 mt-1">Unforgettable experiences in Ondo State</p>
          </div>
          <Link href="/activities" className="flex items-center gap-1 text-sm font-bold text-[#D62839] hover:underline">
            See all <ArrowRight size={14} />
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {activities.map(l => <ListingCard key={l.id} listing={l} />)}
        </div>
      </section>

      <section className="relative bg-[#005F56] overflow-hidden">
        <div className="relative max-w-[1280px] mx-auto px-6 py-20 text-center">
          <h2 className="text-4xl font-extrabold text-white mb-4">List Your Business on Visit Akure</h2>
          <p className="text-white/65 text-lg mb-10 max-w-lg mx-auto">
            Reach thousands of visitors. Get direct WhatsApp leads every day.
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
