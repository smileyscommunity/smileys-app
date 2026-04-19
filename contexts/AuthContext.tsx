'use client'

import { createContext, useContext, useState } from 'react'
import type { ReactNode } from 'react'
import { mockUsers } from '@/lib/auth'
import type { AppUser } from '@/lib/auth'

interface AuthContextType {
  user: AppUser
  setUser: (user: AppUser) => void
}

const AuthContext = createContext<AuthContextType | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AppUser>(mockUsers[0])
  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
