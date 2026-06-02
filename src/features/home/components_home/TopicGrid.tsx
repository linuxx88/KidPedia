import { ParallaxTopicCard } from '../ParallaxTopicCard'
import { getMedalIcon } from '../../../utils/quizMessages'
import { type Topic } from '../../../data/topics/types'
import { type SupportedLanguage, type Labels } from '../../../locales'
import { type TopicId, type EarnedBadge } from '../../../types/domain'
import styles from '../Home.module.css'

interface TopicGridProps {
  groupedTopics: Record<string, { name: string; topics: Topic[] }>
  expandedCats: Record<string, boolean>
  highlightedCat: string | null
  badges: EarnedBadge[]
  language: SupportedLanguage
  labels: Labels
  isUnlocked: (id: TopicId) => boolean
  handleTopicCardClick: (id: string) => void
  toggleExpand: (categoryKey: string) => void
}

export function TopicGrid({
  groupedTopics,
  expandedCats,
  highlightedCat,
  badges,
  language,
  labels,
  isUnlocked,
  handleTopicCardClick,
  toggleExpand,
}: TopicGridProps) {
  return (
    <>
      {Object.entries(groupedTopics).map(([categoryKey, group]) => {
        const { name: categoryName, topics: categoryTopics } = group
        const isExpanded = expandedCats[categoryKey]
        const visibleTopics = isExpanded ? categoryTopics : categoryTopics.slice(0, 3)
        const hasMore = categoryTopics.length > 3
        const catTitle = categoryName.split(' ').slice(0, -1).join(' ')

        return (
          <div
            key={categoryKey}
            id={`category-${categoryKey.toLowerCase()}`}
            className={`${styles.categorySection} ${
              highlightedCat === categoryKey ? styles.highlightedCategory : ''
            }`}
          >
            <div className={styles.topicsGrid}>
              {visibleTopics.map((topic, index) => {
                const badge = badges.find((b) => b.id === topic.id)
                return (
                  <ParallaxTopicCard
                    key={topic.id}
                    id={topic.id}
                    index={index}
                    title={topic.title[language]}
                    description={topic.shortDesc[language]}
                    icon={topic.icon}
                    categoryKey={topic.categoryKey}
                    exploreLabel={labels.discovery.explore('')}
                    isDiscovered={!!badge}
                    medalIcon={badge ? getMedalIcon(badge.medal) : undefined}
                    onClick={() => handleTopicCardClick(topic.id)}
                    categoryLabel={index === 0 ? catTitle : undefined}
                    isUnlocked={isUnlocked(topic.id as TopicId)}
                  />
                )
              })}
            </div>

            {hasMore && (
              <div className={styles.moreButtonWrapper}>
                <button
                  className={styles.moreButton}
                  onClick={() => toggleExpand(categoryKey)}
                >
                  {isExpanded ? labels.common.less : `${labels.common.more} ➔`}
                </button>
              </div>
            )}
          </div>
        )
      })}
    </>
  )
}
