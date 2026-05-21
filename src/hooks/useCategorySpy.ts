import { useState, useEffect } from 'react'

interface CategoryInfo {
  key: string
  name: string
}

/**
 * Hook pour détecter quelle catégorie est actuellement visible à l'écran.
 * Permet de synchroniser l'état avec un store externe.
 */
export function useCategorySpy(
  categories: CategoryInfo[], 
  externalActiveCategory?: string,
  onCategoryChange?: (key: string) => void
) {
  const [internalActiveCategory, setInternalActiveCategory] = useState<string>('')
  
  const activeCategory = externalActiveCategory !== undefined 
    ? externalActiveCategory 
    : internalActiveCategory;

  useEffect(() => {
    if (categories.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const key = entry.target.id.replace('category-', '');
            if (onCategoryChange) {
              onCategoryChange(key);
            } else {
              setInternalActiveCategory(key);
            }
          }
        })
      },
      { 
        rootMargin: '0px 0px -50% 0px', 
        threshold: 0.05 
      }
    )

    categories.forEach((cat) => {
      const el = document.getElementById(`category-${cat.key.toLowerCase()}`)
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [categories, onCategoryChange])

  const scrollToCategory = (categoryKey: string) => {
    const id = `category-${categoryKey.toLowerCase()}`
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      })
    }
  }

  return { activeCategory, scrollToCategory }
}
