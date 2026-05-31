import { create, type UseBoundStore, type StoreApi } from 'zustand';
import { indexedDBMiddleware } from './indexedDBMiddleware';
import { type Quiz } from '../data/topics/types';
import { QUIZZES } from '../data/quizzes';
import { useProfileStore } from './useProfileStore';
import { useProgressionStore } from './useProgressionStore';

export interface ChampionshipHighScore {
  id: string;
  profileId: string;
  profileName: string;
  profileAvatar: string;
  score: number; // 0 to 10
  timeSpent: number; // in seconds
  date: string; // ISO date string
}

export interface QuizChampionshipRecord {
  profileId: string;
  score: number;
  completedAt: string;
}

export interface QuizChampionshipState {
  // Persisted state
  records: readonly QuizChampionshipRecord[];
  highScores: ChampionshipHighScore[];

  // Runtime state
  gameState: 'idle' | 'playing' | 'ended';
  questions: { topicId: string; quiz: Quiz }[];
  currentQuestionIndex: number;
  correctAnswersCount: number;
  secondsRemaining: number;
  selectedAnswerIndex: number | null;
  hasAnsweredCurrent: boolean;
  isCorrectCurrent: boolean | null;
  totalTimeSpent: number;

  // Actions
  startChampionship: () => void;
  submitAnswer: (index: number) => { success: boolean; isCorrect: boolean };
  nextQuestion: () => void;
  tickTimer: () => void;
  resetGame: () => void;
  addRecord: (record: QuizChampionshipRecord) => void;
}

// Helper to shuffle and pick 10 random quizzes
export function getRandomChampionshipQuestions(): { topicId: string; quiz: Quiz }[] {
  const allQuizzes = Object.entries(QUIZZES)
    .filter(([_, quiz]) => quiz !== undefined)
    .map(([topicId, quiz]) => ({ topicId, quiz: quiz! }));
  
  const shuffled = [...allQuizzes].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, 10);
}

export function syncHighScores(records: readonly QuizChampionshipRecord[]): ChampionshipHighScore[] {
  const profileStore = useProfileStore.getState();
  const profiles = profileStore.profiles || [];
  const activeProfile = profileStore.activeProfile;

  return records.map((rec) => {
    let profile = profiles.find((p) => p.id === rec.profileId);
    if (!profile && activeProfile && activeProfile.id === rec.profileId) {
      profile = activeProfile;
    }
    return {
      id: `${rec.profileId}-${rec.completedAt}`,
      profileId: rec.profileId,
      profileName: profile ? profile.name : 'Champion',
      profileAvatar: profile ? profile.avatar : '🏆',
      score: rec.score,
      timeSpent: 0,
      date: rec.completedAt
    };
  });
}

const STORAGE_KEY = 'kp-championship-storage';

export const useQuizChampionshipStore = create<QuizChampionshipState>()(
  indexedDBMiddleware<QuizChampionshipState>({
    name: STORAGE_KEY,
    partialize: (state) => ({
      records: state.records
    }),
    onRehydrate: (state) => {
      if (state) {
        state.highScores = syncHighScores(state.records || []);
      }
    }
  })((set, get) => ({
    // Persisted state
    records: [],
    highScores: [],

    // Runtime state
    gameState: 'idle',
    questions: [],
    currentQuestionIndex: 0,
    correctAnswersCount: 0,
    secondsRemaining: 15,
    selectedAnswerIndex: null,
    hasAnsweredCurrent: false,
    isCorrectCurrent: null,
    totalTimeSpent: 0,

    // Actions
    startChampionship: () => {
      const selected = getRandomChampionshipQuestions();
      set({
        gameState: 'playing',
        questions: selected,
        currentQuestionIndex: 0,
        correctAnswersCount: 0,
        secondsRemaining: 15,
        selectedAnswerIndex: null,
        hasAnsweredCurrent: false,
        isCorrectCurrent: null,
        totalTimeSpent: 0,
      });
    },

    submitAnswer: (index: number) => {
      const { questions, currentQuestionIndex, hasAnsweredCurrent } = get();
      if (hasAnsweredCurrent || gameStateHasEnded(get().gameState)) {
        return { success: false, isCorrect: false };
      }

      const current = questions[currentQuestionIndex];
      if (!current) return { success: false, isCorrect: false };

      const isCorrect = index === current.quiz.correctAnswer;

      set((state) => ({
        selectedAnswerIndex: index,
        hasAnsweredCurrent: true,
        isCorrectCurrent: isCorrect,
        correctAnswersCount: isCorrect ? state.correctAnswersCount + 1 : state.correctAnswersCount,
      }));

      return { success: true, isCorrect };
    },

    addRecord: (record: QuizChampionshipRecord) => {
      const currentRecords = [...get().records, record];
      // Ensure addRecord enforces records.sort(...).slice(0, 5) before state mutation.
      currentRecords.sort((a, b) => b.score - a.score);
      const truncatedRecords = currentRecords.slice(0, 5);
      
      set({
        records: truncatedRecords,
        highScores: syncHighScores(truncatedRecords),
      });
    },

    nextQuestion: () => {
      const { currentQuestionIndex, questions } = get();
      if (currentQuestionIndex >= 9 || currentQuestionIndex >= questions.length - 1) {
        // Finish the game
        const { correctAnswersCount } = get();
        const activeProfile = useProfileStore.getState().activeProfile;
        
        if (activeProfile) {
          const newRecord: QuizChampionshipRecord = {
            profileId: activeProfile.id,
            score: correctAnswersCount,
            completedAt: new Date().toISOString(),
          };
          
          get().addRecord(newRecord);
          
          // Reward XP and tickets
          // 100 XP per correct answer
          // Perfect bonus: 500 XP
          const xpReward = (correctAnswersCount * 100) + (correctAnswersCount === 10 ? 500 : 0);
          // Tickets: 1 ticket per correct answer, and +5 if perfect
          const ticketReward = correctAnswersCount + (correctAnswersCount === 10 ? 5 : 0);
          
          if (xpReward > 0) {
            useProgressionStore.getState().addXP(xpReward);
          }
          if (ticketReward > 0) {
            useProgressionStore.getState().addTickets(ticketReward);
          }
        }
        
        set({
          gameState: 'ended',
        });
      } else {
        set((state) => ({
          currentQuestionIndex: state.currentQuestionIndex + 1,
          secondsRemaining: 15,
          selectedAnswerIndex: null,
          hasAnsweredCurrent: false,
          isCorrectCurrent: null,
        }));
      }
    },

    tickTimer: () => {
      const { gameState, secondsRemaining, hasAnsweredCurrent } = get();
      if (gameState !== 'playing') return;

      set((state) => ({
        totalTimeSpent: state.totalTimeSpent + 1,
      }));

      if (hasAnsweredCurrent) return;

      if (secondsRemaining <= 1) {
        // Time out! Mark as incorrect and answered
        set({
          secondsRemaining: 0,
          hasAnsweredCurrent: true,
          selectedAnswerIndex: null,
          isCorrectCurrent: false,
        });
      } else {
        set((state) => ({
          secondsRemaining: state.secondsRemaining - 1,
        }));
      }
    },

    resetGame: () => {
      set({
        gameState: 'idle',
        questions: [],
        currentQuestionIndex: 0,
        correctAnswersCount: 0,
        secondsRemaining: 15,
        selectedAnswerIndex: null,
        hasAnsweredCurrent: false,
        isCorrectCurrent: null,
        totalTimeSpent: 0,
      });
    },
  }))
) as UseBoundStore<StoreApi<QuizChampionshipState>> & {
  persist: {
    rehydrate: () => Promise<void>;
    clearStorage: () => Promise<void>;
    hasHydrated: () => boolean;
  };
};

function gameStateHasEnded(state: 'idle' | 'playing' | 'ended'): boolean {
  return state === 'ended';
}
