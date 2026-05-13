'use client'

import { useState } from 'react'
import Link from 'next/link'
import { MapPin, Navigation, ArrowRight } from 'lucide-react'
import ListingCard from '@/components/listings/ListingCard'
import { Listing } from '@/types'

type LocationState = 'idle' | 'loading' | 'granted' | 'denied'

interface NearMeSectionProps {
  listings: Listing[]
}

export default function NearMeSection({ listings }: NearMeSectionProps) {
  const [locationState, setLocationState] = useState<LocationState>('idle')
  const [areaName, setAreaName] = useState<string>('')

  const requestLocation = () => {
    if (!navigator.geolocation) {
      setLocationState('denied')
      return
    }
    setLocationState('loading')
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setAreaName(`${pos.coords.latitude.toFixed(2)}°N, ${pos.coords.longitude.toFixed(2)}°E`)
        setLocationState('granted')
      },
      () => setLocationState('denied'),
      { timeout: 8000 }
    )
  }

  return (
    <section className="max-w-[1280px] mx-auto px-6 py-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-extrabold text-gray-900 flex items-center gap-2">
            <Navigation size={20} className="text-[#005F56]" />
            Near Me
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            {locationState === 'granted'
              ? `Listings near Akure • ${areaName}`
              : 'Enable location to find listings closer to you'}
          </p>
        </div>
        {locationState === 'granted' && (
          <Link href="/categories" className="flex items-center gap-1 text-sm font-bold text-[#D62839] hover:underline">
            See all <ArrowRight size={14} />
          </Link>
        )}
      </div>

      {locationState === 'idle' && (
        <div className="flex flex-col items-center justify-center gap-4 py-14 bg-gray-50 rounded-2xl border border-dashed border-gray-200">
          <div className="w-14 h-14 bg-[#005F56]/10 rounded-full flex items-center justify-center">
            <MapPin size={26} className="text-[#005F56]" />
          </div>
          <div className="text-center">
            <p className="font-bold text-gray-800 mb-1">Find listings near you</p>
            <p className="text-sm text-gray-500 max-w-xs">Share your location to discover hotels, food, services and more closest to where you are.</p>
          </div>
          <button
            onClick={requestLocation}
            className="flex items-center gap-2 bg-[#005F56] text-white font-bold px-6 py-3 rounded-xl hover:bg-[#004a44] transition-colors text-sm"
          >
            <Navigation size={15} />
            Enable Location
          </button>
        </div>
      )}

      {locationState === 'loading' && (
        <div className="flex items-center justify-center gap-3 py-14 text-gray-500">
          <div className="w-5 h-5 border-2 border-[#005F56] border-t-transparent rounded-full animate-spin" />
          Detecting your location…
        </div>
      )}

      {locationState === 'denied' && (
        <div className="flex flex-col items-center gap-3 py-14 bg-gray-50 rounded-2xl border border-dashed border-gray-200 text-center">
          <MapPin size={28} className="text-gray-300" />
          <p className="font-bold text-gray-700">Location access denied</p>
          <p className="text-sm text-gray-400 max-w-xs">Enable location in your browser settings and try again to see listings near you.</p>
          <button
            onClick={requestLocation}
            className="text-sm font-bold text-[#005F56] underline mt-1"
          >
            Try again
          </button>
        </div>
      )}

      {locationState === 'granted' && (
        <div className="flex gap-4 overflow-x-auto pb-3 -mx-6 px-6 scroll-smooth snap-x">
          {listings.map(l => <ListingCard key={l.id} listing={l} className="snap-start flex-shrink-0 w-[260px] sm:w-[280px]" />)}
        </div>
      )}
    </section>
  )
}
