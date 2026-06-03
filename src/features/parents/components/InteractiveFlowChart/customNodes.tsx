import React from 'react';
import { Handle, Position } from '@xyflow/react';
import type { NodeProps, BuiltInNode } from '@xyflow/react';

export interface TaskNodeData extends Record<string, unknown> {
  label: string;
  status: 'todo' | 'in_progress' | 'done';
  priority: 'high' | 'medium' | 'low';
  assignee?: string;
  onDelete?: (id: string) => void;
}

export type TaskNodeProps = NodeProps<BuiltInNode & { data: TaskNodeData }>;

export const TaskNode: React.FC<TaskNodeProps> = ({ id, data }) => {
  const getPriorityColor = () => {
    switch (data.priority) {
      case 'high': return '#ef4444'; // Red
      case 'medium': return '#f59e0b'; // Amber
      case 'low': return '#10b981'; // Emerald
      default: return '#8b5cf6';
    }
  };

  const getStatusBadge = () => {
    switch (data.status) {
      case 'done': return { text: 'Terminé', bg: 'rgba(16, 185, 129, 0.2)', color: '#34d399', dot: '#10b981' };
      case 'in_progress': return { text: 'En cours', bg: 'rgba(59, 130, 246, 0.2)', color: '#60a5fa', dot: '#3b82f6' };
      default: return { text: 'À faire', bg: 'rgba(156, 163, 175, 0.2)', color: '#d1d5db', dot: '#9ca3af' };
    }
  };

  const badge = getStatusBadge();

  return (
    <div style={{
      background: 'rgba(30, 30, 40, 0.85)',
      backdropFilter: 'blur(10px)',
      border: `1.5px solid ${getPriorityColor()}`,
      borderRadius: '12px',
      padding: '12px',
      color: '#f3f4f6',
      fontSize: '0.85rem',
      fontFamily: 'Inter, system-ui, sans-serif',
      boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.3)',
      width: '200px',
      position: 'relative',
      transition: 'all 0.2s ease'
    }}>
      <Handle type="target" position={Position.Top} style={{ background: '#8b5cf6', width: '8px', height: '8px' }} />
      
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
        <span style={{
          fontSize: '0.7rem',
          padding: '2px 8px',
          borderRadius: '20px',
          background: badge.bg,
          color: badge.color,
          fontWeight: 'bold',
          display: 'flex',
          alignItems: 'center',
          gap: '4px'
        }}>
          <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: badge.dot, display: 'inline-block' }} />
          {badge.text}
        </span>
        
        {data.onDelete && (
          <button 
            onClick={() => data.onDelete?.(id)}
            style={{
              background: 'transparent',
              border: 'none',
              color: '#9ca3af',
              cursor: 'pointer',
              fontSize: '0.85rem',
              padding: '0 4px',
              transition: 'color 0.2s'
            }}
            onMouseOver={(e) => (e.currentTarget.style.color = '#ef4444')}
            onMouseOut={(e) => (e.currentTarget.style.color = '#9ca3af')}
          >
            ✕
          </button>
        )}
      </div>

      {/* Title */}
      <div style={{ fontWeight: 600, color: '#ffffff', marginBottom: '8px', lineHeight: '1.3' }}>
        {data.label}
      </div>

      {/* Footer info */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.7rem', color: '#9ca3af' }}>
        <span>Prio: <strong style={{ color: getPriorityColor() }}>{data.priority.toUpperCase()}</strong></span>
        {data.assignee && (
          <span style={{ background: 'rgba(255, 255, 255, 0.1)', padding: '1px 6px', borderRadius: '4px' }}>
            👤 {data.assignee}
          </span>
        )}
      </div>

      <Handle type="source" position={Position.Bottom} style={{ background: '#8b5cf6', width: '8px', height: '8px' }} />
    </div>
  );
};

export interface CodeNodeData extends Record<string, unknown> {
  label: string;
  path: string;
  group: string;
}

export type CodeNodeProps = NodeProps<BuiltInNode & { data: CodeNodeData }>;

export const CodeNode: React.FC<CodeNodeProps> = ({ data }) => {
  const getGroupColor = () => {
    switch (data.group) {
      case 'components': return '#2dd4bf'; // Teal
      case 'pages': return '#a855f7'; // Purple
      case 'store': return '#6366f1'; // Indigo
      case 'hooks': return '#ec4899'; // Pink
      case 'routes': return '#3b82f6'; // Blue
      case 'features': return '#f43f5e'; // Rose
      case 'utils': return '#10b981'; // Green
      case 'root': return '#e2e8f0'; // White/Gray
      default: return '#f59e0b'; // Amber
    }
  };

  return (
    <div style={{
      background: 'rgba(20, 20, 25, 0.9)',
      border: `2px solid ${getGroupColor()}`,
      borderRadius: '8px',
      padding: '8px 12px',
      color: '#ffffff',
      fontSize: '0.75rem',
      fontFamily: 'monospace',
      boxShadow: '0 4px 15px rgba(0,0,0,0.4)',
      minWidth: '120px',
      textAlign: 'center',
      transition: 'transform 0.15s ease'
    }}
    title={data.path}>
      <Handle type="target" position={Position.Left} style={{ background: getGroupColor(), width: '6px', height: '6px' }} />
      <div style={{ fontWeight: 'bold' }}>{data.label}</div>
      <div style={{ fontSize: '0.6rem', color: '#9ca3af', marginTop: '2px' }}>{data.group}</div>
      <Handle type="source" position={Position.Right} style={{ background: getGroupColor(), width: '6px', height: '6px' }} />
    </div>
  );
};
