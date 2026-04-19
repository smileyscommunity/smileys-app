export type UserRole = 'admin' | 'host' | 'member'

export interface AppUser {
  id: string
  name: string
  initials: string
  color: string
  role: UserRole
  hostId?: string
  joinedEvents?: string[]
  joinedAt?: string
}

export const mockUsers: AppUser[] = [
  {
    id: 'u_admin',
    name: 'Smileys Admin',
    initials: 'SA',
    color: '#f59e0b',
    role: 'admin',
    joinedAt: '2022-03-01',
  },
  {
    id: 'u_efe',
    name: 'Captain Efe',
    initials: 'CE',
    color: '#3b82f6',
    role: 'host',
    hostId: 'captain_efe',
    joinedAt: '2022-04-10',
  },
  {
    id: 'u_elif',
    name: 'Elif Şahin',
    initials: 'EŞ',
    color: '#f97316',
    role: 'host',
    hostId: 'elif',
    joinedAt: '2022-05-22',
  },
  {
    id: 'u_speakeasy',
    name: 'SpeakEasy Team',
    initials: 'SE',
    color: '#8b5cf6',
    role: 'host',
    hostId: 'speakeasy_team',
    joinedAt: '2022-06-15',
  },
  {
    id: 'u_smileys',
    name: 'Smileys HQ',
    initials: 'SC',
    color: '#f59e0b',
    role: 'host',
    hostId: 'smileys_hq',
    joinedAt: '2022-03-01',
  },
  {
    id: 'u_flow',
    name: 'Flow by Smileys',
    initials: 'FB',
    color: '#10b981',
    role: 'host',
    hostId: 'flow_team',
    joinedAt: '2022-07-08',
  },
  {
    id: 'u_ayse',
    name: 'Ayşe Kaya',
    initials: 'AK',
    color: '#f472b6',
    role: 'member',
    joinedEvents: ['1', '3', '5'],
    joinedAt: '2023-01-14',
  },
  {
    id: 'u_james',
    name: 'James Reed',
    initials: 'JR',
    color: '#60a5fa',
    role: 'member',
    joinedEvents: ['1', '3', '4'],
    joinedAt: '2023-02-20',
  },
  {
    id: 'u_zeynep',
    name: 'Zeynep Arslan',
    initials: 'ZA',
    color: '#fbbf24',
    role: 'member',
    joinedEvents: ['2', '4'],
    joinedAt: '2023-03-05',
  },
  {
    id: 'u_carlos',
    name: 'Carlos Mendez',
    initials: 'CM',
    color: '#f87171',
    role: 'member',
    joinedEvents: ['2', '5'],
    joinedAt: '2023-04-11',
  },
  {
    id: 'u_burak',
    name: 'Burak Yıldız',
    initials: 'BY',
    color: '#fb923c',
    role: 'member',
    joinedEvents: ['1', '4'],
    joinedAt: '2023-05-18',
  },
  {
    id: 'u_nina',
    name: 'Nina Kovač',
    initials: 'NK',
    color: '#e879f9',
    role: 'member',
    joinedEvents: ['1', '4'],
    joinedAt: '2023-06-02',
  },
  {
    id: 'u_mehmet',
    name: 'Mehmet Demir',
    initials: 'MD',
    color: '#34d399',
    role: 'member',
    joinedEvents: ['1'],
    joinedAt: '2023-07-29',
  },
]
