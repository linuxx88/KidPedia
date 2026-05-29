import React from 'react'
import { useSettingsStore } from '../../store/useSettingsStore'
import { useStoryteller } from '../../hooks/useStoryteller'
import styles from './StorytellerButton.module.css'

export interface StorytellerButtonProps {
  readonly className?: string
}

export const StorytellerButton: React.FC<StorytellerButtonProps> = ({
  className = '',
}) => {
  const language = useSettingsStore((state) => state.language)
  const { isMagicWandActive, isSpeaking, toggleMagicWand } = useStoryteller()

  const isSupported = typeof window !== 'undefined' && typeof speechSynthesis !== 'undefined'

  const getAriaLabel = (): string => {
    if (!isSupported) {
      return language === 'fr'
        ? 'Lecture vocale non supportée sur ce navigateur'
        : 'Speech synthesis not supported on this browser'
    }
    if (isMagicWandActive) {
      return language === 'fr'
        ? "Désactiver la baguette magique (Hibou)"
        : 'Deactivate magic wand'
    }
    return language === 'fr'
      ? "Activer la baguette magique (Hibou)"
      : 'Activate magic wand'
  }

  const getTitle = (): string => {
    if (!isSupported) {
      return language === 'fr' ? 'Non compatible' : 'Not supported'
    }
    if (isMagicWandActive) {
      return language === 'fr' ? 'Baguette Magique Active' : 'Magic Wand Active'
    }
    return language === 'fr' ? 'Activer la Baguette Magique' : 'Activate Magic Wand'
  }

  return (
    <div className={`${styles.container} ${className}`}>
      {/* Animated background waves when speaking */}
      {isSupported && isSpeaking && (
        <>
          <div className={styles.pulseWave} data-testid="pulse-wave-1" />
          <div className={styles.pulseWaveSecond} data-testid="pulse-wave-2" />
        </>
      )}

      <button
        type="button"
        disabled={!isSupported}
        onClick={toggleMagicWand}
        className={`${styles.storytellerBtn} ${isMagicWandActive ? styles.speaking : ''}`}
        title={getTitle()}
        aria-label={getAriaLabel()}
        aria-pressed={isMagicWandActive}
      >
        {/* Playful wizard/storyteller owl mascot */}
        <span className={styles.mascot} role="img" aria-hidden="true">
          {!isSupported ? '🦉🚫' : isMagicWandActive ? '🧙‍♂️✨' : '🦉'}
        </span>
      </button>

      {/* Floating sparkles when speaking */}
      {isSupported && isSpeaking && (
        <span className={styles.sparkles} role="img" aria-hidden="true" data-testid="sparkles">
          ✨
        </span>
      )}
    </div>
  )
}
