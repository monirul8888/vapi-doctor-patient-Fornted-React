import { useConfig } from '../context/ConfigContext'

function StatusRow({ label, value, tone = 'slate' }) {
  const toneClass = {
    green: 'bg-emerald-50 text-emerald-700 ring-emerald-200',
    amber: 'bg-amber-50 text-amber-700 ring-amber-200',
    blue: 'bg-hospital-50 text-hospital-700 ring-hospital-200',
    slate: 'bg-slate-50 text-slate-700 ring-slate-200'
  }[tone]

  return (
    <div className="flex items-center justify-between gap-4 border-b border-slate-100 py-3 last:border-0">
      <span className="text-sm font-bold text-slate-500">{label}</span>
      <span className={`max-w-[180px] truncate rounded-full px-3 py-1 text-xs font-extrabold ring-1 ${toneClass}`} title={value}>
        {value}
      </span>
    </div>
  )
}

export default function ConfigSummary() {
  const { config } = useConfig()
  const vapiReady = Boolean(config.vapiPublicKey && config.vapiAssistantId)

  return (
    <section className="panel-card p-6">
      <div className="flex items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-indigo-50 text-xl text-indigo-700">📡</div>
        <div>
          <h2 className="font-extrabold text-slate-950">Active Configuration</h2>
          <p className="text-sm font-medium text-slate-500">Current app connections</p>
        </div>
      </div>

      <div className="mt-5 rounded-3xl border border-slate-100 bg-slate-50/70 px-4">
        <StatusRow label="Backend" value={config.backendUrl || 'Not set'} tone="blue" />
        
        <StatusRow label="Vapi AI" value={vapiReady ? 'Ready' : 'Not configured'} tone={vapiReady ? 'green' : 'amber'} />
      </div>
    </section>
  )
}
