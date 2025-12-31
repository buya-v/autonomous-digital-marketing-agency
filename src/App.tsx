import React, { useEffect } from 'react';
import { LayoutDashboard, Megaphone, Settings, Target } from 'lucide-react';
import { StatusMarquee } from './components/dashboard/StatusMarquee';
import { AnalyticsDashboard } from './components/dashboard/AnalyticsDashboard';
import { ExecutionLog } from './components/dashboard/ExecutionLog';
import { KillSwitch } from './components/ui/KillSwitch';
import { OAuthStatus } from './components/dashboard/OAuthStatus';
import { useStore } from './store/useStore';
import { generateRandomLatency } from './lib/mockData';

function App() {
  const { updateSystemStatus, addLog, masterKillSwitch, systemStatus } = useStore();

  // Simulate Real-time data and background jobs
  useEffect(() => {
    if (masterKillSwitch) return;

    const interval = setInterval(() => {
      // Randomly update latency
      updateSystemStatus({
        metaLatency: generateRandomLatency(),
        googleLatency: generateRandomLatency() + 20,
      });

      // Randomly add a log to simulate activity
      if (Math.random() > 0.7) {
        const activities = [
          { p: 'Meta', m: 'Optimizing CTR for Creative Set #4' },
          { p: 'Google', m: 'Checking keyword quality scores' },
          { p: 'System', m: 'Re-balancing budget allocation' },
          { p: 'Meta', m: 'Analyzing competitor saturation' }
        ];
        const act = activities[Math.floor(Math.random() * activities.length)];
        
        addLog({
          platform: act.p as any,
          message: act.m,
          status: 'info'
        });
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [masterKillSwitch]);

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col">
      <StatusMarquee />

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar Navigation */}
        <aside className="w-64 bg-slate-900 border-r border-slate-800 hidden md:flex flex-col">
          <div className="p-6">
            <div className="flex items-center gap-2 text-blue-500 font-bold text-xl tracking-tight">
              <Target className="w-6 h-6" />
              <span>ADMA</span>
            </div>
            <div className="text-xs text-slate-500 mt-1 uppercase tracking-widest">Autonomous Agency</div>
          </div>

          <nav className="flex-1 px-4 space-y-2">
            <a href="#" className="flex items-center gap-3 px-4 py-3 bg-blue-600/10 text-blue-400 rounded-lg">
              <LayoutDashboard size={20} />
              <span className="font-medium">Mission Control</span>
            </a>
            <a href="#" className="flex items-center gap-3 px-4 py-3 text-slate-400 hover:bg-slate-800 hover:text-white rounded-lg transition-colors">
              <Megaphone size={20} />
              <span>Campaigns</span>
            </a>
            <a href="#" className="flex items-center gap-3 px-4 py-3 text-slate-400 hover:bg-slate-800 hover:text-white rounded-lg transition-colors">
              <Settings size={20} />
              <span>Configuration</span>
            </a>
          </nav>

          <div className="p-4 border-t border-slate-800">
            <div className="bg-slate-800 rounded p-3">
              <div className="text-xs text-slate-400 mb-1">Monthly Budget</div>
              <div className="flex justify-between items-end">
                <span className="font-bold text-white">$1,245</span>
                <span className="text-xs text-slate-500">/ $5,000</span>
              </div>
              <div className="w-full bg-slate-700 h-1.5 rounded-full mt-2">
                <div className="bg-blue-500 h-1.5 rounded-full w-[25%]"></div>
              </div>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 flex flex-col min-w-0 overflow-hidden relative">
          {/* Header */}
          <header className="h-16 border-b border-slate-800 flex items-center justify-between px-6 bg-slate-900/50 backdrop-blur">
            <h1 className="text-xl font-semibold text-white">
              {masterKillSwitch ? 'SYSTEM HALTED - SAFETY MODE' : 'Dashboard Overview'}
            </h1>
            <div className="flex items-center gap-4">
              <KillSwitch />
              <div className="w-8 h-8 rounded-full bg-slate-700 border border-slate-600"></div>
            </div>
          </header>

          {/* Dashboard Body */}
          <div className="flex-1 overflow-y-auto p-6">
            {masterKillSwitch && (
              <div className="mb-6 bg-red-900/20 border border-red-900/50 rounded-lg p-4 flex items-center gap-3 animate-pulse">
                <Target className="text-red-500" />
                <div>
                  <h3 className="text-red-400 font-bold">Production Halted</h3>
                  <p className="text-red-400/80 text-sm">All autonomous actions are suspended. No ad spend will be incurred. Enable system to resume operations.</p>
                </div>
              </div>
            )}

            <AnalyticsDashboard />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[400px]">
              <div className="lg:col-span-2 h-full">
                <ExecutionLog />
              </div>
              <div className="flex flex-col gap-6">
                <OAuthStatus />
                
                <div className="bg-slate-800 rounded-xl p-5 border border-slate-700 flex-1">
                  <h4 className="text-white font-medium mb-4">Active Strategies</h4>
                  <div className="space-y-3">
                    {[ 
                      { name: 'High-Intent Retargeting', status: 'Active', platform: 'Meta' },
                      { name: 'Competitor Conquesting', status: 'Learning', platform: 'Google' },
                      { name: 'Lookalike Expansion', status: 'Active', platform: 'Meta' }
                    ].map((strat, i) => (
                       <div key={i} className="flex items-center justify-between p-3 bg-slate-900 rounded border border-slate-700">
                         <div>
                           <div className="text-sm text-slate-200">{strat.name}</div>
                           <div className="text-xs text-slate-500">{strat.platform}</div>
                         </div>
                         <div className="flex items-center gap-2">
                            <div className={`w-2 h-2 rounded-full ${masterKillSwitch ? 'bg-red-500' : 'bg-emerald-500 animate-pulse'}`}></div>
                            <span className="text-xs text-slate-400">{masterKillSwitch ? 'Paused' : strat.status}</span>
                         </div>
                       </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;