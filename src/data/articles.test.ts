import { describe, it, expect } from 'vitest'
import { ARTICLES, getArticlesForPillar } from './articles'

describe('ARTICLES barrel', () => {
  it('exports 24 articles from 5 pillar files', () => {
    expect(ARTICLES).toHaveLength(24)
  })

  it('contains articles from all 5 pillars', () => {
    const pillars = new Set(ARTICLES.map(a => a.pillarId))
    expect(pillars.size).toBe(5)
    expect(pillars).toContain('pain')
    expect(pillars).toContain('energy')
    expect(pillars).toContain('nutrition')
    expect(pillars).toContain('hormones')
    expect(pillars).toContain('wellbeing')
  })

  it('every article has required fields', () => {
    for (const article of ARTICLES) {
      expect(article.id).toBeTruthy()
      expect(article.title).toBeTruthy()
      expect(article.summary.length).toBeGreaterThan(10)
      expect(article.contentMarkdown.length).toBeGreaterThan(50)
      expect(article.citations.length).toBeGreaterThanOrEqual(1)
      expect(article.readTimeMinutes).toBeGreaterThan(0)
    }
  })

  it('has unique article ids', () => {
    const ids = ARTICLES.map(a => a.id)
    expect(new Set(ids).size).toBe(ids.length)
  })
})

describe('getArticlesForPillar', () => {
  it('returns only articles for specified pillar', () => {
    const painArticles = getArticlesForPillar('pain')
    expect(painArticles.length).toBeGreaterThan(0)
    painArticles.forEach(a => expect(a.pillarId).toBe('pain'))
  })

  it('returns all articles for that pillar without phenotype', () => {
    const allPain = ARTICLES.filter(a => a.pillarId === 'pain')
    const result = getArticlesForPillar('pain')
    expect(result.length).toBe(allPain.length)
  })

  it('sorts by phenotype relevance when phenotype provided', () => {
    const result = getArticlesForPillar('pain', 'nociceptive')
    // Articles with nociceptive relevance should come first
    const firstRelevant = result.findIndex(a => a.phenotypeRelevance.includes('nociceptive'))
    const firstNonRelevant = result.findIndex(a => !a.phenotypeRelevance.includes('nociceptive'))
    if (firstRelevant !== -1 && firstNonRelevant !== -1) {
      expect(firstRelevant).toBeLessThan(firstNonRelevant)
    }
  })
})
