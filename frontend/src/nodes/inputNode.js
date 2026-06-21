// src/nodes/inputNode.js
import { useState } from 'react';
import { BaseNode } from './BaseNode';

export const InputNode = ({ id, data }) => {
  // Keep your original state logic exactly the same
  const [currName, setCurrName] = useState(data?.inputName || id.replace('customInput-', 'input_'));
  const [inputType, setInputType] = useState(data.inputType || 'Text');

  return (
    // 1. Wrap everything in BaseNode. Pass it its target inputs (none) and source outputs (id-value)
    <BaseNode id={id} title="Input Module" inputs={[]} outputs={[{ name: 'value' }]}>
      
      {/* 2. Everything below here is passed as "children" and renders inside the card body */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <label style={{ display: 'flex', flexDirection: 'column', fontSize: '12px' }}>
          Name:
          <input 
            type="text" 
            value={currName} 
            onChange={(e) => setCurrName(e.target.value)} 
            style={{ padding: '4px', border: '1px solid #BFB7A4', borderRadius: '2px', marginTop: '2px' }}
          />
        </label>
        
        <label style={{ display: 'flex', flexDirection: 'column', fontSize: '12px' }}>
          Type:
          <select 
            value={inputType} 
            onChange={(e) => setInputType(e.target.value)}
            style={{ padding: '4px', border: '1px solid #BFB7A4', borderRadius: '2px', marginTop: '2px', background: '#fff' }}
          >
            <option value="Text">Text</option>
            <option value="File">File</option>
          </select>
        </label>
      </div>

    </BaseNode>
  );
};