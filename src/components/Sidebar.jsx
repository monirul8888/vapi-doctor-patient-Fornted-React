import { useState } from 'react'
import { checkBackendHealth } from '../api/client'
import { useConfig } from '../context/ConfigContext'
import Alert from './Alert'
import Button from './Button'
import { TextInput } from './Field'

export default function Sidebar() {
  const { config, setConfig, saveConfig, resetConfig, savedAt } = useConfig()
  const [testing, setTesting] = useState(false)
  const [testStatus, setTestStatus] = useState(null)

  async function handleHealthTest() {
    setTesting(true)
    setTestStatus(null)

    try {
      await checkBackendHealth(config.backendUrl)
      setTestStatus({ type: 'success', message: 'Backend connected successfully.' })
    } catch (error) {
      setTestStatus({ type: 'error', message: error.message || 'Backend is unreachable.' })
    } finally {
      setTesting(false)
    }
  }

  const vapiReady = Boolean(config.vapiPublicKey && config.vapiAssistantId)

  return (
    <aside className="fixed inset-y-0 left-0 z-40 hidden w-[330px] overflow-y-auto border-r border-slate-200 bg-white/90 p-5 shadow-soft backdrop-blur xl:block">
      <div className="rounded-3xl bg-hospital-gradient p-5 text-white shadow-lg shadow-hospital-600/20">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/20 text-3xl">🏥</div>
          <div>
            <div className="text-lg font-extrabold">Dubai Hospital</div>
            <div className="text-sm font-semibold text-white/75">Configuration Panel</div>
          </div>
        </div>
      </div>

      <div className="mt-6 space-y-6">
        <section>
          <h3 className="mb-3 text-xs font-extrabold uppercase tracking-[0.2em] text-slate-400">🔌 Backend & Database</h3>
          <div className="space-y-4">
            <TextInput
              label="Backend URL"
              value={config.backendUrl}
              onChange={(event) => setConfig({ backendUrl: event.target.value })}
            />
          </div>
        </section>

        <section className="border-t border-slate-100 pt-6">
          <h3 className="mb-3 text-xs font-extrabold uppercase tracking-[0.2em] text-slate-400">🤖 Vapi AI Voice Agent</h3>
          <div className="space-y-4">
            <TextInput
              label="Public Key"
              type="password"
              value={config.vapiPublicKey}
              onChange={(event) => setConfig({ vapiPublicKey: event.target.value })}
              placeholder="vapi_pub_..."
            />
         
            <TextInput
              label="Assistant ID"
              value={config.vapiAssistantId}
              onChange={(event) => setConfig({ vapiAssistantId: event.target.value })}
              placeholder="asst_..."
            />

            <div className={`rounded-2xl border px-4 py-3 text-sm font-bold ${vapiReady ? 'border-emerald-200 bg-emerald-50 text-emerald-800' : 'border-amber-200 bg-amber-50 text-amber-800'}`}>
              {vapiReady ? '✅ Adam AI ready' : '⚠️ Add public key + assistant ID'}
            </div>
          </div>
        </section>

        <section className="border-t border-slate-100 pt-6">
          <div className="grid grid-cols-2 gap-3">
            <Button className="w-full" onClick={saveConfig}>💾 Save</Button>
            <Button variant="secondary" className="w-full" onClick={resetConfig}>Reset</Button>
          </div>
          {savedAt && <Alert type="success">Configuration saved locally.</Alert>}
        </section>
      </div>
    </aside>
  )
}
