'use client'

import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import Navbar from './Navbar'
import Footer from './Footer'
import MobileBottomNav from './MobileBottomNav'
import { getSiteSettings, SiteSettings } from '@/lib/siteSettings'

function MaintenancePage() {
  return (
    <div className="min-h-screen bg-[#005F56] flex flex-col items-center justify-center text-center px-6">
      <div className="mb-6 text-6xl">🔧</div>
      <h1 className="text-3xl font-extrabold text-white mb-3">We&apos;ll be back soon</h1>
      <p className="text-white/70 text-base max-w-sm leading-relaxed">
        Visit Akure is currently undergoing scheduled maintenance. Please check back shortly.
      </p>
      <p className="text-white/40 text-sm mt-6">— The Visit Akure Team</p>
    </div>
  )
}

export default function ConditionalLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isAdmin = pathname.startsWith('/admin')
  const [settings, setSettings] = useState<SiteSettings | null>(null)

  useEffect(() => {
    getSiteSettings().then(setSettings)
  }, [])

  const mobileNavOn = settings === null ? true : settings.mobile_nav_enabled
  const maintenance = settings !== null && settings.maintenance_mode

  if (!isAdmin && maintenance) {
    return <MaintenancePage />
  }

  return (
    <>
      {!isAdmin && <Navbar />}
      <main className={`flex-1 page-enter${!isAdmin ? ' pb-16 md:pb-0' : ''}`}>
        {children}
      </main>
      {!isAdmin && <Footer />}
      {!isAdmin && mobileNavOn && <MobileBottomNav />}
    </>
  )
}
