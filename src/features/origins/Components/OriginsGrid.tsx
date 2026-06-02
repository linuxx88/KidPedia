import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSettingsStore } from '../../../store/useSettingsStore'
import { type HistoryNode } from '../../../data/originData'
import { ORIGINS_SVG_CONFIG } from '../../../constants/geometry'
import styles from '../Origins.module.css'
import { useProgressionStore } from '../../../store/useProgressionStore'
import { type TopicId } from '../../../types/domain'
import { AppOverlay } from '../../../components/UI/AppOverlay'
import { AppButton } from '../../../components/UI/AppButton'
import { StorytellerButton } from '../../../components/UI/StorytellerButton'
import { useStoryteller } from '../../../hooks/useStoryteller'

interface OriginsGridProps {
  nodes: HistoryNode[]
  getStroke: () => string
}

export const OriginsGrid: React.FC<OriginsGridProps> = ({ nodes, getStroke }) => {
  const navigate = useNavigate()
  const { labels, language } = useSettingsStore()
  const [activeId, setActiveId] = useState<string | null>(null)
  const [lockedTopic, setLockedTopic] = useState<HistoryNode | null>(null)

  const isUnlocked = useProgressionStore((state) => state.isUnlocked)
  const { speak, stopStory } = useStoryteller()

  const handleNodeClick = (node: HistoryNode) => {
    const isActive = activeId === node.id;
    
    if (isActive) {
      if (node.subNodes) {
        navigate(`/origins/${node.id}`)
        setActiveId(null)
      } else if (node.topicId) {
        if (isUnlocked(node.topicId as TopicId)) {
          navigate(`/topic/${node.topicId}`, { state: { fromOrigins: true } })
        } else {
          setLockedTopic(node)
        }
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
                          {node.subNodes 
                            ? (language === 'fr' ? "Explorer →" : "Explore →") 
                            : (language === 'fr' ? "Découvrir 📖" : "Discover 📖")}
                        </button>
                      )}
                   </div>
                 )}
              </div>
            </div>
          )
        })}
      </div>

      <AppOverlay
        isOpen={!!lockedTopic}
        onClose={() => {
          stopStory()
          setLockedTopic(null)
        }}
        closeLabel={labels.common.close}
        title={lockedTopic?.title[language]}
        data-testid="locked-topic-popup"
      >
        {lockedTopic && (
          <div className={styles.popupContent}>
            <StorytellerButton 
              onClick={() => speak(`${labels.discovery.owlWhispers}. ${labels.discovery.lockedTopicMessage(lockedTopic.title[language])}`)}
            />
            <h3 className={styles.owlTitle}>
              {labels.discovery.owlWhispers}
            </h3>
            <p className={styles.popupText}>
              {labels.discovery.lockedTopicMessage(lockedTopic.title[language])}
            </p>
            <AppButton 
              onClick={() => {
                stopStory()
                setLockedTopic(null)
              }}
              className={styles.explorerBtnMap}
            >
              {language === 'fr' ? 'Compris ! 🚀' : 'Got it! 🚀'}
            </AppButton>
          </div>
        )}
      </AppOverlay>
    </div>
  )
}
