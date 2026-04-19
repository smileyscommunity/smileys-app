'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

export const navItems = [
  { label: 'Dashboard', href: '/admin',         exact: true  },
  { label: 'Events',    href: '/admin/events',   exact: false },
  { label: 'Users',     href: '/admin/users',    exact: false },
  { label: 'Hosts',     href: '/admin/hosts',    exact: false },
  { label: 'Clubs',     href: '/admin/clubs',    exact: false },
  { label: 'Payments',  href: '/admin/payments', exact: false },
  { label: 'Reports',   href: '/admin/reports',  exact: false },
  { label: 'Settings',  href: '/admin/settings', exact: false },
]

export default function Sidebar() {
  const pathname = usePathname()

  const isActive = (item: typeof navItems[0]) =>
    item.exact ? pathname === item.href : pathname.startsWith(item.href)

  return (
    <aside className="w-60 bg-black border-r border-zinc-800 p-4 flex flex-col h-full shrink-0">
      <div className="text-xl font-bold mb-6 px-3">Smileys</div>

      <nav className="space-y-1">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`block px-3 py-2 rounded-lg text-sm transition-colors ${
              isActive(item)
                ? 'bg-zinc-800 text-white font-medium'
                : 'text-zinc-400 hover:bg-zinc-900 hover:text-white'
            }`}
          >
            {item.label}
          </Link>
        ))}
      </nav>
    </aside>
  )
}
