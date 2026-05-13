'use client'

import { useState } from 'react'
import {
  Star, ShieldCheck, Clock, CheckCircle2, BadgeCheck, ChevronRight,
  X, AlertCircle, PartyPopper, Loader2, User, Phone, Mail, MessageSquare,
} from 'lucide-react'
import WhatsAppButton from '@/components/ui/WhatsAppButton'
import { formatPrice } from '@/lib/utils'
import { Listing, Booking } from '@/types'

type Flow = 'dates' | 'checking' | 'available' | 'unavailable' | 'form' | 'confirmed'

function todayStr() { return new Date().toISOString().slice(0, 10) }
function addDays(s: string, n: number) { const d = new Date(s); d.setDate(d.getDate() + n); return d.toISOString().slice(0, 10) }
function diffDays(from: string, to: string) { return Math.max(1, Math.round((new Date(to).getTime() - new Date(from).getTime()) / 86400000)) }

interface Form { name: string; phone: string; email: string; message: string }

export default function BookingCard({ listing }: { listing: Listing }) {
  const today = todayStr()
  const [checkIn, setCheckIn] = useState(today)
  const [checkOut, setCheckOut] = useState(addDays(today, 3))
  const [flow, setFlow] = useState<Flow>('dates')
  const [form, setForm] = useState<Form>({ name: '', phone: '', email: '', message: '' })
  const [submitting, setSubmitting] = useState(false)

  const days = diffDays(checkIn, checkOut)
  const serviceFee = 15000
  const subtotal = listing.price * days
  const total = subtotal + serviceFee
  const unitWord = listing.priceUnit.replace('/', '').trim()
  const vendor = listing.vendor!

  const handleCheckInChange = (val: string) => {
    setCheckIn(val)
    if (val >= checkOut) setCheckOut(addDays(val, 1))
  }

  const handleCheckAvailability = () => {
    setFlow('checking')
    setTimeout(() => {
      setFlow(listing.isAvailable !== false ? 'available' : 'unavailable')
    }, 1500)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    const booking: Booking = {
      id: Date.now().toString(),
      listingId: listing.id,
      listingTitle: listing.title,
      listingCategory: listing.category,
      vendorWhatsapp: listing.whatsappNumber,
      customerName: form.name,
      customerPhone: form.phone,
      customerEmail: form.email,
      checkIn,
      checkOut,
      days,
      pricePerUnit: listing.price,
      serviceFee,
      total,
      message: form.message,
      createdAt: new Date().toISOString(),
    }
    // Save to API
    try {
      await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(booking),
      })
    } catch {}
    // Save locally as backup
    try {
      const prev = JSON.parse(localStorage.getItem('va_bookings') || '[]')
      localStorage.setItem('va_bookings', JSON.stringify([...prev, booking]))
    } catch {}

    setSubmitting(false)
    setFlow('confirmed')

    // Auto-open WhatsApp after short delay
    setTimeout(() => {
      const msg = encodeURIComponent(
        `📋 *Booking Request — ${listing.title}*\n\n` +
        `👤 Name: ${form.name}\n` +
        `📱 Phone: ${form.phone}\n` +
        `📧 Email: ${form.email}\n` +
        `📅 Check-in: ${checkIn}\n` +
        `📅 Check-out: ${checkOut}\n` +
        `🗓️ Duration: ${days} ${days === 1 ? unitWord : unitWord + 's'}\n` +
        `💰 Total: ${formatPrice(total)}\n` +
        (form.message ? `💬 Message: ${form.message}` : '')
      )
      window.open(`https://wa.me/${listing.whatsappNumber}?text=${msg}`, '_blank', 'noopener,noreferrer')
    }, 800)
  }

  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-md sticky top-20">
      {/* Price header */}
      <div className="text-2xl font-extrabold text-gray-900 mb-1">
        {formatPrice(listing.price)}
        <span className="text-sm font-normal text-gray-400 ml-1">{listing.priceUnit}</span>
      </div>
      <div className="flex items-center gap-1 text-sm text-gray-500 mb-5">
        <Star size={13} className="text-[#F4C300] fill-[#F4C300]" />
        <strong className="text-gray-800">{listing.rating}</strong> · {listing.reviewCount} reviews
      </div>

      {/* CONFIRMED STATE */}
      {flow === 'confirmed' ? (
        <div className="text-center py-6">
          <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle2 size={32} className="text-green-500" />
          </div>
          <h3 className="text-lg font-extrabold text-gray-900 mb-2">Booking Submitted!</h3>
          <p className="text-sm text-gray-500 mb-5">
            Your details have been saved and we&apos;re opening WhatsApp to connect you with <strong>{vendor.businessName}</strong>.
          </p>
          <button
            onClick={() => setFlow('dates')}
            className="text-sm font-bold text-[#005F56] underline"
          >
            Make another booking
          </button>
        </div>
      ) : flow === 'form' ? (
        /* BOOKING FORM */
        <form onSubmit={handleSubmit} className="space-y-3">
          <div className="bg-gray-50 rounded-xl p-3 mb-4 text-sm border border-gray-100">
            <div className="flex justify-between text-gray-600 mb-1">
              <span>{checkIn} → {checkOut}</span>
              <span className="font-semibold">{days} {days === 1 ? unitWord : unitWord + 's'}</span>
            </div>
            <div className="flex justify-between font-extrabold text-gray-900">
              <span>Total</span>
              <span className="text-[#005F56]">{formatPrice(total)}</span>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-600 mb-1">Full Name *</label>
            <div className="flex items-center gap-2 border border-gray-200 rounded-xl px-3 py-2.5 focus-within:border-[#005F56] transition-colors">
              <User size={15} className="text-gray-400 flex-shrink-0" />
              <input required value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                placeholder="Your full name" className="text-sm flex-1 outline-none bg-transparent" />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-600 mb-1">Phone Number *</label>
            <div className="flex items-center gap-2 border border-gray-200 rounded-xl px-3 py-2.5 focus-within:border-[#005F56] transition-colors">
              <Phone size={15} className="text-gray-400 flex-shrink-0" />
              <input required type="tel" value={form.phone} onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
                placeholder="+234 800 000 0000" className="text-sm flex-1 outline-none bg-transparent" />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-600 mb-1">Email Address</label>
            <div className="flex items-center gap-2 border border-gray-200 rounded-xl px-3 py-2.5 focus-within:border-[#005F56] transition-colors">
              <Mail size={15} className="text-gray-400 flex-shrink-0" />
              <input type="email" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                placeholder="you@example.com" className="text-sm flex-1 outline-none bg-transparent" />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-600 mb-1">Special Requests</label>
            <div className="flex gap-2 border border-gray-200 rounded-xl px-3 py-2.5 focus-within:border-[#005F56] transition-colors">
              <MessageSquare size={15} className="text-gray-400 flex-shrink-0 mt-0.5" />
              <textarea rows={2} value={form.message} onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                placeholder="Any special requests..." className="text-sm flex-1 outline-none bg-transparent resize-none" />
            </div>
          </div>

          <button type="submit" disabled={submitting}
            className="w-full py-3.5 bg-[#005F56] text-white font-bold rounded-xl hover:bg-[#004840] transition-all flex items-center justify-center gap-2 disabled:opacity-70">
            {submitting ? <><Loader2 size={16} className="animate-spin" /> Submitting...</> : 'Submit & Go to WhatsApp'}
          </button>
          <button type="button" onClick={() => setFlow('available')}
            className="w-full py-2 text-sm text-gray-400 hover:text-gray-600 transition-colors">
            ← Back
          </button>
        </form>
      ) : (
        /* DATES + PRICE BREAKDOWN */
        <>
          <div className="grid grid-cols-2 gap-2 mb-4">
            <div className="border-2 border-[#005F56] rounded-xl p-2.5">
              <div className="text-[10px] font-bold text-gray-400 uppercase mb-1">Check-in</div>
              <input type="date" value={checkIn} min={today}
                onChange={e => handleCheckInChange(e.target.value)}
                className="text-xs font-bold text-gray-800 bg-transparent outline-none w-full cursor-pointer" />
            </div>
            <div className="border-2 border-[#D62839] rounded-xl p-2.5">
              <div className="text-[10px] font-bold text-gray-400 uppercase mb-1">Check-out</div>
              <input type="date" value={checkOut} min={addDays(checkIn, 1)}
                onChange={e => setCheckOut(e.target.value)}
                className="text-xs font-bold text-gray-800 bg-transparent outline-none w-full cursor-pointer" />
            </div>
          </div>

          <div className="bg-gray-50 rounded-xl p-4 mb-5 space-y-2 border border-gray-100">
            <div className="flex justify-between text-sm text-gray-600">
              <span>{formatPrice(listing.price)} × {days} {days === 1 ? unitWord : unitWord + 's'}</span>
              <span className="font-semibold text-gray-800">{formatPrice(subtotal)}</span>
            </div>
            <div className="flex justify-between text-sm text-gray-600">
              <span>Service fee</span>
              <span className="font-semibold text-gray-800">{formatPrice(serviceFee)}</span>
            </div>
            <div className="flex justify-between font-extrabold text-gray-900 text-base pt-3 border-t border-gray-200">
              <span>Total</span>
              <span className="text-[#005F56]">{formatPrice(total)}</span>
            </div>
          </div>

          {/* Check Availability button */}
          <button
            onClick={handleCheckAvailability}
            disabled={flow === 'checking'}
            className="w-full mb-3 py-3.5 border-2 border-[#005F56] text-[#005F56] font-bold rounded-xl hover:bg-[#005F56] hover:text-white transition-all flex items-center justify-center gap-2 disabled:opacity-70"
          >
            {flow === 'checking' ? (
              <><Loader2 size={16} className="animate-spin" /> Checking availability…</>
            ) : 'Check Availability'}
          </button>

          <WhatsAppButton phone={listing.whatsappNumber} title={listing.title} />
        </>
      )}

      {/* Vendor info — always visible except in form/confirmed */}
      {(flow === 'dates' || flow === 'checking') && (
        <>
          <div className="flex items-center justify-center gap-1.5 text-xs text-gray-400 mt-3 mb-5">
            <ShieldCheck size={12} /> Secure booking · No hidden fees
          </div>
          <hr className="border-gray-100 mb-5" />
          <div className="text-sm font-bold text-gray-700 mb-3">Meet your partner</div>
          <div className="flex items-center gap-3 bg-gray-50 rounded-xl p-3">
            <div className="w-11 h-11 rounded-full bg-[#e6f2f1] flex items-center justify-center text-[#005F56] font-bold text-sm flex-shrink-0">
              {vendor.businessName.split(' ').map(n => n[0]).join('').slice(0, 2)}
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
        </>
      )}

      {/* Availability Modal */}
      {(flow === 'available' || flow === 'unavailable') && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm p-6 relative animate-in fade-in slide-in-from-bottom-4 duration-200">
            <button onClick={() => setFlow('dates')}
              className="absolute top-4 right-4 p-1 rounded-full hover:bg-gray-100 transition-colors">
              <X size={18} className="text-gray-400" />
            </button>

            {flow === 'available' ? (
              <>
                <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-4">
                  <PartyPopper size={30} className="text-green-500" />
                </div>
                <h3 className="text-xl font-extrabold text-gray-900 text-center mb-2">
                  Great News! 🎉
                </h3>
                <p className="text-sm text-gray-500 text-center mb-2">
                  <strong className="text-gray-800">{listing.title}</strong> is available for your selected dates.
                </p>
                <div className="bg-gray-50 rounded-xl p-3 text-center text-sm mb-5">
                  <span className="text-gray-500">{checkIn} → {checkOut}</span>
                  <span className="mx-2 text-gray-300">·</span>
                  <span className="font-bold text-[#005F56]">{formatPrice(total)}</span>
                </div>
                <button
                  onClick={() => { setFlow('form') }}
                  className="w-full py-3.5 bg-[#005F56] text-white font-bold rounded-xl hover:bg-[#004840] transition-all mb-3"
                >
                  Continue to Book
                </button>
                <button onClick={() => setFlow('dates')}
                  className="w-full py-2 text-sm text-gray-400 hover:text-gray-600 transition-colors">
                  Change dates
                </button>
              </>
            ) : (
              <>
                <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4">
                  <AlertCircle size={30} className="text-red-400" />
                </div>
                <h3 className="text-xl font-extrabold text-gray-900 text-center mb-2">Not Available</h3>
                <p className="text-sm text-gray-500 text-center mb-5">
                  This listing is not available for your selected dates. Try different dates or contact the vendor directly.
                </p>
                <WhatsAppButton phone={listing.whatsappNumber} title={listing.title} size="md" />
                <button onClick={() => setFlow('dates')}
                  className="w-full mt-3 py-2 text-sm text-gray-400 hover:text-gray-600 transition-colors">
                  Change dates
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
