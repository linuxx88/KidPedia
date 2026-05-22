import { type Quiz } from '../topics/types';
import { type TopicId } from '../../types/domain';

export const QUIZZES: Partial<Record<TopicId, Quiz>> = {
  'tour-eiffel': {
    question: {
      fr: 'Dans quelle ville se trouve la Tour Eiffel ?',
      en: 'In which city is the Eiffel Tower located?',
    },
    options: {
      fr: ['Londres', 'New York', 'Paris'],
      en: ['London', 'New York', 'Paris'],
    },
    correctAnswer: 2,
  },
  amazonie: {
    question: {
      fr: "Pourquoi l'Amazonie est-elle surnommée 'le poumon de la Terre' ?",
      en: "Why is the Amazon nicknamed 'the lungs of the Earth'?",
    },
    options: {
      fr: [
        "Parce qu'elle respire",
        "Parce qu'elle produit beaucoup d'oxygène",
        "Parce qu'elle ressemble à un poumon",
      ],
      en: ['Because it breathes', 'Because it produces a lot of oxygen', 'Because it looks like a lung'],
    },
    correctAnswer: 1,
  },
  'mont-everest': {
    question: {
      fr: 'Quelle était la particularité du Mont Everest ?',
      en: 'What is special about Mount Everest?',
    },
    options: {
      fr: [
        "C'est la plus haute montagne",
        "C'est la montagne la plus chaude",
        "C'est la plus petite colline",
      ],
      en: ['It is the highest mountain', 'It is the hottest mountain', 'It is the smallest hill'],
    },
    correctAnswer: 0,
  },
  'grande-muraille': {
    question: {
      fr: 'Dans quel pays se trouve cette Grande Muraille ?',
      en: 'In which country is this Great Wall located?',
    },
    options: {
      fr: ['En Italie', 'Au Japon', 'En Chine'],
      en: ['Italy', 'Japan', 'China'],
    },
    correctAnswer: 2,
  },
  antarctique: {
    question: {
      fr: 'Quel animal célèbre vit en Antarctique ?',
      en: 'Which famous animal lives in Antarctica?',
    },
    options: {
      fr: ['Le lion', 'Le manchot', 'Le kangourou'],
      en: ['The lion', 'The penguin', 'The kangaroo'],
    },
    correctAnswer: 1,
  },
  'grand-canyon': {
    question: {
      fr: "Qu'est-ce que l'官方 a creusé le Grand Canyon ?",
      en: 'What carved the Grand Canyon?',
    },
    options: {
      fr: ['Une pelle géante', 'La rivière Colorado', 'Le vent'],
      en: ['A giant shovel', 'The Colorado River', 'The wind'],
    },
    correctAnswer: 1,
  },
  'fleuve-nil': {
    question: {
      fr: 'Quel pays célèbre est traversé par le Nil ?',
      en: 'Which famous country is crossed by the Nile?',
    },
    options: {
      fr: ['La France', "L'Égypte", 'Le Mexique'],
      en: ['France', 'Egypt', 'Mexico'],
    },
    correctAnswer: 1,
  },
  'ocean-pacifique': {
    question: {
      fr: "Quelle partie de la Terre recouvre l'Océan Pacifique ?",
      en: 'How much of the Earth does the Pacific Ocean cover?',
    },
    options: {
      fr: ['Une toute petite partie', 'Un tiers de la surface', 'Seulement le Pôle Nord'],
      en: ['A very small part', 'One-third of the surface', 'Only the North Pole'],
    },
    correctAnswer: 1,
  },
  'desert-sahara': {
    question: {
      fr: 'Où se trouve le désert du Sahara ?',
      en: 'Where is the Sahara Desert located?',
    },
    options: {
      fr: ['En Europe', 'En Afrique du Nord', 'En Australie'],
      en: ['Europe', 'North Africa', 'Australia'],
    },
    correctAnswer: 1,
  },
  'barriere-corail': {
    question: {
      fr: 'Où se trouve la Grande Barrière de Corail ?',
      en: 'Where is the Great Barrier Reef located?',
    },
    options: {
      fr: ['En France', 'En Australie', 'Au Canada'],
      en: ['France', 'Australia', 'Canada'],
    },
    correctAnswer: 1,
  },
  'venise-eau': {
    question: {
      fr: 'Comment se déplace-t-on principalement à Venise ?',
      en: 'How do people mainly get around in Venice?',
    },
    options: {
      fr: ['En voiture', 'À vélo', 'En bateau'],
      en: ['By car', 'By bike', 'By boat'],
    },
    correctAnswer: 2,
  },
  'pyramides-egypte': {
    question: {
      fr: 'Pour qui les pyramides ont-elles été construites ?',
      en: 'Who were the pyramids built for?',
    },
    options: {
      fr: ['Pour les astronautes', 'Pour les Pharaons', 'Pour les touristes'],
      en: ['For astronauts', 'For Pharaohs', 'For tourists'],
    },
    correctAnswer: 1,
  }
};
