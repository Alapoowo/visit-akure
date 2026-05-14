import { Mail, Phone, MapPin, MessageCircle, Clock } from 'lucide-react'
import type { Metadata } from 'next'
import ContactForm from '@/components/contact/ContactForm'

export const metadata: Metadata = {
  title: 'Contact Us',
  description: 'Get in touch with the Visit Akure team. We\'re here to help with listings, vendor enquiries, and platform feedback.',
}

const contactMethods = [
  {
    icon: Mail,
    color: 'bg-[#005F56]',
    title: 'Email Us',
    detail: 'hello@visitakure.com',
    note: 'We reply within 24 hours on business days',
    href: 'mailto:hello@visitakure.com',
  },
  {
    icon: MessageCircle,
    color: 'bg-[#25D366]',
    title: 'WhatsApp',
    detail: '+234 706 115 0587',
    note: 'Quick responses during business hours',
    href: 'https://wa.me/2347061150587',
  },
  {
    icon: MapPin,
    color: 'bg-[#D62839]',
    title: 'Location',
    detail: 'Akure, Ondo State',
    note: 'Nigeria',
    href: '#',
  },
  {
    icon: Clock,
    color: 'bg-[#F4C300]',
    title: 'Hours',
    detail: 'Mon – Fri: 9am – 6pm',
    note: 'Sat: 10am – 4pm',
    href: '#',
  },
]

export default function ContactPage() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-[#005F56] relative overflow-hidden">
        <div className="absolute top-0 right-0 w-72 h-72 bg-[#F4C300]/10 rounded-full -translate-y-1/2 translate-x-1/3 pointer-events-none" />
        <div className="max-w-[1280px] mx-auto px-6 py-16 relative z-10">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-3">Contact Us</h1>
          <p className="text-white/70 text-lg max-w-xl">
            Have a question, feedback, or want to list your business? We&apos;d love to hear from you.
          </p>
        </div>
      </section>

      {/* Contact cards */}
      <section className="max-w-[1280px] mx-auto px-6 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-14">
          {contactMethods.map(({ icon: Icon, color, title, detail, note, href }) => (
            <a
              key={title}
              href={href}
              className="group bg-white rounded-2xl border border-gray-100 p-6 hover:shadow-md hover:border-[#005F56]/20 transition-all"
            >
              <div className={`w-12 h-12 ${color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                <Icon size={22} className="text-white" />
              </div>
              <h3 className="font-extrabold text-gray-900 mb-1">{title}</h3>
              <p className="text-[#005F56] font-semibold text-sm mb-1">{detail}</p>
              <p className="text-xs text-gray-400">{note}</p>
            </a>
          ))}
        </div>

        {/* Form */}
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
            <h2 className="text-2xl font-extrabold text-gray-900 mb-2">Send a Message</h2>
            <p className="text-sm text-gray-500 mb-7">Fill in the form below and we&apos;ll get back to you as soon as possible.</p>

            <ContactForm />
          </div>
        </div>
      </section>
    </div>
  )
}
