import React, { useEffect, useState } from 'react';
import { DollarSign, MousePointer2, TrendingUp, Users } from 'lucide-react';
import { useAgencyStore } from '../../store/agencyStore';
import { Skeleton } from '../ui/Skeleton';

interface MetricCardProps {
  title: string;
  value: string;
  change: number;
  icon: React.ElementType;
  loading?: boolean;
}

const MetricCard: React.FC<MetricCardProps> = ({ title, value, change, icon: Icon, loading }) => {
  const [pulsing, setPulsing] = useState(false);

  // Trigger pulse on value change
  useEffect(() => {
    setPulsing(true);
    const timer = setTimeout(() => setPulsing(false), 1000);
    return () => clearTimeout(timer);
  }, [value]);

  if (loading) {
    return <Skeleton className="h-32 w-full" />;
  }

  return (
    <div className="bg-white p-6 rounded-lg border border-slate-200 shadow-sm transition-all duration-300 hover:shadow-md">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-slate-500">{title}</p>
          <h3 className={`mt-2 text-2xl font-bold text-slate-900 transition-colors duration-300 ${pulsing ? 'text-brand-accent' : ''}`}>
            {value}
          </h3>
        </div>
        <div className="p-2 bg-slate-50 rounded-lg">
          <Icon className="w-5 h-5 text-slate-400" />
        </div>
      </div>
      <div className="mt-4 flex items-center text-sm">
        <span className={`font-medium ${change >= 0 ? 'text-status-live' : 'text-status-error'}`}>
          {change > 0 ? '+' : ''}{change}%
        </span>
        <span className="ml-2 text-slate-400">vs last week</span>
      </div>
    </div>
  );
};

export const PerformanceMetricGrid: React.FC = () => {
  const metrics = useAgencyStore((state) => state.metrics);
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <MetricCard 
        title="Total Ad Spend" 
        value={`$${metrics.spend.toFixed(2)}`}
        change={12.5} 
        icon={DollarSign} 
      />
      <MetricCard 
        title="CTR (Click Through)" 
        value={`${metrics.ctr.toFixed(1)}%`} 
        change={-0.4} 
        icon={MousePointer2} 
      />
      <MetricCard 
        title="ROAS" 
        value={`${metrics.roas.toFixed(2)}x`} 
        change={8.2} 
        icon={TrendingUp} 
      />
      <MetricCard 
        title="Total Conversions" 
        value={metrics.conversions.toString()} 
        change={23.1} 
        icon={Users} 
      />
    </div>
  );
};