import { useConfig } from '../context/ConfigContext'

export default function Topbar() {
  const { config } = useConfig()
  const vapiReady = Boolean(config.vapiPublicKey && config.vapiAssistantId)

  return (
    <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/85 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center gap-4 px-4 py-4 sm:px-6 lg:px-8 xl:px-10">
        {/* Logo / Icon */}
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-hospital-gradient text-2xl text-white shadow-lg shadow-hospital-600/20">
          🏥
        </div>

        {/* App Title */}
        <div>
          <h1 className="text-lg font-extrabold text-slate-950 sm:text-xl">
            Dubai Hospital
          </h1>
          <p className="text-sm font-semibold text-slate-500">
            AI-Powered Appointment Management System
          </p>
        </div>

        {/* AI Status */}
        <div className="ml-auto hidden items-center gap-3 rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-extrabold text-slate-700 sm:flex">
          <span
            className={`h-2.5 w-2.5 rounded-full ${
              vapiReady ? 'bg-emerald-500 animate-pulse' : 'bg-amber-400'
            }`}
          />
          {vapiReady ? 'Adam AI Receptionist Active' : 'Configure Adam AI'}
        </div>

        {/* Optional: Professional Tagline */}
        
      </div>
    </header>
  )
}