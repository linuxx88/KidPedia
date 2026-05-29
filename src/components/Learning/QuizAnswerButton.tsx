import React from 'react'
import { useSettingsStore } from '../../store/useSettingsStore'
import { useStoryteller } from '../../hooks/useStoryteller'
import styles from './Quiz.module.css'

interface QuizAnswerButtonProps {
  readonly text: string
  readonly index: number
  readonly className: string
  readonly letter: string
  readonly onClick: () => void
}

export const QuizAnswerButton: React.FC<QuizAnswerButtonProps> = ({
  text,
  index,
  className,
  letter,
  onClick,
}) => {
  const { language } = useSettingsStore()
  const { isMagicWandActive, speak, stopStory } = useStoryteller()

  const handleContainerClick = (e: React.MouseEvent<HTMLDivElement>): void => {
    if (isMagicWandActive) {
      e.stopPropagation()
      stopStory()
      speak(text)
    } else {
      onClick()
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>): void => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      if (isMagicWandActive) {
        stopStory()
        speak(text)
      } else {
        onClick()
      }
    }
  }

  const ariaLabelText = language === 'fr'
    ? `Réponse ${letter} : ${text}`
    : `Answer ${letter}: ${text}`

  return (
    <div
      role="button"
      tabIndex={0}
      className={`${styles.quizOption} ${className}`}
      onClick={handleContainerClick}
      onKeyDown={handleKeyDown}
      aria-label={ariaLabelText}
      data-testid={`quiz-option-${index}`}
      style={{ 
        position: 'relative', 
        cursor: isMagicWandActive ? 'help' : 'pointer' 
      }}
    >
      <div className={styles.quizOptionLetter}>{letter}</div>
      <div className={styles.optionContentWrapper}>
        <span 
          className={styles.optionText}
          style={{ textDecoration: isMagicWandActive ? 'underline dotted' : 'none' }}
        >
          {text}
        </span>
      </div>
    </div>
  )
}
