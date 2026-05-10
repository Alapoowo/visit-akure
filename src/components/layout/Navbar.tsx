'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  Home, Hotel, Car, Zap, Calendar, Heart, Search,
  User, Menu, X, MapPin
} from 'lucide-react'
import { useState } from 'react'
import { cn } from '@/lib/utils'
import { useWishlist } from '@/context/WishlistContext'

const navLinks = [
  { href: '/', label: 'Home', icon: Home },
  { href: '/stays', label: 'Stays', icon: Hotel },
  { href: '/cars', label: 'Cars', icon: Car },
  { href: '/activities', label: 'Activities', icon: Zap },
  { href: '/events', label: 'Events', icon: Calendar },
]

export default function Navbar() {
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = useState(false)
  const { count } = useWishlist()

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-[1280px] mx-auto px-6 h-16 flex items-center gap-6">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-1 flex-shrink-0">
          <span className="text-xl font-extrabold text-[#005F56] tracking-tight">VISIT</span>
          <span className="text-xl font-extrabold text-[#D62839] tracking-tight">AKURE</span>
          <span className="text-[10px] text-gray-400 ml-0.5 mt-0.5">™</span>
        </Link>

        {/* Nav Links - Desktop */}
        <nav className="hidden md:flex items-center gap-1 flex-1">
          {navLinks.map(({ href, label, icon: Icon }) => {
            const active = pathname === href || (href !== '/' && pathname.startsWith(href))
            return (
              <Link
                key={href}
                href={href}
                className={cn(
                  'flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm transition-all',
                  active
                    ? 'text-[#005F56] bg-[#e6f2f1] font-bold'
                    : 'text-gray-500 hover:text-gray-800 hover:bg-gray-50 font-semibold'
                )}
              >
                <Icon size={15} />
                {label}
              </Link>
            )
          })}
        </nav>

        {/* Right side */}
        <div className="flex items-center gap-2 ml-auto">
          <Link
            href="/search"
            className="hidden sm:flex items-center gap-1.5 px-3 py-2 text-sm font-semibold text-gray-500 hover:text-gray-800 hover:bg-gray-50 rounded-lg transition-all"
          >
            <Search size={16} />
          </Link>

          <Link
            href="/saved"
            className="hidden sm:flex items-center gap-1.5 px-3 py-2 text-sm font-semibold text-gray-500 hover:text-gray-800 hover:bg-gray-50 rounded-lg transition-all relative"
          >
            <Heart size={16} />
            {count > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#D62839] text-white text-[9px] font-bold rounded-full flex items-center justify-center">
                {count}
              </span>
            )}
            <span className="hidden lg:inline">Saved</span>
          </Link>

          <Link
            href="/onboard"
            className="hidden sm:flex items-center gap-1.5 px-3 py-2 text-sm font-semibold text-gray-600 hover:text-gray-800 hover:bg-gray-50 rounded-lg transition-all border border-gray-200"
          >
            <MapPin size={15} />
            <span>List Business</span>
          </Link>

          <Link
            href="/auth/login"
            className="flex items-center gap-1.5 px-4 py-2 bg-[#005F56] text-white text-sm font-bold rounded-xl hover:bg-[#004840] transition-all"
          >
            <User size={15} />
            <span className="hidden sm:inline">Sign In</span>
          </Link>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-all"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 px-4 py-3 space-y-1">
          {navLinks.map(({ href, label, icon: Icon }) => {
            const active = pathname === href || (href !== '/' && pathname.startsWith(href))
            return (
              <Link
                key={href}
                href={href}
                onClick={() => setMobileOpen(false)}
                className={cn(
                  'flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-all',
                  active ? 'bg-[#e6f2f1] text-[#005F56] font-bold' : 'text-gray-600 hover:bg-gray-50'
                )}
              >
                <Icon size={18} />
                {label}
              </Link>
            )
          })}
          <div className="pt-2 border-t border-gray-100 space-y-1">
            <Link href="/search" onClick={() => setMobileOpen(false)}
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold text-gray-600 hover:bg-gray-50">
              <Search size={18} /> Search
            </Link>
            <Link href="/onboard" onClick={() => setMobileOpen(false)}
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold text-gray-600 hover:bg-gray-50">
              <MapPin size={18} /> List Your Business
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}

