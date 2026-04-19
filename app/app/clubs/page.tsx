import Link from 'next/link'
import { clubs } from '@/lib/data'

const joinedClubIds = ['1', '3', '4']

export default function AppClubsPage() {
  const joinedClubs = clubs.filter((c) => joinedClubIds.includes(c.id))
  const discoverClubs = clubs.filter((c) => !joinedClubIds.includes(c.id))

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="flex items-center gap-3 text-sm text-gray-500 mb-4">
            <Link href="/app" className="hover:text-gray-900 transition-colors">Dashboard</Link>
            <span>/</span>
            <span className="text-gray-900 font-medium">Clubs</span>
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 mb-2">Your Clubs</h1>
          <p className="text-gray-500">Manage your memberships and discover new communities.</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
        {/* Joined clubs */}
        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-5">
            Joined ({joinedClubs.length})
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {joinedClubs.map((club) => (
              <div key={club.id} className="bg-white rounded-2xl shadow-card overflow-hidden group hover:-translate-y-1 transition-transform duration-300">
                <div className={`${club.bgColor} h-24 flex items-center justify-center`}>
                  <span className="text-4xl">{club.emoji}</span>
                </div>
                <div className="p-5">
                  <span className={`text-xs font-bold uppercase tracking-wide ${club.color}`}>
                    {club.category}
                  </span>
                  <h3 className="font-bold text-gray-900 mt-1 mb-2">{club.name}</h3>
                  <p className="text-xs text-gray-500 line-clamp-2 mb-4">{club.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500">{club.memberCount} members</span>
                    <div className="flex gap-2">
                      <Link
                        href={`/clubs/${club.slug}`}
                        className="text-xs px-3 py-1.5 rounded-lg border border-gray-200 text-gray-600 hover:border-gray-300 transition-colors font-medium"
                      >
                        View
                      </Link>
                      <button className="text-xs px-3 py-1.5 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 transition-colors font-medium">
                        Leave
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Discover */}
        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-5">
            Discover more clubs
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {discoverClubs.map((club) => (
              <div key={club.id} className="bg-white rounded-2xl shadow-card p-5 flex gap-4 group hover:-translate-y-0.5 transition-transform duration-200">
                <div className={`${club.bgColor} w-14 h-14 rounded-xl flex items-center justify-center text-2xl shrink-0`}>
                  {club.emoji}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-gray-900 text-sm">{club.name}</h3>
                  <p className="text-xs text-gray-500 line-clamp-2 mt-1 leading-relaxed">
                    {club.description}
                  </p>
                  <div className="flex items-center justify-between mt-3">
                    <span className="text-xs text-gray-400">{club.memberCount} members</span>
                    <button className="text-xs px-3 py-1.5 rounded-lg bg-amber-500 text-white hover:bg-amber-600 transition-colors font-semibold">
                      Join club
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}
