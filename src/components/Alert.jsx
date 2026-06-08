const styles = {
  success: 'border-emerald-200 bg-emerald-50 text-emerald-800',
  error: 'border-rose-200 bg-rose-50 text-rose-800',
  warning: 'border-amber-200 bg-amber-50 text-amber-800',
  info: 'border-hospital-200 bg-hospital-50 text-hospital-800'
}

const icons = {
  success: '✅',
  error: '⚠️',
  warning: '💡',
  info: 'ℹ️'
}

export default function Alert({ type = 'info', children }) {
  if (!children) return null

  return (
    <div className={`mt-4 flex items-start gap-3 rounded-2xl border px-4 py-3 text-sm font-semibold ${styles[type]}`}>
      <span className="mt-0.5 shrink-0">{icons[type]}</span>
      <span>{children}</span>
    </div>
  )
}
