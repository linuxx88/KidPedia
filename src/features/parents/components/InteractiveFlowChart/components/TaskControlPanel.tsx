import React from 'react';

interface TaskControlPanelProps {
  searchTerm: string;
  setSearchTerm: (val: string) => void;
  isFullscreen: boolean;
  setIsFullscreen: (val: boolean) => void;
  onClearAll: () => void;
}

export const TaskControlPanel: React.FC<TaskControlPanelProps> = ({
  searchTerm,
  setSearchTerm,
  isFullscreen,
  setIsFullscreen,
  onClearAll
}) => {
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '10px 16px',
      background: 'rgba(15, 15, 25, 0.8)',
      borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
      gap: '12px',
      flexWrap: 'wrap'
    }}>
      {/* Search */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flex: 1, minWidth: '200px' }}>
        <span style={{ fontSize: '0.85rem', color: '#9ca3af' }}>🔍</span>
        <input
          type="text"
          placeholder="Rechercher une tâche ou personne..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            background: 'transparent',
            border: 'none',
            borderBottom: '1px solid rgba(255,255,255,0.2)',
            color: '#fff',
            fontSize: '0.85rem',
            width: '100%',
            outline: 'none',
            padding: '4px 0'
          }}
        />
      </div>

      {/* Action Buttons */}
      <div style={{ display: 'flex', gap: '8px' }}>
        <button
          onClick={() => setIsFullscreen(!isFullscreen)}
          style={{
            background: 'rgba(255,255,255,0.06)',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: '6px',
            color: '#fff',
            fontSize: '0.8rem',
            padding: '6px 12px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '6px'
          }}
        >
          {isFullscreen ? '🗗 Réduire' : '🗖 Plein écran'}
        </button>

        <button
          onClick={onClearAll}
          style={{
            background: 'rgba(239, 68, 68, 0.1)',
            border: '1px solid rgba(239, 68, 68, 0.3)',
            borderRadius: '6px',
            color: '#fca5a5',
            fontSize: '0.8rem',
            padding: '6px 12px',
            cursor: 'pointer'
          }}
        >
          🗑️ Tout effacer
        </button>
      </div>
    </div>
  );
};
