'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Home, Hotel, Car, Heart, User } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useWishlist } from '@/context/WishlistContext'

const tabs = [
  { href: '/', label: 'Home', icon: Home },
  { href: '/stays', label: 'Stays', icon: Hotel },
  { href: '/cars', label: 'Cars', icon: Car },
  { href: '/saved', label: 'Saved', icon: Heart },
  { href: '/auth/login', label: 'Profile', icon: User },
]

export default function MobileBottomNav() {
  const pathname = usePathname()
  const { count } = useWishlist()

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-100 shadow-lg md:hidden safe-area-bottom">
      <div className="flex">
        {tabs.map(({ href, label, icon: Icon }) => {
          const active = pathname === href || (href !== '/' && pathname.startsWith(href))
          const isSaved = href === '/saved'
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                'flex-1 flex flex-col items-center justify-center py-2.5 gap-1 transition-all',
                active ? 'text-[#005F56]' : 'text-gray-400 hover:text-gray-600'
              )}
            >
              <div className="relative">
                <Icon
                  size={22}
                  fill={active ? 'currentColor' : 'none'}
                  className="transition-all"
                  strokeWidth={active ? 2.5 : 1.8}
                />
                {isSaved && count > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-[#D62839] text-white text-[9px] font-bold rounded-full flex items-center justify-center">
                    {count > 9 ? '9+' : count}
                  </span>
                )}
              </div>
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
