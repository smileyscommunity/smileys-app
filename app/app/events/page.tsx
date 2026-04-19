import { events } from '@/lib/data'
import EventCard from '@/components/EventCard'
import Link from 'next/link'

export default function AppEventsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="flex items-center gap-3 text-sm text-gray-500 mb-4">
            <Link href="/app" className="hover:text-gray-900 transition-colors">Dashboard</Link>
            <span>/</span>
            <span className="text-gray-900 font-medium">Events</span>
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 mb-2">
            Browse Events
          </h1>
          <p className="text-gray-500">Find your next experience in Istanbul.</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filter bar */}
        <div className="flex flex-wrap gap-2 mb-8">
          {['All', 'This week', 'Free', 'Limited spots', 'Dining', 'Music', 'Outdoors'].map((f, i) => (
            <button
              key={f}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                i === 0
                  ? 'bg-amber-500 text-white'
                  : 'bg-white border border-gray-200 text-gray-600 hover:border-amber-400 hover:text-amber-600'
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event) => (
            <div key={event.id} className="relative">
              <EventCard event={event} linkPrefix="/app/events" />
              <button className="absolute bottom-[4.5rem] right-5 text-xs font-semibold px-3 py-1.5 rounded-lg bg-amber-500 text-white hover:bg-amber-600 transition-colors shadow-sm z-10">
                Quick join
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
