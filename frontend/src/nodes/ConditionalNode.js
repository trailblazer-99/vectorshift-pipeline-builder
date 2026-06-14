import React, { useState } from 'react';
import { Position } from 'reactflow';
import { BaseNode } from './BaseNode';
import { useStore } from '../store';
import { GitFork } from 'lucide-react';

export const ConditionalNode = ({ id, selected, data }) => {
  const [condition, setCondition] = useState(data?.condition || 'equals');
  const [value, setValue] = useState(data?.value || '');

  const updateNodeField = useStore((state) => state.updateNodeField);

  const handleConditionChange = (e) => {
    const val = e.target.value;
    setCondition(val);
    updateNodeField(id, 'condition', val);
  };

  const handleValueChange = (e) => {
    const val = e.target.value;
    setValue(val);
    updateNodeField(id, 'value', val);
  };

  const handles = [
    {
      type: 'target',
      position: Position.Left,
      id: `${id}-input`,
      label: 'Input',
    },
    {
      type: 'source',
      position: Position.Right,
      id: `${id}-true`,
      style: { top: '33%' },
      label: 'True',
    },
    {
      type: 'source',
      position: Position.Right,
      id: `${id}-false`,
      style: { top: '66%' },
      label: 'False',
    },
  ];

  return (
    <BaseNode
      id={id}
      selected={selected}
      title="Conditional Router"
      icon={<GitFork size={14} style={{ transform: 'rotate(180deg)' }} />}
      typeTag="Branch"
      category="logic"
      handles={handles}
    >
      <div className="node-field">
        <label className="node-field-label">Condition</label>
        <select
          value={condition}
          onChange={handleConditionChange}
          className="node-select"
        >
          <option value="equals">Equals</option>
          <option value="contains">Contains</option>
          <option value="gt">Greater Than</option>
          <option value="lt">Less Than</option>
        </select>
      </div>
      <div className="node-field">
        <label className="node-field-label">Value</label>
        <input
          type="text"
          value={value}
          onChange={handleValueChange}
          className="node-input"
          placeholder="Compare value..."
        />
      </div>
    </BaseNode>
  );
};
