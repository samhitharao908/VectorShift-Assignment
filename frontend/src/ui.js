// src/ui.js
import { useState, useRef, useCallback, useEffect } from 'react';
import ReactFlow, { Controls, Background, MiniMap, addEdge, useNodesState, useEdgesState } from 'reactflow';
import { useStore } from './store';
import { shallow } from 'zustand/shallow';
import { InputNode } from './nodes/inputNode';
import { LLMNode } from './nodes/llmNode';
import { OutputNode } from './nodes/outputNode';
import { TextNode } from './nodes/textNode';
import { MCPNode, RouterNode, EvalNode, HITLNode } from './nodes/customNodes';

import 'reactflow/dist/style.css';

const gridSize = 20;
const proOptions = { hideAttribution: true };

const nodeTypes = {
  customInput: InputNode,
  llm: LLMNode,
  customOutput: OutputNode,
  text: TextNode,
  mcpNode: MCPNode,
  routerNode: RouterNode,
  evalNode: EvalNode,
  hitlNode: HITLNode
};

export const ExtendedUI = () => {
  const reactFlowWrapper = useRef(null);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  
  // Track active demo mode workspace
  const [activeWorkspace, setActiveWorkspace] = useState('HappyPath');

  // Unified global store tools
  const { addNode, getNodeID } = useStore((state) => ({
    addNode: state.addNode,
    getNodeID: state.getNodeID
  }), shallow);

  // Separate Local State Channels for each walkthrough path to preserve layout
  const [happyNodes, setHappyNodes, onHappyNodesChange] = useNodesState([]);
  const [happyEdges, setHappyEdges, onHappyEdgesChange] = useEdgesState([]);
  
  const [errorNodes, setErrorNodes, onErrorNodesChange] = useNodesState([]);
  const [errorEdges, setErrorEdges, onErrorEdgesChange] = useEdgesState([]);

  // Dynamically surface the correct graph parameters to React Flow based on chosen tab
  const nodes = activeWorkspace === 'HappyPath' ? happyNodes : errorNodes;
  const edges = activeWorkspace === 'HappyPath' ? happyEdges : errorEdges;
  const onNodesChange = activeWorkspace === 'HappyPath' ? onHappyNodesChange : onErrorNodesChange;
  const onEdgesChange = activeWorkspace === 'HappyPath' ? onHappyEdgesChange : onErrorEdgesChange;
  const setNodes = activeWorkspace === 'HappyPath' ? setHappyNodes : setErrorNodes;
  const setEdges = activeWorkspace === 'HappyPath' ? setHappyEdges : setErrorEdges;

  const onConnect = useCallback((params) => {
    setEdges((eds) => addEdge({ ...params, type: 'smoothstep', animated: true }, eds));
  }, [setEdges]);

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const onDrop = useCallback((event) => {
    event.preventDefault();
    if (!reactFlowInstance) return;

    const appData = JSON.parse(event.dataTransfer.getData('application/reactflow'));
    const type = appData?.nodeType;
    if (!type) return;

    const position = reactFlowInstance.project({
      x: event.clientX - reactFlowWrapper.current.getBoundingClientRect().left,
      y: event.clientY - reactFlowWrapper.current.getBoundingClientRect().top,
    });

    const nodeId = getNodeID(type);
    const newNode = {
      id: nodeId,
      type,
      position,
      data: { id: nodeId, nodeType: type }
    };

    setNodes((nds) => nds.concat(newNode));
    addNode(newNode);
  }, [reactFlowInstance, addNode, getNodeID, setNodes]);

  // Expose active graph structural metrics back to our global fetch execution loop
  useEffect(() => {
    useStore.setState({ nodes, edges });
  }, [nodes, edges]);

  return (
    <div ref={reactFlowWrapper} style={{ width: '100%', height: '70vh', position: 'relative' }}>
      
      {/* Real Product Demo Workspace Tab Select Bar */}
      <div style={{
        position: 'absolute',
        top: '15px',
        left: '20px',
        zIndex: 10,
        background: '#FFFFFF',
        padding: '4px',
        borderRadius: '8px',
        border: '1px solid #E2E8F0',
        display: 'flex',
        gap: '4px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.04)'
      }}>
        <button
          onClick={() => setActiveWorkspace('HappyPath')}
          style={{
            padding: '6px 14px',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
            fontSize: '12px',
            fontWeight: '500',
            background: activeWorkspace === 'HappyPath' ? '#4F46E5' : 'transparent',
            color: activeWorkspace === 'HappyPath' ? '#FFFFFF' : '#64748B',
            transition: 'all 0.15s ease'
          }}
        >
          Scenario A: Happy Path
        </button>
        <button
          onClick={() => setActiveWorkspace('DependencyError')}
          style={{
            padding: '6px 14px',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
            fontSize: '12px',
            fontWeight: '500',
            background: activeWorkspace === 'DependencyError' ? '#EF4444' : 'transparent',
            color: activeWorkspace === 'DependencyError' ? '#FFFFFF' : '#64748B',
            transition: 'all 0.15s ease'
          }}
        >
          Scenario B: Latent Dependency Error
        </button>
      </div>

      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onDrop={onDrop}
        onDragOver={onDragOver}
        onInit={setReactFlowInstance}
        nodeTypes={nodeTypes}
        proOptions={proOptions}
        snapGrid={[gridSize, gridSize]}
        connectionLineType="smoothstep"
      >
        <Background color="#CBD5E1" gap={gridSize} size={1} />
        <Controls position="bottom-left" />
        <MiniMap style={{ background: '#F8FAFC' }} zoomable pannable />
      </ReactFlow>
    </div>
  );
};