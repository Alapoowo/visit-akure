'use client'

import { useState } from 'react'
import {
  Building2, MapPin, Phone, FileText, Check,
  ArrowRight, ArrowLeft, BadgeCheck, Star, Crown, ChevronRight, Mail, Globe, User, Upload, X,
} from 'lucide-react'
import { cn } from '@/lib/utils'

// ─── Step config ─────────────────────────────────────────────────────────────
const steps = [
  { n: 1, label: 'Business Info' },
  { n: 2, label: 'Features' },
  { n: 3, label: 'Choose Plan' },
  { n: 4, label: 'Review' },
]

// ─── Plans ────────────────────────────────────────────────────────────────────
const plans = [
  {
    id: 'basic', label: 'Basic Listing', icon: BadgeCheck,
    price: 'Free', period: '',
    color: 'border-gray-200',
    desc: 'Create your business profile on Visit Akure with photos, contact details, and search visibility.',
    features: ['Business profile', 'Photos & contact details', 'Search visibility', 'WhatsApp CTA button'],
  },
  {
    id: 'verified', label: 'Verified Listing', icon: Star,
    price: '₦5,000', period: '',
    color: 'border-[#005F56]', popular: true,
    desc: 'Get a verified badge, better visibility, and increased customer trust. Includes everything in Basic Listing.',
    features: ['Everything in Basic', 'Verified badge ✓', 'Better placement', 'Increased customer trust'],
  },
  {
    id: 'featured', label: 'Featured Listing', icon: Crown,
    price: '₦20,000', period: '/per month',
    color: 'border-[#F4C300]',
    desc: 'Boost your business with featured placement, priority visibility, and promotional exposure across Visit Akure. Includes everything in Verified Listing.',
    features: ['Everything in Verified', 'Featured placement', 'Priority visibility', 'Promotional exposure'],
  },
]

// ─── Category amenity checkboxes ─────────────────────────────────────────────
const CATEGORY_AMENITIES: Record<string, string[]> = {
  hotels:        ['WiFi', 'Swimming Pool', 'Gym', 'Restaurant', 'Bar', 'Parking', 'Air Conditioning', 'Room Service', 'Laundry', 'Conference Room', '24/7 Security', 'CCTV', 'Spa'],
  foods:         ['Outdoor Seating', 'WiFi', 'Parking', 'Air Conditioning', 'Bar', 'Private Events', 'Reservations', 'Kids Menu'],
  shortlets:     ['WiFi', 'Generator', 'Water Supply', 'Air Conditioning', 'Fully Equipped Kitchen', 'Parking', 'Security', 'Swimming Pool', 'Gym', 'Laundry', 'CCTV', 'Smart TV', 'Netflix'],
  services:      ['Home Service', 'Walk-in', 'Online Booking', 'Free Consultation', 'Emergency Service', 'Weekend Service', 'Mobile Service', 'Corporate Packages'],
  health:        ['Walk-in', 'Emergency Service', 'Health Insurance Accepted', 'Ambulance Service', 'Lab Tests', 'X-Ray', 'Pharmacy', '24/7 Service', 'Specialist Doctors'],
  shops:         ['Home Delivery', 'In-Store Pickup', 'Online Orders', 'Custom Orders', 'Wholesale', 'Retail', 'Returns Accepted', 'Gift Wrapping'],
  'local-market':['Wholesale', 'Retail', 'Home Delivery', 'Fresh Daily', 'Bulk Orders', 'Seasonal Items', 'Organic Products'],
  events:        ['Catering', 'Decoration', 'MC Services', 'Photography', 'Videography', 'Sound System', 'Lighting', 'Security', 'Outdoor Events'],
}

// ─── Category structured fields config ───────────────────────────────────────
type FieldDef =
  | { kind: 'select'; key: string; label: string; options: string[] }
  | { kind: 'input';  key: string; label: string; placeholder: string }

const CATEGORY_FIELDS: Record<string, FieldDef[]> = {
  hotels: [
    { kind: 'select', key: 'hotelType',  label: 'Property Type',    options: ['Hotel', 'Motel', 'Resort', 'Guesthouse', 'Inn', 'Serviced Apartment'] },
    { kind: 'select', key: 'rooms',      label: 'Number of Rooms',  options: ['1–5 rooms', '6–15 rooms', '16–50 rooms', '51+ rooms'] },
    { kind: 'input',  key: 'capacity',   label: 'Max Guest Capacity', placeholder: 'e.g. 80 guests' },
    { kind: 'select', key: 'minStay',    label: 'Minimum Stay',      options: ['1 Night', '2 Nights', '3 Nights', '1 Week'] },
  ],
  foods: [
    { kind: 'select', key: 'cuisine',    label: 'Cuisine Type',      options: ['Nigerian', 'Continental', 'Chinese', 'Lebanese', 'Fast Food', 'Cafe & Bakery', 'Bar & Lounge', 'Mixed'] },
    { kind: 'select', key: 'service',    label: 'Service Mode',      options: ['Dine-in only', 'Takeout only', 'Dine-in & Takeout', 'Dine-in, Takeout & Delivery'] },
    { kind: 'select', key: 'openDays',   label: 'Open Days',         options: ['Mon – Fri', 'Mon – Sat', 'Daily (Mon – Sun)', 'Weekends Only'] },
    { kind: 'input',  key: 'hours',      label: 'Opening Hours',     placeholder: 'e.g. 8am – 10pm' },
    { kind: 'input',  key: 'seating',    label: 'Seating Capacity',  placeholder: 'e.g. 60 seats' },
  ],
  shortlets: [
    { kind: 'select', key: 'aptType',    label: 'Apartment Type',    options: ['Studio', '1-Bedroom', '2-Bedroom', '3-Bedroom', 'Duplex', 'Villa', 'Penthouse'] },
    { kind: 'select', key: 'bedrooms',   label: 'Bedrooms',          options: ['Studio', '1', '2', '3', '4', '5+'] },
    { kind: 'input',  key: 'maxGuests',  label: 'Max Guests',        placeholder: 'e.g. 4 guests' },
    { kind: 'select', key: 'minStay',    label: 'Minimum Stay',      options: ['1 Night', '2 Nights', '3 Nights', '1 Week', '1 Month'] },
  ],
  services: [
    { kind: 'input',  key: 'serviceType', label: 'Type of Service',  placeholder: 'e.g. Plumbing, Electrical, Generator Repair…' },
    { kind: 'select', key: 'mode',        label: 'Service Mode',     options: ['Walk-in', 'Home Service', 'Walk-in & Home Service', 'Online / Remote'] },
    { kind: 'select', key: 'availability',label: 'Availability',     options: ['Mon – Fri', 'Mon – Sat', '24/7', 'By Appointment', 'Weekends Only'] },
    { kind: 'input',  key: 'response',    label: 'Typical Response', placeholder: 'e.g. Same day, Within 24 hrs' },
  ],
  health: [
    { kind: 'select', key: 'facilityType', label: 'Facility Type',  options: ['Hospital', 'General Clinic', 'Pharmacy', 'Dental Clinic', 'Optical Centre', 'Diagnostic Lab', 'Specialist Clinic', 'Physiotherapy'] },
    { kind: 'select', key: 'appointment',  label: 'Appointment',    options: ['Walk-ins Welcome', 'Appointment Required', 'Both'] },
    { kind: 'select', key: 'openDays',     label: 'Open Days',      options: ['Mon – Fri', 'Mon – Sat', 'Daily (Mon – Sun)', '24/7'] },
    { kind: 'input',  key: 'hours',        label: 'Opening Hours',  placeholder: 'e.g. 8am – 8pm' },
  ],
  shops: [
    { kind: 'select', key: 'shopType',  label: 'Shop Type',          options: ['Fashion & Clothing', 'Electronics', 'Grocery & Food', 'Cosmetics & Beauty', 'Phone & Accessories', 'Books & Stationery', 'Hardware', 'Gifts & Souvenirs', 'General Merchandise'] },
    { kind: 'select', key: 'shopMode',  label: 'Shopping Mode',      options: ['In-Store Only', 'Online Orders', 'In-Store & Online'] },
    { kind: 'select', key: 'openDays',  label: 'Open Days',          options: ['Mon – Fri', 'Mon – Sat', 'Daily (Mon – Sun)', 'Weekdays Only'] },
    { kind: 'input',  key: 'hours',     label: 'Opening Hours',      placeholder: 'e.g. 9am – 7pm' },
  ],
  'local-market': [
    { kind: 'select', key: 'marketType',  label: 'Market Type',      options: ['Food & Produce', 'Clothing & Fabric', 'Craft & Artifacts', 'Electronics', 'Mixed / General'] },
    { kind: 'select', key: 'tradingDays', label: 'Trading Days',     options: ['Daily', 'Mon – Sat', 'Weekdays Only', 'Weekends Only', 'Market Days (specific)'] },
    { kind: 'input',  key: 'marketDays',  label: 'Market Day Details', placeholder: 'e.g. Every Thursday & Sunday' },
  ],
  events: [
    { kind: 'select', key: 'eventType',  label: 'Event Type',        options: ['Music Concert', 'Wedding & Reception', 'Corporate Event', 'Sports', 'Festival', 'Exhibition', 'Private Party', 'Religious Event', 'Other'] },
    { kind: 'input',  key: 'capacity',   label: 'Venue Capacity',    placeholder: 'e.g. 500 guests' },
    { kind: 'input',  key: 'duration',   label: 'Event Duration',    placeholder: 'e.g. 1 day, 3 hours' },
    { kind: 'input',  key: 'location',   label: 'Venue / Location',  placeholder: 'e.g. Event Centre, Alagbaka' },
  ],
}

// ─── Form state type ──────────────────────────────────────────────────────────
type FormState = {
  businessName: string
  category: string
  address: string
  description: string
  whatsapp: string
  phone: string
  email: string
  website: string
  submitterName: string
  features: string[]
  details: Record<string, string>
  plan: string
  photos: string[]
}

const initialForm: FormState = {
  businessName: '', category: '', address: '', description: '',
  whatsapp: '', phone: '', email: '', website: '', submitterName: '',
  features: [], details: {}, plan: 'basic', photos: [],
}

export default function OnboardPage() {
  const [step, setStep] = useState(1)
  const [form, setForm] = useState<FormState>(initialForm)
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [submitError, setSubmitError] = useState('')
  const [uploading, setUploading] = useState(false)
  const [uploadError, setUploadError] = useState('')

  const set = (key: keyof FormState, val: string | string[] | Record<string, string>) =>
    setForm(prev => ({ ...prev, [key]: val }))

  const setDetail = (key: string, val: string) =>
    setForm(prev => ({ ...prev, details: { ...prev.details, [key]: val } }))

  const toggleFeature = (f: string) =>
    set('features', form.features.includes(f)
      ? form.features.filter(x => x !== f)
      : [...form.features, f])

  const handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? []).slice(0, 5 - form.photos.length)
    if (!files.length) return
    setUploading(true)
    setUploadError('')
    try {
      const urls = await Promise.all(
        files.map(async (file) => {
          const fd = new FormData()
          fd.append('file', file)
          fd.append('upload_preset', process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET!)
          const res = await fetch(
            `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
            { method: 'POST', body: fd }
          )
          if (!res.ok) throw new Error('Upload failed')
          const data = await res.json()
          return data.secure_url as string
        })
      )
      set('photos', [...form.photos, ...urls])
    } catch {
      setUploadError('Upload failed. Check your Cloudinary config and try again.')
    } finally {
      setUploading(false)
      e.target.value = ''
    }
  }

  const removePhoto = (i: number) =>
    set('photos', form.photos.filter((_, j) => j !== i))

  const categoryAmenities = CATEGORY_AMENITIES[form.category] ?? []
  const categoryFields = CATEGORY_FIELDS[form.category] ?? []
  const selectedPlan = plans.find(p => p.id === form.plan)!

  const handleSubmit = async () => {
    setSubmitting(true)
    setSubmitError('')
    try {
      const res = await fetch('/api/submit-listing', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error ?? 'Submission failed')
      setSubmitted(true)
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : 'Something went wrong')
    } finally {
      setSubmitting(false)
    }
  }

  if (submitted) {
    return (
      <div className="min-h-[calc(100vh-64px)] bg-gray-50 flex items-center justify-center py-12 px-4">
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-12 text-center max-w-md w-full">
          <div className="w-20 h-20 bg-[#e6f2f1] rounded-full flex items-center justify-center mx-auto mb-5">
            <Check size={36} className="text-[#005F56]" />
          </div>
          <h2 className="text-2xl font-extrabold text-gray-900 mb-3 tracking-tight">Submission Received!</h2>
          <p className="text-gray-500 max-w-sm mx-auto mb-2 leading-relaxed">
            <strong>{form.businessName}</strong> is now under review.
          </p>
          <p className="text-gray-400 text-sm max-w-sm mx-auto mb-8 leading-relaxed">
            Our team will review your listing and contact you via WhatsApp or email within 24 hours once it&apos;s approved.
          </p>
          <a
            href="/"
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#005F56] text-white font-bold rounded-xl hover:bg-[#004840] transition-all"
          >
            Back to Home <ChevronRight size={16} />
          </a>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-[calc(100vh-64px)] bg-gray-50 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight mb-2">List Your Business</h1>
          <p className="text-gray-500">Get WhatsApp leads from thousands of visitors and residents in Akure</p>
        </div>

        {/* Step indicators */}
        <div className="flex items-center mb-10">
          {steps.map((s, i) => (
            <div key={s.n} className="flex items-center flex-1 last:flex-none">
              <div className="flex flex-col items-center">
                <div className={cn(
                  'w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all',
                  s.n < step ? 'bg-[#005F56] text-white' :
                  s.n === step ? 'bg-[#005F56] text-white ring-4 ring-[#005F56]/20' :
                  'bg-gray-100 text-gray-400 border border-gray-200'
                )}>
                  {s.n < step ? <Check size={14} /> : s.n}
                </div>
                <span className={cn('text-xs mt-1 font-semibold hidden sm:block',
                  s.n <= step ? 'text-[#005F56]' : 'text-gray-400'
                )}>{s.label}</span>
              </div>
              {i < steps.length - 1 && (
                <div className={cn('flex-1 h-0.5 mx-2', s.n < step ? 'bg-[#005F56]' : 'bg-gray-200')} />
              )}
            </div>
          ))}
        </div>

        {/* ── Step 1: Business Info ── */}
        {step === 1 && (
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
            <h2 className="text-xl font-extrabold text-gray-900 mb-6">Business Information</h2>
            <div className="space-y-5">
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Business Name *</label>
                <div className="relative">
                  <Building2 size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    value={form.businessName}
                    onChange={e => set('businessName', e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl text-sm outline-none focus:border-[#005F56] transition-colors"
                    placeholder="e.g. De Hills Hotel & Resort"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Category *</label>
                  <select
                    value={form.category}
                    onChange={e => { set('category', e.target.value); set('features', []) }}
                    className="w-full px-3 py-3 border-2 border-gray-200 rounded-xl text-sm outline-none focus:border-[#005F56] transition-colors bg-white"
                  >
                    <option value="">Select a category</option>
                    <option value="hotels">Hotels</option>
                    <option value="foods">Foods</option>
                    <option value="shortlets">Shortlets</option>
                    <option value="services">Services</option>
                    <option value="health">Health</option>
                    <option value="shops">Shops</option>
                    <option value="local-market">Local Market</option>
                    <option value="events">Events</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Address *</label>
                  <div className="relative">
                    <MapPin size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      value={form.address}
                      onChange={e => set('address', e.target.value)}
                      className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl text-sm outline-none focus:border-[#005F56] transition-colors"
                      placeholder="Street, Area, Akure"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Description *</label>
                <div className="relative">
                  <FileText size={16} className="absolute left-3.5 top-3.5 text-gray-400" />
                  <textarea
                    value={form.description}
                    onChange={e => set('description', e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl text-sm outline-none focus:border-[#005F56] transition-colors resize-none"
                    rows={3}
                    placeholder="Describe your business, what makes it special…"
                  />
                </div>
              </div>

              <div className="border-t border-gray-100 pt-5">
                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">Contact Details</p>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">WhatsApp *</label>
                      <div className="relative">
                        <Phone size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input
                          value={form.whatsapp}
                          onChange={e => set('whatsapp', e.target.value)}
                          className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl text-sm outline-none focus:border-[#005F56] transition-colors"
                          placeholder="+234 800 000 0000"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Phone (optional)</label>
                      <div className="relative">
                        <Phone size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input
                          value={form.phone}
                          onChange={e => set('phone', e.target.value)}
                          className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl text-sm outline-none focus:border-[#005F56] transition-colors"
                          placeholder="+234 800 000 0000"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Email (optional)</label>
                      <div className="relative">
                        <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input
                          type="email"
                          value={form.email}
                          onChange={e => set('email', e.target.value)}
                          className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl text-sm outline-none focus:border-[#005F56] transition-colors"
                          placeholder="business@email.com"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Website (optional)</label>
                      <div className="relative">
                        <Globe size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input
                          value={form.website}
                          onChange={e => set('website', e.target.value)}
                          className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl text-sm outline-none focus:border-[#005F56] transition-colors"
                          placeholder="https://..."
                        />
                      </div>
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Your Name *</label>
                    <div className="relative">
                      <User size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                      <input
                        value={form.submitterName}
                        onChange={e => set('submitterName', e.target.value)}
                        className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl text-sm outline-none focus:border-[#005F56] transition-colors"
                        placeholder="Who is submitting this listing?"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Photos */}
            <div className="border-t border-gray-100 pt-5 mt-5">
              <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">
                Photos&nbsp;
                <span className="font-normal normal-case text-gray-400">({form.photos.length}/5)</span>
              </p>

              {form.photos.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-3">
                  {form.photos.map((url, i) => (
                    <div key={url} className="relative group">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={url} alt="" className="w-20 h-20 object-cover rounded-xl border border-gray-200" />
                      <button
                        type="button"
                        onClick={() => removePhoto(i)}
                        className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-red-500 text-white rounded-full hidden group-hover:flex items-center justify-center"
                      >
                        <X size={10} />
                      </button>
                    </div>
                  ))}
                </div>
              )}

              {form.photos.length < 5 && (
                <label className={cn(
                  'flex flex-col items-center justify-center border-2 border-dashed rounded-xl p-6 cursor-pointer transition-colors',
                  uploading ? 'border-[#005F56] bg-[#e6f2f1]' : 'border-gray-200 hover:border-[#005F56]'
                )}>
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    className="hidden"
                    onChange={handlePhotoUpload}
                    disabled={uploading}
                  />
                  {uploading ? (
                    <>
                      <div className="w-6 h-6 border-2 border-[#005F56] border-t-transparent rounded-full animate-spin mb-2" />
                      <span className="text-sm font-semibold text-[#005F56]">Uploading…</span>
                    </>
                  ) : (
                    <>
                      <Upload size={24} className="text-gray-300 mb-2" />
                      <span className="text-sm font-semibold text-gray-500">Click to add photos</span>
                      <span className="text-xs text-gray-400 mt-1">JPG, PNG · Up to 5 photos · Auto-compressed</span>
                    </>
                  )}
                </label>
              )}

              {uploadError && (
                <p className="text-xs text-red-500 font-semibold mt-2">{uploadError}</p>
              )}
            </div>

            <button
              onClick={() => setStep(2)}
              disabled={!form.businessName || !form.category || !form.address || !form.description || !form.whatsapp || !form.submitterName}
              className="w-full mt-6 flex items-center justify-center gap-2 py-3.5 bg-[#005F56] text-white font-bold rounded-xl hover:bg-[#004840] transition-all disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Continue to Features <ArrowRight size={16} />
            </button>
          </div>
        )}

        {/* ── Step 2: Features & Amenities ── */}
        {step === 2 && (
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
            <h2 className="text-xl font-extrabold text-gray-900 mb-2">Details &amp; Amenities</h2>
            <p className="text-sm text-gray-500 mb-6">
              Tell customers more about <strong>{form.businessName}</strong>. These details appear on your listing page.
            </p>

            {/* Structured fields per category */}
            {categoryFields.length > 0 && (
              <div className="space-y-4 mb-7">
                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Business Details</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {categoryFields.map(field => (
                    <div key={field.key}>
                      <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
                        {field.label}
                      </label>
                      {field.kind === 'select' ? (
                        <select
                          value={form.details[field.key] ?? ''}
                          onChange={e => setDetail(field.key, e.target.value)}
                          className="w-full px-3 py-3 border-2 border-gray-200 rounded-xl text-sm outline-none focus:border-[#005F56] transition-colors bg-white"
                        >
                          <option value="">Select…</option>
                          {field.options.map((o: string) => (
                            <option key={o} value={o}>{o}</option>
                          ))}
                        </select>
                      ) : (
                        <input
                          value={form.details[field.key] ?? ''}
                          onChange={e => setDetail(field.key, e.target.value)}
                          placeholder={field.placeholder}
                          className="w-full px-3 py-3 border-2 border-gray-200 rounded-xl text-sm outline-none focus:border-[#005F56] transition-colors"
                        />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Amenity checkboxes */}
            {categoryAmenities.length > 0 && (
              <div className="border-t border-gray-100 pt-6">
                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">Amenities &amp; Features</p>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-4">
                  {categoryAmenities.map((amenity: string) => {
                    const on = form.features.includes(amenity)
                    return (
                      <button
                        key={amenity}
                        type="button"
                        onClick={() => toggleFeature(amenity)}
                        className={cn(
                          'flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl border-2 text-sm font-semibold text-left transition-all',
                          on
                            ? 'border-[#005F56] bg-[#e6f2f1] text-[#005F56]'
                            : 'border-gray-200 text-gray-600 hover:border-gray-300'
                        )}
                      >
                        <div className={cn(
                          'w-4 h-4 rounded flex items-center justify-center flex-shrink-0 border-2 transition-all',
                          on ? 'bg-[#005F56] border-[#005F56]' : 'border-gray-300'
                        )}>
                          {on && <Check size={10} className="text-white" strokeWidth={3} />}
                        </div>
                        {amenity}
                      </button>
                    )
                  })}
                </div>
                {form.features.length > 0 && (
                  <p className="text-xs text-[#005F56] font-semibold">
                    {form.features.length} amenit{form.features.length > 1 ? 'ies' : 'y'} selected
                  </p>
                )}
              </div>
            )}

            {categoryFields.length === 0 && categoryAmenities.length === 0 && (
              <div className="text-center py-8 text-gray-400 text-sm">
                No details required for this category.
              </div>
            )}

            <div className="flex gap-3 mt-7">
              <button onClick={() => setStep(1)} className="flex items-center gap-1.5 px-5 py-3 border-2 border-gray-200 rounded-xl text-sm font-bold text-gray-600 hover:border-gray-300 transition-all">
                <ArrowLeft size={15} /> Back
              </button>
              <button onClick={() => setStep(3)} className="flex-1 flex items-center justify-center gap-2 py-3.5 bg-[#005F56] text-white font-bold rounded-xl hover:bg-[#004840] transition-all">
                Continue to Plan <ArrowRight size={16} />
              </button>
            </div>
          </div>
        )}

        {/* ── Step 3: Choose Plan ── */}
        {step === 3 && (
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
            <h2 className="text-xl font-extrabold text-gray-900 mb-2">Choose Your Plan</h2>
            <p className="text-sm text-gray-500 mb-7">All plans include 1 listing. Upgrade anytime.</p>

            <div className="grid grid-cols-1 gap-4 mb-7">
              {plans.map(plan => (
                <button
                  key={plan.id}
                  onClick={() => set('plan', plan.id)}
                  className={cn(
                    'relative text-left rounded-2xl border-2 p-5 transition-all',
                    form.plan === plan.id
                      ? `${plan.color} shadow-md ring-2 ring-[#005F56]/10`
                      : 'border-gray-100 hover:border-gray-200'
                  )}
                >
                  {plan.popular && (
                    <div className="absolute -top-3 left-5 bg-[#005F56] text-white text-[10px] font-bold px-3 py-1 rounded-full whitespace-nowrap">
                      ⭐ Most Popular
                    </div>
                  )}
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className={cn(
                          'inline-block text-[10px] font-bold px-2.5 py-1 rounded-lg',
                          plan.id === 'basic' ? 'bg-gray-100 text-gray-500' :
                          plan.id === 'verified' ? 'bg-[#e6f2f1] text-[#005F56]' :
                          'bg-yellow-50 text-yellow-700'
                        )}>{plan.label}</span>
                        <span className="text-lg font-extrabold text-gray-900">{plan.price}</span>
                        {plan.period && <span className="text-xs text-gray-400">{plan.period}</span>}
                      </div>
                      <p className="text-sm text-gray-500 leading-relaxed">{plan.desc}</p>
                    </div>
                    <div className={cn(
                      'w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-0.5 transition-all',
                      form.plan === plan.id ? 'bg-[#005F56] border-[#005F56]' : 'border-gray-300'
                    )}>
                      {form.plan === plan.id && <Check size={11} className="text-white" strokeWidth={3} />}
                    </div>
                  </div>
                </button>
              ))}
            </div>

            <div className="flex gap-3">
              <button onClick={() => setStep(2)} className="flex items-center gap-1.5 px-5 py-3 border-2 border-gray-200 rounded-xl text-sm font-bold text-gray-600 hover:border-gray-300 transition-all">
                <ArrowLeft size={15} /> Back
              </button>
              <button onClick={() => setStep(4)} className="flex-1 flex items-center justify-center gap-2 py-3.5 bg-[#005F56] text-white font-bold rounded-xl hover:bg-[#004840] transition-all">
                Review Submission <ArrowRight size={16} />
              </button>
            </div>
          </div>
        )}

        {/* ── Step 4: Review & Submit ── */}
        {step === 4 && (
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
            <h2 className="text-xl font-extrabold text-gray-900 mb-6">Review Your Submission</h2>

            <div className="space-y-4 mb-6">
              {/* Business Info */}
              <div className="bg-gray-50 rounded-xl p-5">
                <div className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Business Details</div>
                <div className="grid grid-cols-2 gap-y-2 gap-x-4 text-sm">
                  {[
                    ['Business', form.businessName],
                    ['Category', form.category],
                    ['Address', form.address],
                    ['WhatsApp', form.whatsapp],
                    ...(form.phone ? [['Phone', form.phone]] : []),
                    ...(form.email ? [['Email', form.email]] : []),
                    ...(form.website ? [['Website', form.website]] : []),
                    ['Submitted by', form.submitterName],
                  ].map(([label, val]) => (
                    <div key={label}>
                      <span className="text-gray-400">{label}: </span>
                      <strong className="text-gray-800">{val}</strong>
                    </div>
                  ))}
                </div>
              </div>

              {/* Details */}
              {Object.keys(form.details).filter(k => form.details[k]).length > 0 && (
                <div className="bg-gray-50 rounded-xl p-5">
                  <div className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Property Details</div>
                  <div className="grid grid-cols-2 gap-y-2 gap-x-4 text-sm">
                    {Object.entries(form.details).filter(([, v]) => v).map(([k, v]) => {
                      const fieldDef = (CATEGORY_FIELDS[form.category] ?? []).find(f => f.key === k)
                      return (
                        <div key={k}>
                          <span className="text-gray-400">{fieldDef?.label ?? k}: </span>
                          <strong className="text-gray-800">{v}</strong>
                        </div>
                      )
                    })}
                  </div>
                </div>
              )}

              {/* Amenities */}
              {form.features.length > 0 && (
                <div className="bg-gray-50 rounded-xl p-5">
                  <div className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Amenities Selected</div>
                  <div className="flex flex-wrap gap-2">
                    {form.features.map(f => (
                      <span key={f} className="inline-flex items-center gap-1 px-2.5 py-1 bg-[#e6f2f1] text-[#005F56] text-xs font-semibold rounded-lg">
                        <Check size={10} /> {f}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Photos */}
              {form.photos.length > 0 && (
                <div className="bg-gray-50 rounded-xl p-5">
                  <div className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Photos ({form.photos.length})</div>
                  <div className="flex flex-wrap gap-2">
                    {form.photos.map((url, i) => (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img key={i} src={url} alt="" className="w-16 h-16 object-cover rounded-lg border border-gray-200" />
                    ))}
                  </div>
                </div>
              )}

              {/* Plan */}
              <div className="bg-gray-50 rounded-xl p-5">
                <div className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Selected Plan</div>
                <div className="flex items-center gap-3">
                  <span className={cn(
                    'inline-block text-[10px] font-bold px-2.5 py-1 rounded-lg',
                    form.plan === 'basic' ? 'bg-gray-100 text-gray-500' :
                    form.plan === 'verified' ? 'bg-[#e6f2f1] text-[#005F56]' : 'bg-yellow-50 text-yellow-700'
                  )}>{selectedPlan.label}</span>
                  <span className="font-extrabold text-gray-900">{selectedPlan.price}{selectedPlan.period}</span>
                </div>
              </div>
            </div>

            <div className="flex items-start gap-3 bg-amber-50 border border-amber-200 rounded-xl p-4 mb-6">
              <Star size={16} className="text-amber-600 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-amber-700">Your listing will go live after admin review — usually within 24 hours. We will contact you via WhatsApp.</p>
            </div>

            {submitError && (
              <div className="px-4 py-3 bg-red-50 border border-red-200 rounded-xl text-sm text-red-600 font-semibold mb-4">
                {submitError}
              </div>
            )}

            <div className="flex gap-3">
              <button onClick={() => setStep(3)} className="flex items-center gap-1.5 px-5 py-3 border-2 border-gray-200 rounded-xl text-sm font-bold text-gray-600 hover:border-gray-300 transition-all">
                <ArrowLeft size={15} /> Back
              </button>
              <button
                onClick={handleSubmit}
                disabled={submitting}
                className="flex-1 flex items-center justify-center gap-2 py-3.5 bg-[#005F56] text-white font-bold rounded-xl hover:bg-[#004840] transition-all disabled:opacity-60"
              >
                {submitting ? 'Submitting…' : 'Submit for Review'} <ArrowRight size={16} />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
