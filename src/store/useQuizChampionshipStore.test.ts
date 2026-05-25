import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { useQuizChampionshipStore } from './useQuizChampionshipStore';
import { useProgressionStore } from './useProgressionStore';

vi.mock('./useProfileStore', () => {
  const mockProfile = {
    id: 'test-profile-id',
    name: 'Champion',
    avatar: '🏆',
  };
  return {
    useProfileStore: {
      getState: () => ({
        activeProfile: mockProfile,
      }),
    },
  };
});

vi.mock('./useProgressionStore', () => {
  const addXP = vi.fn();
  const addTickets = vi.fn();
  return {
    useProgressionStore: {
      getState: () => ({
        addXP,
        addTickets,
      }),
    },
  };
});

describe('useQuizChampionshipStore', () => {
  beforeEach(() => {
    useQuizChampionshipStore.getState().resetGame();
    vi.clearAllMocks();
  });

  it('should initialize with idle state and empty high scores', () => {
    const { result } = renderHook(() => useQuizChampionshipStore());
    expect(result.current.gameState).toBe('idle');
    expect(result.current.questions).toHaveLength(0);
    expect(result.current.highScores).toBeDefined();
  });

  it('should start championship and load 10 questions', () => {
    const { result } = renderHook(() => useQuizChampionshipStore());
    
    act(() => {
      result.current.startChampionship();
    });

    expect(result.current.gameState).toBe('playing');
    expect(result.current.questions).toHaveLength(10);
    expect(result.current.currentQuestionIndex).toBe(0);
    expect(result.current.secondsRemaining).toBe(15);
  });

  it('should submit answers and track correctness', () => {
    const { result } = renderHook(() => useQuizChampionshipStore());

    act(() => {
      result.current.startChampionship();
    });

    const activeQuestion = result.current.questions[0];
    const correctAns = activeQuestion.quiz.correctAnswer;
    const incorrectAns = (correctAns + 1) % 3;

    let res = { success: false, isCorrect: false };

    // Submit incorrect first (on a mock-like play context)
    act(() => {
      res = result.current.submitAnswer(incorrectAns);
    });

    expect(res.success).toBe(true);
    expect(res.isCorrect).toBe(false);
    expect(result.current.hasAnsweredCurrent).toBe(true);
    expect(result.current.isCorrectCurrent).toBe(false);
    expect(result.current.correctAnswersCount).toBe(0);
  });

  it('should tick timer and handle timeouts', () => {
    const { result } = renderHook(() => useQuizChampionshipStore());

    act(() => {
      result.current.startChampionship();
    });

    expect(result.current.secondsRemaining).toBe(15);

    act(() => {
      result.current.tickTimer();
    });

    expect(result.current.secondsRemaining).toBe(14);
    expect(result.current.totalTimeSpent).toBe(1);

    // Force timeout
    act(() => {
      // Simulate 14 more ticks
      for (let i = 0; i < 14; i++) {
        result.current.tickTimer();
      }
    });

    expect(result.current.secondsRemaining).toBe(0);
    expect(result.current.hasAnsweredCurrent).toBe(true);
    expect(result.current.isCorrectCurrent).toBe(false);
  });

  it('should finish game after 10 questions and award progression rewards', () => {
    const { result } = renderHook(() => useQuizChampionshipStore());

    act(() => {
      result.current.startChampionship();
    });

    // Answer 10 questions
    for (let i = 0; i < 10; i++) {
      const currentQ = result.current.questions[result.current.currentQuestionIndex];
      act(() => {
        result.current.submitAnswer(currentQ.quiz.correctAnswer); // correct answer
      });
      act(() => {
        result.current.nextQuestion();
      });
    }

    expect(result.current.gameState).toBe('ended');
    expect(result.current.correctAnswersCount).toBe(10);
    expect(result.current.highScores).toHaveLength(1);
    expect(result.current.highScores[0].score).toBe(10);
    expect(result.current.highScores[0].profileName).toBe('Champion');

    const progressionStore = useProgressionStore.getState();
    expect(progressionStore.addXP).toHaveBeenCalledWith(1500); // 10 * 100 + 500 perfect bonus
    expect(progressionStore.addTickets).toHaveBeenCalledWith(15); // 10 + 5 perfect bonus
  });
});
