import React from 'react'
import ScheduleGenerator from './components/ScheduleGenerator'

export const metadata = {
  title: 'Escala',
}

export default function Page() {
  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold mb-4">Escala (Gerador)</h1>
      <ScheduleGenerator />
    </main>
  )
}
