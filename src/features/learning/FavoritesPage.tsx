import React, { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { encyclopedia } from '../../data/topics';
import { useProgressionStore } from '../../store/useProgressionStore';
import { useSettingsStore } from '../../store/useSettingsStore';
import { useAudioFeedback } from '../../hooks/useAudioFeedback';
import BackButton from '../../components/UI/BackButton';
import { FavoriteButton } from '../../components/UI/FavoriteButton';
import styles from './FavoritesPage.module.css';

const EMPTY_FAVORITES: readonly string[] = [];

export const FavoritesPage: React.FC = () => {
  const navigate = useNavigate();
  const { labels, language } = useSettingsStore();
  const { playSound } = useAudioFeedback();

  const favoriteIds = useProgressionStore((state) => {
    const activeId = state.activeProfileId;
    return (activeId ? state.progressions[activeId]?.favorites : EMPTY_FAVORITES) || EMPTY_FAVORITES;
  });

  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // Récupérer les données complètes des fiches favorites
  const favoriteTopics = useMemo(() => {
    const idsSet = new Set(favoriteIds);
    return encyclopedia.filter((topic) => idsSet.has(topic.id));
  }, [favoriteIds]);

  // Récupérer les catégories distinctes présentes parmi les favoris
  const categories = useMemo(() => {
    const cats = new Set<string>();
    favoriteTopics.forEach((t) => {
      if (t.categoryKey) cats.add(t.categoryKey);
    });
    return Array.from(cats);
  }, [favoriteTopics]);

  // Filtrer selon la catégorie sélectionnée
  const displayedTopics = useMemo(() => {
    if (!selectedCategory) return favoriteTopics;
    return favoriteTopics.filter((t) => t.categoryKey === selectedCategory);
  }, [favoriteTopics, selectedCategory]);

  const handleCardClick = (topicId: string) => {
    playSound('click');
    navigate(`/topic/${topicId}`);
  };

  const handleCategorySelect = (catKey: string | null) => {
    playSound('pop');
    setSelectedCategory(catKey);
  };

  return (
    <div className={styles.container}>
      {/* En-tête */}
      <div className={styles.headerBar}>
        <div className={styles.headerLeft}>
          <BackButton onClick={() => navigate('/')} />
          <div className={styles.titleWrapper}>
            <h1 className={styles.pageTitle}>{labels.favorites.title}</h1>
          </div>
        </div>
        {favoriteTopics.length > 0 && (
          <span className={styles.counterBadge}>
            {labels.favorites.counter(favoriteTopics.length)}
          </span>
        )}
      </div>

      {favoriteTopics.length > 0 ? (
        <>
          {/* Filtres par catégorie */}
          {categories.length > 1 && (
            <div className={styles.filtersBar} role="tablist" aria-label="Filtres par catégorie">
              <button
                type="button"
                role="tab"
                aria-selected={selectedCategory === null}
                className={`${styles.filterPill} ${selectedCategory === null ? styles.active : ''}`}
                onClick={() => handleCategorySelect(null)}
              >
                {labels.favorites.filterAll}
              </button>
              {categories.map((catKey) => {
                const isSelected = selectedCategory === catKey;
                const sampleTopic = favoriteTopics.find((t) => t.categoryKey === catKey);
                const catLabel = sampleTopic?.category?.[language] || catKey;
                return (
                  <button
                    key={catKey}
                    type="button"
                    role="tab"
                    aria-selected={isSelected}
                    className={`${styles.filterPill} ${isSelected ? styles.active : ''}`}
                    onClick={() => handleCategorySelect(catKey)}
                  >
                    {catLabel}
                  </button>
                );
              })}
            </div>
          )}

          {/* Grille des cartes favorites */}
          <div className={styles.grid}>
            {displayedTopics.map((topic) => {
              const title = topic.title?.[language] || topic.title?.fr || '';
              const desc = topic.shortDesc?.[language] || topic.shortDesc?.fr || '';
              const categoryLabel = topic.category?.[language] || topic.categoryKey;
              return (
                <article
                  key={topic.id}
                  className={styles.card}
                  onClick={() => handleCardClick(topic.id)}
                  tabIndex={0}
                  role="button"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      handleCardClick(topic.id);
                    }
                  }}
                  aria-label={`${title} - ${categoryLabel}`}
                  data-testid={`favorite-card-${topic.id}`}
                >
                  <div className={styles.cardTop}>
                    <span className={styles.cardIcon} role="img" aria-hidden="true">
                      {topic.icon}
                    </span>
                    <FavoriteButton
                      topicId={topic.id}
                      topicTitle={title}
                      size="small"
                    />
                  </div>

                  <h2 className={styles.cardTitle}>{title}</h2>
                  <p className={styles.cardDescription}>{desc}</p>

                  <div className={styles.cardFooter}>
                    <span className={styles.categoryTag}>{categoryLabel}</span>
                    <span className={styles.arrowHint} aria-hidden="true">➔</span>
                  </div>
                </article>
              );
            })}
          </div>
        </>
      ) : (
        /* État vide */
        <div className={styles.emptyContainer} data-testid="favorites-empty-state">
          <div className={styles.emptyIcon} role="img" aria-label="Étoile">
            ⭐
          </div>
          <h2 className={styles.emptyTitle}>{labels.favorites.emptyTitle}</h2>
          <p className={styles.emptyText}>{labels.favorites.emptyDesc}</p>
          <button
            type="button"
            className={styles.exploreBtn}
            onClick={() => navigate('/')}
          >
            <span>🧭</span>
            <span>{labels.favorites.exploreBtn}</span>
          </button>
        </div>
      )}
    </div>
  );
};
