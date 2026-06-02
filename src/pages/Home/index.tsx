import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'

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
import styles from './Home.module.css'

import { SearchBar } from './components/SearchBar'
import { TopicGrid } from './components/TopicGrid'

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
        <TopicGrid
          groupedTopics={groupedTopics}
          expandedCats={expandedCats}
          highlightedCat={highlightedCat}
          badges={badges}
          language={language}
          labels={labels}
          isUnlocked={isUnlocked}
          handleTopicCardClick={handleTopicCardClick}
          toggleExpand={toggleExpand}
        />
      ) : (
        <SearchBar
          setSearch={setSearch}
          labels={labels}
        />
      )}

      <LockedTopicOverlay
        lockedTopic={lockedTopic}
        onClose={() => setLockedTopic(null)}
      />
    </div>
  )
}
