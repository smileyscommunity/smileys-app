'use client'

import { useState } from 'react'
import Link from 'next/link'
import { use } from 'react'
import { getEventById, clubs, hosts, vibeConfig, VibeTag } from '@/lib/data'

const VIBES = Object.keys(vibeConfig) as VibeTag[]
const EMOJIS = ['⛵', '🍽️', '💬', '🎵', '🌿', '🎭', '🏃', '🎨', '🍷', '🧘', '🥾', '🎤']

export default function EditEventClient({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const event = getEventById(id)

  const [form, setForm] = useState({
    title:        event?.title        ?? '',
    date:         event?.date         ?? '',
    time:         event?.time         ?? '',
    location:     event?.location     ?? '',
    neighborhood: event?.neighborhood ?? '',
    clubId:       event?.clubId       ?? '',
    hostId:       event?.hostId       ?? '',
    description:  event?.description  ?? '',
    totalSpots:   String(event?.totalSpots ?? 20),
    price:        String(event?.price ?? 0),
    memberPrice:  String(event?.memberPrice ?? ''),
    emoji:        event?.emoji        ?? '🎉',
    isPremium:    event?.isPremium    ?? false,
    membersOnly:  event?.membersOnly  ?? false,
    limitedSpots: event?.limitedSpots ?? true,
  })
  const [selectedVibes, setSelectedVibes] = useState<VibeTag[]>(event?.vibes ?? [])
  const [saved, setSaved] = useState(false)

  function set(key: string, value: string | boolean) {
    setForm((f) => ({ ...f, [key]: value }))
  }

  function toggleVibe(v: VibeTag) {
    setSelectedVibes((prev) => prev.includes(v) ? prev.filter((x) => x !== v) : [...prev, v])
  }

  function handleSave() {
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  if (!event) {
    return (
      <div className="p-8">
        <p className="text-gray-500">Event not found.</p>
        <Link href="/admin/
