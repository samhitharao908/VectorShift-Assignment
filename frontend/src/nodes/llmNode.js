// src/nodes/llmNode.js

import React from 'react';
import { BaseNode } from './BaseNode';

export const LLMNode = ({ id, data }) => (
  <BaseNode id={id} title="LLM" inputs={[{ name: 'token' }]} outputs={[{ name: 'userSession' }]}>
    <span style={{ fontSize: '12px' }}>This is a LLM.</span>
  </BaseNode>
);
