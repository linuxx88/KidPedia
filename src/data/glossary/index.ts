import espace from './espace.json'
import histoire from './histoire.json'
import nature from './nature.json'
import science from './science.json'

interface GlossaryWord {
  word: {
    fr: string
    en: string
  }
  definition: {
    fr: string
    en: string
  }
  emoji: string
  category: string
}

const glossaryData: GlossaryWord[] = [
  ...espace,
  ...histoire,
  ...nature,
  ...science
]

export default glossaryData
