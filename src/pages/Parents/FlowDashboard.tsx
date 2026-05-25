import React, { useState } from 'react';
import { PageHeader } from '../../components/Layout/PageHeader';
import { AppButton } from '../../components/UI/AppButton';
import { MermaidDiagram } from '../../components/UI/MermaidDiagram';
import { useNotificationStore } from '../../store/useNotificationStore';
import styles from './FlowDashboard.module.css';

const PROJECT_FLOW_CHART = `%%{init: {"flowchart": {"htmlLabels": false}}}%%
flowchart TB
    %% Déclarations de styles visuels
    classDef entry fill:#FFF3E0,stroke:#FFB74D,stroke-width:2px,color:#1A202C
    classDef views fill:#E8F5E9,stroke:#81C784,stroke-width:2px,color:#1A202C
    classDef components fill:#E0F7FA,stroke:#4DD0E1,stroke-width:2px,color:#1A202C
    classDef stores fill:#FFFDE7,stroke:#FFF176,stroke-width:2px,color:#1A202C
    classDef data fill:#ECEFF1,stroke:#90A4AE,stroke-width:2px,color:#1A202C
    classDef hooks fill:#F3E5F5,stroke:#BA68C8,stroke-width:2px,color:#1A202C

    %% 1. COUCHE VIEWS & ROUTING (Pages principales)
    subgraph ViewsLayer ["🎬 ENTRÉE, VUES & NAVIGATION"]
        main_entry["main.tsx / App.tsx\\n(Point d'entrée & Router)"]:::entry
        profile_sel["ProfileSelection\\n(Choix / Création Profil)"]:::views
        map_view["InteractiveMap\\n(Exploration thématique)"]:::views
        safari_view["SafariPage\\n(Chasse aux autocollants)"]:::views
        gifts_view["GiftsPage\\n(Boutique des cadeaux & Garde-robe)"]:::views
        topic_view["TopicDetailPage\\n(Lecture & Fiche audio)"]:::views
        quiz_view["QuizPage\\n(Défis de connaissances)"]:::views
        refuge_view["RefugePage\\n(Adoption de compagnons)"]:::views
        championship_view["ChampionshipPage\\n(Le Grand Quiz 15s)"]:::views
    end

    %% 2. COUCHE GESTION D'ÉTAT (Zustand Stores réactifs)
    subgraph StoresLayer ["🤖 GESTION D'ÉTAT & PERSISTANCE (Zustand Stores)"]
        store_profile["useProfileStore\\n(Profils des enfants & sauvegarde)"]:::stores
        store_player["usePlayerStore\\n(Évolution XP, Niveaux, Étoiles)"]:::stores
        store_progression["useProgressionStore\\n(Sujets explorés & Médailles)"]:::stores
        store_safari["useSafariStore\\n(Stickers collectés dans la nature)"]:::stores
        store_gift["useGiftStore\\n(Achat d'accessoires & familiers)"]:::stores
        store_settings["useSettingsStore\\n(Volume global, Langue fr/en, Audio)"]:::stores
        store_companion["useCompanionStore\\n(Friandises & compagnons)"]:::stores
        store_championship["useQuizChampionshipStore\\n(Scores locaux & minuterie)"]:::stores
    end

    %% 3. COUCHE GRAPHISMES ET COMPOSANTS UI
    subgraph UILayer ["🎨 RENDU VISUEL & EFFETS SPÉCIAUX"]
        avatar_display["AvatarDisplay\\n(Superposition de l'avatar)"]:::components
        transformed_emoji["TransformedEmoji\\n(Module modulaire à la demande)"]:::components
        audio_feedback["useAudioFeedback\\n(Bloops, tada, rugissements)"]:::hooks
        confetti_fx["canvas-confetti\\n(Effets de victoire)"]:::components
    end

    %% 4. COUCHE BASES DE DONNÉES STATIQUES
    subgraph DataLayer ["📂 FLUX DE CONTENU (Databases)"]
        db_topics["topics.ts\\n(Textes et thèmes encyclopédiques)"]:::data
        db_quizzes["quizzes.ts\\n(Questions par sujet d'apprentissage)"]:::data
        db_accessories["accessories.ts\\n(Définitions chapeaux, lunettes, familiers)"]:::data
    end

    %% --- RELATIONSHIPS & INTERACTIONS FLOWS ---

    %% Flux d'Initialisation & Profil
    main_entry --> profile_sel
    profile_sel --> store_profile
    profile_sel --> map_view
    main_entry --> championship_view

    %% Flux de Navigation Enfant
    map_view --> topic_view
    map_view --> gifts_view
    map_view --> safari_view
    map_view --> refuge_view

    %% Flux d'Apprentissage & Quiz
    topic_view --> db_topics
    topic_view --> quiz_view
    quiz_view --> db_quizzes
    
    %% Flux de Progression & Gamification
    quiz_view --> store_player
    quiz_view --> store_progression
    safari_view --> store_safari

    %% Le Grand Quiz des Champions (Mode Défi)
    championship_view --> store_championship
    championship_view --> store_profile
    championship_view --> store_progression
    championship_view --> confetti_fx
    championship_view --> audio_feedback

    %% Le Refuge des Compagnons
    refuge_view --> store_companion
    refuge_view --> store_progression

    %% Flux de l'Inventaire (Gifts) & Personnalisation
    gifts_view --> db_accessories
    gifts_view --> store_gift
    gifts_view --> confetti_fx
    
    %% Flux d'Affichage Dynamique de l'Avatar
    store_gift --> avatar_display
    avatar_display --> transformed_emoji
    transformed_emoji --> db_accessories

    %% Flux de Feedback Sensoriel (Audio-visuel)
    quiz_view --> confetti_fx
    quiz_view --> audio_feedback
    store_settings --> audio_feedback
    map_view --> audio_feedback
`;

type LayerType = 'all' | 'entry' | 'views' | 'components' | 'stores' | 'data' | 'hooks';

export const FlowDashboard: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const [highlightedLayer, setHighlightedLayer] = useState<LayerType>('all');
  const [zoomScale, setZoomScale] = useState<number>(1.0);

  const handleCopyCode = () => {
    navigator.clipboard.writeText(PROJECT_FLOW_CHART).then(() => {
      useNotificationStore.getState().addNotification({
        type: 'xp',
        title: 'Copié !',
        message: 'Le code Mermaid du flux a été copié dans le presse-papier.',
        icon: '📋',
        duration: 3000
      });
    }).catch(() => {
      alert('Impossible de copier.');
    });
  };

  const handleZoomIn = () => {
    setZoomScale(prev => Math.min(prev + 0.1, 1.6));
  };

  const handleZoomOut = () => {
    setZoomScale(prev => Math.max(prev - 0.1, 0.5));
  };

  const handleZoomReset = () => {
    setZoomScale(1.0);
  };

  const handleToggleHighlight = (layer: LayerType) => {
    setHighlightedLayer(prev => prev === layer ? 'all' : layer);
  };

  const getInlinedSvgBlob = () => {
    const container = document.querySelector('.mermaid-interactive-container');
    const svgEl = container?.querySelector('svg');
    if (!svgEl) return null;

    const clonedSvg = svgEl.cloneNode(true) as SVGSVGElement;

    const inlineStyles = (original: Element, clone: Element) => {
      const computed = window.getComputedStyle(original);
      const propertiesToCopy = [
        'fill',
        'stroke',
        'stroke-width',
        'stroke-dasharray',
        'font-family',
        'font-size',
        'font-weight',
        'text-anchor',
        'opacity'
      ];

      propertiesToCopy.forEach(prop => {
        const val = computed.getPropertyValue(prop);
        if (val) {
          clone.setAttribute(prop, val);
        }
      });

      const originalChildren = Array.from(original.children);
      const cloneChildren = Array.from(clone.children);
      
      for (let i = 0; i < originalChildren.length; i++) {
        if (cloneChildren[i]) {
          inlineStyles(originalChildren[i] as Element, cloneChildren[i] as Element);
        }
      }
    };

    inlineStyles(svgEl, clonedSvg);

    const bbox = svgEl.getBoundingClientRect();
    if (bbox.width && bbox.height) {
      if (!clonedSvg.getAttribute('width')) {
        clonedSvg.setAttribute('width', `${bbox.width}px`);
      }
      if (!clonedSvg.getAttribute('height')) {
        clonedSvg.setAttribute('height', `${bbox.height}px`);
      }
    }

    const svgData = new XMLSerializer().serializeToString(clonedSvg);
    return new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
  };

  const handleDownloadSVG = () => {
    const svgBlob = getInlinedSvgBlob();
    if (svgBlob) {
      const svgUrl = URL.createObjectURL(svgBlob);
      const downloadLink = document.createElement('a');
      downloadLink.href = svgUrl;
      downloadLink.download = 'kidpedia-architecture-flow.svg';
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
      URL.revokeObjectURL(svgUrl);

      useNotificationStore.getState().addNotification({
        type: 'xp',
        title: 'Téléchargé !',
        message: 'Le diagramme vectoriel SVG autonome a été téléchargé.',
        icon: '💾',
        duration: 3000
      });
    } else {
      alert('Le diagramme de flux n\'a pas pu être trouvé.');
    }
  };

  const handleDownloadPNG = () => {
    const container = document.querySelector('.mermaid-interactive-container');
    const svgEl = container?.querySelector('svg');
    if (svgEl) {
      const svgBlob = getInlinedSvgBlob();
      if (!svgBlob) return;
      const svgUrl = URL.createObjectURL(svgBlob);

      const bbox = svgEl.getBoundingClientRect();
      const width = bbox.width || 1000;
      const height = bbox.height || 750;

      const img = new Image();
      img.onload = () => {
        const scale = 2;
        const canvas = document.createElement('canvas');
        canvas.width = width * scale;
        canvas.height = height * scale;
        
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.fillStyle = '#ffffff';
          ctx.fillRect(0, 0, canvas.width, canvas.height);
          ctx.scale(scale, scale);
          ctx.drawImage(img, 0, 0, width, height);

          try {
            const pngUrl = canvas.toDataURL('image/png');
            const downloadLink = document.createElement('a');
            downloadLink.href = pngUrl;
            downloadLink.download = 'kidpedia-architecture-flow.png';
            document.body.appendChild(downloadLink);
            downloadLink.click();
            document.body.removeChild(downloadLink);

            useNotificationStore.getState().addNotification({
              type: 'xp',
              title: 'Téléchargé !',
              message: 'L\'image PNG haute résolution autonome a été téléchargée.',
              icon: '🖼️',
              duration: 3000
            });
          } catch (e) {
            console.error('[FlowDashboard] PNG Export error :', e);
            alert('Impossible de générer le fichier PNG.');
          }
        }
        URL.revokeObjectURL(svgUrl);
      };

      img.onerror = (err) => {
        console.error('[FlowDashboard] Image load error :', err);
        alert('Erreur lors du chargement des ressources graphiques.');
        URL.revokeObjectURL(svgUrl);
      };

      img.src = svgUrl;
    } else {
      alert('Le diagramme de flux n\'a pas pu être trouvé.');
    }
  };

  return (
    <div className={styles.container}>
      <PageHeader 
        title="Visualisateur de Flux" 
        icon="🛠️" 
        onBack={onBack} 
      />

      <div className={styles.content}>
        <div className={styles.card}>
          <div className={styles.headerActions}>
            <h3 className={styles.title}>🗺️ Cartographie & Flux de Données</h3>
            <div className={styles.actionButtons}>
              <AppButton variant="outline" onClick={handleCopyCode}>
                📋 Copier le code
              </AppButton>
              <AppButton variant="outline" onClick={handleDownloadSVG}>
                💾 Télécharger SVG
              </AppButton>
              <AppButton onClick={handleDownloadPNG}>
                🖼️ Télécharger PNG
              </AppButton>
            </div>
          </div>

          <p className={styles.description}>
            Ce diagramme interactif représente l'architecture globale en 4 couches de l'application **KidPedia**. 
            Il illustre comment les actions de l'utilisateur circulent depuis les vues, mettent à jour 
            la gestion d'état Zustand persistante, se lient aux bases de données statiques et déclenchent 
            les animations et effets visuels ou sonores.
          </p>

          {/* Interactive Layer filters */}
          <span className={styles.filterLabel}>🔍 Mettre en valeur une couche technique :</span>
          <div className={styles.filterBar}>
            <button 
              className={`${styles.filterBtn} ${styles.filterBtnAll} ${highlightedLayer === 'all' ? styles.filterBtnActive : ''}`}
              onClick={() => setHighlightedLayer('all')}
            >
              🔄 Tout afficher
            </button>
            <button 
              className={`${styles.filterBtn} ${styles.dotEntry} ${highlightedLayer === 'entry' ? styles.filterBtnActive : ''}`}
              onClick={() => handleToggleHighlight('entry')}
            >
              🏁 Points d'Entrée
            </button>
            <button 
              className={`${styles.filterBtn} ${styles.dotViews} ${highlightedLayer === 'views' ? styles.filterBtnActive : ''}`}
              onClick={() => handleToggleHighlight('views')}
            >
              🎬 Vues / Pages
            </button>
            <button 
              className={`${styles.filterBtn} ${styles.dotComponents} ${highlightedLayer === 'components' ? styles.filterBtnActive : ''}`}
              onClick={() => handleToggleHighlight('components')}
            >
              🎨 Composants Graphiques
            </button>
            <button 
              className={`${styles.filterBtn} ${styles.dotStores} ${highlightedLayer === 'stores' ? styles.filterBtnActive : ''}`}
              onClick={() => handleToggleHighlight('stores')}
            >
              🤖 Zustand Stores
            </button>
            <button 
              className={`${styles.filterBtn} ${styles.dotData} ${highlightedLayer === 'data' ? styles.filterBtnActive : ''}`}
              onClick={() => handleToggleHighlight('data')}
            >
              📂 Bases de Données
            </button>
            <button 
              className={`${styles.filterBtn} ${styles.dotHooks} ${highlightedLayer === 'hooks' ? styles.filterBtnActive : ''}`}
              onClick={() => handleToggleHighlight('hooks')}
            >
              ⚙️ Hooks & Feedback
            </button>
          </div>

          {/* Map Viewer Panel with Floating Controls */}
          <div className={styles.diagramOuterWrapper}>
            <div className={styles.zoomControls}>
              <button className={styles.zoomBtn} onClick={handleZoomIn} title="Zoom +">+</button>
              <span className={styles.zoomLevel}>{Math.round(zoomScale * 100)}%</span>
              <button className={styles.zoomBtn} onClick={handleZoomOut} title="Zoom -">-</button>
              <button className={styles.zoomBtn} onClick={handleZoomReset} title="Réinitialiser" style={{ fontSize: '0.8rem' }}>🔄</button>
            </div>
            
            <div 
              className={`${styles.diagramWrapper} mermaid-interactive-container`}
              data-highlight={highlightedLayer}
              style={{ transform: `scale(${zoomScale})` }}
            >
              <MermaidDiagram chart={PROJECT_FLOW_CHART} />
            </div>
          </div>

          {/* Legend Grid */}
          <div className={styles.legendGrid}>
            <div className={styles.legendItem} onClick={() => handleToggleHighlight('entry')}>
              <div className={`${styles.legendDot} ${styles.dotEntry}`} />
              <span>Point d'Entrée</span>
            </div>
            <div className={styles.legendItem} onClick={() => handleToggleHighlight('views')}>
              <div className={`${styles.legendDot} ${styles.dotViews}`} />
              <span>Couche Views (Pages)</span>
            </div>
            <div className={styles.legendItem} onClick={() => handleToggleHighlight('components')}>
              <div className={`${styles.legendDot} ${styles.dotComponents}`} />
              <span>Composants Graphiques</span>
            </div>
            <div className={styles.legendItem} onClick={() => handleToggleHighlight('stores')}>
              <div className={`${styles.legendDot} ${styles.dotStores}`} />
              <span>Zustand Stores (État)</span>
            </div>
            <div className={styles.legendItem} onClick={() => handleToggleHighlight('data')}>
              <div className={`${styles.legendDot} ${styles.dotData}`} />
              <span>Bases de Données Statiques</span>
            </div>
            <div className={styles.legendItem} onClick={() => handleToggleHighlight('hooks')}>
              <div className={`${styles.legendDot} ${styles.dotHooks}`} />
              <span>Hooks & Helpers</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlowDashboard;
