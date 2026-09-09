import React from 'react'
import { motion } from 'framer-motion'
import { Heart } from 'lucide-react'
import styles from './SupportButton.module.css'

interface SupportButtonProps {
  count: number
  isSupported: boolean
  onToggle: () => void
  disabled?: boolean
}

const SupportButton: React.FC<SupportButtonProps> = ({ count, isSupported, onToggle, disabled }) => {
  return (
    <motion.button
      className={`${styles.button} ${isSupported ? styles.active : ''}`}
      onClick={onToggle}
      disabled={disabled}
      whileTap={{ scale: 0.9 }}
      aria-label={isSupported ? 'Quitar apoyo' : 'Dar apoyo'}
    >
      <Heart size={16} fill={isSupported ? 'currentColor' : 'none'} />
      <span>{count}</span>
    </motion.button>
  )
}

export default SupportButton
