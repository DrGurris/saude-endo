import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import type { UserRole } from '../types'

interface RoleRouteProps {
  children: React.ReactNode
  requiredRole: UserRole
}

const ROLE_HIERARCHY: Record<UserRole, number> = {
  user: 0,
  moderator: 1,
  admin: 2,
}

const RoleRoute: React.FC<RoleRouteProps> = ({ children, requiredRole }) => {
  const { isAuthenticated, user, isLoading } = useAuth()
  const location = useLocation()

  if (isLoading) {
    return <div style={{ display: 'flex', justifyContent: 'center', padding: '4rem' }}>Cargando...</div>
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace state={{ from: location.pathname }} />
  }

  const userLevel = ROLE_HIERARCHY[user?.role ?? 'user']
  const requiredLevel = ROLE_HIERARCHY[requiredRole]

  if (userLevel < requiredLevel) {
    return <Navigate to="/" replace />
  }

  return <>{children}</>
}

export default RoleRoute
