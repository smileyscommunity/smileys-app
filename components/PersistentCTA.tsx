'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function PersistentCTA() {
  const pathname = usePathname()

  // Hide on admin and onboarding (has its own full-screen flow)
  if (pathname.startsWith('/admin') || pathname.startsWith('/onboarding')) return null

  return (
    <div className="fixed bottom-0 inset-x-0 z-40 pointer-events-none">
      {/* Gradient fade */}
      <div className="h-16 bg-gradient-to-t from-white/90 to-transparent" />
      <div className="bg-white/90 backdrop-blur-md border-t border-gray-100 pointer-events-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between gap-4">
          <p className="text-sm text-gray-500 hidden sm:block">
            <span className="font-semibold text-gray-800">Smileys Community</span>
            {' '}· Istanbul's social lifestyle platform
          </p>
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <Link
              href="/events"
              className="flex-1 sm:flex-none inline-flex items-center justify-center px-5 py-2.5 rounded-xl border border-gray-200 bg-white hover:bg-gray-50 text-sm font-semibold text-gray-700 transition-colors shadow-sm"
            >
              Explore Events
            </Link>
            <Link
              href="/onboarding"
              className="flex-1 sm:flex-none inline-flex items-center justify-center px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white text-sm font-semibold transition-colors shadow-sm"
            >
              Join Community
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
