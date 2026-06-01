import { type Quiz } from '../data/topics/types';
import { type Profile } from '../store/useProfileStore';

/**
 * Factory pour les profils utilisateurs.
 */
export const createMockProfile = (overrides?: Partial<Profile>): Profile => ({
  id: 'test-id',
  name: 'Testeur',
  avatar: '👦',
  gender: 'boy',
  theme: 'light',
  language: 'fr',
  ...overrides,
});

/**
 * Factory pour les Quiz.
 */
export const createMockQuiz = (overrides?: Partial<Quiz>): Quiz => ({
  question: { fr: 'Quelle question ?', en: 'Which question?' },
  options: { 
    fr: ['A', 'B', 'C'], 
    en: ['A', 'B', 'C'] 
  },
  correctAnswer: 0,
  ...overrides,
});
