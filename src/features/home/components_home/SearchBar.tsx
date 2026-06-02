import styles from '../Home.module.css'
import { type Labels } from '../../../locales'

interface SearchBarProps {
  setSearch: (value: string) => void
  labels: Labels
}

export function SearchBar({ setSearch, labels }: SearchBarProps) {
  return (
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
          {labels.home.popularSuggestions.map((suggestion: { query: string; label: string }) => (
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
  )
}
