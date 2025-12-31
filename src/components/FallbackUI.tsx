import React, { useState } from 'react';
import { AlertTriangle, RefreshCw, Terminal, ChevronDown, ChevronRight } from 'lucide-react';
import { AppError } from '../utils/errors';

interface FallbackUIProps {
  error: AppError | null;
  resetErrorBoundary: () => void;
}

export const FallbackUI: React.FC<FallbackUIProps> = ({ error, resetErrorBoundary }) => {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <div className="min-h-screen bg-[#0F172A] flex items-center justify-center p-4">
      <div className="max-w-lg w-full bg-[#1E293B] border border-red-900/50 rounded-lg shadow-2xl overflow-hidden">
        <div className="p-6 border-b border-gray-800">
          <div className="flex items-center gap-3 text-[#EF4444] mb-2">
            <AlertTriangle className="w-8 h-8" />
            <h1 className="text-xl font-bold tracking-tight">System Failure Detected</h1>
          </div>
          <p className="text-gray-400 text-sm">
            The Autonomous Digital Marketing Agency encountered a critical error. The fail-safe protocol has been activated.
          </p>
        </div>

        <div className="p-6 space-y-4">
          <div className="bg-red-950/30 border border-red-900/50 rounded p-4">
            <div className="flex justify-between items-start">
               <div>
                 <span className="text-xs font-mono text-red-400 uppercase tracking-wider">Error Code</span>
                 <p className="font-mono text-[#EF4444] font-bold">{error?.code || 'UNKNOWN_CRASH'}</p>
               </div>
               <div className="text-right">
                 <span className="text-xs font-mono text-gray-500 uppercase tracking-wider">Component</span>
                 <p className="font-mono text-gray-300 text-sm">{error?.componentId || 'Root'}</p>
               </div>
            </div>
          </div>

          <button 
            onClick={() => setShowDetails(!showDetails)}
            className="flex items-center gap-2 text-xs text-gray-400 hover:text-white transition-colors"
          >
            {showDetails ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
            System Diagnostics
          </button>

          {showDetails && (
            <div className="bg-black rounded p-3 font-mono text-xs text-green-500 overflow-x-auto">
              <pre>{JSON.stringify(error, null, 2)}</pre>
            </div>
          )}

          <button 
            onClick={resetErrorBoundary}
            className="w-full flex items-center justify-center gap-2 bg-[#2563EB] hover:bg-blue-600 text-white py-3 rounded font-medium transition-all active:scale-[0.98]"
          >
            <RefreshCw className="w-4 h-4" />
            Reboot System
          </button>
        </div>
      </div>
    </div>
  );
};