import Link from 'next/link'
import { Event, eventAttendees, formatShortDate, vibeConfig, hosts } from '@/lib/data'

interface EventCardProps {
  event: Event
  linkPrefix?: string
}

function getUrgency(spotsLeft: number, totalSpots: number, limitedSpots: boolean, fillPercent: number) {
  if (limitedSpots && spotsLeft <= 2)
    return { label: `🔥 Only ${spotsLeft} left`, bg: 'bg-red-500', text: 'text-white', pulse: true }
  if (limitedSpots && spotsLeft <= 5)
    return { label: `⚡ ${spotsLeft} spots left`, bg: 'bg-orange-500', text: 'text-white', pulse: true }
  if (fillPercent >= 75)
    return { label: 'Almost full', bg: 'bg-orange-100', text: 'text-orange-700', pulse: false }
  if (limitedSpots)
    return { label: 'Limited spots', bg: 'bg-gray-100', text: 'text-gray-600', pulse: false }
  return null
}

function getBarColor(fillPercent: number) {
  if (fillPercent >= 85) return '#ef4444' // red
  if (fillPercent >= 65) return '#f97316' // orange
  if (fillPercent >= 40) return '#f59e0b' // amber
  return '#34d399'                         // green
}

export default function EventCard({ event, linkPrefix = '/events' }: EventCardProps) {
  const href = `${linkPrefix}/${event.id}`
  const host = hosts[event.hostId]
  const attendees = eventAttendees[event.id] ?? []
  const friends = attendees.filter((a) => a.isFriend)
  const goingCount = event.totalSpots - event.spotsLeft
  const stackedAvatars = attendees.slice(0, 4)
  const fillPercent = (goingCount / event.totalSpots) * 100
  const urgency = getUrgency(event.spotsLeft, event.totalSpots, event.limitedSpots, fillPercent)
  const barColor = getBarColor(fillPercent)

  return (
    <Link href={href} className="group block">
      <div className="card group-hover:-translate-y-1 transition-transform duration-300">
        {/* Image area */}
        <div className={`relative h-44 flex items-center justify-center overflow-hidden ${
          event.isPremium
            ? 'bg-gradient-to-br from-amber-200 via-yellow-100 to-orange-100'
            : 'bg-gradient-to-br from-amber-100 to-orange-100'
        }`}>
          <span className="text-6xl select-none">{event.emoji}</span>

          {/* Members-only overlay stripe */}
          {event.membersOnly && (
            <div className="absolute inset-0 bg-gradient-to-t from-violet-900/40 to-transparent pointer-events-none" />
          )}

          {/* Top-left badge stack */}
          <div className="absolute top-3 left-3 flex flex-col gap-1.5">
            {event.membersOnly && (
              <span className="badge bg-violet-600 text-white gap-1 shadow-sm">
                🔒 Members only
              </span>
            )}
            {event.isPremium && !event.membersOnly && (
              <span className="badge bg-gray-900 text-amber-400 gap-1 shadow-sm">
                ♛ Premium
              </span>
            )}
            {urgency ? (
              <span className={`badge ${urgency.bg} ${urgency.text} flex items-center gap-1.5`}>
                {urgency.pulse && (
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75" />
                    <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-white" />
                  </span>
                )}
                {urgency.label}
              </span>
            ) : event.price === 0 ? (
              <span className="badge bg-green-100 text-green-700">Free</span>
            ) : null}
          </div>

          <span className="absolute top-3 right-3 badge bg-white/90 text-gray-700 shadow-sm">
            {event.neighborhood}
          </span>
        </div>

        {/* Content */}
        <div className="p-5">
          <div className="flex items-center gap-2 text-xs text-amber-600 font-semibold mb-2">
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            {formatShortDate(event.date)} · {event.time}
          </div>

          <h3 className="font-bold text-gray-900 text-base leading-snug mb-2 group-hover:text-amber-600 transition-colors">
            {event.title}
          </h3>

          {/* Vibe tags */}
          <div className="flex flex-wrap gap-1.5 mb-3">
            {event.vibes.map((vibe) => {
              const cfg = vibeConfig[vibe]
              return (
                <span key={vibe} className={`badge ${cfg.bg} ${cfg.text} gap-1`}>
                  {cfg.emoji} {vibe}
                </span>
              )
            })}
          </div>

          <p className="text-sm text-gray-500 line-clamp-2 leading-relaxed mb-4">
            {event.description}
          </p>

          {/* Participant count + progress */}
          <div className="mb-3">
            <div className="flex items-center justify-between mb-1.5">
              <div className="flex items-center gap-2">
                <div className="flex -space-x-2">
                  {stackedAvatars.map((a) => (
                    <div
                      key={a.id}
                      className="w-6 h-6 rounded-full ring-2 ring-white flex items-center justify-center text-white text-[9px] font-bold shrink-0"
                      style={{ backgroundColor: a.color }}
                      title={a.name}
                    >
                      {a.initials}
                    </div>
                  ))}
                </div>
                <span className="text-xs font-semibold text-gray-700">
                  {goingCount} / {event.totalSpots} going
                </span>
                {friends.length > 0 && (
                  <span className="text-xs text-amber-600 font-semibold">
                    · {friends.length} friend{friends.length > 1 ? 's' : ''}
                  </span>
                )}
              </div>
              <span className="text-xs font-semibold" style={{ color: barColor }}>
                {Math.round(fillPercent)}%
              </span>
            </div>

            {/* Progress bar — color reflects urgency */}
            <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-500"
                style={{ width: `${fillPercent}%`, backgroundColor: barColor }}
              />
            </div>
          </div>

          {/* Bottom row: host + pricing */}
          <div className="flex items-center justify-between pt-3 mt-1 border-t border-gray-100">
            {host && (
              <div className="flex items-center gap-2 min-w-0">
                <div
                  className="w-6 h-6 rounded-full flex items-center justify-center text-white text-[10px] font-bold shrink-0"
                  style={{ backgroundColor: host.color }}
                >
                  {host.initials}
                </div>
                <div className="min-w-0">
                  <span className="text-[10px] text-gray-400 block leading-none mb-0.5">Hosted by</span>
                  <span className="text-xs font-semibold text-gray-700 truncate block">{host.name}</span>
                </div>
              </div>
            )}

            {/* Pricing */}
            <div className="text-right shrink-0">
              {event.price === 0 ? (
                <span className="text-sm font-bold text-green-600">Free</span>
              ) : event.memberPrice ? (
                <div>
                  <div className="flex items-baseline gap-1.5 justify-end">
                    <span className="text-[10px] text-violet-600 font-semibold">Members</span>
                    <span className="text-sm font-bold text-violet-700">₺{event.memberPrice}</span>
                  </div>
                  {!event.membersOnly && (
                    <div className="text-[10px] text-gray-400 text-right">
                      Guests <span className="line-through">₺{event.price}</span>
                    </div>
                  )}
                </div>
              ) : (
                <span className="text-sm font-bold text-gray-900">₺{event.price}</span>
              )}
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}
