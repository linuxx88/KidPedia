import { useEffect, useState } from 'react';
import { useSettingsStore } from '../store/useSettingsStore';
import { useQuizStore } from '../store/useQuizStore';
import { usePlayerStore } from '../store/usePlayerStore';
import { useSafariStore, QUEST_GOAL } from '../store/useSafariStore';
import type { SafariEventCode, SafariEventData } from '../store/useSafariStore';
import type { Labels, SupportedLanguage } from '../locales/types';
import { useProgressionStore } from '../store/useProgressionStore';
import { type TopicId } from '../types/domain';

export const useSafariGame = () => {
  const { gender, language, labels } = useSettingsStore();
  const [showQuitConfirm, setShowQuitConfirm] = useState(false);

  // SÉLECTEURS SAFARI (ZUSTAND)
  const playerPosition = useSafariStore((state) => state.playerPosition);
  const lastRoll = useSafariStore((state) => state.lastRoll);
  const status = useSafariStore((state) => state.status);
  const activeQuiz = useSafariStore((state) => state.activeQuiz);
  const eventCode = useSafariStore((state) => state.eventCode);
  const eventData = useSafariStore((state) => state.eventData);
  const inventory = useSafariStore((state) => state.inventory);
  const diceColor = useSafariStore((state) => state.diceColor);
  const rollDice = useSafariStore((state) => state.rollDice);
  const handleQuizAnswer = useSafariStore((state) => state.handleQuizAnswer);
  const reset = useSafariStore((state) => state.reset);

  // Résolveur de message UI (I18n découplée du store) - Approche polymorphe
  const messageResolvers: Record<
    SafariEventCode,
    (l: Labels, d: SafariEventData | null, lang: SupportedLanguage) => string
  > = {
    WELCOME: (l) => l.safari.welcome,
    DICE_ROLL: (l, d) => l.safari.diceRoll(d?.value || 0),
    ANIMAL_ENCOUNTER: (l, d) => l.safari.animalEncounter(d?.label || ''),
    ALREADY_HAVE: (l, d) => l.safari.alreadyHave(d?.label || ''),
    BOOST: (l, d) => l.safari.boost(d?.label || ''),
    HAZARD: (l, d) => l.safari.hazard(d?.label || ''),
    QUIZ_SUCCESS: (l, d, lang) => l.safari.quizSuccess(d?.title?.[lang] || ''),
    QUIZ_FAILURE: (l) => l.safari.quizFailure,
    MISSING_ANIMALS: (l, d) => l.safari.missingAnimals(d?.current || 0, d?.goal || QUEST_GOAL),
    VICTORY: (l) => l.safari.victory,
    RESET: (l) => l.safari.reset,
    CELL_LABEL: (_, d) => d?.label || '',
  };

  const message = messageResolvers[eventCode]?.(labels, eventData, language) || '';
  const questProgress = labels.safari.progress(inventory.length, QUEST_GOAL);

  // SÉLECTEURS QUIZ (ZUSTAND)
  const startQuiz = useQuizStore((state) => state.startQuiz);
  const submitAnswer = useQuizStore((state) => state.submitAnswer);
  const quizResult = useQuizStore((state) => state.quizResult);
  const attempts = useQuizStore((state) => state.attempts);

  const addBadge = useProgressionStore((state) => state.addBadge);
  const { playerName, avatar } = usePlayerStore();
  const equippedAccessoryId = useProgressionStore((state) => state.getEquippedAccessoryId());
  const equippedCompanionId = useProgressionStore((state) => state.getEquippedCompanionId());

  // Synchronisation du store de quiz avec l'animal rencontré
  useEffect(() => {
    if (activeQuiz) {
      startQuiz(activeQuiz.id as TopicId);
    }
  }, [activeQuiz, startQuiz]);

  // Nettoyage au démontage pour stopper toute tâche asynchrone en cours (Ticket #17)
  useEffect(() => {
    return () => {
      reset();
    };
  }, [reset]);

  const onQuizSubmit = (index: number) => {
    const { success, medal } = submitAnswer(index);
    // On notifie le moteur de jeu Safari pour qu'il avance (résolution de la case)
    handleQuizAnswer(success);

    // Enregistrer la progression globale
    if (success && medal && activeQuiz) {
      addBadge(activeQuiz.id as TopicId, medal);
    }
  };

  const getCompanionIcon = () => {
    if (equippedCompanionId === 'chien' || equippedCompanionId === 'dog-companion') return '🐶';
    if (equippedCompanionId === 'dino' || equippedCompanionId === 'dino-companion') return '🦕';
    if (equippedCompanionId === 'robot' || equippedCompanionId === 'robot-companion') return '🤖';
    if (equippedCompanionId === 'chat') return '🐱';
    if (equippedCompanionId === 'perroquet') return '🦜';
    if (equippedCompanionId === 'licorne') return '🦄';
    return '🦁'; // Guide Safari par défaut
  };

  return {
    gender,
    language,
    labels,
    showQuitConfirm,
    setShowQuitConfirm,
    playerPosition,
    lastRoll,
    status,
    activeQuiz,
    eventCode,
    eventData,
    inventory,
    diceColor,
    rollDice,
    handleQuizAnswer,
    reset,
    message,
    questProgress,
    quizResult,
    attempts,
    playerName,
    avatar,
    equippedAccessoryId,
    equippedCompanionId,
    onQuizSubmit,
    getCompanionIcon,
  };
};
