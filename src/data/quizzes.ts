import { type Quiz } from './topics/types';
import { type TopicId } from '../types/domain';

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
  peinture: {
    question: {
      fr: "Quel artiste a peint 'La Nuit Étoilée' ?",
      en: "Which artist painted 'The Starry Night'?",
    },
    options: {
      fr: ['Pablo Picasso', 'Leonardo da Vinci', 'Vincent van Gogh'],
      en: ['Pablo Picasso', 'Leonardo da Vinci', 'Vincent van Gogh'],
    },
    correctAnswer: 2,
  },
  musique: {
    question: {
      fr: 'Quel instrument a des touches noires et blanches ?',
      en: 'Which instrument has black and white keys?',
    },
    options: {
      fr: ['La guitare', 'Le piano', 'La trompette'],
      en: ['The guitar', 'The piano', 'The trumpet'],
    },
    correctAnswer: 1,
  },
  cinema: {
    question: {
      fr: "Qu'utilise-t-on pour fabriquer un film ?",
      en: 'What is used to make a movie?',
    },
    options: {
      fr: ['Une brosse à dents', 'Une caméra', 'Un grille-pain'],
      en: ['A toothbrush', 'A camera', 'A toaster'],
    },
    correctAnswer: 1,
  },
  danse: {
    question: {
      fr: 'Comment appelle-t-on le fait de bouger en rythme ?',
      en: 'What do we call moving in rhythm?',
    },
    options: {
      fr: ['Dormir', 'La danse', 'Manger'],
      en: ['Sleeping', 'Dancing', 'Eating'],
    },
    correctAnswer: 1,
  },
  sculpture: {
    question: {
      fr: 'En quoi peut être faite une sculpture ?',
      en: 'What can a sculpture be made of?',
    },
    options: {
      fr: ['En pierre', 'En nuages', 'En chansons'],
      en: ['Stone', 'Clouds', 'Songs'],
    },
    correctAnswer: 0,
  },
  theatre: {
    question: {
      fr: 'Où jouent les acteurs de théâtre ?',
      en: 'Where do theater actors perform?',
    },
    options: {
      fr: ['Sur une scène', 'Dans une piscine', 'Dans un placard'],
      en: ['On a stage', 'In a pool', 'In a closet'],
    },
    correctAnswer: 0,
  },
  architecture: {
    question: {
      fr: 'Que dessine un architecte ?',
      en: 'What does an architect design?',
    },
    options: {
      fr: ['Des vêtements', 'Des bâtiments', 'Des gâteaux'],
      en: ['Clothes', 'Buildings', 'Cakes'],
    },
    correctAnswer: 1,
  },
  photographie: {
    question: {
      fr: 'Que capture un appareil photo ?',
      en: 'What does a camera capture?',
    },
    options: {
      fr: ['Des sons', 'De la lumière', 'Des odeurs'],
      en: ['Sounds', 'Light', 'Smells'],
    },
    correctAnswer: 1,
  },
  litterature: {
    question: {
      fr: 'Comment appelle-t-on celui qui écrit un livre ?',
      en: 'What do we call someone who writes a book?',
    },
    options: {
      fr: ['Un docteur', 'Un auteur', 'Un pilote'],
      en: ['A doctor', 'An author', 'A pilot'],
    },
    correctAnswer: 1,
  },
  'bd-manga': {
    question: {
      fr: "Comment s'appellent les cercles où les personnages parlent ?",
      en: 'What are the circles where characters talk called?',
    },
    options: {
      fr: ['Des ballons', 'Des bulles', 'Des nuages'],
      en: ['Balloons', 'Bubbles', 'Clouds'],
    },
    correctAnswer: 1,
  },
  cirque: {
    question: {
      fr: 'Qui nous fait rire au cirque ?',
      en: 'Who makes us laugh at the circus?',
    },
    options: {
      fr: ['Le lion', 'Le clown', 'Le photographe'],
      en: ['The lion', 'The clown', 'The photographer'],
    },
    correctAnswer: 1,
  },
  'jeu-video': {
    question: {
      fr: 'Pourquoi dit-on que le jeu vidéo est interactif ?',
      en: 'Why is it said that video games are interactive?',
    },
    options: {
      fr: [
        "Parce qu'on peut le regarder",
        "Parce que c'est toi qui joues et décides",
        "Parce que c'est blanc",
      ],
      en: [
        'Because you can watch it',
        'Because you are the one playing and deciding',
        "Because it's white",
      ],
    },
    correctAnswer: 1,
  },
  't-rex': {
    question: {
      fr: 'À quoi ressemblait la taille des dents du T-Rex ?',
      en: "What was the size of a T-Rex's teeth like?",
    },
    options: {
      fr: ['Des crayons', 'Des bananes', 'Des grains de riz'],
      en: ['Pencils', 'Bananas', 'Rice grains'],
    },
    correctAnswer: 1,
  },
  triceratops: {
    question: {
      fr: 'Que mangeait le Tricératops ?',
      en: 'What did the Triceratops eat?',
    },
    options: {
      fr: ['De la viande', 'Des plantes', 'Des glaces'],
      en: ['Meat', 'Plants', 'Ice cream'],
    },
    correctAnswer: 1,
  },
  stegosaure: {
    question: {
      fr: 'Quelle était la taille du cerveau du Stégosaure ?',
      en: "How big was the Stegosaurus's brain?",
    },
    options: {
      fr: ['Gros comme un ballon', 'Gros comme une noix', 'Gros comme une pomme'],
      en: ['Big as a ball', 'Big as a walnut', 'Big as an apple'],
    },
    correctAnswer: 1,
  },
  velociraptor: {
    question: {
      fr: "Qu'est-ce que le Vélociraptor avait probablement sur son corps ?",
      en: 'What did the Velociraptor probably have on its body?',
    },
    options: {
      fr: ['Des écailles', 'Des plumes', 'De la laine'],
      en: ['Scales', 'Feathers', 'Wool'],
    },
    correctAnswer: 1,
  },
  pterodactyle: {
    question: {
      fr: 'Que mangeait principalement le Ptérodactyle ?',
      en: 'What did the Pterodactyl mainly eat?',
    },
    options: {
      fr: ['Des fruits', 'Du poisson', 'Du fromage'],
      en: ['Fruit', 'Fish', 'Cheese'],
    },
    correctAnswer: 1,
  },
  brachiosaure: {
    question: {
      fr: "Jusqu'à quel étage d'un immeuble le Brachiosaure pouvait-il regarder ?",
      en: 'Up to which floor of a building could the Brachiosaurus look?',
    },
    options: {
      fr: ['Le 1er étage', 'Le 4ème étage', 'Le 10ème étage'],
      en: ['1st floor', '4th floor', '10th floor'],
    },
    correctAnswer: 1,
  },
  ankylosaure: {
    question: {
      fr: "Qu'est-ce que l'Ankylosaure avait au bout de sa queue ?",
      en: 'What did the Ankylosaurus have at the end of its tail?',
    },
    options: {
      fr: ['Une fleur', "Une massue d'os", 'Un sifflet'],
      en: ['A flower', 'A bone club', 'A whistle'],
    },
    correctAnswer: 1,
  },
  diplodocus: {
    question: {
      fr: 'Comment le Diplodocus utilisait-il sa queue ?',
      en: 'How did the Diplodocus use its tail?',
    },
    options: {
      fr: ['Pour nager', 'Comme un fouet', 'Pour faire coucou'],
      en: ['To swim', 'Like a whip', 'To wave hello'],
    },
    correctAnswer: 1,
  },
  spinosaure: {
    question: {
      fr: 'Où le Spinosaure passait-il beaucoup de temps ?',
      en: 'Where did the Spinosaurus spend a lot of time?',
    },
    options: {
      fr: ['Dans les arbres', "Dans l'eau", 'Dans les grottes'],
      en: ['In trees', 'In water', 'In caves'],
    },
    correctAnswer: 1,
  },
  parasaurolophus: {
    question: {
      fr: 'À quoi servait la crête du Parasaurolophus ?',
      en: "What was the Parasaurolophus's crest for?",
    },
    options: {
      fr: [
        'À porter un chapeau',
        'À faire des bruits comme une trompette',
        'À ranger de la nourriture',
      ],
      en: ['To wear a hat', 'To make noises like a trumpet', 'To store food'],
    },
    correctAnswer: 1,
  },
  iguanodon: {
    question: {
      fr: "Qu'est-ce que l'Iguanodon avait de spécial sur ses mains ?",
      en: "What was special about the Iguanodon's hands?",
    },
    options: {
      fr: ['Des gants', "Un pouce en forme d'éperon pointu", 'Des nageoires'],
      en: ['Gloves', 'A sharp spur-like thumb', 'Flippers'],
    },
    correctAnswer: 1,
  },
  mosasaure: {
    question: {
      fr: 'Où vivait le Mosasaure ?',
      en: 'Where did the Mosasaurus live?',
    },
    options: {
      fr: ['Dans la jungle', "Dans l'océan", 'Sur les montagnes'],
      en: ['In the jungle', 'In the ocean', 'On mountains'],
    },
    correctAnswer: 1,
  },
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
  },
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
  },
  cerveau: {
    question: {
      fr: 'À quoi ressemble ton cerveau ?',
      en: 'What is your brain like?',
    },
    options: {
      fr: ['À un muscle', 'À un ordinateur super puissant', 'À un ballon'],
      en: ['A muscle', 'A super-powerful computer', 'A balloon'],
    },
    correctAnswer: 1,
  },
  coeur: {
    question: {
      fr: 'Que fait le cœur dans ton corps ?',
      en: 'What does the heart do in your body?',
    },
    options: {
      fr: ['Il fabrique de la nourriture', 'Il pompe le sang', "Il t'aide à chanter"],
      en: ['It makes food', 'It pumps blood', 'It helps you sing'],
    },
    correctAnswer: 1,
  },
  sang: {
    question: {
      fr: "Comment s'appellent les petits tuyaux où voyage le sang ?",
      en: 'What are the small tubes where blood travels called?',
    },
    options: {
      fr: ['Des spaghettis', 'Des vaisseaux sanguins', 'Des toboggans'],
      en: ['Spaghetti', 'Blood vessels', 'Slides'],
    },
    correctAnswer: 1,
  },
  os: {
    question: {
      fr: "Comment s'appelle l'ensemble de tous tes os ?",
      en: 'What is the set of all your bones called?',
    },
    options: {
      fr: ['Une armure', 'Le squelette', 'Une cabane'],
      en: ['Armor', 'The skeleton', 'A hut'],
    },
    correctAnswer: 1,
  },
  poumons: {
    question: {
      fr: "Que se passe-t-il quand tu inspires de l'air ?",
      en: 'What happens when you breathe in air?',
    },
    options: {
      fr: ['Tes poumons se dégonflent', 'Tes poumons se gonflent', 'Rien du tout'],
      en: ['Your lungs deflate', 'Your lungs inflate', 'Nothing at all'],
    },
    correctAnswer: 1,
  },
  estomac: {
    question: {
      fr: "Que fait l'estomac ?",
      en: 'What does the stomach do?',
    },
    options: {
      fr: [
        'Il fabrique tes pensées',
        'Il transforme la nourriture en énergie',
        'Il fait pousser tes cheveux',
      ],
      en: ['It makes your thoughts', 'It turns food into energy', 'It makes your hair grow'],
    },
    correctAnswer: 1,
  },
  muscles: {
    question: {
      fr: 'Combien de muscles as-tu environ dans ton corps ?',
      en: 'How many muscles do you have in your body approximately?',
    },
    options: {
      fr: ['10 muscles', 'Plus de 600 muscles', 'Seulement 2'],
      en: ['10 muscles', 'More than 600 muscles', 'Only 2'],
    },
    correctAnswer: 1,
  },
  peau: {
    question: {
      fr: 'Quel est le plus grand organe de ton corps ?',
      en: 'What is the largest organ in your body?',
    },
    options: {
      fr: ['Le cœur', 'Le cerveau', 'La peau'],
      en: ['The heart', 'The brain', 'The skin'],
    },
    correctAnswer: 2,
  },
  dents: {
    question: {
      fr: 'Pourquoi faut-il se brosser les dents ?',
      en: 'Why should you brush your teeth?',
    },
    options: {
      fr: [
        "Pour qu'elles brillent",
        'Pour chasser les microbes et éviter les caries',
        'Pour changer de couleur',
      ],
      en: ['To make them shine', 'To chase away germs and avoid cavities', 'To change color'],
    },
    correctAnswer: 1,
  },
  yeux: {
    question: {
      fr: 'Que captent tes yeux pour envoyer des images ?',
      en: 'What do your eyes capture to send images?',
    },
    options: {
      fr: ['Du son', 'De la lumière', 'De la poussière'],
      en: ['Sound', 'Light', 'Dust'],
    },
    correctAnswer: 1,
  },
  oreilles: {
    question: {
      fr: 'À quoi sert le tympan dans ton oreille ?',
      en: 'What is the eardrum in your ear for?',
    },
    options: {
      fr: ['À faire de la musique', 'À vibrer quand il reçoit un son', "À boucher l'oreille"],
      en: ['To make music', 'To vibrate when it receives a sound', 'To plug the ear'],
    },
    correctAnswer: 1,
  },
  nez: {
    question: {
      fr: 'À quoi sert principalement ton nez ?',
      en: 'What is your nose primarily for?',
    },
    options: {
      fr: ['À manger', 'À respirer et sentir les odeurs', 'À écouter la radio'],
      en: ['Eating', 'Breathing and smelling odors', 'Listening to the radio'],
    },
    correctAnswer: 1,
  },
  ampoule: {
    question: {
      fr: "Qui a inventé l'ampoule électrique ?",
      en: 'Who invented the light bulb?',
    },
    options: {
      fr: ['Thomas Edison', 'Isaac Newton', 'Léonard de Vinci'],
      en: ['Thomas Edison', 'Isaac Newton', 'Leonardo da Vinci'],
    },
    correctAnswer: 0,
  },
  imprimerie: {
    question: {
      fr: "Pourquoi l'imprimerie était-elle une invention importante ?",
      en: 'Why was the printing press an important invention?',
    },
    options: {
      fr: ['Pour faire de la musique', 'Pour imprimer des livres plus vite', 'Pour faire voler les gens'],
      en: ['To make music', 'To print books faster', 'To make people fly'],
    },
    correctAnswer: 1,
  },
  avion: {
    question: {
      fr: 'En quelle année a eu lieu le premier vol motorisé ?',
      en: 'In what year did the first motorized flight take place?',
    },
    options: {
      fr: ['1800', '1903', '2020'],
      en: ['1800', '1903', '2020'],
    },
    correctAnswer: 1,
  },
  telephone: {
    question: {
      fr: "Qui est l'inventeur du téléphone ?",
      en: 'Who is the inventor of the telephone?',
    },
    options: {
      fr: ['Alexander Graham Bell', 'Steve Jobs', 'Albert Einstein'],
      en: ['Alexander Graham Bell', 'Steve Jobs', 'Albert Einstein'],
    },
    correctAnswer: 0,
  },
  internet: {
    question: {
      fr: 'À quoi sert principalement Internet ?',
      en: 'What is the main purpose of the Internet?',
    },
    options: {
      fr: ['À faire cuire des pâtes', 'À relier les ordinateurs entre eux', 'À fabriquer des chaussures'],
      en: ['To cook pasta', 'To connect computers together', 'To make shoes'],
    },
    correctAnswer: 1,
  },
  roue: {
    question: {
      fr: 'Il y a combien de temps environ la roue a-t-elle été inventée ?',
      en: 'About how long ago was the wheel invented?',
    },
    options: {
      fr: ['100 ans', '5 000 ans', "1 million d'années"],
      en: ['100 years', '5,000 years', '1 million years'],
    },
    correctAnswer: 1,
  },
  velo: {
    question: {
      fr: 'Comment avançait-on sur le tout premier vélo ?',
      en: 'How did people move on the first bicycle?',
    },
    options: {
      fr: ['Avec un moteur', 'En poussant avec ses pieds', 'Avec des voiles'],
      en: ['With a motor', 'By pushing with feet', 'With sails'],
    },
    correctAnswer: 1,
  },
  'appareil-photo': {
    question: {
      fr: "Qu'est-ce qui permet de capturer l'image dans un appareil photo ?",
      en: 'What allows the image to be captured in a camera?',
    },
    options: {
      fr: ['Le vent', 'La lumière', 'Le son'],
      en: ['Wind', 'Light', 'Sound'],
    },
    correctAnswer: 1,
  },
  telescope: {
    question: {
      fr: "Qui a été l'un des premiers à utiliser un télescope pour regarder le ciel ?",
      en: 'Who was one of the first to use a telescope to look at the sky?',
    },
    options: {
      fr: ['Galilée', 'Christophe Colomb', 'Napoléon'],
      en: ['Galileo', 'Christopher Columbus', 'Napoleon'],
    },
    correctAnswer: 0,
  },
  boussole: {
    question: {
      fr: "Où pointe toujours l'aiguille de la boussole ?",
      en: 'Where does the compass needle always point?',
    },
    options: {
      fr: ['Vers le Sud', 'Vers le Nord', 'Vers la maison'],
      en: ['South', 'North', 'Home'],
    },
    correctAnswer: 1,
  },
  microscope: {
    question: {
      fr: 'À quoi sert un microscope ?',
      en: 'What is a microscope for?',
    },
    options: {
      fr: ['À voir les étoiles', 'À voir des choses minuscules', 'À écouter de la musique'],
      en: ['To see stars', 'To see tiny things', 'To listen to music'],
    },
    correctAnswer: 1,
  },
  radio: {
    question: {
      fr: "Comment les sons de la radio voyagent-ils dans l'air ?",
      en: 'How do radio sounds travel through the air?',
    },
    options: {
      fr: ['Par des fils', 'Par des ondes invisibles', 'Par des oiseaux'],
      en: ['Through wires', 'Through invisible waves', 'Through birds'],
    },
    correctAnswer: 1,
  },
  arbres: {
    question: {
      fr: 'Que fabriquent les arbres pour nous ?',
      en: 'What do trees make for us?',
    },
    options: {
      fr: ['Du chocolat', "De l'oxygène", 'De la peinture'],
      en: ['Chocolate', 'Oxygen', 'Paint'],
    },
    correctAnswer: 1,
  },
  volcan: {
    question: {
      fr: 'Comment appelle-t-on la roche fondue qui sort du volcan ?',
      en: 'What do we call the molten rock that comes out of a volcano?',
    },
    options: {
      fr: ['De la boue', 'De la lave', "Du jus d'orange"],
      en: ['Mud', 'Lava', 'Orange juice'],
    },
    correctAnswer: 1,
  },
  pluie: {
    question: {
      fr: "D'où tombe la pluie ?",
      en: 'Where does rain fall from?',
    },
    options: {
      fr: ['Des arbres', 'Des nuages', 'De la Lune'],
      en: ['Trees', 'Clouds', 'The Moon'],
    },
    correctAnswer: 1,
  },
  'arc-en-ciel': {
    question: {
      fr: 'Combien de couleurs y a-t-il dans un arc-en-ciel ?',
      en: 'How many colors are in a rainbow?',
    },
    options: {
      fr: ['3 couleurs', '7 couleurs', '10 couleurs'],
      en: ['3 colors', '7 colors', '10 colors'],
    },
    correctAnswer: 1,
  },
  abeilles: {
    question: {
      fr: 'Que fabriquent les abeilles avec le nectar ?',
      en: 'What do bees make with nectar?',
    },
    options: {
      fr: ['Du fromage', 'Du miel', 'De la confiture'],
      en: ['Cheese', 'Honey', 'Jam'],
    },
    correctAnswer: 1,
  },
  'cycle-eau': {
    question: {
      fr: "Comment appelle-t-on le voyage sans fin de l'eau ?",
      en: 'What is the endless journey of water called?',
    },
    options: {
      fr: ["La course de l'eau", "Le cycle de l'eau", "Le toboggan de l'eau"],
      en: ['The water race', 'The water cycle', 'The water slide'],
    },
    correctAnswer: 1,
  },
  saisons: {
    question: {
      fr: "Quelle saison vient juste après l'hiver ?",
      en: 'Which season comes right after winter?',
    },
    options: {
      fr: ["L'automne", 'Le printemps', "L'été"],
      en: ['Autumn', 'Spring', 'Summer'],
    },
    correctAnswer: 1,
  },
  'orage-tonnerre': {
    question: {
      fr: "Pourquoi voit-on l'éclair avant d'entendre le tonnerre ?",
      en: 'Why do we see the flash before hearing the thunder?',
    },
    options: {
      fr: ['Le tonnerre est timide', 'La lumière va plus vite que le son', "L'éclair est plus gros"],
      en: ['The thunder is shy', 'Light goes faster than sound', 'The lightning is bigger'],
    },
    correctAnswer: 1,
  },
  'vent-air': {
    question: {
      fr: "Qu'est-ce que le vent ?",
      en: 'What is the wind?',
    },
    options: {
      fr: ["De l'air qui bouge", 'De la poussière', "De la vapeur d'eau"],
      en: ['Moving air', 'Dust', 'Water vapor'],
    },
    correctAnswer: 0,
  },
  'champignons-nature': {
    question: {
      fr: 'Le champignon est-il une plante ?',
      en: 'Is a mushroom a plant?',
    },
    options: {
      fr: ['Oui', "Non, c'est un 'fongique'", "C'est un petit animal"],
      en: ['Yes', "No, it's a fungus", "It's a small animal"],
    },
    correctAnswer: 1,
  },
  'banquise-glace': {
    question: {
      fr: 'Où se trouve la banquise ?',
      en: 'Where is sea ice found?',
    },
    options: {
      fr: ['Dans le désert', 'Aux pôles de la Terre', 'Dans la forêt'],
      en: ['In the desert', "At the Earth's poles", 'In the forest'],
    },
    correctAnswer: 1,
  },
  'grottes-souterraines': {
    question: {
      fr: 'Comment appelle-t-on les roches qui descendent du plafond des grottes ?',
      en: 'What do we call the rocks that hang from the ceiling of caves?',
    },
    options: {
      fr: ['Des stalagmites', 'Des stalactites', 'Des sucettes de pierre'],
      en: ['Stalagmites', 'Stalactites', 'Stone lollipops'],
    },
    correctAnswer: 1,
  },
  'ciel-bleu': {
    question: {
      fr: "Quelle couleur s'éparpille le plus ?",
      en: 'Which color scatters the most?',
    },
    options: {
      fr: ['Vert', 'Bleu', 'Rose'],
      en: ['Green', 'Blue', 'Pink'],
    },
    correctAnswer: 1,
  },
  'mer-salee': {
    question: {
      fr: "D'où vient le sel ?",
      en: 'Where does the salt come from?',
    },
    options: {
      fr: ['Des baleines', 'Des roches', "De l'usine"],
      en: ['From whales', 'From rocks', 'From the factory'],
    },
    correctAnswer: 1,
  },
  'question-arc-en-ciel': {
    question: {
      fr: 'Que faut-il pour voir un arc-en-ciel ?',
      en: 'What is needed to see a rainbow?',
    },
    options: {
      fr: ['De la neige', 'Soleil et pluie', 'La nuit'],
      en: ['Snow', 'Sun and rain', 'Night'],
    },
    correctAnswer: 1,
  },
  'chat-ronronne': {
    question: {
      fr: "Quand est-ce qu'un chat ronronne le plus ?",
      en: 'When does a cat purr the most?',
    },
    options: {
      fr: ['Quand il a peur', 'Quand il est content', 'Quand il court'],
      en: ["When it's scared", "When it's happy", "When it's running"],
    },
    correctAnswer: 1,
  },
  'fourmis-jambes': {
    question: {
      fr: 'Pourquoi a-t-on des fourmis ?',
      en: 'Why do we get pins and needles?',
    },
    options: {
      fr: ['Des insectes nous piquent', "À cause d'une mauvaise position", 'On a mangé trop de sucre'],
      en: ['Insects are biting us', 'Because of a bad position', 'We ate too much sugar'],
    },
    correctAnswer: 1,
  },
  'fromage-trous': {
    question: {
      fr: "Qu'est-ce qui crée les trous dans le fromage ?",
      en: 'What creates the holes in the cheese?',
    },
    options: {
      fr: ['Des souris', 'Des bulles de gaz', 'Des coups de couteau'],
      en: ['Mice', 'Gas bubbles', 'Knife cuts'],
    },
    correctAnswer: 1,
  },
  'oignons-pleurer': {
    question: {
      fr: 'Pourquoi pleure-t-on avec les oignons ?',
      en: 'Why do onions make us cry?',
    },
    options: {
      fr: ["Parce qu'on est triste", "À cause d'un gaz invisible", "Parce que c'est pas bon"],
      en: ['Because we are sad', 'Because of an invisible gas', "Because it's not good"],
    },
    correctAnswer: 1,
  },
  'neige-blanche': {
    question: {
      fr: 'De quelle couleur est un seul flocon de neige ?',
      en: 'What color is a single snowflake?',
    },
    options: {
      fr: ['Bleu', 'Transparent', 'Jaune'],
      en: ['Blue', 'Transparent', 'Yellow'],
    },
    correctAnswer: 1,
  },
  'feuilles-tombent': {
    question: {
      fr: "Pourquoi l'arbre fait-il tomber ses feuilles ?",
      en: 'Why does the tree drop its leaves?',
    },
    options: {
      fr: ["Pour s'amuser", 'Pour économiser son énergie', "Parce qu'il pleut"],
      en: ['To have fun', 'To save energy', "Because it's raining"],
    },
    correctAnswer: 1,
  },
  'rayures-zebre': {
    question: {
      fr: 'À quoi servent les rayures du zèbre ?',
      en: "What are the zebra's stripes for?",
    },
    options: {
      fr: ['À se cacher', 'À se protéger des lions et des mouches', 'À avoir chaud'],
      en: ['To hide', 'To protect against lions and flies', 'To stay warm'],
    },
    correctAnswer: 1,
  },
  'reves-sommeil': {
    question: {
      fr: 'Que fait ton cerveau quand tu dors ?',
      en: 'What does your brain do while you sleep?',
    },
    options: {
      fr: ["Il s'arrête de travailler", 'Il range tes souvenirs', 'Il mange des bonbons'],
      en: ['It stops working', 'It organizes your memories', 'It eats candy'],
    },
    correctAnswer: 1,
  },
  'pourquoi-caca': {
    question: {
      fr: "C'est quoi, le caca ?",
      en: 'What is poop?',
    },
    options: {
      fr: ['De la nourriture magique', "Les déchets dont le corps n'a plus besoin", 'Des cailloux rigolos'],
      en: ['Magical food', 'The waste the body no longer needs', 'Funny rocks'],
    },
    correctAnswer: 1,
  },
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
};
