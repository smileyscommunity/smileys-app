'use client'

import { usePathname } from 'next/navigation'
import { useAuth } from '@/contexts/AuthContext'
import { navItems } from './Sidebar'

function getPageTitle(pathname: string): string {
  const match = [...navItems].reverse().find((item) =>
    item.exact ? pathname === item.href : pathname.startsWith(item.href)
  )
  return match?.label ?? 'Admin'
}

export default function Topbar() {
  const pathname  = usePathname()
  const { user }  = useAuth()
  const pageTitle = getPageTitle(pathname)

  return (
    <div className="h-16 border-b border-zinc-800 flex items-center justify-between px-6 shrink-0">
      <div className="text-sm text-zinc-400">{pageTitle}</div>

      <div className="flex items-center gap-4">
        <input
          placeholder="Search..."
          className="bg-zinc-900 px-3 py-1.5 rounded-lg text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:ring-1 focus:ring-zinc-700"
        />
        <div
          className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold shrink-0"
          style={{ backgroundColor: user.color }}
        >
          {user.initials}
        </div>
      </div>
    </div>
  )
}
