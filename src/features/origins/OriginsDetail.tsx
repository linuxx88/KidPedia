import React from 'react'
import { useParams, Navigate, useNavigate } from 'react-router-dom'
import { originData, type HistoryNode } from '../../data/originData'
import { OriginsGrid } from './Components/OriginsGrid'
import { useSettingsStore } from '../../store/useSettingsStore'
import styles from './Origins.module.css'

export const OriginsDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { language } = useSettingsStore()

  // Helper recursive function to find a node by ID
  const findNode = (nodes: HistoryNode[], targetId: string): HistoryNode | null => {
    for (const node of nodes) {
      if (node.id === targetId) return node
      if (node.subNodes) {
        const found = findNode(node.subNodes, targetId)
        if (found) return found
      }
    }
    return null
  }

  const node = id ? findNode(originData, id) : null

  if (!node || !node.subNodes) {
    return <Navigate to="/origins" replace />
  }

  // Logique du chapitre suivant (horizontal)
  // On cherche le parent dans originData
  const currentRootIndex = originData.findIndex(h => h.id === id)
  const nextChapter = currentRootIndex !== -1 && currentRootIndex < originData.length - 1 
    ? originData[currentRootIndex + 1] 
    : null
  
  const hasNextSubLevel = nextChapter && nextChapter.subNodes

  const handleNextChapter = () => {
    if (nextChapter) {
      navigate(`/origins/${nextChapter.id}`)
    }
  }

  const getStroke = () => {
    const firstId = node.subNodes![0]?.id || ''
    if (firstId.startsWith('ms')) return "url(#marineGradient)"
    if (firstId.startsWith('ls')) return "url(#landGradient)"
    if (firstId.startsWith('dn')) return "url(#dinoGradient)"
    if (firstId.startsWith('hf')) return "url(#humanGradient)"
    if (firstId.startsWith('ev')) return "url(#evolutionGradient)"
    if (firstId.startsWith('gv')) return "url(#villageGradient)"
    if (firstId.startsWith('cv')) return "url(#civilizationGradient)"
    if (firstId.startsWith('ma')) return "url(#middleAgesGradient)"
    return "url(#snakeGradient)"
  }

  return (
    <div className={styles.board}>
      <OriginsGrid 
        nodes={node.subNodes} 
        getStroke={getStroke} 
      />

      {hasNextSubLevel && (
        <button 
          className={styles.nextChapterBtn} 
          onClick={handleNextChapter}
        >
          <span>{nextChapter!.title[language]}</span>
          <span className={styles.nextArrow}>→</span>
        </button>
      )}
    </div>
  )
}
