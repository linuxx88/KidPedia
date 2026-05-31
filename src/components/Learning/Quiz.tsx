import React, { useState, useEffect, useCallback, useRef } from 'react'
import { type MedalType, getRandomMessage, getMedalIcon } from '../../utils/quizMessages'
import { type Gender } from '../../utils/helpers'
import { type Labels } from '../../locales/types'
import { useAudioFeedback } from '../../hooks/useAudioFeedback'
import { useSettingsStore } from '../../store/useSettingsStore'
import { useStoryteller } from '../../hooks/useStoryteller'
import { QuizAnswerButton } from './QuizAnswerButton'
import { useProgressionStore } from '../../store/useProgressionStore'
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

  // Synthesized ding sound using native Web Audio API
  const playSynthesizedDing = useCallback(() => {
    const isMuted = useSettingsStore.getState().isMuted
    const isSfxMuted = useSettingsStore.getState().isSfxMuted
    if (isMuted || isSfxMuted) return

    stopStory()

    try {
      const AudioContextClass = window.AudioContext || (window as Window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext
      if (!AudioContextClass) return

      const ctx = new AudioContextClass()
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()

      osc.connect(gain)
      gain.connect(ctx.destination)

      osc.type = 'sine'
      // Crystal clear "ding" bell sound
      osc.frequency.setValueAtTime(1200, ctx.currentTime)
      osc.frequency.exponentialRampToValueAtTime(800, ctx.currentTime + 0.15)

      gain.gain.setValueAtTime(0, ctx.currentTime)
      gain.gain.linearRampToValueAtTime(0.3, ctx.currentTime + 0.02) // Rapid attack
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.8) // Smooth decay

      osc.start(ctx.currentTime)
      osc.stop(ctx.currentTime + 0.8)
    } catch (e: unknown) {
      console.warn('Web Audio API synthesizer failed to play ding sound', e)
    }
  }, [stopStory])

  // Synthesized perfect fanfare sound using native Web Audio API
  const playSynthesizedPerfectFanfare = useCallback(() => {
    const isMuted = useSettingsStore.getState().isMuted
    const isSfxMuted = useSettingsStore.getState().isSfxMuted
    if (isMuted || isSfxMuted) return

    stopStory()

    try {
      const AudioContextClass = window.AudioContext || (window as Window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext
      if (!AudioContextClass) return

      const ctx = new AudioContextClass()
      
      // Ascending major chord notes: C6, E6, G6, C7
      const notes = [1046.50, 1318.51, 1567.98, 2093.00]
      notes.forEach((freq, idx) => {
        const timeOffset = idx * 0.08 // Fast sparkling arpeggio
        const osc = ctx.createOscillator()
        const gain = ctx.createGain()

        osc.connect(gain)
        gain.connect(ctx.destination)

        osc.type = 'sine'
        osc.frequency.setValueAtTime(freq, ctx.currentTime + timeOffset)

        gain.gain.setValueAtTime(0, ctx.currentTime + timeOffset)
        gain.gain.linearRampToValueAtTime(0.2, ctx.currentTime + timeOffset + 0.02)
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + timeOffset + 0.4)

        osc.start(ctx.currentTime + timeOffset)
        osc.stop(ctx.currentTime + timeOffset + 0.4)
      })
    } catch (e: unknown) {
      console.warn('Web Audio API perfect arpeggio failed to play', e)
    }
  }, [stopStory])

  // Synthesized puzzle piece discovery chime using native Web Audio API
  const playSynthesizedPuzzleChime = useCallback(() => {
    const isMuted = useSettingsStore.getState().isMuted
    const isSfxMuted = useSettingsStore.getState().isSfxMuted
    if (isMuted || isSfxMuted) return

    try {
      const AudioContextClass = window.AudioContext || (window as Window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext
      if (!AudioContextClass) return

      const ctx = new AudioContextClass()
      
      // A magical rising sparkling sound: E5 -> G5 -> C6 -> E6
      const freqs = [329.63, 392.00, 523.25, 659.25]
      freqs.forEach((freq, idx) => {
        const timeOffset = idx * 0.12 // fast arpeggio
        const osc = ctx.createOscillator()
        const gain = ctx.createGain()

        osc.connect(gain)
        gain.connect(ctx.destination)

        osc.type = 'triangle' // warmer, puzzle-like sound
        osc.frequency.setValueAtTime(freq, ctx.currentTime + timeOffset)

        gain.gain.setValueAtTime(0, ctx.currentTime + timeOffset)
        gain.gain.linearRampToValueAtTime(0.25, ctx.currentTime + timeOffset + 0.03)
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + timeOffset + 0.5)

        osc.start(ctx.currentTime + timeOffset)
        osc.stop(ctx.currentTime + timeOffset + 0.5)
      })

      // Zero sound leaks: close context when arpeggio ends
      setTimeout(() => {
        ctx.close().catch(() => {});
      }, 1000);
    } catch (e: unknown) {
      console.warn('Web Audio API puzzle chime failed to play', e)
    }
  }, [])

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
  }, [result, categoryKey, playSynthesizedPuzzleChime])

  // Trigger sounds when a result appears
  useEffect(() => {
    if (result) {
      stopStory()
      playSound('success')
      if (result.medal === 'gold') {
        playSynthesizedPerfectFanfare()
      } else {
        playSynthesizedDing()
      }
    }
  }, [result, playSound, stopStory, playSynthesizedPerfectFanfare, playSynthesizedDing])

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
        <span className={styles.quizHeaderIcon}>{anchorIcon || '🧩'}</span>
        <h3 className={styles.quizHeaderTitle}>{labels.quiz.title}</h3>
      </div>

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
            <div className={styles.wizardHelpContainer}>
              <button 
                type="button"
                className={styles.wizardHelpBtn}
                onClick={() => {
                  stopStory()
                  playSound('click')
                  setShowWizardHelp(prev => !prev)
                }}
                data-testid="wizard-help-btn"
              >
                🧙‍♂️ {language === 'fr' ? "Demander l'aide du Magicien" : "Ask the Wizard for help"}
              </button>

              {showWizardHelp && (
                <div className={styles.wizardHelpBox} data-testid="wizard-help-box">
                  <div className={styles.wizardHeader}>
                    <span className={styles.wizardIcon}>✨🧙‍♂️✨</span>
                    <h4 className={styles.wizardTitle}>
                      {language === 'fr' ? "L'astuce magique du Magicien" : "The Wizard's Magic Hint"}
                    </h4>
                  </div>
                  <p 
                    className={styles.wizardText}
                    onClick={handleWizardClick}
                    style={{ 
                      cursor: isMagicWandActive ? 'help' : 'default',
                      textDecoration: isMagicWandActive ? 'underline dotted' : 'none'
                    }}
                  >
                    "{funFact}"
                  </p>
                </div>
              )}
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
          {result.medal === 'gold' && (
            <div className={styles.perfectBanner} data-testid="perfect-banner">
              <span>{labels.quiz.perfectBadge}</span>
            </div>
          )}

          {/* Dynamic QC PASS stamp validation overlay */}
          <div className={styles.qcPassStamp} data-testid="qc-pass-stamp">
            <div className={styles.qcPassTitle}>★ KIDPEDIA ★</div>
            <div className={styles.qcPassBadge}>QC PASS</div>
            <div className={styles.qcPassStatus}>
              {language === 'fr' ? 'APPROUVÉ' : 'APPROVED'}
            </div>
          </div>

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
