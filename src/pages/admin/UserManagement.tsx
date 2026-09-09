import React, { useState, useEffect, useCallback } from 'react'
import { motion } from 'framer-motion'
import { Users, AlertCircle } from 'lucide-react'
import type { AdminUser, UserRole } from '../../types'
import { fetchUsers, changeUserRole, changeUserStatus } from '../../services/adminService'
import { useAuth } from '../../context/AuthContext'
import DataTable from '../../components/admin/DataTable'
import StatusBadge from '../../components/admin/StatusBadge'
import ActionModal from '../../components/admin/ActionModal'
import styles from './UserManagement.module.css'

const UserManagement: React.FC = () => {
  const { user: currentUser } = useAuth()
  const [users, setUsers] = useState<AdminUser[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedUser, setSelectedUser] = useState<AdminUser | null>(null)
  const [modalAction, setModalAction] = useState<'role' | 'status' | null>(null)
  const [pendingRole, setPendingRole] = useState<UserRole>('user')
  const [pendingStatus, setPendingStatus] = useState<AdminUser['status']>('active')

  useEffect(() => {
    fetchUsers()
      .then(setUsers)
      .catch(() => setError('No se pudieron cargar los usuarios'))
      .finally(() => setIsLoading(false))
  }, [])

  const handleRoleChange = useCallback((user: AdminUser, role: UserRole) => {
    setSelectedUser(user)
    setPendingRole(role)
    setModalAction('role')
  }, [])

  const handleStatusChange = useCallback((user: AdminUser, status: AdminUser['status']) => {
    setSelectedUser(user)
    setPendingStatus(status)
    setModalAction('status')
  }, [])

  const confirmAction = useCallback(async () => {
    if (!selectedUser) return

    try {
      if (modalAction === 'role') {
        const updated = await changeUserRole(selectedUser.id, pendingRole)
        if (updated) {
          setUsers(prev => prev.map(u => (u.id === updated.id ? updated : u)))
        }
      } else if (modalAction === 'status') {
        const updated = await changeUserStatus(selectedUser.id, pendingStatus)
        if (updated) {
          setUsers(prev => prev.map(u => (u.id === updated.id ? updated : u)))
        }
      }
    } catch {
      setError('No se pudo completar la accion. Intenta de nuevo.')
    } finally {
      setModalAction(null)
      setSelectedUser(null)
    }
  }, [selectedUser, modalAction, pendingRole, pendingStatus])

  const columns = [
    { key: 'name', label: 'Nombre', sortable: true },
    { key: 'email', label: 'Email', sortable: true },
    {
      key: 'role',
      label: 'Rol',
      render: (user: AdminUser) => (
        user.id === currentUser?.id ? (
          <span className={styles.selfLabel}>{user.role} (tu)</span>
        ) : (
          <select
            value={user.role}
            onChange={e => handleRoleChange(user, e.target.value as UserRole)}
            className={styles.roleSelect}
            onClick={e => e.stopPropagation()}
          >
            <option value="user">Usuario</option>
            <option value="moderator">Moderador</option>
            <option value="admin">Admin</option>
          </select>
        )
      ),
    },
    {
      key: 'status',
      label: 'Estado',
      render: (user: AdminUser) => (
        <StatusBadge status={user.status} />
      ),
    },
    { key: 'joinDate', label: 'Registro', sortable: true },
    { key: 'postCount', label: 'Posts', sortable: true },
    {
      key: 'actions',
      label: 'Acciones',
      render: (user: AdminUser) => (
        <div className={styles.actions}>
          {user.id === currentUser?.id ? (
            <span className={styles.selfLabel}>—</span>
          ) : (<>
          {user.status === 'active' && (
            <button
              className={styles.actionBtnWarn}
              onClick={e => { e.stopPropagation(); handleStatusChange(user, 'suspended') }}
            >
              Suspender
            </button>
          )}
          {user.status === 'suspended' && (
            <button
              className={styles.actionBtnSuccess}
              onClick={e => { e.stopPropagation(); handleStatusChange(user, 'active') }}
            >
              Reactivar
            </button>
          )}
          {user.status !== 'banned' && (
            <button
              className={styles.actionBtnDanger}
              onClick={e => { e.stopPropagation(); handleStatusChange(user, 'banned') }}
            >
              Banear
            </button>
          )}
          </>)}
        </div>
      ),
    },
  ]

  if (isLoading) {
    return <div className={styles.loading}>Cargando usuarios...</div>
  }

  if (error && users.length === 0) {
    return (
      <div className={styles.loading}>
        <AlertCircle size={24} />
        <p>{error}</p>
      </div>
    )
  }

  return (
    <div className={styles.container}>
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <div className={styles.header}>
          <div>
            <h1 className={styles.title}>
              <Users size={24} />
              Gestion de Usuarios
            </h1>
            <p className={styles.subtitle}>{users.length} usuarios registrados</p>
          </div>
        </div>
      </motion.div>

      <DataTable
        data={users}
        columns={columns}
        getRowKey={u => u.id}
        searchPlaceholder="Buscar por nombre o email..."
      />

      <ActionModal
        isOpen={modalAction !== null}
        onClose={() => { setModalAction(null); setSelectedUser(null) }}
        onConfirm={confirmAction}
        title={
          modalAction === 'role'
            ? `Cambiar rol de ${selectedUser?.name}`
            : `Cambiar estado de ${selectedUser?.name}`
        }
        description={
          modalAction === 'role'
            ? `El rol cambiara a "${pendingRole}". Esto afecta los permisos del usuario.`
            : `El estado cambiara a "${pendingStatus}".`
        }
        confirmLabel="Confirmar"
        confirmVariant={modalAction === 'status' && pendingStatus === 'banned' ? 'danger' : 'primary'}
      />
    </div>
  )
}

export default UserManagement
