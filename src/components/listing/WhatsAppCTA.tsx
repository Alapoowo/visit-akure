'use client'

import { MessageCircle, Star } from 'lucide-react'
import { Listing } from '@/types'
import { formatPrice } from '@/lib/utils'

interface Props {
  listing: Listing
  showPrice: boolean
}

export default function WhatsAppCTA({ listing, showPrice }: Props) {
  const handleWhatsApp = () => {
    const msg = encodeURIComponent(
      `Hi, I saw your listing on Visit Akure — *${listing.title}*. I'm interested and would like to know more.`
    )
    window.open(`https://wa.me/${listing.whatsappNumber}?text=${msg}`, '_blank', 'noopener,noreferrer')
  }

  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-md sticky top-20">
      {/* Price or tagline */}
      {showPrice ? (
        <div className="mb-5">
          <div className="text-2xl font-extrabold text-gray-900">
            {listing.priceMax
              ? `${formatPrice(listing.price)} – ${formatPrice(listing.priceMax)}`
              : formatPrice(listing.price)}
            <span className="text-sm font-normal text-gray-400 ml-1">{listing.priceUnit}</span>
          </div>
          <div className="flex items-center gap-1 text-sm text-gray-500 mt-1">
            <Star size={13} className="text-[#F4C300] fill-[#F4C300]" />
            <strong className="text-gray-800">{listing.rating}</strong> · {listing.reviewCount} reviews
          </div>
        </div>
      ) : (
        <div className="mb-5">
          <div className="text-lg font-extrabold text-gray-900">{listing.title}</div>
          <div className="flex items-center gap-1 text-sm text-gray-500 mt-1">
            <Star size={13} className="text-[#F4C300] fill-[#F4C300]" />
            <strong className="text-gray-800">{listing.rating}</strong> · {listing.reviewCount} reviews
          </div>
        </div>
      )}

      {/* CTA Button */}
      <button
        onClick={handleWhatsApp}
        className="w-full flex items-center justify-center gap-2.5 py-4 bg-[#25D366] text-white font-extrabold rounded-xl hover:bg-[#1fbb5a] active:scale-[0.98] transition-all text-base mb-3 wa-pulse"
      >
        <MessageCircle size={20} />
        Chat on WhatsApp
      </button>

      <p className="text-xs text-gray-400 text-center">
        Tap to send a pre-filled message directly to the vendor
      </p>
    </div>
  )
}
