import React, { useState } from 'react'
import { Outlet, useNavigate, useLocation, useParams } from 'react-router-dom'
import { PageHeader } from '../../components/Layout/PageHeader'
import { useSettingsStore } from '../../store/useSettingsStore'
import { originData, type HistoryNode } from '../../data/originData'
import fabianThumb from '../../assets/images/fabian-schneider-thumb.webp'
import fabianWebp from '../../assets/images/fabian-schneider.webp'
import styles from './Origins.module.css'

export const OriginsLayout: React.FC = () => {
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const { id } = useParams<{ id: string }>()
  const { labels } = useSettingsStore()
  const [highResLoaded, setHighResLoaded] = useState(false)

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
      <div className={styles.bgWrapper} aria-hidden="true">
        <img
          src={fabianThumb}
          alt=""
          className={styles.bgImageThumb}
        />
        <img
          src={fabianWebp}
          alt=""
          loading="lazy"
          fetchPriority="low"
          onLoad={() => setHighResLoaded(true)}
          className={`${styles.bgImageHigh} ${highResLoaded ? styles.loaded : ''}`}
        />
      </div>

      <PageHeader 
        title={getTitle()} 
        icon="🕰️" 
        onBack={handleBack} 
        className={styles.integratedHeader}
      />
      
      <svg style={{ position: 'absolute', width: 0, height: 0 }}>
        <defs>
          <linearGradient id="snakeGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="var(--color-origins-snake-0)" />
            <stop offset="20%" stopColor="var(--color-origins-snake-20)" />
            <stop offset="40%" stopColor="var(--color-origins-snake-40)" />
            <stop offset="60%" stopColor="var(--color-origins-snake-60)" />
            <stop offset="80%" stopColor="var(--color-origins-snake-80)" />
            <stop offset="100%" stopColor="var(--color-origins-snake-100)" />
          </linearGradient>

          <linearGradient id="marineGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="var(--color-origins-marine-start)" />
            <stop offset="50%" stopColor="var(--color-origins-marine-mid)" />
            <stop offset="100%" stopColor="var(--color-origins-marine-end)" />
          </linearGradient>

          <linearGradient id="landGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="var(--color-origins-land-start)" />
            <stop offset="50%" stopColor="var(--color-origins-land-mid)" />
            <stop offset="100%" stopColor="var(--color-origins-land-end)" />
          </linearGradient>

          <linearGradient id="dinoGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="var(--color-origins-dino-start)" />
            <stop offset="50%" stopColor="var(--color-origins-dino-mid)" />
            <stop offset="100%" stopColor="var(--color-origins-dino-end)" />
          </linearGradient>

          <linearGradient id="humanGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="var(--color-origins-human-start)" />
            <stop offset="50%" stopColor="var(--color-origins-human-mid)" />
            <stop offset="100%" stopColor="var(--color-origins-human-end)" />
          </linearGradient>

          <linearGradient id="evolutionGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="var(--color-origins-evolution-start)" />
            <stop offset="50%" stopColor="var(--color-origins-evolution-mid)" />
            <stop offset="100%" stopColor="var(--color-origins-evolution-end)" />
          </linearGradient>

          <linearGradient id="villageGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="var(--color-origins-village-start)" />
            <stop offset="50%" stopColor="var(--color-origins-village-mid)" />
            <stop offset="100%" stopColor="var(--color-origins-village-end)" />
          </linearGradient>

          <linearGradient id="civilizationGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="var(--color-origins-civilization-start)" />
            <stop offset="50%" stopColor="var(--color-origins-civilization-mid)" />
            <stop offset="100%" stopColor="var(--color-origins-civilization-end)" />
          </linearGradient>

          <linearGradient id="middleAgesGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="var(--color-origins-middleages-start)" />
            <stop offset="50%" stopColor="var(--color-origins-middleages-mid)" />
            <stop offset="100%" stopColor="var(--color-origins-middleages-end)" />
          </linearGradient>
        </defs>
      </svg>

      <Outlet />
    </div>
  )
}
