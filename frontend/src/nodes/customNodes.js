// src/nodes/customNodes.js
import React from 'react';
import { BaseNode } from './BaseNode';

// 1. MCP Gateway Connector
export const MCPNode = ({ id }) => (
  <BaseNode id={id} title="MCP Gateway" inputs={[{ name: 'query' }]} outputs={[{ name: 'context' }, { name: 'schema' }]}>
    <div style={{ color: '#64748B', fontSize: '12px' }}>Unified Model Context Protocol Server</div>
  </BaseNode>
);

// 3. Dynamic Intent Context Router
export const RouterNode = ({ id }) => (
  <BaseNode id={id} title="Context Identification" inputs={[{ name: 'payload' }]} outputs={[{ name: 'rag_path' }, { name: 'data_fill_path' }]}>
    <div style={{ color: '#4F46E5', fontSize: '12px', fontWeight: '500' }}>State-based Router Layer</div>
  </BaseNode>
);

// 5 & 7. Self-Healing Evaluator Block
export const EvalNode = ({ id }) => (
  <BaseNode id={id} title="Self-Healing Eval" inputs={[{ name: 'raw_data' }]} outputs={[{ name: 'healing_feedback' }]}>
    <div style={{ color: '#059669', fontSize: '12px' }}>Proactive background verification</div>
  </BaseNode>
);

// 6. Human-in-the-Loop Steering Interrupt
export const HITLNode = ({ id }) => (
  <BaseNode id={id} title="HITL Interrupt" inputs={[{ name: 'eval_stream' }]} outputs={[{ name: 'approved_data' }, { name: 'rollback_signal' }]}>
    <div style={{ color: '#D97706', fontSize: '12px' }}>Manual oversight steering breakpoint</div>
  </BaseNode>
);