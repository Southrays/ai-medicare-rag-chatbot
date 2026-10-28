const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:8000').replace(/\/$/, '')

async function parseResponse(response) {
  const contentType = response.headers.get('content-type') || ''
  const body = contentType.includes('application/json')
    ? await response.json()
    : await response.text()
  if (!response.ok) {
    const detail = typeof body === 'string' ? body : body?.detail || body?.error || `Request failed (${response.status})`
    throw new Error(detail)
  }
  return body
}

export async function askQuestion(question) {
  const body = new FormData()
  body.append('question', question)
  const response = await fetch(`${API_BASE_URL}/ask/`, {
    method: 'POST',
    body,
  })
  return parseResponse(response)
}

export async function uploadDocument(file) {
  const body = new FormData()
  body.append('files', file)
  const response = await fetch(`${API_BASE_URL}/upload_pdfs/`, {
    method: 'POST',
    body,
  })
  return parseResponse(response)
}

export { API_BASE_URL }