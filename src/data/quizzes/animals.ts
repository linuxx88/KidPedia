import { type Quiz } from '../topics/types';
import { type TopicId } from '../../types/domain';

export const QUIZZES: Partial<Record<TopicId, Quiz>> = {
  lion: {
    question: {
      fr: 'Comment appelle-t-on le groupe de lions qui vivent ensemble ?',
      en: 'What is a group of lions called?',
    },
    options: {
      fr: ['Une équipe', 'Une troupe', 'Une chorale'],
      en: ['A team', 'A pride', 'A choir'],
    },
    correctAnswer: 1,
    hint: {
      fr: "C'est un mot qui commence par la lettre 'T'. On dit aussi une troupe de théâtre !",
      en: "It starts with the letter 'P'. Like the word pride, it means being proud!"
    }
  },
  elephant: {
    question: {
      fr: "Qu'est-ce que les éléphants ne savent pas faire ?",
      en: 'What can elephants not do?',
    },
    options: {
      fr: ['Nager', 'Manger avec leur nez', 'Sauter'],
      en: ['Swim', 'Eat with their nose', 'Jump'],
    },
    correctAnswer: 2,
    hint: {
      fr: "Pense à tes pieds... Ils sont très lourds et ne peuvent pas décoller du sol en même temps !",
      en: "Think about your feet... They are very heavy and cannot leave the ground at the same time!"
    }
  },
  tigre: {
    question: {
      fr: "Est-ce que les tigres aiment l'eau ?",
      en: 'Do tigers like water?',
    },
    options: {
      fr: ['Non, ils détestent ça', 'Oui, ils adorent nager', 'Seulement pour boire'],
      en: ["No, they hate it", "Yes, they love swimming", "Only for drinking"],
    },
    correctAnswer: 1,
  },
  singe: {
    question: {
      fr: 'Comment les singes font-ils pour tenir en équilibre dans les arbres ?',
      en: 'How do monkeys balance in trees?',
    },
    options: {
      fr: ['Avec des chaussures spéciales', 'Grâce à leur queue', 'En tenant un parapluie'],
      en: ['With special shoes', 'Thanks to their tail', 'By holding an umbrella'],
    },
    correctAnswer: 1,
  },
  lapin: {
    question: {
      fr: "Qu'est-ce qui ne s'arrête jamais de pousser chez le lapin ?",
      en: 'What never stops growing in a rabbit?',
    },
    options: {
      fr: ['Ses oreilles', 'Ses dents', 'Sa queue'],
      en: ['Its ears', 'Its teeth', 'Its tail'],
    },
    correctAnswer: 1,
  },
  tortue: {
    question: {
      fr: 'À quoi sert la carapace de la tortue ?',
      en: "What is the turtle's shell for?",
    },
    options: {
      fr: ['À faire du sport', 'À se protéger', 'À ranger ses jouets'],
      en: ['For sports', 'To protect itself', 'To store toys'],
    },
    correctAnswer: 1,
  },
  kangourou: {
    question: {
      fr: 'Où la maman kangourou garde-t-elle son bébé ?',
      en: 'Where does the mother kangaroo keep her baby?',
    },
    options: {
      fr: ['Dans un sac à dos', 'Dans sa poche', 'Sur sa tête'],
      en: ['In a backpack', 'In her pouch', 'On her head'],
    },
    correctAnswer: 1,
  },
  dauphin: {
    question: {
      fr: 'Comment le dauphin communique-t-il ?',
      en: 'How does the dolphin communicate?',
    },
    options: {
      fr: ['En criant', 'Avec des cliquetis', 'En chantant'],
      en: ['By shouting', 'With clicks', 'By singing'],
    },
    correctAnswer: 1,
  },
  girafe: {
    question: {
      fr: 'De quelle couleur est la langue de la girafe ?',
      en: 'What color is the giraffe\'s tongue?',
    },
    options: {
      fr: ['Rose', 'Bleue', 'Verte'],
      en: ['Pink', 'Blue', 'Green'],
    },
    correctAnswer: 1,
  },
  panda: {
    question: {
      fr: 'Que mange principalement le panda ?',
      en: 'What does the panda mainly eat?',
    },
    options: {
      fr: ['Des pommes', 'Du bambou', 'Du miel'],
      en: ['Apples', 'Bamboo', 'Honey'],
    },
    correctAnswer: 1,
  },
  pingouin: {
    question: {
      fr: 'Est-ce que le manchot peut voler dans le ciel ?',
      en: 'Can the penguin fly in the sky?',
    },
    options: {
      fr: ['Oui', 'Non, il nage', 'Seulement bébé'],
      en: ['Yes', 'No, it swims', 'Only as a baby'],
    },
    correctAnswer: 1,
  },
  loup: {
    question: {
      fr: "Comment s'appelle la famille du loup ?",
      en: 'What is the wolf family called?',
    },
    options: {
      fr: ['Une meute', 'Une classe', 'Un club'],
      en: ['A pack', 'A class', 'A club'],
    },
    correctAnswer: 0,
  },
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
  },
  'poissons-sans-machoires': {
    question: {
      fr: "Comment les poissons sans mâchoires mangeaient-ils ?",
      en: "How did jawless fish eat?",
    },
    options: {
      fr: ["En croquant avec des dents pointues", "En aspirant leur nourriture", "En utilisant des bras articulés"],
      en: ["By biting with sharp teeth", "By sucking their food", "By using jointed arms"],
    },
    correctAnswer: 1,
    hint: {
      fr: "Comme ils n'avaient pas de mâchoire, ils devaient aspirer !",
      en: "Since they had no jaw, they had to suck!"
    }
  },
  'poissons-ecailles': {
    question: {
      fr: "Qu'est-ce qui permet aux poissons à écailles de nager plus vite ?",
      en: "What allows scaly fish to swim faster?",
    },
    options: {
      fr: ["Des plumes colorées", "Leurs écailles glissantes et leurs nageoires", "Une carapace lourde en pierre"],
      en: ["Color feathers", "Their slippery scales and fins", "A heavy stone shell"],
    },
    correctAnswer: 1,
    hint: {
      fr: "C'est tout doux, glissant et cela les aide à se propulser dans l'eau !",
      en: "It is smooth, slippery and helps them propel themselves through the water!"
    }
  },
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
