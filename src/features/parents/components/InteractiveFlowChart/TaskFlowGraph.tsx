import React, { useState, useEffect, useCallback } from 'react';
import {
  ReactFlow,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
} from '@xyflow/react';
import type { Connection, Edge, Node } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { TaskNode } from './customNodes';

const nodeTypes = {
  taskNode: TaskNode,
};

export const TaskFlowGraph: React.FC = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState<Node>([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState<Edge>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Improvements State
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  // Editing state
  const [editingNodeId, setEditingNodeId] = useState<string | null>(null);
  const [editLabel, setEditLabel] = useState('');
  const [editPriority, setEditPriority] = useState<'high' | 'medium' | 'low'>('medium');
  const [editStatus, setEditStatus] = useState<'todo' | 'in_progress' | 'done'>('todo');
  const [editAssignee, setEditAssignee] = useState('');

  // New task inputs state
  const [label, setLabel] = useState('');
  const [priority, setPriority] = useState<'high' | 'medium' | 'low'>('medium');
  const [status, setStatus] = useState<'todo' | 'in_progress' | 'done'>('todo');
  const [assignee, setAssignee] = useState('');

  // Save tasks to server
  const saveTasks = useCallback(async (currentNodes: Node[], currentEdges: Edge[]) => {
    try {
      // Clean nodes data before saving (remove functions like onDelete)
      const cleanNodes = currentNodes.map(node => {
        const cleanData = { ...node.data };
        delete cleanData.onDelete;
        return {
          id: node.id,
          type: node.type,
          position: node.position,
          data: cleanData
        };
      });

      await fetch('/api/tasks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nodes: cleanNodes, edges: currentEdges }),
      });
    } catch (err) {
      console.error('Error saving tasks:', err);
    }
  }, []);

  // Handle Delete Node
  const handleDeleteNode = useCallback(
    (idToDelete: string) => {
      setNodes((nds) => {
        const filteredNodes = nds.filter((n) => n.id !== idToDelete);
        setEdges((eds) => {
          const filteredEdges = eds.filter((e) => e.source !== idToDelete && e.target !== idToDelete);
          saveTasks(filteredNodes, filteredEdges);
          return filteredEdges;
        });
        return filteredNodes;
      });
    },
    [setNodes, setEdges, saveTasks]
  );

  // Fetch tasks
  const fetchTasks = useCallback(async () => {
    try {
      const res = await fetch('/api/tasks');
      const data = await res.json();
      
      // Inject onDelete function to each node data
      const processedNodes = ((data.nodes as Node[]) || []).map((node) => ({
        ...node,
        type: 'taskNode',
        data: {
          ...node.data,
          onDelete: handleDeleteNode,
        }
      }));

      setNodes(processedNodes);
      setEdges((data.edges as Edge[]) || []);
      setError(null);
    } catch (err) {
      console.error('Error fetching tasks:', err);
      setError('Impossible de charger les tâches.');
    } finally {
      setLoading(false);
    }
  }, [setNodes, setEdges, handleDeleteNode]);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsFullscreen(false);
        setEditingNodeId(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isFullscreen]);

  // Add edge connection
  const onConnect = useCallback(
    (params: Connection) => {
      setEdges((eds) => {
        const newEds = addEdge({ ...params, animated: true }, eds);
        saveTasks(nodes, newEds);
        return newEds;
      });
    },
    [nodes, setEdges, saveTasks]
  );

  // Handle Drag stop to save position
  const onNodeDragStop = useCallback(() => {
    saveTasks(nodes, edges);
  }, [nodes, edges, saveTasks]);

  // Handle Double Click to edit
  const onNodeDoubleClick = useCallback((_e: React.MouseEvent, node: Node) => {
    setEditingNodeId(node.id);
    setEditLabel(String(node.data?.label || ''));
    setEditPriority((node.data?.priority as 'high' | 'medium' | 'low') || 'medium');
    setEditStatus((node.data?.status as 'todo' | 'in_progress' | 'done') || 'todo');
    setEditAssignee(String(node.data?.assignee || ''));
  }, []);

  // Handle Create Task
  const handleCreateTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!label.trim()) return;

    const newId = String(Date.now());
    const newNode: Node = {
      id: newId,
      type: 'taskNode',
      position: {
        x: 100 + Math.random() * 200,
        y: 100 + Math.random() * 200,
      },
      data: {
        label,
        priority,
        status,
        assignee: assignee.trim() || undefined,
        onDelete: handleDeleteNode,
      },
    };

    const updatedNodes = [...nodes, newNode];
    setNodes(updatedNodes);
    saveTasks(updatedNodes, edges);

    // Reset fields
    setLabel('');
    setAssignee('');
  };

  // Handle Save Task Edit
  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingNodeId || !editLabel.trim()) return;

    setNodes(nds => {
      const updated = nds.map(node => {
        if (node.id === editingNodeId) {
          return {
            ...node,
            data: {
              ...node.data,
              label: editLabel,
              priority: editPriority,
              status: editStatus,
              assignee: editAssignee.trim() || undefined
            }
          };
        }
        return node;
      });
      saveTasks(updated, edges);
      return updated;
    });

    setEditingNodeId(null);
  };

  // Clear all tasks
  const handleClearAll = () => {
    if (window.confirm('Voulez-vous vraiment effacer toutes les tâches de ce projet ?')) {
      setNodes([]);
      setEdges([]);
      saveTasks([], []);
    }
  };

  // Map nodes styling based on search term
  const displayedNodes = nodes.map(node => {
    const nodeLabel = String(node.data?.label || '').toLowerCase();
    const nodeAssignee = String(node.data?.assignee || '').toLowerCase();
    const search = searchTerm.toLowerCase();
    const isMatch = nodeLabel.includes(search) || nodeAssignee.includes(search);

    return {
      ...node,
      style: {
        ...node.style,
        opacity: searchTerm ? (isMatch ? 1 : 0.2) : 1,
        transition: 'opacity 0.25s, box-shadow 0.25s',
        boxShadow: searchTerm && isMatch ? '0 0 25px rgba(139, 92, 246, 0.9)' : undefined,
        border: searchTerm && isMatch ? '2px dashed #a5b4fc' : undefined
      }
    };
  });

  if (loading) {
    return (
      <div style={{ color: '#9ca3af', padding: '2rem', textAlign: 'center', fontFamily: 'sans-serif' }}>
        Chargement des tâches...
      </div>
    );
  }

  // Fullscreen container styles
  const containerStyle: React.CSSProperties = isFullscreen
    ? {
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 9999,
        background: '#0e0e13',
        display: 'flex',
        flexDirection: 'column'
      }
    : {
        display: 'flex',
        flexDirection: 'column',
        height: '600px',
        width: '100%'
      };

  return (
    <div style={containerStyle}>
      {/* Upper Panel: Task creation */}
      <form onSubmit={handleCreateTask} style={{
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

      {/* Control panel for Search, Fullscreen, and Clear */}
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
            onClick={handleClearAll}
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

      {/* Main Flow Canvas */}
      <div style={{ flex: 1, position: 'relative', background: '#0e0e13' }}>
        {error && (
          <div style={{
            position: 'absolute',
            top: '12px',
            left: '12px',
            background: 'rgba(239, 68, 68, 0.2)',
            border: '1px solid #ef4444',
            color: '#fca5a5',
            padding: '8px 16px',
            borderRadius: '6px',
            zIndex: 10,
            fontSize: '0.8rem'
          }}>
            ⚠️ {error}
          </div>
        )}

        <div style={{
          position: 'absolute',
          bottom: '12px',
          left: '12px',
          background: 'rgba(0,0,0,0.6)',
          backdropFilter: 'blur(4px)',
          color: '#9ca3af',
          padding: '6px 12px',
          borderRadius: '4px',
          fontSize: '0.75rem',
          zIndex: 10,
          pointerEvents: 'none'
        }}>
          💡 Double-cliquez sur une tâche pour la modifier.
        </div>

        <ReactFlow
          nodes={displayedNodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onNodeDragStop={onNodeDragStop}
          onNodeDoubleClick={onNodeDoubleClick}
          nodeTypes={nodeTypes}
          fitView
        >
          <Controls style={{ background: '#1f1f2e', color: '#fff', border: '1px solid rgba(255,255,255,0.1)' }} />
          <Background color="#2d2d3d" gap={16} size={1} />
        </ReactFlow>

        {/* Edit Task Inline Modal */}
        {editingNodeId && (
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
            <form onSubmit={handleSaveEdit} style={{
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
                  onClick={() => setEditingNodeId(null)}
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
        )}
      </div>
    </div>
  );
};
export default TaskFlowGraph;
