import React, { useState, useEffect } from 'react';
import { Position } from 'reactflow';
import { BaseNode } from './BaseNode';
import { useStore } from '../store';
import { PenTool } from 'lucide-react';

export const PromptNode = ({ id, selected, data }) => {
  const [template, setTemplate] = useState(data?.template || 'Hello {{name}}, welcome to {{topic}}!');
  const [variables, setVariables] = useState([]);

  const updateNodeField = useStore((state) => state.updateNodeField);

  useEffect(() => {
    const regex = /\{\{\s*([a-zA-Z_$][a-zA-Z0-9_$]*)\s*\}\}/g;
    const foundVars = [];
    let match;
    while ((match = regex.exec(template)) !== null) {
      const varName = match[1];
      if (!foundVars.includes(varName)) {
        foundVars.push(varName);
      }
    }
    setVariables(foundVars);
  }, [template]);

  const handleTemplateChange = (e) => {
    const val = e.target.value;
    setTemplate(val);
    updateNodeField(id, 'template', val);
  };

  const handles = [
    {
      type: 'source',
      position: Position.Right,
      id: `${id}-prompt`,
      label: 'Prompt',
    },
    ...variables.map((v, index) => {
      const count = variables.length;
      const topVal = count > 1 
        ? `${((index + 0.5) / count) * 100}%` 
        : '50%';
        
      return {
        type: 'target',
        position: Position.Left,
        id: `${id}-${v}`,
        style: { top: topVal },
        label: v,
      };
    }),
  ];

  const handlesMinHeight = variables.length * 30 + 80;

  return (
    <BaseNode
      id={id}
      selected={selected}
      title="Prompt Template"
      icon={<PenTool size={14} />}
      typeTag="Prompt"
      category="io"
      handles={handles}
      style={{ minHeight: `${Math.max(handlesMinHeight, 140)}px` }}
    >
      <div className="node-field">
        <label className="node-field-label">Template</label>
        <textarea
          value={template}
          onChange={handleTemplateChange}
          className="node-textarea"
          style={{ height: '70px' }}
          placeholder="Define prompt with {{variable}}..."
        />
      </div>
    </BaseNode>
  );
};
