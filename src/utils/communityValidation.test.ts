import { describe, it, expect } from 'vitest'
import { threadSchema, replySchema, reportSchema } from './communityValidation'

describe('threadSchema', () => {
  it('validates a valid thread', () => {
    const result = threadSchema.safeParse({
      title: 'Mi primer tema',
      body: 'Este es el contenido del tema',
      category: 'general',
      isAnonymous: false,
    })
    expect(result.success).toBe(true)
  })

  it('rejects short title', () => {
    const result = threadSchema.safeParse({
      title: 'Hi',
      body: 'Este es el contenido del tema',
      category: 'general',
      isAnonymous: false,
    })
    expect(result.success).toBe(false)
  })

  it('rejects title longer than 200 chars', () => {
    const result = threadSchema.safeParse({
      title: 'A'.repeat(201),
      body: 'Contenido valido aqui',
      category: 'pain',
      isAnonymous: false,
    })
    expect(result.success).toBe(false)
  })

  it('rejects body shorter than 10 chars', () => {
    const result = threadSchema.safeParse({
      title: 'Titulo valido',
      body: 'Corto',
      category: 'general',
      isAnonymous: false,
    })
    expect(result.success).toBe(false)
  })

  it('rejects body longer than 5000 chars', () => {
    const result = threadSchema.safeParse({
      title: 'Titulo valido',
      body: 'A'.repeat(5001),
      category: 'general',
      isAnonymous: false,
    })
    expect(result.success).toBe(false)
  })

  it('rejects invalid category', () => {
    const result = threadSchema.safeParse({
      title: 'Titulo valido',
      body: 'Contenido valido del tema',
      category: 'invalid',
      isAnonymous: false,
    })
    expect(result.success).toBe(false)
  })

  it('accepts all valid categories', () => {
    const categories = ['pain', 'energy', 'nutrition', 'hormones', 'wellbeing', 'general'] as const
    for (const category of categories) {
      const result = threadSchema.safeParse({
        title: 'Titulo valido',
        body: 'Contenido valido del tema',
        category,
        isAnonymous: false,
      })
      expect(result.success, `Category ${category} should be valid`).toBe(true)
    }
  })
})

describe('replySchema', () => {
  it('validates a valid reply', () => {
    const result = replySchema.safeParse({ body: 'Buena respuesta aqui', isAnonymous: false })
    expect(result.success).toBe(true)
  })

  it('rejects short reply', () => {
    const result = replySchema.safeParse({ body: 'No', isAnonymous: false })
    expect(result.success).toBe(false)
  })

  it('rejects reply longer than 3000 chars', () => {
    const result = replySchema.safeParse({ body: 'A'.repeat(3001), isAnonymous: false })
    expect(result.success).toBe(false)
  })
})

describe('reportSchema', () => {
  it('validates a valid report', () => {
    const result = reportSchema.safeParse({ reason: 'Contenido inapropiado y ofensivo' })
    expect(result.success).toBe(true)
  })

  it('rejects short reason', () => {
    const result = reportSchema.safeParse({ reason: 'Spam' })
    expect(result.success).toBe(false)
  })

  it('rejects reason longer than 500 chars', () => {
    const result = reportSchema.safeParse({ reason: 'A'.repeat(501) })
    expect(result.success).toBe(false)
  })
})
