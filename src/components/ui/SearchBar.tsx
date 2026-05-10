'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { MapPin, Calendar, Users, Search, ChevronDown } from 'lucide-react'

export default function SearchBar() {
  const router = useRouter()
  const [location, setLocation] = useState('Akure, Ondo State')
  const [category, setCategory] = useState('All categories')

  const handleSearch = () => {
    const cat = category === 'All categories' ? 'stays' : category.toLowerCase()
    router.push(`/${cat}`)
  }

  return (
    <div className="bg-white rounded-2xl p-2 flex flex-col md:flex-row gap-1 shadow-2xl max-w-3xl">
      {/* Location */}
      <div className="flex-1 flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-gray-50 cursor-pointer transition-all">
        <MapPin size={18} className="text-[#005F56] flex-shrink-0" />
        <div className="min-w-0">
          <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Location</div>
          <input
            value={location}
            onChange={e => setLocation(e.target.value)}
            className="text-sm font-semibold text-gray-800 bg-transparent w-full outline-none truncate"
            placeholder="Where are you going?"
          />
        </div>
      </div>

      <div className="hidden md:block w-px bg-gray-200 my-2" />

      {/* Category */}
      <div className="flex-1 flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-gray-50 cursor-pointer transition-all">
        <Search size={18} className="text-[#005F56] flex-shrink-0" />
        <div className="min-w-0 flex-1">
          <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Category</div>
          <select
            value={category}
            onChange={e => setCategory(e.target.value)}
            className="text-sm font-semibold text-gray-800 bg-transparent w-full outline-none appearance-none cursor-pointer"
          >
            <option>All categories</option>
            <option>Stays</option>
            <option>Cars</option>
            <option>Activities</option>
            <option>Events</option>
            <option>Services</option>
            <option>Products</option>
          </select>
        </div>
        <ChevronDown size={14} className="text-gray-400 flex-shrink-0" />
      </div>

      <div className="hidden md:block w-px bg-gray-200 my-2" />

      {/* Date */}
      <div className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-gray-50 cursor-pointer transition-all">
        <Calendar size={18} className="text-[#005F56] flex-shrink-0" />
        <div>
          <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Date</div>
          <div className="text-sm font-semibold text-gray-500">Add dates</div>
        </div>
      </div>

      <div className="hidden md:block w-px bg-gray-200 my-2" />

      {/* Guests */}
      <div className="hidden lg:flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-gray-50 cursor-pointer transition-all">
        <Users size={18} className="text-[#005F56] flex-shrink-0" />
        <div>
          <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Guests</div>
          <div className="text-sm font-semibold text-gray-500">Add guests</div>
        </div>
      </div>

      {/* Search button */}
      <button
        onClick={handleSearch}
        className="flex items-center justify-center gap-2 px-6 py-3.5 bg-[#005F56] text-white font-bold rounded-xl hover:bg-[#004840] transition-all flex-shrink-0"
      >
        <Search size={18} />
        <span>Search</span>
      </button>
    </div>
  )
}
