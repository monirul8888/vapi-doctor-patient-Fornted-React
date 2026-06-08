export default function StatRow({ total = 0, active = 0, canceled = 0 }) {
  const stats = [
    { label: 'Total', value: total, className: 'bg-hospital-50 text-hospital-700' },
    { label: 'Active', value: active, className: 'bg-emerald-50 text-emerald-700' },
    { label: 'Canceled', value: canceled, className: 'bg-rose-50 text-rose-700' }
  ]

  return (
    <div className="mb-5 grid gap-3 sm:grid-cols-3">
      {stats.map((item) => (
        <div key={item.label} className={`rounded-3xl border border-white p-5 text-center shadow-sm ${item.className}`}>
          <div className="text-3xl font-extrabold">{item.value}</div>
          <div className="mt-1 text-xs font-extrabold uppercase tracking-[0.2em] opacity-70">{item.label}</div>
        </div>
      ))}
    </div>
  )
}
