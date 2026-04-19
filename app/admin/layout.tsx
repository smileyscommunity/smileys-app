'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import type { ReactNode } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { canAccessAdmin } from '@/lib/permissions'
import Sidebar from '@/components/admin/Sidebar'
import Topbar from '@/components/admin/Topbar'

export default function AdminLayout({ children }: { children: ReactNode }) {
  const router   = useRouter()
  const { user } = useAuth()

  useEffect(() => {
    if (!canAccessAdmin(user)) router.replace('/app')
  }, [user, router])

  if (!canAccessAdmin(user)) return null

  return (
    <div className="flex h-screen bg-black text-white overflow-hidden">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <Topbar />
        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  )
}
