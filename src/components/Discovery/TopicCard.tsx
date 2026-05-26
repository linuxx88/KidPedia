import { forwardRef, useState, useEffect } from 'react'
import { useOfflineAvailability } from '../../hooks/useOfflineAvailability'
import { useSettingsStore } from '../../store/useSettingsStore'
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

    const isAvailableOffline = useOfflineAvailability(id)
    const [isOnline, setIsOnline] = useState<boolean>(
      typeof navigator !== 'undefined' ? navigator.onLine : true
    )

    useEffect(() => {
      const handleStatus = () => {
        setIsOnline(navigator.onLine)
      }
      window.addEventListener('online', handleStatus)
      window.addEventListener('offline', handleStatus)
      return () => {
        window.removeEventListener('online', handleStatus)
        window.removeEventListener('offline', handleStatus)
      }
    }, [])

    const language = useSettingsStore(state => state.language)
    const isOfflineAndUnavailable = !isOnline && !isAvailableOffline
    const isDisabled = !isUnlocked || isOfflineAndUnavailable

    const offlineHint = language === 'fr' ? 'Non disponible hors-ligne' : 'Not available offline'
    const statusDesc = !isUnlocked
      ? '. Verrouillé'
      : isOfflineAndUnavailable
      ? `. ${offlineHint}`
      : ''
    const medalDesc = isDiscovered ? '. Médaille obtenue' : ''
    const ariaLabelValue = `${title}. ${description}${statusDesc}${medalDesc}`

    return (
      <button
        ref={ref}
        className={`${styles.topicCard} ${!isUnlocked ? styles.locked : ''} ${
          isOfflineAndUnavailable ? styles.offline : ''
        } ${className}`}
        data-category={categoryKey.toLowerCase()}
        data-testid={`topic-card-${id}`}
        style={{ '--delay': `${index * 100}ms` } as React.CSSProperties}
        onClick={isDisabled ? undefined : onClick}
        disabled={isDisabled}
        aria-label={ariaLabelValue}
      >
        {categoryLabel && (
          <div className={styles.categoryLabel}>
            {categoryLabel}
          </div>
        )}

        {isDiscovered && medalIcon && isUnlocked && !isOfflineAndUnavailable && (
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

        {isOfflineAndUnavailable && isUnlocked && (
          <div className={styles.offlineOverlay} data-testid="offline-badge">
            <span aria-hidden="true">☁️🚫</span>
          </div>
        )}

        <div className={styles.iconWrapper}>
          <span aria-hidden="true">
            {icon}
          </span>
        </div>

        <h3 className={styles.title}>{title}</h3>
        <p className={styles.description}>{description}</p>

        {!isDisabled && (
          <div className={styles.discoverHint}>
            <span>{exploreLabel}</span>
          </div>
        )}
      </button>
    )
  },
)

TopicCard.displayName = 'TopicCard'
