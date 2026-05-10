import Link from 'next/link'
import { Home, Search, ArrowLeft, MapPin } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="min-h-[calc(100vh-64px)] flex flex-col items-center justify-center px-6 py-20 text-center">
      {/* Illustration */}
      <div className="relative mb-8">
        <div className="text-[120px] leading-none select-none">🗺️</div>
        <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-24 h-3 bg-gray-200 blur-md rounded-full" />
      </div>

      {/* Error number */}
      <div className="text-8xl font-extrabold text-gray-100 tracking-tight mb-4 select-none">
        404
      </div>

      <h1 className="text-2xl font-extrabold text-gray-900 mb-3 tracking-tight">
        This page got lost in Akure
      </h1>
      <p className="text-gray-500 max-w-sm leading-relaxed mb-10">
        The page you&apos;re looking for doesn&apos;t exist or may have moved. Let&apos;s get you back on track.
      </p>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-3 mb-12">
        <Link
          href="/"
          className="flex items-center gap-2 px-6 py-3 bg-[#005F56] text-white font-bold rounded-xl hover:bg-[#004840] transition-all"
        >
          <Home size={16} /> Back to Home
        </Link>
        <Link
          href="/cars"
          className="flex items-center gap-2 px-6 py-3 border-2 border-gray-200 text-gray-700 font-bold rounded-xl hover:border-[#005F56] hover:text-[#005F56] transition-all"
        >
          <Search size={16} /> Browse Listings
        </Link>
      </div>

      {/* Quick links */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-lg w-full">
        {[
          { href: '/stays', emoji: '🏨', label: 'Stays' },
          { href: '/cars', emoji: '🚗', label: 'Cars' },
          { href: '/activities', emoji: '🎭', label: 'Activities' },
          { href: '/events', emoji: '📅', label: 'Events' },
        ].map(item => (
          <Link
            key={item.href}
            href={item.href}
            className="flex flex-col items-center gap-2 p-4 bg-white border border-gray-100 rounded-2xl hover:border-[#005F56]/30 hover:shadow-sm transition-all"
          >
            <span className="text-2xl">{item.emoji}</span>
            <span className="text-xs font-bold text-gray-600">{item.label}</span>
          </Link>
        ))}
      </div>
    </div>
  )
}
