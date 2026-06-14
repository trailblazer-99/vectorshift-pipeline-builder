import React, { useState } from 'react';
import { Position } from 'reactflow';
import { BaseNode } from './BaseNode';
import { useStore } from '../store';
import { Download } from 'lucide-react';

export const InputNode = ({ id, selected, data }) => {
  const [currName, setCurrName] = useState(data?.inputName || id.replace('customInput-', 'input_'));
  const [inputType, setInputType] = useState(data?.inputType || 'Text');
  
  const updateNodeField = useStore((state) => state.updateNodeField);

  const handleNameChange = (e) => {
    const val = e.target.value;
    setCurrName(val);
    updateNodeField(id, 'inputName', val);
  };

  const handleTypeChange = (e) => {
    const val = e.target.value;
    setInputType(val);
    updateNodeField(id, 'inputType', val);
  };

  const handles = [
    {
      type: 'source',
      position: Position.Right,
      id: `${id}-value`,
      label: 'Value',
    },
  ];

  return (
    <BaseNode
      id={id}
      selected={selected}
      title="Input Source"
      icon={<Download size={14} />}
      typeTag="Input"
      category="io"
      handles={handles}
    >
      <div className="node-field">
        <label className="node-field-label">Name</label>
        <input
          type="text"
          value={currName}
          onChange={handleNameChange}
          className="node-input"
        />
      </div>
      <div className="node-field">
        <label className="node-field-label">Type</label>
        <select
          value={inputType}
          onChange={handleTypeChange}
          className="node-select"
        >
          <option value="Text">Text</option>
          <option value="File">File</option>
        </select>
      </div>
    </BaseNode>
  );
};
