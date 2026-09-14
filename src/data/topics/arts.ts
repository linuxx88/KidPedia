

export const arts = [
  {
    id: 'peinture',
    title: { fr: 'La Peinture', en: 'Painting' },
    category: { fr: 'Arts & Culture 🎨', en: 'Arts & Culture 🎨' },
    categoryKey: 'arts',
    icon: '🖌️',
    shortDesc: {
      fr: 'Créer des images magnifiques avec de la couleur.',
      en: 'Creating beautiful images with color.',
    },
    fullContent: {
      fr: "La peinture est un art très ancien. Les artistes utilisent des pinceaux, de la peinture à l'huile ou à l'eau pour exprimer leurs sentiments sur des toiles.",
      en: 'Painting is a very ancient art. Artists use brushes, oil paint, or watercolors to express their feelings on canvases.',
    },
    fullContents: [
      {
        fr: "La peinture est un art très ancien. Les artistes utilisent des pinceaux, de la peinture à l'huile ou à l'eau pour exprimer leurs sentiments sur des toiles.",
        en: 'Painting is a very ancient art. Artists use brushes, oil paint, or watercolors to express their feelings on canvases.',
      },
      {
        fr: "L'aquarelle est une technique de peinture très douce. On mélange les pigments de couleur directement avec de l'eau pour peindre sur du papier épais.",
        en: "Watercolor is a very soft painting technique. Color pigments are mixed directly with water to paint on thick paper."
      }
    ],
    funFact: {
      fr: "Vincent van Gogh a peint la célèbre 'Nuit Étoilée' en regardant par sa fenêtre !",
      en: "Vincent van Gogh painted the famous 'Starry Night' while looking out his window!",
    },
    funFacts: [
      {
        fr: "Vincent van Gogh a peint la célèbre 'Nuit Étoilée' en regardant par sa fenêtre !",
        en: "Vincent van Gogh painted the famous 'Starry Night' while looking out his window!",
      },
      {
        fr: "L'aquarelle sèche très rapidement, ce qui permet de peindre facilement en extérieur !",
        en: "Watercolor dries very quickly, which makes it easy to paint outdoors!"
      }
    ],
    sections: [
      {
        id: 'magie_couleurs',
        icon: '🎨',
        title: { fr: 'La fête des couleurs', en: 'A celebration of colors' },
        content: {
          fr: 'La peinture permet de créer des images merveilleuses en mélangeant les couleurs primaires sur sa palette.',
          en: 'Painting lets artists create wonderful images by mixing bright primary colors on their palette.',
        },
      },
      {
        id: 'premiers_peintres',
        icon: '🦣',
        title: { fr: 'Depuis la préhistoire', en: 'Since prehistoric times' },
        content: {
          fr: 'Dès la préhistoire, les premiers artistes peignaient des mammouths et des chevaux sur la roche des grottes.',
          en: 'Since prehistoric times, early artists painted mammoths and running horses on rocky cave walls.',
        },
      },
      {
        id: 'pinceaux_et_outils',
        icon: '🖌️',
        title: { fr: 'Mille façons de peindre', en: 'A thousand ways to paint' },
        content: {
          fr: 'On peut utiliser un pinceau fin, une éponge, un couteau ou même ses doigts pour poser la pâte.',
          en: 'You can use fine brushes, soft sponges, wooden knives, or even fingers to apply colorful paint.',
        },
      },
      {
        id: 'exprimer_emotions',
        icon: '✨',
        title: { fr: 'Exprimer ses émotions', en: 'Sharing your emotions' },
        content: {
          fr: 'Un tableau peut raconter une histoire drôle, faire rêver ou transmettre une douce émotion à qui le regarde.',
          en: 'A painting can tell a funny story, spark dreams, or share gentle feelings with everyone looking.',
        },
      },
    ],
    relatedTopicIds: ['prehistoire', 'arc-en-ciel'],
  },
  {
    id: 'musique',
    title: { fr: 'La Musique', en: 'Music' },
    category: { fr: 'Arts & Culture 🎨', en: 'Arts & Culture 🎨' },
    categoryKey: 'arts',
    icon: '🎵',
    shortDesc: {
      fr: 'Organiser des sons pour créer de belles chansons.',
      en: 'Organizing sounds to create beautiful songs.',
    },
    fullContent: {
      fr: 'La musique existe depuis toujours ! On peut jouer des instruments comme le piano ou la guitare, ou simplement chanter avec sa voix.',
      en: 'Music has always existed! We can play instruments like the piano or guitar, or simply sing with our voice.',
    },
    funFact: {
      fr: "Wolfgang Amadeus Mozart a commencé à composer de la musique à l'âge de 5 ans !",
      en: 'Wolfgang Amadeus Mozart started composing music at the age of 5!',
    },
    sections: [
      {
        icon: '🎵',
        title: { fr: 'La magie des sons', en: 'The magic of sounds' },
        content: {
          fr: "La musique est un assemblage joyeux de sons, de rythmes et de mélodies qui font sourire.",
          en: "Music is a joyful mix of sounds, rhythms, and melodies that make you smile."
        }
      },
      {
        icon: '🎸',
        title: { fr: 'Mille instruments', en: 'A thousand instruments' },
        content: {
          fr: "On peut la jouer au piano, à la guitare, au tambour, ou simplement avec sa propre voix.",
          en: "You can play it on a piano, guitar, drums, or simply with your very own voice."
        }
      },
      {
        icon: '💖',
        title: { fr: 'Donner des émotions', en: 'Giving emotions' },
        content: {
          fr: "Une douce musique peut bercer pour dormir, ou donner une folle envie de danser avec ses amis.",
          en: "Gentle music can lull you to sleep, or give you a huge desire to dance with friends."
        }
      },
      {
        icon: '🥁',
        title: { fr: 'Le tempo du cœur', en: 'The heartbeat tempo' },
        content: {
          fr: "Tout comme ton cœur bat régulièrement, chaque chanson a son tempo qui donne envie de bouger.",
          en: "Just like your heart beats steadily, each song has its own tempo that makes you move."
        }
      }
    ],
    relatedTopicIds: ['danse', 'coeur']
  },
  {
    id: 'cinema',
    title: { fr: 'Le Cinéma', en: 'Cinema' },
    category: { fr: 'Arts & Culture 🎨', en: 'Arts & Culture 🎨' },
    categoryKey: 'arts',
    icon: '🎬',
    shortDesc: {
      fr: 'Raconter des histoires avec des images qui bougent.',
      en: 'Telling stories with moving images.',
    },
    fullContent: {
      fr: "Le cinéma, c'est comme un livre magique où les images s'animent ! On utilise des caméras pour filmer des acteurs et créer des films d'aventure, des comédies ou des dessins animés.",
      en: 'Cinema is like a magic book where images come to life! We use cameras to film actors and create adventure movies, comedies, or cartoons.',
    },
    funFact: {
      fr: "Le tout premier film de l'histoire ne durait que quelques secondes et montrait un train arrivant en gare !",
      en: 'The very first movie in history lasted only a few seconds and showed a train arriving at a station!',
    },
    sections: [
      {
        icon: '🎞️',
        title: { fr: 'Des images qui défilent', en: 'Images in motion' },
        content: {
          fr: 'Un film projette des photos fixes si vite que nos yeux croient voir un mouvement tout naturel.',
          en: 'A film projects still pictures so quickly that our eyes perceive one continuous flowing movement.',
        },
      },
      {
        icon: '🎭',
        title: { fr: 'Le jeu des comédiens', en: 'Actors and storytelling' },
        content: {
          fr: 'Des acteurs portent de beaux costumes pour interpréter des héros amusants et raconter de fabuleuses histoires.',
          en: 'Actors wear colorful costumes to portray funny heroes and bring thrilling adventures to life.',
        },
      },
      {
        icon: '🎨',
        title: { fr: 'La magie de l’animation', en: 'The magic of animation' },
        content: {
          fr: 'Les artistes dessinent mille esquisses colorées qui prennent vie sur grand écran pour amuser les enfants.',
          en: 'Artists sketch thousands of colorful drawings that come alive on screen to delight young viewers.',
        },
      },
      {
        icon: '🎵',
        title: { fr: 'Sons et musiques', en: 'Sounds and music' },
        content: {
          fr: 'Des mélodies féeriques et des bruitages complètent les images pour faire rire ou frissonner de joie.',
          en: 'Enchanting melodies and sound effects accompany pictures to make audiences laugh or gasp with joy.',
        },
      },
    ],
    relatedTopicIds: ['musique', 'peinture'],
  },
  {
    id: 'danse',
    title: { fr: 'La Danse', en: 'Dance' },
    category: { fr: 'Arts & Culture 🎨', en: 'Arts & Culture 🎨' },
    categoryKey: 'arts',
    icon: '💃',
    shortDesc: {
      fr: 'Bouger son corps en rythme avec la musique.',
      en: 'Moving your body in rhythm with the music.',
    },
    fullContent: {
      fr: "La danse est une façon joyeuse de s'exprimer ! Il existe plein de styles : le ballet, le hip-hop, la danse classique ou les danses traditionnelles de tous les pays du monde.",
      en: 'Dance is a joyful way to express yourself! There are many styles: ballet, hip-hop, classical dance, or traditional dances from all countries around the world.',
    },
    funFact: {
      fr: 'Les abeilles communiqués entre elles en faisant une petite danse spéciale pour dire où se trouvent les fleurs !',
      en: 'Bees communicate with each other by doing a special little dance to say where the flowers are!',
    },
    sections: [
      {
        icon: '💃',
        title: { fr: 'Le corps en mouvement', en: 'Body in motion' },
        content: {
          fr: "La danse est une façon joyeuse de faire bouger son corps en suivant le rythme de la musique.",
          en: "Dancing is a joyful way to move your body following the rhythm of the music."
        }
      },
      {
        icon: '🩰',
        title: { fr: 'Chacun sa danse', en: 'Everyone dances' },
        content: {
          fr: "Il existe mille styles : tourner sur les pointes, sauter en hip-hop ou danser en ronde avec ses amis.",
          en: "There are a thousand styles: spinning on tiptoes, jumping in hip-hop, or dancing in a circle."
        }
      },
      {
        icon: '✨',
        title: { fr: 'Raconter sans parler', en: 'Storytelling without words' },
        content: {
          fr: "Avec ses bras, ses jambes et son sourire, on peut exprimer ses émotions et partager sa joie.",
          en: "With arms, legs, and a smile, you can express your feelings and share pure joy."
        }
      },
      {
        icon: '💓',
        title: { fr: 'Le cœur en fête', en: 'A dancing heart' },
        content: {
          fr: "Danser donne de l'énergie, muscle le corps et fait battre ton cœur au tempo de la chanson !",
          en: "Dancing provides energy, strengthens the body, and makes your heart beat to the song's tempo!"
        }
      }
    ],
    relatedTopicIds: ['musique', 'coeur']
  },
  {
    id: 'sculpture',
    title: { fr: 'La Sculpture', en: 'Sculpture' },
    category: { fr: 'Arts & Culture 🎨', en: 'Arts & Culture 🎨' },
    categoryKey: 'arts',
    icon: '🗿',
    shortDesc: {
      fr: 'Créer des objets en 3 dimensions dans la matière.',
      en: 'Creating 3D objects from materials.',
    },
    fullContent: {
      fr: "Les sculpteurs transforment des blocs de pierre, de bois, de terre ou même de métal pour créer des formes. Contrairement à la peinture, on peut tourner autour d'une sculpture pour la voir de tous les côtés !",
      en: 'Sculptors transform blocks of stone, wood, clay, or even metal to create shapes. Unlike painting, you can walk around a sculpture to see it from all sides!',
    },
    funFact: {
      fr: 'Certains artistes sculptent des statues gigantesques directement dans la glace en hiver !',
      en: 'Some artists sculpt giant statues directly into ice in winter!',
    },
    sections: [
      {
        icon: '🗿',
        title: { fr: "L'art en trois dimensions", en: "Art in three dimensions" },
        content: {
          fr: "Contrairement à un dessin ou un tableau plat, une sculpture possède du volume. On peut tourner tout autour pour admirer ses reliefs, ses ombres et ses différentes faces.",
          en: "Unlike a flat painting or drawing, a sculpture has volume and depth. You can walk all the way around it to admire its curves, shadows, and textures."
        }
      },
      {
        icon: '🪨',
        title: { fr: "Tailler la pierre et le bois", en: "Carving stone and wood" },
        content: {
          fr: "Avec un marteau et un ciseau, l'artiste retire de la matière dans un bloc de marbre, de calcaire ou de bois. Petit à petit, la statue cachée dans le bloc apparaît.",
          en: "Using a mallet and sharp chisels, an artist chips away stone or wood. Stroke by stroke, the statue hidden inside the block slowly emerges into view."
        }
      },
      {
        icon: '🏺',
        title: { fr: "Modeler la terre souple", en: "Modeling soft clay" },
        content: {
          fr: "On peut aussi sculpter en ajoutant de la matière ! Avec de l'argile ou de la cire, l'artiste malaxe et pétrit la pâte avec ses doigts pour créer des silhouettes pleines de vie.",
          en: "Sculptors can also build shapes by adding material! Using soft clay or wax, they knead and pinch with their hands to form expressive, lifelike figures."
        }
      },
      {
        icon: '✨',
        title: { fr: "Métal et inventions modernes", en: "Metal and modern creations" },
        content: {
          fr: "Les sculpteurs utilisent également le bronze fondu, le fer soudé, le plâtre ou même des objets du quotidien assemblés pour inventer des œuvres surprenantes.",
          en: "Artists also pour molten bronze, weld iron, shape plaster, or assemble everyday objects together to create surprising modern masterpieces."
        }
      }
    ],
    relatedTopicIds: ['peinture', 'pyramides']
  },
  {
    id: 'theatre',
    title: { fr: 'Le Théâtre', en: 'Theater' },
    category: { fr: 'Arts & Culture 🎨', en: 'Arts & Culture 🎨' },
    categoryKey: 'arts',
    icon: '🎭',
    shortDesc: {
      fr: 'Jouer une pièce sur scène devant un public.',
      en: 'Performing a play on stage in front of an audience.',
    },
    fullContent: {
      fr: 'Au théâtre, des comédiens montent sur scène pour jouer une histoire en direct devant les spectateurs. On utilise des costumes, des décors et parfois des masques pour changer de personnage.',
      en: 'In the theater, actors go on stage to perform a story live in front of an audience. They use costumes, sets, and sometimes masks to change characters.',
    },
    funFact: {
      fr: "Dans la Grèce antique, les théâtres étaient si grands qu'ils pouvaient accueillir des milliers de personnes !",
      en: 'In ancient Greece, theaters were so large that they could hold thousands of people!',
    },
    sections: [
      {
        icon: '🎭',
        title: { fr: 'La magie de la scène', en: 'The magic of the stage' },
        content: {
          fr: 'Sur une estrade éclairée appelée la scène, des comédiens parlent, bougent et jouent ensemble pour raconter une histoire vivante.',
          en: 'On a brightly lit wooden stage, actors speak, move, and play together to bring a lively story to life.',
        },
      },
      {
        icon: '👗',
        title: { fr: 'Changer de personnage', en: 'Becoming a character' },
        content: {
          fr: 'Grâce à des déguisements colorés, du maquillage ou des masques, les acteurs se transforment tour à tour en chevaliers, fées ou animaux rigolos.',
          en: 'Using colorful costumes, makeup, or masks, actors transform into knights, fairies, or funny animals right before our eyes.',
        },
      },
      {
        icon: '👏',
        title: { fr: 'Le public au rendez-vous', en: 'An eager audience' },
        content: {
          fr: 'Assis dans la salle, les spectateurs écoutent, rient ou s’émerveillent en direct avant d’applaudir chaleureusement à la fin du spectacle.',
          en: 'Sitting in the audience, viewers listen, laugh, and gasp with excitement before clapping warmly when the curtains close.',
        },
      },
      {
        icon: '🏛️',
        title: { fr: 'Des histoires partagées depuis toujours', en: 'Stories shared across ages' },
        content: {
          fr: 'Depuis l’Antiquité, de nombreux peuples se réunissaient en plein air pour jouer des pièces, créant un art du spectacle partagé à travers le monde.',
          en: 'Since ancient times, people in many cultures gathered in open-air arenas to perform plays, creating a shared art loved worldwide.',
        },
      },
    ],
    relatedTopicIds: ['grece-antique', 'danse'],
  },
  {
    id: 'architecture',
    title: { fr: "L'Architecture", en: 'Architecture' },
    category: { fr: 'Arts & Culture 🎨', en: 'Arts & Culture 🎨' },
    categoryKey: 'arts',
    icon: '🏰',
    shortDesc: {
      fr: "L'art de dessiner et construire des bâtiments.",
      en: 'The art of designing and building structures.',
    },
    fullContent: {
      fr: "L'architecture, c'est l'art de concevoir des maisons, des écoles, des châteaux et même des gratte-ciels ! Les architectes doivent imaginer des bâtiments qui sont à la fois beaux et solides pour que l'on puisse y vivre en sécurité.",
      en: 'Architecture is the art of designing houses, schools, castles, and even skyscrapers! Architects must imagine buildings that are both beautiful and solid so we can live in them safely.',
    },
    funFact: {
      fr: "La Tour Eiffel a été construite pour une grande fête à Paris, et au début, beaucoup de gens ne l'aimaient pas !",
      en: "The Eiffel Tower was built for a big celebration in Paris, and at first, many people didn't like it!",
    },
    sections: [
      {
        icon: '📐',
        title: { fr: 'Imaginer des espaces', en: 'Designing spaces' },
        content: {
          fr: "L'architecture sert à concevoir des maisons, des écoles et des ponts adaptés à la vie quotidienne.",
          en: "Architecture designs homes, schools, and bridges suited for everyday life."
        }
      },
      {
        icon: '🧱',
        title: { fr: 'Solide et durable', en: 'Strong and durable' },
        content: {
          fr: "Les architectes choisissent de bons matériaux pour que les constructions restent stables et sécurisées.",
          en: "Architects choose reliable materials so that buildings remain stable and safe."
        }
      },
      {
        icon: '🎨',
        title: { fr: 'Le goût des formes', en: 'A feel for shapes' },
        content: {
          fr: "Bâtir est aussi un art où l'on joue avec la lumière, la hauteur et l'harmonie des volumes.",
          en: "Building is also an art playing with natural light, height, and balanced shapes."
        }
      },
      {
        icon: '🏙️',
        title: { fr: 'Des villes vivantes', en: 'Living cities' },
        content: {
          fr: "Chaque édifice participe au paysage de la ville pour accueillir les familles et les voyageurs.",
          en: "Each structure shapes the city landscape to welcome families and travelers."
        }
      }
    ],
    relatedTopicIds: ['chateaux', 'tour-eiffel', 'pyramides']
  },
  {
    id: 'photographie',
    title: { fr: 'La Photographie', en: 'Photography' },
    category: { fr: 'Arts & Culture 🎨', en: 'Arts & Culture 🎨' },
    categoryKey: 'arts',
    icon: '📸',
    shortDesc: { fr: 'Capturer un instant pour toujours.', en: 'Capturing a moment forever.' },
    fullContent: {
      fr: "La photographie permet de garder un souvenir d'un moment précis en capturant la lumière. Aujourd'hui, on utilise des appareils photos ou des téléphones, mais avant, il fallait attendre longtemps pour voir l'image apparaître !",
      en: 'Photography allows you to keep a memory of a specific moment by capturing light. Today, we use cameras or phones, but before, you had to wait a long time for the image to appear!',
    },
    funFact: {
      fr: "La toute première photo de l'histoire a mis 8 heures à être prise. Il ne fallait surtout pas bouger !",
      en: 'The very first photo in history took 8 hours to be taken. You had to stay perfectly still!',
    },
    sections: [
      {
        icon: '☀️',
        title: { fr: 'Peindre avec la lumière', en: 'Painting with light' },
        content: {
          fr: "Le mot photographie signifie 'écrire avec la lumière'. Les artistes jouent avec le soleil et les ombres pour créer de superbes images.",
          en: "The word photography means 'drawing with light'. Artists play with sunshine and shadow to create beautiful visual scenes."
        }
      },
      {
        icon: '⏱️',
        title: { fr: 'Figer un instant magique', en: 'Freezing a magical moment' },
        content: {
          fr: "Un sourire éclatant, un plongeon ou un oiseau en vol : la photo permet d'arrêter le temps pour admirer des instants précieux.",
          en: 'A bright smile, a splash, or a soaring bird: photography freezes time so we can cherish fleeting, magical moments.'
        }
      },
      {
        icon: '🖼️',
        title: { fr: 'Choisir son cadrage', en: 'Framing the shot' },
        content: {
          fr: "Comme un peintre, le photographe choisit son point de vue. Il s'accroupit ou s'approche pour donner de l'émotion à son image.",
          en: 'Like a painter, the photographer chooses a perspective. Crouching or stepping close gives unique emotion to every picture.'
        }
      },
      {
        icon: '🌍',
        title: { fr: 'Raconter le monde', en: "Telling the world's stories" },
        content: {
          fr: "Les photos nous font voyager dans des pays lointains et découvrir des animaux rares ou de grands moments de notre histoire.",
          en: 'Photographs take us on journeys to distant lands, introducing rare animals and unforgettable moments in human history.'
        }
      }
    ],
    relatedTopicIds: ['appareil-photo', 'cinema', 'peinture'],
  },
  {
    id: 'litterature',
    title: { fr: 'Les Livres', en: 'Books' },
    category: { fr: 'Arts & Culture 🎨', en: 'Arts & Culture 🎨' },
    categoryKey: 'arts',
    icon: '📚',
    shortDesc: {
      fr: "Le pouvoir de l'imagination et des mots.",
      en: 'The power of imagination and words.',
    },
    fullContent: {
      fr: 'Les livres nous transportent dans des mondes imaginaires. Les auteurs utilisent des mots pour créer des aventures, des poésies ou des documentaires. Lire permet de voyager sans bouger de son fauteuil !',
      en: 'Books transport us to imaginary worlds. Authors use words to create adventures, poetry, or documentaries. Reading allows you to travel without leaving your chair!',
    },
    funFact: {
      fr: "Le livre le plus traduit au monde après la Bible est 'Le Petit Prince', une histoire magique écrite par un aviateur !",
      en: "The most translated book in the world after the Bible is 'The Little Prince', a magical story written by an aviator!",
    },
    sections: [
      {
        icon: '📖',
        title: { fr: 'Ouvrir un livre magique', en: 'Opening a magical book' },
        content: {
          fr: "Dès que l'on tourne les pages, les mots se transforment en images dans notre tête pour raconter de grandes aventures.",
          en: 'As soon as you turn the pages, words turn into pictures in your head to tell wonderful adventures.'
        }
      },
      {
        icon: '✍️',
        title: { fr: "L'art des écrivains", en: 'The craft of storytellers' },
        content: {
          fr: "Les auteurs choisissent chaque mot avec soin pour imaginer des héros courageux, des pays fantastiques ou expliquer les sciences.",
          en: 'Authors choose each word carefully to imagine brave heroes, fantastic lands, or explain sciences.'
        }
      },
      {
        icon: '🚀',
        title: { fr: 'Voyager sans bouger', en: 'Traveling without moving' },
        content: {
          fr: "Un bon livre permet d'explorer le fond des mers ou les étoiles lointaines tout en restant confortablement assis dans son fauteuil.",
          en: 'A good book lets you explore the deep sea or distant stars while staying comfortably seated in your armchair.'
        }
      },
      {
        icon: '📚',
        title: { fr: 'Des trésors pour la vie', en: 'Treasures for a lifetime' },
        content: {
          fr: "Dans les bibliothèques, des milliers d'histoires attendent les curieux. Chacune partage des émotions et des découvertes précieuses.",
          en: 'In libraries, thousands of stories wait for curious readers. Each one shares emotions and precious discoveries.'
        }
      }
    ],
    relatedTopicIds: ['imprimerie', 'bd-manga', 'theatre'],
  },
  {
    id: 'bd-manga',
    title: { fr: 'La Bande Dessinée', en: 'Comics' },
    category: { fr: 'Arts & Culture 🎨', en: 'Arts & Culture 🎨' },
    categoryKey: 'arts',
    icon: '📖',
    shortDesc: {
      fr: 'Raconter des histoires avec des dessins et des bulles.',
      en: 'Telling stories with drawings and speech bubbles.',
    },
    fullContent: {
      fr: "La BD est un mélange génial de dessin et d'écriture. On utilise des cases pour montrer l'action et des 'bulles' pour faire parler les personnages. Qu'il s'agisse de super-héros, de mangas ou d'aventures, c'est un art qu'on appelle le 9ème art !",
      en: "Comics are a brilliant mix of drawing and writing. We use panels to show the action and 'bubbles' to make the characters speak. Whether it's superheroes, manga, or adventures, it's an art called the 9th art!",
    },
    funFact: {
      fr: "En Belgique et en France, on adore tellement la BD qu'il existe des murs entiers peints avec des personnages célèbres comme Tintin ou Astérix !",
      en: 'In Belgium and France, people love comics so much that there are entire walls painted with famous characters like Tintin or Asterix!',
    },
    sections: [
      {
        icon: '🖼️',
        title: { fr: 'Raconter en images', en: 'Stories told in pictures' },
        content: {
          fr: "La bande dessinée raconte une histoire case après case. Chaque dessin montre un moment précis de l'action, un peu comme les images d'un dessin animé qu'on lit à son rythme.",
          en: 'Comics tell stories frame by frame. Each panel shows a specific moment in the action, just like animation frames that you can read at your own pace.'
        }
      },
      {
        icon: '💬',
        title: { fr: 'Bulles et bruits dessinés', en: 'Speech bubbles and sounds' },
        content: {
          fr: "Pour faire parler les héros, les dessinateurs utilisent des bulles avec une petite pointe. Ils ajoutent aussi des mots comme 'BOUM' ou 'CRAC' pour faire entendre les bruits.",
          en: 'To make characters speak, artists draw speech bubbles with a little tail. They also add sound words like \'BOOM\' or \'CRACK\' so readers can hear the action.'
        }
      },
      {
        icon: '🌏',
        title: { fr: 'Des styles autour du monde', en: 'Styles around the world' },
        content: {
          fr: "La bande dessinée existe sous plusieurs formes : les albums en Europe, les comics de super-héros en Amérique et les mangas au Japon qui se lisent de droite à gauche.",
          en: 'Comics exist in many forms: albums in Europe, superhero comic books in America, and Japanese manga that are read from right to left.'
        }
      },
      {
        icon: '🎨',
        title: { fr: 'Le neuvième art', en: 'The ninth art' },
        content: {
          fr: "Créer une bande dessinée demande un vrai travail entre les scénaristes, les dessinateurs et les coloristes. On appelle souvent cette création le neuvième art.",
          en: 'Making a comic requires close teamwork between writers, artists, and colorists. People often celebrate this great form of art as the ninth art.'
        }
      }
    ],
    relatedTopicIds: ['peinture', 'cinema'],
  },
  {
    id: 'cirque',
    title: { fr: 'Le Cirque', en: 'The Circus' },
    category: { fr: 'Arts & Culture 🎨', en: 'Arts & Culture 🎨' },
    categoryKey: 'arts',
    icon: '🎪',
    shortDesc: {
      fr: 'Un spectacle magique sous un grand chapiteau.',
      en: 'A magical show under a big tent.',
    },
    fullContent: {
      fr: "Le cirque est un art du spectacle très ancien. Des acrobates, des jongleurs, des clowns et des magiciens travaillent ensemble pour nous impressionner et nous faire rire. C'est un monde de couleurs et de prouesses physiques incroyables !",
      en: "The circus is a very ancient performing art. Acrobats, jugglers, clowns, and magicians work together to impress us and make us laugh. It's a world of color and incredible physical feats!",
    },
    funFact: {
      fr: "Le plus grand chapiteau de cirque du monde peut être aussi grand qu'un terrain de football !",
      en: 'The largest circus tent in the world can be as big as a football field!',
    },
    sections: [
      {
        icon: '🎪',
        title: { fr: "La piste aux étoiles", en: "Under the big top" },
        content: {
          fr: "Sous un grand chapiteau coloré, la piste circulaire s'illumine. Le public s'installe tout autour pour assister à une fête pleine de surprises, de lumières et de musique entraînante.",
          en: "Beneath a colorful big top tent, the circular ring lights up. The audience gathers all around to enjoy a festive celebration filled with bright lights, music, and wonders."
        }
      },
      {
        icon: '🤸',
        title: { fr: "Acrobates et équilibristes", en: "Acrobats and balance artists" },
        content: {
          fr: "Des trapézistes s'élancent haut dans les airs tandis que des funambules avancent avec précision sur un fil. Ces artistes s'entraînent chaque jour pour maîtriser leur équilibre.",
          en: "Trapeze artists soar high into the air while tightrope walkers glide along thin wires. These skilled performers train every day to master perfect strength and balance."
        }
      },
      {
        icon: '🤹',
        title: { fr: "L'art du jonglage", en: "The art of juggling" },
        content: {
          fr: "Avec des balles, des anneaux ou des quilles, les jongleurs font danser les objets à toute vitesse sans jamais les laisser tomber. C'est un exercice fascinant de rythme et d'agilité.",
          en: "Using bouncy balls, shiny rings, or clubs, jugglers keep objects swirling rapidly in rhythm without dropping them. It is a captivating display of focus and agility."
        }
      },
      {
        icon: '🤡',
        title: { fr: "Le rire et la complicité", en: "Laughter and clowns" },
        content: {
          fr: "Les clowns apportent rires et poésie en jouant la comédie avec malice. Dans la troupe, chaque artiste s'entraide avec confiance pour offrir un spectacle collectif inoubliable.",
          en: "Clowns bring playful comedy, poetry, and huge smiles to everyone. Within the troupe, every performer supports their partners to create an unforgettable collective show."
        }
      }
    ],
    relatedTopicIds: ['theatre', 'musique']
  },
  {
    id: 'jeu-video',
    title: { fr: 'Le Jeu Vidéo', en: 'Video Games' },
    category: { fr: 'Arts & Culture 🎨', en: 'Arts & Culture 🎨' },
    categoryKey: 'arts',
    icon: '🎮',
    shortDesc: { fr: "L'art de créer des mondes interactifs.", en: 'The art of creating interactive worlds.' },
    fullContent: {
      fr: "Le jeu vidéo est souvent appelé le 10ème art. Il mélange le dessin, la musique, le cinéma et la programmation pour nous permettre de devenir le héros d'une aventure. C'est un art interactif car c'est toi qui décides de ce que fait le personnage !",
      en: "Video games are often called the 10th art. They mix drawing, music, cinema, and programming to let us become the hero of an adventure. It's an interactive art because you decide what the character does!",
    },
    funFact: {
      fr: "Le premier jeu vidéo s'appelait 'Pong' et c'était juste un petit carré blanc qui servait de balle de tennis sur un écran noir !",
      en: "The first video game was called 'Pong' and it was just a small white square that served as a tennis ball on a black screen!",
    },
    sections: [
      {
        icon: '🎮',
        title: { fr: 'Jouer et imaginer', en: 'Play and imagine' },
        content: {
          fr: "Le jeu vidéo combine dessins animés, sons et règles amusantes pour créer un univers où le joueur participe à l'action.",
          en: 'Video games combine animation, sound, and fun rules to create worlds where the player takes part in the action.'
        }
      },
      {
        icon: '🎨',
        title: { fr: "Un travail d'artistes", en: 'The work of artists' },
        content: {
          fr: 'Des dessinateurs, musiciens et scénaristes imaginent ensemble des décors fabuleux et des héros attachants.',
          en: 'Artists, musicians, and writers work together to create marvelous backgrounds and lovable heroes.'
        }
      },
      {
        icon: '💻',
        title: { fr: 'Le secret du code', en: 'The secret of code' },
        content: {
          fr: "Les développeurs écrivent des lignes de code pour indiquer à la console ou à l'ordinateur ce qui doit se passer à chaque saut.",
          en: 'Developers write lines of code to tell consoles and computers what should happen with every single jump.'
        }
      },
      {
        icon: '🤝',
        title: { fr: 'Partager une partie', en: 'Playing together' },
        content: {
          fr: 'À plusieurs sur un même écran ou à distance, les jeux permettent de coopérer, de relever des défis et de bien rigoler.',
          en: 'Together on one screen or across the globe, games let us cooperate, take on fun challenges, and share laughs.'
        }
      }
    ],
    relatedTopicIds: ['cinema', 'musique', 'bd-manga'],
  },
] as const
