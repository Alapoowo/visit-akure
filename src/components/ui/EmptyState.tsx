import Link from 'next/link'
import { Search, MapPin, Heart, Package } from 'lucide-react'

interface EmptyStateProps {
  type?: 'search' | 'saved' | 'listings' | 'generic'
  title?: string
  description?: string
  ctaLabel?: string
  ctaHref?: string
}

const defaults = {
  search: {
    icon: Search,
    title: 'No results found',
    description: 'Try adjusting your search or filters to find what you\'re looking for.',
    ctaLabel: 'Clear filters',
    ctaHref: '#',
    emoji: '🔍',
  },
  saved: {
    icon: Heart,
    title: 'No saved listings yet',
    description: 'Start exploring and tap the heart icon on any listing to save it here.',
    ctaLabel: 'Explore listings',
    ctaHref: '/',
    emoji: '❤️',
  },
  listings: {
    icon: MapPin,
    title: 'No listings in this category',
    description: 'Be the first to list your business in this category and reach thousands of visitors.',
    ctaLabel: 'List your business',
    ctaHref: '/onboard',
    emoji: '🏪',
  },
  generic: {
    icon: Package,
    title: 'Nothing here yet',
    description: 'Check back soon for new listings.',
    ctaLabel: 'Go home',
    ctaHref: '/',
    emoji: '📦',
  },
}

export default function EmptyState({
  type = 'generic',
  title,
  description,
  ctaLabel,
  ctaHref,
}: EmptyStateProps) {
  const d = defaults[type]
  const Icon = d.icon

  return (
    <div className="flex flex-col items-center justify-center py-24 px-6 text-center">
      {/* Illustration */}
      <div className="w-24 h-24 bg-gray-50 border-2 border-dashed border-gray-200 rounded-3xl flex items-center justify-center mb-5">
        <span className="text-4xl">{d.emoji}</span>
      </div>

      <h3 className="text-xl font-extrabold text-gray-900 mb-2">{title ?? d.title}</h3>
      <p className="text-gray-500 text-sm max-w-xs leading-relaxed mb-7">
        {description ?? d.description}
      </p>

      <Link
        href={ctaHref ?? d.ctaHref}
        className="inline-flex items-center gap-2 px-6 py-3 bg-[#005F56] text-white font-bold rounded-xl hover:bg-[#004840] transition-all text-sm"
      >
        <Icon size={15} />
        {ctaLabel ?? d.ctaLabel}
      </Link>
    </div>
  )
}
