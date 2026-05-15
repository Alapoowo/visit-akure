'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Search, X } from 'lucide-react'

export default function SearchBar() {
  const router = useRouter()
  const [query, setQuery] = useState('')

  const handleSearch = () => {
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query.trim())}`)
    } else {
      router.push('/categories')
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleSearch()
  }

  return (
    <div className="w-full max-w-2xl mx-auto">
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
          onClick={handleSearch}
          className="flex items-center justify-center gap-2 px-5 py-2.5 bg-[#005F56] text-white font-bold rounded-xl hover:bg-[#004840] transition-all flex-shrink-0"
        >
          <Search size={17} />
          <span className="hidden sm:inline">Search</span>
        </button>
      </div>
    </div>
  )
}
