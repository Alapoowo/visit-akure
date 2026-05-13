'use client'

import { MessageCircle, Star, BadgeCheck, Clock, CheckCircle2, ChevronRight } from 'lucide-react'
import { Listing } from '@/types'
import { formatPrice } from '@/lib/utils'

interface Props {
  listing: Listing
  showPrice: boolean
}

export default function WhatsAppCTA({ listing, showPrice }: Props) {
  const vendor = listing.vendor

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

      <p className="text-xs text-gray-400 text-center mb-5">
        Tap to send a pre-filled message directly to the vendor
      </p>

      <hr className="border-gray-100 mb-5" />

      {/* Vendor info */}
      {vendor && (
        <>
          <div className="text-sm font-bold text-gray-700 mb-3">Meet your partner</div>
          <div className="flex items-center gap-3 bg-gray-50 rounded-xl p-3">
            <div className="w-11 h-11 rounded-full bg-[#e6f2f1] flex items-center justify-center text-[#005F56] font-bold text-sm flex-shrink-0">
              {vendor.businessName.split(' ').map(n => n[0]).join('').slice(0, 2)}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-0.5">
                <span className="font-bold text-sm text-gray-800 truncate">{vendor.businessName}</span>
                {vendor.isVerified && (
                  <span className="flex-shrink-0 flex items-center gap-1 bg-[#e6f2f1] text-[#005F56] text-[10px] font-bold px-2 py-0.5 rounded-full">
                    <BadgeCheck size={10} /> Trusted
                  </span>
                )}
              </div>
              {vendor.responseTime && (
                <div className="text-xs text-gray-500 flex items-center gap-1">
                  <Clock size={11} /> Responds within {vendor.responseTime}
                </div>
              )}
              {vendor.responseRate !== undefined && (
                <div className="text-xs text-gray-500 flex items-center gap-1 mt-0.5">
                  <CheckCircle2 size={11} /> {vendor.responseRate}% response rate
                </div>
              )}
            </div>
            <ChevronRight size={16} className="text-gray-300 flex-shrink-0" />
          </div>
        </>
      )}
    </div>
  )
}
