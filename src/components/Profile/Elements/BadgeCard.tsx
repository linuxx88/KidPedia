import React from 'react'
import styles from '../BadgesPage.module.css'

interface BadgeCardProps {
  icon: string
  title: string
  description?: string
  earned: boolean
  medalOverlay?: React.ReactNode
  onClick: () => void
  category: string
  animationDelay?: string
  ariaLabel: string
}

export function BadgeCard({
  icon,
  title,
  description,
  earned,
  medalOverlay,
  onClick,
  category,
  animationDelay,
  ariaLabel,
}: BadgeCardProps) {
  return (
    <button
      className={`${styles.badgeItem} ${earned ? styles.earned : styles.locked}`}
      onClick={onClick}
      data-category={category}
      style={animationDelay ? { animationDelay } as React.CSSProperties : {}}
      aria-label={ariaLabel}
    >
      <div className={styles.badgeIconWrapper}>
        <span className={styles.badgeIcon}>{icon}</span>
        {earned && medalOverlay && (
          <span className={styles.medalOverlay}>{medalOverlay}</span>
        )}
      </div>
      <p className={styles.badgeName}>{title}</p>
      {description && <p className={styles.badgeDesc}>{description}</p>}
    </button>
  )
}
