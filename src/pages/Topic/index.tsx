import { lazy, Suspense, useEffect, useState, useMemo } from 'react'
import { useParams, useLocation, useNavigate } from 'react-router-dom'
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
import { useTopicFetcher } from '../../hooks/useTopicFetcher'
import { AppLoader } from '../../components/UI/AppLoader'

interface TopicPageProps {
  handleGoHome: (callback?: () => void) => void
}

// Import direct pour éviter les erreurs d'import de module dynamique sous WebKit E2E
import { TopicView } from '../../components/Learning/TopicView'


const STOP_WORDS = new Set([
  // French
  'le', 'la', 'les', 'de', 'du', 'des', 'un', 'une', 'et', 'est', 'estce', 'qui', 'que', 'aux',
  'a', 'pour', 'dans', 'par', 'sur', 'avec', 'plus', 'comme', 'comment', 'quelle', 'quelles',
  'quel', 'quels', 'combien', 'mais', 'ou', 'dont', 'cette', 'ceux', 'celles', 'nouveau',
  // English
  'the', 'of', 'and', 'to', 'in', 'is', 'for', 'on', 'with', 'at', 'by', 'an', 'it', 'its', 'from',
  'that', 'this', 'these', 'those', 'what', 'which', 'who', 'how', 'many', 'much', 'about', 'more',
  'most', 'some', 'any', 'other'
]);

// eslint-disable-next-line react-refresh/only-export-components
export function isSpoiler(
  funFact: { fr: string; en: string },
  quiz: Quiz,
  topicTitle?: { fr: string; en: string }
): boolean {
  const stripDiacritics = (str: string) =>
    str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');

  const cleanString = (str: string) =>
    stripDiacritics(str.toLowerCase())
      .replace(/[\s\u00a0,.;!?:'’"«»()-]/g, ' ');

  const getSignificantWords = (str: string, excludeSet: Set<string>): Set<string> => {
    const cleaned = cleanString(str);
    const words = cleaned.split(/\s+/);
    const result = new Set<string>();
    for (const w of words) {
      if (w.length > 3 && !STOP_WORDS.has(w) && !excludeSet.has(w)) {
        result.add(w);
      }
    }
    return result;
  };

  // Build exclusion set from topic title
  const excludeSet = new Set<string>();
  if (topicTitle) {
    const titleWordsFr = cleanString(topicTitle.fr).split(/\s+/);
    const titleWordsEn = cleanString(topicTitle.en).split(/\s+/);
    titleWordsFr.concat(titleWordsEn).forEach(w => {
      if (w.length > 3) excludeSet.add(w);
    });
  }

  // 1. Direct contains check (legacy robust fallback)
  const funFactFrClean = cleanString(funFact.fr).replace(/\s/g, '');
  const funFactEnClean = cleanString(funFact.en).replace(/\s/g, '');

  const correctOptionFr = quiz.options.fr[quiz.correctAnswer];
  const correctOptionEn = quiz.options.en[quiz.correctAnswer];

  if (correctOptionFr && correctOptionEn) {
    const answerFrClean = cleanString(correctOptionFr).replace(/\s/g, '');
    const answerEnClean = cleanString(correctOptionEn).replace(/\s/g, '');
    
    if (answerFrClean.length > 3 && funFactFrClean.includes(answerFrClean)) {
      return true;
    }
    if (answerEnClean.length > 3 && funFactEnClean.includes(answerEnClean)) {
      return true;
    }
  }

  // 2. Number-based collision on the ENTIRE quiz vs fun fact
  const extractNumbers = (str: string): string[] => {
    const matches = str.match(/\d+/g);
    return matches ? matches.filter(num => num.length >= 2) : [];
  };

  const quizNumbers: string[] = [];
  // From question
  quizNumbers.push(...extractNumbers(quiz.question.fr));
  quizNumbers.push(...extractNumbers(quiz.question.en));
  // From options
  quiz.options.fr.forEach(opt => quizNumbers.push(...extractNumbers(opt)));
  quiz.options.en.forEach(opt => quizNumbers.push(...extractNumbers(opt)));

  for (const num of quizNumbers) {
    if (funFactFrClean.includes(num) || funFactEnClean.includes(num)) {
      return true;
    }
  }

  // 3. Significant word overlap check (Question + Options vs Fun Fact)
  const quizWordsFr = getSignificantWords(quiz.question.fr, excludeSet);
  const quizWordsEn = getSignificantWords(quiz.question.en, excludeSet);
  quiz.options.fr.forEach(opt => {
    getSignificantWords(opt, excludeSet).forEach(w => quizWordsFr.add(w));
  });
  quiz.options.en.forEach(opt => {
    getSignificantWords(opt, excludeSet).forEach(w => quizWordsEn.add(w));
  });

  const funFactWordsFr = getSignificantWords(funFact.fr, excludeSet);
  const funFactWordsEn = getSignificantWords(funFact.en, excludeSet);

  // If they share 2 or more significant words in French or English, it's a spoiler
  let sharedFrCount = 0;
  for (const w of quizWordsFr) {
    if (funFactWordsFr.has(w)) {
      sharedFrCount++;
    }
  }

  let sharedEnCount = 0;
  for (const w of quizWordsEn) {
    if (funFactWordsEn.has(w)) {
      sharedEnCount++;
    }
  }

  if (sharedFrCount >= 2 || sharedEnCount >= 2) {
    return true;
  }

  return false;
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

  const topic = useMemo(() => {
    const staticTopic = encyclopedia.find((t) => t.id === topicId) as Topic | undefined;
    if (staticTopic) return staticTopic;
    if (!dynamicTopic) return undefined;
    return {
      id: dynamicTopic.id as TopicId,
      title: dynamicTopic.title,
      category: dynamicTopic.category,
      categoryKey: dynamicTopic.categoryKey,
      icon: dynamicTopic.icon,
      shortDesc: dynamicTopic.shortDesc,
      fullContent: dynamicTopic.fullContent,
      fullContents: dynamicTopic.fullContents,
      funFact: dynamicTopic.funFact,
      funFacts: dynamicTopic.funFacts,
      audioFile: dynamicTopic.audioFile,
      anchorIcon: dynamicTopic.anchorIcon,
    } as Topic;
  }, [topicId, dynamicTopic]);

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
    const bank = QUIZ_BANKS[topic.id] || dynamicTopic?.quizzes;
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
          if (!isSpoiler(ff, quiz, topic.title)) {
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
  }, [topicId, topic, dynamicTopic]);
  /* eslint-enable react-hooks/set-state-in-effect */

  const currentFunFact = (topic && funFactIndex !== null && topic.funFacts && topic.funFacts[funFactIndex])
    ? topic.funFacts[funFactIndex][language]
    : (topic ? topic.funFact[language] : '');

  const bank = topic ? (QUIZ_BANKS[topic.id] || dynamicTopic?.quizzes) : undefined;
  const currentQuiz = (bank && quizIndex !== null && bank[quizIndex])
    ? bank[quizIndex]
    : (topic ? (QUIZZES[topic.id] || dynamicTopic?.quiz) : undefined);

  const currentDescription = (topic && descriptionIndex !== null && topic.fullContents && topic.fullContents[descriptionIndex])
    ? topic.fullContents[descriptionIndex][language]
    : (topic ? topic.fullContent[language] : '');

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
      handleGoHome()
    }
  }

  return (
    <Suspense fallback={<AppLoader message={labels.common.loading} />}>
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
      />
    </Suspense>
  )
}
