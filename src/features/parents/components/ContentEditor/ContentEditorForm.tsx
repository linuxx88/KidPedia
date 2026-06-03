import React from 'react';
import { type Topic } from '../../../../data/topics/types';
import { AppButton } from '../../../../components/UI/AppButton';
import { ContentEditorFormMetadata } from './ContentEditorFormMetadata';
import { ContentEditorFormBilingual } from './ContentEditorFormBilingual';
import { ContentEditorFormQuiz } from './ContentEditorFormQuiz';
import styles from './ContentEditor.module.css';

const CATEGORIES = [
  { key: 'animaux', name: { fr: '🦁 Animaux', en: '🦁 Animals' } },
  { key: 'espace', name: { fr: '🚀 Espace', en: '🚀 Space' } },
  { key: 'pourquoi', name: { fr: '❓ Pourquoi ?', en: '❓ Why ?' } },
  { key: 'corps-humain', name: { fr: '🧠 Corps Humain', en: '🧠 Human Body' } },
  { key: 'dinosaures', name: { fr: '🦖 Dinosaures', en: '🦖 Dinosaurs' } },
  { key: 'nature', name: { fr: '🌳 Nature', en: '🌳 Nature' } },
  { key: 'histoire', name: { fr: '🏰 Histoire', en: '🏰 History' } },
  { key: 'geographie', name: { fr: '🌍 Géographie', en: '🌍 Geography' } },
  { key: 'inventions', name: { fr: '💡 Inventions', en: '💡 Inventions' } },
  { key: 'arts', name: { fr: '🎨 Arts', en: '🎨 Arts' } },
];

interface ContentEditorFormProps {
  formData: Topic;
  setFormData: React.Dispatch<React.SetStateAction<Topic>>;
  selectedTopicId: string;
  customTopicIds: Set<string>;
  language: 'fr' | 'en';
  onSave: (e: React.FormEvent) => void;
  onDelete: () => void;
}

export const ContentEditorForm: React.FC<ContentEditorFormProps> = ({
  formData,
  setFormData,
  selectedTopicId,
  customTopicIds,
  language,
  onSave,
  onDelete,
}) => {
  const handleCategoryKeyChange = (key: string) => {
    const selectedCat = CATEGORIES.find((c) => c.key === key);
    const anchor = selectedCat?.name.fr.split(' ')[0] || '📍';
    setFormData((prev) => ({
      ...prev,
      categoryKey: key,
      anchorIcon: anchor,
      category: {
        fr: selectedCat ? selectedCat.name.fr.replace(/[\u2700-\u27BF]|[\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDC00-\uDFFF]/g, '').trim() : prev.category.fr,
        en: selectedCat ? selectedCat.name.en.replace(/[\u2700-\u27BF]|[\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDC00-\uDFFF]/g, '').trim() : prev.category.en,
      },
    }));
  };

  return (
    <form onSubmit={onSave} className={styles.editorPanel}>
      <h3 className={styles.panelTitle}>
        {selectedTopicId === 'new' ? (language === 'fr' ? 'Nouveau Sujet' : 'New Topic') : (language === 'fr' ? 'Modifier le Sujet' : 'Edit Topic')}
      </h3>

      <div className={styles.formGrid}>
        <ContentEditorFormMetadata
          formData={formData}
          setFormData={setFormData}
          selectedTopicId={selectedTopicId}
          categories={CATEGORIES}
          language={language}
          handleCategoryKeyChange={handleCategoryKeyChange}
        />

        <ContentEditorFormBilingual
          formData={formData}
          setFormData={setFormData}
        />

        <ContentEditorFormQuiz
          formData={formData}
          setFormData={setFormData}
          language={language}
        />
      </div>

      <div className={styles.formActions}>
        <AppButton type="submit">
          💾 {language === 'fr' ? 'Enregistrer' : 'Save'}
        </AppButton>
        {selectedTopicId !== 'new' && customTopicIds.has(formData.id) && (
          <AppButton variant="outline" onClick={onDelete} className={styles.deleteBtn}>
            🗑️ {language === 'fr' ? 'Supprimer' : 'Delete'}
          </AppButton>
        )}
      </div>
    </form>
  );
};
