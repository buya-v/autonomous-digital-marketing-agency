import React, { useEffect, useRef } from 'react';
import { Activity, Terminal } from 'lucide-react';
import { useAgencyStore } from '../../store/agencyStore';
import { format } from 'date-fns';

export const LiveActionFeed: React.FC = () => {
  const logs = useAgencyStore((state) => state.logs);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [logs]);

  const getLogColor = (level: string) => {
    switch (level) {
      case 'error': return 'text-status-error';
      case 'warning': return 'text-status-warning';
      case 'success': return 'text-status-live';
      case 'system': return 'text-brand-accent';
      default: return 'text-slate-300';
    }
  };

  return (
    <div className="flex flex-col h-[400px] bg-brand-primary rounded-lg overflow-hidden border border-slate-700 shadow-xl">
      <div className="flex items-center justify-between px-4 py-3 bg-slate-900 border-b border-slate-800">
        <div className="flex items-center space-x-2">
          <Terminal className="w-4 h-4 text-slate-400" />
          <span className="text-sm font-semibold text-slate-200">Neural Engine Activity</span>
        </div>
        <div className="flex items-center space-x-2">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-status-live opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-status-live"></span>
          </span>
          <span className="text-xs text-status-live font-mono">LIVE</span>
        </div>
      </div>
      
      <div className="flex-1 p-4 overflow-y-auto font-mono text-xs space-y-2 scrollbar-hide bg-[#0B1120]">
        {logs.map((log) => (
          <div key={log.id} className="flex items-start space-x-3 hover:bg-white/5 p-1 rounded transition-colors">
            <span className="text-slate-500 whitespace-nowrap min-w-[70px]">
              {format(log.timestamp, 'HH:mm:ss')}
            </span>
            <div className="flex flex-col">
              <span className={getLogColor(log.level)}>
                <span className="font-bold uppercase mr-2">[{log.level}]</span>
                {log.message}
              </span>
              {log.metadata && (
                <span className="text-slate-500 pl-2 mt-1 border-l-2 border-slate-700 block">
                  {log.metadata}
                </span>
              )}
            </div>
          </div>
        ))}
        <div ref={bottomRef} />
      </div>
    </div>
  );
};