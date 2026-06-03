import { useState, useEffect, useMemo } from 'react';
import { encyclopedia } from '../../../data/topics';
import { QUIZZES, QUIZ_BANKS } from '../../../data/quizzes';
import { type TopicId } from '../../../types/domain';
import { type Topic, type TopicContent } from '../../../data/topics/types';

interface UseTopicContentProps {
  topicId: string | undefined;
  dynamicTopic: TopicContent | null;
  language: 'fr' | 'en';
}

export function useTopicContent({ topicId, dynamicTopic, language }: UseTopicContentProps) {
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

    // 2. Sélectionner les anecdotes et descriptions de manière synchronisée avec le quiz si possible
    if (selectedQuizIndex !== null) {
      if (topic.funFacts && topic.funFacts.length > 0) {
        setFunFactIndex(selectedQuizIndex % topic.funFacts.length);
      } else {
        setFunFactIndex(null);
      }

      if (topic.fullContents && topic.fullContents.length > 0) {
        setDescriptionIndex(selectedQuizIndex % topic.fullContents.length);
      } else {
        setDescriptionIndex(null);
      }
    } else {
      // Sélection aléatoire synchronisée pour les sujets sans quiz multiples
      const fallbackIndex = Math.floor(Math.random() * 100);

      if (topic.funFacts && topic.funFacts.length > 0) {
        setFunFactIndex(fallbackIndex % topic.funFacts.length);
      } else {
        setFunFactIndex(null);
      }

      if (topic.fullContents && topic.fullContents.length > 0) {
        setDescriptionIndex(fallbackIndex % topic.fullContents.length);
      } else {
        setDescriptionIndex(null);
      }
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

  return {
    topic,
    currentFunFact,
    currentQuiz,
    currentDescription,
  };
}
