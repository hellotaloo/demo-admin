'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  ReactFlow,
  Background,
  Controls,
  MiniMap,
  useNodesState,
  useEdgesState,
  type Node,
  ConnectionLineType,
  MarkerType,
  Panel,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';

import { ArchitectureNode, type ArchitectureNodeData } from './architecture-node';
import {
  type ArchitectureResponse,
  type ArchitectureLayerId,
  LAYER_CONFIG,
  LAYER_ORDER,
} from '@/lib/architecture-types';
import { cn } from '@/lib/utils';
import { Search, Filter, Layers, X } from 'lucide-react';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const nodeTypes = {
  architectureNode: ArchitectureNode,
} as const;

interface ArchitectureGraphProps {
  data: ArchitectureResponse;
}

export function ArchitectureGraph({ data }: ArchitectureGraphProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLayers, setSelectedLayers] = useState<ArchitectureLayerId[]>([...LAYER_ORDER]);
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);
  const [showFilters, setShowFilters] = useState(false);

  // Convert API data to React Flow format
  const initialNodes = useMemo(() => {
    // Group nodes by layer
    const nodesByLayer: Record<string, typeof data.nodes> = {};
    data.nodes.forEach((node) => {
      if (!nodesByLayer[node.layer]) {
        nodesByLayer[node.layer] = [];
      }
      nodesByLayer[node.layer].push(node);
    });

    // Position nodes in a layered layout
    const nodes: Node<ArchitectureNodeData>[] = [];
    let yOffset = 0;

    LAYER_ORDER.forEach((layer) => {
      const layerNodes = nodesByLayer[layer] || [];
      const nodeWidth = 180;
      const nodeSpacing = 40;
      const totalWidth = layerNodes.length * (nodeWidth + nodeSpacing);
      const startX = -totalWidth / 2;

      layerNodes.forEach((node, index) => {
        nodes.push({
          id: node.id,
          type: 'architectureNode',
          position: {
            x: startX + index * (nodeWidth + nodeSpacing),
            y: yOffset,
          },
          data: {
            label: node.name,
            nodeType: node.type,
            layer: node.layer,
            description: node.description,
            filePath: node.file_path,
            isHighlighted: false,
            isConnected: false,
            isDimmed: false,
          },
        });
      });

      yOffset += 180; // Space between layers
    });

    return nodes;
  }, [data.nodes]);

  // Convert edges to React Flow format
  const initialEdges = useMemo(() => {
    const edgeColors: Record<string, string> = {
      uses: '#60A5FA',
      calls: '#34D399',
      integrates: '#F472B6',
      stores: '#FBBF24',
    };

    return data.edges.map((edge, index) => ({
      id: `edge-${index}`,
      source: edge.source,
      target: edge.target,
      type: 'smoothstep',
      animated: true,
      style: {
        stroke: edgeColors[edge.type] || '#6B7280',
        strokeWidth: 2,
      },
      markerEnd: {
        type: MarkerType.ArrowClosed,
        color: edgeColors[edge.type] || '#6B7280',
      },
      label: edge.label,
      labelStyle: { fill: '#9CA3AF', fontSize: 10 },
      labelBgStyle: { fill: '#1F2937', fillOpacity: 0.8 },
    }));
  }, [data.edges]);

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  // Get connected node IDs for highlighting
  const getConnectedNodeIds = useCallback(
    (nodeId: string) => {
      const connected = new Set<string>();
      data.edges.forEach((edge) => {
        if (edge.source === nodeId) connected.add(edge.target);
        if (edge.target === nodeId) connected.add(edge.source);
      });
      return connected;
    },
    [data.edges]
  );

  // Handle node click - highlight connections
  const onNodeClick = useCallback(
    (_: React.MouseEvent, node: Node) => {
      if (selectedNodeId === node.id) {
        // Deselect
        setSelectedNodeId(null);
        setNodes((nds) =>
          nds.map((n) => ({
            ...n,
            data: { ...n.data, isHighlighted: false, isConnected: false, isDimmed: false },
          }))
        );
        setEdges((eds) =>
          eds.map((e) => ({
            ...e,
            animated: true,
            style: { ...e.style, opacity: 1 },
          }))
        );
      } else {
        // Select and highlight
        setSelectedNodeId(node.id);
        const connectedIds = getConnectedNodeIds(node.id);

        setNodes((nds) =>
          nds.map((n) => ({
            ...n,
            data: {
              ...n.data,
              isHighlighted: n.id === node.id,
              isConnected: connectedIds.has(n.id),
              isDimmed: n.id !== node.id && !connectedIds.has(n.id),
            },
          }))
        );

        setEdges((eds) =>
          eds.map((e) => ({
            ...e,
            animated: e.source === node.id || e.target === node.id,
            style: {
              ...e.style,
              opacity: e.source === node.id || e.target === node.id ? 1 : 0.15,
              strokeWidth: e.source === node.id || e.target === node.id ? 3 : 2,
            },
          }))
        );
      }
    },
    [selectedNodeId, getConnectedNodeIds, setNodes, setEdges]
  );

  // Clear selection on pane click
  const onPaneClick = useCallback(() => {
    setSelectedNodeId(null);
    setNodes((nds) =>
      nds.map((n) => ({
        ...n,
        data: { ...n.data, isHighlighted: false, isConnected: false, isDimmed: false },
      }))
    );
    setEdges((eds) =>
      eds.map((e) => ({
        ...e,
        animated: true,
        style: { ...e.style, opacity: 1, strokeWidth: 2 },
      }))
    );
  }, [setNodes, setEdges]);

  // Filter by search and layers
  useEffect(() => {
    const query = searchQuery.toLowerCase();

    // Pre-compute which nodes should be hidden based on original data
    const hiddenNodeIds = new Set<string>();
    data.nodes.forEach((node) => {
      const matchesSearch =
        !query ||
        node.name.toLowerCase().includes(query) ||
        node.description.toLowerCase().includes(query) ||
        node.type.toLowerCase().includes(query);
      const matchesLayer = selectedLayers.includes(node.layer);
      if (!matchesSearch || !matchesLayer) {
        hiddenNodeIds.add(node.id);
      }
    });

    setNodes((nds) =>
      nds.map((n) => {
        const isVisible = !hiddenNodeIds.has(n.id);
        const nodeData = n.data as ArchitectureNodeData;

        return {
          ...n,
          hidden: !isVisible,
          data: {
            ...nodeData,
            isDimmed: selectedNodeId ? nodeData.isDimmed : !isVisible,
          },
        };
      })
    );

    // Hide edges connected to hidden nodes
    setEdges((eds) =>
      eds.map((e) => ({
        ...e,
        hidden: hiddenNodeIds.has(e.source) || hiddenNodeIds.has(e.target),
      }))
    );
  }, [searchQuery, selectedLayers, selectedNodeId, setNodes, setEdges, data.nodes]);

  // Toggle layer filter
  const toggleLayer = (layer: ArchitectureLayerId) => {
    setSelectedLayers((prev) =>
      prev.includes(layer) ? prev.filter((l) => l !== layer) : [...prev, layer]
    );
  };

  // Get selected node details
  const selectedNode = useMemo(() => {
    if (!selectedNodeId) return null;
    return data.nodes.find((n) => n.id === selectedNodeId);
  }, [selectedNodeId, data.nodes]);

  return (
    <div className="w-full h-full bg-gray-900">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onNodeClick={onNodeClick}
        onPaneClick={onPaneClick}
        nodeTypes={nodeTypes}
        connectionLineType={ConnectionLineType.SmoothStep}
        fitView
        fitViewOptions={{ padding: 0.2 }}
        minZoom={0.1}
        maxZoom={2}
        defaultEdgeOptions={{
          type: 'smoothstep',
        }}
      >
        <Background color="#374151" gap={20} size={1} />
        <Controls className="!bg-gray-800 !border-gray-700 !rounded-lg [&>button]:!bg-gray-800 [&>button]:!border-gray-700 [&>button]:!text-gray-300 [&>button:hover]:!bg-gray-700" />
        <MiniMap
          nodeColor={(node) => {
            const nodeData = node.data as ArchitectureNodeData;
            return LAYER_CONFIG[nodeData.layer]?.color || '#6B7280';
          }}
          maskColor="rgba(17, 24, 39, 0.8)"
          className="!bg-gray-800 !border-gray-700 !rounded-lg"
        />

        {/* Header Panel */}
        <Panel position="top-left" className="!m-4">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3 bg-gray-800/90 backdrop-blur-sm px-4 py-3 rounded-xl border border-gray-700">
              <div className="w-10 h-10 bg-gradient-to-br from-lime-400 to-emerald-500 rounded-lg flex items-center justify-center">
                <Layers className="w-5 h-5 text-gray-900" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-white">Taloo Architecture</h1>
                <p className="text-xs text-gray-400">
                  {data.nodes.length} components • {data.edges.length} connections
                </p>
              </div>
            </div>
          </div>
        </Panel>

        {/* Search & Filter Panel */}
        <Panel position="top-right" className="!m-4">
          <div className="flex items-center gap-2">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search components..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 pr-4 py-2 bg-gray-800/90 backdrop-blur-sm border border-gray-700 rounded-lg text-sm text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-lime-500 focus:border-transparent w-64"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Filter Button */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={cn(
                'p-2 rounded-lg border transition-colors',
                showFilters
                  ? 'bg-lime-500 border-lime-500 text-gray-900'
                  : 'bg-gray-800/90 border-gray-700 text-gray-300 hover:bg-gray-700'
              )}
            >
              <Filter className="w-5 h-5" />
            </button>
          </div>

          {/* Layer Filters Dropdown */}
          {showFilters && (
            <div className="absolute top-full right-0 mt-2 bg-gray-800/95 backdrop-blur-sm border border-gray-700 rounded-lg p-3 min-w-[200px] shadow-xl">
              <div className="text-xs font-medium text-gray-400 uppercase tracking-wide mb-2">
                Filter by Layer
              </div>
              <div className="space-y-1">
                {LAYER_ORDER.map((layer) => (
                  <button
                    key={layer}
                    onClick={() => toggleLayer(layer)}
                    className={cn(
                      'w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-colors',
                      selectedLayers.includes(layer)
                        ? 'bg-gray-700 text-white'
                        : 'text-gray-400 hover:bg-gray-700/50 hover:text-gray-200'
                    )}
                  >
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: LAYER_CONFIG[layer].color }}
                    />
                    <span>{layer}</span>
                    {selectedLayers.includes(layer) && (
                      <span className="ml-auto text-lime-400">✓</span>
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}
        </Panel>

        {/* Legend Panel */}
        <Panel position="bottom-left" className="!m-4">
          <div className="bg-gray-800/90 backdrop-blur-sm border border-gray-700 rounded-lg p-4">
            <div className="text-xs font-medium text-gray-400 uppercase tracking-wide mb-3">
              Layers
            </div>
            <div className="space-y-2">
              {LAYER_ORDER.map((layer) => (
                <div key={layer} className="flex items-center gap-2">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: LAYER_CONFIG[layer].color }}
                  />
                  <span className="text-sm text-gray-300">{layer}</span>
                  <span className="text-xs text-gray-500 ml-auto">
                    {data.nodes.filter(n => n.layer === layer).length}
                  </span>
                </div>
              ))}
            </div>

            <div className="border-t border-gray-700 mt-3 pt-3">
              <div className="text-xs font-medium text-gray-400 uppercase tracking-wide mb-2">
                Connection Types
              </div>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-0.5 bg-blue-400" />
                  <span className="text-gray-400">uses</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-0.5 bg-green-400" />
                  <span className="text-gray-400">calls</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-0.5 bg-pink-400" />
                  <span className="text-gray-400">integrates</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-0.5 bg-yellow-400" />
                  <span className="text-gray-400">stores</span>
                </div>
              </div>
            </div>
          </div>
        </Panel>

        {/* Selected Node Details Panel */}
        {selectedNode && (
          <Panel position="bottom-right" className="!m-4">
            <div className="bg-gray-800/95 backdrop-blur-sm border border-gray-700 rounded-lg p-4 max-w-xs shadow-xl">
              <div className="flex items-start justify-between gap-2 mb-3">
                <div>
                  <div
                    className="text-xs font-medium uppercase tracking-wide mb-1"
                    style={{ color: LAYER_CONFIG[selectedNode.layer]?.color }}
                  >
                    {selectedNode.type}
                  </div>
                  <h3 className="text-lg font-semibold text-white">{selectedNode.name}</h3>
                </div>
                <button
                  onClick={onPaneClick}
                  className="p-1 text-gray-400 hover:text-white transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              <p className="text-sm text-gray-300 mb-3">{selectedNode.description}</p>
              {selectedNode.file_path && (
                <div className="text-xs text-gray-500 font-mono bg-gray-900/50 px-2 py-1 rounded">
                  {selectedNode.file_path}
                </div>
              )}
              <div className="mt-3 pt-3 border-t border-gray-700">
                <div className="text-xs text-gray-400">
                  <span className="font-medium">Layer:</span> {selectedNode.layer}
                </div>
                <div className="text-xs text-gray-400 mt-1">
                  <span className="font-medium">Connections:</span>{' '}
                  {getConnectedNodeIds(selectedNode.id).size} components
                </div>
              </div>
            </div>
          </Panel>
        )}
      </ReactFlow>
    </div>
  );
}
