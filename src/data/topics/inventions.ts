

export const inventions = [
  {
    id: 'ampoule',
    title: { fr: "L'Ampoule", en: 'The Light Bulb' },
    category: { fr: 'Inventions 💡', en: 'Inventions 💡' },
    categoryKey: 'inventions',
    icon: '💡',
    shortDesc: {
      fr: 'Une petite boule de verre qui nous donne de la lumière.',
      en: 'A small glass ball that gives us light.',
    },
    fullContent: {
      fr: "L'ampoule électrique est née grâce aux recherches de nombreux inventeurs passionnés. Des pionniers comme Thomas Edison et Joseph Swan ont perfectionné cette idée pour éclairer nos nuits sans danger !",
      en: 'The electric light bulb was born thanks to the discoveries of many passionate inventors. Pioneers like Thomas Edison and Joseph Swan perfected this idea to safely light up our nights!',
    },
    funFact: {
      fr: 'Thomas Edison et son équipe de chercheurs ont testé plus de 1 000 matières différentes avant de trouver un filament qui brille longtemps !',
      en: 'Thomas Edison and his team of researchers tested more than 1,000 different materials before finding a filament that stayed lit for a long time!',
    },
    sections: [
      {
        icon: '💡',
        title: { fr: 'Éclairer la nuit', en: 'Lighting the night' },
        content: {
          fr: "Avant cette invention, les familles s'éclairaient difficilement le soir à l'aide de bougies ou de lampes à huile.",
          en: 'Before this invention, families struggled to light up the dark evening using candles and oil lamps.',
        },
      },
      {
        icon: '⚡',
        title: { fr: 'Le filament qui brille', en: 'The glowing filament' },
        content: {
          fr: 'En faisant passer du courant électrique dans un fil très fin, celui-ci chauffe fort et produit de la lumière.',
          en: 'By passing electric current through a very thin wire, it gets hot and glows brightly.',
        },
      },
      {
        icon: '🔬',
        title: { fr: 'Le travail de pionniers', en: 'The work of pioneers' },
        content: {
          fr: 'De nombreux chercheurs ont perfectionné cette idée pour fabriquer une ampoule en verre durable et sans danger.',
          en: 'Many inventive scientists improved this concept to produce a long-lasting and safe glass light bulb.',
        },
      },
      {
        icon: '🏠',
        title: { fr: 'La clarté d’un simple geste', en: 'Light at your fingertips' },
        content: {
          fr: "Désormais, il suffit d'appuyer sur un petit interrupteur mural pour illuminer instantanément toute la pièce.",
          en: 'Today, flipping a simple wall switch instantly floods the entire room with cheerful, clear light.',
        },
      },
    ],
    relatedTopicIds: ['soleil', 'ciel-bleu'],
  },
  {
    id: 'imprimerie',
    title: { fr: "L'Imprimerie", en: 'The Printing Press' },
    category: { fr: 'Inventions 💡', en: 'Inventions 💡' },
    categoryKey: 'inventions',
    icon: '📚',
    shortDesc: {
      fr: 'Une machine pour copier les livres rapidement.',
      en: 'A machine for copying books quickly.',
    },
    fullContent: {
      fr: "Avant Gutenberg et l'imprimerie, il fallait écrire tous les livres à la main ! Cela prenait des années pour copier un seul livre.",
      en: 'Before Gutenberg and the printing press, all books had to be written by hand! It took years to copy a single book.',
    },
    funFact: {
      fr: 'La Bible de Gutenberg est le premier livre important imprimé en Europe !',
      en: 'The Gutenberg Bible was the first major book printed in Europe!',
    },
    sections: [
      {
        icon: '✍️',
        title: { fr: 'Des livres écrits à la main', en: 'Handwritten books' },
        content: {
          fr: "Autrefois, chaque livre était recopié mot à mot à la plume. Cela prenait des mois de travail et les livres étaient très rares et précieux.",
          en: 'Long ago, every book had to be copied word by word with a quill. It took months of work, making books rare and precious.'
        }
      },
      {
        icon: '🔡',
        title: { fr: 'Les lettres en métal', en: 'Little metal letters' },
        content: {
          fr: "L'imprimerie utilise de petits tampons de métal pour chaque lettre. On peut les assembler pour écrire n'importe quelle histoire !",
          en: 'The printing press used movable metal stamps for each letter. Printers could arrange them to spell out any story!'
        }
      },
      {
        icon: '📰',
        title: { fr: 'Presser sur le papier', en: 'Pressing onto paper' },
        content: {
          fr: "En mettant de l'encre sur les lettres et en appuyant fort avec une presse en bois, la page s'imprime nettement en un clin d'œil.",
          en: 'By coating the letters in ink and pressing them down firmly onto paper, a whole page printed clearly in a flash.'
        }
      },
      {
        icon: '📖',
        title: { fr: 'Des livres pour tous', en: 'Books for everyone' },
        content: {
          fr: "Grâce à cette machine magique, les histoires et le savoir se sont répandus partout. Tout le monde a pu apprendre à lire et imaginer.",
          en: 'Thanks to this machine, knowledge and stories spread everywhere. Children and adults could learn to read and dream.'
        }
      }
    ],
    relatedTopicIds: ['appareil-photo', 'ecriture-sacree', 'bd-manga'],
  },
  {
    id: 'avion',
    title: { fr: "L'Avion", en: 'The Airplane' },
    category: { fr: 'Inventions 💡', en: 'Inventions 💡' },
    categoryKey: 'inventions',
    icon: '✈️',
    shortDesc: {
      fr: 'Une machine incroyable qui peut voler comme un oiseau.',
      en: 'An incredible machine that can fly like a bird.',
    },
    fullContent: {
      fr: "L'avion a été inventé pour permettre aux humains de voyager très vite et très loin dans le ciel. Les frères Wright ont réussi le premier vol motorisé en 1903. Aujourd'hui, on peut traverser des océans en quelques heures !",
      en: 'The airplane was invented to allow humans to travel very fast and very far in the sky. The Wright brothers achieved the first motorized flight in 1903. Today, we can cross oceans in a few hours!',
    },
    funFact: {
      fr: "Le premier vol des frères Wright n'a duré que 12 secondes et a parcouru 36 mètres, soit moins que la longueur d'un avion moderne !",
      en: "The Wright brothers' first flight lasted only 12 seconds and covered 36 meters, which is less than the length of a modern airplane!",
    },
    sections: [
      {
        id: 'reve_de_voler',
        icon: '✈️',
        title: { fr: 'Voler comme un oiseau', en: 'Flying like a bird' },
        content: {
          fr: "L'avion est une extraordinaire machine volante inventée pour voyager rapidement au-dessus des nuages et des mers.",
          en: 'The airplane is an amazing flying machine invented to travel quickly high above clouds and oceans.',
        },
      },
      {
        id: 'ailes_et_portance',
        icon: '🪶',
        title: { fr: 'Le secret des ailes', en: 'The secret of wings' },
        content: {
          fr: "Leurs ailes courbées fendent l'air à grande vitesse, créant une force vers le haut qui porte l'avion.",
          en: "Their curved wings cut through air quickly, creating an upward force that lifts the whole plane.",
        },
      },
      {
        id: 'moteurs_puissants',
        icon: '🚀',
        title: { fr: 'La force des réacteurs', en: 'The power of jet engines' },
        content: {
          fr: "De puissants moteurs poussent l'avion très fort en avant pour lui donner toute la vitesse nécessaire.",
          en: 'Mighty engines push the aircraft forward powerfully to give it all the necessary speed to rise.',
        },
      },
      {
        id: 'voyages_lointains',
        icon: '🌍',
        title: { fr: 'Faire le tour du monde', en: 'Traveling the globe' },
        content: {
          fr: 'Grâce à cette invention, les familles peuvent traverser des pays entiers en seulement quelques heures de vol.',
          en: 'Thanks to this invention, families can cross entire continents and oceans in just a few flight hours.',
        },
      },
    ],
    relatedTopicIds: ['roue', 'velo'],
  },
  {
    id: 'telephone',
    title: { fr: 'Le Téléphone', en: 'The Telephone' },
    category: { fr: 'Inventions 💡', en: 'Inventions 💡' },
    categoryKey: 'inventions',
    icon: '☎️',
    shortDesc: {
      fr: "Une invention pour parler à quelqu'un de très loin.",
      en: 'An invention for talking to someone from very far away.',
    },
    fullContent: {
      fr: "Le téléphone a été inventé par Alexander Graham Bell il y a plus de 140 ans. Au début, les téléphones étaient reliés par des fils, mais aujourd'hui, nous avons des téléphones portables que l'on peut emmener partout !",
      en: 'The telephone was invented by Alexander Graham Bell over 140 years ago. At first, telephones were connected by wires, but today, we have mobile phones that we can take anywhere!',
    },
    funFact: {
      fr: "Le premier mot prononcé au téléphone était : 'Monsieur Watson, venez ici, je veux vous voir !'",
      en: "The first words spoken on the telephone were: 'Mr. Watson, come here, I want to see you!'",
    },
    sections: [
      {
        icon: '🗣️',
        title: { fr: 'Faire voyager la voix', en: 'Sending voice afar' },
        content: {
          fr: "Le téléphone permet de transformer le son de notre voix en signal pour parler avec une personne éloignée.",
          en: "The telephone turns our voice into signals to talk with someone far away."
        }
      },
      {
        icon: '💡',
        title: { fr: 'Une aventure de plusieurs savants', en: 'An adventure of many inventors' },
        content: {
          fr: "Plusieurs chercheurs passionnés ont imaginé différents systèmes au fil du temps pour transmettre les paroles.",
          en: "Several passionate researchers imagined different systems over time to transmit spoken words."
        }
      },
      {
        icon: '☎️',
        title: { fr: 'Des premiers fils aux combinés', en: 'From early wires to handsets' },
        content: {
          fr: "Les premiers appareils utilisaient de longs câbles, une cloche pour sonner et un cadran rond que l'on tournait.",
          en: "Early devices used long cables, a ringing bell, and a round rotary dial to turn."
        }
      },
      {
        icon: '📱',
        title: { fr: "Les petits téléphones d'aujourd'hui", en: "Today's pocket phones" },
        content: {
          fr: "Aujourd'hui, les téléphones sans fil voyagent dans notre poche et permettent aussi d'envoyer des photos.",
          en: "Today, wireless phones fit in our pocket and also let us send photos."
        }
      }
    ],
    relatedTopicIds: ['ampoule', 'roue']
  },
  {
    id: 'internet',
    title: { fr: "L'Internet", en: 'The Internet' },
    category: { fr: 'Inventions 💡', en: 'Inventions 💡' },
    categoryKey: 'inventions',
    icon: '🌐',
    shortDesc: {
      fr: 'Un réseau géant qui relie tous les ordinateurs du monde.',
      en: 'A giant network that connects all the computers in the world.',
    },
    fullContent: {
      fr: "L'Internet permet de partager des informations, de regarder des vidéos, de jouer à des jeux et de parler à des amis tout autour de la Terre. C'est comme une bibliothèque géante ouverte tout le temps !",
      en: "The Internet allows us to share information, watch videos, play games, and talk to friends all around the Earth. It's like a giant library open all the time!",
    },
    funFact: {
      fr: "La première version d'Internet s'appelait ARPANET et a été créée pour l'armée américaine !",
      en: 'The first version of the Internet was called ARPANET and was created for the US military!',
    },
    sections: [
      {
        icon: '🌐',
        title: { fr: 'Une toile invisible', en: 'An invisible web' },
        content: {
          fr: "L'Internet est un immense réseau de câbles et d'ondes qui relie les ordinateurs et téléphones de la planète entière.",
          en: 'The Internet is a huge network of cables and waves connecting computers and phones across the entire planet.'
        }
      },
      {
        icon: '⚡',
        title: { fr: "L'information à toute allure", en: 'Information at light speed' },
        content: {
          fr: "Des messages, des photos et des vidéos voyagent en quelques fractions de seconde sous les océans et dans les airs.",
          en: 'Messages, pictures, and videos travel in fractions of a second under oceans and through the air.'
        }
      },
      {
        icon: '📚',
        title: { fr: 'Une bibliothèque sans limites', en: 'A boundless library' },
        content: {
          fr: "Grâce à Internet, on peut apprendre des millions de choses, visiter des musées virtuels et poser des questions fascinantes.",
          en: 'Thanks to the Internet, we can learn millions of things, tour virtual museums, and ask fascinating questions.'
        }
      },
      {
        icon: '🤝',
        title: { fr: 'Partager avec le monde', en: 'Connecting with the world' },
        content: {
          fr: "Ce réseau permet aussi de parler en direct à des amis ou des grands-parents qui habitent à l'autre bout de la Terre.",
          en: 'This network also lets you chat in real time with friends or grandparents living on the other side of the Earth.'
        }
      }
    ],
    relatedTopicIds: ['telephone', 'imprimerie', 'appareil-photo'],
  },
  {
    id: 'roue',
    title: { fr: 'La Roue', en: 'The Wheel' },
    category: { fr: 'Inventions 💡', en: 'Inventions 💡' },
    categoryKey: 'inventions',
    icon: '🎡',
    shortDesc: {
      fr: "L'une des inventions les plus anciennes et utiles.",
      en: 'One of the oldest and most useful inventions.',
    },
    fullContent: {
      fr: "La roue a été inventée il y a plus de 5 000 ans ! Elle a permis de transporter des objets lourds beaucoup plus facilement. Sans la roue, il n'y aurait ni voitures, ni vélos, ni même d'engrenages dans les montres.",
      en: 'The wheel was invented more than 5,000 years ago! It allowed heavy objects to be transported much more easily. Without the wheel, there would be no cars, bikes, or even gears in watches.',
    },
    funFact: {
      fr: "Les premières roues n'étaient pas faites pour les voitures, mais pour fabriquer des poteries !",
      en: 'The first wheels were not made for cars, but for making pottery!',
    },
    sections: [
      {
        icon: '🛞',
        title: { fr: 'Un cercle magique', en: 'A magical circle' },
        content: {
          fr: "La roue est un disque tout rond qui tourne sur un axe pour faire rouler les objets.",
          en: "The wheel is a perfectly round disc that spins on an axle to make objects roll."
        }
      },
      {
        icon: '📦',
        title: { fr: 'Transporter sans effort', en: 'Moving heavy loads' },
        content: {
          fr: "Grâce à elle, déplacer de lourdes charges devient facile car elle glisse sans frotter par terre.",
          en: "Thanks to it, moving heavy loads becomes easy because it rolls without dragging on the ground."
        }
      },
      {
        icon: '⏳',
        title: { fr: 'Une idée millénaire', en: 'An ancient idea' },
        content: {
          fr: "Inventée il y a plus de 5 000 ans, elle a d'abord servi aux potiers avant d'équiper les chariots.",
          en: "Invented over 5,000 years ago, it was first used by potters before equipping carts."
        }
      },
      {
        icon: '🚲',
        title: { fr: 'Partout avec toi', en: 'Everywhere with you' },
        content: {
          fr: "On la retrouve aujourd'hui sur ton vélo, dans les voitures, les trains et même sur ta trottinette !",
          en: "You find it today on your bike, in cars, trains, and even on your scooter!"
        }
      }
    ],
    relatedTopicIds: ['velo', 'pyramides']
  },
  {
    id: 'velo',
    title: { fr: 'Le Vélo', en: 'The Bicycle' },
    category: { fr: 'Inventions 💡', en: 'Inventions 💡' },
    categoryKey: 'inventions',
    icon: '🚲',
    shortDesc: {
      fr: 'Une machine qui avance grâce à la force de tes jambes.',
      en: 'A machine that moves thanks to the strength of your legs.',
    },
    fullContent: {
      fr: "Le vélo a beaucoup changé depuis son invention ! Au début, il n'avait pas de pédales et on avançait en poussant avec ses pieds sur le sol. Ensuite, il y a eu le 'Grand Bi' avec une roue immense devant. Aujourd'hui, avec sa chaîne et ses vitesses, c'est le moyen de transport le plus écologique !",
      en: "The bicycle has changed a lot since its invention! At first, it had no pedals and you moved by pushing with your feet on the ground. Then came the 'Penny-farthing' with a huge front wheel. Today, with its chain and gears, it's the most ecological way to travel!",
    },
    funFact: {
      fr: "Le tout premier vélo s'appelait une 'draisienne' et il était entièrement fabriqué en bois !",
      en: "The very first bicycle was called a 'dandy horse' and it was made entirely of wood!",
    },
    sections: [
      {
        icon: '🚲',
        title: { fr: 'Deux roues en liberté', en: 'Two wheels of freedom' },
        content: {
          fr: "Le vélo est un véhicule ingénieux à deux roues qui avance grâce à la force de tes jambes.",
          en: "The bicycle is a clever two-wheeled vehicle that moves forward with your leg power."
        }
      },
      {
        icon: '⚙️',
        title: { fr: 'Pédales et chaîne', en: 'Pedals and chain' },
        content: {
          fr: "Quand tu appuies sur les pédales, la chaîne tourne et fait tourner la roue arrière pour avancer.",
          en: "When you push the pedals, the chain spins and turns the back wheel to move you forward."
        }
      },
      {
        icon: '❤️',
        title: { fr: 'Bon pour ton cœur', en: 'Good for your heart' },
        content: {
          fr: "Pédaler au grand air entraîne ton cœur, muscle tes jambes et te remplit d'une belle énergie.",
          en: "Pedaling outdoors trains your heart, builds leg muscle, and fills you with great energy."
        }
      },
      {
        icon: '🌱',
        title: { fr: 'Ami de la nature', en: 'Friend of nature' },
        content: {
          fr: "Le vélo ne rejette aucune fumée et ne pollue pas : c'est le meilleur ami de notre planète !",
          en: "The bike releases no smoke and does not pollute: it is the best friend of our planet!"
        }
      }
    ],
    relatedTopicIds: ['roue', 'coeur']
  },
  {
    id: 'appareil-photo',
    title: { fr: "L'Appareil Photo", en: 'The Camera' },
    category: { fr: 'Inventions 💡', en: 'Inventions 💡' },
    categoryKey: 'inventions',
    icon: '📸',
    shortDesc: {
      fr: 'La machine qui capture les images pour toujours.',
      en: 'The machine that captures images forever.',
    },
    fullContent: {
      fr: "Avant l'appareil photo, si on voulait une image de quelqu'un, il fallait dessiner son portrait ! L'invention de la photographie a permis de capturer la réalité grâce à la lumière. Aujourd'hui, les capteurs numériques remplacent la pellicule d'autrefois.",
      en: 'Before the camera, if you wanted a picture of someone, you had to draw their portrait! The invention of photography allowed reality to be captured through light. Today, digital sensors replace the old film.',
    },
    funFact: {
      fr: 'Les premiers photographes devaient transporter des produits chimiques très lourds et faire leurs mélanges juste avant de prendre la photo !',
      en: 'The first photographers had to carry very heavy chemicals and mix them just before taking the photo!',
    },
    sections: [
      {
        icon: '☀️',
        title: { fr: 'Attraper la lumière', en: 'Catching the light' },
        content: {
          fr: "Un appareil photo utilise une lentille pour faire entrer la lumière du monde extérieur. En ouvrant l'obturateur un tout petit instant, la lumière entre et dessine une image précise.",
          en: 'A camera uses a lens to let outside light inside. By opening the shutter for a tiny fraction of time, light enters and draws an exact picture.'
        }
      },
      {
        icon: '🔍',
        title: { fr: "L'œil de l'objectif", en: 'The lens eye' },
        content: {
          fr: "L'objectif est composé de verres arrondis qui concentrent les rayons lumineux. Il permet de régler la netteté pour que la photo soit parfaitement claire et détaillée.",
          en: 'The lens contains curved glass that focuses light rays. It adjusts the sharpness so the picture looks clear, crisp, and full of detail.'
        }
      },
      {
        icon: '🎞️',
        title: { fr: 'Des plaques à la pellicule', en: 'From plates to film' },
        content: {
          fr: "Autrefois, plusieurs inventeurs ont utilisé des plaques de métal puis des bobines de pellicule. Il fallait ensuite révéler les photos dans une pièce sombre avec des bains spéciaux.",
          en: 'Long ago, inventors used metal plates and later rolls of sensitive film. Photographers had to develop the images in dark rooms using special baths.'
        }
      },
      {
        icon: '📱',
        title: { fr: "L'image numérique", en: 'Instant digital shots' },
        content: {
          fr: "Aujourd'hui, un capteur électronique remplace la pellicule et transforme la lumière en pixels. La photo s'affiche aussitôt sur un écran d'ordinateur ou de téléphone.",
          en: 'Today, an electronic sensor replaces film and converts light into pixels. The picture appears right away on a computer screen or smartphone.'
        }
      }
    ],
    relatedTopicIds: ['telephone', 'ampoule'],
  },
  {
    id: 'telescope',
    title: { fr: 'Le Télescope', en: 'The Telescope' },
    category: { fr: 'Inventions 💡', en: 'Inventions 💡' },
    categoryKey: 'inventions',
    icon: '🔭',
    shortDesc: {
      fr: 'Un long tube pour regarder les étoiles de très près.',
      en: 'A long tube for looking at stars very closely.',
    },
    fullContent: {
      fr: "Le télescope a été perfectionné par Galilée. Grâce à lui, nous avons découvert que la Lune a des montagnes et que Jupiter a des lunes qui tournent autour d'elle. C'est l'outil indispensable des astronomes pour explorer l'univers sans quitter la Terre.",
      en: "The telescope was perfected by Galileo. Thanks to it, we discovered that the Moon has mountains and that Jupiter has moons orbiting it. It's the indispensable tool for astronomers to explore the universe without leaving Earth.",
    },
    funFact: {
      fr: "Il existe aujourd'hui des télescopes géants envoyés dans l'espace, comme James Webb, pour voir le début de l'univers !",
      en: 'Today, there are giant telescopes sent into space, like James Webb, to see the beginning of the universe!',
    },
    sections: [
      {
        icon: '🔭',
        title: { fr: 'Un grand collecteur de lumière', en: 'A giant light collector' },
        content: {
          fr: 'Le télescope utilise de grandes lentilles ou des miroirs pour attraper beaucoup plus de lumière que la petite pupille de notre œil.',
          en: 'A telescope uses large curved lenses or mirrors to gather far more light than the tiny pupil of our human eye.',
        },
      },
      {
        icon: '🔍',
        title: { fr: 'Révéler les détails cachés', en: 'Revealing hidden details' },
        content: {
          fr: 'En concentrant ces rayons lumineux, il fait grossir l’image d’un astre lointain pour rendre visibles des détails invisibles à l’œil nu.',
          en: 'By focusing those light rays, it magnifies the image of distant objects so we can observe details invisible to the naked eye.',
        },
      },
      {
        icon: '🌙',
        title: { fr: 'Le premier regard de Galilée', en: 'Galileo’s first gaze' },
        content: {
          fr: 'Quand Galilée a pointé sa lunette vers le ciel, il a aperçu pour la première fois les cratères de la Lune et les lunes de Jupiter.',
          en: 'When Galileo aimed his early telescope toward the sky, he saw the Moon’s rugged craters and Jupiter’s dancing moons for the first time.',
        },
      },
      {
        icon: '🛰️',
        title: { fr: 'Des observatoires en orbite', en: 'Observatories in orbit' },
        content: {
          fr: 'Aujourd’hui, des télescopes spatiaux flottent au-delà de l’air de la Terre pour photographier les étoiles sans aucun nuage pour les gêner.',
          en: 'Today, space telescopes orbit far above Earth’s atmosphere to photograph distant stars without clouds or air disturbing the view.',
        },
      },
    ],
    relatedTopicIds: ['la-lune', 'mars'],
  },
  {
    id: 'boussole',
    title: { fr: 'La Boussole', en: 'The Compass' },
    category: { fr: 'Inventions 💡', en: 'Inventions 💡' },
    categoryKey: 'inventions',
    icon: '🧭',
    shortDesc: {
      fr: 'Un petit objet pour toujours savoir où est le Nord.',
      en: 'A small object to always know where North is.',
    },
    fullContent: {
      fr: 'La boussole possède une aiguille aimantée qui pointe toujours vers le Pôle Nord de la Terre. Elle a été inventée en Chine il y a très longtemps. Grâce à elle, les marins ont pu traverser les océans sans se perdre, même quand il y avait du brouillard !',
      en: "The compass has a magnetic needle that always points to the Earth's North Pole. It was invented in China a long time ago. Thanks to it, sailors were able to cross oceans without getting lost, even when it was foggy!",
    },
    funFact: {
      fr: 'Avant la boussole, les marins devaient regarder les étoiles pour savoir où ils allaient !',
      en: 'Before the compass, sailors had to look at the stars to know where they were going!',
    },
    sections: [
      {
        icon: '🧭',
        title: { fr: 'Une aiguille aimantée', en: 'A magnetic needle' },
        content: {
          fr: "Au centre de la boussole, une fine aiguille pivote librement. Comme c'est un petit aimant, une de ses pointes est naturellement attirée vers le pôle Nord magnétique de notre planète.",
          en: "At the center of a compass, a slender needle pivots freely. Because it is a tiny magnet, one of its tips is naturally drawn toward our planet's magnetic North Pole."
        }
      },
      {
        icon: '🌍',
        title: { fr: 'L’aimant géant de la Terre', en: 'Earth’s giant magnet' },
        content: {
          fr: "Au cœur profond de la Terre, des métaux liquides en mouvement créent une force invisible appelée champ magnétique. C'est ce champ protecteur qui guide l'aiguille de toutes les boussoles.",
          en: "Deep inside the Earth, swirling liquid metals generate an invisible force called a magnetic field. This protective shield is what guides compass needles everywhere."
        }
      },
      {
        icon: '🗺️',
        title: { fr: 'Les quatre points cardinaux', en: 'The four directions' },
        content: {
          fr: "La boussole indique une direction constante, le Nord, et non la destination choisie. En observant le cadran, on repère facilement le Sud, l'Est et l'Ouest pour bien orienter sa carte.",
          en: "A compass shows a fixed direction, North, rather than your destination. By reading the dial, travelers easily identify South, East, and West to align their map correctly."
        }
      },
      {
        icon: '⛵',
        title: { fr: 'Naviguer sur les océans', en: 'Sailing the open seas' },
        content: {
          fr: "Inventée il y a très longtemps, la boussole a permis aux marins de s'aventurer en haute mer. Même sous un ciel très couvert ou en plein brouillard, les navires savaient toujours où ils voguaient.",
          en: "Invented long ago, the compass allowed sailors to venture into open waters. Even under dense clouds or heavy fog, ships could always find their way across the sea."
        }
      }
    ],
    relatedTopicIds: ['pirates', 'terre'],
  },
  {
    id: 'microscope',
    title: { fr: 'Le Microscope', en: 'The Microscope' },
    category: { fr: 'Inventions 💡', en: 'Inventions 💡' },
    categoryKey: 'inventions',
    icon: '🔬',
    shortDesc: {
      fr: "Une loupe super puissante pour voir l'invisible.",
      en: 'A super-powerful magnifying glass to see the invisible.',
    },
    fullContent: {
      fr: "Le microscope utilise des lentilles de verre pour agrandir des choses tellement petites que nos yeux ne peuvent pas les voir. Grâce à lui, on a découvert les microbes, les cellules et même comment sont faits les poils d'insectes !",
      en: 'The microscope uses glass lenses to enlarge things so small that our eyes cannot see them. Thanks to it, we discovered germs, cells, and even what insect hairs are made of!',
    },
    funFact: {
      fr: 'Avec un microscope puissant, on peut voir que ta peau ressemble à un mur de briques minuscules appelées cellules !',
      en: 'With a powerful microscope, you can see that your skin looks like a wall of tiny bricks called cells!',
    },
    sections: [
      {
        icon: '🔬',
        title: { fr: "Une fenêtre sur le minuscule", en: "A window to the tiny" },
        content: {
          fr: "Nos yeux ne peuvent pas distinguer les détails extrêmement fins. Le microscope optique utilise des lentilles de verre superposées pour faire paraître les petits éléments beaucoup plus grands.",
          en: "Our eyes cannot see extremely tiny details on their own. An optical microscope uses carefully aligned glass lenses to make small structures appear much larger."
        }
      },
      {
        icon: '💡',
        title: { fr: "La lumière qui éclaire l'échantillon", en: "Lighting up the specimen" },
        content: {
          fr: "Pour observer une goutte d'eau ou une lamelle d'oignon, on place une source de lumière en dessous. Les rayons traversent l'objet pour révéler sa structure interne.",
          en: "To examine a drop of pond water or a slice of onion skin, light shines from underneath. The beams pass through the specimen to reveal its internal details."
        }
      },
      {
        icon: '🧱',
        title: { fr: "La découverte des cellules", en: "Discovering living cells" },
        content: {
          fr: "Grâce à cette invention, les scientifiques ont pu découvrir que les plantes et les animaux sont composés de petites briques vivantes appelées des cellules.",
          en: "Thanks to this invention, scientists discovered that plants and animals are built from countless tiny living building blocks called cells."
        }
      },
      {
        icon: '🧪',
        title: { fr: "Comprendre le monde microscopique", en: "Exploring the hidden world" },
        content: {
          fr: "Le microscope permet d'observer des détails insoupçonnés, comme les nervures d'une plume ou certains micro-organismes. Pour les éléments encore plus petits, d'autres appareils plus complexes sont nécessaires.",
          en: "A microscope reveals hidden wonders like feather textures or tiny swimming microbes. For even smaller particles, more complex specialized tools are used."
        }
      }
    ],
    relatedTopicIds: ['telescope', 'yeux'],
  },
  {
    id: 'radio',
    title: { fr: 'La Radio', en: 'The Radio' },
    category: { fr: 'Inventions 💡', en: 'Inventions 💡' },
    categoryKey: 'inventions',
    icon: '📻',
    shortDesc: { fr: 'Pour écouter des voix et de la musique sans fils.', en: 'To listen to voices and music without wires.' },
    fullContent: {
      fr: "La radio permet d'envoyer des sons à travers l'air sous forme d'ondes invisibles. C'était la première fois qu'on pouvait entendre des nouvelles du monde entier ou de la musique en direct chez soi, bien avant la télévision et Internet !",
      en: 'Radio allows sounds to be sent through the air as invisible waves. It was the first time you could hear news from around the world or live music at home, long before TV and the Internet!',
    },
    funFact: {
      fr: "La Tour Eiffel a été sauvée de la destruction car elle servait d'antenne géante pour la radio !",
      en: 'The Eiffel Tower was saved from destruction because it served as a giant antenna for radio!',
    },
    sections: [
      {
        icon: '📡',
        title: { fr: "Des ondes qui voyagent dans l'air", en: 'Waves traveling through the air' },
        content: {
          fr: "La radio transforme les sons en ondes invisibles. Elles voyagent à la vitesse de la lumière dans l'air et traversent les toits des maisons.",
          en: 'Radio turns sounds into invisible waves. They travel at the speed of light through the air and right through the roofs of houses.'
        }
      },
      {
        icon: '🗼',
        title: { fr: 'Une antenne pour écouter', en: 'An antenna to listen' },
        content: {
          fr: "Pour recevoir le programme, le poste de radio utilise une antenne en métal. Elle attrape au vol les ondes qui passent dans les airs.",
          en: 'To catch the broadcast, a radio uses a metal antenna. It picks up the invisible waves flowing through the air.'
        }
      },
      {
        icon: '🔊',
        title: { fr: "La magie du haut-parleur", en: 'The magic of the speaker' },
        content: {
          fr: "L'appareil transforme ensuite le signal électrique en son. Une petite membrane vibre très vite pour faire entendre des voix et de la musique.",
          en: 'The radio then turns electric signals back into sound. A small membrane vibrates rapidly to play clear voices and music.'
        }
      },
      {
        icon: '🚗',
        title: { fr: 'Compagne de tous les voyages', en: 'A companion on every journey' },
        content: {
          fr: "On peut écouter la radio dans sa chambre ou en voiture sur la route. Même loin des villes, elle permet de partager de joyeuses histoires.",
          en: 'You can listen to the radio in your bedroom or during a car drive. Even far from cities, it brings news and cheerful stories.'
        }
      }
    ],
    relatedTopicIds: ['telephone', 'tour-eiffel', 'musique'],
  },
] as const
