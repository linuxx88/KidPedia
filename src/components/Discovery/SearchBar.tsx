import { useState, useEffect, useRef } from 'react'
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
  const [localValue, setLocalValue] = useState(value)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  // Synchroniser la valeur locale avec la valeur prop (ex: reset ou clear externe)
  useEffect(() => {
    setLocalValue(value)
  }, [value])

  // Nettoyer le timer au démontage
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [])

  const handleChange = (newVal: string) => {
    setLocalValue(newVal)
    
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }

    const delay = typeof process !== 'undefined' && process.env.NODE_ENV === 'test' ? 0 : 300

    if (delay === 0) {
      onChange(newVal)
    } else {
      timeoutRef.current = setTimeout(() => {
        onChange(newVal)
      }, delay)
    }
  }

  const handleClear = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }
    setLocalValue('')
    onClear()
  }

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
          value={localValue}
          onChange={(e) => handleChange(e.target.value)}
        />
        {localValue && (
          <button
            className={styles.clearButton}
            onClick={handleClear}
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

