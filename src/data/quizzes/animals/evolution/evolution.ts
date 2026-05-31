import { type Quiz } from '../../../topics/types';
import { type TopicId } from '../../../../types/domain';

export const evolutionQuizzes: Partial<Record<TopicId, Quiz>> = {
  'sortie-des-eaux': {
    question: {
      fr: "En quoi les nageoires des premiers poissons se sont-elles transformées ?",
      en: "What did the fins of the first fish transform into?",
    },
    options: {
      fr: ["En ailes pour s'envoler", "En petites pattes solides pour ramper", "En bulles de savon"],
      en: ["Into wings to fly away", "Into tiny strong legs to crawl", "Into soap bubbles"],
    },
    correctAnswer: 1,
    hint: {
      fr: "Elles les ont aidés à marcher sur le sol ferme !",
      en: "They helped them walk on the solid ground!"
    }
  },
  'insectes-geants': {
    question: {
      fr: "Quelle était la taille de la libellule géante Meganeura ?",
      en: "What was the size of the giant Meganeura dragonfly?",
    },
    options: {
      fr: ["Comme une mouche", "De la taille d'un grand oiseau ou aigle", "Aussi grande qu'une maison"],
      en: ["Like a fly", "The size of a large bird or eagle", "As big as a house"],
    },
    correctAnswer: 1,
    hint: {
      fr: "Elle avait des ailes très grandes pour voler comme un aigle !",
      en: "It had very large wings to fly like an eagle!"
    }
  },
  'peau-reptile': {
    question: {
      fr: "À quoi sert la peau écailleuse des reptiles ?",
      en: "What is the scaly skin of reptiles for?",
    },
    options: {
      fr: ["À changer de couleur", "À retenir l'eau dans leur corps pour ne pas sécher", "À fabriquer du parfum"],
      en: ["To change color", "To keep water in their body so they do not dry out", "To make perfume"],
    },
    correctAnswer: 1,
    hint: {
      fr: "C'est comme un bouclier imperméable qui garde l'eau à l'intérieur !",
      en: "It is like a waterproof shield that keeps the water inside!"
    }
  },
  'oeuf-solide': {
    question: {
      fr: "Quel est le grand avantage de l'œuf à coquille dure ?",
      en: "What is the great advantage of the hard-shelled egg?",
    },
    options: {
      fr: ["Il peut rouler comme un ballon", "Il permet de pondre sur terre loin de l'eau", "Il est multicolore"],
      en: ["It can roll like a ball", "It allows laying on land away from water", "It is multicolored"],
    },
    correctAnswer: 1,
    hint: {
      fr: "Grâce à lui, plus besoin d'aller mouiller ses œufs dans les étangs !",
      en: "Thanks to it, there's no need to wet the eggs in ponds anymore!"
    }
  }
};
