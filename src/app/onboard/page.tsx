'use client'

import { useState } from 'react'
import {
  Building2, MapPin, Phone, FileText, Image, Check,
  ArrowRight, ArrowLeft, BadgeCheck, Star, Crown, Upload, ChevronRight
} from 'lucide-react'
import { cn } from '@/lib/utils'

const steps = [
  { n: 1, label: 'Business Info' },
  { n: 2, label: 'Choose Plan' },
  { n: 3, label: 'Review' },
  { n: 4, label: 'Submit' },
]

const plans = [
  {
    id: 'basic', label: 'Basic', badge: 'Free Forever', icon: BadgeCheck,
    price: '₦0', period: '/month', color: 'border-gray-200',
    features: ['1 active listing', 'WhatsApp CTA button', 'Basic analytics', 'Standard placement'],
  },
  {
    id: 'verified', label: 'Verified', badge: '⭐ Most Popular', icon: Star,
    price: '₦5,000', period: '/month', color: 'border-[#005F56]', popular: true,
    features: ['3 active listings', 'Verified badge', 'Priority placement', 'Advanced analytics', 'Photo gallery (10 photos)'],
  },
  {
    id: 'featured', label: 'Featured', badge: '🏆 Best Value', icon: Crown,
    price: '₦15,000', period: '/month', color: 'border-[#F4C300]',
    features: ['Unlimited listings', 'Featured on homepage', 'Top search results', 'Unlimited photos', 'WhatsApp lead analytics', 'Priority 24/7 support'],
  },
]

export default function OnboardPage() {
  const [step, setStep] = useState(2)
  const [selectedPlan, setSelectedPlan] = useState('verified')

  return (
    <div className="min-h-[calc(100vh-64px)] bg-gray-50 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight mb-2">List Your Business</h1>
          <p className="text-gray-500">Get WhatsApp leads from thousands of visitors to Akure</p>
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

        {/* Step 1 — Business Info */}
        {step === 1 && (
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
            <h2 className="text-xl font-extrabold text-gray-900 mb-6">Business Information</h2>
            <div className="space-y-5">
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
                  Business Name *
                </label>
                <div className="relative">
                  <Building2 size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl text-sm outline-none focus:border-[#005F56] transition-colors" placeholder="e.g. De Hills Hotel & Resort" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Category *</label>
                  <select className="w-full px-3 py-3 border-2 border-gray-200 rounded-xl text-sm outline-none focus:border-[#005F56] transition-colors bg-white">
                    <option>Stays / Hotel</option>
                    <option>Cars</option>
                    <option>Activities</option>
                    <option>Events</option>
                    <option>Services</option>
                    <option>Products</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Location *</label>
                  <div className="relative">
                    <MapPin size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl text-sm outline-none focus:border-[#005F56] transition-colors" placeholder="e.g. Akure, Ondo State" />
                  </div>
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">WhatsApp Number *</label>
                <div className="relative">
                  <Phone size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl text-sm outline-none focus:border-[#005F56] transition-colors" placeholder="+234 800 000 0000" />
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Description *</label>
                <div className="relative">
                  <FileText size={16} className="absolute left-3.5 top-3.5 text-gray-400" />
                  <textarea className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl text-sm outline-none focus:border-[#005F56] transition-colors resize-none" rows={3} placeholder="Describe your business, what makes it special..." />
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Upload Photos</label>
                <div className="border-2 border-dashed border-gray-200 rounded-xl p-8 text-center cursor-pointer hover:border-[#005F56] transition-colors group">
                  <Upload size={28} className="mx-auto mb-2 text-gray-300 group-hover:text-[#005F56] transition-colors" />
                  <div className="text-sm font-semibold text-gray-600 mb-1">Drop photos here or click to browse</div>
                  <div className="text-xs text-gray-400">JPG, PNG up to 10MB each · Max 10 photos</div>
                </div>
              </div>
            </div>
            <button onClick={() => setStep(2)} className="w-full mt-6 flex items-center justify-center gap-2 py-3.5 bg-[#005F56] text-white font-bold rounded-xl hover:bg-[#004840] transition-all">
              Continue to Plan Selection <ArrowRight size={16} />
            </button>
          </div>
        )}

        {/* Step 2 — Plans */}
        {step === 2 && (
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
            <h2 className="text-xl font-extrabold text-gray-900 mb-2">Choose Your Plan</h2>
            <p className="text-sm text-gray-500 mb-7">All plans include WhatsApp lead generation. Upgrade anytime.</p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-7">
              {plans.map(plan => (
                <button
                  key={plan.id}
                  onClick={() => setSelectedPlan(plan.id)}
                  className={cn(
                    'relative text-left rounded-2xl border-2 p-5 transition-all',
                    selectedPlan === plan.id ? `${plan.color} shadow-md ring-2 ring-[#005F56]/10` : 'border-gray-100 hover:border-gray-200'
                  )}
                >
                  {plan.popular && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#005F56] text-white text-[10px] font-bold px-3 py-1 rounded-full whitespace-nowrap">
                      ⭐ Most Popular
                    </div>
                  )}
                  <div className="mb-3">
                    <span className={cn(
                      'inline-block text-[10px] font-bold px-2.5 py-1 rounded-lg',
                      plan.id === 'basic' ? 'bg-gray-100 text-gray-500' :
                      plan.id === 'verified' ? 'bg-[#e6f2f1] text-[#005F56]' :
                      'bg-yellow-50 text-yellow-700'
                    )}>
                      {plan.label}
                    </span>
                  </div>
                  <div className="text-2xl font-extrabold text-gray-900 mb-0.5">{plan.price}</div>
                  <div className="text-xs text-gray-400 mb-4">{plan.period}</div>
                  <ul className="space-y-2">
                    {plan.features.map(f => (
                      <li key={f} className="flex items-start gap-2 text-xs text-gray-600">
                        <Check size={13} className="text-[#005F56] flex-shrink-0 mt-0.5" />
                        {f}
                      </li>
                    ))}
                  </ul>
                  {selectedPlan === plan.id && (
                    <div className="absolute top-3 right-3 w-5 h-5 bg-[#005F56] rounded-full flex items-center justify-center">
                      <Check size={11} className="text-white" />
                    </div>
                  )}
                </button>
              ))}
            </div>
            <div className="flex gap-3">
              <button onClick={() => setStep(1)} className="flex items-center gap-1.5 px-5 py-3 border-2 border-gray-200 rounded-xl text-sm font-bold text-gray-600 hover:border-gray-300 transition-all">
                <ArrowLeft size={15} /> Back
              </button>
              <button onClick={() => setStep(3)} className="flex-1 flex items-center justify-center gap-2 py-3.5 bg-[#005F56] text-white font-bold rounded-xl hover:bg-[#004840] transition-all">
                Continue to Review <ArrowRight size={16} />
              </button>
            </div>
          </div>
        )}

        {/* Step 3 — Review */}
        {step === 3 && (
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
            <h2 className="text-xl font-extrabold text-gray-900 mb-6">Review Your Submission</h2>
            <div className="bg-gray-50 rounded-xl p-5 mb-5">
              <div className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Business Details</div>
              <div className="grid grid-cols-2 gap-3 text-sm">
                {[
                  ['Business', 'Your Business Name'],
                  ['Category', 'Stays / Hotel'],
                  ['Location', 'Akure, Ondo State'],
                  ['WhatsApp', '+234 800 000 0000'],
                  ['Plan', `${plans.find(p => p.id === selectedPlan)?.label} — ${plans.find(p => p.id === selectedPlan)?.price}/mo`],
                  ['Photos', '0 uploaded'],
                ].map(([label, val]) => (
                  <div key={label}><span className="text-gray-400">{label}:</span> <strong className="text-gray-800">{val}</strong></div>
                ))}
              </div>
            </div>
            <div className="flex items-start gap-3 bg-yellow-50 border border-yellow-200 rounded-xl p-4 mb-6">
              <Star size={16} className="text-yellow-600 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-yellow-700">Your listing will go live after admin review — usually within 24 hours.</p>
            </div>
            <div className="flex gap-3">
              <button onClick={() => setStep(2)} className="flex items-center gap-1.5 px-5 py-3 border-2 border-gray-200 rounded-xl text-sm font-bold text-gray-600 hover:border-gray-300 transition-all">
                <ArrowLeft size={15} /> Back
              </button>
              <button onClick={() => setStep(4)} className="flex-1 flex items-center justify-center gap-2 py-3.5 bg-[#005F56] text-white font-bold rounded-xl hover:bg-[#004840] transition-all">
                Submit for Review <ArrowRight size={16} />
              </button>
            </div>
          </div>
        )}

        {/* Step 4 — Success */}
        {step === 4 && (
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-12 text-center">
            <div className="w-20 h-20 bg-[#e6f2f1] rounded-full flex items-center justify-center mx-auto mb-5">
              <Check size={36} className="text-[#005F56]" />
            </div>
            <h2 className="text-2xl font-extrabold text-gray-900 mb-2 tracking-tight">Submission Received!</h2>
            <p className="text-gray-500 max-w-sm mx-auto mb-8 leading-relaxed">
              Your listing is under review. We&apos;ll notify you by WhatsApp within 24 hours once it&apos;s approved.
            </p>
            <a
              href="/vendor/dashboard"
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#005F56] text-white font-bold rounded-xl hover:bg-[#004840] transition-all"
            >
              Go to Vendor Dashboard <ChevronRight size={16} />
            </a>
          </div>
        )}
      </div>
    </div>
  )
}
