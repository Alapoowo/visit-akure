'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  Home, Grid3x3, MapPin, Info, Phone, FileText, Shield,
  Heart, Menu, X,
} from 'lucide-react'
import { useState } from 'react'
import { cn } from '@/lib/utils'
import { useWishlist } from '@/context/WishlistContext'

function LogoLink() {
  const [imgOk, setImgOk] = useState<boolean | null>(null)
  return (
    <Link href="/" className="flex items-center gap-1.5 flex-shrink-0 mr-2">
      {imgOk !== false && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src="/logo.png"
          alt="Visit Akure"
          className="h-8 w-auto"
          onLoad={() => setImgOk(true)}
          onError={() => setImgOk(false)}
        />
      )}
      {imgOk === false && (
        <span className="flex items-center gap-0.5">
          <span className="text-xl font-extrabold text-[#005F56] tracking-tight">VISIT</span>
          <span className="text-xl font-extrabold text-[#D62839] tracking-tight">AKURE</span>
        </span>
      )}
    </Link>
  )
}

const navLinks = [
  { href: '/', label: 'Home', icon: Home },
  { href: '/categories', label: 'Categories', icon: Grid3x3 },
  { href: '/onboard', label: 'List Your Business', icon: MapPin },
  { href: '/about', label: 'About Us', icon: Info },
  { href: '/contact', label: 'Contact', icon: Phone },
  { href: '/terms', label: 'Terms of Service', icon: FileText },
  { href: '/privacy', label: 'Privacy Policy', icon: Shield },
]

export default function Navbar() {
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = useState(false)
  const { count } = useWishlist()

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 h-16 flex items-center gap-4">
        {/* Logo */}
        <LogoLink />

        {/* Nav Links — Desktop */}
        <nav className="hidden lg:flex items-center gap-0.5 flex-1 overflow-x-auto">
          {navLinks.map(({ href, label }) => {
            const active = pathname === href || (href !== '/' && pathname.startsWith(href))
            return (
              <Link
                key={href}
                href={href}
                className={cn(
                  'whitespace-nowrap px-3 py-2 rounded-lg text-sm transition-all font-semibold',
                  active
                    ? 'text-[#005F56] bg-[#e6f2f1] font-bold'
                    : 'text-gray-500 hover:text-gray-800 hover:bg-gray-50'
                )}
              >
                {label}
              </Link>
            )
          })}
        </nav>

        {/* Right side */}
        <div className="flex items-center gap-1.5 ml-auto">
          <Link
            href="/saved"
            className="relative flex items-center gap-1.5 px-3 py-2 text-sm font-semibold text-gray-500 hover:text-gray-800 hover:bg-gray-50 rounded-lg transition-all"
          >
            <Heart size={18} />
            {count > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#D62839] text-white text-[9px] font-bold rounded-full flex items-center justify-center">
                {count}
              </span>
            )}
            <span className="hidden lg:inline">Saved</span>
          </Link>

          {/* List Business button — tablet+, hidden on lg since it's in nav */}
          <Link
            href="/onboard"
            className="hidden md:flex lg:hidden items-center gap-1.5 px-3 py-2 text-sm font-semibold text-gray-600 hover:text-gray-800 hover:bg-gray-50 rounded-lg transition-all border border-gray-200"
          >
            <MapPin size={15} />
            List Business
          </Link>

          {/* Mobile menu button */}
          <button
            className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-all"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="lg:hidden bg-white border-t border-gray-100 px-4 py-3 space-y-1 shadow-lg">
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
                <Icon size={18} className="flex-shrink-0" />
                {label}
              </Link>
            )
          })}
        </div>
      )}
    </header>
  )
}
