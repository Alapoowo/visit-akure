'use client'

import { useState } from 'react'
import { CheckCircle2 } from 'lucide-react'

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 py-16 text-center">
        <div className="w-16 h-16 bg-[#005F56]/10 rounded-full flex items-center justify-center">
          <CheckCircle2 size={32} className="text-[#005F56]" />
        </div>
        <h3 className="text-xl font-extrabold text-gray-900">Message Sent!</h3>
        <p className="text-sm text-gray-500 max-w-xs">
          Thanks for reaching out. We&apos;ll get back to you within 24 hours.
        </p>
        <button
          onClick={() => setSubmitted(false)}
          className="text-sm font-bold text-[#005F56] underline"
        >
          Send another message
        </button>
      </div>
    )
  }

  return (
    <form className="space-y-5" onSubmit={handleSubmit}>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-1.5">Full Name</label>
          <input
            type="text"
            required
            placeholder="Your full name"
            className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-800 outline-none focus:border-[#005F56] transition-colors"
          />
        </div>
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-1.5">Email Address</label>
          <input
            type="email"
            required
            placeholder="you@example.com"
            className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-800 outline-none focus:border-[#005F56] transition-colors"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-bold text-gray-700 mb-1.5">Subject</label>
        <select className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-800 outline-none focus:border-[#005F56] transition-colors bg-white cursor-pointer">
          <option>General Enquiry</option>
          <option>List My Business</option>
          <option>Report a Listing</option>
          <option>Partnership</option>
          <option>Technical Issue</option>
          <option>Other</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-bold text-gray-700 mb-1.5">Message</label>
        <textarea
          rows={5}
          required
          placeholder="Tell us how we can help..."
          className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-800 outline-none focus:border-[#005F56] transition-colors resize-none"
        />
      </div>

      <button
        type="submit"
        className="w-full bg-[#005F56] text-white font-extrabold py-4 rounded-xl hover:bg-[#004840] transition-colors text-sm"
      >
        Send Message
      </button>
    </form>
  )
}
