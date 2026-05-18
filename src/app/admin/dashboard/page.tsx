'use client'

import {
  LayoutDashboard, ListChecks, CheckSquare, Store, Users,
  BarChart3, MessageCircle, CreditCard, Settings, Globe,
  ArrowUpRight, BadgeCheck, Eye, Pencil, Trash2,
  Check, X, Search, TrendingUp, Zap, Star, ToggleLeft, ToggleRight,
  Hotel, Utensils, Building2, Wrench, HeartPulse, ShoppingBag,
  ShoppingCart, CalendarDays, Bell, Save, LogOut, Mail, Lock, Menu,
} from 'lucide-react'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import Image from 'next/image'
import { supabase } from '@/lib/supabase'
import { getSiteSettings, saveSiteSettings } from '@/lib/siteSettings'

// ─── Sidebar config ─────────────────────────────────────────────────────────
const menuGroups = [
  {
    label: 'Main',
    items: [
      { icon: LayoutDashboard, label: 'Dashboard', id: 'dashboard' },
      { icon: ListChecks,      label: 'Listings',  id: 'listings' },
      { icon: CheckSquare,     label: 'Approvals', id: 'approvals', badge: 3 },
      { icon: Store,           label: 'Vendors',   id: 'vendors' },
    ]
  },
  {
    label: 'Analytics',
    items: [
      { icon: BarChart3,      label: 'Analytics',      id: 'analytics' },
      { icon: MessageCircle,  label: 'WhatsApp Stats', id: 'wa-stats' },
    ]
  },
  {
    label: 'Config',
    items: [
      { icon: CreditCard, label: 'Plans',    id: 'plans' },
      { icon: Settings,   label: 'Settings', id: 'settings' },
    ]
  }
]

// ─── Mock data ───────────────────────────────────────────────────────────────
const stats = [
  { icon: ListChecks,    label: 'Total Listings',  value: '124', change: '+12 this week', up: true },
  { icon: CheckSquare,   label: 'Pending',          value: '3',   change: 'Needs review',  up: false, urgent: true },
  { icon: Store,         label: 'Vendors',          value: '58',  change: '+4 this week',  up: true },
  { icon: Users,         label: 'Users',            value: '1,842', change: '↑ 18%',      up: true },
  { icon: MessageCircle, label: 'WA Clicks (mo)',   value: '8.4k', change: '↑ 31%',       up: true },
]

const pendingListings = [
  { name: 'Royal Gardens Hotel',      category: 'Hotels',   vendor: 'Emeka Okafor',  date: '10 May 2026', plan: 'Featured' },
  { name: 'Mama Cee Kitchen',         category: 'Foods',    vendor: 'Cynthia Adeola', date: '10 May 2026', plan: 'Basic' },
  { name: "Ore's Premium Shortlet",   category: 'Shortlets', vendor: 'Ore Adeyemi',   date: '9 May 2026',  plan: 'Verified' },
]

const allListings = [
  { name: 'De Hills Hotel & Resort', category: 'Hotels',    vendor: 'Ajibola Soile',  price: '₦45k/night', status: 'active', featured: true },
  { name: 'The Grill House Akure',   category: 'Foods',     vendor: 'Tunde Adeyemi',  price: '₦3k–₦15k',   status: 'active', featured: true },
  { name: 'Cozy Studio Apartment',   category: 'Shortlets', vendor: 'Kunle Adeyemi',  price: '₦35k/night', status: 'active', featured: false },
  { name: 'Akure Tech Repairs',      category: 'Services',  vendor: 'Chidi Nweke',    price: 'Chat only',  status: 'active', featured: false },
  { name: 'Healing Touch Pharmacy',  category: 'Health',    vendor: 'Dr. Sola Bello', price: 'Chat only',  status: 'active', featured: true },
  { name: 'Fashionista Boutique',    category: 'Shops',     vendor: 'Nike Williams',  price: 'Chat only',  status: 'pending', featured: false },
  { name: 'Oja Oba Market Stalls',   category: 'Local Market', vendor: 'Adunola P.', price: 'Chat only',  status: 'active', featured: false },
  { name: 'Akure Music Festival',    category: 'Events',    vendor: 'Festive Ltd',    price: '₦5k/ticket', status: 'active', featured: true },
]

const categoryIcons: Record<string, React.ElementType> = {
  'Hotels': Hotel, 'Foods': Utensils, 'Shortlets': Building2,
  'Services': Wrench, 'Health': HeartPulse, 'Shops': ShoppingBag,
  'Local Market': ShoppingCart, 'Events': CalendarDays,
}

const NEW_CATEGORIES = ['Hotels', 'Foods', 'Shortlets', 'Services', 'Health', 'Shops', 'Local Market', 'Events']

const categoryStats = [
  { label: 'Hotels',      count: 18, icon: Hotel,        color: 'bg-teal-50 text-teal-700' },
  { label: 'Foods',       count: 24, icon: Utensils,     color: 'bg-orange-50 text-orange-700' },
  { label: 'Shortlets',   count: 15, icon: Building2,    color: 'bg-blue-50 text-blue-700' },
  { label: 'Services',    count: 22, icon: Wrench,       color: 'bg-purple-50 text-purple-700' },
  { label: 'Health',      count: 11, icon: HeartPulse,   color: 'bg-red-50 text-red-700' },
  { label: 'Shops',       count: 19, icon: ShoppingBag,  color: 'bg-amber-50 text-amber-700' },
  { label: 'Local Market',count: 9,  icon: ShoppingCart, color: 'bg-green-50 text-green-700' },
  { label: 'Events',      count: 6,  icon: CalendarDays, color: 'bg-pink-50 text-pink-700' },
]

const plans = [
  { name: 'Basic',    price: 'Free',           period: '',         listings: 1, features: ['Business profile', 'Photos & contact details', 'Search visibility', 'WhatsApp CTA button'],                         color: 'border-gray-200' },
  { name: 'Verified', price: '₦5,000',         period: '',         listings: 1, features: ['Everything in Basic', 'Verified badge', 'Better visibility', 'Increased customer trust'],                           color: 'border-[#005F56]' },
  { name: 'Featured', price: '₦20,000',        period: '/per month', listings: 1, features: ['Everything in Verified', 'Featured placement', 'Priority visibility', 'Promotional exposure'],                   color: 'border-[#F4C300]' },
]

const waStats = [
  { label: 'Mon', clicks: 320 }, { label: 'Tue', clicks: 480 }, { label: 'Wed', clicks: 390 },
  { label: 'Thu', clicks: 610 }, { label: 'Fri', clicks: 740 }, { label: 'Sat', clicks: 580 },
  { label: 'Sun', clicks: 290 },
]
const maxClicks = Math.max(...waStats.map(d => d.clicks))

// ─── Sub-views ───────────────────────────────────────────────────────────────
function DashboardView() {
  const [approved, setApproved] = useState<Record<number, boolean | null>>({})
  return (
    <div>
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

      {/* Category breakdown */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm mb-6 p-5">
        <h2 className="font-extrabold text-gray-900 mb-4">Listings by Category</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {categoryStats.map(({ label, count, icon: Icon, color }) => (
            <div key={label} className={cn('flex items-center gap-3 rounded-xl p-3', color.split(' ')[0] + ' border border-transparent')}>
              <div className={cn('w-8 h-8 rounded-lg flex items-center justify-center', color)}>
                <Icon size={15} />
              </div>
              <div>
                <div className="font-extrabold text-sm text-gray-900">{count}</div>
                <div className="text-[11px] text-gray-500">{label}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Pending Approvals */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm mb-6">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <h2 className="font-extrabold text-gray-900 flex items-center gap-2">
            Pending Approvals
            <span className="bg-[#D62839] text-white text-[10px] font-bold px-2 py-0.5 rounded-full">{pendingListings.length} pending</span>
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
              {pendingListings.map((row, i) => {
                const Icon = categoryIcons[row.category] ?? ListChecks
                return (
                  <tr key={i} className={cn('border-b border-gray-50 hover:bg-gray-50/50 transition-colors', approved[i] === false && 'opacity-40')}>
                    <td className="px-6 py-3.5 font-semibold text-gray-800">{row.name}</td>
                    <td className="px-6 py-3.5">
                      <span className="inline-flex items-center gap-1.5 text-gray-500">
                        <Icon size={13} /> {row.category}
                      </span>
                    </td>
                    <td className="px-6 py-3.5 text-gray-600">{row.vendor}</td>
                    <td className="px-6 py-3.5 text-gray-400">{row.date}</td>
                    <td className="px-6 py-3.5">
                      <span className={cn(
                        'inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-bold',
                        row.plan === 'Featured' ? 'bg-yellow-50 text-yellow-700' :
                        row.plan === 'Verified' ? 'bg-[#e6f2f1] text-[#005F56]' : 'bg-gray-100 text-gray-500'
                      )}>{row.plan}</span>
                    </td>
                    <td className="px-6 py-3.5">
                      {approved[i] === true ? (
                        <span className="flex items-center gap-1 text-green-600 text-xs font-bold"><BadgeCheck size={13} /> Approved</span>
                      ) : approved[i] === false ? (
                        <span className="flex items-center gap-1 text-red-500 text-xs font-bold"><X size={13} /> Rejected</span>
                      ) : (
                        <div className="flex items-center gap-2">
                          <button onClick={() => setApproved(prev => ({ ...prev, [i]: true }))}
                            className="flex items-center gap-1 px-3 py-1.5 border-2 border-green-500 text-green-600 rounded-lg text-[11px] font-bold hover:bg-green-50 transition-all">
                            <Check size={12} /> Approve
                          </button>
                          <button onClick={() => setApproved(prev => ({ ...prev, [i]: false }))}
                            className="flex items-center gap-1 px-3 py-1.5 border-2 border-red-400 text-red-500 rounded-lg text-[11px] font-bold hover:bg-red-50 transition-all">
                            <X size={12} /> Reject
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

function ListingsView() {
  const [search, setSearch] = useState('')
  const [catFilter, setCatFilter] = useState('All')

  const filtered = allListings.filter(l =>
    (catFilter === 'All' || l.category === catFilter) &&
    l.name.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm">
      <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 gap-4 flex-wrap">
        <h2 className="font-extrabold text-gray-900">All Listings</h2>
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search listings..."
              className="pl-8 pr-4 py-2 border border-gray-200 rounded-xl text-sm outline-none focus:border-[#005F56] transition-colors w-48"
            />
          </div>
          <select
            value={catFilter}
            onChange={e => setCatFilter(e.target.value)}
            className="px-3 py-2 border border-gray-200 rounded-xl text-sm bg-white outline-none focus:border-[#005F56] transition-colors"
          >
            <option>All</option>
            {NEW_CATEGORIES.map(c => <option key={c}>{c}</option>)}
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
            {filtered.map((row, i) => {
              const Icon = categoryIcons[row.category] ?? ListChecks
              return (
                <tr key={i} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                  <td className="px-6 py-3.5 font-semibold text-gray-800">{row.name}</td>
                  <td className="px-6 py-3.5">
                    <span className="inline-flex items-center gap-1.5 text-gray-500"><Icon size={13} /> {row.category}</span>
                  </td>
                  <td className="px-6 py-3.5 text-gray-600">{row.vendor}</td>
                  <td className="px-6 py-3.5 text-gray-600">{row.price}</td>
                  <td className="px-6 py-3.5">
                    <span className={cn(
                      'inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-bold',
                      row.status === 'active' ? 'bg-green-50 text-green-700' : 'bg-yellow-50 text-yellow-700'
                    )}>● {row.status === 'active' ? 'Active' : 'Pending'}</span>
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
              )
            })}
            {filtered.length === 0 && (
              <tr><td colSpan={7} className="px-6 py-10 text-center text-gray-400 text-sm">No listings match your filter.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

type PendingListing = {
  id: string
  business_name: string
  category: string
  submitter_name: string | null
  created_at: string
  plan: string
  description: string | null
}

function ApprovalsView() {
  const [listings, setListings] = useState<PendingListing[]>([])
  const [loading, setLoading] = useState(true)
  const [actions, setActions] = useState<Record<string, 'approved' | 'rejected'>>({})

  useEffect(() => {
    supabase
      .from('listings')
      .select('id, business_name, category, submitter_name, created_at, plan, description')
      .eq('status', 'pending')
      .order('created_at', { ascending: false })
      .then(({ data }) => { setListings(data ?? []); setLoading(false) })
  }, [])

  const handleAction = async (id: string, status: 'approved' | 'rejected') => {
    const { error } = await supabase
      .from('listings')
      .update({ status, reviewed_at: new Date().toISOString() })
      .eq('id', id)
    if (!error) setActions(prev => ({ ...prev, [id]: status }))
  }

  const remaining = listings.filter(l => !actions[l.id])

  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-red-100 rounded-xl flex items-center justify-center">
          <CheckSquare size={18} className="text-[#D62839]" />
        </div>
        <div>
          <h2 className="font-extrabold text-gray-900">Pending Approvals</h2>
          <p className="text-sm text-gray-500">{remaining.length} listing{remaining.length !== 1 ? 's' : ''} awaiting review</p>
        </div>
      </div>

      {loading && (
        <div className="flex items-center justify-center py-16 text-gray-400 text-sm">Loading submissions…</div>
      )}

      {!loading && listings.length === 0 && (
        <div className="bg-white rounded-2xl border border-gray-100 p-14 text-center">
          <CheckSquare size={32} className="mx-auto mb-3 text-gray-200" />
          <p className="font-semibold text-gray-400">No pending submissions</p>
        </div>
      )}

      <div className="space-y-4">
        {listings.map(row => {
          const catKey = row.category.charAt(0).toUpperCase() + row.category.slice(1).replace(/-/g, ' ')
          const displayCat = catKey === 'Local market' ? 'Local Market' : catKey
          const Icon = categoryIcons[displayCat] ?? ListChecks
          const done = actions[row.id]
          return (
            <div key={row.id} className={cn('bg-white rounded-2xl border p-5 shadow-sm transition-opacity', done && 'opacity-50')}>
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <Icon size={15} className="text-[#005F56]" />
                    <span className="font-extrabold text-gray-900">{row.business_name}</span>
                    <span className={cn(
                      'inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold capitalize',
                      row.plan === 'featured' ? 'bg-yellow-50 text-yellow-700' :
                      row.plan === 'verified' ? 'bg-[#e6f2f1] text-[#005F56]' : 'bg-gray-100 text-gray-500'
                    )}>{row.plan}</span>
                  </div>
                  <p className="text-sm text-gray-500">
                    {displayCat} · {row.submitter_name ?? 'Unknown'} · Submitted {new Date(row.created_at).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
                  </p>
                  {row.description && (
                    <p className="text-xs text-gray-400 mt-1 line-clamp-1">{row.description}</p>
                  )}
                </div>
                <div className="flex-shrink-0">
                  {done === 'approved' ? (
                    <span className="flex items-center gap-1 text-green-600 text-sm font-bold"><BadgeCheck size={15} /> Approved</span>
                  ) : done === 'rejected' ? (
                    <span className="flex items-center gap-1 text-red-500 text-sm font-bold"><X size={15} /> Rejected</span>
                  ) : (
                    <div className="flex items-center gap-2">
                      <button onClick={() => handleAction(row.id, 'approved')}
                        className="flex items-center gap-1.5 px-4 py-2 bg-green-500 text-white rounded-xl text-sm font-bold hover:bg-green-600 transition-all">
                        <Check size={14} /> Approve
                      </button>
                      <button onClick={() => handleAction(row.id, 'rejected')}
                        className="flex items-center gap-1.5 px-4 py-2 bg-red-100 text-red-600 rounded-xl text-sm font-bold hover:bg-red-200 transition-all">
                        <X size={14} /> Reject
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

function VendorsView() {
  const vendors = [
    { name: 'Ajibola Soile',  listings: 2, plan: 'Featured', joined: 'Jan 2026', wa: '+234 812 000 0001' },
    { name: 'Tunde Adeyemi',  listings: 1, plan: 'Basic',    joined: 'Feb 2026', wa: '+234 812 000 0002' },
    { name: 'Kunle Adeyemi',  listings: 1, plan: 'Verified', joined: 'Mar 2026', wa: '+234 812 000 0003' },
    { name: 'Dr. Sola Bello', listings: 1, plan: 'Verified', joined: 'Apr 2026', wa: '+234 812 000 0004' },
    { name: 'Nike Williams',  listings: 1, plan: 'Basic',    joined: 'Apr 2026', wa: '+234 812 000 0005' },
    { name: 'Festive Ltd',    listings: 1, plan: 'Featured', joined: 'May 2026', wa: '+234 812 000 0006' },
  ]
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm">
      <div className="px-6 py-4 border-b border-gray-100">
        <h2 className="font-extrabold text-gray-900">Vendors</h2>
        <p className="text-sm text-gray-500 mt-0.5">{vendors.length} registered vendors</p>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-50 bg-gray-50/50">
              {['Vendor', 'Listings', 'Plan', 'WhatsApp', 'Joined', 'Actions'].map(h => (
                <th key={h} className="text-left px-6 py-3 text-[11px] font-bold text-gray-400 uppercase tracking-wider">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {vendors.map((v, i) => (
              <tr key={i} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                <td className="px-6 py-3.5 font-semibold text-gray-800">{v.name}</td>
                <td className="px-6 py-3.5 text-gray-600">{v.listings}</td>
                <td className="px-6 py-3.5">
                  <span className={cn(
                    'inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-bold',
                    v.plan === 'Featured' ? 'bg-yellow-50 text-yellow-700' :
                    v.plan === 'Verified' ? 'bg-[#e6f2f1] text-[#005F56]' : 'bg-gray-100 text-gray-500'
                  )}>{v.plan}</span>
                </td>
                <td className="px-6 py-3.5 text-gray-500 font-mono text-xs">{v.wa}</td>
                <td className="px-6 py-3.5 text-gray-400">{v.joined}</td>
                <td className="px-6 py-3.5">
                  <div className="flex items-center gap-2">
                    <button className="p-1.5 rounded-lg hover:bg-[#e6f2f1] text-[#005F56] transition-all" title="View"><Eye size={14} /></button>
                    <button className="p-1.5 rounded-lg hover:bg-red-50 text-red-500 transition-all" title="Remove"><Trash2 size={14} /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

function AnalyticsView() {
  const monthlyData = [
    { month: 'Dec', listings: 68, vendors: 32 },
    { month: 'Jan', listings: 78, vendors: 38 },
    { month: 'Feb', listings: 88, vendors: 42 },
    { month: 'Mar', listings: 95, vendors: 47 },
    { month: 'Apr', listings: 110, vendors: 52 },
    { month: 'May', listings: 124, vendors: 58 },
  ]
  const maxListings = Math.max(...monthlyData.map(d => d.listings))

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          { icon: TrendingUp, label: 'Growth Rate', value: '+31%', sub: 'vs last month', color: 'text-green-600 bg-green-50' },
          { icon: Star,       label: 'Avg. Rating', value: '4.7',  sub: 'across all listings', color: 'text-yellow-600 bg-yellow-50' },
          { icon: Zap,        label: 'WhatsApp CTR', value: '68%', sub: 'click-through rate', color: 'text-blue-600 bg-blue-50' },
        ].map(({ icon: Icon, label, value, sub, color }) => (
          <div key={label} className="bg-white rounded-2xl border border-gray-100 p-5">
            <div className={cn('w-10 h-10 rounded-xl flex items-center justify-center mb-3', color.split(' ')[1])}>
              <Icon size={18} className={color.split(' ')[0]} />
            </div>
            <div className="text-2xl font-extrabold text-gray-900 mb-0.5">{value}</div>
            <div className="text-sm font-semibold text-gray-700">{label}</div>
            <div className="text-xs text-gray-400 mt-0.5">{sub}</div>
          </div>
        ))}
      </div>

      {/* Listings growth chart */}
      <div className="bg-white rounded-2xl border border-gray-100 p-6">
        <h3 className="font-extrabold text-gray-900 mb-5">Listings Growth (6 months)</h3>
        <div className="flex items-end gap-3 h-36">
          {monthlyData.map(({ month, listings }) => (
            <div key={month} className="flex-1 flex flex-col items-center gap-1.5">
              <span className="text-xs font-bold text-gray-700">{listings}</span>
              <div
                className="w-full bg-[#005F56] rounded-t-lg transition-all"
                style={{ height: `${(listings / maxListings) * 100}%` }}
              />
              <span className="text-[11px] text-gray-400">{month}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Category performance */}
      <div className="bg-white rounded-2xl border border-gray-100 p-6">
        <h3 className="font-extrabold text-gray-900 mb-5">Category Performance</h3>
        <div className="space-y-3">
          {categoryStats.map(({ label, count, icon: Icon }) => (
            <div key={label} className="flex items-center gap-3">
              <Icon size={14} className="text-gray-400 flex-shrink-0" />
              <span className="text-sm text-gray-600 w-28 flex-shrink-0">{label}</span>
              <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#005F56] rounded-full"
                  style={{ width: `${(count / 24) * 100}%` }}
                />
              </div>
              <span className="text-sm font-bold text-gray-700 w-6 text-right">{count}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function WAStatsView() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: 'Total Clicks', value: '8,412', change: '↑ 31%' },
          { label: 'Unique Sessions', value: '3,204', change: '↑ 22%' },
          { label: 'Top Category', value: 'Hotels', change: '2,140 clicks' },
          { label: 'Peak Day', value: 'Friday', change: '740 clicks' },
        ].map(({ label, value, change }) => (
          <div key={label} className="bg-white rounded-2xl border border-gray-100 p-4">
            <div className="w-8 h-8 bg-green-50 rounded-lg flex items-center justify-center mb-2">
              <MessageCircle size={15} className="text-[#25D366]" />
            </div>
            <div className="text-xl font-extrabold text-gray-900 mb-0.5">{value}</div>
            <div className="text-[11px] text-gray-400">{label}</div>
            <div className="text-[11px] font-semibold text-green-600 mt-0.5">{change}</div>
          </div>
        ))}
      </div>

      {/* Daily chart */}
      <div className="bg-white rounded-2xl border border-gray-100 p-6">
        <h3 className="font-extrabold text-gray-900 mb-1">WhatsApp Clicks — This Week</h3>
        <p className="text-sm text-gray-400 mb-5">Total clicks on "Chat on WhatsApp" buttons</p>
        <div className="flex items-end gap-3 h-36">
          {waStats.map(({ label, clicks }) => (
            <div key={label} className="flex-1 flex flex-col items-center gap-1.5">
              <span className="text-xs font-bold text-gray-700">{clicks}</span>
              <div
                className="w-full bg-[#25D366] rounded-t-lg"
                style={{ height: `${(clicks / maxClicks) * 100}%` }}
              />
              <span className="text-[11px] text-gray-400">{label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Top listings by WA clicks */}
      <div className="bg-white rounded-2xl border border-gray-100 p-6">
        <h3 className="font-extrabold text-gray-900 mb-4">Top Listings by WhatsApp Clicks</h3>
        <div className="space-y-3">
          {[
            { name: 'De Hills Hotel & Resort', clicks: 842, cat: 'Hotels' },
            { name: 'The Grill House Akure',   clicks: 631, cat: 'Foods' },
            { name: 'Healing Touch Pharmacy',  clicks: 518, cat: 'Health' },
            { name: 'Akure Music Festival',    clicks: 404, cat: 'Events' },
            { name: 'Cozy Studio Apartment',   clicks: 398, cat: 'Shortlets' },
          ].map(({ name, clicks, cat }, i) => (
            <div key={name} className="flex items-center gap-3">
              <span className="text-[11px] font-bold text-gray-300 w-4">{i + 1}</span>
              <div className="flex-1">
                <div className="text-sm font-semibold text-gray-800">{name}</div>
                <div className="text-[11px] text-gray-400">{cat}</div>
              </div>
              <span className="text-sm font-bold text-[#25D366]">{clicks}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function PlansView() {
  return (
    <div>
      <div className="mb-6">
        <h2 className="font-extrabold text-gray-900 mb-1">Subscription Plans</h2>
        <p className="text-sm text-gray-500">Manage the plans vendors can subscribe to</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-8">
        {plans.map(plan => (
          <div key={plan.name} className={cn('bg-white rounded-2xl border-2 p-6 shadow-sm', plan.color)}>
            <div className="flex items-center justify-between mb-3">
              <span className="font-extrabold text-gray-900 text-lg">{plan.name}</span>
              {plan.name === 'Featured' && <Star size={16} className="text-[#F4C300] fill-[#F4C300]" />}
              {plan.name === 'Verified' && <BadgeCheck size={16} className="text-[#005F56]" />}
            </div>
            <div className="flex items-baseline gap-1 mb-1">
              <span className="text-2xl font-extrabold text-gray-900">{plan.price}</span>
              {plan.period && <span className="text-xs text-gray-400">{plan.period}</span>}
            </div>
            <div className="text-xs text-gray-400 mb-4">1 listing per plan</div>
            <ul className="space-y-2 mb-5">
              {plan.features.map(f => (
                <li key={f} className="flex items-center gap-2 text-sm text-gray-600">
                  <Check size={13} className="text-[#005F56] flex-shrink-0" /> {f}
                </li>
              ))}
            </ul>
            <button className="w-full py-2.5 border-2 border-[#005F56] text-[#005F56] font-bold rounded-xl text-sm hover:bg-[#005F56] hover:text-white transition-all">
              Edit Plan
            </button>
          </div>
        ))}
      </div>

      {/* Active vendor subscriptions */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm">
        <div className="px-6 py-4 border-b border-gray-100">
          <h3 className="font-extrabold text-gray-900">Active Subscriptions</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-50 bg-gray-50/50">
                {['Vendor', 'Plan', 'Started', 'Renews', 'Status'].map(h => (
                  <th key={h} className="text-left px-6 py-3 text-[11px] font-bold text-gray-400 uppercase tracking-wider">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                { vendor: 'Ajibola Soile',  plan: 'Featured', started: 'Jan 2026', renews: 'Jun 2026', status: 'Active' },
                { vendor: 'Kunle Adeyemi',  plan: 'Verified', started: 'Mar 2026', renews: 'Jun 2026', status: 'Active' },
                { vendor: 'Dr. Sola Bello', plan: 'Verified', started: 'Apr 2026', renews: 'May 2026', status: 'Due' },
                { vendor: 'Festive Ltd',    plan: 'Featured', started: 'May 2026', renews: 'Jun 2026', status: 'Active' },
              ].map((row, i) => (
                <tr key={i} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                  <td className="px-6 py-3.5 font-semibold text-gray-800">{row.vendor}</td>
                  <td className="px-6 py-3.5">
                    <span className={cn(
                      'inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-bold',
                      row.plan === 'Featured' ? 'bg-yellow-50 text-yellow-700' : 'bg-[#e6f2f1] text-[#005F56]'
                    )}>{row.plan}</span>
                  </td>
                  <td className="px-6 py-3.5 text-gray-400">{row.started}</td>
                  <td className="px-6 py-3.5 text-gray-400">{row.renews}</td>
                  <td className="px-6 py-3.5">
                    <span className={cn(
                      'inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-bold',
                      row.status === 'Active' ? 'bg-green-50 text-green-700' : 'bg-orange-50 text-orange-700'
                    )}>● {row.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

function SettingsView() {
  const [mobileNavEnabled, setMobileNavEnabled] = useState(true)
  const [maintenanceMode, setMaintenanceMode] = useState(false)
  const [listingAlerts, setListingAlerts] = useState(true)
  const [settingsLoading, setSettingsLoading] = useState(true)
  const [saved, setSaved] = useState(false)
  const [saveError, setSaveError] = useState('')

  const [newEmail, setNewEmail] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [credMsg, setCredMsg] = useState('')
  const [credSaving, setCredSaving] = useState(false)

  useEffect(() => {
    getSiteSettings().then(s => {
      setMobileNavEnabled(s.mobile_nav_enabled)
      setMaintenanceMode(s.maintenance_mode)
      setListingAlerts(s.listing_alerts_enabled)
      setSettingsLoading(false)
    })
  }, [])

  const handleSave = async () => {
    setSaveError('')
    const { error } = await saveSiteSettings({
      mobile_nav_enabled: mobileNavEnabled,
      maintenance_mode: maintenanceMode,
      listing_alerts_enabled: listingAlerts,
    })
    if (error) { setSaveError(error); return }
    setSaved(true)
    setTimeout(() => setSaved(false), 2500)
  }

  const handleCredentialUpdate = async () => {
    setCredSaving(true)
    setCredMsg('')
    const updates: { email?: string; password?: string } = {}
    if (newEmail.trim()) updates.email = newEmail.trim()
    if (newPassword.trim()) {
      if (newPassword !== confirmPassword) {
        setCredMsg('Passwords do not match')
        setCredSaving(false)
        return
      }
      updates.password = newPassword
    }
    if (!updates.email && !updates.password) {
      setCredMsg('No changes entered')
      setCredSaving(false)
      return
    }
    const { error } = await supabase.auth.updateUser(updates)
    setCredSaving(false)
    if (error) { setCredMsg('Error: ' + error.message) }
    else {
      setCredMsg('Updated successfully!')
      setNewEmail(''); setNewPassword(''); setConfirmPassword('')
    }
  }

  return (
    <div className="max-w-2xl space-y-6">
      {/* Account Credentials */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm">
        <div className="px-6 py-4 border-b border-gray-100">
          <h3 className="font-extrabold text-gray-900">Account Credentials</h3>
          <p className="text-xs text-gray-400 mt-0.5">Leave a field blank to keep it unchanged</p>
        </div>
        <div className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1.5">New Email Address</label>
            <div className="relative">
              <Mail size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="email"
                value={newEmail}
                onChange={e => setNewEmail(e.target.value)}
                placeholder="Leave blank to keep current"
                className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm outline-none focus:border-[#005F56] transition-colors"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1.5">New Password</label>
            <div className="relative">
              <Lock size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="password"
                value={newPassword}
                onChange={e => setNewPassword(e.target.value)}
                placeholder="Leave blank to keep current"
                className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm outline-none focus:border-[#005F56] transition-colors"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1.5">Confirm New Password</label>
            <div className="relative">
              <Lock size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="password"
                value={confirmPassword}
                onChange={e => setConfirmPassword(e.target.value)}
                placeholder="Repeat new password"
                className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm outline-none focus:border-[#005F56] transition-colors"
              />
            </div>
          </div>
          {credMsg && (
            <p className={cn('text-sm font-semibold', credMsg.startsWith('Error') || credMsg === 'Passwords do not match' ? 'text-red-500' : 'text-green-600')}>
              {credMsg}
            </p>
          )}
          <button
            onClick={handleCredentialUpdate}
            disabled={credSaving}
            className="flex items-center gap-2 px-5 py-2.5 bg-[#005F56] text-white font-bold rounded-xl text-sm hover:bg-[#004a44] transition-all disabled:opacity-60"
          >
            <Save size={14} /> {credSaving ? 'Updating…' : 'Update Credentials'}
          </button>
        </div>
      </div>

      {/* General */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm">
        <div className="px-6 py-4 border-b border-gray-100">
          <h3 className="font-extrabold text-gray-900">General Settings</h3>
        </div>
        <div className="p-6">
          <p className="text-sm text-gray-500">Admin email for notifications is configured via the <code className="bg-gray-100 px-1.5 py-0.5 rounded text-xs">ADMIN_EMAIL</code> environment variable on your hosting platform.</p>
        </div>
      </div>

      {/* Toggles */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm">
        <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
          <h3 className="font-extrabold text-gray-900">Feature Toggles</h3>
          {settingsLoading && <span className="text-xs text-gray-400">Loading…</span>}
        </div>
        <div className="p-6 space-y-5">
          {[
            {
              id: 'mobileNav', label: 'Mobile Bottom Navigation',
              desc: 'Show the bottom tab bar on mobile devices',
              value: mobileNavEnabled, set: setMobileNavEnabled,
            },
            {
              id: 'maintenance', label: 'Maintenance Mode',
              desc: 'Show a maintenance page to all public visitors',
              value: maintenanceMode, set: setMaintenanceMode,
              warn: maintenanceMode,
            },
            {
              id: 'listingAlerts', label: 'New Listing Alerts',
              desc: 'Email admin when a new listing is submitted',
              value: listingAlerts, set: setListingAlerts,
            },
          ].map(({ id, label, desc, value, set, warn }) => (
            <div key={id} className={cn('flex items-center justify-between gap-4 rounded-xl p-3 -mx-3', warn ? 'bg-red-50 border border-red-100' : '')}>
              <div>
                <div className="text-sm font-bold text-gray-800">{label}</div>
                <div className="text-xs text-gray-400 mt-0.5">{desc}</div>
                {warn && <div className="text-xs text-red-500 font-semibold mt-1">⚠ Site is currently in maintenance mode</div>}
              </div>
              <button
                onClick={() => set((v: boolean) => !v)}
                disabled={settingsLoading}
                className={cn('flex-shrink-0 transition-colors', value ? 'text-[#005F56]' : 'text-gray-300', settingsLoading && 'opacity-40 cursor-not-allowed')}
                aria-label={`Toggle ${label}`}
              >
                {value ? <ToggleRight size={36} /> : <ToggleLeft size={36} />}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Report error */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm">
        <div className="px-6 py-4 border-b border-gray-100">
          <h3 className="font-extrabold text-gray-900 flex items-center gap-2">
            <Bell size={15} className="text-[#D62839]" /> Report an Error
          </h3>
        </div>
        <div className="p-6">
          <textarea
            rows={3}
            placeholder="Describe the issue you're experiencing..."
            className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm outline-none focus:border-[#005F56] transition-colors resize-none"
          />
          <button className="mt-3 flex items-center gap-2 px-5 py-2.5 bg-[#D62839] text-white font-bold rounded-xl text-sm hover:bg-red-700 transition-all">
            <Bell size={14} /> Send Report
          </button>
        </div>
      </div>

      {saveError && (
        <div className="px-4 py-3 bg-red-50 border border-red-200 rounded-xl text-sm text-red-600 font-semibold">
          {saveError}
        </div>
      )}
      <button
        onClick={handleSave}
        disabled={settingsLoading}
        className={cn(
          'flex items-center gap-2 px-8 py-3 font-bold rounded-2xl text-sm transition-all disabled:opacity-50',
          saved ? 'bg-green-500 text-white' : 'bg-[#005F56] text-white hover:bg-[#004a44]'
        )}
      >
        <Save size={15} />
        {saved ? '✓ Saved!' : 'Save Settings'}
      </button>
    </div>
  )
}

// ─── Root component ──────────────────────────────────────────────────────────
export default function AdminDashboard() {
  const [active, setActive] = useState('dashboard')
  const [authLoading, setAuthLoading] = useState(true)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const router = useRouter()

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) router.push('/admin/login')
      else setAuthLoading(false)
    })
  }, [router])

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/admin/login')
  }

  const handleNav = (id: string) => {
    setActive(id)
    setSidebarOpen(false)
  }

  if (authLoading) {
    return (
      <div className="flex min-h-[calc(100vh-64px)] items-center justify-center">
        <div className="text-gray-400 text-sm">Verifying access…</div>
      </div>
    )
  }

  const renderView = () => {
    switch (active) {
      case 'dashboard': return <DashboardView />
      case 'listings':  return <ListingsView />
      case 'approvals': return <ApprovalsView />
      case 'vendors':   return <VendorsView />
      case 'analytics': return <AnalyticsView />
      case 'wa-stats':  return <WAStatsView />
      case 'plans':     return <PlansView />
      case 'settings':  return <SettingsView />
      default:          return <DashboardView />
    }
  }

  const titles: Record<string, string> = {
    dashboard: 'Admin Dashboard',
    listings:  'All Listings',
    approvals: 'Pending Approvals',
    vendors:   'Vendors',
    analytics: 'Analytics',
    'wa-stats':'WhatsApp Stats',
    plans:     'Plans & Subscriptions',
    settings:  'Settings',
  }

  const SidebarContent = () => (
    <>
      {/* Logo */}
      <div className="px-2 mb-6 flex items-center gap-2">
        <Image src="/logo.png" alt="Visit Akure" width={100} height={32} className="h-8 w-auto object-contain brightness-0 invert" />
        <div className="text-[10px] font-semibold text-white/40 leading-tight">Admin<br/>Panel</div>
      </div>

      {menuGroups.map(group => (
        <div key={group.label} className="mb-4">
          <div className="text-[10px] font-bold text-white/40 uppercase tracking-wider px-2 mb-1">{group.label}</div>
          {group.items.map(({ icon: Icon, label, id, badge }) => (
            <button
              key={id}
              onClick={() => handleNav(id)}
              className={cn(
                'w-full flex items-center gap-2.5 px-2.5 py-2 rounded-xl text-xs font-semibold transition-all text-left mb-0.5',
                active === id ? 'bg-white/20 text-white' : 'text-white/60 hover:bg-white/10 hover:text-white'
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

      <div className="border-t border-white/10 pt-3 mt-2 space-y-0.5">
        <Link href="/" className="flex items-center gap-2.5 px-2.5 py-2 rounded-xl text-xs font-semibold text-white/60 hover:bg-white/10 hover:text-white transition-all">
          <Globe size={15} /> View Site
        </Link>
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-2.5 px-2.5 py-2 rounded-xl text-xs font-semibold text-white/60 hover:bg-white/10 hover:text-white transition-all text-left"
        >
          <LogOut size={15} /> Logout
        </button>
      </div>
    </>
  )

  return (
    <div className="flex min-h-[calc(100vh-64px)] relative">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar — desktop always visible, mobile slide-in */}
      <aside className={cn(
        'fixed lg:static top-0 bottom-0 left-0 z-40 w-[200px] flex-shrink-0 bg-[#005F56] py-5 px-2.5 flex flex-col transition-transform duration-200',
        'lg:translate-x-0',
        sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
      )}>
        <SidebarContent />
      </aside>

      {/* Main */}
      <main className="flex-1 bg-gray-50 overflow-auto min-w-0">
        {/* Mobile top bar */}
        <div className="lg:hidden flex items-center gap-3 px-4 py-3 bg-white border-b border-gray-100 sticky top-0 z-20">
          <button
            onClick={() => setSidebarOpen(true)}
            className="p-2 rounded-xl hover:bg-gray-100 transition-colors"
            aria-label="Open menu"
          >
            <Menu size={20} className="text-gray-600" />
          </button>
          <Image src="/logo.png" alt="Visit Akure" width={90} height={28} className="h-7 w-auto object-contain" />
          <span className="text-xs font-bold text-gray-400 ml-auto">Admin Panel</span>
        </div>

        <div className="p-4 sm:p-7 max-w-6xl">
          <h1 className="text-lg sm:text-xl font-extrabold text-gray-900 mb-1">{titles[active]}</h1>
          <p className="text-sm text-gray-500 mb-6">Visit Akure · Admin Panel</p>
          {renderView()}
        </div>
      </main>
    </div>
  )
}
