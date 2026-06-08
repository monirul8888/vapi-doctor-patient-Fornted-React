import { formatAppointmentDate } from '../utils/date'

export default function AppointmentCard({ appointment }) {
  const canceled = Boolean(appointment?.canceled)
  const id = appointment?.id ? String(appointment.id).padStart(4, '0') : '—'

  return (
    <article className="group rounded-3xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-hospital-200 hover:shadow-card">
      <div className="flex items-center justify-between gap-4">
        <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-extrabold uppercase tracking-wide text-slate-500">
          APT-{id}
        </span>
        <span className={`badge ${canceled ? 'badge-canceled' : 'badge-active'}`}>
          {canceled ? 'Canceled' : 'Active'}
        </span>
      </div>

      <h3 className="mt-4 text-lg font-extrabold text-slate-950">
        {appointment?.patient_name || 'Unknown patient'}
      </h3>

      <div className="mt-3 grid gap-3 text-sm text-slate-600 sm:grid-cols-2">
        <div className="flex items-center gap-2 rounded-2xl bg-hospital-50 px-3 py-2 text-hospital-800">
          <span>🗓️</span>
          <span className="font-semibold">{formatAppointmentDate(appointment?.start_time)}</span>
        </div>
        <div className="flex items-center gap-2 rounded-2xl bg-emerald-50 px-3 py-2 text-emerald-800">
          <span>📋</span>
          <span className="font-semibold">{appointment?.reason || '—'}</span>
        </div>
      </div>
    </article>
  )
}
