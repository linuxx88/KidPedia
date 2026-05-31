import { type Quiz } from '../../../topics/types';
import { type TopicId } from '../../../../types/domain';

export const poissonQuizzes: Partial<Record<TopicId, Quiz>> = {
  'poissons-sans-machoires': {
    question: {
      fr: "Comment les poissons sans mâchoires mangeaient-ils ?",
      en: "How did jawless fish eat?",
    },
    options: {
      fr: ["En croquant avec des dents pointues", "En aspirant leur nourriture", "En utilisant des bras articulés"],
      en: ["By biting with sharp teeth", "By sucking their food", "By using jointed arms"],
    },
    correctAnswer: 1,
    hint: {
      fr: "Comme ils n'avaient pas de mâchoire, ils devaient aspirer !",
      en: "Since they had no jaw, they had to suck!"
    }
  },
  'poissons-ecailles': {
    question: {
      fr: "Qu'est-ce qui permet aux poissons à écailles de nager plus vite ?",
      en: "What allows scaly fish to swim faster?",
    },
    options: {
      fr: ["Des plumes colorées", "Leurs écailles glissantes et leurs nageoires", "Une carapace lourde en pierre"],
      en: ["Color feathers", "Their slippery scales and fins", "A heavy stone shell"],
    },
    correctAnswer: 1,
    hint: {
      fr: "C'est tout doux, glissant et cela les aide à se propulser dans l'eau !",
      en: "It is smooth, slippery and helps them propel themselves through the water!"
    }
  }
};
