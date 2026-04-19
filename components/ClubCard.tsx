import Link from 'next/link'
import { Club } from '@/lib/data'

interface ClubCardProps {
  club: Club
  showJoin?: boolean
}

export default function ClubCard({ club, showJoin = false }: ClubCardProps) {
  return (
    <Link href={`/clubs/${club.slug}`} className="group block">
      <div className="card group-hover:-translate-y-1 transition-transform duration-300 h-full">
        {/* Header */}
        <div className={`${club.bgColor} h-28 flex items-center justify-center`}>
          <span className="text-5xl select-none">{club.emoji}</span>
        </div>

        {/* Content */}
        <div className="p-5 flex flex-col h-[calc(100%-7rem)]">
          <div className="mb-1">
            <span className={`text-xs font-semibold ${club.color} uppercase tracking-wide`}>
              {club.category}
            </span>
          </div>

          <h3 className="font-bold text-gray-900 text-base mb-2 group-hover:text-amber-600 transition-colors">
            {club.name}
          </h3>

          <p className="text-sm text-gray-500 leading-relaxed line-clamp-3 flex-1">
            {club.description}
          </p>

          <div className="mt-4 flex items-center justify-between">
            <div className="flex items-center gap-1.5 text-xs text-gray-500">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span>{club.memberCount} members</span>
            </div>

            {showJoin ? (
              <button
                onClick={(e) => e.preventDefault()}
                className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-amber-500 text-white hover:bg-amber-600 transition-colors"
              >
                Join
              </button>
            ) : (
              <span className="text-xs text-amber-600 font-semibold group-hover:underline">
                View club →
              </span>
            )}
          </div>
        </div>
      </div>
    </Link>
  )
}
