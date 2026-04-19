import type { AppUser } from './auth'
import type { Event } from './data'

export function canAccessAdmin(user: AppUser): boolean {
  return user.role === 'admin'
}

export function canCreateEvent(user: AppUser): boolean {
  return user.role === 'admin' || user.role === 'host'
}

export function canEditEvent(user: AppUser, event: Event): boolean {
  return user.role === 'admin' || (user.role === 'host' && user.hostId === event.hostId)
}

export function canManageUsers(user: AppUser): boolean {
  return user.role === 'admin'
}

export function canViewAttendees(user: AppUser, event: Event): boolean {
  return user.role === 'admin' || (user.role === 'host' && user.hostId === event.hostId)
}

export function canJoinEvent(user: AppUser): boolean {
  return user.role === 'member'
}
