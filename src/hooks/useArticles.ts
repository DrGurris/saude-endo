import { useState, useEffect, useCallback } from 'react'
import type { WebArticle } from '../types'
import { fetchArticles, invalidateCache } from '../services/articleService'

interface UseArticlesResult {
  articles: WebArticle[]
  isLoading: boolean
  error: string | null
  refetch: () => Promise<void>
}

export function useArticles(): UseArticlesResult {
  const [articles, setArticles] = useState<WebArticle[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const loadArticles = useCallback(async () => {
    setIsLoading(true)
    setError(null)
    try {
      const data = await fetchArticles()
      setArticles(data)
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Error al cargar articulos'
      setError(message)
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    loadArticles()
  }, [loadArticles])

  const refetch = useCallback(async () => {
    invalidateCache()
    await loadArticles()
  }, [loadArticles])

  return { articles, isLoading, error, refetch }
}
