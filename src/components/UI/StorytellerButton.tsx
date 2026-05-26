import React from 'react'
import { useSettingsStore } from '../../store/useSettingsStore'
import styles from './StorytellerButton.module.css'

export interface StorytellerButtonProps {
  isSpeaking: boolean
  isSupported: boolean
  onToggle: () => void
  className?: string
}

export const StorytellerButton: React.FC<StorytellerButtonProps> = ({
  isSpeaking,
  isSupported,
  onToggle,
  className = '',
}) => {
  const language = useSettingsStore((state) => state.language)

  const getAriaLabel = (): string => {
    if (!isSupported) {
      return language === 'fr'
        ? 'Lecture vocale non supportée sur ce navigateur'
        : 'Speech synthesis not supported on this browser'
    }
    if (isSpeaking) {
      return language === 'fr'
        ? "Arrêter la lecture vocale de l'histoire"
        : 'Stop reading the story'
    }
    return language === 'fr'
      ? "Lancer la lecture vocale de l'histoire"
      : 'Start reading the story'
  }

  const getTitle = (): string => {
    if (!isSupported) {
      return language === 'fr' ? 'Non compatible' : 'Not supported'
    }
    if (isSpeaking) {
      return language === 'fr' ? 'Arrêter' : 'Stop'
    }
    return language === 'fr' ? 'Écouter' : 'Listen'
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
        onClick={onToggle}
        className={`${styles.storytellerBtn} ${isSpeaking ? styles.speaking : ''}`}
        title={getTitle()}
        aria-label={getAriaLabel()}
        aria-pressed={isSpeaking}
      >
        {/* Playful wizard/storyteller owl mascot */}
        <span className={styles.mascot} role="img" aria-hidden="true">
          {!isSupported ? '🦉🚫' : isSpeaking ? '🧙‍♂️✨' : '🦉'}
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
