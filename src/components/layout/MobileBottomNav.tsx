'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Home, Hotel, Utensils, Building2, Grid3x3 } from 'lucide-react'
import { cn } from '@/lib/utils'

const tabs = [
  { href: '/', label: 'Home', icon: Home },
  { href: '/hotels', label: 'Hotel', icon: Hotel },
  { href: '/foods', label: 'Food', icon: Utensils },
  { href: '/shortlets', label: 'Shortlet', icon: Building2 },
  { href: '/categories', label: 'All', icon: Grid3x3 },
]

export default function MobileBottomNav() {
  const pathname = usePathname()

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-100 shadow-lg md:hidden safe-area-bottom">
      <div className="flex">
        {tabs.map(({ href, label, icon: Icon }) => {
          const active = pathname === href || (href !== '/' && pathname.startsWith(href))
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                'flex-1 flex flex-col items-center justify-center py-2.5 gap-1 transition-all relative',
                active ? 'text-[#005F56]' : 'text-gray-400 hover:text-gray-600'
              )}
            >
              <Icon
                size={22}
                fill={active ? 'currentColor' : 'none'}
                className="transition-all"
                strokeWidth={active ? 2.5 : 1.8}
              />
              <span className={cn('text-[10px] font-semibold', active ? 'text-[#005F56]' : 'text-gray-400')}>
                {label}
              </span>
              {active && (
                <span className="absolute bottom-0 w-8 h-0.5 bg-[#005F56] rounded-full" />
              )}
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
