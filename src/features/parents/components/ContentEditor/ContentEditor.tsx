import React, { useState, useEffect } from 'react';
import { useDiscoveryStore } from '../../../../store/useDiscoveryStore';
import { useSettingsStore } from '../../../../store/useSettingsStore';
import { PageHeader } from '../../../../components/Layout/PageHeader';
import { type Topic } from '../../../../data/topics/types';
import { db } from '../../../../utils/db';
import { ContentEditorHeader } from './ContentEditorHeader';
import { ContentEditorForm } from './ContentEditorForm';
import { ContentEditorPreview } from './ContentEditorPreview';
import styles from './ContentEditor.module.css';

const EMPTY_TOPIC = (): Topic => ({
  id: '',
  title: { fr: '', en: '' },
  category: { fr: '', en: '' },
  categoryKey: 'animaux',
  icon: '❓',
  shortDesc: { fr: '', en: '' },
  fullContent: { fr: '', en: '' },
  funFact: { fr: '', en: '' },
  anchorIcon: '🦁',
  quiz: {
    question: { fr: '', en: '' },
    options: {
      fr: ['', '', '', ''],
      en: ['', '', '', ''],
    },
    correctAnswer: 0,
    explanation: { fr: '', en: '' },
    hint: { fr: '', en: '' },
  },
});

export const ContentEditor: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const language = useSettingsStore((state) => state.language);
  const topics = useDiscoveryStore((state) => state.topics);
  const saveTopic = useDiscoveryStore((state) => state.saveTopic);
  const deleteTopic = useDiscoveryStore((state) => state.deleteTopic);

  const [selectedTopicId, setSelectedTopicId] = useState<string>('new');
  const [formData, setFormData] = useState<Topic>(EMPTY_TOPIC());
  const [customTopicIds, setCustomTopicIds] = useState<Set<string>>(new Set());
  const [previewLanguage, setPreviewLanguage] = useState<'fr' | 'en'>(language);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const refreshCustomIds = async () => {
    try {
      const customs = await db.topics.toArray();
      setCustomTopicIds(new Set(customs.map((t) => t.id)));
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    refreshCustomIds();
  }, [topics]);

  useEffect(() => {
    if (selectedTopicId === 'new') {
      setFormData(EMPTY_TOPIC());
    } else {
      const topic = topics.find((t) => t.id === selectedTopicId);
      if (topic) {
        setFormData(JSON.parse(JSON.stringify(topic)));
      }
    }
  }, [selectedTopicId, topics]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccessMsg(null);
    setErrorMsg(null);

    if (!formData.id.trim()) {
      setErrorMsg(language === 'fr' ? "L'identifiant unique (ID) est requis." : 'Unique ID is required.');
      return;
    }
    if (!/^[a-z0-9-]+$/.test(formData.id)) {
      setErrorMsg(language === 'fr' ? "L'ID ne doit contenir que des lettres minuscules, chiffres et tirets." : 'ID must contain only lowercase letters, numbers, and hyphens.');
      return;
    }
    if (!formData.title.fr.trim() || !formData.title.en.trim()) {
      setErrorMsg(language === 'fr' ? 'Les titres FR et EN sont requis.' : 'Titles in FR and EN are required.');
      return;
    }
    if (!formData.fullContent.fr.trim() || !formData.fullContent.en.trim()) {
      setErrorMsg(language === 'fr' ? 'Le contenu complet FR et EN est requis.' : 'Full content in FR and EN is required.');
      return;
    }
    if (!formData.quiz || !formData.quiz.question.fr.trim() || !formData.quiz.question.en.trim()) {
      setErrorMsg(language === 'fr' ? 'La question du quiz est requise pour FR et EN.' : 'Quiz question is required for both FR and EN.');
      return;
    }

    try {
      await saveTopic(formData);
      setSuccessMsg(language === 'fr' ? 'Sujet sauvegardé avec succès !' : 'Topic saved successfully!');
      if (selectedTopicId === 'new') {
        setSelectedTopicId(formData.id);
      }
      refreshCustomIds();
    } catch (e) {
      console.error(e);
      setErrorMsg(language === 'fr' ? 'Erreur lors de la sauvegarde.' : 'Error saving topic.');
    }
  };

  const handleDelete = async () => {
    if (!window.confirm(language === 'fr' ? 'Voulez-vous vraiment supprimer ce sujet ?' : 'Are you sure you want to delete this topic?')) {
      return;
    }
    setSuccessMsg(null);
    setErrorMsg(null);

    try {
      await deleteTopic(formData.id);
      setSuccessMsg(language === 'fr' ? 'Sujet supprimé avec succès !' : 'Topic deleted successfully!');
      setSelectedTopicId('new');
      refreshCustomIds();
    } catch (e) {
      console.error(e);
      setErrorMsg(language === 'fr' ? 'Erreur lors de la suppression.' : 'Error deleting topic.');
    }
  };

  const handleExport = async () => {
    try {
      const customs = await db.topics.toArray();
      const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(customs, null, 2));
      const downloadAnchor = document.createElement('a');
      downloadAnchor.setAttribute('href', dataStr);
      downloadAnchor.setAttribute('download', 'kidpedia-custom-topics.json');
      document.body.appendChild(downloadAnchor);
      downloadAnchor.click();
      downloadAnchor.remove();
    } catch (e) {
      console.error(e);
      alert('Export failed.');
    }
  };

  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async (event) => {
      try {
        const imported = JSON.parse(event.target?.result as string) as Topic[];
        if (!Array.isArray(imported)) throw new Error('Invalid format');

        for (const topic of imported) {
          if (topic.id && topic.title && topic.categoryKey) {
            await saveTopic(topic);
          }
        }
        alert(language === 'fr' ? 'Importation réussie !' : 'Import successful!');
        setSelectedTopicId('new');
        refreshCustomIds();
      } catch (err) {
        console.error(err);
        alert(language === 'fr' ? 'Échec de l\'importation. Vérifiez le format JSON.' : 'Import failed. Check JSON format.');
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className={styles.container}>
      <PageHeader
        title={language === 'fr' ? '📝 Éditeur de Contenu' : '📝 Content Editor'}
        icon="🛠️"
        onBack={onBack}
      />

      <ContentEditorHeader
        selectedTopicId={selectedTopicId}
        onChangeSelectedTopicId={setSelectedTopicId}
        topics={topics}
        customTopicIds={customTopicIds}
        language={language}
        onExport={handleExport}
        onImport={handleImport}
      />

      {successMsg && <div className={styles.successAlert} role="alert">{successMsg}</div>}
      {errorMsg && <div className={styles.errorAlert} role="alert">{errorMsg}</div>}

      <div className={styles.editorWorkspace}>
        <ContentEditorForm
          formData={formData}
          setFormData={setFormData}
          selectedTopicId={selectedTopicId}
          customTopicIds={customTopicIds}
          language={language}
          onSave={handleSave}
          onDelete={handleDelete}
        />

        <ContentEditorPreview
          formData={formData}
          previewLanguage={previewLanguage}
          setPreviewLanguage={setPreviewLanguage}
        />
      </div>
    </div>
  );
};
