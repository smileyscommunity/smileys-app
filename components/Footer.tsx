import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-gray-950 text-gray-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-2xl">😊</span>
              <span className="font-bold text-lg text-white">Smileys Community</span>
            </div>
            <p className="text-sm leading-relaxed max-w-xs">
              The social life platform of Istanbul. Connecting people through shared
              experiences, meaningful events, and vibrant clubs.
            </p>
            <p className="mt-6 text-sm text-gray-500">Istanbul, Turkey 🇹🇷</p>
          </div>

          {/* Explore */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-4">Explore</h4>
            <ul className="space-y-2.5 text-sm">
              <li><Link href="/events" className="hover:text-white transition-colors">Events</Link></li>
              <li><Link href="/clubs" className="hover:text-white transition-colors">Clubs</Link></li>
              <li><Link href="/app" className="hover:text-white transition-colors">Dashboard</Link></li>
            </ul>
          </div>

          {/* Clubs */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-4">Clubs</h4>
            <ul className="space-y-2.5 text-sm">
              <li><Link href="/clubs/smileys-sailing-club" className="hover:text-white transition-colors">Sailing Club</Link></li>
              <li><Link href="/clubs/speakeasy" className="hover:text-white transition-colors">SpeakEasy</Link></li>
              <li><Link href="/clubs/eat-up-istanbul" className="hover:text-white transition-colors">Eat Up Istanbul</Link></li>
              <li><Link href="/clubs/flow-by-smileys" className="hover:text-white transition-colors">Flow by Smileys</Link></li>
              <li><Link href="/clubs/hiking-club" className="hover:text-white transition-colors">Hiking Club</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-800 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-gray-600">
          <p>&copy; 2026 Smileys Community. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-gray-400 transition-colors">Privacy</a>
            <a href="#" className="hover:text-gray-400 transition-colors">Terms</a>
            <a href="#" className="hover:text-gray-400 transition-colors">Contact</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
