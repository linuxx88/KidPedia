import { useEffect, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { encyclopedia } from '../data/topics'
import { useSettingsStore } from '../store/useSettingsStore'
import { useProfileStore } from '../store/useProfileStore'
import { useDiscoveryStore } from '../store/useDiscoveryStore'

export function useAppInit() {
  const navigate = useNavigate()
  const location = useLocation()
  
  const [showParentalGate, setShowParentalGate] = useState(false)
  const [pendingRoute, setPendingRoute] = useState<string | null>(null)
  const [hydrated, setHydrated] = useState(false)
  const [isParentalUnlocked, setIsParentalUnlocked] = useState(false)

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

  // Chargement des sujets personnalisés depuis IndexedDB
  useEffect(() => {
    if (hydrated) {
      useDiscoveryStore.getState().loadCustomTopics()
    }
  }, [hydrated])

  const labels = useSettingsStore(state => state.labels)
  const isDarkMode = useSettingsStore(state => state.isDarkMode)
  const toggleTheme = useSettingsStore(state => state.toggleTheme)
  const gender = useSettingsStore(state => state.gender)
  const language = useSettingsStore(state => state.language)
  const toggleGender = useSettingsStore(state => state.toggleGender)

  const activeProfileId = useProfileStore(state => state.activeProfileId)
  const isFirstVisit = useProfileStore(state => state.isFirstVisit)
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
    toggleTheme()
  }

  const handleToggleGender = () => {
    toggleGender()
  }

  const openParentsZone = () => {
    setPendingRoute('/parents')
    setShowParentalGate(true)
  }

  // Bloquer l'accès direct aux pages parents si non déverrouillé
  useEffect(() => {
    if (location.pathname.startsWith('/parents') && !isParentalUnlocked) {
      requestAnimationFrame(() => {
        setPendingRoute(location.pathname)
        setShowParentalGate(true)
        navigate('/')
      })
    }
  }, [location.pathname, isParentalUnlocked, navigate])

  const handleParentalSuccess = () => {
    setIsParentalUnlocked(true)
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
    isParentalUnlocked,
    setIsParentalUnlocked,
  }
}
