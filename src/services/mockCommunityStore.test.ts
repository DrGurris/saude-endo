import { describe, it, expect, beforeEach } from 'vitest'
import {
  getThreads,
  getThreadById,
  createThread,
  getRepliesForThread,
  createReply,
  toggleSupport,
  hasUserSupported,
  createReport,
  getPendingReports,
  updateReportStatus,
} from './mockCommunityStore'

describe('mockCommunityStore', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  describe('threads', () => {
    it('returns seed threads on first call', () => {
      const threads = getThreads()
      expect(threads.length).toBeGreaterThan(0)
    })

    it('gets thread by id', () => {
      const threads = getThreads()
      const first = threads[0]
      const found = getThreadById(first.id)
      expect(found).not.toBeNull()
      expect(found!.title).toBe(first.title)
    })

    it('returns null for non-existent thread', () => {
      getThreads() // seed
      expect(getThreadById('fake_id')).toBeNull()
    })

    it('creates a new thread', () => {
      getThreads() // seed
      const created = createThread({
        title: 'Nuevo tema de test',
        body: 'Este es el cuerpo del tema',
        category: 'general',
        isAnonymous: false,
        authorId: 'user_1',
        authorName: 'Test User',
        authorRole: 'user',
      })

      expect(created.title).toBe('Nuevo tema de test')
      expect(created.id).toBeTruthy()
      expect(created.supportCount).toBe(0)
      expect(created.replyCount).toBe(0)
    })

    it('persists created thread', () => {
      getThreads()
      const before = getThreads().length
      createThread({
        title: 'Persisted Thread',
        body: 'Body content here',
        category: 'pain',
        isAnonymous: false,
        authorId: 'u1',
        authorName: 'User',
        authorRole: 'user',
      })
      expect(getThreads().length).toBe(before + 1)
    })
  })

  describe('replies', () => {
    it('returns replies for a thread', () => {
      const threads = getThreads()
      const firstThreadId = threads[0].id
      const replies = getRepliesForThread(firstThreadId)
      expect(Array.isArray(replies)).toBe(true)
    })

    it('creates a reply and increments thread replyCount', () => {
      const threads = getThreads()
      const thread = threads[0]
      const originalCount = thread.replyCount

      const reply = createReply({
        threadId: thread.id,
        body: 'Mi respuesta al tema',
        isAnonymous: false,
        authorId: 'u2',
        authorName: 'Replier',
        authorRole: 'user',
        parentReplyId: null,
      })

      expect(reply.body).toBe('Mi respuesta al tema')
      expect(reply.threadId).toBe(thread.id)

      // Check replyCount incremented
      const updated = getThreadById(thread.id)
      expect(updated!.replyCount).toBe(originalCount + 1)
    })
  })

  describe('supports', () => {
    it('toggles support on', () => {
      getThreads()
      const threads = getThreads()
      const threadId = threads[0].id

      const count = toggleSupport('user_1', threadId, 'thread')
      expect(count).toBeGreaterThan(0)
      expect(hasUserSupported('user_1', threadId)).toBe(true)
    })

    it('toggles support off', () => {
      getThreads()
      const threads = getThreads()
      const threadId = threads[0].id

      toggleSupport('user_1', threadId, 'thread')
      expect(hasUserSupported('user_1', threadId)).toBe(true)

      toggleSupport('user_1', threadId, 'thread')
      expect(hasUserSupported('user_1', threadId)).toBe(false)
    })
  })

  describe('reports', () => {
    it('creates a report', () => {
      createReport({
        targetType: 'thread',
        targetId: 'thread_1',
        reporterId: 'user_1',
        reason: 'Contenido inapropiado para la comunidad',
      })

      const reports = getPendingReports()
      expect(reports.length).toBe(1)
      expect(reports[0].status).toBe('pending')
    })

    it('resolves a report', () => {
      createReport({
        targetType: 'reply',
        targetId: 'reply_1',
        reporterId: 'user_2',
        reason: 'Spam repetitivo en el foro',
      })

      const reports = getPendingReports()
      updateReportStatus(reports[0].id, 'reviewed')

      const pending = getPendingReports()
      expect(pending.length).toBe(0)
    })
  })
})
