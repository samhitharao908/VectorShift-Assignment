// src/nodes/textNode.js
import React, { useState, useEffect } from 'react';
import { BaseNode } from './BaseNode';
import { useStore } from '../store'; // Import our memory bank store hook

export const TextNode = ({ id, data }) => {
  const [currText, setCurrText] = useState(data?.text || '{{evalNode-1.healing_feedback}}');
  const [dynamicInputs, setDynamicInputs] = useState([{ name: 'pipeline_stream' }]);
  
  // Grab the global update handler from the store state
  const updateNodeField = useStore((state) => state.updateNodeField);

  useEffect(() => {
    const regex = /\{\{\s*([a-zA-Z0-9_-]+)(?:\.[a-zA-Z0-9_-]+)?\s*\}\}/g;
    const detectedVariables = [{ name: 'pipeline_stream' }];
    let matchedPattern;
    
    while ((matchedPattern = regex.exec(currText)) !== null) {
      const variableName = matchedPattern[1];
      if (!detectedVariables.some(v => v.name === variableName)) {
        detectedVariables.push({ name: variableName });
      }
    }
    setDynamicInputs(detectedVariables);
    
    // CRITICAL: Keep our global backend data payload in perfect sync on every change!
    updateNodeField(id, 'text', currText);
  }, [currText, id, updateNodeField]);

  const handleTextChange = (e) => {
    setCurrText(e.target.value);
  };

  return (
    <BaseNode id={id} title="Text Template" inputs={dynamicInputs} outputs={[{ name: 'output' }]}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
        <label style={{ display: 'flex', flexDirection: 'column', fontSize: '12px' }}>
          Text content:
          <textarea 
            value={currText} 
            onChange={handleTextChange} 
            style={{
              width: '260px', 
              height: '80px', 
              padding: '6px',
              border: '1px solid #CBD5E1',
              borderRadius: '4px',
              resize: 'none',
              fontSize: '13px',
              outline: 'none',
              fontFamily: 'monospace',
              marginTop: '4px'
            }}
          />
        </label>
      </div>
    </BaseNode>
  );
};