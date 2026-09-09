import type { ForumThread, ForumReply, ForumReport, ForumCategory } from '../types'
import { isApiAvailable, apiGet, apiPost, apiPut, apiDelete } from './api'
import {
  getThreads as mockGetThreads,
  getThreadById as mockGetThreadById,
  createThread as mockCreateThread,
  updateThread as mockUpdateThread,
  deleteThread as mockDeleteThread,
  getRepliesForThread as mockGetReplies,
  createReply as mockCreateReply,
  deleteReply as mockDeleteReply,
  toggleSupport as mockToggleSupport,
  hasUserSupported as mockHasSupported,
  createReport as mockCreateReport,
  getPendingReports as mockGetPendingReports,
  updateReportStatus as mockUpdateReportStatus,
} from './mockCommunityStore'

// ─── Threads ─────────────────────────────────────────────────────────────

export async function fetchThreads(category?: ForumCategory): Promise<ForumThread[]> {
  const hasApi = await isApiAvailable()

  if (hasApi) {
    const path = category ? `/community/threads?category=${category}` : '/community/threads'
    const response = await apiGet<ForumThread[]>(path)
    if (response.success && response.data) return response.data
  }

  const all = mockGetThreads()
  if (!category || category === 'general') return all
  return all.filter(t => t.category === category)
}

export async function fetchThreadById(id: string): Promise<ForumThread | null> {
  const hasApi = await isApiAvailable()

  if (hasApi) {
    const response = await apiGet<ForumThread>(`/community/threads/${id}`)
    if (response.success && response.data) return response.data
  }

  return mockGetThreadById(id)
}

export async function postThread(
  data: Omit<ForumThread, 'id' | 'pinned' | 'locked' | 'supportCount' | 'replyCount' | 'createdAt' | 'updatedAt'>
): Promise<ForumThread> {
  const hasApi = await isApiAvailable()

  if (hasApi) {
    const response = await apiPost<ForumThread>('/community/threads', data)
    if (response.success && response.data) return response.data
  }

  return mockCreateThread(data)
}

export async function editThread(id: string, data: Partial<ForumThread>): Promise<ForumThread | null> {
  const hasApi = await isApiAvailable()

  if (hasApi) {
    const response = await apiPut<ForumThread>(`/community/threads/${id}`, data)
    if (response.success && response.data) return response.data
  }

  return mockUpdateThread(id, data)
}

export async function removeThread(id: string): Promise<boolean> {
  const hasApi = await isApiAvailable()

  if (hasApi) {
    const response = await apiDelete(`/community/threads/${id}`)
    return response.success
  }

  return mockDeleteThread(id)
}

// ─── Replies ─────────────────────────────────────────────────────────────

export async function fetchReplies(threadId: string): Promise<ForumReply[]> {
  const hasApi = await isApiAvailable()

  if (hasApi) {
    const response = await apiGet<ForumReply[]>(`/community/threads/${threadId}/replies`)
    if (response.success && response.data) return response.data
  }

  return mockGetReplies(threadId)
}

export async function postReply(
  data: Omit<ForumReply, 'id' | 'supportCount' | 'createdAt'>
): Promise<ForumReply> {
  const hasApi = await isApiAvailable()

  if (hasApi) {
    const response = await apiPost<ForumReply>(`/community/threads/${data.threadId}/replies`, data)
    if (response.success && response.data) return response.data
  }

  return mockCreateReply(data)
}

export async function removeReply(id: string): Promise<boolean> {
  const hasApi = await isApiAvailable()

  if (hasApi) {
    const response = await apiDelete(`/community/replies/${id}`)
    return response.success
  }

  return mockDeleteReply(id)
}

// ─── Supports ────────────────────────────────────────────────────────────

export async function toggleSupportAction(
  userId: string,
  targetId: string,
  targetType: 'thread' | 'reply'
): Promise<number> {
  const hasApi = await isApiAvailable()

  if (hasApi) {
    const response = await apiPost<{ count: number }>(`/community/support`, { targetId, targetType })
    if (response.success && response.data) return response.data.count
  }

  return mockToggleSupport(userId, targetId, targetType)
}

export function checkUserSupported(userId: string, targetId: string): boolean {
  return mockHasSupported(userId, targetId)
}

// ─── Reports ─────────────────────────────────────────────────────────────

export async function submitReport(
  data: Omit<ForumReport, 'id' | 'status' | 'createdAt'>
): Promise<ForumReport> {
  const hasApi = await isApiAvailable()

  if (hasApi) {
    const response = await apiPost<ForumReport>('/community/reports', data)
    if (response.success && response.data) return response.data
  }

  return mockCreateReport(data)
}

export { mockGetPendingReports as getPendingReports, mockUpdateReportStatus as updateReportStatus }
