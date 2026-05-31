import { type Quiz } from '../../../topics/types';
import { type TopicId } from '../../../../types/domain';

export const felinQuizzes: Partial<Record<TopicId, Quiz>> = {
  lion: {
    question: {
      fr: 'Comment appelle-t-on le groupe de lions qui vivent ensemble ?',
      en: 'What is a group of lions called?',
    },
    options: {
      fr: ['Une équipe', 'Une troupe', 'Une chorale'],
      en: ['A team', 'A pride', 'A choir'],
    },
    correctAnswer: 1,
    hint: {
      fr: "C'est un mot qui commence par la lettre 'T'. On dit aussi une troupe de théâtre !",
      en: "It starts with the letter 'P'. Like the word pride, it means being proud!"
    }
  },
  tigre: {
    question: {
      fr: "Est-ce que les tigres aiment l'eau ?",
      en: 'Do tigers like water?',
    },
    options: {
      fr: ['Non, ils détestent ça', 'Oui, ils adorent nager', 'Seulement pour boire'],
      en: ["No, they hate it", "Yes, they love swimming", "Only for drinking"],
    },
    correctAnswer: 1,
  }
};
