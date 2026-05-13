import Link from 'next/link'
import { MapPin, Mail, Phone, MessageCircle, Link2, Share2 } from 'lucide-react'

const categories = [
  { label: 'Hotels in Akure', href: '/hotels' },
  { label: 'Foods in Akure', href: '/foods' },
  { label: 'Shortlets in Akure', href: '/shortlets' },
  { label: 'Services in Akure', href: '/services' },
  { label: 'Health in Akure', href: '/health' },
  { label: 'Shops in Akure', href: '/shops' },
  { label: 'Local Market', href: '/local-market' },
  { label: 'Events in Akure', href: '/events' },
]

const company = [
  { label: 'About Visit Akure', href: '/about' },
  { label: 'Privacy Policy', href: '/privacy' },
  { label: 'Terms of Service', href: '/terms' },
  { label: 'Contact Us', href: '/contact' },
  { label: 'List Your Business', href: '/onboard' },
]

export default function Footer() {
  return (
    <footer className="bg-[#111827] text-gray-400 mt-auto">
      <div className="max-w-[1280px] mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="mb-4">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/footer-logo.png" alt="Visit Akure" className="h-12 w-auto" />
            </div>
            <p className="text-sm leading-relaxed mb-5">
              Akure&apos;s #1 local discovery platform — connecting visitors and residents to the best hotels, food, shortlets, services, and more, all through WhatsApp.
            </p>
            <div className="flex items-start gap-2 text-sm mb-2">
              <MapPin size={14} className="text-[#005F56] flex-shrink-0 mt-0.5" />
              <span>Old Farmer&apos;s Club House, Igbatoro Road, Alagbaka, Akure, Ondo State</span>
            </div>
            <div className="flex items-center gap-2 text-sm mb-2">
              <Mail size={14} className="text-[#005F56] flex-shrink-0" />
              <span>hello@visitakure.com</span>
            </div>
            <div className="flex items-center gap-2 text-sm mb-5">
              <Phone size={14} className="text-[#005F56] flex-shrink-0" />
              <span>+234 706 115 0587</span>
            </div>
            {/* Socials */}
            <div className="flex items-center gap-3">
              <a href="#" className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#005F56] transition-all" aria-label="Social">
                <Link2 size={16} className="text-white" />
              </a>
              <a href="#" className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#005F56] transition-all" aria-label="Share">
                <Share2 size={16} className="text-white" />
              </a>
              <a href="#" className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#25D366] transition-all" aria-label="WhatsApp">
                <MessageCircle size={16} className="text-white" />
              </a>
            </div>
          </div>

          {/* Explore */}
          <div>
            <h4 className="text-white font-bold text-sm mb-4 uppercase tracking-wider">Explore Akure</h4>
            <ul className="space-y-2.5">
              {categories.map(item => (
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
              {company.map(item => (
                <li key={item.label}>
                  <Link href={item.href} className="text-sm hover:text-white transition-colors">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
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
