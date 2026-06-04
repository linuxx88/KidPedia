import React from 'react';
import { ReactFlow, Controls, Background } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { TaskNode } from './customNodes';
import { useTaskFlow } from './hooks/useTaskFlow';
import { TaskCreationForm } from './components/TaskCreationForm';
import { TaskControlPanel } from './components/TaskControlPanel';
import { TaskEditModal } from './components/TaskEditModal';

const nodeTypes = {
  taskNode: TaskNode,
};

export const TaskFlowGraph: React.FC = () => {
  const {
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
  } = useTaskFlow();

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
      <TaskCreationForm
        label={label}
        setLabel={setLabel}
        priority={priority}
        setPriority={setPriority}
        status={status}
        setStatus={setStatus}
        assignee={assignee}
        setAssignee={setAssignee}
        onSubmit={handleCreateTask}
        isFullscreen={isFullscreen}
      />

      {/* Control panel for Search, Fullscreen, and Clear */}
      <TaskControlPanel
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        isFullscreen={isFullscreen}
        setIsFullscreen={setIsFullscreen}
        onClearAll={handleClearAll}
      />

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
          <TaskEditModal
            editLabel={editLabel}
            setEditLabel={setEditLabel}
            editPriority={editPriority}
            setEditPriority={setEditPriority}
            editStatus={editStatus}
            setEditStatus={setEditStatus}
            editAssignee={editAssignee}
            setEditAssignee={setEditAssignee}
            onCancel={() => setEditingNodeId(null)}
            onSubmit={handleSaveEdit}
          />
        )}
      </div>
    </div>
  );
};
export default TaskFlowGraph;
