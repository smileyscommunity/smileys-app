import { events } from '@/lib/data'
import EventCard from '@/components/EventCard'

const categories = ['All', 'Dining', 'Sailing', 'Languages', 'Music', 'Outdoor', 'Free']

export default function EventsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 mb-2">
            Upcoming Events
          </h1>
          <p className="text-lg text-gray-500">
            Curated experiences happening across Istanbul this season.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filters (UI only) */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          {/* Category pills */}
          <div className="flex flex-wrap gap-2 flex-1">
            {categories.map((cat, i) => (
              <button
                key={cat}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  i === 0
                    ? 'bg-amber-500 text-white shadow-sm'
                    : 'bg-white text-gray-600 border border-gray-200 hover:border-amber-400 hover:text-amber-600'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Sort + Date filter */}
          <div className="flex gap-2 shrink-0">
            <select className="px-4 py-2 rounded-xl border border-gray-200 text-sm text-gray-600 bg-white focus:outline-none focus:ring-2 focus:ring-amber-400">
              <option>Any date</option>
              <option>This week</option>
              <option>This month</option>
            </select>
            <select className="px-4 py-2 rounded-xl border border-gray-200 text-sm text-gray-600 bg-white focus:outline-none focus:ring-2 focus:ring-amber-400">
              <option>All areas</option>
              <option>Beyoğlu</option>
              <option>Beşiktaş</option>
              <option>Karaköy</option>
              <option>Bebek</option>
            </select>
            <select className="px-4 py-2 rounded-xl border border-gray-200 text-sm text-gray-600 bg-white focus:outline-none focus:ring-2 focus:ring-amber-400">
              <option>Sort: Date</option>
              <option>Sort: Price</option>
              <option>Sort: Popularity</option>
            </select>
          </div>
        </div>

        {/* Results count */}
        <p className="text-sm text-gray-500 mb-6">
          Showing <span className="font-semibold text-gray-900">{events.length}</span> events
        </p>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event) => (
            <EventCard key={event.id} event={event} linkPrefix="/events" />
          ))}
        </div>
      </div>
    </div>
  )
}
