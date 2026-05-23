import { useState, useEffect } from 'react'
import { useNavigate, Link, useSearchParams } from 'react-router-dom'

import { ParallaxTopicCard } from '../../components/Discovery/ParallaxTopicCard'
import { HeroCarousel } from '../../components/Discovery/HeroCarousel'
import { CategoryScrollSpy } from '../../components/Discovery/CategoryScrollSpy'

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
import AppIcon from '../../components/UI/AppIcon'

export interface HomePageProps {
  topicsData: TopicsData
}


export function HomePage({ topicsData }: HomePageProps) {
  const { gender, labels, language } = useSettingsStore()
  const { xp, badges } = usePlayerStore()
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()
  const { setSearch, groupedTopics, handleTopicClick } = topicsData

  const isUnlocked = useProgressionStore((state) => state.isUnlocked)
  const tickets = useProgressionStore((state) => state.getTickets())

  const handleTopicCardClick = (id: string) => {
    if (isUnlocked(id as TopicId)) {
      handleTopicClick(id)
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
      
      // 2. Scroller vers la section
      const scrollTimer = setTimeout(() => {
        const element = document.getElementById(`category-${categoryId.toLowerCase()}`)
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }
      }, 300)

      // 3. Nettoyer le highlight après 3 secondes
      const highlightTimer = setTimeout(() => setHighlightedCat(null), 3000)
      
      // 4. Nettoyer l'URL
      setSearchParams({}, { replace: true })
      
      return () => {
        clearTimeout(scrollTimer)
        clearTimeout(highlightTimer)
      }
    }
  }, [searchParams, groupedTopics, setSearchParams, setCategoryExpanded])

  const progressPercent = Math.round((badges.length / encyclopedia.length) * 100)
  const formattedXP = xp >= 1000 ? `${(xp / 1000).toFixed(1)}k` : xp

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
      <div className={styles.dashboardWrapper}>
        <Link
          to="/gallery"
          className={styles.pillDashboard}
          aria-label={`Voir mes médailles. Progression : ${progressPercent} pour cent. Total XP : ${xp}`}
        >
          <div className={styles.dashItem}>
            <span className={styles.dashIcon}>🏆</span>
            <span className={styles.dashNumber} data-testid="medal-count">{badges.length}</span>
            <span className={styles.dashLabel}>{labels.home.medals}</span>
          </div>

          <div className={styles.dashSeparator}></div>

          <div className={styles.dashItem}>
            <span className={styles.dashIcon}>🎫</span>
            <span className={styles.dashNumber} data-testid="ticket-count">{tickets}</span>
            <span className={styles.dashLabel}>{labels.home.tickets}</span>
          </div>

          <div className={styles.dashSeparator}></div>

          <div className={styles.dashItem}>
            <span className={`${styles.dashIcon} text-amber-400`}>⚡</span>
            <span className={styles.dashNumber} data-testid="xp-count">{formattedXP}</span>
            <span className={styles.dashLabel}>XP</span>
          </div>

          <div className={styles.dashSeparator}></div>

          <div className={styles.progressContainer}>
            <span className={styles.dashNumber}>{progressPercent}%</span>
            <div className={styles.progressBarBg}>
              <div
                className={styles.progressBarFill}
                style={{ width: `${progressPercent}%` }}
              ></div>
            </div>
          </div>
        </Link>
      </div>

      {/* Discovery Hub */}
      <section className={styles.discoveryHub}>
        <div className={styles.hubGrid}>
          {[
            {
              id: 'lifecircle',
              icon: <AppIcon name="leaf" size="large" />,
              title: labels.discovery.circleTitle,
              desc: labels.discovery.circleDesc,
              color: '#10b981',
              path: '/lifecircle',
            },
            {
              id: 'origins',
              icon: <AppIcon name="hourglass" size="large" />,
              title: labels.discovery.originsTitle,
              desc: labels.discovery.originsDesc,
              color: '#6366f1',
              path: '/origins',
            },
            {
              id: 'map',
              icon: <AppIcon name="compass" size="large" />,
              title: labels.discovery.mapTitle,
              desc: labels.discovery.mapDesc,
              color: '#f97316',
              path: '/map',
            },
            {
              id: 'safari',
              icon: <AppIcon name="paw" size="large" />,
              title: labels.discovery.safariTitle,
              desc: labels.discovery.safariDesc,
              color: '#f59e0b',
              path: '/safari',
            },
            {
              id: 'refuge',
              icon: <AppIcon name="paw" size="large" />,
              title: labels.discovery.refugeTitle,
              desc: labels.discovery.refugeDesc,
              color: '#ec4899',
              path: '/refuge',
            },

          ].map((hub) => (
            <button
              key={hub.id}
              className={styles.hubCard}
              onClick={() => navigate(hub.path)}
              style={{ borderColor: hub.color } as React.CSSProperties}
            >
              <div
                className={styles.hubIconBox}
                style={{ backgroundColor: `${hub.color}20`, color: hub.color }}
              >
                {hub.icon}
              </div>
              <div>
                <h3 className={styles.hubTitle}>{hub.title}</h3>
                <p className={styles.hubDesc}>{hub.desc}</p>
              </div>
            </button>
          ))}
        </div>
      </section>

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
    </div>
  )
}
