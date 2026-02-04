'use client';

import { ResponsiveContainer, LineChart, Line, AreaChart, Area } from 'recharts';

interface SparklineProps {
  data: { value: number }[];
  color?: string;
  fillOpacity?: number;
  className?: string;
  type?: 'line' | 'area';
}

export function Sparkline({ 
  data, 
  color = '#000', 
  fillOpacity = 0,
  className = 'h-10',
  type = 'line'
}: SparklineProps) {
  if (type === 'area') {
    return (
      <div className={className}>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <Area 
              type="monotone" 
              dataKey="value" 
              stroke={color}
              strokeWidth={1.5}
              fill={color}
              fillOpacity={fillOpacity}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    );
  }

  return (
    <div className={className}>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <Line 
            type="monotone" 
            dataKey="value" 
            stroke={color}
            strokeWidth={1.5}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
