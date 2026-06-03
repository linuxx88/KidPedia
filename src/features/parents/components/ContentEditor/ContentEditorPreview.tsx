import React from 'react';
import { type Topic } from '../../../../data/topics/types';
import styles from './ContentEditor.module.css';

interface ContentEditorPreviewProps {
  formData: Topic;
  previewLanguage: 'fr' | 'en';
  setPreviewLanguage: (lang: 'fr' | 'en') => void;
}

export const ContentEditorPreview: React.FC<ContentEditorPreviewProps> = ({
  formData,
  previewLanguage,
  setPreviewLanguage,
}) => {
  return (
    <div className={styles.previewPanel}>
      <div className={styles.previewHeader}>
        <h3 className={styles.panelTitle}>👀 Live Preview</h3>
        <div className={styles.langToggle}>
          <button
            type="button"
            className={`${styles.langBtn} ${previewLanguage === 'fr' ? styles.langBtnActive : ''}`}
            onClick={() => setPreviewLanguage('fr')}
          >
            FR
          </button>
          <button
            type="button"
            className={`${styles.langBtn} ${previewLanguage === 'en' ? styles.langBtnActive : ''}`}
            onClick={() => setPreviewLanguage('en')}
          >
            EN
          </button>
        </div>
      </div>

      <div className={styles.previewCard}>
        <div className={styles.simulatedTopicCard}>
          <div className={styles.simulatedHeader}>
            <span className={styles.simulatedIcon}>{formData.icon || '❓'}</span>
            <div>
              <span className={styles.simulatedCategory}>
                {formData.anchorIcon} {formData.category[previewLanguage] || (formData.categoryKey ? formData.categoryKey.toUpperCase() : 'CATEGORIE')}
              </span>
              <h4 className={styles.simulatedTitle}>
                {formData.title[previewLanguage] || (previewLanguage === 'fr' ? 'Nouveau Sujet' : 'New Topic')}
              </h4>
            </div>
          </div>

          <div className={styles.simulatedBody}>
            <p className={styles.simulatedShortDesc}>
              {formData.shortDesc[previewLanguage] || (previewLanguage === 'fr' ? 'Entrez une description courte...' : 'Enter a short description...')}
            </p>
            <div className={styles.simulatedContent}>
              {formData.fullContent[previewLanguage] || (previewLanguage === 'fr' ? 'Entrez le contenu complet ici...' : 'Enter full content here...')}
            </div>

            <div className={styles.simulatedFunFact}>
              <span className={styles.funFactTitle}>💡 {previewLanguage === 'fr' ? 'Le Savais-tu ?' : 'Did You Know?'}</span>
              <p>{formData.funFact[previewLanguage] || (previewLanguage === 'fr' ? 'Anecdote amusante...' : 'Fun fact description...')}</p>
            </div>

            {formData.quiz?.question[previewLanguage] && (
              <div className={styles.simulatedQuiz}>
                <h5 className={styles.quizQ}>🧠 {formData.quiz.question[previewLanguage]}</h5>
                <div className={styles.simulatedOptions}>
                  {formData.quiz.options[previewLanguage].map((opt, idx) => (
                    <div
                      key={`preview-opt-${idx}`}
                      className={`${styles.simulatedOption} ${formData.quiz?.correctAnswer === idx ? styles.simulatedCorrectOpt : ''}`}
                    >
                      <span className={styles.optLetter}>{String.fromCharCode(65 + idx)}.</span> {opt || `Option ${idx + 1}`}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
