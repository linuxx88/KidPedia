import { useSettingsStore } from '../../../store/useSettingsStore'
import { useBadgeProgress } from '../../../hooks/useBadgeProgress'
import { AppButton } from '../../UI/AppButton'
import styles from '../BadgesPage.module.css'

interface BadgesHeaderProps {
  onBack: () => void
}

export function BadgesHeader({ onBack }: BadgesHeaderProps) {
  const { gender, language, labels } = useSettingsStore()
  
  const {
    xp,
    totalTopics,
    earnedCount,
    goldCount,
    silverCount,
    bronzeCount,
    currentRank,
    progressWidth,
    completionPercentage,
  } = useBadgeProgress()

  return (
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
  )
}
