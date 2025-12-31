export type Platform = 'Meta' | 'Google' | 'LinkedIn' | 'System';

export interface LogEntry {
  id: string;
  timestamp: string;
  platform: Platform;
  message: string;
  status: 'info' | 'success' | 'warning' | 'error';
}

export interface SystemStatus {
  metaLatency: number;
  googleLatency: number;
  openaiStatus: 'Idle' | 'Generating' | 'Offline';
  activeJobs: number;
  oAuthHealth: 'Healthy' | 'Warning' | 'Expired';
}

export interface Campaign {
  id: string;
  name: string;
  status: 'Active' | 'Paused' | 'Ended' | 'Draft';
  spend: number;
  conversions: number;
  roas: number;
  platform: Platform;
}

export interface ChartData {
  time: string;
  spend: number;
  revenue: number;
  conversions: number;
}

export interface UserConfig {
  masterKillSwitch: boolean;
}