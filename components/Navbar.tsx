'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState, useRef, useEffect } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { mockUsers } from '@/lib/auth'
import type { AppUser } from '@/lib/auth'

const roleBadge: Record<string, string> = {
  admin:  'bg-amber-100 text-amber-700',
  host:   'bg-blue-100 text-blue-700',
  member: 'bg-gray-100 text-gray-600',
}

const navLinks = [
  { label: 'Events', href: '/events' },
  { label: 'Clubs',  href: '/clubs'  },
]

export default function Navbar() {
  const pathname  = usePathname()
  const { user, setUser } = useAuth()
  const [menuOpen,     setMenuOpen]     = useState(false)
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href)

  const inApp = pathname.startsWith('/app')

  function switchUser(u: AppUser) {
    setUser(u)
    setDropdownOpen(false)
    setMenuOpen(false)
  }

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <span className="text-2xl">😊</span>
            <span className="font-bold text-lg tracking-tight text-gray-900 group-hover:text-amber-600 transition-colors">
              Smileys
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  isActive(link.href)
                    ? 'text-amber-600 bg-amber-50'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                {link.label}
              </Link>
            ))}
            {/* Role-based nav links */}
            {user.role === 'admin' && (
              <Link
                href="/admin"
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  isActive('/admin')
                    ? 'text-amber-600 bg-amber-50'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                Admin Panel
              </Link>
            )}
            {user.role === 'host' && (
              <Link
                href="/admin/events/new"
                className="px-4 py-2 rounded-lg text-sm font-medium text-blue-600 hover:bg-blue-50 transition-colors"
              >
                + Create Event
              </Link>
            )}
          </nav>

          {/* Right side */}
          <div className="hidden md:flex items-center gap-3">
            {inApp && user.role !== 'admin' && (
              <Link href="/app" className="btn-ghost text-sm">
                Dashboard
              </Link>
            )}

            {/* User switcher dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center gap-2 pl-2 pr-3 py-1.5 rounded-xl hover:bg-gray-100 transition-colors"
              >
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold shrink-0"
                  style={{ backgroundColor: user.color }}
                >
                  {user.initials}
                </div>
                <div className="text-left">
                  <div className="text-xs font-semibold text-gray-900 leading-tight">{user.name}</div>
                  <div className={`text-[10px] font-semibold px-1.5 py-0.5 rounded-full inline-block leading-tight ${roleBadge[user.role]}`}>
                    {user.role}
                  </div>
                </div>
                <svg className="w-3.5 h-3.5 text-gray-400 ml-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {dropdownOpen && (
                <div className="absolute right-0 top-full mt-2 w-56 bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden z-50">
                  <div className="px-4 py-3 bg-gray-50 border-b border-gray-100">
                    <p className="text-xs text-gray-400 font-medium mb-0.5">Signed in as</p>
                    <p className="text-sm font-bold text-gray-900">{user.name}</p>
                    <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${roleBadge[user.role]}`}>
                      {user.role}
                    </span>
                  </div>
                  <div className="px-3 py-2">
                    <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wide px-1 mb-1">
                      Switch user (demo)
                    </p>
                    <div className="space-y-0.5">
                      {mockUsers.map((u) => (
                        <button
                          key={u.id}
                          onClick={() => switchUser(u)}
                          className={`w-full flex items-center gap-2.5 px-2 py-2 rounded-lg text-left transition-colors ${
                            u.id === user.id ? 'bg-amber-50' : 'hover:bg-gray-50'
                          }`}
                        >
                          <div
                            className="w-6 h-6 rounded-full flex items-center justify-center text-white text-[9px] font-bold shrink-0"
                            style={{ backgroundColor: u.color }}
                          >
                            {u.initials}
                          </div>
                          <span className="text-xs font-medium text-gray-700 flex-1 truncate">{u.name}</span>
                          <span className={`text-[9px] font-semibold px-1.5 py-0.5 rounded-full shrink-0 ${roleBadge[u.role]}`}>
                            {u.role}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Mobile burger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors"
            aria-label="Toggle menu"
          >
            {menuOpen ? (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden border-t border-gray-100 bg-white px-4 py-3 space-y-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className={`block px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                isActive(link.href) ? 'text-amber-600 bg-amber-50' : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              {link.label}
            </Link>
          ))}
          {user.role === 'admin' && (
            <Link
              href="/admin"
              onClick={() => setMenuOpen(false)}
              className="block px-4 py-2.5 rounded-lg text-sm font-medium text-amber-600 bg-amber-50"
            >
              Admin Panel
            </Link>
          )}
          {user.role === 'host' && (
            <Link
              href="/admin/events/new"
              onClick={() => setMenuOpen(false)}
              className="block px-4 py-2.5 rounded-lg text-sm font-medium text-blue-600 hover:bg-blue-50"
            >
              + Create Event
            </Link>
          )}
          {/* Current user info + switcher */}
          <div className="pt-2 border-t border-gray-100">
            <div className="flex items-center gap-2 px-2 py-2 mb-1">
              <div
                className="w-7 h-7 rounded-full flex items-center justify-center text-white text-xs font-bold shrink-0"
                style={{ backgroundColor: user.color }}
              >
                {user.initials}
              </div>
              <span className="text-sm font-semibold text-gray-900">{user.name}</span>
              <span className={`ml-auto text-[10px] font-semibold px-1.5 py-0.5 rounded-full ${roleBadge[user.role]}`}>
                {user.role}
              </span>
            </div>
            <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wide px-2 mb-1">Switch user</p>
            {mockUsers.map((u) => (
              <button
                key={u.id}
                onClick={() => switchUser(u)}
                className={`w-full flex items-center gap-2 px-2 py-2 rounded-lg text-left transition-colors ${
                  u.id === user.id ? 'bg-amber-50' : 'hover:bg-gray-50'
                }`}
              >
                <div
                  className="w-5 h-5 rounded-full flex items-center justify-center text-white text-[9px] font-bold shrink-0"
                  style={{ backgroundColor: u.color }}
                >
                  {u.initials}
                </div>
                <span className="text-xs text-gray-700">{u.name}</span>
                <span className={`ml-auto text-[9px] font-semibold px-1.5 py-0.5 rounded-full ${roleBadge[u.role]}`}>
                  {u.role}
                </span>
              </button>
            ))}
          </div>
        </div>
      )}
    </header>
  )
}
