'use client'

import { MessageCircle } from 'lucide-react'
import { Listing } from '@/types'

export default function WhatsAppInlineButton({ listing }: { listing: Listing }) {
  const handleWhatsApp = () => {
    const msg = encodeURIComponent(
      `Hi, I saw your listing on Visit Akure — *${listing.title}*. I'm interested and would like to know more.`
    )
    window.open(`https://wa.me/${listing.whatsappNumber}?text=${msg}`, '_blank', 'noopener,noreferrer')
  }

  return (
    <button
      onClick={handleWhatsApp}
      className="flex items-center justify-center gap-2 bg-[#25D366] text-white font-extrabold rounded-xl px-5 py-3 hover:bg-[#1fbb5a] active:scale-[0.98] transition-all text-sm w-full sm:w-auto wa-pulse"
    >
      <MessageCircle size={18} />
      Chat on WhatsApp
    </button>
  )
}
