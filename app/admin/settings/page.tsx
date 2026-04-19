'use client'

import { useState } from 'react'

interface Toggle {
  id: string
  label: string
  description: string
  value: boolean
}

export default function AdminSettingsPage() {
  const [toast, setToast] = useState('')

  // Community settings
  const [community, setCommunity] = useState({
    name:        'Smileys Community',
    tagline:     "Istanbul's most vibrant social platform",
    description: 'Real events, real people, real connections across Istanbul.',
    email:       'hello@smileys.community',
    website:     'smileys.community',
    instagram:   '@smileys.istanbul',
    whatsapp:    '+90 555 000 0000',
  })

  // Membership pricing
  const [pricing, setPricing] = useState({
    monthlyPrice:  '299',
    yearlyPrice:   '2490',
    trialDays:     '7',
    currency:      '₺',
  })

  // Feature toggles
  const [toggles, setToggles] = useState<Toggle[]>([
    { id: 'whatsapp_button',   label: 'WhatsApp Group Button',    description: 'Show "Join WhatsApp Group" on event pages',    value: true  },
    { id: 'persistent_cta',   label: 'Persistent CTA Bar',       description: 'Fixed bottom bar with Join + Explore buttons',  value: true  },
    { id: 'member_pricing',   label: 'Member Pricing',           description: 'Show discounted pricing for members',           value: true  },
    { id: 'friends_section',  label: 'Friends Going Section',    description: 'Show friends attending on event pages',         value: true  },
    { id: 'vibe_tags',        label: 'Vibe Tags',                description: 'Display vibe tags on events and cards',         value: true  },
    { id: 'onboarding',       label: 'Onboarding Flow',          description: 'Enable the 6-step onboarding for new users',    value: true  },
    { id: 'premium_events',   label: 'Premium Events',           description: 'Allow events to be marked as premium',          value: true  },
    { id: 'members_only',     label: 'Members-Only Events',      description: 'Allow events to be restricted to members',      value: false },
  ])

  // Notification settings
  const [notifications, setNotifications] = useState({
    newMember:     true,
    newBooking:    true,
    eventReminder: true,
    lowCapacity:   true,
    weeklyDigest:  false,
  })

  function showToast(msg: string) {
    setToast(msg)
    setTimeout(() => setToast(''), 2500)
  }

  function flipToggle(id: string) {
    setToggles((prev) =>
      prev.map((t) => t.id === id ? { ...t, value: !t.value } : t)
    )
  }

  return (
    <div className="p-8 max-w-3xl">
      {toast && (
        <div className="fixed top-6 right-6 z-50 bg-gray-900 text-white text-sm font-medium px-4 py-2.5 rounded-xl shadow-lg">
          {toast}
        </div>
      )}

      <div className="mb-8">
        <h1 className="text-2xl font-extrabold text-gray-900 tracking-tight">Settings</h1>
        <p className="text-sm text-gray-500 mt-1">Manage community configuration and preferences</p>
      </div>

      <div className="space-y-6">

        {/* Community info */}
        <section className="bg-white rounded-2xl shadow-card p-6">
          <h2 className="font-bold text-gray-900 mb-5">Community Info</h2>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-500 mb-1.5">Community name</label>
                <input
                  type="text"
                  value={community.name}
                  onChange={(e) => setCommunity((p) => ({ ...p, name: e.target.value }))}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-500 mb-1.5">Contact email</label>
                <input
                  type="email"
                  value={community.email}
                  onChange={(e) => setCommunity((p) => ({ ...p, email: e.target.value }))}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400"
                />
              </div>
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-500 mb-1.5">Tagline</label>
              <input
                type="text"
                value={community.tagline}
                onChange={(e) => setCommunity((p) => ({ ...p, tagline: e.target.value }))}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-500 mb-1.5">Description</label>
              <textarea
                rows={2}
                value={community.description}
                onChange={(e) => setCommunity((p) => ({ ...p, description: e.target.value }))}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 resize-none"
              />
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-500 mb-1.5">Website</label>
                <input type="text" value={community.website} onChange={(e) => setCommunity((p) => ({ ...p, website: e.target.value }))}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-500 mb-1.5">Instagram</label>
                <input type="text" value={community.instagram} onChange={(e) => setCommunity((p) => ({ ...p, instagram: e.target.value }))}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-500 mb-1.5">WhatsApp</label>
                <input type="text" value={community.whatsapp} onChange={(e) => setCommunity((p) => ({ ...p, whatsapp: e.target.value }))}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400" />
              </div>
            </div>
          </div>
          <div className="mt-5">
            <button onClick={() => showToast('Community info saved ✓')} className="btn-primary text-sm">
              Save changes
            </button>
          </div>
        </section>

        {/* Membership pricing */}
        <section className="bg-white rounded-2xl shadow-card p-6">
          <h2 className="font-bold text-gray-900 mb-5">Membership Pricing</h2>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-xs font-semibold text-gray-500 mb-1.5">Monthly price ({pricing.currency})</label>
              <input
                type="number"
                value={pricing.monthlyPrice}
                onChange={(e) => setPricing((p) => ({ ...p, monthlyPrice: e.target.value }))}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-500 mb-1.5">Yearly price ({pricing.currency})</label>
              <input
                type="number"
                value={pricing.yearlyPrice}
                onChange={(e) => setPricing((p) => ({ ...p, yearlyPrice: e.target.value }))}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-500 mb-1.5">Free trial (days)</label>
              <input
                type="number"
                value={pricing.trialDays}
                onChange={(e) => setPricing((p) => ({ ...p, trialDays: e.target.value }))}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-500 mb-1.5">Currency</label>
              <select
                value={pricing.currency}
                onChange={(e) => setPricing((p) => ({ ...p, currency: e.target.value }))}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 bg-white"
              >
                <option value="₺">₺ Turkish Lira</option>
                <option value="$">$ US Dollar</option>
                <option value="€">€ Euro</option>
              </select>
            </div>
          </div>
          <button onClick={() => showToast('Pricing saved ✓')} className="btn-primary text-sm">
            Save pricing
          </button>
        </section>

        {/* Feature toggles */}
        <section className="bg-white rounded-2xl shadow-card p-6">
          <h2 className="font-bold text-gray-900 mb-5">Feature Flags</h2>
          <div className="space-y-3">
            {toggles.map((t) => (
              <div key={t.id} className="flex items-center justify-between py-2.5 border-b border-gray-50 last:border-0">
                <div>
                  <div className="text-sm font-semibold text-gray-800">{t.label}</div>
                  <div className="text-xs text-gray-400 mt-0.5">{t.description}</div>
                </div>
                <button
                  onClick={() => flipToggle(t.id)}
                  className={`relative w-11 h-6 rounded-full transition-colors duration-200 shrink-0 ml-4 ${
                    t.value ? 'bg-amber-500' : 'bg-gray-200'
                  }`}
                >
                  <span
                    className={`absolute top-1 w-4 h-4 rounded-full bg-white shadow transition-transform duration-200 ${
                      t.value ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* Notifications */}
        <section className="bg-white rounded-2xl shadow-card p-6">
          <h2 className="font-bold text-gray-900 mb-5">Admin Notifications</h2>
          <div className="space-y-3">
            {(Object.entries(notifications) as [keyof typeof notifications, boolean][]).map(([key, val]) => {
              const labels: Record<string, string> = {
                newMember:     'New member signup',
                newBooking:    'New event booking',
                eventReminder: 'Event reminders (48h before)',
                lowCapacity:   'Low spots alert (≤ 5 left)',
                weeklyDigest:  'Weekly performance digest',
              }
              return (
                <div key={key} className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0">
                  <span className="text-sm text-gray-700">{labels[key]}</span>
                  <button
                    onClick={() => setNotifications((p) => ({ ...p, [key]: !p[key] }))}
                    className={`relative w-11 h-6 rounded-full transition-colors duration-200 shrink-0 ${
                      val ? 'bg-amber-500' : 'bg-gray-200'
                    }`}
                  >
                    <span
                      className={`absolute top-1 w-4 h-4 rounded-full bg-white shadow transition-transform duration-200 ${
                        val ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>
              )
            })}
          </div>
          <div className="mt-5">
            <button onClick={() => showToast('Notification preferences saved ✓')} className="btn-primary text-sm">
              Save preferences
            </button>
          </div>
        </section>

        {/* Danger zone */}
        <section className="bg-white rounded-2xl border-2 border-red-100 p-6">
          <h2 className="font-bold text-red-600 mb-1">Danger Zone</h2>
          <p className="text-xs text-gray-400 mb-5">These actions are irreversible. Proceed with caution.</p>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm font-semibold text-gray-800">Clear all event data</div>
                <div className="text-xs text-gray-400">Removes all events and attendee records</div>
              </div>
              <button
                onClick={() => showToast('Action blocked — UI only')}
                className="text-xs px-4 py-2 rounded-lg border border-red-200 text-red-500 hover:bg-red-50 transition-colors font-medium"
              >
                Clear data
              </button>
            </div>
            <div className="flex items-center justify-between pt-3 border-t border-gray-100">
              <div>
                <div className="text-sm font-semibold text-gray-800">Reset community</div>
                <div className="text-xs text-gray-400">Resets all settings to defaults</div>
              </div>
              <button
                onClick={() => showToast('Action blocked — UI only')}
                className="text-xs px-4 py-2 rounded-lg border border-red-200 text-red-500 hover:bg-red-50 transition-colors font-medium"
              >
                Reset
              </button>
            </div>
          </div>
        </section>

      </div>
    </div>
  )
}
