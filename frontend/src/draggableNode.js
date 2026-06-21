// draggableNode.js
import React from 'react';

export const DraggableNode = ({ type, label, IconComponent }) => {
    const onDragStart = (event, nodeType) => {
      const appData = { nodeType }
      event.target.style.cursor = 'grabbing';
      event.dataTransfer.setData('application/reactflow', JSON.stringify(appData));
      event.dataTransfer.effectAllowed = 'move';
    };
  
    return (
      <div
        className={type}
        onDragStart={(event) => onDragStart(event, type)}
        onDragEnd={(event) => (event.target.style.cursor = 'grab')}
        style={{ 
          cursor: 'grab', 
          width: '80px', 
          height: '68px',
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          borderRadius: '6px',
          border: '1px solid #E2E8F0',
          backgroundColor: '#FFFFFF',
          flexDirection: 'column',
          gap: '6px',
          boxShadow: '0 1px 2px rgba(0,0,0,0.02)',
          transition: 'all 0.15s ease'
        }} 
        draggable
      >
          {/* Render the clean SVG line icon component natively */}
          {IconComponent && (
            <div style={{ color: '#334155' }}>
              <IconComponent size={18} strokeWidth={1.5} />
            </div>
          )}
          
          <span style={{ 
            color: '#1E293B', 
            fontSize: '11px', 
            fontWeight: '400',
            fontFamily: "-apple-system, BlinkMacSystemFont, sans-serif"
          }}>
            {label}
          </span>
      </div>
    );
  };