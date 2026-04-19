'use client'

import { useState } from 'react'
import { hosts, events } from '@/lib/data'
import type { Host, Event } from '@/lib/data'

function HostDetailCard({
  host, hostedEvents, status, onToggle, onEdit,
}: {
  host: Host; hostedEvents: Event[]; status: 'active' | 'disabled'
  onToggle: () => void; onEdit: () => void
}) {
  const totalAttendees = hostedEvents.reduce((s, e) => s + (e.totalSpots - e.spotsLeft), 0)
  const totalSpots     = hostedEvents.reduce((s, e) => s + e.totalSpots, 0)
  const rate           = totalSpots > 0 ? Math.round((totalAttendees / totalSpots) * 100) : 0
  const isDisabled     = status === 'disabled'

  return (
    <div className={`bg-zinc-900 rounded-2xl overflow-hidden flex flex-col transition-opacity ${isDisabled ? 'opacity-50' : ''}`}>
      <div className="p-5 flex items-start gap-4">
        <div
          className="w-14 h-14 rounded-2xl flex items-center justify-center text-white text-base font-bold shrink-0"
          style={{ backgroundColor: host.color }}
        >
          {host.initials}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <h3 className="font-bold text-white text-sm truncate">{host.name}</h3>
            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full shrink-0 ${
              isDisabled ? 'bg-zinc-800 text-zinc-500' : 'bg-green-900 text-green-400'
            }`}>
              {isDisabled ? 'Disabled' : 'Active'}
            </span>
          </div>
          <p className="text-xs text-zinc-500 mt-0.5 truncate">{host.role}</p>
          <p className="text-xs text-zinc-400 leading-relaxed mt-2 line-clamp-2">{host.bio}</p>
        </div>
      </div>

      <div className="grid grid-cols-3 divide-x divide-zinc-800 border-t border-zinc-800">
        <div className="px-4 py-3 text-center">
          <div className="text-base font-extrabold text-white">{hostedEvents.length}</div>
          <div className="text-[10px] text-zinc-500 mt-0.5">Events</div>
        </div>
        <div className="px-4 py-3 text-center">
          <div className="text-base font-extrabold text-white">{totalAttendees}</div>
          <div className="text-[10px] text-zinc-500 mt-0.5">Attendees</div>
        </div>
        <div className="px-4 py-3 text-center">
          <div className={`text-base font-extrabold ${rate >= 80 ? 'text-green-400' : rate >= 50 ? 'text-amber-400' : 'text-zinc-500'}`}>
            {rate}%
          </div>
          <div className="text-[10px] text-zinc-500 mt-0.5">Fill Rate</div>
        </div>
      </div>

      {hostedEvents.length > 0 && (
        <div className="px-5 py-3 flex flex-wrap gap-1.5 border-t border-zinc-800">
          {hostedEvents.map((e) => (
            <span key={e.id} className="inline-flex items-center gap-1 text-[10px] px-2 py-1 rounded-lg bg-zinc-800 text-zinc-400 font-medium">
              {e.emoji} {e.title}
            </span>
          ))}
        </div>
      )}

      <div className="mt-auto px-5 py-3 border-t border-zinc-800 flex gap-2">
        <button
          onClick={onEdit}
          className="flex-1 text-xs py-2 rounded-xl border border-zinc-700 text-zinc-400 hover:bg-zinc-800 transition-colors font-semibold"
        >
          Edit
        </button>
        <button
          onClick={onToggle}
          className={`flex-1 text-xs py-2 rounded-xl font-semibold transition-colors ${
            isDisabled ? 'bg-green-900 text-green-400 hover:bg-green-800' : 'bg-red-900/50 text-red-400 hover:bg-red-900'
          }`}
        >
          {isDisabled ? 'Enable' : 'Disable'}
        </button>
      </div>
    </div>
  )
}

export default function AdminHostsPage() {
  const hostList = Object.values(hosts)

  const [statuses, setStatuses] = useState<Record<string, 'active' | 'disabled'>>(
    Object.fromEntries(hostList.map((h) => [h.id, 'active']))
  )
  const [showAdd, setShowAdd] = useState(false)
  const [newName, setNewName] = useState('')
  const [toast,   setToast]   = useState('')

  function showToast(msg: string) {
    setToast(msg)
    setTimeout(() => setToast(''), 2500)
  }

  function toggleStatus(id: string) {
    const host = hostList.find((h) => h.id === id)!
    setStatuses((prev) => {
      const next = { ...prev, [id]: prev[id] === 'active' ? 'disabled' : 'active' }
      showToast(next[id] === 'active' ? `${host.name} re-enabled ✓` : `${host.name} disabled`)
      return next
    })
  }

  function handleAddHost() {
    if (newName.trim()) {
      showToast(`Host "${newName.trim()}" added (UI only)`)
      setNewName('')
      setShowAdd(false)
    }
  }

  const activeCount = Object.values(statuses).filter((s) => s === 'active').length

  return (
    <div className="p-6 space-y-5">
      {toast && (
        <div className="fixed top-6 right-6 z-50 bg-white text-black text-sm font-medium px-4 py-2.5 rounded-xl shadow-lg">
          {toast}
        </div>
      )}

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-extrabold text-white tracking-tight">Hosts</h1>
          <p className="text-sm text-zinc-500 mt-0.5">{hostList.length} hosts · {activeCount} active</p>
        </div>
        <button
          onClick={() => setShowAdd(!showAdd)}
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white text-black text-xs font-bold transition-colors hover:bg-zinc-100"
        >
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
          </svg>
          Add host
        </button>
      </div>

      {showAdd && (
        <div className="bg-zinc-900 rounded-2xl p-5 flex items-end gap-3 border border-zinc-800">
          <div className="flex-1">
            <label className="block text-xs font-semibold text-zinc-400 mb-1.5">Host name</label>
            <input
              type="text"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              placeholder="e.g. Yoga with Zeynep"
              className="w-full px-4 py-2.5 rounded-xl border border-zinc-700 bg-zinc-800 text-white text-sm focus:outline-none focus:ring-2 focus:ring-white/20 placeholder:text-zinc-600"
              onKeyDown={(e) => e.key === 'Enter' && handleAddHost()}
              autoFocus
            />
          </div>
          <button onClick={handleAddHost} className="bg-white text-black text-sm font-semibold px-4 py-2.5 rounded-xl hover:bg-zinc-100 transition-colors shrink-0">Add</button>
          <button onClick={() => setShowAdd(false)} className="bg-zinc-800 text-zinc-400 text-sm font-medium px-4 py-2.5 rounded-xl hover:bg-zinc-700 transition-colors shrink-0">Cancel</button>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {hostList.map((host) => (
          <HostDetailCard
            key={host.id}
            host={host}
            hostedEvents={events.filter((e) => e.hostId === host.id)}
            status={statuses[host.id]}
            onToggle={() => toggleStatus(host.id)}
            onEdit={() => showToast('Edit host — coming soon')}
          />
        ))}
      </div>
    </div>
  )
}
