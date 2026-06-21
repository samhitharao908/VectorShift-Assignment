// src/toolbar.js
import { useState } from 'react';
import { DraggableNode } from './draggableNode';
import { Download, Upload, FileText, Database, GitFork, ShieldCheck, UserCheck } from 'lucide-react';

export const PipelineToolbar = () => {
    const [activeTab, setActiveTab] = useState('Core');

    return (
        <div style={{ padding: '0 24px', background: '#FFFFFF', borderBottom: '1px solid #E2E8F0', fontFamily: 'sans-serif' }}>
            <div style={{ display: 'flex', gap: '20px', padding: '12px 0' }}>
                <button onClick={() => setActiveTab('Core')} style={{ background: 'none', border: 'none', color: activeTab === 'Core' ? '#4F46E5' : '#64748B', fontWeight: activeTab === 'Core' ? '500' : '400', cursor: 'pointer' }}>
                  Enterprise Modules
                </button>
            </div>

            <div style={{ padding: '16px 0', display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
                {activeTab === 'Core' && (
                    <>
                        <DraggableNode type='customInput' label='Input' IconComponent={Download} />
                        <DraggableNode type='text' label='Text' IconComponent={FileText} />
                        <DraggableNode type='mcpNode' label='MCP Server' IconComponent={Database} />
                        <DraggableNode type='routerNode' label='Router' IconComponent={GitFork} />
                        <DraggableNode type='evalNode' label='Self-Heal' IconComponent={ShieldCheck} />
                        <DraggableNode type='hitlNode' label='HITL Stop' IconComponent={UserCheck} />
                        <DraggableNode type='customOutput' label='Output' IconComponent={Upload} />
                    </>
                )}
            </div>
        </div>
    );
};