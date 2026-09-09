import { describe, it, expect } from 'vitest'
import { articleSchema } from './articleValidation'

const validArticle = {
  title: 'Manejo del dolor pélvico',
  pillarId: 'pain' as const,
  summary: 'Una guía completa sobre estrategias para el manejo del dolor pélvico crónico.',
  contentMarkdown: 'A'.repeat(100),
  citations: ['Smith et al. (2023). Pain Management.'],
  phenotypeRelevance: ['nociceptive' as const],
  goalRelevance: ['reduce_pain' as const],
  readTimeMinutes: 5,
  tags: ['dolor', 'pelvis'],
  featured: false,
  status: 'draft' as const,
}

describe('articleSchema', () => {
  it('accepts a valid article', () => {
    const result = articleSchema.safeParse(validArticle)
    expect(result.success).toBe(true)
  })

  it('rejects title shorter than 5 chars', () => {
    const result = articleSchema.safeParse({ ...validArticle, title: 'Abc' })
    expect(result.success).toBe(false)
  })

  it('rejects title longer than 200 chars', () => {
    const result = articleSchema.safeParse({ ...validArticle, title: 'X'.repeat(201) })
    expect(result.success).toBe(false)
  })

  it('rejects invalid pillarId', () => {
    const result = articleSchema.safeParse({ ...validArticle, pillarId: 'invalid' })
    expect(result.success).toBe(false)
  })

  it('rejects summary shorter than 20 chars', () => {
    const result = articleSchema.safeParse({ ...validArticle, summary: 'Too short' })
    expect(result.success).toBe(false)
  })

  it('rejects content shorter than 100 chars', () => {
    const result = articleSchema.safeParse({ ...validArticle, contentMarkdown: 'Short' })
    expect(result.success).toBe(false)
  })

  it('requires at least one citation', () => {
    const result = articleSchema.safeParse({ ...validArticle, citations: [] })
    expect(result.success).toBe(false)
  })

  it('requires at least one phenotypeRelevance', () => {
    const result = articleSchema.safeParse({ ...validArticle, phenotypeRelevance: [] })
    expect(result.success).toBe(false)
  })

  it('allows empty goalRelevance', () => {
    const result = articleSchema.safeParse({ ...validArticle, goalRelevance: [] })
    expect(result.success).toBe(true)
  })

  it('rejects readTimeMinutes less than 1', () => {
    const result = articleSchema.safeParse({ ...validArticle, readTimeMinutes: 0 })
    expect(result.success).toBe(false)
  })

  it('rejects readTimeMinutes greater than 60', () => {
    const result = articleSchema.safeParse({ ...validArticle, readTimeMinutes: 61 })
    expect(result.success).toBe(false)
  })

  it('defaults status to draft when not provided', () => {
    const { status: _, ...withoutStatus } = validArticle
    const result = articleSchema.safeParse(withoutStatus)
    expect(result.success).toBe(true)
    if (result.success) {
      expect(result.data.status).toBe('draft')
    }
  })

  it('allows all valid pillar ids', () => {
    for (const pillar of ['pain', 'energy', 'nutrition', 'hormones', 'wellbeing'] as const) {
      const result = articleSchema.safeParse({ ...validArticle, pillarId: pillar })
      expect(result.success).toBe(true)
    }
  })

  it('allows all valid phenotype types', () => {
    for (const pheno of ['nociceptive', 'neuropathic', 'nociplastic', 'mixed'] as const) {
      const result = articleSchema.safeParse({ ...validArticle, phenotypeRelevance: [pheno] })
      expect(result.success).toBe(true)
    }
  })
})
