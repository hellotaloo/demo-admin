// Architecture API types
export type ArchitectureNodeType = 'router' | 'service' | 'repository' | 'agent' | 'external';
export type ArchitectureLayerId = 'api' | 'service' | 'repository' | 'agent' | 'external';

export interface ArchitectureNode {
  id: string;
  type: ArchitectureNodeType;
  name: string;
  layer: ArchitectureLayerId;
  file_path?: string;
  description: string;
}

export interface ArchitectureEdge {
  source: string;
  target: string;
  type: 'uses' | 'calls' | 'integrates' | 'stores';
  label?: string;
}

export interface ArchitectureGroup {
  id: string;
  name: string;
  layer: string;
  color: string;
}

export interface ArchitectureStats {
  routers: number;
  services: number;
  repositories: number;
  agents: number;
  external: number;
}

export interface ArchitectureResponse {
  nodes: ArchitectureNode[];
  edges: ArchitectureEdge[];
  groups: ArchitectureGroup[];
  metadata: {
    stats: ArchitectureStats;
  };
}

// Layer configuration with colors - keyed by API layer ID
export const LAYER_CONFIG: Record<ArchitectureLayerId, { color: string; bgColor: string; borderColor: string; label: string }> = {
  api: {
    color: '#4CAF50',
    bgColor: 'rgba(76, 175, 80, 0.15)',
    borderColor: 'rgba(76, 175, 80, 0.4)',
    label: 'API Layer',
  },
  service: {
    color: '#2196F3',
    bgColor: 'rgba(33, 150, 243, 0.15)',
    borderColor: 'rgba(33, 150, 243, 0.4)',
    label: 'Services',
  },
  repository: {
    color: '#FF9800',
    bgColor: 'rgba(255, 152, 0, 0.15)',
    borderColor: 'rgba(255, 152, 0, 0.4)',
    label: 'Repositories',
  },
  agent: {
    color: '#9C27B0',
    bgColor: 'rgba(156, 39, 176, 0.15)',
    borderColor: 'rgba(156, 39, 176, 0.4)',
    label: 'AI Agents',
  },
  external: {
    color: '#607D8B',
    bgColor: 'rgba(96, 125, 139, 0.15)',
    borderColor: 'rgba(96, 125, 139, 0.4)',
    label: 'External',
  },
};

// Ordered layers for vertical layout
export const LAYER_ORDER: ArchitectureLayerId[] = ['api', 'service', 'agent', 'repository', 'external'];

// Node type icons (using unicode symbols for simplicity)
export const NODE_TYPE_ICONS: Record<ArchitectureNodeType, string> = {
  router: '🔀',
  service: '⚙️',
  repository: '💾',
  agent: '🤖',
  external: '🔗',
};
