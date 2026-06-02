import styles from '../BadgesPage.module.css'

interface BadgeFiltersProps {
  activeCategory: string
  onCategoryChange: (category: string) => void
  language: 'fr' | 'en'
}

const CATEGORY_INFOS: Record<string, { label: { fr: string; en: string }; icon: string }> = {
  all: { label: { fr: 'Tout', en: 'All' }, icon: '🌟' },
  animaux: { label: { fr: 'Animaux', en: 'Animals' }, icon: '🐶' },
  espace: { label: { fr: 'Espace', en: 'Space' }, icon: '🚀' },
  pourquoi: { label: { fr: 'Pourquoi', en: 'Why' }, icon: '❓' },
  'corps-humain': { label: { fr: 'Corps Humain', en: 'Human Body' }, icon: '🧠' },
  dinosaures: { label: { fr: 'Dinosaures', en: 'Dinosaurs' }, icon: '🦖' },
  nature: { label: { fr: 'Nature', en: 'Nature' }, icon: '🌱' },
  histoire: { label: { fr: 'Histoire', en: 'History' }, icon: '🏰' },
  geographie: { label: { fr: 'Géographie', en: 'Geography' }, icon: '🌍' },
  inventions: { label: { fr: 'Inventions', en: 'Inventions' }, icon: '💡' },
  arts: { label: { fr: 'Arts', en: 'Arts' }, icon: '🎨' },
  exploits: { label: { fr: 'Exploits', en: 'Exploits' }, icon: '🏆' },
}

export function BadgeFilters({ activeCategory, onCategoryChange, language }: BadgeFiltersProps) {
  const categories = Object.keys(CATEGORY_INFOS)

  return (
    <div className={styles.filtersContainer}>
      {categories.map((catKey) => {
        const info = CATEGORY_INFOS[catKey]
        const isActive = activeCategory === catKey
        return (
          <button
            key={catKey}
            type="button"
            className={`${styles.filterButton} ${isActive ? styles.active : ''}`}
            onClick={() => onCategoryChange(catKey)}
          >
            <span className={styles.filterIcon}>{info.icon}</span>
            <span className={styles.filterText}>{info.label[language]}</span>
          </button>
        )
      })}
    </div>
  )
}
