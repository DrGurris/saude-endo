import { describe, it, expect, beforeEach } from 'vitest'
import {
  filterArticles,
  getRecommendedArticles,
  getBookmarks,
  toggleBookmark,
  getReadProgress,
  setReadProgress,
  isArticleRead,
} from './articleHelpers'
import type { WebArticle } from '../types'

const MOCK_ARTICLES: WebArticle[] = [
  {
    id: 'art-1',
    title: 'Manejo del dolor',
    summary: 'Articulo sobre dolor',
    contentMarkdown: '# Dolor\nContenido extenso',
    pillarId: 'pain',
    tags: ['dolor', 'manejo'],
    citations: ['Ref 1'],
    readTimeMinutes: 5,
    phenotypeRelevance: ['nociceptive'],
    goalRelevance: ['reduce_pain'],
    featured: true,
  },
  {
    id: 'art-2',
    title: 'Nutricion antiinflamatoria',
    summary: 'Dieta para endometriosis',
    contentMarkdown: '# Nutricion\nContenido',
    pillarId: 'nutrition',
    tags: ['dieta', 'nutricion'],
    citations: ['Ref 2'],
    readTimeMinutes: 8,
    phenotypeRelevance: ['nociplastic', 'mixed'],
    goalRelevance: ['general_wellbeing'],
    featured: false,
  },
  {
    id: 'art-3',
    title: 'Energia y endometriosis',
    summary: 'Mejora tu energia',
    contentMarkdown: '# Energia\nContenido',
    pillarId: 'energy',
    tags: ['energia', 'fatiga'],
    citations: [],
    readTimeMinutes: 4,
    phenotypeRelevance: ['neuropathic'],
    goalRelevance: ['improve_energy'],
    featured: false,
  },
]

describe('filterArticles', () => {
  it('returns all articles with empty options', () => {
    const result = filterArticles(MOCK_ARTICLES, {})
    expect(result).toHaveLength(3)
  })

  it('returns all articles when pillarId is "all"', () => {
    const result = filterArticles(MOCK_ARTICLES, { pillarId: 'all' })
    expect(result).toHaveLength(3)
  })

  it('filters by pillar', () => {
    const result = filterArticles(MOCK_ARTICLES, { pillarId: 'pain' })
    expect(result).toHaveLength(1)
    expect(result[0].id).toBe('art-1')
  })

  it('filters by search query (title)', () => {
    const result = filterArticles(MOCK_ARTICLES, { searchQuery: 'nutricion' })
    expect(result).toHaveLength(1)
    expect(result[0].id).toBe('art-2')
  })

  it('filters by search query (summary)', () => {
    const result = filterArticles(MOCK_ARTICLES, { searchQuery: 'dieta' })
    expect(result).toHaveLength(1)
    expect(result[0].id).toBe('art-2')
  })

  it('filters by search query (tags)', () => {
    const result = filterArticles(MOCK_ARTICLES, { searchQuery: 'fatiga' })
    expect(result).toHaveLength(1)
    expect(result[0].id).toBe('art-3')
  })

  it('filters case-insensitive', () => {
    const result = filterArticles(MOCK_ARTICLES, { searchQuery: 'DOLOR' })
    expect(result).toHaveLength(1)
    expect(result[0].id).toBe('art-1')
  })

  it('returns empty for non-matching query', () => {
    const result = filterArticles(MOCK_ARTICLES, { searchQuery: 'xyz' })
    expect(result).toHaveLength(0)
  })

  it('combines pillar and query filters', () => {
    const result = filterArticles(MOCK_ARTICLES, { pillarId: 'pain', searchQuery: 'dolor' })
    expect(result).toHaveLength(1)
    expect(result[0].id).toBe('art-1')
  })

  it('returns empty when filters are contradictory', () => {
    const result = filterArticles(MOCK_ARTICLES, { pillarId: 'pain', searchQuery: 'nutricion' })
    expect(result).toHaveLength(0)
  })

  it('filters by bookmarks when bookmarkedOnly is true', () => {
    const result = filterArticles(MOCK_ARTICLES, {
      bookmarkedOnly: true,
      bookmarks: ['art-2'],
    })
    expect(result).toHaveLength(1)
    expect(result[0].id).toBe('art-2')
  })
})

describe('getRecommendedArticles', () => {
  it('returns empty array when no phenotype and no goal', () => {
    const result = getRecommendedArticles(MOCK_ARTICLES, null, null)
    expect(result).toEqual([])
  })

  it('recommends articles matching phenotype', () => {
    const result = getRecommendedArticles(MOCK_ARTICLES, 'nociceptive', null)
    expect(result.length).toBeGreaterThanOrEqual(1)
    expect(result[0].id).toBe('art-1') // nociceptive relevance
  })

  it('recommends articles matching goal', () => {
    const result = getRecommendedArticles(MOCK_ARTICLES, null, 'reduce_pain')
    expect(result.length).toBeGreaterThanOrEqual(1)
    // art-1 has goalRelevance reduce_pain AND pillar pain (primary for reduce_pain)
    expect(result[0].id).toBe('art-1')
  })

  it('boosts featured articles', () => {
    const result = getRecommendedArticles(MOCK_ARTICLES, 'nociceptive', 'reduce_pain')
    // art-1 is featured + nociceptive + reduce_pain + pain pillar = highest score
    expect(result[0].id).toBe('art-1')
  })

  it('respects maxCount limit', () => {
    const result = getRecommendedArticles(MOCK_ARTICLES, 'nociceptive', 'reduce_pain', 1)
    expect(result.length).toBeLessThanOrEqual(1)
  })

  it('scores phenotype-matching articles higher', () => {
    // neuropathic matches art-3; art-1 gets small boost from featured
    const result = getRecommendedArticles(MOCK_ARTICLES, 'neuropathic', null)
    expect(result[0].id).toBe('art-3') // neuropathic match scores highest
    // featured articles may also appear with lower score
    expect(result.length).toBeGreaterThanOrEqual(1)
  })

  it('uses goal-pillar mapping for scoring', () => {
    // Goal 'improve_energy' → primary: 'energy', secondary: 'wellbeing'
    const result = getRecommendedArticles(MOCK_ARTICLES, null, 'improve_energy')
    // art-3 has pillarId 'energy' (primary) + goalRelevance 'improve_energy'
    expect(result[0].id).toBe('art-3')
  })
})

describe('bookmarks', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('starts with empty bookmarks', () => {
    expect(getBookmarks()).toEqual([])
  })

  it('toggles bookmark on', () => {
    toggleBookmark('art-1')
    const bookmarks = getBookmarks()
    expect(bookmarks).toContain('art-1')
  })

  it('toggles bookmark off', () => {
    toggleBookmark('art-1')
    toggleBookmark('art-1')
    const bookmarks = getBookmarks()
    expect(bookmarks).not.toContain('art-1')
  })

  it('handles multiple bookmarks', () => {
    toggleBookmark('art-1')
    toggleBookmark('art-2')
    const bookmarks = getBookmarks()
    expect(bookmarks).toHaveLength(2)
    expect(bookmarks).toContain('art-1')
    expect(bookmarks).toContain('art-2')
  })
})

describe('read progress', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('starts with empty progress', () => {
    expect(getReadProgress()).toEqual({})
  })

  it('sets progress', () => {
    setReadProgress('art-1', 50)
    expect(getReadProgress()['art-1']).toBe(50)
  })

  it('clamps progress at 100', () => {
    setReadProgress('art-1', 150)
    expect(getReadProgress()['art-1']).toBe(100)
  })

  it('clamps progress at 0 (no negative)', () => {
    setReadProgress('art-1', -10)
    expect(getReadProgress()['art-1']).toBe(0)
  })

  it('marks article as read when progress >= 90', () => {
    setReadProgress('art-1', 90)
    expect(isArticleRead('art-1')).toBe(true)
  })

  it('does not mark as read when progress < 90', () => {
    setReadProgress('art-1', 50)
    expect(isArticleRead('art-1')).toBe(false)
  })
})
