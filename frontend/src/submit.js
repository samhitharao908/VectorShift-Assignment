// src/submit.js
import React from 'react';
import { useReactFlow } from 'reactflow';

export const SubmitButton = () => {
  const { getNodes, getEdges } = useReactFlow();

  const handleSubmit = async () => {
    try {
      const response = await fetch('http://localhost:8000/pipelines/parse', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nodes: getNodes(), edges: getEdges() })
      });
      
      const data = await response.json();
      
      if (data.resolution_hint) {
        alert(
          `⚠️ WARNING: ${data.status}\n\n` +
          `• Total Nodes: ${data.num_nodes}\n` +
          `• Total Edges: ${data.num_edges}\n\n` +
          `Resolution Hint:\n${data.resolution_hint}`
        );
      } else {
        alert(
          `✅ SUCCESS: Pipeline Verified\n\n` +
          `• Nodes counted: ${data.num_nodes}\n` +
          `• Edges counted: ${data.num_edges}\n` +
          `• Valid Cyclic State Check: ${data.is_dag ? 'Yes (Pass)' : 'No'}`
        );
      }
    } catch (error) {
      alert('Error connecting to the system orchestration parser.');
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', margin: '20px' }}>
      <button 
        onClick={handleSubmit} 
        style={{ 
          padding: '12px 24px', 
          background: '#4F46E5', 
          color: '#FFFFFF', 
          border: 'none', 
          borderRadius: '4px', 
          cursor: 'pointer',
          fontWeight: '500'
        }}
      >
        Analyze Production Flow
      </button>
    </div>
  );
};