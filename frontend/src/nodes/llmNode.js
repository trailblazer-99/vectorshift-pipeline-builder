import React from 'react';
import { Position } from 'reactflow';
import { BaseNode } from './BaseNode';
import { Brain } from 'lucide-react';

export const LLMNode = ({ id, selected, data }) => {
  const handles = [
    {
      type: 'target',
      position: Position.Left,
      id: `${id}-system`,
      style: { top: '33%' },
      label: 'System',
    },
    {
      type: 'target',
      position: Position.Left,
      id: `${id}-prompt`,
      style: { top: '66%' },
      label: 'Prompt',
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
      title="LLM Engine"
      icon={<Brain size={14} />}
      typeTag="LLM"
      category="logic"
      handles={handles}
    >
      <div className="node-description">
        Runs a large language model with custom system guidelines and prompts.
      </div>
    </BaseNode>
  );
};
