import Link from 'next/link'
import { MapPin, Mail, Phone, MessageCircle, Link2, Share2 } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-[#111827] text-gray-400 mt-auto">
      <div className="max-w-[1280px] mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-1 mb-4">
              <span className="text-xl font-extrabold text-[#005F56]">VISIT</span>
              <span className="text-xl font-extrabold text-[#D62839]">AKURE</span>
            </div>
            <p className="text-sm leading-relaxed mb-5">
              Your gateway to Akure&apos;s best stays, cars, activities and events. Connecting visitors with local vendors through WhatsApp.
            </p>
            <div className="flex items-center gap-2 text-sm mb-2">
              <MapPin size={14} className="text-[#005F56] flex-shrink-0" />
              <span>Akure, Ondo State, Nigeria</span>
            </div>
            <div className="flex items-center gap-2 text-sm mb-2">
              <Mail size={14} className="text-[#005F56] flex-shrink-0" />
              <span>hello@visitakure.com</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Phone size={14} className="text-[#005F56] flex-shrink-0" />
              <span>+234 800 000 0000</span>
            </div>
          </div>

          {/* Explore */}
          <div>
            <h4 className="text-white font-bold text-sm mb-4 uppercase tracking-wider">Explore</h4>
            <ul className="space-y-2.5">
              {['Stays', 'Cars', 'Activities', 'Events', 'Services', 'Products'].map(item => (
                <li key={item}>
                  <Link href={`/${item.toLowerCase()}`} className="text-sm hover:text-white transition-colors">
                    {item} in Akure
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* For Vendors */}
          <div>
            <h4 className="text-white font-bold text-sm mb-4 uppercase tracking-wider">For Vendors</h4>
            <ul className="space-y-2.5">
              {[
                { label: 'List Your Business', href: '/onboard' },
                { label: 'Vendor Dashboard', href: '/vendor/dashboard' },
                { label: 'Pricing Plans', href: '/onboard' },
                { label: 'Vendor Support', href: '#' },
                { label: 'Success Stories', href: '#' },
              ].map(item => (
                <li key={item.label}>
                  <Link href={item.href} className="text-sm hover:text-white transition-colors">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-white font-bold text-sm mb-4 uppercase tracking-wider">Company</h4>
            <ul className="space-y-2.5">
              {[
                { label: 'About Visit Akure', href: '#' },
                { label: 'Blog', href: '#' },
                { label: 'Privacy Policy', href: '#' },
                { label: 'Terms of Service', href: '#' },
                { label: 'Contact Us', href: '#' },
              ].map(item => (
                <li key={item.label}>
                  <Link href={item.href} className="text-sm hover:text-white transition-colors">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
            {/* Socials */}
            <div className="flex items-center gap-3 mt-6">
              <a href="#" className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#005F56] transition-all">
                <Link2 size={16} className="text-white" />
              </a>
              <a href="#" className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#005F56] transition-all">
                <MessageCircle size={16} className="text-white" />
              </a>
              <a href="#" className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#005F56] transition-all">
                <Share2 size={16} className="text-white" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm">© 2026 Visit Akure. All rights reserved.</p>
          <p className="text-sm">Made with ❤️ for Akure, Ondo State</p>
        </div>
      </div>
    </footer>
  )
}
