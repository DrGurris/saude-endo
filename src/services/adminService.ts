import type { AdminUser, AdminAnalytics, SystemSettings, UserRole } from '../types'
import type { ForumReport } from '../types'
import { isApiAvailable, apiGet, apiPut } from './api'
import {
  getAdminUsers,
  updateUserRole as mockUpdateRole,
  updateUserStatus as mockUpdateStatus,
  getAdminAnalytics as mockGetAnalytics,
  getSystemSettings as mockGetSettings,
  updateSystemSettings as mockUpdateSettings,
} from './mockAdminData'

// ─── Users ───────────────────────────────────────────────────────────────

export async function fetchUsers(): Promise<AdminUser[]> {
  const hasApi = await isApiAvailable()

  if (hasApi) {
    const response = await apiGet<AdminUser[]>('/admin/users')
    if (response.success && response.data) return response.data
  }

  return getAdminUsers()
}

export async function changeUserRole(userId: string, role: UserRole): Promise<AdminUser | null> {
  const hasApi = await isApiAvailable()

  if (hasApi) {
    const response = await apiPut<AdminUser>(`/admin/users/${userId}/role`, { role })
    if (response.success && response.data) return response.data
  }

  return mockUpdateRole(userId, role)
}

export async function changeUserStatus(
  userId: string,
  status: AdminUser['status']
): Promise<AdminUser | null> {
  const hasApi = await isApiAvailable()

  if (hasApi) {
    const response = await apiPut<AdminUser>(`/admin/users/${userId}/status`, { status })
    if (response.success && response.data) return response.data
  }

  return mockUpdateStatus(userId, status)
}

// ─── Analytics ───────────────────────────────────────────────────────────

export async function fetchAnalytics(): Promise<AdminAnalytics> {
  const hasApi = await isApiAvailable()

  if (hasApi) {
    const response = await apiGet<AdminAnalytics>('/admin/analytics')
    if (response.success && response.data) return response.data
  }

  return mockGetAnalytics()
}

// ─── Reports ─────────────────────────────────────────────────────────────

export async function fetchPendingReports(): Promise<ForumReport[]> {
  const hasApi = await isApiAvailable()

  if (hasApi) {
    const response = await apiGet<ForumReport[]>('/admin/reports?status=pending')
    if (response.success && response.data) return response.data
  }

  // Mock: get from community service
  try {
    const { getPendingReports } = await import('./communityService')
    return getPendingReports()
  } catch {
    return []
  }
}

export async function resolveReport(
  reportId: string,
  action: 'reviewed' | 'dismissed'
): Promise<boolean> {
  const hasApi = await isApiAvailable()

  if (hasApi) {
    const response = await apiPut(`/admin/reports/${reportId}`, { status: action })
    return response.success
  }

  try {
    const { updateReportStatus } = await import('./communityService')
    return updateReportStatus(reportId, action)
  } catch {
    return false
  }
}

// ─── Settings ────────────────────────────────────────────────────────────

export async function fetchSettings(): Promise<SystemSettings> {
  const hasApi = await isApiAvailable()

  if (hasApi) {
    const response = await apiGet<SystemSettings>('/admin/settings')
    if (response.success && response.data) return response.data
  }

  return mockGetSettings()
}

export async function saveSettings(settings: Partial<SystemSettings>): Promise<SystemSettings> {
  const hasApi = await isApiAvailable()

  if (hasApi) {
    const response = await apiPut<SystemSettings>('/admin/settings', settings)
    if (response.success && response.data) return response.data
  }

  return mockUpdateSettings(settings)
}
