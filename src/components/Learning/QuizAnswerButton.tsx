import React from 'react'
import { useSettingsStore } from '../../store/useSettingsStore'
import styles from './Quiz.module.css'

interface QuizAnswerButtonProps {
  readonly text: string
  readonly index: number
  readonly className: string
  readonly letter: string
  readonly onClick: () => void
  readonly isSpeaking: boolean
  readonly onToggleSpeak: () => void
}

export const QuizAnswerButton: React.FC<QuizAnswerButtonProps> = ({
  text,
  index,
  className,
  letter,
  onClick,
  isSpeaking,
  onToggleSpeak,
}) => {
  const { language } = useSettingsStore()

  const handleSpeak = (e: React.MouseEvent<HTMLButtonElement>): void => {
    e.stopPropagation()
    onToggleSpeak()
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>): void => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      onClick()
    }
  }

  const ariaLabelText = language === 'fr'
    ? `Réponse ${letter} : ${text}`
    : `Answer ${letter}: ${text}`

  const speakerAriaLabel = language === 'fr'
    ? 'Écouter la réponse'
    : 'Listen to answer'

  return (
    <div
      role="button"
      tabIndex={0}
      className={`${styles.quizOption} ${className}`}
      onClick={onClick}
      onKeyDown={handleKeyDown}
      aria-label={ariaLabelText}
      data-testid={`quiz-option-${index}`}
      style={{ position: 'relative' }}
    >
      <div className={styles.quizOptionLetter}>{letter}</div>
      <div className={styles.optionContentWrapper}>
        <span className={styles.optionText}>{text}</span>
      </div>

      <button
        type="button"
        className={`${styles.cornerSpeaker} ${isSpeaking ? styles.cornerSpeakerActive : ''}`}
        onClick={handleSpeak}
        aria-label={speakerAriaLabel}
        title={speakerAriaLabel}
      >
        <span role="img" aria-hidden="true">
          {isSpeaking ? '🔊' : '🔈'}
        </span>
      </button>
    </div>
  )
}
