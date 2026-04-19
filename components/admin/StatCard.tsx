type Props = {
  title:  string
  value:  string
  change: string
  data?:  number[]
}

function Sparkline({ data }: { data: number[] }) {
  const w = 80, h = 28
  const min = Math.min(...data)
  const max = Math.max(...data)
  const range = max - min || 1

  const points = data.map((v, i) => {
    const x = (i / (data.length - 1)) * w
    const y = h - ((v - min) / range) * h
    return `${x},${y}`
  }).join(' ')

  const area = `0,${h} ` + points + ` ${w},${h}`

  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} className="overflow-visible">
      <polygon points={area} fill="currentColor" className="text-green-500/10" />
      <polyline points={points} fill="none" stroke="currentColor" strokeWidth="1.5" className="text-green-500" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export default function StatCard({ title, value, change, data }: Props) {
  return (
    <div className="bg-zinc-900 p-5 rounded-2xl">
      <div className="text-sm text-zinc-400">{title}</div>
      <div className="flex items-end justify-between mt-1 gap-3">
        <div>
          <div className="text-2xl font-semibold">{value}</div>
          <div className="text-xs text-green-500 mt-1">{change}</div>
        </div>
        {data && <Sparkline data={data} />}
      </div>
    </div>
  )
}
