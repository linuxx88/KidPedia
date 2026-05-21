import { useState, useEffect, useRef } from 'react'
import type { Quiz } from '../../data/topics/types'
import { QuizComponent } from './Quiz'
import { type Gender } from '../../utils/helpers'
import { type MedalType } from '../../utils/quizMessages'
import { type Labels } from '../../locales/types'
import BackButton from '../UI/BackButton'
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
}: TopicDetailProps) => {
  const [isSpeakingSystem, setIsSpeakingSystem] = useState(false)
  const [isPlayingAudio, setIsPlayingAudio] = useState(false)
  const [speechError, setSpeechError] = useState<string | null>(null)
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([])
  const [isVoicesReady, setIsVoicesReady] = useState(false)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  const isSpeaking = isSpeakingSystem || isPlayingAudio

  useEffect(() => {
    const loadVoices = () => {
      const availableVoices = window.speechSynthesis.getVoices()
      if (availableVoices.length > 0) {
        setVoices(availableVoices)
        setIsVoicesReady(true)
      }
    }

    // Chrome load voices asynchronously
    if ('speechSynthesis' in window) {
      if (window.speechSynthesis.onvoiceschanged !== undefined) {
        window.speechSynthesis.onvoiceschanged = loadVoices
      }
      loadVoices()
    }

    return () => {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel()
        window.speechSynthesis.onvoiceschanged = null
      }
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
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel()
    }
    setIsSpeakingSystem(false)
    if (audioRef.current) {
      audioRef.current.pause()
      audioRef.current.currentTime = 0
    }
    setIsPlayingAudio(false)
  }

  const speakSystem = () => {
    if (!('speechSynthesis' in window)) {
      setSpeechError(labels.errors.speechNotSupported)
      return
    }

    window.speechSynthesis.cancel()

    let currentVoices = voices
    if (currentVoices.length === 0) {
      currentVoices = window.speechSynthesis.getVoices()
    }

    if (currentVoices.length === 0) {
      setSpeechError(labels.errors.speechSystem)
      return
    }

    const textToRead = `${title}. ${description}. ${labels.quiz.didYouKnow} ${funFact}`
    const utterance = new SpeechSynthesisUtterance(textToRead)

    const voiceLang = language === 'fr' ? 'fr' : 'en'
    const voice = currentVoices.find((v) => v.lang.toLowerCase().includes(voiceLang))
    if (voice) utterance.voice = voice

    utterance.lang = language === 'fr' ? 'fr-FR' : 'en-US'
    utterance.rate = 0.9

    utterance.onstart = () => setIsSpeakingSystem(true)
    utterance.onend = () => setIsSpeakingSystem(false)
    utterance.onerror = (e) => {
      // Ignore "interrupted" errors which happen when we call cancel()
      if (e.error !== 'interrupted') {
        console.error('SpeechSynthesis error:', e)
        setSpeechError(labels.errors.speechSystem)
      }
      setIsSpeakingSystem(false)
    }

    window.speechSynthesis.speak(utterance)
  }

  const handleSpeak = () => {
    setSpeechError(null)

    if (isSpeaking) {
      stopAllSpeech()
      return
    }

    if (audioFile) {
      playAudioFile(audioFile)
    } else {
      speakSystem()
    }
  }

  const handleBack = () => {
    stopAllSpeech()
    onBack()
  }

  const handleReview = () => {
    // On remonte tout en haut pour que l'enfant relise le secret
    window.scrollTo({ top: 0, behavior: 'smooth' });
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
            onClick={handleSpeak}
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
              <h2 className={styles.topicMainTitle}>{title}</h2>
              {badgeIcon && <span className={styles.topicTitleBadge}>{badgeIcon}</span>}
            </div>
          </div>
        </section>

        <div className={styles.topicSeparator} />

        <section className={styles.topicSectionContent}>
          <div className={styles.topicDescriptionText}>{description}</div>

          <div className={styles.topicFunFactBox}>
            <div className={styles.topicFunFactIcon}>💡</div>
            <div className={styles.topicFunFactTitle}>
              <span className={styles.funFactLine}></span>
              {labels.quiz.didYouKnow}
            </div>
            <p className={styles.topicFunFactText}>"{funFact}"</p>
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
            />
          </div>
        </section>
      </div>

      <button className={styles.topicFinishButton} onClick={onBack}>
        {labels.common.finish}
      </button>
    </div>
  )
}
