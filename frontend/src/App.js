// src/App.js
import { ReactFlowProvider } from 'reactflow';
import { PipelineToolbar } from './toolbar';
import { ExtendedUI } from './ui';
import { SubmitButton } from './submit';

function App() {
  return (
    // Wrap everything inside ReactFlowProvider so all sub-components share the same canvas data
    <ReactFlowProvider>
      <div style={{ background: '#F8FAFC', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <PipelineToolbar />
        <ExtendedUI />
        <SubmitButton />
      </div>
    </ReactFlowProvider>
  );
}

export default App;