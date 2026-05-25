import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
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

export interface QuizChampionshipState {
  // Persisted state
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
}

// Helper to shuffle and pick 10 random quizzes
export function getRandomChampionshipQuestions(): { topicId: string; quiz: Quiz }[] {
  const allQuizzes = Object.entries(QUIZZES)
    .filter(([_, quiz]) => quiz !== undefined)
    .map(([topicId, quiz]) => ({ topicId, quiz: quiz! }));
  
  const shuffled = [...allQuizzes].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, 10);
}

const STORAGE_KEY = 'kp-quiz-championship';

export const useQuizChampionshipStore = create<QuizChampionshipState>()(
  persist(
    (set, get) => ({
      // Persisted state
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

      nextQuestion: () => {
        const { currentQuestionIndex, questions } = get();
        if (currentQuestionIndex >= 9 || currentQuestionIndex >= questions.length - 1) {
          // Finish the game
          const { correctAnswersCount, totalTimeSpent, highScores } = get();
          const activeProfile = useProfileStore.getState().activeProfile;
          
          let updatedScores = [...highScores];
          
          if (activeProfile) {
            const newScore: ChampionshipHighScore = {
              id: Math.random().toString(36).substring(2, 11),
              profileId: activeProfile.id,
              profileName: activeProfile.name,
              profileAvatar: activeProfile.avatar,
              score: correctAnswersCount,
              timeSpent: totalTimeSpent,
              date: new Date().toISOString(),
            };
            
            updatedScores.push(newScore);
            // Sort: score desc, then timeSpent asc, then date desc
            updatedScores.sort((a, b) => {
              if (b.score !== a.score) return b.score - a.score;
              if (a.timeSpent !== b.timeSpent) return a.timeSpent - b.timeSpent;
              return new Date(b.date).getTime() - new Date(a.date).getTime();
            });
            // Keep top 5
            updatedScores = updatedScores.slice(0, 5);
            
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
            highScores: updatedScores,
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
    }),
    {
      name: STORAGE_KEY,
      storage: createJSONStorage(() => localStorage),
      // Only persist the highScores field
      partialize: (state) => ({ highScores: state.highScores }),
    }
  )
);

function gameStateHasEnded(state: 'idle' | 'playing' | 'ended'): boolean {
  return state === 'ended';
}
