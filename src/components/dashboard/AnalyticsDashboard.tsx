import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { analyticsData } from '../../lib/mockData';
import { useStore } from '../../store/useStore';
import { TrendingUp, DollarSign, Users } from 'lucide-react';

export const AnalyticsDashboard: React.FC = () => {
  const { masterKillSwitch } = useStore();

  // Determine opacity based on kill switch state to simulate "Paused Data"
  const opacityClass = masterKillSwitch ? "opacity-50 grayscale" : "opacity-100";

  return (
    <div className={`grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6 transition-all duration-500 ${opacityClass}`}>
      {/* Main Chart */}
      <div className="lg:col-span-2 bg-slate-800 p-4 rounded-xl border border-slate-700 shadow-sm">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-white">Live Performance (24h)</h3>
          <div className="flex space-x-2">
             <span className="flex items-center text-xs text-emerald-400 bg-emerald-400/10 px-2 py-1 rounded">
               <div className="w-2 h-2 bg-emerald-400 rounded-full mr-2 animate-pulse"></div>
               LIVE
             </span>
          </div>
        </div>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={analyticsData}>
              <defs>
                <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#2563EB" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#2563EB" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorSpend" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#F59E0B" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#F59E0B" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
              <XAxis dataKey="time" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `$${value}`} />
              <Tooltip 
                contentStyle={{ backgroundColor: '#1E293B', borderColor: '#334155', color: '#fff' }}
                itemStyle={{ color: '#fff' }}
              />
              <Area type="monotone" dataKey="revenue" stroke="#2563EB" strokeWidth={2} fillOpacity={1} fill="url(#colorRevenue)" />
              <Area type="monotone" dataKey="spend" stroke="#F59E0B" strokeWidth={2} fillOpacity={1} fill="url(#colorSpend)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 gap-4">
        <div className="bg-slate-800 p-4 rounded-xl border border-slate-700 flex flex-col justify-center">
           <div className="flex items-center gap-3 mb-2">
             <div className="p-2 bg-blue-600/20 rounded-lg text-blue-500">
               <TrendingUp size={20} />
             </div>
             <span className="text-slate-400 text-sm">Total ROAS</span>
           </div>
           <div className="text-3xl font-bold text-white">3.85</div>
           <div className="text-emerald-400 text-xs mt-1">+12% vs yesterday</div>
        </div>

        <div className="bg-slate-800 p-4 rounded-xl border border-slate-700 flex flex-col justify-center">
           <div className="flex items-center gap-3 mb-2">
             <div className="p-2 bg-amber-600/20 rounded-lg text-amber-500">
               <DollarSign size={20} />
             </div>
             <span className="text-slate-400 text-sm">Spend Today</span>
           </div>
           <div className="text-3xl font-bold text-white">$1,245.50</div>
           <div className="text-slate-500 text-xs mt-1">Cap: $2,000.00</div>
        </div>

        <div className="bg-slate-800 p-4 rounded-xl border border-slate-700 flex flex-col justify-center">
           <div className="flex items-center gap-3 mb-2">
             <div className="p-2 bg-purple-600/20 rounded-lg text-purple-500">
               <Users size={20} />
             </div>
             <span className="text-slate-400 text-sm">Conversions</span>
           </div>
           <div className="text-3xl font-bold text-white">142</div>
           <div className="text-emerald-400 text-xs mt-1">CPA: $8.77</div>
        </div>
      </div>
    </div>
  );
};