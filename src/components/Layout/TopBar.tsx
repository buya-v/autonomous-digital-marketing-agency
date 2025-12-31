import React from 'react';
import { Bell, Search, Sparkles } from 'lucide-react';
import { useStore } from '../../store';
import { cn } from '../../lib/utils';
import { motion } from 'framer-motion';

export const TopBar: React.FC = () => {
  const { user, isOptimizing } = useStore();

  return (
    <header className="h-16 border-b border-slate-700/50 bg-bg-main/80 backdrop-blur-md px-8 flex items-center justify-between sticky top-0 z-10 ml-64">
      <div className="flex items-center text-slate-400 bg-bg-surface px-4 py-2 rounded-full border border-slate-700/50 w-96">
        <Search className="w-4 h-4 mr-2" />
        <input 
          type="text" 
          placeholder="Search campaigns, assets, or insights..." 
          className="bg-transparent border-none outline-none text-sm w-full text-slate-200 placeholder-slate-500"
        />
      </div>

      <div className="flex items-center space-x-6">
        {/* AI Status Indicator */}
        <div className="flex items-center space-x-2">
          <div className="relative flex h-3 w-3">
            {isOptimizing && (
              <motion.span 
                animate={{ scale: [1, 1.5, 1], opacity: [1, 0, 1] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
                className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-secondary opacity-75"
              />
            )}
            <span className={cn("relative inline-flex rounded-full h-3 w-3", isOptimizing ? "bg-brand-secondary" : "bg-green-500")}></span>
          </div>
          <span className="text-sm font-medium text-slate-300">
            {isOptimizing ? "AI Optimizing Bids..." : "System Active"}
          </span>
        </div>

        <button className="relative text-slate-400 hover:text-white transition-colors">
          <Bell className="w-5 h-5" />
          <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full border-2 border-bg-main"></span>
        </button>

        <div className="flex items-center space-x-3 border-l border-slate-700 pl-6">
          <div className="text-right">
            <p className="text-sm font-medium text-white">{user.name}</p>
            <p className="text-xs text-slate-500">Admin</p>
          </div>
          <img 
            src={user.avatar} 
            alt="Profile" 
            className="w-9 h-9 rounded-full border-2 border-brand-primary/20"
          />
        </div>
      </div>
    </header>
  );
};