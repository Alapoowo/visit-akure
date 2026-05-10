'use client'

import {
  TrendingUp, Eye, MessageCircle, Star,
  Calendar, ArrowUpRight, BarChart3, Users
} from 'lucide-react'
import Link from 'next/link'

const weeklyData = [
  { day: 'Mon', views: 120, clicks: 18 },
  { day: 'Tue', views: 180, clicks: 24 },
  { day: 'Wed', views: 210, clicks: 31 },
  { day: 'Thu', views: 160, clicks: 22 },
  { day: 'Fri', views: 290, clicks: 45 },
  { day: 'Sat', views: 380, clicks: 62 },
  { day: 'Sun', views: 250, clicks: 38 },
]

const maxViews = Math.max(...weeklyData.map(d => d.views))

export default function VendorAnalyticsPage() {
  return (
    <div className="bg-gray-50 min-h-[calc(100vh-64px)] p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-3 mb-2">
          <Link href="/vendor/dashboard" className="text-gray-400 hover:text-[#005F56] transition-colors text-sm font-semibold">
            ← Dashboard
          </Link>
          <span className="text-gray-300">/</span>
          <span className="text-sm font-semibold text-gray-600">Analytics</span>
        </div>
        <h1 className="text-2xl font-extrabold text-gray-900 mb-1 tracking-tight">Analytics</h1>
        <p className="text-sm text-gray-500 mb-8">Last 7 days performance overview</p>

        {/* Stats row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {[
            { icon: Eye, label: 'Total Views', value: '1,590', change: '↑ 12%', color: 'bg-blue-50 text-blue-600' },
            { icon: MessageCircle, label: 'WhatsApp Clicks', value: '240', change: '↑ 31%', color: 'bg-green-50 text-green-600' },
            { icon: Users, label: 'Unique Visitors', value: '892', change: '↑ 8%', color: 'bg-purple-50 text-purple-600' },
            { icon: Star, label: 'Avg. Rating', value: '4.8', change: 'Stable', color: 'bg-yellow-50 text-yellow-600' },
          ].map(({ icon: Icon, label, value, change, color }) => (
            <div key={label} className="bg-white rounded-2xl border border-gray-100 p-5">
              <div className={`w-9 h-9 rounded-xl flex items-center justify-center mb-3 ${color.split(' ')[0]}`}>
                <Icon size={18} className={color.split(' ')[1]} />
              </div>
              <div className="text-2xl font-extrabold text-gray-900 mb-0.5">{value}</div>
              <div className="text-xs text-gray-400">{label}</div>
              <div className="text-xs font-semibold text-green-600 mt-1 flex items-center gap-1">
                <ArrowUpRight size={11} /> {change}
              </div>
            </div>
          ))}
        </div>

        {/* Bar chart */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6 mb-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="font-extrabold text-gray-900">Daily Views &amp; WhatsApp Clicks</h2>
              <p className="text-xs text-gray-400 mt-0.5">This week</p>
            </div>
            <div className="flex items-center gap-4 text-xs">
              <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded bg-[#005F56] inline-block" /> Views</span>
              <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded bg-[#25D366] inline-block" /> WA Clicks</span>
            </div>
          </div>

          {/* Custom bar chart */}
          <div className="flex items-end gap-3 h-48">
            {weeklyData.map(d => (
              <div key={d.day} className="flex-1 flex flex-col items-center gap-1">
                <div className="w-full flex gap-1 items-end" style={{ height: '160px' }}>
                  {/* Views bar */}
                  <div
                    className="flex-1 bg-[#005F56]/15 rounded-t-lg hover:bg-[#005F56]/25 transition-colors relative group"
                    style={{ height: `${(d.views / maxViews) * 100}%` }}
                  >
                    <div
                      className="absolute bottom-0 left-0 right-0 bg-[#005F56] rounded-t-lg"
                      style={{ height: '100%' }}
                    />
                    <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-[9px] px-1.5 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                      {d.views} views
                    </div>
                  </div>
                  {/* Clicks bar */}
                  <div
                    className="flex-1 bg-[#25D366] rounded-t-lg hover:bg-[#1fbb5a] transition-colors relative group"
                    style={{ height: `${(d.clicks / maxViews) * 100}%` }}
                  >
                    <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-[9px] px-1.5 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                      {d.clicks} clicks
                    </div>
                  </div>
                </div>
                <span className="text-[11px] text-gray-400 font-medium">{d.day}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Top listings */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6">
          <h2 className="font-extrabold text-gray-900 mb-5">Top Performing Listings</h2>
          <div className="space-y-3">
            {[
              { title: 'De Hills Executive Suite', views: 1204, clicks: 98, rating: 4.9 },
              { title: 'Toyota Camry, 2014', views: 842, clicks: 67, rating: 4.8 },
              { title: 'Idanre Hills Tour Guide', views: 312, clicks: 42, rating: 4.9 },
            ].map((l, i) => (
              <div key={l.title} className="flex items-center gap-4 p-3 rounded-xl hover:bg-gray-50 transition-colors">
                <div className="w-8 h-8 rounded-lg bg-[#e6f2f1] flex items-center justify-center text-[#005F56] font-extrabold text-sm flex-shrink-0">
                  {i + 1}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-sm text-gray-800 truncate">{l.title}</div>
                  <div className="text-xs text-gray-400">⭐ {l.rating}</div>
                </div>
                <div className="text-right flex-shrink-0">
                  <div className="flex items-center gap-3 text-xs text-gray-500">
                    <span className="flex items-center gap-1"><Eye size={11} /> {l.views.toLocaleString()}</span>
                    <span className="flex items-center gap-1 text-[#25D366] font-semibold">
                      <MessageCircle size={11} /> {l.clicks}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
