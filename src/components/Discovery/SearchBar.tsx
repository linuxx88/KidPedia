import AppIcon from '../UI/AppIcon'
import styles from './SearchBar.module.css'

interface SearchBarProps {
  value: string
  onChange: (val: string) => void
  onClear: () => void
  placeholder: string
  clearLabel: string
  isCompact?: boolean
}

export const SearchBar = ({ 
  value, 
  onChange, 
  onClear, 
  placeholder,
  clearLabel,
  isCompact 
}: SearchBarProps) => {
  return (
    <div
      className={styles.searchContainer}
      data-compact={isCompact}
    >
      <div className={styles.searchInner}>
        <div className={styles.searchIconBox}>
          <AppIcon name="search" size="small" />
        </div>
        <input
          id="search-input"
          name="search-query"
          autoComplete="off"
          className={styles.searchInput}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
        {value && (
          <button
            className={styles.clearButton}
            onClick={onClear}
            aria-label={clearLabel}
            title={clearLabel}
          >
            <AppIcon name="close" size="small" />
          </button>
        )}
      </div>
    </div>
  )
}
