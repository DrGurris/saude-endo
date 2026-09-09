import type { WebArticle, PhenotypeType, GoalOption, PillarId } from '../types'
import { GOAL_PILLAR_MAP } from '../types'

const BOOKMARKS_KEY = 'saude_bookmarked_articles'
const READ_PROGRESS_KEY = 'saude_article_progress'

// ─── Filtering ────────────────────────────────────────────────────────────

export function filterArticles(
  articles: WebArticle[],
  options: {
    pillarId?: PillarId | 'all'
    searchQuery?: string
    bookmarkedOnly?: boolean
    bookmarks?: string[]
  }
): WebArticle[] {
  let filtered = [...articles]

  if (options.bookmarkedOnly && options.bookmarks) {
    filtered = filtered.filter(a => options.bookmarks!.includes(a.id))
  }

  if (options.pillarId && options.pillarId !== 'all') {
    filtered = filtered.filter(a => a.pillarId === options.pillarId)
  }

  if (options.searchQuery?.trim()) {
    const query = options.searchQuery.toLowerCase()
    filtered = filtered.filter(a =>
      a.title.toLowerCase().includes(query) ||
      a.summary.toLowerCase().includes(query) ||
      a.tags.some(t => t.toLowerCase().includes(query))
    )
  }

  return filtered
}

// ─── Personalization ──────────────────────────────────────────────────────

export function getRecommendedArticles(
  articles: WebArticle[],
  phenotype: PhenotypeType | null,
  goal: GoalOption | null,
  maxCount = 4
): WebArticle[] {
  if (!phenotype && !goal) return []

  const scored = articles.map(article => {
    let score = 0

    if (phenotype && article.phenotypeRelevance.includes(phenotype)) {
      const idx = article.phenotypeRelevance.indexOf(phenotype)
      score += 3 - Math.min(idx, 2)
    }

    if (goal) {
      if (article.goalRelevance.includes(goal)) {
        score += 2
      }
      const mapping = GOAL_PILLAR_MAP[goal]
      if (article.pillarId === mapping.primary) {
        score += 2
      } else if (article.pillarId === mapping.secondary) {
        score += 1
      }
    }

    if (article.featured) {
      score += 0.5
    }

    return { article, score }
  })

  return scored
    .filter(s => s.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, maxCount)
    .map(s => s.article)
}

// ─── Bookmarks ────────────────────────────────────────────────────────────

export function getBookmarks(): string[] {
  try {
    const saved = localStorage.getItem(BOOKMARKS_KEY)
    if (!saved) return []
    const parsed = JSON.parse(saved)
    if (!Array.isArray(parsed)) return []
    return parsed.filter((item): item is string => typeof item === 'string')
  } catch {
    return []
  }
}

export function toggleBookmark(articleId: string): string[] {
  const bookmarks = getBookmarks()
  const index = bookmarks.indexOf(articleId)
  const updated = index > -1
    ? bookmarks.filter(id => id !== articleId)
    : [...bookmarks, articleId]
  localStorage.setItem(BOOKMARKS_KEY, JSON.stringify(updated))
  return updated
}

// ─── Read Progress ────────────────────────────────────────────────────────

export function getReadProgress(): Record<string, number> {
  try {
    const data = localStorage.getItem(READ_PROGRESS_KEY)
    if (!data) return {}
    const parsed = JSON.parse(data)
    if (typeof parsed !== 'object' || parsed === null || Array.isArray(parsed)) return {}
    return parsed
  } catch {
    return {}
  }
}

export function setReadProgress(articleId: string, progress: number): void {
  const all = getReadProgress()
  const updated = { ...all, [articleId]: Math.max(0, Math.min(progress, 100)) }
  localStorage.setItem(READ_PROGRESS_KEY, JSON.stringify(updated))
}

export function isArticleRead(articleId: string): boolean {
  const progress = getReadProgress()
  return (progress[articleId] ?? 0) >= 90
}

// ─── Sharing ──────────────────────────────────────────────────────────────

export async function shareArticle(article: WebArticle): Promise<void> {
  const shareUrl = `${window.location.origin}/library?article=${article.id}`
  const shareData = {
    title: article.title,
    text: `${article.summary} — Saude Clínica de la Mujer`,
    url: shareUrl,
  }

  // Use Web Share API only on mobile (desktop share dialogs are often broken)
  const isMobile = /Mobi|Android|iPhone|iPad/i.test(navigator.userAgent)
  if (navigator.share && isMobile && navigator.canShare?.(shareData)) {
    try {
      await navigator.share(shareData)
      return
    } catch (err) {
      // User cancelled — do nothing
      if (err instanceof Error && err.name === 'AbortError') return
      // Other errors — fall through to clipboard
    }
  }

  // Fallback: copy to clipboard
  try {
    const text = `${article.title}\n${article.summary}\n\n${shareUrl}`
    await navigator.clipboard.writeText(text)
    showShareToast()
  } catch {
    // Last resort: select+copy via textarea
    const textarea = document.createElement('textarea')
    textarea.value = `${article.title}\n${article.summary}\n\n${shareUrl}`
    textarea.style.position = 'fixed'
    textarea.style.opacity = '0'
    document.body.appendChild(textarea)
    textarea.select()
    document.execCommand('copy')
    document.body.removeChild(textarea)
    showShareToast()
  }
}

function showShareToast(): void {
  const existing = document.getElementById('share-toast')
  if (existing) existing.remove()

  const toast = document.createElement('div')
  toast.id = 'share-toast'
  toast.textContent = 'Enlace copiado al portapapeles'
  Object.assign(toast.style, {
    position: 'fixed',
    bottom: '2rem',
    left: '50%',
    transform: 'translateX(-50%)',
    background: 'var(--color-primary, #105D77)',
    color: 'white',
    padding: '0.75rem 1.5rem',
    borderRadius: '10px',
    fontSize: '0.85rem',
    fontWeight: '500',
    zIndex: '9999',
    boxShadow: '0 8px 24px rgba(0,0,0,0.2)',
    animation: 'fadeInUp 0.3s ease',
  })
  document.body.appendChild(toast)
  setTimeout(() => {
    toast.style.opacity = '0'
    toast.style.transition = 'opacity 0.3s'
    setTimeout(() => toast.remove(), 300)
  }, 2500)
}
