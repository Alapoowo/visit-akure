'use client'

import { useEffect, useState } from 'react'

export default function LoadingScreen() {
  const [visible, setVisible] = useState(false)
  const [fading, setFading] = useState(false)

  useEffect(() => {
    if (sessionStorage.getItem('va_loaded')) return
    sessionStorage.setItem('va_loaded', '1')
    setVisible(true)
    const fadeTimer = setTimeout(() => setFading(true), 1400)
    const hideTimer = setTimeout(() => setVisible(false), 1900)
    return () => { clearTimeout(fadeTimer); clearTimeout(hideTimer) }
  }, [])

  if (!visible) return null

  return (
    <div
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#005F56] transition-opacity duration-500"
      style={{ opacity: fading ? 0 : 1 }}
    >
      {/* Road + Car */}
      <div className="relative w-72 sm:w-96 h-16 flex items-end overflow-hidden">
        <div className="absolute bottom-0 left-0 right-0 h-7 bg-[#004840] rounded-full" />
        <div className="absolute bottom-3 left-0 right-0 flex gap-3 px-6">
          {Array.from({ length: 7 }).map((_, i) => (
            <div key={i} className="flex-1 h-0.5 bg-white/20 rounded-full" />
          ))}
        </div>
        <div className="absolute bottom-3.5 car-drive">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/loader.png" alt="" className="h-9 w-auto object-contain" />
        </div>
      </div>

      <p className="mt-5 text-white/60 text-xs font-bold tracking-[0.25em] uppercase">Visit Akure</p>

      <style>{`
        @keyframes carDrive {
          0%   { transform: translateX(-64px); opacity: 0; }
          10%  { opacity: 1; }
          90%  { opacity: 1; }
          100% { transform: translateX(340px); opacity: 0; }
        }
        .car-drive { animation: carDrive 1.5s ease-in-out forwards; left: 0; }
      `}</style>
    </div>
  )
}
