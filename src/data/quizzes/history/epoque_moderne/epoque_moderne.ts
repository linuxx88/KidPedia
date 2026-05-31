import { type Quiz } from '../../../topics/types';
import { type TopicId } from '../../../../types/domain';

export const epoqueModerneQuizzes: Partial<Record<TopicId, Quiz>> = {
  pirates: {
    question: {
      fr: "Comment s'appelle le drapeau noir des pirates ?",
      en: 'What is the name of the black pirate flag?',
    },
    options: {
      fr: ['Le Jolly Roger', 'Le Beau Drapeau', 'Le Pavillon Bleu'],
      en: ['The Jolly Roger', 'The Beautiful Flag', 'The Blue Flag'],
    },
    correctAnswer: 0,
  },
  'leonard-vinci': {
    question: {
      fr: 'Quel célèbre tableau Léonard de Vinci a-t-il peint ?',
      en: 'Which famous painting did Leonardo da Vinci paint?',
    },
    options: {
      fr: ['La Joconde', 'Le Petit Prince', 'Un paysage de neige'],
      en: ['The Mona Lisa', 'The Little Prince', 'A snow landscape'],
    },
    correctAnswer: 0,
  },
  mayas: {
    question: {
      fr: 'Où les Mayas construisaient-ils leurs cités ?',
      en: 'Where did the Mayans build their cities?',
    },
    options: {
      fr: ['Dans le désert', 'Dans la jungle', 'Sur la glace'],
      en: ['In the desert', 'In the jungle', 'On ice'],
    },
    correctAnswer: 1,
  },
  'empire-incas': {
    question: {
      fr: "Dans quel endroit extraordinaire les Incas construisaient-ils leurs cités ?",
      en: "In what extraordinary place did the Incas build their cities?",
    },
    options: {
      fr: ["Tout en haut des montagnes", "Sous l'eau dans l'océan", "Dans le grand désert de sable"],
      en: ["High up in the mountains", "Underwater in the ocean", "In the great sand desert"],
    },
    correctAnswer: 0,
  },
  'invention-papier': {
    question: {
      fr: "Dans quel pays le papier a-t-il été inventé à l'origine ?",
      en: "In which country was paper originally invented?",
    },
    options: {
      fr: ["En Chine", "En France", "En Amérique"],
      en: ["China", "France", "America"],
    },
    correctAnswer: 0,
  }
};
