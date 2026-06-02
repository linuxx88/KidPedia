import React, { useState, useEffect, useRef } from 'react'
import { type MedalType } from '../../utils/quizMessages'
import { type Gender } from '../../utils/helpers'
import { type Labels } from '../../locales/types'
import { useAudioFeedback } from '../../hooks/useAudioFeedback'
import { useSettingsStore } from '../../store/useSettingsStore'
import { useStoryteller } from '../../hooks/useStoryteller'
import { QuizAnswerButton } from './QuizAnswerButton'
import { QuizHeader } from './QuizHeader'
import { QuizResults } from './QuizResults'
import { WizardHelp } from './WizardHelp'
import { useProgressionStore } from '../../store/useProgressionStore'
import {
  playSynthesizedDing,
  playSynthesizedPerfectFanfare,
  playSynthesizedPuzzleChime
} from '../../utils/quizAudioSynth'
import styles from './Quiz.module.css'

interface QuizProps {
  readonly question: string
  readonly options: string[]
  readonly onAnswer: (index: number) => void
  readonly result: { medal: MedalType } | null
  readonly gender: Gender
  readonly retryMsg: string | null
  readonly activeHint: string | null
  readonly onReview: () => void
  readonly labels: Labels
  readonly attempts: number
  readonly funFact: string
  readonly anchorIcon?: string
  readonly categoryKey?: string
}

export const QuizComponent: React.FC<QuizProps> = ({ 
  question, 
  options, 
  onAnswer, 
  result, 
  gender, 
  retryMsg,
  activeHint,
  onReview,
  labels,
  attempts,
  funFact,
  anchorIcon,
  categoryKey,
}) => {
  const { playSound } = useAudioFeedback()
  const { language } = useSettingsStore()
  const [showWizardHelp, setShowWizardHelp] = useState(false)
  const optionClasses = [styles.optionA, styles.optionB, styles.optionC]

  const {
    speak,
    stopStory,
    isMagicWandActive,
  } = useStoryteller()

  const [prevQuestion, setPrevQuestion] = useState(question)

  if (question !== prevQuestion) {
    setPrevQuestion(question)
  }

  // Stop storyteller speech when the question changes
  useEffect(() => {
    stopStory()
  }, [question, stopStory])

  const hasAwardedPiece = useRef(false)

  // Award puzzle piece on quiz success (result set)
  useEffect(() => {
    if (!result) {
      hasAwardedPiece.current = false
      return
    }

    if (result && categoryKey && !hasAwardedPiece.current) {
      hasAwardedPiece.current = true
      const awardResult = useProgressionStore.getState().awardPuzzlePiece(categoryKey)
      if (awardResult.success && awardResult.isNew) {
        // Trigger the native Web Audio API success chime upon piece discovery without creating rogue sound leaks
        playSynthesizedPuzzleChime()
      }
    }
  }, [result, categoryKey])

  // Trigger sounds when a result appears
  useEffect(() => {
    if (result) {
      stopStory()
      playSound('success')
      if (result.medal === 'gold') {
        playSynthesizedPerfectFanfare(stopStory)
      } else {
        playSynthesizedDing(stopStory)
      }
    }
  }, [result, playSound, stopStory])

  const handleAnswerClick = (index: number) => {
    stopStory()
    playSound('click')
    onAnswer(index)
  }

  const handleQuestionClick = (e: React.MouseEvent) => {
    if (isMagicWandActive) {
      e.stopPropagation()
      stopStory()
      speak(question)
    }
  }

  const handleHintClick = (e: React.MouseEvent) => {
    if (isMagicWandActive && activeHint) {
      e.stopPropagation()
      stopStory()
      speak(activeHint)
    }
  }

  const handleWizardClick = (e: React.MouseEvent) => {
    if (isMagicWandActive) {
      e.stopPropagation()
      stopStory()
      speak(funFact)
    }
  }


  return (
    <div className={styles.quizContainer}>
      <QuizHeader anchorIcon={anchorIcon} title={labels.quiz.title} />

      {!result ? (
        <div className={styles.quizBody}>
          <div className={styles.questionContainer}>
            <p 
              className={styles.quizQuestion} 
              data-testid="quiz-question"
              onClick={handleQuestionClick}
              style={{ 
                cursor: isMagicWandActive ? 'help' : 'default',
                textDecoration: isMagicWandActive ? 'underline dotted' : 'none'
              }}
            >
              {question}
            </p>
          </div>

          <div className={styles.optionsGrid}>
            {options.map((opt, i) => (
              <QuizAnswerButton
                key={i}
                text={opt}
                index={i}
                className={optionClasses[i]}
                letter={['A', 'B', 'C'][i]}
                onClick={() => handleAnswerClick(i)}
              />
            ))}
          </div>

          {activeHint && (
            <div className={styles.hintBox}>
              <h4 className={styles.hintTitle}>{labels.quiz.hintTitle}</h4>
              <p 
                className={styles.hintText}
                onClick={handleHintClick}
                style={{ 
                  cursor: isMagicWandActive ? 'help' : 'default',
                  textDecoration: isMagicWandActive ? 'underline dotted' : 'none'
                }}
              >
                {activeHint}
              </p>
            </div>
          )}

          {attempts >= 4 && (
            <WizardHelp
              language={language}
              showWizardHelp={showWizardHelp}
              setShowWizardHelp={setShowWizardHelp}
              isMagicWandActive={isMagicWandActive}
              funFact={funFact}
              handleWizardClick={handleWizardClick}
              playSound={playSound}
              stopStory={stopStory}
            />
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
        <QuizResults
          result={result}
          gender={gender}
          labels={labels}
          language={language}
        />
      )}
    </div>
  )
}
