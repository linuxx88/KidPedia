import type { RawTopic, Topic } from './types';

const CATEGORY = { fr: 'Espace 🚀', en: 'Space 🚀' } as const;
const CATEGORY_KEY = 'espace' as const;

const rawSpace: readonly RawTopic[] = [
  {
    id: 'soleil',
    title: { fr: 'Le Soleil', en: 'The Sun' },
    icon: '☀️',
    shortDesc: {
      fr: "L'étoile au centre de notre système.",
      en: 'The star at the center of our system.',
    },
    fullContents: [
      {
        fr: "Le Soleil est le cœur de notre système solaire. Grâce à sa gravité, toutes les planètes restent bien sagement sur leur orbite sans s'échapper.",
        en: "The Sun is the heart of our solar system. Thanks to its gravity, all the planets stay nicely on their orbit without escaping."
      },
      {
        fr: "Le Soleil est une gigantesque boule de gaz brûlant. C'est l'étoile la plus proche de la Terre, et elle brille si fort qu'elle éclaire toute notre journée !",
        en: "The Sun is a giant ball of burning gas. It is the closest star to Earth, and it shines so brightly that it lights up our entire day!"
      },
      {
        fr: 'Le Soleil est une étoile géante. Toutes les planètes tournent autour de lui. Il nous donne de la lumière et de la chaleur.',
        en: 'The Sun is a giant star. All the planets orbit around it. It gives us light and heat.',
      },
      {
        fr: "Le Soleil est une étoile géante et très chaude qui brille tout en haut dans l'Espace pour nous éclairer. De même qu'il partage sa douce chaleur avec toute la Terre sans rien demander, tu peux toi aussi réchauffer le cœur des autres avec ton plus beau sourire.",
        en: "The Sun is a giant, hot star shining bright in space to give us light. Just like the Sun shares its warm light with everyone, you can also warm people's hearts with your kindest smile."
      }
    ],
    funFacts: [
      {
        fr: "Le Soleil est si grand qu'il représente 99% de tout le système solaire !",
        en: "The Sun is so big that it makes up 99% of the entire solar system!"
      },
      {
        fr: "On pourrait mettre 1 million de Terres à l'intérieur du Soleil !",
        en: 'You could fit 1 million Earths inside the Sun!',
      },
      {
        fr: "La lumière du Soleil met 8 minutes pour arriver jusqu'à nous sur Terre.",
        en: "Sunlight takes 8 minutes to reach us on Earth."
      },
      {
        fr: "Le Soleil est si chaud que sa température de surface est d'environ 5 500 degrés Celsius !",
        en: "The Sun is so hot that its surface temperature is around 5,500 degrees Celsius!"
      }
    ],
    sections: [
      {
        icon: '☀️',
        title: { fr: "Qu'est-ce que le Soleil ?", en: 'What is the Sun?' },
        content: {
          fr: "Le Soleil est une étoile, comme celles qui brillent la nuit, mais beaucoup plus proche de nous. C'est une immense boule de feu et de gaz très lumineuse.",
          en: 'The Sun is a star, just like those shining at night, but much closer to us. It is a huge, glowing ball of fire and gas.'
        }
      },
      {
        icon: '🔥',
        title: { fr: 'Lumière et chaleur', en: 'Light and heat' },
        content: {
          fr: 'Le Soleil éclaire nos journées et réchauffe toute la Terre. Sa chaleur et sa douce lumière permettent aux plantes de pousser et à la vie d’exister !',
          en: 'The Sun lights up our days and warms the whole Earth. Its heat and gentle light allow plants to grow and life to exist!'
        }
      },
      {
        icon: '🪐',
        title: { fr: 'Au cœur du système solaire', en: 'At the heart of the solar system' },
        content: {
          fr: 'Le Soleil est installé au centre de notre système solaire. Toutes les planètes, dont la Terre, tournent autour de lui comme sur un grand manège.',
          en: 'The Sun sits at the center of our solar system. All the planets, including Earth, orbit around it like on a giant carousel.'
        }
      },
      {
        icon: '✨',
        title: { fr: 'Une étoile géante', en: 'A giant star' },
        content: {
          fr: 'Le Soleil est si gigantesque qu’on pourrait y faire entrer plus d’un million de Terres ! Pourtant, dans l’espace infini, c’est une étoile de taille ordinaire.',
          en: 'The Sun is so gigantic you could fit over one million Earths inside it! Yet in deep space, it is just an average-sized star.'
        }
      }
    ],
    relatedTopicIds: ['terre', 'mercure']
  },
  {
    id: 'mercure',
    title: { fr: 'Mercure', en: 'Mercury' },
    icon: '🌑',
    shortDesc: {
      fr: 'La petite planète proche du Soleil.',
      en: 'The small planet near the Sun.',
    },
    fullContents: [
      {
        fr: "C'est la plus petite planète et la plus proche du Soleil. Il y fait très chaud le jour et très froid la nuit.",
        en: 'It is the smallest planet and the closest to the Sun. It is very hot during the day and very cold at night.',
      },
      {
        fr: "Mercure ressemble beaucoup à notre Lune avec ses nombreux cratères. Comme elle n'a pas d'atmosphère pour la protéger, elle subit des températures extrêmes !",
        en: "Mercury looks a lot like our Moon with its many craters. Since it has no atmosphere to protect it, it experiences extreme temperatures!"
      },
      {
        fr: "Cette petite planète fonce à toute allure dans l'espace. Elle fait le tour du Soleil si vite qu'une année là-bas ne dure que trois mois terrestres !",
        en: "This tiny planet speeds through space. It goes around the Sun so fast that a year there lasts only three Earth months!"
      }
    ],
    funFacts: [
      {
        fr: 'Une année sur Mercure dure seulement 88 jours !',
        en: 'A year on Mercury lasts only 88 days!',
      }
    ],
    sections: [
      {
        icon: '🌑',
        title: { fr: 'La petite planète', en: 'The little planet' },
        content: {
          fr: "Mercure est la plus petite planète de notre système solaire et la plus proche du Soleil.",
          en: "Mercury is the smallest planet in our solar system and the closest one to the Sun."
        }
      },
      {
        icon: '⚡',
        title: { fr: 'Une course rapide', en: 'A fast race' },
        content: {
          fr: "Elle fonce à toute vitesse et fait le tour complet du Soleil en seulement trois mois !",
          en: "It speeds through space and makes a full lap around the Sun in only three months!"
        }
      },
      {
        icon: '🌡️',
        title: { fr: 'Chaud et glacé', en: 'Hot and frozen' },
        content: {
          fr: "Sans air pour la protéger, elle brûle le jour face au Soleil et gèle dans la nuit noire.",
          en: "With no air to shield it, it bakes under the daytime Sun and freezes in the dark night."
        }
      },
      {
        icon: '🪨',
        title: { fr: 'Couverte de trous', en: 'Covered in craters' },
        content: {
          fr: "Son sol gris ressemble à la Lune, criblé de milliers de cratères creusés par des roches spatiales.",
          en: "Its grey ground looks like the Moon, covered in thousands of craters made by space rocks."
        }
      }
    ],
    relatedTopicIds: ['soleil', 'terre']
  },
  {
    id: 'venus',
    title: { fr: 'Vénus', en: 'Venus' },
    icon: '☁️',
    shortDesc: { fr: 'La planète la plus chaude de toutes.', en: 'The hottest planet of all.' },
    fullContents: [
      {
        fr: "Vénus est recouverte de gros nuages qui gardent la chaleur. C'est comme une serre géante !",
        en: "Venus is covered in thick clouds that trap heat. It's like a giant greenhouse!",
      },
      {
        fr: "Vénus brille si fort dans le ciel nocturne qu'on l'appelle souvent l'Étoile du Berger. C'est pourtant un monde infernal rempli de volcans !",
        en: "Venus shines so brightly in the night sky that it is often called the Shepherd's Star. Yet, it is a hellish world full of volcanoes!"
      },
      {
        fr: "Sur Vénus, l'air est tellement lourd et étouffant qu'il écraserait n'importe quel robot explorateur en quelques minutes seulement !",
        en: "On Venus, the air is so heavy and suffocating that it would crush any explorer robot in just a few minutes!"
      }
    ],
    funFacts: [
      {
        fr: "Sur Vénus, le Soleil se lève à l'ouest et se couche à l'est.",
        en: 'On Venus, the Sun rises in the west and sets in the east.',
      }
    ],
    sections: [
      {
        icon: '🪨',
        title: { fr: "Une planète rocheuse voisine", en: "A rocky neighbor planet" },
        content: {
          fr: "Vénus a presque la même taille que la Terre et fait partie des quatre planètes solides faites de roche, situées tout près de nous dans le système solaire.",
          en: "Venus is nearly the same size as Earth and is one of the four solid rocky planets located closest to us in the solar system."
        }
      },
      {
        icon: '☁️',
        title: { fr: "Un manteau de nuages épais", en: "A thick blanket of clouds" },
        content: {
          fr: "Contrairement à la Terre, Vénus est enveloppée d'une atmosphère très lourde de dioxyde de carbone et de nuages acides qui cachent entièrement son sol.",
          en: "Unlike Earth, Venus is shrouded in a very heavy carbon dioxide atmosphere and acidic clouds that completely conceal its surface."
        }
      },
      {
        icon: '🔥',
        title: { fr: "L'effet de serre géant", en: "A giant greenhouse effect" },
        content: {
          fr: "Ces nuages épais piègent la chaleur du Soleil comme dans un four géant. C'est ce puissant effet de serre qui rend Vénus encore plus brûlante que Mercure.",
          en: "These thick clouds trap solar heat just like a giant oven. This intense greenhouse effect makes Venus even hotter on the surface than Mercury."
        }
      },
      {
        icon: '🌋',
        title: { fr: "Un paysage de volcans", en: "A land of volcanoes" },
        content: {
          fr: "Sous cette brume impénétrable s'étendent de vastes plaines volcaniques et des coulées de lave refroidies. Les sondes spatiales y résistent très peu de temps.",
          en: "Beneath this impenetrable haze lie vast volcanic plains and hardened lava fields. Space probes can only survive there for a very short time."
        }
      }
    ],
    relatedTopicIds: ['terre', 'soleil']
  },
  {
    id: 'terre',
    title: { fr: 'La Terre', en: 'The Earth' },
    icon: '🌍',
    shortDesc: { fr: 'Notre maison, la planète bleue.', en: 'Our home, the blue planet.' },
    fullContents: [
      {
        fr: "Notre Terre est souvent appelée la planète bleue car elle est recouverte à plus de 70% par de grands océans d'eau liquide.",
        en: "Our Earth is often called the blue planet because more than 70% of it is covered by vast oceans of liquid water."
      },
      {
        fr: "La Terre possède un bouclier magnétique invisible qui la protège des rayons dangereux du Soleil, permettant aux plantes et aux animaux de grandir en toute sécurité.",
        en: "The Earth has an invisible magnetic shield that protects it from the Sun's dangerous rays, allowing plants and animals to grow safely."
      },
      {
        fr: "La Terre est la seule planète connue avec de la vie. Elle a de l'eau, de l'air et une température parfaite.",
        en: 'Earth is the only known planet with life. It has water, air, and a perfect temperature.',
      },
      {
        fr: "La Terre est notre magnifique maison, la seule planète connue dans l'univers qui abrite de la vie grâce à son eau et son air pur. Comme un grand jardin bienveillant qui nourrit et protège toutes les plantes et les animaux, la Terre prend soin de toi, et tu peux toi aussi en prendre soin par tes petits gestes chaque jour.",
        en: "The Earth is our beautiful home, the only known planet in the universe that supports life thanks to its water and fresh air. Like a grand, caring garden that feeds and protects all plants and animals, the Earth takes care of you, and you can also take care of it with your small actions every day."
      }
    ],
    funFacts: [
      {
        fr: "La Terre n'est pas parfaitement ronde, elle est un peu aplatie aux pôles !",
        en: "The Earth is not perfectly round, it is slightly flattened at the poles!"
      },
      {
        fr: 'La Terre tourne à 1600 km/h, mais on ne sent rien !',
        en: 'The Earth spins at 1600 km/h, but we feel nothing!',
      },
      {
        fr: "C'est la seule planète connue à avoir de l'eau liquide à sa surface.",
        en: "It is the only known planet to have liquid water on its surface."
      },
      {
        fr: "La Terre s'est formée il y a environ 4,5 milliards d'années !",
        en: "The Earth formed about 4.5 billion years ago!"
      }
    ],
    sections: [
      {
        icon: '🌍',
        title: { fr: 'La planète bleue', en: 'The blue planet' },
        content: {
          fr: "La Terre est notre maison. On l'appelle la planète bleue parce qu'elle est recouverte de gigantesques océans.",
          en: "Earth is our home. It is called the blue planet because it is covered in giant oceans."
        }
      },
      {
        icon: '🌱',
        title: { fr: 'Le berceau de la vie', en: 'The cradle of life' },
        content: {
          fr: "C'est la seule planète où l'on trouve de l'eau liquide, de l'air à respirer et des millions d'êtres vivants.",
          en: "It is the only planet with liquid water, fresh air to breathe, and millions of living beings."
        }
      },
      {
        icon: '🔄',
        title: { fr: 'Elle tourne sans arrêt', en: 'Spinning all the time' },
        content: {
          fr: "La Terre tourne sur elle-même pour créer le jour et la nuit, et fait le tour du Soleil en une année entière.",
          en: "The Earth spins on itself to create day and night, and orbits the Sun in one full year."
        }
      },
      {
        icon: '🛡️',
        title: { fr: 'Un bouclier protecteur', en: 'A protective shield' },
        content: {
          fr: "Une couche d'air appelée atmosphère nous protège du froid de l'espace et des rayons trop forts du Soleil.",
          en: "A blanket of air called the atmosphere shields us from the cold of space and harsh sunlight."
        }
      }
    ],
    relatedTopicIds: ['soleil', 'la-lune']
  },
  {
    id: 'mars',
    title: { fr: 'Mars', en: 'Mars' },
    icon: '🔴',
    shortDesc: { fr: 'La célèbre planète rouge.', en: 'The famous red planet.' },
    fullContents: [
      {
        fr: 'Mars est rouge à cause de la rouille dans son sol. Des robots explorent sa surface.',
        en: 'Mars is red because of rust in its soil. Robots explore its surface.',
      },
      {
        fr: "Mars est une planète désertique très froide. Les scientifiques rêvent d'y envoyer un jour des humains pour y construire les premières bases spatiales !",
        en: "Mars is a very cold desert planet. Scientists dream of sending humans there one day to build the first space bases!"
      },
      {
        fr: "Sur Mars, on trouve des paysages grandioses comme des canyons géants et le mont Olympe, un volcan trois fois plus haut que notre mont Everest !",
        en: "On Mars, you can find spectacular landscapes like giant canyons and Mount Olympus, a volcano three times higher than our Mount Everest!"
      }
    ],
    funFacts: [
      {
        fr: 'Le plus grand volcan du système solaire est sur Mars !',
        en: 'The largest volcano in the solar system is on Mars!',
      }
    ],
    sections: [
      {
        icon: '🔴',
        title: { fr: 'La planète rouge', en: 'The red planet' },
        content: {
          fr: 'Mars est une planète rocheuse voisine de la Terre. Sa poussière est pleine de fer rouillé, ce qui lui donne cette jolie couleur orangée.',
          en: 'Mars is a rocky planet neighboring Earth. Its dust contains rusty iron, giving the ground its famous reddish-orange color.',
        },
      },
      {
        icon: '❄️',
        title: { fr: 'Un désert très froid', en: 'A freezing desert' },
        content: {
          fr: 'Plus éloignée du Soleil que notre planète, Mars est un monde désertique et glacial balayé par de grands tourbillons de vent.',
          en: 'Farther from the Sun than Earth, Mars is a chilly desert world swept by giant dust devils and icy winds.',
        },
      },
      {
        icon: '🌋',
        title: { fr: 'Le géant Olympus Mons', en: 'The giant Olympus Mons' },
        content: {
          fr: 'Mars abrite le plus haut volcan du système solaire : Olympus Mons. Il est trois fois plus haut que la plus grande montagne de la Terre !',
          en: "Mars is home to the largest volcano in the solar system: Olympus Mons. It stands three times taller than Earth's highest mountain!",
        },
      },
      {
        icon: '🤖',
        title: { fr: 'Des robots sur le terrain', en: 'Robots on Mars' },
        content: {
          fr: "Aucun humain n'a encore posé le pied sur Mars, mais des robots à roulettes y roulent chaque jour pour prendre des photos et analyser les roches.",
          en: 'No human has ever set foot on Mars, but wheeled robotic rovers roll across the rocks every day to take photos and study the soil.',
        },
      },
    ],
    relatedTopicIds: ['terre', 'la-lune', 'jupiter'],
  },
  {
    id: 'jupiter',
    title: { fr: 'Jupiter', en: 'Jupiter' },
    icon: '🌀',
    shortDesc: { fr: 'La plus grande planète de toutes.', en: 'The largest planet of all.' },
    fullContents: [
      {
        fr: "C'est une géante de gaz. Elle est si grande qu'on pourrait y mettre 1300 Terres !",
        en: 'It is a gas giant. It is so large that 1300 Earths could fit inside it!',
      },
      {
        fr: "Jupiter est la reine des planètes par sa taille. C'est une immense boule de gaz sans aucune surface solide pour se poser !",
        en: "Jupiter is the queen of planets by size. It is a huge ball of gas with no solid surface to land on!"
      },
      {
        fr: "Cette planète géante tourne sur elle-même à toute vitesse, ce qui crée des vents ultra-rapides et des tempêtes de couleurs qui durent depuis des siècles.",
        en: "This giant planet spins on itself at high speed, creating ultra-fast winds and colorful storms that have lasted for centuries."
      }
    ],
    funFacts: [
      {
        fr: 'Sa grande tache rouge est une tempête géante.',
        en: 'Its great red spot is a giant storm.',
      }
    ],
    sections: [
      {
        icon: '🌀',
        title: { fr: 'La reine des planètes', en: 'The king of planets' },
        content: {
          fr: 'Jupiter est la plus gigantesque des planètes du système solaire. C’est une immense sphère de gaz tourbillonnant, sans sol dur où poser le pied.',
          en: 'Jupiter is the largest planet in our solar system. It is an immense sphere of swirling gases, with no solid ground to stand on.',
        },
      },
      {
        icon: '🎨',
        title: { fr: 'Des rayures dans le ciel', en: 'Stripes across the sky' },
        content: {
          fr: 'En tournant très vite sur elle-même, la planète étire ses nuages pour former de superbes bandes de couleurs blanches, beiges et orangées.',
          en: 'Spinning rapidly on its axis, the planet stretches its clouds into beautiful flowing stripes of white, cream, and orange.',
        },
      },
      {
        icon: '🌪️',
        title: { fr: 'Une tempête géante', en: 'A giant storm' },
        content: {
          fr: 'On y observe la Grande Tache Rouge, un gigantesque tourbillon de vent qui change doucement de taille au fil des siècles.',
          en: 'Observers watch the Great Red Spot, a colossal storm of swirling winds that slowly shifts in size over the centuries.',
        },
      },
      {
        icon: '🌕',
        title: { fr: 'Des dizaines de lunes', en: 'Dozens of moons' },
        content: {
          fr: 'Jupiter est entourée de nombreuses lunes fascinantes, dont quatre grandes compagnes découvertes il y a très longtemps par Galilée.',
          en: 'Jupiter is circled by dozens of fascinating moons, including four large companions discovered long ago by Galileo.',
        },
      },
    ],
    relatedTopicIds: ['saturne', 'mars'],
  },
  {
    id: 'saturne',
    title: { fr: 'Saturne', en: 'Saturn' },
    icon: '🪐',
    shortDesc: {
      fr: 'La planète aux anneaux magnifiques.',
      en: 'The planet with magnificent rings.',
    },
    fullContents: [
      {
        fr: "Saturne est entourée d'anneaux de glace et de poussière. C'est aussi une géante gazeuse.",
        en: 'Saturn is surrounded by rings of ice and dust. It is also a gas giant.',
      },
      {
        fr: "Les magnifiques anneaux de Saturne sont formés de millions de morceaux de glace, de roche et de poussière qui reflètent joliment la lumière du Soleil.",
        en: "Saturn's magnificent rings are made of millions of pieces of ice, rock, and dust that beautifully reflect the Sun's light."
      },
      {
        fr: "Saturne possède des dizaines de lunes fascinantes, dont Titan, une lune géante avec ses propres nuages et des lacs de gaz liquide !",
        en: "Saturn has dozens of fascinating moons, including Titan, a giant moon with its own clouds and lakes of liquid gas!"
      }
    ],
    funFacts: [
      {
        fr: "Saturne flotterait sur l'eau si on trouvait une baignoire assez grande !",
        en: 'Saturn would float on water if we found a bathtub big enough!',
      }
    ],
    sections: [
      {
        icon: '🪐',
        title: { fr: 'Une immense boule de gaz', en: 'A huge ball of gas' },
        content: {
          fr: 'Saturne est une planète géante faite de gaz tourbillonnant. Elle ne possède aucun sol solide sur lequel on pourrait se poser ou marcher.',
          en: 'Saturn is a giant planet made of swirling gases. It has no solid ground where a person could ever land or walk.',
        },
      },
      {
        icon: '💍',
        title: { fr: 'Des anneaux de glace et de roche', en: 'Rings of ice and rock' },
        content: {
          fr: 'Tout autour d’elle tournent d’immenses anneaux formés de millions de morceaux de glace brillante et de cailloux rocheux.',
          en: 'Spinning around it are enormous rings made of millions of chunks of sparkling ice and rocky debris.',
        },
      },
      {
        icon: '❄️',
        title: { fr: 'Un monde lointain et glacial', en: 'A distant freezing world' },
        content: {
          fr: 'Située très loin de la chaleur du Soleil, Saturne est plongée dans un froid glacial et met près de trente ans à faire un tour complet de son orbite.',
          en: 'Located very far from the Sun’s warmth, Saturn is freezing cold and takes almost thirty Earth years to complete a single orbit.',
        },
      },
      {
        icon: '🌙',
        title: { fr: 'Une grande famille de lunes', en: 'A large family of moons' },
        content: {
          fr: 'Plus d’une centaine de lunes gravitent autour d’elle, comme la géante Titan entourée d’une épaisse couche de brume orangée.',
          en: 'More than a hundred moons orbit around it, including giant Titan, which is wrapped in a thick blanket of orange haze.',
        },
      },
    ],
    relatedTopicIds: ['mars', 'la-lune'],
  },
  {
    id: 'uranus',
    title: { fr: 'Uranus', en: 'Uranus' },
    icon: '💎',
    shortDesc: { fr: 'La planète penchée et glacée.', en: 'The tilted and icy planet.' },
    fullContents: [
      {
        fr: 'Uranus est une planète bleue très froide. Elle tourne sur le côté comme une boule qui roule.',
        en: 'Uranus is a very cold blue planet. It spins on its side like a rolling ball.',
      },
      {
        fr: "Cette géante de glace a une couleur turquoise unique grâce au gaz méthane présent dans son atmosphère. Elle possède aussi de fins anneaux sombres !",
        en: "This ice giant has a unique turquoise color thanks to the methane gas in its atmosphere. It also has thin, dark rings!"
      },
      {
        fr: "Contrairement aux autres planètes, Uranus a subi un choc dans le passé qui l'a couchée sur le côté. Ses saisons durent ainsi plus de 20 ans !",
        en: "Unlike other planets, Uranus suffered a shock in the past that knocked it on its side. Its seasons thus last for more than 20 years!"
      }
    ],
    funFacts: [
      {
        fr: 'Il y fait environ -220 degrés Celsius !',
        en: 'It is about -220 degrees Celsius there!',
      }
    ],
    sections: [
      {
        icon: '🧊',
        title: { fr: 'Une géante de glace', en: 'An ice giant' },
        content: {
          fr: "Uranus est un monde immense et gelé composé d'eau, d'ammoniac et de gaz aux douces teintes bleu-vert.",
          en: "Uranus is a giant frozen world made of water, ammonia, and gases with soft blue-green shades."
        }
      },
      {
        icon: '🔄',
        title: { fr: 'La planète couchée', en: 'The sideways planet' },
        content: {
          fr: "Elle tourne de façon très inhabituelle, presque couchée sur le côté, comme une toupie renversée.",
          en: "It spins in a very unusual way, tilted almost completely sideways like a tipped top."
        }
      },
      {
        icon: '🪐',
        title: { fr: 'De discrets anneaux', en: 'Faint rings' },
        content: {
          fr: "Autour d'elle flottent de fins anneaux sombres faits de poussières et de morceaux de roche.",
          en: "Around it float narrow, dark rings made of cosmic dust and rock fragments."
        }
      },
      {
        icon: '🌕',
        title: { fr: 'Une ronde de lunes', en: 'A dance of moons' },
        content: {
          fr: "Plus de vingt lunes glacées l'accompagnent dans son long voyage tout autour du Soleil.",
          en: "More than twenty icy moons accompany it on its long journey around the Sun."
        }
      }
    ],
    relatedTopicIds: ['saturne', 'jupiter', 'soleil']
  },
  {
    id: 'neptune',
    title: { fr: 'Neptune', en: 'Neptune' },
    icon: '🌊',
    shortDesc: { fr: 'La planète bleue très venteuse.', en: 'The very windy blue planet.' },
    fullContents: [
      {
        fr: 'Neptune est la plus lointaine. Il y souffle les vents les plus forts de tout le système solaire.',
        en: 'Neptune is the farthest away. The strongest winds in the entire solar system blow there.',
      },
      {
        fr: "Neptune est une magnifique planète bleu cobalt. Elle est si éloignée du Soleil qu'il lui faut 165 ans terrestres pour faire un seul grand tour !",
        en: "Neptune is a beautiful cobalt blue planet. It is so far from the Sun that it takes 165 Earth years to complete a single grand orbit!"
      },
      {
        fr: "C'est un monde de glaces et de tempêtes extrêmes où les vents soufflent à plus de 2000 km/h, soit beaucoup plus vite que les avions de chasse !",
        en: "It is a world of extreme ice and storms where winds blow at over 2000 km/h, much faster than jet fighter planes!"
      }
    ],
    funFacts: [
      {
        fr: 'Une année sur Neptune dure 165 ans terrestres !',
        en: 'A year on Neptune lasts 165 Earth years!',
      }
    ],
    sections: [
      {
        icon: '🪐',
        title: { fr: "La huitième planète", en: "The eighth planet" },
        content: {
          fr: "Neptune est la planète majeure la plus éloignée du Soleil dans notre système solaire. Comme elle est très distante, elle met environ 165 années terrestres à faire un seul tour du Soleil.",
          en: "Neptune is the farthest major planet from the Sun in our solar system. Because it orbits so far away, it takes about 165 Earth years to complete one single journey around the Sun."
        }
      },
      {
        icon: '❄️',
        title: { fr: "Une géante de glace", en: "An icy giant world" },
        content: {
          fr: "Neptune ne possède pas de surface solide sur laquelle marcher. C'est une planète géante composée d'une épaisse atmosphère gazeuse entourant un manteau dense d'eau, d'ammoniac et de glaces.",
          en: "Neptune has no solid rocky surface to walk on. It is an ice giant made of a thick swirling atmosphere resting over a dense mantle of water, ammonia, and slushy ices."
        }
      },
      {
        icon: '💙',
        title: { fr: "Une magnifique teinte bleue", en: "A vivid blue appearance" },
        content: {
          fr: "Vue depuis l'espace, Neptune brille d'une superbe couleur bleu vif. Les scientifiques étudient sa haute atmosphère et les gaz qui lui donnent cet éclat si particulier.",
          en: "Seen from space, Neptune glows with a striking deep-blue tint. Scientists continue to study its high atmosphere and the gases that give it such a vibrant color."
        }
      },
      {
        icon: '💨',
        title: { fr: "Le royaume des vents furieux", en: "The realm of fierce winds" },
        content: {
          fr: "Sur Neptune soufflent les rafales de vent les plus puissantes mesurées dans le système solaire, poussant de grands nuages blancs et d'immenses tempêtes sombres.",
          en: "Neptune hosts the fastest and most ferocious winds recorded in the solar system, driving bright white cirrus clouds and vast dark storm systems across its skies."
        }
      }
    ],
    relatedTopicIds: ['saturne', 'terre']
  },
  {
    id: 'pluton',
    title: { fr: 'Pluton', en: 'Pluto' },
    icon: '❄️',
    shortDesc: { fr: 'La petite planète naine glacée.', en: 'The small icy dwarf planet.' },
    fullContents: [
      {
        fr: 'Pluton est très loin et très petite. Elle a une grande plaine blanche en forme de cœur.',
        en: 'Pluto is very far away and very small. It has a large white heart-shaped plain.',
      },
      {
        fr: "Pluton a été longtemps considérée comme la neuvième planète du système solaire, avant d'être reclassée en planète naine à cause de sa petite taille.",
        en: "Pluto was long considered the ninth planet of the solar system, before being reclassified as a dwarf planet due to its small size."
      },
      {
        fr: "Cette petite planète naine glacée possède une atmosphère éphémère qui gèle et tombe comme de la neige lorsque Pluton s'éloigne trop du Soleil !",
        en: "This tiny icy dwarf planet has a temporary atmosphere that freezes and falls as snow when Pluto gets too far from the Sun!"
      }
    ],
    funFacts: [
      {
        fr: 'Pluton possède 5 lunes !',
        en: 'Pluto has 5 moons!',
      }
    ],
    sections: [
      {
        icon: '❄️',
        title: { fr: "Une planète naine lointaine", en: "A distant dwarf planet" },
        content: {
          fr: "Pluton voyage aux confins du système solaire, bien au-delà de Neptune dans la ceinture de Kuiper. Parce qu'elle partage son orbite avec d'autres corps célestes, les astronomes la classent comme planète naine.",
          en: "Pluto travels at the far edge of the solar system, well beyond Neptune in the Kuiper Belt. Because it shares its orbit with many other icy bodies, astronomers classify it as a dwarf planet."
        }
      },
      {
        icon: '🤍',
        title: { fr: "Le grand cœur de glace", en: "The great icy heart" },
        content: {
          fr: "Grâce à la sonde New Horizons, nous avons découvert à sa surface une plaine brillante en forme de cœur. Elle est faite de glaces d'azote et de méthane qui se renouvellent doucement.",
          en: "Thanks to the New Horizons probe, we discovered a vast, bright heart-shaped plain on its surface. It is made of nitrogen and methane ice that slowly churns over time."
        }
      },
      {
        icon: '🏔️',
        title: { fr: "Des montagnes d'eau gelée", en: "Mountains of hard ice" },
        content: {
          fr: "Sur Pluton, il fait si froid que la glace d'eau est aussi dure que de la pierre sur Terre. Cette glace forme d'immenses montagnes dressées vers le ciel sombre.",
          en: "On Pluto, it is so cold that ordinary water ice is as hard as bedrock on Earth. This rock-solid ice piles up into towering mountains reaching into the dark sky."
        }
      },
      {
        icon: '🌕',
        title: { fr: "Pluton et ses lunes", en: "Pluto and its moons" },
        content: {
          fr: "Même si elle est petite, Pluton est accompagnée de cinq lunes. La plus grande s'appelle Charon, et elle est si imposante que les deux astres tournent ensemble comme des danseurs.",
          en: "Even though it is small, Pluto is accompanied by five moons. The largest is Charon, and it is so massive that the two worlds pirouette around each other like dancing partners."
        }
      }
    ],
    relatedTopicIds: ['neptune', 'terre']
  },
  {
    id: 'astronaute',
    title: { fr: 'Les Astronautes', en: 'Astronauts' },
    icon: '👨‍🚀',
    shortDesc: { fr: "Les explorateurs de l'espace.", en: 'Space explorers.' },
    fullContents: [
      {
        fr: "Les astronautes sont des personnes entraînées pour voyager dans l'espace. Ils vivent dans la Station Spatiale Internationale et flottent car il n'y a pas de gravité.",
        en: 'Astronauts are people trained to travel in space. They live on the International Space Station and float because there is no gravity.',
      },
      {
        fr: "Pour devenir astronaute, il faut étudier la science et s'entraîner sous l'eau pour s'habituer à la sensation de flotter librement dans l'espace !",
        en: "To become an astronaut, you must study science and train underwater to get used to the feeling of floating freely in space!"
      },
      {
        fr: "Dans leur combinaison spatiale, les astronautes disposent d'une climatisation, d'eau à boire et d'une réserve d'oxygène pour pouvoir marcher dans le vide de l'espace.",
        en: "In their spacesuit, astronauts have air conditioning, water to drink, and an oxygen supply to be able to walk in the vacuum of space."
      }
    ],
    funFacts: [
      {
        fr: "Dans l'espace, les astronautes grandissent de quelques centimètres car leur colonne vertébrale s'étire !",
        en: 'In space, astronauts grow a few centimeters because their spines stretch!',
      }
    ],
    sections: [
      {
        icon: '👨‍🚀',
        title: { fr: 'Voyageurs des étoiles', en: 'Voyagers of the stars' },
        content: {
          fr: "Les astronautes sont des scientifiques courageux spécialement entraînés pour vivre et travailler tout là-haut dans l'espace.",
          en: 'Astronauts are brave scientists specially trained to live and work high up in outer space.',
        },
      },
      {
        icon: '🛰️',
        title: { fr: 'Flotter comme une plume', en: 'Floating like a feather' },
        content: {
          fr: 'En tournant très vite autour de la Terre, ils tombent sans fin et flottent joyeusement en impesanteur.',
          en: 'Orbiting Earth at high speed, they fall continually and float weightlessly through the air inside.',
        },
      },
      {
        icon: '🧑‍🚀',
        title: { fr: 'Une armure pour l’espace', en: 'A suit for space' },
        content: {
          fr: "Leur épaisse combinaison blanche leur fournit de l'oxygène pour respirer et les protège des températures extrêmes.",
          en: 'Their thick white suit provides oxygen to breathe and shields them from extreme cold and heat.',
        },
      },
      {
        icon: '🔬',
        title: { fr: 'Des expériences extraordinaires', en: 'Extraordinary experiments' },
        content: {
          fr: 'Dans leur station volante, ils étudient les plantes et le corps humain pour préparer de lointains voyages.',
          en: 'Aboard their flying station, they study plants and the human body to prepare future space journeys.',
        },
      },
    ],
    relatedTopicIds: ['la-lune', 'terre'],
  },
  {
    id: 'la-lune',
    title: { fr: 'La Lune', en: 'The Moon' },
    icon: '🌙',
    shortDesc: {
      fr: 'Le satellite qui tourne autour de la Terre.',
      en: 'The satellite that orbits the Earth.',
    },
    fullContents: [
      {
        fr: "La Lune est l'objet le plus brillant de notre ciel nocturne, mais elle ne fabrique pas sa propre lumière : elle reflète celle du Soleil. Elle change d'apparence au fil du mois (pleine lune, croissant...) car elle tourne autour de la Terre. C'est le seul endroit dans l'espace où les humains ont déjà posé le pied !",
        en: "The Moon is the brightest object in our night sky, but it doesn't make its own light: it reflects light from the Sun. It changes appearance over the month (full moon, crescent...) because it orbits the Earth. It is the only place in space where humans have already set foot!",
      },
      {
        fr: "La Lune attire l'eau de nos océans par sa force invisible de gravité, ce qui crée le phénomène magique des marées (la mer qui monte et qui descend) sur Terre !",
        en: "The Moon attracts the water of our oceans with its invisible force of gravity, which creates the magical phenomenon of tides (the sea rising and falling) on Earth!"
      },
      {
        fr: "La Lune est née il y a 4,5 milliards d'années suite à la collision d'une planète géante avec la jeune Terre. Les débris de ce choc se sont rassemblés pour former notre satellite.",
        en: "The Moon was born 4.5 billion years ago following the collision of a giant planet with the young Earth. The debris from this impact gathered to form our satellite."
      },
      {
        fr: "La Lune est le satellite naturel qui tourne tout doucement autour de la Terre et change de forme dans le ciel chaque nuit. Tout comme la Lune qui grandit puis se repose en croissant discret, tu as le droit toi aussi d'avoir des jours plus calmes pour te reposer : tu restes merveilleux et entier, même quand tu te fais tout petit.",
        en: "The Moon is the natural satellite that gently orbits the Earth and changes its shape in the night sky. Just like the Moon that grows bright and then rests as a quiet crescent, you are allowed to have calm days to rest: you are always wonderful and whole, even when you feel quiet."
      }
    ],
    funFacts: [
      {
        fr: 'Sur la Lune, on pèse 6 fois moins que sur Terre. Tu pourrais faire des bonds de géant très facilement !',
        en: 'On the Moon, you weigh 6 times less than on Earth. You could make giant leaps very easily!',
      },
      {
        fr: "Il n'y a pas de vent sur la Lune, donc les traces de pas des astronautes y resteront pour toujours !",
        en: "There is no wind on the Moon, so astronauts' footprints will stay there forever!"
      },
      {
        fr: "La Lune s'éloigne de la Terre de 3 centimètres chaque année.",
        en: 'The Moon moves 3 centimeters away from the Earth every year.'
      }
    ],
    sections: [
      {
        icon: '🌙',
        title: { fr: 'Notre voisine de nuit', en: 'Our night neighbor' },
        content: {
          fr: "La Lune est le satellite naturel qui tourne fidèlement autour de notre Terre dans l'espace.",
          en: "The Moon is the natural satellite that faithfully orbits our Earth in space."
        }
      },
      {
        icon: '💡',
        title: { fr: 'Le miroir du Soleil', en: 'The mirror of the Sun' },
        content: {
          fr: "Elle ne fabrique pas sa propre lumière mais renvoie celle du Soleil comme un grand miroir.",
          en: "It does not create its own light but reflects sunlight like a giant mirror."
        }
      },
      {
        icon: '✨',
        title: { fr: 'Des formes changeantes', en: 'Changing shapes' },
        content: {
          fr: "Au fil des nuits, elle change d'aspect dans le ciel : croissant fin, quartier ou ronde pleine lune.",
          en: "Over the nights, it changes shape in the sky: thin crescent, quarter, or round full moon."
        }
      },
      {
        icon: '👨‍🚀',
        title: { fr: 'Des pas pour toujours', en: 'Footprints forever' },
        content: {
          fr: "Des astronautes y ont marché : sans vent ni pluie, leurs empreintes y restent gravées pour toujours.",
          en: "Astronauts walked on it: with no wind or rain, their footprints stay there forever."
        }
      }
    ],
    relatedTopicIds: ['terre', 'soleil']
  },
  {
    id: 'singularite',
    title: { fr: 'La Singularité', en: 'The Singularity' },
    icon: '💥',
    shortDesc: {
      fr: "Le point de départ mystérieux de tout notre univers !",
      en: 'The mysterious starting point of our entire universe!',
    },
    fullContents: [
      {
        fr: "La singularité est le tout premier moment de notre univers. Il y a environ 13,8 milliards d'années, tout ce qui existe aujourd'hui (les étoiles, la Terre, et même nous !) était concentré en un point incroyablement minuscule, chaud et dense. Puis, ce point a commencé à s'étendre très rapidement : c'est le Big Bang !",
        en: "The singularity is the very first moment of our universe. About 13.8 billion years ago, everything that exists today (stars, Earth, and even us!) was concentrated in an incredibly tiny, hot, and dense point. Then, this point began to expand very quickly: that is the Big Bang!",
      },
      {
        fr: "Imagine que tout notre immense univers, avec toutes ses galaxies et ses étoiles, soit compressé jusqu'à devenir plus petit qu'un atome invisible. C'est le grand mystère de la singularité d'où tout est né !",
        en: "Imagine that our entire vast universe, with all its galaxies and stars, was compressed until it became smaller than an invisible atom. That is the great mystery of the singularity from which everything was born!"
      },
      {
        fr: "Au tout début, le temps et l'espace n'existaient pas encore comme aujourd'hui. La singularité a marqué le point de départ d'une incroyable expansion cosmique toujours en cours !",
        en: "At the very beginning, time and space did not exist as they do today. The singularity marked the starting point of an incredible cosmic expansion still ongoing today!"
      }
    ],
    funFacts: [
      {
        fr: "Au moment de la singularité, tout l'univers tenait dans un espace plus petit qu'un grain de sable !",
        en: "At the moment of the singularity, the entire universe fit in a space smaller than a grain of sand!",
      },
      {
        fr: "Le mot 'singularité' désigne un endroit où les règles habituelles de la physique ne fonctionnent plus.",
        en: "The word 'singularité' refers to a place where the usual rules of physics no longer work."
      },
      {
        fr: "Après la singularité, l'univers a grandi si vite que cela s'appelle l'inflation cosmique.",
        en: "After the singularity, the universe grew so fast that it is called cosmic inflation."
      }
    ],
    sections: [
      {
        icon: '💥',
        title: { fr: 'Le tout premier instant', en: 'The very first instant' },
        content: {
          fr: "Il y a près de 14 milliards d'années, avant les galaxies et les étoiles, tout l'univers tenait en un point incroyablement minuscule.",
          en: 'Nearly 14 billion years ago, before galaxies and stars, the whole universe was held in an incredibly tiny point.'
        }
      },
      {
        icon: '🔥',
        title: { fr: 'Une chaleur inimaginable', en: 'Unimaginable heat' },
        content: {
          fr: "Toute l'énergie du futur cosmos était concentrée là, bouillonnante et plus brûlante que le cœur de millions de soleils.",
          en: 'All the energy of the future cosmos was packed together there, bubbling hotter than the heart of millions of suns.'
        }
      },
      {
        icon: '🎈',
        title: { fr: 'Le grand départ du Big Bang', en: 'The Big Bang kickoff' },
        content: {
          fr: "Soudain, ce point mystérieux a commencé à gonfler à une vitesse folle, étirant l'espace et créant le temps lui-même.",
          en: 'Suddenly, this mysterious point began expanding at dizzying speed, stretching space and giving birth to time itself.'
        }
      },
      {
        icon: '🌌',
        title: { fr: "L'origine de tout ce qui est", en: 'The origin of everything' },
        content: {
          fr: "Sans cette minuscule étincelle originelle, ni notre Terre, ni le ciel bleu, ni nous-mêmes ne serions là aujourd'hui.",
          en: 'Without this tiny starting spark, neither our Earth, nor blue skies, nor we ourselves would exist today.'
        }
      }
    ],
    relatedTopicIds: ['soupe-particules', 'naissance-atomes', 'expansion'],
  },
  {
    id: 'soupe-particules',
    title: { fr: 'Soupe de Particules', en: 'Particle Soup' },
    icon: '🥣',
    shortDesc: {
      fr: "Un mélange super chaud et agité !",
      en: "A super hot and moving mix!"
    },
    fullContents: [
      {
        fr: "Juste après le Big Bang, l'univers était incroyablement chaud, comme une soupe brûlante ! De toutes petites pièces d'énergie s'agitaient et se rentraient dedans à toute vitesse sans pouvoir s'associer.",
        en: "Just after the Big Bang, the universe was incredibly hot, like a burning soup! Tiny bits of energy moved and crashed into each other at high speed without being able to join together."
      },
      {
        fr: "Imagine une tempête de feu cosmique géante où rien ne peut rester tranquille. C'était la soupe de particules de la naissance de l'univers !",
        en: "Imagine a giant cosmic firestorm where nothing can stay still. That was the particle soup at the birth of the universe!"
      }
    ],
    funFacts: [
      {
        fr: "Cette soupe était des milliards de fois plus chaude que le centre de notre Soleil !",
        en: "This soup was billions of times hotter than the center of our Sun!"
      }
    ],
    sections: [
      {
        icon: '🔥',
        title: { fr: 'La grande fournaise cosmique', en: 'The great cosmic furnace' },
        content: {
          fr: "Juste après la naissance de l'univers, tout était extraordinairement chaud et concentré dans une lumière éblouissante.",
          en: 'Right after the birth of the universe, everything was extraordinarily hot and concentrated in dazzling light.'
        }
      },
      {
        icon: '🌪️',
        title: { fr: 'Une danse ultra-rapide', en: 'An ultra-fast dance' },
        content: {
          fr: "De minuscules morceaux d'énergie s'entrechoquaient sans cesse à toute vitesse sans réussir à s'accrocher.",
          en: 'Tiny bits of energy collided nonstop at wild speeds without being able to hold together.'
        }
      },
      {
        icon: '🧊',
        title: { fr: "L'univers commence à tiédir", en: 'The universe starts to cool' },
        content: {
          fr: "En s'étendant dans l'espace, cette soupe ardente a commencé à refroidir petit à petit, calmant le tourbillon de particules.",
          en: 'By spreading across space, this blazing soup began to cool down bit by bit, calming the swirling particles.'
        }
      },
      {
        icon: '🧱',
        title: { fr: 'Vers les premiers atomes', en: 'Toward the first atoms' },
        content: {
          fr: "Dès que la chaleur a diminué, ces petites briques ont pu enfin s'unir pour fabriquer la matière de tout notre cosmos.",
          en: 'As soon as the heat dropped, these little blocks could finally join together to make the matter of our entire cosmos.'
        }
      }
    ],
    relatedTopicIds: ['naissance-atomes', 'expansion', 'soleil'],
  },
  {
    id: 'naissance-atomes',
    title: { fr: 'Naissance des Atomes', en: 'Birth of Atoms' },
    icon: '⚛️',
    shortDesc: {
      fr: "Les petites briques de la matière apparaissent.",
      en: "The tiny bricks of matter appear."
    },
    fullContents: [
      {
        fr: "En grandissant, l'univers a commencé à se refroidir un peu. Les particules de la soupe ont enfin pu se calmer et s'assembler pour former les tout premiers atomes, qui sont les petites briques de tout ce qui existe !",
        en: "As it grew, the universe began to cool down a bit. The particles in the soup could finally calm down and assemble to form the very first atoms, which are the tiny bricks of everything that exists!"
      },
      {
        fr: "Tout ce qui t'entoure : tes jouets, ton chat, et même tes propres mains, est fabriqué à partir de ces petits atomes nés il y a très longtemps !",
        en: "Everything around you: your toys, your cat, and even your own hands, is made from these tiny atoms born a very long time ago!"
      }
    ],
    funFacts: [
      {
        fr: "L'hydrogène a été le tout premier atome fabriqué dans l'univers !",
        en: "Hydrogen was the very first atom made in the universe!"
      }
    ],
    sections: [
      {
        icon: '❄️',
        title: { fr: "L'univers se refroidit", en: 'The universe cools down' },
        content: {
          fr: "Après la grande chaleur des débuts, l'univers s'est doucement rafraîchi, permettant aux particules folles de ralentir.",
          en: 'After the blazing early heat, the universe slowly cooled down, letting rushed particles slow their pace.'
        }
      },
      {
        icon: '🧱',
        title: { fr: 'Les briques de la matière', en: 'Building blocks of matter' },
        content: {
          fr: "En se regroupant calmement, ces particules ont fabriqué les tout premiers atomes, qui sont les briques invisibles de tout ce qui existe.",
          en: 'By calmly joining together, these particles built the very first atoms, the tiny invisible blocks of everything.'
        }
      },
      {
        icon: '☁️',
        title: { fr: "L'hydrogène en tête", en: 'Hydrogen takes the lead' },
        content: {
          fr: "Le premier atome créé était l'hydrogène, le plus simple et le plus léger de tous, formant d'immenses nuages dans l'espace.",
          en: 'The very first atom created was hydrogen, the simplest and lightest of all, forming huge clouds in space.'
        }
      },
      {
        icon: '✨',
        title: { fr: 'Présents partout autour de nous', en: 'Everywhere around us' },
        content: {
          fr: "L'eau que nous buvons, l'air que nous respirons et même nos corps sont tous faits de ces atomes nés aux premiers temps du cosmos.",
          en: 'The water we drink, the air we breathe, and even our own bodies are all made of these atoms born in the early cosmos.'
        }
      }
    ],
    relatedTopicIds: ['premieres-etoiles', 'expansion', 'soleil'],
  },
  {
    id: 'expansion',
    title: { fr: "L'Expansion", en: 'Expansion' },
    icon: '✨',
    shortDesc: {
      fr: "L'univers grandit à toute vitesse !",
      en: "The universe grows at high speed!"
    },
    fullContents: [
      {
        fr: "Depuis sa naissance, l'univers ne s'arrête jamais de grandir ! Il s'étend dans toutes les directions à une vitesse incroyable, emportant toutes les galaxies de plus en plus loin les unes des autres.",
        en: "Since its birth, the universe never stops growing! It expands in all directions at an incredible speed, carrying all galaxies further and further apart."
      },
      {
        fr: "L'expansion ne pousse pas les objets, c'est l'espace lui-même entre les galaxies qui s'étire, comme de la pâte à gâteau qui gonfle au four !",
        en: "Expansion doesn't push objects; it is space itself between galaxies that stretches, like cake dough rising in the oven!"
      }
    ],
    funFacts: [
      {
        fr: "L'univers s'étend si vite que même la lumière a du mal à le rattraper !",
        en: "The universe expands so fast that even light has a hard time catching up!"
      }
    ],
    sections: [
      {
        icon: '🎈',
        title: { fr: 'Un univers qui grandit', en: 'A growing universe' },
        content: {
          fr: "Depuis sa naissance, notre univers ne s'arrête jamais de grandir. Il s'étend partout, un peu comme un ballon qu'on gonfle doucement.",
          en: 'Since its birth, our universe has never stopped growing. It expands everywhere, just like a balloon gently blown up.'
        }
      },
      {
        icon: '🌌',
        title: { fr: "L'espace qui s'étire", en: 'Space stretching out' },
        content: {
          fr: "Ce ne sont pas les galaxies qui se déplacent seules : c'est l'espace entre elles qui s'étire, les éloignant petit à petit.",
          en: 'Galaxies are not just moving on their own: space between them stretches, carrying them gradually farther apart.'
        }
      },
      {
        icon: '🍰',
        title: { fr: 'La pâte qui gonfle', en: 'Rising cake dough' },
        content: {
          fr: "Imagine un gâteau aux pépites de chocolat qui cuit au four. En gonflant, la pâte s'élargit et toutes les pépites s'écartent naturellement.",
          en: 'Imagine baking chocolate chip dough in the oven. As the dough rises, all the chips naturally drift further apart.'
        }
      },
      {
        icon: '🔭',
        title: { fr: 'Détecté par les télescopes', en: 'Spotted by telescopes' },
        content: {
          fr: "En observant la lumière des galaxies lointaines, les scientifiques ont prouvé que le cosmos continue de s'agrandir à toute vitesse.",
          en: 'By watching light from distant galaxies, scientists proved that the cosmos keeps expanding at incredible speed.'
        }
      }
    ],
    relatedTopicIds: ['premieres-etoiles', 'premieres-galaxies', 'voie-lactee'],
  },
  {
    id: 'premieres-etoiles',
    title: { fr: 'Premières Étoiles', en: 'First Stars' },
    icon: '⭐',
    shortDesc: {
      fr: "La lumière s'allume enfin !",
      en: "The light finally turns on!"
    },
    fullContents: [
      {
        fr: "Après des millions d'années d'obscurité, la gravité a rassemblé de grands nuages de gaz. Ces nuages sont devenus si denses et chauds qu'ils se sont allumés : les toutes premières étoiles sont nées !",
        en: "After millions of years of darkness, gravity gathered huge clouds of gas. These clouds became so dense and hot that they ignited: the very first stars were born!"
      },
      {
        fr: "Ces soleils géants ont fabriqué dans leur cœur brûlant les premiers métaux et éléments chimiques lourds de tout notre univers !",
        en: "These giant suns manufactured the first metals and heavy chemical elements of our entire universe in their hot core!"
      }
    ],
    funFacts: [
      {
        fr: "Les premières étoiles étaient de véritables géantes, des centaines de fois plus grandes que notre Soleil !",
        en: "The first stars were true giants, hundreds of times larger than our Sun!"
      }
    ],
    sections: [
      {
        icon: '🌌',
        title: { fr: 'Après la longue nuit', en: 'After the dark ages' },
        content: {
          fr: "Juste après la naissance de l'univers, il n'y avait aucune étoile. L'espace est resté plongé dans le noir complet pendant des millions d'années.",
          en: 'Right after the universe began, there were no stars at all. Space stayed in pitch-black darkness for millions of years.'
        }
      },
      {
        icon: '☁️',
        title: { fr: 'Le souffle des premiers gaz', en: 'Breath of early gases' },
        content: {
          fr: "L'univers contenait d'immenses nuages d'hydrogène et d'hélium. La gravité a lentement rassemblé ce gaz pour allumer d'incroyables boules de feu célestes.",
          en: 'The early universe held huge clouds of hydrogen and helium. Gravity slowly pulled this gas together to ignite blazing celestial fireballs.'
        }
      },
      {
        icon: '✨',
        title: { fr: 'Des soleils géants', en: 'Giant ancient suns' },
        content: {
          fr: "Ces premières étoiles étaient bien plus grosses et brillantes que notre Soleil. Elles ont fabriqué dans leur cœur très chaud les premiers éléments nouveaux du cosmos.",
          en: 'These first stars were much bigger and brighter than our Sun. They created the first new chemical elements of the cosmos inside their hot cores.'
        }
      },
      {
        icon: '🔭',
        title: { fr: 'Regarder au fond du temps', en: 'Peering into deep time' },
        content: {
          fr: "Leur lumière a voyagé pendant des milliards d'années pour venir jusqu'à nous. Grâce à de grands télescopes spatiaux, les scientifiques cherchent à observer leurs premières lueurs.",
          en: 'Their light traveled for billions of years across space to reach us. Using giant space telescopes, scientists search the sky to observe their early glow.'
        }
      }
    ],
    relatedTopicIds: ['soleil', 'telescope', 'la-lune'],
  },
  {
    id: 'premieres-galaxies',
    title: { fr: 'Premières Galaxies', en: 'First Galaxies' },
    icon: '🌀',
    shortDesc: {
      fr: "Les étoiles se regroupent en familles.",
      en: "Stars group into families."
    },
    fullContents: [
      {
        fr: "Les étoiles ne restent pas seules dans l'espace. Attirées les unes par les autres, elles se sont regroupées par milliards pour former les premières galaxies, de grands tourbillons de lumière céleste.",
        en: "Stars do not stay alone in space. Attracted to each other, they grouped together by the billions to form the first galaxies, large swirls of celestial light."
      },
      {
        fr: "Les premières galaxies étaient plus petites et plus agitées que nos galaxies actuelles, se télescopant souvent pour former de plus grands ensembles.",
        en: "The first galaxies were smaller and more turbulent than today's galaxies, often colliding to form larger systems."
      }
    ],
    funFacts: [
      {
        fr: "Il existe des centaines de milliards de galaxies dans notre univers visible !",
        en: "There are hundreds of billions of galaxies in our visible universe!"
      }
    ],
    sections: [
      {
        icon: '🌀',
        title: { fr: "Des familles d'étoiles naissantes", en: 'Young star families' },
        content: {
          fr: "Peu après l'allumage des premières étoiles, la gravité a réuni ces astres en groupes. Ces toutes premières galaxies formaient des essaims lumineux au cœur du cosmos.",
          en: 'Soon after the first stars ignited, gravity gathered them into clusters. These earliest galaxies formed glowing swarms in the heart of the cosmos.'
        }
      },
      {
        icon: '🌪️',
        title: { fr: 'Des formes agitées et changeantes', en: 'Restless, changing shapes' },
        content: {
          fr: "Contrairement aux grandes galaxies spirales bien calmes d'aujourd'hui, les premières galaxies étaient plus petites, turbulentes et changeaient souvent d'allure.",
          en: 'Unlike the calm spiral galaxies of today, early galaxies were smaller, chaotic, and constantly shifting shape.'
        }
      },
      {
        icon: '💥',
        title: { fr: 'Se rencontrer et grandir', en: 'Meeting and growing' },
        content: {
          fr: "Dans l'univers jeune, ces petites galaxies voyageaient très près les unes des autres. En fusionnant, elles ont formé des galaxies de plus en plus grandes.",
          en: 'In the young universe, small galaxies traveled very close together. By merging over time, they formed larger and larger galaxies.'
        }
      },
      {
        icon: '🔭',
        title: { fr: 'Regarder loin dans le ciel', en: 'Peering into the deep sky' },
        content: {
          fr: "Observer ces galaxies lointaines demande des télescopes très puissants. Les astronomes continuent d'étudier leurs images pour comprendre les débuts du cosmos.",
          en: 'Observing these distant galaxies requires powerful telescopes. Astronomers continue studying their images to understand cosmic beginnings.'
        }
      }
    ],
    relatedTopicIds: ['premieres-etoiles', 'voie-lactee', 'soleil'],
  },
  {
    id: 'voie-lactee',
    title: { fr: 'La Voie Lactée', en: 'The Milky Way' },
    icon: '🌌',
    shortDesc: {
      fr: "Notre merveilleuse maison galactique.",
      en: "Our wonderful galactic home."
    },
    fullContents: [
      {
        fr: "La Voie Lactée est notre galaxie. C'est une magnifique spirale qui tourne lentement sur elle-même. Elle contient plus de 200 milliards d'étoiles, dont notre Soleil, situé sur l'un de ses bras de lumière.",
        en: "The Milky Way is our galaxy. It is a beautiful spiral that slowly spins on itself. It contains over 200 billion stars, including our Sun, located on one of its arms of light."
      },
      {
        fr: "Si nous pouvions voyager à la vitesse de la lumière, il nous faudrait 100 000 ans pour traverser entièrement la Voie Lactée !",
        en: "If we could travel at the speed of light, it would take us 100,000 years to cross the Milky Way entirely!"
      }
    ],
    funFacts: [
      {
        fr: "Elle s'appelle 'Voie Lactée' car elle ressemble à une traînée de lait blanc dans le ciel de nuit !",
        en: "It is called the 'Milky Way' because it looks like a trail of white milk in the night sky!"
      }
    ],
    sections: [
      {
        icon: '🌌',
        title: { fr: "Notre immense cité d'étoiles", en: "Our vast city of stars" },
        content: {
          fr: "La Voie lactée est notre galaxie, une gigantesque famille d'étoiles, de gaz et de poussière. Elle rassemble des centaines de milliards d'étoiles retenues ensemble dans l'espace.",
          en: "The Milky Way is our galaxy, a gigantic cosmic family of stars, gas, and dust. It gathers hundreds of billions of stars traveling together through space."
        }
      },
      {
        icon: '☀️',
        title: { fr: "La place de notre Soleil", en: "Where our Sun lives" },
        content: {
          fr: "Il ne faut pas confondre le système solaire et la galaxie. Notre Soleil et ses planètes ne forment qu'un tout petit quartier situé au sein de cet immense ensemble.",
          en: "A galaxy is much bigger than a solar system. Our Sun and its eight planets form just one small neighborhood within this immense galaxy."
        }
      },
      {
        icon: '✨',
        title: { fr: "Un ruban blanc dans la nuit", en: "A glowing ribbon in the night" },
        content: {
          fr: "Par une nuit très sombre sans lumières de ville, on aperçoit dans le ciel une traînée laiteuse et lumineuse. C'est la tranche de notre galaxie vue depuis la Terre.",
          en: "On a very dark night far from city lights, a glowing milky band stretches across the sky. We are looking edge-on through our own galaxy from Earth."
        }
      },
      {
        icon: '🌀',
        title: { fr: "Un grand disque en mouvement", en: "A great rotating disk" },
        content: {
          fr: "Les astronomes ont découvert que notre galaxie forme un grand disque aplati qui tourne très lentement sur lui-même, avec des bras de poussière et d'étoiles brillantes.",
          en: "Astronomers have discovered that our galaxy forms a broad, flat rotating disk, featuring graceful curving arms filled with brilliant stars and glowing gas."
        }
      }
    ],
    relatedTopicIds: ['soleil', 'terre']
  }
];

export const space: readonly Topic[] = rawSpace.map((item) => ({
  ...item,
  category: CATEGORY,
  categoryKey: CATEGORY_KEY,
  fullContent: item.fullContents[0],
  funFact: item.funFacts[0],
}));
