import { notFound } from 'next/navigation'
import Link from 'next/link'
import { events, getEventById, clubs, formatDate, eventAttendees, vibeConfig, hosts } from '@/lib/data'

export function generateStaticParams() {
  return events.map((e) => ({ id: e.id }))
}

export default async function PublicEventDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const event = getEventById(id)
  if (!event) notFound()

  const club = clubs.find((c) => c.id === event.clubId)
  const host = hosts[event.hostId]
  const fillPercent = ((event.totalSpots - event.spotsLeft) / event.totalSpots) * 100
  const attendees = eventAttendees[event.id] ?? []
  const goingCount = event.totalSpots - event.spotsLeft
  const remainingCount = goingCount - attendees.length

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link
            href="/events"
            className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-900 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            All events
          </Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

          {/* ── Main column ── */}
          <div className="lg:col-span-2 space-y-6">

            {/* Hero card */}
            <div className="bg-white rounded-2xl shadow-card overflow-hidden">
              <div className={`h-56 flex items-center justify-center ${
                event.isPremium
                  ? 'bg-gradient-to-br from-amber-200 via-yellow-100 to-orange-100'
                  : 'bg-gradient-to-br from-amber-100 to-orange-100'
              }`}>
                <span className="text-8xl select-none">{event.emoji}</span>
              </div>

              <div className="p-8">
                {/* Premium / members-only banner */}
                {event.membersOnly && (
                  <div className="flex items-center gap-3 bg-violet-50 border border-violet-200 rounded-xl px-4 py-3 mb-5">
                    <span className="text-xl">🔒</span>
                    <div>
                      <div className="font-semibold text-violet-800 text-sm">Members only event</div>
                      <div className="text-xs text-violet-600 mt-0.5">
                        This event is exclusively available to Smileys members.
                      </div>
                    </div>
                    <a href="#pricing" className="ml-auto text-xs font-semibold text-violet-700 hover:underline shrink-0">
                      See pricing →
                    </a>
                  </div>
                )}
                {event.isPremium && !event.membersOnly && (
                  <div className="flex items-center gap-3 bg-amber-50 border border-amber-200 rounded-xl px-4 py-3 mb-5">
                    <span className="text-xl">♛</span>
                    <div>
                      <div className="font-semibold text-amber-800 text-sm">Premium event</div>
                      <div className="text-xs text-amber-600 mt-0.5">
                        Members save ₺{event.price - (event.memberPrice ?? event.price)} on this event.
                      </div>
                    </div>
                    <a href="#pricing" className="ml-auto text-xs font-semibold text-amber-700 hover:underline shrink-0">
                      Member pricing →
                    </a>
                  </div>
                )}

                {/* Vibes */}
                <div className="flex flex-wrap gap-2 mb-3">
                  {event.vibes.map((vibe) => {
                    const cfg = vibeConfig[vibe]
                    return (
                      <span key={vibe} className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-semibold ${cfg.bg} ${cfg.text}`}>
                        {cfg.emoji} {vibe}
                      </span>
                    )
                  })}
                </div>

                <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight mb-3">
                  {event.title}
                </h1>

                <div className="flex flex-wrap gap-1.5 mb-4">
                  {event.tags.map((tag) => (
                    <span key={tag} className="badge bg-gray-100 text-gray-500">{tag}</span>
                  ))}
                </div>

                <p className="text-gray-600 leading-relaxed text-base">{event.description}</p>
              </div>
            </div>

            {/* Event details */}
            <div className="bg-white rounded-2xl shadow-card p-8">
              <h2 className="text-lg font-bold text-gray-900 mb-5">Event details</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {[
                  {
                    icon: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z',
                    label: 'Date & Time',
                    value: `${formatDate(event.date)} at ${event.time}`,
                  },
                  {
                    icon: 'M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z',
                    label: 'Location',
                    value: `${event.location}, ${event.neighborhood}`,
                  },
                  {
                    icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z',
                    label: 'Capacity',
                    value: `${goingCount} / ${event.totalSpots} joined`,
                  },
                ].map((detail) => (
                  <div key={detail.label} className="flex gap-3">
                    <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center shrink-0">
                      <svg className="w-5 h-5 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={detail.icon} />
                      </svg>
                    </div>
                    <div>
                      <div className="text-xs text-gray-400 font-medium">{detail.label}</div>
                      <div className="text-sm font-semibold text-gray-900 mt-0.5">{detail.value}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Pricing (premium events) */}
            {(event.isPremium || event.membersOnly) && (
              <div id="pricing" className="bg-white rounded-2xl shadow-card p-8">
                <h2 className="text-lg font-bold text-gray-900 mb-5">Pricing</h2>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-4 rounded-xl bg-violet-50 border-2 border-violet-200">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-violet-600 flex items-center justify-center">
                        <span className="text-white text-base">♛</span>
                      </div>
                      <div>
                        <div className="font-semibold text-gray-900 text-sm">Smileys Member</div>
                        <div className="text-xs text-violet-600 mt-0.5">Includes all member benefits</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-xl font-extrabold text-violet-700">
                        {event.memberPrice === 0 ? 'Free' : `₺${event.memberPrice}`}
                      </div>
                      {event.memberPrice !== undefined && event.price > event.memberPrice && (
                        <div className="text-xs text-violet-500 font-medium">
                          Save ₺{event.price - event.memberPrice}
                        </div>
                      )}
                    </div>
                  </div>

                  {!event.membersOnly ? (
                    <div className="flex items-center justify-between p-4 rounded-xl bg-gray-50 border border-gray-200">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-gray-200 flex items-center justify-center">
                          <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                          </svg>
                        </div>
                        <div>
                          <div className="font-semibold text-gray-900 text-sm">Guest</div>
                          <div className="text-xs text-gray-500 mt-0.5">Standard admission</div>
                        </div>
                      </div>
                      <div className="text-xl font-extrabold text-gray-700">₺{event.price}</div>
                    </div>
                  ) : (
                    <div className="flex items-center gap-3 p-4 rounded-xl bg-gray-50 border border-dashed border-gray-300">
                      <svg className="w-5 h-5 text-gray-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                      </svg>
                      <p className="text-sm text-gray-500">
                        Guest access is not available.{' '}
                        <Link href="/onboarding" className="text-violet-600 font-semibold hover:underline">
                          Become a member
                        </Link>{' '}
                        to join.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Host */}
            {host && (
              <div className="bg-white rounded-2xl shadow-card p-6">
                <h2 className="text-lg font-bold text-gray-900 mb-4">Your host</h2>
                <div className="flex items-start gap-4">
                  <div
                    className="w-14 h-14 rounded-2xl flex items-center justify-center text-white text-lg font-bold shrink-0 shadow-sm"
                    style={{ backgroundColor: host.color }}
                  >
                    {host.initials}
                  </div>
                  <div>
                    <div className="font-bold text-gray-900">{host.name}</div>
                    <div className="text-xs text-gray-400 mt-0.5 mb-3">{host.role}</div>
                    <p className="text-sm text-gray-600 leading-relaxed">{host.bio}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Attendees — public teaser */}
            <div className="bg-white rounded-2xl shadow-card p-8">
              <div className="flex items-center justify-between mb-5">
                <h2 className="text-lg font-bold text-gray-900">{goingCount} people going</h2>
                <div className="flex -space-x-2">
                  {attendees.slice(0, 5).map((a) => (
                    <div
                      key={a.id}
                      className="w-8 h-8 rounded-full ring-2 ring-white flex items-center justify-center text-white text-[10px] font-bold"
                      style={{ backgroundColor: a.color }}
                      title={a.name}
                    >
                      {a.initials}
                    </div>
                  ))}
                  {remainingCount > 0 && (
                    <div className="w-8 h-8 rounded-full ring-2 ring-white bg-gray-100 flex items-center justify-center text-gray-500 text-[10px] font-bold">
                      +{remainingCount}
                    </div>
                  )}
                </div>
              </div>

              {/* Blurred teaser rows */}
              <div className="relative">
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 select-none pointer-events-none blur-sm opacity-60">
                  {attendees.slice(0, 6).map((a) => (
                    <div key={a.id} className="flex items-center gap-2.5 p-2.5 rounded-xl bg-gray-50">
                      <div
                        className="w-9 h-9 rounded-full flex items-center justify-center text-white text-xs font-bold shrink-0"
                        style={{ backgroundColor: a.color }}
                      >
                        {a.initials}
                      </div>
                      <div className="min-w-0">
                        <div className="text-sm font-medium text-gray-900 truncate">{a.name}</div>
                        <div className="text-xs text-gray-400 truncate">{a.bio}</div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Overlay CTA */}
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-white/70 rounded-xl backdrop-blur-[1px]">
                  <p className="text-sm font-semibold text-gray-700">See who you might know</p>
                  <Link href="/onboarding" className="btn-primary text-sm py-2 px-5">
                    Join Smileys — it's free
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* ── Sidebar ── */}
          <div className="space-y-5">
            <div className="bg-white rounded-2xl shadow-card p-6 sticky top-24">
              {event.membersOnly && (
                <div className="flex items-center gap-1.5 justify-center mb-4 px-3 py-1.5 rounded-lg bg-violet-50 border border-violet-200">
                  <span className="text-sm">🔒</span>
                  <span className="text-xs font-semibold text-violet-700">Members only</span>
                </div>
              )}
              {event.isPremium && !event.membersOnly && (
                <div className="flex items-center gap-1.5 justify-center mb-4 px-3 py-1.5 rounded-lg bg-amber-50 border border-amber-200">
                  <span className="text-sm">♛</span>
                  <span className="text-xs font-semibold text-amber-700">Premium event</span>
                </div>
              )}

              {/* Price */}
              <div className="mb-5">
                {event.memberPrice !== undefined ? (
                  <div className="space-y-2">
                    <div className="flex justify-between items-baseline">
                      <span className="text-xs font-semibold text-violet-600">Member price</span>
                      <span className="text-2xl font-extrabold text-violet-700">
                        {event.memberPrice === 0 ? 'Free' : `₺${event.memberPrice}`}
                      </span>
                    </div>
                    {!event.membersOnly && (
                      <div className="flex justify-between items-baseline">
                        <span className="text-xs text-gray-400">Guest price</span>
                        <span className="text-sm text-gray-400 line-through">₺{event.price}</span>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="text-center">
                    <div className="text-3xl font-extrabold text-gray-900">
                      {event.price === 0 ? <span className="text-green-600">Free</span> : <>₺{event.price}</>}
                    </div>
                    {event.price > 0 && <div className="text-sm text-gray-400 mt-0.5">per person</div>}
                  </div>
                )}
              </div>

              {/* Spots bar */}
              <div className="mb-5">
                <div className="flex justify-between text-xs text-gray-500 mb-1.5">
                  <span>{goingCount} going</span>
                  <span className={event.spotsLeft <= 5 ? 'text-red-500 font-semibold' : ''}>
                    {event.spotsLeft} spots left
                  </span>
                </div>
                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full bg-amber-400 rounded-full" style={{ width: `${fillPercent}%` }} />
                </div>
              </div>

              <Link href="/onboarding" className="btn-primary w-full justify-center text-base py-3.5 mb-3">
                {event.membersOnly ? 'Become a member to join' : 'Join Smileys to attend'}
              </Link>
              <Link href="/app" className="btn-secondary w-full justify-center text-sm py-2.5 mb-3">
                Sign in
              </Link>
              {event.whatsappUrl && (
                <a
                  href={event.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 w-full px-4 py-2.5 rounded-xl bg-[#25D366] hover:bg-[#1ebe5d] text-white text-sm font-semibold transition-colors"
                >
                  <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                  Join WhatsApp Group
                </a>
              )}

              {event.limitedSpots && event.spotsLeft <= 5 && (
                <p className="text-center text-xs text-red-500 font-medium mt-3">
                  ⚡ Only {event.spotsLeft} spots remaining!
                </p>
              )}
            </div>

            {host && (
              <div className="bg-white rounded-2xl shadow-card p-5">
                <p className="text-xs text-gray-400 font-medium mb-3">Hosted by</p>
                <div className="flex items-center gap-3">
                  <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center text-white font-bold shrink-0"
                    style={{ backgroundColor: host.color }}
                  >
                    {host.initials}
                  </div>
                  <div>
                    <div className="font-semibold text-sm text-gray-900">{host.name}</div>
                    <div className="text-xs text-gray-400 mt-0.5">{host.role}</div>
                  </div>
                </div>
              </div>
            )}

            {club && (
              <div className="bg-white rounded-2xl shadow-card p-5">
                <p className="text-xs text-gray-400 font-medium mb-3">Part of</p>
                <Link href={`/clubs/${club.slug}`} className="group flex items-center gap-3">
                  <div className={`w-11 h-11 rounded-xl ${club.bgColor} flex items-center justify-center text-xl shrink-0`}>
                    {club.emoji}
                  </div>
                  <div>
                    <div className="font-semibold text-sm text-gray-900 group-hover:text-amber-600 transition-colors">
                      {club.name}
                    </div>
                    <div className="text-xs text-gray-500">{club.memberCount} members</div>
                  </div>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
