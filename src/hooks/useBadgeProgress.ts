import { useState, useEffect, useMemo } from 'react'
import { encyclopedia } from '../data/topics'
import { RANKS } from '../data/rewards'
import { usePlayerStore } from '../store/usePlayerStore'
import { useProgressionStore } from '../store/useProgressionStore'

export function useBadgeProgress() {
  const { xp, badges } = usePlayerStore()

  const activeProfileId = useProgressionStore(state => state.activeProfileId)
  const currentRankId = useProgressionStore(state => {
    if (!activeProfileId) return 'apprentice'
    return state.progressions[activeProfileId]?.currentRankId || 'apprentice'
  })

  const [progressWidth, setProgressWidth] = useState(0)

  const totalTopics = encyclopedia.length
  const earnedCount = badges.length

  const goldCount = useMemo(() => badges.filter((b) => b.medal === 'gold').length, [badges])
  const silverCount = useMemo(() => badges.filter((b) => b.medal === 'silver').length, [badges])
  const bronzeCount = useMemo(() => badges.filter((b) => b.medal === 'bronze').length, [badges])

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

  return {
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
  }
}
