import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react'
import type { User, QuestionnaireAnswers, PhenotypeResult } from '../types'

const API_URL = import.meta.env.VITE_API_URL || '/api'

interface RegisterData {
  name: string
  email: string
  password: string
  birthDate: string
}

interface AuthContextType {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  isSyncing: boolean
  questionnaireAnswers: QuestionnaireAnswers | null
  phenotypeResult: PhenotypeResult | null
  saveQuestionnaireAnswers: (answers: QuestionnaireAnswers) => void
  savePhenotypeResult: (result: PhenotypeResult) => void
  register: (data: RegisterData) => Promise<void>
  login: (email: string, password: string) => Promise<void>
  logout: () => void
}

const AuthContext = createContext<AuthContextType | null>(null)

const TOKEN_KEY = 'saude_token'
const SESSION_ANSWERS_KEY = 'saude_questionnaire_answers'
const SESSION_RESULT_KEY = 'saude_phenotype_result'

function loadSessionData<T>(key: string): T | null {
  try {
    const raw = sessionStorage.getItem(key)
    if (!raw) return null
    return JSON.parse(raw) as T
  } catch {
    return null
  }
}

function saveToSession(key: string, data: unknown): void {
  sessionStorage.setItem(key, JSON.stringify(data))
}

// Get all symptom entries from localStorage
function getLocalStorageSymptoms(): Array<{date: string; pain: number; energy: number; mood: string; notes: string}> {
  const symptoms: Array<{date: string; pain: number; energy: number; mood: string; notes: string}> = []
  const prefix = 'saude_diario_'
  
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i)
    if (key && key.startsWith(prefix)) {
      try {
        const data = JSON.parse(localStorage.getItem(key) || '')
        if (data.date && typeof data.pain === 'number') {
          symptoms.push(data)
        }
      } catch {
        // Skip invalid entries
      }
    }
  }
  
  return symptoms
}

// Sync localStorage symptoms to backend
async function syncSymptomsToBackend(token: string): Promise<void> {
  const localSymptoms = getLocalStorageSymptoms()
  
  if (localSymptoms.length === 0) return
  
  // Sync each symptom to backend (backend will handle duplicates by date)
  for (const symptom of localSymptoms) {
    try {
      await fetch(`${API_URL}/symptoms`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          date: symptom.date,
          pain: symptom.pain,
          energy: symptom.energy,
          mood: symptom.mood,
          notes: symptom.notes || ''
        })
      })
    } catch (e) {
      console.error('Error syncing symptom:', e)
    }
  }
}

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isSyncing, setIsSyncing] = useState(false)
  const [questionnaireAnswers, setQuestionnaireAnswers] = useState<QuestionnaireAnswers | null>(
    () => loadSessionData<QuestionnaireAnswers>(SESSION_ANSWERS_KEY)
  )
  const [phenotypeResult, setPhenotypeResult] = useState<PhenotypeResult | null>(
    () => loadSessionData<PhenotypeResult>(SESSION_RESULT_KEY)
  )

  const isAuthenticated = user !== null

  // Check for existing token on mount
  useEffect(() => {
    const token = localStorage.getItem(TOKEN_KEY)
    if (token) {
      // Validate token by fetching user info
      fetch(`${API_URL}/auth/me`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      })
        .then(res => {
          if (!res.ok) throw new Error('Token inválido')
          return res.json()
        })
        .then(userData => {
          setUser({
            id: userData.id,
            name: userData.name,
            email: userData.email,
            birthDate: userData.birth_date,
            createdAt: userData.created_at
          })
          if (userData.phenotype_result) {
            setPhenotypeResult(userData.phenotype_result)
          }
        })
        .catch(() => {
          localStorage.removeItem(TOKEN_KEY)
        })
        .finally(() => {
          setIsLoading(false)
        })
    } else {
      setIsLoading(false)
    }
  }, [])

  const saveQuestionnaireAnswers = useCallback((answers: QuestionnaireAnswers) => {
    setQuestionnaireAnswers(answers)
    saveToSession(SESSION_ANSWERS_KEY, answers)
  }, [])

  const savePhenotypeResult = useCallback((result: PhenotypeResult) => {
    setPhenotypeResult(result)
    saveToSession(SESSION_RESULT_KEY, result)

    // If authenticated, also save to backend
    const token = localStorage.getItem(TOKEN_KEY)
    if (token && questionnaireAnswers) {
      fetch(`${API_URL}/questionnaire`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          answers: questionnaireAnswers,
          phenotype_result: result
        })
      }).catch(console.error)
    }
  }, [questionnaireAnswers])

  const register = useCallback(async (data: RegisterData) => {
    const response = await fetch(`${API_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: data.name,
        email: data.email,
        password: data.password,
        birth_date: data.birthDate
      })
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.detail || 'Error al registrar')
    }

    const { token, user: userData } = await response.json()
    
    localStorage.setItem(TOKEN_KEY, token)
    
    setUser({
      id: userData.id,
      name: userData.name,
      email: userData.email,
      birthDate: userData.birth_date,
      createdAt: userData.created_at
    })

    // Save questionnaire data to backend if available
    const currentAnswers = questionnaireAnswers ?? loadSessionData<QuestionnaireAnswers>(SESSION_ANSWERS_KEY)
    const currentResult = phenotypeResult ?? loadSessionData<PhenotypeResult>(SESSION_RESULT_KEY)

    if (currentAnswers && currentResult) {
      try {
        await fetch(`${API_URL}/questionnaire`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            answers: currentAnswers,
            phenotype_result: currentResult
          })
        })
      } catch (e) {
        console.error('Error saving questionnaire:', e)
      }
    }

    sessionStorage.removeItem(SESSION_ANSWERS_KEY)
    sessionStorage.removeItem(SESSION_RESULT_KEY)
  }, [questionnaireAnswers, phenotypeResult])

  const login = useCallback(async (email: string, password: string) => {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.detail || 'Credenciales incorrectas')
    }

    const { token, user: userData } = await response.json()
    
    localStorage.setItem(TOKEN_KEY, token)
    
    setUser({
      id: userData.id,
      name: userData.name,
      email: userData.email,
      birthDate: userData.birth_date,
      createdAt: userData.created_at
    })

    if (userData.phenotype_result) {
      setPhenotypeResult(userData.phenotype_result)
    }

    // Sync localStorage symptoms to backend in background
    setIsSyncing(true)
    syncSymptomsToBackend(token)
      .catch(console.error)
      .finally(() => setIsSyncing(false))
  }, [])

  const logout = useCallback(() => {
    localStorage.removeItem(TOKEN_KEY)
    setUser(null)
    setQuestionnaireAnswers(null)
    setPhenotypeResult(null)
    sessionStorage.removeItem(SESSION_ANSWERS_KEY)
    sessionStorage.removeItem(SESSION_RESULT_KEY)
  }, [])

  const value = useMemo<AuthContextType>(() => ({
    user,
    isAuthenticated,
    isLoading,
    isSyncing,
    questionnaireAnswers,
    phenotypeResult,
    saveQuestionnaireAnswers,
    savePhenotypeResult,
    register,
    login,
    logout,
  }), [user, isAuthenticated, isLoading, isSyncing, questionnaireAnswers, phenotypeResult,
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
