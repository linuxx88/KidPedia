

export const geography = [
  {
    id: 'tour-eiffel',
    title: { fr: 'La Tour Eiffel', en: 'The Eiffel Tower' },
    category: { fr: 'Géographie 🌍', en: 'Geography 🌍' },
    categoryKey: 'geographie',
    icon: '🗼',
    shortDesc: {
      fr: 'Une immense tour de fer située à Paris.',
      en: 'A huge iron tower located in Paris.',
    },
    fullContent: {
      fr: "La Tour Eiffel est située à Paris, la capitale de la France. Elle a été construite pour accueillir les visiteurs d'une grande exposition mondiale en 1889.",
      en: 'The Eiffel Tower is located in Paris, the capital of France. It was built to welcome visitors to a grand world exhibition in 1889.',
    },
    fullContents: [
      {
        fr: "La Tour Eiffel est située à Paris, la capitale de la France. Elle a été construite pour accueillir les visiteurs d'une grande exposition mondiale en 1889.",
        en: 'The Eiffel Tower is located in Paris, the capital of France. It was built to welcome visitors to a grand world exhibition in 1889.',
      },
      {
        fr: "La Tour Eiffel est une immense tour construite entièrement en fer forgé. Elle pèse plus de 10 000 tonnes et s'élève fièrement dans le ciel de Paris.",
        en: 'The Eiffel Tower is a huge tower built entirely of wrought iron. It weighs over 10,000 tons and rises proudly into the Paris sky.'
      }
    ],
    funFact: {
      fr: 'En été, la Tour Eiffel peut grandir de 15 centimètres car le métal se dilate avec la chaleur !',
      en: 'In summer, the Eiffel Tower can grow by 15 centimeters because the metal expands with the heat!',
    },
    funFacts: [
      {
        fr: "La Tour Eiffel a été construite pour fêter le centenaire de la Révolution française !",
        en: "The Eiffel Tower was built to celebrate the centennial of the French Revolution!"
      },
      {
        fr: 'En été, la Tour Eiffel peut grandir de 15 centimètres car le fer se dilate avec la chaleur !',
        en: 'In summer, the Eiffel Tower can grow by 15 centimeters because the iron expands with the heat!',
      }
    ],
    sections: [
      {
        icon: '🗼',
        title: { fr: 'Un repère au bord de la Seine', en: 'A landmark by the Seine' },
        content: {
          fr: 'Dressée près de la Seine dans la ville de Paris, la Tour Eiffel est le symbole le plus célèbre de la capitale française.',
          en: 'Standing beside the Seine in Paris, the Eiffel Tower is the most famous landmark of the French capital.',
        },
      },
      {
        icon: '🔩',
        title: { fr: 'Une dentelle de fer', en: 'Wrought-iron lacework' },
        content: {
          fr: 'L’ingénieur Gustave Eiffel a assemblé des milliers de poutres en fer forgé reliées par des rivets pour résister aux coups de vent.',
          en: 'Engineer Gustave Eiffel assembled thousands of wrought-iron beams fastened with rivets to withstand strong winds.',
        },
      },
      {
        icon: '📏',
        title: { fr: 'Plus de trois cents mètres', en: 'Over three hundred meters' },
        content: {
          fr: 'Culminant à plus de 300 mètres, elle a longtemps été le monument le plus haut du monde avant d’être dépassée par de grands gratte-ciels modernes.',
          en: 'Rising over 300 meters high, it was long the tallest monument in the world before being surpassed by modern skyscrapers.',
        },
      },
      {
        icon: '✨',
        title: { fr: 'Un monument qui rassemble', en: 'A welcoming monument' },
        content: {
          fr: 'Construite pour une grande fête en 1889, elle accueille aujourd’hui des millions de curieux venus du monde entier pour admirer la vue.',
          en: 'Built for a grand exposition in 1889, it now welcomes millions of visitors from across the globe to admire the view.',
        },
      },
    ],
    relatedTopicIds: ['chateaux', 'pyramides'],
  },
  {
    id: 'amazonie',
    title: { fr: "L'Amazonie", en: 'The Amazon' },
    category: { fr: 'Géographie 🌍', en: 'Geography 🌍' },
    categoryKey: 'geographie',
    icon: '🌴',
    shortDesc: {
      fr: 'La plus grande forêt tropicale du monde.',
      en: 'The largest tropical rainforest in the world.',
    },
    fullContent: {
      fr: "L'Amazonie est en Amérique du Sud. On l'appelle le 'poumon de la Terre' car ses arbres produisent beaucoup d'oxygène. Elle abrite des milliers d'animaux incroyables.",
      en: "The Amazon is in South America. It is called the 'lungs of the Earth' because its trees produce a lot of oxygen. It is home to thousands of incredible animals.",
    },
    funFact: {
      fr: "Il y a tellement d'arbres que lorsqu'il pleut, il faut 10 minutes à l'eau pour toucher le sol !",
      en: 'There are so many trees that when it rains, it takes 10 minutes for the water to touch the ground!',
    },
    sections: [
      {
        id: 'foret_geante',
        icon: '🌴',
        title: { fr: 'Une forêt immense et verte', en: 'A vast green forest' },
        content: {
          fr: "L'Amazonie est une gigantesque forêt tropicale d'Amérique du Sud arrosée par un fleuve très puissant.",
          en: 'The Amazon is a gigantic rainforest in South America nourished by a very mighty river.',
        },
      },
      {
        id: 'royaume_vie',
        icon: '🐒',
        title: { fr: 'Un trésor pour les animaux', en: 'A haven for wildlife' },
        content: {
          fr: "Des milliers d'espèces rares comme les singes, jaguars et perroquets vivent cachés sous les branches.",
          en: 'Thousands of rare creatures like monkeys, jaguars, and parrots live safely under the leafy canopy.',
        },
      },
      {
        id: 'climat_et_pluie',
        icon: '🌧️',
        title: { fr: 'La fabrique des nuages', en: 'The cloud maker' },
        content: {
          fr: "Ses millions d'arbres rejettent de la vapeur d'eau qui crée des nuages et fait voyager la pluie.",
          en: 'Its millions of trees release water vapor that creates thick clouds and brings vital rain.',
        },
      },
      {
        id: 'proteger_la_terre',
        icon: '🌍',
        title: { fr: 'Un trésor à préserver', en: 'A treasure to protect' },
        content: {
          fr: 'Cette forêt précieuse stocke du carbone et aide à garder le climat de notre planète doux et stable.',
          en: "This precious forest captures carbon and helps keep our planet's climate gentle, balanced, and stable.",
        },
      },
    ],
    relatedTopicIds: ['arbres', 'singe', 'cycle-eau'],
  },
  {
    id: 'mont-everest',
    title: { fr: 'Le Mont Everest', en: 'Mount Everest' },
    category: { fr: 'Géographie 🌍', en: 'Geography 🌍' },
    categoryKey: 'geographie',
    icon: '🏔️',
    shortDesc: {
      fr: 'Le toit du monde, la plus haute montagne.',
      en: 'The roof of the world, the highest mountain.',
    },
    fullContent: {
      fr: "Le Mont Everest se trouve dans l'Himalaya, entre le Népal et la Chine. Il mesure 8 848 mètres de haut ! C'est si haut que l'air y est très rare et il y fait extrêmement froid toute l'année.",
      en: 'Mount Everest is located in the Himalayas, between Nepal and China. It is 8,848 meters high! It is so high that the air is very thin and it is extremely cold all year round.',
    },
    funFact: {
      fr: "Le Mont Everest continue de grandir d'environ 4 millimètres chaque année car la Terre bouge encore en dessous !",
      en: 'Mount Everest continues to grow by about 4 millimeters each year because the Earth is still moving underneath!',
    },
    sections: [
      {
        icon: '🏔️',
        title: { fr: 'Le toit du monde', en: 'The roof of the world' },
        content: {
          fr: "Dressé dans la chaîne de l'Himalaya, le mont Everest est le sommet le plus élevé de la Terre.",
          en: 'Rising tall in the Himalayan mountain range, Mount Everest is the highest peak on Earth.',
        },
      },
      {
        icon: '❄️',
        title: { fr: 'Un désert de roche et glace', en: 'A desert of rock and ice' },
        content: {
          fr: "Tout en haut, des vents glacials soufflent sur des parois blanches recouvertes d'une neige éternelle.",
          en: 'Near the top, freezing winds howl across snowy cliffs covered with endless thick white ice.',
        },
      },
      {
        icon: '🌬️',
        title: { fr: 'Un air très rare', en: 'Very thin air' },
        content: {
          fr: "À cette immense altitude, l'air contient très peu d'oxygène et respirer devient une épreuve difficile.",
          en: 'At this tremendous altitude, the air has very little oxygen, making normal breathing very hard.',
        },
      },
      {
        icon: '🧗',
        title: { fr: 'Des expéditions difficiles', en: 'Challenging expeditions' },
        content: {
          fr: 'Seuls des alpinistes très entraînés et prudents s’aventurent sur cette montagne dangereuse avec des guides experts.',
          en: 'Only carefully trained and cautious climbers dare venture up this hazardous mountain with expert guides.',
        },
      },
    ],
    relatedTopicIds: ['terre', 'cycle-eau'],
  },
  {
    id: 'grande-muraille',
    title: { fr: 'La Grande Muraille', en: 'The Great Wall' },
    category: { fr: 'Géographie 🌍', en: 'Geography 🌍' },
    categoryKey: 'geographie',
    icon: '🧱',
    shortDesc: {
      fr: 'Un mur géant qui traverse la Chine.',
      en: 'A giant wall that crosses China.',
    },
    fullContent: {
      fr: 'La Grande Muraille de Chine est une immense muraille construite il y a très longtemps pour protéger la Chine. Elle mesure plus de 21 000 kilomètres de long ! Elle traverse des montagnes, des déserts et des plaines.',
      en: 'The Great Wall of China is a massive wall built a long time ago to protect China. It is over 21,000 kilometers long! It crosses mountains, deserts, and plains.',
    },
    funFact: {
      fr: "Contrairement à ce que l'on dit souvent, on ne peut pas vraiment voir la Muraille de Chine depuis la Lune à l'œil nu !",
      en: "Contrary to what is often said, you can't actually see the Great Wall of China from the Moon with the naked eye!",
    },
    sections: [
      {
        icon: '🧱',
        title: { fr: 'Un ruban sur les crêtes', en: 'A ribbon over ridges' },
        content: {
          fr: "Cette longue muraille de pierre serpente sur les crêtes des montagnes et traverse des vallées entières.",
          en: "This long stone wall winds across mountain ridges and spans entire green valleys."
        }
      },
      {
        icon: '⏳',
        title: { fr: 'Bâtie au fil des siècles', en: 'Built over centuries' },
        content: {
          fr: "Elle n'a pas été faite d'un coup : plusieurs dynasties d'empereurs ont ajouté, relié et réparé ses tronçons.",
          en: "It was not made all at once: several dynasties of emperors added, connected, and repaired its sections."
        }
      },
      {
        icon: '🏰',
        title: { fr: 'Des tours pour veiller', en: 'Towers to watch' },
        content: {
          fr: "De hautes tours de guet permettaient aux gardes de voir au loin et d'allumer des feux pour donner l'alerte.",
          en: "High watchtowers allowed guards to see far away and light signal fires to raise the alarm."
        }
      },
      {
        icon: '👀',
        title: { fr: 'Un mythe venu du ciel', en: 'A myth from above' },
        content: {
          fr: "Même si elle est très longue, elle est trop étroite pour être vue à l'œil nu depuis l'espace.",
          en: "Although very long, it is too narrow to be seen with the naked eye from outer space."
        }
      }
    ],
    relatedTopicIds: ['chateaux', 'terre']
  },
  {
    id: 'antarctique',
    title: { fr: "L'Antarctique", en: 'Antarctica' },
    category: { fr: 'Géographie 🌍', en: 'Geography 🌍' },
    categoryKey: 'geographie',
    icon: '❄️',
    shortDesc: {
      fr: 'Le continent de glace au Pôle Sud.',
      en: 'The continent of ice at the South Pole.',
    },
    fullContent: {
      fr: "L'Antarctique est l'endroit le plus froid de la planète. Il n'y a pas de villes, seulement de la glace et de la neige. C'est là que vivent les manchots empereurs et les phoques.",
      en: 'Antarctica is the coldest place on the planet. There are no cities, only ice and snow. This is where emperor penguins and seals live.',
    },
    funFact: {
      fr: "En Antarctique, il peut faire jusqu'à -89 degrés ! C'est plus froid que ton congélateur !",
      en: "In Antarctica, it can get as cold as -89 degrees! That's colder than your freezer!",
    },
    sections: [
      {
        icon: '❄️',
        title: { fr: 'Le continent blanc', en: 'The white continent' },
        content: {
          fr: "Situé tout en bas du globe au pôle Sud, c'est un gigantesque continent fait de neige et de glace.",
          en: "Located at the bottom of the globe at the South Pole, it is a giant continent of snow and ice."
        }
      },
      {
        icon: '🧊',
        title: { fr: 'Un froid extrême', en: 'Extreme cold' },
        content: {
          fr: "C'est le lieu le plus froid de la Terre, avec des vents puissants et des températures glaciales.",
          en: "It is the coldest place on Earth, with powerful freezing winds and icy temperatures."
        }
      },
      {
        icon: '🐧',
        title: { fr: 'Le royaume des manchots', en: 'The penguin kingdom' },
        content: {
          fr: "Les manchots empereurs s'y regroupent en se serrant fort pour protéger leurs petits du blizzard.",
          en: "Emperor penguins huddle tightly together there to protect their little chicks from blizzards."
        }
      },
      {
        icon: '🔬',
        title: { fr: 'Un trésor scientifique', en: 'A scientific treasure' },
        content: {
          fr: "Sans aucune ville, des chercheurs du monde entier y observent les étoiles et le climat de notre planète.",
          en: "With no cities, researchers from across the globe study the stars and our planet's climate there."
        }
      }
    ],
    relatedTopicIds: ['terre', 'pingouin']
  },
  {
    id: 'grand-canyon',
    title: { fr: 'Le Grand Canyon', en: 'The Grand Canyon' },
    category: { fr: 'Géographie 🌍', en: 'Geography 🌍' },
    categoryKey: 'geographie',
    icon: '🏜️',
    shortDesc: {
      fr: 'Une immense crevasse creusée par une rivière.',
      en: 'A huge crevice carved by a river.',
    },
    fullContent: {
      fr: "Le Grand Canyon se trouve aux États-Unis. Il a été creusé pendant des millions d'années par la rivière Colorado. Ses parois montrent des roches de toutes les couleurs : rouge, orange et marron.",
      en: 'The Grand Canyon is located in the United States. It was carved over millions of years by the Colorado River. Its walls show rocks of all colors: red, orange, and brown.',
    },
    funFact: {
      fr: "Le canyon est tellement grand qu'il pourrait contenir presque toute l'eau du monde entier s'il était rempli !",
      en: 'The canyon is so big that it could hold almost all the water in the world if it were filled!',
    },
    sections: [
      {
        icon: '🏞️',
        title: { fr: 'Une vallée vertigineuse', en: 'A breathtaking canyon' },
        content: {
          fr: "Le Grand Canyon est une gigantesque gorge creusée dans la roche en Amérique du Nord. Ses falaises descendent sur plus d'un kilomètre de profondeur.",
          en: 'The Grand Canyon is a gigantic gorge carved into rock in North America. Its dramatic cliffs drop more than a kilometer deep.'
        }
      },
      {
        icon: '🌊',
        title: { fr: 'La force du fleuve Colorado', en: 'The power of the Colorado River' },
        content: {
          fr: "Pendant des millions d'années, l'eau du fleuve Colorado a lentement usé et découpé la pierre pour sculpter ce décor spectaculaire.",
          en: 'Over millions of years, the rushing waters of the Colorado River slowly carved through stone to sculpt this spectacular landscape.'
        }
      },
      {
        icon: '🎨',
        title: { fr: 'Des roches de mille couleurs', en: 'Rocks of many colors' },
        content: {
          fr: "Les parois montrent des étages de roche rouge, orange et dorée. Chaque couche raconte une époque très ancienne de l'histoire de notre planète.",
          en: 'The canyon walls show bands of red, orange, and golden rock. Each layer reveals a very ancient chapter in the history of our planet.'
        }
      },
      {
        icon: '🦅',
        title: { fr: 'Un refuge naturel sauvage', en: 'A wild natural sanctuary' },
        content: {
          fr: "Des aigles royaux, des condors géants et des mouflons vivent le long de ces corniches rocheuses sous le chaud soleil du désert.",
          en: 'Golden eagles, giant condors, and bighorn sheep make their homes along these rocky ledges under the bright desert sun.'
        }
      }
    ],
    relatedTopicIds: ['desert-sahara', 'fleuve-nil', 'grottes-souterraines'],
  },
  {
    id: 'fleuve-nil',
    title: { fr: 'Le Nil', en: 'The Nile' },
    category: { fr: 'Géographie 🌍', en: 'Geography 🌍' },
    categoryKey: 'geographie',
    icon: '🌊',
    shortDesc: {
      fr: "Le fleuve géant qui traverse l'Égypte.",
      en: 'The giant river that flows through Egypt.',
    },
    fullContent: {
      fr: "Le Nil est l'un des plus longs fleuves du monde ! Il traverse l'Afrique et finit sa route en Égypte. Depuis l'Antiquité, les gens vivent au bord du Nil car il apporte de l'eau précieuse pour faire pousser les plantes dans le désert.",
      en: 'The Nile is one of the longest rivers in the world! It flows through Africa and ends its journey in Egypt. Since ancient times, people have lived along the Nile because it brings precious water to grow plants in the desert.',
    },
    funFact: {
      fr: "Chaque année autrefois, le Nil débordait et déposait de la boue noire très fertile appelée le limon, parfaite pour l'agriculture !",
      en: 'In the past, every year the Nile would overflow and deposit very fertile black mud called silt, perfect for agriculture!',
    },
    sections: [
      {
        id: 'ruban_bleu',
        icon: '🌊',
        title: { fr: 'Le ruban bleu d’Afrique', en: 'The blue ribbon of Africa' },
        content: {
          fr: "Le Nil est un fleuve immense et légendaire qui traverse plusieurs pays d'Afrique du sud au nord.",
          en: 'The Nile is an immense legendary river flowing through several African countries from south to north.',
        },
      },
      {
        id: 'vie_dans_desert',
        icon: '🌱',
        title: { fr: 'De l’eau dans le désert', en: 'Water in the desert' },
        content: {
          fr: "Au milieu des étendues de sable sec, son eau fraîche offre de la verdure aux plantes et aux villages.",
          en: 'Amid dry sandy lands, its fresh water brings lush green life to crops and riverside villages.',
        },
      },
      {
        id: 'terre_fertile',
        icon: '🌾',
        title: { fr: 'La terre noire fertile', en: 'Fertile black soil' },
        content: {
          fr: 'Ses crues déposaient autrefois une boue très riche qui permettait aux fermiers de récolter de délicieux blés.',
          en: 'Its seasonal floods once deposited rich black silt, allowing farmers to grow plentiful delicious crops.',
        },
      },
      {
        id: 'berceau_pharaons',
        icon: '🏺',
        title: { fr: 'Le fleuve des pharaons', en: 'The river of pharaohs' },
        content: {
          fr: "C'est sur ses rives paisibles que les anciens Égyptiens ont bâti des cités splendides et de fiers monuments.",
          en: 'Along its peaceful banks, ancient Egyptians built marvelous cities and proud enduring stone monuments.',
        },
      },
    ],
    relatedTopicIds: ['pyramides', 'cycle-eau'],
  },
  {
    id: 'ocean-pacifique',
    title: { fr: "L'Océan Pacifique", en: 'The Pacific Ocean' },
    category: { fr: 'Géographie 🌍', en: 'Geography 🌍' },
    categoryKey: 'geographie',
    icon: '🐳',
    shortDesc: {
      fr: 'Le plus grand océan de la planète.',
      en: 'The largest ocean on the planet.',
    },
    fullContent: {
      fr: "L'Océan Pacifique est tellement immense qu'il recouvre un tiers de la surface de la Terre ! C'est plus que toutes les terres émergées réunies. On y trouve des milliers d'îles, des baleines, des requins et la fosse la plus profonde du monde.",
      en: "The Pacific Ocean is so massive that it covers one-third of the Earth's surface! That's more than all the land masses combined. It is home to thousands of islands, whales, sharks, and the deepest trench in the world.",
    },
    funFact: {
      fr: "On l'appelle 'Pacifique' car le premier explorateur qui l'a traversé, Magellan, a trouvé l'eau très calme et tranquille !",
      en: "It is called 'Pacific' because the first explorer to cross it, Magellan, found the water very calm and peaceful!",
    },
    sections: [
      {
        icon: '🌊',
        title: { fr: "Le géant bleu de notre planète", en: "The planet's blue giant" },
        content: {
          fr: "L'océan Pacifique est la plus grande étendue d'eau de la Terre. Il est tellement vaste qu'il dépasse en superficie tous les continents réunis mis côte à côte.",
          en: "The Pacific Ocean is the largest body of water on Earth. It is so vast that it covers more area than all the continents of the world put together."
        }
      },
      {
        icon: '🕳️',
        title: { fr: "Les fosses les plus profondes", en: "The deepest abyss" },
        content: {
          fr: "C'est dans cet océan que se cache l'endroit le plus profond du monde : la fosse des Mariannes. Tout au fond, il fait noir d'encre et l'eau y est glaciale.",
          en: "This ocean hides the deepest place on Earth: the Mariana Trench. Deep down at the bottom, it is pitch black, ice-cold, and under immense water pressure."
        }
      },
      {
        icon: '🏝️',
        title: { fr: "Des milliers d'îles paradisiaques", en: "Thousands of island paradises" },
        content: {
          fr: "Le Pacifique est parsemé de milliers d'îles volcaniques ou coralliennes, comme Hawaï ou Tahiti, bordées de lagons turquoise et de récifs coralliens pleins de vie.",
          en: "The Pacific is sprinkled with thousands of volcanic and coral islands, such as Hawaii and Tahiti, surrounded by turquoise lagoons and teeming reefs."
        }
      },
      {
        icon: '🐋',
        title: { fr: "Le royaume des géants marins", en: "Kingdom of ocean giants" },
        content: {
          fr: "Ses eaux chaudes ou glacées abritent une faune incroyable : des baleines bleues colossales, des requins, des tortues de mer et des bancs infinis de poissons colorés.",
          en: "Its waters are home to incredible wildlife: colossal blue whales, sharks, sea turtles, and endless schools of bright, darting tropical fish."
        }
      }
    ],
    relatedTopicIds: ['terre', 'dauphin'],
  },
  {
    id: 'desert-sahara',
    title: { fr: 'Le Désert du Sahara', en: 'The Sahara Desert' },
    category: { fr: 'Géographie 🌍', en: 'Geography 🌍' },
    categoryKey: 'geographie',
    icon: '🏜️',
    shortDesc: {
      fr: 'Le plus grand désert de sable chaud.',
      en: 'The largest hot sand desert.',
    },
    fullContent: {
      fr: "Le Sahara se trouve en Afrique du Nord. C'est un endroit où il pleut très rarement et où il fait extrêmement chaud le jour. On y voit d'immenses dunes de sable qui bougent avec le vent et quelques oasis où poussent des palmiers.",
      en: 'The Sahara is in North Africa. It is a place where it very rarely rains and where it is extremely hot during the day. You can see huge sand dunes that move with the wind and a few oases where palm trees grow.',
    },
    funFact: {
      fr: "Il y a très longtemps, le Sahara n'était pas un désert mais une savane verte avec des lacs et des hippopotames !",
      en: 'A long time ago, the Sahara was not a desert but a green savannah with lakes and hippos!',
    },
    sections: [
      {
        icon: '🏜️',
        title: { fr: 'Le plus grand désert chaud', en: 'The largest hot desert' },
        content: {
          fr: "Situé au nord du continent africain, le Sahara est le plus vaste désert chaud de notre planète. Il est si grand qu'il couvre une surface presque équivalente à celle de l'Europe.",
          en: 'Located across northern Africa, the Sahara is the largest hot desert on Earth. It is so vast that it covers an area nearly as large as the entire European continent.'
        }
      },
      {
        icon: '🪨',
        title: { fr: 'Bien plus que du sable', en: 'Much more than sand' },
        content: {
          fr: "On imagine souvent des collines de sable appelées dunes, mais le Sahara est aussi formé de grands plateaux de pierres, de plaines de cailloux et de hautes montagnes rocheuses.",
          en: 'People often picture golden rolling sand dunes, but the Sahara is also made of wide stone plateaus, vast gravel plains, and towering rocky mountains.'
        }
      },
      {
        icon: '☀️',
        title: { fr: 'Midi brûlant, nuit glaciale', en: 'Blazing days and freezing nights' },
        content: {
          fr: "Le soleil chauffe très fort pendant la journée sous un ciel sans nuages. La nuit, comme le sol nu ne retient pas la chaleur, la température chute brusquement jusqu'à devenir très froide.",
          en: 'The sun blazes fiercely during cloudless days. At night, because the dry ground does not retain warmth, temperatures drop rapidly and can become very cold.'
        }
      },
      {
        icon: '🌴',
        title: { fr: 'Des oasis pleines de vie', en: 'Oases full of life' },
        content: {
          fr: "Là où de l'eau souterraine remonte vers la surface, des oasis apparaissent avec des palmiers et des points d'eau. C'est là que les caravanes et les animaux du désert viennent boire et se reposer.",
          en: 'Wherever underground water reaches the surface, green oases appear with palm trees and ponds. Traveling caravans and desert wildlife stop there to drink and rest.'
        }
      }
    ],
    relatedTopicIds: ['terre', 'soleil']
  },
  {
    id: 'barriere-corail',
    title: { fr: 'La Grande Barrière de Corail', en: 'The Great Barrier Reef' },
    category: { fr: 'Géographie 🌍', en: 'Geography 🌍' },
    categoryKey: 'geographie',
    icon: '🪸',
    shortDesc: {
      fr: 'Le plus grand aquarium naturel au monde.',
      en: 'The largest natural aquarium in the world.',
    },
    fullContent: {
      fr: "Située près de l'Australie, c'est la plus grande structure vivante de la planète ! Elle est composée de milliards de petits animaux appelés coraux. C'est la maison de milliers de poissons colorés, de tortues et de baleines.",
      en: 'Located near Australia, it is the largest living structure on the planet! It is made of billions of tiny animals called corals. It is home to thousands of colorful fish, turtles, and whales.',
    },
    funFact: {
      fr: "La Grande Barrière est tellement immense qu'on peut la voir depuis l'espace !",
      en: 'The Great Barrier Reef is so massive that it can be seen from space!',
    },
    sections: [
      {
        icon: '🪸',
        title: { fr: 'De minuscules bâtisseurs', en: 'Tiny builders' },
        content: {
          fr: "Le corail n'est pas une plante, mais une famille de petits animaux marins appelés polypes.",
          en: "Coral is not a plant, but a family of tiny marine animals called polyps."
        }
      },
      {
        icon: '🏰',
        title: { fr: 'Une cité sous les vagues', en: 'A city beneath waves' },
        content: {
          fr: "En fabriquant des abris de calcaire les uns sur les autres, les polypes créent un immense récif vivant.",
          en: "By building limestone shelters on top of each other, polyps create a giant living reef."
        }
      },
      {
        icon: '🐠',
        title: { fr: 'Un refuge coloré', en: 'A colorful haven' },
        content: {
          fr: "Des milliers de poissons, des tortues et des étoiles de mer viennent y nicher et trouver à manger.",
          en: "Thousands of fish, turtles, and sea stars come here to shelter and find food."
        }
      },
      {
        icon: '🌊',
        title: { fr: "Un trésor de l'océan", en: 'An ocean treasure' },
        content: {
          fr: "Visible depuis l'espace, la barrière protège aussi les côtes contre la force des grandes vagues.",
          en: "Visible from space, the reef also protects coastlines against the strength of large waves."
        }
      }
    ],
    relatedTopicIds: ['ocean-pacifique', 'tortue', 'dauphin']
  },
  {
    id: 'venise-eau',
    title: { fr: 'Venise', en: 'Venice' },
    category: { fr: 'Géographie 🌍', en: 'Geography 🌍' },
    categoryKey: 'geographie',
    icon: '🛶',
    shortDesc: {
      fr: "La ville magique construite sur l'eau.",
      en: 'The magical city built on water.',
    },
    fullContent: {
      fr: "Venise est une ville en Italie où il n'y a pas de voitures ! Les rues sont remplies d'eau : on appelle ça des canaux. Pour se déplacer, les gens utilisent des bateaux appelés des gondoles ou des vaporettos.",
      en: 'Venice is a city in Italy where there are no cars! The streets are filled with water: they are called canals. To get around, people use boats called gondolas or vaporettos.',
    },
    funFact: {
      fr: 'Venise est construite sur plus de 100 petites îles reliées par environ 400 ponts !',
      en: 'Venice is built on more than 100 small islands connected by about 400 bridges!',
    },
    sections: [
      {
        icon: '🛶',
        title: { fr: 'Une ville sur les flots', en: 'A city upon the water' },
        content: {
          fr: "Construite au milieu d'une lagune en Italie, Venise repose sur plus de cent petites îles reliées par des canaux.",
          en: 'Built in the middle of an Italian lagoon, Venice rests upon more than a hundred small islands linked by canals.'
        }
      },
      {
        icon: '🚫',
        title: { fr: 'Pas de voitures, que des bateaux !', en: 'No cars, only boats!' },
        content: {
          fr: "Ici, les rues sont en eau : on se déplace à pied sur les ponts ou en montant dans de jolies barques appelées gondoles.",
          en: 'Here, streets are waterways: people walk across bridges or hop aboard lovely boats called gondolas.'
        }
      },
      {
        icon: '🪵',
        title: { fr: 'Des pilotis de bois secrets', en: 'Secret wooden stilts' },
        content: {
          fr: "Les palais vénitiens sont posés sur des milliers de troncs d'arbres enfoncés sous l'eau et dans la boue solide depuis des siècles.",
          en: 'Venetian palaces stand on thousands of tree trunks driven into deep underwater mud centuries ago.'
        }
      },
      {
        icon: '🎭',
        title: { fr: 'Masques et fêtes magiques', en: 'Magical masks and festivities' },
        content: {
          fr: "Chaque année, le carnaval remplit les ruelles de costumes brillants et de mystérieux masques dorés que les enfants adorent.",
          en: 'Every year, carnival fills the narrow alleys with sparkling costumes and mysterious golden masks kids adore.'
        }
      }
    ],
    relatedTopicIds: ['tour-eiffel', 'fleuve-nil', 'ocean-pacifique'],
  },
  {
    id: 'pyramides-egypte',
    title: { fr: 'Les Pyramides', en: 'The Pyramids' },
    category: { fr: 'Géographie 🌍', en: 'Geography 🌍' },
    categoryKey: 'geographie',
    icon: '📐',
    shortDesc: {
      fr: "D'énormes tombeaux de pierre en Égypte.",
      en: 'Huge stone tombs in Egypt.',
    },
    fullContent: {
      fr: "Les pyramides de Gizeh sont de très anciens monuments construits dans le désert d'Égypte. Les Égyptiens les ont bâties avec d'énormes blocs de pierre très lourds pour y enterrer leurs rois, les Pharaons.",
      en: 'The pyramids of Giza are very ancient monuments built in the Egyptian desert. The Egyptians built them with massive, heavy stone blocks to bury their kings, the Pharaohs.',
    },
    funFact: {
      fr: 'La Grande Pyramide de Khéops a été le bâtiment le plus haut du monde pendant presque 4 000 ans !',
      en: 'The Great Pyramid of Giza was the tallest building in the world for almost 4,000 years!',
    },
    sections: [
      {
        icon: '🏜️',
        title: { fr: 'Des géants dans le désert', en: 'Giants in the desert' },
        content: {
          fr: "Les pyramides de Gizeh se dressent fièrement à l'orée du désert égyptien. Leurs silhouettes triangulaires font partie des grandes merveilles du monde.",
          en: 'The pyramids of Giza rise proudly at the edge of the Egyptian desert. Their triangular outlines are among the greatest wonders of the world.'
        }
      },
      {
        icon: '👑',
        title: { fr: 'Le repos des Pharaons', en: 'Resting place of Pharaohs' },
        content: {
          fr: "Dans l'Égypte antique, ces édifices servaient de tombeaux sacrés pour les pharaons, les rois d'Égypte, entourés de leurs plus beaux trésors.",
          en: 'In ancient Egypt, these monuments served as sacred tombs for the pharaohs, surrounded by their finest royal treasures.'
        }
      },
      {
        icon: '🪨',
        title: { fr: 'Des blocs colossaux', en: 'Colossal stone blocks' },
        content: {
          fr: "Chaque pyramide est faite de millions de blocs de calcaire très lourds. Les ouvriers utilisaient des traîneaux de bois et des rampes de terre pour les hisser.",
          en: 'Each pyramid is built from millions of heavy limestone blocks. Workers used wooden sledges and ramps to haul them upward.'
        }
      },
      {
        icon: '📐',
        title: { fr: 'Une géométrie parfaite', en: 'Perfect geometry' },
        content: {
          fr: "Leurs quatre faces pointent vers les points cardinaux et vers le ciel. Cette précision impressionnante fascine encore les architectes d'aujourd'hui.",
          en: 'Their four faces align with the cardinal directions and point toward the sky. This incredible precision still amazes architects today.'
        }
      }
    ],
    relatedTopicIds: ['desert-sahara', 'fleuve-nil', 'pyramides'],
  },
] as const
