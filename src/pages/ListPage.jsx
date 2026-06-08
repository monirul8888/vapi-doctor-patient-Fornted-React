import { useState } from 'react'
import { listAppointments } from '../api/client'
import Alert from '../components/Alert'
import AppointmentCard from '../components/AppointmentCard'
import Button from '../components/Button'
import Card from '../components/Card'
import EmptyState from '../components/EmptyState'
import { TextInput } from '../components/Field'
import StatRow from '../components/StatRow'
import { useConfig } from '../context/ConfigContext'
import { todayDateInput } from '../utils/date'

export default function ListPage() {
  const { config } = useConfig()
  const [date, setDate] = useState(todayDateInput())
  const [appointments, setAppointments] = useState([])
  const [hasLoaded, setHasLoaded] = useState(false)
  const [loading, setLoading] = useState(false)
  const [alert, setAlert] = useState(null)

  async function handleLoad(event) {
    event.preventDefault()
    setLoading(true)
    setAlert(null)
    setHasLoaded(false)

    try {
      const result = await listAppointments(config.backendUrl, date)
      setAppointments(Array.isArray(result) ? result : [])
      setHasLoaded(true)
    } catch (error) {
      setAlert({ type: 'error', message: error.message || 'Cannot load appointments.' })
      setAppointments([])
    } finally {
      setLoading(false)
    }
  }

  const total = appointments.length
  const active = appointments.filter((item) => !item.canceled).length
  const canceled = total - active

  return (
    <Card icon="📅" title="Appointments by Date" subtitle="Load all active and canceled appointments for a selected day.">
      <form className="mb-6 grid gap-4 md:grid-cols-[1fr_auto] md:items-end" onSubmit={handleLoad}>
        <TextInput
          label="Select Date"
          type="date"
          value={date}
          onChange={(event) => setDate(event.target.value)}
        />
        <Button type="submit" disabled={loading}>
          {loading ? 'Loading…' : 'Load →'}
        </Button>
      </form>

      {alert && <Alert type={alert.type}>{alert.message}</Alert>}

      {hasLoaded && appointments.length === 0 && (
        <EmptyState icon="📭" title="No appointments scheduled" description="There are no appointments for the selected date." />
      )}

      {appointments.length > 0 && (
        <div>
          <StatRow total={total} active={active} canceled={canceled} />
          <div className="space-y-4">
            {appointments.map((appointment) => (
              <AppointmentCard key={appointment.id ?? `${appointment.patient_name}-${appointment.start_time}`} appointment={appointment} />
            ))}
          </div>
        </div>
      )}
    </Card>
  )
}
