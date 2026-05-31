import { type Quiz } from '../../../topics/types';
import { type TopicId } from '../../../../types/domain';

export const antiquiteQuizzes: Partial<Record<TopicId, Quiz>> = {
  pyramides: {
    question: {
      fr: 'Pourquoi les Égyptiens construisaient-ils des pyramides ?',
      en: 'Why did the Egyptians build pyramids?',
    },
    options: {
      fr: ['Pour stocker du grain', 'Comme tombeaux pour les pharaons', 'Pour observer les étoiles'],
      en: ['To store grain', 'As tombs for pharaohs', 'To observe the stars'],
    },
    correctAnswer: 1,
  },
  romains: {
    question: {
      fr: "Qu'est-ce que les Romains construisaient pour transporter l'eau ?",
      en: 'What did the Romans build to transport water?',
    },
    options: {
      fr: ['Des toboggans', 'Des aqueducs', 'Des camions'],
      en: ['Slides', 'Aqueducts', 'Trucks'],
    },
    correctAnswer: 1,
  },
  'grece-antique': {
    question: {
      fr: 'Quelle célèbre compétition sportive les Grecs ont-ils inventée ?',
      en: 'Which famous sporting competition did the Greeks invent?',
    },
    options: {
      fr: ['Le Football', 'Les Jeux Olympiques', 'Le Tour de France'],
      en: ['Football', 'The Olympic Games', 'The Tour de France'],
    },
    correctAnswer: 1,
  },
  'ecriture-sacree': {
    question: {
      fr: "Comment s'appelaient les petits dessins que les Égyptiens utilisaient pour écrire ?",
      en: "What were the small drawings the Egyptians used to write called?",
    },
    options: {
      fr: ["Les hiéroglyphes", "Les chiffres", "Les étoiles"],
      en: ["Hieroglyphs", "Numbers", "Stars"],
    },
    correctAnswer: 0,
  }
};
