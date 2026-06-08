export default function Card({ icon, title, subtitle, children, className = '' }) {
  return (
    <section className={`panel-card p-6 ${className}`}>
      {(title || subtitle) && (
        <div className="mb-6 flex items-start gap-3 border-b border-slate-100 pb-5">
          {icon && (
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-hospital-gradient text-xl text-white shadow-lg shadow-hospital-500/20">
              {icon}
            </div>
          )}
          <div>
            {title && <h2 className="text-xl font-extrabold text-slate-950">{title}</h2>}
            {subtitle && <p className="mt-1 text-sm font-medium text-slate-500">{subtitle}</p>}
          </div>
        </div>
      )}
      {children}
    </section>
  )
}
