'use client'

import Link from 'next/link'
import {
  LayoutDashboard, ListChecks, BarChart3, MessageCircle,
  Crown, Settings, Globe, Plus, Eye, Pencil, Trash2,
  TrendingUp, Users, Star, MessageSquare, ChevronRight,
  BadgeCheck, ArrowUpRight
} from 'lucide-react'
import { useState } from 'react'
import { cn } from '@/lib/utils'

const menuItems = [
  { icon: LayoutDashboard, label: 'Dashboard', id: 'dashboard' },
  { icon: ListChecks, label: 'My Listings', id: 'listings' },
  { icon: BarChart3, label: 'Analytics', id: 'analytics' },
  { icon: MessageCircle, label: 'WhatsApp Leads', id: 'leads' },
  { icon: Crown, label: 'Upgrade Plan', id: 'upgrade' },
]

const listings = [
  { title: 'Toyota Camry, 2014', category: 'Cars', price: '₦100,000/day', views: 842, clicks: 67, status: 'active' },
  { title: 'De Hills Executive Suite', category: 'Stays', price: '₦45,000/night', views: 1204, clicks: 98, status: 'active' },
  { title: 'Idanre Hills Tour Guide', category: 'Activities', price: '₦8,000/person', views: 312, clicks: 42, status: 'pending' },
]

const stats = [
  { icon: ListChecks, label: 'Active Listings', value: '3', change: '+1 this month', up: true },
  { icon: MessageCircle, label: 'WhatsApp Clicks', value: '247', change: '↑ 24% vs last week', up: true },
  { icon: Eye, label: 'Profile Views', value: '1,840', change: '↑ 12% vs last week', up: true },
  { icon: Star, label: 'Avg. Rating', value: '4.8★', change: 'Based on 24 reviews', up: true },
]

export default function VendorDashboard() {
  const [active, setActive] = useState('dashboard')

  return (
    <div className="flex min-h-[calc(100vh-64px)]">
      {/* Sidebar */}
      <aside className="w-[200px] flex-shrink-0 bg-white border-r border-gray-100 py-5 px-3">
        {/* Vendor info */}
        <div className="flex items-center gap-2.5 px-2 mb-5">
          <div className="w-9 h-9 rounded-full bg-[#e6f2f1] flex items-center justify-center text-[#005F56] font-bold text-sm flex-shrink-0">
            AJ
          </div>
          <div className="min-w-0">
            <div className="text-sm font-bold text-gray-800 truncate">Ajibola Soile</div>
            <div className="text-xs text-gray-400 flex items-center gap-1">
              <BadgeCheck size={11} className="text-[#005F56]" /> Verified vendor
            </div>
          </div>
        </div>

        <nav className="space-y-0.5">
          {menuItems.map(({ icon: Icon, label, id }) => (
            <button
              key={id}
              onClick={() => setActive(id)}
              className={cn(
                'w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm font-semibold transition-all text-left',
                active === id ? 'bg-[#e6f2f1] text-[#005F56]' : 'text-gray-500 hover:bg-gray-50 hover:text-gray-700'
              )}
            >
              <Icon size={17} />
              {label}
            </button>
          ))}
          <div className="pt-3 mt-2 border-t border-gray-100 space-y-0.5">
            <button className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm font-semibold text-gray-500 hover:bg-gray-50 hover:text-gray-700 transition-all">
              <Settings size={17} /> Settings
            </button>
            <Link href="/" className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm font-semibold text-gray-500 hover:bg-gray-50 hover:text-gray-700 transition-all">
              <Globe size={17} /> View Site
            </Link>
          </div>
        </nav>
      </aside>

      {/* Main */}
      <main className="flex-1 bg-gray-50 p-7 overflow-auto">
        <div className="max-w-5xl">
          <h1 className="text-xl font-extrabold text-gray-900 mb-1">Good morning, Ajibola 👋</h1>
          <p className="text-sm text-gray-500 mb-7">Here&apos;s how your listings are performing this week</p>

          {/* Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-7">
            {stats.map(({ icon: Icon, label, value, change, up }) => (
              <div key={label} className="bg-white rounded-2xl border border-gray-100 p-5">
                <div className="flex items-center justify-between mb-3">
                  <div className="w-9 h-9 bg-[#e6f2f1] rounded-xl flex items-center justify-center">
                    <Icon size={18} className="text-[#005F56]" />
                  </div>
                  {up && <ArrowUpRight size={15} className="text-green-500" />}
                </div>
                <div className="text-2xl font-extrabold text-gray-900 mb-0.5">{value}</div>
                <div className="text-xs text-gray-500">{label}</div>
                <div className={cn('text-xs font-semibold mt-1', up ? 'text-green-600' : 'text-gray-400')}>{change}</div>
              </div>
            ))}
          </div>

          {/* Listings table */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm mb-6">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
              <h2 className="font-extrabold text-gray-900">My Listings</h2>
              <Link href="/onboard" className="flex items-center gap-1.5 px-4 py-2 bg-[#005F56] text-white text-xs font-bold rounded-xl hover:bg-[#004840] transition-all">
                <Plus size={14} /> Add New Listing
              </Link>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-50">
                    {['Listing', 'Category', 'Price', 'Views', 'WA Clicks', 'Status', 'Actions'].map(h => (
                      <th key={h} className="text-left px-6 py-3 text-[11px] font-bold text-gray-400 uppercase tracking-wider bg-gray-50/50">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {listings.map((l, i) => (
                    <tr key={i} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                      <td className="px-6 py-4 font-semibold text-gray-800">{l.title}</td>
                      <td className="px-6 py-4 text-gray-500">{l.category}</td>
                      <td className="px-6 py-4 text-gray-600">{l.price}</td>
                      <td className="px-6 py-4 text-gray-600">{l.views.toLocaleString()}</td>
                      <td className="px-6 py-4">
                        <span className="flex items-center gap-1 text-[#25D366] font-semibold">
                          <MessageSquare size={13} /> {l.clicks}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className={cn(
                          'inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-bold',
                          l.status === 'active' ? 'bg-green-50 text-green-700' : 'bg-yellow-50 text-yellow-700'
                        )}>
                          {l.status === 'active' ? '● Active' : '◐ Pending'}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <button className="p-1.5 rounded-lg hover:bg-[#e6f2f1] text-[#005F56] transition-all" title="View">
                            <Eye size={14} />
                          </button>
                          <button className="p-1.5 rounded-lg hover:bg-blue-50 text-blue-600 transition-all" title="Edit">
                            <Pencil size={14} />
                          </button>
                          <button className="p-1.5 rounded-lg hover:bg-red-50 text-red-500 transition-all" title="Delete">
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Upgrade banner */}
          <div className="bg-[#005F56] rounded-2xl p-6 flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2 text-white font-bold text-base mb-1">
                <Crown size={18} className="text-[#F4C300]" /> Upgrade to Featured
              </div>
              <p className="text-white/65 text-sm">Get homepage placement and 3× more WhatsApp leads.</p>
            </div>
            <button className="flex items-center gap-2 bg-[#F4C300] text-gray-900 font-bold px-5 py-2.5 rounded-xl hover:bg-yellow-400 transition-all text-sm flex-shrink-0">
              Upgrade — ₦15,000/mo <ChevronRight size={15} />
            </button>
          </div>
        </div>
      </main>
    </div>
  )
}
