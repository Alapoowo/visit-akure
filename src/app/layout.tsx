import type { Metadata } from 'next'
import './globals.css'
import ConditionalLayout from '@/components/layout/ConditionalLayout'
import { ToastProvider } from '@/context/ToastContext'
import { WishlistProvider } from '@/context/WishlistContext'

export const metadata: Metadata = {
  title: {
    default: 'Visit Akure — Hotels, Food, Shortlets, Services & More',
    template: '%s | Visit Akure',
  },
  description: 'Your gateway to the best of Akure, Ondo State. Find hotels, food, shortlets, services, health, shops, local markets and events. Connect with vendors directly on WhatsApp.',
  keywords: ['Akure', 'Ondo State', 'Nigeria tourism', 'Hotels Akure', 'Shortlets Akure', 'Food Akure', 'Visit Akure', 'things to do in Akure'],
  metadataBase: new URL('https://visitakure.com'),
  openGraph: {
    title: 'Visit Akure — Hotels, Food, Shortlets, Services & More',
    description: 'Your gateway to the best of Akure, Ondo State. Find hotels, food, shortlets, services, health, shops, local markets and events.',
    type: 'website',
    locale: 'en_NG',
    url: 'https://visitakure.com',
    siteName: 'Visit Akure',
    images: [{ url: '/VisitAkure.png', width: 1200, height: 630, alt: 'Visit Akure' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Visit Akure',
    description: "Discover Akure's best hotels, food, shortlets, services and more",
    images: ['/VisitAkure.png'],
  },
  robots: { index: true, follow: true },
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
      <body className="min-h-screen flex flex-col bg-gray-50">
        {/* Server-rendered splash — appears before any JS, CSS-animated away after 1.6s */}
        <div id="va-splash">
          <div style={{ position: 'relative', width: 300, height: 56, overflow: 'hidden' }}>
            <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 26, background: '#004840', borderRadius: 999 }} />
            <div style={{ position: 'absolute', bottom: 4, left: 0, right: 0, display: 'flex', gap: 14, padding: '0 20px' }}>
              {[1,2,3,4,5,6].map(i => (
                <div key={i} style={{ flex: 1, height: 2, background: 'rgba(255,255,255,0.15)', borderRadius: 999 }} />
              ))}
            </div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/loader.png"
              alt=""
              style={{ position: 'absolute', bottom: 8, left: 0, height: 36, objectFit: 'contain', animation: 'carDriveSplash 2.4s ease-in-out forwards' }}
            />
          </div>
          <p style={{ marginTop: 20, color: 'rgba(255,255,255,0.55)', fontSize: 11, fontWeight: 700, letterSpacing: '0.22em', textTransform: 'uppercase' }}>Visit Akure</p>
        </div>
        <WishlistProvider>
          <ToastProvider>
            <ConditionalLayout>{children}</ConditionalLayout>
          </ToastProvider>
        </WishlistProvider>
      </body>
    </html>
  )
}
