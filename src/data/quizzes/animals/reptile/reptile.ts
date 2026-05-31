import { type Quiz } from '../../../topics/types';
import { type TopicId } from '../../../../types/domain';

export const reptileQuizzes: Partial<Record<TopicId, Quiz>> = {
  tortue: {
    question: {
      fr: 'À quoi sert la carapace de la tortue ?',
      en: "What is the turtle's shell for?",
    },
    options: {
      fr: ['À faire du sport', 'À se protéger', 'À ranger ses jouets'],
      en: ['For sports', 'To protect itself', 'To store toys'],
    },
    correctAnswer: 1,
  }
};
