import { describe, it, expect, beforeEach } from 'vitest'
import { getGamificationData, calculatePoints } from './gamificationService'

describe('getGamificationData', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('returns zero values when localStorage is empty', () => {
    const data = getGamificationData()
    expect(data.currentStreak).toBe(0)
    expect(data.longestStreak).toBe(0)
    expect(data.totalDaysLogged).toBe(0)
    expect(data.habitsCompletedToday).toBe(0)
    expect(data.totalHabitsCompleted).toBe(0)
    expect(data.totalPosts).toBe(0)
    expect(data.totalSupportsReceived).toBe(0)
    expect(data.totalArticlesRead).toBe(0)
  })

  it('counts diary entries', () => {
    const today = new Date().toISOString().split('T')[0]
    localStorage.setItem(`saude_diario_${today}`, JSON.stringify({ pain: 3 }))

    const data = getGamificationData()
    expect(data.totalDaysLogged).toBe(1)
  })

  it('calculates current streak', () => {
    const today = new Date()
    for (let i = 0; i < 3; i++) {
      const d = new Date(today)
      d.setDate(d.getDate() - i)
      const key = d.toISOString().split('T')[0]
      localStorage.setItem(`saude_diario_${key}`, JSON.stringify({ pain: 3 }))
    }

    const data = getGamificationData()
    expect(data.currentStreak).toBe(3)
    expect(data.totalDaysLogged).toBe(3)
  })

  it('breaks streak on gap', () => {
    const today = new Date()
    // Today
    localStorage.setItem(`saude_diario_${today.toISOString().split('T')[0]}`, '{}')
    // 3 days ago (gap of 1 day)
    const threeAgo = new Date(today)
    threeAgo.setDate(threeAgo.getDate() - 3)
    localStorage.setItem(`saude_diario_${threeAgo.toISOString().split('T')[0]}`, '{}')

    const data = getGamificationData()
    expect(data.currentStreak).toBe(1)
    expect(data.totalDaysLogged).toBe(2)
  })

  it('counts habits completed', () => {
    const today = new Date().toISOString().split('T')[0]
    localStorage.setItem(`saude_habit_walk_${today}`, 'true')
    localStorage.setItem(`saude_habit_sleep_${today}`, 'true')
    localStorage.setItem(`saude_habit_water_${today}`, 'false')

    const data = getGamificationData()
    expect(data.totalHabitsCompleted).toBe(2)
    expect(data.habitsCompletedToday).toBe(2)
  })

  it('counts community posts from localStorage', () => {
    localStorage.setItem('saude_forum_threads', JSON.stringify([
      { id: '1', supportCount: 5 },
      { id: '2', supportCount: 3 },
    ]))
    localStorage.setItem('saude_forum_replies', JSON.stringify([
      { id: 'r1' },
    ]))

    const data = getGamificationData()
    expect(data.totalPosts).toBe(3) // 2 threads + 1 reply
    expect(data.totalSupportsReceived).toBe(8) // 5 + 3
  })
})

describe('calculatePoints', () => {
  it('calculates zero for empty data', () => {
    const points = calculatePoints({
      currentStreak: 0,
      longestStreak: 0,
      totalDaysLogged: 0,
      habitsCompletedToday: 0,
      totalHabitsCompleted: 0,
      totalPosts: 0,
      totalSupportsReceived: 0,
      totalArticlesRead: 0,
    })
    expect(points).toBe(0)
  })

  it('calculates points with weighted factors', () => {
    const points = calculatePoints({
      currentStreak: 5,
      longestStreak: 5,
      totalDaysLogged: 10,
      habitsCompletedToday: 3,
      totalHabitsCompleted: 20,
      totalPosts: 3,
      totalSupportsReceived: 10,
      totalArticlesRead: 5,
    })
    // 10*2 + 20*1 + 3*5 + 5*3 + 10*2 + 5*3 = 20+20+15+15+20+15 = 105
    expect(points).toBe(105)
  })
})
