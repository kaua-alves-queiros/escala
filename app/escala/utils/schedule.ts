export type ScheduleRow = { date: string; weekday: string; person: string }

function formatDate(d: Date) {
  return d.toISOString().slice(0, 10)
}

const WEEKDAYS = ['Domingo','Segunda','Terça','Quarta','Quinta','Sexta','Sábado']

export function generateSchedule(members: string[], start: Date, weeks = 4): ScheduleRow[] {
  if (!members || members.length === 0) return []

  const totalDays = weeks * 7
  const rows: ScheduleRow[] = []
  let weekdayCounter = 0

  for (let i = 0; i < totalDays; i++) {
    const d = new Date(start)
    d.setDate(start.getDate() + i)
    const day = d.getDay() // 0 = Sunday, 6 = Saturday
    const dateStr = formatDate(d)
    const weekdayName = WEEKDAYS[day]

    if (day === 6 || day === 0) {
      // weekend: assign by week number (each weekend pair gets the same person)
      const diffDays = Math.floor((d.getTime() - start.getTime()) / (1000 * 60 * 60 * 24))
      const weekIndex = Math.floor(diffDays / 7)
      const person = members[weekIndex % members.length]
      rows.push({ date: dateStr, weekday: weekdayName, person })
    } else {
      // weekday: alternate day by day among members
      const person = members[weekdayCounter % members.length]
      rows.push({ date: dateStr, weekday: weekdayName, person })
      weekdayCounter++
    }
  }

  return rows
}
