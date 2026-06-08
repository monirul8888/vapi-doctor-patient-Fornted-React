export default function EmptyState({ icon = '📭', title = 'No records found', description }) {
  return (
    <div className="rounded-3xl border border-dashed border-slate-300 bg-slate-50 px-6 py-12 text-center">
      <div className="text-5xl">{icon}</div>
      <h3 className="mt-4 text-lg font-extrabold text-slate-900">{title}</h3>
      {description && <p className="mt-2 text-sm font-medium text-slate-500">{description}</p>}
    </div>
  )
}
