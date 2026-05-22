import { forwardRef } from 'react'
import styles from './TopicCard.module.css'

interface TopicCardProps {
  id: string
  title: string
  description: string
  icon: string
  categoryKey: string
  exploreLabel: string
  isDiscovered?: boolean
  medalIcon?: string
  onClick: () => void
  className?: string
  categoryLabel?: string
  index?: number
  isUnlocked?: boolean
}

export const TopicCard = forwardRef<HTMLButtonElement, TopicCardProps>(
  function TopicCard(props, ref) {
    const {
      id,
      title,
      description,
      icon,
      categoryKey,
      exploreLabel,
      isDiscovered,
      medalIcon,
      onClick,
      className = '',
      categoryLabel,
      index = 0,
      isUnlocked = true,
    } = props

    return (
      <button
        ref={ref}
        className={`${styles.topicCard} ${!isUnlocked ? styles.locked : ''} ${className}`}
        data-category={categoryKey.toLowerCase()}
        data-testid={`topic-card-${id}`}
        style={{ '--delay': `${index * 100}ms` } as React.CSSProperties}
        onClick={isUnlocked ? onClick : undefined}
        disabled={!isUnlocked}
        aria-label={`${title}. ${description}${!isUnlocked ? '. Verrouillé' : ''}${isDiscovered ? '. Médaille obtenue' : ''}`}
      >
        {categoryLabel && (
          <div className={styles.categoryLabel}>
            {categoryLabel}
          </div>
        )}

        {isDiscovered && medalIcon && isUnlocked && (
          <div className={styles.medalOverlay} data-testid="medal-badge">
            <span aria-hidden="true">
              {medalIcon}
            </span>
          </div>
        )}

        {!isUnlocked && (
          <div className={styles.lockOverlay} data-testid="lock-badge">
            <span aria-hidden="true">🔒</span>
          </div>
        )}

        <div className={styles.iconWrapper}>
          <span aria-hidden="true">
            {icon}
          </span>
        </div>

        <h3 className={styles.title}>{title}</h3>
        <p className={styles.description}>{description}</p>

        <div className={styles.discoverHint}>
          <span>{isUnlocked ? exploreLabel : '🔒'}</span>
        </div>
      </button>
    )
  },
)

TopicCard.displayName = 'TopicCard'
