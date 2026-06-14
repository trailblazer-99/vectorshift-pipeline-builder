import React from 'react';

export const DraggableNode = ({ type, label, icon, category = 'io' }) => {
  const onDragStart = (event, nodeType) => {
    const appData = { nodeType };
    event.target.style.cursor = 'grabbing';
    event.dataTransfer.setData('application/reactflow', JSON.stringify(appData));
    event.dataTransfer.effectAllowed = 'move';
  };

  const labelWords = label.split(' ');
  const labelFirst = labelWords[0];
  const labelSecond = labelWords.slice(1).join(' ');

  return (
    <div
      className={`draggable-pill pill-cat-${category}`}
      onDragStart={(event) => onDragStart(event, type)}
      onDragEnd={(event) => (event.target.style.cursor = 'grab')}
      draggable
    >
      {icon && <span style={{ fontSize: '1rem' }}>{icon}</span>}
      <span>
        <span>{labelFirst}</span>
        {labelSecond && <span className="pill-title-accent"> {labelSecond}</span>}
      </span>
    </div>
  );
};