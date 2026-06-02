import { useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSettingsStore } from '../../store/useSettingsStore'
import { useStoryteller } from '../../hooks/useStoryteller'
import BackButton from '../../components/UI/BackButton'
import glossaryData from '../../data/glossary'
import styles from './DictionaryPage.module.css'

interface GlossaryWord {
  word: {
    fr: string
    en: string
  }
  definition: {
    fr: string
    en: string
  }
  emoji: string
  category: string
}

export function DictionaryPage() {
  const navigate = useNavigate()
  const { labels, language } = useSettingsStore()
  const { speak, isSpeaking, stopStory } = useStoryteller()

  const [searchQuery, setSearchQuery] = useState('')
  const [selectedLetter, setSelectedLetter] = useState<string | null>(null)
  const [speakingWord, setSpeakingWord] = useState<string | null>(null)

  // Cast typed data from JSON
  const words: GlossaryWord[] = glossaryData as GlossaryWord[]

  // List of all letters present in the dictionary to build the A-Z selection
  const alphabet = useMemo(() => {
    const lettersSet = new Set<string>()
    words.forEach((w) => {
      const firstLetter = w.word[language].charAt(0).toUpperCase()
      if (/[A-Z]/.test(firstLetter)) {
        lettersSet.add(firstLetter)
      }
    })
    return Array.from(lettersSet).sort()
  }, [words, language])

  // Filtered words list based on search and selected letter
  const filteredWords = useMemo(() => {
    return words.filter((w) => {
      const wordText = w.word[language].toLowerCase()
      const defText = w.definition[language].toLowerCase()
      const query = searchQuery.toLowerCase()

      const matchesSearch = wordText.includes(query) || defText.includes(query)
      const matchesLetter = selectedLetter
        ? wordText.startsWith(selectedLetter.toLowerCase())
        : true

      return matchesSearch && matchesLetter
    })
  }, [words, searchQuery, selectedLetter, language])

  const handleSpeak = (word: string, definition: string) => {
    if (isSpeaking && speakingWord === word) {
      stopStory()
      setSpeakingWord(null)
    } else {
      stopStory()
      setSpeakingWord(word)
      speak(`${word}. ${definition}`)
    }
  }

  const handleLetterClick = (letter: string) => {
    if (selectedLetter === letter) {
      setSelectedLetter(null) // Unselect
    } else {
      setSelectedLetter(letter)
    }
  }

  return (
    <div className={styles.dictionaryContainer}>
      <header className={styles.header}>
        <BackButton onClick={() => navigate('/')} />
        <div className={styles.titleSection}>
          <h1 className={styles.title}>{labels.dictionary.title}</h1>
          <p className={styles.subtitle}>{labels.dictionary.listenTip}</p>
        </div>
      </header>

      <section className={styles.searchFilterPanel}>
        <div className={styles.searchBox}>
          <span className={styles.searchIcon}>🔍</span>
          <input
            type="text"
            className={styles.searchInput}
            placeholder={labels.dictionary.searchPlaceholder}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className={styles.alphabetContainer}>
          <button
            className={`${styles.letterButton} ${!selectedLetter ? styles.activeLetter : ''}`}
            onClick={() => setSelectedLetter(null)}
          >
            {labels.dictionary.allLetters}
          </button>
          {alphabet.map((letter) => (
            <button
              key={letter}
              className={`${styles.letterButton} ${selectedLetter === letter ? styles.activeLetter : ''}`}
              onClick={() => handleLetterClick(letter)}
            >
              {letter}
            </button>
          ))}
        </div>
      </section>

      <main>
        {filteredWords.length > 0 ? (
          <div className={styles.wordsGrid}>
            {filteredWords.map((item) => {
              const currentWord = item.word[language]
              const currentDef = item.definition[language]
              const isCurrentSpeaking = isSpeaking && speakingWord === currentWord

              return (
                <article key={currentWord} className={styles.wordCard}>
                  <div className={styles.cardHeader}>
                    <span className={styles.emojiBadge}>{item.emoji}</span>
                    <span className={styles.categoryTag}>{item.category}</span>
                  </div>

                  <div className={styles.wordTitleWrapper}>
                    <h2 className={styles.wordTitle}>{currentWord}</h2>
                    <button
                      className={`${styles.speakButton} ${isCurrentSpeaking ? styles.speakingOwl : ''}`}
                      onClick={() => handleSpeak(currentWord, currentDef)}
                      title={labels.common.listen}
                      aria-label={`${labels.common.listen} ${currentWord}`}
                    >
                      🦉
                    </button>
                  </div>

                  <p className={styles.definitionText}>{currentDef}</p>
                </article>
              )
            })}
          </div>
        ) : (
          <div className={styles.emptyState}>
            <span className={styles.emptyEmoji}>🦖💤</span>
            <h2 className={styles.emptyTitle}>{labels.dictionary.noResults}</h2>
            <p className={styles.emptyText}>{labels.home.noResultsText}</p>
          </div>
        )}
      </main>
    </div>
  )
}
