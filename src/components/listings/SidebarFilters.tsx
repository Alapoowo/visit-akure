'use client'

import { useState } from 'react'
import { SlidersHorizontal, X } from 'lucide-react'
import { formatPrice } from '@/lib/utils'

interface SidebarFiltersProps {
  category: string
  onFiltersChange?: (filters: Record<string, unknown>) => void
}

const carTypes = ['All Types', 'Sedan', 'SUV', 'Hatchback', 'Luxury', 'Van']
const propertyTypes = ['All Types', 'Hotel', 'Apartment', 'Guesthouse', 'Villa', 'Lodge']
const amenitiesOptions = {
  cars: ['Air Conditioning', 'GPS Navigation', 'Bluetooth', 'USB Charging', 'Backup Camera'],
  stays: ['WiFi', 'Swimming Pool', 'Generator', 'Parking', 'Gym', 'Restaurant'],
  activities: ['Guide Included', 'Equipment Provided', 'Group Friendly', 'Family Friendly'],
}

export default function SidebarFilters({ category }: SidebarFiltersProps) {
  const [maxPrice, setMaxPrice] = useState(300000)
  const [selectedTypes, setSelectedTypes] = useState<string[]>(['All Types'])
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([])
  const [sortBy, setSortBy] = useState('Most Popular')

  const toggleType = (type: string) => {
    if (type === 'All Types') {
      setSelectedTypes(['All Types'])
    } else {
      const next = selectedTypes.filter(t => t !== 'All Types')
      setSelectedTypes(next.includes(type) ? next.filter(t => t !== type) : [...next, type])
    }
  }

  const toggleAmenity = (amenity: string) => {
    setSelectedAmenities(prev =>
      prev.includes(amenity) ? prev.filter(a => a !== amenity) : [...prev, amenity]
    )
  }

  const types = category === 'cars' ? carTypes : propertyTypes
  const amenities = amenitiesOptions[category as keyof typeof amenitiesOptions] ?? amenitiesOptions.stays

  const maxPriceLabel = category === 'cars' ? 300000 : 200000
  const priceUnit = category === 'cars' ? '/day' : '/night'

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 sticky top-20">
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2 font-bold text-gray-800">
          <SlidersHorizontal size={16} className="text-[#005F56]" />
          Filters
        </div>
        <button
          onClick={() => {
            setMaxPrice(maxPriceLabel)
            setSelectedTypes(['All Types'])
            setSelectedAmenities([])
          }}
          className="text-xs font-semibold text-[#D62839] hover:underline flex items-center gap-1"
        >
          <X size={12} /> Clear all
        </button>
      </div>

      {/* Price Range */}
      <div className="mb-6">
        <div className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">
          Price Range <span className="normal-case font-normal text-gray-400">({priceUnit})</span>
        </div>
        <input
          type="range"
          min={5000}
          max={maxPriceLabel}
          step={5000}
          value={maxPrice}
          onChange={e => setMaxPrice(Number(e.target.value))}
          className="w-full mb-2"
        />
        <div className="flex justify-between text-xs text-gray-500">
          <span>₦5,000</span>
          <span className="font-semibold text-[#005F56]">
            {maxPrice >= maxPriceLabel ? `${formatPrice(maxPriceLabel)}+` : formatPrice(maxPrice)}
          </span>
        </div>
      </div>

      {/* Type */}
      <div className="mb-6">
        <div className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">
          {category === 'cars' ? 'Car Type' : 'Property Type'}
        </div>
        <div className="space-y-2">
          {types.map(type => (
            <label key={type} className="flex items-center gap-2.5 cursor-pointer group">
              <input
                type="checkbox"
                checked={selectedTypes.includes(type)}
                onChange={() => toggleType(type)}
                className="rounded"
              />
              <span className="text-sm text-gray-700 group-hover:text-[#005F56] transition-colors">{type}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Amenities */}
      <div className="mb-6">
        <div className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">Amenities</div>
        <div className="space-y-2">
          {amenities.map(amenity => (
            <label key={amenity} className="flex items-center gap-2.5 cursor-pointer group">
              <input
                type="checkbox"
                checked={selectedAmenities.includes(amenity)}
                onChange={() => toggleAmenity(amenity)}
                className="rounded"
              />
              <span className="text-sm text-gray-700 group-hover:text-[#005F56] transition-colors">{amenity}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Sort By */}
      <div>
        <div className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">Sort By</div>
        <select
          value={sortBy}
          onChange={e => setSortBy(e.target.value)}
          className="w-full text-sm border border-gray-200 rounded-xl px-3 py-2.5 text-gray-700 bg-white outline-none focus:border-[#005F56] transition-colors"
        >
          <option>Most Popular</option>
          <option>Price: Low to High</option>
          <option>Price: High to Low</option>
          <option>Top Rated</option>
          <option>Newest First</option>
        </select>
      </div>
    </div>
  )
}
