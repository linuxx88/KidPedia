import { useNavigate } from 'react-router-dom'
import { useState, useEffect, useMemo } from 'react'
import { encyclopedia } from '../../data/topics'
import { RANKS } from '../../data/rewards'
import { getMedalIcon } from '../../utils/quizMessages'
import { useSettingsStore } from '../../store/useSettingsStore'
import { useProgressionStore } from '../../store/useProgressionStore'
import { usePlayerStore } from '../../store/usePlayerStore'
import { useAudioFeedback } from '../../hooks/useAudioFeedback'
import { AppButton } from '../UI/AppButton'
import { PageHeader } from '../Layout/PageHeader'
import { GiftButton } from './Elements/GiftButton'
import styles from './BadgesPage.module.css'

interface BadgesPageProps {
  onBack: () => void
}

export function BadgesPage({ onBack }: BadgesPageProps) {
  const { gender, language, labels } = useSettingsStore()
  const { xp, badges } = usePlayerStore()
  const { playSound } = useAudioFeedback()
  
  // Correction des sélecteurs pour garantir des références stables
  const activeProfileId = useProgressionStore(state => state.activeProfileId)
  const currentRankId = useProgressionStore(state => {
    if (!activeProfileId) return 'apprentice'
    return state.progressions[activeProfileId]?.currentRankId || 'apprentice'
  })
  const clearBadges = useProgressionStore(state => state.clearBadges)
  
  const navigate = useNavigate()
  const [progressWidth, setProgressWidth] = useState(0)

  const handleGiftsClick = () => {
    playSound('woosh')
    navigate('/gifts')
  }

  const totalTopics = encyclopedia.length
  const earnedCount = badges.length

  const goldCount = badges.filter((b) => b.medal === 'gold').length
  const silverCount = badges.filter((b) => b.medal === 'silver').length
  const bronzeCount = badges.filter((b) => b.medal === 'bronze').length

  const currentRank = useMemo(() => 
    RANKS.find(r => r.id === currentRankId) || RANKS[0]
  , [currentRankId])

  useEffect(() => {
    const timer = setTimeout(() => {
      const percentage = totalTopics > 0 ? (earnedCount / totalTopics) * 100 : 0
      setProgressWidth(percentage)
    }, 150)
    return () => clearTimeout(timer)
  }, [earnedCount, totalTopics])

  const completionPercentage = Math.round((earnedCount / totalTopics) * 100)

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

      <div className={styles.badgesGrid}>
        {encyclopedia.map((topic) => {
          const earned = badges.find((b) => b.id === topic.id)
          
          const handleLockedClick = () => {
            playSound('pop')
            // Logique de redirection vers la catégorie pour débloquer le badge
            const category = topic.categoryKey.toLowerCase()
            // On pourrait imaginer un toast ou un message audio ici plus tard
            navigate(`/?category=${category}`)
          }

          const handleEarnedClick = () => {
            playSound('click')
            navigate(`/topic/${topic.id}`)
          }

          const titleStr = topic.title[language];
          
          // Calcul d'un délai pseudo-aléatoire mais stable basé sur l'ID pour la pureté du rendu
          const animationDelay = !earned 
            ? `${((topic.id.length * 7) % 200) / 100}s` 
            : '0s';

          return (
            <button
              key={topic.id}
              className={`${styles.badgeItem} ${earned ? styles.earned : styles.locked}`}
              onClick={() => earned ? handleEarnedClick() : handleLockedClick()}
              data-category={topic.categoryKey.toLowerCase()}
              style={!earned ? { animationDelay } as React.CSSProperties : {}}
              aria-label={
                earned
                  ? labels.badges.earnedAria(titleStr)
                  : labels.badges.lockedAria(titleStr)
              }
            >
              <div className={styles.badgeIconWrapper}>
                <span className={styles.badgeIcon}>{topic.icon}</span>
                {earned && (
                  <span className={styles.medalOverlay}>{getMedalIcon(earned.medal)}</span>
                )}
              </div>
              <p className={styles.badgeName}>
                {titleStr}
              </p>
            </button>
          )
        })}
      </div>

      {earnedCount > 0 && (
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '3rem' }}>
          <AppButton 
            variant="outline" 
            onClick={() => {
              if (window.confirm(labels.badges.confirmReset)) {
                clearBadges();
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
