import { type Quiz } from '../../../topics/types';
import { type TopicId } from '../../../../types/domain';

export const epoqueContemporaineQuizzes: Partial<Record<TopicId, Quiz>> = {
  'premier-pas-lune': {
    question: {
      fr: 'Qui est le premier homme à avoir marché sur la Lune ?',
      en: 'Who was the first man to walk on the Moon?',
    },
    options: {
      fr: ['Tintin', 'Neil Armstrong', "Buzz l'Éclair"],
      en: ['Tintin', 'Neil Armstrong', 'Buzz Lightyear'],
    },
    correctAnswer: 1,
  }
};
