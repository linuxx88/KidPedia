import { type Quiz } from '../../../topics/types';
import { type TopicId } from '../../../../types/domain';

export const soleilPlanetesQuizBanks: Partial<Record<TopicId, Quiz[]>> = {
  soleil: [
    {
      question: { fr: "Quelle est l'étoile au centre de notre système solaire ?", en: "What is the star at the center of our solar system?" },
      options: { fr: ['La Terre', 'Le Soleil', 'La Lune'], en: ['The Earth', 'The Sun', 'The Moon'] },
      correctAnswer: 1
    },
    {
      question: { fr: "Combien de Terres pourrait-on mettre dans le Soleil ?", en: "How many Earths could fit inside the Sun?" },
      options: { fr: ['100', '1 000', '1 million'], en: ['100', '1,000', '1 million'] },
      correctAnswer: 2
    },
    {
      question: { fr: "Que nous donne le Soleil ?", en: "What does the Sun give us?" },
      options: { fr: ['De la neige', 'De la lumière et de la chaleur', 'De la pluie'], en: ['Snow', 'Light and heat', 'Rain'] },
      correctAnswer: 1
    },
    {
      question: { fr: "Que partage le Soleil avec la Terre pour nous réchauffer ?", en: "What does the Sun share with the Earth to keep us warm?" },
      options: { fr: ["Des glaçons à la fraise", "Sa lumière et sa chaleur", "Du vent froid"], en: ["Strawberry ice cubes", "Its light and warmth", "Cold wind"] },
      correctAnswer: 1
    }
  ],
  terre: [
    {
      question: { fr: "Comment appelle-t-on notre planète ?", en: "What do we call our planet?" },
      options: { fr: ['La planète rouge', 'La planète bleue', 'La planète géante'], en: ['The red planet', 'The blue planet', 'The giant planet'] },
      correctAnswer: 1
    },
    {
      question: { fr: "À quelle vitesse tourne la Terre ?", en: "How fast does the Earth spin?" },
      options: { fr: ['10 km/h', '1600 km/h', 'Elle ne tourne pas'], en: ['10 km/h', '1600 km/h', 'It does not spin'] },
      correctAnswer: 1
    },
    {
      question: { fr: "Qu'y a-t-il sur Terre qui permet la vie ?", en: "What is on Earth that allows life?" },
      options: { fr: ['Du fire', "De l'eau liquide", 'De la glace seulement'], en: ['Fire', 'Liquid water', 'Only ice'] },
      correctAnswer: 1
    },
    {
      question: { fr: "Qu'est-ce qui rend la Terre si spéciale dans l'Espace ?", en: "What makes the Earth so special in Space?" },
      options: { fr: ["Elle a de l'eau, de l'air et abrite de la vie", "Elle est faite entièrement en chocolat", "Elle est complètement vide et silencieuse"], en: ["It has water, air, and supports life", "It is made entirely of chocolate", "It is completely empty and silent"] },
      correctAnswer: 0
    }
  ]
};

export const soleilPlanetesQuizzes: Partial<Record<TopicId, Quiz>> = {
  soleil: {
    question: {
      fr: 'Le Soleil est-il une planète ?',
      en: 'Is the Sun a planet?',
    },
    options: {
      fr: ['Oui', "Non, c'est une étoile", "C'est un nuage"],
      en: ['Yes', 'No, it is a star', 'It is a cloud'],
    },
    correctAnswer: 1,
  },
  mercure: {
    question: {
      fr: 'Est-ce que Mercure est loin du Soleil ?',
      en: 'Is Mercury far from the Sun?',
    },
    options: {
      fr: ['Oui', "Non, c'est la plus proche", 'Au milieu'],
      en: ['Yes', 'No, it is the closest', 'In the middle'],
    },
    correctAnswer: 1,
  },
  venus: {
    question: {
      fr: 'Pourquoi Vénus est-elle très chaude ?',
      en: 'Why is Venus very hot?',
    },
    options: {
      fr: ['À cause de ses nuages', "Parce qu'elle brûle", "C'est un mystère"],
      en: ['Because of its clouds', 'Because it is burning', 'It is a mystery'],
    },
    correctAnswer: 0,
  },
  terre: {
    question: {
      fr: 'Pourquoi la Terre est-elle bleue ?',
      en: 'Why is the Earth blue?',
    },
    options: {
      fr: ['Grâce au ciel', 'À cause des océans', 'Elle est peinte'],
      en: ['Thanks to the sky', 'Because of the oceans', 'It is painted'],
    },
    correctAnswer: 1,
  },
  mars: {
    question: {
      fr: 'Pourquoi Mars est-elle rouge ?',
      en: 'Why is Mars red?',
    },
    options: {
      fr: ['À cause du sable', 'À cause de la rouille', 'Elle a eu chaud'],
      en: ['Because of the sand', 'Because of rust', 'It got hot'],
    },
    correctAnswer: 1,
  },
  jupiter: {
    question: {
      fr: "Qu'est-ce que la tache rouge de Jupiter ?",
      en: 'What is the red spot on Jupiter?',
    },
    options: {
      fr: ['Un volcan', 'Une tempête', 'Un océan'],
      en: ['A volcano', 'A storm', 'An ocean'],
    },
    correctAnswer: 1,
  },
  saturne: {
    question: {
      fr: 'De quoi sont faits les anneaux de Saturne ?',
      en: "What are Saturn's rings made of?",
    },
    options: {
      fr: ['De poussière', 'De glace et de roche', 'De rubans'],
      en: ['Dust', 'Ice and rock', 'Ribbons'],
    },
    correctAnswer: 1,
  },
  uranus: {
    question: {
      fr: 'How does Uranus spin?',
      en: 'How does Uranus spin?',
    },
    options: {
      fr: ['Comme une toupie', 'Sur le côté', 'Elle ne tourne pas'],
      en: ['Like a top', 'On its side', 'It does not spin'],
    },
    correctAnswer: 1,
  },
  neptune: {
    question: {
      fr: 'Comment est le vent sur Neptune ?',
      en: 'How is the wind on Neptune?',
    },
    options: {
      fr: ['Faible', 'Très fort', "Il n'y en a pas"],
      en: ['Weak', 'Very strong', 'There is none'],
    },
    correctAnswer: 1,
  },
  pluton: {
    question: {
      fr: 'Quelle forme voit-on sur Pluton ?',
      en: 'What shape do we see on Pluto?',
    },
    options: {
      fr: ['Un carré', 'Un cœur', 'Une étoile'],
      en: ['A square', 'A heart', 'A star'],
    },
    correctAnswer: 1,
  }
};
