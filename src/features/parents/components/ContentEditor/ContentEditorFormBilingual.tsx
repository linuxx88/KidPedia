import React from 'react';
import { type Topic } from '../../../../data/topics/types';
import styles from './ContentEditor.module.css';

interface ContentEditorFormBilingualProps {
  formData: Topic;
  setFormData: React.Dispatch<React.SetStateAction<Topic>>;
}

export const ContentEditorFormBilingual: React.FC<ContentEditorFormBilingualProps> = ({
  formData,
  setFormData,
}) => {
  return (
    <>
      {/* Bilingual Title */}
      <div className={styles.bilingualRow}>
        <div className={styles.formGroup}>
          <label htmlFor="title-fr">Titre (FR) *</label>
          <input
            id="title-fr"
            type="text"
            value={formData.title.fr}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                title: { ...prev.title, fr: e.target.value },
              }))
            }
            placeholder="Le Panda Géant"
            className={styles.input}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="title-en">Title (EN) *</label>
          <input
            id="title-en"
            type="text"
            value={formData.title.en}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                title: { ...prev.title, en: e.target.value },
              }))
            }
            placeholder="The Giant Panda"
            className={styles.input}
            required
          />
        </div>
      </div>

      {/* Bilingual Short Description */}
      <div className={styles.bilingualRow}>
        <div className={styles.formGroup}>
          <label htmlFor="short-desc-fr">Description Courte (FR) *</label>
          <input
            id="short-desc-fr"
            type="text"
            value={formData.shortDesc.fr}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                shortDesc: { ...prev.shortDesc, fr: e.target.value },
              }))
            }
            placeholder="Un ours noir et blanc passionné de bambou."
            className={styles.input}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="short-desc-en">Short Description (EN) *</label>
          <input
            id="short-desc-en"
            type="text"
            value={formData.shortDesc.en}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                shortDesc: { ...prev.shortDesc, en: e.target.value },
              }))
            }
            placeholder="A black and white bear passionate about bamboo."
            className={styles.input}
            required
          />
        </div>
      </div>

      {/* Bilingual Full Content */}
      <div className={styles.bilingualRow}>
        <div className={styles.formGroup}>
          <label htmlFor="full-content-fr">Contenu Complet (FR) *</label>
          <textarea
            id="full-content-fr"
            rows={4}
            value={formData.fullContent.fr}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                fullContent: { ...prev.fullContent, fr: e.target.value },
              }))
            }
            placeholder="Le panda géant vit dans les montagnes de Chine..."
            className={styles.textarea}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="full-content-en">Full Content (EN) *</label>
          <textarea
            id="full-content-en"
            rows={4}
            value={formData.fullContent.en}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                fullContent: { ...prev.fullContent, en: e.target.value },
              }))
            }
            placeholder="The giant panda lives in the mountains of China..."
            className={styles.textarea}
            required
          />
        </div>
      </div>

      {/* Bilingual Fun Fact */}
      <div className={styles.bilingualRow}>
        <div className={styles.formGroup}>
          <label htmlFor="funfact-fr">Anecdote Rigolote (FR) *</label>
          <textarea
            id="funfact-fr"
            rows={2}
            value={formData.funFact.fr}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                funFact: { ...prev.funFact, fr: e.target.value },
              }))
            }
            placeholder="Le panda passe environ 12 heures par jour à manger !"
            className={styles.textarea}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="funfact-en">Fun Fact (EN) *</label>
          <textarea
            id="funfact-en"
            rows={2}
            value={formData.funFact.en}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                funFact: { ...prev.funFact, en: e.target.value },
              }))
            }
            placeholder="Pandas spend about 12 hours a day eating!"
            className={styles.textarea}
            required
          />
        </div>
      </div>
    </>
  );
};
