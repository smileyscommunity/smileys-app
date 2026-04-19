type Props = {
  name:   string
  events: number
  rate:   number
}

export default function HostCard({ name, events, rate }: Props) {
  return (
    <div className="flex items-center justify-between bg-zinc-800 p-3 rounded-xl">
      <div>
        <div className="font-medium">{name}</div>
        <div className="text-xs text-zinc-400">
          {events} events · {rate}% attendance
        </div>
      </div>

      <div className="text-xs bg-amber-500/20 text-amber-400 px-2 py-1 rounded">
        Top
      </div>
    </div>
  )
}
