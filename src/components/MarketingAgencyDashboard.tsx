import React from 'react';
import { StatGrid } from './StatGrid';
import { IntegrationManager } from './IntegrationManager';
import { AILogStream } from './AILogStream';
import { LayoutDashboard, Settings, LogOut } from 'lucide-react';

export const MarketingAgencyDashboard: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#0F172A] flex">
      {/* Sidebar Navigation */}
      <aside className="w-64 bg-[#1E293B] border-r border-gray-800 hidden lg:flex flex-col">
        <div className="p-6">
          <h1 className="text-xl font-bold text-white tracking-tight">
            ADMA <span className="text-blue-500">v4.0</span>
          </h1>
          <p className="text-xs text-gray-500 mt-1">Autonomous Digital Marketing Agency</p>
        </div>
        
        <nav className="flex-1 px-4 space-y-2 mt-4">
          <a href="#" className="flex items-center gap-3 px-4 py-3 bg-blue-600/10 text-blue-400 rounded-lg border border-blue-600/20 font-medium">
            <LayoutDashboard size={20} />
            Dashboard
          </a>
          <a href="#" className="flex items-center gap-3 px-4 py-3 text-gray-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors">
            <Settings size={20} />
            Campaign Settings
          </a>
        </nav>

        <div className="p-4 border-t border-gray-800">
          <button className="flex items-center gap-3 text-gray-400 hover:text-red-400 transition-colors px-4 py-2 w-full">
            <LogOut size={18} />
            <span className="text-sm font-medium">Disconnect Session</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto h-screen">
        <header className="bg-[#0F172A]/80 backdrop-blur sticky top-0 z-10 border-b border-gray-800 px-8 py-4 flex justify-between items-center">
          <h2 className="text-lg font-semibold text-white">Overview</h2>
          <div className="flex items-center gap-4">
            <div className="text-right hidden sm:block">
              <p className="text-sm text-white font-medium">Acme Corp</p>
              <p className="text-xs text-gray-500">Growth Plan • Active</p>
            </div>
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full border-2 border-white/10"></div>
          </div>
        </header>

        <div className="p-8 space-y-8 max-w-7xl mx-auto">
          {/* Top Stats */}
          <section>
            <StatGrid />
          </section>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Integration Hub */}
            <section className="lg:col-span-2">
              <IntegrationManager />
            </section>

            {/* AI Logs */}
            <section className="lg:col-span-1">
               <AILogStream />
            </section>
          </div>

          {/* Active Campaigns Placeholder */}
          <section className="bg-[#1E293B] rounded-lg border border-gray-700/50 p-6">
            <h3 className="font-bold text-white mb-4">Active Campaign Performance</h3>
            <div className="h-64 flex items-center justify-center border-2 border-dashed border-gray-700 rounded-lg bg-slate-900/50">
               <p className="text-gray-500">Chart Visualization Module (Ready for Real Data)</p>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};
