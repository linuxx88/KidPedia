import { lazy, Suspense, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { encyclopedia } from '../../data/topics'
import { useSettingsStore } from '../../store/useSettingsStore'
import { useQuizStore } from '../../store/useQuizStore'
import { usePlayerStore } from '../../store/usePlayerStore'
import { useProgressionStore } from '../../store/useProgressionStore'
import { getMedalIcon } from '../../utils/quizMessages'
import { QUIZZES, QUIZ_BANKS } from '../../data/quizzes'
import { type TopicId } from '../../types/domain'
import BackButton from '../../components/UI/BackButton'
import styles from './TopicPage.module.css'

import { type Topic } from '../../data/topics/types'

interface TopicPageProps {
  handleGoHome: (callback?: () => void) => void
}

// Lazy load TopicDetail inside the page
const TopicDetail = lazy(() =>
  import('../../components/Learning/TopicDetail').then((module) => ({ default: module.TopicDetail })),
)

const LoadingFallback = () => {
  const labels = useSettingsStore(state => state.labels)
  return <div className={styles.loadingFallback}>{labels.common.loading}</div>
}

export function TopicPage({ handleGoHome }: TopicPageProps) {
  const { topicId } = useParams()
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

  const topic = encyclopedia.find((t) => t.id === topicId) as Topic | undefined

  const [funFactIndex, setFunFactIndex] = useState<number | null>(null);
  const [quizIndex, setQuizIndex] = useState<number | null>(null);
  const [descriptionIndex, setDescriptionIndex] = useState<number | null>(null);

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

  /* eslint-disable react-hooks/set-state-in-effect */
  // Tirer au sort les indices stables uniquement lorsque le sujet change
  useEffect(() => {
    if (!topic) return;

    if (topic.funFacts && topic.funFacts.length > 0) {
      setFunFactIndex(Math.floor(Math.random() * topic.funFacts.length));
    } else {
      setFunFactIndex(null);
    }

    const bank = QUIZ_BANKS[topic.id];
    if (bank && bank.length > 0) {
      setQuizIndex(Math.floor(Math.random() * bank.length));
    } else {
      setQuizIndex(null);
    }

    if (topic.fullContents && topic.fullContents.length > 0) {
      setDescriptionIndex(Math.floor(Math.random() * topic.fullContents.length));
    } else {
      setDescriptionIndex(null);
    }
  }, [topicId, topic]);
  /* eslint-enable react-hooks/set-state-in-effect */

  const currentFunFact = (topic && funFactIndex !== null && topic.funFacts && topic.funFacts[funFactIndex])
    ? topic.funFacts[funFactIndex][language]
    : (topic ? topic.funFact[language] : '');

  const currentQuiz = (topic && quizIndex !== null && QUIZ_BANKS[topic.id] && QUIZ_BANKS[topic.id][quizIndex])
    ? QUIZ_BANKS[topic.id][quizIndex]
    : (topic ? QUIZZES[topic.id] : undefined);

  const currentDescription = (topic && descriptionIndex !== null && topic.fullContents && topic.fullContents[descriptionIndex])
    ? topic.fullContents[descriptionIndex][language]
    : (topic ? topic.fullContent[language] : '');

  if (!topic) {
    return (
      <div className={styles.errorContainer}>
        <h2 className={styles.errorTitle}>{labels.errors.pageNotFound}</h2>
        <p className={styles.errorText}>ID : {topicId}</p>
        <BackButton onClick={() => handleGoHome()}>
          {labels.common.goHome}
        </BackButton>
      </div>
    )
  }

  const earnedBadge = badges.find((b) => b.id === topic.id)

  if (!currentQuiz) {
    return (
      <div className={styles.errorContainer}>
        <h2 className={styles.errorTitle}>Quiz non trouvé</h2>
        <BackButton onClick={() => handleGoHome()}>
          {labels.common.goHome}
        </BackButton>
      </div>
    )
  }

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

  return (
    <Suspense fallback={<LoadingFallback />}>
      <TopicDetail
        title={topic.title[language]}
        description={currentDescription}
        funFact={currentFunFact}
        icon={topic.icon}
        audioFile={topic.audioFile}
        quiz={currentQuiz}
        badgeIcon={earnedBadge ? getMedalIcon(earnedBadge.medal) : undefined}
        onBack={() => handleGoHome(resetQuiz)}
        onAnswer={handleAnswer}
        quizResult={quizResult}
        gender={gender}
        retryMsg={retryMsg}
        activeHint={activeHint}
        language={language}
        labels={labels}
        attempts={attempts}
        anchorIcon={resolvedAnchorIcon}
      />
    </Suspense>
  )
}
