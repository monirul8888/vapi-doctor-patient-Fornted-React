function normalizeBaseUrl(baseUrl) {
  return (baseUrl || '').replace(/\/$/, '')
}

async function parseResponse(response) {
  const text = await response.text()
  let data = null

  if (text) {
    try {
      data = JSON.parse(text)
    } catch {
      data = text
    }
  }

  if (!response.ok) {
    const detail = data?.detail || data?.message || response.statusText || 'Request failed'
    throw new Error(detail)
  }

  return data
}

export async function apiGet(baseUrl, path, params = {}) {
  const url = new URL(`${normalizeBaseUrl(baseUrl)}${path}`)
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      url.searchParams.set(key, value)
    }
  })

  const response = await fetch(url, {
    method: 'GET',
    headers: { Accept: 'application/json' }
  })

  return parseResponse(response)
}

export async function apiPost(baseUrl, path, payload = {}) {
  const response = await fetch(`${normalizeBaseUrl(baseUrl)}${path}`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  })

  return parseResponse(response)
}

export async function checkBackendHealth(baseUrl) {
  return apiGet(baseUrl, '/health')
}

export function scheduleAppointment(baseUrl, payload) {
  return apiPost(baseUrl, '/schedule_appointment/', payload)
}

export function cancelAppointment(baseUrl, payload) {
  return apiPost(baseUrl, '/cancel_appointment/', payload)
}

export function listAppointments(baseUrl, date) {
  return apiPost(baseUrl, '/list_appointments/', { date })
}

export function searchAppointmentsByName(baseUrl, patientName) {
  return apiPost(baseUrl, '/search_appointments/', { patient_name: patientName })
}

export function getAppointmentById(baseUrl, appointmentId) {
  return apiGet(baseUrl, `/appointments/${appointmentId}`)
}
