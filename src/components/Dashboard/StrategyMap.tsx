import React from 'react';
import { Facebook, Linkedin, Chrome, ArrowRight, Bot } from 'lucide-react';
import { Campaign } from '../../types';
import { cn, formatCurrency } from '../../lib/utils';

interface StrategyMapProps {
  campaign: Campaign;
}

export const StrategyMap: React.FC<StrategyMapProps> = ({ campaign }) => {
  const metaBudget = campaign.monthly_budget * 0.4;
  const googleBudget = campaign.monthly_budget * 0.35;
  const linkedinBudget = campaign.monthly_budget * 0.25;

  return (
    <div className="bg-bg-surface border border-slate-700/50 rounded-xl p-6">
      <div className="flex items-center justify-between mb-8">
        <h3 className="text-lg font-semibold text-white">Active Strategy Map</h3>
        <span className="text-xs font-mono text-brand-secondary bg-brand-secondary/10 px-2 py-1 rounded">
          AI_MODEL: GPT-4o-Opt
        </span>
      </div>

      <div className="relative flex flex-col md:flex-row items-center justify-between gap-8">
        {/* Source Node */}
        <div className="relative z-10">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center shadow-lg shadow-indigo-500/20">
            <Bot className="w-8 h-8 text-white" />
          </div>
          <p className="mt-3 text-sm font-medium text-center text-slate-300">AI Core</p>
        </div>

        {/* Connecting Lines (Desktop) */}
        <div className="hidden md:flex flex-1 relative h-[2px] bg-slate-700 w-full max-w-md mx-4">
          <div className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 bg-bg-surface px-2">
            <span className="text-xs text-slate-500">Budget Allocation</span>
          </div>
        </div>

        {/* Channels */}
        <div className="flex flex-col gap-4 w-full md:w-auto">
          {/* Meta Node */}
          <div className="flex items-center p-3 rounded-lg border border-slate-700/50 bg-slate-800/50 hover:border-blue-500/50 transition-colors">
            <div className="w-10 h-10 rounded-full bg-[#1877F2]/20 flex items-center justify-center mr-3">
              <Facebook className="w-5 h-5 text-[#1877F2]" />
            </div>
            <div className="flex-1 min-w-[120px]">
              <p className="text-sm font-medium text-white">Meta Ads</p>
              <div className="w-full bg-slate-700 h-1.5 rounded-full mt-2 overflow-hidden">
                <div className="bg-[#1877F2] h-full rounded-full" style={{ width: '40%' }}></div>
              </div>
            </div>
            <p className="ml-4 text-xs font-mono text-slate-400">{formatCurrency(metaBudget)}</p>
          </div>

          {/* Google Node */}
          <div className="flex items-center p-3 rounded-lg border border-slate-700/50 bg-slate-800/50 hover:border-red-500/50 transition-colors">
            <div className="w-10 h-10 rounded-full bg-[#EA4335]/20 flex items-center justify-center mr-3">
              <Chrome className="w-5 h-5 text-[#EA4335]" />
            </div>
            <div className="flex-1 min-w-[120px]">
              <p className="text-sm font-medium text-white">Google Ads</p>
              <div className="w-full bg-slate-700 h-1.5 rounded-full mt-2 overflow-hidden">
                <div className="bg-[#EA4335] h-full rounded-full" style={{ width: '35%' }}></div>
              </div>
            </div>
            <p className="ml-4 text-xs font-mono text-slate-400">{formatCurrency(googleBudget)}</p>
          </div>

          {/* LinkedIn Node */}
          <div className="flex items-center p-3 rounded-lg border border-slate-700/50 bg-slate-800/50 hover:border-blue-700/50 transition-colors">
            <div className="w-10 h-10 rounded-full bg-[#0A66C2]/20 flex items-center justify-center mr-3">
              <Linkedin className="w-5 h-5 text-[#0A66C2]" />
            </div>
            <div className="flex-1 min-w-[120px]">
              <p className="text-sm font-medium text-white">LinkedIn</p>
              <div className="w-full bg-slate-700 h-1.5 rounded-full mt-2 overflow-hidden">
                <div className="bg-[#0A66C2] h-full rounded-full" style={{ width: '25%' }}></div>
              </div>
            </div>
            <p className="ml-4 text-xs font-mono text-slate-400">{formatCurrency(linkedinBudget)}</p>
          </div>
        </div>
      </div>

      <div className="mt-6 p-4 rounded-lg bg-slate-900/50 border border-slate-700/30">
        <p className="text-sm text-slate-400 leading-relaxed">
          <span className="text-brand-primary font-semibold">AI Insight:</span> {campaign.ai_strategy_summary}
        </p>
      </div>
    </div>
  );
};