import React, { useState, useRef, useCallback, useEffect } from 'react'
import styles from './ParallaxTopicCard.module.css'

interface ParallaxTopicCardProps {
  id: string
  title: string
  description: string
  icon: string
  categoryKey: string
  exploreLabel: string
  isDiscovered?: boolean
  medalIcon?: string
  onClick: () => void
  categoryLabel?: string
  index?: number
  isUnlocked?: boolean
}

export const ParallaxTopicCard: React.FC<ParallaxTopicCardProps> = ({
  id,
  title,
  description,
  icon,
  categoryKey,
  exploreLabel,
  isDiscovered = false,
  medalIcon,
  onClick,
  categoryLabel,
  index = 0,
  isUnlocked = true,
}) => {
  const cardRef = useRef<HTMLDivElement | null>(null)
  
  // États de performance : détection de visibilité et d'économie de mouvement
  const [isInViewport, setIsInViewport] = useState(true)
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(() => {
    if (typeof window !== 'undefined' && typeof window.matchMedia === 'function') {
      return window.matchMedia('(prefers-reduced-motion: reduce)').matches
    }
    return false
  })

  // 3D tilt styles state
  const [style, setStyle] = useState<React.CSSProperties>({
    transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg)',
    transition: 'transform 0.5s cubic-bezier(0.25, 1, 0.5, 1), box-shadow 0.5s ease',
    boxShadow: 'var(--shadow-md)',
  })

  // 1. Détection de reduced motion (A11y)
  useEffect(() => {
    if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') {
      return
    }
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches)
    
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handler)
      return () => mediaQuery.removeEventListener('change', handler)
    } else {
      mediaQuery.addListener(handler)
      return () => mediaQuery.removeListener(handler)
    }
  }, [])

  // 2. Détection de visibilité Viewport (IntersectionObserver)
  useEffect(() => {
    const card = cardRef.current
    if (!card || typeof IntersectionObserver === 'undefined') {
      return
    }

    const observer = new IntersectionObserver(([entry]) => {
      setIsInViewport(entry.isIntersecting)
    }, {
      threshold: 0.05 // Active dès que 5% de la carte est dans le viewport
    })

    observer.observe(card)
    return () => {
      observer.disconnect()
    }
  }, [])

  const handlePointerMove = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    // Évite tout calcul si la carte est verrouillée, hors de l'écran ou si l'animation est désactivée
    if (!isUnlocked || prefersReducedMotion || !isInViewport) return

    const card = cardRef.current
    if (!card) return

    const rect = card.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    const centerX = rect.width / 2
    const centerY = rect.height / 2

    // Max rotation is 8 degrees to prevent nausea
    const maxRotation = 8
    const rotateY = ((x - centerX) / centerX) * maxRotation
    const rotateX = -((y - centerY) / centerY) * maxRotation

    // Dynamic shadow shift based on tilt
    const shadowX = ((x - centerX) / centerX) * 12
    const shadowY = ((y - centerY) / centerY) * 12

    setStyle({
      transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`,
      boxShadow: `${shadowX}px ${shadowY}px 20px rgba(0, 0, 0, 0.12), var(--shadow-lg)`,
      transition: 'transform 0.1s cubic-bezier(0.25, 1, 0.5, 1), box-shadow 0.1s ease',
      willChange: 'transform, box-shadow',
    })
  }, [isUnlocked, prefersReducedMotion, isInViewport])

  const handlePointerLeave = useCallback(() => {
    setStyle({
      transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)',
      boxShadow: 'var(--shadow-md)',
      transition: 'transform 0.5s cubic-bezier(0.25, 1, 0.5, 1), box-shadow 0.5s ease',
    })
  }, [])

  const cardClasses = [
    styles.parallaxCard,
    !isUnlocked ? styles.locked : '',
  ].join(' ')

  return (
    <div
      ref={cardRef}
      className={cardClasses}
      style={{
        ...style,
        '--delay': `${index * 80}ms`,
      } as React.CSSProperties}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      data-category={categoryKey.toLowerCase()}
    >
      <button
        className={styles.cardInteractiveArea}
        onClick={isUnlocked ? onClick : undefined}
        disabled={!isUnlocked}
        aria-label={`${title}. ${description}${!isUnlocked ? '. Verrouillé' : ''}${isDiscovered ? '. Médaille obtenue' : ''}`}
        data-testid={`topic-card-${id}`}
      >
        <div className={styles.foreGround}>
          {categoryLabel && (
            <div className={styles.categoryLabel}>
              {categoryLabel}
            </div>
          )}

          {isDiscovered && medalIcon && isUnlocked && (
            <div className={styles.medalOverlay} data-testid="medal-badge">
              <span aria-hidden="true">{medalIcon}</span>
            </div>
          )}

          {!isUnlocked && (
            <div className={styles.lockOverlay} data-testid="lock-badge">
              <span aria-hidden="true">🔒</span>
            </div>
          )}

          <h3 className={styles.title}>{title}</h3>
          <p className={styles.description}>{description}</p>

          {isUnlocked && (
            <div className={styles.discoverHint}>
              <span>{exploreLabel}</span>
            </div>
          )}
        </div>

        <div className={styles.backGround}>
          <div className={styles.iconWrapper}>
            <span className={styles.parallaxIcon} aria-hidden="true">
              {icon}
            </span>
          </div>
        </div>
      </button>
    </div>
  )
}
