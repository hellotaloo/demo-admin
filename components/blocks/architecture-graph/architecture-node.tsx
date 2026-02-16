'use client';

import { memo } from 'react';
import { Handle, Position, type Node } from '@xyflow/react';
import { LAYER_CONFIG, NODE_TYPE_ICONS, type ArchitectureNodeType, type ArchitectureLayerId } from '@/lib/architecture-types';
import { cn } from '@/lib/utils';

export interface ArchitectureNodeData extends Record<string, unknown> {
  label: string;
  nodeType: ArchitectureNodeType;
  layer: ArchitectureLayerId;
  description: string;
  filePath?: string;
  isHighlighted?: boolean;
  isConnected?: boolean;
  isDimmed?: boolean;
}

export type ArchitectureNodeType_RF = Node<ArchitectureNodeData, 'architectureNode'>;

interface ArchitectureNodeProps {
  data: ArchitectureNodeData;
  selected?: boolean;
}

function ArchitectureNodeComponent({ data, selected }: ArchitectureNodeProps) {
  const layerConfig = LAYER_CONFIG[data.layer] || LAYER_CONFIG.external;
  const icon = NODE_TYPE_ICONS[data.nodeType];

  return (
    <>
      <Handle
        type="target"
        position={Position.Top}
        className="!w-2 !h-2 !bg-gray-400 !border-0"
      />
      <div
        className={cn(
          'px-4 py-3 rounded-lg border-2 min-w-[140px] max-w-[200px] transition-all duration-200',
          'backdrop-blur-sm shadow-lg',
          data.isDimmed && 'opacity-30',
          data.isHighlighted && 'ring-2 ring-white ring-offset-2 ring-offset-gray-900 scale-105',
          selected && 'ring-2 ring-lime-400 ring-offset-2 ring-offset-gray-900'
        )}
        style={{
          backgroundColor: layerConfig.bgColor,
          borderColor: data.isHighlighted || selected ? layerConfig.color : layerConfig.borderColor,
        }}
      >
        <div className="flex items-center gap-2 mb-1">
          <span className="text-lg">{icon}</span>
          <span
            className="text-xs font-medium uppercase tracking-wide"
            style={{ color: layerConfig.color }}
          >
            {data.nodeType}
          </span>
        </div>
        <div className="text-sm font-semibold text-white truncate" title={data.label}>
          {data.label}
        </div>
        {data.filePath && (
          <div className="text-[10px] text-gray-400 truncate mt-1" title={data.filePath}>
            {data.filePath.split('/').pop()}
          </div>
        )}
      </div>
      <Handle
        type="source"
        position={Position.Bottom}
        className="!w-2 !h-2 !bg-gray-400 !border-0"
      />
    </>
  );
}

export const ArchitectureNode = memo(ArchitectureNodeComponent);
