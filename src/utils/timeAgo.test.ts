import { describe, it, expect } from 'vitest'
import { timeAgo } from './timeAgo'

describe('timeAgo', () => {
  it('returns "ahora" for current time', () => {
    expect(timeAgo(new Date().toISOString())).toBe('ahora')
  })

  it('returns "ahora" for 30 seconds ago', () => {
    const date = new Date(Date.now() - 30_000).toISOString()
    expect(timeAgo(date)).toBe('ahora')
  })

  it('returns minutes for < 60 minutes', () => {
    const date = new Date(Date.now() - 5 * 60_000).toISOString()
    expect(timeAgo(date)).toBe('hace 5m')
  })

  it('returns hours for < 24 hours', () => {
    const date = new Date(Date.now() - 3 * 3600_000).toISOString()
    expect(timeAgo(date)).toBe('hace 3h')
  })

  it('returns days for < 7 days', () => {
    const date = new Date(Date.now() - 4 * 86400_000).toISOString()
    expect(timeAgo(date)).toBe('hace 4d')
  })

  it('returns formatted date for >= 7 days', () => {
    const date = new Date(Date.now() - 10 * 86400_000).toISOString()
    const result = timeAgo(date)
    // Should be something like "27 feb" format
    expect(result).not.toContain('hace')
    expect(result).toMatch(/\d{1,2}\s\w{3}/)
  })

  it('handles future dates gracefully', () => {
    const date = new Date(Date.now() + 60_000).toISOString()
    expect(timeAgo(date)).toBe('ahora')
  })
})
