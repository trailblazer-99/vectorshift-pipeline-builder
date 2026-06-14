import React from 'react';
import { DraggableNode } from './draggableNode';
import { useStore } from './store';
import { 
  Download, 
  Upload, 
  FileText, 
  PenTool, 
  Brain, 
  GitFork, 
  Globe, 
  Database, 
  Key 
} from 'lucide-react';

export const PipelineToolbar = () => {
  const themeMode = useStore((state) => state.themeMode);
  const setThemeMode = useStore((state) => state.setThemeMode);

  const handleThemeCycle = () => {
    if (themeMode === 'system') {
      setThemeMode('light');
    } else if (themeMode === 'light') {
      setThemeMode('dark');
    } else {
      setThemeMode('system');
    }
  };

  const getThemeLabel = () => {
    if (themeMode === 'system') return '💻 Auto';
    if (themeMode === 'light') return '☀️ Light';
    return '🌙 Dark';
  };

  return (
    <div className="toolbar-container">
      <div className="toolbar-title" style={{ display: 'flex', justifyContent: 'space-between', width: '100%', alignItems: 'center' }}>
        <div>
          Vector<span className="logo-shift">Shift</span>
        </div>
        <button 
          type="button" 
          onClick={handleThemeCycle}
          className="theme-toggle-btn"
          title={`Active Theme: ${themeMode.toUpperCase()}. Click to cycle (Auto -> Light -> Dark).`}
          style={{ minWidth: '95px' }}
        >
          {getThemeLabel()}
        </button>
      </div>
      <div className="toolbar-sections">
        {/* Core IO Section */}
        <div className="toolbar-section">
          <div className="toolbar-section-label">General & IO</div>
          <div className="toolbar-items">
            <DraggableNode type="customInput" label="Input" icon={<Download size={15} />} category="io" />
            <DraggableNode type="customOutput" label="Output" icon={<Upload size={15} />} category="io" />
            <DraggableNode type="text" label="Text" icon={<FileText size={15} />} category="io" />
            <DraggableNode type="prompt" label="Prompt" icon={<PenTool size={15} />} category="io" />
          </div>
        </div>

        {/* AI & Logic Section */}
        <div className="toolbar-section">
          <div className="toolbar-section-label">AI & Logic</div>
          <div className="toolbar-items">
            <DraggableNode type="llm" label="LLM Engine" icon={<Brain size={15} />} category="logic" />
            <DraggableNode type="conditional" label="Conditional" icon={<GitFork size={15} />} category="logic" />
          </div>
        </div>

        {/* Integrations Section */}
        <div className="toolbar-section">
          <div className="toolbar-section-label">Integrations</div>
          <div className="toolbar-items">
            <DraggableNode type="api" label="API Call" icon={<Globe size={15} />} category="integration" />
            <DraggableNode type="database" label="Database Query" icon={<Database size={15} />} category="integration" />
            <DraggableNode type="auth" label="Auth Key" icon={<Key size={15} />} category="integration" />
          </div>
        </div>
      </div>
    </div>
  );
};
