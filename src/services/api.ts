const API_URL = import.meta.env.VITE_API_URL || '/api'
const TOKEN_KEY = 'saude_token'

export interface ApiResponse<T> {
  success: boolean
  data?: T
  error?: string
  meta?: {
    total: number
    page: number
    limit: number
  }
}

function getAuthHeaders(): Record<string, string> {
  const token = localStorage.getItem(TOKEN_KEY)
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  }
  if (token) {
    headers['Authorization'] = `Bearer ${token}`
  }
  return headers
}

async function handleResponse<T>(response: Response): Promise<ApiResponse<T>> {
  if (!response.ok) {
    const body = await response.json().catch(() => ({}))
    return {
      success: false,
      error: body.detail || body.message || `Error ${response.status}`,
    }
  }

  try {
    const data = await response.json()
    return { success: true, data }
  } catch {
    return { success: false, error: 'Invalid response format' }
  }
}

export async function apiGet<T>(path: string): Promise<ApiResponse<T>> {
  const response = await fetch(`${API_URL}${path}`, {
    method: 'GET',
    headers: getAuthHeaders(),
  })
  return handleResponse<T>(response)
}

export async function apiPost<T>(path: string, body: unknown): Promise<ApiResponse<T>> {
  const response = await fetch(`${API_URL}${path}`, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify(body),
  })
  return handleResponse<T>(response)
}

export async function apiPut<T>(path: string, body: unknown): Promise<ApiResponse<T>> {
  const response = await fetch(`${API_URL}${path}`, {
    method: 'PUT',
    headers: getAuthHeaders(),
    body: JSON.stringify(body),
  })
  return handleResponse<T>(response)
}

export async function apiDelete<T>(path: string): Promise<ApiResponse<T>> {
  const response = await fetch(`${API_URL}${path}`, {
    method: 'DELETE',
    headers: getAuthHeaders(),
  })
  return handleResponse<T>(response)
}

export async function isApiAvailable(): Promise<boolean> {
  try {
    const response = await fetch(`${API_URL}/health`, {
      method: 'GET',
      signal: AbortSignal.timeout(3000),
    })
    if (!response.ok) return false
    // Verify it's a real API response, not an SPA fallback returning HTML
    const contentType = response.headers.get('content-type') || ''
    return contentType.includes('application/json')
  } catch {
    return false
  }
}

export { API_URL }
