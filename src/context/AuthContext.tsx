import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react'
import { z } from 'zod'
import type { User, QuestionnaireAnswers, PhenotypeResult } from '../types'

interface RegisterData {
  name: string
  email: string
  password: string
  birthDate: string
}

interface AuthContextType {
  user: User | null
  isAuthenticated: boolean
  questionnaireAnswers: QuestionnaireAnswers | null
  phenotypeResult: PhenotypeResult | null
  saveQuestionnaireAnswers: (answers: QuestionnaireAnswers) => void
  savePhenotypeResult: (result: PhenotypeResult) => void
  register: (data: RegisterData) => Promise<void>
  login: (email: string, password: string) => Promise<void>
  logout: () => void
}

const AuthContext = createContext<AuthContextType | null>(null)

const STORAGE_KEY = 'saude_auth'
const SESSION_ANSWERS_KEY = 'saude_questionnaire_answers'
const SESSION_RESULT_KEY = 'saude_phenotype_result'

const MAX_LOGIN_ATTEMPTS = 5
const LOCKOUT_MS = 60_000

// --- Crypto helpers ---

async function hashPassword(password: string): Promise<string> {
  const encoder = new TextEncoder()
  const data = encoder.encode(password)
  const hashBuffer = await crypto.subtle.digest('SHA-256', data)
  return Array.from(new Uint8Array(hashBuffer))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('')
}

function generateId(): string {
  return crypto.randomUUID()
}

// --- Encoding helpers for localStorage (base64 obfuscation) ---
// Note: For production, use server-side storage for PHI.
// This provides a basic layer against casual inspection.

function encodeForStorage(data: unknown): string {
  const json = JSON.stringify(data)
  return btoa(unescape(encodeURIComponent(json)))
}

function decodeFromStorage(encoded: string): unknown {
  const json = decodeURIComponent(escape(atob(encoded)))
  return JSON.parse(json)
}

// --- Storage validation schemas ---

const userSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string(),
  birthDate: z.string(),
  createdAt: z.string(),
})

const phenotypeResultSchema = z.object({
  dominantPhenotype: z.enum(['nociceptive', 'neuropathic', 'nociplastic', 'mixed']),
  scores: z.object({
    nociceptive: z.number(),
    neuropathic: z.number(),
    nociplastic: z.number(),
  }),
  goal: z.enum(['reduce_pain', 'improve_energy', 'control_belly', 'balance_hormones', 'improve_fertility', 'general_wellbeing']),
  commitment: z.enum(['very_committed', 'willing_to_try', 'exploring']),
  completedAt: z.string(),
})

const storedAuthSchema = z.object({
  user: userSchema.nullable().optional(),
  passwordHash: z.string().optional(),
  phenotypeResult: phenotypeResultSchema.nullable().optional(),
  questionnaireAnswers: z.unknown().nullable().optional(),
})

interface StoredAuth {
  user: User | null
  passwordHash: string | null
  phenotypeResult: PhenotypeResult | null
}

function loadAuthFromStorage(): StoredAuth {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return { user: null, passwordHash: null, phenotypeResult: null }
    const decoded = decodeFromStorage(raw)
    const result = storedAuthSchema.safeParse(decoded)
    if (!result.success) {
      localStorage.removeItem(STORAGE_KEY)
      return { user: null, passwordHash: null, phenotypeResult: null }
    }
    return {
      user: (result.data.user as User) ?? null,
      passwordHash: result.data.passwordHash ?? null,
      phenotypeResult: (result.data.phenotypeResult as PhenotypeResult) ?? null,
    }
  } catch {
    localStorage.removeItem(STORAGE_KEY)
    return { user: null, passwordHash: null, phenotypeResult: null }
  }
}

function loadSessionData<T>(key: string): T | null {
  try {
    const raw = sessionStorage.getItem(key)
    if (!raw) return null
    return decodeFromStorage(raw) as T
  } catch {
    return null
  }
}

function saveToSession(key: string, data: unknown): void {
  sessionStorage.setItem(key, encodeForStorage(data))
}

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [initialAuth] = useState(() => loadAuthFromStorage())
  const [user, setUser] = useState<User | null>(initialAuth.user)
  const [passwordHash, setPasswordHash] = useState<string | null>(initialAuth.passwordHash)
  const [questionnaireAnswers, setQuestionnaireAnswers] = useState<QuestionnaireAnswers | null>(
    () => loadSessionData<QuestionnaireAnswers>(SESSION_ANSWERS_KEY)
  )
  const [phenotypeResult, setPhenotypeResult] = useState<PhenotypeResult | null>(
    initialAuth.phenotypeResult ?? loadSessionData<PhenotypeResult>(SESSION_RESULT_KEY)
  )
  const [loginAttempts, setLoginAttempts] = useState(0)
  const [lockoutUntil, setLockoutUntil] = useState(0)

  const isAuthenticated = user !== null

  useEffect(() => {
    if (user) {
      localStorage.setItem(
        STORAGE_KEY,
        encodeForStorage({ user, passwordHash, phenotypeResult })
      )
    }
  }, [user, passwordHash, phenotypeResult])

  const saveQuestionnaireAnswers = useCallback((answers: QuestionnaireAnswers) => {
    setQuestionnaireAnswers(answers)
    saveToSession(SESSION_ANSWERS_KEY, answers)
  }, [])

  const savePhenotypeResult = useCallback((result: PhenotypeResult) => {
    setPhenotypeResult(result)
    saveToSession(SESSION_RESULT_KEY, result)
  }, [])

  const register = useCallback(async (data: RegisterData) => {
    const hash = await hashPassword(data.password)

    const newUser: User = {
      id: generateId(),
      name: data.name,
      email: data.email,
      birthDate: data.birthDate,
      createdAt: new Date().toISOString(),
    }

    const currentAnswers = questionnaireAnswers ?? loadSessionData<QuestionnaireAnswers>(SESSION_ANSWERS_KEY)
    const currentResult = phenotypeResult ?? loadSessionData<PhenotypeResult>(SESSION_RESULT_KEY)

    setUser(newUser)
    setPasswordHash(hash)
    if (currentAnswers) setQuestionnaireAnswers(currentAnswers)
    if (currentResult) setPhenotypeResult(currentResult)

    localStorage.setItem(
      STORAGE_KEY,
      encodeForStorage({
        user: newUser,
        passwordHash: hash,
        phenotypeResult: currentResult,
        questionnaireAnswers: currentAnswers,
      })
    )

    sessionStorage.removeItem(SESSION_ANSWERS_KEY)
    sessionStorage.removeItem(SESSION_RESULT_KEY)
  }, [questionnaireAnswers, phenotypeResult])

  const login = useCallback(async (email: string, password: string) => {
    const now = Date.now()
    if (loginAttempts >= MAX_LOGIN_ATTEMPTS && now < lockoutUntil) {
      const secondsLeft = Math.ceil((lockoutUntil - now) / 1000)
      throw new Error(`Demasiados intentos. Intenta en ${secondsLeft} segundos.`)
    }

    const stored = loadAuthFromStorage()
    if (!stored.user || stored.user.email !== email || !stored.passwordHash) {
      setLoginAttempts((prev) => {
        const next = prev + 1
        if (next >= MAX_LOGIN_ATTEMPTS) {
          setLockoutUntil(Date.now() + LOCKOUT_MS)
        }
        return next
      })
      throw new Error('Credenciales incorrectas')
    }

    const hash = await hashPassword(password)
    if (hash !== stored.passwordHash) {
      setLoginAttempts((prev) => {
        const next = prev + 1
        if (next >= MAX_LOGIN_ATTEMPTS) {
          setLockoutUntil(Date.now() + LOCKOUT_MS)
        }
        return next
      })
      throw new Error('Credenciales incorrectas')
    }

    setLoginAttempts(0)
    setLockoutUntil(0)
    setUser(stored.user)
    setPasswordHash(stored.passwordHash)
    setPhenotypeResult(stored.phenotypeResult)
  }, [loginAttempts, lockoutUntil])

  const logout = useCallback(() => {
    setUser(null)
    setPasswordHash(null)
    setQuestionnaireAnswers(null)
    setPhenotypeResult(null)
    localStorage.removeItem(STORAGE_KEY)
    sessionStorage.removeItem(SESSION_ANSWERS_KEY)
    sessionStorage.removeItem(SESSION_RESULT_KEY)
  }, [])

  const value = useMemo<AuthContextType>(() => ({
    user,
    isAuthenticated,
    questionnaireAnswers,
    phenotypeResult,
    saveQuestionnaireAnswers,
    savePhenotypeResult,
    register,
    login,
    logout,
  }), [user, isAuthenticated, questionnaireAnswers, phenotypeResult,
    saveQuestionnaireAnswers, savePhenotypeResult, register, login, logout])

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
