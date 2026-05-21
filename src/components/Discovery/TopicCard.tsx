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
    } = props

    return (
      <button
        ref={ref}
        className={`${styles.topicCard} ${className}`}
        data-category={categoryKey.toLowerCase()}
        data-testid={`topic-card-${id}`}
        style={{ '--delay': `${index * 100}ms` } as React.CSSProperties}
        onClick={onClick}
        aria-label={`${title}. ${description}${isDiscovered ? '. Médaille obtenue' : ''}`}
      >
        {categoryLabel && (
          <div className={styles.categoryLabel}>
            {categoryLabel}
          </div>
        )}

        {isDiscovered && medalIcon && (
          <div className={styles.medalOverlay} data-testid="medal-badge">
            <span aria-hidden="true">
              {medalIcon}
            </span>
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
          <span>{exploreLabel}</span>
        </div>
      </button>
    )
  },
)

TopicCard.displayName = 'TopicCard'
