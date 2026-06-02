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
import styles from './BadgesPage.module.css'

interface BadgesPageProps {
  onBack: () => void
}

export function BadgesPage({ onBack }: BadgesPageProps) {
  const { gender, language, labels } = useSettingsStore()
  const { playSound } = useAudioFeedback()
  
  const clearBadges = useProgressionStore(state => state.clearBadges)
  const navigate = useNavigate()
  
  const [activeCategory, setActiveCategory] = useState('all')

  const {
    xp,
    badges,
    totalTopics,
    earnedCount,
    goldCount,
    silverCount,
    bronzeCount,
    currentRank,
    progressWidth,
    completionPercentage,
  } = useBadgeProgress()

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

      <header className={styles.badgesHeader}>
        <div className={styles.medalsSummary}>
          <div className={`${styles.medalStat} ${styles.gold}`}>
            <span>🥇</span> {goldCount}
          </div>
          <div className={`${styles.medalStat} ${styles.silver}`}>
            <span>🥈</span> {silverCount}
          </div>
          <div className={`${styles.medalStat} ${styles.bronze}`}>
            <span>🥉</span> {bronzeCount}
          </div>
        </div>

        <div className={styles.statsBox}>
          <div className={styles.rankBadge}>
            <span className={styles.rankIcon}>{currentRank.icon}</span>
            <div className={styles.rankText}>
               <p className={styles.rankTitle}>
                {labels.badges.rank} {currentRank.title[gender]}
              </p>
              <p className={styles.rankDesc}>{currentRank.description[language]}</p>
            </div>
          </div>
          
          <div className={styles.xpInfo}>
             <span className={styles.xpTotal}>{xp} XP</span>
          </div>

          <div className={styles.progressBarContainer}>
            <div className={styles.progressBarFill} style={{ width: `${progressWidth}%` }}>
              {completionPercentage > 10 && (
                <span className={styles.progressPercentage}>{completionPercentage}%</span>
              )}
            </div>
          </div>
          <p className={styles.progressText}>
            {earnedCount === 0 
              ? labels.badges.onboarding
              : labels.badges.progress(earnedCount, totalTopics)
            }
          </p>
          {earnedCount === 0 && (
            <div className={styles.onboardingCTA}>
              <AppButton onClick={onBack} variant="primary" icon="🚀">
                {labels.badges.start}
              </AppButton>
            </div>
          )}
        </div>
      </header>

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

      {showExploits && (
        <>
          <h3 className={styles.sectionTitle}>
            {language === 'fr' ? '🌟 Mes Exploits d\'Explorateur' : '🌟 My Explorer Exploits'}
          </h3>
          <div className={styles.badgesGrid}>
            {/* Badge Super Écureuil */}
            {(() => {
              const earned = badges.find((b) => b.id === 'super-squirrel')
              const titleStr = language === 'fr' ? 'Super Écureuil' : 'Super Squirrel'
              const descStr = language === 'fr' ? 'Avoir accumulé 50 tickets 🎫' : 'Accumulated 50 tickets 🎫'
              
              return (
                <BadgeCard
                  key="super-squirrel"
                  icon="🐿️"
                  title={titleStr}
                  description={descStr}
                  earned={!!earned}
                  medalOverlay="🥇"
                  onClick={() => playSound(earned ? 'click' : 'pop')}
                  category="exploits"
                  ariaLabel={
                    earned
                      ? labels.badges.earnedAria(titleStr)
                      : labels.badges.lockedAria(titleStr)
                  }
                />
              )
            })()}

            {/* Badge Ami des bêtes */}
            {(() => {
              const earned = badges.find((b) => b.id === 'animal-friend')
              const titleStr = language === 'fr' ? 'Ami des bêtes' : 'Animal Friend'
              const descStr = language === 'fr' ? 'Avoir débloqué un compagnon 🦊' : 'Unlocked a companion animal 🦊'
              
              return (
                <BadgeCard
                  key="animal-friend"
                  icon="🦊"
                  title={titleStr}
                  description={descStr}
                  earned={!!earned}
                  medalOverlay="🥇"
                  onClick={() => playSound(earned ? 'click' : 'pop')}
                  category="exploits"
                  ariaLabel={
                    earned
                      ? labels.badges.earnedAria(titleStr)
                      : labels.badges.lockedAria(titleStr)
                  }
                />
              )
            })()}

            {/* Badge Rat de bibliothèque */}
            {(() => {
              const earned = badges.find((b) => b.id === 'library-rat')
              const titleStr = language === 'fr' ? 'Rat de bibliothèque' : 'Bookworm'
              const descStr = language === 'fr' ? 'Avoir ouvert 10 fiches 📚' : 'Opened 10 encyclopedia pages 📚'
              
              return (
                <BadgeCard
                  key="library-rat"
                  icon="📚"
                  title={titleStr}
                  description={descStr}
                  earned={!!earned}
                  medalOverlay="🥇"
                  onClick={() => playSound(earned ? 'click' : 'pop')}
                  category="exploits"
                  ariaLabel={
                    earned
                      ? labels.badges.earnedAria(titleStr)
                      : labels.badges.lockedAria(titleStr)
                  }
                />
              )
            })()}

            {/* Badge Persévérant */}
            {(() => {
              const earned = badges.find((b) => b.id === 'perseverant')
              const titleStr = language === 'fr' ? 'Persévérant' : 'Persistent'
              const descStr = language === 'fr' ? 'Transformer du bronze/argent en or 🦾' : 'Upgraded bronze/silver to gold 🦾'
              
              return (
                <BadgeCard
                  key="perseverant"
                  icon="🦾"
                  title={titleStr}
                  description={descStr}
                  earned={!!earned}
                  medalOverlay="🥇"
                  onClick={() => playSound(earned ? 'click' : 'pop')}
                  category="exploits"
                  ariaLabel={
                    earned
                      ? labels.badges.earnedAria(titleStr)
                      : labels.badges.lockedAria(titleStr)
                  }
                />
              )
            })()}
          </div>
        </>
      )}

      {earnedCount > 0 && (
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '3rem' }}>
          <AppButton 
            variant="outline" 
            onClick={() => {
              if (window.confirm(labels.badges.confirmReset)) {
                clearBadges()
              }
            }} 
            icon="🗑️" 
          >
            {labels.badges.reset}
          </AppButton>
        </div>
      )}
    </div>
  )
}
