import styles from './CategoryScrollSpy.module.css'

interface CategoryInfo {
  key: string
  name: string
}

interface CategoryScrollSpyProps {
  categories: CategoryInfo[]
  activeCategory: string
  onCategoryClick: (key: string) => void
}

/**
 * Composant CategoryScrollSpy (Dumb)
 * Affiche une navigation latérale pour les catégories de sujets.
 */
export function CategoryScrollSpy({ 
  categories, 
  activeCategory, 
  onCategoryClick 
}: CategoryScrollSpyProps) {
  return (
    <nav className={styles.container} aria-label="Navigation par thèmes">
      <ul className={styles.categoryList}>
        {categories.map((cat) => {
          const icon = cat.name.split(' ').pop()
          const displayName = cat.name.split(' ').slice(0, -1).join(' ')
          const isCurrent = activeCategory === cat.key.toLowerCase()

          return (
            <li key={cat.key} className={styles.listItem}>
              <button
                onClick={() => onCategoryClick(cat.key)}
                className={`${styles.button} ${isCurrent ? styles.active : ''}`}
                data-category={cat.key.toLowerCase()}
                data-active={isCurrent ? "true" : "false"}
                aria-label={`Aller à la section ${displayName}`}
                aria-current={isCurrent ? 'step' : undefined}
                title={cat.name}
              >
                <span className={styles.icon} aria-hidden="true">{icon}</span>
                <span className={styles.tooltip}>
                  {displayName}
                </span>
              </button>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
