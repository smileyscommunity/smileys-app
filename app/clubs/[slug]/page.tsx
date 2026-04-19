import { notFound } from 'next/navigation'
import Link from 'next/link'
import { clubs, getClubBySlug, getEventsByClub } from '@/lib/data'
import EventCard from '@/components/EventCard'

export function generateStaticParams() {
  return clubs.map((c) => ({ slug: c.slug }))
}

export default async function ClubDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const club = getClubBySlug(slug)
  if (!club) notFound()

  const clubEvents = getEventsByClub(club!.id)

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <div className={`${club.bgColor} py-16`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/clubs"
            className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-900 mb-8 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            All clubs
          </Link>

          <div className="flex items-start gap-6">
            <div className="w-20 h-20 rounded-2xl bg-white shadow-card flex items-center justify-center text-4xl shrink-0">
              {club.emoji}
            </div>
            <div>
              <span className={`text-xs font-bold ${club.color} uppercase tracking-widest`}>
                {club.category}
              </span>
              <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900 mt-1 mb-3">
                {club.name}
              </h1>
              <div className="flex items-center gap-4 text-sm text-gray-600">
                <span className="flex items-center gap-1.5">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  {club.memberCount} members
                </span>
                <span className="flex items-center gap-1.5">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  {clubEvents.length} upcoming events
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Main */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-card p-8 mb-8">
              <h2 className="text-xl font-bold text-gray-900 mb-4">About this club</h2>
              <p className="text-gray-600 leading-relaxed text-base">{club.description}</p>
            </div>

            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              {clubEvents.length > 0 ? 'Upcoming events' : 'No upcoming events'}
            </h2>

            {clubEvents.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {clubEvents.map((event) => (
                  <EventCard key={event.id} event={event} linkPrefix="/events" />
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-2xl shadow-card p-12 text-center">
                <span className="text-4xl block mb-3">📅</span>
                <p className="text-gray-500">No events scheduled yet. Check back soon!</p>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-card p-6">
              <h3 className="font-bold text-gray-900 mb-4">Join this club</h3>
              <p className="text-sm text-gray-500 mb-5">
                Become a member to get early access to events, exclusive content, and connect
                with the community.
              </p>
              <Link href="/app" className="btn-primary w-full justify-center">
                Join {club.name}
              </Link>
              <p className="text-center text-xs text-gray-400 mt-3">Free to join</p>
            </div>

            <div className="bg-white rounded-2xl shadow-card p-6">
              <h3 className="font-bold text-gray-900 mb-4">Club info</h3>
              <dl className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <dt className="text-gray-500">Category</dt>
                  <dd className="font-medium text-gray-900">{club.category}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-gray-500">Members</dt>
                  <dd className="font-medium text-gray-900">{club.memberCount}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-gray-500">Events</dt>
                  <dd className="font-medium text-gray-900">{clubEvents.length} upcoming</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-gray-500">Location</dt>
                  <dd className="font-medium text-gray-900">Istanbul</dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
