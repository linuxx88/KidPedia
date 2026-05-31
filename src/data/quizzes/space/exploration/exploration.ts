import { type Quiz } from '../../../topics/types';
import { type TopicId } from '../../../../types/domain';

export const explorationQuizBanks: Partial<Record<TopicId, Quiz[]>> = {
  'la-lune': [
    {
      question: { fr: "Est-ce que la Lune fabrique sa propre lumière ?", en: "Does the Moon make its own light?" },
      options: { fr: ['Oui', 'Non, elle reflète le Soleil', 'Parfois'], en: ['Yes', 'No, it reflects the Sun', 'Sometimes'] },
      correctAnswer: 1
    },
    {
      question: { fr: "Que se passe-t-il avec notre poids sur la Lune ?", en: "What happens to our weight on the Moon?" },
      options: { fr: ['On pèse plus lourd', 'On pèse 6 fois moins', 'On pèse pareil'], en: ['We weigh more', 'We weigh 6 times less', 'We weigh the same'] },
      correctAnswer: 1
    },
    {
      question: { fr: "Qui est déjà allé sur la Lune ?", en: "Who has already been to the Moon?" },
      options: { fr: ['Personne', 'Des extraterrestres', 'Des humains'], en: ['Nobody', 'Aliens', 'Humans'] },
      correctAnswer: 2
    },
    {
      question: { fr: "Pourquoi la Lune semble-t-elle changer de forme dans le ciel ?", en: "Why does the Moon seem to change its shape in the sky?" },
      options: { fr: ["Parce qu'elle tourne autour de la Terre et reflète le Soleil", "Parce qu'un dinosaure glouton en a croqué un morceau", "Parce qu'elle a trop chaud en été"], en: ["Because it orbits the Earth and reflects the Sun", "Because a greedy dinosaur took a bite out of it", "Because it gets too hot in summer"] },
      correctAnswer: 0
    }
  ]
};

export const explorationQuizzes: Partial<Record<TopicId, Quiz>> = {
  astronaute: {
    question: {
      fr: 'Pourquoi les astronautes flottent-ils ?',
      en: 'Why do astronauts float?',
    },
    options: {
      fr: ['Ils ont des ailes', "Il n'y en a pas de gravité", "C'est de la magie"],
      en: ['They have wings', 'There is no gravity', 'It is magic'],
    },
    correctAnswer: 1,
  },
  'la-lune': {
    question: {
      fr: 'Est-ce que la Lune fabrique sa propre lumière ?',
      en: 'Does the Moon make its own light?',
    },
    options: {
      fr: ['Oui, elle brille toute seule', 'Non, elle reflète le Soleil', 'Seulement les jours de fête'],
      en: ['Yes, it shines on its own', 'No, it reflects the Sun', 'Only on holidays'],
    },
    correctAnswer: 1,
  }
};
