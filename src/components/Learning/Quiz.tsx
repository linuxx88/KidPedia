import { useState, useEffect } from 'react'
import { type MedalType, getRandomMessage, getMedalIcon } from '../../utils/quizMessages'
import { type Gender } from '../../utils/helpers'
import { type Labels } from '../../locales/types'
import { useAudioFeedback } from '../../hooks/useAudioFeedback'
import { useSettingsStore } from '../../store/useSettingsStore'
import { DiscreteSpeaker } from './TopicDetail'
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
  attempts: number
  funFact: string
  anchorIcon?: string
  onSpeakText?: (text: string, id: string) => void
  activeSpeechId?: string | null
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
  labels,
  attempts,
  funFact,
  anchorIcon,
  onSpeakText,
  activeSpeechId,
}: QuizProps) => {
  const { playSound } = useAudioFeedback()
  const { language } = useSettingsStore()
  const [showWizardHelp, setShowWizardHelp] = useState(false)
  const optionClasses = [styles.optionA, styles.optionB, styles.optionC]

  // Synthesized ding sound using native Web Audio API
  const playSynthesizedDing = () => {
    const isMuted = useSettingsStore.getState().isMuted
    if (isMuted) return

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
    } catch (e) {
      console.warn('Web Audio API synthesizer failed to play ding sound', e)
    }
  }

  // Trigger sounds when a result appears
  useEffect(() => {
    if (result) {
      playSound('success')
      playSynthesizedDing()
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
        <span className={styles.quizHeaderIcon}>{anchorIcon || '🧩'}</span>
        <h3 className={styles.quizHeaderTitle}>{labels.quiz.title}</h3>
      </div>

      {!result ? (
        <div className={styles.quizBody}>
          <div className={styles.questionContainer}>
            <p className={styles.quizQuestion} data-testid="quiz-question">{question}</p>
            {onSpeakText && (
              <DiscreteSpeaker
                isSpeaking={activeSpeechId === 'quiz-question'}
                onClick={(e) => {
                  e.stopPropagation()
                  onSpeakText(question, 'quiz-question')
                }}
                label={language === 'fr' ? 'Écouter la question' : 'Listen to question'}
              />
            )}
          </div>

          <div className={styles.optionsGrid}>
            {options.map((opt, i) => (
              <div
                key={i}
                role="button"
                tabIndex={0}
                className={`${styles.quizOption} ${optionClasses[i]}`}
                onClick={() => handleAnswerClick(i)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault()
                    handleAnswerClick(i)
                  }
                }}
                aria-label={`Réponse ${['A', 'B', 'C'][i]} : ${opt}`}
                data-testid={`quiz-option-${i}`}
              >
                <div className={styles.quizOptionLetter}>{['A', 'B', 'C'][i]}</div>
                <div className={styles.optionContentWrapper}>
                  <span className={styles.optionText}>{opt}</span>
                  {onSpeakText && (
                    <DiscreteSpeaker
                      isSpeaking={activeSpeechId === `quiz-option-${i}`}
                      onClick={(e) => {
                        e.stopPropagation()
                        onSpeakText(opt, `quiz-option-${i}`)
                      }}
                      label={language === 'fr' ? `Écouter l'option ${['A', 'B', 'C'][i]}` : `Listen to option ${['A', 'B', 'C'][i]}`}
                    />
                  )}
                </div>
              </div>
            ))}
          </div>

          {activeHint && (
            <div className={styles.hintBox}>
              <h4 className={styles.hintTitle}>{labels.quiz.hintTitle}</h4>
              <p className={styles.hintText}>{activeHint}</p>
              <button 
                type="button"
                className={styles.hintAudioBtn}
                onClick={() => {
                  playSound('click')
                  if (onSpeakText) {
                    onSpeakText(activeHint, 'hint')
                  } else {
                    const utterance = new SpeechSynthesisUtterance(activeHint)
                    utterance.lang = language === 'fr' ? 'fr-FR' : 'en-US'
                    window.speechSynthesis.speak(utterance)
                  }
                }}
              >
                🔊 {labels.common.listen}
              </button>
            </div>
          )}

          {attempts >= 4 && (
            <div className={styles.wizardHelpContainer}>
              <button 
                type="button"
                className={styles.wizardHelpBtn}
                onClick={() => {
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
                  <p className={styles.wizardText}>"{funFact}"</p>
                  
                  <button 
                    type="button"
                    className={styles.wizardAudioBtn}
                    onClick={() => {
                      playSound('click')
                      if (onSpeakText) {
                        onSpeakText(funFact, 'wizard-help')
                      } else if ('speechSynthesis' in window) {
                        window.speechSynthesis.cancel()
                        const utterance = new SpeechSynthesisUtterance(funFact)
                        utterance.lang = language === 'fr' ? 'fr-FR' : 'en-US'
                        utterance.rate = 0.95
                        window.speechSynthesis.speak(utterance)
                      }
                    }}
                  >
                    🔊 {labels.common.listen}
                  </button>
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

