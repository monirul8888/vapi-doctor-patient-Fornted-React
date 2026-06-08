import { useEffect, useRef, useState } from 'react'
import { useConfig } from '../context/ConfigContext'

const VAPI_SCRIPT_ID = 'vapi-widget-sdk'
const VAPI_SCRIPT_SRC =
  'https://cdn.jsdelivr.net/gh/VapiAI/html-script-tag@latest/dist/assets/index.js'

export default function VapiWidget() {
  const { config } = useConfig()

  const publicKey = config?.vapiPublicKey
  const assistantId = config?.vapiAssistantId
  const ready = Boolean(publicKey && assistantId)

  const [scriptLoaded, setScriptLoaded] = useState(false)
  const [scriptError, setScriptError] = useState(false)
  const vapiInstanceRef = useRef(null)

  useEffect(() => {
    if (!ready) return

    const runWidget = () => {
      if (!window.vapiSDK) {
        setScriptError(true)
        return
      }

      if (vapiInstanceRef.current) return

      const buttonConfig = {
        position: 'bottom-right',
        offset: '40px',
        width: '60px',
        height: '60px',
        idle: {
          color: '#06b6d4',
          type: 'pill',
          title: 'Adam — AI Receptionist',
          subtitle: 'Start voice booking',
          icon: 'https://unpkg.com/lucide-static@latest/icons/phone.svg'
        },
        loading: {
          color: '#06b6d4',
          type: 'pill',
          title: 'Connecting...',
          subtitle: 'Please wait'
        },
        active: {
          color: '#ef4444',
          type: 'pill',
          title: 'Call is active',
          subtitle: 'End the call'
        }
      }

      vapiInstanceRef.current = window.vapiSDK.run({
        apiKey: publicKey,
        assistant: assistantId,
        config: buttonConfig
      })

      setScriptLoaded(true)
      setScriptError(false)
    }

    const existingScript = document.getElementById(VAPI_SCRIPT_ID)

    if (existingScript) {
      runWidget()
      return
    }

    const script = document.createElement('script')
    script.id = VAPI_SCRIPT_ID
    script.src = VAPI_SCRIPT_SRC
    script.async = true
    script.defer = true

    script.onload = runWidget
    script.onerror = () => {
      setScriptLoaded(false)
      setScriptError(true)
    }

    document.body.appendChild(script)
  }, [ready, publicKey, assistantId])

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
          <p className="text-sm font-medium text-slate-500">
            Voice-powered appointment booking
          </p>
        </div>
      </div>

      <div className="p-6">
        {scriptError && (
          <div className="rounded-3xl border border-red-200 bg-red-50 p-8 text-center">
            <div className="text-4xl">⚠️</div>
            <h3 className="mt-3 font-extrabold text-red-900">
              Vapi widget failed to load
            </h3>
            <p className="mt-2 text-sm text-red-700">
              Check Vapi public key, assistant ID, and browser console.
            </p>
          </div>
        )}

        {!scriptError && (
          <div className="flex min-h-[360px] flex-col items-center justify-center rounded-2xl bg-white text-center">
            <div className="text-5xl">📞</div>
            <h3 className="mt-4 font-extrabold text-cyan-900">
              Adam AI is ready
            </h3>
            <p className="mt-2 max-w-sm text-sm text-slate-500">
              Use the voice call button at the bottom-right corner to start talking with Adam.
            </p>

            {!scriptLoaded && (
              <div className="mt-5 h-8 w-8 animate-spin rounded-full border-4 border-cyan-200 border-t-cyan-600" />
            )}
          </div>
        )}
      </div>
    </section>
  )
}