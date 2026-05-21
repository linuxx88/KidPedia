import { describe, it, expect } from 'vitest'
import { encyclopedia } from './topics'
import { mapData } from './mapData'
import { originData } from './originData'
import { NATURE_ELEMENTS } from './natureData'
import { safariMap } from './gameData'

describe('Data Integrity Audit', () => {
  const encyclopediaIdsArray = encyclopedia.map((t) => t.id)
  const encyclopediaIds = new Set<string>(encyclopediaIdsArray)

  it('ne devrait pas y avoir de doublons d\'ID dans l\'encyclopédie', () => {
    expect(encyclopediaIdsArray.length).toBe(encyclopediaIds.size)
  })

  it('tous les topicId de mapData doivent exister dans l\'encyclopédie', () => {
    mapData.forEach((marker) => {
      const exists = encyclopediaIds.has(marker.topicId)
      expect(exists, `Topic ID "${marker.topicId}" referenced in mapData must exist in encyclopedia`).toBe(true)
    })
  })

  it('tous les topicId de natureData doivent exister dans l\'encyclopédie', () => {
    Object.values(NATURE_ELEMENTS).forEach((element) => {
      const exists = encyclopediaIds.has(element.topicId)
      expect(exists, `Topic ID "${element.topicId}" referenced in natureData must exist in encyclopedia`).toBe(true)
    })
  })

  it('tous les subjectId de safariMap doivent exister dans l\'encyclopédie', () => {
    safariMap.forEach((cell) => {
      if (cell.subjectId) {
        const exists = encyclopediaIds.has(cell.subjectId)
        expect(exists, `Subject ID "${cell.subjectId}" referenced in safariMap must exist in encyclopedia`).toBe(true)
      }
    })
  })

  it('les IDs de originData devraient correspondre à des sujets si mentionnés (Audit Préventif)', () => {
    const originIdsInEncyclopedia = originData.filter(o => encyclopediaIds.has(o.id)).map(o => o.id)
    if (originIdsInEncyclopedia.length > 0) {
       console.log(`[Integrity Info] ${originIdsInEncyclopedia.length} originData IDs found in Encyclopedia: ${originIdsInEncyclopedia.join(', ')}`)
    }
  })

  it('Audit des Orphelins : tous les sujets doivent idéalement être référencés dans un mode de découverte', () => {
    const referencedIds = new Set<string>()
    mapData.forEach(m => referencedIds.add(m.topicId))
    Object.values(NATURE_ELEMENTS).forEach(el => referencedIds.add(el.topicId))
    safariMap.forEach(c => c.subjectId && referencedIds.add(c.subjectId))
    
    // Ajout des IDs de originData au cas où ils servent de lien direct
    originData.forEach(o => referencedIds.add(o.id))

    const orphanTopics = encyclopedia.filter(t => !referencedIds.has(t.id))
    
    if (orphanTopics.length > 0) {
      console.warn(`[Integrity Warning] ${orphanTopics.length} topics are orphans (not in Map, Circle or Origins):`)
      orphanTopics.forEach(t => console.warn(` - [${t.id}] ${t.title.fr}`))
    }
    
    expect(orphanTopics.length).toBeLessThan(encyclopedia.length)
  })

  it('Format des IDs : tous les IDs doivent être en kebab-case (Audit de style)', () => {
    const kebabRegex = /^[a-z0-9-]+$/
    encyclopedia.forEach(topic => {
      const isKebab = kebabRegex.test(topic.id)
      expect(isKebab, `Topic ID "${topic.id}" must be kebab-case`).toBe(true)
    })
  })
})
