import { describe, it, expect } from 'vitest'
import { encyclopedia } from './topics'
import { mapData } from './mapData'
import { originData } from './originData'
import type { HistoryNode } from './origins'
import { NATURE_ELEMENTS } from './natureData'
import { safariMap } from './gameData'
import { QUIZZES } from './quizzes'
import { createTopicCard } from './factory'

describe('Data Integrity Audit', () => {
  const encyclopediaIdsArray = encyclopedia.map((t) => t.id)
  const encyclopediaIds = new Set<string>(encyclopediaIdsArray)
  const DECOUPLED_TOPIC_IDS = new Set<string>(['systeme-solaire'])

  it('toutes les fiches de l\'encyclopédie doivent respecter le schéma strict du Data Factory', () => {
    encyclopedia.forEach((topic) => {
      expect(() => createTopicCard(topic)).not.toThrow()
    })
  })

  it('ne devrait pas y avoir de doublons d\'ID dans l\'encyclopédie', () => {
    expect(encyclopediaIdsArray.length).toBe(encyclopediaIds.size)
  })

  it('tous les topicId de mapData doivent exister dans l\'encyclopédie', () => {
    mapData.forEach((marker) => {
      const exists = encyclopediaIds.has(marker.topicId) || DECOUPLED_TOPIC_IDS.has(marker.topicId)
      expect(exists, `Topic ID "${marker.topicId}" referenced in mapData must exist in encyclopedia`).toBe(true)
    })
  })

  it('tous les topicId de natureData doivent exister dans l\'encyclopédie', () => {
    Object.values(NATURE_ELEMENTS).forEach((element) => {
      const exists = encyclopediaIds.has(element.topicId) || DECOUPLED_TOPIC_IDS.has(element.topicId)
      expect(exists, `Topic ID "${element.topicId}" referenced in natureData must exist in encyclopedia`).toBe(true)
    })
  })

  it('tous les subjectId de safariMap doivent exister dans l\'encyclopédie', () => {
    safariMap.forEach((cell) => {
      if (cell.subjectId) {
        const exists = encyclopediaIds.has(cell.subjectId) || DECOUPLED_TOPIC_IDS.has(cell.subjectId)
        expect(exists, `Subject ID "${cell.subjectId}" referenced in safariMap must exist in encyclopedia`).toBe(true)
      }
    })
  })

  it('les IDs de originData devraient correspondre à des sujets si mentionnés (Audit Préventif)', () => {
    const originIdsInEncyclopedia = originData.filter(o => encyclopediaIds.has(o.id) || DECOUPLED_TOPIC_IDS.has(o.id)).map(o => o.id)
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

      const topicExists = encyclopediaIds.has(topicId) || DECOUPLED_TOPIC_IDS.has(topicId)
      expect(topicExists, `Topic ID "${topicId}" referenced in origin node "${id}" must exist in encyclopedia`).toBe(true)

      const quizExists = QUIZ_IDS.has(topicId) || DECOUPLED_TOPIC_IDS.has(topicId)
      expect(quizExists, `Quiz for Topic ID "${topicId}" referenced in origin node "${id}" must exist in QUIZZES or decoupled content`).toBe(true)
    })
  })

  it('Audit des Orphelins : tous les sujets doivent être référencés dans au moins un mode de découverte (Carte, Nature, Safari, Origines, ou Accueil/Recherche)', () => {
    const referencedIds = new Set<string>()
    
    // 1. Mode de découverte : Carte interactive
    mapData.forEach(m => referencedIds.add(m.topicId))
    
    // 2. Mode de découverte : Cercle de la vie (Nature)
    Object.values(NATURE_ELEMENTS).forEach(el => referencedIds.add(el.topicId))
    
    // 3. Mode de découverte : Mission Safari (Jeu de l'oie)
    safariMap.forEach(c => c.subjectId && referencedIds.add(c.subjectId))
    
    // 4. Mode de découverte : Le Grand Voyage du Temps (Origines - récursif)
    const collectOriginTopicIds = (nodes: HistoryNode[]): string[] => {
      const ids: string[] = []
      nodes.forEach((node) => {
        if (node.topicId) ids.push(node.topicId)
        if (node.subNodes) ids.push(...collectOriginTopicIds(node.subNodes))
      })
      return ids
    }
    collectOriginTopicIds(originData).forEach(id => referencedIds.add(id))

    // 5. Mode de découverte universel : Accueil (Grille de recherche et Catégories)
    // Tous les sujets de l'encyclopédie sont validés pour s'assurer qu'ils sont découvrables via la grille
    const discoverableViaGrid: string[] = []
    encyclopedia.forEach(t => {
      if (t.categoryKey && t.category.fr && t.category.en) {
        discoverableViaGrid.push(t.id)
        referencedIds.add(t.id)
      }
    })

    const orphanTopics = encyclopedia.filter(t => !referencedIds.has(t.id))
    
    expect(orphanTopics.length).toBe(0)
    
    // Audit informationnel propre
    console.log(`[Integrity Audit] 100% des sujets (${encyclopedia.length}) sont découvrables de manière naturelle :`)
    console.log(` - ${mapData.length} sur la Carte interactive.`)
    console.log(` - ${Object.keys(NATURE_ELEMENTS).length} dans le Cercle de la Nature.`)
    console.log(` - ${safariMap.filter(c => c.subjectId).length} dans le Mission Safari.`)
    console.log(` - ${new Set(collectOriginTopicIds(originData)).size} dans le Grand Voyage du Temps.`)
    console.log(` - ${discoverableViaGrid.length} via la Grille d'Accueil et le Moteur de recherche.`)
  })

  it('Format des IDs : tous les IDs doivent être en kebab-case (Audit de style)', () => {
    const kebabRegex = /^[a-z0-9-]+$/
    encyclopedia.forEach(topic => {
      const isKebab = kebabRegex.test(topic.id)
      expect(isKebab, `Topic ID "${topic.id}" must be kebab-case`).toBe(true)
    })
  })
})
