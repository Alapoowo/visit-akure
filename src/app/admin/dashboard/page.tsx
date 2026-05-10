'use client'

import {
  LayoutDashboard, ListChecks, CheckSquare, Store, Users,
  BarChart3, MessageCircle, CreditCard, Settings, Globe,
  TrendingUp, AlertCircle, BadgeCheck, Eye, Pencil, Trash2,
  Check, X, Search, Filter, ArrowUpRight
} from 'lucide-react'
import { useState } from 'react'
import { cn } from '@/lib/utils'
import Link from 'next/link'

const menuGroups = [
  {
    label: 'Main',
    items: [
      { icon: LayoutDashboard, label: 'Dashboard', id: 'dashboard' },
      { icon: ListChecks, label: 'Listings', id: 'listings' },
      { icon: CheckSquare, label: 'Approvals', id: 'approvals', badge: 5 },
      { icon: Store, label: 'Vendors', id: 'vendors' },
      { icon: Users, label: 'Users', id: 'users' },
    ]
  },
  {
    label: 'Analytics',
    items: [
      { icon: BarChart3, label: 'Analytics', id: 'analytics' },
      { icon: MessageCircle, label: 'WhatsApp Stats', id: 'wa-stats' },
    ]
  },
  {
    label: 'Settings',
    items: [
      { icon: CreditCard, label: 'Plans', id: 'plans' },
      { icon: Settings, label: 'Settings', id: 'settings' },
    ]
  }
]

const stats = [
  { icon: ListChecks, label: 'Total Listings', value: '487', change: '+23 this week', up: true },
  { icon: AlertCircle, label: 'Pending Approval', value: '5', change: 'Needs review', up: false, urgent: true },
  { icon: Store, label: 'Vendors', value: '214', change: '+8 this week', up: true },
  { icon: Users, label: 'Users', value: '3,842', change: '↑ 18%', up: true },
  { icon: MessageCircle, label: 'WA Clicks (mo)', value: '10.2k', change: '↑ 31%', up: true },
]

const pending = [
  { name: 'Royal Gardens Hotel', category: 'Stays', vendor: 'Emeka Okafor', date: '10 May 2026', plan: 'Featured' },
  { name: 'Akure Speedboat Tours', category: 'Activities', vendor: 'Biodun Lawal', date: '9 May 2026', plan: 'Verified' },
  { name: 'Premium Camry Rentals', category: 'Cars', vendor: 'Chidi Nweke', date: '9 May 2026', plan: 'Basic' },
]

const allListings = [
  { name: 'Toyota Camry, 2014', category: 'Cars', vendor: 'Ajibola Soile', price: '₦100k/day', status: 'active', featured: true },
  { name: 'De Hills Hotel & Resort', category: 'Stays', vendor: 'Ajibola Soile', price: '₦45k/night', status: 'active', featured: true },
  { name: 'Idanre Hills Trekking Tour', category: 'Activities', vendor: 'Tunde Adeyemi', price: '₦8k/person', status: 'active', featured: false },
  { name: 'Lexus RX 350, 2018', category: 'Cars', vendor: 'Kunle Adeyemi', price: '₦180k/day', status: 'active', featured: false },
]

export default function AdminDashboard() {
  const [active, setActive] = useState('dashboard')
  const [approved, setApproved] = useState<Record<number, boolean | null>>({})

  return (
    <div className="flex min-h-[calc(100vh-64px)]">
      {/* Sidebar */}
      <aside className="w-[180px] flex-shrink-0 bg-[#005F56] py-5 px-2.5">
        <div className="text-base font-extrabold text-white px-2 mb-5">
          VISIT<span className="text-[#F4C300]">AKURE</span>
          <div className="text-[10px] font-normal text-white/40 mt-0.5">Admin Panel</div>
        </div>
        {menuGroups.map(group => (
          <div key={group.label} className="mb-4">
            <div className="text-[10px] font-bold text-white/40 uppercase tracking-wider px-2 mb-1">{group.label}</div>
            {group.items.map(({ icon: Icon, label, id, badge }) => (
              <button
                key={id}
                onClick={() => setActive(id)}
                className={cn(
                  'w-full flex items-center gap-2.5 px-2.5 py-2 rounded-xl text-xs font-semibold transition-all text-left mb-0.5',
                  active === id ? 'bg-white/18 text-white' : 'text-white/60 hover:bg-white/10 hover:text-white'
                )}
              >
                <Icon size={15} />
                <span className="flex-1">{label}</span>
                {badge && (
                  <span className="bg-[#D62839] text-white text-[9px] font-bold px-1.5 py-0.5 rounded-full">
                    {badge}
                  </span>
                )}
              </button>
            ))}
          </div>
        ))}
        <div className="border-t border-white/10 pt-3 mt-2">
          <Link href="/" className="flex items-center gap-2.5 px-2.5 py-2 rounded-xl text-xs font-semibold text-white/60 hover:bg-white/10 hover:text-white transition-all">
            <Globe size={15} /> View Site
          </Link>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 bg-gray-50 p-7 overflow-auto">
        <div className="max-w-6xl">
          <h1 className="text-xl font-extrabold text-gray-900 mb-1">Admin Dashboard</h1>
          <p className="text-sm text-gray-500 mb-7">Platform overview · Visit Akure</p>

          {/* Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 mb-7">
            {stats.map(({ icon: Icon, label, value, change, up, urgent }) => (
              <div key={label} className={cn('bg-white rounded-2xl border p-4', urgent ? 'border-red-200 bg-red-50/30' : 'border-gray-100')}>
                <div className="flex items-center justify-between mb-2">
                  <div className={cn('w-8 h-8 rounded-lg flex items-center justify-center', urgent ? 'bg-red-100' : 'bg-[#e6f2f1]')}>
                    <Icon size={15} className={urgent ? 'text-[#D62839]' : 'text-[#005F56]'} />
                  </div>
                  {up && !urgent && <ArrowUpRight size={13} className="text-green-500" />}
                </div>
                <div className={cn('text-xl font-extrabold mb-0.5', urgent ? 'text-[#D62839]' : 'text-gray-900')}>{value}</div>
                <div className="text-[11px] text-gray-400">{label}</div>
                <div className={cn('text-[11px] font-semibold mt-0.5', urgent ? 'text-[#D62839]' : up ? 'text-green-600' : 'text-gray-400')}>{change}</div>
              </div>
            ))}
          </div>

          {/* Pending Approvals */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm mb-6">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
              <h2 className="font-extrabold text-gray-900 flex items-center gap-2">
                Pending Approvals
                <span className="bg-[#D62839] text-white text-[10px] font-bold px-2 py-0.5 rounded-full">5 pending</span>
              </h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-50 bg-gray-50/50">
                    {['Business', 'Category', 'Vendor', 'Submitted', 'Plan', 'Actions'].map(h => (
                      <th key={h} className="text-left px-6 py-3 text-[11px] font-bold text-gray-400 uppercase tracking-wider">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {pending.map((row, i) => (
                    <tr key={i} className={cn('border-b border-gray-50 hover:bg-gray-50/50 transition-colors', approved[i] === false && 'opacity-40')}>
                      <td className="px-6 py-3.5 font-semibold text-gray-800">{row.name}</td>
                      <td className="px-6 py-3.5 text-gray-500">{row.category}</td>
                      <td className="px-6 py-3.5 text-gray-600">{row.vendor}</td>
                      <td className="px-6 py-3.5 text-gray-400">{row.date}</td>
                      <td className="px-6 py-3.5">
                        <span className={cn(
                          'inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-bold',
                          row.plan === 'Featured' ? 'bg-yellow-50 text-yellow-700' :
                          row.plan === 'Verified' ? 'bg-[#e6f2f1] text-[#005F56]' :
                          'bg-gray-100 text-gray-500'
                        )}>
                          {row.plan}
                        </span>
                      </td>
                      <td className="px-6 py-3.5">
                        {approved[i] === true ? (
                          <span className="flex items-center gap-1 text-green-600 text-xs font-bold"><BadgeCheck size={13} /> Approved</span>
                        ) : approved[i] === false ? (
                          <span className="flex items-center gap-1 text-red-500 text-xs font-bold"><X size={13} /> Rejected</span>
                        ) : (
                          <div className="flex items-center gap-2">
                            <button onClick={() => setApproved(prev => ({...prev, [i]: true}))}
                              className="flex items-center gap-1 px-3 py-1.5 border-2 border-green-500 text-green-600 rounded-lg text-[11px] font-bold hover:bg-green-50 transition-all">
                              <Check size={12} /> Approve
                            </button>
                            <button onClick={() => setApproved(prev => ({...prev, [i]: false}))}
                              className="flex items-center gap-1 px-3 py-1.5 border-2 border-red-400 text-red-500 rounded-lg text-[11px] font-bold hover:bg-red-50 transition-all">
                              <X size={12} /> Reject
                            </button>
                          </div>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* All Listings */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 gap-4 flex-wrap">
              <h2 className="font-extrabold text-gray-900">All Listings</h2>
              <div className="flex items-center gap-2">
                <div className="relative">
                  <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input placeholder="Search listings..." className="pl-8 pr-4 py-2 border border-gray-200 rounded-xl text-sm outline-none focus:border-[#005F56] transition-colors w-48" />
                </div>
                <select className="px-3 py-2 border border-gray-200 rounded-xl text-sm bg-white outline-none focus:border-[#005F56] transition-colors">
                  <option>All Categories</option>
                  <option>Stays</option>
                  <option>Cars</option>
                  <option>Activities</option>
                </select>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-50 bg-gray-50/50">
                    {['Listing', 'Category', 'Vendor', 'Price', 'Status', 'Featured', 'Actions'].map(h => (
                      <th key={h} className="text-left px-6 py-3 text-[11px] font-bold text-gray-400 uppercase tracking-wider">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {allListings.map((row, i) => (
                    <tr key={i} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                      <td className="px-6 py-3.5 font-semibold text-gray-800">{row.name}</td>
                      <td className="px-6 py-3.5 text-gray-500">{row.category}</td>
                      <td className="px-6 py-3.5 text-gray-600">{row.vendor}</td>
                      <td className="px-6 py-3.5 text-gray-600">{row.price}</td>
                      <td className="px-6 py-3.5">
                        <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-bold bg-green-50 text-green-700">
                          ● Active
                        </span>
                      </td>
                      <td className="px-6 py-3.5">
                        {row.featured
                          ? <span className="text-[#005F56] font-bold text-xs flex items-center gap-1"><BadgeCheck size={13} /> Yes</span>
                          : <span className="text-gray-300 text-xs">No</span>}
                      </td>
                      <td className="px-6 py-3.5">
                        <div className="flex items-center gap-2">
                          <button className="p-1.5 rounded-lg hover:bg-[#e6f2f1] text-[#005F56] transition-all" title="View"><Eye size={14} /></button>
                          <button className="p-1.5 rounded-lg hover:bg-blue-50 text-blue-500 transition-all" title="Edit"><Pencil size={14} /></button>
                          <button className="p-1.5 rounded-lg hover:bg-red-50 text-red-500 transition-all" title="Delete"><Trash2 size={14} /></button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
