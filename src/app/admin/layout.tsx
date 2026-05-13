import Link from 'next/link'
import { Settings, Shield } from 'lucide-react'

export const metadata = {
  title: {
    default: 'Admin — Visit Akure',
    template: '%s | Admin — Visit Akure',
  },
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-950">
      {/* Admin top bar */}
      <div className="bg-gray-900 border-b border-gray-800 h-14 flex items-center px-6 sticky top-0 z-50">
        <Link href="/admin/dashboard" className="flex items-center gap-2 mr-auto">
          <div className="w-7 h-7 bg-[#005F56] rounded-lg flex items-center justify-center flex-shrink-0">
            <Shield size={14} className="text-white" />
          </div>
          <div>
            <span className="text-white font-extrabold text-sm">VISIT AKURE</span>
            <span className="text-gray-500 text-xs ml-2">Admin</span>
          </div>
        </Link>
        <Link href="/" className="text-xs font-semibold text-gray-500 hover:text-gray-300 transition-colors">
          ← Back to site
        </Link>
        <div className="w-px bg-gray-700 mx-4 h-5" />
        <button className="text-gray-400 hover:text-gray-200 transition-colors">
          <Settings size={16} />
        </button>
      </div>
      {children}
    </div>
  )
}
