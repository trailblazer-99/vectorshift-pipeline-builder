import React from 'react';
import { Handle, Position } from 'reactflow';
import { useStore } from '../store';

export const BaseNode = ({
  id,
  selected,
  title,
  icon,
  typeTag,
  handles = [],
  category = 'io', // 'io', 'logic', or 'integration'
  style = {},
  children,
}) => {
  const onNodesChange = useStore((state) => state.onNodesChange);
  const onEdgesChange = useStore((state) => state.onEdgesChange);
  const edges = useStore((state) => state.edges);

  const handleDelete = (e) => {
    e.stopPropagation();
    // Remove the node
    onNodesChange([{ id, type: 'remove' }]);
    // Remove any connected edges
    const edgesToRemove = edges.filter((edge) => edge.source === id || edge.target === id);
    if (edgesToRemove.length > 0) {
      onEdgesChange(edgesToRemove.map((edge) => ({ id: edge.id, type: 'remove' })));
    }
  };

  const titleWords = title.split(' ');
  const titleFirst = titleWords[0];
  const titleSecond = titleWords.slice(1).join(' ');

  return (
    <div className={`custom-node node-cat-${category} ${selected ? 'selected' : ''}`} style={style}>
      {/* Header */}
      <div className="node-header">
        <div className="node-title-container">
          {icon && <span className="node-icon">{icon}</span>}
          <span className="node-title">
            <span>{titleFirst}</span>
            {titleSecond && <span className="node-title-accent"> {titleSecond}</span>}
          </span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          {typeTag && <span className="node-type-tag">{typeTag}</span>}
          <button
            onClick={handleDelete}
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--text-secondary)',
              cursor: 'pointer',
              fontSize: '1rem',
              padding: '0 2px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'color 0.2s',
            }}
            onMouseEnter={(e) => (e.target.style.color = '#ef4444')}
            onMouseLeave={(e) => (e.target.style.color = 'var(--text-secondary)')}
            title="Delete Node"
          >
            &times;
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="node-content">
        {children}
      </div>

      {/* Handles */}
      {handles.map((handle, idx) => {
        const isLeft = handle.position === Position.Left;
        const topVal = handle.style?.top || '50%';
        
        return (
          <div key={idx}>
            <Handle
              type={handle.type}
              position={handle.position}
              id={handle.id}
              style={handle.style}
              className={`custom-handle ${
                handle.type === 'target' ? 'custom-handle-target' : 'custom-handle-source'
              }`}
            />
            {handle.label && (
              <span
                className={`handle-label ${isLeft ? 'handle-label-left' : 'handle-label-right'}`}
                style={{ top: topVal }}
              >
                {handle.label}
              </span>
            )}
          </div>
        );
      })}
    </div>
  );
};
