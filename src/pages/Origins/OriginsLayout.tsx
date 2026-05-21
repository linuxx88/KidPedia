import React from 'react'
import { Outlet, useNavigate, useLocation, useParams } from 'react-router-dom'
import { PageHeader } from '../../components/Layout/PageHeader'
import { useSettingsStore } from '../../store/useSettingsStore'
import { originData, type HistoryNode } from '../../data/originData'
import styles from './Origins.module.css'

export const OriginsLayout: React.FC = () => {
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const { id } = useParams<{ id: string }>()
  const { labels } = useSettingsStore()

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

  const handleBack = () => {
    if (pathname === '/origins') {
      navigate('/')
    } else {
      // Go back one level in the hierarchy
      const parts = pathname.split('/')
      parts.pop()
      navigate(parts.join('/'))
    }
  }

  const getTitle = () => {
    if (!id) return labels.discovery.originsTitle
    
    const node = findNode(originData, id)
    if (!node || !node.subNodes) return labels.discovery.originsTitle

    const firstId = node.subNodes[0]?.id || ''
    if (firstId.startsWith('ms')) return labels.discovery.oceanOdyssey
    if (firstId.startsWith('ls')) return labels.discovery.landOdyssey
    if (firstId.startsWith('dn')) return labels.discovery.dinoOdyssey
    if (firstId.startsWith('hf')) return labels.discovery.humanOdyssey
    if (firstId.startsWith('ev')) return labels.discovery.evolutionOdyssey
    if (firstId.startsWith('gv')) return labels.discovery.villageOdyssey
    if (firstId.startsWith('cv')) return labels.discovery.civilizationOdyssey
    if (firstId.startsWith('ma')) return labels.discovery.middleAgesOdyssey
    return labels.discovery.universeOdyssey
  }

  return (
    <div className={styles.container}>
      <PageHeader 
        title={getTitle()} 
        icon="🕰️" 
        onBack={handleBack} 
        className={styles.integratedHeader}
      />
      
      <svg style={{ position: 'absolute', width: 0, height: 0 }}>
        <defs>
          <linearGradient id="snakeGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#0f172a" />
            <stop offset="20%" stopColor="#ef4444" />
            <stop offset="40%" stopColor="#f97316" />
            <stop offset="60%" stopColor="#fcd34d" />
            <stop offset="80%" stopColor="#10b981" />
            <stop offset="100%" stopColor="#0ea5e9" />
          </linearGradient>

          <linearGradient id="marineGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#0369a1" />
            <stop offset="50%" stopColor="#2dd4bf" />
            <stop offset="100%" stopColor="#10b981" />
          </linearGradient>

          <linearGradient id="landGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#10b981" />
            <stop offset="50%" stopColor="#84cc16" />
            <stop offset="100%" stopColor="#b45309" />
          </linearGradient>

          <linearGradient id="dinoGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#f97316" />
            <stop offset="50%" stopColor="#78350f" />
            <stop offset="100%" stopColor="#064e3b" />
          </linearGradient>

          <linearGradient id="humanGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#f59e0b" />
            <stop offset="50%" stopColor="#92400e" />
            <stop offset="100%" stopColor="#475569" />
          </linearGradient>

          <linearGradient id="evolutionGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#f97316" />
            <stop offset="50%" stopColor="#ef4444" />
            <stop offset="100%" stopColor="#fcd34d" />
          </linearGradient>

          <linearGradient id="villageGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#92400e" />
            <stop offset="50%" stopColor="#10b981" />
            <stop offset="100%" stopColor="#fcd34d" />
          </linearGradient>

          <linearGradient id="civilizationGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#f59e0b" />
            <stop offset="50%" stopColor="#8b5cf6" />
            <stop offset="100%" stopColor="#f1f5f9" />
          </linearGradient>

          <linearGradient id="middleAgesGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#475569" />
            <stop offset="50%" stopColor="#8b5cf6" />
            <stop offset="100%" stopColor="#94a3b8" />
          </linearGradient>
        </defs>
      </svg>

      <Outlet />
    </div>
  )
}
