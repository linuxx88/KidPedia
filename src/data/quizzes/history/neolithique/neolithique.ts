import { type Quiz } from '../../../topics/types';
import { type TopicId } from '../../../../types/domain';

export const neolithiqueQuizzes: Partial<Record<TopicId, Quiz>> = {
  'premiers-villages': {
    question: {
      fr: "Qu'est-ce que les humains ont appris à faire pour pouvoir vivre dans les premiers villages fixes ?",
      en: "What did humans learn to do to be able to live in the first permanent villages?",
    },
    options: {
      fr: ["Piloter des avions", "L'agriculture et l'élevage", "Nager sous l'eau"],
      en: ["Fly planes", "Agriculture and farming", "Swim underwater"],
    },
    correctAnswer: 1,
  },
  sedentarisation: {
    question: {
      fr: "Que signifie le fait de devenir sédentaire ?",
      en: "What does becoming sedentary mean?",
    },
    options: {
      fr: ["Voyager tout le temps", "S'installer et vivre au même endroit", "Vivre uniquement dans des grottes"],
      en: ["Traveling all the time", "Settling down and living in the same place", "Living only in caves"],
    },
    correctAnswer: 1,
  },
  'murs-terre': {
    question: {
      fr: "Quel mélange naturel utilisait-on pour fabriquer des murs solides ?",
      en: "What natural mixture was used to make solid walls?",
    },
    options: {
      fr: ["De la paille et de la terre mouillée", "Du plastique et du sable", "De la glace et des feuilles"],
      en: ["Straw and wet earth", "Plastic and sand", "Ice and leaves"],
    },
    correctAnswer: 0,
  },
  'debuts-agriculture': {
    question: {
      fr: "Qu'est-ce que les humains ont appris à semer pour faire pousser de la nourriture ?",
      en: "What did humans learn to sow to grow food?",
    },
    options: {
      fr: ["Des cailloux", "Des graines", "Des jouets"],
      en: ["Stones", "Seeds", "Toys"],
    },
    correctAnswer: 1,
  },
  'debuts-elevage': {
    question: {
      fr: "Quel est l'un des premiers animaux que les humains ont élevé près d'eux ?",
      en: "What is one of the first animals that humans raised near them?",
    },
    options: {
      fr: ["Le dinosaure", "La chèvre", "Le lion"],
      en: ["The dinosaur", "The goat", "The lion"],
    },
    correctAnswer: 1,
  },
  'invention-poterie': {
    question: {
      fr: "Quelle matière souple de la terre façonnait-on pour faire des pots ?",
      en: "What soft material from the earth was shaped to make pots?",
    },
    options: {
      fr: ["Le bois", "L'argile", "Le fer"],
      en: ["Wood", "Clay", "Iron"],
    },
    correctAnswer: 1,
  },
  'vie-communaute': {
    question: {
      fr: "Comment faisait-on parfois pour entrer dans les maisons serrées du village ?",
      en: "How did people sometimes enter the tightly packed houses of the village?",
    },
    options: {
      fr: ["Par le toit avec une échelle", "En creusant un tunnel", "Par une porte dorée"],
      en: ["Through the roof with a ladder", "By digging a tunnel", "Through a golden door"],
    },
    correctAnswer: 0,
  },
  'tissage-laine': {
    question: {
      fr: "De quel animal récupérait-on la laine pour la tisser ?",
      en: "From which animal did they get wool to weave?",
    },
    options: {
      fr: ["Du poisson", "Du mouton", "De l'oiseau"],
      en: ["Fish", "Sheep", "Bird"],
    },
    correctAnswer: 1,
  },
  megalithes: {
    question: {
      fr: "Qu'est-ce que les villageois déplaçaient ensemble pour fabriquer des monuments ?",
      en: "What did the villagers move together to make monuments?",
    },
    options: {
      fr: ["Des plumes légères", "D'énormes pierres géantes", "Des troncs de sapin"],
      en: ["Light feathers", "Huge giant stones", "Fir tree trunks"],
    },
    correctAnswer: 1,
  }
};
