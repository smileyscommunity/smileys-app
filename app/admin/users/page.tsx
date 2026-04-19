'use client'

import { useState } from 'react'
import { mockUsers } from '@/lib/auth'
import type { AppUser } from '@/lib/auth'
import { events } from '@/lib/data'

type TabKey = 'all' | 'member' | 'host' | 'admin'

const roleBadge: Record<string, string> = {
  admin:  'bg-amber-100 text-amber-700',
  host:   'bg-blue-100  text-blue-700',
  member: 'bg-gray-100  text-gray-600',
}

export default function AdminUsersPage() {
  const [users,   setUsers]   = useState<AppUser[]>(mockUsers)
  const [removed, setRemoved] = useState<Set<string>>(new Set())
  const [tab,     setTab]     = useState<TabKey>('all')
  const [search,  setSearch]  = useState('')
  const [toast,   setToast]   = useState('')

  function showToast(msg: string) {
    setToast(msg)
    setTimeout(() => setToast(''), 2500)
  }

  function promoteToHost(id: string) {
    const name = users.find((u) => u.id === id)?.name
    setUsers((prev) => prev.map((u) => u.id === id ? { ...u, role: 'host' as const } : u))
    showToast(`${name} promoted to host ✓`)
  }

  function removeUser(id: string) {
    const name = users.find((u) => u.id === id)?.name
    setRemoved((prev) => new Set(Array.from(prev).concat(id)))
    showToast(`${name} removed`)
  }

  const active = users.filter((u) => !removed.has(u.id))

  const counts: Record<TabKey, number> = {
    all:    active.length,
    member: active.filter((u) => u.role === 'member').length,
    host:   active.filter((u) => u.role === 'host').length,
    admin:  active.filter((u) => u.role === 'admin').length,
  }

  const visible = active.filter((u) => {
    if (tab !== 'all' && u.role !== tab) return false
    if (search) {
      const q = search.toLowerCase()
      if (!u.name.toLowerCase().includes(q)) return false
    }
    return true
  })

  const tabs: { key: TabKey; label: string }[] = [
    { key: 'all',    label: 'All'     },
    { key: 'member', label: 'Members' },
    { key: 'host',   label: 'Hosts'   },
    { key: 'admin',  label: 'Admins'  },
  ]

  return (
    <div className="p-6 space-y-4">
      {toast && (
        <div className="fixed top-6 right-6 z-50 bg-gray-900 text-white text-sm font-medium px-4 py-2.5 rounded-xl shadow-lg">
          {toast}
        </div>
      )}

      {/* ── Top Bar ── */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-3">

        {/* Tabs */}
        <div className="flex gap-1 bg-gray-100 rounded-xl p-1 shrink-0">
          {tabs.map((t) => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors flex items-center gap-1.5 ${
                tab === t.key ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              {t.label}
              <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${
                tab === t.key ? 'bg-gray-100 text-gray-600' : 'bg-gray-200 text-gray-400'
              }`}>
                {counts[t.key]}
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
            placeholder="Search by name…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-8 pr-3 py-2 text-xs rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-amber-400 bg-white"
          />
        </div>

        <div className="flex-1 hidden sm:block" />

        <button
          onClick={() => showToast('Invite flow coming soon')}
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold shadow-sm transition-colors shrink-0"
        >
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
          </svg>
          Invite user
        </button>
      </div>

      {/* ── Table ── */}
      <div className="bg-white rounded-2xl shadow-card overflow-hidden">
        <div className="grid grid-cols-12 gap-3 px-6 py-3 bg-gray-50 border-b border-gray-100 text-[11px] font-bold text-gray-400 uppercase tracking-wider">
          <div className="col-span-4">Name</div>
          <div className="col-span-2">Role</div>
          <div className="col-span-2 text-center">Events Joined</div>
          <div className="col-span-2">Member Since</div>
          <div className="col-span-2 text-right">Actions</div>
        </div>

        <div className="divide-y divide-gray-50">
          {visible.length === 0 && (
            <div className="px-6 py-12 text-center text-gray-400 text-sm">No users found.</div>
          )}

          {visible.map((u) => {
            const joinedCount = u.joinedEvents?.length ?? 0
            const joinedNames = (u.joinedEvents ?? [])
              .map((id) => events.find((e) => e.id === id)?.title)
              .filter(Boolean)
              .join(', ')

            return (
              <div key={u.id} className="grid grid-cols-12 gap-3 px-6 py-3.5 items-center hover:bg-gray-50/70 transition-colors">

                {/* Name */}
                <div className="col-span-4 flex items-center gap-3 min-w-0">
                  <div
                    className="w-9 h-9 rounded-full flex items-center justify-center text-white text-xs font-bold shrink-0"
                    style={{ backgroundColor: u.color }}
                  >
                    {u.initials}
                  </div>
                  <div className="min-w-0">
                    <div className="font-semibold text-sm text-gray-900 truncate">{u.name}</div>
                    {u.hostId && (
                      <div className="text-xs text-gray-400 truncate">{u.hostId}</div>
                    )}
                  </div>
                </div>

                {/* Role */}
                <div className="col-span-2">
                  <span className={`text-xs font-semibold px-2.5 py-1 rounded-full capitalize ${roleBadge[u.role]}`}>
                    {u.role}
                  </span>
                </div>

                {/* Events joined */}
                <div className="col-span-2 text-center">
                  {joinedCount > 0 ? (
                    <span className="text-sm font-semibold text-gray-700 cursor-default" title={joinedNames}>
                      {joinedCount}
                    </span>
                  ) : (
                    <span className="text-xs text-gray-300">—</span>
                  )}
                </div>

                {/* Joined date */}
                <div className="col-span-2">
                  <span className="text-xs text-gray-500">{u.joinedAt ?? '—'}</span>
                </div>

                {/* Actions */}
                <div className="col-span-2 flex gap-1.5 justify-end">
                  {u.role === 'member' && (
                    <button
                      onClick={() => promoteToHost(u.id)}
                      className="text-xs px-2.5 py-1.5 rounded-lg bg-blue-50 text-blue-700 hover:bg-blue-100 transition-colors font-semibold"
                    >
                      Make host
                    </button>
                  )}
                  {u.role !== 'admin' && (
                    <button
                      onClick={() => removeUser(u.id)}
                      className="p-1.5 rounded-lg text-red-400 hover:bg-red-50 transition-colors"
                      title="Remove user"
                    >
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  )}
                  {u.role === 'admin' && (
                    <span className="text-xs text-gray-300 px-2.5 py-1.5">—</span>
                  )}
                </div>
              </div>
            )
          })}
        </div>

        {visible.length > 0 && (
          <div className="px-6 py-3 border-t border-gray-100 bg-gray-50 text-xs text-gray-400">
            Showing {visible.length} of {active.length} users
          </div>
        )}
      </div>
    </div>
  )
}
