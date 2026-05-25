import { type Quiz } from '../topics/types';
import { type TopicId } from '../../types/domain';

export const QUIZZES: Partial<Record<TopicId, Quiz>> = {
  pyramides: {
    question: {
      fr: 'Pourquoi les Égyptiens construisaient-ils des pyramides ?',
      en: 'Why did the Egyptians build pyramids?',
    },
    options: {
      fr: ['Pour stocker du grain', 'Comme tombeaux pour les pharaons', 'Pour observer les étoiles'],
      en: ['To store grain', 'As tombs for pharaohs', 'To observe the stars'],
    },
    correctAnswer: 1,
  },
  chevaliers: {
    question: {
      fr: 'Où vivaient souvent les chevaliers ?',
      en: 'Where did knights often live?',
    },
    options: {
      fr: ['Dans des cabanes', 'Dans des châteaux', 'Dans des bateaux'],
      en: ['In huts', 'In castles', 'In boats'],
    },
    correctAnswer: 1,
  },
  vikings: {
    question: {
      fr: "Comment s'appelaient les bateaux des Vikings ?",
      en: 'What were Viking boats called?',
    },
    options: {
      fr: ['Des barques', 'Des drakkars', 'Des canoës'],
      en: ['Skiffs', 'Longships', 'Canoes'],
    },
    correctAnswer: 1,
  },
  chateaux: {
    question: {
      fr: "Comment s'appelle le pont qu'on peut remonter pour fermer le château ?",
      en: 'What is the name of the bridge that can be raised to close the castle?',
    },
    options: {
      fr: ['Le pont-levis', 'Le pont-volant', 'Le pont-sauteur'],
      en: ['Drawbridge', 'Flying bridge', 'Jumping bridge'],
    },
    correctAnswer: 0,
  },
  romains: {
    question: {
      fr: "Qu'est-ce que les Romains construisaient pour transporter l'eau ?",
      en: 'What did the Romans build to transport water?',
    },
    options: {
      fr: ['Des toboggans', 'Des aqueducs', 'Des camions'],
      en: ['Slides', 'Aqueducts', 'Trucks'],
    },
    correctAnswer: 1,
  },
  samourais: {
    question: {
      fr: 'De quel pays venaient les samouraïs ?',
      en: 'Which country did the samurai come from?',
    },
    options: {
      fr: ['De Chine', 'Du Japon', 'De France'],
      en: ['China', 'Japan', 'France'],
    },
    correctAnswer: 1,
  },
  pirates: {
    question: {
      fr: "Comment s'appelle le drapeau noir des pirates ?",
      en: 'What is the name of the black pirate flag?',
    },
    options: {
      fr: ['Le Jolly Roger', 'Le Beau Drapeau', 'Le Pavillon Bleu'],
      en: ['The Jolly Roger', 'The Beautiful Flag', 'The Blue Flag'],
    },
    correctAnswer: 0,
  },
  prehistoire: {
    question: {
      fr: 'Où les hommes préhistoriques dessinaient-ils souvent ?',
      en: 'Where did prehistoric humans often draw?',
    },
    options: {
      fr: ['Sur du papier', 'Dans des grottes', 'Sur des voitures'],
      en: ['On paper', 'In caves', 'On cars'],
    },
    correctAnswer: 1,
  },
  'grece-antique': {
    question: {
      fr: 'Quelle célèbre compétition sportive les Grecs ont-ils inventée ?',
      en: 'Which famous sporting competition did the Greeks invent?',
    },
    options: {
      fr: ['Le Football', 'Les Jeux Olympiques', 'Le Tour de France'],
      en: ['Football', 'The Olympic Games', 'The Tour de France'],
    },
    correctAnswer: 1,
  },
  'leonard-vinci': {
    question: {
      fr: 'Quel célèbre tableau Léonard de Vinci a-t-il peint ?',
      en: 'Which famous painting did Leonardo da Vinci paint?',
    },
    options: {
      fr: ['La Joconde', 'Le Petit Prince', 'Un paysage de neige'],
      en: ['The Mona Lisa', 'The Little Prince', 'A snow landscape'],
    },
    correctAnswer: 0,
  },
  mayas: {
    question: {
      fr: 'Où les Mayas construisaient-ils leurs cités ?',
      en: 'Where did the Mayans build their cities?',
    },
    options: {
      fr: ['Dans le désert', 'Dans la jungle', 'Sur la glace'],
      en: ['In the desert', 'In the jungle', 'On ice'],
    },
    correctAnswer: 1,
  },
  'premier-pas-lune': {
    question: {
      fr: 'Qui est le premier homme à avoir marché sur la Lune ?',
      en: 'Who was the first man to walk on the Moon?',
    },
    options: {
      fr: ['Tintin', 'Neil Armstrong', "Buzz l'Éclair"],
      en: ['Tintin', 'Neil Armstrong', 'Buzz Lightyear'],
    },
    correctAnswer: 1,
  },
  'berceau-afrique': {
    question: {
      fr: "Quel est le nom de la région d'Afrique où l'histoire humaine a commencé ?",
      en: "What is the name of the region in Africa where human history began?",
    },
    options: {
      fr: ["Le Grand Rift", "Le grand désert", "La forêt dense"],
      en: ["The Great Rift", "The great desert", "The dense forest"],
    },
    correctAnswer: 0,
  },
  'debout-deux-pieds': {
    question: {
      fr: "Comment s'appelle le fait de se tenir debout et de marcher sur deux pieds ?",
      en: "What is standing up and walking on two feet called?",
    },
    options: {
      fr: ["La nage", "La bipédie", "Le vol"],
      en: ["Swimming", "Bipedalism", "Flying"],
    },
    correctAnswer: 1,
  },
  'artisan-pierres': {
    question: {
      fr: "Quel est le surnom de l'Homo Habilis qui a créé les premiers outils ?",
      en: "What is the nickname of Homo Habilis who created the first tools?",
    },
    options: {
      fr: ["L'homme rapide", "L'homme habile", "L'homme fort"],
      en: ["Handy man", "Fast man", "Strong man"],
    },
    correctAnswer: 1,
  },
  'dompteur-feu': {
    question: {
      fr: "Qu'est-ce que la nourriture cuite sur le feu a aidé à grandir chez les humains ?",
      en: "What did food cooked on the fire help grow in humans?",
    },
    options: {
      fr: ["Leurs cheveux", "Leur cerveau", "Leurs dents"],
      en: ["Their hair", "Their brain", "Their teeth"],
    },
    correctAnswer: 1,
  },
  'grand-voyage': {
    question: {
      fr: "Comment les premiers humains sont-ils passés de l'Asie à l'Amérique ?",
      en: "How did early humans cross from Asia to America?",
    },
    options: {
      fr: ["En marchant sur de la glace géante", "En avion", "En sous-marin"],
      en: ["By walking on giant ice", "By plane", "By submarine"],
    },
    correctAnswer: 0,
  },
  'cousins-neandertal': {
    question: {
      fr: "À quel âge de la Terre l'Homme de Néandertal était-il adapté ?",
      en: "Which Earth age was Neanderthal man adapted to?",
    },
    options: {
      fr: ["L'âge de glace", "L'âge du sable", "L'âge du feu"],
      en: ["The ice age", "The sand age", "The fire age"],
    },
    correctAnswer: 0,
  },
  'artistes-cavernes': {
    question: {
      fr: "Comment s'appelle la célèbre grotte française souvent appelée la 'Chapelle Sixtine de la préhistoire' ?",
      en: "What is the name of the famous French cave often called the 'Sistine Chapel of prehistory'?",
    },
    options: {
      fr: ["La grotte de Lascaux", "La grotte bleue", "La grotte de glace"],
      en: ["Lascaux Cave", "The blue cave", "The ice cave"],
    },
    correctAnswer: 0,
  },
  'premiers-villages': {
    question: {
      fr: "Qu'est-ce que les humains ont appris à faire pour pouvoir vivre dans les premiers villages fixes ?",
      en: "What did humans learn to do to be able to live in the first permanent villages?",
    },
    options: {
      fr: ["Piloter des avions", "L'agriculture et l'élevage", "Nager sous l'eau"],
      en: ["Fly planes", "Agriculture and farming", "Swim underwater"],
    },
    correctAnswer: 1,
  },
  sedentarisation: {
    question: {
      fr: "Que signifie le fait de devenir sédentaire ?",
      en: "What does becoming sedentary mean?",
    },
    options: {
      fr: ["Voyager tout le temps", "S'installer et vivre au même endroit", "Vivre uniquement dans des grottes"],
      en: ["Traveling all the time", "Settling down and living in the same place", "Living only in caves"],
    },
    correctAnswer: 1,
  },
  'murs-terre': {
    question: {
      fr: "Quel mélange naturel utilisait-on pour fabriquer des murs solides ?",
      en: "What natural mixture was used to make solid walls?",
    },
    options: {
      fr: ["De la paille et de la terre mouillée", "Du plastique et du sable", "De la glace et des feuilles"],
      en: ["Straw and wet earth", "Plastic and sand", "Ice and leaves"],
    },
    correctAnswer: 0,
  },
  'debuts-agriculture': {
    question: {
      fr: "Qu'est-ce que les humains ont appris à semer pour faire pousser de la nourriture ?",
      en: "What did humans learn to sow to grow food?",
    },
    options: {
      fr: ["Des cailloux", "Des graines", "Des jouets"],
      en: ["Stones", "Seeds", "Toys"],
    },
    correctAnswer: 1,
  },
  'debuts-elevage': {
    question: {
      fr: "Quel est l'un des premiers animaux que les humains ont élevé près d'eux ?",
      en: "What is one of the first animals that humans raised near them?",
    },
    options: {
      fr: ["Le dinosaure", "La chèvre", "Le lion"],
      en: ["The dinosaur", "The goat", "The lion"],
    },
    correctAnswer: 1,
  },
  'invention-poterie': {
    question: {
      fr: "Quelle matière souple de la terre façonnait-on pour faire des pots ?",
      en: "What soft material from the earth was shaped to make pots?",
    },
    options: {
      fr: ["Le bois", "L'argile", "Le fer"],
      en: ["Wood", "Clay", "Iron"],
    },
    correctAnswer: 1,
  },
  'vie-communaute': {
    question: {
      fr: "Comment faisait-on parfois pour entrer dans les maisons serrées du village ?",
      en: "How did people sometimes enter the tightly packed houses of the village?",
    },
    options: {
      fr: ["Par le toit avec une échelle", "En creusant un tunnel", "Par une porte dorée"],
      en: ["Through the roof with a ladder", "By digging a tunnel", "Through a golden door"],
    },
    correctAnswer: 0,
  },
  'tissage-laine': {
    question: {
      fr: "De quel animal récupérait-on la laine pour la tisser ?",
      en: "From which animal did they get wool to weave?",
    },
    options: {
      fr: ["Du poisson", "Du mouton", "De l'oiseau"],
      en: ["Fish", "Sheep", "Bird"],
    },
    correctAnswer: 1,
  },
  megalithes: {
    question: {
      fr: "Qu'est-ce que les villageois déplaçaient ensemble pour fabriquer des monuments ?",
      en: "What did the villagers move together to make monuments?",
    },
    options: {
      fr: ["Des plumes légères", "D'énormes pierres géantes", "Des troncs de sapin"],
      en: ["Light feathers", "Huge giant stones", "Fir tree trunks"],
    },
    correctAnswer: 1,
  },
  'ecriture-sacree': {
    question: {
      fr: "Comment s'appelaient les petits dessins que les Égyptiens utilisaient pour écrire ?",
      en: "What were the small drawings the Egyptians used to write called?",
    },
    options: {
      fr: ["Les hiéroglyphes", "Les chiffres", "Les étoiles"],
      en: ["Hieroglyphs", "Numbers", "Stars"],
    },
    correctAnswer: 0,
  },
  'empire-incas': {
    question: {
      fr: "Dans quel endroit extraordinaire les Incas construisaient-ils leurs cités ?",
      en: "In what extraordinary place did the Incas build their cities?",
    },
    options: {
      fr: ["Tout en haut des montagnes", "Sous l'eau dans l'océan", "Dans le grand désert de sable"],
      en: ["High up in the mountains", "Underwater in the ocean", "In the great sand desert"],
    },
    correctAnswer: 0,
  },
  cathedrales: {
    question: {
      fr: "Comment s'appellent les jolies fenêtres en verre coloré des cathédrales ?",
      en: "What are the pretty colored glass windows of cathedrals called?",
    },
    options: {
      fr: ["Des vitraux", "Des miroirs", "Des rideaux"],
      en: ["Stained glass windows", "Mirrors", "Curtains"],
    },
    correctAnswer: 0,
  },
  calligraphie: {
    question: {
      fr: "Avec quel instrument de plume écrivait-on les manuscrits au Moyen Âge ?",
      en: "With which feather instrument did they write manuscripts in the Middle Ages?",
    },
    options: {
      fr: ["Une plume d'oie", "Un stylo à bille", "Un pinceau en plastique"],
      en: ["A goose feather", "A ballpoint pen", "A plastic brush"],
    },
    correctAnswer: 0,
  },
  'moulins-moyen-age': {
    question: {
      fr: "Quelle force de la nature faisait tourner les moulins à vent ?",
      en: "Which force of nature turned windmills?",
    },
    options: {
      fr: ["Le vent", "La pluie", "Le soleil"],
      en: ["The wind", "The rain", "The sun"],
    },
    correctAnswer: 0,
  },
  'foires-marches': {
    question: {
      fr: "Pourquoi les marchands venaient-ils s'installer dans les foires ?",
      en: "Why did merchants set up in fairs?",
    },
    options: {
      fr: ["Pour faire du toboggan", "Pour vendre des épices et de beaux tissus", "Pour dormir tranquillement"],
      en: ["To go down slides", "To sell spices and beautiful fabrics", "To sleep quietly"],
    },
    correctAnswer: 1,
  },
  'invention-papier': {
    question: {
      fr: "Dans quel pays le papier a-t-il été inventé à l'origine ?",
      en: "In which country was paper originally invented?",
    },
    options: {
      fr: ["En Chine", "En France", "En Amérique"],
      en: ["China", "France", "America"],
    },
    correctAnswer: 0,
  }
};
