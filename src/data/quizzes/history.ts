import { type Quiz } from '../topics/types';
import { type TopicId } from '../../types/domain';

export const QUIZZES: Partial<Record<TopicId, Quiz>> = {
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
  chevaliers: {
    question: {
      fr: 'Où vivaient souvent les chevaliers ?',
      en: 'Where did knights often live?',
    },
    options: {
      fr: ['Dans des cabanes', 'Dans des châteaux', 'Dans des bateaux'],
      en: ['In huts', 'In castles', 'In boats'],
    },
    correctAnswer: 1,
  },
  vikings: {
    question: {
      fr: "Comment s'appelaient les bateaux des Vikings ?",
      en: 'What were Viking boats called?',
    },
    options: {
      fr: ['Des barques', 'Des drakkars', 'Des canoës'],
      en: ['Skiffs', 'Longships', 'Canoes'],
    },
    correctAnswer: 1,
  },
  chateaux: {
    question: {
      fr: "Comment s'appelle le pont qu'on peut remonter pour fermer le château ?",
      en: 'What is the name of the bridge that can be raised to close the castle?',
    },
    options: {
      fr: ['Le pont-levis', 'Le pont-volant', 'Le pont-sauteur'],
      en: ['Drawbridge', 'Flying bridge', 'Jumping bridge'],
    },
    correctAnswer: 0,
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
  samourais: {
    question: {
      fr: 'De quel pays venaient les samouraïs ?',
      en: 'Which country did the samurai come from?',
    },
    options: {
      fr: ['De Chine', 'Du Japon', 'De France'],
      en: ['China', 'Japan', 'France'],
    },
    correctAnswer: 1,
  },
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
