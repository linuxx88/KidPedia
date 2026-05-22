import { useState, useEffect, useRef } from 'react'
import type { Quiz } from '../../data/topics/types'
import { QuizComponent } from './Quiz'
import { type Gender } from '../../utils/helpers'
import { type MedalType } from '../../utils/quizMessages'
import { type Labels } from '../../locales/types'
import BackButton from '../UI/BackButton'
import { useTextToSpeech } from '../../hooks/useTextToSpeech'
import styles from './TopicDetail.module.css'

interface TopicDetailProps {
  title: string
  description: string
  funFact: string
  icon: string
  audioFile?: string
  quiz: Quiz
  badgeIcon?: string
  onBack: () => void
  onAnswer: (index: number) => void
  quizResult: { medal: MedalType } | null
  gender: Gender
  retryMsg: string | null
  activeHint: string | null
  language: 'fr' | 'en'
  labels: Labels
  attempts: number
  anchorIcon?: string
}

interface DiscreteSpeakerProps {
  isSpeaking: boolean
  onClick: (e: React.MouseEvent) => void
  label: string
}

export const DiscreteSpeaker = ({ isSpeaking, onClick, label }: DiscreteSpeakerProps) => {
  return (
    <button
      type="button"
      className={`${styles.discreteSpeaker} ${isSpeaking ? styles.discreteSpeakerActive : ''}`}
      onClick={onClick}
      aria-label={label}
      title={label}
    >
      {isSpeaking ? (
        <span className={styles.discreteSpeakerAnimation}>
          <span className={styles.discreteSpeakerWave}></span>
          <span className={styles.discreteSpeakerWave}></span>
          <span className={styles.discreteSpeakerWave}></span>
        </span>
      ) : (
        <span className={styles.discreteSpeakerIcon}>🔊</span>
      )}
    </button>
  )
}

export const TopicDetail = ({
  title,
  description,
  funFact,
  icon,
  audioFile,
  quiz,
  badgeIcon,
  onBack,
  onAnswer,
  quizResult,
  gender,
  retryMsg,
  activeHint,
  language,
  labels,
  attempts,
  anchorIcon,
}: TopicDetailProps) => {
  const [isPlayingAudio, setIsPlayingAudio] = useState(false)
  const [speechError, setSpeechError] = useState<string | null>(null)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  const handleError = (errorKey: 'speechNotSupported' | 'speechSystem') => {
    setSpeechError(labels.errors[errorKey])
  }

  const {
    activeSpeechId,
    isVoicesReady,
    speak,
    stop: stopTTS,
  } = useTextToSpeech({ language, onError: handleError })

  const isSpeaking = activeSpeechId !== null || isPlayingAudio

  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause()
        audioRef.current = null
      }
    }
  }, [])

  const playAudioFile = (url: string) => {
    if (!audioRef.current) {
      audioRef.current = new Audio(url)
      audioRef.current.onended = () => setIsPlayingAudio(false)
      audioRef.current.onerror = () => {
        setIsPlayingAudio(false)
        setSpeechError(labels.errors.audioLoad)
      }
    }

    setIsPlayingAudio(true)
    audioRef.current.play().catch((err) => {
      console.error('Erreur audio:', err)
      setIsPlayingAudio(false)
      setSpeechError(labels.errors.audioPlayback)
    })
  }

  const stopAllSpeech = () => {
    stopTTS()
    if (audioRef.current) {
      audioRef.current.pause()
      audioRef.current.currentTime = 0
    }
    setIsPlayingAudio(false)
  }

  const handleSpeakGlobal = () => {
    setSpeechError(null)

    if (isSpeaking) {
      stopAllSpeech()
      return
    }

    if (audioFile) {
      playAudioFile(audioFile)
    } else {
      const textToRead = `${title}. ${description}. ${labels.quiz.didYouKnow} ${funFact}`
      speak(textToRead, 'global')
    }
  }

  const handleBack = () => {
    stopAllSpeech()
    onBack()
  }

  const handleReview = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const getButtonText = () => {
    if (isSpeaking) {
      return (
        <span style={{ display: 'flex', alignItems: 'center' }}>
          <div className={styles.speakingIndicator}>
            <div className={styles.bar}></div>
            <div className={styles.bar}></div>
            <div className={styles.bar}></div>
          </div>
          {labels.common.stop}
        </span>
      )
    }
    if (audioFile) return `🔊 ${labels.common.listenAudio}`
    if (!isVoicesReady) return `⌛ ${labels.common.loading}`
    return `🔊 ${labels.common.listen}`
  }

  const isAudioDisabled = !audioFile && !isVoicesReady
  const audioBtnClass = isSpeaking ? styles.btnStop : styles.btnAudio

  return (
    <div className={styles.topicDetailCard}>
      <div className={styles.detailNav}>
        <BackButton onClick={handleBack} />

        <div className={styles.navActions}>
          {speechError && (
            <span className={styles.speechError}>
              {speechError}
            </span>
          )}
          <button
            className={`${styles.navBtn} ${audioBtnClass}`}
            onClick={handleSpeakGlobal}
            disabled={isAudioDisabled}
            data-disabled={isAudioDisabled}
          >
            {getButtonText()}
          </button>
        </div>
      </div>

      <div className={styles.topicGlassSheet}>
        <section className={styles.topicSectionHeader}>
          <div className={styles.decorationCircle}></div>
          <div className={styles.topicHeroHeader}>
            <span className={styles.topicHeroIcon}>{icon}</span>

            <div className={styles.topicTitleWrapper}>
              <h2 className={styles.topicMainTitle}>
                {anchorIcon && <span style={{ marginRight: '0.5rem' }}>{anchorIcon}</span>}
                {title}
              </h2>
              {badgeIcon && <span className={styles.topicTitleBadge}>{badgeIcon}</span>}
            </div>
          </div>
        </section>

        <div className={styles.topicSeparator} />

        <section className={styles.topicSectionContent}>
          <div className={styles.descriptionContainer}>
            <div className={styles.topicDescriptionText}>{description}</div>
            <DiscreteSpeaker
              isSpeaking={activeSpeechId === 'description'}
              onClick={() => speak(description, 'description')}
              label={language === 'fr' ? 'Écouter la description' : 'Listen to description'}
            />
          </div>

          <div className={styles.topicFunFactBox}>
            <div className={styles.topicFunFactIcon}>{anchorIcon || '💡'}</div>
            <div className={styles.topicFunFactTitle}>
              <span className={styles.funFactLine}></span>
              {labels.quiz.didYouKnow}
            </div>
            <div className={styles.funFactContentWrapper}>
              <p className={styles.topicFunFactText}>"{funFact}"</p>
              <DiscreteSpeaker
                isSpeaking={activeSpeechId === 'funFact'}
                onClick={() => speak(`${labels.quiz.didYouKnow}. ${funFact}`, 'funFact')}
                label={language === 'fr' ? "Écouter l'anecdote" : 'Listen to fun fact'}
              />
            </div>
          </div>
        </section>

        <div className={styles.topicSeparator} />

        <section className={styles.topicSectionQuiz}>
          <div className={styles.quizWrapper}>
            <QuizComponent
              question={quiz.question[language]}
              options={quiz.options[language]}
              onAnswer={onAnswer}
              result={quizResult}
              gender={gender}
              retryMsg={retryMsg}
              activeHint={activeHint}
              onReview={handleReview}
              labels={labels}
              attempts={attempts}
              funFact={funFact}
              anchorIcon={anchorIcon}
              onSpeakText={speak}
              activeSpeechId={activeSpeechId}
            />
          </div>
        </section>
      </div>

      <button className={styles.topicFinishButton} onClick={handleBack}>
        {labels.common.finish}
      </button>
    </div>
  )
}

