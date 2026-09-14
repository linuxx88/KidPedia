import type { RawTopic, Topic } from './types';

const CATEGORY = { fr: 'Dinosaures REX 🦖', en: 'Dinos REX 🦖' } as const;
const CATEGORY_KEY = 'dinosaures' as const;

const rawDinosaurs: readonly RawTopic[] = [
  {
    id: 't-rex',
    title: { fr: 'Le T-Rex', en: 'The T-Rex' },
    icon: 'REX',
    shortDesc: { fr: 'Le plus célèbre des dinosaures.', en: 'The most famous dinosaur.' },
    fullContents: [
      {
        fr: "Le Tyrannosaurus Rex était un redoutable prédateur. Il mesurait jusqu'à 12 mètres de long. Ses dents étaient aussi grandes que des bananes ! Il vivait il y a environ 66 millions d'années.",
        en: "The Tyrannosaurus Rex was a fearsome predator. It measured up to 12 meters long. Its teeth were as big as bananas! It lived about 66 million years ago."
      },
      {
        fr: "Le T-Rex avait des mâchoires incroyablement puissantes, capables de broyer les os de ses proies d'un seul coup. C'était l'un des plus grands carnivores terrestres de tous les temps.",
        en: "The T-Rex had incredibly powerful jaws, capable of crushing the bones of its prey in a single bite. It was one of the largest land carnivores of all time."
      },
      {
        fr: "Malgré sa taille immense et sa force redoutable, le T-Rex ne pouvait pas courir très vite à cause de son poids lourd. Il préférait probablement surprendre ses proies en embuscade.",
        en: "Despite its huge size and fearsome strength, the T-Rex couldn't run very fast due to its heavy weight. It probably preferred to ambush its prey."
      }
    ],
    funFacts: [
      {
        fr: "Même s'il était géant, ses bras étaient tout petits !",
        en: "Even though it was giant, its arms were very small!"
      },
      {
        fr: "Le T-Rex avait une excellente vision binoculaire, ce qui veut dire qu'il pouvait très bien évaluer les distances pour chasser !",
        en: "The T-Rex had excellent binocular vision, meaning it could judge distances very well for hunting!"
      },
      {
        fr: "Une seule dent de T-Rex pouvait mesurer jusqu'à 30 centimètres de long, racine comprise !",
        en: "A single T-Rex tooth could measure up to 30 centimeters long, including the root!"
      }
    ],
    sections: [
      {
        icon: '🦖',
        title: { fr: 'Le roi des géants', en: 'The king of giants' },
        content: {
          fr: "Le T-Rex était l'un des plus impressionnants dinosaures terrestres. Il mesurait plus de 12 mètres de long !",
          en: "The T-Rex was one of the most impressive land dinosaurs. It measured over 12 meters long!"
        }
      },
      {
        icon: '🥩',
        title: { fr: 'Un chasseur redoutable', en: 'A fearsome hunter' },
        content: {
          fr: "Avec des mâchoires surpuissantes et des dents acérées comme des bananes, il chassait d'autres dinosaures.",
          en: "With mighty jaws and teeth as sharp as bananas, it hunted other dinosaurs."
        }
      },
      {
        icon: '💪',
        title: { fr: 'De tout petits bras', en: 'Tiny little arms' },
        content: {
          fr: "Même s'il était géant et très fort, ses deux bras étaient si courts qu'il ne pouvait pas toucher sa bouche !",
          en: "Even though huge and strong, its two arms were so short it could not touch its mouth!"
        }
      },
      {
        icon: '⏳',
        title: { fr: 'Une époque disparue', en: 'A bygone era' },
        content: {
          fr: "Le T-Rex vivait sur Terre il y a 66 millions d'années, bien avant l'apparition des premiers humains.",
          en: "The T-Rex lived on Earth 66 million years ago, long before the very first humans appeared."
        }
      }
    ],
    relatedTopicIds: ['triceratops', 'velociraptor']
  },
  {
    id: 'triceratops',
    title: { fr: 'Le Tricératops', en: 'The Triceratops' },
    icon: '🦕',
    shortDesc: { fr: 'Le dinosaure à trois cornes.', en: 'The three-horned dinosaur.' },
    fullContents: [
      {
        fr: "Le Tricératops était un herbivore, ce qui veut dire qu'il mangeait des plantes. Il avait une grande collerette en os derrière la tête pour se protéger des attaques de prédateurs comme le T-Rex.",
        en: "The Triceratops was an herbivore, which means it ate plants. It had a large bony frill behind its head to protect itself from attacks by predators like the T-Rex."
      },
      {
        fr: "Avec son bec solide comme celui d'un perroquet géant, le Tricératops pouvait couper les plantes les plus dures et les plus fibreuses de son époque pour s'en nourrir.",
        en: "With its strong beak like a giant parrot, the Triceratops could cut the toughest, most fibrous plants of its time to feed on."
      },
      {
        fr: "Le Tricératops vivait en troupeaux pour mieux se défendre. Leurs petits grandissaient à l'abri au milieu des adultes prêts à pointer leurs cornes vers le danger.",
        en: "The Triceratops lived in herds for better defense. Their young grew up safely in the middle of adults ready to point their horns towards danger."
      }
    ],
    funFacts: [
      {
        fr: "Son nom signifie littéralement 'Tête à trois cornes' !",
        en: "Its name literally means 'Three-horned head'!"
      },
      {
        fr: "La collerette du Tricératops pouvait aussi lui servir à réguler sa température corporelle en captant le soleil !",
        en: "The Triceratops' frill could also help regulate its body temperature by catching the sun!"
      },
      {
        fr: "Il possédait jusqu'à 800 dents empilées dans sa bouche, prêtes à remplacer celles qui s'usaient !",
        en: "It had up to 800 teeth stacked in its mouth, ready to replace those that wore out!"
      }
    ],
    sections: [
      {
        icon: '🦕',
        title: { fr: 'Le géant à trois cornes', en: 'The three-horned giant' },
        content: {
          fr: "Le Tricératops était un immense dinosaure à quatre pattes reconnaissable à son grand bouclier osseux.",
          en: "The Triceratops was a massive four-legged dinosaur famous for its large bony shield."
        }
      },
      {
        icon: '🌿',
        title: { fr: 'Un amateur de plantes', en: 'A plant lover' },
        content: {
          fr: "C'était un paisible herbivore : avec son bec solide, il coupait des feuilles et des branches dures.",
          en: "It was a peaceful herbivore: using its tough beak, it snipped leaves and sturdy branches."
        }
      },
      {
        icon: '🛡️',
        title: { fr: 'Un bouclier solide', en: 'A strong shield' },
        content: {
          fr: "Sa collerette d'os et ses cornes pointues lui servaient d'armure pour impressionner les prédateurs comme le T-Rex.",
          en: "Its bony frill and pointed horns acted as armor to scare off predators like the T-Rex."
        }
      },
      {
        icon: '🐾',
        title: { fr: 'La vie en troupeau', en: 'Life in a herd' },
        content: {
          fr: "Les Tricératops voyageaient ensemble en grand groupe pour protéger les bébés au milieu des adultes.",
          en: "Triceratops traveled together in large groups to keep the babies safe among adults."
        }
      }
    ],
    relatedTopicIds: ['t-rex', 'stegosaure']
  },
  {
    id: 'stegosaure',
    title: { fr: 'Le Stégosaure', en: 'The Stegosaurus' },
    icon: '🛡️',
    shortDesc: { fr: 'Le dinosaure avec des plaques sur le dos.', en: 'The dinosaur with plates on its back.' },
    fullContents: [
      {
        fr: "Le Stégosaure avait de grandes plaques osseuses sur le dos et des pointes au bout de sa queue pour se défendre. C'était un dinosaure très calme qui mangeait des fougères.",
        en: "The Stegosaurus had large bony plates on its back and spikes at the end of its tail for defense. It was a very calm dinosaur that ate ferns."
      },
      {
        fr: "Le Stégosaure marchait très lentement sur ses quatre pattes courtes. Ses plaques sur le dos n'étaient pas attachées à ses os, mais plantées directement dans sa peau épaisse !",
        en: "The Stegosaurus walked very slowly on its four short legs. Its back plates were not attached to its bones, but embedded directly in its thick skin!"
      },
      {
        fr: "Pour se nourrir, ce grand dinosaure restait près du sol pour brouter de jeunes pousses de plantes et de petites fougères avec son bec sans dents.",
        en: "To feed, this large dinosaur stayed close to the ground to graze on young plant shoots and small ferns with its toothless beak."
      }
    ],
    funFacts: [
      {
        fr: "Même s'il était grand comme un bus, son cerveau n'était pas plus gros qu'une noix !",
        en: "Even though it was as big as a bus, its brain was no bigger than a walnut!"
      },
      {
        fr: "Les pointes au bout de sa queue pouvaient mesurer jusqu'à un mètre de long !",
        en: "The spikes at the end of its tail could measure up to one meter long!"
      },
      {
        fr: "Ses plaques osseuses sur le dos pouvaient changer de couleur si le sang y circulait plus vite !",
        en: "Its bony back plates could change color if blood flowed faster through them!"
      }
    ],
    sections: [
      {
        icon: '🛡️',
        title: { fr: 'Des plaques sur le dos', en: 'Plates on its back' },
        content: {
          fr: "Le Stégosaure est célèbre pour ses grandes plaques triangulaires dressées tout le long de son dos.",
          en: "The Stegosaurus is famous for its large triangular plates standing tall along its back."
        }
      },
      {
        icon: '🌿',
        title: { fr: 'Mangeur de fougères', en: 'Fern eater' },
        content: {
          fr: "C'était un herbivore paisible qui broutait des feuilles tendres et des fougères au ras du sol.",
          en: "It was a peaceful herbivore grazing on tender leaves and low-lying ferns."
        }
      },
      {
        icon: '⚔️',
        title: { fr: 'Une queue à pointes', en: 'A spiked tail' },
        content: {
          fr: "Au bout de sa queue, quatre longues épines de pierre le protégeaient des attaques de prédateurs.",
          en: "At the tip of its tail, four long sharp spikes protected it against predator attacks."
        }
      },
      {
        icon: '🧠',
        title: { fr: 'Un tout petit cerveau', en: 'A tiny brain' },
        content: {
          fr: "Aussi lourd qu'un camion, son cerveau n'était pourtant pas plus gros qu'une petite noix !",
          en: "As heavy as a truck, its brain was surprisingly no bigger than a little walnut!"
        }
      }
    ],
    relatedTopicIds: ['triceratops', 't-rex']
  },
  {
    id: 'velociraptor',
    title: { fr: 'Le Vélociraptor', en: 'The Velociraptor' },
    icon: '🦎',
    shortDesc: { fr: 'Un petit chasseur ultra rapide.', en: 'A small ultra-fast hunter.' },
    fullContents: [
      {
        fr: "Le Vélociraptor était petit mais très intelligent et rapide. Il chassait souvent en groupe. Il avait une grande griffe courbée sur chaque pied pour attraper ses proies.",
        en: "The Velociraptor was small but very intelligent and fast. It often hunted in groups. It had a large curved claw on each foot to catch its prey."
      },
      {
        fr: "Le Vélociraptor mesurait environ la taille d'un gros dindon. Il était très agile et pouvait faire de grands bonds pour surprendre de petits dinosaures.",
        en: "The Velociraptor was about the size of a large turkey. It was very agile and could make big leaps to surprise small dinosaurs."
      },
      {
        fr: "Grâce à sa longue queue rigide qui lui servait de balancier, le Vélociraptor pouvait tourner très vite et garder l'équilibre en courant après ses proies.",
        en: "Thanks to its long, stiff tail acting as a counterbalance, the Velociraptor could turn very quickly and keep its balance while running after prey."
      }
    ],
    funFacts: [
      {
        fr: "Contrairement à ce qu'on voit dans les films, le vrai Vélociraptor avait probablement des plumes, comme un oiseau !",
        en: "Unlike what we see in movies, the real Velociraptor probably had feathers, like a bird!"
      },
      {
        fr: "Son nom signifie 'Voleur rapide' !",
        en: "Its name means 'Swift thief'!"
      },
      {
        fr: "Il pouvait courir jusqu'à 40 kilomètres par heure, presque aussi vite qu'un chat !",
        en: "It could run up to 40 kilometers per hour, almost as fast as a cat!"
      }
    ],
    sections: [
      {
        icon: '🦎',
        title: { fr: 'Un coureur à plumes', en: 'A feathered runner' },
        content: {
          fr: "Le Vélociraptor était un petit dinosaure vif et léger, couvert de douces plumes comme un oiseau.",
          en: "The Velociraptor was a lively, lightweight dinosaur covered in soft feathers like a bird."
        }
      },
      {
        icon: '⚡',
        title: { fr: 'Rapide comme l’éclair', en: 'Fast as lightning' },
        content: {
          fr: "Il sprintait sur ses deux pattes fines et utilisait sa queue droite pour tourner sans perdre l'équilibre.",
          en: "It sprinted on its two slender legs and used its straight tail to turn without losing balance."
        }
      },
      {
        icon: '🐾',
        title: { fr: 'Une griffe recourbée', en: 'A curved claw' },
        content: {
          fr: "Sur chaque pied, il avait une grande griffe en crochet qu'il levait en courant pour ne pas l'abîmer.",
          en: "On each foot, it had a large curved claw that it lifted while running to protect it."
        }
      },
      {
        icon: '👥',
        title: { fr: 'Chasser en équipe', en: 'Hunting as a team' },
        content: {
          fr: "Très malins, ils chassaient en meute solidaire pour surprendre des dinosaures plus grands qu'eux.",
          en: "Very clever, they hunted in tight packs to take on dinosaurs much larger than themselves."
        }
      }
    ],
    relatedTopicIds: ['t-rex', 'stegosaure']
  },
  {
    id: 'pterodactyle',
    title: { fr: 'Le Ptérodactyle', en: 'The Pterodactyl' },
    icon: 'BAT',
    shortDesc: { fr: 'Le roi des cieux préhistoriques.', en: 'The king of the prehistoric skies.' },
    fullContents: [
      {
        fr: "Le Ptérodactyle n'est pas techniquement un dinosaure, mais un reptile volant. Il avait de grandes ailes de peau, comme les chauves-souris, et vivait près des falaises pour plonger et attraper des poissons.",
        en: "The Pterodactyl isn't technically a dinosaur, but a flying reptile. It had large skin wings, like bats, and lived near cliffs to dive and catch fish."
      },
      {
        fr: "Le Ptérodactyle avait un bec long et pointu muni de petites dents pour retenir les poissons glissants. Il planait sur de longues distances grâce aux courants d'air chaud.",
        en: "The Pterodactyl had a long, pointed beak with tiny teeth to hold slippery fish. It soared over long distances using warm air currents."
      },
      {
        fr: "Ces reptiles volants nichaient en haut des falaises rocheuses pour être à l'abri des grands dinosaures carnivores et pouvoir s'élancer facilement dans les airs.",
        en: "These flying reptiles nested high on rocky cliffs to stay safe from large carnivorous dinosaurs and to easily take off into the air."
      }
    ],
    funFacts: [
      {
        fr: "Certains reptiles volants de cette famille étaient aussi grands que des avions de tourisme !",
        en: "Some flying reptiles from this family were as big as light aircraft!"
      },
      {
        fr: "Le quatrième doigt de sa main était géant et servait à tenir toute la membrane de son aile !",
        en: "The fourth finger of its hand was giant and served to support the entire membrane of its wing!"
      },
      {
        fr: "Le nom Ptérodactyle signifie 'Doigt ailé' !",
        en: "The name Pterodactyl means 'Winged finger'!"
      }
    ],
    sections: [
      {
        icon: '🦇',
        title: { fr: 'Un reptile volant fascinant', en: 'A fascinating flying reptile' },
        content: {
          fr: "Le Ptérodactyle vivait au temps des dinosaures, mais ce n'était pas un dinosaure : c'était un ptérosaure, un reptile capable de voler dans le ciel.",
          en: "The Pterodactyl lived during the age of dinosaurs, but it was not a dinosaur: it was a pterosaur, a flying reptile soaring across ancient skies."
        }
      },
      {
        icon: '🪁',
        title: { fr: 'Des ailes de peau tendue', en: 'Stretched skin wings' },
        content: {
          fr: "Ses ailes n'avaient pas de plumes. Une fine membrane de peau souple s'étirait le long de son corps jusqu'au bout d'un quatrième doigt immense.",
          en: "Its wings had no feathers. A thin membrane of elastic skin stretched along its body all the way to the tip of an extra-long fourth finger."
        }
      },
      {
        icon: '🐟',
        title: { fr: 'Pêcher au ras des vagues', en: 'Fishing above the waves' },
        content: {
          fr: "Il survolait les côtes rocheuses et les lagunes pour repérer des poissons. Son long bec garni de dents fines lui permettait d'attraper ses proies glissantes.",
          en: "It glided over rocky shores and lagoons spotting fish. Its long beak lined with slender teeth helped it snatch slippery prey right from the water."
        }
      },
      {
        icon: '🪶',
        title: { fr: 'Léger pour mieux planer', en: 'Light bones for soaring' },
        content: {
          fr: "Pour décoller facilement, ses os étaient très légers et remplis d'air. Il profitait des courants chauds pour planer longtemps sans trop se fatiguer.",
          en: "To take off easily, its hollow bones were light and filled with air. It used warm thermal winds to glide effortlessly for hours over long distances."
        }
      }
    ],
    relatedTopicIds: ['t-rex', 'brachiosaure']
  },
  {
    id: 'brachiosaure',
    title: { fr: 'Le Brachiosaure', en: 'The Brachiosaurus' },
    icon: '🦒',
    shortDesc: { fr: 'Un géant au cou de girafe.', en: 'A giant with a giraffe neck.' },
    fullContents: [
      {
        fr: "Le Brachiosaure était si haut qu'il pouvait regarder par la fenêtre d'un immeuble de 4 étages ! Ses pattes avant étaient plus longues que ses pattes arrière, ce qui lui permettait de lever la tête très haut.",
        en: "The Brachiosaurus was so tall it could look through the window of a 4-story building! Its front legs were longer than its back legs, which allowed it to lift its head very high."
      },
      {
        fr: "Ce dinosaure géant au cou immense passait ses journées à brouter les cimes des arbres, là où aucun autre herbivore ne pouvait atteindre la nourriture.",
        en: "This giant dinosaur with an immense neck spent its days grazing tree tops, where no other herbivore could reach food."
      },
      {
        fr: "Pour digérer les tonnes de plantes qu'il avalait chaque jour, le Brachiosaure avait un estomac gigantesque. Il avalait aussi des pierres pour aider à broyer les feuilles dans son ventre !",
        en: "To digest the tons of plants it swallowed each day, the Brachiosaurus had a giant stomach. It also swallowed stones to help grind leaves in its belly!"
      }
    ],
    funFacts: [
      {
        fr: "Un Brachiosaure mangeait tellement de plantes qu'il passait presque toute sa journée à mâcher !",
        en: "A Brachiosaurus ate so many plants that it spent almost all day chewing!"
      },
      {
        fr: "Il pesait autant que 12 éléphants d'Afrique réunis !",
        en: "It weighed as much as 12 African elephants combined!"
      },
      {
        fr: "Ses narines étaient situées tout en haut de sa tête, juste entre ses yeux !",
        en: "Its nostrils were located at the very top of its head, right between its eyes!"
      }
    ],
    sections: [
      {
        icon: '🦕',
        title: { fr: 'Un géant parmi les sauropodes', en: 'A sauropod giant' },
        content: {
          fr: "Le Brachiosaure était un immense dinosaure à quatre pattes qui marchait sur la terre ferme à l'époque du Jurassique.",
          en: "The Brachiosaurus was an enormous four-legged dinosaur that walked firmly on land during the Jurassic period."
        }
      },
      {
        icon: '🦒',
        title: { fr: 'Une silhouette unique', en: 'A unique silhouette' },
        content: {
          fr: "Contrairement à d'autres sauropodes, ses pattes avant étaient plus longues que ses pattes arrière, donnant à son dos une allure inclinée vers le haut.",
          en: "Unlike other sauropods, its front legs were longer than its hind legs, giving its back a naturally upward-sloping posture."
        }
      },
      {
        icon: '🍃',
        title: { fr: 'Mangeur de feuillages hauts', en: 'High treetop browser' },
        content: {
          fr: "Grâce à son grand cou dressé, cet herbivore pouvait cueillir sans effort les feuilles tendres tout en haut des arbres préhistoriques.",
          en: "Thanks to its raised neck, this herbivore could easily clip tender leaves high up in prehistoric trees."
        }
      },
      {
        icon: '🌱',
        title: { fr: 'Des tonnes de végétaux', en: 'Tons of plants' },
        content: {
          fr: "Pour nourrir sa masse colossale, il avalait chaque jour des centaines de kilos de plantes qu'il broyait et digérait lentement.",
          en: "To fuel its colossal mass, it swallowed hundreds of kilograms of plants every day, digesting them slowly."
        }
      }
    ],
    relatedTopicIds: ['t-rex', 'arbres']
  },
  {
    id: 'ankylosaure',
    title: { fr: "L'Ankylosaure", en: 'The Ankylosaurus' },
    icon: '🔨',
    shortDesc: { fr: 'Le dinosaure cuirassé avec une massue.', en: 'The armored dinosaur with a club.' },
    fullContents: [
      {
        fr: "L'Ankylosaure était comme un char d'assaut vivant. Son corps était couvert de plaques solides et il avait une énorme boule d'os au bout de sa queue pour frapper les méchants dinosaures.",
        en: "The Ankylosaurus was like a living tank. Its body was covered in solid plates and it had a huge bone ball at the end of its tail to hit bad dinosaurs."
      },
      {
        fr: "Ce dinosaure cuirassé se déplaçait lentement près du sol pour manger de petite plantes. Si un T-Rex l'attaquait, l'Ankylosaure se couchait par terre pour protéger son ventre mou.",
        en: "This armored dinosaur moved slowly close to the ground to eat small plants. If a T-Rex attacked it, the Ankylosaurus would lie down on the ground to protect its soft belly."
      },
      {
        fr: "La carapace osseuse de l'Ankylosaure était si solide qu'elle pouvait résister aux morsures les plus puissantes. C'était une véritable armure de chevalier préhistorique !",
        en: "The Ankylosaurus's bony shell was so strong that it could withstand the most powerful bites. It was a true prehistoric knight's armor!"
      }
    ],
    funFacts: [
      {
        fr: "Même ses paupières étaient faites d'os pour protéger ses yeux !",
        en: "Even its eyelids were made of bone to protect its eyes!"
      },
      {
        fr: "La massue au bout de sa queue pouvait peser plus de 30 kilos, assez pour casser les jambes d'un prédateur !",
        en: "The club at the end of its tail could weigh more than 30 kilos, enough to break a predator's legs!"
      },
      {
        fr: "Le nom Ankylosaure signifie 'Lézard rigide' !",
        en: "The name Ankylosaurus means 'Stiff lizard'!"
      }
    ],
    sections: [
      {
        icon: '🛡️',
        title: { fr: "Une armure d'os", en: 'A bony armor' },
        content: {
          fr: "Son dos et sa tête portaient des plaques osseuses très solides pour le recouvrir comme un bouclier.",
          en: "Its back and head carried very hard bony plates covering it like a shield."
        }
      },
      {
        icon: '🔨',
        title: { fr: 'Une queue à massue', en: 'A heavy tail club' },
        content: {
          fr: "Au bout de sa queue se trouvait une grosse boule d'os lourd. Les scientifiques étudient encore comment il l'utilisait.",
          en: "At the end of its tail was a heavy ball of bone. Scientists are still studying how it was used."
        }
      },
      {
        icon: '🌿',
        title: { fr: 'Un mangeur de plantes', en: 'A plant eater' },
        content: {
          fr: "L'ankylosaure avançait près de la terre pour cueillir calmement des fougères et des feuilles tendres.",
          en: "The ankylosaurus walked close to the ground to peacefully graze on ferns and tender leaves."
        }
      },
      {
        icon: '🦕',
        title: { fr: 'Un géant paisible', en: 'A peaceful giant' },
        content: {
          fr: "Ce grand herbivore vivait à la même époque que d'autres dinosaures célèbres comme le Tricératops.",
          en: "This large herbivore lived during the same period as other famous dinosaurs like Triceratops."
        }
      }
    ],
    relatedTopicIds: ['t-rex', 'triceratops', 'stegosaure']
  },
  {
    id: 'diplodocus',
    title: { fr: 'Le Diplodocus', en: 'The Diplodocus' },
    icon: '🦕',
    shortDesc: { fr: 'Un géant au cou et à la queue immenses.', en: 'A giant with an immense neck and tail.' },
    fullContents: [
      {
        fr: "Le Diplodocus était l'un des plus longs animaux à avoir jamais marché sur Terre. Il utilisait son long cou pour atteindre les feuilles des arbres très hauts, et sa queue comme un fouet pour se défendre.",
        en: "The Diplodocus was one of the longest animals to ever walk the Earth. It used its long neck to reach leaves from very high trees, and its tail as a whip to defend itself."
      },
      {
        fr: "Le Diplodocus avait des dents très fines en forme de piquets, parfaites pour ratisser les feuilles des branches mais pas pour mâcher. Il avalait donc les feuilles entières !",
        en: "The Diplodocus had very thin peg-like teeth, perfect for raking leaves from branches but not for chewing. It swallowed leaves whole!"
      },
      {
        fr: "Malgré sa longueur incroyable, le Diplodocus était assez léger par rapport à sa taille car ses os contenaient des cavités d'air, comme ceux des oiseaux.",
        en: "Despite its incredible length, the Diplodocus was relatively light for its size because its bones contained air cavities, like those of birds."
      }
    ],
    funFacts: [
      {
        fr: "Il pouvait mesurer la longueur de deux grands bus mis bout à bout !",
        en: "It could be as long as two large buses put end to end!"
      },
      {
        fr: "Sa queue comptait plus de 80 os et pouvait claquer dans l'air comme un vrai fouet pour faire du bruit !",
        en: "Its tail had over 80 bones and could crack in the air like a real whip to make noise!"
      },
      {
        fr: "Le nom Diplodocus signifie 'Double poutre' à cause de la forme de ses os sous la queue !",
        en: "The name Diplodocus means 'Double beam' because of the shape of its bones under the tail!"
      }
    ],
    sections: [
      {
        icon: '🦕',
        title: { fr: "Un géant tout en longueur", en: "A long gentle giant" },
        content: {
          fr: "Le Diplodocus est un sauropode célèbre de la période du Jurassique. Avec son corps immense posé sur quatre pattes solides, il pouvait mesurer près de trente mètres de long !",
          en: "Diplodocus is a famous Jurassic sauropod. With its enormous body supported by four sturdy legs, it could stretch almost thirty meters from head to tail!"
        }
      },
      {
        icon: '🌿',
        title: { fr: "Un grand cou pour brouter", en: "A long browsing neck" },
        content: {
          fr: "Grâce à son long cou horizontal, il balayait de vastes zones de fougères et de buissons sans se déplacer. Ses dents en forme de peignes effeuillaient les branches tendres.",
          en: "Using its long horizontal neck, it swept through wide patches of ferns and shrubs without moving its body. Its peg-like teeth easily stripped leaves from branches."
        }
      },
      {
        icon: '🦴',
        title: { fr: "Un squelette allégé", en: "A lightweight skeleton" },
        content: {
          fr: "Pour porter une telle longueur sans être écrasé par son propre poids, ses vertèbres comportaient des cavités creuses remplies d'air, un peu comme chez les oiseaux actuels.",
          en: "To carry such immense length without collapsing under its own weight, its backbones featured hollow air pockets, much like the skeleton of modern birds."
        }
      },
      {
        icon: '⚡',
        title: { fr: "L'énigme de la queue effilée", en: "The long whip tail puzzle" },
        content: {
          fr: "Sa queue très fine comptait plus de quatre-vingts os. Elle servait d'abord de contrepoids pour marcher, et certains chercheurs pensent qu'elle pouvait aussi claquer pour impressionner.",
          en: "Its slender tail contained over eighty bones. It served mainly as a counterweight while walking, and scientists think it might also have whipped the air to warn rival predators."
        }
      }
    ],
    relatedTopicIds: ['brachiosaure', 't-rex']
  },
  {
    id: 'spinosaure',
    title: { fr: 'Le Spinosaure', en: 'The Spinosaurus' },
    icon: '🐊',
    shortDesc: { fr: 'Le plus grand prédateur avec une voile.', en: 'The largest predator with a sail.' },
    fullContents: [
      {
        fr: "Le Spinosaure était encore plus grand que le T-Rex ! Il avait une immense voile sur le dos faite de peau et d'os. Il vivait souvent dans l'eau et utilisait son museau de crocodile pour attraper des poissons géants.",
        en: "The Spinosaurus was even bigger than the T-Rex! It had a huge sail on its back made of skin and bone. It often lived in the water and used its crocodile snout to catch giant fish."
      },
      {
        fr: "Le Spinosaure avait des bras avant très puissants et terminés par de grandes griffes acérées. Cela l'aidait à harponner les très gros poissons des rivières préhistoriques.",
        en: "The Spinosaurus had very powerful front arms ending in large sharp claws. This helped it harpoon very large fish in prehistoric rivers."
      },
      {
        fr: "Avec ses dents coniques et son museau allongé doté de capteurs sensoriels, le Spinosaure était parfaitement adapté à la chasse sous-marine et au bord de l'eau.",
        en: "With its conical teeth and elongated snout equipped with sensory receptors, the Spinosaurus was perfectly adapted to underwater and shoreline hunting."
      }
    ],
    funFacts: [
      {
        fr: "C'est l'un des rares dinosaures qui savait très bien nager !",
        en: "It's one of the few dinosaurs that knew how to swim very well!"
      },
      {
        fr: "La voile osseuse sur son dos pouvait mesurer jusqu'à 1,6 mètre de hauteur !",
        en: "The bony sail on its back could measure up to 1.6 meters high!"
      },
      {
        fr: "Ses dents étaient lisses et pointues, faites pour glisser sur les poissons plutôt que pour broyer les os !",
        en: "Its teeth were smooth and sharp, designed to slide on fish rather than crush bones!"
      }
    ],
    sections: [
      {
        icon: '🌊',
        title: { fr: 'Entre terre et eau', en: 'Between land and water' },
        content: {
          fr: "Ce géant passait beaucoup de temps au bord des fleuves et chassait dans les cours d'eau préhistoriques.",
          en: "This giant spent much of its time along riverbanks and hunted in prehistoric waterways."
        }
      },
      {
        icon: '🐟',
        title: { fr: 'Un pêcheur redoutable', en: 'A skilled fisher' },
        content: {
          fr: "Son long museau droit et ses dents pointues ressemblaient à ceux d'un crocodile pour attraper les poissons.",
          en: "Its long straight snout and sharp teeth resembled a crocodile's to snap up slippery fish."
        }
      },
      {
        icon: '⛵',
        title: { fr: 'Une voile mystérieuse', en: 'A mysterious sail' },
        content: {
          fr: "Sur son dos se dressait une immense voile d'épines. Les scientifiques débattent encore de son rôle exact.",
          en: "Across its back rose a giant sail of spines. Scientists still discuss its exact purpose."
        }
      },
      {
        icon: '🦖',
        title: { fr: 'Une nage étudiée de près', en: 'Swimming studied closely' },
        content: {
          fr: "Grâce à sa queue aplatie, il pouvait pagayer, et les chercheurs cherchent encore comment il se déplaçait précisément.",
          en: "With its flattened tail, it could paddle, and researchers are still uncovering exactly how it moved."
        }
      }
    ],
    relatedTopicIds: ['t-rex', 'brachiosaure']
  },
  {
    id: 'parasaurolophus',
    title: { fr: 'Le Parasaurolophus', en: 'The Parasaurolophus' },
    icon: '🎺',
    shortDesc: { fr: 'Le dinosaure musicien.', en: 'The musical dinosaur.' },
    fullContents: [
      {
        fr: "Ce dinosaure avait une longue crête creuse sur la tête. En soufflant de l'air dedans, il pouvait faire des bruits très forts, comme une trompette, pour appeler ses amis ou faire peur aux ennemis.",
        en: "This dinosaur had a long hollow crest on its head. By blowing air into it, it could make very loud noises, like a trumpet, to call its friends or scare enemies."
      },
      {
        fr: "Le Parasaurolophus était un herbivore pacifique. Il marchait le plus souvent à quatre pattes pour brouter l'herbe, mais pouvait se dresser sur ses pattes arrière pour courir plus vite.",
        en: "The Parasaurolophus was a peaceful herbivore. It mostly walked on four legs to graze on grass, but could stand on its hind legs to run faster."
      },
      {
        fr: "La crête du Parasaurolophus était reliée directement à ses narines. C'était un instrument de musique naturel unique qui lui permettait de communiquer à travers toute la forêt.",
        en: "The Parasaurolophus's crest was connected directly to its nostrils. It was a unique natural musical instrument that allowed it to communicate across the entire forest."
      }
    ],
    funFacts: [
      {
        fr: "Sa crête pouvait mesurer presque 2 mètres de long !",
        en: "Its crest could be almost 2 meters long!"
      },
      {
        fr: "Les scientifiques pensent que sa crête servait aussi à se faire remarquer par les autres dinosaures !",
        en: "Scientists think its crest was also used to show off to other dinosaurs!"
      },
      {
        fr: "Il possédait des centaines de petites dents serrées pour broyer les aiguilles de pins et les plantes dures !",
        en: "It had hundreds of small tight teeth to grind pine needles and tough plants!"
      }
    ],
    sections: [
      {
        icon: '🎺',
        title: { fr: 'Une crête remarquable', en: 'A remarkable crest' },
        content: {
          fr: "Le Parasaurolophus portait un long tube osseux courbé vers l'arrière de sa tête. Cette silhouette originale le rendait facile à reconnaître parmi les grands troupeaux.",
          en: 'Parasaurolophus carried a long curved bony tube reaching backward from its head. This striking outline made it easy to spot among large herds.'
        }
      },
      {
        icon: '💨',
        title: { fr: "Des conduits d'air internes", en: 'Air pathways inside' },
        content: {
          fr: "Sa crête abritait de longs tubes reliés à ses narines. Beaucoup de chercheurs pensent que l'air soufflé dedans pouvait créer de profonds sons de résonance.",
          en: 'Its crest sheltered long hollow tubes connected to its nostrils. Many researchers believe air moving inside could produce low, booming sounds.'
        }
      },
      {
        icon: '🌿',
        title: { fr: 'Un paisible herbivore', en: 'A peaceful plant-eater' },
        content: {
          fr: "Ce dinosaure se nourrissait de feuilles, de fougères et de pousses dures. Ses mâchoires contenaient de nombreuses petites dents serrées pour broyer les végétaux.",
          en: 'This dinosaur fed on leaves, ferns, and tough twigs. Its jaws were lined with many tight rows of teeth to grind rough plant food.'
        }
      },
      {
        icon: '👀',
        title: { fr: 'Se faire remarquer', en: 'Standing out in the herd' },
        content: {
          fr: "La crête servait sans doute aussi de signal visuel entre congénères. Comme les fossiles restent silencieux, les paléontologues comparent encore plusieurs hypothèses.",
          en: 'The crest likely served as a visual sign to companions. Since fossils cannot speak, paleontologists still compare several explanations.'
        }
      }
    ],
    relatedTopicIds: ['triceratops', 'diplodocus', 't-rex'],
  },
  {
    id: 'iguanodon',
    title: { fr: "L'Iguanodon", en: 'The Iguanodon' },
    icon: '👍',
    shortDesc: { fr: 'Le dinosaure avec un pouce pointu.', en: 'The dinosaur with a sharp thumb.' },
    fullContents: [
      {
        fr: "L'Iguanodon était un herbivore qui pouvait marcher sur deux ou quatre pattes. Sa particularité était son pouce : c'était une sorte de gros éperon pointu qu'il utilisait pour se défendre contre les prédateurs.",
        en: "The Iguanodon was an herbivore that could walk on two or four legs. Its special feature was its thumb: it was a kind of large sharp spur that it used to defend itself against predators."
      },
      {
        fr: "L'Iguanodon avait des dents ressemblant à celles des iguanes d'aujourd'hui, mais en beaucoup plus grand. Il avait aussi une langue agile pour trier les meilleures pousses de plantes.",
        en: "The Iguanodon had teeth resembling those of modern iguanas, but much larger. It also had an agile tongue to sort out the best plant shoots."
      },
      {
        fr: "Ce dinosaure très répandu vivait en grands groupes familiaux. Ses doigts du milieu avaient des sabots plats, ce qui l'aidait à soutenir son poids sur le sol.",
        en: "This very common dinosaur lived in large family groups. Its middle fingers had flat hooves, which helped support its weight on the ground."
      }
    ],
    funFacts: [
      {
        fr: "C'est l'un des tout premiers dinosaures à avoir été découvert par les scientifiques !",
        en: "It's one of the very first dinosaurs to be discovered by scientists!"
      },
      {
        fr: "Lorsqu'on a trouvé son premier pouce fossilisé, on a d'abord cru qu'il s'agissait d'une corne à placer sur son nez !",
        en: "When its first fossilized thumb was found, scientists first thought it was a horn to be placed on its nose!"
      },
      {
        fr: "Il possédait un bec corné à l'avant de sa bouche pour couper proprement les branches !",
        en: "It had a horny beak at the front of its mouth to cleanly cut branches!"
      }
    ],
    sections: [
      {
        icon: '👍',
        title: { fr: 'Le pouce en éperon', en: 'The thumb spike' },
        content: {
          fr: "L'Iguanodon avait un pouce pointu comme une épine. Les chercheurs ont d'abord cru que c'était une corne sur son nez avant de lui trouver sa vraie place !",
          en: 'Iguanodon had a sharp spike for a thumb. Scientists first thought it was a horn on its nose before realizing it belonged on its hand!'
        }
      },
      {
        icon: '🌿',
        title: { fr: 'Un bec pour couper', en: 'A beak to cut leaves' },
        content: {
          fr: "Ce paisible herbivore utilisait son bec dur pour trancher les branches et ses dents solides pour broyer les fougères et aiguilles de pin.",
          en: 'This peaceful plant-eater used its hard beak to snip twigs and sturdy teeth to chew through rough ferns and pine needles.'
        }
      },
      {
        icon: '🐾',
        title: { fr: 'Deux ou quatre pattes', en: 'Two or four legs' },
        content: {
          fr: "Il pouvait marcher à quatre pattes pour brouter au sol, ou se lever sur ses deux pattes arrière pour courir ou attraper des feuilles en hauteur.",
          en: 'It could stroll on four legs to graze on the ground, or rise onto two hind legs to run or reach tasty leaves up high.'
        }
      },
      {
        icon: '🦕',
        title: { fr: 'Une découverte historique', en: 'A historic discovery' },
        content: {
          fr: "C'est l'un des tout premiers dinosaures décrits par les scientifiques il y a deux siècles, ouvrant la grande aventure de la paléontologie.",
          en: 'It is one of the very first dinosaurs described by scientists two centuries ago, sparking the great adventure of paleontology.'
        }
      }
    ],
    relatedTopicIds: ['parasaurolophus', 'triceratops', 'diplodocus'],
  },
  {
    id: 'mosasaure',
    title: { fr: 'Le Mosasaure', en: 'The Mosasaurus' },
    icon: '🦈',
    shortDesc: { fr: 'Le redoutable chasseur des océans.', en: 'The fearsome hunter of the oceans.' },
    fullContents: [
      {
        fr: "Comme le Ptérodactyle, le Mosasaure était un reptile, mais marin ! Il vivait dans les océans et était le roi des mers. Avec sa mâchoire puissante et ses dents acérées, il pouvait manger de gros poissons et même d'autres reptiles marins.",
        en: "Like the Pterodactyl, the Mosasaurus was a reptile, but a marine one! It lived in the oceans and was the king of the seas. With its powerful jaw and sharp teeth, it could eat large fish and even other marine reptiles."
      },
      {
        fr: "Le Mosasaure avait un corps fuselé comme celui d'un lézard géant adapté à l'eau, avec quatre nageoires robustes pour se diriger et une longue queue plate pour se propulser.",
        en: "The Mosasaurus had a streamlined body like a giant lizard adapted to water, with four sturdy fins for steering and a long flat tail for propulsion."
      },
      {
        fr: "Ce grand prédateur des océans respirait de l'air à la surface, comme les baleines d'aujourd'hui. Il était extrêmement redoutable et chassait dans les mers chaudes et peu profondes.",
        en: "This large ocean predator breathed air at the surface, like modern whales. It was extremely fearsome and hunted in warm, shallow seas."
      }
    ],
    funFacts: [
      {
        fr: "Il n'avait pas de pattes mais des nageoires et une queue comme celle d'un requin !",
        en: "It had no legs but fins and a tail like a shark's!"
      },
      {
        fr: "Certains Mosasaures pouvaient mesurer jusqu'à 17 mètres de long, soit plus qu'un grand bus de ville !",
        en: "Some Mosasaurs could measure up to 17 meters long, more than a large city bus!"
      },
      {
        fr: "Il avait une double rangée de dents sur son palais pour empêcher ses proies de s'échapper de sa bouche !",
        en: "It had a double row of teeth on its palate to prevent prey from escaping its mouth!"
      }
    ],
    sections: [
      {
        icon: '🌊',
        title: { fr: 'Le maître des mers chaudes', en: 'Master of the warm seas' },
        content: {
          fr: "Au temps des dinosaures, le mosasaure régnait en maître dans les eaux chaudes et peu profondes du globe.",
          en: 'In the age of dinosaurs, the mosasaur ruled supreme over warm, shallow seas around the globe.'
        }
      },
      {
        icon: '🦎',
        title: { fr: 'Un reptile géant à nageoires', en: 'A giant reptile with fins' },
        content: {
          fr: "Ce n'était pas un poisson ni un dinosaure, mais un formidable reptile marin cousin des varans et des serpents actuels.",
          en: 'It was neither a fish nor a dinosaur, but a formidable marine reptile related to modern monitor lizards and snakes.'
        }
      },
      {
        icon: '🦈',
        title: { fr: 'Une queue de grand nageur', en: 'A powerful swimming tail' },
        content: {
          fr: "Sa longue queue puissante et ses quatre nageoires en forme de palettes lui permettaient de nager très vite à l'affût.",
          en: 'Its long powerful tail and four paddle-like fins let it swim at high speed while hunting.'
        }
      },
      {
        icon: '🦷',
        title: { fr: 'Une mâchoire redoutable', en: 'A fearsome double jaw' },
        content: {
          fr: "Avec ses dents pointues et une deuxième rangée au palais, il attrapait facilement les poissons, calmars et ammonites.",
          en: 'With sharp teeth and a second row on its palate, it easily caught fish, squids, and ammonites.'
        }
      }
    ],
    relatedTopicIds: ['t-rex', 'spinosaure', 'sortie-des-eaux'],
  }
];

export const dinosaurs: readonly Topic[] = rawDinosaurs.map((item) => ({
  ...item,
  category: CATEGORY,
  categoryKey: CATEGORY_KEY,
  fullContent: item.fullContents[0],
  funFact: item.funFacts[0],
}));
