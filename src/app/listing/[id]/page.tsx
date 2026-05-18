import { notFound } from 'next/navigation'
import Link from 'next/link'
import {
  ArrowLeft, MapPin, Star, BadgeCheck,
  Wifi, Wind, ParkingSquare, Dumbbell, Utensils, CheckCircle2,
} from 'lucide-react'
import { getListingById } from '@/data/listings'
import { getCategoryConfig, hasPricing } from '@/config/categories'
import { formatPrice, timeAgo } from '@/lib/utils'
import ListingActions from '@/components/listing/ListingActions'
import WhatsAppCTA from '@/components/listing/WhatsAppCTA'
import WhatsAppInlineButton from '@/components/listing/WhatsAppInlineButton'

const amenityIcons: Record<string, React.ReactNode> = {
  'Air Conditioning': <Wind size={16} />,
  'WiFi': <Wifi size={16} />,
  'Parking': <ParkingSquare size={16} />,
  'Gym': <Dumbbell size={16} />,
  'Restaurant': <Utensils size={16} />,
}

function AmenityIcon({ name }: { name: string }) {
  return amenityIcons[name] ?? <CheckCircle2 size={16} />
}

interface Props {
  params: Promise<{ id: string }>
}

export default async function ListingDetailPage({ params }: Props) {
  const { id } = await params
  const listing = getListingById(id)
  if (!listing) notFound()

  const catConfig = getCategoryConfig(listing.category)
  const showPrice = hasPricing(listing.category)
  const reviews = listing.reviews ?? []
  const categoryLabel = catConfig?.label ?? listing.category.charAt(0).toUpperCase() + listing.category.slice(1)
  const catEmoji = { hotels: '🏨', foods: '🍽️', shortlets: '🏠', services: '🛠️', health: '⚕️', shops: '🛍️', 'local-market': '🧺', events: '🎉' }

  return (
    <div className="max-w-[1280px] mx-auto px-4 sm:px-6 py-6">
      {/* Back + actions row */}
      <div className="flex items-center justify-between mb-6 gap-3">
        <Link
          href={`/${listing.category}`}
          className="flex items-center gap-1.5 text-[#005F56] font-semibold text-sm hover:underline flex-shrink-0"
        >
          <ArrowLeft size={16} />
          <span className="hidden xs:inline">Back to </span>{categoryLabel}
        </Link>
        <ListingActions
          listingId={listing.id}
          title={listing.title}
          whatsappNumber={listing.whatsappNumber}
        />
      </div>

      {/* Gallery */}
      <div className="grid grid-cols-2 gap-2 rounded-2xl overflow-hidden h-[300px] sm:h-[420px] mb-8">
        <div className="relative bg-gradient-to-br from-gray-700 to-gray-900 flex items-center justify-center text-[100px] row-span-2">
          <span className="select-none opacity-60">{catEmoji[listing.category] ?? '📦'}</span>
          {listing.isFeatured && (
            <div className="absolute top-4 left-4 flex items-center gap-1.5 bg-[#005F56] text-white text-xs font-bold px-3 py-1.5 rounded-lg">
              <BadgeCheck size={13} /> Featured
            </div>
          )}
        </div>
        <div className="bg-gradient-to-br from-gray-600 to-gray-800 flex items-center justify-center text-5xl opacity-70">
          {catEmoji[listing.category] ?? '📦'}
        </div>
        <div className="relative bg-gradient-to-br from-gray-500 to-gray-700 flex items-center justify-center text-5xl opacity-60">
          {catEmoji[listing.category] ?? '📦'}
          <button className="absolute bottom-3 right-3 flex items-center gap-1.5 bg-black/60 text-white border border-white/40 rounded-lg px-3 py-1.5 text-xs font-semibold hover:bg-black/80 transition-all">
            📷 View photos
          </button>
        </div>
      </div>

      {/* Two-column layout */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-10">
        {/* Left — Details */}
        <div>
          {/* Title + rating */}
          <div className="mb-5">
            <h1 className="text-xl sm:text-3xl font-extrabold text-gray-900 tracking-tight mb-2">{listing.title}</h1>
            <div className="flex flex-wrap items-center gap-3 text-sm text-gray-500">
              <span className="flex items-center gap-1">
                <Star size={14} className="text-[#F4C300] fill-[#F4C300]" />
                <strong className="text-gray-800">{listing.rating}</strong>
                ({listing.reviewCount} reviews)
              </span>
              <span className="flex items-center gap-1">
                <MapPin size={13} /> {listing.location}
              </span>
            </div>
            {showPrice && (
              <div className="mt-3">
                <div className="flex flex-wrap items-baseline gap-2 mb-3">
                  <span className="text-xl sm:text-3xl font-extrabold text-[#D62839]">
                    {listing.priceMax
                      ? `${formatPrice(listing.price)} – ${formatPrice(listing.priceMax)}`
                      : formatPrice(listing.price)}
                  </span>
                  <span className="text-sm text-gray-400">{listing.priceUnit}</span>
                </div>
                <WhatsAppInlineButton listing={listing} />
              </div>
            )}
          </div>

          {/* Specs grid */}
          {listing.specs && Object.keys(listing.specs).length > 0 && (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
              {Object.entries(listing.specs).map(([key, val]) => (
                <div key={key} className="bg-gray-50 border border-gray-100 rounded-xl p-3">
                  <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-0.5">{key}</div>
                  <div className="text-sm font-bold text-gray-800">{val}</div>
                </div>
              ))}
            </div>
          )}

          <hr className="border-gray-100 mb-7" />

          {/* Amenities */}
          <h2 className="text-lg font-extrabold text-gray-900 mb-4">Amenities & Features</h2>
          <div className="flex flex-wrap gap-2.5 mb-8">
            {listing.amenities.map(a => (
              <span key={a} className="flex items-center gap-2 px-3 py-2 bg-gray-50 border border-gray-100 rounded-xl text-sm font-medium text-gray-700">
                <span className="text-[#005F56]"><AmenityIcon name={a} /></span>
                {a}
              </span>
            ))}
          </div>

          <hr className="border-gray-100 mb-7" />

          {/* Description */}
          <h2 className="text-lg font-extrabold text-gray-900 mb-3">About this listing</h2>
          <p className="text-gray-600 leading-relaxed mb-8">{listing.description}</p>

          <hr className="border-gray-100 mb-7" />

          {/* Reviews */}
          <div className="mb-8">
            <h2 className="text-lg font-extrabold text-gray-900 mb-5">Reviews ({listing.reviewCount})</h2>
            <div className="flex items-center gap-5 mb-6">
              <div className="text-5xl font-extrabold text-gray-900">{listing.rating}</div>
              <div>
                <div className="flex gap-0.5 mb-1">
                  {[1,2,3,4,5].map(s => (
                    <Star key={s} size={18} className={s <= Math.round(listing.rating) ? 'text-[#F4C300] fill-[#F4C300]' : 'text-gray-200 fill-gray-200'} />
                  ))}
                </div>
                <div className="text-sm text-gray-500">Based on {listing.reviewCount} reviews</div>
              </div>
            </div>
            {reviews.length > 0 ? (
              <div className="space-y-5">
                {reviews.map(review => (
                  <div key={review.id} className="border-b border-gray-50 pb-5">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-10 h-10 rounded-full bg-[#e6f2f1] flex items-center justify-center text-[#005F56] font-bold text-sm">
                        {review.userName.split(' ').map(n => n[0]).join('').slice(0,2)}
                      </div>
                      <div>
                        <div className="font-semibold text-sm text-gray-800">{review.userName}</div>
                        <div className="text-xs text-gray-400">{timeAgo(review.createdAt)}</div>
                      </div>
                      <div className="ml-auto flex gap-0.5">
                        {[1,2,3,4,5].map(s => (
                          <Star key={s} size={13} className={s <= review.rating ? 'text-[#F4C300] fill-[#F4C300]' : 'text-gray-200 fill-gray-200'} />
                        ))}
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 leading-relaxed">{review.comment}</p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-sm text-gray-400 py-4">No reviews yet. Be the first to connect!</div>
            )}
          </div>
        </div>

        {/* Right — WhatsApp CTA */}
        <div>
          <WhatsAppCTA listing={listing} showPrice={showPrice} />
        </div>
      </div>
    </div>
  )
}
