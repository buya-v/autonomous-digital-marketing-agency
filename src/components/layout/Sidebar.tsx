import React from 'react';
import { LayoutDashboard, Megaphone, Settings, CreditCard, PieChart, Activity } from 'lucide-react';

const navItems = [
  { icon: LayoutDashboard, label: 'Overview', active: true },
  { icon: Megaphone, label: 'Campaigns', active: false },
  { icon: PieChart, label: 'Analytics', active: false },
  { icon: Activity, label: 'Live Logs', active: false },
  { icon: CreditCard, label: 'Billing', active: false },
  { icon: Settings, label: 'Settings', active: false },
];

export const Sidebar: React.FC = () => {
  return (
    <aside className="w-64 bg-slate-900 border-r border-slate-800 hidden md:flex flex-col">
      <div className="h-16 flex items-center px-6 border-b border-slate-800">
        <div className="w-8 h-8 bg-brand-accent rounded-lg flex items-center justify-center mr-3">
          <span className="text-white font-bold">A</span>
        </div>
        <span className="text-white font-bold tracking-tight">ADMA <span className="text-slate-500 font-normal">v3.0</span></span>
      </div>

      <nav className="flex-1 py-6 px-3 space-y-1">
        {navItems.map((item) => (
          <button
            key={item.label}
            className={`w-full flex items-center space-x-3 px-3 py-2 rounded-md transition-colors text-sm font-medium ${item.active ? 'bg-brand-accent/10 text-brand-accent' : 'text-slate-400 hover:text-white hover:bg-slate-800'}`}
          >
            <item.icon className="w-5 h-5" />
            <span>{item.label}</span>
          </button>
        ))}
      </nav>

      <div className="p-4 border-t border-slate-800">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 rounded-full bg-slate-700" />
          <div>
            <p className="text-sm font-medium text-white">Admin User</p>
            <p className="text-xs text-slate-500">admin@adma.ai</p>
          </div>
        </div>
      </div>
    </aside>
  );
};