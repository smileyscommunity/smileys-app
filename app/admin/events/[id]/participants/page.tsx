import Link from 'next/link'
import { notFound } from 'next/navigation'
import { events, getEventById, eventAttendees, formatDate } from '@/lib/data'

export function generateStaticParams() {
  return events.map((e) => ({ id: e.id }))
}

const mockCheckedIn = ['a1', 'a2', 'b1', 'c1', 'c2', 'd1', 'd2', 'e1']

export default async function ParticipantsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const event = getEventById(id)
  if (!event) notFound()

  const attendees = eventAttendees[event.id] ?? []
  const goingCount = event.totalSpots - event.spotsLeft
  const checkedInCount = attendees.filter((a) => mockCheckedIn.includes(a.id)).length
  const friendsCount = attendees.filter((a) => a.isFriend).length

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex items-center gap-3 mb-8">
        <Link href="/admin/events" className="text-gray-400 hover:text-gray-600 transition-colors">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </Link>
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <span className="text-2xl">{event.emoji}</span>
            <h1 className="text-2xl font-extrabold text-gray-900 tracking-tight">Participants</h1>
          </div>
          <p className="text-sm text-gray-500 mt-0.5">{event.title} · {formatDate(event.date)}</p>
        </div>
        <Link href={`/admin/events/${event.id}/edit`} className="btn-secondary text-sm">
          Edit event
        </Link>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {[
          { label: 'Registered',  value: goingCount,                    color: 'text-gray-900',   sub: `of ${event.totalSpots} spots` },
          { label: 'Checked in',  value: checkedInCount,                color: 'text-green-600',  sub: `${Math.round((checkedInCount / Math.max(goingCount, 1)) * 100)}% arrival rate` },
          { label: 'Spots left',  value: event.spotsLeft,               color: event.spotsLeft <= 5 ? 'text-red-600' : 'text-gray-900', sub: event.limitedSpots ? 'limited' : 'open' },
          { label: 'Friends',     value: friendsCount,                  color: 'text-amber-600',  sub: 'in network' },
        ].map((s) => (
          <div key={s.label} className="bg-white rounded-2xl shadow-card p-5">
            <div className={`text-3xl font-extrabold ${s.color}`}>{s.value}</div>
            <div className="text-sm font-semibold text-gray-700 mt-0.5">{s.label}</div>
            <div className="text-xs text-gray-400 mt-0.5">{s.sub}</div>
          </div>
        ))}
      </div>

      {/* Capacity bar */}
      <div className="bg-white rounded-2xl shadow-card p-6 mb-6">
        <div className="flex justify-between text-sm mb-2">
          <span className="font-semibold text-gray-700">Capacity</span>
          <span className="text-gray-500">{goingCount} / {event.totalSpots} registered</span>
        </div>
        <div className="h-3 bg-gray-100 rounded-full overflow-hidden mb-2">
          <div
            className="h-full rounded-full bg-amber-400 transition-all"
            style={{ width: `${(goingCount / event.totalSpots) * 100}%` }}
          />
        </div>
        <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
          <div
            className="h-full rounded-full bg-green-400 transition-all"
            style={{ width: `${(checkedInCount / event.totalSpots) * 100}%` }}
          />
        </div>
        <div className="flex gap-4 mt-2 text-xs text-gray-500">
          <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-amber-400 inline-block" />Registered</span>
          <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-green-400 inline-block" />Checked in</span>
        </div>
      </div>

      {/* Participants table */}
      <div className="bg-white rounded-2xl shadow-card overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <h2 className="font-bold text-gray-900">Attendee list</h2>
          <div className="flex gap-2">
            <button className="text-xs px-3 py-1.5 rounded-lg bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors font-medium">
              Export CSV
            </button>
            <button className="text-xs px-3 py-1.5 rounded-lg bg-amber-500 text-white hover:bg-amber-600 transition-colors font-medium">
              Send message
            </button>
          </div>
        </div>

        {/* Table head */}
        <div className="grid grid-cols-12 gap-4 px-6 py-3 bg-gray-50 border-b border-gray-100 text-xs font-semibold text-gray-500 uppercase tracking-wide">
          <div className="col-span-4">Name</div>
          <div className="col-span-3">Bio</div>
          <div className="col-span-2">Type</div>
          <div className="col-span-2">Status</div>
          <div className="col-span-1 text-right">Actions</div>
        </div>

        <div className="divide-y divide-gray-50">
          {attendees.length === 0 && (
            <div className="px-6 py-10 text-center text-gray-400 text-sm">No attendees yet.</div>
          )}
          {attendees.map((a) => {
            const checkedIn = mockCheckedIn.includes(a.id)
            return (
              <div key={a.id} className="grid grid-cols-12 gap-4 px-6 py-4 items-center hover:bg-gray-50 transition-colors">
                {/* Name */}
                <div className="col-span-4 flex items-center gap-3">
                  <div
                    className="w-9 h-9 rounded-full flex items-center justify-center text-white text-xs font-bold shrink-0"
                    style={{ backgroundColor: a.color }}
                  >
                    {a.initials}
                  </div>
                  <div>
                    <div className="font-semibold text-sm text-gray-900">{a.name}</div>
                  </div>
                </div>

                {/* Bio */}
                <div className="col-span-3 text-xs text-gray-500 truncate">{a.bio}</div>

                {/* Type */}
                <div className="col-span-2">
                  {a.isFriend ? (
                    <span className="badge bg-amber-100 text-amber-700 text-[10px]">Friend</span>
                  ) : (
                    <span className="badge bg-gray-100 text-gray-500 text-[10px]">Community</span>
                  )}
                </div>

                {/* Check-in status */}
                <div className="col-span-2">
                  {checkedIn ? (
                    <span className="inline-flex items-center gap-1 text-xs font-semibold text-green-700 bg-green-100 px-2.5 py-1 rounded-full">
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                      </svg>
                      Checked in
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 text-xs font-semibold text-gray-500 bg-gray-100 px-2.5 py-1 rounded-full">
                      <span className="w-1.5 h-1.5 rounded-full bg-gray-400 inline-block" />
                      Registered
                    </span>
                  )}
                </div>

                {/* Actions */}
                <div className="col-span-1 flex justify-end">
                  <button
                    className="text-xs px-2.5 py-1.5 rounded-lg text-red-500 hover:bg-red-50 transition-colors font-medium"
                    title="Remove participant"
                  >
                    Remove
                  </button>
                </div>
              </div>
            )
          })}
        </div>

        {/* Unfilled spots */}
        {event.spotsLeft > 0 && (
          <div className="px-6 py-4 border-t border-dashed border-gray-200 bg-gray-50">
            <p className="text-xs text-gray-400 text-center">
              {event.spotsLeft} open spot{event.spotsLeft > 1 ? 's' : ''} remaining
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
