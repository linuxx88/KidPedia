import { type Quiz } from '../../../topics/types';
import { type TopicId } from '../../../../types/domain';

export const prehistoireQuizzes: Partial<Record<TopicId, Quiz>> = {
  prehistoire: {
    question: {
      fr: 'Où les hommes préhistoriques dessinaient-ils souvent ?',
      en: 'Where did prehistoric humans often draw?',
    },
    options: {
      fr: ['Sur du papier', 'Dans des grottes', 'Sur des voitures'],
      en: ['On paper', 'In caves', 'On cars'],
    },
    correctAnswer: 1,
  },
  'berceau-afrique': {
    question: {
      fr: "Quel est le nom de la région d'Afrique où l'histoire humaine a commencé ?",
      en: "What is the name of the region in Africa where human history began?",
    },
    options: {
      fr: ["Le Grand Rift", "Le grand désert", "La forêt dense"],
      en: ["The Great Rift", "The great desert", "The dense forest"],
    },
    correctAnswer: 0,
  },
  'debout-deux-pieds': {
    question: {
      fr: "Comment s'appelle le fait de se tenir debout et de marcher sur deux pieds ?",
      en: "What is standing up and walking on two feet called?",
    },
    options: {
      fr: ["La nage", "La bipédie", "Le vol"],
      en: ["Swimming", "Bipedalism", "Flying"],
    },
    correctAnswer: 1,
  },
  'artisan-pierres': {
    question: {
      fr: "Quel est le surnom de l'Homo Habilis qui a créé les premiers outils ?",
      en: "What is the nickname of Homo Habilis who created the first tools?",
    },
    options: {
      fr: ["L'homme rapide", "L'homme habile", "L'homme fort"],
      en: ["Handy man", "Fast man", "Strong man"],
    },
    correctAnswer: 1,
  },
  'dompteur-feu': {
    question: {
      fr: "Qu'est-ce que la nourriture cuite sur le feu a aidé à grandir chez les humains ?",
      en: "What did food cooked on the fire help grow in humans?",
    },
    options: {
      fr: ["Leurs cheveux", "Leur cerveau", "Leurs dents"],
      en: ["Their hair", "Their brain", "Their teeth"],
    },
    correctAnswer: 1,
  },
  'grand-voyage': {
    question: {
      fr: "Comment les premiers humains sont-ils passés de l'Asie à l'Amérique ?",
      en: "How did early humans cross from Asia to America?",
    },
    options: {
      fr: ["En marchant sur de la glace géante", "En avion", "En sous-marin"],
      en: ["By walking on giant ice", "By plane", "By submarine"],
    },
    correctAnswer: 0,
  },
  'cousins-neandertal': {
    question: {
      fr: "À quel âge de la Terre l'Homme de Néandertal était-il adapté ?",
      en: "Which Earth age was Neanderthal man adapted to?",
    },
    options: {
      fr: ["L'âge de glace", "L'âge du sable", "L'âge du feu"],
      en: ["The ice age", "The sand age", "The fire age"],
    },
    correctAnswer: 0,
  },
  'artistes-cavernes': {
    question: {
      fr: "Comment s'appelle la célèbre grotte française souvent appelée la 'Chapelle Sixtine de la préhistoire' ?",
      en: "What is the name of the famous French cave often called the 'Sistine Chapel of prehistory'?",
    },
    options: {
      fr: ["La grotte de Lascaux", "La grotte bleue", "La grotte de glace"],
      en: ["Lascaux Cave", "The blue cave", "The ice cave"],
    },
    correctAnswer: 0,
  }
};

export const prehistoireQuizBanks: Partial<Record<TopicId, Quiz[]>> = {
  prehistoire: [
    {
      question: {
        fr: 'Où les hommes préhistoriques dessinaient-ils souvent ?',
        en: 'Where did prehistoric humans often draw?',
      },
      options: {
        fr: ['Sur du papier', 'Dans des grottes', 'Sur des voitures'],
        en: ['On paper', 'In caves', 'On cars'],
      },
      correctAnswer: 1,
    },
    {
      question: {
        fr: "Quel est l'outil principal fabriqué en pierre par les hommes préhistoriques ?",
        en: 'What was the main stone tool made by prehistoric humans?',
      },
      options: {
        fr: ['Un tournevis', 'Un biface ou silex taillé', 'Un marteau-piqueur'],
        en: ['A screwdriver', 'A hand axe or knapped flint', 'A jackhammer'],
      },
      correctAnswer: 1,
    }
  ]
};
