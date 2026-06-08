import { createContext, useContext, useMemo, useState } from 'react'

const STORAGE_KEY = 'dubai-hospital-config'

const defaultConfig = {
  backendUrl:
    import.meta.env.VITE_BACKEND_URL ||
    (import.meta.env.PROD ? 'https://api.pixelstack.cloud' : 'http://127.0.0.1:8000'),

  vapiPublicKey: import.meta.env.VITE_VAPI_PUBLIC_KEY || '',
  vapiAssistantId: import.meta.env.VITE_VAPI_ASSISTANT_ID || ''
}

const ConfigContext = createContext(null)

function readStoredConfig() {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    const stored = raw ? JSON.parse(raw) : {}

    return {
      ...defaultConfig,
      ...stored,

      // In production, env/backend URL should win over old localStorage value
      backendUrl: import.meta.env.VITE_BACKEND_URL || stored.backendUrl || defaultConfig.backendUrl,

      // Env values should also win if provided during build
      vapiPublicKey: import.meta.env.VITE_VAPI_PUBLIC_KEY || stored.vapiPublicKey || '',
      vapiAssistantId: import.meta.env.VITE_VAPI_ASSISTANT_ID || stored.vapiAssistantId || ''
    }
  } catch {
    return defaultConfig
  }
}

export function ConfigProvider({ children }) {
  const [config, setConfigState] = useState(readStoredConfig)
  const [savedAt, setSavedAt] = useState(null)

  const setConfig = (patch) => {
    setConfigState((current) => ({ ...current, ...patch }))
  }

  const saveConfig = () => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(config))
    setSavedAt(new Date().toISOString())
  }

  const resetConfig = () => {
    setConfigState(defaultConfig)
    window.localStorage.removeItem(STORAGE_KEY)
    setSavedAt(null)
  }

  const value = useMemo(
    () => ({ config, setConfig, saveConfig, resetConfig, savedAt }),
    [config, savedAt]
  )

  return <ConfigContext.Provider value={value}>{children}</ConfigContext.Provider>
}

export function useConfig() {
  const context = useContext(ConfigContext)

  if (!context) {
    throw new Error('useConfig must be used inside ConfigProvider')
  }

  return context
}