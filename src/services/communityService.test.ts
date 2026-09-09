import { describe, it, expect, beforeEach, vi } from 'vitest'

// Mock API — always return false (no backend available)
vi.mock('./api', () => ({
  isApiAvailable: vi.fn().mockResolvedValue(false),
  apiGet: vi.fn(),
  apiPost: vi.fn(),
  apiPut: vi.fn(),
  apiDelete: vi.fn(),
}))

import {
  fetchThreads,
  fetchThreadById,
  postThread,
  editThread,
  removeThread,
  fetchReplies,
  postReply,
  removeReply,
  toggleSupportAction,
  checkUserSupported,
  submitReport,
} from './communityService'

describe('communityService (mock fallback)', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  describe('Threads', () => {
    it('returns seed threads on first load', async () => {
      const threads = await fetchThreads()
      expect(threads.length).toBeGreaterThanOrEqual(10)
    })

    it('filters threads by category', async () => {
      const painThreads = await fetchThreads('pain')
      painThreads.forEach(t => expect(t.category).toBe('pain'))
    })

    it('returns all threads for "general" category', async () => {
      const all = await fetchThreads()
      const general = await fetchThreads('general')
      expect(general.length).toBe(all.length)
    })

    it('fetches a thread by id', async () => {
      const all = await fetchThreads()
      const thread = await fetchThreadById(all[0].id)
      expect(thread).not.toBeNull()
      expect(thread!.id).toBe(all[0].id)
    })

    it('returns null for nonexistent thread', async () => {
      const thread = await fetchThreadById('nonexistent-id')
      expect(thread).toBeNull()
    })

    it('creates a new thread', async () => {
      const before = await fetchThreads()
      const created = await postThread({
        title: 'Nuevo tema de prueba',
        body: 'Contenido del tema de prueba para test.',
        authorId: 'test-user',
        authorName: 'Test User',
        authorRole: 'user',
        isAnonymous: false,
        category: 'pain',
      })

      expect(created.id).toBeTruthy()
      expect(created.title).toBe('Nuevo tema de prueba')
      expect(created.supportCount).toBe(0)
      expect(created.replyCount).toBe(0)

      const after = await fetchThreads()
      expect(after.length).toBe(before.length + 1)
    })

    it('edits an existing thread', async () => {
      const threads = await fetchThreads()
      const updated = await editThread(threads[0].id, { title: 'Titulo editado' })
      expect(updated!.title).toBe('Titulo editado')
    })

    it('removes a thread', async () => {
      const threads = await fetchThreads()
      const id = threads[threads.length - 1].id
      const removed = await removeThread(id)
      expect(removed).toBe(true)

      const after = await fetchThreads()
      expect(after.find(t => t.id === id)).toBeUndefined()
    })
  })

  describe('Replies', () => {
    it('returns replies for a thread', async () => {
      const threads = await fetchThreads()
      const replies = await fetchReplies(threads[0].id)
      expect(Array.isArray(replies)).toBe(true)
    })

    it('creates a reply and increments replyCount', async () => {
      const threads = await fetchThreads()
      const threadId = threads[0].id
      const beforeCount = threads[0].replyCount

      await postReply({
        threadId,
        parentReplyId: null,
        body: 'Una respuesta de prueba para verificar.',
        authorId: 'test-user',
        authorName: 'Test User',
        authorRole: 'user',
        isAnonymous: false,
      })

      const updatedThread = await fetchThreadById(threadId)
      expect(updatedThread!.replyCount).toBe(beforeCount + 1)
    })

    it('removes a reply', async () => {
      const threads = await fetchThreads()
      const reply = await postReply({
        threadId: threads[0].id,
        parentReplyId: null,
        body: 'Reply to be deleted in test.',
        authorId: 'test-user',
        authorName: 'Tester',
        authorRole: 'user',
        isAnonymous: false,
      })

      const removed = await removeReply(reply.id)
      expect(removed).toBe(true)
    })
  })

  describe('Supports', () => {
    it('toggles support on a thread', async () => {
      const threads = await fetchThreads()
      const threadId = threads[0].id

      // toggleSupportAction returns the support-user-list length, not the thread's supportCount
      const countAfterAdd = await toggleSupportAction('test-user', threadId, 'thread')
      expect(countAfterAdd).toBe(1) // first supporter in mock support store
      expect(checkUserSupported('test-user', threadId)).toBe(true)

      // Toggle off
      const countAfterRemove = await toggleSupportAction('test-user', threadId, 'thread')
      expect(countAfterRemove).toBe(0)
      expect(checkUserSupported('test-user', threadId)).toBe(false)
    })
  })

  describe('Reports', () => {
    it('submits a report', async () => {
      const threads = await fetchThreads()
      const report = await submitReport({
        targetType: 'thread',
        targetId: threads[0].id,
        reporterId: 'reporter-1',
        reason: 'Contenido inapropiado en el hilo.',
      })

      expect(report.id).toBeTruthy()
      expect(report.status).toBe('pending')
      expect(report.targetId).toBe(threads[0].id)
    })
  })
})
