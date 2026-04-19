import { events, hosts } from '@/lib/data'

const today = new Date().toISOString().split('T')[0]

const upcoming = events
  .filter((e) => e.date >= today)
  .map((e) => ({
    name:   e.title,
    date:   new Date(e.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
    host:   hosts[e.hostId]?.name ?? '—',
    spots:  e.spotsLeft,
    status: e.spotsLeft <= 3 ? 'Almost Full' : 'Open',
  }))

export default function EventsTable() {
  return (
    <table className="w-full text-sm">
      <thead className="text-zinc-400">
        <tr>
          <th className="text-left py-2">Event</th>
          <th>Date</th>
          <th>Host</th>
          <th>Spots</th>
          <th>Status</th>
        </tr>
      </thead>

      <tbody>
        {upcoming.map((e, i) => (
          <tr key={i} className="border-t border-zinc-800 hover:bg-zinc-800">
            <td className="py-3">{e.name}</td>
            <td className="text-center">{e.date}</td>
            <td className="text-center">{e.host}</td>
            <td className="text-center">{e.spots}</td>
            <td className="text-center">
              <span className={`px-2 py-1 rounded-lg text-xs ${
                e.status === 'Almost Full'
                  ? 'bg-yellow-500/20 text-yellow-400'
                  : 'bg-green-500/20 text-green-400'
              }`}>
                {e.status}
              </span>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
