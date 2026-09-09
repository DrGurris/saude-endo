import type { ManagedArticle, ArticleStatus } from '../types'
import { ARTICLES } from '../data/articles'

const STORE_KEY = 'saude_managed_articles'

function generateId(): string {
  return `art_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`
}

function loadArticles(): ManagedArticle[] {
  try {
    const raw = localStorage.getItem(STORE_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw)
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

function saveArticles(articles: ManagedArticle[]): void {
  localStorage.setItem(STORE_KEY, JSON.stringify(articles))
}

function seedFromStatic(): ManagedArticle[] {
  const existing = loadArticles()
  if (existing.length > 0) return existing

  const now = new Date().toISOString()
  const seeded: ManagedArticle[] = ARTICLES.map(article => ({
    ...article,
    status: 'published' as ArticleStatus,
    createdAt: now,
    updatedAt: now,
    authorId: 'system',
    version: 1,
  }))

  saveArticles(seeded)
  return seeded
}

export function getAllManagedArticles(): ManagedArticle[] {
  const articles = loadArticles()
  return articles.length > 0 ? articles : seedFromStatic()
}

export function getPublishedArticles(): ManagedArticle[] {
  return getAllManagedArticles().filter(a => a.status === 'published')
}

export function getManagedArticleById(id: string): ManagedArticle | null {
  return getAllManagedArticles().find(a => a.id === id) ?? null
}

export function createManagedArticle(
  data: Omit<ManagedArticle, 'id' | 'createdAt' | 'updatedAt' | 'version'>
): ManagedArticle {
  const now = new Date().toISOString()
  const article: ManagedArticle = {
    ...data,
    id: generateId(),
    createdAt: now,
    updatedAt: now,
    version: 1,
  }
  const all = getAllManagedArticles()
  saveArticles([...all, article])
  return article
}

export function updateManagedArticle(
  id: string,
  data: Partial<Omit<ManagedArticle, 'id' | 'createdAt'>>
): ManagedArticle | null {
  const all = getAllManagedArticles()
  const index = all.findIndex(a => a.id === id)
  if (index === -1) return null

  const updated: ManagedArticle = {
    ...all[index],
    ...data,
    id: all[index].id,
    createdAt: all[index].createdAt,
    updatedAt: new Date().toISOString(),
    version: all[index].version + 1,
  }

  const newList = all.map((a, i) => (i === index ? updated : a))
  saveArticles(newList)
  return updated
}

export function deleteManagedArticle(id: string): boolean {
  const all = getAllManagedArticles()
  const filtered = all.filter(a => a.id !== id)
  if (filtered.length === all.length) return false
  saveArticles(filtered)
  return true
}
