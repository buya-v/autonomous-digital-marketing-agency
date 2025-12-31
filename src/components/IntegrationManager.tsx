import React, { useState } from 'react';
import { CheckCircle, AlertCircle, RefreshCw, XCircle, Info } from 'lucide-react';
import clsx from 'clsx';

interface IntegrationStatus {
  id: 'meta' | 'google' | 'linkedin';
  name: string;
  status: 'connected' | 'error' | 'disconnected';
  lastSync?: string;
  lastError?: string;
}

export const IntegrationManager: React.FC = () => {
  const [integrations, setIntegrations] = useState<IntegrationStatus[]>([
    { id: 'meta', name: 'Meta Ads Manager', status: 'connected', lastSync: '2 mins ago' },
    { id: 'google', name: 'Google Ads', status: 'connected', lastSync: '5 mins ago' },
    { id: 'linkedin', name: 'LinkedIn Campaign Manager', status: 'error', lastError: 'OAuth Token Expired (ERR_OAUTH_401)' }
  ]);

  const [isSyncing, setIsSyncing] = useState<string | null>(null);

  const handleSync = (id: string) => {
    setIsSyncing(id);
    // Simulate API call
    setTimeout(() => {
      setIsSyncing(null);
      setIntegrations(prev => prev.map(int => 
        int.id === id 
          ? { ...int, status: 'connected', lastSync: 'Just now', lastError: undefined } 
          : int
      ));
    }, 1500);
  };

  return (
    <div className="bg-[#1E293B] rounded-lg border border-gray-700/50 overflow-hidden">
      <div className="p-4 border-b border-gray-700/50 bg-slate-900/50 flex justify-between items-center">
        <h3 className="font-bold text-white">Live Integrations Hub</h3>
        <span className="text-xs text-blue-400 bg-blue-400/10 px-2 py-1 rounded font-mono">API v4.1.0</span>
      </div>
      <div className="divide-y divide-gray-700/50">
        {integrations.map((int) => (
          <div key={int.id} className="p-4 flex items-center justify-between hover:bg-slate-800/50 transition-colors">
            <div className="flex items-center gap-4">
              <div className={clsx(
                "w-2 h-2 rounded-full ring-4",
                int.status === 'connected' ? 'bg-green-500 ring-green-500/20' :
                int.status === 'error' ? 'bg-red-500 ring-red-500/20' :
                'bg-gray-500 ring-gray-500/20'
              )}></div>
              <div>
                <h4 className="font-medium text-white">{int.name}</h4>
                <div className="flex items-center gap-2 mt-1">
                  <span className={clsx(
                    "text-xs font-mono",
                    int.status === 'connected' ? 'text-green-400' :
                    int.status === 'error' ? 'text-red-400' :
                    'text-gray-400'
                  )}>
                    {int.status.toUpperCase()}
                  </span>
                  {int.lastError && (
                    <div className="group relative">
                      <Info size={12} className="text-red-400 cursor-help" />
                      <div className="absolute left-0 bottom-full mb-2 hidden group-hover:block w-64 bg-black border border-red-900 p-2 text-xs text-red-200 rounded shadow-xl z-10">
                        {int.lastError}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="text-right hidden sm:block">
                 <p className="text-xs text-gray-500">Last Sync</p>
                 <p className="text-xs text-gray-300 font-mono">{int.lastSync || '--'}</p>
              </div>
              <button 
                onClick={() => handleSync(int.id)}
                disabled={isSyncing === int.id}
                className="p-2 hover:bg-slate-700 rounded-lg text-gray-400 hover:text-white disabled:opacity-50 transition-colors"
                title="Sync Now"
              >
                 <RefreshCw size={18} className={isSyncing === int.id ? 'animate-spin text-blue-500' : ''} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
