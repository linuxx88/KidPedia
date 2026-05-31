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
import { TopicView } from '../../components/Learning/TopicView'

import { useTopicContent } from './hooks/useTopicContent'

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

  const addBadge = useProgressionStore(state => state.addBadge)
  const isUnlocked = useProgressionStore(state => state.isUnlocked)

  const isStatic = useMemo(() => encyclopedia.some((t) => t.id === topicId), [topicId]);
  const { data: dynamicTopic, isLoading: isLoadingDecoupled, error: fetchError } = useTopicFetcher(isStatic ? undefined : topicId);

  const {
    topic,
    currentFunFact,
    currentQuiz,
    currentDescription
  } = useTopicContent({ topicId, dynamicTopic, language })

  // Rediriger vers l'accueil si le sujet est verrouillé
  useEffect(() => {
    if (topicId && !isUnlocked(topicId as TopicId)) {
      handleGoHome()
    }
  }, [topicId, isUnlocked, handleGoHome])

  // Initialiser le quiz pour ce sujet au montage
  useEffect(() => {
    if (topicId && isUnlocked(topicId as TopicId)) {
      startQuiz(topicId as TopicId)
    }
  }, [topicId, startQuiz, isUnlocked])

  if (isLoadingDecoupled) {
    return <AppLoader message={labels.common.loading} />;
  }

  if (fetchError || !topic || !currentQuiz) {
    return (
      <div className={styles.errorContainer} role="alert">
        <div className={styles.errorIllustration}>🦖💤</div>
        <h2 className={styles.errorTitle}>
          {fetchError ? "Oh oh ! Problème de connexion !" : (topic ? "Quiz non trouvé" : labels.errors.pageNotFound)}
        </h2>
        <p className={styles.errorText}>
          {fetchError 
            ? "Le petit dinosaure n'a pas pu récupérer l'histoire. Vérifie ta connexion Internet !"
            : "Oups ! Cette fiche d'aventure s'est envolée dans les étoiles !"}
        </p>
        <BackButton onClick={() => handleGoHome()}>
          {labels.common.goHome}
        </BackButton>
      </div>
    );
  }

  const earnedBadge = badges.find((b) => b.id === topic.id)

  const handleAnswer = (idx: number) => {
    const result = submitAnswer(idx, currentQuiz);
    if (result.success && result.medal && topicId) {
      addBadge(topicId as TopicId, result.medal);
    }
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

  const handleBack = () => {
    resetQuiz()
    if (fromOrigins) {
      navigate(-1)
    } else {
      navigate(`/?category=${topic.categoryKey}`)
    }
  }

  return (
    <Suspense fallback={<AppLoader message={labels.common.loading} />}>
      <StorytellerProvider>
        <TopicView
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
        />
      </StorytellerProvider>
    </Suspense>
  )
}
