import React, { useState } from 'react';
import { Position } from 'reactflow';
import { BaseNode } from './BaseNode';
import { useStore } from '../store';
import { Key } from 'lucide-react';

export const AuthNode = ({ id, selected, data }) => {
  const [authType, setAuthType] = useState(data?.authType || 'API Key');
  const [keyName, setKeyName] = useState(data?.keyName || 'OPENAI_API_KEY');

  const updateNodeField = useStore((state) => state.updateNodeField);

  const handleAuthTypeChange = (e) => {
    const val = e.target.value;
    setAuthType(val);
    updateNodeField(id, 'authType', val);
  };

  const handleKeyNameChange = (e) => {
    const val = e.target.value;
    setKeyName(val);
    updateNodeField(id, 'keyName', val);
  };

  const handles = [
    {
      type: 'target',
      position: Position.Left,
      id: `${id}-trigger`,
      label: 'Trigger',
    },
    {
      type: 'source',
      position: Position.Right,
      id: `${id}-token`,
      label: 'Token',
    },
  ];

  return (
    <BaseNode
      id={id}
      selected={selected}
      title="Auth Credential"
      icon={<Key size={14} />}
      typeTag="Auth"
      category="integration"
      handles={handles}
    >
      <div className="node-field">
        <label className="node-field-label">Auth Provider</label>
        <select
          value={authType}
          onChange={handleAuthTypeChange}
          className="node-select"
        >
          <option value="API Key">API Key</option>
          <option value="OAuth2">OAuth2 Client</option>
          <option value="JWT">JWT Bearer</option>
        </select>
      </div>
      <div className="node-field">
        <label className="node-field-label">Secret Env Key</label>
        <input
          type="text"
          value={keyName}
          onChange={handleKeyNameChange}
          className="node-input"
          placeholder="ENV_VARIABLE_NAME"
        />
      </div>
    </BaseNode>
  );
};
