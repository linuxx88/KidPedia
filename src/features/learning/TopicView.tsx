import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import type { Quiz, TopicSection } from '../../data/topics/types'
import { QuizComponent } from './Quiz'
import { type Gender } from '../../utils/helpers'
import { type MedalType } from '../../utils/quizMessages'
import { type Labels } from '../../locales/types'
import { useStoryteller } from '../../hooks/useStoryteller'
import { useAudioFeedback } from '../../hooks/useAudioFeedback'
import { TopicFunFactBox } from './TopicFunFactBox'
import { TopicNavigation } from './TopicNavigation'
import { InteractiveText } from '../../components/UI/InteractiveText'
import { FavoriteButton } from '../../components/UI/FavoriteButton'
import styles from './TopicView.module.css'

export interface RelatedTopicItem {
  readonly id: string
  readonly title: string
  readonly icon: string
}

export interface TopicViewProps {
  readonly topicId?: string
  readonly title: string
  readonly description: string
  readonly funFact: string
  readonly icon: string
  readonly audioFile?: string
  readonly quiz: Quiz
  readonly badgeIcon?: string
  readonly onBack: () => void
  readonly onAnswer: (index: number) => void
  readonly quizResult: { medal: MedalType } | null
  readonly gender: Gender
  readonly retryMsg: string | null
  readonly activeHint: string | null
  readonly language: 'fr' | 'en'
  readonly labels: Labels
  readonly attempts: number
  readonly anchorIcon?: string
  readonly hideQuiz?: boolean
  readonly categoryKey?: string
  readonly sections?: readonly TopicSection[]
  readonly relatedTopics?: readonly RelatedTopicItem[]
  readonly onSelectRelatedTopic?: (id: string) => void
  readonly onReplay?: () => void
}

export const TopicView: React.FC<TopicViewProps> = ({
  topicId,
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
  categoryKey,
  sections,
  relatedTopics,
  onSelectRelatedTopic,
  onReplay,
}) => {
  const navigate = useNavigate()
  const {
    speak,
    stopStory,
  } = useStoryteller()

  const { playSound } = useAudioFeedback()

  // Nettoyage au démontage et changement de titre pour couper le son instantanément
  useEffect(() => {
    stopStory()
  }, [title, stopStory])

  const handleBack = () => {
    stopStory()
    onBack()
  }

  const handlePlayAudio = () => {
    stopStory()
    if (audioFile) {
      playSound(audioFile)
    }
  }

  const handleRelatedClick = (targetId: string) => {
    stopStory()
    if (onSelectRelatedTopic) {
      onSelectRelatedTopic(targetId)
    } else {
      navigate(`/topic/${targetId}`, { state: { fromRelated: true } })
    }
  }

  const handleReview = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className={styles.topicDetailCard}>
      <TopicNavigation onBack={handleBack} />

      <div className={styles.topicGlassSheet}>
        <section className={styles.topicSectionHeader}>
          <div className={styles.decorationCircle}></div>
          <div className={styles.topicHeroHeader}>
            <span className={styles.topicHeroIcon}>{icon}</span>

            <div className={styles.topicTitleWrapper}>
              <h2 className={styles.topicMainTitle}>
                {anchorIcon && <span style={{ marginRight: '0.5rem' }}>{anchorIcon}</span>}
                <InteractiveText text={title} onSpeak={() => { stopStory(); speak(title); }} />
              </h2>
              {badgeIcon && <span className={styles.topicTitleBadge}>{badgeIcon}</span>}
              {topicId && (
                <FavoriteButton
                  topicId={topicId}
                  topicTitle={title}
                  size="medium"
                />
              )}
            </div>

            {audioFile && (
              <button
                type="button"
                className={styles.realAudioButton}
                onClick={handlePlayAudio}
                aria-label={language === 'fr' ? "Écouter le son réel de l'animal" : "Listen to the real animal sound"}
                data-testid="topic-real-audio-button"
              >
                <span className={styles.realAudioIcon}>🔊</span>
                <span className={styles.realAudioLabel}>
                  {language === 'fr' ? "Écouter le son réel de l'animal" : "Listen to the real animal sound"}
                </span>
              </button>
            )}
          </div>
        </section>

        <div className={styles.topicSeparator} />

        <section className={styles.topicSectionContent}>
          <div className={styles.descriptionContainer}>
            <div className={styles.topicDescriptionText}>
              <InteractiveText text={description} onSpeak={() => { stopStory(); speak(description); }} />
            </div>
          </div>

          {sections && sections.length > 0 && (
            <div className={styles.sectionsGrid} data-testid="topic-sections-grid">
              {sections.map((section, idx) => (
                <div key={idx} className={styles.sectionCard} data-testid={`topic-section-${idx}`}>
                  <div className={styles.sectionHeader}>
                    {section.icon && <span className={styles.sectionIcon}>{section.icon}</span>}
                    <h3 className={styles.sectionTitle}>
                      <InteractiveText
                        text={section.title[language]}
                        onSpeak={() => { stopStory(); speak(section.title[language]); }}
                      />
                    </h3>
                  </div>
                  <div className={styles.sectionContent}>
                    <InteractiveText
                      text={section.content[language]}
                      onSpeak={() => { stopStory(); speak(section.content[language]); }}
                    />
                  </div>
                </div>
              ))}
            </div>
          )}

          <TopicFunFactBox
            funFact={funFact}
            anchorIcon={anchorIcon}
            didYouKnowLabel={labels.quiz.didYouKnow}
          />

          {relatedTopics && relatedTopics.length > 0 && (
            <div className={styles.relatedTopicsContainer} data-testid="related-topics-section">
              <h3 className={styles.relatedTopicsTitle}>
                {language === 'fr' ? 'À découvrir aussi' : 'Also discover'} 🧭
              </h3>
              <div className={styles.relatedTopicsGrid}>
                {relatedTopics.map((rel) => (
                  <button
                    key={rel.id}
                    type="button"
                    className={styles.relatedTopicCard}
                    onClick={() => handleRelatedClick(rel.id)}
                    data-testid={`related-topic-${rel.id}`}
                  >
                    <span className={styles.relatedTopicIcon}>{rel.icon}</span>
                    <span className={styles.relatedTopicName}>{rel.title}</span>
                  </button>
                ))}
              </div>
            </div>
          )}
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
                categoryKey={categoryKey}
                onReplay={onReplay}
                onFinish={handleBack}
              />
            </div>
          </section>
        )}
      </div>

      <button className={styles.topicFinishButton} onClick={handleBack}>
        {labels.common.finish}
      </button>
    </div>
  )
}
