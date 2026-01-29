'use client';

import { memo } from 'react';
import { Handle, Position, type NodeProps, type Node } from '@xyflow/react';
import { Text } from '@radix-ui/themes';

type QuestionNodeData = Node<{
  label: string;
  questionType: 'knockout' | 'qualifying';
}, 'question'>;

function QuestionNodeComponent({ data }: NodeProps<QuestionNodeData>) {
  const isKnockout = data.questionType === 'knockout';
  
  return (
    <div className={`
      px-4 py-3 rounded-lg bg-white border-2 shadow-sm min-w-[200px] max-w-[280px]
      ${isKnockout ? 'border-red-400' : 'border-orange-400'}
    `}>
      <Handle 
        type="target" 
        position={Position.Top} 
        className="!bg-gray-400 !w-2 !h-2"
      />
      
      <div className="flex items-center gap-2 mb-1">
        <div className={`w-2 h-2 rounded-full ${isKnockout ? 'bg-red-500' : 'bg-orange-500'}`} />
        <Text size="1" className={isKnockout ? 'text-red-600' : 'text-orange-600'}>
          {isKnockout ? 'Knock-out' : 'Kwalificerend'}
        </Text>
      </div>
      
      <Text size="2" className="text-[var(--text-primary)] block">
        {data.label}
      </Text>
      
      <Handle 
        type="source" 
        position={Position.Bottom} 
        className="!bg-gray-400 !w-2 !h-2"
      />
    </div>
  );
}

export const QuestionNode = memo(QuestionNodeComponent);
