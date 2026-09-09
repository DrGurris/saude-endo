import { describe, it, expect, beforeEach, vi } from 'vitest'

// Mock the api module — isApiAvailable always returns false (no backend)
vi.mock('./api', () => ({
  isApiAvailable: vi.fn().mockResolvedValue(false),
  apiGet: vi.fn(),
  apiPost: vi.fn(),
  apiPut: vi.fn(),
  apiDelete: vi.fn(),
}))

import {
  fetchArticles,
  fetchArticleById,
  invalidateCache,
  fetchManagedArticles,
  createArticle,
  updateArticle,
  deleteArticle,
  publishArticle,
  archiveArticle,
} from './articleService'
import { ARTICLES } from '../data/articles'

describe('articleService (mock fallback)', () => {
  beforeEach(() => {
    localStorage.clear()
    invalidateCache()
  })

  describe('fetchArticles', () => {
    it('returns static ARTICLES when API unavailable', async () => {
      const articles = await fetchArticles()
      expect(articles).toBe(ARTICLES)
      expect(articles.length).toBe(24)
    })

    it('returns cached result on second call', async () => {
      const first = await fetchArticles()
      const second = await fetchArticles()
      expect(first).toBe(second)
    })

    it('re-fetches after cache invalidation', async () => {
      const first = await fetchArticles()
      invalidateCache()
      const second = await fetchArticles()
      // Both should reference ARTICLES but cache was reset
      expect(second).toBe(ARTICLES)
      expect(first).toBe(second)
    })
  })

  describe('fetchArticleById', () => {
    it('returns article by id', async () => {
      const article = await fetchArticleById(ARTICLES[0].id)
      expect(article).not.toBeNull()
      expect(article!.id).toBe(ARTICLES[0].id)
    })

    it('returns null for nonexistent id', async () => {
      const article = await fetchArticleById('nonexistent-id-xyz')
      expect(article).toBeNull()
    })
  })

  describe('Admin CRUD (mock store)', () => {
    it('creates and retrieves a managed article', async () => {
      const data = {
        title: 'Test Article',
        pillarId: 'pain' as const,
        summary: 'Test summary for the article about pain management.',
        contentMarkdown: 'A'.repeat(100),
        citations: ['Citation 1'],
        phenotypeRelevance: ['nociceptive' as const],
        goalRelevance: ['reduce_pain' as const],
        readTimeMinutes: 5,
        tags: ['test'],
        featured: false,
        status: 'draft' as const,
        authorId: 'user-1',
      }

      const created = await createArticle(data)
      expect(created.id).toBeTruthy()
      expect(created.title).toBe('Test Article')
      expect(created.version).toBe(1)

      const all = await fetchManagedArticles()
      const found = all.find(a => a.id === created.id)
      expect(found).toBeTruthy()
    })

    it('updates a managed article', async () => {
      const created = await createArticle({
        title: 'Original Title',
        pillarId: 'energy' as const,
        summary: 'Original summary text here for test.',
        contentMarkdown: 'B'.repeat(100),
        citations: ['Cite 1'],
        phenotypeRelevance: ['neuropathic' as const],
        goalRelevance: [],
        readTimeMinutes: 3,
        tags: [],
        featured: false,
        status: 'draft' as const,
        authorId: 'user-1',
      })

      const updated = await updateArticle(created.id, { title: 'Updated Title' })
      expect(updated).not.toBeNull()
      expect(updated!.title).toBe('Updated Title')
    })

    it('deletes a managed article', async () => {
      const created = await createArticle({
        title: 'To Delete',
        pillarId: 'nutrition' as const,
        summary: 'This article will be deleted soon.',
        contentMarkdown: 'C'.repeat(100),
        citations: ['Cite X'],
        phenotypeRelevance: ['mixed' as const],
        goalRelevance: [],
        readTimeMinutes: 2,
        tags: [],
        featured: false,
        status: 'draft' as const,
        authorId: 'user-1',
      })

      const deleted = await deleteArticle(created.id)
      expect(deleted).toBe(true)

      const all = await fetchManagedArticles()
      expect(all.find(a => a.id === created.id)).toBeUndefined()
    })

    it('publishArticle sets status to published', async () => {
      const created = await createArticle({
        title: 'Draft Article',
        pillarId: 'wellbeing' as const,
        summary: 'Draft article for publishing test.',
        contentMarkdown: 'D'.repeat(100),
        citations: ['Cite'],
        phenotypeRelevance: ['nociplastic' as const],
        goalRelevance: [],
        readTimeMinutes: 4,
        tags: [],
        featured: false,
        status: 'draft' as const,
        authorId: 'user-1',
      })

      const published = await publishArticle(created.id)
      expect(published!.status).toBe('published')
    })

    it('archiveArticle sets status to archived', async () => {
      const created = await createArticle({
        title: 'To Archive',
        pillarId: 'hormones' as const,
        summary: 'Article that will be archived for test.',
        contentMarkdown: 'E'.repeat(100),
        citations: ['Cite'],
        phenotypeRelevance: ['nociceptive' as const],
        goalRelevance: [],
        readTimeMinutes: 3,
        tags: [],
        featured: false,
        status: 'published' as const,
        authorId: 'user-1',
      })

      const archived = await archiveArticle(created.id)
      expect(archived!.status).toBe('archived')
    })
  })
})
