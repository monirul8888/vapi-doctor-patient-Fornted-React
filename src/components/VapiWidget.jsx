import { useEffect, useState } from 'react'
import { useConfig } from '../context/ConfigContext'

const VAPI_SCRIPT_ID = 'vapi-widget-sdk'
const VAPI_SCRIPT_SRC =
  'https://unpkg.com/@vapi-ai/client-sdk-react/dist/embed/widget.umd.js'

export default function VapiWidget() {
  const { config } = useConfig()
  const ready = Boolean(config.vapiPublicKey && config.vapiAssistantId)

  const [scriptLoaded, setScriptLoaded] = useState(false)
  const [scriptError, setScriptError] = useState(false)

  // Load Vapi script once
  useEffect(() => {
    if (!ready) return

    if (!document.getElementById(VAPI_SCRIPT_ID)) {
      const script = document.createElement('script')
      script.id = VAPI_SCRIPT_ID
      script.src = VAPI_SCRIPT_SRC
      script.async = true
      script.defer = true
      script.onload = () => setScriptLoaded(true)
      script.onerror = () => setScriptError(true)
      document.body.appendChild(script)
    } else {
      setScriptLoaded(true)
    }
  }, [ready])

  if (!ready) {
    return (
      <div className="panel-card p-6">
        <h3 className="font-bold text-amber-900">Vapi keys not configured</h3>
        <p className="text-amber-700">
          Add your Vapi public key and assistant ID in the sidebar to activate Adam.
        </p>
      </div>
    )
  }

  return (
    <section className="panel-card overflow-hidden">
      <div className="flex items-center gap-3 border-b border-slate-100 p-6">
        <div className="relative flex h-12 w-12 items-center justify-center rounded-2xl bg-cyan-50 text-2xl text-cyan-700">
          🤖
          <span className="absolute -right-1 -top-1 h-4 w-4 rounded-full border-2 border-white bg-emerald-500 animate-pulse" />
        </div>
        <div>
          <h2 className="font-extrabold text-slate-950">Adam — AI Receptionist</h2>
          <p className="text-sm font-medium text-slate-500">Voice-powered appointment booking</p>
        </div>
      </div>

      <div className="p-6">
        {scriptError && (
          <div className="rounded-3xl border border-red-200 bg-red-50 p-8 text-center">
            <div className="text-4xl">⚠️</div>
            <h3 className="mt-3 font-extrabold text-red-900">Vapi widget failed to load</h3>
            <p className="mt-2 text-sm text-red-700">
              Check internet connection, Vapi keys, and browser console.
            </p>
          </div>
        )}

        {scriptLoaded && !scriptError && (
          <div className="min-h-[360px] w-full overflow-hidden rounded-2xl bg-white">
            <vapi-widget
              key={`${config.vapiPublicKey}-${config.vapiAssistantId}`} 
              public-key={config.vapiPublicKey}
              assistant-id={config.vapiAssistantId}
              mode="voice"
              theme="light"
              size="full"
              radius="large"
              main-label="Adam — AI Receptionist"
              start-button-text="📞 Start Call"
              end-button-text="End Call"
              empty-voice-message="Hello! I'm Adam from Dubai Hospital. How can I help you today?"
            />
          </div>
        )}

        {!scriptLoaded && !scriptError && (
          <div className="flex flex-col items-center justify-center min-h-[360px]">
            <div className="h-10 w-10 animate-spin rounded-full border-4 border-cyan-200 border-t-cyan-600" />
            <h3 className="mt-4 font-extrabold text-cyan-900">Loading Adam AI...</h3>
            <p className="mt-2 text-sm text-cyan-700">Preparing the voice call option.</p>
          </div>
        )}
      </div>
    </section>
  )
}