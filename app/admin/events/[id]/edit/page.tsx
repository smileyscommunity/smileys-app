import { events } from '@/lib/data'
import EditEventClient from './EditEventClient'

export function generateStaticParams() {
  return events.map((e) => ({ id: e.id }))
}

export default function EditEventPage({ params }: { params: Promise<{ id: string }> }) {
  return <EditEventClient params={params} />
}
