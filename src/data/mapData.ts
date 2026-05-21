import type { LocalizedString } from './topics/types'

export interface MapMarker {
  id: string
  topicId: string
  title: LocalizedString
  icon: string
  x: number
  y: number
  minZoom: number
}

export const mapData: MapMarker[] = [
  // --- NIVEAU 1 : Les Incontournables ---
  {
    id: 'm1',
    topicId: 'grand-canyon',
    title: { fr: 'Le Grand Canyon', en: 'The Grand Canyon' },
    icon: '🏜️',
    x: 19.99,
    y: 36.65,
    minZoom: 1,
  },
  {
    id: 'm23',
    topicId: 't-rex',
    title: { fr: 'Le T-Rex', en: 'The T-Rex' },
    icon: '🦖',
    x: 15.0,
    y: 28.0,
    minZoom: 2,
  },
  {
    id: 'm24',
    topicId: 'astronaute',
    title: { fr: 'Les Astronautes', en: 'The Astronauts' },
    icon: '👨‍🚀',
    x: 25.5,
    y: 38.5,
    minZoom: 2,
  },
  {
    id: 'm2',
    topicId: 'amazonie',
    title: { fr: "L'Amazonie", en: 'The Amazon' },
    icon: '🌴',
    x: 33.85,
    y: 54.73,
    minZoom: 1,
  },
  {
    id: 'm4',
    topicId: 'tour-eiffel',
    title: { fr: 'La Tour Eiffel', en: 'The Eiffel Tower' },
    icon: '🗼',
    x: 50.66,
    y: 30.88,
    minZoom: 1,
  },
  {
    id: 'm25',
    topicId: 'cerveau',
    title: { fr: 'Le Cerveau', en: 'The Brain' },
    icon: '🧠',
    x: 52.5,
    y: 34.0,
    minZoom: 3,
  },
  {
    id: 'm26',
    topicId: 'ampoule',
    title: { fr: "L'Ampoule", en: 'The Light Bulb' },
    icon: '💡',
    x: 28.0,
    y: 35.0,
    minZoom: 3,
  },
  {
    id: 'm7',
    topicId: 'pyramides-egypte',
    title: { fr: 'Les Pyramides', en: 'The Pyramids' },
    icon: '📐',
    x: 59.2,
    y: 42.5,
    minZoom: 1,
  },
  {
    id: 'm10',
    topicId: 'grande-muraille',
    title: { fr: 'La Grande Muraille', en: 'The Great Wall' },
    icon: '🧱',
    x: 80.9,
    y: 35.18,
    minZoom: 1,
  },
  {
    id: 'm11',
    topicId: 'mont-everest',
    title: { fr: 'Le Mont Everest', en: 'Mount Everest' },
    icon: '🏔️',
    x: 73.04,
    y: 39.83,
    minZoom: 1,
  },
  {
    id: 'm14',
    topicId: 'barriere-corail',
    title: { fr: 'Barrière de Corail', en: 'Coral Reef' },
    icon: '🪸',
    x: 89.21,
    y: 57.03,
    minZoom: 1,
  },
  {
    id: 'm15',
    topicId: 'antarctique',
    title: { fr: "L'Antarctique", en: 'Antarctica' },
    icon: '❄️',
    x: 50.0,
    y: 96.5,
    minZoom: 1,
  },

  // --- NIVEAU 2 : Exploration ---
  { id: 'm3', topicId: 'mayas', title: { fr: 'Les Mayas', en: 'The Mayans' }, icon: '🗿', x: 26.44, y: 43.57, minZoom: 2 },
  {
    id: 'm6',
    topicId: 'vikings',
    title: { fr: 'Les Vikings', en: 'The Vikings' },
    icon: '⛵',
    x: 45.36,
    y: 20.27,
    minZoom: 2,
  },
  { id: 'm8', topicId: 'lion', title: { fr: 'Le Lion', en: 'The Lion' }, icon: '🦁', x: 57.45, y: 48.45, minZoom: 2 },
  {
    id: 'm9',
    topicId: 'desert-sahara',
    title: { fr: 'Le Sahara', en: 'The Sahara' },
    icon: '🏜️',
    x: 51.77,
    y: 42.26,
    minZoom: 2,
  },
  { id: 'm17', topicId: 'girafe', title: { fr: 'La Girafe', en: 'The Giraffe' }, icon: '🦒', x: 60.85, y: 51.63, minZoom: 2 },
  {
    id: 'm13',
    topicId: 'samourais',
    title: { fr: 'Les Samouraïs', en: 'The Samurai' },
    icon: '⚔️',
    x: 87.1,
    y: 36.36,
    minZoom: 2,
  },
  { id: 'm18', topicId: 'panda', title: { fr: 'Le Panda', en: 'The Panda' }, icon: '🐼', x: 80.5, y: 45.5, minZoom: 2 },
  {
    id: 'm19',
    topicId: 'kangourou',
    title: { fr: 'Le Kangourou', en: 'The Kangaroo' },
    icon: '🦘',
    x: 85.0,
    y: 60.02,
    minZoom: 2,
  },

  // --- NIVEAU 3 : Détails ---
  { id: 'm5', topicId: 'venise-eau', title: { fr: 'Venise', en: 'Venice' }, icon: '🛶', x: 51.8, y: 30.2, minZoom: 3 },
  { id: 'm12', topicId: 'tigre', title: { fr: 'Le Tigre', en: 'The Tiger' }, icon: '🐯', x: 72.94, y: 42.71, minZoom: 3 },
  { id: 'm20', topicId: 'pingouin', title: { fr: 'Le Manchot', en: 'The Penguin' }, icon: '🐧', x: 42.0, y: 96.5, minZoom: 3 },
  { id: 'm21', topicId: 'dauphin', title: { fr: 'Le Dauphin', en: 'The Dolphin' }, icon: '🐬', x: 12.0, y: 60.0, minZoom: 3 },
  { id: 'm22', topicId: 'loup', title: { fr: 'Le Loup', en: 'The Wolf' }, icon: '🐺', x: 72.5, y: 28.5, minZoom: 3 },
]
