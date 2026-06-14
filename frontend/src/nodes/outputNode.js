import React, { useState } from 'react';
import { Position } from 'reactflow';
import { BaseNode } from './BaseNode';
import { useStore } from '../store';
import { Upload } from 'lucide-react';

export const OutputNode = ({ id, selected, data }) => {
  const [currName, setCurrName] = useState(data?.outputName || id.replace('customOutput-', 'output_'));
  const [outputType, setOutputType] = useState(data?.outputType || 'Text');

  const updateNodeField = useStore((state) => state.updateNodeField);

  const handleNameChange = (e) => {
    const val = e.target.value;
    setCurrName(val);
    updateNodeField(id, 'outputName', val);
  };

  const handleTypeChange = (e) => {
    const val = e.target.value;
    setOutputType(val);
    updateNodeField(id, 'outputType', val);
  };

  const handles = [
    {
      type: 'target',
      position: Position.Left,
      id: `${id}-value`,
      label: 'Value',
    },
  ];

  return (
    <BaseNode
      id={id}
      selected={selected}
      title="Output Destination"
      icon={<Upload size={14} />}
      typeTag="Output"
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
          value={outputType}
          onChange={handleTypeChange}
          className="node-select"
        >
          <option value="Text">Text</option>
          <option value="Image">Image</option>
        </select>
      </div>
    </BaseNode>
  );
};
