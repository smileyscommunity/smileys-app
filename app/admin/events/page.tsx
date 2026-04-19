'use client'

import Link from 'next/link'
import { useState } from 'react'
import { events, hosts, clubs } from '@/lib/data'
import type { Event } from '@/lib/data'

const today = new Date().toISOString().split('T')[0]

export default function AdminEventsPage() {
  const [featured, setFeatured] = useState<Set<string>>(new Set(['1']))
  const [deleted,  setDeleted]  = useState<Set<string>>(new Set())
  const [toast,    setToast]    = useState('')
  const [search,   setSearch]   = useState('')
  const [status,   setStatus]   = useState<'all' | 'upcoming' | 'past'>('all')
  const [clubFilter, setClubFilter] = useState('all')

  function showToast(msg: string) {
    setToast(msg)
    setTimeout(() => setToast(''), 2500)
  }

  function toggleFeatured(event: Event) {
    setFeatured((prev) => {
      const next = new Set(prev)
      next.has(event.id) ? next.delete(event.id) : next.add(event.id)
      return next
    })
    showToast(featured.has(event.id) ? 'Event unfeatured' : 'Event featured ✓')
  }

  function handleDelete(event: Event) {
    setDeleted((prev) => new Set([...prev, event.id]))
    showToast(`"${event.title}" deleted`)
  }

  const visible = events.filter((e) => {
    if (deleted.has(e.id)) return false
    if (status === 'upcoming' && e.date < today) return false
    if (status === 'past'     && e.date >= today) return false
    if (clubFilter !== 'all'  && e.clubId !== clubFilter) return false
    if (search) {
      const q = search.toLowerCase()
      const host = hosts[e.hostId]
      if (
        !e.title.toLowerCase().includes(q) &&
        !e.neighborhood.toLowerCase().includes(q) &&
        !(host?.name.toLowerCase().includes(q))
      ) return false
    }
    return true
  })

  const upcomingCount = events.filter((e) => !deleted.has(e.id) && e.date >= today).length
  const pastCount     = events.filter((e) => !deleted.has(e.id) && e.date <  today).length

  return (
    <div className="p-6 space-y-4">
      {toast && (
        <div className="fixed top-6 right-6 z-50 bg-gray-900 text-white text-sm font-medium px-4 py-2.5 rounded-xl shadow-lg">
          {toast}
        </div>
      )}

      {/* ── Top Bar ── */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-3">

        {/* Status tabs */}
        <div className="flex gap-1 bg-gray-100 rounded-xl p-1 shrink-0">
          {([
            { key: 'all',      label: 'All',      count: events.filter((e) => !deleted.has(e.id)).length },
            { key: 'upcoming', label: 'Upcoming', count: upcomingCount },
            { key: 'past',     label: 'Past',     count: pastCount },
          ] as const).map((tab) => (
            <button
              key={tab.key}
              onClick={() => setStatus(tab.key)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors flex items-center gap-1.5 ${
                status === tab.key ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              {tab.label}
              <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${
                status === tab.key ? 'bg-gray-100 text-gray-600' : 'bg-gray-200 text-gray-400'
              }`}>
                {tab.count}
              </span>
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="relative flex-1 max-w-xs">
          <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            placeholder="Search events, hosts, neighborhoods…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-8 pr-3 py-2 text-xs rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-amber-400 bg-white"
          />
        </div>

        {/* Club filter */}
        <select
          value={clubFilter}
          onChange={(e) => setClubFilter(e.target.value)}
          className="text-xs px-3 py-2 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-amber-400 bg-white text-gray-700 font-medium"
        >
          <option value="all">All clubs</option>
          {clubs.map((c) => (
            <option key={c.id} value={c.id}>{c.emoji} {c.name}</option>
          ))}
        </select>

        {/* Spacer */}
        <div className="flex-1 hidden sm:block" />

        {/* Create button */}
        <Link
          href="/admin/events/new"
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold shadow-sm transition-colors shrink-0"
        >
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
          </svg>
          Create event
        </Link>
      </div>

      {/* ── Events Table ── */}
      <div className="bg-white rounded-2xl shadow-card overflow-hidden">
        {/* Header */}
        <div className="grid grid-cols-12 gap-3 px-6 py-3 bg-gray-50 border-b border-gray-100 text-[11px] font-bold text-gray-400 uppercase tracking-wider">
          <div className="col-span-4">Event</div>
          <div className="col-span-2">Host</div>
          <div className="col-span-2">Date</div>
          <div className="col-span-1 text-center">Capacity</div>
          <div className="col-span-1 text-center">Status</div>
          <div className="col-span-2 text-right">Actions</div>
        </div>

        <div className="divide-y divide-gray-50">
          {visible.length === 0 && (
            <div className="px-6 py-12 text-center text-gray-400 text-sm">
              No events match your filters.
            </div>
          )}

          {visible.map((event) => {
            const host       = hosts[event.hostId]
            const club       = clubs.find((c) => c.id === event.clubId)
            const goingCount = event.totalSpots - event.spotsLeft
            const fillPct    = Math.round((goingCount / event.totalSpots) * 100)
            const isPast     = event.date < today
            const isFeatured = featured.has(event.id)

            return (
              <div key={event.id} className="grid grid-cols-12 gap-3 px-6 py-4 items-center hover:bg-gray-50/70 transition-colors group">

                {/* Event */}
                <div className="col-span-4 flex items-center gap-3 min-w-0">
                  <span className="text-xl shrink-0 w-8 text-center">{event.emoji}</span>
                  <div className="min-w-0">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span className="font-semibold text-sm text-gray-900 truncate">{event.title}</span>
                      {isFeatured && (
                        <span className="badge bg-amber-100 text-amber-700 text-[10px] shrink-0">★</span>
                      )}
                      {event.membersOnly && (
                        <span className="badge bg-violet-100 text-violet-700 text-[10px] shrink-0">🔒</span>
                      )}
                    </div>
                    <div className="text-xs text-gray-400 mt-0.5 truncate">
                      {club?.name} · {event.neighborhood}
                    </div>
                  </div>
                </div>

                {/* Host */}
                <div className="col-span-2 flex items-center gap-2 min-w-0">
                  {host && (
                    <>
                      <div
                        className="w-6 h-6 rounded-full flex items-center justify-center text-white text-[9px] font-bold shrink-0"
                        style={{ backgroundColor: host.color }}
                      >
                        {host.initials}
                      </div>
                      <span className="text-xs text-gray-600 truncate">{host.name}</span>
                    </>
                  )}
                </div>

                {/* Date */}
                <div className="col-span-2">
                  <div className="text-xs font-semibold text-gray-700">{event.date}</div>
                  <div className="text-xs text-gray-400">{event.time}</div>
                </div>

                {/* Capacity */}
                <div className="col-span-1">
                  <div className="text-xs text-center text-gray-600 font-semibold mb-1">
                    {goingCount}<span className="text-gray-300">/{event.totalSpots}</span>
                  </div>
                  <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full ${fillPct >= 80 ? 'bg-red-400' : 'bg-amber-400'}`}
                      style={{ width: `${fillPct}%` }}
                    />
                  </div>
                </div>

                {/* Status */}
                <div className="col-span-1 text-center">
                  <span className={`inline-block text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    isPast ? 'bg-gray-100 text-gray-400' : 'bg-green-100 text-green-700'
                  }`}>
                    {isPast ? 'Past' : 'Live'}
                  </span>
                </div>

                {/* Actions */}
                <div className="col-span-2 flex gap-1 justify-end">
                  <Link
                    href={`/admin/events/${event.id}/participants`}
                    className="p-1.5 rounded-lg bg-gray-100 text-gray-500 hover:bg-gray-200 transition-colors"
                    title="Attendees"
                  >
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </Link>
                  <button
                    onClick={() => toggleFeatured(event)}
                    title={isFeatured ? 'Unfeature' : 'Feature'}
                    className={`p-1.5 rounded-lg transition-colors ${
                      isFeatured ? 'bg-amber-100 text-amber-600 hover:bg-amber-200' : 'bg-gray-100 text-gray-400 hover:bg-gray-200'
                    }`}
                  >
                    <svg className="w-3.5 h-3.5" fill={isFeatured ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                    </svg>
                  </button>
                  <Link
                    href={`/admin/events/${event.id}/edit`}
                    className="px-2.5 py-1.5 rounded-lg border border-gray-200 text-xs text-gray-600 hover:bg-gray-50 transition-colors font-semibold"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(event)}
                    className="p-1.5 rounded-lg text-red-400 hover:bg-red-50 transition-colors"
                    title="Delete"
                  >
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              </div>
            )
          })}
        </div>

        {/* Footer */}
        {visible.length > 0 && (
          <div className="px-6 py-3 border-t border-gray-100 bg-gray-50 text-xs text-gray-400">
            Showing {visible.length} of {events.filter((e) => !deleted.has(e.id)).length} events
          </div>
        )}
      </div>
    </div>
  )
}
