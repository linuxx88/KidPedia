import { Suspense, useEffect, useMemo } from 'react'
import { useParams, useLocation, useNavigate } from 'react-router-dom'
import { encyclopedia } from '../../data/topics'
import { useSettingsStore } from '../../store/useSettingsStore'
import { useQuizStore } from '../../store/useQuizStore'
import { usePlayerStore } from '../../store/usePlayerStore'
import { useProgressionStore } from '../../store/useProgressionStore'
import { getMedalIcon } from '../../utils/quizMessages'
import { type TopicId } from '../../types/domain'
import BackButton from '../../components/UI/BackButton'
import styles from './TopicPage.module.css'


import { useTopicFetcher } from '../../hooks/useTopicFetcher'
import { AppLoader } from '../../components/UI/AppLoader'
import { StorytellerProvider } from '../../hooks/useStoryteller'

// Import direct pour éviter les erreurs d'import de module dynamique sous WebKit E2E
import { TopicView } from './TopicView'

import { useTopicContent } from './hooks_topic/useTopicContent'

interface TopicPageProps {
  readonly handleGoHome: () => void
}

export function TopicPage({ handleGoHome }: TopicPageProps) {
  const { topicId } = useParams()
  const location = useLocation()
  const navigate = useNavigate()
  const fromOrigins = !!location.state?.fromOrigins
  const { gender, labels, language } = useSettingsStore()
  
  const { badges } = usePlayerStore()
  
  const quizResult = useQuizStore(state => state.quizResult)
  const submitAnswer = useQuizStore(state => state.submitAnswer)
  const startQuiz = useQuizStore(state => state.startQuiz)
  const resetQuiz = useQuizStore(state => state.resetQuiz)
  const retryMsg = useQuizStore(state => state.retryMsg)
  const activeHint = useQuizStore(state => state.activeHint)
  const attempts = useQuizStore(state => state.attempts)

  const markTopicAsRead = useProgressionStore(state => state.markTopicAsRead)

  // Marquer le sujet comme lu
  useEffect(() => {
    if (topicId && markTopicAsRead) {
      markTopicAsRead(topicId)
    }
  }, [topicId, markTopicAsRead])

  const isStatic = useMemo(() => encyclopedia.some((t) => t.id === topicId), [topicId]);
  const { data: dynamicTopic, isLoading: isLoadingDecoupled, error: fetchError } = useTopicFetcher(isStatic ? undefined : topicId);

  const {
    topic,
    currentFunFact,
    currentQuiz,
    currentDescription
  } = useTopicContent({ topicId, dynamicTopic, language })

  const relatedTopicIds = topic?.relatedTopicIds
  const relatedTopics = useMemo(() => {
    if (!relatedTopicIds || relatedTopicIds.length === 0) {
      return undefined
    }
    return relatedTopicIds
      .map((id) => encyclopedia.find((t) => t.id === id))
      .filter((t): t is (typeof encyclopedia)[number] => t !== undefined)
      .map((t) => ({
        id: t.id,
        title: t.title[language] || t.title.fr || t.id,
        icon: t.icon,
      }))
  }, [relatedTopicIds, language])

  // Initialiser le quiz pour ce sujet au montage
  useEffect(() => {
    if (topicId) {
      startQuiz(topicId as TopicId)
    }
  }, [topicId, startQuiz])

  const forceLeaveQuiz = () => {
    resetQuiz()
    if (fromOrigins) {
      navigate(-1)
    } else {
      navigate(`/?category=${topic?.categoryKey || ''}`)
    }
  }

  const handleBack = () => {
    forceLeaveQuiz()
  }

  if (isLoadingDecoupled) {
    return <AppLoader message={labels.common.loading} />;
  }

  if (fetchError || !topic || !currentQuiz) {
    return (
      <div className={styles.errorContainer} role="alert">
        <div className={styles.errorCard}>
          <div className={styles.errorIllustration}>🦖💤</div>
          <h2 className={styles.errorTitle}>
            {fetchError ? "Oh oh ! Problème de connexion !" : (topic ? "Quiz non trouvé" : labels.errors.pageNotFound)}
          </h2>
          <p className={styles.errorText}>
            {fetchError 
              ? "Le petit dinosaure n'a pas pu récupérer l'histoire. Vérifie ta connexion Internet !"
              : "Oups ! Cette fiche d'aventure s'est envolée dans les étoiles !"}
          </p>
          <div className={styles.errorActions}>
            {fetchError && (
              <button
                type="button"
                className={styles.retryButton}
                onClick={() => window.location.reload()}
              >
                {language === 'fr' ? 'Réessayer 🔄' : 'Try again 🔄'}
              </button>
            )}
            <BackButton onClick={() => handleGoHome()}>
              {labels.common.goHome}
            </BackButton>
          </div>
        </div>
      </div>
    );
  }

  const earnedBadge = badges.find((b) => b.id === topic.id)

  const handleAnswer = (idx: number) => {
    submitAnswer(idx, currentQuiz);
  }

  const CATEGORY_ANCHOR_ICONS: Record<string, string> = {
    animaux: '🦁',
    espace: '🚀',
    pourquoi: '❓',
    'corps-humain': '🧠',
    dinosaures: '🦖',
    nature: '🌳',
    histoire: '🏰',
    geographie: '🌍',
    inventions: '💡',
    arts: '🎨',
  };

  const resolvedAnchorIcon = topic ? (topic.anchorIcon || CATEGORY_ANCHOR_ICONS[topic.categoryKey.toLowerCase()] || '📍') : undefined;

  return (
    <Suspense fallback={<AppLoader message={labels.common.loading} />}>
      <StorytellerProvider>
        <TopicView
          topicId={topic.id}
          title={topic.title[language]}
          description={currentDescription}
          funFact={currentFunFact}
          icon={topic.icon}
          audioFile={topic.audioFile}
          quiz={currentQuiz}
          badgeIcon={earnedBadge ? getMedalIcon(earnedBadge.medal) : undefined}
          onBack={handleBack}
          onAnswer={handleAnswer}
          quizResult={quizResult}
          gender={gender}
          retryMsg={retryMsg}
          activeHint={activeHint}
          language={language}
          labels={labels}
          attempts={attempts}
          anchorIcon={resolvedAnchorIcon}
          hideQuiz={fromOrigins}
          categoryKey={topic.categoryKey}
          sections={topic.sections}
          relatedTopics={relatedTopics}
          onReplay={() => { resetQuiz(); if (topicId) startQuiz(topicId as TopicId); }}
        />
      </StorytellerProvider>
    </Suspense>
  )
}
