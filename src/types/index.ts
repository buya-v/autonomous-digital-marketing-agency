export type AppMode = 'sandbox' | 'production';
export type SystemStatus = 'active' | 'paused' | 'error';

export interface LogEntry {
  id: string;
  timestamp: number;
  level: 'info' | 'success' | 'warning' | 'error' | 'system';
  message: string;
  metadata?: string;
}

export interface PerformanceMetrics {
  spend: number;
  ctr: number;
  roas: number;
  conversions: number;
  impressions: number;
}

export interface AgencyState {
  mode: AppMode;
  status: SystemStatus;
  metrics: PerformanceMetrics;
  logs: LogEntry[];
  lastUpdated: number;
  
  // Actions
  toggleMode: (mode: AppMode) => void;
  emergencyStop: () => void;
  resumeOperation: () => void;
  addLog: (entry: Omit<LogEntry, 'id' | 'timestamp'>) => void;
  updateMetrics: (metrics: Partial<PerformanceMetrics>) => void;
}