import React, { createContext, useContext, useState, useCallback, useMemo } from 'react'
import type { ForumThread, ForumReply, ForumCategory, UserRole } from '../types'
import {
  fetchThreads,
  fetchThreadById,
  postThread,
  fetchReplies,
  postReply,
  toggleSupportAction,
  submitReport,
} from '../services/communityService'

interface CommunityContextType {
  threads: ForumThread[]
  isLoading: boolean
  selectedCategory: ForumCategory | 'all'
  sortBy: 'recent' | 'popular'
  setCategory: (cat: ForumCategory | 'all') => void
  setSortBy: (sort: 'recent' | 'popular') => void
  loadThreads: () => Promise<void>
  loadThread: (id: string) => Promise<ForumThread | null>
  loadReplies: (threadId: string) => Promise<ForumReply[]>
  createThread: (title: string, body: string, category: ForumCategory, isAnonymous: boolean, authorId: string, authorName: string, authorRole: UserRole) => Promise<ForumThread>
  createReply: (threadId: string, body: string, isAnonymous: boolean, authorId: string, authorName: string, authorRole: UserRole, parentReplyId?: string) => Promise<ForumReply>
  toggleSupport: (userId: string, targetId: string, targetType: 'thread' | 'reply') => Promise<number>
  reportContent: (targetType: 'thread' | 'reply', targetId: string, reporterId: string, reason: string) => Promise<void>
}

const CommunityContext = createContext<CommunityContextType | null>(null)

export const CommunityProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [threads, setThreads] = useState<ForumThread[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState<ForumCategory | 'all'>('all')
  const [sortBy, setSortBy] = useState<'recent' | 'popular'>('recent')

  const loadThreads = useCallback(async () => {
    setIsLoading(true)
    try {
      const data = await fetchThreads()
      setThreads(data)
    } catch {
      setThreads([])
    } finally {
      setIsLoading(false)
    }
  }, [])

  const loadThread = useCallback(async (id: string) => {
    return fetchThreadById(id)
  }, [])

  const loadReplies = useCallback(async (threadId: string) => {
    return fetchReplies(threadId)
  }, [])

  const createThreadAction = useCallback(async (
    title: string, body: string, category: ForumCategory, isAnonymous: boolean,
    authorId: string, authorName: string, authorRole: UserRole
  ) => {
    const thread = await postThread({
      title, body, category, isAnonymous, authorId, authorName, authorRole,
    })
    setThreads(prev => [thread, ...prev])
    return thread
  }, [])

  const createReplyAction = useCallback(async (
    threadId: string, body: string, isAnonymous: boolean,
    authorId: string, authorName: string, authorRole: UserRole, parentReplyId?: string
  ) => {
    return postReply({
      threadId, body, isAnonymous, authorId, authorName, authorRole,
      parentReplyId: parentReplyId ?? null,
    })
  }, [])

  const toggleSupportCb = useCallback(async (userId: string, targetId: string, targetType: 'thread' | 'reply') => {
    const newCount = await toggleSupportAction(userId, targetId, targetType)
    if (targetType === 'thread') {
      setThreads(prev => prev.map(t =>
        t.id === targetId ? { ...t, supportCount: newCount } : t
      ))
    }
    return newCount
  }, [])

  const reportContent = useCallback(async (
    targetType: 'thread' | 'reply', targetId: string, reporterId: string, reason: string
  ) => {
    await submitReport({ targetType, targetId, reporterId, reason })
  }, [])

  const setCategory = useCallback((cat: ForumCategory | 'all') => {
    setSelectedCategory(cat)
  }, [])

  const value = useMemo<CommunityContextType>(() => ({
    threads,
    isLoading,
    selectedCategory,
    sortBy,
    setCategory,
    setSortBy,
    loadThreads,
    loadThread,
    loadReplies,
    createThread: createThreadAction,
    createReply: createReplyAction,
    toggleSupport: toggleSupportCb,
    reportContent,
  }), [threads, isLoading, selectedCategory, sortBy, setCategory, loadThreads, loadThread, loadReplies, createThreadAction, createReplyAction, toggleSupportCb, reportContent])

  return <CommunityContext.Provider value={value}>{children}</CommunityContext.Provider>
}

export function useCommunity(): CommunityContextType {
  const context = useContext(CommunityContext)
  if (!context) {
    throw new Error('useCommunity must be used within a CommunityProvider')
  }
  return context
}
