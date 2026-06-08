import { createContext, useContext, useMemo, useState } from 'react'

const STORAGE_KEY = 'dubai-hospital-config'

const defaultConfig = {
  backendUrl: import.meta.env.VITE_BACKEND_URL || 'http://127.0.0.1:4444',
  databaseUrl: import.meta.env.VITE_DATABASE_URL || '',
  vapiPublicKey: import.meta.env.VITE_VAPI_PUBLIC_KEY || '',
  vapiPrivateKey: import.meta.env.VITE_VAPI_PRIVATE_KEY || '',
  vapiAssistantId: import.meta.env.VITE_VAPI_ASSISTANT_ID || ''
}

const ConfigContext = createContext(null)

function readStoredConfig() {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    return raw ? { ...defaultConfig, ...JSON.parse(raw) } : defaultConfig
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
