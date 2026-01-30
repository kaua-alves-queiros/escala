import ScheduleGenerator from './escala/components/ScheduleGenerator'

export const metadata = {
  title: 'Escala',
}

export default function Home() {
  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold mb-4">Escala (Gerador)</h1>
      <ScheduleGenerator />
    </main>
  )
}
