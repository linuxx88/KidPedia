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
  {
    id: 'meduses-eponges',
    title: { fr: 'Méduses et Éponges', en: 'Jellyfish and Sponges' },
    category: { fr: 'Animaux 🦁', en: 'Animals 🦁' },
    categoryKey: 'animaux',
    icon: '🪼',
    shortDesc: {
      fr: "Des animaux tout mous et sans squelette !",
      en: 'Soft animals with no skeleton!',
    },
    fullContent: {
      fr: "Les méduses et les éponges font partie des plus anciens animaux de la Terre. Sans os ni cerveau, elles se laissent porter par l'eau. Les éponges restent fixées au fond des mers et filtrent l'eau pour se nourrir, tandis que les jolies méduses nagent comme de petites cloches de verre.",
      en: "Jellyfish and sponges are among the oldest animals on Earth. With no bones or brain, they let themselves drift in the water. Sponges stay fixed to the seabed filtering water to feed, while pretty jellyfish swim like tiny glass bells.",
    },
    fullContents: [
      {
        fr: "Les méduses et les éponges font partie des plus anciens animaux de la Terre. Sans os ni cerveau, elles se laissent porter par l'eau. Les éponges restent fixées au fond des mers et filtrent l'eau pour se nourrir, tandis que les jolies méduses nagent comme de petites cloches de verre.",
        en: "Jellyfish and sponges are among the oldest animals on Earth. With no bones or brain, they let themselves drift in the water. Sponges stay fixed to the seabed filtering water to feed, while pretty jellyfish swim like tiny glass bells.",
      }
    ],
    funFact: {
      fr: "Le corps des méduses est fait de 95% d'eau !",
      en: "A jellyfish's body is made of 95% water!",
    },
    funFacts: [
      {
        fr: "Le corps des méduses est fait de 95% d'eau !",
        en: "A jellyfish's body is made of 95% water!",
      }
    ]
  },
  {
    id: 'trilobites',
    title: { fr: 'Les Trilobites', en: 'Trilobites' },
    category: { fr: 'Animaux 🦁', en: 'Animals 🦁' },
    categoryKey: 'animaux',
    icon: '🐚',
    shortDesc: {
      fr: "Les rois du fond des mers préhistoriques !",
      en: 'The kings of the prehistoric seabed!',
    },
    fullContent: {
      fr: "Les trilobites étaient de drôles d'animaux qui vivaient tout au fond de la mer, bien avant les dinosaures ! Ils avaient une carapace très solide séparée en trois parties pour les protéger, et de nombreuses petites pattes pour marcher sur le sable.",
      en: "Trilobites were funny animals that lived at the very bottom of the sea, long before dinosaurs! They had a very strong shell split into three parts to protect them, and many tiny legs to walk on the sand.",
    },
    fullContents: [
      {
        fr: "Les trilobites étaient de drôles d'animaux qui vivaient tout au fond de la mer, bien avant les dinosaures ! Ils avaient une carapace très solide séparée en trois parties pour les protéger, et de nombreuses petites pattes pour marcher sur le sable.",
        en: "Trilobites were funny animals that lived at the very bottom of the sea, long before dinosaurs! They had a very strong shell split into three parts to protect them, and many tiny legs to walk on the sand.",
      }
    ],
    funFact: {
      fr: "Les trilobites savaient se rouler en boule comme des cloportes pour se cacher !",
      en: "Trilobites could roll into a ball like pillbugs to hide themselves!",
    },
    funFacts: [
      {
        fr: "Les trilobites savaient se rouler en boule comme des cloportes pour se cacher !",
        en: "Trilobites could roll into a ball like pillbugs to hide themselves!",
      }
    ]
  },
  {
    id: 'vers-marins',
    title: { fr: 'Vers marins', en: 'Marine worms' },
    category: { fr: 'Animaux 🦁', en: 'Animals 🦁' },
    categoryKey: 'animaux',
    icon: '🪱',
    shortDesc: {
      fr: "De petits explorateurs du sable sous-marin !",
      en: 'Tiny explorers of the underwater sand!',
    },
    fullContent: {
      fr: "Les vers marins rampent au fond de l'eau ou creusent des tunnels dans la vase. Certains ont des plumes colorées sur la tête pour respirer et attraper de microscopiques repas, ressemblant à de magnifiques petites fleurs sous-marines !",
      en: "Marine worms crawl at the bottom of the water or dig tunnels in the mud. Some have colorful feathers on their head to breathe and catch microscopic meals, looking like beautiful tiny underwater flowers!",
    },
    fullContents: [
      {
        fr: "Les vers marins rampent au fond de l'eau ou creusent des tunnels dans la vase. Certains ont des plumes colorées sur la tête pour respirer et attraper de microscopiques repas, ressemblant à de magnifiques petites fleurs sous-marines !",
        en: "Marine worms crawl at the bottom of the water or dig tunnels in the mud. Some have colorful feathers on their head to breathe and catch microscopic meals, looking like beautiful tiny underwater flowers!",
      }
    ],
    funFact: {
      fr: "Certains vers marins brillent dans le noir pour faire peur aux poissons !",
      en: "Some marine worms glow in the dark to scare away fish!",
    },
    funFacts: [
      {
        fr: "Certains vers marins brillent dans le noir pour faire peur aux poissons !",
        en: "Some marine worms glow in the dark to scare away fish!",
      }
    ]
  },
  {
    id: 'coquillages-primitifs',
    title: { fr: 'Coquillages primitifs', en: 'Primitive shells' },
    category: { fr: 'Animaux 🦁', en: 'Animals 🦁' },
    categoryKey: 'animaux',
    icon: '🐚',
    shortDesc: {
      fr: "Les premières maisons solides des petits animaux !",
      en: 'The first solid houses of tiny animals!',
    },
    fullContent: {
      fr: "Les coquillages primitifs ont été inventés par les animaux pour se protéger des grands prédateurs. Grâce à leur coquille calcaire très dure et résistante, ils pouvaient se cacher à l'intérieur dès qu'un danger arrivait dans l'eau.",
      en: "Primitive shells were invented by animals to protect themselves from large predators. Thanks to their very hard and resistant calcium shell, they could hide inside as soon as danger approached in the water.",
    },
    fullContents: [
      {
        fr: "Les coquillages primitifs ont été inventés par les animaux pour se protéger des grands prédateurs. Grâce à leur coquille calcaire très dure et résistante, ils pouvaient se cacher à l'intérieur dès qu'un danger arrivait dans l'eau.",
        en: "Primitive shells were invented by animals to protect themselves from large predators. Thanks to their very hard and resistant calcium shell, they could hide inside as soon as danger approached in the water.",
      }
    ],
    funFact: {
      fr: "Certains coquillages primitifs avaient des formes de spirales parfaites !",
      en: "Some primitive shells had perfect spiral shapes!",
    },
    funFacts: [
      {
        fr: "Certains coquillages primitifs avaient des formes de spirales parfaites !",
        en: "Some primitive shells had perfect spiral shapes!",
      }
    ]
  },
  {
    id: 'anomalocaris',
    title: { fr: 'Anomalocaris', en: 'Anomalocaris' },
    category: { fr: 'Animaux 🦁', en: 'Animals 🦁' },
    categoryKey: 'animaux',
    icon: '🦂',
    shortDesc: {
      fr: "Le tout premier super-chasseur de l'océan !",
      en: 'The very first super-hunter of the ocean!',
    },
    fullContent: {
      fr: "L'Anomalocaris était la star des mers préhistoriques. Avec ses grands yeux ronds pour bien voir, ses deux bras articulés devant sa bouche pour attraper ses proies, et ses nageoires sur les côtés pour foncer dans l'eau, aucun petit trilobite ne pouvait lui échapper !",
      en: "Anomalocaris was the star of prehistoric seas. With its large round eyes to see well, its two jointed arms in front of its mouth to grab prey, and its fins on the sides to speed through the water, no tiny trilobite could escape it!",
    },
    fullContents: [
      {
        fr: "L'Anomalocaris était la star des mers préhistoriques. Avec ses grands yeux ronds pour bien voir, ses deux bras articulés devant sa bouche pour attraper ses proies, et ses nageoires sur les côtés pour foncer dans l'eau, aucun petit trilobite ne pouvait lui échapper !",
        en: "Anomalocaris was the star of prehistoric seas. With its large round eyes to see well, its two jointed arms in front of its mouth to grab prey, and its fins on the sides to speed through the water, no tiny trilobite could escape it!",
      }
    ],
    funFact: {
      fr: "Son nom veut dire 'crevette bizarre' !",
      en: "Its name means 'strange shrimp'!",
    },
    funFacts: [
      {
        fr: "Son nom veut dire 'crevette bizarre' !",
        en: "Its name means 'strange shrimp'!",
      }
    ]
  },
  {
    id: 'poissons-sans-machoires',
    title: { fr: 'Poissons sans mâchoires', en: 'Jawless fish' },
    category: { fr: 'Animaux 🦁', en: 'Animals 🦁' },
    categoryKey: 'animaux',
    icon: '🐟',
    shortDesc: {
      fr: "Les tout premiers poissons de la Terre !",
      en: 'The very first fish on Earth!',
    },
    fullContent: {
      fr: "Les premiers poissons n'avaient pas de mâchoire pour croquer, juste une bouche ronde pour aspirer leur nourriture au fond de l'eau. Ils avaient aussi une colonne vertébrale toute molle et une cuirasse de plaques osseuses sur le dessus pour se protéger des prédateurs.",
      en: "The first fish had no jaw to bite, just a round mouth to suck their food from the bottom of the water. They also had a soft spine and an armor of bony plates on top to protect themselves from predators.",
    },
    fullContents: [
      {
        fr: "Les premiers poissons n'avaient pas de mâchoire pour croquer, juste une bouche ronde pour aspirer leur nourriture au fond de l'eau. Ils avaient aussi une colonne vertébrale toute molle et une cuirasse de plaques osseuses sur le dessus pour se protéger des prédateurs.",
        en: "The first fish had no jaw to bite, just a round mouth to suck their food from the bottom of the water. They also had a soft spine and an armor of bony plates on top to protect themselves from predators.",
      }
    ],
    funFact: {
      fr: "Aujourd'hui, il existe encore des descendants de ces poissons, comme la lamproie !",
      en: "Today, descendants of these fish still exist, like the lamprey!",
    },
    funFacts: [
      {
        fr: "Aujourd'hui, il existe encore des descendants de ces poissons, comme la lamproie !",
        en: "Today, descendants of these fish still exist, like the lamprey!",
      }
    ]
  },
  {
    id: 'poissons-ecailles',
    title: { fr: 'Poissons à écailles', en: 'Scaly fish' },
    category: { fr: 'Animaux 🦁', en: 'Animals 🦁' },
    categoryKey: 'animaux',
    icon: '🐠',
    shortDesc: {
      fr: "Les rois de l'agilité et de la vitesse sous l'eau !",
      en: 'The kings of agility and speed underwater!',
    },
    fullContent: {
      fr: "Les poissons ont fini par inventer des mâchoires solides avec des dents pour manger de tout, et des écailles glissantes pour nager beaucoup plus vite. Avec leurs nageoires bien orientées, ils sont devenus de superbes acrobates des mers !",
      en: "Fish eventually invented strong jaws with teeth to eat everything, and slippery scales to swim much faster. With their well-oriented fins, they became superb acrobats of the seas!",
    },
    fullContents: [
      {
        fr: "Les poissons ont fini par inventer des mâchoires solides avec des dents pour manger de tout, et des écailles glissantes pour nager beaucoup plus vite. Avec leurs nageoires bien orientées, ils sont devenus de superbes acrobates des mers !",
        en: "Fish eventually invented strong jaws with teeth to eat everything, and slippery scales to swim much faster. With their well-oriented fins, they became superb acrobats of the seas!",
      }
    ],
    funFact: {
      fr: "Les écailles des poissons grandissent tout au long de leur vie, comme nos ongles !",
      en: "Fish scales grow throughout their entire life, just like our fingernails!",
    },
    funFacts: [
      {
        fr: "Les écailles des poissons grandissent tout au long de leur vie, comme nos ongles !",
        en: "Fish scales grow throughout their entire life, just like our fingernails!",
      }
    ]
  },
  {
    id: 'sortie-des-eaux',
    title: { fr: 'Sortie des eaux', en: 'Out of the water' },
    category: { fr: 'Animaux 🦁', en: 'Animals 🦁' },
    categoryKey: 'animaux',
    icon: '🐟🦵',
    shortDesc: {
      fr: "Les premiers poissons qui apprennent à ramper sur terre !",
      en: 'The first fish learning to crawl on land!',
    },
    fullContent: {
      fr: "Il y a environ 375 millions d'années, certains poissons ont commencé à sortir de l'eau. Leurs nageoires sont devenues plus solides, comme de petites pattes, leur permettant de ramper et de découvrir la terre ferme !",
      en: "About 375 million years ago, some fish began to come out of the water. Their fins became stronger, like tiny legs, allowing them to crawl and discover dry land!",
    },
    fullContents: [
      {
        fr: "Il y a environ 375 millions d'années, certains poissons ont commencé à sortir de l'eau. Leurs nageoires sont devenues plus solides, comme de petites pattes, leur permettant de ramper et de découvrir la terre ferme !",
        en: "About 375 million years ago, some fish began to come out of the water. Their fins became stronger, like tiny legs, allowing them to crawl and discover dry land!",
      }
    ],
    funFact: {
      fr: "Le Tiktaalik est le poisson-ancêtre le plus célèbre à avoir osé faire le premier pas sur terre !",
      en: "Tiktaalik is the most famous ancestor-fish that dared to take the first step on land!",
    },
    funFacts: [
      {
        fr: "Le Tiktaalik est le poisson-ancêtre le plus célèbre à avoir osé faire le premier pas sur terre !",
        en: "Tiktaalik is the most famous ancestor-fish that dared to take the first step on land!",
      }
    ]
  },
  {
    id: 'insectes-geants',
    title: { fr: 'Insectes géants', en: 'Giant insects' },
    category: { fr: 'Animaux 🦁', en: 'Animals 🦁' },
    categoryKey: 'animaux',
    icon: '🐜',
    shortDesc: {
      fr: "Des libellules de la taille d'un aigle !",
      en: 'Dragonflies the size of an eagle!',
    },
    fullContent: {
      fr: "Grâce à la grande quantité d'oxygène dans l'air, les insectes sont devenus gigantesques ! Il existait des libellules géantes appelées Meganeura avec des ailes immenses, et des mille-pattes aussi longs que des voitures rampants dans les forêts.",
      en: "Thanks to the large amount of oxygen in the air, insects became gigantic! There were giant dragonflies called Meganeura with huge wings, and millipedes as long as cars crawling in the forests.",
    },
    fullContents: [
      {
        fr: "Grâce à la grande quantité d'oxygène dans l'air, les insectes sont devenus gigantesques ! Il existait des libellules géantes appelées Meganeura avec des ailes immenses, et des mille-pattes aussi longs que des voitures rampants dans les forêts.",
        en: "Thanks to the large amount of oxygen in the air, insects became gigantic! There were giant dragonflies called Meganeura with huge wings, and millipedes as long as cars crawling in the forests.",
      }
    ],
    funFact: {
      fr: "La libellule Meganeura avait des ailes de plus de 70 centimètres d'envergure !",
      en: "The Meganeura dragonfly had wings over 70 centimeters wide!",
    },
    funFacts: [
      {
        fr: "La libellule Meganeura avait des ailes de plus de 70 centimètres d'envergure !",
        en: "The Meganeura dragonfly had wings over 70 centimeters wide!",
      }
    ]
  },
  {
    id: 'peau-reptile',
    title: { fr: 'Peau de Reptile', en: 'Reptile skin' },
    category: { fr: 'Animaux 🦁', en: 'Animals 🦁' },
    categoryKey: 'animaux',
    icon: '🦎',
    shortDesc: {
      fr: "Une armure d'écailles pour vivre au grand soleil !",
      en: 'An armor of scales to live in the sun!',
    },
    fullContent: {
      fr: "Pour pouvoir s'éloigner des rivières humides et vivre dans les déserts, les premiers reptiles ont développé une peau très spéciale recouverte d'écailles imperméables. Cette peau empêche l'eau de s'échapper, agissant comme une gourde protectrice !",
      en: "To be able to move away from humid rivers and live in deserts, the first reptiles developed a very special skin covered with waterproof scales. This skin keeps water inside, acting like a protective canteen!",
    },
    fullContents: [
      {
        fr: "Pour pouvoir s'éloigner des rivières humides et vivre dans les déserts, les premiers reptiles ont développé une peau très spéciale recouverte d'écailles imperméables. Cette peau empêche l'eau de s'échapper, agissant comme une gourde protectrice !",
        en: "To be able to move away from humid rivers and live in deserts, the first reptiles developed a very special skin covered with waterproof scales. This skin keeps water inside, acting like a protective canteen!",
      }
    ],
    funFact: {
      fr: "Les écailles des reptiles sont faites de kératine, la même matière que tes cheveux et tes ongles !",
      en: "Reptile scales are made of keratin, the exact same material as your hair and nails!",
    },
    funFacts: [
      {
        fr: "Les écailles des reptiles sont faites de kératine, la même matière que tes cheveux et tes ongles !",
        en: "Reptile scales are made of keratin, the exact same material as your hair and nails!",
      }
    ]
  },
  {
    id: 'oeuf-solide',
    title: { fr: "L'œuf solide", en: 'The solid egg' },
    category: { fr: 'Animaux 🦁', en: 'Animals 🦁' },
    categoryKey: 'animaux',
    icon: '🥚',
    shortDesc: {
      fr: "Une petite piscine privée pour le bébé !",
      en: 'A tiny private swimming pool for the baby!',
    },
    fullContent: {
      fr: "Avant, les animaux devaient retourner dans l'eau pour pondre des œufs tout mous. Mais les reptiles ont inventé l'œuf avec une coquille solide ! À l'intérieur, le bébé a sa propre réserve d'eau et de nourriture, lui permettant de grandir en toute sécurité sur terre.",
      en: "Before, animals had to return to the water to lay soft eggs. But reptiles invented the egg with a solid shell! Inside, the baby has its own supply of water and food, allowing it to grow safely on land.",
    },
    fullContents: [
      {
        fr: "Avant, les animaux devaient retourner dans l'eau pour pondre des œufs tout mous. Mais les reptiles ont inventé l'œuf avec une coquille solide ! À l'intérieur, le bébé a sa propre réserve d'eau et de nourriture, lui permettant de grandir en toute sécurité sur terre.",
        en: "Before, animals had to return to the water to lay soft eggs. But reptiles invented the egg with a solid shell! Inside, the baby has its own supply of water and food, allowing it to grow safely on land.",
      }
    ],
    funFact: {
      fr: "L'invention de la coquille d'œuf solide a permis aux animaux de coloniser toute la Terre !",
      en: "The invention of the solid eggshell allowed animals to colonize the entire Earth!",
    },
    funFacts: [
      {
        fr: "L'invention de la coquille d'œuf solide a permis aux animaux de coloniser toute la Terre !",
        en: "The invention of the solid eggshell allowed animals to colonize the entire Earth!",
      }
    ]
  },
] as const
