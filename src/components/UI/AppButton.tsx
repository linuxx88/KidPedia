import React from 'react'
import styles from './AppButton.module.css'

interface AppButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
  variant?: 'primary' | 'secondary' | 'outline' | 'glass'
  className?: string
  icon?: React.ReactNode
}

export const AppButton: React.FC<AppButtonProps> = ({
  onClick,
  children,
  variant = 'primary',
  className = '',
  style = {},
  type = 'button',
  icon,
  ...props
}) => {
  return (
    <button
      {...props}
      type={type}
      className={`${styles.btn} ${styles[variant]} ${className}`}
      onClick={onClick}
      style={style}
    >
      {icon && <span className={styles.iconWrapper}>{icon}</span>}
      {children}
    </button>
  )
}
