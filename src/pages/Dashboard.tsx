import React, { useEffect } from 'react';
import { useStore } from '../store';
import { MetricCard } from '../components/Dashboard/MetricCard';
import { StrategyMap } from '../components/Dashboard/StrategyMap';
import { CreativeCard } from '../components/Creatives/CreativeCard';
import { DashboardMetric } from '../types';
import { Sparkles, Plus } from 'lucide-react';

const MOCK_METRICS: DashboardMetric[] = [
  {
    id: 'roas',
    label: 'Return on Ad Spend (ROAS)',
    value: '4.2x',
    trend: 12.5,
    trendDirection: 'up',
    data: [{date:'M',value:3.2},{date:'T',value:3.5},{date:'W',value:3.8},{date:'T',value:3.6},{date:'F',value:4.0},{date:'S',value:4.2},{date:'S',value:4.2}]
  },
  {
    id: 'cac',
    label: 'Cost Per Acquisition',
    value: '$24.50',
    trend: 8.3,
    trendDirection: 'up',
    data: [{date:'M',value:32},{date:'T',value:30},{date:'W',value:28},{date:'T',value:29},{date:'F',value:26},{date:'S',value:25},{date:'S',value:24.5}]
  },
  {
    id: 'ctr',
    label: 'Click-Through Rate',
    value: '2.8%',
    trend: 1.2,
    trendDirection: 'down',
    data: [{date:'M',value:3.0},{date:'T',value:2.9},{date:'W',value:2.9},{date:'T',value:2.8},{date:'F',value:2.7},{date:'S',value:2.8},{date:'S',value:2.8}]
  }
];

export const Dashboard: React.FC = () => {
  const { campaigns, assets, activeCampaignId, triggerOptimization } = useStore();
  const activeCampaign = campaigns.find(c => c.id === activeCampaignId) || campaigns[0];
  
  useEffect(() => {
    // Simulate initial check
    const timer = setTimeout(() => triggerOptimization(), 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="p-8 space-y-8 max-w-7xl mx-auto">
      {/* Hero Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight">Dashboard Overview</h1>
          <p className="text-slate-400 mt-1">Monitor your AI-driven marketing performance across all channels.</p>
        </div>
        <button 
          onClick={triggerOptimization}
          className="flex items-center gap-2 bg-brand-primary hover:bg-brand-primary/90 text-white px-4 py-2 rounded-lg font-medium transition-all shadow-lg shadow-indigo-500/20 active:scale-95"
        >
          <Sparkles className="w-4 h-4" />
          Optimize Now
        </button>
      </div>

      {/* Key Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {MOCK_METRICS.map(metric => (
          <MetricCard key={metric.id} metric={metric} />
        ))}
      </div>

      {/* Main Content Split */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Strategy & Map */}
        <div className="lg:col-span-2 space-y-8">
          <StrategyMap campaign={activeCampaign} />
          
          {/* Recent Performance Table Mock */}
          <div className="bg-bg-surface border border-slate-700/50 rounded-xl overflow-hidden">
             <div className="p-6 border-b border-slate-700/50 flex justify-between items-center">
               <h3 className="font-semibold text-white">Campaign Performance</h3>
               <button className="text-sm text-brand-primary hover:text-brand-secondary">View All</button>
             </div>
             <div className="overflow-x-auto">
               <table className="w-full text-sm text-left">
                 <thead className="bg-slate-900/50 text-slate-400 font-medium">
                   <tr>
                     <th className="px-6 py-3">Campaign</th>
                     <th className="px-6 py-3">Status</th>
                     <th className="px-6 py-3">Spent</th>
                     <th className="px-6 py-3">Conv.</th>
                   </tr>
                 </thead>
                 <tbody className="divide-y divide-slate-700/50">
                   {campaigns.map(c => (
                     <tr key={c.id} className="hover:bg-slate-800/50 transition-colors">
                       <td className="px-6 py-4 text-white font-medium">{c.name}</td>
                       <td className="px-6 py-4">
                         <span className={`px-2 py-1 rounded-full text-xs ${
                           c.status === 'active' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-brand-secondary/10 text-brand-secondary'
                         }`}>
                           {c.status.charAt(0).toUpperCase() + c.status.slice(1)}
                         </span>
                       </td>
                       <td className="px-6 py-4 text-slate-300">${c.spend_to_date}</td>
                       <td className="px-6 py-4 text-slate-300">142</td>
                     </tr>
                   ))}
                 </tbody>
               </table>
             </div>
          </div>
        </div>

        {/* Right Column: Creative Assets */}
        <div className="space-y-6">
           <div className="flex items-center justify-between">
             <h3 className="text-lg font-semibold text-white">Live Creatives</h3>
             <button className="p-2 rounded-lg bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition-colors">
               <Plus className="w-4 h-4" />
             </button>
           </div>
           
           <div className="space-y-4">
             {assets.map(asset => (
               <CreativeCard key={asset.id} asset={asset} />
             ))}
           </div>
        </div>
      </div>
    </div>
  );
};