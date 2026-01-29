'use client';

import { memo } from 'react';
import { Handle, Position, type NodeProps, type Node } from '@xyflow/react';
import { Text } from '@radix-ui/themes';
import { CheckCircle2, XCircle } from 'lucide-react';

type EndNodeData = Node<{
  label: string;
  endType: 'complete' | 'rejected';
}, 'end'>;

function EndNodeComponent({ data }: NodeProps<EndNodeData>) {
  const isComplete = data.endType === 'complete';
  
  return (
    <div className={`
      px-4 py-3 rounded-full bg-white border-2 shadow-sm flex items-center gap-2
      ${isComplete ? 'border-green-400' : 'border-red-400'}
    `}>
      <Handle 
        type="target" 
        position={Position.Top} 
        className="!bg-gray-400 !w-2 !h-2"
      />
      
      {isComplete ? (
        <CheckCircle2 className="w-4 h-4 text-green-500" />
      ) : (
        <XCircle className="w-4 h-4 text-red-500" />
      )}
      
      <Text size="2" className={isComplete ? 'text-green-700' : 'text-red-700'}>
        {data.label}
      </Text>
    </div>
  );
}

export const EndNode = memo(EndNodeComponent);
