import { type Quiz } from '../../../topics/types';
import { type TopicId } from '../../../../types/domain';

export const mammifereMarinQuizzes: Partial<Record<TopicId, Quiz>> = {
  dauphin: {
    question: {
      fr: 'Comment le dauphin communique-t-il ?',
      en: 'How does the dolphin communicate?',
    },
    options: {
      fr: ['En criant', 'Avec des cliquetis', 'En chantant'],
      en: ['By shouting', 'With clicks', 'By singing'],
    },
    correctAnswer: 1,
  }
};
