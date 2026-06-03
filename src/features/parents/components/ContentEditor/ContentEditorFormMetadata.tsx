import React from 'react';
import { type Topic } from '../../../../data/topics/types';
import styles from './ContentEditor.module.css';

interface ContentEditorFormMetadataProps {
  formData: Topic;
  setFormData: React.Dispatch<React.SetStateAction<Topic>>;
  selectedTopicId: string;
  categories: Array<{ key: string; name: Record<'fr' | 'en', string> }>;
  language: 'fr' | 'en';
  handleCategoryKeyChange: (key: string) => void;
}

export const ContentEditorFormMetadata: React.FC<ContentEditorFormMetadataProps> = ({
  formData,
  setFormData,
  selectedTopicId,
  categories,
  language,
  handleCategoryKeyChange,
}) => {
  return (
    <>
      <div className={styles.formGroup}>
        <label htmlFor="topic-id">ID Unique *</label>
        <input
          id="topic-id"
          type="text"
          value={formData.id}
          onChange={(e) => setFormData((prev) => ({ ...prev, id: e.target.value }))}
          disabled={selectedTopicId !== 'new'}
          placeholder="ex: panda-geant"
          className={styles.input}
          required
        />
      </div>

      <div className={styles.formGridRow}>
        <div className={styles.formGroup}>
          <label htmlFor="category-key">Catégorie *</label>
          <select
            id="category-key"
            value={formData.categoryKey}
            onChange={(e) => handleCategoryKeyChange(e.target.value)}
            className={styles.select}
          >
            {categories.map((c) => (
              <option key={c.key} value={c.key}>
                {c.name[language]}
              </option>
            ))}
          </select>
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="topic-icon">Icône (Emoji) *</label>
          <input
            id="topic-icon"
            type="text"
            value={formData.icon}
            onChange={(e) => setFormData((prev) => ({ ...prev, icon: e.target.value }))}
            placeholder="🐼"
            className={styles.input}
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="anchor-icon">Icône Ancre *</label>
          <input
            id="anchor-icon"
            type="text"
            value={formData.anchorIcon || ''}
            onChange={(e) => setFormData((prev) => ({ ...prev, anchorIcon: e.target.value }))}
            placeholder="📍"
            className={styles.input}
            required
          />
        </div>
      </div>
    </>
  );
};
