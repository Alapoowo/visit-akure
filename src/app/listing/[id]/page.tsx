import { notFound } from 'next/navigation'
import Link from 'next/link'
import {
  ArrowLeft, Share2, Heart, MessageCircle, MapPin, Star,
  BadgeCheck, ChevronRight, Clock, Users, ShieldCheck,
  Fuel, Settings2, Car, Wifi, Wind, ParkingSquare,
  Dumbbell, Utensils, Zap, CheckCircle2
} from 'lucide-react'
import { getListingById } from '@/data/listings'
import { formatPrice, getWhatsAppLink, timeAgo } from '@/lib/utils'
import WhatsAppButton from '@/components/ui/WhatsAppButton'

// Icon map for amenities
const amenityIcons: Record<string, React.ReactNode> = {
  'Air Conditioning': <Wind size={16} />,
  'WiFi': <Wifi size={16} />,
  'Parking': <ParkingSquare size={16} />,
  'Gym': <Dumbbell size={16} />,
  'Restaurant': <Utensils size={16} />,
  'GPS Navigation': <MapPin size={16} />,
  'Bluetooth Audio': <Zap size={16} />,
  'Swimming Pool': <Zap size={16} />,
  'Generator': <Zap size={16} />,
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

  const vendor = listing.vendor!
  const reviews = listing.reviews ?? []
  const categoryLabel = listing.category.charAt(0).toUpperCase() + listing.category.slice(1)

  return (
    <div className="max-w-[1280px] mx-auto px-6 py-6">
      {/* Back + actions row */}
      <div className="flex items-center justify-between mb-6">
        <Link
          href={`/${listing.category}`}
          className="flex items-center gap-2 text-[#005F56] font-semibold text-sm hover:underline"
        >
          <ArrowLeft size={16} />
          Back to {categoryLabel}
        </Link>
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-1.5 px-4 py-2 border border-gray-200 rounded-xl text-sm font-semibold text-gray-600 hover:border-gray-300 transition-all">
            <Share2 size={15} /> Share
          </button>
          <button className="flex items-center gap-1.5 px-4 py-2 border border-gray-200 rounded-xl text-sm font-semibold text-gray-600 hover:border-gray-300 transition-all">
            <Heart size={15} /> Save
          </button>
          <button className="flex items-center gap-1.5 px-4 py-2 border border-gray-200 rounded-xl text-sm font-semibold text-gray-600 hover:border-gray-300 transition-all">
            <MessageCircle size={15} /> Message
          </button>
        </div>
      </div>

      {/* Gallery */}
      <div className="grid grid-cols-2 gap-2 rounded-2xl overflow-hidden h-[460px] mb-8">
        {/* Main image */}
        <div className="relative bg-gradient-to-br from-gray-700 to-gray-900 flex items-center justify-center text-[120px] row-span-2">
          <span className="select-none opacity-60">
            {listing.category === 'cars' ? '🚗' : listing.category === 'stays' ? '🏨' : '🎭'}
          </span>
          {listing.isFeatured && (
            <div className="absolute top-4 left-4 flex items-center gap-1.5 bg-[#005F56] text-white text-xs font-bold px-3 py-1.5 rounded-lg">
              <BadgeCheck size={13} /> Featured
            </div>
          )}
        </div>
        {/* Thumbnails */}
        <div className="bg-gradient-to-br from-gray-600 to-gray-800 flex items-center justify-center text-6xl opacity-70">
          {listing.category === 'cars' ? '🪑' : listing.category === 'stays' ? '🛋️' : '🏞️'}
        </div>
        <div className="relative bg-gradient-to-br from-gray-500 to-gray-700 flex items-center justify-center text-6xl opacity-60">
          {listing.category === 'cars' ? '🎛️' : listing.category === 'stays' ? '🚿' : '🌄'}
          <button className="absolute bottom-3 right-3 flex items-center gap-1.5 bg-black/60 text-white border border-white/40 rounded-lg px-3 py-1.5 text-xs font-semibold hover:bg-black/80 transition-all">
            📷 +15 more photos
          </button>
        </div>
      </div>

      {/* Two-column layout */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-12">
        {/* Left — Details */}
        <div>
          {/* Title + price */}
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-5">
            <div>
              <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight mb-2">{listing.title}</h1>
              <div className="flex flex-wrap items-center gap-3 text-sm text-gray-500">
                <span className="flex items-center gap-1">
                  <Star size={14} className="text-[#F4C300] fill-[#F4C300]" />
                  <strong className="text-gray-800">{listing.rating}</strong>
                  ({listing.reviewCount} reviews)
                </span>
                <span className="flex items-center gap-1">
                  <MapPin size={13} /> {listing.location}
                </span>
                {listing.specs && Object.values(listing.specs).slice(0, 2).map((v, i) => (
                  <span key={i} className="text-gray-400">• {v}</span>
                ))}
              </div>
            </div>
            <div className="text-right flex-shrink-0">
              <div className="text-3xl font-extrabold text-[#005F56]">{formatPrice(listing.price)}</div>
              <div className="text-sm text-gray-400">{listing.priceUnit}</div>
            </div>
          </div>

          {/* Specs grid */}
          {listing.specs && (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
              {Object.entries(listing.specs).map(([key, val]) => (
                <div key={key} className="bg-gray-50 border border-gray-100 rounded-xl p-3 flex items-center gap-2.5">
                  {key.includes('Seat') ? <Users size={18} className="text-[#005F56]" /> :
                   key.includes('Fuel') ? <Fuel size={18} className="text-[#005F56]" /> :
                   key.includes('Trans') ? <Settings2 size={18} className="text-[#005F56]" /> :
                   <Car size={18} className="text-[#005F56]" />}
                  <div>
                    <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">{key}</div>
                    <div className="text-sm font-bold text-gray-800">{val}</div>
                  </div>
                </div>
              ))}
            </div>
          )}

          <hr className="border-gray-100 mb-7" />

          {/* Amenities */}
          <h2 className="text-lg font-extrabold text-gray-900 mb-4">
            {listing.category === 'cars' ? 'What this car offers' : 'Amenities & Features'}
          </h2>
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
            <div className="flex items-center gap-4 mb-5">
              <h2 className="text-lg font-extrabold text-gray-900">
                Reviews ({listing.reviewCount})
              </h2>
            </div>
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
              <div className="text-sm text-gray-400 py-4">No reviews yet. Be the first to leave a review!</div>
            )}
          </div>

          <hr className="border-gray-100 mb-7" />

          {/* Things to know */}
          <h2 className="text-lg font-extrabold text-gray-900 mb-4">Things to know</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {[
              { icon: ShieldCheck, title: 'Cancellation fee', text: 'A cancellation fee of ₦50,000 applies. Free cancellation up to 24 hours before pickup.' },
              { icon: Fuel, title: 'Fuel policy', text: 'Full-to-full. Return the vehicle with the same fuel level as pickup.' },
              { icon: BadgeCheck, title: 'Security deposit', text: 'A refundable deposit of ₦70,000 may be required at time of pickup.' },
            ].map(({ icon: Icon, title, text }) => (
              <div key={title}>
                <div className="flex items-center gap-2 font-bold text-sm text-gray-800 mb-1.5">
                  <Icon size={15} className="text-[#005F56]" /> {title}
                </div>
                <p className="text-xs text-gray-500 leading-relaxed">{text}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Right — Booking card */}
        <div>
          <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-md sticky top-20">
            <div className="text-2xl font-extrabold text-gray-900 mb-1">
              {formatPrice(listing.price)}
              <span className="text-sm font-normal text-gray-400 ml-1">{listing.priceUnit}</span>
            </div>
            <div className="flex items-center gap-1 text-sm text-gray-500 mb-5">
              <Star size={13} className="text-[#F4C300] fill-[#F4C300]" />
              <strong className="text-gray-800">{listing.rating}</strong> · {listing.reviewCount} reviews
            </div>

            {/* Date pickers */}
            <div className="grid grid-cols-2 gap-2 bg-gray-50 rounded-xl p-3 mb-4 border border-gray-200">
              <div className="bg-white border-2 border-[#005F56] rounded-lg p-2.5 text-center">
                <div className="text-[10px] font-bold text-gray-400 uppercase">Check-in</div>
                <div className="text-sm font-bold text-gray-800">May 20</div>
              </div>
              <div className="bg-white border-2 border-[#D62839] rounded-lg p-2.5 text-center">
                <div className="text-[10px] font-bold text-gray-400 uppercase">Check-out</div>
                <div className="text-sm font-bold text-gray-800">May 23</div>
              </div>
            </div>

            {/* Price breakdown */}
            <div className="bg-gray-50 rounded-xl p-4 mb-5 space-y-2">
              <div className="flex justify-between text-sm text-gray-600">
                <span>{formatPrice(listing.price)} × 3 days</span>
                <span>{formatPrice(listing.price * 3)}</span>
              </div>
              <div className="flex justify-between text-sm text-gray-600">
                <span>Service fee</span>
                <span>{formatPrice(15000)}</span>
              </div>
              <div className="flex justify-between font-extrabold text-gray-900 text-base pt-3 border-t border-gray-200">
                <span>Total</span>
                <span>{formatPrice(listing.price * 3 + 15000)}</span>
              </div>
            </div>

            <WhatsAppButton phone={listing.whatsappNumber} title={listing.title} />

            <button className="w-full mt-2.5 py-3.5 bg-[#005F56] text-white font-bold rounded-xl hover:bg-[#004840] transition-all">
              Continue to Book
            </button>

            <div className="flex items-center justify-center gap-1.5 text-xs text-gray-400 mt-3">
              <ShieldCheck size={12} /> Secure booking · No hidden fees
            </div>

            <hr className="border-gray-100 my-5" />

            {/* Vendor */}
            <div className="text-sm font-bold text-gray-700 mb-3">Meet your partner</div>
            <div className="flex items-center gap-3 bg-gray-50 rounded-xl p-3">
              <div className="w-11 h-11 rounded-full bg-[#e6f2f1] flex items-center justify-center text-[#005F56] font-bold text-sm flex-shrink-0">
                {vendor.businessName.split(' ').map(n => n[0]).join('').slice(0,2)}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-0.5">
                  <span className="font-bold text-sm text-gray-800 truncate">{vendor.businessName}</span>
                  {vendor.isVerified && (
                    <span className="flex-shrink-0 flex items-center gap-1 bg-[#e6f2f1] text-[#005F56] text-[10px] font-bold px-2 py-0.5 rounded-full">
                      <BadgeCheck size={10} /> Trusted
                    </span>
                  )}
                </div>
                <div className="text-xs text-gray-500 flex items-center gap-1">
                  <Clock size={11} /> Responds within {vendor.responseTime}
                </div>
                <div className="text-xs text-gray-500 flex items-center gap-1 mt-0.5">
                  <CheckCircle2 size={11} /> {vendor.responseRate}% response rate
                </div>
              </div>
              <ChevronRight size={16} className="text-gray-300 flex-shrink-0" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
