

export const history = [
  {
    id: 'pyramides',
    title: { fr: 'Les Pyramides', en: 'The Pyramids' },
    category: { fr: 'Histoire 🏺', en: 'History 🏺' },
    categoryKey: 'histoire',
    icon: '🧱',
    shortDesc: {
      fr: "D'immenses tombeaux pour les pharaons d'Égypte.",
      en: 'Immense tombs for the pharaohs of Egypt.',
    },
    fullContent: {
      fr: "Construites il y a plus de 4 500 ans, les pyramides d'Égypte servaient de tombeaux aux pharaons. La plus grande est la pyramide de Khéops, faite de millions de blocs de pierre.",
      en: 'Built over 4,500 years ago, the Egyptian pyramids served as tombs for pharaohs. The largest is the Great Pyramid of Giza, made of millions of stone blocks.',
    },
    funFact: {
      fr: 'Il a fallu environ 20 ans et des milliers de personnes pour construire la Grande Pyramide !',
      en: 'It took about 20 years and thousands of people to build the Great Pyramid!',
    },
    sections: [
      {
        icon: '🏛️',
        title: { fr: 'Monuments du désert', en: 'Desert monuments' },
        content: {
          fr: "Les pyramides sont de gigantesques montagnes de pierre dressées dans le sable chaud d'Égypte.",
          en: "Pyramids are giant stone mountains standing tall in the warm sands of Egypt."
        }
      },
      {
        icon: '👑',
        title: { fr: 'Le repos des pharaons', en: 'Resting place of pharaohs' },
        content: {
          fr: "Elles ont été bâties il y a très longtemps comme demeures éternelles pour les rois d'Égypte.",
          en: "They were built very long ago as eternal resting homes for the kings of Egypt."
        }
      },
      {
        icon: '🧱',
        title: { fr: 'Des pierres colossales', en: 'Colossal stones' },
        content: {
          fr: "Des milliers d'ouvriers ont empilé des blocs lourds comme des éléphants avec une grande précision.",
          en: "Thousands of workers stacked blocks as heavy as elephants with great precision."
        }
      },
      {
        icon: '✨',
        title: { fr: 'Mystères et trésors', en: 'Mysteries and treasures' },
        content: {
          fr: "À l'intérieur se cachent des couloirs secrets et des dessins peints aux couleurs magnifiques.",
          en: "Inside lie hidden secret passages and drawings painted in gorgeous colors."
        }
      }
    ],
    relatedTopicIds: ['chateaux', 'prehistoire']
  },
  {
    id: 'chevaliers',
    title: { fr: 'Les Chevaliers', en: 'Knights' },
    category: { fr: 'Histoire 🏺', en: 'History 🏺' },
    categoryKey: 'histoire',
    icon: '🛡️',
    shortDesc: {
      fr: 'De courageux guerriers du Moyen Âge avec des armures.',
      en: 'Brave Middle Ages warriors with armor.',
    },
    fullContent: {
      fr: 'Au Moyen Âge, les chevaliers protégeaient les châteaux et les rois. Ils portaient de lourdes armures en métal et participaient à des tournois pour montrer leur force.',
      en: 'In the Middle Ages, knights protected castles and kings. They wore heavy metal armor and took part in tournaments to show their strength.',
    },
    funFact: {
      fr: "Une armure complète pouvait peser jusqu'à 25 kilos, soit le poids d'un gros chien !",
      en: 'A full suit of armor could weigh up to 25 kilos, the weight of a large dog!',
    },
    sections: [
      {
        icon: '🛡️',
        title: { fr: 'Les héros du Moyen Âge', en: 'Middle Ages heroes' },
        content: {
          fr: "Au Moyen Âge, les chevaliers étaient de vaillants cavaliers au service de leur roi et du château.",
          en: "In the Middle Ages, knights were brave riders in service of their king and the castle."
        }
      },
      {
        icon: '⚔️',
        title: { fr: 'Une armure en métal', en: 'A metal armor' },
        content: {
          fr: "Ils portaient un casque à visière et une armure en fer brillant pour se protéger des coups.",
          en: "They wore a helmet with a visor and shiny iron armor to protect themselves from blows."
        }
      },
      {
        icon: '🐎',
        title: { fr: 'Le fidèle destrier', en: 'The faithful steed' },
        content: {
          fr: "Le chevalier montait un robuste cheval nommé destrier, entraîné à galoper vite avec son cavalier.",
          en: "The knight rode a sturdy horse called a steed, trained to gallop fast with its rider."
        }
      },
      {
        icon: '🤝',
        title: { fr: 'Le serment d’honneur', en: 'The oath of honor' },
        content: {
          fr: "Lors de son sacre, il jurait d'être loyal, courageux et de toujours défendre les personnes vulnérables.",
          en: "During knighting, he swore to be loyal, brave, and to always defend people in need."
        }
      }
    ],
    relatedTopicIds: ['chateaux', 'pyramides']
  },
  {
    id: 'vikings',
    title: { fr: 'Les Vikings', en: 'The Vikings' },
    category: { fr: 'Histoire 🏺', en: 'History 🏺' },
    categoryKey: 'histoire',
    icon: '🛶',
    shortDesc: { fr: 'De grands navigateurs venus du Nord.', en: 'Great navigators from the North.' },
    fullContent: {
      fr: 'Les Vikings étaient des explorateurs très courageux qui venaient de Scandinavie. Ils voyageaient sur des bateaux rapides appelés drakkars, avec des têtes de dragons sculptées pour faire peur à leurs ennemis.',
      en: 'The Vikings were very brave explorers from Scandinavia. They traveled on fast boats called longships, with carved dragon heads to scare their enemies.',
    },
    funFact: {
      fr: "Les Vikings ont découvert l'Amérique bien avant Christophe Colomb !",
      en: 'The Vikings discovered America long before Christopher Columbus!',
    },
    sections: [
      {
        id: 'peuple_du_nord',
        icon: '❄️',
        title: { fr: 'Les peuples du Nord', en: 'People of the North' },
        content: {
          fr: 'Les Vikings vivaient dans les pays froids de Scandinavie entourés de forêts denses et de mers gelées.',
          en: 'Vikings lived in the cold Scandinavian north surrounded by thick forests and icy blue seas.',
        },
      },
      {
        id: 'drakkars_mers',
        icon: '⛵',
        title: { fr: 'Les maîtres des mers', en: 'Masters of the seas' },
        content: {
          fr: 'Leurs magnifiques navires en bois appelés drakkars glissaient très vite sur les vagues des océans.',
          en: 'Their splendid wooden longships glided swiftly across the waves to explore faraway ocean shores.',
        },
      },
      {
        id: 'artisans_fermiers',
        icon: '🌾',
        title: { fr: 'Fermiers et artisans', en: 'Farmers and craftspeople' },
        content: {
          fr: 'À la maison, ils cultivaient la terre, élevaient des troupeaux et sculptaient de remarquables bijoux en métal.',
          en: 'At home, they farmed fields, cared for livestock, and crafted remarkably detailed metal and wood treasures.',
        },
      },
      {
        id: 'commercants_voyageurs',
        icon: '🗺️',
        title: { fr: 'Grands marchands du monde', en: 'World traveling merchants' },
        content: {
          fr: "Ces explorateurs naviguaient très loin pour échanger de belles fourrures contre de la soie et de l'ambre.",
          en: 'These brave explorers sailed far across the globe to trade warm furs for silk and amber.',
        },
      },
    ],
    relatedTopicIds: ['pirates', 'chateaux'],
  },
  {
    id: 'chateaux',
    title: { fr: 'Les Châteaux Forts', en: 'Castles' },
    category: { fr: 'Histoire 🏺', en: 'History 🏺' },
    categoryKey: 'histoire',
    icon: '🏰',
    shortDesc: {
      fr: 'Des maisons géantes construites pour la protection.',
      en: 'Giant houses built for protection.',
    },
    fullContent: {
      fr: "Les châteaux forts étaient construits avec des murs de pierre très épais. Il y avait souvent un fossé rempli d'eau tout autour et un pont-levis que l'on pouvait remonter pour empêcher les ennemis d'entrer.",
      en: 'Castles were built with very thick stone walls. There was often a moat filled with water all around and a drawbridge that could be raised to keep enemies out.',
    },
    funFact: {
      fr: 'Les escaliers dans les tours tournaient presque toujours vers la droite pour gêner les attaquants !',
      en: 'Tower staircases almost always turned to the right to hinder attackers!',
    },
    sections: [
      {
        icon: '🏰',
        title: { fr: 'Des forteresses de pierre', en: 'Stone fortresses' },
        content: {
          fr: "Au Moyen Âge, les seigneurs bâtissaient d'immenses châteaux aux épais remparts de pierre.",
          en: "In the Middle Ages, lords built giant castles with thick protective stone ramparts."
        }
      },
      {
        icon: '🛡️',
        title: { fr: 'Pont-levis et douves', en: 'Drawbridge and moat' },
        content: {
          fr: "Un grand fossé plein d'eau et un pont-levis à remonter empêchaient les ennemis de passer.",
          en: "A wide water-filled moat and a raised drawbridge stopped enemies from getting inside."
        }
      },
      {
        icon: '👑',
        title: { fr: 'Un village protégé', en: 'A protected village' },
        content: {
          fr: "Tout le monde s'y abritait : chevaliers, cuisiniers et artisans vivaient ensemble dans la cour.",
          en: "Everyone sheltered there: knights, cooks, and craftsmen lived together in the courtyard."
        }
      },
      {
        icon: '👀',
        title: { fr: 'Le donjon secret', en: 'The secret keep' },
        content: {
          fr: "Le donjon était la plus haute tour du château où veillaient les guetteurs pour surveiller la forêt.",
          en: "The keep was the highest tower where lookouts kept watch over the surrounding forest."
        }
      }
    ],
    relatedTopicIds: ['chevaliers', 'pyramides']
  },
  {
    id: 'romains',
    title: { fr: 'Les Romains', en: 'The Romans' },
    category: { fr: 'Histoire 🏺', en: 'History 🏺' },
    categoryKey: 'histoire',
    icon: '🏛️',
    shortDesc: { fr: 'De grands bâtisseurs de routes et de cités.', en: 'Great builders of roads and cities.' },
    fullContent: {
      fr: "Les Romains vivaient en Italie il y a 2000 ans. Ils ont construit des routes magnifiques, des aqueducs pour transporter l'eau et de grands théâtres appelés arènes pour faire des spectacles.",
      en: 'The Romans lived in Italy 2000 years ago. They built magnificent roads, aqueducts to transport water, and large theaters called arenas for shows.',
    },
    funFact: {
      fr: 'Les Romains utilisaient des éponges sur des bâtons en guise de papier toilette !',
      en: 'Romans used sponges on sticks as toilet paper!',
    },
    sections: [
      {
        icon: '🏛️',
        title: { fr: 'Les grandes cités de pierre', en: 'Great stone cities' },
        content: {
          fr: 'Il y a deux mille ans, les Romains organisaient de splendides villes autour de places publiques animées.',
          en: 'Two thousand years ago, Romans organized splendid stone cities around bustling public town squares.',
        },
      },
      {
        icon: '🛣️',
        title: { fr: 'Des routes pavées solides', en: 'Paved stone roads' },
        content: {
          fr: "Leurs ouvriers construisaient des chaussées en pierres pavées pour relier rapidement toutes les régions de l'Empire.",
          en: 'Their workers built durable paved stone highways to quickly connect distant regions across the Empire.',
        },
      },
      {
        icon: '💧',
        title: { fr: 'L’eau des aqueducs', en: 'Water from aqueducts' },
        content: {
          fr: "De magnifiques ponts à arches appelés aqueducs acheminaient l'eau fraîche des montagnes directement dans les bains.",
          en: 'Magnificent arched bridge channels called aqueducts carried cool mountain water straight into public baths.',
        },
      },
      {
        icon: '🏺',
        title: { fr: 'La vie au marché', en: 'Life at the market' },
        content: {
          fr: "Habillés de tuniques en laine, les citoyens s'y retrouvaient pour acheter des poteries, pains et huiles.",
          en: 'Dressed in woolen tunics, citizens met together to buy fresh bread, clay pots, and oil.',
        },
      },
    ],
    relatedTopicIds: ['pyramides', 'roue'],
  },
  {
    id: 'samourais',
    title: { fr: 'Les Samouraïs', en: 'Samurai' },
    category: { fr: 'Histoire 🏺', en: 'History 🏺' },
    categoryKey: 'histoire',
    icon: '⚔️',
    shortDesc: { fr: 'Les nobles guerriers du Japon ancien.', en: 'Noble warriors of ancient Japan.' },
    fullContent: {
      fr: 'Les samouraïs étaient des guerriers japonais très respectés. Ils suivaient un code de conduite très strict appelé le Bushido. Ils portaient deux sabres et des armures faites de petites plaques de métal et de soie.',
      en: 'Samurai were highly respected Japanese warriors. They followed a very strict code of conduct called Bushido. They wore two swords and armor made of small metal plates and silk.',
    },
    funFact: {
      fr: "Le mot samouraï signifie 'celui qui sert' !",
      en: "The word samurai means 'one who serves'!",
    },
    sections: [
      {
        icon: '🏯',
        title: { fr: 'Au service des seigneurs', en: 'Serving the lords' },
        content: {
          fr: "Dans le Japon d'autrefois, les samouraïs appartenaient à une classe respectée chargée de protéger les châteaux et d'administrer les terres de leur seigneur.",
          en: "In ancient Japan, samurai belonged to a respected class tasked with protecting castles and managing their lord's lands.",
        },
      },
      {
        icon: '🥋',
        title: { fr: 'Un entraînement rigoureux', en: 'Disciplined training' },
        content: {
          fr: "Dès l'enfance, ils apprenaient à manier l'arc et le sabre, mais aussi à rester calmes, patients et fidèles à leur parole en toute circonstance.",
          en: 'From childhood, they learned archery and swordsmanship, while practicing patience, calm focus, and unyielding loyalty.',
        },
      },
      {
        icon: '🖌️',
        title: { fr: 'Poésie et calligraphie', en: 'Poetry and calligraphy' },
        content: {
          fr: "Loin d'être de simples guerriers, les samouraïs étudiaient les livres, composaient de courts poèmes et pratiquaient avec soin la cérémonie du thé.",
          en: 'Far from mere fighters, samurai studied classical books, composed delicate poems, and carefully practiced the peaceful tea ceremony.',
        },
      },
      {
        icon: '📜',
        title: { fr: 'De gardiens à gouverneurs', en: 'From warriors to governors' },
        content: {
          fr: 'Quand les guerres ont cessé au fil des siècles, beaucoup sont devenus des lettrés, des juges et des conseillers pour guider la société japonaise.',
          en: 'As eras of peace arrived over the centuries, many samurai became scholars, judges, and wise advisors guiding Japanese society.',
        },
      },
    ],
    relatedTopicIds: ['chateaux', 'chevaliers'],
  },
  {
    id: 'pirates',
    title: { fr: 'Les Pirates', en: 'Pirates' },
    category: { fr: 'Histoire 🏺', en: 'History 🏺' },
    categoryKey: 'histoire',
    icon: '🏴‍☠️',
    shortDesc: {
      fr: 'Les aventuriers des mers en quête de trésors.',
      en: 'Sea adventurers seeking treasures.',
    },
    fullContent: {
      fr: "Les pirates étaient des marins qui voyageaient sur de grands voiliers. Ils cherchaient des trésors et vivaient selon leurs propres règles. Le plus célèbre des drapeaux pirates s'appelle le 'Jolly Roger', avec un crâne et deux os blancs sur fond noir.",
      en: "Pirates were sailors who traveled on large sailing ships. They sought treasures and lived by their own rules. The most famous pirate flag is called the 'Jolly Roger', with a skull and two white crossbones on a black background.",
    },
    funFact: {
      fr: 'Contrairement aux films, les pirates ne cachaient pas souvent leurs trésors dans le sable, ils dépensaient tout très vite !',
      en: "Unlike in the movies, pirates didn't often hide their treasures in the sand; they spent everything very quickly!",
    },
    sections: [
      {
        id: 'marins_aventure',
        icon: '⛵',
        title: { fr: 'Les marins de l’aventure', en: 'Sailors of adventure' },
        content: {
          fr: 'Il y a trois cents ans, les pirates parcouraient les mers lointaines à bord de grands voiliers.',
          en: 'Three hundred years ago, pirates sailed distant oceans on board magnificent tall sailing wooden ships.',
        },
      },
      {
        id: 'vie_a_bord',
        icon: '⚓',
        title: { fr: 'La vie sur le bateau', en: 'Life on board' },
        content: {
          fr: "L'équipage hissait ensemble les lourdes voiles, réparait le bois du navire et partageait des repas simples.",
          en: 'The crew hoisted heavy sails together, repaired the ship wood, and shared humble daily meals.',
        },
      },
      {
        id: 'drapeau_et_signes',
        icon: '🏴‍☠️',
        title: { fr: 'Le fameux drapeau noir', en: 'The famous black flag' },
        content: {
          fr: 'Leur drapeau noir avec une tête de mort servait à faire peur aux autres navires aperçus au loin.',
          en: 'Their black flag with a skull was hoisted high to frighten other ships spotted far away.',
        },
      },
      {
        id: 'cartes_et_tresors',
        icon: '🗺️',
        title: { fr: 'Boussoles et navigation', en: 'Compasses and navigation' },
        content: {
          fr: "Pour s'orienter sans boussole moderne, ils observaient attentivement les étoiles et le soleil au-dessus des vagues.",
          en: 'To steer without modern tools, they carefully read the stars and the sun over ocean waves.',
        },
      },
    ],
    relatedTopicIds: ['dauphin', 'chateaux'],
  },
  {
    id: 'prehistoire',
    title: { fr: 'La Préhistoire', en: 'Prehistory' },
    category: { fr: 'Histoire 🏺', en: 'History 🏺' },
    categoryKey: 'histoire',
    icon: '🦴',
    shortDesc: { fr: 'Le temps des premiers humains.', en: 'The time of the first humans.' },
    fullContent: {
      fr: "Pendant la préhistoire, les humains apprenaient à fabriquer des outils en pierre, à chasser et à faire du feu. Ils dessinaient aussi des animaux sur les murs des grottes, comme à Lascaux. C'est le début de la grande aventure humaine !",
      en: "During prehistory, humans learned to make stone tools, hunt, and make fire. They also drew animals on cave walls, like in Lascaux. It's the beginning of the great human adventure!",
    },
    funFact: {
      fr: 'Les premiers hommes ne vivaient pas avec les dinosaures, ils sont arrivés bien après leur disparition !',
      en: 'The first humans did not live with dinosaurs; they arrived long after they disappeared!',
    },
    sections: [
      {
        icon: '🪨',
        title: { fr: 'Les premiers humains', en: 'The first humans' },
        content: {
          fr: "La préhistoire commence avec les tout premiers êtres humains, bien avant l'invention de l'écriture.",
          en: "Prehistory begins with the very first human beings, long before the invention of writing."
        }
      },
      {
        icon: '🔥',
        title: { fr: 'La magie du feu', en: 'The magic of fire' },
        content: {
          fr: "En frottant des pierres, ils ont appris à allumer le feu pour se réchauffer et cuisiner.",
          en: "By striking stones together, they learned to make fire to stay warm and cook food."
        }
      },
      {
        icon: '🎨',
        title: { fr: 'Peintres des cavernes', en: 'Cave painters' },
        content: {
          fr: "À la lueur des torches, ils dessinaient des animaux sauvages sur les parois rocheuses des grottes.",
          en: "By the light of torches, they drew wild animals on the rocky walls of deep caves."
        }
      },
      {
        icon: '⛏️',
        title: { fr: 'Des outils malins', en: 'Clever tools' },
        content: {
          fr: "Avec du silex et du bois, ils taillaient des outils solides pour fabriquer des tentes et s'habiller.",
          en: "With flint and wood, they crafted sturdy tools to build shelters and make warm clothes."
        }
      }
    ],
    relatedTopicIds: ['pyramides', 'chateaux']
  },
  {
    id: 'grece-antique',
    title: { fr: 'La Grèce Antique', en: 'Ancient Greece' },
    category: { fr: 'Histoire 🏺', en: 'History 🏺' },
    categoryKey: 'histoire',
    icon: '🏛️',
    shortDesc: {
      fr: 'Le pays des héros et des Jeux Olympiques.',
      en: 'The land of heroes and the Olympic Games.',
    },
    fullContent: {
      fr: 'Il y a très longtemps, les Grecs ont inventé beaucoup de choses : la démocratie, le théâtre et les Jeux Olympiques ! Ils croyaient en de nombreux dieux comme Zeus, le roi du ciel, qui lançait des éclairs.',
      en: 'A long time ago, the Greeks invented many things: democracy, theater, and the Olympic Games! They believed in many gods like Zeus, the king of the sky, who threw lightning bolts.',
    },
    funFact: {
      fr: 'Lors des premiers Jeux Olympiques, les athlètes faisaient toutes les épreuves complètement nus !',
      en: 'During the first Olympic Games, athletes performed all events completely naked!',
    },
    sections: [
      {
        icon: '🏺',
        title: { fr: 'Des cités pleines de vie', en: 'Lively city-states' },
        content: {
          fr: 'Les Grecs vivaient dans de grandes cités près de la mer. Sur la place du marché, on échangeait des olives, du pain et de belles poteries peintes.',
          en: 'Greeks lived in bustling cities near the sea. In the marketplace, families traded fresh olives, bread, and brightly painted clay pots.',
        },
      },
      {
        icon: '🏛️',
        title: { fr: 'Des temples pour les dieux', en: 'Temples for the gods' },
        content: {
          fr: 'Sur les collines, ils bâtissaient de grands temples aux hautes colonnes de pierre pour honorer des dieux puissants comme Zeus et Athéna.',
          en: 'On high hills, they built grand stone temples with tall columns to honor powerful gods like Zeus and Athena.',
        },
      },
      {
        icon: '🏃',
        title: { fr: 'Les premiers Jeux Olympiques', en: 'The first Olympic Games' },
        content: {
          fr: "Tous les quatre ans, les meilleurs sportifs se réunissaient à Olympie. Ils faisaient la course à pied pour remporter une couronne d'olivier !",
          en: 'Every four years, champions gathered in Olympia. They ran races and competed to win a precious crown of olive leaves!',
        },
      },
      {
        icon: '🗳️',
        title: { fr: 'Se réunir pour décider', en: 'Gathering to decide' },
        content: {
          fr: "À Athènes, des citoyens se rassemblaient pour discuter et voter les lois ensemble. C'était une première forme de démocratie, même si tout le monde n'avait pas le droit de participer.",
          en: 'In Athens, citizens gathered in the town square to discuss and vote on laws. It was an early form of democracy, though not everyone was allowed to take part.',
        },
      },
    ],
    relatedTopicIds: ['romains', 'theatre', 'pyramides'],
  },
  {
    id: 'leonard-vinci',
    title: { fr: 'Léonard de Vinci', en: 'Leonardo da Vinci' },
    category: { fr: 'Histoire 🏺', en: 'History 🏺' },
    categoryKey: 'histoire',
    icon: '🎨',
    shortDesc: { fr: 'Un génie qui faisait tout !', en: 'A genius who did everything!' },
    fullContent: {
      fr: "Léonard de Vinci vivait pendant la Renaissance. C'était un immense peintre (il a peint la Joconde), mais aussi un inventeur incroyable. Il a dessiné des plans d'hélicoptères et de sous-marins des centaines d'années avant qu'ils n'existent !",
      en: 'Leonardo da Vinci lived during the Renaissance. He was a great painter (he painted the Mona Lisa), but also an incredible inventor. He drew plans for helicopters and submarines hundreds of years before they existed!',
    },
    funFact: {
      fr: "Léonard de Vinci écrivait souvent ses secrets à l'envers, il fallait un miroir pour pouvoir les lire !",
      en: 'Leonardo da Vinci often wrote his secrets backwards; you needed a mirror to read them!',
    },
    sections: [
      {
        icon: '🎨',
        title: { fr: 'Un peintre de génie', en: 'A master painter' },
        content: {
          fr: 'Vivant en Italie à l’époque de la Renaissance, Léonard peignait des tableaux célèbres dans le monde entier, comme la mystérieuse Joconde.',
          en: 'Living in Italy during the Renaissance, Leonardo painted world-famous masterpieces, including the mysterious Mona Lisa.',
        },
      },
      {
        icon: '🦅',
        title: { fr: 'Observer la nature', en: 'Observing nature' },
        content: {
          fr: 'Curieux de tout, il passait des heures à observer le vol des oiseaux, l’écoulement de l’eau et les muscles des animaux pour comprendre leur fonctionnement.',
          en: 'Curious about everything, he spent hours watching birds fly, water flow, and muscles move to understand how nature works.',
        },
      },
      {
        icon: '📖',
        title: { fr: 'Des carnets de croquis', en: 'Sketchbooks of ideas' },
        content: {
          fr: 'Dans ses carnets secrets, il imaginait et dessinait des machines volantes, des ponts et des roues bien avant leur fabrication dans la réalité.',
          en: 'In his secret notebooks, he dreamed up and drew flying machines, bridges, and giant gears long before they could actually be built.',
        },
      },
      {
        icon: '💡',
        title: { fr: 'Des rêves sur le papier', en: 'Dreams on paper' },
        content: {
          fr: 'Beaucoup de ses inventions sont restées de superbes dessins sur le papier, car les moteurs et les matériaux modernes n’existaient pas encore.',
          en: 'Many of his inventions remained brilliant paper drawings, because modern engines and materials did not yet exist to build them.',
        },
      },
    ],
    relatedTopicIds: ['peinture', 'chateaux'],
  },
  {
    id: 'mayas',
    title: { fr: 'Les Mayas', en: 'The Mayans' },
    category: { fr: 'Histoire 🏺', en: 'History 🏺' },
    categoryKey: 'histoire',
    icon: '🗿',
    shortDesc: { fr: 'Les mystérieux bâtisseurs de la jungle.', en: 'The mysterious jungle builders.' },
    fullContent: {
      fr: "Les Mayas vivaient en Amérique centrale. Ils ont construit de magnifiques cités avec des pyramides géantes au milieu de la forêt. C'étaient aussi de très grands mathématiciens et astronomes qui étudiaient les étoiles avec précision.",
      en: 'The Mayans lived in Central America. They built magnificent cities with giant pyramids in the middle of the forest. They were also great mathematicians and astronomers who studied the stars with precision.',
    },
    funFact: {
      fr: 'Les Mayas adoraient le chocolat, mais ils le buvaient chaud avec du piment, sans sucre !',
      en: 'The Mayans loved chocolate, but they drank it hot with chili, without sugar!',
    },
    sections: [
      {
        icon: '🏛️',
        title: { fr: 'Des cités dans la forêt', en: 'Cities in the rainforest' },
        content: {
          fr: 'En Amérique centrale, les bâtisseurs mayas ont édifié de splendides villes de pierre avec des places publiques et de hautes pyramides à degrés.',
          en: 'In Central America, Mayan builders raised splendid stone cities featuring bustling plazas and towering stepped pyramids.',
        },
      },
      {
        icon: '⭐',
        title: { fr: 'Étoiles et mathématiques', en: 'Stars and mathematics' },
        content: {
          fr: 'Très attentifs au ciel, leurs savants suivaient la course des astres pour créer des calendriers précis et écrivaient avec de jolis glyphes gravés.',
          en: 'Keen skywatchers, their scholars tracked stars to create precise calendars and wrote stories with elegant carved glyphs.',
        },
      },
      {
        icon: '🌽',
        title: { fr: 'Maïs et fèves de cacao', en: 'Corn and cocoa beans' },
        content: {
          fr: 'Les fermiers cultivaient le maïs et préparaient une boisson mousseuse à base de fèves de cacao, l’ancêtre de notre chocolat !',
          en: 'Farmers grew corn and brewed a frothy, spiced drink from cocoa beans, the ancient ancestor of our beloved chocolate!',
        },
      },
      {
        icon: '👥',
        title: { fr: 'Une culture vivante', en: 'A living culture today' },
        content: {
          fr: 'Si les anciennes cités se sont endormies sous la végétation, des millions de descendants mayas vivent aujourd’hui et parlent encore leurs langues.',
          en: 'Though ancient stone cities fell quiet beneath the jungle, millions of Maya descendants thrive today, keeping their languages alive.',
        },
      },
    ],
    relatedTopicIds: ['pyramides', 'chateaux'],
  },
  {
    id: 'premier-pas-lune',
    title: { fr: 'Le Premier Pas sur la Lune', en: 'The First Step on the Moon' },
    category: { fr: 'Histoire 🏺', en: 'History 🏺' },
    categoryKey: 'histoire',
    icon: '🚀',
    shortDesc: { fr: "Le plus grand voyage de l'humanité.", en: "Humanity's greatest journey." },
    fullContent: {
      fr: "Le 21 juillet 1969, Neil Armstrong est devenu le premier homme à marcher sur la Lune. Il a dit cette phrase célèbre : 'C'est un petit pas pour l'homme, mais un bond de géant pour l'humanité'. C'est un moment historique qui a été suivi par le monde entier à la télévision.",
      en: "On July 21, 1969, Neil Armstrong became the first human to walk on the Moon. He said the famous line: 'That's one small step for man, one giant leap for mankind.' It's a historic moment that was watched by the whole world on television.",
    },
    funFact: {
      fr: "Comme il n'y a pas de vent sur la Lune, les empreintes de pas des astronautes y sont toujours intactes aujourd'hui !",
      en: "Since there is no wind on the Moon, the astronauts' footprints are still intact today!",
    },
    sections: [
      {
        icon: '🚀',
        title: { fr: 'La mission Apollo 11', en: 'The Apollo 11 mission' },
        content: {
          fr: 'En juillet 1969, une immense fusée a décollé de la Terre avec à son bord trois courageux astronautes : Neil Armstrong, Buzz Aldrin et Michael Collins.',
          en: 'In July 1969, a giant rocket blasted off from Earth carrying three brave astronauts: Neil Armstrong, Buzz Aldrin, and Michael Collins.',
        },
      },
      {
        icon: '👨‍🚀',
        title: { fr: 'Un travail d’équipe', en: 'A historic team' },
        content: {
          fr: 'Pendant que Neil Armstrong puis Buzz Aldrin descendaient marcher sur le sol lunaire, Michael Collins pilotait le vaisseau en orbite au-dessus d’eux.',
          en: 'While Neil Armstrong and Buzz Aldrin stepped out onto the Moon, Michael Collins stayed in orbit above piloting the command module.',
        },
      },
      {
        icon: '👣',
        title: { fr: 'Un petit pas historique', en: 'A small step for man' },
        content: {
          fr: 'Vêtus d’épaisses combinaisons blanches, ils ont ramassé des roches et installé des instruments avant de revenir sains et saufs sur Terre.',
          en: 'Wearing thick white spacesuits, they gathered lunar rocks and set up science instruments before returning safely home to Earth.',
        },
      },
      {
        icon: '🌍',
        title: { fr: 'Une aventure partagée', en: 'Other journeys followed' },
        content: {
          fr: 'Après Apollo 11, d’autres missions spatiales ont emmené dix autres astronautes marcher sur la Lune pour continuer à percer ses secrets.',
          en: 'Following Apollo 11, further missions brought ten more astronauts to explore the Moon and unlock more of its secrets.',
        },
      },
    ],
    relatedTopicIds: ['la-lune', 'terre'],
  },
  {
    id: 'berceau-afrique',
    title: { fr: "Le Berceau de l'Afrique", en: "The African Cradle" },
    category: { fr: 'Histoire 🏺', en: 'History 🏺' },
    categoryKey: 'histoire',
    icon: '🏜️',
    shortDesc: { fr: "Là où a commencé la grande aventure humaine.", en: "Where the great human adventure began." },
    fullContent: {
      fr: "Il y a des millions d'années, nos tout premiers ancêtres vivaient en Afrique, dans une région appelée le Grand Rift. C'est pour cela que l'Afrique est souvent appelée le 'berceau de l'humanité', car c'est là que notre histoire a commencé !",
      en: "Millions of years ago, our very first ancestors lived in Africa, in a region called the Great Rift. That's why Africa is often called the 'cradle of humanity', because that is where our story began!"
    },
    funFact: {
      fr: "Le plus ancien fossile pré-humain retrouvé s'appelle Toumaï et a environ 7 millions d'années !",
      en: "The oldest pre-human fossil found is called Toumaï and is about 7 million years old!"
    },
    sections: [
      {
        icon: '🌍',
        title: { fr: 'La grande vallée du Rift', en: 'The Great Rift Valley' },
        content: {
          fr: "Il y a des millions d'années en Afrique, nos tout premiers ancêtres vivaient dans de grandes plaines chaudes bordées de collines.",
          en: 'Millions of years ago in Africa, our earliest ancestors lived across warm open plains bordered by hills.'
        }
      },
      {
        icon: '👣',
        title: { fr: 'Faire les premiers pas', en: 'Taking the first steps' },
        content: {
          fr: "C'est sur ces terres que les hominidés ont appris à marcher debout, observant l'horizon au-dessus des herbes de la savane.",
          en: 'On these lands, early hominids learned to walk upright, watching the horizon above savanna grasses.'
        }
      },
      {
        icon: '🪨',
        title: { fr: 'Les outils du quotidien', en: 'Daily stone tools' },
        content: {
          fr: "Ils ont taillé les premiers galets pour couper des plantes et se défendre, marquant le début de l'ingéniosité humaine.",
          en: 'They shaped the first pebbles to cut plants and protect themselves, marking the dawn of human ingenuity.'
        }
      },
      {
        icon: '🌅',
        title: { fr: 'Le départ vers le monde', en: 'Setting out into the world' },
        content: {
          fr: "Depuis ce berceau d'Afrique, les groupes humains ont ensuite voyagé génération après génération pour peupler tous les continents.",
          en: 'From this African cradle, human groups traveled generation after generation to populate all continents.'
        }
      }
    ],
    relatedTopicIds: ['debout-deux-pieds', 'artisan-pierres', 'cousins-neandertal'],
  },
  {
    id: 'debout-deux-pieds',
    title: { fr: "Debout sur deux pieds", en: "Standing on two feet" },
    category: { fr: 'Histoire 🏺', en: 'History 🏺' },
    categoryKey: 'histoire',
    icon: '🚶',
    shortDesc: { fr: "Apprendre à marcher pour libérer ses mains.", en: "Learning to walk to free up hands." },
    fullContent: {
      fr: "Un jour, nos ancêtres ont commencé à se tenir debout et à marcher sur deux pieds. Cela s'appelle la bipédie ! En marchant debout, ils pouvaient voir plus loin au-dessus des hautes herbes de la savane et utiliser leurs mains pour porter des objets ou cueillir des fruits.",
      en: "One day, our ancestors started to stand up and walk on two feet. This is called bipedalism! By walking upright, they could see further over the tall savanna grasses and use their hands to carry objects or pick fruit."
    },
    funFact: {
      fr: "La plus célèbre de nos ancêtres à marcher debout s'appelle Lucy, une jeune australopithèque découverte en Éthiopie !",
      en: "The most famous of our ancestors to walk upright is Lucy, a young Australopithecus discovered in Ethiopia!"
    },
    sections: [
      {
        icon: '🚶',
        title: { fr: 'Se redresser sur deux pieds', en: 'Standing on two feet' },
        content: {
          fr: "Il y a plusieurs millions d'années, certains de nos lointains ancêtres ont commencé à se tenir droits. Cette façon de marcher s'appelle la bipédie.",
          en: 'Millions of years ago, some of our distant ancestors began to stand upright. This way of walking is called bipedalism.'
        }
      },
      {
        icon: '🌾',
        title: { fr: 'Regarder au loin', en: 'Looking far ahead' },
        content: {
          fr: "En se tenant debout au milieu des hautes herbes, ils pouvaient observer la plaine et repérer plus facilement les animaux ou les dangers.",
          en: 'By standing tall above the tall grasses, they could look across the plain and spot animals or dangers much more easily.'
        }
      },
      {
        icon: '🤲',
        title: { fr: 'Des mains enfin libres', en: 'Hands finally free' },
        content: {
          fr: "Comme les mains ne servaient plus à marcher, elles sont devenues libres pour porter des petits, ramasser des fruits et tenir des bâtons.",
          en: 'Because hands were no longer needed for walking, they were free to hold little ones, gather fruits, and carry sticks.'
        }
      },
      {
        icon: '👣',
        title: { fr: 'Des traces venues du passé', en: 'Footprints from the past' },
        content: {
          fr: "Des scientifiques ont découvert d'anciennes empreintes de pas figées dans la cendre volcanique, prouvant cette incroyable marche vers l'avant.",
          en: 'Scientists discovered ancient footprints preserved in volcanic ash, proving this wonderful upright journey long ago.'
        }
      }
    ],
    relatedTopicIds: ['prehistoire', 'cousins-neandertal', 'dompteur-feu']
  },
  {
    id: 'artisan-pierres',
    title: { fr: "L'Artisan des Pierres", en: "The Stone Artisan" },
    category: { fr: 'Histoire 🏺', en: 'History 🏺' },
    categoryKey: 'histoire',
    icon: '🛠️',
    shortDesc: { fr: "L'invention des tout premiers outils.", en: "The invention of the very first tools." },
    fullContent: {
      fr: "Pour couper de la viande ou casser des noix, les premiers humains ont eu une idée géniale : taper deux cailloux l'un contre l'autre pour les rendre tranchants. Cet ancêtre inventeur s'appelle Homo Habilis (l'homme habile) et a créé les premiers outils !",
      en: "To cut meat or crack nuts, early humans had a brilliant idea: tapping two stones together to make them sharp. This inventor ancestor is called Homo Habilis (handy man) and created the very first tools!"
    },
    funFact: {
      fr: "Les premiers outils étaient de simples galets taillés appelés des 'choppers' !",
      en: "The first tools were simple chipped pebbles called 'choppers'!"
    },
    sections: [
      {
        icon: '🪨',
        title: { fr: 'Frapper la pierre', en: 'Striking stone against stone' },
        content: {
          fr: "En heurtant un galet contre un autre avec précision, les premiers humains ont détaché des éclats tranchants. Ce geste a fait naître les tout premiers outils.",
          en: 'By tapping one stone against another, early humans struck off sharp flakes. This deliberate gesture gave birth to the very first tools.'
        }
      },
      {
        icon: '🔪',
        title: { fr: 'Des outils pour tout couper', en: 'Tools to cut and scrape' },
        content: {
          fr: "Avec ces arêtes coupantes, ils pouvaient facilement trancher la nourriture, tailler du bois solide ou racler des peaux d'animaux pour s'abriter.",
          en: 'With these sharp edges, they could easily slice food, carve wood, and scrape animal hides to make warm shelters.'
        }
      },
      {
        icon: '🧠',
        title: { fr: 'Imaginer avant de tailler', en: 'Imagining before shaping' },
        content: {
          fr: "Tailler un caillou demande de penser à la forme voulue avant de donner le coup. Cela prouve la grande ingéniosité de nos lointains ancêtres.",
          en: 'Shaping a pebble required picturing the desired form before striking. It shows the wonderful ingenuity of our distant ancestors.'
        }
      },
      {
        icon: '🖐️',
        title: { fr: 'Un savoir transmis', en: 'Skills passed down' },
        content: {
          fr: "Ces techniques de fabrication se transmettaient des aînés aux enfants. Au fil des siècles, les pointes et racloirs sont devenus de plus en plus fins.",
          en: 'These toolmaking skills were passed down from elders to children. Over centuries, stone points and scrapers became finer and sharper.'
        }
      }
    ],
    relatedTopicIds: ['prehistoire', 'debout-deux-pieds', 'dompteur-feu']
  },
  {
    id: 'dompteur-feu',
    title: { fr: "Le Dompteur de Feu", en: "The Fire Tamer" },
    category: { fr: 'Histoire 🏺', en: 'History 🏺' },
    categoryKey: 'histoire',
    icon: '🔥',
    shortDesc: { fr: "Découvrir comment se réchauffer et cuisiner.", en: "Discovering how to warm up and cook." },
    fullContent: {
      fr: "Il y a environ 400 000 ans, l'Homo Erectus a appris à apprivoiser le feu. Grâce au feu, les humains pouvaient s'éclairer la nuit, se réchauffer quand il faisait froid, faire peur aux animaux sauvages et surtout faire cuire leur nourriture !",
      en: "About 400,000 years ago, Homo Erectus learned to tame fire. Thanks to fire, humans could light up the night, warm themselves when cold, scare wild animals away and, above all, cook their food!"
    },
    funFact: {
      fr: "La nourriture cuite était beaucoup plus facile à mâcher et a aidé le cerveau humain à grandir très vite !",
      en: "Cooked food was much easier to chew and helped the human brain grow very fast!"
    },
    sections: [
      {
        icon: '🔥',
        title: { fr: "Une découverte progressive", en: "A gradual discovery" },
        content: {
          fr: "Au début, les humains récupéraient des braises nées d'orages ou d'incendies naturels. Au fil des générations, ils ont appris à frotter du bois ou percuter des pierres pour allumer une flamme quand ils en avaient besoin.",
          en: "At first, early humans collected embers from lightning strikes or natural wildfires. Over many generations, they learned to rub wood or strike stones to create a spark whenever they needed one."
        }
      },
      {
        icon: '❄️',
        title: { fr: "Chaleur et lumière", en: "Warmth and light" },
        content: {
          fr: "Grâce au feu, les nuits sombres devenaient lumineuses et rassurantes. Le foyer réchauffait les campements lors des saisons froides et éloignait les prédateurs dangereux pendant le sommeil.",
          en: "Fire turned dark, scary nights into bright and comforting evenings. The hearth kept campsites warm during cold seasons and protected sleeping groups by keeping dangerous predators away."
        }
      },
      {
        icon: '🍲',
        title: { fr: "La cuisson des aliments", en: "Cooking food" },
        content: {
          fr: "Faire griller la viande et cuire les racines a transformé la vie quotidienne. Les aliments devenaient plus tendres, meilleurs au goût et plus faciles à digérer pour les grands et les petits.",
          en: "Roasting meat and cooking roots transformed daily life. Food became softer, tastier, safer to eat, and much easier to digest for both children and adults."
        }
      },
      {
        icon: '🤝',
        title: { fr: "Le cercle du foyer", en: "Around the hearth" },
        content: {
          fr: "Le soir venu, tout le clan se rassemblait autour des flammes. C'est là que les adultes fabriquaient des outils, partageaient les repas et commençaient à raconter des histoires.",
          en: "In the evening, the whole group gathered around the crackling flames. Around the hearth, people shared meals, made tools, and began telling stories to one another."
        }
      }
    ],
    relatedTopicIds: ['prehistoire', 'soleil']
  },
  {
    id: 'grand-voyage',
    title: { fr: "Le Grand Voyage", en: "The Great Journey" },
    category: { fr: 'Histoire 🏺', en: 'History 🏺' },
    categoryKey: 'histoire',
    icon: '🌍',
    shortDesc: { fr: "La grande exploration de notre planète.", en: "The great exploration of our planet." },
    fullContent: {
      fr: "Petit à petit, les humains sont devenus de grands explorateurs. Ils ont quitté l'Afrique pour voyager en Asie, en Europe, puis en Amérique et en Australie. Ils ont traversé des rivières, des montagnes et des déserts pour peupler le monde entier !",
      en: "Little by little, humans became great explorers. They left Africa to travel to Asia, Europe, then America and Australia. They crossed rivers, mountains and deserts to inhabit the whole world!"
    },
    funFact: {
      fr: "Pour passer de l'Asie à l'Amérique, les premiers humains ont marché sur de la glace géante qui reliait les deux continents !",
      en: "To cross from Asia to America, early humans walked on giant ice that connected the two continents!"
    },
    sections: [
      {
        icon: '👣',
        title: { fr: "En route depuis l'Afrique", en: 'On the road from Africa' },
        content: {
          fr: "Il y a des dizaines de milliers d'années, des groupes de chasseurs-cueilleurs ont suivi les troupeaux au-delà de leur région d'origine.",
          en: 'Tens of thousands of years ago, hunter-gatherer groups followed game herds beyond their home territories.'
        }
      },
      {
        icon: '🏔️',
        title: { fr: 'Franchir les obstacles', en: 'Crossing big obstacles' },
        content: {
          fr: "À pied et avec courage, ils ont traversé des rivières, escaladé des montagnes et appris à vivre dans des climats très variés.",
          en: 'On foot and with great courage, they crossed rivers, climbed mountains, and learned to live in many different climates.'
        }
      },
      {
        icon: '🧊',
        title: { fr: 'Des ponts de glace éphémères', en: 'Temporary ice bridges' },
        content: {
          fr: "Pendant les périodes froides, le niveau de la mer a baissé, laissant passer les humains à pied sec vers de nouveaux continents.",
          en: 'During cold eras, sea levels dropped, allowing humans to walk across dry land bridges to new continents.'
        }
      },
      {
        icon: '🌏',
        title: { fr: 'Une seule grande famille', en: 'One big human family' },
        content: {
          fr: "En s'installant sur tous les continents, ces voyageurs ont inventé mille coutumes tout en restant unis par la même histoire.",
          en: 'Settling across every continent, these travelers created a thousand customs while remaining united by one shared story.'
        }
      }
    ],
    relatedTopicIds: ['berceau-afrique', 'cousins-neandertal', 'debout-deux-pieds'],
  },
  {
    id: 'cousins-neandertal',
    title: { fr: "Cousins Néandertal", en: "Neanderthal Cousins" },
    category: { fr: 'Histoire 🏺', en: 'History 🏺' },
    categoryKey: 'histoire',
    icon: '❄️',
    shortDesc: { fr: "Des humains super costauds adaptés au froid.", en: "Super strong humans adapted to the cold." },
    fullContent: {
      fr: "L'Homme de Néandertal était notre cousin. Il vivait en Europe pendant l'âge de glace. Il était plus petit mais beaucoup plus costaud que nous, avec un grand nez pour réchauffer l'air glacial avant de le respirer.",
      en: "Neanderthal man was our cousin. He lived in Europe during the Ice Age. He was shorter but much stronger than us, with a large nose to warm the freezing air before breathing it in."
    },
    funFact: {
      fr: "Néandertal prenait soin des malades de sa tribu et offrait des fleurs lors des enterrements !",
      en: "Neanderthal cared for the sick of his tribe and offered flowers during burials!"
    },
    sections: [
      {
        icon: '❄️',
        title: { fr: 'Des humains adaptés au froid', en: 'Humans built for the cold' },
        content: {
          fr: "L'Homme de Néandertal formait un groupe humain ancien qui vivait en Europe et en Asie. Avec son corps robuste et trapu, il supportait très bien les hivers glaciaires.",
          en: 'Neanderthals were an ancient human group living across Europe and Asia. With their sturdy, robust bodies, they were well equipped for freezing glacial winters.'
        }
      },
      {
        icon: '🛠️',
        title: { fr: 'Des artisans habiles', en: 'Skilled toolmakers' },
        content: {
          fr: "Loin d'être maladroits, les Néandertaliens taillaient de superbes outils en pierre et en bois. Ils fabriquaient des lances solides et des racloirs pour nettoyer les peaux.",
          en: 'Far from clumsy, Neanderthals crafted fine stone and wooden tools. They shaped sturdy spears and stone scrapers to clean and prepare warm hides.'
        }
      },
      {
        icon: '🤝',
        title: { fr: 'Une tribu solidaire', en: 'A caring tribe' },
        content: {
          fr: "Les archéologues ont découvert que ces humains prenaient soin de leurs compagnons blessés ou âgés. Ils vivaient en petits clans unis où chacun s'entraidait.",
          en: 'Archaeologists discovered that Neanderthals cared for injured and elderly companions. They lived in small, close-knit clans where everyone supported one another.'
        }
      },
      {
        icon: '🌿',
        title: { fr: 'Les secrets du campement', en: 'Campfire secrets' },
        content: {
          fr: "Ils maîtrisaient le feu pour se réchauffer et cuisiner au campement. Les fouilles révèlent encore aujourd'hui de nouvelles découvertes sur leurs coutumes.",
          en: 'They mastered fire to keep warm and cook at their campsites. Excavations continue today to reveal fascinating new discoveries about their customs.'
        }
      }
    ],
    relatedTopicIds: ['prehistoire', 'dompteur-feu', 'artistes-cavernes']
  },
  {
    id: 'artistes-cavernes',
    title: { fr: "Artistes des Cavernes", en: "Cave Artists" },
    category: { fr: 'Histoire 🏺', en: 'History 🏺' },
    categoryKey: 'histoire',
    icon: '🎨',
    shortDesc: { fr: "Les toutes premières peintures sur les murs.", en: "The very first paintings on the walls." },
    fullContent: {
      fr: "Nos ancêtres étaient de grands artistes ! À la lueur des torches, ils dessinaient des mammouths, des chevaux et des bisons sur les parois sombres des grottes. Ils utilisaient de la terre colorée, du charbon de bois et soufflaient de la peinture pour laisser l'empreinte de leurs mains.",
      en: "Our ancestors were great artists! By the light of torches, they drew mammoths, horses and bison on the dark walls of caves. They used colored earth, charcoal, and blew paint to leave their handprints."
    },
    funFact: {
      fr: "La grotte de Lascaux en France est si belle qu'elle est souvent appelée la 'Chapelle Sixtine de la préhistoire' !",
      en: "The Lascaux Cave in France is so beautiful that it is often called the 'Sistine Chapel of prehistory'!"
    },
    sections: [
      {
        icon: '🔦',
        title: { fr: "Peindre dans le noir des grottes", en: "Painting deep in the caves" },
        content: {
          fr: "Munis de torches ou de petites lampes à graisse, les humains de la Préhistoire s'enfonçaient au fond des cavernes. Sur les parois rocheuses, ils peignaient des scènes spectaculaires.",
          en: "Carrying torches or small animal-fat lamps, prehistoric humans walked deep inside dark caves. On the rocky walls, they created breathtaking paintings."
        }
      },
      {
        icon: '🎨',
        title: { fr: "Des couleurs venues de la Terre", en: "Colors made from the Earth" },
        content: {
          fr: "Pour peindre, ils broyaient des minéraux comme l'ocre rouge et jaune, ou utilisaient du charbon noir. Ils mélangeaient ces poudres avec de l'eau pour obtenir de la peinture.",
          en: "To paint, they ground natural minerals into red and yellow ochre, or used black charcoal. They mixed these powders with water to make natural paints."
        }
      },
      {
        icon: '✋',
        title: { fr: "Empreintes de mains et animaux", en: "Handprints and animals" },
        content: {
          fr: "Ils représentaient des bisons, des chevaux, des cerfs ou des mammouths. En posant leur main contre la paroi et en soufflant la couleur autour, ils laissaient aussi leur silhouette.",
          en: "They drew bison, horses, deer, and giant mammoths. By placing a hand on the rock and blowing color around it, they left delicate hand stencils."
        }
      },
      {
        icon: '❓',
        title: { fr: "Un grand mystère à contempler", en: "A fascinating mystery" },
        content: {
          fr: "Ces peintures servaient-elles à raconter des histoires, à célébrer la nature ou à des cérémonies secrètes ? Même aujourd'hui, les scientifiques continuent d'admirer leur mystère.",
          en: "Did these artworks tell stories, celebrate nature, or serve sacred ceremonies? Even today, scientists continue to marvel at their beauty and mysteries."
        }
      }
    ],
    relatedTopicIds: ['prehistoire', 'grottes-souterraines']
  },
  {
    id: 'premiers-villages',
    title: { fr: "Les Premiers Villages", en: "The First Villages" },
    category: { fr: 'Histoire 🏺', en: 'History 🏺' },
    categoryKey: 'histoire',
    icon: '🛖',
    shortDesc: { fr: "La naissance des premières maisons fixes.", en: "The birth of the first permanent homes." },
    fullContent: {
      fr: "Au lieu de voyager tout le temps pour chasser, les humains ont appris à faire pousser des plantes (l'agriculture) et à élever des animaux. Ils ont construit les premières maisons solides en terre et en bois, formant les tout premiers villages de l'histoire !",
      en: "Instead of traveling all the time to hunt, humans learned to grow plants (agriculture) and raise animals. They built the first solid houses out of mud and wood, forming the very first villages in history!"
    },
    funFact: {
      fr: "L'invention de l'agriculture s'appelle la révolution néolithique !",
      en: "The invention of agriculture is called the Neolithic Revolution!"
    },
    sections: [
      {
        icon: '🌾',
        title: { fr: "L'essor de l'agriculture", en: "The rise of farming" },
        content: {
          fr: "Au fil des millénaires, certains groupes humains ont commencé à semer des céréales et à apprivoiser des bêtes. Comme les récoltes demandaient du temps et des soins, ils ont choisi de rester plus longtemps au même endroit.",
          en: "Over thousands of years, some human groups began sowing grains and raising animals. Because growing crops required patience and daily care, families stayed longer in one place."
        }
      },
      {
        icon: '🛖',
        title: { fr: "Des maisons durables", en: "Permanent shelters" },
        content: {
          fr: "Pour remplacer les campements éphémères de peaux et de branchages, les habitants bâtissent des huttes solides avec des troncs de bois, des pierres et de la terre séchée.",
          en: "Replacing temporary camps made of branches and hides, villagers built sturdy homes using tree trunks, stacked stones, and sun-dried mud bricks."
        }
      },
      {
        icon: '🤝',
        title: { fr: "Vivre et s'entraider", en: "Living together in community" },
        content: {
          fr: "Dans le village naissant, chacun participe : stocker les réserves de blé, garder les troupeaux, fabriquer des poteries ou moudre le grain. L'entraide rend la communauté plus forte.",
          en: "In early villages, everyone contributed: storing wheat harvests, tending herds, shaping clay pots, or grinding grain. Cooperation made the community strong and resilient."
        }
      },
      {
        icon: '🌍',
        title: { fr: "Une transition progressive", en: "A gradual global change" },
        content: {
          fr: "Tous les humains ne se sont pas installés au même moment ni au même rythme. Beaucoup de populations ont continué à voyager en nomades en fonction des saisons et du gibier.",
          en: "People did not settle down all at once or in the same way everywhere. Many communities continued living as nomadic hunters and travelers across different regions."
        }
      }
    ],
    relatedTopicIds: ['prehistoire', 'dompteur-feu']
  },
  {
    id: 'sedentarisation',
    title: { fr: "On s'installe !", en: "Settling Down!" },
    category: { fr: 'Histoire 🏺', en: 'History 🏺' },
    categoryKey: 'histoire',
    icon: '🛖',
    shortDesc: { fr: "Arrêter de voyager pour construire un vrai chez-soi.", en: "Stopping travel to build a true home." },
    fullContent: {
      fr: "Au lieu de déménager sans cesse, les humains décident de rester au même endroit près d'une rivière. En construisant des maisons durables, ils créent un foyer chaleureux pour protéger leur famille et grandir ensemble au fil des saisons.",
      en: "Instead of moving constantly, humans decided to stay in one place near a river. By building lasting houses, they created a warm home to protect their family and grow together through the seasons."
    },
    funFact: {
      fr: "Les premières huttes étaient souvent rondes comme de petits nids douillets !",
      en: "The first huts were often round like cozy little nests!"
    },
    sections: [
      {
        icon: '🛖',
        title: { fr: 'Poser ses affaires', en: 'Putting down roots' },
        content: {
          fr: "Pendant très longtemps, les humains étaient nomades et voyageaient sans cesse. Peu à peu, ils ont choisi de rester vivre au même endroit.",
          en: 'For a very long time, humans were nomads who moved constantly. Gradually, they chose to settle and live in one place.'
        }
      },
      {
        icon: '🌊',
        title: { fr: "Au bord de l'eau", en: 'Beside the water' },
        content: {
          fr: "Ils s'installaient souvent près d'une rivière ou d'un lac. L'eau fraîche était précieuse pour boire, cuisiner et arroser les plantations.",
          en: 'They often settled near a river or freshwater lake. Fresh water was essential for drinking, cooking, and watering crops.'
        }
      },
      {
        icon: '🏡',
        title: { fr: 'Des maisons solides', en: 'Sturdy lasting homes' },
        content: {
          fr: "Au lieu de tentes légères, ils ont bâti des huttes en bois, en roseaux et en terre séchée, parfaites pour traverser les saisons.",
          en: 'Instead of light tents, they built huts with wood, reeds, and dried mud, perfect for weathering all four seasons.'
        }
      },
      {
        icon: '🌾',
        title: { fr: 'Le temps des récoltes', en: 'Harvest time' },
        content: {
          fr: "En restant sur place, les familles ont pu cultiver des champs, soigner leurs troupeaux et stocker des graines pour l'hiver.",
          en: 'By staying put, families could tend fields, care for animals, and store grain to feed everyone through winter.'
        }
      }
    ],
    relatedTopicIds: ['premiers-villages', 'debuts-agriculture', 'debuts-elevage']
  },
  {
    id: 'murs-terre',
    title: { fr: "Murs de Terre", en: "Earth Walls" },
    category: { fr: 'Histoire 🏺', en: 'History 🏺' },
    categoryKey: 'histoire',
    icon: '🧱',
    shortDesc: { fr: "Mélanger la terre et la paille pour des maisons solides.", en: "Mixing earth and straw for solid houses." },
    fullContent: {
      fr: "Pour fabriquer des maisons solides, les humains mélangent de la terre mouillée avec de la paille et de l'eau. En séchant au soleil, ce mélange devient dur comme de la pierre, montrant que la nature nous donne tout pour nous abriter.",
      en: "To make strong houses, humans mixed wet earth with straw and water. When dried in the sun, this mixture became hard as stone, showing that nature gives us everything we need for shelter."
    },
    funFact: {
      fr: "Cette technique s'appelle le pisé et elle garde la maison fraîche en été et chaude en hiver !",
      en: "This technique is called cob or pisé, and it keeps the house cool in summer and warm in winter!"
    },
    sections: [
      {
        icon: '🌾',
        title: { fr: 'La terre et la paille', en: 'Earth and straw' },
        content: {
          fr: "Pour bâtir des murs solides, les premiers villageois mélangeaient de la terre avec de la paille et de l'eau. La paille évite que le mur ne se fende.",
          en: 'To build strong walls, early villagers mixed clay soil with straw and water. The straw keeps the earth from cracking as it dries.'
        }
      },
      {
        icon: '☀️',
        title: { fr: 'Sécher sous le soleil', en: 'Sun-dried bricks' },
        content: {
          fr: "Ils moulaient cette pâte en briques rectangulaires. En séchant sous le soleil d'été, la terre devenait aussi dure et résistante que de la pierre.",
          en: 'They shaped this paste into rectangular bricks. Dried under the summer sun, the earth became as hard and durable as stone.'
        }
      },
      {
        icon: '🏡',
        title: { fr: 'Un abri tempéré', en: 'A cozy temperate home' },
        content: {
          fr: "Les murs en terre épaisse sont magiques : ils gardent la maison bien fraîche en été et retiennent la chaleur du foyer en hiver.",
          en: 'Thick earthen walls are wonderful: they keep the house cool in summer and trap the fireplace heat in winter.'
        }
      },
      {
        icon: '🌍',
        title: { fr: 'Une tradition universelle', en: 'A worldwide tradition' },
        content: {
          fr: "Partout dans le monde, de nombreux peuples ont utilisé la terre pour bâtir de jolis villages, des greniers et même de grands châteaux.",
          en: 'All around the world, many cultures used earth to build charming villages, grain silos, and even great castles.'
        }
      }
    ],
    relatedTopicIds: ['sedentarisation', 'premiers-villages', 'chateaux']
  },
  {
    id: 'debuts-agriculture',
    title: { fr: "Le Secret des Graines", en: "The Seed Secret" },
    category: { fr: 'Histoire 🏺', en: 'History 🏺' },
    categoryKey: 'histoire',
    icon: '🌾',
    shortDesc: { fr: "Faire pousser sa propre nourriture dans la terre.", en: "Growing your own food in the earth." },
    fullContent: {
      fr: "Les humains remarquent que les graines tombées dans la terre font pousser de nouvelles plantes. En apprenant à semer et à s'occuper de la terre avec patience, ils découvrent comment coopérer avec la nature pour nourrir tout le village.",
      en: "Humans noticed that seeds falling into the soil grew into new plants. By learning to sow and care for the land with patience, they discovered how to cooperate with nature to feed the whole village."
    },
    funFact: {
      fr: "Le blé et l'orge ont été les toutes premières plantes cultivées par les humains !",
      en: "Wheat and barley were the very first plants grown by humans!"
    },
    sections: [
      {
        icon: '🌱',
        title: { fr: "Le cycle magique des graines", en: "The cycle of seeds" },
        content: {
          fr: "En observant la nature, les humains remarquent que les graines tombées au sol germent et donnent de nouveaux épis. Ils commencent alors à semer délibérément les plantes les plus nutritives.",
          en: "Watching nature closely, early humans noticed that fallen seeds sprout into new shoots. They slowly began gathering and intentionally replanting the most nutritious wild grains."
        }
      },
      {
        icon: '🌍',
        title: { fr: "Une aventure aux quatre coins du monde", en: "A worldwide turning point" },
        content: {
          fr: "L'agriculture n'est pas née en un seul jour ni en un seul lieu : elle est apparue indépendamment au Moyen-Orient avec le blé, en Asie avec le riz et en Amérique avec le maïs.",
          en: "Farming did not begin in a single place or day: it arose independently with wheat in the Middle East, rice in Asia, and corn across the Americas."
        }
      },
      {
        icon: '🌾',
        title: { fr: "Prendre soin de la terre", en: "Working with the soil" },
        content: {
          fr: "Pour faire pousser les cultures, il fallait désherber, arroser et attendre la saison de la moisson. Les humains fabriquent les premières faucilles en pierre et des réserves pour stocker les grains.",
          en: "Nurturing crops required weeding, watering, and waiting for harvest season. People crafted early stone sickles to reap ears of grain and clay silos to store food safely."
        }
      },
      {
        icon: '🏡',
        title: { fr: "Champs, troupeaux et villages", en: "Fields, herds, and homes" },
        content: {
          fr: "En cultivant la terre et en élevant les premiers troupeaux, les communautés se fixent plus durablement près de leurs champs. Cette nouvelle vie transforme profondément l'histoire humaine.",
          en: "By tending crops and domesticating herds, human families settled down permanently near their fields. This new way of life laid the foundations for enduring villages and towns."
        }
      }
    ],
    relatedTopicIds: ['premiers-villages', 'soleil']
  },
  {
    id: 'debuts-elevage',
    title: { fr: "Nouveaux Amis", en: "New Friends" },
    category: { fr: 'Histoire 🏺', en: 'History 🏺' },
    categoryKey: 'histoire',
    icon: '🐐',
    shortDesc: { fr: "Prendre soin des animaux qui vivent avec nous.", en: "Caring for animals that live with us." },
    fullContent: {
      fr: "Les humains commencent à vivre auprès de certains animaux calmes, comme les chèvres et les moutons. En apprenant à les protéger et à en prendre soin avec douceur, ils réalisent que le respect mutuel apporte de la chaleur et du lait pour tous.",
      en: "Humans began to live alongside gentle animals, like goats and sheep. By learning to protect and care for them gently, they realized that mutual respect brings warmth and milk for everyone."
    },
    funFact: {
      fr: "Les chèvres ont été parmi les premiers animaux à s'associer aux humains pour de bon !",
      en: "Goats were among the first animals to associate with humans for good!"
    },
    sections: [
      {
        icon: '🐾',
        title: { fr: 'Des rencontres douces', en: 'Gentle encounters' },
        content: {
          fr: "Dans plusieurs parties du monde, certains animaux ont commencé à s'approcher sans peur des campements humains.",
          en: "In several parts of the world, certain animals began approaching human settlements without fear."
        }
      },
      {
        icon: '🤝',
        title: { fr: 'Apprivoiser et soigner', en: 'Taming and caring' },
        content: {
          fr: "Au départ, les villageois ont apprivoisé quelques bêtes blessées ou jeunes en leur donnant de l'eau et de l'herbe.",
          en: "At first, villagers tamed a few young or hurt animals by sharing fresh water and grass."
        }
      },
      {
        icon: '🐐',
        title: { fr: "L'élevage au fil du temps", en: 'Farming over time' },
        content: {
          fr: "En gardant des troupeaux protégés des prédateurs, les familles ont obtenu de la laine chaude et du lait frais.",
          en: "By keeping herds safe from predators, families gained warm wool and fresh milk."
        }
      },
      {
        icon: '🏡',
        title: { fr: 'Vivre ensemble pour toujours', en: 'Living together for good' },
        content: {
          fr: "Après de très nombreuses générations, ces animaux sont devenus de fidèles compagnons habitués aux humains.",
          en: "After many generations, these animals became faithful companions accustomed to humans."
        }
      }
    ],
    relatedTopicIds: ['prehistoire', 'premiers-villages', 'debuts-agriculture']
  },
  {
    id: 'invention-poterie',
    title: { fr: "Les Pots Magiques", en: "Magic Pots" },
    category: { fr: 'Histoire 🏺', en: 'History 🏺' },
    categoryKey: 'histoire',
    icon: '🏺',
    shortDesc: { fr: "Modeler l'argile pour garder les récoltes à l'abri.", en: "Shaping clay to keep harvests safe." },
    fullContent: {
      fr: "En façonnant de l'argile souple avec leurs mains puis en la cuisant dans le feu, les humains inventent la poterie. Ces récipients magnifiques et solides permettent de conserver l'eau et les grains précieux, évitant ainsi le gaspillage.",
      en: "By shaping soft clay with their hands and baking it in fire, humans invented pottery. These beautiful, strong containers allowed them to store water and precious grains, preventing waste."
    },
    funFact: {
      fr: "Les potiers dessinaient souvent de jolies lignes et des animaux sur leurs pots pour les décorer !",
      en: "Potters often drew pretty lines and animals on their pots to decorate them!"
    },
    sections: [
      {
        icon: '🌍',
        title: { fr: 'Une idée partagée', en: 'A shared idea' },
        content: {
          fr: "Dans plusieurs régions du monde, les humains ont découvert comment utiliser la terre mouillée.",
          en: "In several parts of the world, humans discovered how to use wet earth."
        }
      },
      {
        icon: '🖐️',
        title: { fr: "L'argile sous les doigts", en: 'Clay under fingers' },
        content: {
          fr: "L'argile est une terre douce et malléable qu'on façonne à la main pour créer des récipients.",
          en: "Clay is a soft earth that you shape by hand to create vessels."
        }
      },
      {
        icon: '🔥',
        title: { fr: 'La magie du feu', en: 'The magic of fire' },
        content: {
          fr: "En cuisant dans les flammes, la terre molle durcit et devient solide comme de la pierre.",
          en: "Baking in the flames makes the soft earth turn as hard as stone."
        }
      },
      {
        icon: '🏺',
        title: { fr: 'Des pots pour tout garder', en: 'Pots to keep everything' },
        content: {
          fr: "Ces récipients protègent l'eau fraîche, les graines et les repas du quotidien.",
          en: "These vessels protect cool water, seeds, and daily meals."
        }
      }
    ],
    relatedTopicIds: ['prehistoire', 'dompteur-feu', 'premiers-villages']
  },
  {
    id: 'vie-communaute',
    title: { fr: "Main dans la Main", en: "Hand in Hand" },
    category: { fr: 'Histoire 🏺', en: 'History 🏺' },
    categoryKey: 'histoire',
    icon: '🤝',
    shortDesc: { fr: "S'entraider pour rendre le village plus fort.", en: "Helping each other to make the village stronger." },
    fullContent: {
      fr: "Vivre ensemble au même endroit demande de s'organiser et de partager les tâches quotidiennes. En unissant leurs forces pour bâtir et protéger leur village, les premiers hommes apprennent que l'amitié et la solidarité sont les plus beaux des trésors.",
      en: "Living together in one place required organization and sharing daily tasks. By joining forces to build and protect their village, early humans learned that friendship and solidarity are the greatest treasures."
    },
    funFact: {
      fr: "Les maisons d'un village étaient parfois collées sans rue, et on entrait par le toit avec des échelles !",
      en: "Houses in a village were sometimes packed together without streets, and people entered through the roof using ladders!"
    },
    sections: [
      {
        icon: '🏡',
        title: { fr: 'Des villages différents', en: 'Different villages' },
        content: {
          fr: "Les premiers villages n'étaient pas tous pareils : certains s'abritaient près des rivières, d'autres sur des collines.",
          en: "Early villages were not all the same: some settled near rivers, others high on hills."
        }
      },
      {
        icon: '🌾',
        title: { fr: 'Partager le travail', en: 'Sharing the work' },
        content: {
          fr: "Pour réussir, les habitants se répartissaient les tâches : cultiver la terre, s'occuper des bêtes et préparer les repas.",
          en: "To thrive, neighbors shared daily chores: tending crops, caring for animals, and preparing meals."
        }
      },
      {
        icon: '🤝',
        title: { fr: "S'entraider et décider", en: 'Helping and deciding' },
        content: {
          fr: "Vivre ensemble demandait de discuter, de trouver des règles communes et de réparer les maisons ensemble.",
          en: "Living together meant talking things over, finding shared rules, and repairing homes together."
        }
      },
      {
        icon: '🔄',
        title: { fr: 'Une organisation qui change', en: 'Changing ways of life' },
        content: {
          fr: "Au fil des siècles, les groupes humains ont appris à adapter leurs coutumes à chaque saison et chaque région.",
          en: "Over centuries, human communities learned to adapt their customs to each season and region."
        }
      }
    ],
    relatedTopicIds: ['premiers-villages', 'prehistoire', 'debuts-agriculture']
  },
  {
    id: 'tissage-laine',
    title: { fr: "Le Fil et l'Aiguille", en: "Thread and Needle" },
    category: { fr: 'Histoire 🏺', en: 'History 🏺' },
    categoryKey: 'histoire',
    icon: '🧶',
    shortDesc: { fr: "Tisser la laine des moutons pour faire des habits.", en: "Weaving wool from sheep to make clothes." },
    fullContent: {
      fr: "Grâce aux moutons, les humains découvrent qu'ils peuvent filer et tisser la laine. En croisant les fils avec patience et créativité, ils fabriquent des vêtements doux et protecteurs qui les gardent bien au chaud face aux vents froids.",
      en: "Thanks to sheep, humans discovered they could spin and weave wool. By crossing threads with patience and creativity, they made soft and protective clothes that kept them warm against cold winds."
    },
    funFact: {
      fr: "Les premiers métiers à tisser étaient faits de simples branches de bois lestées par de grosses pierres !",
      en: "The first weaving looms were made of simple wooden branches weighted down by heavy stones!"
    },
    sections: [
      {
        icon: '🐑',
        title: { fr: 'De la toison au poil doux', en: 'From fleece to soft wool' },
        content: {
          fr: "Les humains ont récolté la laine bouclée des moutons et d'autres fibres pour se protéger du froid.",
          en: "Humans gathered curly wool from sheep and other fibers to protect themselves from the cold."
        }
      },
      {
        icon: '🧶',
        title: { fr: 'Filer pour créer le brin', en: 'Spinning to make yarn' },
        content: {
          fr: "Le filage consiste à étirer et rouler la laine entre ses doigts ou avec un fuseau pour former un long fil solide.",
          en: "Spinning means stretching and twisting wool with fingers or a drop spindle into a strong continuous thread."
        }
      },
      {
        icon: '🧵',
        title: { fr: 'Croiser sur le métier', en: 'Crossing on the loom' },
        content: {
          fr: "Le tissage consiste ensuite à entrecroiser ces fils dessus et dessous pour fabriquer un morceau de tissu.",
          en: "Weaving then means interlacing these threads over and under to create a sheet of cloth."
        }
      },
      {
        icon: '🌍',
        title: { fr: 'Des savoir-faire multiples', en: 'Many different crafts' },
        content: {
          fr: "Dans le monde entier, chaque peuple a inventé ses propres motifs, couleurs et façons de tisser les habits.",
          en: "Across the world, each community invented its own patterns, colors, and ways of weaving clothing."
        }
      }
    ],
    relatedTopicIds: ['debuts-elevage', 'prehistoire', 'premiers-villages']
  },
  {
    id: 'megalithes',
    title: { fr: "Les Pierres Géantes", en: "Giant Stones" },
    category: { fr: 'Histoire 🏺', en: 'History 🏺' },
    categoryKey: 'histoire',
    icon: '🗿',
    shortDesc: { fr: "Déplacer d'énormes rochers ensemble pour laisser une trace.", en: "Moving huge rocks together to leave a mark." },
    fullContent: {
      fr: "Pour célébrer la nature ou se souvenir de leurs ancêtres, les villageois unissent leurs forces pour ériger de gigantesques blocs de pierre. Ce travail immense prouve qu'avec de l'organisation et du courage partagé, aucun obstacle n'est trop lourd à porter.",
      en: "To celebrate nature or remember their ancestors, villagers joined forces to erect gigantic stone blocks. This immense work proves that with organization and shared courage, no obstacle is too heavy to carry."
    },
    funFact: {
      fr: "Certaines de ces pierres pèsent autant que plusieurs éléphants réunis, et pourtant ils ont réussi à les lever !",
      en: "Some of these stones weigh as much as several elephants combined, and yet they managed to lift them!"
    },
    sections: [
      {
        icon: '🗿',
        title: { fr: "Des blocs géants taillés dans la roche", en: "Huge stone blocks" },
        content: {
          fr: "Le mot mégalithe veut dire « grande pierre ». Durant la Préhistoire, des communautés ont extrait d'immenses blocs rocheux pour les dresser fièrement dans le paysage.",
          en: "The word megalith means 'large stone'. In prehistoric times, human communities quarried enormous blocks of rock and erected them proudly across the landscape."
        }
      },
      {
        icon: '🤝',
        title: { fr: "Une immense aventure collective", en: "A massive team effort" },
        content: {
          fr: "Sans machines modernes, déplacer ces colosses de plusieurs tonnes demandait l'effort uni de centaines de personnes avec des cordes, des rondins de bois et des leviers.",
          en: "Without modern engines, moving these multi-ton giants required hundreds of people working together with strong ropes, wooden rollers, and levers."
        }
      },
      {
        icon: '🏛️',
        title: { fr: "Menhirs, dolmens et cercles", en: "Standing stones and tombs" },
        content: {
          fr: "Certaines pierres se dressent toutes seules : ce sont les menhirs. D'autres forment des tables de pierre appelées dolmens, ou de grands cercles comme le célèbre site de Stonehenge.",
          en: "Some stones stand alone as upright menhirs. Others form covered stone chambers called dolmens, or grand circular monuments like the famous Stonehenge."
        }
      },
      {
        icon: '✨',
        title: { fr: "Des rôles multiples et mystérieux", en: "Many mysterious roles" },
        content: {
          fr: "Beaucoup de dolmens servaient de sépultures collectives. D'autres monuments servaient de repères dans le territoire, de lieux de rassemblement ou d'observation du ciel.",
          en: "Many dolmens were collective burial chambers. Other stone sites served as territory markers, ceremonial gathering places, or calendars aligned with the sun."
        }
      }
    ],
    relatedTopicIds: ['pyramides', 'prehistoire']
  },
  {
    id: 'ecriture-sacree',
    title: { fr: "L'Écriture Sacrée", en: "Sacred Writing" },
    category: { fr: 'Histoire 🏺', en: 'History 🏺' },
    categoryKey: 'histoire',
    icon: '📜',
    shortDesc: { fr: "Dessiner des histoires avec des hiéroglyphes.", en: "Drawing stories with hieroglyphs." },
    fullContent: {
      fr: "Les Égyptiens dessinaient de jolis petits dessins appelés hiéroglyphes sur du papier de roseau (le papyrus). En gravant leurs pensées, ils ont appris à faire voyager leurs mots dans le temps, nous rappelant l'importance de partager nos histoires.",
      en: "Egyptians drew beautiful little pictures called hieroglyphs on reed paper (papyrus). By carving their thoughts, they learned to make their words travel through time, reminding us of the importance of sharing our stories."
    },
    funFact: {
      fr: "Il y avait plus de 700 dessins différents à retenir pour savoir écrire !",
      en: "There were over 700 different drawings to remember to know how to write!"
    },
    sections: [
      {
        icon: '📜',
        title: { fr: "Un système d'écriture fascinant", en: "A fascinating writing system" },
        content: {
          fr: "Dans l'Égypte ancienne, les hiéroglyphes étaient une écriture complète faite de centaines de signes représentant des oiseaux, des yeux, des outils ou des plantes.",
          en: "In ancient Egypt, hieroglyphs formed a complete writing system made of hundreds of signs depicting birds, eyes, tools, and water plants."
        }
      },
      {
        icon: '🪨',
        title: { fr: "Sur la pierre et le papyrus", en: "On stone and papyrus" },
        content: {
          fr: "On gravait et peignait ces symboles sur les murs des temples, mais on écrivait aussi des lettres, des lois et des comptes sur des rouleaux de roseau appelés papyrus.",
          en: "People carved and painted these symbols on temple walls, but they also wrote daily letters, laws, and records on reed paper scrolls called papyrus."
        }
      },
      {
        icon: '✍️',
        title: { fr: "Le métier précieux de scribe", en: "The honored scribes" },
        content: {
          fr: "Apprendre tous ces signes demandait de longues années d'étude. Les scribes occupaient une place très respectée pour noter les récits historiques et transmettre les connaissances.",
          en: "Learning all these signs required years of dedicated practice. Scribes were highly respected scholars who recorded events, managed stores, and preserved knowledge."
        }
      },
      {
        icon: '🔍',
        title: { fr: "Le mystère déchiffré", en: "Decoding the ancient mystery" },
        content: {
          fr: "Ces signes ne sont pas de simples illustrations : certains représentent des sons, d'autres des idées entières. Grâce à la pierre de Rosette, les chercheurs ont pu percer leurs secrets.",
          en: "Decoding these symbols revealed that some stand for sounds while others represent whole concepts. Thanks to the Rosetta Stone, scholars unlocked the rich stories of Egypt."
        }
      }
    ],
    relatedTopicIds: ['pyramides', 'fleuve-nil']
  },
  {
    id: 'empire-incas',
    title: { fr: "L'Empire des Incas", en: "The Inca Empire" },
    category: { fr: 'Histoire 🏺', en: 'History 🏺' },
    categoryKey: 'histoire',
    icon: '☀️',
    shortDesc: { fr: "Les cités secrètes nichées dans les nuages.", en: "Secret cities nestled in the clouds." },
    fullContent: {
      fr: "Les Incas ont construit de magnifiques routes et de grandes cités de pierre tout en haut des montagnes escarpées. En vivant en harmonie avec le soleil et la terre, ils nous montrent qu'avec de la patience, on peut accomplir des merveilles.",
      en: "The Incas built magnificent roads and grand stone cities high up in the steep mountains. By living in harmony with the sun and earth, they show us that with patience, we can achieve wonders."
    },
    funFact: {
      fr: "Le Machu Picchu est une ville inca cachée si haut dans les nuages qu'elle est restée secrète pendant très longtemps !",
      en: "Machu Picchu is an Inca city hidden so high in the clouds that it remained a secret for a very long time!"
    },
    sections: [
      {
        icon: '🏔️',
        title: { fr: 'Des cités dans les nuages', en: 'Cities in the clouds' },
        content: {
          fr: 'Dans la haute chaîne des Andes, les bâtisseurs incas ont taillé de gigantesques blocs de pierre pour ériger des forteresses solides comme Machu Picchu.',
          en: 'High in the Andes mountains, Inca builders cut giant stone blocks to construct sturdy stone fortresses like Machu Picchu.',
        },
      },
      {
        icon: '🌱',
        title: { fr: 'Des cultures en marches d’escalier', en: 'Stepped terrace farming' },
        content: {
          fr: 'Sur les pentes raides des montagnes, ils aménageaient des terrasses en escalier pour cultiver le maïs et des centaines de variétés de pommes de terre.',
          en: 'On steep mountain slopes, they carved stepped terraces to grow corn and hundreds of varieties of nourishing potatoes.',
        },
      },
      {
        icon: '🛣️',
        title: { fr: 'Des chemins à travers l’Empire', en: 'Paths across the empire' },
        content: {
          fr: 'Des messagers rapides couraient à pied le long de milliers de kilomètres de sentiers pavés et de ponts suspendus pour relier tout le pays.',
          en: 'Fast couriers ran on foot along thousands of kilometers of paved trails and rope bridges to connect the entire empire.',
        },
      },
      {
        icon: '🧶',
        title: { fr: 'Une culture toujours vivante', en: 'Living traditions today' },
        content: {
          fr: 'Aujourd’hui encore, les peuples andins parlent le quechua, tissent la laine chaude des lamas et célèbrent avec fierté leurs traditions ancestrales.',
          en: 'Even today, Andean communities speak Quechua, weave warm llama wool, and proudly keep their ancestral customs alive.',
        },
      },
    ],
    relatedTopicIds: ['pyramides', 'soleil'],
  },
  {
    id: 'cathedrales',
    title: { fr: "Les Grandes Cathédrales", en: "Great Cathedrals" },
    category: { fr: 'Histoire 🏺', en: 'History 🏺' },
    categoryKey: 'histoire',
    icon: '⛪',
    shortDesc: { fr: "De gigantesques églises de pierre décorées de vitraux.", en: "Gigantic stone churches decorated with stained glass." },
    fullContent: {
      fr: "Au Moyen Âge, les bâtisseurs rivalisent d'adresse pour construire d'immenses églises dont les tours touchent presque le ciel. Leurs fenêtres magiques en morceaux de verre colorés, appelées vitraux, racontent de merveilleuses histoires illuminées par le soleil.",
      en: "In the Middle Ages, builders competed to build huge churches whose towers almost touched the sky. Their magical windows made of colored glass, called stained glass, told wonderful stories illuminated by the sun."
    },
    funFact: {
      fr: "Certaines cathédrales ont mis plus de 200 ans à être entièrement finies, soit le temps de plusieurs générations de bâtisseurs !",
      en: "Some cathedrals took over 200 years to be fully completed, which is the lifespan of several generations of builders!"
    },
    sections: [
      {
        icon: '⛪',
        title: { fr: "Des géantes de pierre", en: "Giants of stone" },
        content: {
          fr: "Au Moyen Âge, les villes dressent de splendides cathédrales au cœur des cités. Construites en pierre taillée, leurs tours et leurs flèches s'élèvent très haut vers les nuages.",
          en: "During the Middle Ages, towns raised grand cathedrals at their very center. Built from carved stone, their towers and spires soared high toward the clouds."
        }
      },
      {
        icon: '🏗️',
        title: { fr: "Le travail de plusieurs générations", en: "Generations of builders" },
        content: {
          fr: "Il fallait souvent plus de cent ans pour bâtir une telle merveille. Des tailleurs de pierre, charpentiers et maîtres d'œuvre se transmettaient leur savoir d'une génération à l'autre.",
          en: "Completing such a wonder often took over a hundred years. Stonemasons, carpenters, and master builders passed their skills and plans down from one generation to the next."
        }
      },
      {
        icon: '🏛️',
        title: { fr: "Des arcs et des voûtes solides", en: "Strong arches and vaults" },
        content: {
          fr: "Pour porter le poids immense des toits sans s'effondrer, les bâtisseurs inventent des voûtes croisées et des arcs-boutants en pierre qui soutiennent les hauts murs extérieurs.",
          en: "To support heavy ceilings without collapsing, builders designed ribbed vaults and flying buttresses that carried the weight out to strong exterior supports."
        }
      },
      {
        icon: '🎨',
        title: { fr: "La lumière des vitraux", en: "The light of stained glass" },
        content: {
          fr: "D'immenses fenêtres en verre coloré ornent les murs. Lorsque le soleil brille à travers ces vitraux, il projette des reflets étincelants et raconte des scènes illustrées.",
          en: "Vast windows of colored glass adorn the walls. When sunlight streams through these stained glass panels, it projects glowing colors and tells illustrated stories."
        }
      }
    ],
    relatedTopicIds: ['chateaux', 'pyramides']
  },
  {
    id: 'calligraphie',
    title: { fr: "Moines et Calligraphie", en: "Monks and Calligraphy" },
    category: { fr: 'Histoire 🏺', en: 'History 🏺' },
    categoryKey: 'histoire',
    icon: '✒️',
    shortDesc: { fr: "L'art de recopier patiemment les livres à la main.", en: "The art of patiently copying books by hand." },
    fullContent: {
      fr: "Bien avant l'invention des machines à imprimer, des moines écrivains appelaient copistes écrivaient de magnifiques lettres à la plume d'oie. Avec de la belle encre noire et des peintures dorées, ils passaient des années à recopier les livres pour préserver le savoir du monde.",
      en: "Long before printing machines, writing monks called scribes wrote beautiful letters with goose feathers. Using fine black ink and gold paint, they spent years copying books to preserve the world's knowledge."
    },
    funFact: {
      fr: "La première lettre d'une page était souvent géante et décorée de petits dragons ou de jolies fleurs en or !",
      en: "The first letter of a page was often giant and decorated with small dragons or pretty gold flowers!"
    },
    sections: [
      {
        icon: '✒️',
        title: { fr: "La plume et l'encre noire", en: 'Quill and black ink' },
        content: {
          fr: "Au Moyen Âge, les moines copistes taillaient des plumes d'oie bien pointues pour écrire avec de l'encre naturelle.",
          en: 'In the Middle Ages, scribe monks carved pointed goose quills to write with natural ink.'
        }
      },
      {
        icon: '📖',
        title: { fr: 'Copier mot après mot', en: 'Copying word by word' },
        content: {
          fr: "Pendant de longs mois dans le silence, ils recopiaient des livres entiers à la main pour préserver les connaissances.",
          en: 'For long quiet months, they copied entire books by hand to preserve knowledge for the future.'
        }
      },
      {
        icon: '🎨',
        title: { fr: 'Des lettrines enluminées', en: 'Illuminated letters' },
        content: {
          fr: "La première lettre de chaque chapitre était peinte comme un tableau, décorée d'or brillant, de feuillages et d'animaux.",
          en: 'The first letter of each chapter was painted like a picture, adorned with shining gold, leaves, and friendly animals.'
        }
      },
      {
        icon: '🏛️',
        title: { fr: 'Des trésors pour les siècles', en: 'Treasures for the centuries' },
        content: {
          fr: "Grâce à leur patience infinie, ces magnifiques manuscrits sont arrivés jusqu'à nous dans les musées et bibliothèques.",
          en: 'Thanks to their infinite patience, these magnificent manuscripts have survived for us to admire in museums and libraries.'
        }
      }
    ],
    relatedTopicIds: ['invention-papier', 'imprimerie', 'ecriture-sacree'],
  },
  {
    id: 'moulins-moyen-age',
    title: { fr: "Moulins et Champs", en: "Mills and Fields" },
    category: { fr: 'Histoire 🏺', en: 'History 🏺' },
    categoryKey: 'histoire',
    icon: '🚜',
    shortDesc: { fr: "Utiliser le vent et l'eau pour moudre le grain.", en: "Using wind and water to grind grain." },
    fullContent: {
      fr: "Pour aider le village à cultiver les grands champs, les ingénieurs du Moyen Âge inventent des moulins à vent et à eau. En faisant tourner leurs ailes géantes ou leurs grandes roues, ils écrasent les grains de blé pour faire de la farine et du bon pain.",
      en: "To help the village cultivate large fields, Middle Ages engineers invented wind and water mills. By turning their giant sails or large wheels, they crushed wheat grains to make flour and delicious bread."
    },
    funFact: {
      fr: "Le moulin tournait si fort qu'il pouvait écraser autant de blé en une heure qu'un humain en une journée entière !",
      en: "The mill turned so fast that it could grind as much wheat in one hour as a human could in a whole day!"
    },
    sections: [
      {
        icon: '💨',
        title: { fr: "La force du vent et de l'eau", en: 'Power of wind and water' },
        content: {
          fr: "Pour aider les paysans, les bâtisseurs médiévaux ont inventé de grandes machines actionnées par la brise ou le courant de la rivière.",
          en: 'To help villagers, medieval builders invented large machines driven by the gentle breeze or rushing river water.'
        }
      },
      {
        icon: '🌾',
        title: { fr: 'Écraser le bon grain', en: 'Grinding the golden grain' },
        content: {
          fr: "À l'intérieur, de lourdes meules de pierre tournaient sans arrêt pour écraser les grains de blé et fabriquer de la farine blanche.",
          en: 'Inside, heavy round stones turned nonstop to crush golden wheat kernels into smooth white flour.'
        }
      },
      {
        icon: '🥖',
        title: { fr: 'Du pain pour tout le village', en: 'Bread for the whole village' },
        content: {
          fr: "Grâce au meunier et à son moulin infatigable, les familles pouvaient cuire de grandes miches de pain doré au four à bois.",
          en: 'Thanks to the miller and the tireless mill, families could bake large loaves of golden bread in wood ovens.'
        }
      },
      {
        icon: '⚙️',
        title: { fr: 'Des engrenages ingénieux', en: 'Ingenious gears' },
        content: {
          fr: "Des roues crantées en bois transmettaient le mouvement avec précision, ouvrant la voie aux futures inventions mécaniques.",
          en: 'Notched wooden wheels transferred movement smoothly, paving the way for future mechanical inventions.'
        }
      }
    ],
    relatedTopicIds: ['vent-air', 'roue', 'tissage-laine'],
  },
  {
    id: 'foires-marches',
    title: { fr: "Foires et Marchés", en: "Fairs and Markets" },
    category: { fr: 'Histoire 🏺', en: 'History 🏺' },
    categoryKey: 'histoire',
    icon: '💰',
    shortDesc: { fr: "Les grands rassemblements de marchands venus de loin.", en: "Great gatherings of merchants coming from far away." },
    fullContent: {
      fr: "Dans les villes médiévales, les marchands dressent des tentes colorées pour vendre des épices parfumées, des tissus en soie et de jolis jouets en bois. Ces foires festives animent le village de musiques joyeuses, montrant le plaisir d'échanger et de se rencontrer.",
      en: "In medieval towns, merchants set up colorful tents to sell fragrant spices, silk fabrics, and pretty wooden toys. These festive fairs animated the village with joyful music, showing the pleasure of trading and meeting."
    },
    funFact: {
      fr: "Certains marchands voyageaient pendant des mois à dos de chameau ou en bateau pour ramener du poivre blanc, précieux comme de l'or !",
      en: "Some merchants traveled for months on camelback or boat to bring back white pepper, which was as precious as gold!"
    },
    sections: [
      {
        icon: '🎪',
        title: { fr: 'La fête au cœur du village', en: 'Celebration in the village heart' },
        content: {
          fr: "Plusieurs fois par an, les places des cités médiévales se remplissaient de tentes rayées et de musiques joyeuses.",
          en: 'Several times a year, town squares in the Middle Ages filled with striped tents and cheerful music.'
        }
      },
      {
        icon: '🐪',
        title: { fr: 'Des marchands venus de loin', en: 'Merchants from faraway lands' },
        content: {
          fr: "Des caravanes voyageaient des semaines pour apporter des soieries précieuses, des perles et des épices parfumées.",
          en: 'Caravans traveled for weeks to bring precious silks, shining beads, and fragrant spices.'
        }
      },
      {
        icon: '🪙',
        title: { fr: 'Échanger et marchander', en: 'Trading and bargaining' },
        content: {
          fr: "On pesait les pièces de monnaie et on troquait du fromage, de la laine et de beaux outils en fer dans la bonne humeur.",
          en: 'People weighed coins and traded cheese, warm wool, and iron tools with big smiles and friendly banter.'
        }
      },
      {
        icon: '🤹',
        title: { fr: 'Troubadours et jongleurs', en: 'Jesters and jugglers' },
        content: {
          fr: "Entre deux emplettes, les enfants admiraient les montreurs de marionnettes, les acrobates et les conteurs d'histoires.",
          en: 'Between purchases, children watched puppet masters, acrobats, and wandering storytellers.'
        }
      }
    ],
    relatedTopicIds: ['chateaux', 'tissage-laine', 'moulins-moyen-age'],
  },
  {
    id: 'invention-papier',
    title: { fr: "L'Invention du Papier", en: "The Invention of Paper" },
    category: { fr: 'Histoire 🏺', en: 'History 🏺' },
    categoryKey: 'histoire',
    icon: '📄',
    shortDesc: { fr: "Une feuille légère et magique pour écrire.", en: "A light and magical sheet to write on." },
    fullContent: {
      fr: "Inventé à l'origine en Chine, le papier arrive enfin en Europe au Moyen Âge, remplaçant les lourdes peaux d'animaux. Fabriqué à partir de vieux tissus broyés, il offre un support léger et facile à fabriquer pour partager les contes et le savoir.",
      en: "Originally invented in China, paper finally arrived in Europe during the Middle Ages, replacing heavy animal skins. Made from crushed old cloths, it provided a light and easy-to-make medium to share stories and knowledge."
    },
    funFact: {
      fr: "Avant le papier, on écrivait sur du parchemin en peau de mouton, et il fallait tout un troupeau pour faire un seul grand livre !",
      en: "Before paper, people wrote on sheepskin parchment, and it took a whole flock to make a single large book!"
    },
    sections: [
      {
        icon: '📜',
        title: { fr: 'Avant le papier', en: 'Before paper was made' },
        content: {
          fr: "Autrefois, les gens écrivaient sur de la pierre, des tablettes d'argile ou de lourdes peaux d'animaux appelées parchemins.",
          en: 'Long ago, people wrote on stone, clay tablets, or heavy animal skins called parchment.'
        }
      },
      {
        icon: '🎋',
        title: { fr: 'Le secret des fibres végétales', en: 'The plant fiber secret' },
        content: {
          fr: "En Chine, des artisans ont eu l'idée de broyer des fibres de plantes et de vieux tissus dans l'eau pour former une pâte douce.",
          en: 'In China, craftspeople had the idea of crushing plant fibers and old rags in water to make a soft pulp.'
        }
      },
      {
        icon: '☀️',
        title: { fr: 'Sécher en fines feuilles', en: 'Drying into thin sheets' },
        content: {
          fr: "Cette pâte était étalée sur un grand tamis plat, puis pressée et séchée au soleil pour devenir une feuille bien lisse et légère.",
          en: 'This pulp was spread onto a flat screen, pressed, and dried in the sun to become a smooth, lightweight sheet.'
        }
      },
      {
        icon: '📖',
        title: { fr: 'Le voyage des histoires', en: 'Sharing stories worldwide' },
        content: {
          fr: "Grâce au papier, fabriquer des livres est devenu plus facile, permettant aux contes, dessins et découvertes de voyager dans le monde entier.",
          en: 'Thanks to paper, making books became much easier, allowing stories, drawings, and discoveries to travel across the entire world.'
        }
      }
    ],
    relatedTopicIds: ['imprimerie', 'ecriture-sacree', 'bd-manga']
  }
] as const
