import React from 'react';
import { type Topic } from '../../../../data/topics/types';
import styles from './ContentEditor.module.css';

interface ContentEditorFormQuizProps {
  formData: Topic;
  setFormData: React.Dispatch<React.SetStateAction<Topic>>;
  language: 'fr' | 'en';
}

export const ContentEditorFormQuiz: React.FC<ContentEditorFormQuizProps> = ({
  formData,
  setFormData,
  language,
}) => {
  return (
    <>
      <h4 className={styles.subSectionTitle}>🧠 {language === 'fr' ? 'Quiz Associé' : 'Associated Quiz'}</h4>

      <div className={styles.bilingualRow}>
        <div className={styles.formGroup}>
          <label htmlFor="quiz-q-fr">Question du Quiz (FR) *</label>
          <input
            id="quiz-q-fr"
            type="text"
            value={formData.quiz?.question.fr || ''}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                quiz: {
                  ...prev.quiz!,
                  question: { ...prev.quiz!.question, fr: e.target.value },
                },
              }))
            }
            placeholder="Combien d'heures par jour le panda mange-t-il ?"
            className={styles.input}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="quiz-q-en">Quiz Question (EN) *</label>
          <input
            id="quiz-q-en"
            type="text"
            value={formData.quiz?.question.en || ''}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                quiz: {
                  ...prev.quiz!,
                  question: { ...prev.quiz!.question, en: e.target.value },
                },
              }))
            }
            placeholder="How many hours a day does a panda eat?"
            className={styles.input}
            required
          />
        </div>
      </div>

      {/* Options FR */}
      <div className={styles.formGroup}>
        <label>Options de Réponses (FR) *</label>
        <div className={styles.optionsGrid}>
          {[0, 1, 2, 3].map((idx) => (
            <input
              key={`opt-fr-${idx}`}
              type="text"
              value={formData.quiz?.options.fr[idx] || ''}
              onChange={(e) => {
                const opts = [...(formData.quiz?.options.fr || ['', '', '', ''])];
                opts[idx] = e.target.value;
                setFormData((prev) => ({
                  ...prev,
                  quiz: {
                    ...prev.quiz!,
                    options: { ...prev.quiz!.options, fr: opts },
                  },
                }));
              }}
              placeholder={`Option ${idx + 1}`}
              className={styles.input}
              required
            />
          ))}
        </div>
      </div>

      {/* Options EN */}
      <div className={styles.formGroup}>
        <label>Answer Options (EN) *</label>
        <div className={styles.optionsGrid}>
          {[0, 1, 2, 3].map((idx) => (
            <input
              key={`opt-en-${idx}`}
              type="text"
              value={formData.quiz?.options.en[idx] || ''}
              onChange={(e) => {
                const opts = [...(formData.quiz?.options.en || ['', '', '', ''])];
                opts[idx] = e.target.value;
                setFormData((prev) => ({
                  ...prev,
                  quiz: {
                    ...prev.quiz!,
                    options: { ...prev.quiz!.options, en: opts },
                  },
                }));
              }}
              placeholder={`Option ${idx + 1}`}
              className={styles.input}
              required
            />
          ))}
        </div>
      </div>

      {/* Correct Answer Selector */}
      <div className={styles.formGridRow}>
        <div className={styles.formGroup}>
          <label htmlFor="correct-answer">Bonne Réponse *</label>
          <select
            id="correct-answer"
            value={formData.quiz?.correctAnswer ?? 0}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                quiz: {
                  ...prev.quiz!,
                  correctAnswer: parseInt(e.target.value, 10),
                },
              }))
            }
            className={styles.select}
          >
            <option value={0}>Option 1</option>
            <option value={1}>Option 2</option>
            <option value={2}>Option 3</option>
            <option value={3}>Option 4</option>
          </select>
        </div>
      </div>

      {/* Explanation & Hint */}
      <div className={styles.bilingualRow}>
        <div className={styles.formGroup}>
          <label htmlFor="explanation-fr">Explication du Quiz (FR)</label>
          <input
            id="explanation-fr"
            type="text"
            value={formData.quiz?.explanation?.fr || ''}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                quiz: {
                  ...prev.quiz!,
                  explanation: { ...prev.quiz!.explanation!, fr: e.target.value },
                },
              }))
            }
            placeholder="Le panda géant mange beaucoup de bambou..."
            className={styles.input}
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="explanation-en">Quiz Explanation (EN)</label>
          <input
            id="explanation-en"
            type="text"
            value={formData.quiz?.explanation?.en || ''}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                quiz: {
                  ...prev.quiz!,
                  explanation: { ...prev.quiz!.explanation!, en: e.target.value },
                },
              }))
            }
            placeholder="Giant pandas consume huge amounts of bamboo..."
            className={styles.input}
          />
        </div>
      </div>

      <div className={styles.bilingualRow}>
        <div className={styles.formGroup}>
          <label htmlFor="hint-fr">Indice du Quiz (FR)</label>
          <input
            id="hint-fr"
            type="text"
            value={formData.quiz?.hint?.fr || ''}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                quiz: {
                  ...prev.quiz!,
                  hint: { ...prev.quiz!.hint!, fr: e.target.value },
                },
              }))
            }
            placeholder="C'est la moitié d'une journée entière !"
            className={styles.input}
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="hint-en">Quiz Hint (EN)</label>
          <input
            id="hint-en"
            type="text"
            value={formData.quiz?.hint?.en || ''}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                quiz: {
                  ...prev.quiz!,
                  hint: { ...prev.quiz!.hint!, en: e.target.value },
                },
              }))
            }
            placeholder="It's half of a full day!"
            className={styles.input}
          />
        </div>
      </div>
    </>
  );
};
