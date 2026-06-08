import { useState } from 'react'
import ConfigSummary from './components/ConfigSummary'
import QuickGuide from './components/QuickGuide'
import Sidebar from './components/Sidebar'
import Tabs from './components/Tabs'
import Topbar from './components/Topbar'
import VapiWidget from './components/VapiWidget'
import CancelPage from './pages/CancelPage'
import ListPage from './pages/ListPage'
import SchedulePage from './pages/SchedulePage'
import SearchPage from './pages/SearchPage'

const pageMap = {
  schedule: <SchedulePage />,
  cancel: <CancelPage />,
  list: <ListPage />,
  search: <SearchPage />
}

export default function App() {
  const [activeTab, setActiveTab] = useState('schedule')

  return (
    <div className="app-shell">
      <Sidebar />
      <div className="xl:pl-[330px]">
        <Topbar />

        <main className="mx-auto max-w-4xl px-4 py-6 sm:px-6 lg:px-8 xl:px-10">

          {/* Hero Section */}
          <section className="mb-6 overflow-hidden rounded-2xl bg-hospital-gradient p-6 text-white shadow-soft sm:p-8">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">

              {/* Left: Title + Description */}
              <div className="max-w-xl">
                <p className="mb-1 text-xs font-semibold uppercase tracking-widest text-white/50">
                  Hospital Management
                </p>
                <h1 className="text-2xl font-bold leading-snug tracking-tight text-white sm:text-3xl">
                  Appointment Dashboard
                </h1>
                <p className="mt-3 text-sm leading-relaxed text-white/75">
                  Schedule, cancel, list, and search patient appointments from one place.
                  Powered by Adam, our 24/7 AI receptionist, for seamless hospital operations.
                </p>
              </div>

              {/* Right: Stat Cards */}
              <div className="flex shrink-0 gap-3">
                <div className="rounded-xl bg-white/10 px-5 py-4 text-center ring-1 ring-white/20">
                  <div className="text-xl font-bold text-white">24/7</div>
                  <div className="mt-0.5 text-[10px] font-semibold uppercase tracking-wider text-white/60">AI Desk</div>
                </div>
                <div className="rounded-xl bg-white/10 px-5 py-4 text-center ring-1 ring-white/20">
                  <div className="text-xl font-bold text-white">Fast</div>
                  <div className="mt-0.5 text-[10px] font-semibold uppercase tracking-wider text-white/60">Booking</div>
                </div>
                <div className="rounded-xl bg-white/10 px-5 py-4 text-center ring-1 ring-white/20">
                  <div className="text-xl font-bold text-white">API</div>
                  <div className="mt-0.5 text-[10px] font-semibold uppercase tracking-wider text-white/60">Ready</div>
                </div>
              </div>

            </div>
          </section>

          {/* Main Grid */}
          <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_340px]">

            {/* Tabs & Pages */}
            <section>
              <Tabs activeTab={activeTab} onChange={setActiveTab} />
              {pageMap[activeTab]}
            </section>

            {/* Aside */}
            <aside className="space-y-4">
              <VapiWidget />
              <QuickGuide />
              <ConfigSummary />
            </aside>

          </div>
        </main>
      </div>
    </div>
  )
}
