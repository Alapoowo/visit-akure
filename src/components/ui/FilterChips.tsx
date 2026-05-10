'use client'

import { useState } from 'react'
import { Star, Navigation, Sparkles, Wallet, Crown } from 'lucide-react'
import { cn } from '@/lib/utils'

const chips = [
  { label: 'Most Popular', icon: Star },
  { label: 'Near Me', icon: Navigation },
  { label: 'New Listings', icon: Sparkles },
  { label: 'Budget-Friendly', icon: Wallet },
  { label: 'Luxury', icon: Crown },
]

interface FilterChipsProps {
  onFilterChange?: (filter: string) => void
}

export default function FilterChips({ onFilterChange }: FilterChipsProps) {
  const [active, setActive] = useState('Most Popular')

  return (
    <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
      {chips.map(({ label, icon: Icon }) => (
        <button
          key={label}
          onClick={() => { setActive(label); onFilterChange?.(label) }}
          className={cn(
            'flex-shrink-0 flex items-center gap-1.5 px-4 py-2 rounded-full border text-sm font-semibold transition-all whitespace-nowrap',
            active === label
              ? 'bg-[#005F56] text-white border-[#005F56]'
              : 'bg-white text-gray-600 border-gray-200 hover:border-[#005F56] hover:text-[#005F56]'
          )}
        >
          <Icon size={14} />
          {label}
        </button>
      ))}
    </div>
  )
}
