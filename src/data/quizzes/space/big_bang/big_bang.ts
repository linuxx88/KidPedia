import { type Quiz } from '../../../topics/types';
import { type TopicId } from '../../../../types/domain';

export const bigBangQuizBanks: Partial<Record<TopicId, Quiz[]>> = {
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

export const bigBangQuizzes: Partial<Record<TopicId, Quiz>> = {
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
