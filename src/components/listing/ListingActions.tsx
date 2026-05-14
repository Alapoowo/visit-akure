'use client'

import { useState } from 'react'
import { Share2, Heart, MessageCircle, Check } from 'lucide-react'
import { useWishlist } from '@/context/WishlistContext'
import { useToast } from '@/context/ToastContext'
import { getWhatsAppLink } from '@/lib/utils'

interface ListingActionsProps {
  listingId: string
  title: string
  whatsappNumber: string
}

export default function ListingActions({ listingId, title, whatsappNumber }: ListingActionsProps) {
  const { isSaved, toggle } = useWishlist()
  const { toast } = useToast()
  const [shared, setShared] = useState(false)
  const saved = isSaved(listingId)

  const handleShare = async () => {
    const url = window.location.href
    try {
      if (navigator.share) {
        await navigator.share({ title, url })
      } else {
        await navigator.clipboard.writeText(url)
        setShared(true)
        setTimeout(() => setShared(false), 2000)
        toast('Link copied to clipboard', 'info')
      }
    } catch {}
  }

  const handleSave = () => {
    const nowSaved = toggle(listingId)
    toast(nowSaved ? '❤️ Saved to wishlist' : 'Removed from wishlist', nowSaved ? 'saved' : 'info')
  }

  const handleMessage = () => {
    const link = getWhatsAppLink(whatsappNumber, title)
    window.open(link, '_blank', 'noopener,noreferrer')
  }

  return (
    <div className="flex items-center gap-2 flex-shrink-0">
      <button
        onClick={handleShare}
        className="flex items-center gap-1.5 px-2.5 sm:px-4 py-2 border border-gray-200 rounded-xl text-sm font-semibold text-gray-600 hover:border-[#005F56] hover:text-[#005F56] transition-all"
        title="Share"
      >
        {shared ? <Check size={15} className="text-[#005F56]" /> : <Share2 size={15} />}
        <span className="hidden sm:inline">{shared ? 'Copied!' : 'Share'}</span>
      </button>

      <button
        onClick={handleSave}
        className={`flex items-center gap-1.5 px-2.5 sm:px-4 py-2 border rounded-xl text-sm font-semibold transition-all ${
          saved
            ? 'border-[#D62839] text-[#D62839] bg-[#D62839]/5'
            : 'border-gray-200 text-gray-600 hover:border-[#D62839] hover:text-[#D62839]'
        }`}
        title={saved ? 'Saved' : 'Save'}
      >
        <Heart size={15} fill={saved ? 'currentColor' : 'none'} />
        <span className="hidden sm:inline">{saved ? 'Saved' : 'Save'}</span>
      </button>

      <button
        onClick={handleMessage}
        className="flex items-center gap-1.5 px-2.5 sm:px-4 py-2 border border-gray-200 rounded-xl text-sm font-semibold text-gray-600 hover:border-[#25D366] hover:text-[#25D366] transition-all"
        title="Message"
      >
        <MessageCircle size={15} />
        <span className="hidden sm:inline">Message</span>
      </button>
    </div>
  )
}
