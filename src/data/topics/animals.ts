import { modernAnimals } from './animals/modern'
import { evolutionAnimals } from './animals/evolution'

export const animals = [
  ...modernAnimals,
  ...evolutionAnimals,
] as const
