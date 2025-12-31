import { ChartData } from './types';

export const analyticsData: ChartData[] = [
  { time: '00:00', spend: 120, revenue: 350, conversions: 12 },
  { time: '04:00', spend: 80, revenue: 200, conversions: 8 },
  { time: '08:00', spend: 250, revenue: 900, conversions: 35 },
  { time: '12:00', spend: 450, revenue: 1600, conversions: 62 },
  { time: '16:00', spend: 380, revenue: 1450, conversions: 55 },
  { time: '20:00', spend: 300, revenue: 1100, conversions: 40 },
  { time: '23:59', spend: 150, revenue: 400, conversions: 15 },
];

export const generateRandomLatency = () => Math.floor(Math.random() * (200 - 30) + 30);