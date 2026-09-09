import { describe, it, expect, beforeEach, vi } from 'vitest'

vi.mock('./api', () => ({
  isApiAvailable: vi.fn().mockResolvedValue(false),
  apiGet: vi.fn(),
  apiPut: vi.fn(),
}))

import {
  fetchUsers,
  changeUserRole,
  changeUserStatus,
  fetchAnalytics,
  fetchSettings,
  saveSettings,
} from './adminService'

describe('adminService (mock fallback)', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  describe('Users', () => {
    it('returns seed users', async () => {
      const users = await fetchUsers()
      expect(users.length).toBeGreaterThanOrEqual(10)
    })

    it('changes user role', async () => {
      const users = await fetchUsers()
      const target = users.find(u => u.role === 'user')!
      const updated = await changeUserRole(target.id, 'moderator')
      expect(updated).not.toBeNull()
      expect(updated!.role).toBe('moderator')
    })

    it('changes user status', async () => {
      const users = await fetchUsers()
      const target = users[0]
      const updated = await changeUserStatus(target.id, 'suspended')
      expect(updated).not.toBeNull()
      expect(updated!.status).toBe('suspended')
    })

    it('returns null for nonexistent user role change', async () => {
      const result = await changeUserRole('nonexistent-id', 'admin')
      expect(result).toBeNull()
    })
  })

  describe('Analytics', () => {
    it('returns analytics with required fields', async () => {
      const analytics = await fetchAnalytics()
      expect(analytics.totalUsers).toBeGreaterThan(0)
      expect(analytics.totalThreads).toBeGreaterThanOrEqual(0)
      expect(analytics.totalArticles).toBeGreaterThanOrEqual(0)
      expect(Array.isArray(analytics.registrationsByMonth)).toBe(true)
      expect(analytics.phenotypeDistribution).toBeDefined()
    })
  })

  describe('Settings', () => {
    it('returns default settings', async () => {
      const settings = await fetchSettings()
      expect(typeof settings.maintenanceMode).toBe('boolean')
      expect(typeof settings.registrationOpen).toBe('boolean')
      expect(typeof settings.maxThreadsPerDay).toBe('number')
    })

    it('saves partial settings immutably', async () => {
      const original = await fetchSettings()
      const updated = await saveSettings({ announcementBanner: 'Test banner' })
      expect(updated.announcementBanner).toBe('Test banner')
      // Other fields remain unchanged
      expect(updated.maintenanceMode).toBe(original.maintenanceMode)
      expect(updated.registrationOpen).toBe(original.registrationOpen)
    })

    it('persists settings across calls', async () => {
      await saveSettings({ maintenanceMode: true })
      const fetched = await fetchSettings()
      expect(fetched.maintenanceMode).toBe(true)
    })
  })
})
