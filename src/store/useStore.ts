import { create } from 'zustand';
import { SystemStatus, LogEntry, Campaign } from '../lib/types';

interface AppState {
  masterKillSwitch: boolean;
  toggleKillSwitch: (status: boolean) => void;
  systemStatus: SystemStatus;
  updateSystemStatus: (updates: Partial<SystemStatus>) => void;
  logs: LogEntry[];
  addLog: (log: Omit<LogEntry, 'id' | 'timestamp'>) => void;
  campaigns: Campaign[];
}

export const useStore = create<AppState>((set) => ({
  masterKillSwitch: false,
  toggleKillSwitch: (status) => set((state) => {
    if (status) {
      // When turning ON kill switch (Stopping everything)
      return {
        masterKillSwitch: true,
        logs: [
          ...state.logs,
          {
            id: Math.random().toString(36).substr(2, 9),
            timestamp: new Date().toISOString(),
            platform: 'System',
            message: 'MASTER KILL SWITCH ACTIVATED. ALL JOBS PAUSED.',
            status: 'error'
          }
        ],
        systemStatus: { ...state.systemStatus, activeJobs: 0, openaiStatus: 'Idle' }
      };
    } else {
      // Resuming
      return {
        masterKillSwitch: false,
        logs: [
          ...state.logs,
          {
            id: Math.random().toString(36).substr(2, 9),
            timestamp: new Date().toISOString(),
            platform: 'System',
            message: 'System resumed. Connections re-established.',
            status: 'success'
          }
        ]
      };
    }
  }),
  systemStatus: {
    metaLatency: 45,
    googleLatency: 120,
    openaiStatus: 'Idle',
    activeJobs: 3,
    oAuthHealth: 'Healthy'
  },
  updateSystemStatus: (updates) => set((state) => ({
    systemStatus: { ...state.systemStatus, ...updates }
  })),
  logs: [
    { id: '1', timestamp: new Date(Date.now() - 1000 * 60 * 5).toISOString(), platform: 'Meta', message: 'Synced Audience Insights (North America)', status: 'success' },
    { id: '2', timestamp: new Date(Date.now() - 1000 * 60 * 12).toISOString(), platform: 'Google', message: 'Bid adjustment: +5% on Keyword "SaaS Automation"', status: 'info' },
  ],
  addLog: (log) => set((state) => ({
    logs: [{
      id: Math.random().toString(36).substr(2, 9),
      timestamp: new Date().toISOString(),
      ...log
    }, ...state.logs].slice(0, 50) // Keep last 50
  })),
  campaigns: [
    { id: 'c1', name: 'Winter Sale Phase 1', status: 'Active', spend: 450.20, conversions: 32, roas: 3.4, platform: 'Meta' },
    { id: 'c2', name: 'Competitor Targeting', status: 'Active', spend: 1250.00, conversions: 85, roas: 2.1, platform: 'Google' },
    { id: 'c3', name: 'Retargeting Mix', status: 'Paused', spend: 200.00, conversions: 12, roas: 1.8, platform: 'Meta' },
  ]
}));