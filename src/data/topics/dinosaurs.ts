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
    ]
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
    ]
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
    ]
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
    ]
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
    ]
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
    ]
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
    ]
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
    ]
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
    ]
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
    ]
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
    ]
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
    ]
  }
];

export const dinosaurs: readonly Topic[] = rawDinosaurs.map((item) => ({
  ...item,
  category: CATEGORY,
  categoryKey: CATEGORY_KEY,
  fullContent: item.fullContents[0],
  funFact: item.funFacts[0],
}));
