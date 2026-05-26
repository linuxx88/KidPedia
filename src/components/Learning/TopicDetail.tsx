import { useState, useEffect, useRef } from 'react'
import type { Quiz } from '../../data/topics/types'
import { QuizComponent } from './Quiz'
import { type Gender } from '../../utils/helpers'
import { type MedalType } from '../../utils/quizMessages'
import { type Labels } from '../../locales/types'
import BackButton from '../UI/BackButton'
import { useTextToSpeech } from '../../hooks/useTextToSpeech'
import { useReaderVoice } from '../../hooks/useReaderVoice'
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
  hideQuiz?: boolean
}

interface HighlightedTextProps {
  text: string
  textId: string
  activeTextId: string | null
  highlightIndex: number
  highlightLength: number
  isBaguetteMode: boolean
  onClick: () => void
  onMouseEnter: () => void
  onMouseLeave: () => void
}

export const HighlightedText = ({
  text,
  textId,
  activeTextId,
  highlightIndex,
  highlightLength,
  isBaguetteMode,
  onClick,
  onMouseEnter,
  onMouseLeave,
}: HighlightedTextProps) => {
  const isCurrentlyActive = activeTextId === textId

  const handleClick = (e: React.MouseEvent) => {
    if (isBaguetteMode) {
      e.stopPropagation()
      onClick()
    }
  }

  if (!isBaguetteMode) {
    return <>{text}</>
  }

  if (!isCurrentlyActive || highlightIndex < 0 || highlightLength <= 0) {
    return (
      <span
        className={styles.baguetteInteractiveText}
        onClick={handleClick}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      >
        {text}
      </span>
    )
  }

  const before = text.substring(0, highlightIndex)
  const highlighted = text.substring(highlightIndex, highlightIndex + highlightLength)
  const after = text.substring(highlightIndex + highlightLength)

  return (
    <span
      className={styles.baguetteInteractiveText}
      onClick={handleClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {before}
      <span className={styles.highlightedWord}>{highlighted}</span>
      {after}
    </span>
  )
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
  hideQuiz,
}: TopicDetailProps) => {
  const [isPlayingAudio, setIsPlayingAudio] = useState(false)
  const [speechError, setSpeechError] = useState<string | null>(null)
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const hoverTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const handleError = (errorKey: 'speechNotSupported' | 'speechSystem') => {
    setSpeechError(labels.errors[errorKey])
  }

  const {
    activeSpeechId,
    isVoicesReady,
    speak,
    stop: stopTTS,
  } = useTextToSpeech({ language, onError: handleError })

  const {
    isBaguetteMode,
    activeTextId: activeReaderTextId,
    highlightIndex,
    highlightLength,
    toggleBaguetteMode,
    speak: speakReader,
    stop: stopReader,
  } = useReaderVoice({
    language,
    onError: (err) => setSpeechError(err),
  })

  const isSpeaking = activeSpeechId !== null || isPlayingAudio || activeReaderTextId !== null

  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause()
        audioRef.current = null
      }
      if (hoverTimeoutRef.current) {
        clearTimeout(hoverTimeoutRef.current)
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
    stopReader()
    if (audioRef.current) {
      audioRef.current.pause()
      audioRef.current.currentTime = 0
    }
    setIsPlayingAudio(false)
  }

  const handleSpeakGlobal = () => {
    setSpeechError(null)
    stopReader()

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

  const handleSpeakReader = (text: string, id: string) => {
    stopTTS()
    if (audioRef.current) {
      audioRef.current.pause()
      setIsPlayingAudio(false)
    }
    speakReader(text, id)
  }

  const handleMouseEnterText = (text: string, id: string) => {
    if (!isBaguetteMode) return
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current)
    }
    hoverTimeoutRef.current = setTimeout(() => {
      stopTTS()
      if (audioRef.current) {
        audioRef.current.pause()
        setIsPlayingAudio(false)
      }
      speakReader(text, id)
    }, 500)
  }

  const handleMouseLeaveText = () => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current)
      hoverTimeoutRef.current = null
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
                <HighlightedText
                  text={title}
                  textId="title"
                  activeTextId={activeReaderTextId}
                  highlightIndex={highlightIndex}
                  highlightLength={highlightLength}
                  isBaguetteMode={isBaguetteMode}
                  onClick={() => handleSpeakReader(title, 'title')}
                  onMouseEnter={() => handleMouseEnterText(title, 'title')}
                  onMouseLeave={handleMouseLeaveText}
                />
              </h2>
              {badgeIcon && <span className={styles.topicTitleBadge}>{badgeIcon}</span>}
            </div>
          </div>
        </section>

        <div className={styles.topicSeparator} />

        <section className={styles.topicSectionContent}>
          <div className={styles.descriptionContainer}>
            <div className={styles.topicDescriptionText}>
              <HighlightedText
                text={description}
                textId="description"
                activeTextId={activeReaderTextId}
                highlightIndex={highlightIndex}
                highlightLength={highlightLength}
                isBaguetteMode={isBaguetteMode}
                onClick={() => handleSpeakReader(description, 'description')}
                onMouseEnter={() => handleMouseEnterText(description, 'description')}
                onMouseLeave={handleMouseLeaveText}
              />
            </div>
            {!isBaguetteMode && (
              <DiscreteSpeaker
                isSpeaking={activeSpeechId === 'description'}
                onClick={() => {
                  stopReader()
                  speak(description, 'description')
                }}
                label={language === 'fr' ? 'Écouter la description' : 'Listen to description'}
              />
            )}
          </div>

          <div className={styles.topicFunFactBox}>
            <div className={styles.topicFunFactIcon}>{anchorIcon || '💡'}</div>
            <div className={styles.topicFunFactTitle}>
              <span className={styles.funFactLine}></span>
              {labels.quiz.didYouKnow}
            </div>
            <div className={styles.funFactContentWrapper}>
              <p className={styles.topicFunFactText}>
                "
                <HighlightedText
                  text={funFact}
                  textId="funFact"
                  activeTextId={activeReaderTextId}
                  highlightIndex={highlightIndex}
                  highlightLength={highlightLength}
                  isBaguetteMode={isBaguetteMode}
                  onClick={() => handleSpeakReader(funFact, 'funFact')}
                  onMouseEnter={() => handleMouseEnterText(funFact, 'funFact')}
                  onMouseLeave={handleMouseLeaveText}
                />
                "
              </p>
              {!isBaguetteMode && (
                <DiscreteSpeaker
                  isSpeaking={activeSpeechId === 'funFact'}
                  onClick={() => {
                    stopReader()
                    speak(`${labels.quiz.didYouKnow}. ${funFact}`, 'funFact')
                  }}
                  label={language === 'fr' ? "Écouter l'anecdote" : 'Listen to fun fact'}
                />
              )}
            </div>
          </div>
        </section>

        {!hideQuiz && <div className={styles.topicSeparator} />}

        {!hideQuiz && (
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
                onSpeakText={(text, id) => {
                  stopReader()
                  speak(text, id)
                }}
                activeSpeechId={activeSpeechId}
              />
            </div>
          </section>
        )}
      </div>

      <button className={styles.topicFinishButton} onClick={handleBack}>
        {labels.common.finish}
      </button>

      <button
        type="button"
        className={`${styles.baguetteFloatingBtn} ${isBaguetteMode ? styles.baguetteFloatingBtnActive : ''}`}
        onClick={toggleBaguetteMode}
        title={language === 'fr' ? 'Baguette Magique de Lecture' : 'Magic Reading Wand'}
        aria-label={language === 'fr' ? 'Activer la baguette magique de lecture' : 'Activate magic reading wand'}
      >
        🪄
      </button>
    </div>
  )
}
