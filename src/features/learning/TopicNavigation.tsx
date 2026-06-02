import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useStoryteller } from '../../hooks/useStoryteller'
import { useSettingsStore } from '../../store/useSettingsStore'
import BackButton from '../../components/UI/BackButton'
import { StorytellerButton } from '../../components/UI/StorytellerButton'
import styles from './TopicNavigation.module.css'

interface TopicNavigationProps {
  readonly onBack: () => void
}

export const TopicNavigation: React.FC<TopicNavigationProps> = ({ onBack }) => {
  const navigate = useNavigate()
  const { stopStory } = useStoryteller()
  const { labels } = useSettingsStore()

  return (
    <div className={styles.detailNav}>
      <BackButton onClick={onBack} />

      <div className={styles.navActions}>
        <button
          onClick={() => {
            stopStory()
            navigate('/dictionary')
          }}
          className={styles.dicoShortcutBtn}
          title={labels.dictionary.navBtn}
          aria-label={labels.dictionary.navBtn}
        >
          📖
        </button>
        {/* Le Hibou StorytellerButton principal de la fiche */}
        <StorytellerButton />
      </div>
    </div>
  )
}
