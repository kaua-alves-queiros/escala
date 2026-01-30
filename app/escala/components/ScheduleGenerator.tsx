'use client'

import React, { useState } from 'react'
import MemberForm from './MemberForm'
import { generateSchedule, ScheduleRow } from '../utils/schedule'

export default function ScheduleGenerator() {
  const [members, setMembers] = useState<string[]>(['Alice', 'Bob', 'Carol'])
  const [startDate, setStartDate] = useState<string>(new Date().toISOString().slice(0, 10))
  const [weeks, setWeeks] = useState<number>(4)
  const [schedule, setSchedule] = useState<ScheduleRow[]>([])

  function addMember(name: string) {
    setMembers((s) => [...s, name])
  }

  function removeMember(index: number) {
    setMembers((s) => s.filter((_, i) => i !== index))
  }

  function handleGenerate() {
    const rows = generateSchedule(members, new Date(startDate), weeks)
    setSchedule(rows)
  }

  async function exportCSV() {
    if (schedule.length === 0) return
    const header = ['Data', 'Dia', 'Turno']
    const lines = [header.join(','), ...schedule.map((r) => `${r.date},${r.weekday},${r.person}`)]
    const blob = new Blob([lines.join('\n')], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'escala.csv'
    a.click()
    URL.revokeObjectURL(url)
  }

  async function exportODS() {
    if (schedule.length === 0) return
    const XLSX = (await import('xlsx')) as any
    const wsData = [['Data', 'Dia', 'Turno'], ...schedule.map((r) => [r.date, r.weekday, r.person])]
    const ws = XLSX.utils.aoa_to_sheet(wsData)
    const wb = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(wb, ws, 'Escala')
    const wbout = XLSX.write(wb, { bookType: 'ods', type: 'array' })
    const blob = new Blob([wbout], { type: 'application/vnd.oasis.opendocument.spreadsheet' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'escala.ods'
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div>
      <div className="mb-4">
        <MemberForm onAdd={addMember} />
        <div className="flex gap-2 flex-wrap mb-4">
          {members.map((m, i) => (
            <div key={i} className="flex items-center gap-2 border rounded px-3 py-1">
              <span>{m}</span>
              <button className="text-sm text-red-600" onClick={() => removeMember(i)}>remover</button>
            </div>
          ))}
        </div>
      </div>

      <div className="mb-4 flex gap-2 items-center">
        <label>Data início:</label>
        <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} className="border p-1 rounded" />
        <label>Semanas:</label>
        <input type="number" min={1} value={weeks} onChange={(e) => setWeeks(Number(e.target.value))} className="border p-1 rounded w-20" />
        <button onClick={handleGenerate} className="bg-green-600 text-white px-4 rounded">Gerar</button>
      </div>

      <div className="mb-4">
        <div className="flex gap-2">
          <button onClick={exportCSV} className="bg-gray-800 text-white px-3 py-1 rounded">Exportar CSV</button>
          <button onClick={exportODS} className="bg-purple-800 text-white px-3 py-1 rounded">Exportar ODS</button>
        </div>
      </div>

      <div className="overflow-auto">
        {schedule.length === 0 ? (
          <div className="text-gray-600">Nenhuma escala gerada ainda.</div>
        ) : (
          <table className="table-auto border-collapse w-full">
            <thead>
              <tr className="bg-gray-100">
                <th className="border px-2 py-1">Data</th>
                <th className="border px-2 py-1">Dia</th>
                <th className="border px-2 py-1">Turno</th>
              </tr>
            </thead>
            <tbody>
              {schedule.map((r, i) => (
                <tr key={i}>
                  <td className="border px-2 py-1">{r.date}</td>
                  <td className="border px-2 py-1">{r.weekday}</td>
                  <td className="border px-2 py-1">{r.person}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}
