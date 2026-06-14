import React, { useState, useEffect } from 'react';
import { Position } from 'reactflow';
import { BaseNode } from './BaseNode';
import { useStore } from '../store';
import { FileText } from 'lucide-react';

export const TextNode = ({ id, selected, data }) => {
  const [currText, setCurrText] = useState(data?.text || '{{input}}');
  const [variables, setVariables] = useState([]);

  const updateNodeField = useStore((state) => state.updateNodeField);

  // Parse variables from text enclosed in double curly brackets: {{variable}}
  useEffect(() => {
    const regex = /\{\{\s*([a-zA-Z_$][a-zA-Z0-9_$]*)\s*\}\}/g;
    const foundVars = [];
    let match;
    while ((match = regex.exec(currText)) !== null) {
      const varName = match[1];
      if (!foundVars.includes(varName)) {
        foundVars.push(varName);
      }
    }
    setVariables(foundVars);
  }, [currText]);

  const handleTextChange = (e) => {
    const val = e.target.value;
    setCurrText(val);
    updateNodeField(id, 'text', val);
  };

  // Determine handles based on parsed variables
  const handles = [
    // Output handle is always present on the right
    {
      type: 'source',
      position: Position.Right,
      id: `${id}-output`,
      label: 'Output',
    },
    // Dynamic target handles on the left for variables
    ...variables.map((v, index) => {
      // Calculate distributed top position
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

  // Dynamic dimensions based on text content and number of variables
  const lines = currText.split('\n');
  const maxLineLength = Math.max(...lines.map((l) => l.length), 15);
  const nodeWidth = Math.min(Math.max(maxLineLength * 7.5 + 40, 250), 550);
  const handlesMinHeight = variables.length * 30 + 80;
  const nodeHeight = Math.min(Math.max(lines.length * 20 + 110, handlesMinHeight, 140), 450);

  return (
    <BaseNode
      id={id}
      selected={selected}
      title="Text block"
      icon={<FileText size={14} />}
      typeTag="Text"
      category="io"
      handles={handles}
      style={{ width: `${nodeWidth}px`, minHeight: `${nodeHeight}px` }}
    >
      <div className="node-field" style={{ flexGrow: 1 }}>
        <label className="node-field-label">Content</label>
        <textarea
          value={currText}
          onChange={handleTextChange}
          className="node-textarea"
          style={{ height: `${lines.length * 20 + 10}px`, flexGrow: 1 }}
          placeholder="Type something, e.g. {{variable}}..."
        />
      </div>
    </BaseNode>
  );
};
