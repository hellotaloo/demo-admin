'use client';

import { memo } from 'react';
import { Handle, Position, type NodeProps, type Node } from '@xyflow/react';
import { Text } from '@radix-ui/themes';
import { Play } from 'lucide-react';

type StartNodeData = Node<{ label: string }, 'start'>;

function StartNodeComponent({ data }: NodeProps<StartNodeData>) {
  return (
    <div className="px-4 py-3 rounded-full bg-blue-500 shadow-sm flex items-center gap-2">
      <Play className="w-4 h-4 text-white" fill="white" />
      
      <Text size="2" className="text-white font-medium">
        {data.label}
      </Text>
      
      <Handle 
        type="source" 
        position={Position.Bottom} 
        className="!bg-white !w-2 !h-2"
      />
    </div>
  );
}

export const StartNode = memo(StartNodeComponent);
