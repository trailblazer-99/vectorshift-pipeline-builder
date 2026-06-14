from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Dict, Any

app = FastAPI()

# Add CORS Middleware to allow requests from the React frontend dev server
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, specify the allowed domain
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class Edge(BaseModel):
    id: str
    source: str
    target: str
    sourceHandle: str | None = None
    targetHandle: str | None = None

class Node(BaseModel):
    id: str
    type: str | None = None
    data: Dict[str, Any] | None = None

class Pipeline(BaseModel):
    nodes: List[Node]
    edges: List[Edge]

def check_is_dag(nodes: List[Node], edges: List[Edge]) -> bool:
    # Initialize adjacency list
    adj = {node.id: [] for node in nodes}
    
    # Populate adjacency list based on edges.
    # Safe check: if an edge refers to an unregistered node, create an entry for it.
    for edge in edges:
        if edge.source not in adj:
            adj[edge.source] = []
        if edge.target not in adj:
            adj[edge.target] = []
        adj[edge.source].append(edge.target)
        
    # DFS Cycle Detection
    # State tracking: 0 = unvisited, 1 = visiting, 2 = visited
    state = {node_id: 0 for node_id in adj}
    
    def dfs(u: str) -> bool:
        state[u] = 1  # visiting
        for v in adj[u]:
            if state[v] == 1:
                return False  # Cycle detected
            if state[v] == 0:
                if not dfs(v):
                    return False
        state[u] = 2  # visited
        return True

    for node_id in adj:
        if state[node_id] == 0:
            if not dfs(node_id):
                return False
    return True

@app.get('/')
def read_root():
    return {'status': 'healthy', 'message': 'VectorShift Backend is running'}

@app.post('/pipelines/parse')
def parse_pipeline(pipeline: Pipeline):
    is_dag = check_is_dag(pipeline.nodes, pipeline.edges)
    return {
        'num_nodes': len(pipeline.nodes),
        'num_edges': len(pipeline.edges),
        'is_dag': is_dag
    }
