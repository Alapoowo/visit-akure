'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { MapPin, Calendar, Search, SlidersHorizontal, ChevronDown, X } from 'lucide-react'

const CATEGORY_OPTIONS = [
  { label: 'All Categories', value: '' },
  { label: 'Hotels', value: 'hotels' },
  { label: 'Foods', value: 'foods' },
  { label: 'Shortlets', value: 'shortlets' },
  { label: 'Services', value: 'services' },
  { label: 'Health', value: 'health' },
  { label: 'Shops', value: 'shops' },
  { label: 'Local Market', value: 'local-market' },
  { label: 'Events', value: 'events' },
]

export default function SearchBar() {
  const router = useRouter()
  const [query, setQuery] = useState('')
  const [filtersOpen, setFiltersOpen] = useState(false)
  const [location, setLocation] = useState('Akure, Ondo State')
  const [category, setCategory] = useState('')
  const [date, setDate] = useState('')

  const handleSearch = () => {
    const dest = category || 'hotels'
    router.push(`/${dest}`)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleSearch()
  }

  return (
    <div className="w-full max-w-2xl mx-auto">
      {/* Main search row */}
      <div className="bg-white rounded-2xl p-1.5 flex items-center gap-1 shadow-2xl">
        <div className="flex-1 flex items-center gap-3 px-4 py-2.5">
          <Search size={18} className="text-gray-400 flex-shrink-0" />
          <input
            value={query}
            onChange={e => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Search hotels, food, services…"
            className="text-sm font-medium text-gray-800 bg-transparent w-full outline-none placeholder:text-gray-400"
          />
          {query && (
            <button onClick={() => setQuery('')} className="text-gray-400 hover:text-gray-600">
              <X size={15} />
            </button>
          )}
        </div>

        <button
          onClick={() => setFiltersOpen(o => !o)}
          className={`flex items-center gap-1.5 px-3 py-2.5 rounded-xl text-sm font-semibold transition-all border ${
            filtersOpen
              ? 'bg-[#005F56] text-white border-[#005F56]'
              : 'text-gray-600 border-gray-200 hover:border-[#005F56] hover:text-[#005F56]'
          }`}
          aria-label="Toggle filters"
        >
          <SlidersHorizontal size={16} />
          <span className="hidden sm:inline">Filters</span>
        </button>

        <button
          onClick={handleSearch}
          className="flex items-center justify-center gap-2 px-5 py-2.5 bg-[#005F56] text-white font-bold rounded-xl hover:bg-[#004840] transition-all flex-shrink-0"
        >
          <Search size={17} />
          <span className="hidden sm:inline">Search</span>
        </button>
      </div>

      {/* Expandable filters */}
      {filtersOpen && (
        <div className="bg-white rounded-2xl mt-2 p-4 shadow-2xl grid grid-cols-1 sm:grid-cols-3 gap-3">
          {/* Location */}
          <div className="flex items-center gap-3 border border-gray-200 rounded-xl px-3 py-2.5 focus-within:border-[#005F56] transition-colors">
            <MapPin size={16} className="text-[#005F56] flex-shrink-0" />
            <div className="flex-1 min-w-0">
              <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-0.5">Location</div>
              <input
                value={location}
                onChange={e => setLocation(e.target.value)}
                className="text-sm font-semibold text-gray-800 bg-transparent w-full outline-none"
                placeholder="Where in Akure?"
              />
            </div>
          </div>

          {/* Category */}
          <div className="flex items-center gap-3 border border-gray-200 rounded-xl px-3 py-2.5 focus-within:border-[#005F56] transition-colors">
            <Search size={16} className="text-[#005F56] flex-shrink-0" />
            <div className="flex-1 min-w-0">
              <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-0.5">Category</div>
              <select
                value={category}
                onChange={e => setCategory(e.target.value)}
                className="text-sm font-semibold text-gray-800 bg-transparent w-full outline-none appearance-none cursor-pointer"
              >
                {CATEGORY_OPTIONS.map(opt => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
            </div>
            <ChevronDown size={14} className="text-gray-400 flex-shrink-0" />
          </div>

          {/* Date */}
          <div className="flex items-center gap-3 border border-gray-200 rounded-xl px-3 py-2.5 focus-within:border-[#005F56] transition-colors">
            <Calendar size={16} className="text-[#005F56] flex-shrink-0" />
            <div className="flex-1 min-w-0">
              <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-0.5">Date</div>
              <input
                type="date"
                value={date}
                onChange={e => setDate(e.target.value)}
                className="text-sm font-semibold text-gray-800 bg-transparent w-full outline-none cursor-pointer"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
