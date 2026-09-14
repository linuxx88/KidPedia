

export const questions = [
  {
    id: 'ciel-bleu',
    title: { fr: 'Pourquoi le ciel est bleu ?', en: 'Why is the sky blue?' },
    category: { fr: 'Pourquoi ? ❓', en: 'Why? ❓' },
    categoryKey: 'pourquoi',
    icon: '🌤️',
    shortDesc: { fr: 'Le secret de la couleur du ciel.', en: "The secret of the sky's color." },
    fullContent: {
      fr: "La lumière du soleil s'éparpille dans l'air, et c'est la couleur bleue qui se diffuse le plus partout.",
      en: "Sunlight scatters in the air, and it's the color blue that spreads the most everywhere.",
    },
    funFact: {
      fr: "Le soir, le ciel devient rouge parce que la lumière traverse plus d'air !",
      en: 'In the evening, the sky turns red because the light passes through more air!',
    },
    sections: [
      {
        id: 'lumiere_blanche',
        icon: '☀️',
        title: { fr: 'La lumière cachée du Soleil', en: 'The hidden sunlight' },
        content: {
          fr: "La lumière blanche du Soleil voyage dans l'espace en cachant toutes les couleurs de l'arc-en-ciel.",
          en: 'White sunlight travels through space carrying all the beautiful colors of the rainbow together.',
        },
      },
      {
        id: 'rebond_dans_lair',
        icon: '💨',
        title: { fr: "L'air fait rebondir les rayons", en: 'Air scatters the rays' },
        content: {
          fr: "En touchant l'air autour de la Terre, les petits rayons bleus ricochent dans toutes les directions.",
          en: 'Touching the air around Earth, the tiny blue rays bounce away in every single direction.',
        },
      },
      {
        id: 'notre_regard',
        icon: '👀',
        title: { fr: 'Un immense dôme bleu', en: 'A huge blue dome' },
        content: {
          fr: 'Comme cette lumière bleue rebondit partout au-dessus de nos têtes, nous voyons un ciel tout bleu.',
          en: 'Because blue light scatters across the whole sky, we look up and see bright blue.',
        },
      },
      {
        id: 'coucher_du_soleil',
        icon: '🌅',
        title: { fr: 'Le ciel rouge du soir', en: 'The evening red sky' },
        content: {
          fr: "Le soir venu, les rayons traversent plus d'air et laissent place à de splendides teintes orangées.",
          en: 'At sunset, rays travel farther through air, revealing splendid shades of warm orange and red.',
        },
      },
    ],
    relatedTopicIds: ['soleil', 'arc-en-ciel'],
  },
  {
    id: 'mer-salee',
    title: { fr: 'Pourquoi la mer est salée ?', en: 'Why is the sea salty?' },
    category: { fr: 'Pourquoi ? ❓', en: 'Why? ❓' },
    categoryKey: 'pourquoi',
    icon: '🌊',
    shortDesc: { fr: "Le secret du goût de l'eau des océans.", en: "The secret of the ocean water's taste." },
    fullContent: {
      fr: "L'eau de pluie emporte un peu de sel des roches vers les rivières, puis vers la mer depuis des millions d'années.",
      en: 'Rainwater carries a bit of salt from rocks into rivers, and then into the sea, for millions of years.',
    },
    funFact: {
      fr: 'Il y a assez de sel dans la mer pour recouvrir toute la Terre !',
      en: 'There is enough salt in the sea to cover the entire Earth!',
    },
    sections: [
      {
        icon: '🌧️',
        title: { fr: 'La pluie rince la roche', en: 'Rain washes the rocks' },
        content: {
          fr: 'En tombant sur les montagnes, la pluie frotte doucement la pierre et dissout de minuscules minéraux invisibles.',
          en: 'Falling onto high mountains, rain gently rubs against rock and dissolves tiny invisible natural minerals.',
        },
      },
      {
        icon: '🏞️',
        title: { fr: 'Le voyage des rivières', en: 'The journey of rivers' },
        content: {
          fr: "Les ruisseaux et les rivières entraînent ensuite ces sels minéraux jusqu'à l'immense océan au fil des siècles.",
          en: 'Streams and flowing rivers then carry these dissolved mineral salts down to the vast ocean.',
        },
      },
      {
        icon: '☀️',
        title: { fr: 'Le sel reste dans l’eau', en: 'Salt stays behind' },
        content: {
          fr: "Sous la chaleur du soleil, l'eau s'évapore dans les nuages mais le sel reste prisonnier dans la mer.",
          en: 'Under the warm sun, water evaporates into white clouds while the salt stays trapped below.',
        },
      },
      {
        icon: '🌊',
        title: { fr: 'Des millions d’années', en: 'Millions of years' },
        content: {
          fr: "Depuis des millions d'années, ce cycle régulier a rendu les océans bien plus salés que les fleuves.",
          en: 'Over millions of years, this steady cycle has made oceans much saltier than freshwater rivers.',
        },
      },
    ],
    relatedTopicIds: ['cycle-eau', 'dauphin'],
  },
  {
    id: 'question-arc-en-ciel',
    title: { fr: "Comment se forme l'arc-en-ciel ?", en: 'How is a rainbow formed?' },
    category: { fr: 'Pourquoi ? ❓', en: 'Why? ❓' },
    categoryKey: 'pourquoi',
    icon: '🌈',
    shortDesc: { fr: 'Un pont de couleurs dans le ciel.', en: 'A bridge of colors in the sky.' },
    fullContent: {
      fr: "Il faut du soleil et de la pluie. Les gouttes d'eau décomposent la lumière en 7 couleurs.",
      en: 'Sun and rain are needed. Water droplets break light into 7 colors.',
    },
    funFact: {
      fr: "Tu ne peux jamais atteindre le pied d'un arc-en-ciel !",
      en: 'You can never reach the end of a rainbow!',
    },
    sections: [
      {
        icon: '🌦️',
        title: { fr: "Pluie et soleil réunis", en: "Rain and sun together" },
        content: {
          fr: "Pour apercevoir un arc-en-ciel, il faut une averse et du soleil en même temps. Tu dois toujours avoir le Soleil dans ton dos et le rideau de pluie devant tes yeux.",
          en: "To see a rainbow, you need raindrops and sunshine at the exact same moment. You must always stand with the Sun behind you, facing the rainfall ahead."
        }
      },
      {
        icon: '💧',
        title: { fr: "La goutte d'eau comme un prisme", en: "Raindrops like tiny prisms" },
        content: {
          fr: "Lorsque le rayon de soleil pénètre dans une goutte d'eau, sa course est déviée. La goutte agit comme une petite loupe naturelle qui plie la lumière.",
          en: "When sunlight enters a falling droplet of water, its path bends. The droplet acts like a tiny natural prism, redirecting the beam of light."
        }
      },
      {
        icon: '🎨',
        title: { fr: "La lumière blanche se sépare", en: "White light splits" },
        content: {
          fr: "La lumière blanche du Soleil contient en réalité toutes les couleurs. En traversant la goutte, chaque couleur se sépare : rouge, orange, jaune, vert, bleu, indigo et violet !",
          en: "White sunlight actually holds every single color inside it. Passing through droplets separates each color into view: red, orange, yellow, green, blue, indigo, and violet!"
        }
      },
      {
        icon: '👀',
        title: { fr: "Un spectacle pour tes yeux", en: "A spectacle just for you" },
        content: {
          fr: "La lumière rebondit à l'intérieur des gouttes et repart vers tes yeux. Comme chaque personne voit la lumière sous un angle unique, ton arc-en-ciel n'appartient qu'à toi !",
          en: "The light reflects inside the drops and shines back toward your eyes. Because everyone sees light from a unique angle, the rainbow you see is uniquely yours!"
        }
      }
    ],
    relatedTopicIds: ['arc-en-ciel', 'soleil']
  },
  {
    id: 'chat-ronronne',
    title: { fr: 'Pourquoi les chats ronronnent ?', en: 'Why do cats purr?' },
    category: { fr: 'Pourquoi ? ❓', en: 'Why? ❓' },
    categoryKey: 'pourquoi',
    icon: '🐱',
    shortDesc: { fr: 'Le petit moteur secret des chats.', en: 'The secret little motor of cats.' },
    fullContent: {
      fr: 'Le chat ronronne quand il est content et rassuré, mais aussi parfois pour se soigner ! Les vibrations de son ronronnement aident ses os et ses muscles à rester en bonne santé.',
      en: 'Cats purr when they are happy and reassured, but also sometimes to heal themselves! The vibrations of their purring help their bones and muscles stay healthy.',
    },
    funFact: {
      fr: "Les chats peuvent ronronner à la même fréquence qu'un moteur de ventilateur !",
      en: 'Cats can purr at the same frequency as a fan motor!',
    },
    sections: [
      {
        icon: '🐱',
        title: { fr: 'Un câlin tout doux', en: 'A gentle cuddle' },
        content: {
          fr: "Quand un chat est bien au chaud sur tes genoux et qu'on le caresse, il ronronne pour montrer qu'il se sent calme et en sécurité.",
          en: 'When a cat curls up warm in your lap for gentle petting, it purrs to show that it feels peaceful, safe, and happy.',
        },
      },
      {
        icon: '🐾',
        title: { fr: 'Un langage dès la naissance', en: 'A language from birth' },
        content: {
          fr: 'Les tout petits chatons ronronnent pour dire à leur maman où ils sont et qu’ils boivent bien leur lait.',
          en: 'Tiny newborn kittens purr to tell their mother where they are and that they are nursing happily.',
        },
      },
      {
        icon: '🩹',
        title: { fr: 'Se rassurer dans les moments difficiles', en: 'Comforting themselves' },
        content: {
          fr: 'Parfois, le chat ronronne aussi quand il a peur ou mal. Ce doux bruit l’aide à se détendre et à calmer sa douleur.',
          en: 'Sometimes, cats also purr when they feel scared or unwell. The soft sound helps them relax and soothe discomfort.',
        },
      },
      {
        icon: '✨',
        title: { fr: 'Des vibrations magiques', en: 'Healing vibrations' },
        content: {
          fr: 'Les petites secousses du ronronnement massent doucement le corps du chat pour l’aider à réparer ses muscles et ses os fatigués.',
          en: "Gentle purring vibrations gently massage the cat's body, helping tired muscles and little bones recover faster.",
        },
      },
    ],
    relatedTopicIds: ['tigre', 'lion', 'reves-sommeil'],
  },
  {
    id: 'fourmis-jambes',
    title: { fr: 'Pourquoi a-t-on des fourmis ?', en: 'Why do we get pins and needles?' },
    category: { fr: 'Pourquoi ? ❓', en: 'Why? ❓' },
    categoryKey: 'pourquoi',
    icon: '🐜',
    shortDesc: { fr: 'Cette sensation bizarre dans les jambes.', en: 'That weird feeling in your legs.' },
    fullContent: {
      fr: "Quand tu restes assis trop longtemps dans une mauvaise position, tu écrases un petit peu tes nerfs et tes vaisseaux sanguins. Le message entre ton cerveau et ta jambe passe mal. Quand tu bouges enfin, tous les messages arrivent d'un coup, et ça fait des 'fourmis' !",
      en: "When you sit too long in a bad position, you pinch your nerves and blood vessels a little. The message between your brain and your leg doesn't pass well. When you finally move, all the messages arrive at once, and it feels like 'ants' (pins and needles)!",
    },
    funFact: {
      fr: "Le vrai nom scientifique est une 'paresthésie', mais 'fourmis' c'est plus rigolo !",
      en: "The real scientific name is 'paresthesia', but 'pins and needles' (or 'ants' in French) is funnier!",
    },
    sections: [
      {
        icon: '🧘',
        title: { fr: 'Une mauvaise posture', en: 'Sitting awkwardly' },
        content: {
          fr: "Quand tu restes assis en tailleur ou plié trop longtemps, tes jambes sont comprimées. Le sang circule moins facilement et les nerfs sont temporairement coincés.",
          en: "When you sit cross-legged or bent awkwardly for too long, your legs are squeezed. Blood flows less easily and nerves are temporarily pinched."
        }
      },
      {
        icon: '⚡',
        title: { fr: 'Les signaux en pause', en: 'Signals on pause' },
        content: {
          fr: "Les nerfs sont comme de petits fils électriques entre tes pieds et ton cerveau. Quand ils sont comprimés, les messages ne passent plus bien et ton pied s'engourdit.",
          en: 'Nerves act like tiny electric wires between your feet and your brain. When they are compressed, messages slow down and your foot feels numb.'
        }
      },
      {
        icon: '✨',
        title: { fr: 'Le réveil qui picote', en: 'The prickly wakeup' },
        content: {
          fr: "Quand tu bouges enfin, le nerf se libère ! Tous les messages se remettent à circuler en même temps, ce qui provoque ce drôle de picotement passager.",
          en: 'When you finally move, the nerve is freed! All the signals start rushing through at once, causing a funny, harmless tingling feeling.'
        }
      },
      {
        icon: '🐜',
        title: { fr: 'Pas de vraies fourmis !', en: 'No real ants at all!' },
        content: {
          fr: "On appelle cette sensation des 'fourmis' parce que ça chatouille un peu comme de petites pattes. Mais rassure-toi, il n'y a aucun insecte sous ta peau !",
          en: "People call this sensation 'ants' or 'pins and needles' because it tickles like tiny feet. But there are definitely no real bugs under your skin!"
        }
      }
    ],
    relatedTopicIds: ['coeur', 'cerveau'],
  },
  {
    id: 'fromage-trous',
    title: { fr: 'Pourquoi le fromage a des trous ?', en: 'Why does cheese have holes?' },
    category: { fr: 'Pourquoi ? ❓', en: 'Why? ❓' },
    categoryKey: 'pourquoi',
    icon: '🧀',
    shortDesc: { fr: "Le secret de l'Emmental.", en: 'The secret of Emmental.' },
    fullContent: {
      fr: "Pendant que le fromage se fabrique, de petites bulles de gaz se forment à l'intérieur. Comme elles ne peuvent pas s'échapper, elles restent bloquées et créent des trous ronds en séchant.",
      en: "While the cheese is being made, small gas bubbles form inside. Since they can't escape, they stay trapped and create round holes as it dries.",
    },
    funFact: {
      fr: "Tous les fromages n'ont pas de trous, c'est surtout le gruyère et l'emmental !",
      en: "Not all cheeses have holes, it's mainly Gruyère and Emmental!",
    },
    sections: [
      {
        icon: '🥛',
        title: { fr: 'Du bon lait qui fermente', en: 'Good milk fermenting' },
        content: {
          fr: "Pour fabriquer du fromage, on ajoute au lait de gentilles bactéries. En travaillant dans la meule, elles transforment le lait et créent son bon goût.",
          en: 'To make cheese, helpful bacteria are added to milk. As they work inside the cheese wheel, they transform the milk and create its great flavor.'
        }
      },
      {
        icon: '🫧',
        title: { fr: 'Des bulles de gaz piégées', en: 'Trapped bubbles of gas' },
        content: {
          fr: "Dans la cave tiède, ces bactéries respirent et fabriquent un gaz invisible. Comme la pâte est souple, le gaz forme de petites bulles rondes.",
          en: 'In warm cellars, these bacteria produce an invisible gas. Because the cheese is supple, the gas expands into little round bubbles.'
        }
      },
      {
        icon: '🧀',
        title: { fr: 'Des trous bien ronds', en: 'Smooth round holes' },
        content: {
          fr: "La croûte empêche le gaz de s'enfuir. Quand le fromage durcit en séchant, les bulles laissent des trous nets appelés des 'yeux' !",
          en: "The rind keeps the gas from escaping. When the cheese firms up as it dries, the bubbles leave behind smooth holes called 'eyes'!"
        }
      },
      {
        icon: '🍽️',
        title: { fr: 'Chacun sa recette', en: 'Every cheese has its recipe' },
        content: {
          fr: "L'emmental a de gros trous, mais beaucoup d'autres fromages restent tout lisses. Tout dépend de la recette et de la température de la cave.",
          en: 'Emmental has large holes, but many other cheeses remain completely smooth. It all depends on the recipe and the cellar temperature.'
        }
      }
    ],
    relatedTopicIds: ['debuts-elevage', 'debuts-agriculture', 'nez'],
  },
  {
    id: 'oignons-pleurer',
    title: { fr: 'Pourquoi pleure-t-on avec les oignons ?', en: 'Why do onions make us cry?' },
    category: { fr: 'Pourquoi ? ❓', en: 'Why? ❓' },
    categoryKey: 'pourquoi',
    icon: '🧅',
    shortDesc: { fr: "L'oignon qui nous fait verser des larmes.", en: 'The onion that makes us shed tears.' },
    fullContent: {
      fr: "Quand on coupe un oignon, il lâche un gaz invisible dans l'air. Quand ce gaz touche l'eau de tes yeux, ça pique ! Tes yeux fabriquent alors des larmes pour rincer et protéger ton œil.",
      en: 'When you cut an onion, it releases an invisible gas into the air. When this gas touches the water in your eyes, it stings! Your eyes then make tears to rinse and protect them.',
    },
    funFact: {
      fr: "Si tu mets l'oignon au frigo avant de le couper, il fait moins pleurer !",
      en: 'If you put the onion in the fridge before cutting it, it makes you cry less!',
    },
    sections: [
      {
        icon: '🧅',
        title: { fr: 'Une défense naturelle', en: 'A natural defense' },
        content: {
          fr: "Dans la terre, l'oignon fabrique un petit produit piquant pour se protéger des insectes gourmands qui voudraient le grignoter.",
          en: 'In the ground, the onion makes a stinging substance to protect itself from hungry bugs wanting a bite.'
        }
      },
      {
        icon: '🔪',
        title: { fr: 'Le gaz invisible', en: 'The invisible gas' },
        content: {
          fr: "Quand le couteau coupe l'oignon, ses cellules s'ouvrent et libèrent un gaz léger qui flotte aussitôt dans l'air vers ton visage.",
          en: 'When the knife slices the onion, its cells break open, releasing a light gas that floats through the air toward your face.'
        }
      },
      {
        icon: '💧',
        title: { fr: 'Des larmes protectrices', en: 'Protective tears' },
        content: {
          fr: "Quand ce gaz touche l'eau de tes yeux, ça picote ! Ton cerveau fabrique immédiatement des larmes pour rincer et nettoyer tes yeux.",
          en: 'When this gas touches the moisture in your eyes, it stings! Your brain immediately triggers tears to flush and clean them.'
        }
      },
      {
        icon: '🧊',
        title: { fr: 'Les astuces en cuisine', en: 'Smart kitchen tricks' },
        content: {
          fr: "Pour éviter les larmes, tu peux mettre l'oignon au frais avant de le cuisiner ou le couper près d'un petit filet d'eau.",
          en: 'To prevent tears, you can chill the onion in the fridge before cooking or slice it under a gentle stream of water.'
        }
      }
    ],
    relatedTopicIds: ['yeux', 'nez', 'cerveau'],
  },
  {
    id: 'neige-blanche',
    title: { fr: 'Pourquoi la neige est blanche ?', en: 'Why is snow white?' },
    category: { fr: 'Pourquoi ? ❓', en: 'Why? ❓' },
    categoryKey: 'pourquoi',
    icon: '❄️',
    shortDesc: { fr: 'Le secret des flocons.', en: 'The secret of snowflakes.' },
    fullContent: {
      fr: 'La neige est faite de cristaux de glace transparents. Mais quand ils sont tous mélangés ensemble, ils reflètent la lumière du soleil dans toutes les directions. Pour nos yeux, ce mélange de lumière ressemble à la couleur blanche.',
      en: 'Snow is made of transparent ice crystals. But when they are all mixed together, they reflect sunlight in all directions. To our eyes, this mix of light looks like the color white.',
    },
    funFact: {
      fr: 'Si tu regardes un seul flocon de neige de très près, il est transparent comme du verre !',
      en: 'If you look at a single snowflake very closely, it is transparent like glass!',
    },
    sections: [
      {
        icon: '❄️',
        title: { fr: "Des cristaux d'eau transparente", en: "Crystals of clear ice" },
        content: {
          fr: "La neige naît dans les nuages froids où la vapeur d'eau gèle en petits cristaux. Si tu observes un cristal de glace tout seul, il est en réalité transparent comme une vitre !",
          en: "Snow forms inside cold clouds when water vapor freezes into tiny crystals. Looked at individually, each ice crystal is clear and transparent like window glass!"
        }
      },
      {
        icon: '💎',
        title: { fr: "Des millions de facettes", en: "Millions of tiny facets" },
        content: {
          fr: "Un flocon de neige est composé de nombreux cristaux géométriques assemblés. Ensemble, ils créent une infinité de petites facettes qui agissent comme des miroirs miniatures.",
          en: "A snowflake is built from multiple intricate ice crystals. Piled together, they form countless tiny reflective surfaces, much like millions of microscopic mirrors."
        }
      },
      {
        icon: '☀️',
        title: { fr: "Le rebond de toutes les couleurs", en: "Bouncing every color of light" },
        content: {
          fr: "La lumière blanche du Soleil est un mélange de toutes les couleurs. Lorsque cette lumière frappe les flocons, toutes les couleurs rebondissent et sont renvoyées ensemble vers nos yeux.",
          en: "White sunlight holds all rainbow colors together. When light hits the multitude of snowflakes, every color is scattered and reflected equally back to our eyes."
        }
      },
      {
        icon: '👀',
        title: { fr: "L'effet blanc pour nos yeux", en: "Why our eyes see white" },
        content: {
          fr: "Comme nos yeux reçoivent en même temps toutes les couleurs de la lumière renvoyée par le manteau de neige, notre cerveau voit un éclat blanc et éclatant !",
          en: "Because our eyes receive all the reflected colors mixed together at once, our brain perceives a brilliant, dazzling white blanket of snow!"
        }
      }
    ],
    relatedTopicIds: ['pluie', 'soleil']
  },
  {
    id: 'feuilles-tombent',
    title: { fr: 'Pourquoi les feuilles tombent ?', en: 'Why do leaves fall?' },
    category: { fr: 'Pourquoi ? ❓', en: 'Why? ❓' },
    categoryKey: 'pourquoi',
    icon: '🍂',
    shortDesc: { fr: "Le secret de l'automne.", en: 'The secret of autumn.' },
    fullContent: {
      fr: "En automne, il y a moins de soleil et il commence à faire froid. Pour économiser son énergie et survivre à l'hiver, l'arbre décide de fermer les petits tuyaux qui apportent l'eau aux feuilles. Sans eau, les feuilles sèchent et finissent par tomber !",
      en: 'In autumn, there is less sunlight and it starts to get cold. To save its energy and survive the winter, the tree decides to close the small tubes that bring water to the leaves. Without water, the leaves dry out and eventually fall!',
    },
    funFact: {
      fr: 'Certains arbres, comme les sapins, gardent leurs feuilles car elles sont plus costauds !',
      en: 'Some trees, like fir trees, keep their leaves because they are tougher!',
    },
    sections: [
      {
        id: 'magie_automne',
        icon: '🍁',
        title: { fr: "L'arrivée de l'automne", en: 'Autumn arrives' },
        content: {
          fr: "Quand les journées raccourcissent et que le froid arrive, beaucoup d'arbres se préparent pour l'hiver.",
          en: 'When daylight hours shorten and cold air arrives, many trees begin preparing for winter.',
        },
      },
      {
        id: 'vert_qui_disparait',
        icon: '🎨',
        title: { fr: 'Le vert s’efface', en: 'Green fades away' },
        content: {
          fr: 'La teinture verte des feuilles se retire, laissant éclater de superbes teintes jaunes, dorées et rouges.',
          en: 'The green color fades inside the leaves, revealing glorious shades of bright yellow, gold, and red.',
        },
      },
      {
        id: 'dormir_au_chaud',
        icon: '💧',
        title: { fr: "Économiser l'eau", en: 'Saving precious water' },
        content: {
          fr: "L'arbre coupe doucement l'eau vers les tiges pour s'endormir et éviter que le gel ne l'abîme.",
          en: 'The tree gently seals off water to the leaves to rest and stay safe from freezing.',
        },
      },
      {
        id: 'sapins_toujours_verts',
        icon: '🌲',
        title: { fr: 'Des arbres toujours verts', en: 'Evergreen trees' },
        content: {
          fr: 'Certains arbres comme les sapins gardent de robustes aiguilles cirées qui résistent très bien au gel.',
          en: 'Some trees like firs keep tough waxed needles that happily resist cold wind and frost.',
        },
      },
    ],
    relatedTopicIds: ['arbres', 'cycle-eau'],
  },
  {
    id: 'rayures-zebre',
    title: { fr: 'Pourquoi le zèbre a des rayures ?', en: 'Why do zebras have stripes?' },
    category: { fr: 'Pourquoi ? ❓', en: 'Why? ❓' },
    categoryKey: 'pourquoi',
    icon: '🦓',
    shortDesc: { fr: 'Le pyjama des zèbres.', en: "The zebras' pajamas." },
    fullContent: {
      fr: "Les rayures blanches et noires aident le zèbre à se protéger ! Elles créent une sorte d'illusion d'optique qui embrouille les lions qui veulent les chasser. En plus, les rayures font fuir les mouches piquantes qui n'aiment pas les motifs zébrés.",
      en: "Black and white stripes help the zebra protect itself! They create a kind of optical illusion that confuses lions who want to hunt them. Also, the stripes scare away biting flies that don't like zebra patterns.",
    },
    funFact: {
      fr: 'Comme nos empreintes de doigts, chaque zèbre a des rayures uniques au monde !',
      en: 'Like our fingerprints, every zebra has stripes that are unique in the world!',
    },
    sections: [
      {
        icon: '🦓',
        title: { fr: 'Un costume unique', en: 'A unique pattern' },
        content: {
          fr: "Chaque zèbre possède son propre dessin de rayures noires et blanches, comme une carte d'identité.",
          en: "Every zebra has its own unique black and white stripes, just like an identity card."
        }
      },
      {
        icon: '🔬',
        title: { fr: 'Une énigme pour la science', en: 'A scientific puzzle' },
        content: {
          fr: "Les chercheurs observent encore les zèbres pour comprendre tous les secrets de ce beau pelage.",
          en: "Researchers are still observing zebras to understand all the secrets of their coat."
        }
      },
      {
        icon: '🪰',
        title: { fr: 'Éloigner les mouches', en: 'Keeping flies away' },
        content: {
          fr: "Les rayures pourraient perturber la vue de certaines mouches piquantes et les empêcher de se poser.",
          en: "The striped pattern may confuse the vision of biting flies and prevent them from landing."
        }
      },
      {
        icon: '🦁',
        title: { fr: 'La vie en troupeau', en: 'Life in a herd' },
        content: {
          fr: "Au milieu du groupe, toutes ces lignes en mouvement pourraient aussi troubler le regard des prédateurs.",
          en: "In the middle of the herd, all these moving lines might also puzzle the gaze of predators."
        }
      }
    ],
    relatedTopicIds: ['lion', 'girafe']
  },
  {
    id: 'reves-sommeil',
    title: { fr: 'Pourquoi fait-on des rêves ?', en: 'Why do we dream?' },
    category: { fr: 'Pourquoi ? ❓', en: 'Why? ❓' },
    categoryKey: 'pourquoi',
    icon: '😴',
    shortDesc: { fr: 'Le cinéma de ton cerveau pendant la nuit.', en: 'The cinema of your brain during the night.' },
    fullContent: {
      fr: "Quand tu dors, ton cerveau reste bien réveillé ! Il en profite pour ranger tout ce que tu as appris et fait dans la journée. Les rêves sont un mélange d'idées, d'images et de souvenirs que ton cerveau trie pour t'aider à mieux grandir et à te souvenir.",
      en: 'When you sleep, your brain stays wide awake! It takes the opportunity to organize everything you learned and did during the day. Dreams are a mix of ideas, images, and memories that your brain sorts to help you grow better and remember.',
    },
    funFact: {
      fr: 'Même les chiens et les chats font des rêves, tu peux parfois voir leurs pattes bouger !',
      en: 'Even dogs and cats have dreams; you can sometimes see their paws move!',
    },
    sections: [
      {
        icon: '🌙',
        title: { fr: 'Un temps pour recharger', en: 'Time to recharge' },
        content: {
          fr: 'La nuit, quand tes yeux se ferment, tes muscles se détendent et ton corps tout entier reprend des forces pour la journée du lendemain.',
          en: 'At night, as your eyes close, your muscles relax and your whole body gathers fresh energy for tomorrow.',
        },
      },
      {
        icon: '🧠',
        title: { fr: 'Le cerveau ne dort jamais', en: 'The brain never sleeps' },
        content: {
          fr: 'Pendant que tu dors profondément, ton cerveau reste très actif : il trie les souvenirs, range ce que tu as appris et nettoie ses connexions.',
          en: 'While you sleep deeply, your brain stays busy: sorting memories, organizing daily lessons, and refreshing its connections.',
        },
      },
      {
        icon: '💭',
        title: { fr: 'Des histoires nocturnes', en: 'Nighttime stories' },
        content: {
          fr: 'C’est souvent durant ce travail nocturne que surgissent des images et des aventures étonnantes : ce sont tes rêves !',
          en: 'Often during this nighttime work, vivid images and surprising adventures unfold in your mind: these are dreams!',
        },
      },
      {
        icon: '✨',
        title: { fr: 'Un mystère encore partagé', en: 'A continuing mystery' },
        content: {
          fr: 'Les scientifiques savent que rêver aide à grandir et à réguler ses émotions, mais personne ne sait encore expliquer le secret de chaque rêve.',
          en: 'Scientists know dreaming helps with growth and emotions, but no one yet fully understands the secret behind every single dream.',
        },
      },
    ],
    relatedTopicIds: ['cerveau', 'la-lune'],
  },
  {
    id: 'pourquoi-caca',
    title: { fr: 'Pourquoi fait-on caca ?', en: 'Why do we poop?' },
    category: { fr: 'Pourquoi ? ❓', en: 'Why? ❓' },
    categoryKey: 'pourquoi',
    icon: '💩',
    shortDesc: { fr: 'Le voyage des aliments dans ton corps.', en: 'The journey of food in your body.' },
    fullContent: {
      fr: "Quand tu manges, ton corps garde les bonnes vitamines et l'énergie pour te faire grandir et courir partout. Mais tout n'est pas bon à garder ! Ce qu'il reste à la fin du grand voyage dans ton ventre, ce sont les déchets. Faire caca, c'est la façon pour ton corps de sortir les poubelles pour rester propre et en pleine forme à l'intérieur.",
      en: "When you eat, your body keeps the good vitamins and energy to make you grow and run around. But not everything is good to keep! What's left at the end of the long journey in your belly is waste. Pooping is your body's way of taking out the trash to stay clean and in great shape inside.",
    },
    funFact: {
      fr: "En une année, un être humain produit environ 150 kilos de caca, c'est le poids d'un gros panda !",
      en: 'In one year, a human produces about 150 kilos of poop, which is the weight of a large panda!',
    },
    sections: [
      {
        icon: '🥗',
        title: { fr: 'La digestion dans le ventre', en: 'Digestion in our tummy' },
        content: {
          fr: "Quand nous mangeons, l'estomac et les intestins trient les aliments pour en tirer l'énergie nécessaire à notre journée.",
          en: 'When we eat, our stomach and intestines sort food to extract the energy we need for the day.'
        }
      },
      {
        icon: '🗑️',
        title: { fr: 'Évacuer les restes', en: 'Emptying the leftovers' },
        content: {
          fr: 'Notre corps ne peut pas tout utiliser : les fibres et les petits déchets inutiles doivent sortir pour laisser la place nette.',
          en: 'Our body cannot use everything: leftover fibers and useless scraps must leave to keep things tidy inside.'
        }
      },
      {
        icon: '🦠',
        title: { fr: 'Le travail des bonnes bactéries', en: 'Helpful belly bacteria' },
        content: {
          fr: 'Des milliards de minuscules bactéries amies vivent dans notre ventre pour transformer et compacter ces déchets naturellement.',
          en: 'Billions of friendly microscopic bacteria live in our gut to break down and pack these leftovers naturally.'
        }
      },
      {
        icon: '🧼',
        title: { fr: 'Un corps en bonne santé', en: 'A healthy, happy body' },
        content: {
          fr: 'Aller régulièrement aux toilettes et bien se laver les mains après permet à tout le corps de rester propre et en pleine forme.',
          en: 'Visiting the bathroom regularly and washing hands afterward helps our whole body stay clean and strong.'
        }
      }
    ],
    relatedTopicIds: ['estomac', 'dents', 'cerveau'],
  },
] as const
