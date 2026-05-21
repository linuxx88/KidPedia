import { create } from 'zustand';
import { type TopicId } from '../types/domain';
import { type MedalType, getRandomRetryMessage } from '../utils/quizMessages';
import { QUIZZES } from '../data/quizzes';
import { useSettingsStore } from './useSettingsStore';
import { useProgressionStore } from './useProgressionStore';
import { type Quiz } from '../data/topics/types';

interface QuizState {
  // --- STATE ---
  activeTopicId: TopicId | null;
  quizResult: { medal: MedalType } | null;
  attempts: number;
  retryMsg: string | null;
  activeHint: string | null;

  // --- ACTIONS ---
  /**
   * Initialise une session de quiz pour un sujet donné.
   */
  startQuiz: (topicId: TopicId) => void;

  /**
   * Valide une réponse et met à jour l'état de la session.
   * En cas de succès, notifie le store de progression.
   */
  submitAnswer: (index: number, currentQuiz?: Quiz) => { success: boolean; medal?: MedalType };

  /**
   * Réinitialise l'état du quiz en cours (pour un nouvel essai ou changement de sujet).
   */
  resetQuiz: () => void;
}

export const useQuizStore = create<QuizState>((set, get) => ({
  // --- Initial State ---
  activeTopicId: null,
  quizResult: null,
  attempts: 1,
  retryMsg: null,
  activeHint: null,

  // --- Actions ---
  startQuiz: (topicId) => {
    set({ 
      activeTopicId: topicId, 
      quizResult: null, 
      attempts: 1, 
      retryMsg: null,
      activeHint: null
    });
  },

  submitAnswer: (index, currentQuiz) => {
    const { activeTopicId, attempts } = get();
    if (!activeTopicId) return { success: false };

    const quiz = currentQuiz || QUIZZES[activeTopicId];
    if (!quiz) return { success: false };

    const { labels, gender, language } = useSettingsStore.getState();

    if (index === quiz.correctAnswer) {
      let medal: MedalType = 'gold';
      if (attempts === 2) medal = 'silver';
      if (attempts >= 3) medal = 'bronze';

      set({ quizResult: { medal }, retryMsg: null, activeHint: null });

      // Notification au store de progression pour persistance
      useProgressionStore.getState().addBadge(activeTopicId, medal);

      return { success: true, medal };
    } else {
      const nextAttempts = attempts + 1;
      const msg = getRandomRetryMessage(gender, labels);
      
      // On récupère l'indice s'il existe pour ce quiz
      const hint = quiz.hint ? quiz.hint[language] : null;

      set({ 
        attempts: nextAttempts, 
        retryMsg: msg,
        activeHint: nextAttempts === 2 ? hint : null // Indice visible seulement à la 1ère erreur (attempts passe à 2)
      });
      return { success: false };
    }
  },

  resetQuiz: () => {
    set({ quizResult: null, attempts: 1, retryMsg: null, activeHint: null });
  }
}));
