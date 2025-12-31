import React from 'react';
import { ShieldCheck, RefreshCw } from 'lucide-react';

export const OAuthStatus: React.FC = () => {
  return (
    <div className="bg-slate-800 rounded-xl p-5 border border-slate-700 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <div className="p-3 bg-emerald-500/10 rounded-full">
          <ShieldCheck className="w-6 h-6 text-emerald-500" />
        </div>
        <div>
          <h4 className="text-white font-medium">OAuth Tokens Active</h4>
          <p className="text-slate-400 text-sm">Next automatic refresh in 54 minutes</p>
        </div>
      </div>
      <button className="text-xs flex items-center gap-2 bg-slate-700 hover:bg-slate-600 text-slate-200 px-3 py-2 rounded transition-colors">
        <RefreshCw className="w-3 h-3" />
        Force Refresh
      </button>
    </div>
  );
};