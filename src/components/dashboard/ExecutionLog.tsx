import React, { useEffect, useRef } from 'react';
import { Terminal, CheckCircle, AlertCircle, Info, Clock } from 'lucide-react';
import { useStore } from '../../store/useStore';
import { clsx } from 'clsx';
import { format } from 'date-fns';

export const ExecutionLog: React.FC = () => {
  const { logs, masterKillSwitch } = useStore();
  const bottomRef = useRef<HTMLDivElement>(null);

  // Auto scroll to bottom when logs update
  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [logs]);

  const getIcon = (status: string) => {
    switch (status) {
      case 'success': return <CheckCircle className="w-4 h-4 text-emerald-500" />;
      case 'error': return <AlertCircle className="w-4 h-4 text-red-500" />;
      case 'warning': return <Clock className="w-4 h-4 text-amber-500" />;
      default: return <Info className="w-4 h-4 text-blue-500" />;
    }
  };

  return (
    <div className="flex flex-col h-full bg-slate-900 rounded-xl border border-slate-700 overflow-hidden shadow-lg">
      <div className="flex items-center justify-between px-4 py-3 bg-slate-800 border-b border-slate-700">
        <div className="flex items-center gap-2">
          <Terminal className="w-4 h-4 text-slate-400" />
          <h3 className="text-sm font-semibold text-slate-200">Campaign Execution Log</h3>
        </div>
        {masterKillSwitch && (
          <span className="text-xs font-bold text-red-500 px-2 py-0.5 bg-red-500/10 rounded uppercase">
            Paused
          </span>
        )}
      </div>
      
      <div className="flex-1 overflow-y-auto p-4 custom-scrollbar space-y-3 font-mono text-sm">
        {logs.map((log) => (
          <div key={log.id} className="flex gap-3 items-start animate-in fade-in slide-in-from-left-2 duration-300">
            <div className="mt-0.5 flex-shrink-0">
              {getIcon(log.status)}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-0.5">
                <span className="text-xs text-slate-500">
                  [{format(new Date(log.timestamp), 'HH:mm:ss')}]
                </span>
                <span className={clsx(
                  "text-xs px-1.5 py-0.5 rounded font-medium",
                  log.platform === 'Meta' && "bg-blue-900/50 text-blue-300",
                  log.platform === 'Google' && "bg-amber-900/50 text-amber-300",
                  log.platform === 'System' && "bg-slate-700 text-slate-300"
                )}>
                  {log.platform}
                </span>
              </div>
              <p className="text-slate-300 break-words leading-relaxed">
                {log.message}
              </p>
            </div>
          </div>
        ))}
        <div ref={bottomRef} />
      </div>
    </div>
  );
};