import { type Quiz } from '../../../topics/types';
import { type TopicId } from '../../../../types/domain';

export const mammifereTerrestreQuizzes: Partial<Record<TopicId, Quiz>> = {
  elephant: {
    question: {
      fr: "Qu'est-ce que les éléphants ne savent pas faire ?",
      en: 'What can elephants not do?',
    },
    options: {
      fr: ['Nager', 'Manger avec leur nez', 'Sauter'],
      en: ['Swim', 'Eat with their nose', 'Jump'],
    },
    correctAnswer: 2,
    hint: {
      fr: "Pense à tes pieds... Ils sont très lourds et ne peuvent pas décoller du sol en même temps !",
      en: "Think about your feet... They are very heavy and cannot leave the ground at the same time!"
    }
  },
  singe: {
    question: {
      fr: 'Comment les singes font-ils pour tenir en équilibre dans les arbres ?',
      en: 'How do monkeys balance in trees?',
    },
    options: {
      fr: ['Avec des chaussures spéciales', 'Grâce à leur queue', 'En tenant un parapluie'],
      en: ['With special shoes', 'Thanks to their tail', 'By holding an umbrella'],
    },
    correctAnswer: 1,
  },
  lapin: {
    question: {
      fr: "Qu'est-ce qui ne s'arrête jamais de pousser chez le lapin ?",
      en: 'What never stops growing in a rabbit?',
    },
    options: {
      fr: ['Ses oreilles', 'Ses dents', 'Sa queue'],
      en: ['Its ears', 'Its teeth', 'Its tail'],
    },
    correctAnswer: 1,
  },
  kangourou: {
    question: {
      fr: 'Où la maman kangourou garde-t-elle son bébé ?',
      en: 'Where does the mother kangaroo keep her baby?',
    },
    options: {
      fr: ['Dans un sac à dos', 'Dans sa poche', 'Sur sa tête'],
      en: ['In a backpack', 'In her pouch', 'On her head'],
    },
    correctAnswer: 1,
  },
  girafe: {
    question: {
      fr: 'De quelle couleur est la langue de la girafe ?',
      en: 'What color is the giraffe\'s tongue?',
    },
    options: {
      fr: ['Rose', 'Bleue', 'Verte'],
      en: ['Pink', 'Blue', 'Green'],
    },
    correctAnswer: 1,
  },
  panda: {
    question: {
      fr: 'Que mange principalement le panda ?',
      en: 'What does the panda mainly eat?',
    },
    options: {
      fr: ['Des pommes', 'Du bambou', 'Du miel'],
      en: ['Apples', 'Bamboo', 'Honey'],
    },
    correctAnswer: 1,
  },
  loup: {
    question: {
      fr: "Comment s'appelle la famille du loup ?",
      en: 'What is the wolf family called?',
    },
    options: {
      fr: ['Une meute', 'Une classe', 'Un club'],
      en: ['A pack', 'A class', 'A club'],
    },
    correctAnswer: 0,
  }
};
