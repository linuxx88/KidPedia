import { audioAssets } from '../../assets/audio'

export const animals = [
  {
    id: 'lion',
    title: { fr: 'Le Lion', en: 'The Lion' },
    category: { fr: 'Animaux 🦁', en: 'Animals 🦁' },
    categoryKey: 'animaux',
    icon: '🦁',
    shortDesc: { fr: 'Le roi de la savane.', en: 'The king of the savannah.' },
    fullContent: {
      fr: 'Le lion est un grand félin qui vit en Afrique. Il vit en groupes appelés troupes. Le mâle a une magnifique crinière dorée pour se protéger pendant les combats.',
      en: 'The lion is a large feline that lives in Africa. It lives in groups called prides. The male has a magnificent golden mane to protect itself during fights.',
    },
    funFact: {
      fr: "Le rugissement d'un lion peut être entendu jusqu'à 8 kilomètres !",
      en: "A lion's roar can be heard from up to 8 kilometers away!",
    },
    audioFile: audioAssets.lion,
    
  },
  {
    id: 'elephant',
    title: { fr: "L'Éléphant", en: 'The Elephant' },
    category: { fr: 'Animaux 🦁', en: 'Animals 🦁' },
    categoryKey: 'animaux',
    icon: '🐘',
    shortDesc: {
      fr: 'Le plus gros animal terrestre avec une trompe magique.',
      en: 'The largest land animal with a magic trunk.',
    },
    fullContent: {
      fr: 'Les éléphants sont très intelligents et ont une excellente mémoire. Ils utilisent leur trompe pour manger, boire et même faire des câlins.',
      en: 'Elephants are very intelligent and have an excellent memory. They use their trunks to eat, drink, and even give hugs.',
    },
    funFact: {
      fr: 'Les éléphants ne peuvent pas sauter, mais ils savent très bien nager !',
      en: 'Elephants cannot jump, but they are very good swimmers!',
    },
    audioFile: audioAssets.elephant,
    
  },
  {
    id: 'tigre',
    title: { fr: 'Le Tigre', en: 'The Tiger' },
    category: { fr: 'Animaux 🦁', en: 'Animals 🦁' },
    categoryKey: 'animaux',
    icon: '🐯',
    shortDesc: {
      fr: 'Le plus grand de tous les félins avec de belles rayures.',
      en: 'The largest of all felines with beautiful stripes.',
    },
    fullContent: {
      fr: "Le tigre est un chasseur solitaire qui vit dans les forêts et les jungles. Contrairement à la plupart des chats, les tigres adorent l'eau et sont d'excellents nageurs !",
      en: 'The tiger is a solitary hunter that lives in forests and jungles. Unlike most cats, tigers love water and are excellent swimmers!',
    },
    funFact: {
      fr: 'Chaque tigre a des rayures uniques, tout comme les empreintes digitales des humains.',
      en: 'Each tiger has unique stripes, just like human fingerprints.',
    },
    audioFile: audioAssets.tiger,
    
  },
  {
    id: 'singe',
    title: { fr: 'Le Singe', en: 'The Monkey' },
    category: { fr: 'Animaux 🦁', en: 'Animals 🦁' },
    categoryKey: 'animaux',
    icon: '🐒',
    shortDesc: {
      fr: 'Un animal très agile qui adore grimper partout.',
      en: 'A very agile animal that loves climbing everywhere.',
    },
    fullContent: {
      fr: "Les singes sont très malins et utilisent souvent leurs mains et leurs pieds pour attraper des objets. Beaucoup d'entre eux vivent dans les arbres et utilisent leur queue pour s'équilibrer.",
      en: 'Monkeys are very clever and often use their hands and feet to grab objects. Many of them live in trees and use their tails for balance.',
    },
    funFact: {
      fr: 'Certains singes savent utiliser des outils, comme des pierres, pour casser des noix !',
      en: 'Some monkeys know how to use tools, like stones, to crack nuts!',
    },
    
  },
  {
    id: 'lapin',
    title: { fr: 'Le Lapin', en: 'The Rabbit' },
    category: { fr: 'Animaux 🦁', en: 'Animals 🦁' },
    categoryKey: 'animaux',
    icon: '🐰',
    shortDesc: {
      fr: 'Un petit animal tout doux avec de longues oreilles.',
      en: 'A soft little animal with long ears.',
    },
    fullContent: {
      fr: "Le lapin est célèbre pour ses grandes oreilles qui lui permettent d'entendre le moindre danger. Il se déplace en faisant de petits bonds et vit dans des terriers sous la terre.",
      en: 'The rabbit is famous for its large ears that allow it to hear the slightest danger. It moves by making small hops and lives in burrows underground.',
    },
    funFact: {
      fr: "Les dents des lapins ne s'arrêtent jamais de pousser !",
      en: "Rabbits' teeth never stop growing!",
    },
    
  },
  {
    id: 'tortue',
    title: { fr: 'La Tortue', en: 'The Turtle' },
    category: { fr: 'Animaux 🦁', en: 'Animals 🦁' },
    categoryKey: 'animaux',
    icon: '🐢',
    shortDesc: {
      fr: 'Un animal tranquille qui porte sa maison sur son dos.',
      en: 'A quiet animal that carries its house on its back.',
    },
    fullContent: {
      fr: "La tortue possède une carapace très solide pour se protéger des prédateurs. Il existe des tortues qui vivent sur terre et d'autres qui passent toute leur vie dans l'océan.",
      en: 'The turtle has a very strong shell to protect itself from predators. There are turtles that live on land and others that spend their entire lives in the ocean.',
    },
    funFact: {
      fr: 'Certaines tortues géantes peuvent vivre plus de 150 ans !',
      en: 'Some giant turtles can live for more than 150 years!',
    },
    
  },
  {
    id: 'kangourou',
    title: { fr: 'Le Kangourou', en: 'The Kangaroo' },
    category: { fr: 'Animaux 🦁', en: 'Animals 🦁' },
    categoryKey: 'animaux',
    icon: '🦘',
    shortDesc: {
      fr: 'Le champion du saut qui a une poche magique.',
      en: 'The jumping champion with a magic pouch.',
    },
    fullContent: {
      fr: 'Le kangourou vit en Australie. Il utilise ses puissantes pattes arrière pour faire des bonds géants. Les mamans kangourous ont une poche pour porter leur bébé.',
      en: 'The kangaroo lives in Australia. It uses its powerful hind legs to make giant leaps. Mother kangaroos have a pouch to carry their baby.',
    },
    funFact: {
      fr: 'Un kangourou ne peut pas marcher à reculons !',
      en: 'A kangaroo cannot walk backwards!',
    },
    
  },
  {
    id: 'dauphin',
    title: { fr: 'Le Dauphin', en: 'The Dolphin' },
    category: { fr: 'Animaux 🦁', en: 'Animals 🦁' },
    categoryKey: 'animaux',
    icon: '🐬',
    shortDesc: {
      fr: "Un animal très intelligent qui vit dans l'eau.",
      en: 'A very intelligent animal that lives in the water.',
    },
    fullContent: {
      fr: "Le dauphin n'est pas un poisson, c'est un mammifère ! Il doit remonter à la surface pour respirer. Il communique en faisant des petits cliquetis.",
      en: "The dolphin is not a fish, it's a mammal! It must come to the surface to breathe. It communicates by making small clicks.",
    },
    funFact: {
      fr: 'Les dauphins dorment avec un seul œil fermé !',
      en: 'Dolphins sleep with only one eye closed!',
    },
    
  },
  {
    id: 'girafe',
    title: { fr: 'La Girafe', en: 'The Giraffe' },
    category: { fr: 'Animaux 🦁', en: 'Animals 🦁' },
    categoryKey: 'animaux',
    icon: '🦒',
    shortDesc: {
      fr: 'Le plus grand animal du monde avec un cou immense.',
      en: 'The tallest animal in the world with a huge neck.',
    },
    fullContent: {
      fr: 'La girafe utilise son long cou pour attraper les feuilles en haut des arbres. Sa langue est bleue et très longue.',
      en: 'The giraffe uses its long neck to catch leaves at the top of trees. Its tongue is blue and very long.',
    },
    funFact: {
      fr: "Le cou d'une girafe a le même nombre d'os que le tien : seulement 7 !",
      en: "A giraffe's neck has the same number of bones as yours: only 7!",
    },
    
  },
  {
    id: 'panda',
    title: { fr: 'Le Panda', en: 'The Panda' },
    category: { fr: 'Animaux 🦁', en: 'Animals 🦁' },
    categoryKey: 'animaux',
    icon: '🐼',
    shortDesc: {
      fr: 'Un gros ours noir et blanc qui adore le bambou.',
      en: 'A big black and white bear that loves bamboo.',
    },
    fullContent: {
      fr: 'Le panda géant vit en Chine. Il passe sa journée à manger du bambou. Il est très calme et adore faire la sieste.',
      en: 'The giant panda lives in China. It spends its day eating bamboo. It is very calm and loves to nap.',
    },
    funFact: {
      fr: "Un panda peut manger jusqu'à 12 kilos de bambou par jour !",
      en: 'A panda can eat up to 12 kilos of bamboo per day!',
    },
    
  },
  {
    id: 'pingouin',
    title: { fr: 'Le Manchot', en: 'The Penguin' },
    category: { fr: 'Animaux 🦁', en: 'Animals 🦁' },
    categoryKey: 'animaux',
    icon: '🐧',
    shortDesc: {
      fr: 'Un oiseau qui ne vole pas mais nage super bien.',
      en: 'A bird that does not fly but swims very well.',
    },
    fullContent: {
      fr: "Les manchots vivent dans le froid. Leurs ailes leur servent de nageoires pour voler sous l'eau !",
      en: 'Penguins live in the cold. Their wings serve as flippers to fly underwater!',
    },
    funFact: {
      fr: 'Pour se tenir chaud, ils font de gros câlins collectifs.',
      en: 'To keep warm, they have big group hugs.',
    },
    
  },
  {
    id: 'loup',
    title: { fr: 'Le Loup', en: 'The Wolf' },
    category: { fr: 'Animaux 🦁', en: 'Animals 🦁' },
    categoryKey: 'animaux',
    icon: '🐺',
    shortDesc: {
      fr: "L'ancêtre sauvage du chien qui hurle à la lune.",
      en: "The wild ancestor of the dog that howls at the moon.",
    },
    fullContent: {
      fr: 'Le loup vit en famille dans une meute. Il hurle pour communiquer avec ses amis de loin.',
      en: 'The wolf lives in a family in a pack. It howls to communicate with its friends from afar.',
    },
    funFact: {
      fr: 'Le nez du loup est 100 fois plus puissant que le tien !',
      en: "The wolf's nose is 100 times more powerful than yours!",
    },
    
  },
] as const
