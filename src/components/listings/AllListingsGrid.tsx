'use client'

import { useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import ListingCard from './ListingCard'
import { Listing } from '@/types'

const PAGE_SIZE = 20

export default function AllListingsGrid({ listings }: { listings: Listing[] }) {
  const [page, setPage] = useState(0)

  if (listings.length === 0) return null

  const totalPages = Math.ceil(listings.length / PAGE_SIZE)
  const slice = listings.slice(page * PAGE_SIZE, page * PAGE_SIZE + PAGE_SIZE)

  return (
    <section className="max-w-[1280px] mx-auto px-4 sm:px-6 py-8">
      <div className="flex items-center justify-between mb-5">
        <div>
          <h2 className="text-base sm:text-xl font-extrabold text-gray-900">All Listings</h2>
          <p className="text-sm text-gray-500 mt-1">{listings.length} listings found</p>
        </div>
        {totalPages > 1 && (
          <span className="text-sm text-gray-400">Page {page + 1} of {totalPages}</span>
        )}
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-5 mb-6">
        {slice.map(l => <ListingCard key={l.id} listing={l} />)}
      </div>

      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-3">
          <button
            onClick={() => { setPage(p => p - 1); window.scrollTo({ top: 0, behavior: 'smooth' }) }}
            disabled={page === 0}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl border border-gray-200 text-sm font-semibold text-gray-700 hover:border-[#005F56] hover:text-[#005F56] disabled:opacity-40 disabled:cursor-not-allowed transition-all"
          >
            <ChevronLeft size={16} /> Previous
          </button>
          <button
            onClick={() => { setPage(p => p + 1); window.scrollTo({ top: 0, behavior: 'smooth' }) }}
            disabled={page === totalPages - 1}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl border border-gray-200 text-sm font-semibold text-gray-700 hover:border-[#005F56] hover:text-[#005F56] disabled:opacity-40 disabled:cursor-not-allowed transition-all"
          >
            Next <ChevronRight size={16} />
          </button>
        </div>
      )}
    </section>
  )
}
