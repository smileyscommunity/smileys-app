'use client'

import { useState } from 'react'
import { clubs, events } from '@/lib/data'
import type { Club } from '@/lib/data'

export default function AdminClubsPage() {
  const [clubList,  setClubList]  = useState<Club[]>(clubs)
  const [deleted,   setDeleted]   = useState<Set<string>>(new Set())
  const [editing,   setEditing]   = useState<string | null>(null)
  const [editName,  setEditName]  = useState('')
  const [editDesc,  setEditDesc]  = useState('')
  const [showCreate, setShowCreate] = useState(false)
  const [newClub,   setNewClub]   = useState({ name: '', description: '', category: '', emoji: '🎉' })
  const [toast,     setToast]     = useState('')

  function showToast(msg: string) {
    setToast(msg)
    setTimeout(() => setToast(''), 2500)
  }

  function startEdit(club: Club) {
    setEditing(club.id)
    setEditName(club.name)
    setEditDesc(club.description)
  }

  function saveEdit(id: string) {
    setClubList((prev) =>
      prev.map((c) => c.id === id ? { ...c, name: editName, description: editDesc } : c)
    )
    setEditing(null)
    showToast('Club updated ✓')
  }

  function deleteClub(id: string) {
   setDeleted((prev) => new Set(Array.from(prev).concat(id)))
    const name = clubList.find((c) => c.id === id)?.name
    showToast(`"${name}" deleted`)
  }

  function handleCreate() {
    if (!newClub.name.trim()) return
    const created: Club = {
      id:          `club_${Date.now()}`,
      slug:        newClub.name.toLowerCase().replace(/\s+/g, '-'),
      name:        newClub.name,
      description: newClub.description || 'A new Smileys club.',
      category:    newClub.category || 'Social',
      memberCount: 0,
      emoji:       newClub.emoji,
      color:       'text-amber-600',
      bgColor:     'bg-amber-50',
    }
    setClubList((prev) => [...prev, created])
    setNewClub({ name: '', description: '', category: '', emoji: '🎉' })
    setShowCreate(false)
    showToast(`"${created.name}" created ✓`)
  }

  const visible = clubList.filter((c) => !deleted.has(c.id))

  return (
    <div className="p-8">
      {toast && (
        <div className="fixed top-6 right-6 z-50 bg-gray-900 text-white text-sm font-medium px-4 py-2.5 rounded-xl shadow-lg">
          {toast}
        </div>
      )}

      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-extrabold text-gray-900 tracking-tight">Clubs</h1>
          <p className="text-sm text-gray-500 mt-1">{visible.length} clubs</p>
        </div>
        <button onClick={() => setShowCreate(!showCreate)} className="btn-primary text-sm">
          + Create club
        </button>
      </div>

      {/* Create club form */}
      {showCreate && (
        <div className="bg-white rounded-2xl shadow-card p-6 mb-6">
          <h2 className="font-bold text-gray-900 mb-4">New club</h2>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-xs font-semibold text-gray-500 mb-1.5">Club name</label>
              <input
                type="text"
                value={newClub.name}
                onChange={(e) => setNewClub((p) => ({ ...p, name: e.target.value }))}
                placeholder="e.g. Istanbul Photography Club"
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-500 mb-1.5">Category</label>
              <input
                type="text"
                value={newClub.category}
                onChange={(e) => setNewClub((p) => ({ ...p, category: e.target.value }))}
                placeholder="e.g. Arts, Outdoors, Social"
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400"
              />
            </div>
            <div className="col-span-2">
              <label className="block text-xs font-semibold text-gray-500 mb-1.5">Description</label>
              <textarea
                rows={2}
                value={newClub.description}
                onChange={(e) => setNewClub((p) => ({ ...p, description: e.target.value }))}
                placeholder="What's this club about?"
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 resize-none"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-500 mb-1.5">Emoji</label>
              <input
                type="text"
                value={newClub.emoji}
                onChange={(e) => setNewClub((p) => ({ ...p, emoji: e.target.value }))}
                className="w-20 px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400"
              />
            </div>
          </div>
          <div className="flex gap-3">
            <button onClick={handleCreate} className="btn-primary text-sm">Create club</button>
            <button onClick={() => setShowCreate(false)} className="btn-secondary text-sm">Cancel</button>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {visible.map((club) => {
          const clubEvents   = events.filter((e) => e.clubId === club.id)
          const isEditingThis = editing === club.id

          return (
            <div key={club.id} className="bg-white rounded-2xl shadow-card p-6">
              {isEditingThis ? (
                /* Inline edit form */
                <div className="space-y-3">
                  <div>
                    <label className="block text-xs font-semibold text-gray-500 mb-1">Club name</label>
                    <input
                      type="text"
                      value={editName}
                      onChange={(e) => setEditName(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-500 mb-1">Description</label>
                    <textarea
                      rows={2}
                      value={editDesc}
                      onChange={(e) => setEditDesc(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 resize-none"
                    />
                  </div>
                  <div className="flex gap-2">
                    <button onClick={() => saveEdit(club.id)} className="btn-primary text-xs py-2 px-4">Save</button>
                    <button onClick={() => setEditing(null)} className="btn-secondary text-xs py-2 px-4">Cancel</button>
                  </div>
                </div>
              ) : (
                /* Normal view */
                <>
                  <div className="flex items-start gap-4 mb-4">
                    <div className={`w-12 h-12 rounded-xl ${club.bgColor} flex items-center justify-center text-2xl shrink-0`}>
                      {club.emoji}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="font-bold text-gray-900">{club.name}</h3>
                        <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-gray-100 text-gray-500">
                          {club.category}
                        </span>
                      </div>
                      <p className="text-xs text-gray-500 mt-1 leading-relaxed line-clamp-2">{club.description}</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                    <div className="flex gap-4 text-xs text-gray-500">
                      <span>👥 {club.memberCount} members</span>
                      <span>📅 {clubEvents.length} event{clubEvents.length !== 1 ? 's' : ''}</span>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => startEdit(club)}
                        className="text-xs px-3 py-1.5 rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors font-medium"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => deleteClub(club.id)}
                        className="text-xs px-3 py-1.5 rounded-lg text-red-500 hover:bg-red-50 transition-colors font-medium"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
