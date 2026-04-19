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

const todayDate    = new Date(today)
const dayOfWeek    = todayDate.getDay() === 0 ? 7 : todayDate.getDay()
const weekStart    = new Date(todayDate); weekStart.setDate(todayDate.getDate() - dayOfWeek + 1)
const weekEnd      = new Date(weekStart);  weekEnd.setDate(weekStart.getDate() + 6)
const weekStartStr = weekStart.toISOString().split('T')[0]
const weekEndStr   = weekEnd.toISOString().split('T')[0]

const clubGrowth: Record<string, number> = { '1': 12, '2': 8, '3': 18, '4': 25, '5': 5 }

const clubsPerf = clubs.map((club) => {
  const clubEvents = events.filter((e) => e.clubId === club.id)
  const weekEvents = clubEvents.filter((e) => e.date >= weekStartStr && e.date <= weekEndStr).length
  const growth     = clubGrowth[club.id] ?? 0
  return { club, members: club.memberCount, weekEvents, growth }
}).sort((a, b) => b.members - a.members)

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
      <div className="grid grid-cols-4 gap-4">
        <StatCard title="Members"   value={totalMembers.toLocaleString()}   change="+12%"  data={[8, 14, 22, 31, 47, 56, totalMembers]} />
        <StatCard title="Events"    value={events.length.toString()}        change={`+${upcomingEvents.length} upcoming`} data={[2, 3, 3, 4, 4, 5, events.length]} />
        <StatCard title="Hosts"     value={totalHosts.toString()}           change="+2 this month" data={[3, 4, 4, 5, 5, 6, totalHosts]} />
        <StatCard title="Attendees" value={totalAttendees.toLocaleString()} change="+18%"  data={[120, 180, 210, 260, 310, 380, totalAttendees]} />
      </div>
      <div className="flex gap-3">
        <Link href="/admin/events/new" className="bg-white text-black px-4 py-2 rounded-xl text-sm font-semibold hover:bg-zinc-100 transition-colors">+ Create Event</Link>
        <Link href="/admin/hosts"
