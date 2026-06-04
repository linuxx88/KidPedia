import React, { useState } from 'react';
import { AppButton } from '../../../../components/UI/AppButton';
import { MermaidDiagram } from '../MermaidDiagram/MermaidDiagram';
import { PROJECT_FLOW_CHART } from './flowData';
import { TaskFlowGraph } from './TaskFlowGraph';
import { CodeDepsGraph } from './CodeDepsGraph';
import { GitTimeline } from './GitTimeline';
import { ConsoleLogs } from './ConsoleLogs';
import { useFlowChartZoom } from './hooks/useFlowChartZoom';
import { useFlowChartExporter } from './hooks/useFlowChartExporter';
import styles from './InteractiveFlowChart.module.css';

type LayerType = 'all' | 'entry' | 'views' | 'components' | 'stores' | 'data' | 'hooks';
type TabType = 'tasks' | 'code' | 'git' | 'mermaid' | 'logs';

export const InteractiveFlowChart: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>('tasks');
  const [highlightedLayer, setHighlightedLayer] = useState<LayerType>('all');
  
  const { zoomScale, handleZoomIn, handleZoomOut, handleZoomReset } = useFlowChartZoom(1.0);
  const { handleCopyCode, handleDownloadSVG, handleDownloadPNG } = useFlowChartExporter();

  const handleToggleHighlight = (layer: LayerType) => {
    setHighlightedLayer(prev => prev === layer ? 'all' : layer);
  };

  return (
    <div style={{ color: '#fff', fontFamily: 'Inter, system-ui, sans-serif', padding: '10px' }}>
      {/* Dev Dashboard Tab Navbar */}
      <div style={{
        display: 'flex',
        gap: '10px',
        marginBottom: '28px',
        borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
        paddingBottom: '16px',
        flexWrap: 'wrap'
      }}>
        <button
          onClick={() => setActiveTab('tasks')}
          style={{
            background: activeTab === 'tasks' ? 'rgba(139, 92, 246, 0.25)' : 'rgba(255, 255, 255, 0.04)',
            border: activeTab === 'tasks' ? '1px solid #8b5cf6' : '1px solid rgba(255, 255, 255, 0.1)',
            color: activeTab === 'tasks' ? '#ffffff' : '#cbd5e1',
            padding: '10px 18px',
            borderRadius: '8px',
            cursor: 'pointer',
            fontWeight: '600',
            fontSize: '0.9rem',
            transition: 'all 0.2s',
            boxShadow: activeTab === 'tasks' ? '0 0 12px rgba(139, 92, 246, 0.3)' : 'none'
          }}
        >
          📋 Graphe des Tâches (Work Chart)
        </button>

        <button
          onClick={() => setActiveTab('code')}
          style={{
            background: activeTab === 'code' ? 'rgba(139, 92, 246, 0.25)' : 'rgba(255, 255, 255, 0.04)',
            border: activeTab === 'code' ? '1px solid #8b5cf6' : '1px solid rgba(255, 255, 255, 0.1)',
            color: activeTab === 'code' ? '#ffffff' : '#cbd5e1',
            padding: '10px 18px',
            borderRadius: '8px',
            cursor: 'pointer',
            fontWeight: '600',
            fontSize: '0.9rem',
            transition: 'all 0.2s',
            boxShadow: activeTab === 'code' ? '0 0 12px rgba(139, 92, 246, 0.3)' : 'none'
          }}
        >
          🧬 Dépendances du Code
        </button>

        <button
          onClick={() => setActiveTab('git')}
          style={{
            background: activeTab === 'git' ? 'rgba(139, 92, 246, 0.25)' : 'rgba(255, 255, 255, 0.04)',
            border: activeTab === 'git' ? '1px solid #8b5cf6' : '1px solid rgba(255, 255, 255, 0.1)',
            color: activeTab === 'git' ? '#ffffff' : '#cbd5e1',
            padding: '10px 18px',
            borderRadius: '8px',
            cursor: 'pointer',
            fontWeight: '600',
            fontSize: '0.9rem',
            transition: 'all 0.2s',
            boxShadow: activeTab === 'git' ? '0 0 12px rgba(139, 92, 246, 0.3)' : 'none'
          }}
        >
          🌿 Flux Git & Commits
        </button>

        <button
          onClick={() => setActiveTab('mermaid')}
          style={{
            background: activeTab === 'mermaid' ? 'rgba(139, 92, 246, 0.25)' : 'rgba(255, 255, 255, 0.04)',
            border: activeTab === 'mermaid' ? '1px solid #8b5cf6' : '1px solid rgba(255, 255, 255, 0.1)',
            color: activeTab === 'mermaid' ? '#ffffff' : '#cbd5e1',
            padding: '10px 18px',
            borderRadius: '8px',
            cursor: 'pointer',
            fontWeight: '600',
            fontSize: '0.9rem',
            transition: 'all 0.2s',
            boxShadow: activeTab === 'mermaid' ? '0 0 12px rgba(139, 92, 246, 0.3)' : 'none'
          }}
        >
          🗺️ Cartographie Statique
        </button>

        <button
          onClick={() => setActiveTab('logs')}
          style={{
            background: activeTab === 'logs' ? 'rgba(139, 92, 246, 0.25)' : 'rgba(255, 255, 255, 0.04)',
            border: activeTab === 'logs' ? '1px solid #8b5cf6' : '1px solid rgba(255, 255, 255, 0.1)',
            color: activeTab === 'logs' ? '#ffffff' : '#cbd5e1',
            padding: '10px 18px',
            borderRadius: '8px',
            cursor: 'pointer',
            fontWeight: '600',
            fontSize: '0.9rem',
            transition: 'all 0.2s',
            boxShadow: activeTab === 'logs' ? '0 0 12px rgba(139, 92, 246, 0.3)' : 'none'
          }}
        >
          ⌨️ Console & Logs
        </button>
      </div>

      {/* TABS CONTENT */}

      {/* 1. Tasks Flow Graph */}
      {activeTab === 'tasks' && (
        <div>
          <div style={{ marginBottom: '16px' }}>
            <h3 style={{ margin: '0 0 4px 0', fontSize: '1.2rem', color: '#fff' }}>📋 Work Chart du Projet</h3>
            <p style={{ margin: 0, fontSize: '0.85rem', color: '#9ca3af' }}>
              Planifiez le travail en liant les tâches les unes aux autres. Les modifications sont sauvegardées en temps réel.
            </p>
          </div>
          <div style={{ background: 'rgba(25, 25, 35, 0.4)', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.06)', overflow: 'hidden' }}>
            <TaskFlowGraph />
          </div>
        </div>
      )}

      {/* 2. Code Dependencies Graph */}
      {activeTab === 'code' && (
        <div>
          <div style={{ marginBottom: '16px' }}>
            <h3 style={{ margin: '0 0 4px 0', fontSize: '1.2rem', color: '#fff' }}>🧬 Dépendances entre fichiers source (AST)</h3>
            <p style={{ margin: 0, fontSize: '0.85rem', color: '#9ca3af' }}>
              Cartographie dynamique des importations de modules au sein du dossier <code style={{ background: 'rgba(255,255,255,0.1)', padding: '2px 4px', borderRadius: '4px', fontFamily: 'monospace' }}>src/</code>.
            </p>
          </div>
          <div style={{ background: 'rgba(25, 25, 35, 0.4)', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.06)', overflow: 'hidden' }}>
            <CodeDepsGraph />
          </div>
        </div>
      )}

      {/* 3. Git Timeline */}
      {activeTab === 'git' && (
        <div>
          <div style={{ marginBottom: '16px' }}>
            <h3 style={{ margin: '0 0 4px 0', fontSize: '1.2rem', color: '#fff' }}>🌿 Dépôt Git & Historique</h3>
            <p style={{ margin: 0, fontSize: '0.85rem', color: '#9ca3af' }}>
              Suivi de la copie de travail locale et des derniers commits. Se synchronise automatiquement.
            </p>
          </div>
          <GitTimeline />
        </div>
      )}

      {/* 5. Virtual Console Terminal Logs */}
      {activeTab === 'logs' && (
        <div>
          <div style={{ marginBottom: '16px' }}>
            <h3 style={{ margin: '0 0 4px 0', fontSize: '1.2rem', color: '#fff' }}>⌨️ Console & Terminal Virtuel</h3>
            <p style={{ margin: 0, fontSize: '0.85rem', color: '#9ca3af' }}>
              Capture en temps réel de tous les messages de la console de l'application (logs, warnings et erreurs).
            </p>
          </div>
          <ConsoleLogs />
        </div>
      )}

      {/* 4. Mermaid Flow Chart */}
      {activeTab === 'mermaid' && (
        <>
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
        </>
      )}
    </div>
  );
};
export default InteractiveFlowChart;
