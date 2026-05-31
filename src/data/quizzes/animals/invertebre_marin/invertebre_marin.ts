import { type Quiz } from '../../../topics/types';
import { type TopicId } from '../../../../types/domain';

export const invertebreMarinQuizzes: Partial<Record<TopicId, Quiz>> = {
  'meduses-eponges': {
    question: {
      fr: "Qu'est-ce qui manque aux méduses et aux éponges ?",
      en: "What do jellyfish and sponges lack?",
    },
    options: {
      fr: ["Des dents de vampire", "Un squelette et des os", "De l'eau autour d'elles"],
      en: ["Vampire teeth", "A skeleton and bones", "Water around them"],
    },
    correctAnswer: 1,
    hint: {
      fr: "Elles sont toutes molles parce qu'elles n'ont pas d'os !",
      en: "They are completely soft because they have no bones!"
    }
  },
  'trilobites': {
    question: {
      fr: "En combien de parties la carapace des trilobites était-elle séparée ?",
      en: "Into how many parts was the trilobite shell split?",
    },
    options: {
      fr: ["Deux parties", "Trois parties", "Dix parties"],
      en: ["Two parts", "Three parts", "Ten parts"],
    },
    correctAnswer: 1,
    hint: {
      fr: "Pense au début de leur nom : 'tri'-lobites !",
      en: "Think of the beginning of their name: 'tri'-lobites!"
    }
  },
  'vers-marins': {
    question: {
      fr: "Où vivent principalement les vers marins ?",
      en: "Where do marine worms mainly live?",
    },
    options: {
      fr: ["Au fond de la mer dans le sable", "En haut des arbres", "Sur les nuages"],
      en: ["At the bottom of the sea in the sand", "At the top of trees", "On clouds"],
    },
    correctAnswer: 0,
    hint: {
      fr: "Ils adorent ramper tout en bas, là où se trouve le sable mouillé.",
      en: "They love to crawl all the way down, where the wet sand is."
    }
  },
  'coquillages-primitifs': {
    question: {
      fr: "Pourquoi les petits animaux ont-ils fabriqué des coquillages ?",
      en: "Why did small animals make shells?",
    },
    options: {
      fr: ["Pour faire de la musique", "Pour se protéger des prédateurs", "Pour flotter comme des ballons"],
      en: ["To make music", "To protect themselves from predators", "To float like balloons"],
    },
    correctAnswer: 1,
    hint: {
      fr: "C'est comme un bouclier très dur pour se cacher !",
      en: "It is like a very hard shield to hide behind!"
    }
  },
  'anomalocaris': {
    question: {
      fr: "Que signifie le nom 'Anomalocaris' ?",
      en: "What does the name 'Anomalocaris' mean?",
    },
    options: {
      fr: ["Poisson géant", "Crevette bizarre", "Coquillage magique"],
      en: ["Giant fish", "Strange shrimp", "Magical shell"],
    },
    correctAnswer: 1,
    hint: {
      fr: "C'est une petite bête de mer très connue, mais version très bizarre !",
      en: "It is a very famous little sea creature, but a very strange version!"
    }
  }
};
