import React from 'react';
import { AlertOctagon, PlayCircle, ShieldAlert } from 'lucide-react';
import { useAgencyStore } from '../../store/agencyStore';

export const CampaignKillSwitch: React.FC = () => {
  const { status, emergencyStop, resumeOperation } = useAgencyStore();
  const isPaused = status === 'paused';

  return (
    <div className={`rounded-lg border p-4 flex items-center justify-between transition-colors duration-500 ${isPaused ? 'bg-status-error/10 border-status-error' : 'bg-white border-slate-200'}`}>
      <div className="flex items-center space-x-4">
        <div className={`p-3 rounded-full ${isPaused ? 'bg-status-error/20' : 'bg-slate-100'}`}>
          <ShieldAlert className={`w-6 h-6 ${isPaused ? 'text-status-error' : 'text-slate-600'}`} />
        </div>
        <div>
          <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wide">Safety Governance</h3>
          <p className="text-xs text-slate-500 mt-1">
            {isPaused 
              ? 'SYSTEM PAUSED: All API tokens revoked. Campaigns stopped.' 
              : 'SYSTEM ACTIVE: Autonomous bidding enabled.'}
          </p>
        </div>
      </div>

      <button
        onClick={isPaused ? resumeOperation : emergencyStop}
        className={`relative inline-flex items-center justify-center px-6 py-2.5 overflow-hidden text-sm font-medium tracking-tighter text-white transition-all duration-300 rounded-lg group focus:outline-none focus:ring-2 focus:ring-offset-2 ${
          isPaused 
            ? 'bg-status-live hover:bg-emerald-600 focus:ring-emerald-500' 
            : 'bg-status-error hover:bg-red-600 focus:ring-red-500'
        }`}
      >
        {isPaused ? (
          <>
            <PlayCircle className="w-4 h-4 mr-2" />
            Resume Operations
          </>
        ) : (
          <>
            <AlertOctagon className="w-4 h-4 mr-2" />
            Emergency Stop
          </>
        )}
      </button>
    </div>
  );
};