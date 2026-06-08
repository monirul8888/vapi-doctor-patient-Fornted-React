export default function QuickGuide() {
  return (
    <section className="panel-card overflow-hidden">
      <div className="bg-hospital-gradient px-6 py-5 text-white">
        <div className="text-sm font-bold uppercase tracking-[0.22em] text-white/75">Quick Guide</div>
        <h2 className="mt-1 text-2xl font-extrabold">How to use it ⚡</h2>
      </div>

      <div className="space-y-4 p-6">
        <div className="rounded-3xl bg-hospital-50 p-4">
          <div className="font-extrabold text-hospital-900">📞 Voice booking</div>
          <p className="mt-1 text-sm font-medium leading-6 text-hospital-800">
            Configure Vapi keys, then use Adam AI to handle appointment booking conversations.
          </p>
        </div>

        <div className="rounded-3xl bg-emerald-50 p-4">
          <div className="font-extrabold text-emerald-900">🗄️ Backend API</div>
          <p className="mt-1 text-sm font-medium leading-6 text-emerald-800">
            The React app calls your FastAPI endpoints for schedule, cancel, list, and search actions.
          </p>
        </div>

        <div className="rounded-3xl bg-amber-50 p-4">
          <div className="font-extrabold text-amber-900">💾 Config</div>
          <p className="mt-1 text-sm font-medium leading-6 text-amber-800">
            Sidebar settings are saved in browser localStorage and can also be seeded from your .env file.
          </p>
        </div>
      </div>
    </section>
  )
}
