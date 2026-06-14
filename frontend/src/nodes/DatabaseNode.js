import React, { useState } from 'react';
import { Position } from 'reactflow';
import { BaseNode } from './BaseNode';
import { useStore } from '../store';
import { Database } from 'lucide-react';

export const DatabaseNode = ({ id, selected, data }) => {
  const [dbType, setDbType] = useState(data?.dbType || 'PostgreSQL');
  const [query, setQuery] = useState(data?.query || 'SELECT * FROM users LIMIT 10;');

  const updateNodeField = useStore((state) => state.updateNodeField);

  const handleDbTypeChange = (e) => {
    const val = e.target.value;
    setDbType(val);
    updateNodeField(id, 'dbType', val);
  };

  const handleQueryChange = (e) => {
    const val = e.target.value;
    setQuery(val);
    updateNodeField(id, 'query', val);
  };

  const handles = [
    {
      type: 'target',
      position: Position.Left,
      id: `${id}-params`,
      label: 'Params',
    },
    {
      type: 'source',
      position: Position.Right,
      id: `${id}-result`,
      label: 'Result',
    },
  ];

  return (
    <BaseNode
      id={id}
      selected={selected}
      title="Database Query"
      icon={<Database size={14} />}
      typeTag="DB"
      category="integration"
      handles={handles}
    >
      <div className="node-field">
        <label className="node-field-label">DB Type</label>
        <select
          value={dbType}
          onChange={handleDbTypeChange}
          className="node-select"
        >
          <option value="PostgreSQL">PostgreSQL</option>
          <option value="MySQL">MySQL</option>
          <option value="MongoDB">MongoDB</option>
          <option value="SQLite">SQLite</option>
        </select>
      </div>
      <div className="node-field">
        <label className="node-field-label">SQL/NoSQL Query</label>
        <textarea
          value={query}
          onChange={handleQueryChange}
          className="node-textarea"
          style={{ height: '60px' }}
          placeholder="Enter query here..."
        />
      </div>
    </BaseNode>
  );
};
