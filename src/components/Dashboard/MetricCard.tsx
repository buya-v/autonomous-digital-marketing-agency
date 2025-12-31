import React from 'react';
import { TrendingUp, TrendingDown, ArrowRight } from 'lucide-react';
import { ResponsiveContainer, AreaChart, Area, Tooltip } from 'recharts';
import { DashboardMetric } from '../../types';
import { cn } from '../../lib/utils';

interface MetricCardProps {
  metric: DashboardMetric;
}

export const MetricCard: React.FC<MetricCardProps> = ({ metric }) => {
  const isPositive = metric.trendDirection === 'up';

  return (
    <div className="bg-bg-surface border border-slate-700/50 rounded-xl p-6 hover:border-slate-600 transition-colors group">
      <div className="flex justify-between items-start mb-4">
        <div>
          <p className="text-sm font-medium text-slate-400">{metric.label}</p>
          <h3 className="text-2xl font-bold text-white mt-1">{metric.value}</h3>
        </div>
        <div className={cn(
          "flex items-center px-2 py-1 rounded text-xs font-medium",
          isPositive ? "text-emerald-400 bg-emerald-400/10" : "text-red-400 bg-red-400/10"
        )}>
          {isPositive ? <TrendingUp className="w-3 h-3 mr-1" /> : <TrendingDown className="w-3 h-3 mr-1" />}
          {metric.trend}%
        </div>
      </div>
      
      <div className="h-16 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={metric.data}>
            <defs>
              <linearGradient id={`gradient-${metric.id}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#6366F1" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#6366F1" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <Tooltip 
              contentStyle={{ backgroundColor: '#1E293B', border: 'none', borderRadius: '8px', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} 
              itemStyle={{ color: '#fff' }}
              cursor={false}
            />
            <Area 
              type="monotone" 
              dataKey="value" 
              stroke="#6366F1" 
              fillOpacity={1} 
              fill={`url(#gradient-${metric.id})`} 
              strokeWidth={2}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};