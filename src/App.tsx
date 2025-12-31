import React, { useEffect, useState } from 'react';
import { Sidebar } from './components/layout/Sidebar';
import { PerformanceMetricGrid } from './components/dashboard/PerformanceMetricGrid';
import { LiveActionFeed } from './components/dashboard/LiveActionFeed';
import { CampaignKillSwitch } from './components/dashboard/CampaignKillSwitch';
import { ErrorBoundary } from './components/ui/ErrorBoundary';
import { Skeleton } from './components/ui/Skeleton';
import { useAgencyStore } from './store/agencyStore';
import { Zap, Globe } from 'lucide-react';

function App() {
  // Hydration Guard Pattern
  const [isMounted, setIsMounted] = useState(false);
  const { mode, status, addLog, updateMetrics, toggleMode } = useAgencyStore();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Simulation Engine (Mocking Real-time updates)
  useEffect(() => {
    if (status === 'paused') return;

    const interval = setInterval(() => {
      // Randomly update metrics
      updateMetrics({
        impressions: Math.floor(Math.random() * 100) + 1000,
        spend: Math.random() * 10,
        ctr: 2 + (Math.random() * 0.5 - 0.25)
      });

      // Randomly add logs
      if (Math.random() > 0.7) {
        const actions = [
          { msg: 'Optimizing bid for Keyword "SaaS Marketing"', type: 'info' },
          { msg: 'Creative A/B Test concluded: Variation B won', type: 'success' },
          { msg: 'Checking competitor spending patterns...', type: 'system' },
          { msg: 'CPC adjusted to $1.24 based on real-time data', type: 'info' }
        ];
        const action = actions[Math.floor(Math.random() * actions.length)];
        
        addLog({
          level: action.type as any,
          message: action.msg,
        });
      }
    }, 2500);

    return () => clearInterval(interval);
  }, [status, addLog, updateMetrics]);

  if (!isMounted) {
    return (
      <div className="flex h-screen bg-slate-50">
        <div className="w-64 bg-slate-900 border-r border-slate-800" />
        <div className="flex-1 p-8 space-y-8">
          <Skeleton className="h-12 w-48" />
          <div className="grid grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => <Skeleton key={i} className="h-32" />)}
          </div>
          <Skeleton className="h-96 w-full" />
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-surface overflow-hidden">
      <Sidebar />
      
      <main className="flex-1 overflow-y-auto">
        <header className="bg-white border-b border-slate-200 sticky top-0 z-10">
          <div className="px-8 py-4 flex items-center justify-between">
            <div>
              <h1 className="text-xl font-bold text-slate-900">Agency Dashboard</h1>
              <p className="text-sm text-slate-500">Autonomous Campaign Management</p>
            </div>
            
            <div className="flex items-center space-x-4">
               {/* Mode Switcher */}
               <div className="flex items-center bg-slate-100 rounded-lg p-1 border border-slate-200">
                <button 
                  onClick={() => toggleMode('sandbox')}
                  className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all ${mode === 'sandbox' ? 'bg-white shadow text-slate-900' : 'text-slate-500 hover:text-slate-700'}`}
                >
                  Sandbox
                </button>
                <button 
                  onClick={() => toggleMode('production')}
                  className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all flex items-center ${mode === 'production' ? 'bg-status-live text-white shadow' : 'text-slate-500 hover:text-slate-700'}`}
                >
                  {mode === 'production' && <Globe className="w-3 h-3 mr-1" />}
                  Production
                </button>
               </div>

               <div className="flex items-center px-3 py-1 bg-brand-accent/10 text-brand-accent rounded-full text-xs font-medium border border-brand-accent/20">
                  <Zap className="w-3 h-3 mr-1" />
                  AI Agent Active
               </div>
            </div>
          </div>
        </header>

        <div className="p-8 space-y-8 max-w-7xl mx-auto">
          
          {/* Safety Controls */}
          <ErrorBoundary scope="Kill Switch">
            <CampaignKillSwitch />
          </ErrorBoundary>

          {/* Stats Grid */}
          <ErrorBoundary scope="Metrics Grid">
            <PerformanceMetricGrid />
          </ErrorBoundary>

          {/* Main Feed Area */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <h2 className="text-lg font-bold text-slate-900 mb-4">Live Decision Engine</h2>
              <ErrorBoundary scope="Action Feed">
                <LiveActionFeed />
              </ErrorBoundary>
            </div>
            
            <div className="lg:col-span-1">
               <h2 className="text-lg font-bold text-slate-900 mb-4">Active Strategy</h2>
               <div className="bg-white rounded-lg border border-slate-200 p-6">
                 <div className="space-y-4">
                   <div>
                     <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Targeting Goal</span>
                     <p className="font-medium text-slate-900">Maximize ROAS (Target: 4.0x)</p>
                   </div>
                   <div className="h-px bg-slate-100" />
                   <div>
                     <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Active Channels</span>
                     <div className="flex gap-2 mt-2">
                       <span className="px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded border border-blue-100">Meta Ads</span>
                       <span className="px-2 py-1 bg-red-50 text-red-700 text-xs rounded border border-red-100">Google Search</span>
                     </div>
                   </div>
                   <div className="h-px bg-slate-100" />
                   <div>
                     <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Daily Budget Cap</span>
                     <div className="mt-1 flex justify-between items-center">
                        <span className="font-medium text-slate-900">$500.00</span>
                        <span className="text-xs text-status-live">72% Utilized</span>
                     </div>
                     <div className="w-full bg-slate-100 h-2 rounded-full mt-2">
                        <div className="bg-brand-accent h-2 rounded-full" style={{ width: '72%' }}></div>
                     </div>
                   </div>
                 </div>
               </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;