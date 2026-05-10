'use client'

import { Heart, Trash2 } from 'lucide-react'
import Link from 'next/link'
import ListingCard from '@/components/listings/ListingCard'
import EmptyState from '@/components/ui/EmptyState'
import { allListings } from '@/data/listings'
import { useWishlist } from '@/context/WishlistContext'

export default function SavedPage() {
  const { saved, toggle } = useWishlist()
  const savedListings = allListings.filter(l => saved.has(l.id))

  return (
    <div className="max-w-[1280px] mx-auto px-6 py-10">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight mb-1">
            Saved Listings
          </h1>
          <p className="text-gray-500 text-sm">
            {savedListings.length > 0
              ? `${savedListings.length} listing${savedListings.length !== 1 ? 's' : ''} saved`
              : 'No saved listings yet'}
          </p>
        </div>
        {savedListings.length > 0 && (
          <button
            onClick={() => savedListings.forEach(l => toggle(l.id))}
            className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-xl text-sm font-semibold text-gray-500 hover:border-red-300 hover:text-red-500 transition-all"
          >
            <Trash2 size={14} /> Clear all
          </button>
        )}
      </div>

      {savedListings.length === 0 ? (
        <EmptyState type="saved" />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {savedListings.map(listing => (
            <ListingCard key={listing.id} listing={listing} />
          ))}
        </div>
      )}

      {savedListings.length === 0 && (
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-5">
          <div className="text-center p-6 bg-white rounded-2xl border border-gray-100">
            <div className="text-3xl mb-3">🏨</div>
            <div className="font-bold text-sm mb-1">Browse Stays</div>
            <Link href="/stays" className="text-xs text-[#005F56] font-semibold hover:underline">
              Find hotels &amp; apartments →
            </Link>
          </div>
          <div className="text-center p-6 bg-white rounded-2xl border border-gray-100">
            <div className="text-3xl mb-3">🚗</div>
            <div className="font-bold text-sm mb-1">Rent a Car</div>
            <Link href="/cars" className="text-xs text-[#005F56] font-semibold hover:underline">
              Browse car rentals →
            </Link>
          </div>
          <div className="text-center p-6 bg-white rounded-2xl border border-gray-100">
            <div className="text-3xl mb-3">🎭</div>
            <div className="font-bold text-sm mb-1">Book Activities</div>
            <Link href="/activities" className="text-xs text-[#005F56] font-semibold hover:underline">
              Explore activities →
            </Link>
          </div>
        </div>
      )}
    </div>
  )
}
