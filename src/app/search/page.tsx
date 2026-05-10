'use client'

import { useState, useEffect, useCallback } from 'react'
import { useSearchParams } from 'next/navigation'
import { Search, X, SlidersHorizontal } from 'lucide-react'
import ListingCard from '@/components/listings/ListingCard'
import { ListingGridSkeleton } from '@/components/ui/Skeletons'
import EmptyState from '@/components/ui/EmptyState'
import { Listing } from '@/types'
import { Suspense } from 'react'

function SearchResults() {
  const searchParams = useSearchParams()
  const initialQ = searchParams.get('q') ?? ''
  const [query, setQuery] = useState(initialQ)
  const [results, setResults] = useState<Listing[]>([])
  const [loading, setLoading] = useState(false)
  const [total, setTotal] = useState(0)

  const search = useCallback(async (q: string) => {
    if (!q.trim()) { setResults([]); setTotal(0); return }
    setLoading(true)
    try {
      const res = await fetch(`/api/listings?q=${encodeURIComponent(q)}&limit=24`)
      const data = await res.json()
      setResults(data.results)
      setTotal(data.total)
    } catch {
      setResults([])
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    const t = setTimeout(() => search(query), 350)
    return () => clearTimeout(t)
  }, [query, search])

  useEffect(() => { if (initialQ) search(initialQ) }, [initialQ, search])

  return (
    <div className="max-w-[1280px] mx-auto px-6 py-10">
      {/* Search input */}
      <div className="max-w-2xl mb-8">
        <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight mb-5">
          Search Listings
        </h1>
        <div className="relative">
          <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Search stays, cars, activities, events…"
            className="w-full pl-11 pr-10 py-4 bg-white border-2 border-gray-200 rounded-2xl text-sm outline-none focus:border-[#005F56] transition-colors shadow-sm"
            autoFocus
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              <X size={16} />
            </button>
          )}
        </div>
        {query && !loading && (
          <p className="text-sm text-gray-500 mt-3">
            {total > 0
              ? <><span className="font-bold text-gray-800">{total}</span> result{total !== 1 ? 's' : ''} for &quot;<span className="font-semibold text-[#005F56]">{query}</span>&quot;</>
              : <>No results for &quot;<span className="font-semibold">{query}</span>&quot;</>}
          </p>
        )}
      </div>

      {/* Results */}
      {loading ? (
        <ListingGridSkeleton count={6} />
      ) : results.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {results.map(l => <ListingCard key={l.id} listing={l} />)}
        </div>
      ) : query ? (
        <EmptyState type="search" />
      ) : (
        <div className="text-center py-20">
          <div className="text-6xl mb-4">🔍</div>
          <p className="text-gray-400 text-lg">Start typing to search all listings</p>
        </div>
      )}
    </div>
  )
}

export default function SearchPage() {
  return (
    <Suspense fallback={<div className="max-w-[1280px] mx-auto px-6 py-10"><ListingGridSkeleton /></div>}>
      <SearchResults />
    </Suspense>
  )
}
