import React from 'react';

interface TaskCreationFormProps {
  label: string;
  setLabel: (val: string) => void;
  priority: 'high' | 'medium' | 'low';
  setPriority: (val: 'high' | 'medium' | 'low') => void;
  status: 'todo' | 'in_progress' | 'done';
  setStatus: (val: 'todo' | 'in_progress' | 'done') => void;
  assignee: string;
  setAssignee: (val: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  isFullscreen: boolean;
}

export const TaskCreationForm: React.FC<TaskCreationFormProps> = ({
  label,
  setLabel,
  priority,
  setPriority,
  status,
  setStatus,
  assignee,
  setAssignee,
  onSubmit,
  isFullscreen
}) => {
  return (
    <form onSubmit={onSubmit} style={{
      display: 'flex',
      gap: '12px',
      padding: '16px',
      background: 'rgba(25, 25, 35, 0.9)',
      borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
      flexWrap: 'wrap',
      alignItems: 'flex-end',
      borderRadius: isFullscreen ? '0' : '12px 12px 0 0'
    }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', flex: 1, minWidth: '150px' }}>
        <label style={{ fontSize: '0.75rem', color: '#9ca3af', fontWeight: 'bold' }}>Nouvelle tâche</label>
        <input
          type="text"
          placeholder="Nom de la tâche..."
          value={label}
          onChange={(e) => setLabel(e.target.value)}
          style={{
            background: 'rgba(255,255,255,0.05)',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: '6px',
            padding: '8px 12px',
            color: '#fff',
            fontSize: '0.85rem'
          }}
        />
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', width: '110px' }}>
        <label style={{ fontSize: '0.75rem', color: '#9ca3af', fontWeight: 'bold' }}>Priorité</label>
        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value as 'high' | 'medium' | 'low')}
          style={{
            background: 'rgba(25, 25, 35, 0.9)',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: '6px',
            padding: '8px 6px',
            color: '#fff',
            fontSize: '0.85rem'
          }}
        >
          <option value="high">Haute</option>
          <option value="medium">Moyenne</option>
          <option value="low">Basse</option>
        </select>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', width: '110px' }}>
        <label style={{ fontSize: '0.75rem', color: '#9ca3af', fontWeight: 'bold' }}>Statut</label>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value as 'todo' | 'in_progress' | 'done')}
          style={{
            background: 'rgba(25, 25, 35, 0.9)',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: '6px',
            padding: '8px 6px',
            color: '#fff',
            fontSize: '0.85rem'
          }}
        >
          <option value="todo">À faire</option>
          <option value="in_progress">En cours</option>
          <option value="done">Terminé</option>
        </select>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', width: '120px' }}>
        <label style={{ fontSize: '0.75rem', color: '#9ca3af', fontWeight: 'bold' }}>Assigné à</label>
        <input
          type="text"
          placeholder="Nom..."
          value={assignee}
          onChange={(e) => setAssignee(e.target.value)}
          style={{
            background: 'rgba(255,255,255,0.05)',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: '6px',
            padding: '8px 12px',
            color: '#fff',
            fontSize: '0.85rem'
          }}
        />
      </div>

      <button
        type="submit"
        style={{
          background: 'linear-gradient(135deg, #8b5cf6 0%, #6d28d9 100%)',
          border: 'none',
          borderRadius: '6px',
          color: '#fff',
          fontWeight: '600',
          fontSize: '0.85rem',
          padding: '9px 18px',
          cursor: 'pointer',
          boxShadow: '0 4px 12px rgba(139, 92, 246, 0.3)',
          transition: 'transform 0.1s'
        }}
      >
        Ajouter
      </button>
    </form>
  );
};
