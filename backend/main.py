# backend/main.py
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Dict, Any, Optional
import networkx as nx
import re

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class PipelineData(BaseModel):
    nodes: List[Dict[str, Any]]
    edges: List[Dict[str, Any]]

@app.post("/pipelines/parse")
async def parse_pipeline(pipeline: PipelineData):
    structural_G = nx.DiGraph()
    combined_G = nx.DiGraph()
    
    # 1. Map all nodes into the network matrix
    for node in pipeline.nodes:
        node_id = node.get('id')
        structural_G.add_node(node_id)
        combined_G.add_node(node_id)
        
    # 2. Map all physical UI connections (Structural Edges)
    for edge in pipeline.edges:
        source = edge.get('source')
        target = edge.get('target')
        structural_G.add_edge(source, target)
        combined_G.add_edge(source, target)
        
    # 3. Scan Node Data properties to find hidden Text Variable Dependencies
    latent_cycles = []
    # 3. Scan Node Data properties to find hidden Text Variable Dependencies
    for node in pipeline.nodes:
        node_id = node.get('id')
        node_data = node.get('data', {})
        
        # Search every text input string inside the node data config blocks
        for field_value in node_data.values():
            if isinstance(field_value, str):
                # Using re.IGNORECASE to ensure uppercase node names match correctly
                matches = re.findall(r'\{\{\s*([a-zA-Z0-9_-]+)(?:\.[a-zA-Z0-9_-]+)?\s*\}\}', field_value, re.IGNORECASE)
                
                for source_node_dependency in matches:
                    # Case-insensitive validation check against our node keys
                    matched_node_id = next((n for n in combined_G.nodes if n.lower() == source_node_dependency.lower()), None)
                    
                    if matched_node_id and matched_node_id != node_id:
                        combined_G.add_edge(matched_node_id, node_id)

    # Evaluate Graph Cycles
    structural_is_dag = nx.is_directed_acyclic_graph(structural_G)
    combined_is_dag = nx.is_directed_acyclic_graph(combined_G)
    
    status_message = "State compilation completed successfully."
    resolution_hint = None
    
    # Edge Case: Visual wires are clear, but hidden text links block execution
    if structural_is_dag and not combined_is_dag:
        status_message = "Structural Verification: PASS | Data Dependency Check: FAILED"
        try:
            cycle_path = nx.find_cycle(combined_G, orientation='original')
            path_str = " ➔ ".join([edge[0] for edge in cycle_path] + [cycle_path[0][0]])
            resolution_hint = (
                f"Data Lock Detected: [{path_str}]. A component is trying to compile an agentic "
                f"prompt variable that depends on execution states from a downstream block. "
                f"To maintain logical integrity, decouple this step using a dedicated state buffer layer."
            )
        except:
            resolution_hint = "A text variable template is attempting to read from a downstream node out of sequence."

    return {
        "num_nodes": len(pipeline.nodes),
        "num_edges": len(pipeline.edges),
        "is_dag": combined_is_dag,
        "structural_pass": structural_is_dag,
        "status": status_message,
        "resolution_hint": resolution_hint
    }