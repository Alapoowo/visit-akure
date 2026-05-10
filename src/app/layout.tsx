import type { Metadata } from 'next'
import './globals.css'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import MobileBottomNav from '@/components/layout/MobileBottomNav'
import { ToastProvider } from '@/context/ToastContext'
import { WishlistProvider } from '@/context/WishlistContext'

export const metadata: Metadata = {
  title: {
    default: 'Visit Akure — Discover Stays, Cars, Activities & Events',
    template: '%s | Visit Akure',
  },
  description: 'Your gateway to the best of Akure, Ondo State. Find hotels, car rentals, activities, events, services and products. Connect with vendors directly on WhatsApp.',
  keywords: ['Akure', 'Ondo State', 'Nigeria tourism', 'Hotels Akure', 'Car rental Akure'],
  openGraph: {
    title: 'Visit Akure',
    description: "Discover Akure's best stays, cars, activities and events",
    type: 'website',
    locale: 'en_NG',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen flex flex-col bg-gray-50 pb-16 md:pb-0">
        <WishlistProvider>
          <ToastProvider>
            <Navbar />
            <main className="flex-1 page-enter">
              {children}
            </main>
            <Footer />
            <MobileBottomNav />
          </ToastProvider>
        </WishlistProvider>
      </body>
    </html>
  )
}
