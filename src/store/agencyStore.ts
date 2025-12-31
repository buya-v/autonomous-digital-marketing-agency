import { create } from 'zustand';
import { AgencyState, LogEntry } from '../types';

const generateId = () => Math.random().toString(36).substring(2, 9);

export const useAgencyStore = create<AgencyState>((set) => ({
  mode: 'sandbox',
  status: 'active',
  lastUpdated: Date.now(),
  metrics: {
    spend: 1240.50,
    ctr: 2.4,
    roas: 3.8,
    conversions: 84,
    impressions: 45000
  },
  logs: [
    {
      id: 'init-1',
      timestamp: Date.now() - 5000,
      level: 'system',
      message: 'ADMA System initialized v3.0.1'
    },
    {
      id: 'init-2',
      timestamp: Date.now() - 4000,
      level: 'info',
      message: 'Connected to Meta Marketing API',
      metadata: 'Token verified'
    }
  ],

  toggleMode: (mode) => set((state) => ({
    mode,
    logs: [
      ...state.logs,
      {
        id: generateId(),
        timestamp: Date.now(),
        level: 'warning',
        message: `Environment switched to ${mode.toUpperCase()}`
      }
    ]
  })),

  emergencyStop: () => set((state) => ({
    status: 'paused',
    logs: [
      ...state.logs,
      {
        id: generateId(),
        timestamp: Date.now(),
        level: 'error',
        message: 'EMERGENCY STOP TRIGGERED. All API tokens paused.'
      }
    ]
  })),

  resumeOperation: () => set((state) => ({
    status: 'active',
    logs: [
      ...state.logs,
      {
        id: generateId(),
        timestamp: Date.now(),
        level: 'success',
        message: 'Operations resumed by user.'
      }
    ]
  })),

  addLog: (entry) => set((state) => ({
    logs: [
      ...state.logs.slice(-99), // Keep last 100 logs
      {
        ...entry,
        id: generateId(),
        timestamp: Date.now()
      }
    ]
  })),

  updateMetrics: (newMetrics) => set((state) => ({
    metrics: { ...state.metrics, ...newMetrics },
    lastUpdated: Date.now()
  }))
}));