export function todayDateInput() {
  return new Date().toISOString().slice(0, 10)
}

export function formatAppointmentDate(value) {
  if (!value) return '—'

  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return value

  return new Intl.DateTimeFormat('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }).format(date)
}

export function combineDateAndTime(date, time) {
  return `${date}T${time || '09:00'}:00`
}
