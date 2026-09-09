import type { ForumThread, ForumReply, ForumReport } from '../types'

const THREADS_KEY = 'saude_forum_threads'
const REPLIES_KEY = 'saude_forum_replies'
const REPORTS_KEY = 'saude_forum_reports'
const SUPPORTS_KEY = 'saude_forum_supports'

function generateId(prefix: string): string {
  return `${prefix}_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`
}

// ─── Seed Data ───────────────────────────────────────────────────────────

const SEED_THREADS: ForumThread[] = [
  {
    id: 'thread_001', title: 'Mi experiencia con el diagnostico de endometriosis', body: 'Despues de 5 anos de dolor, finalmente me diagnosticaron. Quiero compartir mi experiencia para que otras mujeres no pasen por lo mismo.\n\nLo mas importante fue encontrar un especialista que realmente escuchara mis sintomas.',
    authorId: 'usr_003', authorName: 'Ana Garcia', authorRole: 'user', isAnonymous: false,
    category: 'general', pinned: true, locked: false, supportCount: 12, replyCount: 5,
    createdAt: '2026-02-15T10:30:00Z', updatedAt: '2026-03-08T14:20:00Z',
  },
  {
    id: 'thread_002', title: 'Que alimentos les ayudan con la inflamacion?', body: 'Estoy buscando recomendaciones de alimentos antiinflamatorios que realmente funcionen. He probado la curcuma y el jengibre pero quiero saber que mas pueden sugerir.',
    authorId: 'usr_004', authorName: 'Carmen Rodriguez', authorRole: 'user', isAnonymous: false,
    category: 'nutrition', pinned: false, locked: false, supportCount: 8, replyCount: 7,
    createdAt: '2026-02-20T09:15:00Z', updatedAt: '2026-03-07T11:45:00Z',
  },
  {
    id: 'thread_003', title: 'Tecnicas de respiracion para el dolor', body: 'He descubierto que las tecnicas de respiracion profunda me ayudan muchisimo durante los episodios de dolor. Comparto las que mejor me funcionan:\n\n1. Respiracion 4-7-8\n2. Respiracion diafragmatica\n3. Box breathing',
    authorId: 'usr_007', authorName: 'Valentina Torres', authorRole: 'user', isAnonymous: false,
    category: 'pain', pinned: false, locked: false, supportCount: 15, replyCount: 4,
    createdAt: '2026-02-25T16:00:00Z', updatedAt: '2026-03-06T09:30:00Z',
  },
  {
    id: 'thread_004', title: 'Problemas de sueno y fatiga cronica', body: 'Alguien mas tiene problemas terribles para dormir? Me despierto multiples veces en la noche y la fatiga durante el dia es insoportable.',
    authorId: 'usr_005', authorName: 'Sofia Perez', authorRole: 'user', isAnonymous: false,
    category: 'energy', pinned: false, locked: false, supportCount: 22, replyCount: 9,
    createdAt: '2026-03-01T08:00:00Z', updatedAt: '2026-03-09T07:15:00Z',
  },
  {
    id: 'thread_005', title: 'Ansiedad y endometriosis', body: 'Quiero hablar sobre el impacto emocional de vivir con endometriosis. La ansiedad de no saber cuando vendra el siguiente episodio de dolor es agotadora.',
    authorId: 'usr_008', authorName: 'Isabella Ramirez', authorRole: 'user', isAnonymous: true,
    category: 'wellbeing', pinned: false, locked: false, supportCount: 18, replyCount: 6,
    createdAt: '2026-03-02T12:30:00Z', updatedAt: '2026-03-08T16:00:00Z',
  },
  {
    id: 'thread_006', title: 'Tratamiento hormonal: experiencias?', body: 'Mi doctora me sugirio empezar tratamiento hormonal. Me gustaria escuchar experiencias de otras mujeres con diferentes tratamientos.',
    authorId: 'usr_009', authorName: 'Camila Flores', authorRole: 'user', isAnonymous: false,
    category: 'hormones', pinned: false, locked: false, supportCount: 10, replyCount: 8,
    createdAt: '2026-03-03T14:45:00Z', updatedAt: '2026-03-09T10:00:00Z',
  },
  {
    id: 'thread_007', title: 'Guia: como prepararte para tu cita medica', body: 'Como moderadora, quiero compartir algunos tips para sacar el maximo provecho de tu consulta medica:\n\n- Lleva un diario de sintomas\n- Anota tus preguntas antes\n- No tengas miedo de pedir una segunda opinion',
    authorId: 'usr_002', authorName: 'Maria Lopez', authorRole: 'moderator', isAnonymous: false,
    category: 'general', pinned: true, locked: false, supportCount: 25, replyCount: 3,
    createdAt: '2026-03-04T11:00:00Z', updatedAt: '2026-03-09T08:00:00Z',
  },
  {
    id: 'thread_008', title: 'Yoga y endometriosis', body: 'Empece a practicar yoga hace 3 meses y la diferencia ha sido increible. Quiero compartir las posturas que mas me ayudan con el dolor pelvico.',
    authorId: 'usr_010', authorName: 'Lucia Martinez', authorRole: 'user', isAnonymous: false,
    category: 'pain', pinned: false, locked: false, supportCount: 14, replyCount: 5,
    createdAt: '2026-03-05T15:30:00Z', updatedAt: '2026-03-08T18:00:00Z',
  },
  {
    id: 'thread_009', title: 'Suplementos que realmente funcionan', body: 'Despues de investigar mucho, estos son los suplementos con evidencia cientifica para endometriosis:\n\n- Omega-3\n- Vitamina D\n- Magnesio\n- NAC',
    authorId: 'usr_012', authorName: 'Paula Herrera', authorRole: 'user', isAnonymous: false,
    category: 'nutrition', pinned: false, locked: false, supportCount: 19, replyCount: 11,
    createdAt: '2026-03-06T09:00:00Z', updatedAt: '2026-03-09T12:00:00Z',
  },
  {
    id: 'thread_010', title: 'Endo belly: como lidiar con la hinchazón', body: 'El endo belly es uno de mis sintomas mas molestos. Quiero saber como lo manejan ustedes.',
    authorId: 'usr_016', authorName: 'Fernanda Vargas', authorRole: 'user', isAnonymous: false,
    category: 'nutrition', pinned: false, locked: false, supportCount: 16, replyCount: 6,
    createdAt: '2026-03-06T16:00:00Z', updatedAt: '2026-03-09T09:30:00Z',
  },
  {
    id: 'thread_011', title: 'Mi rutina de ejercicios adaptada', body: 'He creado una rutina de ejercicios que puedo hacer incluso en mis peores dias. Es de bajo impacto pero me ayuda a mantener la energia.',
    authorId: 'usr_007', authorName: 'Valentina Torres', authorRole: 'user', isAnonymous: false,
    category: 'energy', pinned: false, locked: false, supportCount: 11, replyCount: 4,
    createdAt: '2026-03-07T10:00:00Z', updatedAt: '2026-03-09T06:00:00Z',
  },
  {
    id: 'thread_012', title: 'Fertilidad y endometriosis: mi camino', body: 'Quiero compartir mi experiencia con fertilidad. Me dijeron que seria muy dificil pero despues de tratamiento logre embarazarme.',
    authorId: 'usr_018', authorName: 'Victoria Mendez', authorRole: 'user', isAnonymous: false,
    category: 'hormones', pinned: false, locked: false, supportCount: 28, replyCount: 7,
    createdAt: '2026-03-07T14:00:00Z', updatedAt: '2026-03-09T11:00:00Z',
  },
  {
    id: 'thread_013', title: 'Meditacion guiada para el dolor cronico', body: 'Encontre estas meditaciones guiadas especificas para dolor cronico que me han ayudado mucho con la endometriosis.',
    authorId: 'usr_013', authorName: 'Daniela Moreno', authorRole: 'user', isAnonymous: false,
    category: 'wellbeing', pinned: false, locked: false, supportCount: 9, replyCount: 3,
    createdAt: '2026-03-08T08:30:00Z', updatedAt: '2026-03-09T07:00:00Z',
  },
  {
    id: 'thread_014', title: 'TENS para endometriosis: vale la pena?', body: 'He visto que recomiendan mucho el TENS para el dolor. Alguien lo ha probado? Que modelo recomiendan?',
    authorId: 'usr_019', authorName: 'Natalia Rojas', authorRole: 'user', isAnonymous: false,
    category: 'pain', pinned: false, locked: false, supportCount: 7, replyCount: 5,
    createdAt: '2026-03-08T13:00:00Z', updatedAt: '2026-03-09T14:00:00Z',
  },
  {
    id: 'thread_015', title: 'Apoyo emocional: no estas sola', body: 'Solo quiero recordarles que no estan solas en esto. Somos una comunidad que se apoya y comprende. Abrazos a todas.',
    authorId: 'usr_014', authorName: 'Mariana Castro', authorRole: 'user', isAnonymous: false,
    category: 'wellbeing', pinned: false, locked: false, supportCount: 32, replyCount: 12,
    createdAt: '2026-03-09T07:00:00Z', updatedAt: '2026-03-09T15:00:00Z',
  },
]

const SEED_REPLIES: ForumReply[] = [
  { id: 'reply_001', threadId: 'thread_001', parentReplyId: null, body: 'Gracias por compartir tu historia. Yo tambien tarde anos en recibir un diagnostico.', authorId: 'usr_007', authorName: 'Valentina Torres', authorRole: 'user', isAnonymous: false, supportCount: 5, createdAt: '2026-02-16T08:00:00Z' },
  { id: 'reply_002', threadId: 'thread_001', parentReplyId: null, body: 'Es increible lo comun que es esta situacion. Necesitamos mas conciencia sobre endometriosis.', authorId: 'usr_004', authorName: 'Carmen Rodriguez', authorRole: 'user', isAnonymous: false, supportCount: 3, createdAt: '2026-02-17T14:30:00Z' },
  { id: 'reply_003', threadId: 'thread_002', parentReplyId: null, body: 'A mi me funciona mucho el brocoli y las verduras cruciferas. Tambien eliminar gluten fue un cambio enorme.', authorId: 'usr_010', authorName: 'Lucia Martinez', authorRole: 'user', isAnonymous: false, supportCount: 6, createdAt: '2026-02-21T10:00:00Z' },
  { id: 'reply_004', threadId: 'thread_004', parentReplyId: null, body: 'Si! La fatiga es lo peor. He encontrado que la melatonina me ayuda a dormir mejor.', authorId: 'usr_012', authorName: 'Paula Herrera', authorRole: 'user', isAnonymous: false, supportCount: 8, createdAt: '2026-03-02T09:00:00Z' },
  { id: 'reply_005', threadId: 'thread_004', parentReplyId: 'reply_004', body: 'Cuanta melatonina tomas? Mi doctora me recomendo 3mg pero no se si es suficiente.', authorId: 'usr_005', authorName: 'Sofia Perez', authorRole: 'user', isAnonymous: false, supportCount: 2, createdAt: '2026-03-02T11:00:00Z' },
]

// ─── Storage Helpers ─────────────────────────────────────────────────────

function load<T>(key: string): T[] {
  try {
    const raw = localStorage.getItem(key)
    if (!raw) return []
    return JSON.parse(raw)
  } catch {
    return []
  }
}

function save<T>(key: string, data: T[]): void {
  localStorage.setItem(key, JSON.stringify(data))
}

function seedIfEmpty<T>(key: string, seed: T[]): T[] {
  const existing = load<T>(key)
  if (existing.length > 0) return existing
  save(key, seed)
  return seed
}

// ─── Threads ─────────────────────────────────────────────────────────────

export function getThreads(): ForumThread[] {
  return seedIfEmpty(THREADS_KEY, SEED_THREADS)
}

export function getThreadById(id: string): ForumThread | null {
  return getThreads().find(t => t.id === id) ?? null
}

export function createThread(data: Omit<ForumThread, 'id' | 'pinned' | 'locked' | 'supportCount' | 'replyCount' | 'createdAt' | 'updatedAt'>): ForumThread {
  const now = new Date().toISOString()
  const thread: ForumThread = {
    ...data,
    id: generateId('thread'),
    pinned: false,
    locked: false,
    supportCount: 0,
    replyCount: 0,
    createdAt: now,
    updatedAt: now,
  }
  const all = getThreads()
  save(THREADS_KEY, [...all, thread])
  return thread
}

export function updateThread(id: string, data: Partial<ForumThread>): ForumThread | null {
  const all = getThreads()
  const idx = all.findIndex(t => t.id === id)
  if (idx === -1) return null
  const updated = { ...all[idx], ...data, id, updatedAt: new Date().toISOString() }
  save(THREADS_KEY, all.map((t, i) => (i === idx ? updated : t)))
  return updated
}

export function deleteThread(id: string): boolean {
  const all = getThreads()
  const filtered = all.filter(t => t.id !== id)
  if (filtered.length === all.length) return false
  save(THREADS_KEY, filtered)
  // Also delete replies
  const replies = getReplies().filter(r => r.threadId !== id)
  save(REPLIES_KEY, replies)
  return true
}

// ─── Replies ─────────────────────────────────────────────────────────────

export function getReplies(): ForumReply[] {
  return seedIfEmpty(REPLIES_KEY, SEED_REPLIES)
}

export function getRepliesForThread(threadId: string): ForumReply[] {
  return getReplies().filter(r => r.threadId === threadId)
}

export function createReply(data: Omit<ForumReply, 'id' | 'supportCount' | 'createdAt'>): ForumReply {
  const reply: ForumReply = {
    ...data,
    id: generateId('reply'),
    supportCount: 0,
    createdAt: new Date().toISOString(),
  }
  const all = getReplies()
  save(REPLIES_KEY, [...all, reply])

  // Update thread reply count
  const thread = getThreadById(data.threadId)
  if (thread) {
    updateThread(data.threadId, { replyCount: thread.replyCount + 1 })
  }

  return reply
}

export function deleteReply(id: string): boolean {
  const all = getReplies()
  const reply = all.find(r => r.id === id)
  if (!reply) return false
  save(REPLIES_KEY, all.filter(r => r.id !== id))

  // Update thread reply count
  const thread = getThreadById(reply.threadId)
  if (thread) {
    updateThread(reply.threadId, { replyCount: Math.max(0, thread.replyCount - 1) })
  }

  return true
}

// ─── Supports ────────────────────────────────────────────────────────────

function getSupports(): Record<string, string[]> {
  try {
    const raw = localStorage.getItem(SUPPORTS_KEY)
    return raw ? JSON.parse(raw) : {}
  } catch {
    return {}
  }
}

export function hasUserSupported(userId: string, targetId: string): boolean {
  const supports = getSupports()
  return (supports[targetId] ?? []).includes(userId)
}

export function toggleSupport(userId: string, targetId: string, targetType: 'thread' | 'reply'): number {
  const supports = getSupports()
  const current = supports[targetId] ?? []
  const hasSupport = current.includes(userId)

  const updated = hasSupport
    ? current.filter(id => id !== userId)
    : [...current, userId]

  localStorage.setItem(SUPPORTS_KEY, JSON.stringify({ ...supports, [targetId]: updated }))

  // Update count
  const delta = hasSupport ? -1 : 1
  if (targetType === 'thread') {
    const thread = getThreadById(targetId)
    if (thread) {
      updateThread(targetId, { supportCount: Math.max(0, thread.supportCount + delta) })
    }
  } else {
    const all = getReplies()
    const idx = all.findIndex(r => r.id === targetId)
    if (idx !== -1) {
      const updatedReply = { ...all[idx], supportCount: Math.max(0, all[idx].supportCount + delta) }
      save(REPLIES_KEY, all.map((r, i) => (i === idx ? updatedReply : r)))
    }
  }

  return updated.length
}

// ─── Reports ─────────────────────────────────────────────────────────────

export function getReports(): ForumReport[] {
  return load<ForumReport>(REPORTS_KEY)
}

export function createReport(data: Omit<ForumReport, 'id' | 'status' | 'createdAt'>): ForumReport {
  const report: ForumReport = {
    ...data,
    id: generateId('report'),
    status: 'pending',
    createdAt: new Date().toISOString(),
  }
  const all = getReports()
  save(REPORTS_KEY, [...all, report])
  return report
}

export function updateReportStatus(reportId: string, status: ForumReport['status']): boolean {
  const all = getReports()
  const idx = all.findIndex(r => r.id === reportId)
  if (idx === -1) return false
  save(REPORTS_KEY, all.map((r, i) => (i === idx ? { ...r, status } : r)))
  return true
}

export function getPendingReports(): ForumReport[] {
  return getReports().filter(r => r.status === 'pending')
}
