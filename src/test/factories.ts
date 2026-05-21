import { type Topic, type Quiz } from '../data/topics/types';
import { type Profile } from '../store/useProfileStore';
import { type TopicId, type EarnedBadge } from '../types/domain';
import { type MedalType } from '../utils/quizMessages';

/**
 * Factory pour les sujets (Topic).
 * Garantit un objet complet et typé pour les tests.
 */
export const createMockTopic = (overrides?: Partial<Topic>): Topic => ({
  id: 'lion' as TopicId,
  title: { fr: 'Le Lion', en: 'The Lion' },
  category: { fr: 'Animaux', en: 'Animals' },
  categoryKey: 'animaux',
  icon: '🦁',
  shortDesc: { fr: 'Court', en: 'Short' },
  fullContent: { fr: 'Contenu complet', en: 'Full content' },
  funFact: { fr: 'Fait amusant', en: 'Fun fact' },
  ...overrides,
});

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
 * Factory pour les badges gagnés.
 */
export const createMockEarnedBadge = (overrides?: Partial<EarnedBadge>): EarnedBadge => ({
  id: 'lion',
  medal: 'gold' as MedalType,
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
