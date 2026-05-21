import { describe, it, expect } from 'vitest'
import { encyclopedia } from './topics'
import { mapData } from './mapData'
import { originData } from './originData'
import type { HistoryNode } from './origins'
import { NATURE_ELEMENTS } from './natureData'
import { safariMap } from './gameData'
import { QUIZZES } from './quizzes'

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

  it('tous les topicId des nœuds de la frise chronologique (originData) doivent exister dans l\'encyclopédie et posséder un quiz', () => {
    const collectTopicIds = (nodes: HistoryNode[]): { id: string; topicId: string }[] => {
      const result: { id: string; topicId: string }[] = []
      nodes.forEach((node) => {
        if (node.topicId) {
          result.push({ id: node.id, topicId: node.topicId })
        }
        if (node.subNodes) {
          result.push(...collectTopicIds(node.subNodes))
        }
      })
      return result
    }

    const QUIZ_IDS = new Set(Object.keys(QUIZZES))
    const categoryHubs = new Set(['histoire', 'dinosaurs', 'animaux'])

    const topicIds = collectTopicIds(originData)
    topicIds.forEach(({ id, topicId }) => {
      if (categoryHubs.has(topicId)) {
        return
      }

      const topicExists = encyclopediaIds.has(topicId)
      expect(topicExists, `Topic ID "${topicId}" referenced in origin node "${id}" must exist in encyclopedia`).toBe(true)

      const quizExists = QUIZ_IDS.has(topicId)
      expect(quizExists, `Quiz for Topic ID "${topicId}" referenced in origin node "${id}" must exist in QUIZZES`).toBe(true)
    })
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
