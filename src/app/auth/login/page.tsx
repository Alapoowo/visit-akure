'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Eye, EyeOff, Mail, Lock, MapPin, Star, MessageCircle, ArrowRight, Globe2 } from 'lucide-react'

export default function LoginPage() {
  const [showPass, setShowPass] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  return (
    <div className="min-h-[calc(100vh-64px)] grid grid-cols-1 md:grid-cols-2">
      {/* Left panel */}
      <div className="hidden md:flex flex-col items-center justify-center bg-[#005F56] p-12 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#F4C300]/10 rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-[#D62839]/10 rounded-full translate-y-1/2 -translate-x-1/2" />
        <div className="relative z-10 w-full max-w-sm">
          <div className="text-3xl font-extrabold text-white mb-2 tracking-tight">
            Welcome to<br />Visit Akure
          </div>
          <p className="text-white/60 text-sm mb-10">
            Discover Akure&apos;s best stays, cars, activities and events
          </p>
          <div className="space-y-4">
            {[
              { icon: MapPin, title: '500+ Listings', desc: 'Hotels, cars, activities and events' },
              { icon: MessageCircle, title: 'WhatsApp First', desc: 'Connect directly with vendors instantly' },
              { icon: Star, title: 'Verified Vendors', desc: 'Trusted and reviewed by real visitors' },
            ].map(({ icon: Icon, title, desc }) => (
              <div key={title} className="flex items-center gap-4 bg-white/10 border border-white/20 rounded-2xl p-4">
                <div className="w-10 h-10 rounded-xl bg-white/15 flex items-center justify-center flex-shrink-0">
                  <Icon size={18} className="text-[#F4C300]" />
                </div>
                <div>
                  <div className="text-white font-bold text-sm">{title}</div>
                  <div className="text-white/50 text-xs">{desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right panel — form */}
      <div className="flex flex-col items-center justify-center bg-white p-8 md:p-12">
        <div className="w-full max-w-sm">
          <h2 className="text-2xl font-extrabold text-gray-900 mb-1 tracking-tight">Sign in to your account</h2>
          <p className="text-sm text-gray-500 mb-7">
            New to Visit Akure?{' '}
            <Link href="/auth/signup" className="text-[#005F56] font-bold hover:underline">
              Create an account
            </Link>
          </p>

          {/* Google */}
          <button className="w-full flex items-center justify-center gap-2.5 py-3 border-2 border-gray-200 rounded-xl font-semibold text-sm text-gray-700 hover:border-gray-300 hover:bg-gray-50 transition-all mb-5">
            <Globe2 size={18} className="text-[#4285f4]" />
            Continue with Google
          </button>

          <div className="flex items-center gap-3 mb-5">
            <div className="flex-1 h-px bg-gray-200" />
            <span className="text-xs text-gray-400 font-medium">or sign in with email</span>
            <div className="flex-1 h-px bg-gray-200" />
          </div>

          {/* Email */}
          <div className="mb-4">
            <label className="block text-xs font-bold text-gray-600 uppercase tracking-wider mb-2">Email address</label>
            <div className="relative">
              <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="hello@visitakure.com"
                className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl text-sm outline-none focus:border-[#005F56] transition-colors"
              />
            </div>
          </div>

          {/* Password */}
          <div className="mb-2">
            <label className="block text-xs font-bold text-gray-600 uppercase tracking-wider mb-2">Password</label>
            <div className="relative">
              <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type={showPass ? 'text' : 'password'}
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="••••••••"
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

          <div className="flex justify-end mb-6">
            <a href="#" className="text-xs font-semibold text-[#005F56] hover:underline">Forgot password?</a>
          </div>

          <button className="w-full flex items-center justify-center gap-2 py-3.5 bg-[#005F56] text-white font-bold rounded-xl hover:bg-[#004840] transition-all mb-4">
            Sign In <ArrowRight size={16} />
          </button>

          <div className="text-center text-xs text-gray-400 mb-6">
            By signing in, you agree to our{' '}
            <a href="#" className="text-[#005F56] hover:underline">Terms</a> and{' '}
            <a href="#" className="text-[#005F56] hover:underline">Privacy Policy</a>
          </div>

          <div className="border-t border-gray-100 pt-5 text-center">
            <div className="text-xs text-gray-500 mb-3">Are you a business owner?</div>
            <Link
              href="/onboard"
              className="flex items-center justify-center gap-2 w-full py-3 border-2 border-[#005F56] text-[#005F56] font-bold rounded-xl hover:bg-[#005F56] hover:text-white transition-all text-sm"
            >
              <MapPin size={15} />
              List Your Business
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
