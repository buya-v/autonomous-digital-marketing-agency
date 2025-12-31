import React, { useEffect, useState } from 'react';
import { Bot, Activity } from 'lucide-react';

interface LogEntry {
  id: string;
  timestamp: string;
  message: string;
  type: 'action' | 'analysis' | 'decision';
}

export const AILogStream: React.FC = () => {
  const [logs, setLogs] = useState<LogEntry[]>([
    { id: '1', timestamp: '10:42:05', message: 'Analyzing CTR across Google Display Network', type: 'analysis' },
    { id: '2', timestamp: '10:42:08', message: 'Identified underperforming creative ID #8842', type: 'decision' },
    { id: '3', timestamp: '10:42:10', message: 'Paused Creative #8842. Reallocating budget to Creative #9910', type: 'action' }
  ]);

  // Simulate live logs
  useEffect(() => {
    const interval = setInterval(() => {
      const actions = [
        'Adjusting bid cap for audience segment "SaaS Founders"',
        'Generated 3 new variations of ad copy',
        'Checking competitor density in auction',
        'Optimizing landing page correlation score'
      ];
      const randomAction = actions[Math.floor(Math.random() * actions.length)];
      
      const newLog: LogEntry = {
        id: Date.now().toString(),
        timestamp: new Date().toLocaleTimeString('en-US', { hour12: false }),
        message: randomAction,
        type: Math.random() > 0.5 ? 'action' : 'analysis'
      };

      setLogs(prev => [newLog, ...prev].slice(0, 5));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-[#1E293B] rounded-lg border border-gray-700/50 h-full">
      <div className="p-4 border-b border-gray-700/50 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Bot className="text-blue-400" size={20} />
          <h3 className="font-bold text-white">Autonomous Agent</h3>
        </div>
        <div className="flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
          </span>
          <span className="text-xs text-green-400 font-mono">LIVE</span>
        </div>
      </div>
      <div className="p-4 space-y-4">
        {logs.map((log) => (
          <div key={log.id} className="flex gap-3 text-sm">
            <span className="font-mono text-gray-500 text-xs mt-1">[{log.timestamp}]</span>
            <p className="text-gray-300">
              <span className={`font-mono text-xs uppercase mr-2 ${
                log.type === 'action' ? 'text-blue-400' : 'text-purple-400'
              }`}>{log.type}</span>
              {log.message}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};
