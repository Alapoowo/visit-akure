'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Eye, EyeOff, Mail, Lock, User, Phone, ArrowRight, Globe2, CheckCircle2 } from 'lucide-react'

const perks = [
  'Save listings to your wishlist',
  'Get personalized recommendations',
  'Direct WhatsApp connections',
  'Exclusive vendor offers',
]

export default function SignupPage() {
  const [showPass, setShowPass] = useState(false)
  const [role, setRole] = useState<'user' | 'vendor'>('user')

  return (
    <div className="min-h-[calc(100vh-64px)] grid grid-cols-1 md:grid-cols-2">
      {/* Left panel */}
      <div className="hidden md:flex flex-col items-center justify-center bg-[#005F56] p-12 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#F4C300]/10 rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-[#D62839]/10 rounded-full translate-y-1/2 -translate-x-1/2 pointer-events-none" />

        <div className="relative z-10 w-full max-w-sm">
          <div className="text-3xl font-extrabold text-white tracking-tight mb-2">
            Join Visit Akure
          </div>
          <p className="text-white/60 text-sm mb-8 leading-relaxed">
            Create your free account and start discovering the best of Akure, Ondo State.
          </p>
          <ul className="space-y-3">
            {perks.map(perk => (
              <li key={perk} className="flex items-center gap-3 text-white/80 text-sm">
                <CheckCircle2 size={16} className="text-[#F4C300] flex-shrink-0" />
                {perk}
              </li>
            ))}
          </ul>

          <div className="mt-10 p-4 bg-white/10 border border-white/20 rounded-2xl">
            <div className="text-white font-bold text-sm mb-1">🏪 Are you a vendor?</div>
            <p className="text-white/60 text-xs leading-relaxed">
              Sign up as a vendor to list your business and receive WhatsApp leads daily.
            </p>
          </div>
        </div>
      </div>

      {/* Right panel — form */}
      <div className="flex flex-col items-center justify-center bg-white p-8 md:p-12">
        <div className="w-full max-w-sm">
          <h2 className="text-2xl font-extrabold text-gray-900 mb-1 tracking-tight">Create your account</h2>
          <p className="text-sm text-gray-500 mb-6">
            Already have an account?{' '}
            <Link href="/auth/login" className="text-[#005F56] font-bold hover:underline">Sign in</Link>
          </p>

          {/* Role toggle */}
          <div className="grid grid-cols-2 gap-2 mb-6 bg-gray-50 p-1 rounded-xl">
            {(['user', 'vendor'] as const).map(r => (
              <button
                key={r}
                onClick={() => setRole(r)}
                className={`py-2 rounded-lg text-sm font-bold transition-all capitalize ${
                  role === r
                    ? 'bg-white text-[#005F56] shadow-sm'
                    : 'text-gray-400 hover:text-gray-600'
                }`}
              >
                {r === 'user' ? '👤 Visitor' : '🏪 Vendor'}
              </button>
            ))}
          </div>

          {/* Google */}
          <button className="w-full flex items-center justify-center gap-2.5 py-3 border-2 border-gray-200 rounded-xl font-semibold text-sm text-gray-700 hover:border-gray-300 hover:bg-gray-50 transition-all mb-5">
            <Globe2 size={18} className="text-blue-500" />
            Continue with Google
          </button>

          <div className="flex items-center gap-3 mb-5">
            <div className="flex-1 h-px bg-gray-200" />
            <span className="text-xs text-gray-400 font-medium">or with email</span>
            <div className="flex-1 h-px bg-gray-200" />
          </div>

          <div className="space-y-4 mb-5">
            <div>
              <label className="block text-xs font-bold text-gray-600 uppercase tracking-wider mb-2">Full Name</label>
              <div className="relative">
                <User size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Your full name"
                  className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl text-sm outline-none focus:border-[#005F56] transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-600 uppercase tracking-wider mb-2">Email Address</label>
              <div className="relative">
                <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="email"
                  placeholder="hello@visitakure.com"
                  className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl text-sm outline-none focus:border-[#005F56] transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-600 uppercase tracking-wider mb-2">WhatsApp Number</label>
              <div className="relative">
                <Phone size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="tel"
                  placeholder="+234 800 000 0000"
                  className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl text-sm outline-none focus:border-[#005F56] transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-600 uppercase tracking-wider mb-2">Password</label>
              <div className="relative">
                <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type={showPass ? 'text' : 'password'}
                  placeholder="Minimum 8 characters"
                  className="w-full pl-10 pr-10 py-3 border-2 border-gray-200 rounded-xl text-sm outline-none focus:border-[#005F56] transition-colors"
                />
                <button
                  onClick={() => setShowPass(!showPass)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>
          </div>

          <button className="w-full flex items-center justify-center gap-2 py-3.5 bg-[#005F56] text-white font-bold rounded-xl hover:bg-[#004840] transition-all mb-4">
            Create Account <ArrowRight size={16} />
          </button>

          <p className="text-center text-xs text-gray-400">
            By creating an account, you agree to our{' '}
            <a href="#" className="text-[#005F56] hover:underline">Terms</a> and{' '}
            <a href="#" className="text-[#005F56] hover:underline">Privacy Policy</a>
          </p>

          {role === 'vendor' && (
            <div className="mt-5 p-3 bg-[#e6f2f1] border border-[#005F56]/20 rounded-xl text-xs text-[#005F56] font-medium text-center">
              After creating your account you&apos;ll be redirected to set up your business listing.
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
