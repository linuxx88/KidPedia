import React, { useState, useEffect, useCallback } from 'react';
import {
  ReactFlow,
  Controls,
  Background
} from '@xyflow/react';
import type { Node, Edge } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { CodeNode } from './customNodes';

const nodeTypes = {
  codeNode: CodeNode
};

const GROUPS_ORDER = ['root', 'routes', 'store', 'pages', 'features', 'components', 'hooks', 'utils', 'other'];

export const CodeDepsGraph: React.FC = () => {
  const [nodes, setNodes] = useState<Node[]>([]);
  const [edges, setEdges] = useState<Edge[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Improvements State
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [hoveredNodeId, setHoveredNodeId] = useState<string | null>(null);

  const fetchCodeDeps = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/deps');
      const data = await res.json();
      
      // Dynamic Column (Lane) layout
      const groupNodesMap = new Map<string, Node[]>();
      GROUPS_ORDER.forEach(g => groupNodesMap.set(g, []));
      
      const rawNodes = (data.nodes as Node[]) || [];
      rawNodes.forEach((node) => {
        const group = (node.data?.group as string) || 'other';
        const list = groupNodesMap.get(group) || groupNodesMap.get('other') || [];
        list.push(node);
      });

      const arrangedNodes: Node[] = [];
      
      // Layout constants
      const colWidth = 220;
      const rowHeight = 70;
      const maxNodesPerCol = 20;
      
      let colIndex = 0;
      GROUPS_ORDER.forEach(group => {
        const groupNodes = groupNodesMap.get(group) || [];
        if (groupNodes.length === 0) return;
        
        for (let i = 0; i < groupNodes.length; i += maxNodesPerCol) {
          const chunk = groupNodes.slice(i, i + maxNodesPerCol);
          chunk.forEach((node, rowIndex) => {
            arrangedNodes.push({
              ...node,
              type: 'codeNode',
              position: {
                x: colIndex * colWidth + 50,
                y: rowIndex * rowHeight + 80
              }
            });
          });
          colIndex++;
        }
      });

      setNodes(arrangedNodes);
      
      const uniqueEdges: Edge[] = [];
      const edgeIds = new Set<string>();
      ((data.edges as Edge[]) || []).forEach(edge => {
        if (!edgeIds.has(edge.id)) {
          edgeIds.add(edge.id);
          uniqueEdges.push(edge);
        }
      });
      setEdges(uniqueEdges);
      setError(null);
    } catch (err) {
      console.error('Error fetching code dependencies:', err);
      setError('Impossible de charger la cartographie du code.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCodeDeps();
  }, [fetchCodeDeps]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsFullscreen(false);
      }
    };
    if (isFullscreen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isFullscreen]);



  // Map nodes styling based on search term and hover tracing
  const displayedNodes = React.useMemo(() => {
    return nodes.map(node => {
      const nodeLabel = String(node.data?.label || '').toLowerCase();
      const nodePath = String(node.data?.path || '').toLowerCase();
      const search = searchTerm.toLowerCase();
      
      // Search matching
      const isSearchMatch = searchTerm ? (nodeLabel.includes(search) || nodePath.includes(search)) : true;
      
      const isActive = isSearchMatch;

      return {
        ...node,
        style: {
          ...node.style,
          opacity: isActive ? 1 : 0.12,
          transition: 'opacity 0.25s, box-shadow 0.25s',
          boxShadow: hoveredNodeId && node.id === hoveredNodeId 
            ? '0 0 25px rgba(45, 212, 191, 0.9)' 
            : (searchTerm && isSearchMatch ? '0 0 20px rgba(45, 212, 191, 0.6)' : undefined),
          border: searchTerm && isSearchMatch ? '2px dashed #2dd4bf' : undefined
        }
      };
    });
  }, [nodes, searchTerm, hoveredNodeId]);

  // Highlight active edges when hovered
  const displayedEdges = React.useMemo(() => {
    return edges.map(edge => {
      const isActive = hoveredNodeId ? (edge.source === hoveredNodeId || edge.target === hoveredNodeId) : false;
      return {
        ...edge,
        animated: edge.animated || isActive,
        style: {
          ...edge.style,
          stroke: isActive ? '#2dd4bf' : 'rgba(255,255,255,0.1)',
          strokeWidth: isActive ? 3 : 1,
          opacity: hoveredNodeId ? (isActive ? 1 : 0.05) : 1,
          transition: 'opacity 0.25s, stroke-width 0.25s'
        }
      };
    });
  }, [edges, hoveredNodeId]);

  const onNodeMouseEnter = useCallback((_e: React.MouseEvent, node: Node) => {
    setHoveredNodeId(node.id);
  }, []);

  const onNodeMouseLeave = useCallback(() => {
    setHoveredNodeId(null);
  }, []);

  // Fullscreen container styles
  const containerStyle: React.CSSProperties = isFullscreen
    ? {
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 9999,
        background: '#09090d',
        display: 'flex',
        flexDirection: 'column'
      }
    : {
        height: '600px',
        width: '100%',
        position: 'relative',
        background: '#09090d',
        borderRadius: '12px',
        display: 'flex',
        flexDirection: 'column'
      };

  return (
    <div style={containerStyle}>
      {/* Control panel for Search, Refresh and Fullscreen */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '10px 16px',
        background: 'rgba(15, 15, 25, 0.9)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
        gap: '12px',
        flexWrap: 'wrap',
        borderRadius: isFullscreen ? '0' : '12px 12px 0 0'
      }}>
        {/* Search */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flex: 1, minWidth: '200px' }}>
          <span style={{ fontSize: '0.85rem', color: '#9ca3af' }}>🔍</span>
          <input
            type="text"
            placeholder="Rechercher un fichier (ex: ExplorerSelector, topics)..."
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

        {/* Action buttons */}
        <div style={{ display: 'flex', gap: '8px' }}>
          <button
            onClick={() => fetchCodeDeps()}
            style={{
              background: 'rgba(255,255,255,0.06)',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: '6px',
              color: '#fff',
              fontSize: '0.8rem',
              padding: '6px 12px',
              cursor: 'pointer'
            }}
          >
            🔄 Actualiser
          </button>

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
        </div>
      </div>

      <div style={{ flex: 1, position: 'relative' }}>
        {loading && (
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: 'rgba(9,9,13,0.7)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 100,
            color: '#fff',
            fontFamily: 'sans-serif'
          }}>
            Mise à jour...
          </div>
        )}

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

        {/* Header Legend */}
        <div style={{
          position: 'absolute',
          top: '12px',
          right: '12px',
          background: 'rgba(20, 20, 30, 0.85)',
          backdropFilter: 'blur(8px)',
          border: '1px solid rgba(255,255,255,0.08)',
          borderRadius: '8px',
          padding: '10px 14px',
          zIndex: 10,
          fontSize: '0.7rem',
          color: '#f3f4f6',
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: '6px 12px',
          pointerEvents: 'none'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#2dd4bf' }} />
            <span>Components</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#a855f7' }} />
            <span>Pages</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#6366f1' }} />
            <span>Store</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#ec4899' }} />
            <span>Hooks</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#3b82f6' }} />
            <span>Routes</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#e2e8f0' }} />
            <span>Autres / Config</span>
          </div>
        </div>

        <ReactFlow
          key={nodes.length > 0 ? 'loaded' : 'loading'}
          nodes={displayedNodes}
          edges={displayedEdges}
          nodeTypes={nodeTypes}
          onNodeMouseEnter={onNodeMouseEnter}
          onNodeMouseLeave={onNodeMouseLeave}
          fitView
        >
          <Controls style={{ background: '#1f1f2e', color: '#fff', border: '1px solid rgba(255,255,255,0.1)' }} />
          <Background color="#232333" gap={20} size={1.2} />
        </ReactFlow>
      </div>
    </div>
  );
};
export default CodeDepsGraph;
