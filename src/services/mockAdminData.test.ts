import { describe, it, expect, beforeEach } from 'vitest'
import {
  getAdminUsers,
  updateUserRole,
  updateUserStatus,
  getAdminAnalytics,
  getSystemSettings,
  updateSystemSettings,
} from './mockAdminData'

describe('mockAdminData', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  describe('getAdminUsers', () => {
    it('returns seed users on first call', () => {
      const users = getAdminUsers()
      expect(users.length).toBe(20)
      expect(users[0].name).toBe('Admin Saude')
    })

    it('returns same users on subsequent calls', () => {
      const first = getAdminUsers()
      const second = getAdminUsers()
      expect(first).toEqual(second)
    })
  })

  describe('updateUserRole', () => {
    it('updates role for existing user', () => {
      getAdminUsers() // seed
      const updated = updateUserRole('usr_003', 'moderator')
      expect(updated).not.toBeNull()
      expect(updated!.role).toBe('moderator')
      expect(updated!.id).toBe('usr_003')
    })

    it('returns null for non-existent user', () => {
      getAdminUsers()
      const updated = updateUserRole('non_existent', 'admin')
      expect(updated).toBeNull()
    })

    it('persists role change', () => {
      getAdminUsers()
      updateUserRole('usr_003', 'moderator')
      const users = getAdminUsers()
      const user = users.find(u => u.id === 'usr_003')
      expect(user!.role).toBe('moderator')
    })
  })

  describe('updateUserStatus', () => {
    it('updates status for existing user', () => {
      getAdminUsers()
      const updated = updateUserStatus('usr_003', 'suspended')
      expect(updated).not.toBeNull()
      expect(updated!.status).toBe('suspended')
    })

    it('returns null for non-existent user', () => {
      getAdminUsers()
      expect(updateUserStatus('fake', 'banned')).toBeNull()
    })
  })

  describe('getAdminAnalytics', () => {
    it('returns analytics with correct user counts', () => {
      const analytics = getAdminAnalytics()
      expect(analytics.totalUsers).toBe(20)
      expect(analytics.activeUsers).toBeLessThanOrEqual(analytics.totalUsers)
      expect(analytics.registrationsByMonth.length).toBeGreaterThan(0)
    })

    it('calculates phenotype distribution', () => {
      const analytics = getAdminAnalytics()
      const { phenotypeDistribution } = analytics
      expect(phenotypeDistribution.nociceptive).toBeGreaterThan(0)
      expect(phenotypeDistribution.neuropathic).toBeGreaterThan(0)
      expect(phenotypeDistribution.nociplastic).toBeGreaterThan(0)
      expect(phenotypeDistribution.mixed).toBeGreaterThan(0)
    })
  })

  describe('getSystemSettings', () => {
    it('returns defaults when nothing stored', () => {
      const settings = getSystemSettings()
      expect(settings.maintenanceMode).toBe(false)
      expect(settings.registrationOpen).toBe(true)
      expect(settings.maxThreadsPerDay).toBe(5)
    })
  })

  describe('updateSystemSettings', () => {
    it('updates and persists settings', () => {
      updateSystemSettings({ maintenanceMode: true })
      const settings = getSystemSettings()
      expect(settings.maintenanceMode).toBe(true)
      expect(settings.registrationOpen).toBe(true) // unchanged
    })

    it('handles partial updates immutably', () => {
      const original = getSystemSettings()
      const updated = updateSystemSettings({ maxThreadsPerDay: 10 })
      expect(updated.maxThreadsPerDay).toBe(10)
      expect(updated.maintenanceMode).toBe(original.maintenanceMode)
    })
  })
})
