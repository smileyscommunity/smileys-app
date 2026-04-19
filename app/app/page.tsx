import Link from 'next/link'
import { events, clubs, formatDate } from '@/lib/data'
import EventCard from '@/components/EventCard'

const joinedClubs = clubs.slice(0, 3)
const upcomingEvents = events.slice(0, 3)

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top bar */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 font-medium">Welcome back 👋</p>
              <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight mt-1">
                Your Dashboard
              </h1>
            </div>
            <Link href="/app/events" className="btn-primary text-sm">
              Browse events
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Quick stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          {[
            { label: 'Events joined', value: '7', emoji: '🎉' },
            { label: 'Clubs', value: '3', emoji: '🏛️' },
            { label: 'Friends made', value: '14', emoji: '🤝' },
            { label: 'Events this month', value: '2', emoji: '📅' },
          ].map((stat) => (
            <div key={stat.label} className="bg-white rounded-2xl shadow-card p-5">
              <span className="text-2xl block mb-2">{stat.emoji}</span>
              <div className="text-2xl font-extrabold text-gray-900">{stat.value}</div>
              <div className="text-xs text-gray-500 mt-0.5">{stat.label}</div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Upcoming Events */}
          <div className="lg:col-span-2">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-xl font-bold text-gray-900">Upcoming events</h2>
              <Link href="/app/events" className="text-sm text-amber-600 font-semibold hover:underline">
                View all
              </Link>
            </div>
            <div className="space-y-4">
              {upcomingEvents.map((event) => (
                <Link
                  key={event.id}
                  href={`/app/events/${event.id}`}
                  className="group flex gap-4 bg-white rounded-2xl shadow-card p-4 hover:-translate-y-0.5 transition-transform duration-200"
                >
                  <div className="w-14 h-14 rounded-xl bg-amber-50 flex items-center justify-center text-2xl shrink-0">
                    {event.emoji}
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="font-semibold text-gray-900 group-hover:text-amber-600 transition-colors truncate">
                      {event.title}
                    </h3>
                    <p className="text-xs text-gray-500 mt-0.5">{formatDate(event.date)} · {event.time}</p>
                    <p className="text-xs text-gray-400 mt-0.5">{event.location}, {event.neighborhood}</p>
                  </div>
                  <div className="text-right shrink-0">
                    <span className="text-sm font-bold text-gray-900">
                      {event.price === 0 ? 'Free' : `₺${event.price}`}
                    </span>
                    {event.limitedSpots && (
                      <p className="text-xs text-red-500 mt-0.5">{event.spotsLeft} left</p>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Joined Clubs */}
          <div>
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-xl font-bold text-gray-900">Your clubs</h2>
              <Link href="/app/clubs" className="text-sm text-amber-600 font-semibold hover:underline">
                Manage
              </Link>
            </div>
            <div className="space-y-3">
              {joinedClubs.map((club) => (
                <Link
                  key={club.id}
                  href={`/clubs/${club.slug}`}
                  className="group flex items-center gap-3 bg-white rounded-2xl shadow-card p-4 hover:-translate-y-0.5 transition-transform duration-200"
                >
                  <div className={`w-12 h-12 rounded-xl ${club.bgColor} flex items-center justify-center text-xl shrink-0`}>
                    {club.emoji}
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-semibold text-sm text-gray-900 group-hover:text-amber-600 transition-colors truncate">
                      {club.name}
                    </h3>
                    <p className="text-xs text-gray-500">{club.memberCount} members</p>
                  </div>
                  <svg className="w-4 h-4 text-gray-300 ml-auto shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              ))}
              <Link
                href="/app/clubs"
                className="flex items-center justify-center gap-2 w-full py-3 rounded-2xl border-2 border-dashed border-gray-200 text-sm text-gray-500 hover:border-amber-400 hover:text-amber-600 transition-colors"
              >
                + Discover more clubs
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
