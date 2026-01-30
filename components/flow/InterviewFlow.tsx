'use client';

import { useMemo, useCallback } from 'react';
import {
  ReactFlow,
  Background,
  Controls,
  MiniMap,
  Node,
  Edge,
  ConnectionLineType,
  MarkerType,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';

import { QuestionNode } from './QuestionNode';
import { DecisionNode } from './DecisionNode';
import { EndNode } from './EndNode';
import { StartNode } from './StartNode';
import { Question } from '@/lib/types';

const nodeTypes = {
  question: QuestionNode,
  decision: DecisionNode,
  end: EndNode,
  start: StartNode,
};

interface InterviewFlowProps {
  questions: Question[];
}

export function InterviewFlow({ questions }: InterviewFlowProps) {
  const { nodes, edges } = useMemo(() => {
    const knockoutQuestions = questions.filter(q => q.type === 'knockout');
    const qualifyingQuestions = questions.filter(q => q.type === 'qualifying');
    
    const nodes: Node[] = [];
    const edges: Edge[] = [];
    
    const VERTICAL_SPACING = 150;
    const HORIZONTAL_OFFSET = 350;
    const START_X = 400;
    const START_Y = 50;
    
    // Start node
    nodes.push({
      id: 'start',
      type: 'start',
      position: { x: START_X, y: START_Y },
      data: { label: 'Start Pre-screening' },
    });
    
    let currentY = START_Y + VERTICAL_SPACING;
    let previousNodeId = 'start';
    
    // Add knockout questions with decision branches
    knockoutQuestions.forEach((question, index) => {
      const questionNodeId = `knockout-${question.id}`;
      const decisionNodeId = `decision-${question.id}`;
      
      // Question node
      nodes.push({
        id: questionNodeId,
        type: 'question',
        position: { x: START_X - 40, y: currentY },
        data: { 
          label: question.text,
          questionType: 'knockout'
        },
      });
      
      // Edge from previous to question
      edges.push({
        id: `edge-${previousNodeId}-${questionNodeId}`,
        source: previousNodeId,
        target: questionNodeId,
        type: 'smoothstep',
        markerEnd: { type: MarkerType.ArrowClosed },
        style: { stroke: '#94a3b8' },
      });
      
      currentY += VERTICAL_SPACING;
      
      // Decision node (Ja/Nee)
      nodes.push({
        id: decisionNodeId,
        type: 'decision',
        position: { x: START_X - 20, y: currentY },
        data: { label: 'Ja / Nee?' },
      });
      
      // Edge from question to decision
      edges.push({
        id: `edge-${questionNodeId}-${decisionNodeId}`,
        source: questionNodeId,
        target: decisionNodeId,
        type: 'smoothstep',
        markerEnd: { type: MarkerType.ArrowClosed },
        style: { stroke: '#94a3b8' },
      });
      
      // Rejected node for "Nee" answer
      const rejectedNodeId = `rejected-${question.id}`;
      nodes.push({
        id: rejectedNodeId,
        type: 'end',
        position: { x: START_X + HORIZONTAL_OFFSET, y: currentY + 20 },
        data: { 
          label: 'Afgewezen',
          endType: 'rejected'
        },
      });
      
      // Edge from decision to rejected (Nee)
      edges.push({
        id: `edge-${decisionNodeId}-${rejectedNodeId}`,
        source: decisionNodeId,
        sourceHandle: 'no',
        target: rejectedNodeId,
        type: 'smoothstep',
        label: 'Nee',
        labelStyle: { fill: '#ef4444', fontWeight: 500 },
        markerEnd: { type: MarkerType.ArrowClosed },
        style: { stroke: '#ef4444' },
      });
      
      previousNodeId = decisionNodeId;
      currentY += VERTICAL_SPACING;
    });
    
    // Add "Qualifying Questions" group header
    if (qualifyingQuestions.length > 0) {
      // Separator label
      nodes.push({
        id: 'qualifying-label',
        type: 'default',
        position: { x: START_X - 100, y: currentY },
        data: { label: '📋 Kwalificerende Vragen' },
        style: {
          background: '#fff7ed',
          border: '1px solid #f97316',
          borderRadius: '8px',
          padding: '8px 16px',
          fontSize: '12px',
          fontWeight: 500,
          color: '#c2410c',
        },
      });
      
      // Edge from last decision to qualifying label
      edges.push({
        id: `edge-${previousNodeId}-qualifying-label`,
        source: previousNodeId,
        sourceHandle: 'yes',
        target: 'qualifying-label',
        type: 'smoothstep',
        label: 'Ja',
        labelStyle: { fill: '#22c55e', fontWeight: 500 },
        markerEnd: { type: MarkerType.ArrowClosed },
        style: { stroke: '#22c55e' },
      });
      
      previousNodeId = 'qualifying-label';
      currentY += VERTICAL_SPACING;
      
      // Add qualifying questions (linear flow)
      qualifyingQuestions.forEach((question, index) => {
        const questionNodeId = `qualifying-${question.id}`;
        
        nodes.push({
          id: questionNodeId,
          type: 'question',
          position: { x: START_X - 40, y: currentY },
          data: { 
            label: question.text,
            questionType: 'qualifying'
          },
        });
        
        edges.push({
          id: `edge-${previousNodeId}-${questionNodeId}`,
          source: previousNodeId,
          target: questionNodeId,
          type: 'smoothstep',
          markerEnd: { type: MarkerType.ArrowClosed },
          style: { stroke: '#94a3b8' },
        });
        
        previousNodeId = questionNodeId;
        currentY += VERTICAL_SPACING;
      });
    }
    
    // End node (complete)
    nodes.push({
      id: 'complete',
      type: 'end',
      position: { x: START_X, y: currentY },
      data: { 
        label: 'Pre-screening Compleet',
        endType: 'complete'
      },
    });
    
    edges.push({
      id: `edge-${previousNodeId}-complete`,
      source: previousNodeId,
      sourceHandle: knockoutQuestions.length > 0 && qualifyingQuestions.length === 0 ? 'yes' : undefined,
      target: 'complete',
      type: 'smoothstep',
      label: knockoutQuestions.length > 0 && qualifyingQuestions.length === 0 ? 'Ja' : undefined,
      labelStyle: knockoutQuestions.length > 0 && qualifyingQuestions.length === 0 ? { fill: '#22c55e', fontWeight: 500 } : undefined,
      markerEnd: { type: MarkerType.ArrowClosed },
      style: { stroke: knockoutQuestions.length > 0 && qualifyingQuestions.length === 0 ? '#22c55e' : '#94a3b8' },
    });
    
    return { nodes, edges };
  }, [questions]);

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      nodeTypes={nodeTypes}
      connectionLineType={ConnectionLineType.SmoothStep}
      fitView
      fitViewOptions={{ padding: 0.2 }}
      defaultViewport={{ x: 0, y: 0, zoom: 0.8 }}
      minZoom={0.3}
      maxZoom={1.5}
      attributionPosition="bottom-left"
    >
      <Background color="#e5e7eb" gap={20} />
      <Controls position="bottom-right" />
      <MiniMap 
        nodeColor={(node) => {
          if (node.type === 'start') return '#3b82f6';
          if (node.type === 'end') return node.data?.endType === 'complete' ? '#22c55e' : '#ef4444';
          if (node.type === 'question') return node.data?.questionType === 'knockout' ? '#fecaca' : '#fed7aa';
          return '#e5e7eb';
        }}
        maskColor="rgba(0, 0, 0, 0.1)"
        position="top-right"
      />
    </ReactFlow>
  );
}
