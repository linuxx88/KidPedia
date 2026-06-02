import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'

import { ParallaxTopicCard } from '../../components/Discovery/ParallaxTopicCard'
import { HeroCarousel } from '../../components/Discovery/HeroCarousel'
import { CategoryScrollSpy } from '../../components/Discovery/CategoryScrollSpy'
import { PillDashboard } from '../../components/Dashboard/PillDashboard'
import { DiscoveryHub } from '../../components/Discovery/DiscoveryHub/DiscoveryHub'
import { LockedTopicOverlay } from '../../components/Discovery/LockedTopicOverlay'

import { getGreeting } from '../../utils/helpers'
import { encyclopedia } from '../../data/topics'
import { heroAssets } from '../../assets/hero'
import { useSettingsStore } from '../../store/useSettingsStore'
import { usePlayerStore } from '../../store/usePlayerStore'
import { useDiscoveryStore } from '../../store/useDiscoveryStore'
import { useProgressionStore } from '../../store/useProgressionStore'
import { useStepNavigation } from '../../hooks/useStepNavigation'
import { useCategorySpy } from '../../hooks/useCategorySpy'
import { type Topic } from '../../data/topics/types'
import { type TopicId, type TopicsData } from '../../types/domain'
import { getMedalIcon } from '../../utils/quizMessages'
import styles from './Home.module.css'



export interface HomePageProps {
  topicsData: TopicsData
}


export function HomePage({ topicsData }: HomePageProps) {
  const { gender, labels, language } = useSettingsStore()
  const { badges } = usePlayerStore()
  const [searchParams, setSearchParams] = useSearchParams()
  const { setSearch, groupedTopics, handleTopicClick } = topicsData

  const isUnlocked = useProgressionStore((state) => state.isUnlocked)

  const [lockedTopic, setLockedTopic] = useState<Topic | null>(null)

  const handleTopicCardClick = (id: string) => {
    if (isUnlocked(id as TopicId)) {
      handleTopicClick(id)
    } else {
      const topicObj = encyclopedia.find((t) => t.id === id)
      if (topicObj) {
        setLockedTopic(topicObj)
      }
    }
  }

  // SÉLECTEURS DÉCOUVERTE (ZUSTAND)
  const storedActiveCategory = useDiscoveryStore(state => state.activeCategory)
  const setActiveCategory = useDiscoveryStore(state => state.setActiveCategory)
  const expandedCats = useDiscoveryStore(state => state.expandedCategories)
  const toggleExpand = useDiscoveryStore(state => state.toggleCategoryExpand)
  const setCategoryExpanded = useDiscoveryStore(state => state.setCategoryExpanded)

  const [highlightedCat, setHighlightedCat] = useState<string | null>(null)

  // LOGIQUE DE DEEP LINKING (Lien Magique)
  useEffect(() => {
    const categoryId = searchParams.get('category')
    if (categoryId && groupedTopics[categoryId]) {
      // On utilise requestAnimationFrame pour différer la mise à jour
      // et éviter les rendus en cascade immédiats dans l'effet
      requestAnimationFrame(() => {
        setCategoryExpanded(categoryId, true)
        setHighlightedCat(categoryId)
      })
      
      let scrollTimer: ReturnType<typeof setTimeout> | undefined;
      
      // 2. Scroller vers la section une fois le layout stabilisé (double frame + timeout de sécurité)
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          scrollTimer = setTimeout(() => {
            const element = document.getElementById(`category-${categoryId.toLowerCase()}`)
            if (element && typeof element.scrollIntoView === 'function') {
              element.scrollIntoView({ behavior: 'smooth', block: 'start' })
            }
          }, 150)
        })
      })

      // 3. Nettoyer le highlight après 3 secondes
      const highlightTimer = setTimeout(() => setHighlightedCat(null), 3000)
      
      // 4. Nettoyer l'URL après 1 seconde pour éviter d'interrompre le défilement fluide
      const urlTimer = setTimeout(() => {
        setSearchParams({}, { replace: true })
      }, 1000)
      
      return () => {
        if (scrollTimer) clearTimeout(scrollTimer)
        clearTimeout(highlightTimer)
        clearTimeout(urlTimer)
      }
    }
  }, [searchParams, groupedTopics, setSearchParams, setCategoryExpanded])

  const categories = Object.entries(groupedTopics).map(([key, group]) => ({
    key,
    name: group.name,
  }))

  // LOGIQUE HERO CAROUSEL
  const images = heroAssets[gender]
  const { activeStep, previousStep } = useStepNavigation({
    totalSteps: images.length,
    loop: true,
    autoPlayInterval: 6000
  })

  // LOGIQUE SCROLL SPY (DÉLÉGUÉE AU STORE)
  const { activeCategory, scrollToCategory } = useCategorySpy(
    categories, 
    storedActiveCategory, 
    setActiveCategory
  )

  return (
    <div className={styles.homeContainer}>
      {/* Category Scroll Spy (Sidebar Navigation) */}
      {categories.length > 0 && (
        <CategoryScrollSpy 
          categories={categories} 
          activeCategory={activeCategory}
          onCategoryClick={scrollToCategory}
        />
      )}

      {/* Hero Section - Immersion & Bienvenue */}
      <HeroCarousel 
        images={images}
        activeStep={activeStep}
        previousStep={previousStep}
      >
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>
            {labels.home.greeting(getGreeting())}
          </h1>
          <p className={styles.heroSubtitle}>
            {labels.home.surpriseDay}
          </p>
        </div>
      </HeroCarousel>

      {/* Pill Dashboard - Suivi personnel */}
      <PillDashboard />

      {/* Discovery Hub */}
      <DiscoveryHub />

      {/* Topics by Categories */}
      {categories.length > 0 ? (
        Object.entries(groupedTopics).map(([categoryKey, group]) => {
          const { name: categoryName, topics: categoryTopics } = group
          const isExpanded = expandedCats[categoryKey]
          const visibleTopics = isExpanded ? categoryTopics : categoryTopics.slice(0, 3)
          const hasMore = categoryTopics.length > 3
          const catTitle = categoryName.split(' ').slice(0, -1).join(' ')

          return (
            <div
              key={categoryKey}
              id={`category-${categoryKey.toLowerCase()}`}
              className={`${styles.categorySection} ${highlightedCat === categoryKey ? styles.highlightedCategory : ''}`}
            >
              <div className={styles.topicsGrid}>
                {visibleTopics.map((topic: Topic, index: number) => {
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
                      isUnlocked={isUnlocked(topic.id)}
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
        })
      ) : (
        <div className={styles.noResults}>
          <span className={styles.noResultsIcon}>🔍</span>
          <h3 className={styles.noResultsTitle}>{labels.home.noResultsTitle}</h3>
          <button
            className={styles.clearButton}
            onClick={() => setSearch('')}
          >
            {labels.home.clearSearch}
          </button>

          <div className={styles.suggestionsContainer}>
            <span className={styles.suggestionsTitle}>{labels.home.trySearching}</span>
            <div className={styles.suggestionsList}>
              {labels.home.popularSuggestions.map((suggestion) => (
                <button
                  key={suggestion.query}
                  className={styles.suggestionPill}
                  onClick={() => setSearch(suggestion.query)}
                  aria-label={`${labels.home.trySearching} ${suggestion.label}`}
                >
                  {suggestion.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      <LockedTopicOverlay
        lockedTopic={lockedTopic}
        onClose={() => setLockedTopic(null)}
      />
    </div>
  )
}
