import React, { useEffect } from 'react'
import type { Quiz } from '../../data/topics/types'
import { QuizComponent } from './Quiz'
import { type Gender } from '../../utils/helpers'
import { type MedalType } from '../../utils/quizMessages'
import { type Labels } from '../../locales/types'
import { useStoryteller } from '../../hooks/useStoryteller'
import { TopicFunFactBox } from './TopicFunFactBox'
import { TopicNavigation } from './TopicNavigation'
import { InteractiveText } from '../UI/InteractiveText'
import styles from './TopicView.module.css'

export interface TopicViewProps {
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
}

export const TopicView: React.FC<TopicViewProps> = ({
  title,
  description,
  funFact,
  icon,
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
}) => {
  const {
    speak,
    stopStory,
  } = useStoryteller()

  // Nettoyage au démontage et changement de titre pour couper le son instantanément
  useEffect(() => {
    stopStory()
  }, [title, stopStory])

  const handleBack = () => {
    stopStory()
    onBack()
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
            </div>
          </div>
        </section>

        <div className={styles.topicSeparator} />

        <section className={styles.topicSectionContent}>
          <div className={styles.descriptionContainer}>
            <div className={styles.topicDescriptionText}>
              <InteractiveText text={description} onSpeak={() => { stopStory(); speak(description); }} />
            </div>
          </div>

          <TopicFunFactBox
            funFact={funFact}
            anchorIcon={anchorIcon}
            didYouKnowLabel={labels.quiz.didYouKnow}
          />
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
