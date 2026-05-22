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

import { type Topic, type Quiz } from '../../data/topics/types'

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

// eslint-disable-next-line react-refresh/only-export-components
export function isSpoiler(funFact: { fr: string; en: string }, quiz: Quiz): boolean {
  const cleanString = (str: string) =>
    str.toLowerCase().replace(/[\s\u00a0,.;!?:'’"«»()-]/g, '');

  const correctOptionFr = quiz.options.fr[quiz.correctAnswer];
  const correctOptionEn = quiz.options.en[quiz.correctAnswer];

  if (!correctOptionFr || !correctOptionEn) return false;

  const funFactFrClean = cleanString(funFact.fr);
  const funFactEnClean = cleanString(funFact.en);

  const answerFrClean = cleanString(correctOptionFr);
  const answerEnClean = cleanString(correctOptionEn);

  // Évite les correspondances sur les réponses courtes génériques (ex: "Oui", "Non", "100")
  if (answerFrClean.length > 3 && funFactFrClean.includes(answerFrClean)) {
    return true;
  }
  if (answerEnClean.length > 3 && funFactEnClean.includes(answerEnClean)) {
    return true;
  }

  // Extraction et détection des nombres clés partagés (ex: "1600", "1 000 000")
  const numMatchesFr = correctOptionFr.match(/\d+/g);
  if (numMatchesFr) {
    for (const num of numMatchesFr) {
      if (num.length >= 2 && (funFactFrClean.includes(num) || funFactEnClean.includes(num))) {
        return true;
      }
    }
  }

  return false;
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

    // 1. Sélectionner d'abord le quiz de manière stable
    const bank = QUIZ_BANKS[topic.id];
    let selectedQuizIndex: number | null = null;
    if (bank && bank.length > 0) {
      selectedQuizIndex = Math.floor(Math.random() * bank.length);
      setQuizIndex(selectedQuizIndex);
    } else {
      setQuizIndex(null);
    }

    // 2. Filtrer les anecdotes sans spoiler
    if (topic.funFacts && topic.funFacts.length > 0) {
      if (selectedQuizIndex !== null && bank) {
        const quiz = bank[selectedQuizIndex];
        const nonSpoilerIndices: number[] = [];
        
        topic.funFacts.forEach((ff, idx) => {
          if (!isSpoiler(ff, quiz)) {
            nonSpoilerIndices.push(idx);
          }
        });

        if (nonSpoilerIndices.length > 0) {
          const randIdx = Math.floor(Math.random() * nonSpoilerIndices.length);
          setFunFactIndex(nonSpoilerIndices[randIdx]);
        } else {
          // Repli : si tout est spoiler (cas rare), sélectionner au hasard
          setFunFactIndex(Math.floor(Math.random() * topic.funFacts.length));
        }
      } else {
        setFunFactIndex(Math.floor(Math.random() * topic.funFacts.length));
      }
    } else {
      setFunFactIndex(null);
    }

    // 3. Sélectionner la description stable
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

  const bank = topic ? QUIZ_BANKS[topic.id] : undefined;
  const currentQuiz = (bank && quizIndex !== null && bank[quizIndex])
    ? bank[quizIndex]
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
