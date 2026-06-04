import { useState, useEffect, useCallback } from 'react';
import { useNodesState, useEdgesState, addEdge } from '@xyflow/react';
import type { Connection, Edge, Node } from '@xyflow/react';

export const useTaskFlow = () => {
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

    let nextNum = 1;
    nodes.forEach(node => {
      const match = node.id.match(/^KP-(\d+)$/);
      if (match) {
        const num = parseInt(match[1], 10);
        if (num >= nextNum) {
          nextNum = num + 1;
        }
      }
    });
    const newId = `KP-${nextNum}`;

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

  return {
    nodes,
    edges,
    onNodesChange,
    onEdgesChange,
    onConnect,
    onNodeDragStop,
    onNodeDoubleClick,
    loading,
    error,
    isFullscreen,
    setIsFullscreen,
    searchTerm,
    setSearchTerm,
    editingNodeId,
    setEditingNodeId,
    editLabel,
    setEditLabel,
    editPriority,
    setEditPriority,
    editStatus,
    setEditStatus,
    editAssignee,
    setEditAssignee,
    label,
    setLabel,
    priority,
    setPriority,
    status,
    setStatus,
    assignee,
    setAssignee,
    handleCreateTask,
    handleSaveEdit,
    handleClearAll,
    displayedNodes,
  };
};
