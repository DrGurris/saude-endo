import type { ManagedArticle, WebArticle } from '../types'
import { ARTICLES } from '../data/articles'
import { isApiAvailable, apiGet, apiPost, apiPut, apiDelete } from './api'
import {
  getAllManagedArticles,
  getPublishedArticles,
  getManagedArticleById,
  createManagedArticle,
  updateManagedArticle,
  deleteManagedArticle,
} from './mockArticleStore'

// ─── Cache ───────────────────────────────────────────────────────────────

const CACHE_TTL = 5 * 60 * 1000 // 5 minutes
let cachedArticles: WebArticle[] | null = null
let cacheTimestamp = 0
let apiAvailable: boolean | null = null
let apiCheckTimer: ReturnType<typeof setTimeout> | null = null

async function checkApi(): Promise<boolean> {
  if (apiAvailable !== null) return apiAvailable
  apiAvailable = await isApiAvailable()
  if (apiCheckTimer) clearTimeout(apiCheckTimer)
  apiCheckTimer = setTimeout(() => { apiAvailable = null }, CACHE_TTL)
  return apiAvailable
}

function isCacheValid(): boolean {
  return cachedArticles !== null && Date.now() - cacheTimestamp < CACHE_TTL
}

// ─── Public API (Read) ──────────────────────────────────────────────────

export async function fetchArticles(): Promise<WebArticle[]> {
  if (isCacheValid()) return cachedArticles!

  const hasApi = await checkApi()

  if (hasApi) {
    const response = await apiGet<WebArticle[]>('/articles')
    if (response.success && response.data) {
      cachedArticles = response.data
      cacheTimestamp = Date.now()
      return response.data
    }
  }

  // Fallback to static articles
  cachedArticles = ARTICLES
  cacheTimestamp = Date.now()
  return ARTICLES
}

export async function fetchArticleById(id: string): Promise<WebArticle | null> {
  const articles = await fetchArticles()
  return articles.find(a => a.id === id) ?? null
}

export function invalidateCache(): void {
  cachedArticles = null
  cacheTimestamp = 0
}

// ─── Admin API (CRUD) ───────────────────────────────────────────────────

export async function fetchManagedArticles(): Promise<ManagedArticle[]> {
  const hasApi = await checkApi()

  if (hasApi) {
    const response = await apiGet<ManagedArticle[]>('/admin/articles')
    if (response.success && response.data) return response.data
  }

  return getAllManagedArticles()
}

export async function fetchManagedArticleById(id: string): Promise<ManagedArticle | null> {
  const hasApi = await checkApi()

  if (hasApi) {
    const response = await apiGet<ManagedArticle>(`/admin/articles/${id}`)
    if (response.success && response.data) return response.data
  }

  return getManagedArticleById(id)
}

export async function createArticle(
  data: Omit<ManagedArticle, 'id' | 'createdAt' | 'updatedAt' | 'version'>
): Promise<ManagedArticle> {
  const hasApi = await checkApi()

  if (hasApi) {
    const response = await apiPost<ManagedArticle>('/admin/articles', data)
    if (response.success && response.data) {
      invalidateCache()
      return response.data
    }
    throw new Error(response.error || 'Error al crear el articulo')
  }

  // Only use mock when API is genuinely unavailable
  const created = createManagedArticle(data)
  invalidateCache()
  return created
}

export async function updateArticle(
  id: string,
  data: Partial<Omit<ManagedArticle, 'id' | 'createdAt'>>
): Promise<ManagedArticle | null> {
  const hasApi = await checkApi()

  if (hasApi) {
    const response = await apiPut<ManagedArticle>(`/admin/articles/${id}`, data)
    if (response.success && response.data) {
      invalidateCache()
      return response.data
    }
    throw new Error(response.error || 'Error al actualizar el articulo')
  }

  const updated = updateManagedArticle(id, data)
  if (updated) invalidateCache()
  return updated
}

export async function deleteArticle(id: string): Promise<boolean> {
  const hasApi = await checkApi()

  if (hasApi) {
    const response = await apiDelete(`/admin/articles/${id}`)
    if (response.success) {
      invalidateCache()
      return true
    }
    throw new Error(response.error || 'Error al eliminar el articulo')
  }

  const deleted = deleteManagedArticle(id)
  if (deleted) invalidateCache()
  return deleted
}

export async function publishArticle(id: string): Promise<ManagedArticle | null> {
  return updateArticle(id, { status: 'published' })
}

export async function archiveArticle(id: string): Promise<ManagedArticle | null> {
  return updateArticle(id, { status: 'archived' })
}

// ─── Published articles for public use ──────────────────────────────────

export async function fetchPublishedArticles(): Promise<WebArticle[]> {
  const hasApi = await checkApi()

  if (hasApi) {
    const response = await apiGet<WebArticle[]>('/articles')
    if (response.success && response.data) return response.data
  }

  return getPublishedArticles()
}
