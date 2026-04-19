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
    color: 'bg-orange
