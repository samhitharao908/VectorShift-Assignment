// src/nodes/outputNode.js
import { useState } from 'react';
import { BaseNode } from './BaseNode';

export const OutputNode = ({ id, data }) => {
  const [currName, setCurrName] = useState(data?.outputName || id.replace('customOutput-', 'output_'));
  const [outputType, setOutputType] = useState(data.outputType || 'Text');

  return (
    // FIX: Ensure inputs has the array slot and outputs is completely empty []
    <BaseNode id={id} title="Output Module" inputs={[{ name: 'value' }]} outputs={[]}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <label style={{ display: 'flex', flexDirection: 'column', fontSize: '12px' }}>
          Name:
          <input 
            type="text" 
            value={currName} 
            onChange={(e) => setCurrName(e.target.value)} 
            style={{ padding: '4px', border: '1px solid #CBD5E1', borderRadius: '4px', marginTop: '2px' }}
          />
        </label>
        
        <label style={{ display: 'flex', flexDirection: 'column', fontSize: '12px' }}>
          Type:
          <select 
            value={outputType} 
            onChange={(e) => setOutputType(e.target.value)}
            style={{ padding: '4px', border: '1px solid #CBD5E1', borderRadius: '4px', marginTop: '2px', background: '#fff' }}
          >
            <option value="Text">Text</option>
            <option value="File">Image</option>
          </select>
        </label>
      </div>
    </BaseNode>
  );
};