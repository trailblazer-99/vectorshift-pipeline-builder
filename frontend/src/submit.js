import React, { useState } from 'react';
import { useStore } from './store';
import { shallow } from 'zustand/shallow';

const selector = (state) => ({
  nodes: state.nodes,
  edges: state.edges,
});

export const SubmitButton = () => {
  const { nodes, edges } = useStore(selector, shallow);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const backendUrl = process.env.REACT_APP_BACKEND_URL || 'http://localhost:8000';
      const response = await fetch(`${backendUrl}/pipelines/parse`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nodes, edges }),
      });

      if (!response.ok) {
        throw new Error('Server responded with an error');
      }

      const data = await response.json();
      setResult(data);
      setShowModal(true);
    } catch (error) {
      console.error('Submission error:', error);
      const backendHost = process.env.REACT_APP_BACKEND_URL || 'localhost:8000';
      alert(`Error: Could not connect to the backend server at ${backendHost}.`);
    } finally {
      setLoading(false);
    }
  };

  const closeModal = () => {
    setShowModal(false);
    setResult(null);
  };

  return (
    <>
      <div className="submit-panel">
        <button 
          type="button" 
          onClick={handleSubmit} 
          disabled={loading}
          className="glow-btn"
        >
          {loading ? (
            <>
              <span style={{
                display: 'inline-block',
                width: '14px',
                height: '14px',
                border: '2px solid rgba(255,255,255,0.3)',
                borderTopColor: '#fff',
                borderRadius: '50%',
                animation: 'spin 0.8s linear infinite',
                marginRight: '6px'
              }} />
              Processing...
            </>
          ) : (
            'Submit Pipeline'
          )}
        </button>
      </div>

      {showModal && result && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">Pipeline Status</div>
            
            <div className={`modal-status-badge ${result.is_dag ? 'status-valid' : 'status-invalid'}`}>
              {result.is_dag ? '🟢 Directed Acyclic Graph (DAG) - Valid' : '🔴 Cycle Detected - Invalid'}
            </div>

            <div className="modal-stats-grid">
              <div className="stat-card">
                <span className="stat-val">{result.num_nodes}</span>
                <span className="stat-label">Total Nodes</span>
              </div>
              <div className="stat-card">
                <span className="stat-val">{result.num_edges}</span>
                <span className="stat-label">Total Edges</span>
              </div>
            </div>

            <button className="modal-close-btn" onClick={closeModal}>
              Close Dashboard
            </button>
          </div>
        </div>
      )}

      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </>
  );
};
