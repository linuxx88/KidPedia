import { useMemo } from 'react'
import styles from './AnimatedBackground.module.css'

export function AnimatedBackground() {
  const bubbles = useMemo(() => {
    return Array.from({ length: 20 }).map((_, i) => {
      const size = ((i * 17) % 45) + 20
      const left = ((i * 13.7) % 90) + 5
      const duration = ((i * 4.3) % 15) + 12
      const delay = ((i * 3.1) % 12)
      const xDrift = ((i * 29) % 120) - 60
      
      return {
        id: i,
        style: {
          '--size': `${size}px`,
          '--left': `${left}%`,
          '--duration': `${duration}s`,
          '--delay': `${delay}s`,
          '--x-drift': `${xDrift}px`,
        } as React.CSSProperties,
      }
    })
  }, [])

  return (
    <div className={styles.animatedBg} aria-hidden="true">
      {bubbles.map((bubble) => (
        <div
          key={bubble.id}
          className={styles.bubble}
          style={bubble.style}
        />
      ))}
    </div>
  )
}
