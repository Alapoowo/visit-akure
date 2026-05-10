'use client'

import Link from 'next/link'
import { Heart, MapPin, Star, BadgeCheck } from 'lucide-react'
import { Listing } from '@/types'
import { formatPrice, cn } from '@/lib/utils'
import { useWishlist } from '@/context/WishlistContext'
import { useToast } from '@/context/ToastContext'

const categoryEmoji: Record<string, string> = {
  cars: '🚗', stays: '🏨', activities: '🎭',
  events: '📅', services: '🛎️', products: '🛍️',
}

interface ListingCardProps {
  listing: Listing
  className?: string
}

export default function ListingCard({ listing, className }: ListingCardProps) {
  const { isSaved, toggle } = useWishlist()
  const { toast } = useToast()
  const saved = isSaved(listing.id)

  const handleSave = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    const nowSaved = toggle(listing.id)
    toast(nowSaved ? '❤️ Saved to wishlist' : 'Removed from wishlist', nowSaved ? 'saved' : 'info')
  }

  return (
    <div className={cn('bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 card-hover group', className)}>
      {/* Image */}
      <Link href={`/listing/${listing.id}`}>
        <div className="relative h-52 bg-gradient-to-br from-gray-100 to-gray-200 img-zoom overflow-hidden cursor-pointer">
          <div className="absolute inset-0 flex items-center justify-center text-6xl select-none transition-transform duration-300 group-hover:scale-105">
            {categoryEmoji[listing.category] ?? '📦'}
          </div>

          {listing.isFeatured && (
            <div className="absolute top-3 left-3 flex items-center gap-1 bg-[#005F56] text-white text-[11px] font-bold px-2.5 py-1 rounded-lg shadow-sm">
              <BadgeCheck size={11} /> Featured
            </div>
          )}
          {listing.vendor?.isVerified && !listing.isFeatured && (
            <div className="absolute top-3 left-3 flex items-center gap-1 bg-white text-[#005F56] text-[11px] font-bold px-2.5 py-1 rounded-lg border border-[#005F56]/20">
              <BadgeCheck size={11} /> Verified
            </div>
          )}

          <button
            onClick={handleSave}
            className={cn(
              'absolute top-3 right-3 w-9 h-9 rounded-full flex items-center justify-center transition-all shadow-sm',
              saved ? 'bg-white text-[#D62839]' : 'bg-white/90 text-gray-400 hover:text-[#D62839]'
            )}
            aria-label={saved ? 'Remove from saved' : 'Save listing'}
          >
            <Heart size={16} fill={saved ? 'currentColor' : 'none'} />
          </button>
        </div>
      </Link>

      {/* Body */}
      <Link href={`/listing/${listing.id}`} className="block p-4 cursor-pointer">
        <div className="flex items-center gap-1.5 mb-1.5">
          <Star size={13} className="text-[#F4C300] fill-[#F4C300]" />
          <span className="text-sm font-bold text-gray-800">{listing.rating}</span>
          <span className="text-xs text-gray-400">({listing.reviewCount})</span>
        </div>

        <h3 className="font-bold text-gray-900 text-sm leading-snug mb-1 line-clamp-2 group-hover:text-[#005F56] transition-colors">
          {listing.title}
        </h3>

        <div className="flex items-center gap-1 text-xs text-gray-500 mb-3">
          <MapPin size={12} className="flex-shrink-0" />
          <span className="truncate">{listing.location}</span>
        </div>

        {listing.specs && (
          <div className="flex gap-1.5 flex-wrap mb-3">
            {Object.values(listing.specs).slice(0, 3).map((val, i) => (
              <span key={i} className="text-[11px] text-gray-500 bg-gray-50 px-2 py-0.5 rounded-full border border-gray-100">
                {val}
              </span>
            ))}
          </div>
        )}

        <div className="flex items-center justify-between pt-3 border-t border-gray-50">
          <div>
            <span className="text-lg font-extrabold text-gray-900">{formatPrice(listing.price)}</span>
            <span className="text-xs text-gray-400 ml-1">{listing.priceUnit}</span>
          </div>
          <span className="px-4 py-2 text-xs font-bold text-[#005F56] border border-[#005F56]/30 rounded-xl hover:bg-[#005F56] hover:text-white transition-all">
            View Details
          </span>
        </div>
      </Link>
    </div>
  )
}
