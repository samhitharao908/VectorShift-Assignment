// BaseNode.js
import React from 'react';
import { Handle, Position } from 'reactflow';

export const BaseNode = ({ id, title, inputs = [], outputs = [], children }) => {
  return (
    <div style={{
      background: '#FFFFFF',
      color: '#1E293B',
      border: '1px solid #CBD5E1',
      borderRadius: '8px',
      padding: '14px',
      minWidth: '220px',
      boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05), 0 2px 4px -1px rgba(0,0,0,0.03)',
      fontFamily: "-apple-system, BlinkMacSystemFont, sans-serif"
    }}>
      {/* Target Connections (Left Pins) */}
      {inputs.map((input, idx) => (
        <Handle
          key={`${id}-in-${idx}`}
          type="target"
          position={Position.Left}
          id={`${id}-${input.name}`}
          style={{ 
            top: `${(idx + 1) * (100 / (inputs.length + 1))}%`, 
            background: '#3B82F6', // Product blue accent indicator pins
            border: '2px solid #FFFFFF',
            width: '10px',
            height: '10px'
          }}
        />
      ))}

      {/* Header Label Style */}
      <div style={{ 
        fontSize: '11px', 
        fontWeight: '600',
        textTransform: 'uppercase', 
        letterSpacing: '0.05em',
        color: '#64748B', 
        marginBottom: '10px'
      }}>
        {title}
      </div>

      {/* Internal Body Slot */}
      <div style={{ fontSize: '13px' }}>{children}</div>

      {/* Source Connections (Right Pins) */}
      {outputs.map((output, idx) => (
        <Handle
          key={`${id}-out-${idx}`}
          type="source"
          position={Position.Right}
          id={`${id}-${output.name}`}
          style={{ 
            top: `${(idx + 1) * (100 / (outputs.length + 1))}%`, 
            background: '#3B82F6',
            border: '2px solid #FFFFFF',
            width: '10px',
            height: '10px'
          }}
        />
      ))}
    </div>
  );
};