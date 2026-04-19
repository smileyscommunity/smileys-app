'use client'

import { useState } from 'react'
import { events, hosts } from '@/lib/data'
import { mockUsers } from '@/lib/auth'

type TxStatus = 'paid' | 'pending' | 'refunded'

interface Transaction {
  id: string
  userId: string
  userName: string
  eventId: string
  eventTitle: string
  eventEmoji: string
  amount: number
  date: string
  status: TxStatus
  method: 'card' | 'cash' | 'member_credit'
}

const mockTransactions: Transaction[] = [
  { id: 'tx_001', userId: 'u_ayse',   userName: 'Ayşe Kaya',      eventId: '1', eventTitle: 'Sunset Sailing on the Bosphorus', eventEmoji: '⛵', amount: 250, date: '2026-04-20', status: 'paid',     method: 'card' },
  { id: 'tx_002', userId: 'u_james',  userName: 'James Reed',      eventId: '1', eventTitle: 'Sunset Sailing on the Bosphorus', eventEmoji: '⛵', amount: 350, date: '2026-04-20', status: 'paid',     method: 'card' },
  { id: 'tx_003', userId: 'u_zeynep', userName: 'Zeynep Arslan',   eventId: '2', eventTitle: 'Dinner with Strangers',           eventEmoji: '🍽️', amount: 200, date: '2026-04-21', status: 'paid',     method: 'member_credit' },
  { id: 'tx_004', userId: 'u_carlos', userName: 'Carlos Mendez',   eventId: '2', eventTitle: 'Dinner with Strangers',           eventEmoji: '🍽️', amount: 200, date: '2026-04-21', status: 'pending',  method: 'card' },
  { id: 'tx_005', userId: 'u_burak',  userName: 'Burak Yıldız',    eventId: '4', eventTitle: 'Rooftop DJ Social Night',         eventEmoji: '🎵', amount: 100, date: '2026-04-22', status: 'paid',     method: 'card' },
  { id: 'tx_006', userId: 'u_nina',   userName: 'Nina Kovač',      eventId: '4', eventTitle: 'Rooftop DJ Social Night',         eventEmoji: '🎵', amount: 150, date: '2026-04-22', status: 'paid',     method: 'card' },
  { id: 'tx_007', userId: 'u_mehmet', userName: 'Mehmet Demir',    eventId: '1', eventTitle: 'Sunset Sailing on the Bosphorus', eventEmoji: '⛵', amount: 350, date: '2026-04-19', status: 'refunded', method: 'card' },
  { id: 'tx_008', userId: 'u_ayse',   userName: 'Ayşe Kaya',       eventId: '5', eventTitle: 'Sunday Morning Flow',            eventEmoji: '🌿', amount: 180, date: '2026-04-23', status: 'paid',     method: 'cash' },
  { id: 'tx_009', userId: 'u_carlos', userName: 'Carlos Mendez',   eventId: '5', eventTitle: 'Sunday Morning Flow',            eventEmoji: '🌿', amount: 180, date: '2026-04-23', status: 'paid',     method: 'card' },
  { id: 'tx_010', userId: 'u_james',  userName: 'James Reed',       eventId: '4', eventTitle: 'Rooftop DJ Social Night',        eventEmoji: '🎵', amount: 100, date: '2026-04-24', status: 'pending',  method: 'member_credit' },
]

const statusStyle: Record<TxStatus, string> = {
  paid:     'bg-green-100 text-green-700',
  pending:  'bg-amber-100 text-amber-700',
  refunded: 'bg-red-100 text-red-500',
}

const methodLabel: Record<string, string> = {
  card:          '💳 Card',
  cash:          '💵 Cash',
  member_credit: '♛ Credit',
}

export default function AdminPaymentsPage() {
  const [filter, setFilter] = useState<TxStatus | 'all'>('all')
  const [txList, setTxList] = useState(mockTransactions)
  const [toast,  setToast]  = useState('')

  function showToast(msg: string) {
    setToast(msg)
    setTimeout(() => setToast(''), 2500)
  }

  const visible = filter === 'all' ? txList : txList.filter((t) => t.status === filter)

  const totalRevenue  = txList.filter((t) => t.status === 'paid').reduce((s, t) => s + t.amount, 0)
  const totalPending  = txList.filter((t) => t.status === 'pending').reduce((s, t) => s + t.amount, 0)
  const totalRefunded = txList.filter((t) => t.status === 'refunded').reduce((s, t) => s + t.amount, 0)
  const txCount       = txList.filter((t) => t.status === 'paid').length

  const stats = [
    { label: 'Total Revenue',    value: `₺${totalRevenue.toLocaleString()}`,  icon: '💰', color: 'bg-green-50 text-green-600' },
    { label: 'Pending',          value: `₺${totalPending.toLocaleString()}`,  icon: '⏳', color: 'bg-amber-50 text-amber-600' },
    { label: 'Refunded',         value: `₺${totalRefunded.toLocaleString()}`, icon: '↩️', color: 'bg-red-50 text-red-500' },
    { label: 'Transactions',     value: txCount,                              icon: '🧾', color: 'bg-blue-50 text-blue-600' },
  ]

  return (
    <div className="p-8">
      {toast && (
        <div className="fixed top-6 right-6 z-50 bg-gray-900 text-white text-sm font-medium px-4 py-2.5 rounded-xl shadow-lg">
          {toast}
        </div>
      )}

      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-extrabold text-gray-900 tracking-tight">Payments</h1>
          <p className="text-sm text-gray-500 mt-1">{txList.length} transactions total</p>
        </div>
        <button
          onClick={() => showToast('Export coming soon')}
          className="btn-secondary text-sm"
        >
          Export CSV
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((s) => (
          <div key={s.label} className="bg-white rounded-2xl shadow-card p-5">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-xl mb-3 ${s.color}`}>
              {s.icon}
            </div>
            <div className="text-2xl font-extrabold text-gray-900">{s.value}</div>
            <div className="text-xs text-gray-500 mt-0.5">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Filter tabs */}
      <div className="flex gap-2 mb-4">
        {(['all', 'paid', 'pending', 'refunded'] as const).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-1.5 rounded-lg text-xs font-semibold capitalize transition-colors ${
              filter === f
                ? 'bg-gray-900 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {f}
            {f !== 'all' && (
              <span className="ml-1.5 opacity-70">
                ({txList.filter((t) => t.status === f).length})
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl shadow-card overflow-hidden">
        <div className="grid grid-cols-12 gap-3 px-6 py-3 bg-gray-50 border-b border-gray-100 text-xs font-semibold text-gray-500 uppercase tracking-wide">
          <div className="col-span-1">ID</div>
          <div className="col-span-3">User</div>
          <div className="col-span-3">Event</div>
          <div className="col-span-1 text-right">Amount</div>
          <div className="col-span-1 text-center">Method</div>
          <div className="col-span-1">Date</div>
          <div className="col-span-1 text-center">Status</div>
          <div className="col-span-1 text-right">Action</div>
        </div>

        <div className="divide-y divide-gray-50">
          {visible.length === 0 && (
            <div className="px-6 py-10 text-center text-gray-400 text-sm">No transactions found.</div>
          )}
          {visible.map((tx) => (
            <div key={tx.id} className="grid grid-cols-12 gap-3 px-6 py-4 items-center hover:bg-gray-50 transition-colors">
              <div className="col-span-1 text-xs text-gray-400 font-mono">{tx.id.replace('tx_', '#')}</div>
              <div className="col-span-3 text-sm font-semibold text-gray-800">{tx.userName}</div>
              <div className="col-span-3 flex items-center gap-1.5 min-w-0">
                <span>{tx.eventEmoji}</span>
                <span className="text-xs text-gray-600 truncate">{tx.eventTitle}</span>
              </div>
              <div className="col-span-1 text-right font-bold text-sm text-gray-900">₺{tx.amount}</div>
              <div className="col-span-1 text-center text-xs text-gray-500">{methodLabel[tx.method]}</div>
              <div className="col-span-1 text-xs text-gray-500">{tx.date}</div>
              <div className="col-span-1 text-center">
                <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full capitalize ${statusStyle[tx.status]}`}>
                  {tx.status}
                </span>
              </div>
              <div className="col-span-1 text-right">
                {tx.status === 'paid' && (
                  <button
                    onClick={() => showToast(`Refund issued for ${tx.userName}`)}
                    className="text-xs text-red-400 hover:text-red-600 font-medium"
                  >
                    Refund
                  </button>
                )}
                {tx.status === 'pending' && (
                  <button
                    onClick={() => showToast(`Payment confirmed for ${tx.userName}`)}
                    className="text-xs text-green-600 hover:text-green-800 font-medium"
                  >
                    Confirm
                  </button>
                )}
                {tx.status === 'refunded' && (
                  <span className="text-xs text-gray-300">—</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
