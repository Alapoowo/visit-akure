import Link from 'next/link'
import { Grid3x3, ArrowRight } from 'lucide-react'
import { CATEGORIES } from '@/config/categories'
import { getListingsByCategory } from '@/data/listings'

export const metadata = {
  title: 'All Categories | Visit Akure',
  description: 'Browse all categories on Visit Akure — hotels, food, shortlets, services, health, shops, local market and events.',
}

export default function CategoriesPage() {
  return (
    <div>
      {/* Hero */}
      <div className="bg-[#005F56] relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#F4C300]/10 rounded-full -translate-y-1/3 translate-x-1/3 pointer-events-none" />
        <div className="max-w-[1280px] mx-auto px-6 py-12 relative z-10">
          <div className="flex items-center gap-2 text-white/60 text-sm mb-3">
            <Grid3x3 size={16} className="text-[#F4C300]" />
            <span>Everything Akure has to offer</span>
          </div>
          <h1 className="text-4xl font-extrabold text-white tracking-tight mb-2">All Categories</h1>
          <p className="text-white/60 text-base">Browse every category — from hotels to local markets</p>
        </div>
      </div>

      {/* Category grid */}
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {CATEGORIES.map(cat => {
            const Icon = cat.icon
            const count = getListingsByCategory(cat.slug).filter(l => l.isApproved).length
            return (
              <Link
                key={cat.slug}
                href={`/${cat.slug}`}
                className="group bg-white rounded-2xl border border-gray-100 p-5 flex flex-col items-center text-center hover:border-gray-300 hover:shadow-lg transition-all"
              >
                <div className={`w-14 h-14 ${cat.bgColor} rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <Icon size={26} className={cat.color} />
                </div>
                <div className="font-extrabold text-gray-900 text-sm sm:text-base mb-1">{cat.label}</div>
                <div className="text-xs text-gray-500 mb-2 leading-snug line-clamp-2">{cat.subcopy}</div>
                <div className="text-xs font-bold text-gray-400">{count} listing{count !== 1 ? 's' : ''}</div>
                <div className="mt-3 flex items-center gap-1 text-[#005F56] text-xs font-bold opacity-0 group-hover:opacity-100 transition-opacity">
                  Browse <ArrowRight size={12} />
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </div>
  )
}
