import Link from 'next/link'
import { clubs, events } from '@/lib/data'
import EventCard from '@/components/EventCard'
import ClubCard from '@/components/ClubCard'

const stats = [
  { value: '2,400+', label: 'Members' },
  { value: '120+', label: 'Events this year' },
  { value: '5', label: 'Active clubs' },
  { value: '4.9★', label: 'Average rating' },
]

const steps = [
  {
    step: '01',
    title: 'Discover',
    description: "Browse upcoming events and clubs curated for Istanbul's social scene.",
    emoji: '🔍',
  },
  {
    step: '02',
    title: 'Join',
    description: 'Reserve your spot in seconds. No complicated sign-ups or waiting lists.',
    emoji: '✅',
  },
  {
    step: '03',
    title: 'Connect',
    description: 'Show up, meet people, and build genuine friendships that last.',
    emoji: '🤝',
  },
]

export default function HomePage() {
  const featuredEvents = events.slice(0, 3)
  const featuredClubs = clubs.slice(0, 4)

  return (
    <>
      {/* Hero */}
      <section className="relative bg-gradient-to-b from-amber-50 via-white to-white overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-10%,rgba(251,191,36,0.15),transparent)]" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-24 text-center relative">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-amber-100 text-amber-700 rounded-full text-sm font-semibold mb-8">
            <span>😊</span>
            <span>Istanbul's #1 Social Community</span>
          </div>

          <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-gray-900 leading-[1.08] mb-6">
            The Social Life
            <br />
            <span className="text-amber-500">Platform of Istanbul</span>
          </h1>

          <p className="text-xl md:text-2xl text-gray-500 max-w-2xl mx-auto leading-relaxed mb-10">
            Discover events, join clubs, and meet remarkable people.
            Real experiences, genuine connections.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Link href="/events" className="btn-primary text-base px-8 py-4">
              Explore events
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
            <Link href="/onboarding" className="btn-secondary text-base px-8 py-4">
              Join for free
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-3xl font-extrabold text-gray-900">{stat.value}</div>
                <div className="text-sm text-gray-500 mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="section-title">How Smileys works</h2>
            <p className="section-subtitle max-w-xl mx-auto">
              Three simple steps to transform your social life in Istanbul.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((s, i) => (
              <div
                key={s.step}
                className="relative text-center p-8 rounded-2xl bg-gray-50 hover:bg-amber-50 transition-colors duration-300 group"
              >
                {i < steps.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 -right-4 w-8 text-gray-300 text-xl z-10">
                    →
                  </div>
                )}
                <div className="w-16 h-16 rounded-2xl bg-white shadow-card flex items-center justify-center mx-auto mb-5 text-3xl group-hover:scale-110 transition-transform duration-300">
                  {s.emoji}
                </div>
                <span className="text-xs font-bold text-amber-500 tracking-widest uppercase">
                  Step {s.step}
                </span>
                <h3 className="text-xl font-bold text-gray-900 mt-2 mb-3">{s.title}</h3>
                <p className="text-gray-500 leading-relaxed text-sm">{s.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Events */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-12">
            <div>
              <h2 className="section-title">Upcoming events</h2>
              <p className="section-subtitle">Hand-picked experiences for this week.</p>
            </div>
            <Link href="/events" className="hidden md:flex btn-ghost text-sm items-center gap-1">
              View all
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredEvents.map((event) => (
              <EventCard key={event.id} event={event} linkPrefix="/events" />
            ))}
          </div>

          <div className="text-center mt-10 md:hidden">
            <Link href="/events" className="btn-secondary">
              View all events
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Clubs */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-12">
            <div>
              <h2 className="section-title">Our clubs</h2>
              <p className="section-subtitle">Find your community. Every interest covered.</p>
            </div>
            <Link href="/clubs" className="hidden md:flex btn-ghost text-sm items-center gap-1">
              All clubs
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredClubs.map((club) => (
              <ClubCard key={club.id} club={club} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-24 bg-amber-500">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-5xl block mb-6">😊</span>
          <h2 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-4">
            Ready to build your social life?
          </h2>
          <p className="text-xl text-amber-100 mb-10 max-w-xl mx-auto">
            Join thousands of people who've found their community in Istanbul through Smileys.
          </p>
          <Link
            href="/onboarding"
            className="inline-flex items-center gap-2 px-8 py-4 bg-white text-amber-600 font-bold rounded-xl hover:bg-amber-50 transition-colors shadow-lg text-base"
          >
            Get started — it's free
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </section>
    </>
  )
}
