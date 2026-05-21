import { useEffect } from 'react'
import { type MedalType, getRandomMessage, getMedalIcon } from '../../utils/quizMessages'
import { type Gender } from '../../utils/helpers'
import { type Labels } from '../../locales/types'
import { useAudioFeedback } from '../../hooks/useAudioFeedback'
import styles from './Quiz.module.css'

interface QuizProps {
  question: string
  options: string[]
  onAnswer: (index: number) => void
  result: { medal: MedalType } | null
  gender: Gender
  retryMsg: string | null
  activeHint: string | null
  onReview: () => void
  labels: Labels
}

export const QuizComponent = ({ 
  question, 
  options, 
  onAnswer, 
  result, 
  gender, 
  retryMsg,
  activeHint,
  onReview,
  labels 
}: QuizProps) => {
  const { playSound } = useAudioFeedback()
  const optionClasses = [styles.optionA, styles.optionB, styles.optionC]

  // Déclencher le son de victoire quand un résultat apparaît
  useEffect(() => {
    if (result) {
      playSound('success')
    }
  }, [result, playSound])

  const handleAnswerClick = (index: number) => {
    playSound('click')
    onAnswer(index)
  }

  const medalStyles = {
    gold: {
      bg: 'bg-gold-gradient',
      text: 'text-white',
      label: labels.quiz.goldMedal,
    },
    silver: {
      bg: 'bg-silver-gradient',
      text: 'text-white',
      label: labels.quiz.silverMedal,
    },
    bronze: {
      bg: 'bg-bronze-gradient',
      text: 'text-white',
      label: labels.quiz.bronzeMedal,
    },
  }

  return (
    <div className={styles.quizContainer}>
      <div className={styles.quizHeader}>
        <span className={styles.quizHeaderIcon}>🧩</span>
        <h3 className={styles.quizHeaderTitle}>{labels.quiz.title}</h3>
      </div>

      {!result ? (
        <div className={styles.quizBody}>
          <p className={styles.quizQuestion} data-testid="quiz-question">{question}</p>
          <div className={styles.optionsGrid}>
            {options.map((opt, i) => (
              <button
                key={i}
                className={`${styles.quizOption} ${optionClasses[i]}`}
                onClick={() => handleAnswerClick(i)}
                aria-label={`Réponse ${['A', 'B', 'C'][i]} : ${opt}`}
                data-testid={`quiz-option-${i}`}
              >
                <div className={styles.quizOptionLetter}>{['A', 'B', 'C'][i]}</div>
                <span className={styles.optionText}>{opt}</span>
              </button>
            ))}
          </div>

          {activeHint && (
            <div className={styles.hintBox}>
              <h4 className={styles.hintTitle}>{labels.quiz.hintTitle}</h4>
              <p className={styles.hintText}>{activeHint}</p>
              <button 
                className={styles.hintAudioBtn}
                onClick={() => {
                  playSound('click');
                  const utterance = new SpeechSynthesisUtterance(activeHint);
                  window.speechSynthesis.speak(utterance);
                }}
              >
                🔊 {labels.common.listen}
              </button>
            </div>
          )}

          {retryMsg && !activeHint && (
            <div className={styles.retryBox}>
              {retryMsg}
            </div>
          )}

          {retryMsg && (
            <button className={styles.reviewBtn} onClick={onReview}>
              {labels.quiz.reviewAction}
            </button>
          )}
        </div>
      ) : (
        <div
          className={styles.resultBox}
          data-medal={result.medal}
        >
          <div className={styles.resultContent}>
            <div className={styles.resultIcon}>
              {getMedalIcon(result.medal)}
            </div>
            <h4 className={styles.resultTitle}>
              {getRandomMessage(result.medal, gender, labels)}
            </h4>
            <div className={styles.resultBadge}>
              {labels.quiz.winMessage(medalStyles[result.medal].label)}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
