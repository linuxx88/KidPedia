import { useMemo } from 'react'
import styles from './StarBackground.module.css'

interface StarBackgroundProps {
  count?: number
}

export function StarBackground({ count = 50 }: StarBackgroundProps) {
  const stars = useMemo(
    () =>
      Array.from({ length: count }).map((_, i) => {
        // Deterministic pseudo-random values based on index
        const top = (i * 137.508) % 100
        const left = (i * 255.172) % 100
        const size = ((i * 7.13) % 3) + 1
        const duration = ((i * 3.45) % 3) + 2

        return {
          id: i,
          top: `${top}%`,
          left: `${left}%`,
          size: `${size}px`,
          duration: `${duration}s`,
        }
      }),
    [count],
  )

  return (
    <div className={styles.starField} aria-hidden="true">
      {stars.map((s) => (
        <div
          key={s.id}
          className={styles.star}
          style={
            {
              top: s.top,
              left: s.left,
              width: s.size,
              height: s.size,
              '--duration': s.duration,
            } as React.CSSProperties
          }
        ></div>
      ))}
    </div>
  )
}
