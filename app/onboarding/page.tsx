'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { clubs, events, vibeConfig, eventAttendees, hosts, formatShortDate } from '@/lib/data'
import type { VibeTag } from '@/lib/data'
import { useAuth } from '@/contexts/AuthContext'

const TOTAL_STEPS = 6
const VIBES = Object.keys(vibeConfig) as VibeTag[]

const NEIGHBORHOODS = [
  { id: 'kadikoy',   label: 'Kadıköy',   emoji: '☕', desc: 'Vibrant & artsy, Asia side' },
  { id: 'taksim',    label: 'Taksim',    emoji: '🎭', desc: 'Heart of the city' },
  { id: 'besiktas',  label: 'Beşiktaş',  emoji: '⚓', desc: 'Waterfront & lively' },
  { id: 'bomonti',   label: 'Bomonti',   emoji: '🍺', desc: 'Trendy, up-and-coming' },
  { id: 'cihangir',  label: 'Cihangir',  emoji: '🎨', desc: 'Creative & bohemian' },
  { id: 'bebek',     label: 'Bebek',     emoji: '🌊', desc: 'Bosphorus views' },
  { id: 'karakoy',   label: 'Karaköy',   emoji: '🚢', desc: 'Hip port district' },
  { id: 'macka',     label: 'Maçka',     emoji: '🌿', desc: 'Parks & outdoor life' },
  { id: 'nisantasi', label: 'Nişantaşı', emoji: '🛍️', desc: 'Chic & sophisticated' },
  { id: 'uskudar',   label: 'Üsküdar',   emoji: '🕌', desc: 'Historic & authentic' },
  { id: 'galata',    label: 'Galata',    emoji: '🗼', desc: 'Tower & history' },
  { id: 'beyoglu',   label: 'Beyoğlu',   emoji: '🎵', desc: 'Nightlife & culture' },
]

// ─── Progress bar ────────────────────────────────────────────────────────────
function ProgressBar({ step }: { step: number }) {
  const pct = Math.round((step / TOTAL_STEPS) * 100)
  return (
    <div className="w-full h-1 bg-gray-100">
      <div
        className="h-full bg-amber-500 transition-all duration-500 ease-out"
        style={{ width: `${pct}%` }}
      />
    </div>
  )
}

// ─── Step header ─────────────────────────────────────────────────────────────
function StepHeader({
  step,
  onSkip,
}: {
  step: number
  onSkip?: () => void
}) {
  return (
    <div className="flex items-center justify-between mb-8">
      <div className="flex items-center gap-2">
        <span className="text-xl">😊</span>
        <span className="font-bold text-gray-900 text-sm">Smileys</span>
      </div>
      <span className="text-xs font-semibold text-gray-400">
        {step} / {TOTAL_STEPS}
      </span>
      {onSkip && (
        <button
          onClick={onSkip}
          className="text-xs text-gray-400 hover:text-gray-600 transition-colors font-medium"
        >
          Skip
        </button>
      )}
    </div>
  )
}

// ─── Nav buttons ─────────────────────────────────────────────────────────────
function NavRow({
  onBack,
  onNext,
  nextLabel = 'Continue',
  nextDisabled = false,
}: {
  onBack?: () => void
  onNext: () => void
  nextLabel?: string
  nextDisabled?: boolean
}) {
  return (
    <div className={`flex gap-3 pt-6 ${onBack ? 'justify-between' : 'justify-end'}`}>
      {onBack && (
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 px-5 py-3 rounded-xl border border-gray-200 text-sm font-semibold text-gray-600 hover:bg-gray-50 transition-colors"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16l-4-4m0 0l4-4m-4 4h18" />
          </svg>
          Back
        </button>
      )}
      <button
        onClick={onNext}
        disabled={nextDisabled}
        className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-600 disabled:opacity-40 disabled:cursor-not-allowed text-white text-sm font-semibold transition-colors ml-auto"
      >
        {nextLabel}
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
        </svg>
      </button>
    </div>
  )
}

// ─── Main component ───────────────────────────────────────────────────────────
export default function OnboardingPage() {
  const router = useRouter()
  const { setUser } = useAuth()

  const [step,                   setStep]                   = useState(1)
  const [selectedClubIds,        setSelectedClubIds]        = useState<string[]>([])
  const [selectedVibes,          setSelectedVibes]          = useState<VibeTag[]>([])
  const [selectedNeighborhoods,  setSelectedNeighborhoods]  = useState<string[]>([])
  const [form,                   setForm]                   = useState({ name: '', email: '', password: '' })
  const [showPassword,           setShowPassword]           = useState(false)
  const [errors,                 setErrors]                 = useState<Record<string, string>>({})
  const [submitted,              setSubmitted]              = useState(false)

  const next = () => setStep((s) => Math.min(s + 1, TOTAL_STEPS))
  const back = () => setStep((s) => Math.max(s - 1, 1))
  const skip = () => router.push('/app')

  function toggleClub(id: string) {
    setSelectedClubIds((p) => p.includes(id) ? p.filter((c) => c !== id) : [...p, id])
  }
  function toggleVibe(v: VibeTag) {
    setSelectedVibes((p) => p.includes(v) ? p.filter((x) => x !== v) : [...p, v])
  }
  function toggleNeighborhood(id: string) {
    setSelectedNeighborhoods((p) => p.includes(id) ? p.filter((n) => n !== id) : [...p, id])
  }

  // Recommendation logic
  const recommended = events.filter((e) => {
    const clubOk  = selectedClubIds.length === 0 || selectedClubIds.includes(e.clubId)
    const vibeOk  = selectedVibes.length === 0 || e.vibes.some((v) => selectedVibes.includes(v))
    const nbOk    = selectedNeighborhoods.length === 0 || selectedNeighborhoods.some((nid) => {
      const nb = NEIGHBORHOODS.find((n) => n.id === nid)
      return nb && e.neighborhood.toLowerCase().includes(nb.label.toLowerCase())
    })
    return clubOk && vibeOk && nbOk
  })
  const displayEvents = recommended.length > 0 ? recommended : events

  function handleSubmit() {
    const errs: Record<string, string> = {}
    if (!form.name.trim())     errs.name     = 'Name is required'
    if (!form.email.trim())    errs.email    = 'Email is required'
    if (!form.password.trim()) errs.password = 'Password is required'
    if (Object.keys(errs).length) { setErrors(errs); return }

    const initials = form.name.trim().split(' ').map((w) => w[0]).join('').toUpperCase().slice(0, 2)
    setUser({
      id: `u_${Date.now()}`,
      name: form.name.trim(),
      initials,
      color: '#f59e0b',
      role: 'member',
      joinedEvents: [],
      joinedAt: new Date().toISOString().split('T')[0],
    })
    setSubmitted(true)
  }

  // ── Shared wrapper ──
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <ProgressBar step={step} />

      <div className="flex-1 flex flex-col max-w-lg mx-auto w-full px-5 py-8">

        {/* ══════════════ STEP 1 — Welcome ══════════════ */}
        {step === 1 && (
          <div className="flex flex-col flex-1">
            <div className="flex items-center justify-between mb-10">
              <div className="flex items-center gap-2">
                <span className="text-xl">😊</span>
                <span className="font-bold text-gray-900 text-sm">Smileys</span>
              </div>
              <button
                onClick={skip}
                className="text-xs text-gray-400 hover:text-gray-600 transition-colors font-medium"
              >
                Sign in
              </button>
            </div>

            <div className="flex-1 flex flex-col justify-center text-center pb-6">
              {/* Hero */}
              <div className="text-7xl mb-6 select-none">🏙️</div>
              <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight mb-3 leading-tight">
                Your social life<br />starts here.
              </h1>
              <p className="text-gray-500 text-lg mb-10 leading-relaxed">
                Join Istanbul&apos;s most vibrant community. Real events, real people, real connections.
              </p>

              {/* Value props */}
              <div className="grid grid-cols-3 gap-3 mb-10">
                {[
                  { emoji: '📅', label: '50+', sub: 'events / month' },
                  { emoji: '👥', label: '3,000+', sub: 'members' },
                  { emoji: '🏛️', label: '5', sub: 'clubs' },
                ].map((v) => (
                  <div key={v.label} className="bg-amber-50 rounded-2xl p-4">
                    <div className="text-2xl mb-1">{v.emoji}</div>
                    <div className="font-extrabold text-gray-900 text-lg leading-none">{v.label}</div>
                    <div className="text-xs text-gray-500 mt-0.5">{v.sub}</div>
                  </div>
                ))}
              </div>

              <button
                onClick={next}
                className="w-full py-4 rounded-2xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-base transition-colors shadow-sm mb-3"
              >
                Get started — it&apos;s free
              </button>
              <button
                onClick={skip}
                className="w-full py-3.5 rounded-2xl border border-gray-200 text-gray-600 font-semibold text-sm hover:bg-gray-50 transition-colors"
              >
                I already have an account
              </button>
            </div>
          </div>
        )}

        {/* ══════════════ STEP 2 — Select Clubs ══════════════ */}
        {step === 2 && (
          <div>
            <StepHeader step={step} onSkip={skip} />
            <div className="mb-7">
              <p className="text-xs font-bold text-amber-600 uppercase tracking-widest mb-2">Step 2 of {TOTAL_STEPS}</p>
              <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight mb-2">
                What are you into?
              </h1>
              <p className="text-gray-500">Pick the clubs that match your vibe. Select as many as you like.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-2">
              {clubs.map((club) => {
                const sel = selectedClubIds.includes(club.id)
                return (
                  <button
                    key={club.id}
                    onClick={() => toggleClub(club.id)}
                    className={`relative text-left rounded-2xl p-5 border-2 transition-all duration-150 ${
                      sel
                        ? 'border-amber-500 bg-amber-50'
                        : 'border-gray-200 bg-white hover:border-amber-300'
                    }`}
                  >
                    {sel && (
                      <span className="absolute top-3 right-3 w-6 h-6 rounded-full bg-amber-500 flex items-center justify-center">
                        <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      </span>
                    )}
                    <div className={`w-11 h-11 rounded-xl ${club.bgColor} flex items-center justify-center text-2xl mb-3`}>
                      {club.emoji}
                    </div>
                    <div className="font-bold text-gray-900 mb-0.5">{club.name}</div>
                    <div className={`text-xs font-semibold ${club.color} mb-1.5`}>{club.category}</div>
                    <p className="text-xs text-gray-500 line-clamp-2 leading-relaxed">{club.description}</p>
                    <div className="mt-2 text-xs text-gray-400">{club.memberCount} members</div>
                  </button>
                )
              })}
            </div>

            <NavRow
              onNext={next}
              nextLabel={selectedClubIds.length > 0 ? `Continue with ${selectedClubIds.length} club${selectedClubIds.length > 1 ? 's' : ''}` : 'Skip this step'}
            />
          </div>
        )}

        {/* ══════════════ STEP 3 — Select Vibe ══════════════ */}
        {step === 3 && (
          <div>
            <StepHeader step={step} onSkip={skip} />
            <div className="mb-7">
              <p className="text-xs font-bold text-amber-600 uppercase tracking-widest mb-2">Step 3 of {TOTAL_STEPS}</p>
              <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight mb-2">
                What&apos;s your vibe?
              </h1>
              <p className="text-gray-500">How do you like to show up? Pick everything that fits.</p>
            </div>

            <div className="grid grid-cols-2 gap-3 mb-2">
              {VIBES.map((vibe) => {
                const cfg = vibeConfig[vibe]
                const sel = selectedVibes.includes(vibe)
                return (
                  <button
                    key={vibe}
                    onClick={() => toggleVibe(vibe)}
                    className={`relative text-left rounded-2xl p-5 border-2 transition-all duration-150 ${
                      sel
                        ? `${cfg.border} ${cfg.bg}`
                        : 'border-gray-200 bg-white hover:border-gray-300'
                    }`}
                  >
                    {sel && (
                      <span className="absolute top-3 right-3 w-5 h-5 rounded-full bg-gray-900 flex items-center justify-center">
                        <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      </span>
                    )}
                    <div className="text-3xl mb-2">{cfg.emoji}</div>
                    <div className={`font-bold text-base mb-1 ${sel ? cfg.text : 'text-gray-900'}`}>{vibe}</div>
                    <p className="text-xs text-gray-500 leading-relaxed">{cfg.description}</p>
                  </button>
                )
              })}
            </div>

            <NavRow
              onBack={back}
              onNext={next}
              nextLabel={selectedVibes.length > 0 ? `Continue with ${selectedVibes.length} vibe${selectedVibes.length > 1 ? 's' : ''}` : 'Skip this step'}
            />
          </div>
        )}

        {/* ══════════════ STEP 4 — Select Location ══════════════ */}
        {step === 4 && (
          <div>
            <StepHeader step={step} onSkip={skip} />
            <div className="mb-7">
              <p className="text-xs font-bold text-amber-600 uppercase tracking-widest mb-2">Step 4 of {TOTAL_STEPS}</p>
              <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight mb-2">
                Where do you hang out?
              </h1>
              <p className="text-gray-500">Pick your favorite Istanbul neighborhoods.</p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 mb-2">
              {NEIGHBORHOODS.map((nb) => {
                const sel = selectedNeighborhoods.includes(nb.id)
                return (
                  <button
                    key={nb.id}
                    onClick={() => toggleNeighborhood(nb.id)}
                    className={`relative text-left rounded-2xl p-4 border-2 transition-all duration-150 ${
                      sel
                        ? 'border-amber-500 bg-amber-50'
                        : 'border-gray-200 bg-white hover:border-amber-300'
                    }`}
                  >
                    {sel && (
                      <span className="absolute top-2.5 right-2.5 w-5 h-5 rounded-full bg-amber-500 flex items-center justify-center">
                        <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      </span>
                    )}
                    <div className="text-2xl mb-1.5">{nb.emoji}</div>
                    <div className="font-bold text-gray-900 text-sm leading-tight">{nb.label}</div>
                    <div className="text-xs text-gray-400 mt-0.5 leading-snug">{nb.desc}</div>
                  </button>
                )
              })}
            </div>

            <NavRow
              onBack={back}
              onNext={next}
              nextLabel={
                selectedNeighborhoods.length > 0
                  ? `Continue with ${selectedNeighborhoods.length} area${selectedNeighborhoods.length > 1 ? 's' : ''}`
                  : 'Skip this step'
              }
            />
          </div>
        )}

        {/* ══════════════ STEP 5 — Event Recommendations ══════════════ */}
        {step === 5 && (
          <div>
            <StepHeader step={step} onSkip={skip} />
            <div className="mb-6">
              <p className="text-xs font-bold text-amber-600 uppercase tracking-widest mb-2">Step 5 of {TOTAL_STEPS}</p>
              <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight mb-2">
                {recommended.length > 0 ? 'Your lineup 🎉' : 'Explore everything'}
              </h1>
              <p className="text-gray-500 text-sm">
                {recommended.length > 0
                  ? `${displayEvents.length} event${displayEvents.length > 1 ? 's' : ''} matched your profile.`
                  : "No exact match — here's everything coming up."}
              </p>

              {/* Selection chips */}
              {(selectedClubIds.length > 0 || selectedVibes.length > 0 || selectedNeighborhoods.length > 0) && (
                <div className="flex flex-wrap gap-1.5 mt-3">
                  {selectedClubIds.map((id) => {
                    const c = clubs.find((x) => x.id === id)
                    if (!c) return null
                    return (
                      <span key={id} className={`badge ${c.bgColor} ${c.color} text-[11px]`}>
                        {c.emoji} {c.name}
                      </span>
                    )
                  })}
                  {selectedVibes.map((v) => {
                    const cfg = vibeConfig[v]
                    return (
                      <span key={v} className={`badge ${cfg.bg} ${cfg.text} text-[11px]`}>
                        {cfg.emoji} {v}
                      </span>
                    )
                  })}
                  {selectedNeighborhoods.map((nid) => {
                    const nb = NEIGHBORHOODS.find((n) => n.id === nid)
                    if (!nb) return null
                    return (
                      <span key={nid} className="badge bg-gray-100 text-gray-600 text-[11px]">
                        {nb.emoji} {nb.label}
                      </span>
                    )
                  })}
                </div>
              )}
            </div>

            <div className="space-y-3 mb-4">
              {displayEvents.map((event) => {
                const attendees  = eventAttendees[event.id] ?? []
                const friends    = attendees.filter((a) => a.isFriend)
                const goingCount = event.totalSpots - event.spotsLeft
                const fillPct    = (goingCount / event.totalSpots) * 100

                return (
                  <div
                    key={event.id}
                    className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 flex gap-4"
                  >
                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-amber-100 to-orange-100 flex items-center justify-center text-2xl shrink-0">
                      {event.emoji}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap gap-1 mb-1">
                        {event.vibes.map((v) => {
                          const cfg = vibeConfig[v]
                          return (
                            <span key={v} className={`badge ${cfg.bg} ${cfg.text} text-[10px] py-0.5`}>
                              {cfg.emoji} {v}
                            </span>
                          )
                        })}
                      </div>
                      <h3 className="font-bold text-gray-900 text-sm leading-snug">{event.title}</h3>
                      <p className="text-xs text-gray-400 mt-0.5">
                        {formatShortDate(event.date)} · {event.time} · {event.neighborhood}
                      </p>
                      <div className="flex items-center gap-2 mt-1.5">
                        <div className="flex -space-x-1.5">
                          {attendees.slice(0, 3).map((a) => (
                            <div
                              key={a.id}
                              className="w-5 h-5 rounded-full ring-1 ring-white flex items-center justify-center text-white text-[8px] font-bold"
                              style={{ backgroundColor: a.color }}
                            >
                              {a.initials}
                            </div>
                          ))}
                        </div>
                        <span className="text-xs text-gray-500">
                          <span className="font-semibold text-gray-700">{goingCount}</span> going
                          {friends.length > 0 && (
                            <span className="text-amber-600 font-semibold"> · {friends.length} friend{friends.length > 1 ? 's' : ''}</span>
                          )}
                        </span>
                      </div>
                    </div>
                    <div className="flex flex-col items-end justify-between shrink-0 gap-2">
                      <div className="font-bold text-sm text-right">
                        {event.price === 0
                          ? <span className="text-green-600">Free</span>
                          : <span className="text-gray-900">₺{event.price}</span>}
                      </div>
                      {event.limitedSpots && event.spotsLeft <= 5 && (
                        <span className="text-[10px] text-red-500 font-semibold">{event.spotsLeft} left</span>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>

            <NavRow
              onBack={back}
              onNext={next}
              nextLabel="Create my account →"
            />
          </div>
        )}

        {/* ══════════════ STEP 6 — Account creation ══════════════ */}
        {step === 6 && !submitted && (
          <div>
            <StepHeader step={step} />
            <div className="mb-7">
              <p className="text-xs font-bold text-amber-600 uppercase tracking-widest mb-2">Last step</p>
              <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight mb-2">
                Create your account
              </h1>
              <p className="text-gray-500">Free forever. No credit card required.</p>
            </div>

            {/* Social login (UI only) */}
            <button
              className="w-full flex items-center justify-center gap-3 py-3.5 rounded-2xl border border-gray-200 bg-white hover:bg-gray-50 transition-colors font-semibold text-sm text-gray-700 mb-5"
              onClick={() => alert('Google auth coming soon')}
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              Continue with Google
            </button>

            <div className="flex items-center gap-3 mb-5">
              <div className="flex-1 h-px bg-gray-200" />
              <span className="text-xs text-gray-400 font-medium">or with email</span>
              <div className="flex-1 h-px bg-gray-200" />
            </div>

            {/* Form */}
            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1.5">
                  Full name
                </label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => { setForm((p) => ({ ...p, name: e.target.value })); setErrors((p) => ({ ...p, name: '' })) }}
                  placeholder="e.g. Ayşe Kaya"
                  className={`w-full px-4 py-3 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 transition-colors ${
                    errors.name ? 'border-red-300 bg-red-50' : 'border-gray-200'
                  }`}
                />
                {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name}</p>}
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1.5">
                  Email address
                </label>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => { setForm((p) => ({ ...p, email: e.target.value })); setErrors((p) => ({ ...p, email: '' })) }}
                  placeholder="you@example.com"
                  className={`w-full px-4 py-3 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 transition-colors ${
                    errors.email ? 'border-red-300 bg-red-50' : 'border-gray-200'
                  }`}
                />
                {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1.5">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={form.password}
                    onChange={(e) => { setForm((p) => ({ ...p, password: e.target.value })); setErrors((p) => ({ ...p, password: '' })) }}
                    placeholder="Min. 8 characters"
                    className={`w-full px-4 py-3 pr-12 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 transition-colors ${
                      errors.password ? 'border-red-300 bg-red-50' : 'border-gray-200'
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((p) => !p)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? (
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                      </svg>
                    ) : (
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    )}
                  </button>
                </div>
                {errors.password && <p className="text-xs text-red-500 mt-1">{errors.password}</p>}
              </div>
            </div>

            <button
              onClick={handleSubmit}
              className="w-full py-4 rounded-2xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-base transition-colors shadow-sm mb-4"
            >
              Create my account
            </button>

            <p className="text-xs text-center text-gray-400">
              By joining you agree to our{' '}
              <span className="underline cursor-pointer">Terms</span> and{' '}
              <span className="underline cursor-pointer">Privacy Policy</span>.
            </p>

            <div className="flex justify-start pt-4">
              <button
                onClick={back}
                className="inline-flex items-center gap-1.5 text-xs text-gray-400 hover:text-gray-600 transition-colors"
              >
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16l-4-4m0 0l4-4m-4 4h18" />
                </svg>
                Back to recommendations
              </button>
            </div>
          </div>
        )}

        {/* ══════════════ SUCCESS ══════════════ */}
        {step === 6 && submitted && (
          <div className="flex-1 flex flex-col items-center justify-center text-center py-10">
            <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
              <svg className="w-10 h-10 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight mb-3">
              Welcome, {form.name.split(' ')[0]}! 🎉
            </h1>
            <p className="text-gray-500 mb-2 text-lg">Your account has been created.</p>
            <p className="text-sm text-gray-400 mb-10">
              You&apos;re now part of Istanbul&apos;s most vibrant social community.
            </p>

            {/* Summary */}
            {(selectedClubIds.length > 0 || selectedVibes.length > 0) && (
              <div className="bg-amber-50 rounded-2xl p-5 w-full mb-8 text-left">
                <p className="text-xs font-bold text-amber-700 uppercase tracking-wide mb-3">Your profile</p>
                <div className="flex flex-wrap gap-1.5">
                  {selectedClubIds.map((id) => {
                    const c = clubs.find((x) => x.id === id)
                    if (!c) return null
                    return (
                      <span key={id} className={`badge ${c.bgColor} ${c.color} text-xs`}>
                        {c.emoji} {c.name}
                      </span>
                    )
                  })}
                  {selectedVibes.map((v) => {
                    const cfg = vibeConfig[v]
                    return (
                      <span key={v} className={`badge ${cfg.bg} ${cfg.text} text-xs`}>
                        {cfg.emoji} {v}
                      </span>
                    )
                  })}
                </div>
              </div>
            )}

            <Link
              href="/app"
              className="w-full py-4 rounded-2xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-base transition-colors shadow-sm flex items-center justify-center gap-2"
            >
              Go to my dashboard
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}
