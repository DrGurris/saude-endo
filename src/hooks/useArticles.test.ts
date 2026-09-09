import { describe, it, expect, vi, beforeEach } from 'vitest'
import { renderHook, waitFor, act } from '@testing-library/react'

vi.mock('../services/articleService', () => ({
  fetchArticles: vi.fn(),
  invalidateCache: vi.fn(),
}))

import { useArticles } from './useArticles'
import { fetchArticles, invalidateCache } from '../services/articleService'
import type { WebArticle } from '../types'

const mockArticles: WebArticle[] = [
  {
    id: 'art-1',
    title: 'Test Article',
    summary: 'Summary',
    contentMarkdown: '# Test',
    pillarId: 'pain',
    tags: [],
    citations: ['Ref'],
    readTimeMinutes: 3,
    phenotypeRelevance: ['nociceptive'],
    goalRelevance: ['reduce_pain'],
  },
]

describe('useArticles', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('starts in loading state', () => {
    vi.mocked(fetchArticles).mockReturnValue(new Promise(() => {})) // never resolves
    const { result } = renderHook(() => useArticles())
    expect(result.current.isLoading).toBe(true)
    expect(result.current.articles).toEqual([])
    expect(result.current.error).toBeNull()
  })

  it('loads articles on mount', async () => {
    vi.mocked(fetchArticles).mockResolvedValue(mockArticles)
    const { result } = renderHook(() => useArticles())

    await waitFor(() => expect(result.current.isLoading).toBe(false))
    expect(result.current.articles).toEqual(mockArticles)
    expect(result.current.error).toBeNull()
  })

  it('sets error when fetch fails', async () => {
    vi.mocked(fetchArticles).mockRejectedValue(new Error('Network error'))
    const { result } = renderHook(() => useArticles())

    await waitFor(() => expect(result.current.isLoading).toBe(false))
    expect(result.current.error).toBe('Network error')
    expect(result.current.articles).toEqual([])
  })

  it('refetch invalidates cache and reloads', async () => {
    vi.mocked(fetchArticles).mockResolvedValue(mockArticles)
    const { result } = renderHook(() => useArticles())

    await waitFor(() => expect(result.current.isLoading).toBe(false))

    const updated = [...mockArticles, { ...mockArticles[0], id: 'art-2' }]
    vi.mocked(fetchArticles).mockResolvedValue(updated)

    await act(async () => {
      await result.current.refetch()
    })

    expect(invalidateCache).toHaveBeenCalled()
    expect(result.current.articles).toHaveLength(2)
  })

  it('uses generic error message for non-Error exceptions', async () => {
    vi.mocked(fetchArticles).mockRejectedValue('string error')
    const { result } = renderHook(() => useArticles())

    await waitFor(() => expect(result.current.isLoading).toBe(false))
    expect(result.current.error).toBe('Error al cargar articulos')
  })
})
