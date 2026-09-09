import { isArticleRead } from '../utils/articleHelpers'
import { ARTICLES } from '../data/articles'

// ─── Data Collection ─────────────────────────────────────────────────────

export interface GamificationData {
  currentStreak: number
  longestStreak: number
  totalDaysLogged: number
  habitsCompletedToday: number
  totalHabitsCompleted: number
  totalPosts: number
  totalSupportsReceived: number
  totalArticlesRead: number
}

export function getGamificationData(): GamificationData {
  const symptomPrefix = 'saude_diario_'
  const habitPrefix = 'saude_habit_'

  let totalDaysLogged = 0
  let currentStreak = 0
  let longestStreak = 0
  let habitsCompletedToday = 0
  let totalHabitsCompleted = 0

  const dates: string[] = []
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i)
    if (key?.startsWith(symptomPrefix)) {
      dates.push(key.replace(symptomPrefix, ''))
      totalDaysLogged++
    }
    if (key?.startsWith(habitPrefix)) {
      const value = localStorage.getItem(key)
      if (value === 'true') {
        totalHabitsCompleted++
        if (key.includes(new Date().toISOString().split('T')[0])) {
          habitsCompletedToday++
        }
      }
    }
  }

  dates.sort((a, b) => b.localeCompare(a))

  if (dates.length > 0) {
    const todayDate = new Date()
    const today = todayDate.toISOString().split('T')[0]
    const yesterdayDate = new Date(todayDate)
    yesterdayDate.setDate(yesterdayDate.getDate() - 1)
    const yesterday = yesterdayDate.toISOString().split('T')[0]

    if (dates[0] === today || dates[0] === yesterday) {
      currentStreak = 1
      let prevDate = new Date(dates[0])

      for (let i = 1; i < dates.length; i++) {
        const currDate = new Date(dates[i])
        const diffDays = Math.floor((prevDate.getTime() - currDate.getTime()) / 86400000)
        if (diffDays === 1) {
          currentStreak++
          prevDate = currDate
        } else {
          break
        }
      }
    }

    let tempStreak = 1
    for (let i = 1; i < dates.length; i++) {
      const prev = new Date(dates[i - 1])
      const curr = new Date(dates[i])
      const diffDays = Math.floor((prev.getTime() - curr.getTime()) / 86400000)
      if (diffDays === 1) {
        tempStreak++
      } else {
        longestStreak = Math.max(longestStreak, tempStreak)
        tempStreak = 1
      }
    }
    longestStreak = Math.max(longestStreak, tempStreak, currentStreak)
  }

  // Community data from forum threads
  let totalPosts = 0
  let totalSupportsReceived = 0
  try {
    const threads = JSON.parse(localStorage.getItem('saude_forum_threads') || '[]')
    const replies = JSON.parse(localStorage.getItem('saude_forum_replies') || '[]')
    // Count posts + replies (approximate - would need userId filtering in real app)
    totalPosts = threads.length + replies.length
    totalSupportsReceived = threads.reduce((sum: number, t: { supportCount?: number }) => sum + (t.supportCount ?? 0), 0)
  } catch {
    // silent
  }

  // Articles read
  const totalArticlesRead = ARTICLES.filter(a => isArticleRead(a.id)).length

  return {
    currentStreak,
    longestStreak,
    totalDaysLogged,
    habitsCompletedToday,
    totalHabitsCompleted,
    totalPosts,
    totalSupportsReceived,
    totalArticlesRead,
  }
}

// ─── Points Calculation ──────────────────────────────────────────────────

export function calculatePoints(data: GamificationData): number {
  return (
    data.totalDaysLogged * 2 +
    data.totalHabitsCompleted * 1 +
    data.totalPosts * 5 +
    data.totalArticlesRead * 3 +
    data.totalSupportsReceived * 2 +
    data.currentStreak * 3
  )
}
