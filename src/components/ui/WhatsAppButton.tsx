'use client'

import { MessageCircle } from 'lucide-react'
import { getWhatsAppLink } from '@/lib/utils'
import { cn } from '@/lib/utils'

interface WhatsAppButtonProps {
  phone: string
  title: string
  className?: string
  size?: 'sm' | 'md' | 'lg'
  sticky?: boolean
}

export default function WhatsAppButton({ phone, title, className, size = 'lg', sticky }: WhatsAppButtonProps) {
  const link = getWhatsAppLink(phone, title)

  const sizeClasses = {
    sm: 'px-4 py-2.5 text-sm',
    md: 'px-5 py-3 text-sm',
    lg: 'px-6 py-4 text-base',
  }

  const handleClick = async () => {
    // Track click (fire and forget)
    try {
      await fetch('/api/track-whatsapp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title }),
      })
    } catch {}
    window.open(link, '_blank', 'noopener,noreferrer')
  }

  return (
    <button
      onClick={handleClick}
      className={cn(
        'w-full flex items-center justify-center gap-2.5 font-bold rounded-xl transition-all wa-pulse',
        'bg-[#25D366] text-white hover:bg-[#1fbb5a] active:scale-[0.98]',
        sizeClasses[size],
        sticky && 'shadow-xl',
        className
      )}
    >
      <MessageCircle size={size === 'sm' ? 16 : 20} />
      Chat on WhatsApp
    </button>
  )
}
