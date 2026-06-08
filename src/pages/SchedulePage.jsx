import { useState } from 'react'
import { scheduleAppointment } from '../api/client'
import Alert from '../components/Alert'
import Button from '../components/Button'
import Card from '../components/Card'
import { TextInput } from '../components/Field'
import { useConfig } from '../context/ConfigContext'
import { combineDateAndTime, todayDateInput } from '../utils/date'

export default function SchedulePage() {
  const { config } = useConfig()
  const [patientName, setPatientName] = useState('')
  const [reason, setReason] = useState('')
  const [date, setDate] = useState(todayDateInput())
  const [time, setTime] = useState('09:00')
  const [loading, setLoading] = useState(false)
  const [alert, setAlert] = useState(null)

  async function handleSubmit(event) {
    event.preventDefault()
    setAlert(null)

    if (!patientName.trim()) {
      setAlert({ type: 'error', message: 'Patient full name is required.' })
      return
    }

    if (!reason.trim()) {
      setAlert({ type: 'error', message: 'Please enter a department or appointment reason.' })
      return
    }

    setLoading(true)

    try {
      const result = await scheduleAppointment(config.backendUrl, {
        patient_name: patientName.trim(),
        reason: reason.trim(),
        start_time: combineDateAndTime(date, time)
      })

      const id = result?.id ? String(result.id).padStart(4, '0') : '—'
      setAlert({ type: 'success', message: `Appointment confirmed successfully. ID: APT-${id}` })
      setPatientName('')
      setReason('')
      setTime('09:00')
    } catch (error) {
      setAlert({ type: 'error', message: error.message || 'Cannot schedule appointment.' })
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card icon="📝" title="Schedule New Appointment" subtitle="Create a patient visit and save it through your backend API.">
      <form className="space-y-5" onSubmit={handleSubmit}>
        <div className="grid gap-5 md:grid-cols-2">
          <TextInput
            label="Patient Full Name"
            value={patientName}
            onChange={(event) => setPatientName(event.target.value)}
            placeholder="e.g. Ahmed Al-Rashid"
          />
          <TextInput
            label="Department / Reason"
            value={reason}
            onChange={(event) => setReason(event.target.value)}
            placeholder="e.g. Cardiology · Checkup"
          />
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          <TextInput
            label="Appointment Date"
            type="date"
            value={date}
            onChange={(event) => setDate(event.target.value)}
          />
          <TextInput
            label="Appointment Time"
            type="time"
            value={time}
            onChange={(event) => setTime(event.target.value)}
          />
        </div>

        <div className="rounded-3xl bg-hospital-50 p-5 text-sm font-semibold leading-6 text-hospital-800">
          💙 Tip: The selected date and time are sent as an ISO-style value to match your existing FastAPI backend.
        </div>

        <Button type="submit" className="w-full md:w-auto" disabled={loading}>
          {loading ? 'Booking appointment…' : 'Confirm Appointment →'}
        </Button>

        {alert && <Alert type={alert.type}>{alert.message}</Alert>}
      </form>
    </Card>
  )
}
