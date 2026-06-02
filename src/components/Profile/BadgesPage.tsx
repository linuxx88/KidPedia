import { useNavigate } from 'react-router-dom'
import { useState, useMemo } from 'react'
import { encyclopedia } from '../../data/topics'
import { getMedalIcon } from '../../utils/quizMessages'
import { useSettingsStore } from '../../store/useSettingsStore'
import { useProgressionStore } from '../../store/useProgressionStore'
import { useAudioFeedback } from '../../hooks/useAudioFeedback'
import { useBadgeProgress } from '../../hooks/useBadgeProgress'
import { AppButton } from '../UI/AppButton'
import { PageHeader } from '../Layout/PageHeader'
import { GiftButton } from './Elements/GiftButton'
import { BadgeCard } from './Elements/BadgeCard'
import { BadgeFilters } from './Elements/BadgeFilters'
import { BadgesHeader } from './Elements/BadgesHeader'
import { ExploitsSection } from './Elements/ExploitsSection'
import styles from './BadgesPage.module.css'

interface BadgesPageProps {
  onBack: () => void
}

export function BadgesPage({ onBack }: BadgesPageProps) {
  const { language, labels } = useSettingsStore()
  const { playSound } = useAudioFeedback()
  
  const clearBadges = useProgressionStore(state => state.clearBadges)
  const navigate = useNavigate()
  
  const [activeCategory, setActiveCategory] = useState('all')
  const [isResetting, setIsResetting] = useState(false)

  const { badges, earnedCount } = useBadgeProgress()

  const handleGiftsClick = () => {
    playSound('woosh')
    navigate('/gifts')
  }

  const filteredEncyclopedia = useMemo(() => {
    if (activeCategory === 'all') return encyclopedia
    if (activeCategory === 'exploits') return []
    return encyclopedia.filter(topic => topic.categoryKey.toLowerCase() === activeCategory.toLowerCase())
  }, [activeCategory])

  const showExploits = activeCategory === 'all' || activeCategory === 'exploits'

  return (
    <div className={styles.badgesPage}>
      <PageHeader 
        title={labels.badges.title}
        icon="🏆"
        onBack={onBack}
        rightElement={<GiftButton onClick={handleGiftsClick} />}
      />

      <BadgesHeader onBack={onBack} />

      <BadgeFilters
        activeCategory={activeCategory}
        onCategoryChange={setActiveCategory}
        language={language}
      />

      {filteredEncyclopedia.length > 0 && (
        <div className={styles.badgesGrid}>
          {filteredEncyclopedia.map((topic) => {
            const earned = badges.find((b) => b.id === topic.id)
            
            const handleLockedClick = () => {
              playSound('pop')
              const category = topic.categoryKey.toLowerCase()
              navigate(`/?category=${category}`)
            }

            const handleEarnedClick = () => {
              playSound('click')
              navigate(`/topic/${topic.id}`)
            }

            const titleStr = topic.title[language]
            
            const animationDelay = !earned 
              ? `${((topic.id.length * 7) % 200) / 100}s` 
              : '0s'

            return (
              <BadgeCard
                key={topic.id}
                icon={topic.icon}
                title={titleStr}
                earned={!!earned}
                medalOverlay={earned ? getMedalIcon(earned.medal) : undefined}
                onClick={() => earned ? handleEarnedClick() : handleLockedClick()}
                category={topic.categoryKey.toLowerCase()}
                animationDelay={animationDelay}
                ariaLabel={
                  earned
                    ? labels.badges.earnedAria(titleStr)
                    : labels.badges.lockedAria(titleStr)
                }
              />
            )
          })}
        </div>
      )}

      {showExploits && <ExploitsSection />}

      {earnedCount > 0 && (
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '3rem' }}>
          <AppButton 
            variant="outline" 
            onClick={() => {
              if (isResetting) return
              setIsResetting(true)
              try {
                if (window.confirm(labels.badges.confirmReset)) {
                  clearBadges()
                }
              } finally {
                setIsResetting(false)
              }
            }} 
            disabled={isResetting}
            icon="🗑️" 
          >
            {labels.badges.reset}
          </AppButton>
        </div>
      )}
    </div>
  )
}
