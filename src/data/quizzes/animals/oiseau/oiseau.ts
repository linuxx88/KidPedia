import { type Quiz } from '../../../topics/types';
import { type TopicId } from '../../../../types/domain';

export const oiseauQuizzes: Partial<Record<TopicId, Quiz>> = {
  pingouin: {
    question: {
      fr: 'Est-ce que le manchot peut voler dans le ciel ?',
      en: 'Can the penguin fly in the sky?',
    },
    options: {
      fr: ['Oui', 'Non, il nage', 'Seulement bébé'],
      en: ['Yes', 'No, it swims', 'Only as a baby'],
    },
    correctAnswer: 1,
  }
};
