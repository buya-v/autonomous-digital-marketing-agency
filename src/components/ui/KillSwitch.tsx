import React, { useState } from 'react';
import { ShieldAlert, Power, AlertTriangle } from 'lucide-react';
import { useStore } from '../../store/useStore';
import { clsx } from 'clsx';

export const KillSwitch: React.FC = () => {
  const { masterKillSwitch, toggleKillSwitch } = useStore();
  const [showConfirm, setShowConfirm] = useState(false);

  const handleToggle = () => {
    if (masterKillSwitch) {
      // Re-enabling is safer, but still nice to confirm. For now, immediate.
      toggleKillSwitch(false);
    } else {
      // Disabling requires confirmation
      setShowConfirm(true);
    }
  };

  const confirmKill = () => {
    toggleKillSwitch(true);
    setShowConfirm(false);
  };

  if (showConfirm) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
        <div className="bg-slate-800 border-2 border-red-600 rounded-lg p-6 max-w-md w-full shadow-2xl animate-in fade-in zoom-in">
          <div className="flex items-center space-x-3 text-red-500 mb-4">
            <AlertTriangle className="w-10 h-10" />
            <h2 className="text-xl font-bold text-white">EMERGENCY STOP</h2>
          </div>
          <p className="text-slate-300 mb-6">
            This will immediately halt <strong>ALL</strong> active API calls to Meta, Google, and OpenAI.
            Ad spend will pause, and pending jobs will be cancelled.
          </p>
          <div className="flex space-x-3">
            <button 
              onClick={() => setShowConfirm(false)}
              className="flex-1 py-2 px-4 rounded bg-slate-700 hover:bg-slate-600 text-white font-medium transition-colors"
            >
              Cancel
            </button>
            <button 
              onClick={confirmKill}
              className="flex-1 py-2 px-4 rounded bg-red-600 hover:bg-red-700 text-white font-bold transition-colors shadow-[0_0_15px_rgba(220,38,38,0.5)]"
            >
              KILL ALL PROCESSES
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <button
      onClick={handleToggle}
      className={clsx(
        "flex items-center gap-2 px-4 py-2 rounded-md font-bold transition-all duration-300 border",
        masterKillSwitch 
          ? "bg-red-600/20 border-red-500 text-red-500 hover:bg-red-600/30 animate-pulse"
          : "bg-slate-800 border-slate-700 text-slate-400 hover:text-white hover:border-slate-500"
      )}
    >
      {masterKillSwitch ? (
        <>
          <ShieldAlert className="w-5 h-5" />
          <span>SYSTEM HALTED</span>
        </>
      ) : (
        <>
          <Power className="w-5 h-5" />
          <span>Safety Systems Active</span>
        </>
      )}
    </button>
  );
};