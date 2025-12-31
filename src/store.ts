import { create } from 'zustand';
import { Campaign, MarketingAsset } from './types';

interface AppState {
  user: { name: string; email: string; avatar: string };
  isOptimizing: boolean;
  campaigns: Campaign[];
  assets: MarketingAsset[];
  activeCampaignId: string | null;
  
  // Actions
  triggerOptimization: () => void;
  addCampaign: (campaign: Campaign) => void;
  setActiveCampaign: (id: string) => void;
}

const MOCK_CAMPAIGNS: Campaign[] = [
  {
    id: 'c-1',
    business_id: 'b-1',
    name: 'Q3 Summer Sale',
    goal: 'sales',
    monthly_budget: 5000,
    spend_to_date: 1250,
    status: 'active',
    channels: ['meta', 'google'],
    ai_strategy_summary: 'Focusing 60% budget on Instagram Reels for brand awareness, 40% on Google Shopping for high-intent capture.',
  },
  {
    id: 'c-2',
    business_id: 'b-1',
    name: 'B2B Lead Gen',
    goal: 'leads',
    monthly_budget: 3000,
    spend_to_date: 450,
    status: 'optimizing',
    channels: ['linkedin'],
    ai_strategy_summary: 'Targeting CTOs and Engineering Managers in SaaS sector with whitepaper download lead forms.',
  }
];

const MOCK_ASSETS: MarketingAsset[] = [
  {
    id: 'a-1',
    campaign_id: 'c-1',
    type: 'copy',
    content_url: '',
    preview_text: 'Unlock 30% off summer essentials. Limited time only. #SummerVibes',
    platform: 'meta',
    performance_score: 88,
    status: 'live',
  },
  {
    id: 'a-2',
    campaign_id: 'c-1',
    type: 'image',
    content_url: 'https://images.unsplash.com/photo-1555529771-835f59fc5efe?q=80&w=1000&auto=format&fit=crop',
    platform: 'meta',
    performance_score: 92,
    status: 'live',
  },
  {
    id: 'a-3',
    campaign_id: 'c-2',
    type: 'copy',
    content_url: '',
    preview_text: 'Scale your autonomous infrastructure with our enterprise API. Download the whitepaper.',
    platform: 'linkedin',
    performance_score: 74,
    status: 'pending',
  }
];

export const useStore = create<AppState>((set) => ({
  user: {
    name: 'Alex Rivera',
    email: 'alex@growth.ai',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alex'
  },
  isOptimizing: false,
  campaigns: MOCK_CAMPAIGNS,
  assets: MOCK_ASSETS,
  activeCampaignId: 'c-1',

  triggerOptimization: () => {
    set({ isOptimizing: true });
    setTimeout(() => set({ isOptimizing: false }), 3000);
  },
  addCampaign: (campaign) => set((state) => ({ campaigns: [...state.campaigns, campaign] })),
  setActiveCampaign: (id) => set({ activeCampaignId: id }),
}));