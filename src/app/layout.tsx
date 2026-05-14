import type { Metadata } from 'next'
import './globals.css'
import ConditionalLayout from '@/components/layout/ConditionalLayout'
import { ToastProvider } from '@/context/ToastContext'
import { WishlistProvider } from '@/context/WishlistContext'
import LoadingScreen from '@/components/LoadingScreen'

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
        <LoadingScreen />
        <WishlistProvider>
          <ToastProvider>
            <ConditionalLayout>{children}</ConditionalLayout>
          </ToastProvider>
        </WishlistProvider>
      </body>
    </html>
  )
}
