import { useState } from 'react'
import { getAppointmentById, listAppointments, searchAppointmentsByName } from '../api/client'
import Alert from '../components/Alert'
import AppointmentCard from '../components/AppointmentCard'
import Button from '../components/Button'
import Card from '../components/Card'
import EmptyState from '../components/EmptyState'
import { Field, TextInput } from '../components/Field'
import { useConfig } from '../context/ConfigContext'
import { todayDateInput } from '../utils/date'

const modes = [
  { id: 'id', label: 'By ID', icon: '🔢' },
  { id: 'name', label: 'By Patient Name', icon: '👤' },
  { id: 'date', label: 'By Date', icon: '🗓️' }
]

export default function SearchPage() {
  const { config } = useConfig()
  const [mode, setMode] = useState('id')
  const [appointmentId, setAppointmentId] = useState('1')
  const [patientName, setPatientName] = useState('')
  const [date, setDate] = useState(todayDateInput())
  const [results, setResults] = useState([])
  const [hasSearched, setHasSearched] = useState(false)
  const [loading, setLoading] = useState(false)
  const [alert, setAlert] = useState(null)

  async function handleSearch(event) {
    event.preventDefault()
    setLoading(true)
    setAlert(null)
    setResults([])
    setHasSearched(false)

    try {
      if (mode === 'id') {
        if (!appointmentId || Number(appointmentId) < 1) {
          throw new Error('Enter a valid appointment ID.')
        }
        const result = await getAppointmentById(config.backendUrl, Number(appointmentId))
        setResults(result ? [result] : [])
      }

      if (mode === 'name') {
        if (!patientName.trim()) {
          throw new Error('Enter a patient name to search.')
        }
        const result = await searchAppointmentsByName(config.backendUrl, patientName.trim())
        setResults(Array.isArray(result) ? result : [])
      }

      if (mode === 'date') {
        const result = await listAppointments(config.backendUrl, date)
        setResults(Array.isArray(result) ? result : [])
      }

      setHasSearched(true)
    } catch (error) {
      setAlert({ type: 'error', message: error.message || 'Search failed.' })
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card icon="🔎" title="Search Appointments" subtitle="Find appointments by ID, patient name, or appointment date.">
      <form className="space-y-5" onSubmit={handleSearch}>
        <Field label="Search Mode">
          <div className="grid gap-2 rounded-3xl border border-slate-200 bg-slate-50 p-2 sm:grid-cols-3">
            {modes.map((item) => (
              <button
                key={item.id}
                type="button"
                className={`rounded-2xl px-4 py-3 text-sm font-extrabold transition ${mode === item.id ? 'bg-white text-hospital-700 shadow-sm ring-1 ring-hospital-100' : 'text-slate-500 hover:bg-white hover:text-slate-900'}`}
                onClick={() => {
                  setMode(item.id)
                  setAlert(null)
                  setResults([])
                  setHasSearched(false)
                }}
              >
                <span className="mr-2">{item.icon}</span>
                {item.label}
              </button>
            ))}
          </div>
        </Field>

        {mode === 'id' && (
          <TextInput
            label="Appointment ID"
            type="number"
            min="1"
            value={appointmentId}
            onChange={(event) => setAppointmentId(event.target.value)}
            placeholder="e.g. 12"
          />
        )}

        {mode === 'name' && (
          <TextInput
            label="Patient Name"
            value={patientName}
            onChange={(event) => setPatientName(event.target.value)}
            placeholder="Enter full or partial patient name"
          />
        )}

        {mode === 'date' && (
          <TextInput
            label="Appointment Date"
            type="date"
            value={date}
            onChange={(event) => setDate(event.target.value)}
          />
        )}

        <Button type="submit" disabled={loading}>
          {loading ? 'Searching…' : 'Search →'}
        </Button>
      </form>

      {alert && <Alert type={alert.type}>{alert.message}</Alert>}

      <div className="mt-6">
        {hasSearched && results.length === 0 && (
          <EmptyState icon="🔍" title="No matching appointments" description="Try a different search value or date." />
        )}

        {results.length > 0 && (
          <div>
            <div className="mb-4 rounded-2xl bg-hospital-50 px-4 py-3 text-sm font-extrabold text-hospital-800">
              {results.length} result{results.length > 1 ? 's' : ''} found
            </div>
            <div className="space-y-4">
              {results.map((appointment) => (
                <AppointmentCard key={appointment.id ?? `${appointment.patient_name}-${appointment.start_time}`} appointment={appointment} />
              ))}
            </div>
          </div>
        )}
      </div>
    </Card>
  )
}
