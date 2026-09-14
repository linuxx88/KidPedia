import { audioAssets } from '../../../assets/audio'

export const modernAnimals = [
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
    fullContents: [
      {
        fr: 'Le lion est un grand félin qui vit en Afrique. Il vit en groupes appelés troupes. Le mâle a une magnifique crinière dorée pour se protéger pendant les combats.',
        en: 'The lion is a large feline that lives in Africa. It lives in groups called prides. The male has a magnificent golden mane to protect itself during fights.',
      },
      {
        fr: 'Les lions vivent principalement dans la savane africaine. Ce sont des prédateurs très forts, et ce sont surtout les lionnes qui chassent pour nourrir toute la troupe pendant que le mâle surveille le territoire.',
        en: 'Lions live mainly in the African savannah. They are very strong predators, and it is mostly the lionesses who hunt to feed the whole pride while the male watches the territory.'
      }
    ],
    funFact: {
      fr: "Le rugissement d'un lion peut être entendu jusqu'à 8 kilomètres !",
      en: "A lion's roar can be heard from up to 8 kilometers away!",
    },
    funFacts: [
      {
        fr: "Le rugissement d'un lion peut être entendu jusqu'à 8 kilomètres !",
        en: "A lion's roar can be heard from up to 8 kilometers away!",
      },
      {
        fr: "Les lions dorment énormément : ils peuvent faire la sieste jusqu'à 20 heures par jour pour économiser leur énergie !",
        en: "Lions sleep a lot: they can nap for up to 20 hours a day to save their energy!"
      }
    ],
    sections: [
      {
        icon: '🌍',
        title: { fr: 'Où vit-il ?', en: 'Where does it live?' },
        content: {
          fr: 'Le lion vit dans les grandes plaines herbeuses et les savanes d’Afrique.',
          en: 'The lion lives in the large grassy plains and savannahs of Africa.'
        }
      },
      {
        icon: '🥩',
        title: { fr: 'Que mange-t-il ?', en: 'What does it eat?' },
        content: {
          fr: 'C’est un carnivore : il chasse des zèbres, des antilopes et d’autres grands animaux.',
          en: 'It is a carnivore: it hunts zebras, antelopes, and other large animals.'
        }
      },
      {
        icon: '👑',
        title: { fr: 'Comment vit-il ?', en: 'How does it live?' },
        content: {
          fr: 'Il vit en famille dans une troupe. Les lionnes chassent ensemble pendant que le mâle protège le clan.',
          en: 'It lives with family in a pride. Lionesses hunt together while the male protects the pride.'
        }
      },
      {
        icon: '✨',
        title: { fr: 'Sa crinière magique', en: 'Its magnificent mane' },
        content: {
          fr: 'Seul le lion mâle possède une grande crinière dorée ou brune qui le protège pendant les combats.',
          en: 'Only the male lion has a thick golden or dark mane that protects it during fights.'
        }
      }
    ],
    relatedTopicIds: ['elephant', 'tigre'],
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
    fullContents: [
      {
        fr: 'Les éléphants sont très intelligents et ont une excellente mémoire. Ils utilisent leur trompe pour manger, boire et même faire des câlins.',
        en: 'Elephants are very intelligent and have an excellent memory. They use their trunks to eat, drink, and even give hugs.',
      },
      {
        fr: "Avec leurs grandes oreilles qui agissent comme des ventilateurs, les éléphants peuvent se rafraîchir sous le soleil brûlant d'Afrique ou d'Asie.",
        en: "With their large ears acting like fans, elephants can cool down under the hot African or Asian sun."
      },
      {
        fr: "Les éléphants vivent en familles menées par la plus ancienne et sage femelle. Ils communiquent entre eux en émettant des sons très bas, appelés infrasons, que les humains ne peuvent pas entendre.",
        en: "Elephants live in families led by the oldest and wisest female. They communicate with each other by making very low sounds, called infrasound, which humans cannot hear."
      }
    ],
    funFact: {
      fr: 'Les éléphants ne peuvent pas sauter, mais ils savent très bien nager !',
      en: 'Elephants cannot jump, but they are very good swimmers!',
    },
    funFacts: [
      {
        fr: 'Les éléphants ne peuvent pas sauter, mais ils savent très bien nager !',
        en: 'Elephants cannot jump, but they are very good swimmers!',
      },
      {
        fr: "La trompe d'un éléphant contient plus de 100 000 muscles différents !",
        en: "An elephant's trunk contains over 100,000 different muscles!"
      },
      {
        fr: "Les bébés éléphants sucent parfois leur trompe pour se rassurer, comme les bébés humains sucent leur pouce !",
        en: "Baby elephants sometimes suck their trunk for comfort, just like human babies suck their thumb!"
      }
    ],
    sections: [
      {
        icon: '🌍',
        title: { fr: 'Où vit-il ?', en: 'Where does it live?' },
        content: {
          fr: 'L’éléphant vit dans les grandes savanes et les forêts d’Afrique et d’Asie.',
          en: 'The elephant lives in the great savannahs and forests of Africa and Asia.'
        }
      },
      {
        icon: '🌿',
        title: { fr: 'Que mange-t-il ?', en: 'What does it eat?' },
        content: {
          fr: 'C’est un grand herbivore : il adore manger de l’herbe, des feuilles, des fruits et des écorces d’arbres.',
          en: 'It is a large herbivore: it loves eating grass, leaves, fruits, and tree bark.'
        }
      },
      {
        icon: '🐘',
        title: { fr: 'Comment vit-il ?', en: 'How does it live?' },
        content: {
          fr: 'Il vit en famille avec d’autres éléphants, guidé avec amour par la plus ancienne et la plus sage des femelles.',
          en: 'It lives in a family with other elephants, guided lovingly by the oldest and wisest female.'
        }
      },
      {
        icon: '✨',
        title: { fr: 'Sa trompe magique', en: 'Its magical trunk' },
        content: {
          fr: 'Sa trompe lui sert de nez, de main et de paille géante pour boire, attraper des objets et faire des câlins !',
          en: 'Its trunk serves as a nose, a hand, and a giant straw to drink, grab objects, and give hugs!'
        }
      }
    ],
    relatedTopicIds: ['lion', 'girafe'],
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
    fullContents: [
      {
        fr: "Le tigre est un chasseur solitaire qui vit dans les forêts et les jungles. Contrairement à la plupart des chats, les tigres adorent l'eau et sont d'excellents nageurs !",
        en: 'The tiger is a solitary hunter that lives in forests and jungles. Unlike most cats, tigers love water and are excellent swimmers!',
      },
      {
        fr: "Les tigres possèdent une magnifique fourrure rayée qui les aide à se camoufler dans les hautes herbes pour chasser sans se faire repérer.",
        en: 'Tigers have a magnificent striped coat that helps them camouflage in the tall grass to hunt without being spotted.'
      }
    ],
    funFact: {
      fr: 'Chaque tigre a des rayures uniques, tout comme les empreintes digitales des humains.',
      en: 'Each tigre has unique stripes, just like human fingerprints.',
    },
    funFacts: [
      {
        fr: "Les tigres peuvent nager sur des kilomètres pour traverser de grands fleuves !",
        en: 'Tigers can swim for miles to cross wide rivers!'
      },
      {
        fr: 'Chaque tigre a des rayures uniques, tout comme les empreintes digitales des humains.',
        en: 'Each tigre has unique stripes, just like human fingerprints.',
      }
    ],
    sections: [
      {
        icon: '🌿',
        title: { fr: 'Où vit-il ?', en: 'Where does it live?' },
        content: {
          fr: 'Le tigre vit principalement dans les forêts denses, les jungles et les mangroves d’Asie.',
          en: 'The tiger lives mainly in the dense forests, jungles, and mangroves of Asia.'
        }
      },
      {
        icon: '🥩',
        title: { fr: 'Que mange-t-il ?', en: 'What does it eat?' },
        content: {
          fr: 'C’est un grand carnivore : il chasse à l’affût des cerfs, des sangliers et d’autres animaux de la forêt.',
          en: 'It is a large carnivore: it stalks and hunts deer, wild boars, and other forest animals.'
        }
      },
      {
        icon: '🏊',
        title: { fr: 'Comment vit-il ?', en: 'How does it live?' },
        content: {
          fr: 'Il vit en solitaire et protège son territoire. Contrairement aux petits chats, il adore nager et se baigner !',
          en: 'It lives alone and protects its territory. Unlike small cats, it loves swimming and bathing!'
        }
      },
      {
        icon: '🐅',
        title: { fr: 'Ses rayures magiques', en: 'Its magical stripes' },
        content: {
          fr: 'Ses rayures orange et noires sont comme une empreinte digitale : aucun tigre n’a exactement les mêmes !',
          en: 'Its orange and black stripes are like fingerprints: no two tigers have the exact same pattern!'
        }
      }
    ],
    relatedTopicIds: ['lion', 'singe'],
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
    fullContents: [
      {
        fr: "Les singes sont très malins et utilisent souvent leurs mains et leurs pieds pour attraper des objets. Beaucoup d'entre eux vivent dans les arbres et utilisent leur queue pour s'équilibrer.",
        en: 'Monkeys are very clever and often use their hands and feet to grab objects. Many of them live in trees and use their tails for balance.',
      },
      {
        fr: "Ces animaux très sociaux vivent en groupes appelés troupes. Ils passent beaucoup de temps à se toiletter les uns les autres pour renforcer leurs liens d'amitié.",
        en: "These very social animals live in groups called troops. They spend a lot of time grooming each other to strengthen their friendship bonds."
      },
      {
        fr: "Certains singes ont une queue préhensile, ce qui signifie qu'elle peut s'enrouler autour des branches et agir comme une véritable cinquième main pour attraper des fruits !",
        en: "Some monkeys have a prehensile tail, meaning it can wrap around branches and act like a real fifth hand to grab fruit!"
      }
    ],
    funFact: {
      fr: 'Certains singes savent utiliser des outils, comme des pierres, pour casser des noix !',
      en: 'Some monkeys know how to use tools, like stones, to crack nuts!',
    },
    funFacts: [
      {
        fr: 'Certains singes savent utiliser des outils, comme des pierres, pour casser des noix !',
        en: 'Some monkeys know how to use tools, like stones, to crack nuts!',
      },
      {
        fr: "Le chimpanzé partage presque 99% de ses gènes avec les humains !",
        en: "The chimpanzee shares almost 99% of its genes with humans!"
      },
      {
        fr: "Il existe des singes pygmées si petits qu'ils pèsent moins qu'une pomme et tiennent dans la main d'un humain !",
        en: "There are pygmy monkeys so small they weigh less than an apple and fit in a human's hand!"
      }
    ],
    sections: [
      {
        icon: '🐒',
        title: { fr: 'L’acrobate des arbres', en: 'Acrobat of the trees' },
        content: {
          fr: "Le singe est un champion d'agilité qui bondit d'arbre en arbre avec une aisance incroyable.",
          en: "The monkey is a champion of agility leaping from tree to tree with incredible ease."
        }
      },
      {
        icon: '🖐️',
        title: { fr: 'Des mains très habiles', en: 'Very handy hands' },
        content: {
          fr: "Avec ses doigts agiles, il épluche des fruits savoureux et sait utiliser des bâtons pour jouer.",
          en: "With nimble fingers, it peels tasty fruits and knows how to use little sticks to play."
        }
      },
      {
        icon: '🤗',
        title: { fr: 'La vie en troupe', en: 'Life in a troop' },
        content: {
          fr: "Les singes vivent en groupe joyeux : ils veillent les uns sur les autres et partagent leurs repas.",
          en: "Monkeys live in cheerful groups: they look out for one another and share their meals."
        }
      },
      {
        icon: '🌿',
        title: { fr: 'Une queue d’équilibre', en: 'A balance tail' },
        content: {
          fr: "Leur longue queue souple leur sert à garder l'équilibre sur les branches et parfois à s'accrocher.",
          en: "Their long flexible tail helps them balance on branches and sometimes hold on tightly."
        }
      }
    ],
    relatedTopicIds: ['tigre', 'arbres']
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
    fullContents: [
      {
        fr: "Le lapin est célèbre pour ses grandes oreilles qui lui permettent d'entendre le moindre danger. Il se déplace en faisant de petits bonds et vit dans des terriers sous la terre.",
        en: 'The rabbit is famous for its large ears that allow it to hear the slightest danger. It moves by making small hops and lives in burrows underground.',
      },
      {
        fr: "Les lapins ont des yeux placés sur les côtés de la tête, ce qui leur permet de voir presque tout ce qui se passe autour d'eux sans bouger !",
        en: "Rabbits have eyes placed on the sides of their head, allowing them to see almost everything happening around them without moving!"
      },
      {
        fr: "Les lapins se nourrissent d'herbe, de feuilles et de légumes. Leurs pattes arrière très puissantes les aident à faire des pointes de vitesse pour échapper aux prédateurs.",
        en: "Rabbits feed on grass, leaves, and vegetables. Their very powerful hind legs help them run fast to escape predators."
      }
    ],
    funFact: {
      fr: "Les dents des lapins ne s'arrêtent jamais de pousser !",
      en: "Rabbits' teeth never stop growing!",
    },
    funFacts: [
      {
        fr: "Les dents des lapins ne s'arrêtent jamais de pousser !",
        en: "Rabbits' teeth never stop growing!",
      },
      {
        fr: "Un lapin heureux exprime sa joie en faisant des bonds et des pirouettes en l'air, un comportement appelé 'binky' !",
        en: "A happy rabbit expresses its joy by jumping and twisting in the air, a behavior called a 'binky'!"
      },
      {
        fr: "Le lapin peut vivre jusqu'à 10 ans s'il est bien soigné à la maison !",
        en: "A rabbit can live up to 10 years if well cared for at home!"
      }
    ],
    sections: [
      {
        icon: '👂',
        title: { fr: 'De grandes oreilles à l’écoute', en: 'Big listening ears' },
        content: {
          fr: 'Le lapin possède de longues oreilles mobiles qui pivotent pour capter le moindre bruit et l’avertir quand un danger approche.',
          en: 'The rabbit has long, mobile ears that pivot to catch soft sounds and warn of approaching danger.',
        },
      },
      {
        icon: '🥕',
        title: { fr: 'Un gourmand d’herbe fraîche', en: 'A fan of fresh greens' },
        content: {
          fr: 'Strictement herbivore, il grignote de l’herbe, des trèfles et des pissenlits avec ses dents de devant qui poussent sans arrêt.',
          en: 'A strict herbivore, it nibbles on grass, clover, and dandelions using front teeth that grow throughout its life.',
        },
      },
      {
        icon: '🐾',
        title: { fr: 'Des bonds vers le terrier', en: 'Hopping to the burrow' },
        content: {
          fr: 'Grâce à ses puissantes pattes arrière, il bondit agilement vers son terrier souterrain où il vit en groupe familial bien au chaud.',
          en: 'With powerful hind legs, it hops swiftly toward its cozy underground burrow where it lives in a sheltered family group.',
        },
      },
      {
        icon: '🐰',
        title: { fr: 'Cousin du lièvre', en: 'Cousin of the hare' },
        content: {
          fr: 'Contrairement à son grand cousin le lièvre qui vit seul à la surface, le lapin est plus petit, plus sociable et préfère vivre sous terre.',
          en: 'Unlike its larger cousin the solitary hare living in open fields, the rabbit is smaller, more social, and digs burrows underground.',
        },
      },
    ],
    relatedTopicIds: ['loup', 'yeux'],
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
    fullContents: [
      {
        fr: "La tortue possède une carapace très solide pour se protéger des prédateurs. Il existe des tortues qui vivent sur terre et d'autres qui passent toute leur vie dans l'océan.",
        en: 'The turtle has a very strong shell to protect itself from predators. There are turtles that live on land and others that spend their entire lives in the ocean.',
      },
      {
        fr: "La carapace de la tortue est attachée à sa colonne vertébrale, elle ne peut donc jamais l'enlever ! Elle y cache sa tête et ses pattes lorsqu'elle a peur.",
        en: "The turtle's shell is attached to its spine, so it can never remove it! It hides its head and legs inside when scared."
      },
      {
        fr: "Les tortues marines parcourent des milliers de kilomètres à travers les océans. Elles reviennent toujours pondre leurs œufs sur la plage exacte où elles sont nées.",
        en: "Sea turtles travel thousands of miles across the oceans. They always return to lay their eggs on the exact beach where they were born."
      }
    ],
    funFact: {
      fr: 'Certaines tortues géantes peuvent vivre plus de 150 ans !',
      en: 'Some giant turtles can live for more than 150 years!',
    },
    funFacts: [
      {
        fr: 'Certaines tortues géantes peuvent vivre plus de 150 ans !',
        en: 'Some giant turtles can live for more than 150 years!',
      },
      {
        fr: "Les tortues existaient déjà au temps des dinosaures, il y a plus de 200 millions d'années !",
        en: "Turtles already existed during the time of the dinosaurs, over 200 million years ago!"
      },
      {
        fr: "Les tortues n'ont pas de dents, mais elles ont un bec très tranchant pour couper leur nourriture !",
        en: "Turtles don't have teeth, but they have a very sharp beak to cut their food!"
      }
    ],
    sections: [
      {
        icon: '🐢',
        title: { fr: 'Une maison sur le dos', en: 'A house on its back' },
        content: {
          fr: "La tortue est un reptile tranquille protégé par une solide carapace attachée à son corps.",
          en: "The turtle is a peaceful reptile protected by a tough shell attached to its body."
        }
      },
      {
        icon: '🌊',
        title: { fr: 'Sur terre ou dans l’eau', en: 'On land or in water' },
        content: {
          fr: "Certaines marchent dans les jardins, tandis que les tortues marines nagent gracieusement dans les océans.",
          en: "Some walk through gardens, while sea turtles swim gracefully through the vast oceans."
        }
      },
      {
        icon: '🛡️',
        title: { fr: 'Un abri secret', en: 'A secret shelter' },
        content: {
          fr: "Dès qu'un danger approche, elle rentre la tête et ses pattes pour se protéger comme dans un bouclier.",
          en: "As soon as danger nears, it tucks its head and legs inside to protect itself like a shield."
        }
      },
      {
        icon: '⏳',
        title: { fr: 'Une vie très longue', en: 'A very long life' },
        content: {
          fr: "Les tortues vivaient déjà avec les dinosaures et certaines peuvent vivre plus de cent cinquante ans !",
          en: "Turtles already lived alongside dinosaurs and some can live for more than one hundred and fifty years!"
        }
      }
    ],
    relatedTopicIds: ['dauphin', 'terre']
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
    fullContents: [
      {
        fr: 'Le kangourou vit en Australie. Il utilise ses puissantes pattes arrière pour faire des bonds géants. Les mamans kangourous ont une poche pour porter leur bébé.',
        en: 'The kangaroo lives in Australia. It uses its powerful hind legs to make giant leaps. Mother kangaroos have a pouch to carry their baby.',
      },
      {
        fr: "Grâce à sa grande queue musclée qui lui sert de troisième pied pour s'équilibrer et de propulseur pour sauter, le kangourou peut faire des bonds de 9 mètres de long !",
        en: "Thanks to its large muscular tail acting as a third foot for balance and a thruster for jumping, the kangaroo can make 9-meter long leaps!"
      },
      {
        fr: "Le bébé kangourou naît tout petit et grandit au chaud dans la poche de sa maman pendant plusieurs mois avant de faire ses premiers pas dehors.",
        en: "The baby kangaroo is born tiny and grows warm inside its mother's pouch for several months before taking its first steps outside."
      }
    ],
    funFact: {
      fr: 'Un kangourou ne peut pas marcher à reculons !',
      en: 'A kangaroo cannot walk backwards!',
    },
    funFacts: [
      {
        fr: 'Un kangourou ne peut pas marcher à reculons !',
        en: 'A kangaroo cannot walk backwards!',
      },
      {
        fr: "Les kangourous vivent en grands groupes appelés 'mobs' et se défendent parfois en faisant de la boxe avec leurs pattes !",
        en: "Kangaroos live in large groups called 'mobs' and sometimes defend themselves by boxing with their paws!"
      },
      {
        fr: "Ils peuvent faire des bonds de 3 mètres de haut !",
        en: "They can jump up to 3 meters high!"
      }
    ],
    sections: [
      {
        icon: '🦘',
        title: { fr: "Un marsupial d'Australie", en: "An Australian marsupial" },
        content: {
          fr: "Le kangourou est un mammifère emblématique d'Australie appartenant à la famille des marsupiaux, des animaux célèbres pour leur poche ventrale.",
          en: "The kangaroo is an iconic Australian mammal belonging to the marsupial family, animals famous for their unique belly pouch."
        }
      },
      {
        icon: '👝',
        title: { fr: "La poche protectrice", en: "The nursery pouch" },
        content: {
          fr: "À la naissance, le minuscule petit grimpe jusqu'à la poche de sa maman. Il y reste bien au chaud pendant plusieurs mois pour téter et grandir en sécurité.",
          en: "At birth, the tiny joey climbs into its mother's pouch. It stays warmly nestled inside for several months to nurse and grow in total safety."
        }
      },
      {
        icon: '⚡',
        title: { fr: "Des bonds spectaculaires", en: "Spectacular leaps" },
        content: {
          fr: "Avec ses grandes pattes arrière élastiques et sa queue musclée qui lui sert de balancier, il se déplace en bondissant rapidement à travers les plaines.",
          en: "With its long elastic hind legs and powerful tail acting as a counterbalance, it travels across open plains by making swift, graceful leaps."
        }
      },
      {
        icon: '🌿',
        title: { fr: "Un grand herbivore", en: "A peaceful herbivore" },
        content: {
          fr: "Les kangourous se nourrissent principalement d'herbes, de feuilles et de jeunes pousses. Beaucoup d'espèces broutent paisiblement au lever et au coucher du soleil.",
          en: "Kangaroos feed primarily on grass, leaves, and tender shoots. Many species graze peacefully together in the cool hours of dawn and dusk."
        }
      }
    ],
    relatedTopicIds: ['lapin', 'terre']
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
    fullContents: [
      {
        fr: "Le dauphin n'est pas un poisson, c'est un mammifère ! Il doit remonter à la surface pour respirer. Il communique en faisant des petits cliquetis.",
        en: "The dolphin is not a fish, it's a mammal! It must come to the surface to breathe. It communicates by making small clicks.",
      },
      {
        fr: "Les dauphins sont extrêmement amicaux et aiment jouer dans les vagues créées par les bateaux. Ils s'entraident toujours si l'un d'eux est blessé.",
        en: "Dolphins are extremely friendly and love to play in the waves created by boats. They always help each other if one of them is injured."
      },
      {
        fr: "Grâce à l'écholocalisation, le dauphin envoie des sons dans l'eau pour repérer les poissons et voir sous l'eau même s'il fait très sombre.",
        en: "Using echolocation, the dolphin sends sounds into the water to locate fish and see underwater even if it is very dark."
      }
    ],
    funFact: {
      fr: 'Les dauphins dorment avec un seul œil fermé !',
      en: 'Dolphins sleep with only one eye closed!',
    },
    funFacts: [
      {
        fr: 'Les dauphins dorment avec un seul œil fermé !',
        en: 'Dolphins sleep with only one eye closed!',
      },
      {
        fr: "Chaque dauphin a un sifflement unique qui lui sert de prénom pour appeler ses amis !",
        en: "Each dolphin has a unique whistle that acts as a first name to call its friends!"
      },
      {
        fr: "Ils peuvent sauter jusqu'à 6 mètres hors de l'eau !",
        en: "They can leap up to 6 meters out of the water!"
      }
    ],
    sections: [
      {
        icon: '🐬',
        title: { fr: 'Un mammifère marin', en: 'A marine mammal' },
        content: {
          fr: "Le dauphin n'est pas un poisson : c'est un mammifère qui remonte à la surface pour respirer.",
          en: "The dolphin is not a fish: it is a mammal that comes to the surface to breathe."
        }
      },
      {
        icon: '🐟',
        title: { fr: 'Agile sous les vagues', en: 'Agile under the waves' },
        content: {
          fr: "Grand nageur très rapide, il chasse des poissons et utilise des cliquetis sonores pour se repérer.",
          en: "A swift and skilled swimmer, it hunts fish and uses clicking sounds to find its way."
        }
      },
      {
        icon: '🌊',
        title: { fr: 'Une bande joyeuse', en: 'A playful pod' },
        content: {
          fr: "Les dauphins vivent en groupe, adorent sauter hors de l'eau et s'entraident si l'un d'eux faiblit.",
          en: "Dolphins live in groups, love jumping out of water, and help each other if one is weak."
        }
      },
      {
        icon: '🎵',
        title: { fr: 'Un sifflement prénom', en: 'A name whistle' },
        content: {
          fr: "Chaque dauphin invente un sifflement unique qui permet à ses amis de le reconnaître facilement.",
          en: "Each dolphin invents a unique whistle that allows its friends to easily recognize it."
        }
      }
    ],
    relatedTopicIds: ['tortue', 'pingouin']
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
    fullContents: [
      {
        fr: 'La girafe utilise son long cou pour attraper les feuilles en haut des arbres. Sa langue est bleue et très longue.',
        en: 'The giraffe uses its long neck to catch leaves at the top of trees. Its tongue is blue and very long.',
      },
      {
        fr: "Pour boire de l'eau, la girafe doit écarter ses longues pattes avant pour pouvoir baisser sa tête jusqu'au sol. C'est une position difficile pour elle !",
        en: "To drink water, the giraffe must spread its long front legs to lower its head to the ground. This is a difficult position for her!"
      },
      {
        fr: "La girafe dort très peu, souvent debout et seulement par petites siestes de quelques minutes pour rester vigilante face aux lions.",
        en: "The giraffe sleeps very little, often standing up and only in short naps of a few minutes to stay alert to lions."
      }
    ],
    funFact: {
      fr: "Le cou d'une girafe a le même nombre d'os que le tien : seulement 7 !",
      en: "A giraffe's neck has the same number of bones as yours: only 7!",
    },
    funFacts: [
      {
        fr: "Le cou d'une girafe a le même nombre d'os que le tien : seulement 7 !",
        en: "A giraffe's neck has the same number of bones as yours: only 7!",
      },
      {
        fr: "La langue de la girafe est bleu-violet pour éviter de prendre des coups de soleil lorsqu'elle attrape des feuilles !",
        en: "The giraffe's tongue is blue-purple to prevent sunburn when she grabs leaves!"
      },
      {
        fr: "Le cœur de la girafe pèse environ 11 kilos pour pouvoir envoyer le sang tout en haut de son long cou !",
        en: "The giraffe's heart weighs about 11 kilos to pump blood all the way up her long neck!"
      }
    ],
    sections: [
      {
        icon: '🦒',
        title: { fr: 'La géante au long cou', en: 'The long-necked giant' },
        content: {
          fr: "La girafe est le plus grand animal de la planète avec son cou géant et ses longues pattes.",
          en: "The giraffe is the tallest animal on the planet with its giant neck and long legs."
        }
      },
      {
        icon: '🌿',
        title: { fr: 'Au sommet des arbres', en: 'Atop the tall trees' },
        content: {
          fr: "Avec sa longue langue bleue, elle attrape facilement les feuilles tendres tout en haut des acacias.",
          en: "With its long blue tongue, it easily plucks tender leaves from the tops of acacia trees."
        }
      },
      {
        icon: '❤️',
        title: { fr: 'Un cœur surpuissant', en: 'A powerful heart' },
        content: {
          fr: "Son cœur pèse plus de 10 kilos pour faire monter le sang jusqu'à sa tête tout là-haut !",
          en: "Its heart weighs over 10 kilos to push blood all the way up to its head high above!"
        }
      },
      {
        icon: '🌍',
        title: { fr: 'La vigie de la savane', en: 'Savannah lookout' },
        content: {
          fr: "De sa grande hauteur, elle veille sur la plaine et prévient les autres animaux si un lion approche.",
          en: "From its great height, it watches over the plain and alerts other animals if a lion approaches."
        }
      }
    ],
    relatedTopicIds: ['elephant', 'lion']
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
    fullContents: [
      {
        fr: 'Le panda géant vit en Chine. Il passe sa journée à manger du bambou. Il est très calme et adore faire la sieste.',
        en: 'The giant panda lives in China. It spends its day eating bamboo. It is very calm and loves to nap.',
      },
      {
        fr: "Le panda possède un 'sixième doigt' à ses pattes avant, qui est en fait un os du poignet modifié pour l'aider à saisir et éplucher les tiges de bambou.",
        en: "The panda has a 'sixth toe' on its front paws, which is actually a modified wrist bone to help it grip and peel bamboo stalks."
      },
      {
        fr: "Les bébés pandas naissent tout roses, sans poils et minuscules comme un bâton de beurre, avant de développer leur belle fourrure noire et blanche.",
        en: "Baby pandas are born all pink, hairless, and tiny like a stick of butter, before developing their beautiful black and white fur."
      }
    ],
    funFact: {
      fr: "Un panda peut manger jusqu'à 12 kilos de bambou par jour !",
      en: 'A panda can eat up to 12 kilos of bamboo per day!',
    },
    funFacts: [
      {
        fr: "Un panda peut manger jusqu'à 12 kilos de bambou par jour !",
        en: 'A panda can eat up to 12 kilos of bamboo per day!',
      },
      {
        fr: "Malgré sa taille d'ours, le panda est un excellent grimpeur d'arbres et sait aussi très bien nager !",
        en: "Despite its bear size, the panda is an excellent tree climber and knows how to swim very well!"
      },
      {
        fr: "Le panda géant passe environ 12 heures par jour à grignoter du bambou !",
        en: "The giant panda spends about 12 hours a day munching on bamboo!"
      }
    ],
    sections: [
      {
        icon: '🐼',
        title: { fr: "Un ours noir et blanc", en: "A black and white bear" },
        content: {
          fr: "Le panda géant fait partie de la famille des ours. Avec son épaisse fourrure bicolore et ses taches noires autour des yeux, il vit paisiblement dans les montagnes brumeuses de Chine.",
          en: "The giant panda belongs to the bear family. With its thick two-toned coat and dark eye patches, it lives peacefully in the misty mountain forests of China."
        }
      },
      {
        icon: '🎋',
        title: { fr: "Un grand amateur de bambou", en: "A devoted bamboo eater" },
        content: {
          fr: "Bien qu'il descende d'ancêtres carnivores, le panda se nourrit presque exclusivement de tiges et de feuilles de bambou. Il peut toutefois croquer occasionnellement d'autres plantes ou petits insectes.",
          en: "Although descended from carnivore ancestors, the panda feeds almost entirely on fresh bamboo stalks. Occasionally, it may also nibble other plants or small insects."
        }
      },
      {
        icon: '🐾',
        title: { fr: "Le faux pouce du grimpeur", en: "The climber's false thumb" },
        content: {
          fr: "Pour tenir fermement les tiges rigides, sa patte avant possède un petit os du poignet allongé qui agit comme un pouce. Ce grimpeur agile sait aussi se réfugier dans les arbres.",
          en: "To grasp tough bamboo stalks firmly, its front paw has an enlarged wrist bone that works like a thumb. This agile climber can also rest safely high in trees."
        }
      },
      {
        icon: '💤',
        title: { fr: "Un rythme de vie tranquille", en: "A calm daily routine" },
        content: {
          fr: "Comme le bambou apporte peu d'énergie, le panda passe de longues heures par jour à mâcher tranquillement, puis s'endort pour de longues siestes afin d'économiser ses forces.",
          en: "Because fibrous bamboo provides little energy, the panda spends long hours gently chewing, then curls up for restorative naps to save its strength."
        }
      }
    ],
    relatedTopicIds: ['singe', 'arbres']
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
    fullContents: [
      {
        fr: "Les manchots vivent dans le froid. Leurs ailes leur servent de nageoires pour voler sous l'eau !",
        en: 'Penguins live in the cold. Their wings serve as flippers to fly underwater!',
      },
      {
        fr: "Le manchot a une démarche dandinante amusante sur la terre ou la glace, mais il glisse aussi sur le ventre comme sur une luge pour aller plus vite !",
        en: "The penguin has an amusing waddling gait on land or ice, but it also slides on its belly like a sled to go faster!"
      },
      {
        fr: "La couleur noire et blanche de sa fourrure de plumes lui sert de camouflage idéal dans l'océan pour se cacher des léopards de mer et des orques.",
        en: "The black and white color of its feather coat serves as ideal camouflage in the ocean to hide from leopard seals and killer whales."
      }
    ],
    funFact: {
      fr: 'Pour se tenir chaud, ils font de gros câlins collectifs.',
      en: 'To keep warm, they have big group hugs.',
    },
    funFacts: [
      {
        fr: 'Pour se tenir chaud, ils font de gros câlins collectifs.',
        en: 'To keep warm, they have big group hugs.',
      },
      {
        fr: "Les manchots empereurs peuvent plonger jusqu'à 500 mètres de profondeur pour attraper du poisson !",
        en: "Emperor penguins can dive up to 500 meters deep to catch fish!"
      },
      {
        fr: "Certains manchots offrent un joli caillou rond en cadeau à leur partenaire pour déclarer leur flamme !",
        en: "Some penguins offer a nice round pebble as a gift to their partner to declare their love!"
      }
    ],
    sections: [
      {
        icon: '🐧',
        title: { fr: 'Un oiseau marin', en: 'A marine bird' },
        content: {
          fr: "Le manchot est un oiseau noir et blanc qui ne vole pas dans l'air mais fend l'eau comme une flèche.",
          en: "The penguin is a black and white bird that does not fly in the air but cuts through water like an arrow."
        }
      },
      {
        icon: '❄️',
        title: { fr: 'Le roi de la glisse', en: 'King of sliding' },
        content: {
          fr: "Il vit sur la banquise polaire glacée et adore glisser sur le ventre comme sur une petite luge.",
          en: "It lives on icy polar sea ice and loves sliding on its belly just like on a little sled."
        }
      },
      {
        icon: '🐟',
        title: { fr: 'Plongeur sous l’eau', en: 'Underwater diver' },
        content: {
          fr: "Ses ailes lui servent de nageoires puissantes pour plonger profond et attraper de petits poissons.",
          en: "Its wings act as powerful flippers to dive deep and catch quick little fish."
        }
      },
      {
        icon: '🫂',
        title: { fr: 'Câlins contre le froid', en: 'Hugs against the cold' },
        content: {
          fr: "Pendant les tempêtes de neige, les manchots se collent tous ensemble pour garder leurs bébés bien au chaud.",
          en: "During snowstorms, penguins press together closely to keep their babies warm and safe."
        }
      }
    ],
    relatedTopicIds: ['antarctique', 'dauphin']
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
    fullContents: [
      {
        fr: 'Le loup vit en famille dans une meute. Il hurle pour communiquer avec ses amis de loin.',
        en: 'The wolf lives in a family in a pack. It howls to communicate with its friends from afar.',
      },
      {
        fr: "Le loup est un coureur infatigable qui peut voyager sur de très longues distances pour chasser. Les loups s'entraident pour protéger les petits.",
        en: "The wolf is a tireless runner that can travel very long distances to hunt. Wolves help each other protect the pups."
      },
      {
        fr: "La meute de loups est très organisée. Ils utilisent leur langage corporel (oreilles, queue, grognements) pour expressimer leurs émotions.",
        en: "The wolf pack is highly organized. They use body language (ears, tail, growls) to express their emotions."
      }
    ],
    funFact: {
      fr: 'Le nez du loup est 100 fois plus puissant que le tien !',
      en: "The wolf's nose is 100 times more powerful than yours!",
    },
    funFacts: [
      {
        fr: 'Le nez du loup est 100 fois plus puissant que le tien !',
        en: "The wolf's nose is 100 times more powerful than yours!",
      },
      {
        fr: "Le loup peut courir à plus de 50 kilomètres par heure lorsqu'il poursuit une proie !",
        en: "The wolf can run at over 50 kilometers per hour when chasing prey!"
      },
      {
        fr: "Les louveteaux naissent sourds et aveugles, et toute la meute s'occupe d'eux !",
        en: "Wolf pups are born deaf and blind, and the entire pack takes care of them!"
      }
    ],
    sections: [
      {
        icon: '🌲',
        title: { fr: 'Au cœur des forêts sauvages', en: 'In wild forests' },
        content: {
          fr: 'Le loup vit principalement dans les forêts, les plaines et les montagnes où il trouve de grands espaces naturels pour courir.',
          en: 'The wolf lives mainly in forests, plains, and mountains where it finds wide-open natural spaces to roam.',
        },
      },
      {
        icon: '🐾',
        title: { fr: 'Une vraie vie de famille', en: 'A true family pack' },
        content: {
          fr: 'Les loups vivent en meute familiale : les parents et les plus grands frères et sœurs s’entraident avec tendresse pour nourrir et protéger les petits louveteaux.',
          en: 'Wolves live in a family pack: parents and older siblings work together tenderly to feed and protect the newborn pups.',
        },
      },
      {
        icon: '🥩',
        title: { fr: 'Un chasseur d’équipe', en: 'A team hunter' },
        content: {
          fr: 'Carnivore, le loup chasse en groupe des proies comme les cerfs ou les chevreuils pour nourrir tous les membres de la meute.',
          en: 'As a carnivore, the wolf cooperates with its pack to hunt deer, ensuring food is shared among all members.',
        },
      },
      {
        icon: '🌕',
        title: { fr: 'Le chant du hurlement', en: 'The howling song' },
        content: {
          fr: 'En levant le museau vers le ciel, le loup pousse de longs hurlements sonores pour appeler ses proches égarés et marquer son territoire.',
          en: 'Lifting its snout to the sky, the wolf lets out long musical howls to call distant relatives and mark its territory.',
        },
      },
    ],
    relatedTopicIds: ['lion', 'la-lune'],
  }
] as const
