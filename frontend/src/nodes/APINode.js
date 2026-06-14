import React, { useState } from 'react';
import { Position } from 'reactflow';
import { BaseNode } from './BaseNode';
import { useStore } from '../store';
import { Globe } from 'lucide-react';

export const APINode = ({ id, selected, data }) => {
  const [method, setMethod] = useState(data?.method || 'GET');
  const [url, setUrl] = useState(data?.url || 'https://api.example.com/data');

  const updateNodeField = useStore((state) => state.updateNodeField);

  const handleMethodChange = (e) => {
    const val = e.target.value;
    setMethod(val);
    updateNodeField(id, 'method', val);
  };

  const handleUrlChange = (e) => {
    const val = e.target.value;
    setUrl(val);
    updateNodeField(id, 'url', val);
  };

  const handles = [
    {
      type: 'target',
      position: Position.Left,
      id: `${id}-payload`,
      label: 'Payload',
    },
    {
      type: 'source',
      position: Position.Right,
      id: `${id}-response`,
      label: 'Response',
    },
  ];

  return (
    <BaseNode
      id={id}
      selected={selected}
      title="API Request"
      icon={<Globe size={14} />}
      typeTag="API"
      category="integration"
      handles={handles}
    >
      <div className="node-field">
        <label className="node-field-label">HTTP Method</label>
        <select
          value={method}
          onChange={handleMethodChange}
          className="node-select"
        >
          <option value="GET">GET</option>
          <option value="POST">POST</option>
          <option value="PUT">PUT</option>
          <option value="DELETE">DELETE</option>
        </select>
      </div>
      <div className="node-field">
        <label className="node-field-label">Endpoint URL</label>
        <input
          type="text"
          value={url}
          onChange={handleUrlChange}
          className="node-input"
          placeholder="https://api.example.com"
        />
      </div>
    </BaseNode>
  );
};
