import React from 'react';
import { TrendingUp, Users, DollarSign, Target } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string;
  trend: string;
  isPositive: boolean;
  icon: React.ReactNode;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, trend, isPositive, icon }) => (
  <div className="bg-[#1E293B] border border-gray-700/50 p-5 rounded-lg hover:border-blue-500/30 transition-all duration-300">
    <div className="flex justify-between items-start">
      <div>
        <p className="text-gray-400 text-sm font-medium mb-1">{title}</p>
        <h3 className="text-2xl font-bold text-white">{value}</h3>
      </div>
      <div className="p-2 bg-slate-800 rounded-md text-blue-400">
        {icon}
      </div>
    </div>
    <div className="mt-4 flex items-center text-sm">
      <span className={isPositive ? 'text-[#10B981]' : 'text-[#EF4444]'}>
        {trend}
      </span>
      <span className="text-gray-500 ml-2">vs last week</span>
    </div>
  </div>
);

export const StatGrid: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <StatCard 
        title="Total Spend"
        value="$12,450.00"
        trend="+12.5%"
        isPositive={true}
        icon={<DollarSign size={20} />}
      />
      <StatCard 
        title="Conversions"
        value="843"
        trend="+5.2%"
        isPositive={true}
        icon={<Target size={20} />}
      />
      <StatCard 
        title="Cost per Acq."
        value="$14.76"
        trend="-2.4%"
        isPositive={true}
        icon={<TrendingUp size={20} />}
      />
      <StatCard 
        title="Reach"
        value="1.2M"
        trend="+18.2%"
        isPositive={true}
        icon={<Users size={20} />}
      />
    </div>
  );
};