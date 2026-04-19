export interface Club {
  id: string
  slug: string
  name: string
  description: string
  category: string
  memberCount: number
  emoji: string
  color: string
  bgColor: string
}

export interface Host {
  id: string
  name: string
  initials: string
  color: string
  bio: string
  role: string
}

export const hosts: Record<string, Host> = {
  captain_efe: {
    id: 'captain_efe',
    name: 'Captain Efe',
    initials: 'CE',
    color: '#3b82f6',
    bio: 'Bosphorus sailing veteran with 12 years on the water. Certified skipper out of Tarabya, passionate about sharing Istanbul from the sea.',
    role: 'Sailing Host · Smileys Sailing Club',
  },
  elif: {
    id: 'elif',
    name: 'Elif Şahin',
    initials: 'EŞ',
    color: '#f97316',
    bio: 'Food writer and table curator based in Bomonti. Spent years finding Istanbul\'s best hidden kitchens so you don\'t have to.',
    role: 'Dining Host · Eat Up Istanbul',
  },
  speakeasy_team: {
    id: 'speakeasy_team',
    name: 'SpeakEasy Team',
    initials: 'SE',
    color: '#8b5cf6',
    bio: 'A collective of language teachers and polyglots running exchange nights across Kadıköy since 2021. Conversations in Turkish, English, Spanish, French, and more.',
    role: 'Language Hosts · SpeakEasy',
  },
  smileys_hq: {
    id: 'smileys_hq',
    name: 'Smileys Community',
    initials: 'SC',
    color: '#f59e0b',
    bio: 'The Smileys team — curating Istanbul\'s most vibrant social experiences from Taksim to Kadıköy since 2022.',
    role: 'Community Team · Smileys',
  },
  flow_team: {
    id: 'flow_team',
    name: 'Flow by Smileys',
    initials: 'FB',
    color: '#10b981',
    bio: 'Wellness facilitators running outdoor sessions in Maçka Parkı and beyond. Movement, breathwork, and real human connection.',
    role: 'Wellness Host · Flow by Smileys',
  },
}

export interface Event {
  id: string
  title: string
  date: string
  time: string
  location: string
  neighborhood: string
  hostId: string
  clubId: string
  clubName: string
  description: string
  limitedSpots: boolean
  spotsLeft: number
  totalSpots: number
  price: number
  tags: string[]
  vibes: VibeTag[]
  emoji: string
  isPremium: boolean
  membersOnly: boolean
  memberPrice?: number
  whatsappUrl?: string
}

export type VibeTag = 'Social' | 'Chill' | 'Active' | 'Party' | 'Networking'

export const vibeConfig: Record<VibeTag, { emoji: string; bg: string; text: string; border: string; description: string }> = {
  Social:     { emoji: '🙌', bg: 'bg-blue-100',   text: 'text-blue-700',   border: 'border-blue-400',   description: 'Meet new people, great conversations' },
  Chill:      { emoji: '😌', bg: 'bg-teal-100',   text: 'text-teal-700',   border: 'border-teal-400',   description: 'Low-key hangouts, relaxed atmosphere' },
  Active:     { emoji: '⚡', bg: 'bg-green-100',  text: 'text-green-700',  border: 'border-green-400',  description: 'Move your body, outdoor adventures' },
  Party:      { emoji: '🎉', bg: 'bg-pink-100',   text: 'text-pink-700',   border: 'border-pink-400',   description: 'High energy, music, dancing' },
  Networking: { emoji: '🤝', bg: 'bg-indigo-100', text: 'text-indigo-700', border: 'border-indigo-400', description: 'Career connections, meaningful encounters' },
}

export const clubs: Club[] = [
  {
    id: '1',
    slug: 'smileys-sailing-club',
    name: 'Smileys Sailing Club',
    description:
      'Set sail on the Bosphorus with fellow adventurers. From golden-hour cruises to competitive regattas, we explore Istanbul from the water with good vibes and great people.',
    category: 'Adventure',
    memberCount: 124,
    emoji: '⛵',
    color: 'text-blue-600',
    bgColor: 'bg-blue-50',
  },
  {
    id: '2',
    slug: 'speakeasy',
    name: 'SpeakEasy',
    description:
      'Language exchange nights across Kadıköy and beyond. Practice Turkish, English, Spanish, French, and more in a relaxed, social setting designed for real conversation.',
    category: 'Language',
    memberCount: 287,
    emoji: '💬',
    color: 'text-purple-600',
    bgColor: 'bg-purple-50',
  },
  {
    id: '3',
    slug: 'eat-up-istanbul',
    name: 'Eat Up Istanbul',
    description:
      "From Bomonti meyhanes to Karaköy hidden kitchens — curated dining experiences designed to connect you with Istanbul's food scene and the people who love it.",
    category: 'Food & Dining',
    memberCount: 342,
    emoji: '🍽️',
    color: 'text-orange-600',
    bgColor: 'bg-orange-50',
  },
  {
    id: '4',
    slug: 'flow-by-smileys',
    name: 'Flow by Smileys',
    description:
      'Outdoor yoga, breathwork, and mindful movement in Maçka Parkı and across the city. Wellness for the social soul — designed to restore your energy and deepen human connection.',
    category: 'Wellness',
    memberCount: 198,
    emoji: '🧘',
    color: 'text-green-600',
    bgColor: 'bg-green-50',
  },
  {
    id: '5',
    slug: 'hiking-club',
    name: 'Hiking Club',
    description:
      "Discover Istanbul's hidden trails, ancient forests, and stunning coastal paths. Weekly hikes for all levels — from leisurely walks to full-day challenging treks.",
    category: 'Outdoors',
    memberCount: 156,
    emoji: '🥾',
    color: 'text-amber-600',
    bgColor: 'bg-amber-50',
  },
]

export const events: Event[] = [
  {
    id: '1',
    title: 'Sunset Sailing on the Bosphorus',
    date: '2026-04-26',
    time: '17:30',
    location: 'Tarabya Marina',
    neighborhood: 'Tarabya',
    hostId: 'captain_efe',
    clubId: '1',
    clubName: 'Smileys Sailing Club',
    description:
      'Watch the sun dip below the horizon from the deck of a sailboat on the Bosphorus. Wine, light snacks, curated music, and incredible company included. No sailing experience required.',
    limitedSpots: true,
    spotsLeft: 4,
    totalSpots: 12,
    price: 350,
    tags: ['Sailing', 'Sunset', 'Social'],
    vibes: ['Social', 'Chill'],
    emoji: '⛵',
    isPremium: true,
    membersOnly: false,
    memberPrice: 250,
    whatsappUrl: 'https://chat.whatsapp.com/SunsetSailingSmileys',
  },
  {
    id: '2',
    title: 'Dinner with Strangers',
    date: '2026-04-29',
    time: '19:00',
    location: 'Üç Kuruş Bomonti',
    neighborhood: 'Bomonti',
    hostId: 'elif',
    clubId: '3',
    clubName: 'Eat Up Istanbul',
    description:
      "Eight strangers. One beautifully set table. Endless stories. Our signature dining experience thoughtfully pairs you with fascinating people from all walks of life. Courses designed to spark real conversation.",
    limitedSpots: true,
    spotsLeft: 2,
    totalSpots: 8,
    price: 250,
    tags: ['Dining', 'Social', 'Intimate'],
    vibes: ['Social', 'Networking'],
    emoji: '🍽️',
    isPremium: true,
    membersOnly: true,
    memberPrice: 200,
    whatsappUrl: 'https://chat.whatsapp.com/DinnerStrangersSmileys',
  },
  {
    id: '3',
    title: 'Language Exchange Night',
    date: '2026-05-02',
    time: '19:30',
    location: 'Moda Sahnesi',
    neighborhood: 'Kadıköy',
    hostId: 'speakeasy_team',
    clubId: '2',
    clubName: 'SpeakEasy',
    description:
      'Rotate between tables of native speakers every 15 minutes. Practice your Turkish, English, Spanish, or French in casual, structured conversations. Warm atmosphere, great coffee.',
    limitedSpots: false,
    spotsLeft: 18,
    totalSpots: 40,
    price: 0,
    tags: ['Languages', 'Networking', 'Free'],
    vibes: ['Social', 'Networking', 'Chill'],
    emoji: '💬',
    isPremium: false,
    membersOnly: false,
    whatsappUrl: 'https://chat.whatsapp.com/LanguageExchangeIstanbul',
  },
  {
    id: '4',
    title: 'Rooftop DJ Social Night',
    date: '2026-05-09',
    time: '21:00',
    location: 'Taksim Meydanı Rooftop',
    neighborhood: 'Taksim',
    hostId: 'smileys_hq',
    clubId: '1',
    clubName: 'Smileys Sailing Club',
    description:
      "Istanbul's most vibrant rooftop. Live DJ sets spanning deep house to indie, craft cocktails, and the full Bosphorus skyline as your backdrop. The ultimate social night of the season.",
    limitedSpots: true,
    spotsLeft: 15,
    totalSpots: 60,
    price: 150,
    tags: ['Music', 'Rooftop', 'Nightlife'],
    vibes: ['Party', 'Social'],
    emoji: '🎵',
    isPremium: true,
    membersOnly: false,
    memberPrice: 100,
    whatsappUrl: 'https://chat.whatsapp.com/RooftopDJSocialNight',
  },
  {
    id: '5',
    title: 'Sunday Morning Flow',
    date: '2026-05-17',
    time: '09:30',
    location: 'Maçka Parkı',
    neighborhood: 'Maçka',
    hostId: 'flow_team',
    clubId: '4',
    clubName: 'Flow by Smileys',
    description:
      "Start your Sunday with an outdoor yoga flow and breathwork session in the green heart of the city. Bring a mat, we'll bring the good energy. Followed by a slow breakfast at the park café.",
    limitedSpots: false,
    spotsLeft: 12,
    totalSpots: 20,
    price: 180,
    tags: ['Yoga', 'Outdoor', 'Wellness'],
    vibes: ['Chill', 'Active'],
    emoji: '🌿',
    isPremium: false,
    membersOnly: false,
    whatsappUrl: 'https://chat.whatsapp.com/SundayFlowMackaPark',
  },
]

export function getClubBySlug(slug: string): Club | undefined {
  return clubs.find((c) => c.slug === slug)
}

export function getEventById(id: string): Event | undefined {
  return events.find((e) => e.id === id)
}

export function getEventsByClub(clubId: string): Event[] {
  return events.filter((e) => e.clubId === clubId)
}

export function formatDate(dateStr: string): string {
  const date = new Date(dateStr + 'T00:00:00')
  return date.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  })
}

export function formatShortDate(dateStr: string): string {
  const date = new Date(dateStr + 'T00:00:00')
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
}

export interface Attendee {
  id: string
  name: string
  initials: string
  color: string
  isFriend: boolean
  bio: string
}

export const eventAttendees: Record<string, Attendee[]> = {
  '1': [
    { id: 'a1', name: 'Ayşe Kaya',      initials: 'AK', color: '#f472b6', isFriend: true,  bio: 'Architect · Beşiktaş' },
    { id: 'a2', name: 'James Reed',      initials: 'JR', color: '#60a5fa', isFriend: true,  bio: 'Photographer · Cihangir' },
    { id: 'a3', name: 'Mehmet Demir',    initials: 'MD', color: '#34d399', isFriend: false, bio: 'Chef · Karaköy' },
    { id: 'a4', name: 'Sophia Laurent',  initials: 'SL', color: '#a78bfa', isFriend: false, bio: 'Writer · Galata' },
    { id: 'a5', name: 'Burak Yıldız',   initials: 'BY', color: '#fb923c', isFriend: false, bio: 'Startup founder · Levent' },
    { id: 'a6', name: 'Nina Kovač',      initials: 'NK', color: '#e879f9', isFriend: false, bio: 'Designer · Nişantaşı' },
    { id: 'a7', name: 'Tarık Şahin',    initials: 'TŞ', color: '#22d3ee', isFriend: false, bio: 'Engineer · Kadıköy' },
    { id: 'a8', name: 'Elena Rossi',     initials: 'ER', color: '#4ade80', isFriend: false, bio: 'Marketing · Bebek' },
  ],
  '2': [
    { id: 'b1', name: 'Zeynep Arslan',  initials: 'ZA', color: '#fbbf24', isFriend: true,  bio: 'Lawyer · Şişli' },
    { id: 'b2', name: 'Carlos Mendez',  initials: 'CM', color: '#f87171', isFriend: false, bio: 'Teacher · Moda' },
    { id: 'b3', name: 'Lena Fischer',   initials: 'LF', color: '#818cf8', isFriend: false, bio: 'Consultant · Ataşehir' },
    { id: 'b4', name: 'Ozan Çelik',     initials: 'OÇ', color: '#2dd4bf', isFriend: false, bio: 'Musician · Beyoğlu' },
    { id: 'b5', name: 'Amira Hassan',   initials: 'AH', color: '#fb923c', isFriend: false, bio: 'Doctor · Üsküdar' },
    { id: 'b6', name: 'Lucas Bernard',  initials: 'LB', color: '#a3e635', isFriend: false, bio: 'Artist · Bomonti' },
  ],
  '3': [
    { id: 'c1', name: 'James Reed',     initials: 'JR', color: '#60a5fa', isFriend: true,  bio: 'Photographer · Cihangir' },
    { id: 'c2', name: 'Ayşe Kaya',      initials: 'AK', color: '#f472b6', isFriend: true,  bio: 'Architect · Beşiktaş' },
    { id: 'c3', name: 'Kerem Öztürk',  initials: 'KÖ', color: '#34d399', isFriend: false, bio: 'Developer · Maslak' },
    { id: 'c4', name: 'Maria Santos',   initials: 'MS', color: '#c084fc', isFriend: false, bio: 'Nurse · Kadıköy' },
    { id: 'c5', name: 'Cem Yılmaz',    initials: 'CY', color: '#f97316', isFriend: false, bio: 'Journalist · Cihangir' },
    { id: 'c6', name: 'Irina Petrov',   initials: 'IP', color: '#38bdf8', isFriend: false, bio: 'Translator · Galata' },
    { id: 'c7', name: 'Ali Vural',      initials: 'AV', color: '#a78bfa', isFriend: false, bio: 'Economist · Levent' },
    { id: 'c8', name: 'Hana Müller',    initials: 'HM', color: '#fb7185', isFriend: false, bio: 'Barista · Moda' },
    { id: 'c9', name: 'Selin Tan',      initials: 'ST', color: '#4ade80', isFriend: false, bio: 'UX Designer · Şişli' },
    { id: 'c10', name: 'Marco Conti',   initials: 'MC', color: '#fbbf24', isFriend: false, bio: 'Chef · Karaköy' },
  ],
  '4': [
    { id: 'd1', name: 'Zeynep Arslan',  initials: 'ZA', color: '#fbbf24', isFriend: true,  bio: 'Lawyer · Şişli' },
    { id: 'd2', name: 'James Reed',     initials: 'JR', color: '#60a5fa', isFriend: true,  bio: 'Photographer · Cihangir' },
    { id: 'd3', name: 'Burak Yıldız',  initials: 'BY', color: '#fb923c', isFriend: true,  bio: 'Startup founder · Levent' },
    { id: 'd4', name: 'Nina Kovač',     initials: 'NK', color: '#e879f9', isFriend: false, bio: 'Designer · Nişantaşı' },
    { id: 'd5', name: 'Kerem Öztürk',  initials: 'KÖ', color: '#34d399', isFriend: false, bio: 'Developer · Maslak' },
    { id: 'd6', name: 'Lena Fischer',   initials: 'LF', color: '#818cf8', isFriend: false, bio: 'Consultant · Ataşehir' },
    { id: 'd7', name: 'Cem Yılmaz',    initials: 'CY', color: '#f97316', isFriend: false, bio: 'Journalist · Cihangir' },
    { id: 'd8', name: 'Amira Hassan',   initials: 'AH', color: '#fb923c', isFriend: false, bio: 'Doctor · Üsküdar' },
    { id: 'd9', name: 'Selin Tan',      initials: 'ST', color: '#4ade80', isFriend: false, bio: 'UX Designer · Şişli' },
    { id: 'd10', name: 'Marco Conti',   initials: 'MC', color: '#fbbf24', isFriend: false, bio: 'Chef · Karaköy' },
  ],
  '5': [
    { id: 'e1', name: 'Ayşe Kaya',     initials: 'AK', color: '#f472b6', isFriend: true,  bio: 'Architect · Beşiktaş' },
    { id: 'e2', name: 'Carlos Mendez', initials: 'CM', color: '#f87171', isFriend: false, bio: 'Teacher · Moda' },
    { id: 'e3', name: 'Elena Rossi',   initials: 'ER', color: '#4ade80', isFriend: false, bio: 'Marketing · Bebek' },
    { id: 'e4', name: 'Ozan Çelik',   initials: 'OÇ', color: '#2dd4bf', isFriend: false, bio: 'Musician · Beyoğlu' },
    { id: 'e5', name: 'Hana Müller',   initials: 'HM', color: '#fb7185', isFriend: false, bio: 'Barista · Moda' },
    { id: 'e6', name: 'Lucas Bernard', initials: 'LB', color: '#a3e635', isFriend: false, bio: 'Artist · Bomonti' },
    { id: 'e7', name: 'Tarık Şahin',  initials: 'TŞ', color: '#22d3ee', isFriend: false, bio: 'Engineer · Kadıköy' },
    { id: 'e8', name: 'Maria Santos',  initials: 'MS', color: '#c084fc', isFriend: false, bio: 'Nurse · Kadıköy' },
  ],
}
