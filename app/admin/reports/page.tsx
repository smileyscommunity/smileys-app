'use client'

import { useState } from 'react'
import { events, clubs, hosts, eventAttendees } from '@/lib/data'
import { mockUsers } from '@/lib/auth'

const members = mockUsers.filter((u) => u.role === 'member')

// Revenue per event (mock)
const revenueByEvent = [
  { id: '1', revenue: 1500 },
  { id: '2', revenue: 1200 },
  { id: '3', revenue: 0    },
  { id: '4', revenue: 3750 },
  { id: '5', revenue: 1440 },
]

// Monthly member growth (mock)
const memberGrowth = [
  { month: 'Nov', count: 8  },
  { month: 'Dec', count: 14 },
  { month: 'Jan', count: 22 },
  { month: 'Feb', count: 31 },
  { month: 'Mar', count: 47 },
  { month: 'Apr', count: 56 },
]

// Attendance per event
const attendanceData = events.map((e) => ({
  id: e.id,
  title: e.title,
  emoji: e.emoji,
  going: e.totalSpots - e.spotsLeft,
  total: e.totalSpots,
  pct: Math.round(((e.totalSpots - e.spotsLeft) / e.totalSpots) * 100),
}))

// Revenue per club
const revenueByClub = clubs.map((club) => {
  const clubEvents = events.filter((e) => e.clubId === club.id)
  const total = clubEvents.reduce((sum, e) => {
    const rv = revenueByEvent.find((r) => r.id === e.id)
    return sum + (rv?.revenue ?? 0)
  }, 0)
  return { club, total }
}).sort((a, b) => b.total - a.total)

const maxRevenue = Math.max(...revenueByClub.map((r) => r.total), 1)
const maxGrowth  = Math.max(...memberGrowth.map((m) => m.count), 1)

// Vibe popularity
const vibeCounts: Record<string, number> = {}
events.forEach((e) => {
  e.vibes.forEach((v) => { vibeCounts[v] = (vibeCounts[v] ?? 0) + (e.totalSpots - e.spotsLeft) })
})
const vibeData = Object.entries(vibeCounts).sort((a, b) => b[1] - a[1])
const maxVibe  = Math.max(...vibeData.map(([, c]) => c), 1)

const totalRevenue = revenueByEvent.reduce((s, r) => s + r.revenue, 0)

export default function AdminReportsPage() {
  const [period, setPeriod] = useState<'month' | 'quarter' | 'all'>('month')

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-extrabold text-gray-900 tracking-tight">Reports</h1>
          <p className="text-sm text-gray-500 mt-1">Community performance overview</p>
        </div>
        <div className="flex gap-1 bg-gray-100 rounded-xl p-1">
          {(['month', 'quarter', 'all'] as const).map((p) => (
            <button
              key={p}
              onClick={() => setPeriod(p)}
              className={`px-4 py-1.5 rounded-lg text-xs font-semibold capitalize transition-colors ${
                period === p ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              {p === 'all' ? 'All time' : `This ${p}`}
            </button>
          ))}
        </div>
      </div>

      {/* Top stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[
          { label: 'Total Revenue',    value: `₺${totalRevenue.toLocaleString()}`, sub: '↑ 18% vs last month', color: 'text-green-600' },
          { label: 'Total Attendees',  value: attendanceData.reduce((s, a) => s + a.going, 0), sub: 'Across all events', color: 'text-blue-600' },
          { label: 'Avg. Fill Rate',   value: `${Math.round(attendanceData.reduce((s, a) => s + a.pct, 0) / attendanceData.length)}%`, sub: 'Event capacity used', color: 'text-amber-600' },
          { label: 'Member Growth',    value: `+${memberGrowth[memberGrowth.length - 1].count - memberGrowth[memberGrowth.length - 2].count}`, sub: 'New members this month', color: 'text-violet-600' },
        ].map((s) => (
          <div key={s.label} className="bg-white rounded-2xl shadow-card p-5">
            <div className={`text-3xl font-extrabold ${s.color}`}>{s.value}</div>
            <div className="text-sm font-semibold text-gray-700 mt-0.5">{s.label}</div>
            <div className="text-xs text-gray-400 mt-0.5">{s.sub}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">

        {/* Member growth chart */}
        <div className="bg-white rounded-2xl shadow-card p-6">
          <h2 className="font-bold text-gray-900 mb-5">Member Growth</h2>
          <div className="flex items-end gap-2 h-36">
            {memberGrowth.map((m, i) => (
              <div key={m.month} className="flex-1 flex flex-col items-center gap-1">
                <span className="text-xs font-semibold text-gray-700">{m.count}</span>
                <div
                  className={`w-full rounded-t-lg transition-all ${
                    i === memberGrowth.length - 1 ? 'bg-amber-500' : 'bg-amber-200'
                  }`}
                  style={{ height: `${(m.count / maxGrowth) * 100}px` }}
                />
                <span className="text-[10px] text-gray-400">{m.month}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Revenue by club */}
        <div className="bg-white rounded-2xl shadow-card p-6">
          <h2 className="font-bold text-gray-900 mb-5">Revenue by Club</h2>
          <div className="space-y-3">
            {revenueByClub.map(({ club, total }) => (
              <div key={club.id}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-medium text-gray-700 flex items-center gap-1.5">
                    <span>{club.emoji}</span> {club.name}
                  </span>
                  <span className="text-xs font-bold text-gray-900">
                    {total > 0 ? `₺${total.toLocaleString()}` : <span className="text-gray-400 font-normal">Free</span>}
                  </span>
                </div>
                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-amber-400 rounded-full transition-all duration-500"
                    style={{ width: `${(total / maxRevenue) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* Event attendance */}
        <div className="bg-white rounded-2xl shadow-card p-6">
          <h2 className="font-bold text-gray-900 mb-5">Event Attendance</h2>
          <div className="space-y-3">
            {attendanceData.map((a) => (
              <div key={a.id}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-medium text-gray-700 flex items-center gap-1.5">
                    <span>{a.emoji}</span>
                    <span className="truncate max-w-[160px]">{a.title}</span>
                  </span>
                  <span className="text-xs text-gray-500 shrink-0 ml-2">{a.going}/{a.total}</span>
                </div>
                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${
                      a.pct >= 80 ? 'bg-red-400' : a.pct >= 50 ? 'bg-amber-400' : 'bg-green-400'
                    }`}
                    style={{ width: `${a.pct}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Vibe popularity */}
        <div className="bg-white rounded-2xl shadow-card p-6">
          <h2 className="font-bold text-gray-900 mb-5">Vibe Popularity</h2>
          <div className="space-y-3">
            {vibeData.map(([vibe, count]) => (
              <div key={vibe}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-medium text-gray-700">{vibe}</span>
                  <span className="text-xs text-gray-500">{count} attendees</span>
                </div>
                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-violet-400 rounded-full transition-all duration-500"
                    style={{ width: `${(count / maxVibe) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
