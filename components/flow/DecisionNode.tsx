'use client';

import { memo } from 'react';
import { Handle, Position, type NodeProps, type Node } from '@xyflow/react';
import { Text } from '@radix-ui/themes';

type DecisionNodeData = Node<{ label: string }, 'decision'>;

function DecisionNodeComponent({ data }: NodeProps<DecisionNodeData>) {
  
  return (
    <div className="relative">
      {/* Diamond shape container */}
      <div 
        className="w-[120px] h-[120px] bg-white border-2 border-blue-400 shadow-sm flex items-center justify-center"
        style={{ 
          transform: 'rotate(45deg)',
          borderRadius: '8px'
        }}
      >
        <div style={{ transform: 'rotate(-45deg)' }} className="text-center px-2">
          <Text size="1" className="text-[var(--text-primary)] block">
            {data.label}
          </Text>
        </div>
      </div>
      
      {/* Handles positioned outside the rotated element */}
      <Handle 
        type="target" 
        position={Position.Top} 
        className="!bg-gray-400 !w-2 !h-2"
        style={{ top: -4 }}
      />
      <Handle 
        type="source" 
        position={Position.Bottom} 
        id="yes"
        className="!bg-green-500 !w-2 !h-2"
        style={{ bottom: -4 }}
      />
      <Handle 
        type="source" 
        position={Position.Right} 
        id="no"
        className="!bg-red-500 !w-2 !h-2"
        style={{ right: -4 }}
      />
    </div>
  );
}

export const DecisionNode = memo(DecisionNodeComponent);
