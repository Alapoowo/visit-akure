import { MapPin, Mail, Phone, Heart, Target, BookOpen } from 'lucide-react'
import Link from 'next/link'

export const metadata = {
  title: 'About Visit Akure | Visit Akure',
  description: "Learn about Visit Akure — Akure's #1 local discovery platform connecting visitors and residents to the best local businesses.",
}

export default function AboutPage() {
  return (
    <div>
      {/* Hero */}
      <div className="bg-[#005F56] relative overflow-hidden">
        <div className="absolute right-8 top-1/2 -translate-y-1/2 text-[140px] opacity-[0.07] select-none pointer-events-none">🏙️</div>
        <div className="max-w-[1280px] mx-auto px-6 py-16 relative z-10">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight mb-4">About Visit Akure</h1>
          <p className="text-white/70 text-lg max-w-xl leading-relaxed">
            Built from Akure, for Akure. We&apos;re on a mission to make discovering and connecting with the best local businesses effortless.
          </p>
        </div>
      </div>

      <div className="max-w-[900px] mx-auto px-6 py-16 space-y-16">
        {/* Who we are */}
        <section>
          <div className="flex items-center gap-3 mb-5">
            <div className="w-10 h-10 bg-[#e6f2f1] rounded-xl flex items-center justify-center">
              <BookOpen size={20} className="text-[#005F56]" />
            </div>
            <h2 className="text-2xl font-extrabold text-gray-900">Who We Are</h2>
          </div>
          <p className="text-gray-600 leading-relaxed text-lg mb-4">
            Visit Akure is Akure&apos;s #1 local discovery platform, connecting visitors and residents to the best hotels, restaurants, shortlets, services, health facilities, shops, local markets, and events in Akure, Ondo State, Nigeria.
          </p>
          <p className="text-gray-600 leading-relaxed text-lg mb-4">
            We believe in the power of local — that every visit should start with a WhatsApp message to a trusted local business. No booking fees. No middlemen. Just real connections.
          </p>
          <p className="text-gray-700 font-bold text-lg">Built from Akure, for Akure.</p>
        </section>

        {/* Our Mission */}
        <section>
          <div className="flex items-center gap-3 mb-5">
            <div className="w-10 h-10 bg-red-50 rounded-xl flex items-center justify-center">
              <Target size={20} className="text-[#D62839]" />
            </div>
            <h2 className="text-2xl font-extrabold text-gray-900">Our Mission</h2>
          </div>
          <p className="text-gray-600 leading-relaxed text-lg">
            To make it easy for anyone to discover and connect with the best of Akure — from luxury hotels to street food, from wellness centres to local markets — with just a tap on WhatsApp.
          </p>
        </section>

        {/* Our Story */}
        <section>
          <div className="flex items-center gap-3 mb-5">
            <div className="w-10 h-10 bg-[#e6f2f1] rounded-xl flex items-center justify-center">
              <Heart size={20} className="text-[#005F56]" />
            </div>
            <h2 className="text-2xl font-extrabold text-gray-900">Our Story</h2>
          </div>
          <p className="text-gray-600 leading-relaxed text-lg mb-4">
            Visit Akure started with a simple problem: there was no single place to find and contact the best local businesses in Akure. We built the platform we wished existed — a beautifully curated directory of trusted local listings, all reachable via WhatsApp.
          </p>
          <p className="text-gray-600 leading-relaxed text-lg">
            Since launching, we&apos;ve helped hundreds of visitors, tourists, and residents connect with verified local businesses, making Akure an even better place to explore and live in.
          </p>
        </section>

        {/* Contact */}
        <section>
          <h2 className="text-2xl font-extrabold text-gray-900 mb-6">Contact Us</h2>
          <div className="bg-gray-50 rounded-2xl border border-gray-100 p-6 space-y-4">
            <div className="flex items-start gap-3">
              <MapPin size={18} className="text-[#005F56] flex-shrink-0 mt-0.5" />
              <div>
                <div className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-0.5">Address</div>
                <div className="text-gray-700 font-medium">Old Farmer&apos;s Club House, Igbatoro Road, Alagbaka, Akure, Ondo State</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Phone size={18} className="text-[#005F56] flex-shrink-0" />
              <div>
                <div className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-0.5">Phone</div>
                <a href="tel:+2347061150587" className="text-gray-700 font-medium hover:text-[#005F56]">+234 706 115 0587</a>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Mail size={18} className="text-[#005F56] flex-shrink-0" />
              <div>
                <div className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-0.5">Email</div>
                <a href="mailto:hello@visitakure.com" className="text-gray-700 font-medium hover:text-[#005F56]">hello@visitakure.com</a>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-[#005F56] rounded-2xl p-8 text-center">
          <h3 className="text-2xl font-extrabold text-white mb-3">Want to list your business?</h3>
          <p className="text-white/70 mb-6">Join hundreds of businesses already connecting with customers through Visit Akure.</p>
          <Link href="/onboard"
            className="inline-flex items-center gap-2 bg-[#F4C300] text-gray-900 font-extrabold px-8 py-3.5 rounded-xl hover:bg-yellow-400 transition-all">
            List Your Business Free
          </Link>
        </section>
      </div>
    </div>
  )
}
