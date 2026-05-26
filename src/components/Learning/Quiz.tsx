import { useState, useEffect } from 'react'
import { type MedalType, getRandomMessage, getMedalIcon } from '../../utils/quizMessages'
import { type Gender } from '../../utils/helpers'
import { type Labels } from '../../locales/types'
import { useAudioFeedback } from '../../hooks/useAudioFeedback'
import { useSettingsStore } from '../../store/useSettingsStore'
import { DiscreteSpeaker } from './TopicView'
import { useStoryteller } from '../../hooks/useStoryteller'
import { StorytellerButton } from '../UI/StorytellerButton'
import { QuizAnswerButton } from './QuizAnswerButton'
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

  // Hook Storyteller for reading question text
  const {
    speak: speakStory,
    stop: stopStory,
    isSpeaking: isStorySpeaking,
  } = useStoryteller()

  const isStorySupported = typeof window !== 'undefined' && 'speechSynthesis' in window

  const [activeStorytellerId, setActiveStorytellerId] = useState<string | null>(null)

  const currentQuestion: { readonly text: string } = { text: question }

  const handleStoryToggle = (): void => {
    if (isStorySpeaking && activeStorytellerId === 'question') {
      stopStory()
      setActiveStorytellerId(null)
    } else {
      stopStory() // Cut off any current speech first!
      speakStory(currentQuestion.text)
      setActiveStorytellerId('question')
    }
  }

  const handleOptionStoryToggle = (optionText: string, index: number): void => {
    const id = `option-${index}`
    if (isStorySpeaking && activeStorytellerId === id) {
      stopStory()
      setActiveStorytellerId(null)
    } else {
      stopStory() // Cut off any current speech first!
      speakStory(optionText)
      setActiveStorytellerId(id)
    }
  }

  // Stop storyteller speech when the question changes
  useEffect(() => {
    stopStory()
    setActiveStorytellerId(null)
  }, [question, stopStory])

  // Synthesized ding sound using native Web Audio API
  const playSynthesizedDing = () => {
    const isMuted = useSettingsStore.getState().isMuted
    const isSfxMuted = useSettingsStore.getState().isSfxMuted
    if (isMuted || isSfxMuted) return

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

  // Synthesized perfect fanfare sound using native Web Audio API
  const playSynthesizedPerfectFanfare = () => {
    const isMuted = useSettingsStore.getState().isMuted
    const isSfxMuted = useSettingsStore.getState().isSfxMuted
    if (isMuted || isSfxMuted) return

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
    } catch (e) {
      console.warn('Web Audio API perfect arpeggio failed to play', e)
    }
  }

  // Trigger sounds when a result appears
  useEffect(() => {
    if (result) {
      playSound('success')
      if (result.medal === 'gold') {
        playSynthesizedPerfectFanfare()
      } else {
        playSynthesizedDing()
      }
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
            <p className={styles.quizQuestion} data-testid="quiz-question">
              {currentQuestion.text}
            </p>
            <StorytellerButton
              isSpeaking={isStorySpeaking}
              isSupported={isStorySupported}
              onToggle={handleStoryToggle}
            />
            {onSpeakText && (
              <DiscreteSpeaker
                isSpeaking={activeSpeechId === 'quiz-question'}
                onClick={(e) => {
                  e.stopPropagation()
                  onSpeakText(currentQuestion.text, 'quiz-question')
                }}
                label={language === 'fr' ? 'Écouter la question' : 'Listen to question'}
              />
            )}
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
                isSpeaking={isStorySpeaking && activeStorytellerId === `option-${i}`}
                onToggleSpeak={() => handleOptionStoryToggle(opt, i)}
              />
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

