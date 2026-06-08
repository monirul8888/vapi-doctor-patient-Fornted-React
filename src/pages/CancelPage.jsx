import { useState } from 'react'
import { cancelAppointment } from '../api/client'
import Alert from '../components/Alert'
import Button from '../components/Button'
import Card from '../components/Card'
import { TextInput } from '../components/Field'
import { useConfig } from '../context/ConfigContext'
import { todayDateInput } from '../utils/date'

export default function CancelPage() {
  const { config } = useConfig()
  const [patientName, setPatientName] = useState('')
  const [date, setDate] = useState(todayDateInput())
  const [loading, setLoading] = useState(false)
  const [alert, setAlert] = useState(null)

  async function handleCancel(event) {
    event.preventDefault()
    setAlert(null)

    if (!patientName.trim()) {
      setAlert({ type: 'error', message: 'Patient name is required.' })
      return
    }

    setLoading(true)

    try {
      const result = await cancelAppointment(config.backendUrl, {
        patient_name: patientName.trim(),
        date
      })

      const count = result?.canceled_count || 0
      if (count === 0) {
        setAlert({ type: 'warning', message: 'No matching appointment found for that patient and date.' })
      } else {
        setAlert({ type: 'success', message: `${count} appointment${count > 1 ? 's' : ''} canceled successfully.` })
        setPatientName('')
      }
    } catch (error) {
      setAlert({ type: 'error', message: error.message || 'Cannot cancel appointment.' })
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card icon="❌" title="Cancel Appointment" subtitle="Cancel appointments by patient name and appointment date.">
      <form className="space-y-5" onSubmit={handleCancel}>
        <div className="grid gap-5 md:grid-cols-2">
          <TextInput
            label="Patient Name"
            value={patientName}
            onChange={(event) => setPatientName(event.target.value)}
            placeholder="Full name as booked"
          />
          <TextInput
            label="Appointment Date"
            type="date"
            value={date}
            onChange={(event) => setDate(event.target.value)}
          />
        </div>

      

        <Button type="submit" variant="danger" className="w-full md:w-auto" disabled={loading}>
          {loading ? 'Processing cancellation…' : 'Cancel Appointment →'}
        </Button>

        {alert && <Alert type={alert.type}>{alert.message}</Alert>}
      </form>
    </Card>
  )
}
