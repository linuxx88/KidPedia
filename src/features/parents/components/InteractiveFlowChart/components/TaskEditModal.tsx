import React from 'react';

interface TaskEditModalProps {
  editLabel: string;
  setEditLabel: (val: string) => void;
  editPriority: 'high' | 'medium' | 'low';
  setEditPriority: (val: 'high' | 'medium' | 'low') => void;
  editStatus: 'todo' | 'in_progress' | 'done';
  setEditStatus: (val: 'todo' | 'in_progress' | 'done') => void;
  editAssignee: string;
  setEditAssignee: (val: string) => void;
  onCancel: () => void;
  onSubmit: (e: React.FormEvent) => void;
}

export const TaskEditModal: React.FC<TaskEditModalProps> = ({
  editLabel,
  setEditLabel,
  editPriority,
  setEditPriority,
  editStatus,
  setEditStatus,
  editAssignee,
  setEditAssignee,
  onCancel,
  onSubmit
}) => {
  return (
    <div style={{
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      background: 'rgba(0, 0, 0, 0.65)',
      backdropFilter: 'blur(4px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 20
    }}>
      <form onSubmit={onSubmit} style={{
        background: '#1a1a24',
        border: '1px solid rgba(255,255,255,0.12)',
        borderRadius: '12px',
        padding: '24px',
        width: '320px',
        display: 'flex',
        flexDirection: 'column',
        gap: '14px',
        boxShadow: '0 20px 50px rgba(0,0,0,0.5)',
        color: '#fff',
        fontFamily: 'Inter, sans-serif'
      }}>
        <h4 style={{ margin: '0 0 4px 0', fontSize: '1.1rem' }}>✏️ Modifier la tâche</h4>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          <label style={{ fontSize: '0.75rem', color: '#9ca3af' }}>Nom</label>
          <input
            type="text"
            value={editLabel}
            onChange={(e) => setEditLabel(e.target.value)}
            style={{
              background: 'rgba(255,255,255,0.06)',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: '6px',
              padding: '8px',
              color: '#fff',
              fontSize: '0.85rem'
            }}
          />
        </div>

        <div style={{ display: 'flex', gap: '10px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', flex: 1 }}>
            <label style={{ fontSize: '0.75rem', color: '#9ca3af' }}>Priorité</label>
            <select
              value={editPriority}
              onChange={(e) => setEditPriority(e.target.value as 'high' | 'medium' | 'low')}
              style={{
                background: '#1a1a24',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '6px',
                padding: '8px',
                color: '#fff',
                fontSize: '0.85rem'
              }}
            >
              <option value="high">Haute</option>
              <option value="medium">Moyenne</option>
              <option value="low">Basse</option>
            </select>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', flex: 1 }}>
            <label style={{ fontSize: '0.75rem', color: '#9ca3af' }}>Statut</label>
            <select
              value={editStatus}
              onChange={(e) => setEditStatus(e.target.value as 'todo' | 'in_progress' | 'done')}
              style={{
                background: '#1a1a24',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '6px',
                padding: '8px',
                color: '#fff',
                fontSize: '0.85rem'
              }}
            >
              <option value="todo">À faire</option>
              <option value="in_progress">En cours</option>
              <option value="done">Terminé</option>
            </select>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          <label style={{ fontSize: '0.75rem', color: '#9ca3af' }}>Assigné à</label>
          <input
            type="text"
            value={editAssignee}
            onChange={(e) => setEditAssignee(e.target.value)}
            style={{
              background: 'rgba(255,255,255,0.06)',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: '6px',
              padding: '8px',
              color: '#fff',
              fontSize: '0.85rem'
            }}
          />
        </div>

        <div style={{ display: 'flex', gap: '8px', marginTop: '8px', justifyContent: 'flex-end' }}>
          <button
            type="button"
            onClick={onCancel}
            style={{
              background: 'transparent',
              border: '1px solid rgba(255,255,255,0.15)',
              color: '#cbd5e1',
              borderRadius: '6px',
              padding: '8px 14px',
              fontSize: '0.8rem',
              cursor: 'pointer'
            }}
          >
            Annuler
          </button>
          <button
            type="submit"
            style={{
              background: 'linear-gradient(135deg, #8b5cf6 0%, #6d28d9 100%)',
              border: 'none',
              color: '#fff',
              borderRadius: '6px',
              padding: '8px 14px',
              fontSize: '0.8rem',
              cursor: 'pointer',
              fontWeight: '600'
            }}
          >
            Enregistrer
          </button>
        </div>
      </form>
    </div>
  );
};
