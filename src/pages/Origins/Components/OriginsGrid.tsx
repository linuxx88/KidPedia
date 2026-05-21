import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSettingsStore } from '../../../store/useSettingsStore'
import { type HistoryNode } from '../../../data/originData'
import { ORIGINS_SVG_CONFIG } from '../../../constants/geometry'
import styles from '../Origins.module.css'

interface OriginsGridProps {
  nodes: HistoryNode[]
  getStroke: () => string
}

export const OriginsGrid: React.FC<OriginsGridProps> = ({ nodes, getStroke }) => {
  const navigate = useNavigate()
  const { language } = useSettingsStore()
  const [activeId, setActiveId] = useState<string | null>(null)

  const handleNodeClick = (node: HistoryNode) => {
    const isActive = activeId === node.id;
    
    if (isActive) {
      if (node.subNodes) {
        navigate(`/origins/${node.id}`)
        setActiveId(null)
      } else if (node.topicId) {
        navigate(`/topic/${node.topicId}`)
      } else {
        setActiveId(null)
      }
    } else {
      setActiveId(node.id)
    }
  }

  return (
    <div className={styles.timeline}>
      <svg className={styles.snakeSvg} viewBox={ORIGINS_SVG_CONFIG.VIEWBOX} preserveAspectRatio="none">
        <path 
          className={styles.snakePath}
          d={ORIGINS_SVG_CONFIG.SNAKE_PATH} 
          stroke={getStroke()}
          pathLength={ORIGINS_SVG_CONFIG.PATH_LENGTH}
        />
      </svg>

      <div className={styles.grid}>
        {nodes.map((node, index) => {
          const row = Math.floor(index / 3)
          const isEvenRow = row % 2 === 0
          const col = index % 3
          const displayCol = isEvenRow ? col : 2 - col
          
          const isActive = activeId === node.id;
          const classes = [styles.nodeWrapper];
          if (isActive) classes.push(styles.active);

          return (
            <div 
              key={node.id} 
              className={classes.join(' ')}
              style={{ 
                gridRow: row + 1, 
                gridColumn: displayCol + 1, 
                '--node-color': node.color,
                '--i': index 
              } as React.CSSProperties}
              onClick={() => handleNodeClick(node)}
              role="button"
              tabIndex={0}
            >
              <div className={styles.bubble} style={{ borderColor: node.color }}>
                <span className={styles.icon}>{node.icon}</span>
              </div>
              
              <div className={styles.card}>
                 <span className={styles.pageTag}>Page {node.page}</span>
                 <h3>{node.title[language]}</h3>
                 {isActive && (
                   <div className={styles.description}>
                     <p>{node.description[language]}</p>
                     {(node.subNodes || node.topicId) && (
                       <button className={styles.exploreBtn}>
                         {node.subNodes ? "Explorer →" : "Faire le quiz ! 🧩"}
                       </button>
                     )}
                   </div>
                 )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
