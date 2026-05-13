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
  keywords: ['Akure', 'Ondo State', 'Nigeria tourism', 'Hotels Akure', 'Shortlets Akure', 'Food Akure'],
  openGraph: {
    title: 'Visit Akure',
    description: "Discover Akure's best hotels, food, shortlets, services and more",
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
      <body className="min-h-screen flex flex-col bg-gray-50">
        <WishlistProvider>
          <ToastProvider>
            <ConditionalLayout>{children}</ConditionalLayout>
          </ToastProvider>
        </WishlistProvider>
      </body>
    </html>
  )
}
