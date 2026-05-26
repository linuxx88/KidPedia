import { type Quiz } from '../topics/types';
import { type TopicId } from '../../types/domain';

export const QUIZ_BANKS: Partial<Record<TopicId, Quiz[]>> = {
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
      options: { fr: ['Du feu', "De l'eau liquide", 'De la glace seulement'], en: ['Fire', 'Liquid water', 'Only ice'] },
      correctAnswer: 1
    },
    {
      question: { fr: "Qu'est-ce qui rend la Terre si spéciale dans l'Espace ?", en: "What makes the Earth so special in Space?" },
      options: { fr: ["Elle a de l'eau, de l'air et abrite de la vie", "Elle est faite entièrement en chocolat", "Elle est complètement vide et silencieuse"], en: ["It has water, air, and supports life", "It is made entirely of chocolate", "It is completely empty and silent"] },
      correctAnswer: 0
    }
  ],
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
  ],
  singularite: [
    {
      question: { fr: "Qu'était l'univers au moment de la singularité ?", en: "What was the universe at the moment of the singularity?" },
      options: { fr: ['Un point minuscule et très chaud', 'Une galaxie géante', 'Un océan d\'eau froide'], en: ['A tiny and very hot point', 'A giant galaxy', 'An ocean of cold water'] },
      correctAnswer: 0
    },
    {
      question: { fr: "Il y a combien de temps le Big Bang a-t-il commencé environ ?", en: "About how long ago did the Big Bang start?" },
      options: { fr: ['2 000 ans', '1 million d\'années', '13,8 milliards d\'années'], en: ['2,000 years', '1 million years', '13.8 billion years'] },
      correctAnswer: 2
    },
    {
      question: { fr: "Que s'est-il passé juste après la singularité ?", en: "What happened just after the singularity?" },
      options: { fr: ['L\'univers s\'est arrêté', 'L\'univers a grandi très vite (expansion)', 'L\'univers a disparu'], en: ['The universe stopped', 'The universe grew very fast (expansion)', 'The universe disappeared'] },
      correctAnswer: 1
    }
  ]
};

export const QUIZZES: Partial<Record<TopicId, Quiz>> = {
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
  },
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
  },
  singularite: {
    question: {
      fr: "Qu'était l'univers au moment de la singularité ?",
      en: "What was the universe at the moment of the singularity?",
    },
    options: {
      fr: ['Un point minuscule et très chaud', 'Une galaxie géante', 'Un océan d\'eau froide'],
      en: ['A tiny and very hot point', 'A giant galaxy', 'An ocean of cold water'],
    },
    correctAnswer: 0,
    hint: {
      fr: "C'était quelque chose de tout petit, comme un minuscule grain de sable magique !",
      en: "It was something very small, like a tiny magic grain of sand!"
    }
  },
  'soupe-particules': {
    question: {
      fr: "À quoi ressemblait l'univers juste après le Big Bang ?",
      en: "What was the universe like right after the Big Bang?",
    },
    options: {
      fr: ["Une soupe de particules super chaude", "Un gros bloc de glace froide", "Un océan calme de poissons"],
      en: ["A super hot particle soup", "A big block of cold ice", "A calm ocean of fish"],
    },
    correctAnswer: 0,
    hint: {
      fr: "C'était si chaud et agité qu'on l'appelle une soupe magique !",
      en: "It was so hot and turbulent that we call it a magic soup!"
    }
  },
  'naissance-atomes': {
    question: {
      fr: "Qu'est-ce que les atomes qui se forment après le refroidissement ?",
      en: "What are the atoms that form after cooling down?",
    },
    options: {
      fr: ["Des petits vaisseaux spatiaux", "Les petites briques qui fabriquent tout dans l'univers", "Des bonbons multicolores"],
      en: ["Tiny spaceships", "The small bricks that build everything in the universe", "Colorful candies"],
    },
    correctAnswer: 1,
    hint: {
      fr: "Pense aux Legos : ce sont de toutes petites pièces pour tout construire !",
      en: "Think of Legos: they are tiny pieces used to build everything!"
    }
  },
  'expansion': {
    question: {
      fr: "Comment grandit l'univers pendant l'expansion ?",
      en: "How does the universe grow during expansion?",
    },
    options: {
      fr: ["Il reste tout petit", "Il grandit très vite, comme un ballon qui gonfle", "Il rétrécit chaque jour"],
      en: ["It stays very small", "It grows very fast, like an inflating balloon", "It shrinks every day"],
    },
    correctAnswer: 1,
    hint: {
      fr: "Imagine que tu souffles dans un ballon de baudruche géant !",
      en: "Imagine you are blowing into a giant party balloon!"
    }
  },
  'premieres-etoiles': {
    question: {
      fr: "Grâce à quelle force invisible les premières étoiles se sont-elles allumées ?",
      en: "Thanks to which invisible force did the first stars light up?",
    },
    options: {
      fr: ["La gravité", "Le vent de l'espace", "L'électricité statique"],
      en: ["Gravity", "The space wind", "Static electricity"],
    },
    correctAnswer: 0,
    hint: {
      fr: "C'est la force magique qui nous retient au sol sur la Terre !",
      en: "It is the magic force that keeps us on the ground on Earth!"
    }
  },
  'premieres-galaxies': {
    question: {
      fr: "Qu'est-ce qu'une galaxie ?",
      en: "What is a galaxy?",
    },
    options: {
      fr: ["Une seule étoile perdue", "Une grande famille contenant des milliards d'étoiles", "Une planète géante gazeuse"],
      en: ["A single lost star", "A huge family containing billions of stars", "A giant gas planet"],
    },
    correctAnswer: 1,
    hint: {
      fr: "C'est un grand tourbillon de lumière formé par beaucoup d'étoiles !",
      en: "It is a big swirl of light made of many, many stars!"
    }
  },
  'voie-lactee': {
    question: {
      fr: "Comment s'appelle notre propre galaxie ?",
      en: "What is the name of our own galaxy?",
    },
    options: {
      fr: ["La Voie Lactée", "La Galaxie du Chocolat", "Le Système Solaire"],
      en: ["The Milky Way", "The Chocolate Galaxy", "The Solar System"],
    },
    correctAnswer: 0,
    hint: {
      fr: "Elle porte le nom d'une boisson blanche délicieuse !",
      en: "It is named after a delicious white drink!"
    }
  }
};
