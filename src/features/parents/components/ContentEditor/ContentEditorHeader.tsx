import React from 'react';
import { type Topic } from '../../../../data/topics/types';
import { AppButton } from '../../../../components/UI/AppButton';
import styles from './ContentEditor.module.css';

interface ContentEditorHeaderProps {
  selectedTopicId: string;
  onChangeSelectedTopicId: (id: string) => void;
  topics: Topic[];
  customTopicIds: Set<string>;
  language: 'fr' | 'en';
  onExport: () => void;
  onImport: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const ContentEditorHeader: React.FC<ContentEditorHeaderProps> = ({
  selectedTopicId,
  onChangeSelectedTopicId,
  topics,
  customTopicIds,
  language,
  onExport,
  onImport,
}) => {
  return (
    <div className={styles.actionBar}>
      <div className={styles.selectWrapper}>
        <label htmlFor="topic-selector">
          {language === 'fr' ? 'Sélectionner un sujet :' : 'Select a topic:'}
        </label>
        <select
          id="topic-selector"
          value={selectedTopicId}
          onChange={(e) => onChangeSelectedTopicId(e.target.value)}
          className={styles.select}
        >
          <option value="new">🌟 {language === 'fr' ? 'Créer un nouveau sujet' : 'Create new topic'}</option>
          <optgroup label={language === 'fr' ? 'Sujets Existants' : 'Existing Topics'}>
            {topics.map((t) => (
              <option key={t.id} value={t.id}>
                {t.icon} {t.title[language]} ({customTopicIds.has(t.id) ? (language === 'fr' ? 'Perso' : 'Custom') : 'Natif'})
              </option>
            ))}
          </optgroup>
        </select>
      </div>

      <div className={styles.importExportGroup}>
        <AppButton variant="outline" onClick={onExport}>
          📤 {language === 'fr' ? 'Exporter JSON' : 'Export JSON'}
        </AppButton>
        <label className={styles.importLabel}>
          📥 {language === 'fr' ? 'Importer JSON' : 'Import JSON'}
          <input type="file" accept=".json" onChange={onImport} className={styles.fileInput} />
        </label>
      </div>
    </div>
  );
};
