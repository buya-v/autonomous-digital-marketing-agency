import React from 'react';
import { Activity, Server, Wifi } from 'lucide-react';
import { useStore } from '../../store/useStore';
import { clsx } from 'clsx';

export const StatusMarquee: React.FC = () => {
  const { systemStatus, masterKillSwitch } = useStore();

  return (
    <div className="h-8 bg-slate-950 border-b border-slate-800 flex items-center justify-between px-4 text-xs font-mono select-none overflow-hidden">
      <div className="flex items-center space-x-6">
        <div className="flex items-center space-x-2">
          <Wifi className={clsx("w-3 h-3", masterKillSwitch ? "text-red-500" : "text-emerald-500")} />
          <span className="text-slate-400">Meta API: </span>
          <span className={clsx(
            masterKillSwitch ? "text-red-500" : systemStatus.metaLatency > 150 ? "text-amber-500" : "text-emerald-400"
          )}>
            {masterKillSwitch ? 'OFFLINE' : `${systemStatus.metaLatency}ms`}
          </span>
        </div>
        
        <div className="flex items-center space-x-2">
          <Wifi className={clsx("w-3 h-3", masterKillSwitch ? "text-red-500" : "text-emerald-500")} />
          <span className="text-slate-400">Google Ads: </span>
          <span className={clsx(
            masterKillSwitch ? "text-red-500" : systemStatus.googleLatency > 200 ? "text-amber-500" : "text-emerald-400"
          )}>
            {masterKillSwitch ? 'OFFLINE' : `${systemStatus.googleLatency}ms`}
          </span>
        </div>

        <div className="hidden md:flex items-center space-x-2">
          <Server className="w-3 h-3 text-blue-500" />
          <span className="text-slate-400">Job Queue: </span>
          <span className="text-blue-400">{masterKillSwitch ? 0 : systemStatus.activeJobs} Active</span>
        </div>
      </div>

      <div className="flex items-center space-x-2">
        <Activity className={clsx("w-3 h-3", systemStatus.oAuthHealth === 'Healthy' ? "text-emerald-500" : "text-red-500")} />
        <span className="text-slate-400">OAuth: </span>
        <span className={clsx(
          systemStatus.oAuthHealth === 'Healthy' ? "text-emerald-500" : "text-red-500"
        )}>
          {systemStatus.oAuthHealth}
        </span>
      </div>
    </div>
  );
};