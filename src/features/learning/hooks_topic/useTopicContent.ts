import { useState, useEffect, useMemo } from 'react';
import { encyclopedia } from '../../../data/topics';
import { QUIZZES, QUIZ_BANKS } from '../../../data/quizzes';
import { type TopicId } from '../../../types/domain';
import { type Topic, type TopicContent } from '../../../data/topics/types';
import { isSpoiler } from '../utils_topic/spoiler';

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

  return {
    topic,
    currentFunFact,
    currentQuiz,
    currentDescription,
  };
}
