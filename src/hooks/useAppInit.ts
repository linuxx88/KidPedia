import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { encyclopedia } from '../data/topics'
import { useSettingsStore } from '../store/useSettingsStore'
import { useProfileStore } from '../store/useProfileStore'
import { useDiscoveryStore } from '../store/useDiscoveryStore'

export function useAppInit() {
  const navigate = useNavigate()
  
  const [showParentalGate, setShowParentalGate] = useState(false)
  const [pendingRoute, setPendingRoute] = useState<string | null>(null)
  const [hydrated, setHydrated] = useState(false)

  // Hydratation du store
  useEffect(() => {
    const checkHydration = () => {
      if (useSettingsStore.persist?.hasHydrated()) {
        setHydrated(true)
        return true
      }
      return false
    }

    if (!checkHydration()) {
      const interval = setInterval(() => {
        if (checkHydration()) {
          clearInterval(interval)
        }
      }, 5)
      return () => clearInterval(interval)
    }
  }, [])

  const labels = useSettingsStore(state => state.labels)
  const isDarkMode = useSettingsStore(state => state.isDarkMode)
  const toggleTheme = useSettingsStore(state => state.toggleTheme)
  const gender = useSettingsStore(state => state.gender)
  const language = useSettingsStore(state => state.language)
  const toggleGender = useSettingsStore(state => state.toggleGender)

  const activeProfileId = useProfileStore(state => state.activeProfileId)
  const isFirstVisit = useProfileStore(state => state.isFirstVisit)
  const updateProfile = useProfileStore(state => state.updateProfile)
  const profiles = useProfileStore(state => state.profiles)
  const addProfile = useProfileStore(state => state.addProfile)
  const selectProfile = useProfileStore(state => state.selectProfile)
  const deleteProfile = useProfileStore(state => state.deleteProfile)

  const search = useDiscoveryStore(state => state.search)
  const setSearch = useDiscoveryStore(state => state.setSearch)
  const resetSearch = useDiscoveryStore(state => state.resetSearch)
  const groupedTopics = useDiscoveryStore(state => state.groupedTopics)
  const updateDiscoveryGroups = useDiscoveryStore(state => state.updateGroups)

  const handleTopicClick = (id: string) => {
    navigate(`/topic/${id}`)
  }

  const handleGoHome = (callback?: () => void) => {
    navigate('/')
    if (callback) callback()
  }

  const handleSurprise = () => {
    const rand = encyclopedia[Math.floor(Math.random() * encyclopedia.length)]
    handleTopicClick(rand.id)
  }

  const topicsData = {
    search,
    setSearch,
    groupedTopics,
    handleTopicClick,
    handleGoHome,
    handleSurprise,
  }

  // Synchronisation des groupes de découverte lors du changement de langue
  useEffect(() => {
    updateDiscoveryGroups()
  }, [language, updateDiscoveryGroups])

  // Appliquer le genre à la racine pour les styles CSS
  useEffect(() => {
    document.documentElement.setAttribute('data-gender', gender)
  }, [gender])

  // Activer les transitions de thème après le chargement initial pour éviter un flash
  useEffect(() => {
    const timer = setTimeout(() => {
      document.documentElement.classList.add('theme-ready')
    }, 150)
    return () => clearTimeout(timer)
  }, [])

  const handleToggleTheme = () => {
    toggleTheme((newTheme) => {
      if (activeProfileId) updateProfile(activeProfileId, { theme: newTheme })
    })
  }

  const handleToggleGender = () => {
    toggleGender((newGender) => {
      if (activeProfileId) updateProfile(activeProfileId, { gender: newGender })
    })
  }

  const openParentsZone = () => {
    setPendingRoute('/parents')
    setShowParentalGate(true)
  }

  const handleParentalSuccess = () => {
    setShowParentalGate(false)
    if (pendingRoute) {
      navigate(pendingRoute)
      setPendingRoute(null)
    }
  }

  return {
    hydrated,
    labels,
    isDarkMode,
    gender,
    language,
    activeProfileId,
    isFirstVisit,
    profiles,
    addProfile,
    selectProfile,
    deleteProfile,
    search,
    setSearch,
    resetSearch,
    topicsData,
    showParentalGate,
    setShowParentalGate,
    openParentsZone,
    handleParentalSuccess,
    handleToggleTheme,
    handleToggleGender,
    handleGoHome,
  }
}
