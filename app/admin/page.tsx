'use client'

import Link from 'next/link'
import { events, clubs, hosts } from '@/lib/data'
import { mockUsers } from '@/lib/auth'
import StatCard    from '@/components/admin/StatCard'
import EventsTable from '@/components/admin/EventsTable'
import HostCard    from '@/components/admin/HostCard'

const today          = new Date().toISOString().split('T')[0]
const totalMembers   = mockUsers.filter((u) => u.role === 'member').length
const totalHosts     = mockUsers.filter((u) => u.role === 'host').length
const upcomingEvents = events.filter((e) => e.date >= today)
const totalAttendees = events.reduce((sum, e) => sum + (e.totalSpots - e.spotsLeft), 0)

const topHosts = Object.values(hosts)
  .map((h) => {
    const hostEvents = events.filter((e) => e.hostId === h.id)
    const attendees  = hostEvents.reduce((s, e) => s + (e.totalSpots - e.spotsLeft), 0)
    const totalSpots = hostEvents.reduce((s, e) => s + e.totalSpots, 0)
    const rate       = totalSpots > 0 ? Math.round((attendees / totalSpots) * 100) : 0
    return { host: h, eventCount: hostEvents.length, rate }
  })
  .sort((a, b) => b.rate - a.rate)

// Week bounds
const todayDate    = new Date(today)
const dayOfWeek    = todayDate.getDay() === 0 ? 7 : todayDate.getDay()
const weekStart    = new Date(todayDate); weekStart.setDate(todayDate.getDate() - dayOfWeek + 1)
const weekEnd      = new Date(weekStart);  weekEnd.setDate(weekStart.getDate() + 6)
const weekStartStr = weekStart.toISOString().split('T')[0]
const weekEndStr   = weekEnd.toISOString().split('T')[0]

const clubGrowth: Record<string, number> = { '1': 12, '2': 8, '3': 18, '4': 25, '5': 5 }

setRemoved((prev) => new Set(Array.from(prev).concat(id)))
  const clubEvents = events.filter((e) => e.clubId === club.id)
  const weekEvents = clubEvents.filter((e) => e.date >= weekStartStr && e.date <= weekEndStr).length
  const growth     = clubGrowth[club.id] ?? 0
  return { club, members: club.memberCount, weekEvents, growth }
}).sort((a, b) => b.members - a.members)

// Alerts
const lowCapacityEvents = events.filter((e) => e.date >= today && (e.totalSpots - e.spotsLeft) / e.totalSpots < 0.4)
const topGrowthClub     = clubs.map((c) => ({ club: c, growth: clubGrowth[c.id] ?? 0 })).sort((a, b) => b.growth - a.growth)[0]
const inactiveHostCount = 5

const alerts = [
  lowCapacityEvents.length > 0 && {
    icon: '⚠️',
    text: `${lowCapacityEvents.length} event${lowCapacityEvents.length !== 1 ? 's' : ''} below 40% capacity`,
    color: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20',
  },
  topGrowthClub && {
    icon: '🔥',
    text: `${topGrowthClub.club.name} +${topGrowthClub.growth}% growth this week`,
    color: 'bg-orange-500/10 text-orange-400 border-orange-500/20',
  },
  inactiveHostCount > 0 && {
    icon: '😴',
    text: `${inactiveHostCount} hosts inactive for 30+ days`,
    color: 'bg-zinc-500/10 text-zinc-400 border-zinc-500/20',
  },
].filter(Boolean) as { icon: string; text: string; color: string }[]

const activityFeed = [
  { id: 1, icon: '👤', text: 'Ayşe Kaya joined the community',         time: '2m ago'  },
  { id: 2, icon: '📅', text: 'Sunset Sailing — 1 new registration',    time: '8m ago'  },
  { id: 3, icon: '💬', text: 'Language Exchange — 3 new spots filled',  time: '15m ago' },
  { id: 4, icon: '💳', text: 'Payment received from Carlos Mendez',     time: '22m ago' },
  { id: 5, icon: '⭐', text: 'Flow by Smileys published a new event',  time: '1h ago'  },
  { id: 6, icon: '👤', text: 'James Reed joined Smileys Sailing Club',  time: '1h ago'  },
  { id: 7, icon: '💳', text: 'Payment received from Zeynep Arslan',     time: '2h ago'  },
  { id: 8, icon: '📅', text: 'Rooftop DJ Night — 5 spots left',         time: '3h ago'  },
]

export default function AdminPage() {
  return (
    <div className="p-6 space-y-6">

      {/* Alerts */}
      {alerts.length > 0 && (
        <div className="flex flex-col sm:flex-row gap-2">
          {alerts.map((alert, i) => (
            <div key={i} className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border text-sm font-medium flex-1 ${alert.color}`}>
              <span>{alert.icon}</span>
              <span>{alert.text}</span>
            </div>
          ))}
        </div>
      )}

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4">
        <StatCard title="Members"   value={totalMembers.toLocaleString()}   change="+12%"  data={[8, 14, 22, 31, 47, 56, totalMembers]} />
        <StatCard title="Events"    value={events.length.toString()}        change={`+${upcomingEvents.length} upcoming`} data={[2, 3, 3, 4, 4, 5, events.length]} />
        <StatCard title="Hosts"     value={totalHosts.toString()}           change="+2 this month" data={[3, 4, 4, 5, 5, 6, totalHosts]} />
        <StatCard title="Attendees" value={totalAttendees.toLocaleString()} change="+18%"  data={[120, 180, 210, 260, 310, 380, totalAttendees]} />
      </div>

      {/* Quick Actions */}
      <div className="flex gap-3">
        <Link href="/admin/events/new" className="bg-white text-black px-4 py-2 rounded-xl text-sm font-semibold hover:bg-zinc-100 transition-colors">
          + Create Event
        </Link>
        <Link href="/admin/hosts"    className="bg-zinc-800 text-white px-4 py-2 rounded-xl text-sm font-medium hover:bg-zinc-700 transition-colors">Add Host</Link>
        <Link href="/admin/clubs"    className="bg-zinc-800 text-white px-4 py-2 rounded-xl text-sm font-medium hover:bg-zinc-700 transition-colors">Create Club</Link>
        <Link href="/admin/payments" className="bg-zinc-800 text-white px-4 py-2 rounded-xl text-sm font-medium hover:bg-zinc-700 transition-colors">💳 Payments</Link>
        <Link href="/admin/reports"  className="bg-zinc-800 text-white px-4 py-2 rounded-xl text-sm font-medium hover:bg-zinc-700 transition-colors">📊 Reports</Link>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-2 bg-zinc-900 p-5 rounded-2xl">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-base font-semibold">Upcoming Events</h2>
            <Link href="/admin/events" className="text-xs text-amber-400 hover:underline font-medium">View all →</Link>
          </div>
          <EventsTable />
        </div>

        <div className="bg-zinc-900 p-5 rounded-2xl">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-base font-semibold">Top Hosts</h2>
            <Link href="/admin/hosts" className="text-xs text-amber-400 hover:underline font-medium">Manage →</Link>
          </div>
          <div className="space-y-2">
            {topHosts.map(({ host, eventCount, rate }) => (
              <HostCard key={host.id} name={host.name} events={eventCount} rate={rate} />
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Grid */}
      <div className="grid grid-cols-3 gap-6">

        {/* Clubs Performance */}
        <div className="col-span-2 bg-zinc-900 rounded-2xl overflow-hidden">
          <div className="flex items-center justify-between px-5 py-4 border-b border-zinc-800">
            <h2 className="text-base font-semibold">Clubs Performance</h2>
            <Link href="/admin/clubs" className="text-xs text-amber-400 hover:underline font-medium">Manage →</Link>
          </div>
          <div className="grid grid-cols-12 gap-3 px-5 py-2.5 text-[11px] font-bold text-zinc-600 uppercase tracking-wider border-b border-zinc-800">
            <div className="col-span-4">Club</div>
            <div className="col-span-2 text-center">Members</div>
            <div className="col-span-3 text-center">This Week</div>
            <div className="col-span-3 text-center">Growth</div>
          </div>
          <div className="divide-y divide-zinc-800">
            {clubsPerf.map(({ club, members, weekEvents, growth }) => (
              <div key={club.id} className="grid grid-cols-12 gap-3 px-5 py-3.5 items-center hover:bg-zinc-800/50 transition-colors">
                <div className="col-span-4 flex items-center gap-3 min-w-0">
                  <div className={`w-8 h-8 rounded-lg ${club.bgColor} flex items-center justify-center text-lg shrink-0`}>{club.emoji}</div>
                  <div className="min-w-0">
                    <div className="text-sm font-semibold text-white truncate">{club.name}</div>
                    <div className="text-xs text-zinc-500">{club.category}</div>
                  </div>
                </div>
                <div className="col-span-2 text-center text-sm font-semibold text-zinc-300">{members.toLocaleString()}</div>
                <div className="col-span-3 text-center text-sm font-semibold text-zinc-300">{weekEvents}</div>
                <div className="col-span-3 text-center">
                  <span className={`text-sm font-bold ${growth >= 15 ? 'text-green-400' : growth >= 5 ? 'text-amber-400' : 'text-zinc-500'}`}>
                    +{growth}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Activity Feed */}
        <div className="bg-zinc-900 rounded-2xl overflow-hidden">
          <div className="px-5 py-4 border-b border-zinc-800">
            <h2 className="text-base font-semibold">Activity Feed</h2>
          </div>
          <div className="divide-y divide-zinc-800">
            {activityFeed.map((item) => (
              <div key={item.id} className="flex items-start gap-3 px-5 py-3 hover:bg-zinc-800/50 transition-colors">
                <span className="text-base shrink-0 mt-0.5">{item.icon}</span>
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-zinc-300 leading-snug">{item.text}</p>
                  <p className="text-[10px] text-zinc-600 mt-0.5">{item.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  )
}
