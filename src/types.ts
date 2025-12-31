export type Platform = "meta" | "google" | "linkedin";

export interface Campaign {
  id: string;
  business_id: string;
  name: string;
  goal: "sales" | "leads" | "traffic";
  monthly_budget: number;
  spend_to_date: number;
  status: "draft" | "active" | "optimizing" | "paused";
  channels: Platform[];
  ai_strategy_summary: string;
}

export interface MarketingAsset {
  id: string;
  campaign_id: string;
  type: "image" | "copy" | "video";
  content_url: string;
  preview_text?: string;
  platform: Platform;
  performance_score: number; // 0-100
  status: "pending" | "live" | "rejected";
}

export interface MetricData {
  date: string;
  value: number;
}

export interface DashboardMetric {
  id: string;
  label: string;
  value: string;
  trend: number;
  trendDirection: "up" | "down";
  data: MetricData[];
}