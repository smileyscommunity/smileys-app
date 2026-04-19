import { clubs } from '@/lib/data'
import ClubCard from '@/components/ClubCard'

export default function ClubsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 mb-2">
            Our Clubs
          </h1>
          <p className="text-lg text-gray-500">
            Join a community that matches your passions and lifestyle.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Stats bar */}
        <div className="grid grid-cols-3 gap-4 mb-10 bg-white rounded-2xl p-6 shadow-card">
          <div className="text-center">
            <div className="text-2xl font-extrabold text-gray-900">{clubs.length}</div>
            <div className="text-sm text-gray-500 mt-0.5">Active clubs</div>
          </div>
          <div className="text-center border-x border-gray-100">
            <div className="text-2xl font-extrabold text-gray-900">1,100+</div>
            <div className="text-sm text-gray-500 mt-0.5">Total members</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-extrabold text-gray-900">5</div>
            <div className="text-sm text-gray-500 mt-0.5">Categories</div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {clubs.map((club) => (
            <ClubCard key={club.id} club={club} />
          ))}
        </div>
      </div>
    </div>
  )
}
