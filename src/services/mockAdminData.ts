import type { AdminUser, AdminAnalytics, SystemSettings, UserRole, PhenotypeType } from '../types'

const ADMIN_USERS_KEY = 'saude_admin_users'
const ADMIN_SETTINGS_KEY = 'saude_admin_settings'

const SEED_USERS: AdminUser[] = [
  { id: 'usr_001', name: 'Admin Saude', email: 'admin@saude.com', role: 'admin', status: 'active', joinDate: '2025-11-01', lastActive: '2026-03-09', postCount: 0, phenotype: undefined },
  { id: 'usr_002', name: 'Maria Lopez', email: 'maria@correo.com', role: 'moderator', status: 'active', joinDate: '2025-12-15', lastActive: '2026-03-08', postCount: 12, phenotype: 'nociceptive' },
  { id: 'usr_003', name: 'Ana Garcia', email: 'ana@correo.com', role: 'user', status: 'active', joinDate: '2026-01-03', lastActive: '2026-03-07', postCount: 8, phenotype: 'nociplastic' },
  { id: 'usr_004', name: 'Carmen Rodriguez', email: 'carmen@correo.com', role: 'user', status: 'active', joinDate: '2026-01-10', lastActive: '2026-03-05', postCount: 15, phenotype: 'neuropathic' },
  { id: 'usr_005', name: 'Sofia Perez', email: 'sofia@correo.com', role: 'user', status: 'active', joinDate: '2026-01-22', lastActive: '2026-03-06', postCount: 3, phenotype: 'mixed' },
  { id: 'usr_006', name: 'Laura Sanchez', email: 'laura@correo.com', role: 'user', status: 'suspended', joinDate: '2026-02-01', lastActive: '2026-02-28', postCount: 1, phenotype: 'nociceptive' },
  { id: 'usr_007', name: 'Valentina Torres', email: 'valentina@correo.com', role: 'user', status: 'active', joinDate: '2026-02-05', lastActive: '2026-03-09', postCount: 22, phenotype: 'nociplastic' },
  { id: 'usr_008', name: 'Isabella Ramirez', email: 'isabella@correo.com', role: 'user', status: 'active', joinDate: '2026-02-10', lastActive: '2026-03-08', postCount: 6, phenotype: 'nociceptive' },
  { id: 'usr_009', name: 'Camila Flores', email: 'camila@correo.com', role: 'user', status: 'active', joinDate: '2026-02-15', lastActive: '2026-03-04', postCount: 4, phenotype: 'neuropathic' },
  { id: 'usr_010', name: 'Lucia Martinez', email: 'lucia@correo.com', role: 'user', status: 'active', joinDate: '2026-02-20', lastActive: '2026-03-09', postCount: 9, phenotype: 'mixed' },
  { id: 'usr_011', name: 'Elena Diaz', email: 'elena@correo.com', role: 'user', status: 'banned', joinDate: '2026-02-22', lastActive: '2026-02-25', postCount: 0, phenotype: undefined },
  { id: 'usr_012', name: 'Paula Herrera', email: 'paula@correo.com', role: 'user', status: 'active', joinDate: '2026-02-28', lastActive: '2026-03-09', postCount: 7, phenotype: 'nociceptive' },
  { id: 'usr_013', name: 'Daniela Moreno', email: 'daniela@correo.com', role: 'user', status: 'active', joinDate: '2026-03-01', lastActive: '2026-03-09', postCount: 2, phenotype: 'nociplastic' },
  { id: 'usr_014', name: 'Mariana Castro', email: 'mariana@correo.com', role: 'user', status: 'active', joinDate: '2026-03-02', lastActive: '2026-03-08', postCount: 1, phenotype: 'neuropathic' },
  { id: 'usr_015', name: 'Gabriela Rios', email: 'gabriela@correo.com', role: 'user', status: 'active', joinDate: '2026-03-03', lastActive: '2026-03-07', postCount: 0, phenotype: undefined },
  { id: 'usr_016', name: 'Fernanda Vargas', email: 'fernanda@correo.com', role: 'user', status: 'active', joinDate: '2026-03-04', lastActive: '2026-03-09', postCount: 5, phenotype: 'nociceptive' },
  { id: 'usr_017', name: 'Andrea Silva', email: 'andrea@correo.com', role: 'user', status: 'active', joinDate: '2026-03-05', lastActive: '2026-03-08', postCount: 0, phenotype: 'mixed' },
  { id: 'usr_018', name: 'Victoria Mendez', email: 'victoria@correo.com', role: 'user', status: 'active', joinDate: '2026-03-06', lastActive: '2026-03-09', postCount: 3, phenotype: 'nociplastic' },
  { id: 'usr_019', name: 'Natalia Rojas', email: 'natalia@correo.com', role: 'user', status: 'active', joinDate: '2026-03-07', lastActive: '2026-03-09', postCount: 1, phenotype: 'nociceptive' },
  { id: 'usr_020', name: 'Alejandra Luna', email: 'alejandra@correo.com', role: 'user', status: 'active', joinDate: '2026-03-08', lastActive: '2026-03-09', postCount: 0, phenotype: undefined },
]

const DEFAULT_SETTINGS: SystemSettings = {
  maintenanceMode: false,
  registrationOpen: true,
  announcementBanner: '',
  maxThreadsPerDay: 5,
  requireEmailVerification: false,
}

// ─── Users ───────────────────────────────────────────────────────────────

function loadUsers(): AdminUser[] {
  try {
    const raw = localStorage.getItem(ADMIN_USERS_KEY)
    if (!raw) return []
    return JSON.parse(raw)
  } catch {
    return []
  }
}

function saveUsers(users: AdminUser[]): void {
  localStorage.setItem(ADMIN_USERS_KEY, JSON.stringify(users))
}

function seedUsers(): AdminUser[] {
  const existing = loadUsers()
  if (existing.length > 0) return existing
  saveUsers(SEED_USERS)
  return SEED_USERS
}

export function getAdminUsers(): AdminUser[] {
  return seedUsers()
}

export function updateUserRole(userId: string, role: UserRole): AdminUser | null {
  const users = getAdminUsers()
  const index = users.findIndex(u => u.id === userId)
  if (index === -1) return null
  const updated = { ...users[index], role }
  const newList = users.map((u, i) => (i === index ? updated : u))
  saveUsers(newList)
  return updated
}

export function updateUserStatus(userId: string, status: AdminUser['status']): AdminUser | null {
  const users = getAdminUsers()
  const index = users.findIndex(u => u.id === userId)
  if (index === -1) return null
  const updated = { ...users[index], status }
  const newList = users.map((u, i) => (i === index ? updated : u))
  saveUsers(newList)
  return updated
}

// ─── Analytics ───────────────────────────────────────────────────────────

export function getAdminAnalytics(): AdminAnalytics {
  const users = getAdminUsers()

  const phenotypeDistribution: Record<PhenotypeType, number> = {
    nociceptive: 0,
    neuropathic: 0,
    nociplastic: 0,
    mixed: 0,
  }

  for (const user of users) {
    if (user.phenotype) {
      phenotypeDistribution[user.phenotype]++
    }
  }

  return {
    totalUsers: users.length,
    activeUsers: users.filter(u => u.status === 'active').length,
    totalThreads: 15,
    totalReplies: 47,
    totalArticles: 24,
    registrationsByMonth: [
      { month: '2025-11', count: 1 },
      { month: '2025-12', count: 1 },
      { month: '2026-01', count: 3 },
      { month: '2026-02', count: 7 },
      { month: '2026-03', count: 8 },
    ],
    phenotypeDistribution,
    topArticles: [
      { id: 'endo-basics', title: 'Que es la endometriosis', reads: 145 },
      { id: 'pain-phenotypes', title: 'Fenotipos del dolor', reads: 98 },
      { id: 'anti-inflammatory-diet', title: 'Dieta antiinflamatoria', reads: 87 },
      { id: 'sleep-hygiene', title: 'Higiene del sueno', reads: 72 },
      { id: 'mindfulness-endo', title: 'Mindfulness y endometriosis', reads: 65 },
    ],
    forumActivityByWeek: [
      { week: '2026-W08', threads: 3, replies: 8 },
      { week: '2026-W09', threads: 5, replies: 12 },
      { week: '2026-W10', threads: 7, replies: 27 },
    ],
  }
}

// ─── Settings ────────────────────────────────────────────────────────────

export function getSystemSettings(): SystemSettings {
  try {
    const raw = localStorage.getItem(ADMIN_SETTINGS_KEY)
    if (!raw) return { ...DEFAULT_SETTINGS }
    return { ...DEFAULT_SETTINGS, ...JSON.parse(raw) }
  } catch {
    return { ...DEFAULT_SETTINGS }
  }
}

export function updateSystemSettings(settings: Partial<SystemSettings>): SystemSettings {
  const current = getSystemSettings()
  const updated = { ...current, ...settings }
  localStorage.setItem(ADMIN_SETTINGS_KEY, JSON.stringify(updated))
  return updated
}
